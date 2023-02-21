import BillingSvg from '@/components/Svg/BillingSvg';
import HelpSvg from '@/components/Svg/HelpSvg';
import LanguageSvg from '@/components/Svg/LanguageSvg';
import PencilSvg from '@/components/Svg/PencilSvg';
import PrivacySvg from '@/components/Svg/PrivacySvg';
import SafetySvg from '@/components/Svg/SafetySvg';
import Option from './Option';

const Help = () => {
  return (
    <>
      <div className="w-3/4 mt-10">
        <Option Icon={PencilSvg} title={'Get Help'} border />
        <Option Icon={HelpSvg} title={'Report A Problem'} border />
        <Option Icon={LanguageSvg} title={'Send A Feedback'} />
      </div>
      <div className="w-3/4 mt-10">
        <Option Icon={PrivacySvg} title={'Terms and conditions'} border />
        <Option Icon={SafetySvg} title={'Privacy policy'} border />
        <Option Icon={BillingSvg} title={'Contact Us'} />
      </div>
    </>
  );
};

export default Help;
