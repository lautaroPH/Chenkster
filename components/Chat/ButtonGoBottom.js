import { useCallback, useEffect } from 'react';
import ChevDronDoubleDownSvg from '../Svg/ChevDronDoubleDownSvg';

const ButtonGoBottom = ({
  endRef,
  resetNumber,
  messageNumber,
  setShowScrollButton,
  showScrollButton,
}) => {
  const handleScroll = useCallback(() => {
    const { scrollTop, offsetHeight, scrollHeight } = endRef.current;
    if (scrollTop + offsetHeight >= scrollHeight) {
      setShowScrollButton(false);
    } else {
      setShowScrollButton(true);
    }
  }, [endRef, setShowScrollButton]);

  const handleScrollToBottom = () => {
    endRef.current.scrollTop = endRef.current.scrollHeight;
    resetNumber(0);
  };

  useEffect(() => {
    const current = endRef.current;

    current.addEventListener('scroll', handleScroll);
    return () => {
      current.removeEventListener('scroll', handleScroll);
    };
  }, [endRef, handleScroll]);

  return (
    <>
      {showScrollButton && (
        <button
          onClick={handleScrollToBottom}
          className="absolute z-40 p-1 bg-[#678eb8] rounded-full text-chenkster-gray bottom-16 right-3"
        >
          {messageNumber > 0 && (
            <span className="absolute flex items-center justify-center w-5 h-5 text-sm text-white rounded-full bg-chenkster-blue -left-2 -top-3">
              {messageNumber}
            </span>
          )}
          <ChevDronDoubleDownSvg />
        </button>
      )}
    </>
  );
};

export default ButtonGoBottom;
