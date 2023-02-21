import Header from './Header';
import WorldLightSvg from './Svg/WorldLightSvg';

const Layout = ({ title, children }) => {
  return (
    <div className="relative flex flex-col items-center w-full min-h-screen overflow-hidden">
      <div className="relative z-20 flex flex-col items-center w-full">
        <Header title={title} />

        {children}
      </div>
      <div className="absolute bottom-0 left-0 right-0 -z-10">
        <WorldLightSvg />
      </div>
    </div>
  );
};

export default Layout;
