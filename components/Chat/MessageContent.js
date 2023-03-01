import { formatDate } from '@/utils/formatDate';

const MessageContent = ({ content, created_at }) => {
  return (
    <div className="z-20 flex flex-col mt-1">
      <p className="mr-2 text-sm ">{content}</p>
      <div className={`mt-2 flex items-center justify-end`}>
        <small className="text-xs text-gray-600 opacity-60">
          {formatDate(created_at)}
        </small>
      </div>
    </div>
  );
};

export default MessageContent;
