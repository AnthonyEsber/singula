import { BrowserRouter, Route, Routes } from 'react-router';
import { useSelector } from 'react-redux';
import './App.css';
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
import LoggedInRoute from '../routes/LoggedInRoute';

function App() {
  const authStatus = useSelector((s) => s.auth.status);
  const resumesStatus = useSelector((s) => s.resumes.status);
  const isLoading = authStatus === 'loading' || resumesStatus === 'loading';

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Landing />} />
            <Route element={<LoggedInRoute />}>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Route>
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
