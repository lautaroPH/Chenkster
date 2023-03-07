import { updateTotalMessages } from '@/utils/updateTotalMessages';
import { uploadMessage } from '@/utils/uploadMessage';
import { uploadTotalMessages } from '@/utils/uploadTotalMessages';
import { useState } from 'react';

const SendMessage = ({
  both_users,
  username,
  room,
  supabase,
  endRef,
  totalMessages,
  isOnline,
}) => {
  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState(totalMessages);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (newMessage !== '') {
      await uploadMessage(newMessage, both_users, username, room, supabase);
      if (!isOnline) {
        if (messages > 0) {
          await updateTotalMessages(username, room, messages, supabase);
          setMessages(messages + 1);
        } else {
          await uploadTotalMessages(username, room, supabase);
          setMessages(1);
        }
      } else {
        setMessages(0);
      }

      setTimeout(() => {
        endRef.current.scrollTo(0, endRef.current.scrollHeight);
      }, 300);
      setNewMessage('');
    }
  };

  return (
    <section className="min-h-[62px] w-full p-2 order-4">
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
          className="flex items-center justify-center p-3 text-white border-none rounded-full cursor-pointer bg-gradient"
          type="submit"
        >
          Enviar
        </button>
      </form>
    </section>
  );
};

export default SendMessage;
