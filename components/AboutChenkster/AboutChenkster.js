import InfoChenkster from './InfoChenkster';
import ChenksterLogo from '../ChenksterLogo';
import WorldLightSvg from '../Svg/WorldLightSvg';

const AboutChenkster = ({ user }) => {
  return (
    <>
      <ChenksterLogo />
      <InfoChenkster user={user} />
      <div className="absolute bottom-0 left-0 right-0 flex items-center justify-center m-auto -z-30">
        <WorldLightSvg />
      </div>
    </>
  );
};

export default AboutChenkster;
