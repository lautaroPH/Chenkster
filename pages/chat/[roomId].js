import useUser from '@/hooks/useUser';
import { supabase } from '@/supabaseClient';
import { formatDate } from '@/utils/formatDate';
import { getMessages } from '@/utils/getMessages';
import { useEffect, useRef, useState } from 'react';

export async function getServerSideProps({ query }) {
  const { roomId } = query;

  const users = roomId?.split('-');

  if (!roomId) return { notFound: true };

  const { messages, errorMessage } = await getMessages(users[0], users[1]);

  if (errorMessage) return { notFound: true };

  return {
    props: {
      messagesLoaded: messages,
      room: roomId,
    },
  };
}

export default function Chat({ messagesLoaded, room }) {
  const user = useUser();
  const scroll = useRef();
  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState(messagesLoaded);
  const users = room?.split('-');

  const sendMessage = async (e) => {
    e.preventDefault();
    if (newMessage !== '') {
      await supabase.from('messages').insert({
        content: newMessage,
        username: user.user_metadata?.username,
        to_username: users[0],
      });
      if (messages.length > 0) {
        await supabase.from('total_messages').insert({
          messages: messages.length + 1,
          username: user.user_metadata?.username,
          to_username: users[0],
        });
      } else {
        await supabase.from('total_messages').insert({
          messages: 1,
          username: user.user_metadata?.username,
          to_username: users[0],
        });
      }
      setNewMessage('');
    }
    scroll.current.scrollIntoView({ Behavior: 'smooth' });
  };

  useEffect(() => {
    const messages = supabase
      .channel(room)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: `messages`,
          filter: `to_username=eq.${users[0]} AND username=eq.${users[1]}`,
        },
        (payload) => {
          const newMessage = payload.new;
          setMessages((messages) => [...messages, newMessage]);
        },
      )
      .subscribe();

    return () => supabase.removeChannel(messages);
  }, [room, users]);

  return (
    <div className="w-full h-screen">
      <div className="p-2">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`${
              message.username.username === user?.user_metadata?.username &&
              'm-auto bg-green-300'
            } bg-white w-fit pt-4 pl-3 pb-2 rounded-lg mb-1 text-right relative shadow`}
          >
            <p
              className={`${
                message.username.username === user?.user_metadata?.username
                  ? 'text-right'
                  : 'text-left'
              } m-0 text-sm -mb-1 `}
            >
              {message.content}
            </p>
            <span className="text-xs">{formatDate(message.created_at)}</span>
            <span className="absolute text-xs left-1 top-[2px] text-violet-600 font-semibold">
              {message.username.first_name} {message.username.last_name}
            </span>
          </div>
        ))}
      </div>
      <section className="sticky bottom-0 p-2">
        <form className="flex gap-2" onSubmit={sendMessage}>
          <input
            type="text"
            name="message"
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Write your message"
            value={newMessage}
            className="p-2 pl-4 border-none shadow outline-none rounded-2xl grow"
          />
          <button
            className="flex items-center justify-center p-3 bg-green-400 border-none rounded-full cursor-pointer"
            type="submit"
          >
            Enviar
          </button>
        </form>
      </section>
      <span ref={scroll}></span>
    </div>
  );
}
