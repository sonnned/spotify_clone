import {
  currentSongIndexState,
  currentTrackIdState,
  isPlayingState,
} from '@/atoms/songAtom';
import useSongInfo from '@/hooks/useSongInfo';
import useSpotify from '@/hooks/useSpotify';
import {
  ArrowUturnLeftIcon,
  ArrowsRightLeftIcon,
} from '@heroicons/react/24/outline';
import {
  BackwardIcon,
  ForwardIcon,
  NoSymbolIcon,
  PauseCircleIcon,
  PlayCircleIcon,
  SpeakerWaveIcon,
  SpeakerXMarkIcon,
} from '@heroicons/react/24/solid';
import { debounce } from 'lodash';
import { useSession } from 'next-auth/react';
import { useCallback, useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { playlistState } from '@/atoms/playlistAtom';
import { userProductState } from '@/atoms/userAtom';

const Player = () => {
  const spotifyApi = useSpotify();
  const { data: session, status } = useSession();
  const [currentTrackId, setCurrentTrackId] =
    useRecoilState(currentTrackIdState);
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);
  const [currentSongIndex, setCurrentSongIndex] = useRecoilState(
    currentSongIndexState
  );
  const playlist = useRecoilValue(playlistState);
  const [volume, setVolume] = useState(100);
  const [audio, setAudio] = useState(null);
  const userProduct = useRecoilValue(userProductState);

  const songInfo = useSongInfo();

  const fetchCurrentSong = async () => {
    if (!songInfo) {
      spotifyApi.getMyCurrentPlayingTrack().then((res) => {
        setCurrentTrackId(res.body?.item?.id);
      });

      spotifyApi.getMyCurrentPlaybackState().then((res) => {
        setIsPlaying(res.body?.is_playing);
      });
    }
  };

  const handlePlayPause = () => {
    if (userProduct === 'free') {
      if (!audio) return;

      if (isPlaying) {
        setIsPlaying(false);
        audio.pause();
      } else {
        setIsPlaying(true);
        audio.play();
      }
    } else {
      spotifyApi.getMyCurrentPlaybackState().then((res) => {
        if (res.body?.is_playing) {
          spotifyApi.pause();
          setIsPlaying(false);
          audio.pause();
        } else {
          spotifyApi.play();
          setIsPlaying(true);
          audio.play();
        }
      });
    }
  };

  useEffect(() => {
    if (spotifyApi.getAccessToken() && !currentTrackId) {
      fetchCurrentSong();
      setVolume(100);
    }
  }, [currentTrackIdState, spotifyApi, session]);

  const debouncedAdjustVolume = useCallback(
    debounce((volume) => {
      spotifyApi.setVolume(volume).catch((err) => console.log(err));
    }, 500),
    []
  );

  useEffect(() => {
    if ((volume) => 0 && volume <= 100) {
      if (userProduct !== 'free') {
        debouncedAdjustVolume(volume);
      }
    }
  }, [volume]);

  const handleVolumeChange = (e) => {
    setVolume(e.target.value);
    audio.volume = volume / 100;
  };

  const handleEndedSong = () => {
    if (currentSongIndex < playlist.tracks.items.length - 1) {
      setCurrentSongIndex(currentSongIndex + 1);
      setCurrentTrackId(playlist.tracks.items[currentSongIndex + 1].track.id);
    } else {
      setCurrentSongIndex(0);
      setCurrentTrackId(playlist.tracks.items[0].track.id);
    }
  };

  const handleRandomSong = () => {
    const randomIndex = Math.floor(
      Math.random() * playlist.tracks.items.length
    );

    setCurrentSongIndex(randomIndex);
    setCurrentTrackId(playlist.tracks.items[randomIndex].track.id);
  };

  const handlePrevSong = () => {
    if (currentSongIndex > 0) {
      setCurrentSongIndex(currentSongIndex - 1);
      setCurrentTrackId(playlist.tracks.items[currentSongIndex - 1].track.id);
    } else {
      setCurrentSongIndex(playlist.tracks.items.length - 1);
      setCurrentTrackId(
        playlist.tracks.items[playlist.tracks.items.length - 1].track.id
      );
    }
  };

  const handleNextSong = () => {
    if (currentSongIndex < playlist.tracks.items.length - 1) {
      setCurrentSongIndex(currentSongIndex + 1);
      setCurrentTrackId(playlist.tracks.items[currentSongIndex + 1].track.id);
    } else {
      setCurrentSongIndex(0);
      setCurrentTrackId(playlist.tracks.items[0].track.id);
    }
  };

  return (
    <div className="h-24 bg-gradient-to-b from-black to-gray-900 text-white grid grid-cols-3 text-xs md:text-base px-2 md:px-8">
      {songInfo && playlist ? (
        <>
          <div className="hidden">
            <audio
              src={songInfo?.preview_url || ''}
              autoPlay={isPlaying}
              muted={volume <= 0}
              ref={setAudio}
              controls
              onEnded={() => handleEndedSong()}
            />
          </div>
          <div className="flex items-center space-x-4">
            <img
              className="hidden md:inline h-10 w-10"
              src={songInfo?.album.images?.[0].url}
              width={40}
              height={40}
              alt={songInfo?.name}
            />
            <div>
              <h3>{songInfo?.name}</h3>
              <p>{songInfo?.artists?.[0]?.name}</p>
            </div>
          </div>

          <div className="flex items-center justify-evenly">
            <ArrowsRightLeftIcon
              className="button"
              onClick={() => handleRandomSong()}
            />
            <BackwardIcon className="button" onClick={() => handlePrevSong()} />
            {songInfo?.preview_url ? (
              isPlaying ? (
                <PauseCircleIcon
                  onClick={() => handlePlayPause()}
                  className="button w-10 h-10"
                />
              ) : (
                <PlayCircleIcon
                  onClick={() => handlePlayPause()}
                  className="button w-10 h-10"
                />
              )
            ) : (
              <NoSymbolIcon className="button w-10 h-10 cursor-not-allowed opacity-90 hover:scale-100" />
            )}

            <ForwardIcon className="button" onClick={() => handleNextSong()} />
            <ArrowUturnLeftIcon
              className="button"
              onClick={() => handlePrevSong()}
            />
          </div>

          <div className="flex items-center space-x-3 md:space-x-4 justify-end pr-5">
            {volume <= 0 ? (
              <SpeakerXMarkIcon className="button cursor-default" />
            ) : (
              <SpeakerWaveIcon className="button cursor-default" />
            )}
            <input
              type="range"
              min={0}
              max={100}
              value={volume}
              onChange={(e) => handleVolumeChange(e)}
              className="w-14 md:w-28 bg-gray-700 cursor-pointer h-2 rounded-md bg-gradient-to-r from-green-400 to-green-500 appearance-none outline-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-moz-range-progress]:bg-red-600"
            />
          </div>
        </>
      ) : (
        <>
          <div className="flex items-center space-x-4">
            <div className="hidden h-10 w-10 md:inline bg-gray-600 rounded animate-pulse"></div>
            <div>
              <h3 className="h-4 w-16 bg-gray-600 rounded animate-pulse mb-2"></h3>
              <p className="h-4 w-16 bg-gray-600 rounded animate-pulse"></p>
            </div>
          </div>
          <div className="flex items-center justify-evenly">
            <div className=" h-6 w-6 bg-gray-600 rounded-full animate-pulse"></div>
            <div className=" h-6 w-6 bg-gray-600 rounded-full animate-pulse"></div>
            <div className=" h-10 w-10 bg-gray-600 rounded-full animate-pulse"></div>

            <div className=" h-6 w-6 bg-gray-600 rounded-full animate-pulse"></div>
            <div className=" h-6 w-6 bg-gray-600 rounded-full animate-pulse"></div>
          </div>
          <div className="flex items-center space-x-3 md:space-x-4 justify-end pr-5">
            <div className=" h-6 w-6 bg-gray-600 rounded-full animate-pulse"></div>
            <div className="w-14 md:w-28 bg-gray-600 h-3 rounded-md appearance-none outline-none animate-pulse"></div>
          </div>
        </>
      )}
    </div>
  );
};

export default Player;
