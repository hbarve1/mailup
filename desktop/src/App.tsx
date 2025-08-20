import './App.css';


import Sidebar from './components/Sidebar/Sidebar';
import ChatWindow from './components/ChatWindow/ChatWindow';
import React, { useState } from 'react';


function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  return (
    <div className="app-layout flex h-screen">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <main className="flex-1 bg-gray-100 relative">
        {/* Toggle button for sidebar */}
        {!sidebarOpen && (
          <button
            className="absolute top-4 left-4 z-20 bg-blue-500 text-white px-3 py-2 rounded-full shadow hover:bg-blue-600 transition"
            onClick={() => setSidebarOpen(true)}
          >
            ☰
          </button>
        )}
        <ChatWindow />
      </main>
    </div>
  );
}

export default App
