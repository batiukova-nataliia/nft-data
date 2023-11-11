/* eslint-disable array-callback-return */
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAllCollection } from "../api/nft";
import { Collection } from "../types/Collection";
import { NFTCard } from "./NftCard";
import { NFT } from "../types/NFT";
import classNames from "classnames";

export const CollectionDetailed = (
) => {

  const { collectionId } = useParams();
  const [nftCollection, setnftCollection] = useState<Collection[]>([]);
  const [visibleCollection, setVisibleCollection] = useState<Collection | null>(null);

  useEffect(() => {
    getAllCollection().then((items) => setnftCollection(items));
  }, []);

  useEffect(() => {
    if (collectionId !== undefined) {
      const parsedCollectionId = parseInt(collectionId);
      const foundCollection = nftCollection.find((col) => col.id === parsedCollectionId);

      if (foundCollection) {
        setVisibleCollection(foundCollection);
      }
    }
  }, [collectionId, nftCollection]);

  return (

    <section className="page__section">
      <div className="page__title">{`"${visibleCollection?.title}" collection`}</div>
      <div className="page__description">{visibleCollection?.description}</div>
      <div className="shop__catalog grid grid--tablet grid--desktop">
        {visibleCollection?.collection.map((nft: NFT, index: number) => {
          const classNumberMobile = index % 2;
          const classNumberTablet = index % 3;
          const classNumberTabletSmall = index % 2;

          const classNumberDesktop = index % 4;

          return (
            <div className={classNames('grid__item', {
              'grid__item--mobile--1-2': classNumberMobile === 0,
              'grid__item--mobile--3-4': classNumberMobile === 1,

              'grid__item--tabletSmall--1-2': classNumberTabletSmall === 0,
              'grid__item--tabletSmall--3-4': classNumberTabletSmall === 1,

              'grid__item--tablet--1-2': classNumberTablet === 0,
              'grid__item--tablet--3-4': classNumberTablet === 1,
              'grid__item--tablet--5-6': classNumberTablet !== 1 && classNumberTablet !== 0,

              'grid__item--desktop--1-6': classNumberDesktop === 0,
              'grid__item--desktop--7-12': classNumberDesktop === 1,
              'grid__item--desktop--13-18': classNumberDesktop === 2,
              'grid__item--desktop--19-24': classNumberDesktop === 3,

            })}
            >
              <NFTCard
                nft={nft}
              />

            </div>
          );
        })}

      </div>

    </section>
  );
};