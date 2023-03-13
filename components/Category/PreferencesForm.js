import Preference from './Preference';

const PreferencesForm = ({
  handleSubmit,
  checkedOptions,
  preferences,
  handleCheckboxChange,
}) => {
  return (
    <form
      onSubmit={(e) => handleSubmit(e, checkedOptions)}
      className="px-10 py-5"
    >
      <div className="flex flex-col items-start justify-center mb-4">
        {preferences.map((prefernce) => (
          <Preference
            key={prefernce}
            prefernce={prefernce}
            checkedOptions={checkedOptions}
            handleCheckboxChange={handleCheckboxChange}
          />
        ))}
      </div>

      <button
        type="submit"
        className="inline-block w-full px-5 py-2 mt-3 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Save
      </button>
    </form>
  );
};

export default PreferencesForm;
