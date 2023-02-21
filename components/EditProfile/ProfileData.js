import Data from './Data';

const ProfileData = ({ data, handleRemove }) => {
  return (
    <>
      {data.map((item, index) => (
        <Data
          key={index}
          item={item}
          index={index}
          handleRemove={handleRemove}
        />
      ))}
    </>
  );
};

export default ProfileData;
