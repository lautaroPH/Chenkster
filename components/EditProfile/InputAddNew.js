import CrossSvg from '../Svg/CrossSvg';

const InputAddNew = ({ name, handleChange, handleClick, handleKeyDown }) => {
  return (
    <div className="flex items-center justify-between w-1/5 px-2 py-1 text-xs font-semibold text-white rounded-md placeholder:text-gray-100 bg-gradient font-lato">
      <input
        name={name}
        className="w-5/6 text-xs font-semibold text-white bg-transparent rounded-md placeholder:text-gray-100 font-lato focus:outline-none"
        type="text"
        placeholder="Add new"
        onChange={handleChange}
        autoFocus
        autoComplete="off"
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleKeyDown();
          }
        }}
      />
      <button type="button" onClick={handleClick}>
        <CrossSvg />
      </button>
    </div>
  );
};

export default InputAddNew;
