import BillingSvg from '@/components/Svg/BillingSvg';
import HelpSvg from '@/components/Svg/HelpSvg';
import LanguageSvg from '@/components/Svg/LanguageSvg';
import LogoutSvg from '@/components/Svg/LogoutSvg';
import PaymentSvg from '@/components/Svg/PaymentSvg';
import PencilSvg from '@/components/Svg/PencilSvg';
import PrivacySvg from '@/components/Svg/PrivacySvg';
import SafetySvg from '@/components/Svg/SafetySvg';
import ThemeSvg from '@/components/Svg/ThemeSvg';
import TwoFactorSvg from '@/components/Svg/TwoFactorSvg';
import { logout } from '@/utils/logout';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Option from './Option';

const SettingsProfile = () => {
  const supabase = useSupabaseClient();
  const router = useRouter();
  const handleLogout = () => {
    logout(supabase);
    router.push('/');
  };
  return (
    <>
      <div className="w-3/4 mt-10">
        <Link href={'/edit/profile'}>
          <Option Icon={PencilSvg} title={'Personal Data'} border />
        </Link>
        <Option Icon={PaymentSvg} title={'Payment Information'} border />
        <Option Icon={BillingSvg} title={'Billing information'} />
      </div>
      <div className="w-3/4 mt-8">
        <Option Icon={PrivacySvg} title={'Privacy'} border />
        <Option Icon={SafetySvg} title={'Safety'} border />
        <Option Icon={TwoFactorSvg} title={'Two-factor authentication'} />
      </div>
      <div className="w-3/4 mt-8">
        <Option Icon={ThemeSvg} title={'Theme'} border />
        <Option Icon={LanguageSvg} title={'Language'} border />
        <Option Icon={HelpSvg} title={'Help'} border />
        <button onClick={handleLogout} className="w-full text-start">
          <Option Icon={LogoutSvg} title={'log out'} />
        </button>
      </div>
    </>
  );
};

export default SettingsProfile;
