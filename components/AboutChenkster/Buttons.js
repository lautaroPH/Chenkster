import Link from 'next/link';

const Buttons = ({ user }) => {
  return (
    <div className="flex flex-col items-center justify-center w-80">
      <Link
        href={'/welcome'}
        className="w-full py-3 mt-5 font-semibold text-center text-white rounded-lg opacity-90 background-gradient font-poppins"
      >
        Explore the app
      </Link>
      {!user ? (
        <>
          <p className="w-64 mb-4 text-xl font-extrabold text-center mt-7 font-lato text-chenkster-gray">
            Or
          </p>
          <Link
            href={'/register'}
            className="w-full py-3 font-semibold text-center text-white rounded-lg opacity-90 background-gradient font-poppins"
          >
            Create a free account
          </Link>
        </>
      ) : (
        <>
          <p className="w-64 mb-4 text-xl font-extrabold text-center mt-7 font-lato text-chenkster-gray">
            Are you a chenkster?
          </p>
          <Link
            href={'/dashboard'}
            className="w-full py-3 font-semibold text-center text-white rounded-lg opacity-90 background-gradient font-poppins"
          >
            Enter the dashboard
          </Link>
        </>
      )}
    </div>
  );
};

export default Buttons;
