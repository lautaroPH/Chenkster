import InfoChenkster from './InfoChenkster';
import ChenksterLogo from '../ChenksterLogo';
import WorldSvg from '../Svg/WorldSvg';

const AboutChenkster = ({ user }) => {
  return (
    <>
      <ChenksterLogo />
      <InfoChenkster user={user} />
      <div className="absolute bottom-0 left-0 right-0 z-0 flex items-center justify-center m-auto sm:left-20 md:left-40 lg:left-64 xl:left-96">
        <WorldSvg />
      </div>
    </>
  );
};

export default AboutChenkster;
