import InstagramSvg from '@/components/Svg/InstagramSvg';
import LinkedinSvg from '@/components/Svg/LinkedinSvg';
import TiktokSvg from '@/components/Svg/TiktokSvg';
import TwitterSvg from '@/components/Svg/TwitterSvg';

const FollowUs = () => {
  return (
    <div className="flex flex-col items-center w-full justify-center -mt-2">
      <p className="font-lato font-bold">Follow us on socials</p>
      <div className="flex items-center gap-7 mt-3 mb-10">
        <a>
          <LinkedinSvg />
        </a>
        <a>
          <InstagramSvg />
        </a>
        <a>
          <TwitterSvg />
        </a>
        <a>
          <TiktokSvg />
        </a>
      </div>
    </div>
  );
};

export default FollowUs;
