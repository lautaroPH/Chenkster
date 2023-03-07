import BillingSvg from '@/components/Svg/BillingSvg';
import HelpSvg from '@/components/Svg/HelpSvg';
import LanguageSvg from '@/components/Svg/LanguageSvg';
import PencilSvg from '@/components/Svg/PencilSvg';
import PrivacySvg from '@/components/Svg/PrivacySvg';
import SafetySvg from '@/components/Svg/SafetySvg';
import Link from 'next/link';
import Option from './Option';

const Help = () => {
  return (
    <>
      <div className="w-3/4 mt-10">
        <Link href={'/chat/admin'}>
          <Option Icon={PencilSvg} title={'Get Help'} border />
        </Link>
        <Link href={'/chat/admin'}>
          <Option Icon={HelpSvg} title={'Report A Problem'} border />
        </Link>
        <Link href={'/chat/admin'}>
          <Option Icon={LanguageSvg} title={'Send A Feedback'} />
        </Link>
      </div>
      <div className="w-3/4 mt-10">
        <Option Icon={PrivacySvg} title={'Terms and conditions'} border />
        <Option Icon={SafetySvg} title={'Privacy policy'} border />
        <Link href={'/chat/admin'}>
          <Option Icon={BillingSvg} title={'Contact Us'} />
        </Link>
      </div>
    </>
  );
};

export default Help;
