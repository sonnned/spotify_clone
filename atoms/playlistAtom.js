import { atom } from 'recoil';

export const playlistState = atom({
  key: 'playlistState',
  default: null,
});

export const playlistAtom = atom({
  key: 'playlistIdState',
  default: '',
});
