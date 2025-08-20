import './App.css';
import { useState } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';

import Sidebar from './components/Sidebar/Sidebar';
import ChatWindow from './components/ChatWindow/ChatWindow';
import AppHeader from './components/AppHeader';
import SignInPage from './pages/SignInPage';
import NotFoundPage from './pages/NotFoundPage';
import ErrorPage from './pages/ErrorPage';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  return (
    <Router>
      <div className="min-h-screen w-full bg-gradient-to-br from-green-100 via-white to-blue-100 flex flex-col">
        <AppHeader />
        <div className="flex-1 flex items-center justify-center">
          <div className="relative flex w-full max-w-6xl h-[90vh] rounded-2xl shadow-2xl overflow-hidden border border-gray-200 bg-white/90">
            <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
            <main className="flex-1 relative flex flex-col">
              <Routes>
                <Route path="/" element={<ChatWindow />} />
                <Route path="/signin" element={<SignInPage />} />
                <Route path="/error" element={<ErrorPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </main>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App
