import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import HomeMenu from './pages/HomeMenu';
import CharacterRoster from './pages/CharacterRoster';
import CharacterCreator from './pages/CharacterCreator';
import CampaignMenu from './pages/CampaignMenu';
import AdventureView from './pages/AdventureView';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeMenu />} />
        <Route path="/roster" element={<CharacterRoster />} />
        <Route path="/create-character" element={<CharacterCreator />} />
        <Route path="/campaigns" element={<CampaignMenu />} />
        <Route path="/adventure" element={<AdventureView />} />
      </Routes>
    </Router>
  );
}

export default App;
