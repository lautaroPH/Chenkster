import ChenksterSvg from './ChenksterSvg';
import InfoChenkster from './InfoChenkster';
import WorldSvg from './WorldSvg';

const AboutChenkster = () => {
  return (
    <>
      <div className="mt-16">
        <ChenksterSvg />
      </div>
      <InfoChenkster />
      <div className="absolute bottom-0 left-0 right-0 z-0">
        <WorldSvg />
      </div>
    </>
  );
};

export default AboutChenkster;
