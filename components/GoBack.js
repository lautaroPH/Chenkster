import { useRouter } from 'next/router';
import ArrowSvg from './Svg/ArrowSvg';

const GoBack = ({ styles }) => {
  const router = useRouter();

  return (
    <div className={`${styles}`} onClick={() => router.back()}>
      <ArrowSvg />
    </div>
  );
};

export default GoBack;
