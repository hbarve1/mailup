import React from 'react';


const SettingsPage: React.FC = () => {
  // Dummy user and integrations for UI demo
  const user = {
    name: 'Alice',
    email: 'alice@gmail.com',
    avatar: 'https://i.pravatar.cc/150?img=1',
  };
  const integrations = [
    { id: 'gmail', name: 'Gmail', connected: true },
    { id: 'outlook', name: 'Outlook', connected: false },
    { id: 'yahoo', name: 'Yahoo', connected: false },
  ];

  return (
    <div className="flex flex-col items-center justify-center h-full w-full p-6">
      <h2 className="text-2xl font-bold mb-4">Settings</h2>
      <div className="w-full max-w-xl space-y-8">
        {/* Profile */}
        <section className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-2">Profile</h3>
          <div className="flex items-center space-x-4 mb-4">
            <img src={user.avatar} alt="avatar" className="w-16 h-16 rounded-full border" />
            <div>
              <div className="font-medium">{user.name}</div>
              <div className="text-gray-500 text-sm">{user.email}</div>
            </div>
          </div>
          <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Edit Profile</button>
        </section>

        {/* Integrations */}
        <section className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-2">Mail Integrations</h3>
          <ul className="space-y-2">
            {integrations.map((int) => (
              <li key={int.id} className="flex items-center justify-between">
                <span>{int.name}</span>
                {int.connected ? (
                  <button className="px-3 py-1 bg-green-500 text-white rounded">Connected</button>
                ) : (
                  <button className="px-3 py-1 bg-gray-300 text-gray-700 rounded hover:bg-blue-400 hover:text-white">Connect</button>
                )}
              </li>
            ))}
          </ul>
        </section>

        {/* Notifications */}
        <section className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-2">Notifications</h3>
          <label className="flex items-center space-x-2">
            <input type="checkbox" className="form-checkbox" defaultChecked />
            <span>Email notifications</span>
          </label>
          <label className="flex items-center space-x-2 mt-2">
            <input type="checkbox" className="form-checkbox" />
            <span>Desktop notifications</span>
          </label>
        </section>

        {/* Theme */}
        <section className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-2">Theme</h3>
          <select className="border rounded px-3 py-2">
            <option value="light">Light</option>
            <option value="dark">Dark</option>
            <option value="system">System Default</option>
          </select>
        </section>

        {/* Sign out */}
        <section className="flex justify-end">
          <button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">Sign Out</button>
        </section>
      </div>
    </div>
  );
};

export default SettingsPage;
