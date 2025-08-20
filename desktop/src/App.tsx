import './App.css';
import { useState } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';

import Sidebar from './components/Sidebar/Sidebar';
import ChatWindow from './components/ChatWindow/ChatWindow';
import AppHeader from './components/AppHeader';
import SignInPage from './pages/SignInPage';
import NotFoundPage from './pages/NotFoundPage';
import ErrorPage from './pages/ErrorPage';
import SettingsPage from './pages/SettingsPage';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  return (
    <Router>
      <div className="min-h-screen w-full bg-gradient-to-br from-green-100 via-white to-blue-100 flex flex-col">
        <AppHeader />
        <div className="flex-1 flex items-center justify-center">
          <div className="relative flex w-full max-w-6xl h-[90vh] rounded-2xl shadow-2xl overflow-hidden border border-gray-200 bg-white/90">
            {/* Only show Sidebar on ChatWindow route */}
            <Routes>
              <Route
                path="/"
                element={
                  <>
                    <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
                    <main className="flex-1 relative flex flex-col">
                      <ChatWindow />
                    </main>
                  </>
                }
              />
              <Route path="/signin" element={<main className="flex-1 relative flex flex-col"><SignInPage /></main>} />
              <Route path="/settings" element={<main className="flex-1 relative flex flex-col"><SettingsPage /></main>} />
              <Route path="/error" element={<main className="flex-1 relative flex flex-col"><ErrorPage /></main>} />
              <Route path="*" element={<main className="flex-1 relative flex flex-col"><NotFoundPage /></main>} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App
