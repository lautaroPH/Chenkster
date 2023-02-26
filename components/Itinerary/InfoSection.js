const InfoSection = ({ title, info, children }) => {
  return (
    <div className="px-4 py-2 bg-transparent shadow-md mt-7 drop-shadow-2xl rounded-2xl">
      <h4 className="my-4 text-xl font-bold text-center font-lato text-chenkster-blue">
        {title}
      </h4>
      <p className="mb-2 text-sm font-semibold tracking-wide text-center font-lato text-chenkster-gray">
        {info}
      </p>
      {children}
    </div>
  );
};

export default InfoSection;
