const CategorySelected = ({ title, removeItem }) => {
  return (
    <div className="flex items-center justify-center px-2 py-1 text-sm font-semibold text-white rounded-lg bg-chenkster-gray">
      {title}
      <button
        type="button"
        className="ml-2 text-sm font-bold text-white"
        onClick={() => removeItem(title)}
      >
        x
      </button>
    </div>
  );
};

export default CategorySelected;
