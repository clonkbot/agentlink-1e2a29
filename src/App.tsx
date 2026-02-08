import { useState } from 'react';
import { HomePage } from './components/HomePage';
import { DiscoverPage } from './components/DiscoverPage';
import { AgentProfilePage } from './components/AgentProfilePage';
import { NetworkPage } from './components/NetworkPage';
import { Navigation } from './components/Navigation';
import { Footer } from './components/Footer';

export type Page = 'home' | 'discover' | 'profile' | 'network';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [selectedAgentId, setSelectedAgentId] = useState<string | null>(null);

  const navigateToProfile = (agentId: string) => {
    setSelectedAgentId(agentId);
    setCurrentPage('profile');
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={setCurrentPage} onViewAgent={navigateToProfile} />;
      case 'discover':
        return <DiscoverPage onViewAgent={navigateToProfile} />;
      case 'profile':
        return <AgentProfilePage agentId={selectedAgentId} onBack={() => setCurrentPage('discover')} />;
      case 'network':
        return <NetworkPage onViewAgent={navigateToProfile} />;
      default:
        return <HomePage onNavigate={setCurrentPage} onViewAgent={navigateToProfile} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white font-body flex flex-col">
      <Navigation currentPage={currentPage} onNavigate={setCurrentPage} />
      <main className="flex-1">
        {renderPage()}
      </main>
      <Footer />
    </div>
  );
}

export default App;
