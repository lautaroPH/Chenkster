import AboutChenkster from '@/components/AboutChenkster/AboutChenkster';
import useUser from '@/hooks/useUser';

export default function Home() {
  const user = useUser();
  console.log(user);

  return (
    <div className="relative flex flex-col items-center w-full h-screen overflow-hidden">
      <AboutChenkster />
    </div>
  );
}
