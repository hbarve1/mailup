
import { useMailStore } from '../../store/mailStore';

const MailIntegrationList: React.FC = () => {
  const integrations = useMailStore((state) => state.integrations);
  const selectedIntegrationId = useMailStore((state) => state.selectedIntegrationId);
  const setSelectedIntegration = useMailStore((state) => state.setSelectedIntegration);
  const users = useMailStore((state) => state.users);
  const currentUserId = useMailStore((state) => state.currentUserId);
  // For demo, show the first user with the selected integration as the active account
  const activeAccount = selectedIntegrationId
    ? users.find(
        (u) => u.email.toLowerCase().includes(selectedIntegrationId)
      )
    : null;

  return (
    <div className="mail-integration-list p-4">
      <h3 className="text-lg font-semibold mb-4 text-gray-700">Mail Integrations</h3>
      <ul className="space-y-2 mb-4">
        {integrations.map((integration) => (
          <li
            key={integration.id}
            className={`integration-item flex items-center gap-3 p-2 rounded-lg cursor-pointer transition border ${selectedIntegrationId === integration.id ? 'bg-green-100 border-green-400' : 'hover:bg-gray-100 border-transparent'}`}
            onClick={() => setSelectedIntegration(integration.id)}
          >
            <span className="icon text-xl">{integration.icon}</span>
            <span className="name text-gray-800 font-medium">{integration.name}</span>
            {selectedIntegrationId === integration.id && (
              <span className="ml-auto text-xs text-green-600 font-bold">Active</span>
            )}
          </li>
        ))}
      </ul>
      {activeAccount && (
        <div className="flex items-center gap-3 p-2 bg-green-50 rounded-lg border border-green-200">
          <img src={activeAccount.avatar} alt={activeAccount.name} className="w-8 h-8 rounded-full object-cover" />
          <div>
            <div className="font-semibold text-green-800">{activeAccount.name}</div>
            <div className="text-xs text-green-600">{activeAccount.email}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MailIntegrationList;
