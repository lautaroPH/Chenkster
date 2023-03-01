import TriangleLeftSvg from '../Svg/TriangleLeftSvg';
import MessageContent from './MessageContent';

const MessageNotAuthor = ({
  nextIsSameUser,
  first_name,
  last_name,
  content,
  created_at,
}) => {
  return (
    <div
      className={`${
        nextIsSameUser ? 'mb-3' : 'my-[1px]'
      } flex flex-col items-start my-[1px] ml-3`}
    >
      <div className="rounded-tr-lg bg-white max-w-[80%] min-w-[10%]  bg-opacity-95 rounded-br-lg rounded-bl-lg  relative px-2 py-1 shadow-md">
        <span className="absolute top-0 z-10 w-2 h-3 text-white -left-[7px]">
          <TriangleLeftSvg />
        </span>
        <small className="text-sm text-chenkster-blue">
          {first_name} {last_name}
        </small>
        <MessageContent content={content} created_at={created_at} />
      </div>
    </div>
  );
};

export default MessageNotAuthor;
