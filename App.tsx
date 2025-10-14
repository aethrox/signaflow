import { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { TopNavbar } from './components/TopNavbar';
import { Dashboard } from './components/pages/Dashboard';
import { Employees } from './components/pages/Employees';
import { Templates } from './components/pages/Templates';
import { Campaigns } from './components/pages/Campaigns';

export default function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');

  const getBreadcrumbs = () => {
    const breadcrumbMap: { [key: string]: string[] } = {
      dashboard: ['Dashboard'],
      employees: ['Dashboard', 'Employees'],
      templates: ['Dashboard', 'Templates'],
      campaigns: ['Dashboard', 'Campaigns'],
      settings: ['Dashboard', 'Settings'],
    };
    return breadcrumbMap[currentPage] || ['Dashboard'];
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'employees':
        return <Employees />;
      case 'templates':
        return <Templates />;
      case 'campaigns':
        return <Campaigns />;
      case 'settings':
        return (
          <div className="p-8">
            <h1 className="text-[#1F2937] text-3xl font-bold mb-2">Settings</h1>
            <p className="text-[#6B7280]">Settings page coming soon...</p>
          </div>
        );
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Sidebar currentPage={currentPage} onNavigate={setCurrentPage} />
      <TopNavbar breadcrumbs={getBreadcrumbs()} />

      <main className="ml-[240px] mt-16 p-8">
        {renderPage()}
      </main>
    </div>
  );
}
