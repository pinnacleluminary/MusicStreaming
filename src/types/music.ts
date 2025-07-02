export interface Track {
  id: string;
  title: string;
  duration: number;
  audioUrl: string;
  genre: string;
}

export interface Album {
  id: string;
  title: string;
  coverArt: string;
  artist: string;
  year: number;
  tracks: Track[];
}
