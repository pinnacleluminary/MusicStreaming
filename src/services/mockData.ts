// src/services/mockData.ts
import { Album } from '../types/music';

export const mockAlbums: Album[] = [
  {
    id: '1',
    title: 'Sunset Melodies',
    coverArt: 'https://example.com/album1.jpg',
    artist: 'Various Artists',
    year: 2023,
    tracks: [
      {
        id: '101',
        title: 'Summer Breeze',
        duration: 180,
        audioUrl: 'https://example.com/track1.mp3',
        genre: 'Pop'
      },
      {
        id: '102',
        title: 'Ocean Waves',
        duration: 210,
        audioUrl: 'https://example.com/track2.mp3',
        genre: 'Ambient'
      }
    ]
  },
  {
    id: '2',
    title: 'Urban Rhythms',
    coverArt: 'https://example.com/album2.jpg',
    artist: 'Various Artists',
    year: 2023,
    tracks: [
      {
        id: '201',
        title: 'City Lights',
        duration: 195,
        audioUrl: 'https://example.com/track3.mp3',
        genre: 'Electronic'
      },
      {
        id: '202',
        title: 'Midnight Drive',
        duration: 225,
        audioUrl: 'https://example.com/track4.mp3',
        genre: 'Lo-fi'
      }
    ]
  }
];
