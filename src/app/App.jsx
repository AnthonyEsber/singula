import { useEffect } from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import { setLastViewedPage } from '../store/uiSlice';
import ProtectedRoute from '../routes/ProtectedRoute';
import MainLayout from '../layouts/MainLayout';
import Landing from '../routes/Landing';
import Login from '../routes/Login';
import Register from '../routes/Register';
import UserlandLayout from '../layouts/UserlandLayout';
import Dashboard from '../routes/Dashboard';
import Editor from '../routes/Editor';
import SharedResume from '../routes/SharedResume';
import Loader from '../components/Loader/Loader';

const SKIP = ['/', '/login', '/register'];

function RouteTracker() {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const user = useSelector((s) => s.auth.user);
  useEffect(() => {
    if (user && !SKIP.includes(pathname)) dispatch(setLastViewedPage(pathname));
  }, [pathname, user, dispatch]);
  return null;
}

function App() {
  const authStatus = useSelector((s) => s.auth.status);
  const resumesStatus = useSelector((s) => s.resumes.status);
  const isLoading = authStatus === 'loading' || resumesStatus === 'loading';

  return (
    <>
      <BrowserRouter>
        <RouteTracker />
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>
          <Route element={<ProtectedRoute />}>
            <Route element={<UserlandLayout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/dashboard/edit/:id" element={<Editor />} />
            </Route>
          </Route>
          <Route path="/share/:id" element={<SharedResume />} />
        </Routes>
      </BrowserRouter>
      {isLoading && <Loader />}
    </>
  );
}

export default App;
