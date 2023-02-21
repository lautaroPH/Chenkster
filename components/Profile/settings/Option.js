const Option = ({ Icon, title, border }) => {
  return (
    <div className="flex items-center mt-2">
      <div className="pb-3">
        <Icon />
      </div>
      <p
        className={`${
          border && 'border-b border-gray-300'
        } w-full pb-3 ml-5 font-lato text-chenkster-gray`}
      >
        {title}
      </p>
    </div>
  );
};

export default Option;
