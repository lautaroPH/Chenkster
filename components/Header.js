import GoBack from './GoBack';
import LightBulbSvg from './Svg/LightBulbSvg';

const Header = ({ title }) => {
  return (
    <header className="flex items-center justify-between w-4/5 mt-10">
      <GoBack />
      <h4 className="text-lg font-bold font-lato text-chenkster-blue">
        {title}
      </h4>
      <LightBulbSvg />
    </header>
  );
};

export default Header;
