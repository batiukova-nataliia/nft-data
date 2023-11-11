/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable max-len */
import { useEffect, useState } from 'react';
import classNames from 'classnames';
import { Loader } from './Loader';
import { CollectionCard } from './CollectionCard';
import { getAllCollection } from '../api/nft';
import { Collection } from '../types/Collection';
import { TopSlider } from './Slider';

export const HomePage = () => {
  const [nft, setnft] = useState<Collection[]>([]);
  const nftPerPage = 4;
  const categoriesPerPage = 3;

  const [currentPage, setCurrentPage] = useState(1);
  const getPaginationNftCount = () => {
    if (window.innerWidth < 768) {
      return 1;
    }

    if (window.innerWidth >= 768 && window.innerWidth < 1280) {
      return 3;
    }

    return nftPerPage;
  };

  const getPaginationCategoriesCount = () => {
    if (window.innerWidth < 768) {
      return 1;
    }

    if (window.innerWidth >= 768 && window.innerWidth < 1280) {
      return 2;
    }

    return categoriesPerPage;
  };

  const [paginationNftCount, setpaginationNftCount] = useState(getPaginationNftCount());
  const [paginationCategoriesCount, setPaginationCategoriesCount] = useState(getPaginationCategoriesCount());

  const updatePaginationItemCount = () => {
    setpaginationNftCount(getPaginationNftCount());
  };

  const updatePaginationCategoriesCount = () => {
    setPaginationCategoriesCount(getPaginationCategoriesCount());
  };

  useEffect(() => {
    getAllCollection().then((items) => setnft(items));
  })

  useEffect(() => {
    window.addEventListener('resize', updatePaginationItemCount);

    return () => {
      window.removeEventListener('resize', updatePaginationItemCount);
    };
  }, []);

  useEffect(() => {
    window.addEventListener('resize', updatePaginationCategoriesCount);

    return () => {
      window.removeEventListener('resize', updatePaginationCategoriesCount);
    };
  }, []);

  const startIndexIphones = (currentPage - 1) * paginationNftCount;
  const endIndexIphones = startIndexIphones + paginationNftCount;

  const nftToShow = nft.slice(startIndexIphones, endIndexIphones);
  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    setCurrentPage(currentPage - 1);
  };


  return (
    <div className="block">

      <TopSlider />


      <section className="page page__body page__section new-models">
        <div className="page__section-container">
          <h1 className="page__title">
            Art
          </h1>
          <div className="button__container button__container--home-page">
            <button
              type="button"
              onClick={prevPage}
              disabled={currentPage === 1}
              className="button button--pagination"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M10.4715 3.52861C10.2111 3.26826 9.78903 3.26826 9.52868 3.52861L5.52868 7.52861C5.26833 7.78896 5.26833 8.21107 5.52868 8.47141L9.52868 12.4714C9.78903 12.7318 10.2111 12.7318 10.4715 12.4714C10.7318 12.2111 10.7318 11.789 10.4715 11.5286L6.94289 8.00001L10.4715 4.47141C10.7318 4.21107 10.7318 3.78896 10.4715 3.52861Z" fill="#191919" />
              </svg>

            </button>
            <button
              type="button"
              onClick={nextPage}
              disabled={endIndexIphones >= nft.length}
              className="button button--pagination"
            >
              <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M0.528636 0.528606C0.788986 0.268256 1.2111 0.268256 1.47145 0.528606L5.47145 4.52861C5.73179 4.78896 5.73179 5.21107 5.47145 5.47141L1.47145 9.47141C1.2111 9.73176 0.788986 9.73176 0.528636 9.47141C0.268287 9.21107 0.268287 8.78896 0.528636 8.52861L4.05723 5.00001L0.528636 1.47141C0.268287 1.21107 0.268287 0.788955 0.528636 0.528606Z" fill="#191919" />
              </svg>

            </button>

          </div>

        </div>

        <div className="collection__catalog grid grid--tablet grid--desktop">
          {nftToShow.length > 0 ? (
            nftToShow.map((nftCollection: Collection, index: number) => {
              const classNumberMobile = index % 2;
              const classNumberTablet = index % 3;
              const classNumberTabletSmall = index % 2;
              const classNumberDesktop = index % 4;

              return (
                <div
                  className={classNames('grid__item', {
                    'grid__item--mobile--1-3': classNumberMobile === 0,
                    'grid__item--mobile--4-6': classNumberMobile === 1,

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
                  <CollectionCard
                    key={nftCollection.id}
                    collection={nftCollection}
                  />
                </div>
              );
            })
          ) : (
            <Loader />
          )}
        </div>
      </section>

    </div>

  );
};
