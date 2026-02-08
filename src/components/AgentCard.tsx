import type { Agent } from '../data/agents';
import { tierColors, statusColors } from '../data/agents';

interface AgentCardProps {
  agent: Agent;
  onView: (id: string) => void;
}

export function AgentCard({ agent, onView }: AgentCardProps) {
  const tier = tierColors[agent.tier];
  const status = statusColors[agent.status];

  return (
    <div
      className="group relative bg-gradient-to-br from-[#0d0d14] to-[#0a0a0f] border border-gray-800 rounded-xl overflow-hidden hover:border-cyan-400/30 transition-all duration-500 cursor-pointer"
      onClick={() => onView(agent.id)}
    >
      {/* Hover Glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Header */}
      <div className="relative p-5 md:p-6 pb-4">
        <div className="flex items-start justify-between gap-4">
          {/* Avatar & Name */}
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-12 h-12 md:w-14 md:h-14 rounded-lg bg-gradient-to-br from-cyan-400/20 to-purple-400/20 flex items-center justify-center font-display text-lg md:text-xl text-white border border-gray-700">
                {agent.avatar}
              </div>
              {/* Status Indicator */}
              <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full ${status.bg} border-2 border-[#0d0d14]`} />
            </div>
            <div className="min-w-0">
              <h3 className="font-display text-lg md:text-xl text-white truncate">{agent.name}</h3>
              <p className="text-sm text-gray-400 truncate">{agent.tagline}</p>
            </div>
          </div>

          {/* Tier Badge */}
          <span className={`shrink-0 px-2.5 py-1 text-xs font-mono uppercase tracking-wider rounded ${tier.bg} ${tier.text} border ${tier.border}`}>
            {agent.tier}
          </span>
        </div>
      </div>

      {/* Metrics */}
      <div className="relative px-5 md:px-6 py-4 border-t border-gray-800/50">
        <div className="grid grid-cols-4 gap-2 md:gap-4">
          <div className="text-center">
            <div className="font-mono text-sm md:text-base text-white">{agent.metrics.uptime}%</div>
            <div className="text-[10px] md:text-xs text-gray-500 uppercase tracking-wider">Uptime</div>
          </div>
          <div className="text-center">
            <div className="font-mono text-sm md:text-base text-white">{(agent.metrics.tasksCompleted / 1000).toFixed(0)}K</div>
            <div className="text-[10px] md:text-xs text-gray-500 uppercase tracking-wider">Tasks</div>
          </div>
          <div className="text-center">
            <div className="font-mono text-sm md:text-base text-white">{agent.metrics.avgResponseTime}s</div>
            <div className="text-[10px] md:text-xs text-gray-500 uppercase tracking-wider">Latency</div>
          </div>
          <div className="text-center">
            <div className="font-mono text-sm md:text-base text-cyan-400">{agent.metrics.rating}</div>
            <div className="text-[10px] md:text-xs text-gray-500 uppercase tracking-wider">Rating</div>
          </div>
        </div>
      </div>

      {/* Capabilities */}
      <div className="relative px-5 md:px-6 py-4 border-t border-gray-800/50">
        <div className="flex flex-wrap gap-1.5 md:gap-2">
          {agent.capabilities.slice(0, 3).map((cap) => (
            <span
              key={cap}
              className="px-2 py-0.5 md:py-1 text-[10px] md:text-xs font-mono bg-gray-800/50 text-gray-400 rounded"
            >
              {cap}
            </span>
          ))}
          {agent.capabilities.length > 3 && (
            <span className="px-2 py-0.5 md:py-1 text-[10px] md:text-xs font-mono text-gray-500">
              +{agent.capabilities.length - 3}
            </span>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="relative px-5 md:px-6 py-4 border-t border-gray-800/50 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
          </svg>
          <span className="text-sm text-gray-400">{agent.connections} connections</span>
        </div>
        <div className="font-mono text-sm text-cyan-400">
          ${agent.pricePerTask}/task
        </div>
      </div>

      {/* View Button */}
      <div className="absolute bottom-0 left-0 right-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
        <button className="w-full py-3 bg-cyan-400 text-black font-mono text-sm uppercase tracking-wider font-semibold hover:bg-cyan-300 transition-colors">
          View Profile
        </button>
      </div>
    </div>
  );
}
