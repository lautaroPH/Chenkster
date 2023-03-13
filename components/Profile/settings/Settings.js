import FeatureComingModal from '@/components/FeatureComingModal';
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
import { logout } from '@/services/auth/logout';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Option from './Option';

const SettingsProfile = () => {
  const [isOpen, setIsOpen] = useState(false);
  const supabase = useSupabaseClient();
  const router = useRouter();
  const handleLogout = async () => {
    await logout(supabase);
    router.push('/');
  };
  return (
    <>
      <div className="w-3/4 mt-10">
        <Link href={'/edit/profile'}>
          <Option Icon={PencilSvg} title={'Personal Data'} border />
        </Link>
        <button onClick={() => setIsOpen(true)} className="w-full text-start">
          <Option Icon={PaymentSvg} title={'Payment Information'} border />
        </button>
        <button onClick={() => setIsOpen(true)} className="w-full text-start">
          <Option Icon={BillingSvg} title={'Billing information'} />
        </button>
      </div>
      <div className="w-3/4 mt-8">
        <button onClick={() => setIsOpen(true)} className="w-full text-start">
          <Option Icon={PrivacySvg} title={'Privacy'} border />
        </button>
        <button onClick={() => setIsOpen(true)} className="w-full text-start">
          <Option Icon={SafetySvg} title={'Safety'} border />
        </button>
        <button onClick={() => setIsOpen(true)} className="w-full text-start">
          <Option Icon={TwoFactorSvg} title={'Two-factor authentication'} />
        </button>
      </div>
      <div className="w-3/4 mt-8">
        <button onClick={() => setIsOpen(true)} className="w-full text-start">
          <Option Icon={ThemeSvg} title={'Theme'} border />
        </button>
        <button onClick={() => setIsOpen(true)} className="w-full text-start">
          <Option Icon={LanguageSvg} title={'Language'} border />
        </button>
        <Link href={'/chat/admin'}>
          <Option Icon={HelpSvg} title={'Help'} border />
        </Link>
        <button onClick={handleLogout} className="w-full text-start">
          <Option Icon={LogoutSvg} title={'log out'} />
        </button>
        <FeatureComingModal isOpen={isOpen} setIsOpen={setIsOpen} />
      </div>
    </>
  );
};

export default SettingsProfile;
