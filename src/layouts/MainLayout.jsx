import { Outlet } from 'react-router';
import Header from '../components/Header/Header';

function MainLayout() {
  return (
    <>
      <header>
        <Header />
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default MainLayout;
