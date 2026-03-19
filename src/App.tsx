import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Home from './pages/Home';
import Events from './pages/Events';
import EventDetails from './pages/EventDetails';
import Registration from './pages/Registration';
import About from './pages/About';
import Committee from './pages/Committee';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import OpeningSequence from './components/OpeningSequence/OpeningSequence';
// import Timeline from './pages/Timeline';

function App() {
  return (
    <Router>
      <OpeningSequence />
      <Routes>
        {/* Admin Routes (outside Layout - no navbar/footer) */}
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />

        {/* Public Routes (inside Layout with navbar/footer) */}
        <Route path="/" element={<Layout><Home /></Layout>} />
        <Route path="/events" element={<Layout><Events /></Layout>} />
        <Route path="/events/:id" element={<Layout><EventDetails /></Layout>} />
        <Route path="/register/:id" element={<Layout><Registration /></Layout>} />
        <Route path="/about" element={<Layout><About /></Layout>} />
        <Route path="/commitee" element={<Layout><Committee /></Layout>} />
        {/* <Route path="/timeline" element={<Layout><Timeline /></Layout>} /> */}
      </Routes>
    </Router>
  );
}

export default App;

