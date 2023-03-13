const FormLabel = ({ name, title }) => {
  return (
    <label
      htmlFor={name}
      className="mt-2 mb-3 font-semibold font-lato text-chenkster-gray"
    >
      {title}
    </label>
  );
};

export default FormLabel;
