import { Routes, Route } from 'react-router-dom';
import Signup from './pages/Signup';
import { Toaster } from 'sonner';
import Login from './pages/Login';
import Homepage from './pages/Homepage';
import Dashboard from './pages/Dashboard';
import PrivateRoutes from './components/PrivateRoutes';

export default function App() {
  return (
    <div>
      <Routes>
        {/* Public Routes */}
        <Route path="/register" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        {/* Private Routes for 'user' role */}
        <Route element={<PrivateRoutes allowrole={['user']} />}>
          <Route path="/" element={<Homepage />} />
        </Route>

        {/* Private Routes for 'admin' role */}
        <Route element={<PrivateRoutes allowrole={['admin']} />}>
          <Route path="/" element={<Homepage />} /> {/* Admin homepage or dashboard */}
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
      </Routes>

      {/* Toaster for notifications */}
      <Toaster position="bottom-right" />
    </div>
  );
}
