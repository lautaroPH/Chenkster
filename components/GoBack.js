import { useRouter } from 'next/router';
import ArrowSvg from './Svg/ArrowSvg';

const GoBack = () => {
  const router = useRouter();

  return (
    <div className="absolute top-16 left-8" onClick={() => router.back()}>
      <ArrowSvg />
    </div>
  );
};

export default GoBack;
