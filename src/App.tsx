import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import HomeMenu from './pages/HomeMenu';
import CharacterRoster from './pages/CharacterRoster';
import CharacterCreator from './pages/CharacterCreator';
import CampaignMenu from './pages/CampaignMenu';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeMenu />} />
        <Route path="/roster" element={<CharacterRoster />} />
        <Route path="/create-character" element={<CharacterCreator />} />
        <Route path="/campaigns" element={<CampaignMenu />} />
      </Routes>
    </Router>
  );
}

export default App;
