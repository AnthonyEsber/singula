import { BrowserRouter, Route, Routes } from 'react-router';
import './App.css';
import MainLayout from '../layouts/MainLayout';
import Landing from '../routes/Landing';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Landing />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
