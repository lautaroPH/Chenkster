import { useRouter } from 'next/router';
import ArrowSvg from './Svg/ArrowSvg';

const GoBack = ({ styles, url }) => {
  const router = useRouter();

  const handleGoBack = () => {
    if (url) {
      router.push(url);
    } else {
      router.back();
    }
  };

  return (
    <div className={`${styles} cursor-pointer`} onClick={handleGoBack}>
      <ArrowSvg />
    </div>
  );
};

export default GoBack;
