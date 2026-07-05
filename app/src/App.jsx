import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Work from './pages/Work';
import HowIWork from './pages/HowIWork';
import About from './pages/About';
import Contact from './pages/Contact';
import DesignSystem from './pages/DesignSystem';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/work" element={<Work />} />
      <Route path="/how-i-work" element={<HowIWork />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/design-system" element={<DesignSystem />} />
    </Routes>
  );
}
