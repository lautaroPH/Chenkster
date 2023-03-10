import ProfileData from '../EditProfile/ProfileData';
import ProfileDescription from './ProfileDescription';
import ProfileLevel from './ProfileLevel';

const Profile = ({ description, language, location, username }) => {
  return (
    <>
      {username === 'super admin' && <ProfileLevel />}
      <ProfileDescription description={description} />
      {language.length > 0 && (
        <div className="w-4/5 mt-5">
          <h4 className="font-semibold text-chenkster-gray font-lato">
            Languages
          </h4>
          <div className="flex flex-wrap w-full mt-2 gap-y-3 gap-x-5">
            <ProfileData data={language} />
          </div>
        </div>
      )}
      {location.length > 0 && (
        <div className="w-4/5 mt-5">
          <h4 className="font-semibold text-chenkster-gray font-lato">
            Location
          </h4>
          <div className="flex flex-wrap w-full mt-2 gap-y-3 gap-x-5">
            <ProfileData data={location} />
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;
