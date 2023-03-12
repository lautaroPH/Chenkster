import InstagramSvg from './Svg/InstagramSvg';
import LinkedinSvg from './Svg/LinkedinSvg';
import TiktokSvg from './Svg/TiktokSvg';
import TwitterSvg from './Svg/TwitterSvg';

const SocialIcon = ({ socialMediaName }) => {
  const nameLowerCase = socialMediaName.toLowerCase();
  if (nameLowerCase.includes('instagram')) {
    return <InstagramSvg />;
  } else if (nameLowerCase.includes('twitter')) {
    return <TwitterSvg />;
  } else if (nameLowerCase.includes('youtube')) {
    return <TiktokSvg />;
  } else if (nameLowerCase.includes('facebook')) {
    return <LinkedinSvg />;
  } else {
    return '';
  }
};

export default SocialIcon;
