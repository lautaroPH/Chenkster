import Chenkster from '@/public/images/chenksterLogo.png';
import Image from 'next/image';

const ChenksterLogo = () => {
  return (
    <div className="mt-16">
      <Image priority src={Chenkster} alt="Chenkster Logo" />
    </div>
  );
};

export default ChenksterLogo;
