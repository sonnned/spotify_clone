import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { signOut, useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { shuffle } from 'lodash';
import { playlistState, playlistAtom } from '@/atoms/playlistAtom';
import { useRecoilState, useRecoilValue } from 'recoil';
import useSpotify from '@/hooks/useSpotify';
import Songs from './Songs';
import { userProductState } from '@/atoms/userAtom';
import Link from 'next/link';

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
    <div className="flex-grow h-screen overflow-y-scroll scrollbar-hide relative">
      <header className="absolute top-5 right-2 md:right-8 flex flex-col items-end gap-2">
        {session && (
          <div
            className="flex items-center bg-black space-x-1 md:space-x-3 opacity-90 hover:opacity-80 cursor-pointer rounded-full p-1 pr-2 text-white"
            onClick={() => signOut()}>
            <img
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
      <div className="absolute top-5 left-2 md:left-8 flex items-center md:space-x-3 opacity-90 bg-black rounded-full p-1">
        <Link href={'https://github.com/sonnned'} target="_blank">
          <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
            class="h-10 w-10 fill-white">
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M12 2C6.477 2 2 6.463 2 11.97c0 4.404 2.865 8.14 6.839 9.458.5.092.682-.216.682-.48 0-.236-.008-.864-.013-1.695-2.782.602-3.369-1.337-3.369-1.337-.454-1.151-1.11-1.458-1.11-1.458-.908-.618.069-.606.069-.606 1.003.07 1.531 1.027 1.531 1.027.892 1.524 2.341 1.084 2.91.828.092-.643.35-1.083.636-1.332-2.22-.251-4.555-1.107-4.555-4.927 0-1.088.39-1.979 1.029-2.675-.103-.252-.446-1.266.098-2.638 0 0 .84-.268 2.75 1.022A9.607 9.607 0 0 1 12 6.82c.85.004 1.705.114 2.504.336 1.909-1.29 2.747-1.022 2.747-1.022.546 1.372.202 2.386.1 2.638.64.696 1.028 1.587 1.028 2.675 0 3.83-2.339 4.673-4.566 4.92.359.307.678.915.678 1.846 0 1.332-.012 2.407-.012 2.734 0 .267.18.577.688.48 3.97-1.32 6.833-5.054 6.833-9.458C22 6.463 17.522 2 12 2Z"></path>
          </svg>
        </Link>
        <Link
          href={'https://www.linkedin.com/in/alejandro-garcia-fullstack/'}
          target="_blank">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            data-supported-dps="24x24"
            class="h-10 w-10 fill-white pr-2">
            <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z"></path>
          </svg>
        </Link>
      </div>
      {playlist ? (
        <section
          className={`flex items-end space-x-7 bg-gradient-to-b to-black ${color} h-80 text-white p-8`}>
          <img
            className="h-44 w-44 shadow-2xl"
            src={
              playlist?.images?.[0]?.url ||
              'https://source.unsplash.com/featured/300x201'
            }
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
