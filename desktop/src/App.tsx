import './App.css';


import Sidebar from './components/Sidebar/Sidebar';
import ChatWindow from './components/ChatWindow/ChatWindow';
import React, { useState } from 'react';
import AppHeader from './components/AppHeader';


function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-green-100 via-white to-blue-100 flex flex-col">
      <AppHeader />
      <div className="flex-1 flex items-center justify-center">
        <div className="relative flex w-full max-w-6xl h-[90vh] rounded-2xl shadow-2xl overflow-hidden border border-gray-200 bg-white/90">
          <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
          <main className="flex-1 relative flex flex-col">
            {/* Toggle button for sidebar */}
            {!sidebarOpen && (
              <button
                className="absolute top-4 left-4 z-20 bg-green-500 text-white px-3 py-2 rounded-full shadow hover:bg-green-600 transition"
                onClick={() => setSidebarOpen(true)}
              >
                ☰
              </button>
            )}
            <ChatWindow />
          </main>
        </div>
      </div>
    </div>
  );
}

export default App
