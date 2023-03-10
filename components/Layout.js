import Header from './Header';
import NavbarBottom from './NavbarBottom';
import WorldLightSvg from './Svg/WorldLightSvg';

const Layout = ({ title, children, username, notShow, url, role }) => {
  return (
    <div className="relative flex flex-col items-center w-full max-w-3xl min-h-screen m-auto overflow-hidden">
      <div className="relative z-20 flex flex-col items-center w-full">
        <Header title={title} url={url} />
        <div className="flex flex-col items-center justify-center w-4/5 mt-10 mb-14 ">
          {children}
        </div>
      </div>
      {!notShow && <NavbarBottom username={username} role={role} />}
      <div className="absolute bottom-0 left-0 right-0 flex items-center justify-center m-auto -z-30">
        <WorldLightSvg />
      </div>
    </div>
  );
};

export default Layout;
