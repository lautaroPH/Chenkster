import { getMessagesRealtime } from '@/utils/getMessagesRealtime';
import { useEffect, useRef, useState } from 'react';
import ButtonGoBottom from './ButtonGoBottom';
import Message from './Message';

const Messages = ({
  messagesLoaded,
  room,
  both_users,
  supabase,
  endRef,
  username,
}) => {
  const [messages, setMessages] = useState(messagesLoaded);
  const [newMessagesNumber, setNewMessagesNumber] = useState(0);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const bottomRef = useRef();

  const setNewData = (data) => {
    setMessages((messages) => [...messages, data]);
  };

  const resetNumber = () => {
    setNewMessagesNumber(0);
  };

  const increment = (number) => {
    setNewMessagesNumber((newMessagesNumber) => newMessagesNumber + number);
  };

  useEffect(() => {
    const messages = getMessagesRealtime(
      room,
      both_users,
      setNewData,
      increment,
      supabase,
      resetNumber,
      showScrollButton,
      endRef,
    );

    return () => supabase.removeChannel(messages);
  }, [room, both_users, supabase, showScrollButton, endRef]);

  useEffect(() => {
    bottomRef.current.scrollIntoView();
  }, []);

  return (
    <div
      ref={endRef}
      className="flex flex-col order-1 w-full h-screen overflow-x-hidden overflow-y-scroll"
    >
      <div className="flex-auto min-h-[12px] " />
      {messages.map((message, i) => (
        <Message
          key={message.id}
          messages={messages}
          first_name={message.username.first_name}
          i={i}
          last_name={message.username.last_name}
          messageUsername={message.username.username}
          username={username}
          content={message.content}
          created_at={message.created_at}
        />
      ))}
      <ButtonGoBottom
        endRef={endRef}
        messageNumber={newMessagesNumber}
        resetNumber={resetNumber}
        showScrollButton={showScrollButton}
        setShowScrollButton={setShowScrollButton}
      />
      <span ref={bottomRef} />
    </div>
  );
};

export default Messages;
