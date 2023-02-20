import { loginWithEmail } from '@/utils/loginWithEmail';
import Link from 'next/link';
import { useState } from 'react';
import EyeSlashSvg from './Svg/EyeSlashSvg';
import EyeSvg from './Svg/EyeSvg';

const LoginForm = () => {
  const [showFirstPassword, setShowFirstPassword] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { data, error } = await loginWithEmail(email, password);

    if (error) {
      alert(error.message);
      return;
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="relative flex flex-col items-center justify-center mt-12 w-96"
    >
      <input
        type="email"
        name="email"
        id="email"
        autoComplete="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
        className="w-full px-4 py-3 mb-3 text-base text-gray-700 placeholder-gray-500 border border-gray-400 rounded-lg focus:shadow-outline font-lato"
      />
      <div className="relative w-full">
        <input
          type={showFirstPassword ? 'text' : 'password'}
          name="password"
          id="password"
          autoComplete="new-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Choose your password"
          className="w-full px-4 py-3 mb-3 text-base text-gray-700 placeholder-gray-500 border border-gray-400 rounded-lg focus:shadow-outline font-lato"
        />
        <div
          onClick={() => setShowFirstPassword(!showFirstPassword)}
          className="absolute top-[14px] right-4 text-gray-500"
        >
          {showFirstPassword ? <EyeSvg /> : <EyeSlashSvg />}
        </div>
      </div>
      <p className="mt-2 mb-4 text-lg font-medium font-lato text-chenkster-blue">
        Forgot Password?
      </p>
      <button
        type="submit"
        className="w-full py-3 font-semibold text-center text-white rounded-lg opacity-90 background-gradient font-poppins"
      >
        Login
      </button>
      <p className="mb-4 font-semibold text-center w-72 mt-7 font-poppins text-chenkster-gray">
        Don’t have an account?{' '}
        <Link
          href={'/register'}
          className="font-semibold font-poppins text-chenkster-blue"
        >
          Sign up
        </Link>
      </p>
    </form>
  );
};

export default LoginForm;
