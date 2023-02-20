import InfoChenkster from './InfoChenkster';
import ChenksterLogo from '../ChenksterLogo';
import WorldSvg from '../Svg/WorldSvg';

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
