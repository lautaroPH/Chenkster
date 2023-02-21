import CrossSvg from '../Svg/CrossSvg';

const Data = ({ item, handleRemove, index }) => {
  return (
    <div className="flex items-center justify-between w-1/5 px-2 py-1 text-xs font-semibold text-white rounded-md bg-gradient font-lato">
      <span className="w-5/6 overflow-hidden tracking-wider text-ellipsis whitespace-nowrap">
        {item}
      </span>
      <button type="button" onClick={() => handleRemove(index)}>
        <CrossSvg />
      </button>
    </div>
  );
};

export default Data;
