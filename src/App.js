import { Routes, Route } from "react-router-dom";
import LandingPage from "./Pages/LandingPage";
import LoginPage from "./Pages/LoginPage";
import SignupPage from "./Pages/SignupPage";
import OtpConfirmation from './Pages/OtpConfirmation';
import AnimeList from './Pages/AnimeList';
import AnimeVideos from './Pages/AnimeVideos';
function App() {
  return (
    <div>
     
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/SignupPage" element={<SignupPage />} />
          <Route path="/OtpConfirmation" element={<OtpConfirmation/>} />
          <Route path="/LoginPage" element={<LoginPage />} />
          <Route path="/AnimeList" element={<AnimeList/>} />
          <Route path="/AnimeVideos/:animeid" element={<AnimeVideos />} />
        </Routes>
  
    </div>
  );
}

export default App;
