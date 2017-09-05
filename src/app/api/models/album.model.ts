import { Image } from './image.model';

export interface Album {
  id: string;
  images: Image[];
  name: string;
  uri: string;
}
