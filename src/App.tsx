import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomeMenu from './pages/HomeMenu';
import CharacterRoster from './pages/CharacterRoster';
import CharacterCreator from './pages/CharacterCreator';
import CampaignMenu from './pages/CampaignMenu';
import AdventureView from './pages/AdventureView';
import MyAdventures from './pages/MyAdventures';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeMenu />} />
        <Route path="/roster" element={<CharacterRoster />} />
        <Route path="/create-character" element={<CharacterCreator />} />
        <Route path="/campaigns" element={<CampaignMenu />} />
        <Route path="/my-adventures" element={<MyAdventures />} />
        <Route path="/adventure" element={<AdventureView />} />
      </Routes>
    </Router>
  );
}

export default App;
