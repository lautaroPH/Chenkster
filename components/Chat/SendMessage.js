import { updateTotalMessages } from '@/utils/updateTotalMessages';
import { uploadMessage } from '@/utils/uploadMessage';
import { uploadTotalMessages } from '@/utils/uploadTotalMessages';
import { useState } from 'react';
import SendSvg from '../Svg/SendSvg';

const SendMessage = ({
  both_users,
  userId,
  toUserId,
  supabase,
  endRef,
  isOnline,
  setMessages,
  messages,
}) => {
  const [newMessage, setNewMessage] = useState('');
  const sendMessage = async (e) => {
    e.preventDefault();
    if (newMessage !== '') {
      await uploadMessage(newMessage, both_users, userId, toUserId, supabase);
      if (!isOnline) {
        if (messages === 'Not messages') {
          await uploadTotalMessages(userId, toUserId, supabase);
          setMessages(1);
        } else {
          await updateTotalMessages(userId, toUserId, messages, supabase);
          setMessages(messages + 1);
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
    <section className="min-h-[62px] w-full p-2 order-4 mb-24">
      <form className="flex gap-2 px-4 pt-2" onSubmit={sendMessage}>
        <input
          type="text"
          name="message"
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type something"
          value={newMessage}
          className="p-2 pl-4 border-none bg-[#0973e11c] shadow outline-none rounded-2xl grow py-4 font-lato"
          autoComplete="off"
        />
        <button className="absolute right-10 bottom-[103px]" type="submit">
          <SendSvg />
        </button>
      </form>
    </section>
  );
};

export default SendMessage;
