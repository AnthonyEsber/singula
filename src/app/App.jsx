import { BrowserRouter, Route, Routes } from 'react-router';
import './App.css';
import MainLayout from '../layouts/MainLayout';
import Landing from '../routes/Landing';
import Login from '../routes/Login';
import Register from '../routes/Register';
import UserlandLayout from '../layouts/UserlandLayout';
import Dashboard from '../routes/Dashboard';
import Editor from '../routes/Editor';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
        <Route element={<UserlandLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/edit/:id" element={<Editor />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
