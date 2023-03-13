const Preference = ({ prefernce, checkedOptions, handleCheckboxChange }) => {
  return (
    <label
      key={prefernce}
      className="inline-flex items-center gap-2 mt-3 mr-3 font-medium text-gray-700"
    >
      <input
        type="checkbox"
        value={prefernce}
        checked={checkedOptions.includes(prefernce)}
        onChange={() => handleCheckboxChange(prefernce)}
        className="w-5 h-5 text-gray-600 form-checkbox"
      />
      {prefernce}
    </label>
  );
};

export default Preference;
