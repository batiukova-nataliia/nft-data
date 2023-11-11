/* eslint-disable max-len */
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Collection } from '../types/Collection';
import { NFT } from '../types/NFT';

type Props = {
  collection: Collection,
  // eslint-disable-next-line react/require-default-props
};

export const CollectionCard: React.FC<Props> = ({
  collection,
}) => {

  const baseUrl = 'https://raw.githubusercontent.com/batiukova-nataliia/nft-data/main/';

  const totalSum = collection.collection.reduce((acc, item: NFT) => acc + item.price, 0);

  return (
    <div className="collection__card">

        <img
          src={`${baseUrl}${collection.mainImg}`}
          className="collection__card__photo"
          alt="collectionImg"
        />
        <div className="collection__card__container">
          <div className="collection__card-title"
          >
            {collection.title}

          </div>
          <div className="collection__card-price">
            {`Total sum: ${totalSum} ETH`}
          </div>

          <NavLink
        className="collection__card-button"
        to={`/collection/${collection.id}`}
      >
  See more
      </NavLink>


        </div>
    </div>
  );
};
