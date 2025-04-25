import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import VideoPage from './page/VideoPage';
import HomePage from './page/HomePage';
import GamePage from './page/GamePage';
import FormPage from './page/Formpage';
import DrawPage from './page/DrawPage';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/form" element={<FormPage />}/>
          <Route path="/video" element={<VideoPage />}/>
          <Route path="/game" element={<GamePage />}/>
          <Route path="/draw" element={<DrawPage />}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;