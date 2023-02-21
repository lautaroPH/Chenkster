const ButtonSave = ({ disabled }) => {
  return (
    <div className="flex items-center justify-center w-full mt-2">
      <button
        disabled={disabled}
        type="submit"
        className="w-1/2 py-1 mb-4 text-center text-white rounded-md bg-gradient font-poppins disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Save
      </button>
    </div>
  );
};

export default ButtonSave;
