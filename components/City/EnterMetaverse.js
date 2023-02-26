const EnterMetaverse = () => {
  return (
    <div className="py-4 px-4 flex flex-col items-center justify-center bg-gradient-to-b from-[#9bc5f3] to-slate-100 mt-10 rounded-lg">
      <p className="text-lg font-semibold tracking-wider text-center font-lato text-chenkster-gray">
        We are developing an{' '}
        <span className="text-chenkster-blue">innovative</span> and{' '}
        <span className="text-chenkster-blue">immersive</span> way to find the
        travel advice you are looking for.
      </p>
      <p className="my-4 text-lg font-semibold tracking-wider text-center font-lato text-chenkster-gray">
        Want to try it?
      </p>
      <button className="px-2 py-1 tracking-wider text-white bg-gradient rounded-xl font-lato">
        Enter the metaverse
      </button>
    </div>
  );
};

export default EnterMetaverse;
