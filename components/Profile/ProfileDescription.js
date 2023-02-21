const ProfileDescription = ({ description }) => {
  const formattedDescription = description.replace(/\r?\n/g, '</br>');
  return (
    <div className="w-4/5 mt-8">
      <h4 className="font-semibold text-chenkster-gray font-lato">
        Description
      </h4>
      <p
        dangerouslySetInnerHTML={{ __html: formattedDescription }}
        className="font-lato text-sm tracking-[1px] text-chenkster-gray opacity-70"
      ></p>
    </div>
  );
};

export default ProfileDescription;
