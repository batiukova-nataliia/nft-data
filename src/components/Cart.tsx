/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-plusplus */
/* eslint-disable max-len */
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { NotFoundItems } from './NotFound';
import { useAppSelector } from '../utils/hooks';
import { addItem, minusItem, removeItem } from '../redux/cartReducer';

export const Cart = () => {
  const { items } = useAppSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const sum = items.reduce((prev, current) => prev + current.price, 0);

  const baseUrl = 'https://raw.githubusercontent.com/batiukova-nataliia/nft-data/main/';
  const counts = items.map((item) => item.count);

  const calculateTotalForAllItems = () => {
    let totalTocart = 0;

    for (let i = 0; i < items.length; i++) {
      totalTocart += items[i].price * counts[i];
    }

    return totalTocart;
  };

  const calculateTotalItems = () => {
    let totalСounts = 0;

    for (let i = 0; i < counts.length; i++) {
      totalСounts += counts[i];
    }

    return totalСounts;
  };

  useEffect(() => {
    localStorage.setItem('sumToSave', sum.toString());
  }, [items]);

  const handleAdd = (index: number) => {
    const selectedNFT= items[index];

    dispatch(addItem(selectedNFT));
  };

  const handleRemove = (index: number) => {
    const selectedNFT= items[index];

    if (selectedNFT.count > 1) {
      dispatch(minusItem(selectedNFT));
    } else {
      dispatch(removeItem(selectedNFT));
    }
  };

  return (
    items.length > 0 ? (
      <div className="cart">
        <div className="filter__nav">
          <div className="filter__nav--1-item">
            <NavLink
              onClick={() => navigate(-1)}
              to="#"
              className="page__link"
            >
              Back
            </NavLink>
          </div>
          <div className="filter__nav--2-item">
            <h1 className="page__title">
              Cart
            </h1>
          </div>
        </div>
        <div className="cart__container">
          <div className="cart__items-container">
            {items.map((nft, index) => {
              return (
                <div className="cart__item">
                  <div className="cart__item--first-row">
                    <button
                      type="button"
                      className="cart__item-button--cres"
                      onClick={() => (dispatch(removeItem(nft)))}
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g id="Icons/Close">
                          <path
                            id="Union"
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M12.4716 4.4714C12.7319 4.21105 12.7319 3.78894
                         12.4716 3.52859C12.2112 3.26824
                         11.7891 3.26824 11.5288 3.52859L8.00016
                         7.05719L4.47157 3.52859C4.21122
                         3.26824 3.78911 3.26824 3.52876
                          3.52859C3.26841 3.78894 3.26841
                           4.21105 3.52876 4.4714L7.05735
                          7.99999L3.52876 11.5286C3.26841
                           11.7889 3.26841 12.211 3.52876
                           12.4714C3.78911 12.7317 4.21122
                           12.7317 4.47157 12.4714L8.00016
                           8.9428L11.5288 12.4714C11.7891
                           12.7317 12.2112 12.7317 12.4716
                           12.4714C12.7319 12.211 12.7319
                           11.7889 12.4716 11.5286L8.94297
                           7.99999L12.4716 4.4714Z"
                            fill="#B4BDC4"
                          />
                        </g>
                      </svg>
                    </button>
                    <img
        src={`${baseUrl}${nft.photo}`}
        alt="NFT Img"
                      className="cart__item-img"
                    />
                    <div className="cart__item-title">{nft.name}</div>
                  </div>

                  <div className="cart__item--second-row">
                    <div
                      className="cart__item--second-row__button-container"
                    >
                      <button
                        type="button"
                        className="cart__item-button
                        cart__cart-button--remove--mobile"
                        onClick={() => handleRemove(index)}
                        disabled={counts[index] === 1}
                      >
                        -

                      </button>
                      <div className="cart__cart-count--mobile">
                        {counts[index]}
                      </div>
                      <button
                        type="button"
                        className="cart__item-button cart__cart-button--add--mobile"
                        onClick={() => handleAdd(index)}
                      >
                        +
                      </button>

                    </div>
                    <p className="cart__item-price">
                      {`${nft.price * counts[index]} ETH`}
                    </p>

                  </div>

                </div>
              );
            })}

          </div>

          <div className="cart__checkout">
            <p className="cart__checkout-price">
              {`${calculateTotalForAllItems()} ETH`}
            </p>
            <p className="cart__checkout-text">
              Total for
              {' '}
              {calculateTotalItems()}
              {' '}
              items
            </p>

            <button
              type="button"
              className="cart__checkout-button"
            >
              <NavLink to="/trending" className="cart__checkout-button--text">
                Checkout
              </NavLink>

            </button>
          </div>

        </div>
      </div>
    )
      : (
        <NotFoundItems text="Items to buy are" />
      )
  );
};

export default Cart;
