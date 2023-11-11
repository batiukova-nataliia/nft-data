import './App.scss';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { Header } from './components/Header';
import { MenuMobile } from './components/MenuMobile';
import { HomePage } from './components/HomePage';
import { CollectionDetailed } from './components/CollectionDetailed';
import { Footer } from './components/Footer';
import { NotImplemented } from './components/NotImplemented';
import Cart from './components/Cart';
import { Favorites } from './components/Favorites';

const App = () => {
  const location = useLocation();

  return (
    <>
      <Routes>
        <Route
          path="menu"
          element={(
            <MenuMobile />)}
        />
      </Routes>

      {location.pathname !== '/menu' && (
        <>
          <Header
          />
          <main className="page">
            <div className="container">
              <Routes>

                <Route
                  path="/"
                  element={(
                    <HomePage />
                  )}
                />

                <Route path="/home" element={<Navigate to="/" replace />} />
                <Route
                  path="trending"
                  element={(
                    <NotImplemented />)}
                />
                <Route
                  path="memberships"
                  element={(
                    <NotImplemented />)}
                />
                <Route
                  path="music"
                  element={(
                    <NotImplemented />)}
                />

                <Route
                  path="liked"
                  element={(
                    <Favorites />
                  )}
                />

                <Route
                  path="basket"
                  element={(
                    <Cart />
                  )}
                />
                <Route
                  path="collection/:collectionId"
                  element={(
                    <CollectionDetailed
                    />
                  )}
                />


              </Routes>
            </div>
          </main>
          <Footer />

        </>
      )}

    </>
  )
}
export default App;
