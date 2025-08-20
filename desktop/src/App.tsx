import './App.css';
import Sidebar from './components/Sidebar/Sidebar';


function App() {
  return (
    <div className="app-layout" style={{ display: 'flex', height: '100vh' }}>
      <Sidebar />
      {/* Main chat/mail area will go here */}
      <main style={{ flex: 1, background: '#f5f5f5' }}>
        {/* Placeholder for main content */}
      </main>
    </div>
  );
}

export default App
