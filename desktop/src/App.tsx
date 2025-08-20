import './App.css';

import Sidebar from './components/Sidebar/Sidebar';
import ChatWindow from './components/ChatWindow/ChatWindow';


function App() {
  return (
    <div className="app-layout" style={{ display: 'flex', height: '100vh' }}>
      <Sidebar />
      <main style={{ flex: 1, background: '#f5f5f5' }}>
        <ChatWindow />
      </main>
    </div>
  );
}

export default App
