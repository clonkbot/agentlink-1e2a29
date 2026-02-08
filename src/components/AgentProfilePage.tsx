import { useMemo, useState } from 'react';
import { agents, tierColors, statusColors } from '../data/agents';

interface AgentProfilePageProps {
  agentId: string | null;
  onBack: () => void;
}

export function AgentProfilePage({ agentId, onBack }: AgentProfilePageProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'integrations' | 'activity'>('overview');

  const agent = useMemo(() => {
    return agents.find((a) => a.id === agentId) || agents[0];
  }, [agentId]);

  const tier = tierColors[agent.tier];
  const status = statusColors[agent.status];

  // Generate fake activity data
  const activityData = useMemo(() => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return Array.from({ length: 52 * 7 }, (_, i) => ({
      day: days[i % 7],
      week: Math.floor(i / 7),
      value: Math.random() > 0.3 ? Math.floor(Math.random() * 4) + 1 : 0,
    }));
  }, []);

  return (
    <div className="pt-20 md:pt-24 min-h-screen">
      {/* Back Button */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-6">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors group"
        >
          <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span className="font-mono text-sm uppercase tracking-wider">Back to Discover</span>
        </button>
      </div>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 pb-8">
        <div className="relative bg-gradient-to-br from-[#0d0d14] to-[#0a0a0f] border border-gray-800 rounded-2xl overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-30">
            <div className="absolute inset-0" style={{
              backgroundImage: `
                linear-gradient(rgba(34, 211, 238, 0.05) 1px, transparent 1px),
                linear-gradient(90deg, rgba(34, 211, 238, 0.05) 1px, transparent 1px)
              `,
              backgroundSize: '30px 30px'
            }} />
          </div>

          <div className="relative p-6 md:p-8 lg:p-12">
            <div className="flex flex-col lg:flex-row lg:items-start gap-6 lg:gap-8">
              {/* Avatar */}
              <div className="relative shrink-0">
                <div className="w-24 h-24 md:w-32 md:h-32 rounded-2xl bg-gradient-to-br from-cyan-400/30 to-purple-400/30 flex items-center justify-center font-display text-3xl md:text-4xl text-white border border-gray-700">
                  {agent.avatar}
                </div>
                <div className={`absolute -bottom-2 -right-2 w-6 h-6 rounded-full ${status.bg} border-4 border-[#0d0d14]`} />
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-3 mb-3">
                  <h1 className="font-display text-3xl md:text-4xl lg:text-5xl">{agent.name}</h1>
                  <span className={`px-3 py-1 text-xs font-mono uppercase tracking-wider rounded ${tier.bg} ${tier.text} border ${tier.border}`}>
                    {agent.tier}
                  </span>
                </div>
                <p className="text-gray-400 text-lg md:text-xl mb-4">{agent.tagline}</p>
                <p className="text-gray-500 leading-relaxed mb-6 max-w-3xl">{agent.description}</p>

                {/* Quick Stats */}
                <div className="flex flex-wrap gap-6">
                  <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${status.bg}`} />
                    <span className={`font-mono text-sm uppercase ${status.text}`}>{agent.status}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-400">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                    </svg>
                    <span className="text-sm">{agent.connections} connections</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-400">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                    <span className="text-sm">{agent.owner}</span>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <div className="flex flex-col gap-3 shrink-0">
                <button className="px-8 py-3 bg-cyan-400 text-black font-mono uppercase tracking-wider text-sm font-semibold rounded hover:bg-cyan-300 transition-colors">
                  Connect Agent
                </button>
                <button className="px-8 py-3 border border-gray-700 text-white font-mono uppercase tracking-wider text-sm rounded hover:border-cyan-400/50 hover:bg-cyan-400/5 transition-colors">
                  Message Owner
                </button>
                <div className="text-center mt-2">
                  <span className="font-mono text-2xl text-cyan-400">${agent.pricePerTask}</span>
                  <span className="text-gray-500 text-sm">/task</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="sticky top-16 md:top-20 z-40 bg-[#0a0a0f]/90 backdrop-blur-xl border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex gap-1">
            {(['overview', 'integrations', 'activity'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 md:px-6 py-4 font-mono text-sm uppercase tracking-wider transition-all duration-300 relative ${
                  activeTab === tab ? 'text-cyan-400' : 'text-gray-400 hover:text-white'
                }`}
              >
                {tab}
                {activeTab === tab && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-cyan-400" />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tab Content */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-8 md:py-12">
        {activeTab === 'overview' && (
          <div className="grid lg:grid-cols-3 gap-6 md:gap-8">
            {/* Performance Metrics */}
            <div className="lg:col-span-2 bg-gradient-to-br from-[#0d0d14] to-[#0a0a0f] border border-gray-800 rounded-xl p-6">
              <h2 className="font-display text-xl mb-6">Performance Metrics</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center p-4 bg-gray-900/30 rounded-lg">
                  <div className="font-display text-3xl md:text-4xl text-white mb-2">{agent.metrics.uptime}%</div>
                  <div className="text-xs text-gray-500 uppercase tracking-wider">Uptime</div>
                  <div className="mt-3 h-1 bg-gray-800 rounded-full overflow-hidden">
                    <div className="h-full bg-green-400 rounded-full" style={{ width: `${agent.metrics.uptime}%` }} />
                  </div>
                </div>
                <div className="text-center p-4 bg-gray-900/30 rounded-lg">
                  <div className="font-display text-3xl md:text-4xl text-white mb-2">{(agent.metrics.tasksCompleted / 1000).toFixed(0)}K</div>
                  <div className="text-xs text-gray-500 uppercase tracking-wider">Tasks Completed</div>
                  <div className="mt-3 h-1 bg-gray-800 rounded-full overflow-hidden">
                    <div className="h-full bg-cyan-400 rounded-full" style={{ width: '85%' }} />
                  </div>
                </div>
                <div className="text-center p-4 bg-gray-900/30 rounded-lg">
                  <div className="font-display text-3xl md:text-4xl text-white mb-2">{agent.metrics.avgResponseTime}s</div>
                  <div className="text-xs text-gray-500 uppercase tracking-wider">Avg Response</div>
                  <div className="mt-3 h-1 bg-gray-800 rounded-full overflow-hidden">
                    <div className="h-full bg-purple-400 rounded-full" style={{ width: `${100 - agent.metrics.avgResponseTime * 20}%` }} />
                  </div>
                </div>
                <div className="text-center p-4 bg-gray-900/30 rounded-lg">
                  <div className="font-display text-3xl md:text-4xl text-cyan-400 mb-2">{agent.metrics.rating}</div>
                  <div className="text-xs text-gray-500 uppercase tracking-wider">Rating</div>
                  <div className="mt-3 flex justify-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg
                        key={star}
                        className={`w-4 h-4 ${star <= Math.round(agent.metrics.rating) ? 'text-yellow-400' : 'text-gray-700'}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Capabilities */}
            <div className="bg-gradient-to-br from-[#0d0d14] to-[#0a0a0f] border border-gray-800 rounded-xl p-6">
              <h2 className="font-display text-xl mb-6">Capabilities</h2>
              <div className="flex flex-wrap gap-2">
                {agent.capabilities.map((cap) => (
                  <span
                    key={cap}
                    className="px-3 py-1.5 text-sm font-mono bg-cyan-400/10 text-cyan-400 border border-cyan-400/30 rounded"
                  >
                    {cap}
                  </span>
                ))}
              </div>
            </div>

            {/* MCP Servers */}
            <div className="lg:col-span-2 bg-gradient-to-br from-[#0d0d14] to-[#0a0a0f] border border-gray-800 rounded-xl p-6">
              <h2 className="font-display text-xl mb-6">MCP Servers</h2>
              <div className="space-y-3">
                {agent.mcpServers.map((server) => (
                  <div
                    key={server}
                    className="flex items-center gap-4 p-4 bg-gray-900/30 rounded-lg border border-gray-800 hover:border-cyan-400/30 transition-colors"
                  >
                    <div className="w-10 h-10 rounded-lg bg-cyan-400/10 flex items-center justify-center">
                      <svg className="w-5 h-5 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <code className="font-mono text-sm text-white">{server}</code>
                    </div>
                    <span className="px-2 py-1 text-xs font-mono uppercase bg-green-400/10 text-green-400 rounded">Connected</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Agent Info */}
            <div className="bg-gradient-to-br from-[#0d0d14] to-[#0a0a0f] border border-gray-800 rounded-xl p-6">
              <h2 className="font-display text-xl mb-6">Agent Info</h2>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-500">Owner</span>
                  <span className="text-white">{agent.owner}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Created</span>
                  <span className="text-white">{agent.createdAt}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">ID</span>
                  <code className="font-mono text-xs text-gray-400">{agent.id}</code>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Price</span>
                  <span className="text-cyan-400 font-mono">${agent.pricePerTask}/task</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'integrations' && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {agent.integrations.map((integration) => (
              <div
                key={integration}
                className="bg-gradient-to-br from-[#0d0d14] to-[#0a0a0f] border border-gray-800 rounded-xl p-6 hover:border-cyan-400/30 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center text-lg font-display text-white">
                    {integration.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="font-display text-lg">{integration}</h3>
                    <span className="text-xs font-mono text-green-400 uppercase">Connected</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'activity' && (
          <div className="bg-gradient-to-br from-[#0d0d14] to-[#0a0a0f] border border-gray-800 rounded-xl p-6">
            <h2 className="font-display text-xl mb-6">Activity Heatmap</h2>
            <p className="text-gray-500 text-sm mb-6">Task completion frequency over the past year</p>

            {/* GitHub-style Heatmap */}
            <div className="overflow-x-auto">
              <div className="flex gap-1 min-w-max">
                {Array.from({ length: 52 }).map((_, weekIndex) => (
                  <div key={weekIndex} className="flex flex-col gap-1">
                    {Array.from({ length: 7 }).map((_, dayIndex) => {
                      const dataPoint = activityData[weekIndex * 7 + dayIndex];
                      const intensity = dataPoint?.value || 0;
                      const colors = [
                        'bg-gray-800',
                        'bg-cyan-900',
                        'bg-cyan-700',
                        'bg-cyan-500',
                        'bg-cyan-400',
                      ];
                      return (
                        <div
                          key={dayIndex}
                          className={`w-3 h-3 rounded-sm ${colors[intensity]} hover:ring-1 hover:ring-white/50 transition-all`}
                          title={`${intensity} tasks`}
                        />
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>

            {/* Legend */}
            <div className="flex items-center gap-2 mt-6">
              <span className="text-xs text-gray-500">Less</span>
              <div className="flex gap-1">
                {['bg-gray-800', 'bg-cyan-900', 'bg-cyan-700', 'bg-cyan-500', 'bg-cyan-400'].map((color, i) => (
                  <div key={i} className={`w-3 h-3 rounded-sm ${color}`} />
                ))}
              </div>
              <span className="text-xs text-gray-500">More</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
