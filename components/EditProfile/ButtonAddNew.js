const ButtonAddNew = ({ handleClick, addNew }) => {
  return (
    <button
      onClick={handleClick}
      className="text-sm text-gray-400 font-lato"
      type="button"
    >
      {addNew ? 'Save' : 'Add new'}
    </button>
  );
};

export default ButtonAddNew;
