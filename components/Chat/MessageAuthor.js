import TriangleRightSvg from '../Svg/TriangleRightSvg';
import MessageContent from './MessageContent';

const MessageAuthor = ({ content, created_at, nextIsdifferntUser }) => {
  return (
    <div
      className={`${
        nextIsdifferntUser ? 'mb-3' : 'my-[1px]'
      } items-end my-[1px] mr-3 flex flex-col`}
    >
      <div
        className="rounded-tl-lg bg-[#7ebdffed]
             max-w-[80%] min-w-[10%]  bg-opacity-95 rounded-br-lg rounded-bl-lg  relative px-2 py-1 shadow-md"
      >
        <span className="absolute top-0 w-2 h-3 -right-[7px] text-[#7ebdffed] z-10">
          <TriangleRightSvg />
        </span>
        <MessageContent content={content} created_at={created_at} />
      </div>
    </div>
  );
};

export default MessageAuthor;
