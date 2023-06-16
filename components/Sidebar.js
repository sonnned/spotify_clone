import {
  HomeIcon,
  MagnifyingGlassIcon,
  BuildingLibraryIcon,
  PlusCircleIcon,
  HeartIcon,
} from '@heroicons/react/24/outline';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import useSpotify from '@/hooks/useSpotify';
import { useRecoilState } from 'recoil';
import { playlistAtom, playlistState } from '@/atoms/playlistAtom';
import { delay } from 'lodash';

const Sidebar = () => {
  const spotifyApi = useSpotify();
  const { data: session, status } = useSession();
  const [playlists, setPlaylists] = useState([]);
  const [playlistId, setPlaylistId] = useRecoilState(playlistAtom);
  const [playlist, setPlaylist] = useRecoilState(playlistState);

  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      spotifyApi.getUserPlaylists().then((data) => {
        setPlaylists(data.body.items);

        if (data.body.items.length > 0 && !playlistId) {
          setPlaylistId(data.body.items[0].id);
        }
      });
    }
  }, [session, spotifyApi]);

  const handlePlaylistClick = (id) => {
    setPlaylistId('');
    setPlaylist(null);
    delay(function () {
      setPlaylistId(id);
    }, 500);
  };

  return (
    <div className="text-gray-500 p-5 text-sm border-r border-gray-900 overflow-y-scroll h-screen scrollbar-hide lg:text-sm sm:max-w-[12rem] lg:max-w-[15rem] hidden md:inline-flex pb-36">
      <div className="space-y-4">
        <button className="flex items-center space-x-2 hover:text-white">
          <HomeIcon className="h-5 w-5" />
          <p>Home</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-white">
          <MagnifyingGlassIcon className="h-5 w-5" />
          <p>Search</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-white">
          <BuildingLibraryIcon className="h-5 w-5" />
          <p>Your library</p>
        </button>
        <hr className="border-t-[0.1px] border-gray-900" />

        <button className="flex items-center space-x-2 hover:text-white">
          <PlusCircleIcon className="h-5 w-5" />
          <p>Create playlist</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-white">
          <HeartIcon className="h-5 w-5" />
          <p>Liked songs</p>
        </button>
        <hr className="border-t-[0.1px] border-gray-900" />
        {playlists.length
          ? playlists.map((playlist, index) => (
              <p
                className="cursor-pointer hover:text-white"
                key={index}
                onClick={() => handlePlaylistClick(playlist.id)}>
                {playlist.name}
              </p>
            ))
          : new Array(5)
              .fill(0)
              .map((_, index) => (
                <p
                  className="h-5 w-full bg-gray-600 animate-pulse rounded"
                  key={index}></p>
              ))}
      </div>
    </div>
  );
};

export default Sidebar;
