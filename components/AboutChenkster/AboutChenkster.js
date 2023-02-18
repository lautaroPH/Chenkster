import InfoChenkster from './InfoChenkster';
import WorldSvg from '../WorldSvg';
import ChenksterLogo from '../ChenksterLogo';

const AboutChenkster = () => {
  return (
    <>
      <ChenksterLogo />
      <InfoChenkster />
      <div className="absolute bottom-0 left-0 right-0 z-0">
        <WorldSvg />
      </div>
    </>
  );
};

export default AboutChenkster;
