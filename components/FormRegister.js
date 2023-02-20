import { registerWithEmail } from '@/utils/registerWIthEmail';
import Link from 'next/link';
import { useState } from 'react';
import EyeSlashSvg from './Svg/EyeSlashSvg';
import EyeSvg from './Svg/EyeSvg';

const FormRegister = () => {
  const [showFirstPassword, setShowFirstPassword] = useState(false);
  const [showSecondPassword, setShowSecondPassword] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      alert('Passwords do not match');
      return;
    }

    const { data, error } = await registerWithEmail(email, password);

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
        type="text"
        name="username"
        id="username"
        autoComplete="username"
        placeholder="Enter your name"
        className="w-full px-4 py-3 mb-3 text-base text-gray-700 placeholder-gray-500 border border-gray-400 rounded-lg focus:shadow-outline font-lato"
      />
      <input
        type="email"
        name="email"
        id="email"
        value={email}
        autoComplete="email"
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
      <div className="relative w-full">
        <input
          type={showSecondPassword ? 'text' : 'password'}
          name="password2"
          id="password2"
          autoComplete="new-password"
          value={password2}
          onChange={(e) => setPassword2(e.target.value)}
          placeholder="Confirm your password"
          className="w-full px-4 py-3 mb-3 text-base text-gray-700 placeholder-gray-500 border border-gray-400 rounded-lg focus:shadow-outline font-lato"
        />
        <div
          onClick={() => setShowSecondPassword(!showSecondPassword)}
          className="absolute top-[14px] right-4 text-gray-500"
        >
          {showSecondPassword ? <EyeSvg /> : <EyeSlashSvg />}
        </div>
      </div>

      <button
        type="submit"
        className="w-full py-3 font-semibold text-center text-white rounded-lg opacity-90 background-gradient font-poppins"
      >
        Sign Up
      </button>
      <p className="mb-4 font-semibold text-center w-72 mt-7 font-poppins text-chenkster-gray">
        Already have an account?{' '}
        <Link
          href={'/login'}
          className="font-semibold font-poppins text-chenkster-blue"
        >
          Login
        </Link>
      </p>
    </form>
  );
};

export default FormRegister;