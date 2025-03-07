import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import LanguageSwitcher from './components/LanguageSwitcher';
import { getEnv } from './utils/env';

function App() {
  const env = getEnv();
  console.log('Environment:', env);

  return (
    <Router>
      <LanguageSwitcher />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;