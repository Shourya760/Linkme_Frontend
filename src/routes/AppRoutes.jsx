import { Routes, Route, Navigate } from 'react-router-dom';
import Home from '../pages/Home.jsx';
import Settings from '../pages/Settings.jsx';
import Portfolio from '../pages/Portfolio.jsx';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/portfolio" element={<Portfolio />} />
      <Route path="/p/:username" element={<Portfolio />} />
      <Route path="/:username" element={<Portfolio />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
