import {
  currentSongIndexState,
  currentTrackIdState,
  isPlayingState,
} from '@/atoms/songAtom';
import { userProductState } from '@/atoms/userAtom';
import useSpotify from '@/hooks/useSpotify';
import { millisToMinutes } from '@/lib/time';
import Image from 'next/image';
import { useRecoilState, useRecoilValue } from 'recoil';

const Song = ({ order, track }) => {
  const spotifyApi = useSpotify();
  const [currentTrackId, setCurrentTrackId] =
    useRecoilState(currentTrackIdState);
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);
  const [currentSongIndex, setCurrentSongIndex] = useRecoilState(
    currentSongIndexState
  );
  const userProduct = useRecoilValue(userProductState);

  const playSong = async () => {
    setCurrentTrackId(track.track.id);
    setCurrentSongIndex(order);
    if (userProduct !== 'free') {
      setIsPlaying(true);
      spotifyApi.play({
        uris: [track.track.uri],
      });
    }
  };

  return (
    <div
      className={`grid grid-cols-2 text-gray-500 py-4 px-5 hover:bg-gray-900 rounded-lg cursor-pointer ${
        currentSongIndex === order && 'bg-gray-900'
      } transition duration-200 ease-in-out`}
      onClick={() => playSong()}>
      <div className="flex items-center space-x-4">
        <p>{order + 1}</p>
        <Image
          className="h-10 w-10 rounded"
          src={track.track.album.images[0].url}
          width={40}
          height={40}
          alt={track.track.name}
        />
        <div>
          <p className="w-36 lg:w-64 truncate text-white">{track.track.name}</p>
        </div>
      </div>
      <div className="flex items-center justify-between ml-auto md:ml-0">
        <p className="hidden md:inline">{track.track.album.name}</p>
        <p>{millisToMinutes(track.track.duration_ms)}</p>
      </div>
    </div>
  );
};

export default Song;
