/* eslint-disable import/no-extraneous-dependencies *//* eslint-disable max-len */

import { NavLink } from 'react-router-dom';

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className="footer">
      <div className="footer__container">
        <NavLink to="/">
          <div className="header__icon--logo" />
        </NavLink>

        <div className="footer__nav">
          <a
            href="https://github.com/batiukova-nataliia"
            target="_blank"
            className="footer-link"
            rel="noreferrer"
          >
            github
          </a>
          <a
            href="https://github.com/batiukova-nataliia"
            target="_blank"
            className="footer-link"
            rel="noreferrer"
          >
            contacts
          </a>
          <a
            href="https://github.com/batiukova-nataliia"
            target="_blank"
            className="footer-link"
            rel="noreferrer"
          >
            rights
          </a>
        </div>

        <div className="footer__back">
          <div className="footer__back-link">
            Back to top
          </div>
          <button
            type="button"
            className="button button--arrow-up"
            onClick={scrollToTop}
          >
            <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M0.528636 0.528606C0.788986 0.268256 1.2111 0.268256 1.47145 0.528606L5.47145 4.52861C5.73179 4.78896 5.73179 5.21107 5.47145 5.47141L1.47145 9.47141C1.2111 9.73176 0.788986 9.73176 0.528636 9.47141C0.268287 9.21107 0.268287 8.78896 0.528636 8.52861L4.05723 5.00001L0.528636 1.47141C0.268287 1.21107 0.268287 0.788955 0.528636 0.528606Z" fill="#191919" />
            </svg>
          </button>

        </div>
      </div>

    </footer>
  );
};
