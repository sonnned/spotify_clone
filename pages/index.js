import { Inter } from 'next/font/google';
import Sidebar from '@/components/Sidebar';
import Center from '@/components/Center';
import { getSession } from 'next-auth/react';
import Player from '@/components/Player';
import { Bars3Icon } from '@heroicons/react/24/outline';
import { useState } from 'react';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <main className={`bg-black h-screen overflow-hidden ${inter.className}`}>
      <div
        className="absolute z-50 md:hidden top-24 left-2"
        onClick={() => setShowSidebar(!showSidebar)}>
        {!showSidebar && (
          <Bars3Icon className="h-10 w-10 text-white bg-black rounded-full p-1 cursor-pointer" />
        )}
      </div>
      <div className="flex">
        {<Sidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />}
        <Center />
      </div>
      <div className="sticky bottom-0">
        <Player />
      </div>
    </main>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  return {
    props: {
      session,
    },
  };
}
