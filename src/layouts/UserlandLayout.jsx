import { Outlet } from 'react-router';
import Header from '../components/Header/Header';

function UserlandLayout() {
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

export default UserlandLayout;
