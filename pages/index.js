import { Inter } from 'next/font/google';
import Sidebar from '@/components/Sidebar';
import Center from '@/components/Center';
import { getSession } from 'next-auth/react';
import Player from '@/components/Player';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <main className={`bg-black h-screen overflow-hidden ${inter.className}`}>
      <div className="flex">
        <Sidebar />
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
