/* eslint-disable no-console */
/* eslint-disable max-len */

import { Collection } from '../types/Collection';
import { NFT } from '../types/NFT';

export interface CollectionDetailed extends Collection {
  id: number,
  category: string,
  name: string,
  price: number,
  photo: string,
  author: string,
  year: number,
}

const BASE_URL = 'https://raw.githubusercontent.com/batiukova-nataliia/nft-data/main/nft.json';

export function getAllCollection(): Promise<Collection[]> {
  return fetch(BASE_URL)
    .then(response => response.json());
}

export function getAll(): Promise<NFT[]> {
  return fetch(BASE_URL)
    .then(response => response.json());
}
