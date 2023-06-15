import { playlistState } from '@/atoms/playlistAtom';
import { useRecoilState, useRecoilValue } from 'recoil';
import Song from './Song';
import {
  currentSongIndexState,
  currentTrackIdState,
  isPlayingState,
} from '@/atoms/songAtom';
import { useEffect } from 'react';

const Songs = () => {
  const playlist = useRecoilValue(playlistState);
  const [currentTrackId, setCurrentTrackId] =
    useRecoilState(currentTrackIdState);
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);
  const [currentSongIndex, setCurrentSongIndex] = useRecoilState(
    currentSongIndexState
  );

  useEffect(() => {
    if (playlist) {
      setCurrentTrackId(playlist.tracks.items[0].track.id);
      setCurrentSongIndex(0);
    }
  }, [playlist]);

  return (
    <div className="text-white px-8 flex flex-col space-y-1 pb-28">
      {playlist?.tracks.items.map((track, index) => (
        <Song key={track.track.id} track={track} order={index} />
      ))}
    </div>
  );
};

export default Songs;
