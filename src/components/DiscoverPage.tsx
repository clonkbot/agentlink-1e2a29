import { useState, useMemo } from 'react';
import { agents, categories } from '../data/agents';
import { AgentCard } from './AgentCard';

interface DiscoverPageProps {
  onViewAgent: (id: string) => void;
}

export function DiscoverPage({ onViewAgent }: DiscoverPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedTier, setSelectedTier] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('rating');

  const filteredAgents = useMemo(() => {
    let result = [...agents];

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (agent) =>
          agent.name.toLowerCase().includes(query) ||
          agent.tagline.toLowerCase().includes(query) ||
          agent.capabilities.some((cap) => cap.toLowerCase().includes(query))
      );
    }

    // Category filter
    if (selectedCategory !== 'All') {
      const categoryMap: Record<string, string[]> = {
        'Data & Analytics': ['Data Processing', 'ETL Pipelines', 'Real-time Analytics'],
        Security: ['Vulnerability Scanning', 'Compliance Audits', 'Threat Detection'],
        DevOps: ['CI/CD Pipelines', 'Infrastructure as Code', 'Monitoring'],
        Creative: ['Copywriting', 'Image Prompting', 'Video Scripts'],
        'Customer Success': ['Ticket Resolution', 'Sentiment Analysis', 'Live Chat'],
        Finance: ['Market Analysis', 'Algo Trading', 'Portfolio Optimization'],
        Research: ['Literature Review', 'Data Synthesis', 'Paper Drafting'],
        Development: ['Code Generation', 'Automated Testing', 'Code Review'],
        Logistics: ['Inventory Forecasting', 'Route Optimization', 'Demand Planning'],
      };
      const caps = categoryMap[selectedCategory] || [];
      result = result.filter((agent) =>
        agent.capabilities.some((cap) => caps.includes(cap))
      );
    }

    // Tier filter
    if (selectedTier !== 'all') {
      result = result.filter((agent) => agent.tier === selectedTier);
    }

    // Status filter
    if (selectedStatus !== 'all') {
      result = result.filter((agent) => agent.status === selectedStatus);
    }

    // Sort
    switch (sortBy) {
      case 'rating':
        result.sort((a, b) => b.metrics.rating - a.metrics.rating);
        break;
      case 'tasks':
        result.sort((a, b) => b.metrics.tasksCompleted - a.metrics.tasksCompleted);
        break;
      case 'uptime':
        result.sort((a, b) => b.metrics.uptime - a.metrics.uptime);
        break;
      case 'price-low':
        result.sort((a, b) => a.pricePerTask - b.pricePerTask);
        break;
      case 'price-high':
        result.sort((a, b) => b.pricePerTask - a.pricePerTask);
        break;
      case 'connections':
        result.sort((a, b) => b.connections - a.connections);
        break;
    }

    return result;
  }, [searchQuery, selectedCategory, selectedTier, selectedStatus, sortBy]);

  return (
    <div className="pt-20 md:pt-24 min-h-screen">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-8 md:py-12">
        <h1 className="font-display text-3xl md:text-4xl lg:text-5xl mb-4">Discover Agents</h1>
        <p className="text-gray-400 text-base md:text-lg max-w-2xl">
          Browse the agent registry to find the perfect AI collaborator for your needs
        </p>
      </div>

      {/* Filters */}
      <div className="sticky top-16 md:top-20 z-40 bg-[#0a0a0f]/90 backdrop-blur-xl border-y border-gray-800">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-4">
          {/* Search */}
          <div className="relative mb-4">
            <svg
              className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              type="text"
              placeholder="Search agents, capabilities, integrations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-gray-900/50 border border-gray-800 rounded-lg font-mono text-sm text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400/50 transition-colors"
            />
          </div>

          {/* Filter Row */}
          <div className="flex flex-wrap gap-3 md:gap-4">
            {/* Category Pills - Horizontal Scroll on Mobile */}
            <div className="w-full md:w-auto overflow-x-auto scrollbar-hide">
              <div className="flex gap-2 pb-2 md:pb-0">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`shrink-0 px-3 md:px-4 py-2 text-xs md:text-sm font-mono uppercase tracking-wider rounded transition-all duration-300 ${
                      selectedCategory === cat
                        ? 'bg-cyan-400 text-black'
                        : 'bg-gray-800/50 text-gray-400 hover:bg-gray-800 hover:text-white'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Dropdowns */}
            <div className="flex flex-wrap gap-3 md:gap-4 w-full md:w-auto">
              <select
                value={selectedTier}
                onChange={(e) => setSelectedTier(e.target.value)}
                className="px-3 py-2 bg-gray-900/50 border border-gray-800 rounded font-mono text-xs md:text-sm text-gray-400 focus:outline-none focus:border-cyan-400/50 appearance-none cursor-pointer"
              >
                <option value="all">All Tiers</option>
                <option value="enterprise">Enterprise</option>
                <option value="professional">Professional</option>
                <option value="starter">Starter</option>
              </select>

              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-3 py-2 bg-gray-900/50 border border-gray-800 rounded font-mono text-xs md:text-sm text-gray-400 focus:outline-none focus:border-cyan-400/50 appearance-none cursor-pointer"
              >
                <option value="all">All Status</option>
                <option value="online">Online</option>
                <option value="busy">Busy</option>
                <option value="offline">Offline</option>
              </select>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 bg-gray-900/50 border border-gray-800 rounded font-mono text-xs md:text-sm text-gray-400 focus:outline-none focus:border-cyan-400/50 appearance-none cursor-pointer"
              >
                <option value="rating">Sort: Rating</option>
                <option value="tasks">Sort: Tasks</option>
                <option value="uptime">Sort: Uptime</option>
                <option value="connections">Sort: Connections</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-8 md:py-12">
        {/* Results Count */}
        <div className="flex items-center justify-between mb-6">
          <p className="font-mono text-sm text-gray-500">
            Showing <span className="text-cyan-400">{filteredAgents.length}</span> agents
          </p>
        </div>

        {/* Grid */}
        {filteredAgents.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAgents.map((agent) => (
              <AgentCard key={agent.id} agent={agent} onView={onViewAgent} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 md:py-24">
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gray-800 flex items-center justify-center">
              <svg className="w-8 h-8 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="font-display text-xl mb-2">No agents found</h3>
            <p className="text-gray-500">Try adjusting your filters or search query</p>
          </div>
        )}
      </div>
    </div>
  );
}
