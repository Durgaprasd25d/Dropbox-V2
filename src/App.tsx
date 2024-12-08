import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { FileProvider } from './context/FileContext';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import SharedFiles from './pages/SharedFiles';
import StarredFiles from './pages/StarredFiles';
import RecentFiles from './pages/RecentFiles';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <FileProvider>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/shared"
              element={
                <PrivateRoute>
                  <SharedFiles />
                </PrivateRoute>
              }
            />
            <Route
              path="/starred"
              element={
                <PrivateRoute>
                  <StarredFiles />
                </PrivateRoute>
              }
            />
            <Route
              path="/recent"
              element={
                <PrivateRoute>
                  <RecentFiles />
                </PrivateRoute>
              }
            />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </FileProvider>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;

