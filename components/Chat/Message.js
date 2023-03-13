import MessageAuthor from './MessageAuthor';
import MessageNotAuthor from './MessageNotAuthor';

const Message = ({
  messages,
  username,
  messageUsername,
  i,
  first_name,
  last_name,
  content,
  created_at,
}) => {
  const nextIsdifferntUser =
    messages[i + 1] && messages[i + 1].user_id.username !== username;

  const nextIsSameUser =
    messages[i + 1] && messages[i + 1].user_id.username === username;

  return (
    <>
      {messageUsername === username ? (
        <MessageAuthor
          content={content}
          created_at={created_at}
          nextIsdifferntUser={nextIsdifferntUser}
        />
      ) : (
        <MessageNotAuthor
          content={content}
          created_at={created_at}
          nextIsSameUser={nextIsSameUser}
          first_name={first_name}
          last_name={last_name}
        />
      )}
    </>
  );
};

export default Message;
