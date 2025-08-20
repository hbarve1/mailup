import React from 'react';
import MailIntegrationList from './MailIntegrationList';


const Sidebar: React.FC = () => {
  return (
    <aside className="sidebar bg-white border-r border-gray-200 w-64 h-full flex flex-col shadow-sm">
      <MailIntegrationList />
    </aside>
  );
};

export default Sidebar;
