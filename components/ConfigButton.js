import Link from 'next/link';
import ConfigSvg from './Svg/ConfigSvg';

const ConfigButton = () => {
  return (
    <Link href="/profile/options/settings">
      <ConfigSvg />
    </Link>
  );
};

export default ConfigButton;
