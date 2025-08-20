import React from 'react';

// Example mail integrations, replace with dynamic data as needed
const mailIntegrations = [
  { id: 'gmail', name: 'Gmail', icon: '📧' },
  { id: 'outlook', name: 'Outlook', icon: '📨' },
  { id: 'yahoo', name: 'Yahoo', icon: '✉️' },
  // Add more integrations here
];

const MailIntegrationList: React.FC = () => {
  return (
    <div className="mail-integration-list p-4">
      <h3 className="text-lg font-semibold mb-4 text-gray-700">Mail Integrations</h3>
      <ul className="space-y-2">
        {mailIntegrations.map((integration) => (
          <li
            key={integration.id}
            className="integration-item flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 cursor-pointer transition"
          >
            <span className="icon text-xl">{integration.icon}</span>
            <span className="name text-gray-800 font-medium">{integration.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MailIntegrationList;
