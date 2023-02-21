const LabelProfile = ({ title, htmlFor }) => {
  return (
    <label
      htmlFor={htmlFor}
      className="ml-1 font-semibold font-lato text-chenkster-gray"
    >
      {title}
    </label>
  );
};

export default LabelProfile;
