import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { signOut, useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { shuffle } from 'lodash';
import { playlistState, playlistAtom } from '@/atoms/playlistAtom';
import { useRecoilState, useRecoilValue } from 'recoil';
import useSpotify from '@/hooks/useSpotify';
import Songs from './Songs';
import { userProductState } from '@/atoms/userAtom';
import Image from 'next/image';

const colors = [
  'from-indigo-500',
  'from-blue-500',
  'from-green-500',
  'from-yellow-500',
  'from-red-500',
  'from-pink-500',
  'from-purple-500',
];

const Center = () => {
  const { data: session } = useSession();
  const spotifyApi = useSpotify();
  const [color, setColor] = useState(null);
  const playlistId = useRecoilValue(playlistAtom);
  const [playlist, setPlaylist] = useRecoilState(playlistState);
  const [userProduct, setUserProduct] = useRecoilState(userProductState);

  useEffect(() => {
    spotifyApi.getMe().then((data) => {
      setUserProduct(data.body.product);
    });
  }, []);

  useEffect(() => {
    setColor(shuffle(colors).pop());
  }, [playlistId]);

  useEffect(() => {
    if (playlistId) {
      spotifyApi
        .getPlaylist(playlistId)
        .then((data) => {
          setPlaylist(data.body);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [spotifyApi, playlistId]);

  return (
    <div className="flex-grow h-screen overflow-y-scroll scrollbar-hide">
      <header className="absolute top-5 right-8">
        {session && (
          <div
            className="flex items-center bg-black space-x-3 opacity-90 hover:opacity-80 cursor-pointer rounded-full p-1 pr-2 text-white"
            onClick={() => signOut()}>
            <Image
              className="rounded-full"
              src={session?.user?.image}
              width={40}
              height={40}
              alt={session?.user?.name}
            />
            <h2>{session?.user.name}</h2>
            <ChevronDownIcon className="h-5 w-5" />
          </div>
        )}
      </header>
      {playlist ? (
        <section
          className={`flex items-end space-x-7 bg-gradient-to-b to-black ${color} h-80 text-white p-8`}>
          <Image
            className="h-44 w-44 shadow-2xl"
            src={playlist?.images?.[0]?.url}
            width={200}
            height={200}
            alt={playlist?.name}
          />
          <div>
            <p>PLAYLIST</p>
            <h1 className="text-2xl md:text-3xl xl:text-5xl font-bold">
              {playlist?.name}
            </h1>
          </div>
        </section>
      ) : (
        <section
          className={`flex items-end space-x-7 bg-gradient-to-b to-black ${color} h-80 text-white p-8 `}>
          <div className="h-44 w-44 shadow-2xl bg-gray-600 rounded animate-pulse"></div>
          <div>
            <p className="h-5 w-24 bg-gray-600 animate-pulse rounded mb-2"></p>
            <h1 className="md:text-3xl xl:text-5xl h-10 w-28 bg-gray-600 animate-pulse rounded"></h1>
          </div>
        </section>
      )}
      <div>
        <Songs />
      </div>
    </div>
  );
};

export default Center;
