import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Landing from './pages/Landing';
import RoleSelection from './pages/RoleSelection';
import Home from './pages/Home';
import MapView from './pages/MapView';
import TransformerDetails from './pages/TransformerDetails';
import Prediction from './pages/Prediction';
import Reports from './pages/Reports';

const App: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/role-select" element={<RoleSelection />} />
          <Route path="/dashboard" element={<Home />} />
          <Route path="/map" element={<MapView />} />
          <Route path="/details" element={<TransformerDetails />} />
          <Route path="/details/:id" element={<TransformerDetails />} />
          <Route path="/prediction" element={<Prediction />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
