import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import AdminPanel from './pages/AdminPanel';
import Events from './pages/Events';
import Announcements from './pages/Announcements';
import Members from './pages/Members';
import ProtectedRoute from './components/ProtectedRoute';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/events" element={<Events />} />
          <Route path="/admin" element={ <ProtectedRoute adminOnly={true}>
      <AdminPanel />
    </ProtectedRoute>} />
          <Route path="/announcements" element={<Announcements />} />
          <Route path="/members" element={ <ProtectedRoute>
      <Members />
    </ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute>
      <Profile />
    </ProtectedRoute>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
