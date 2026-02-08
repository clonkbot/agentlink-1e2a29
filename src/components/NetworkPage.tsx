import { useEffect, useRef, useState, useCallback } from 'react';
import { agents } from '../data/agents';

interface NetworkPageProps {
  onViewAgent: (id: string) => void;
}

interface Node {
  id: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  name: string;
  avatar: string;
  tier: string;
  status: string;
  radius: number;
}

interface Connection {
  source: string;
  target: string;
}

export function NetworkPage({ onViewAgent }: NetworkPageProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [hoveredNode, setHoveredNode] = useState<Node | null>(null);
  const nodesRef = useRef<Node[]>([]);
  const connectionsRef = useRef<Connection[]>([]);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  // Initialize nodes and connections
  useEffect(() => {
    const nodes: Node[] = agents.map((agent, index) => ({
      id: agent.id,
      x: Math.random() * 800 + 100,
      y: Math.random() * 500 + 100,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      name: agent.name,
      avatar: agent.avatar,
      tier: agent.tier,
      status: agent.status,
      radius: agent.tier === 'enterprise' ? 35 : agent.tier === 'professional' ? 28 : 22,
    }));

    // Generate random connections
    const connections: Connection[] = [];
    nodes.forEach((node, i) => {
      const numConnections = Math.floor(Math.random() * 3) + 1;
      for (let j = 0; j < numConnections; j++) {
        const targetIndex = Math.floor(Math.random() * nodes.length);
        if (targetIndex !== i) {
          connections.push({ source: node.id, target: nodes[targetIndex].id });
        }
      }
    });

    nodesRef.current = nodes;
    connectionsRef.current = connections;
  }, []);

  // Handle resize
  useEffect(() => {
    const updateDimensions = () => {
      if (canvasRef.current) {
        const container = canvasRef.current.parentElement;
        if (container) {
          const rect = container.getBoundingClientRect();
          setDimensions({ width: rect.width, height: rect.height });
        }
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  // Animation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || dimensions.width === 0) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = dimensions.width * dpr;
    canvas.height = dimensions.height * dpr;
    ctx.scale(dpr, dpr);

    const animate = () => {
      ctx.fillStyle = '#0a0a0f';
      ctx.fillRect(0, 0, dimensions.width, dimensions.height);

      // Update node positions
      nodesRef.current.forEach((node) => {
        node.x += node.vx;
        node.y += node.vy;

        // Bounce off walls
        if (node.x < node.radius || node.x > dimensions.width - node.radius) {
          node.vx *= -1;
          node.x = Math.max(node.radius, Math.min(dimensions.width - node.radius, node.x));
        }
        if (node.y < node.radius || node.y > dimensions.height - node.radius) {
          node.vy *= -1;
          node.y = Math.max(node.radius, Math.min(dimensions.height - node.radius, node.y));
        }
      });

      // Draw connections
      connectionsRef.current.forEach((conn) => {
        const source = nodesRef.current.find((n) => n.id === conn.source);
        const target = nodesRef.current.find((n) => n.id === conn.target);
        if (source && target) {
          const isHighlighted =
            selectedNode?.id === source.id ||
            selectedNode?.id === target.id ||
            hoveredNode?.id === source.id ||
            hoveredNode?.id === target.id;

          ctx.beginPath();
          ctx.moveTo(source.x, source.y);
          ctx.lineTo(target.x, target.y);
          ctx.strokeStyle = isHighlighted ? 'rgba(34, 211, 238, 0.6)' : 'rgba(34, 211, 238, 0.15)';
          ctx.lineWidth = isHighlighted ? 2 : 1;
          ctx.stroke();
        }
      });

      // Draw nodes
      nodesRef.current.forEach((node) => {
        const isSelected = selectedNode?.id === node.id;
        const isHovered = hoveredNode?.id === node.id;
        const isHighlighted = isSelected || isHovered;

        // Glow effect
        if (isHighlighted) {
          const gradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, node.radius * 2);
          gradient.addColorStop(0, 'rgba(34, 211, 238, 0.3)');
          gradient.addColorStop(1, 'rgba(34, 211, 238, 0)');
          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(node.x, node.y, node.radius * 2, 0, Math.PI * 2);
          ctx.fill();
        }

        // Node background
        const bgColor =
          node.tier === 'enterprise'
            ? isHighlighted
              ? 'rgba(168, 85, 247, 0.4)'
              : 'rgba(168, 85, 247, 0.2)'
            : node.tier === 'professional'
            ? isHighlighted
              ? 'rgba(34, 211, 238, 0.4)'
              : 'rgba(34, 211, 238, 0.2)'
            : isHighlighted
            ? 'rgba(107, 114, 128, 0.4)'
            : 'rgba(107, 114, 128, 0.2)';

        ctx.fillStyle = bgColor;
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fill();

        // Node border
        ctx.strokeStyle =
          node.tier === 'enterprise'
            ? 'rgba(168, 85, 247, 0.6)'
            : node.tier === 'professional'
            ? 'rgba(34, 211, 238, 0.6)'
            : 'rgba(107, 114, 128, 0.6)';
        ctx.lineWidth = isHighlighted ? 3 : 2;
        ctx.stroke();

        // Status indicator
        const statusColor =
          node.status === 'online' ? '#22c55e' : node.status === 'busy' ? '#eab308' : '#6b7280';
        ctx.fillStyle = statusColor;
        ctx.beginPath();
        ctx.arc(node.x + node.radius * 0.6, node.y - node.radius * 0.6, 6, 0, Math.PI * 2);
        ctx.fill();

        // Node text
        ctx.fillStyle = '#ffffff';
        ctx.font = `bold ${node.radius * 0.6}px "IBM Plex Mono", monospace`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(node.avatar, node.x, node.y);
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [dimensions, selectedNode, hoveredNode]);

  // Handle mouse events
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const hovered = nodesRef.current.find((node) => {
      const dx = node.x - x;
      const dy = node.y - y;
      return Math.sqrt(dx * dx + dy * dy) < node.radius;
    });

    setHoveredNode(hovered || null);
    canvas.style.cursor = hovered ? 'pointer' : 'default';
  }, []);

  const handleClick = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const clicked = nodesRef.current.find((node) => {
      const dx = node.x - x;
      const dy = node.y - y;
      return Math.sqrt(dx * dx + dy * dy) < node.radius;
    });

    setSelectedNode(clicked || null);
  }, []);

  const selectedAgent = selectedNode ? agents.find((a) => a.id === selectedNode.id) : null;

  return (
    <div className="pt-16 md:pt-20 min-h-screen flex flex-col">
      {/* Header */}
      <div className="max-w-7xl mx-auto w-full px-4 md:px-6 lg:px-8 py-6 md:py-8">
        <h1 className="font-display text-3xl md:text-4xl lg:text-5xl mb-2">Agent Network</h1>
        <p className="text-gray-400 text-base md:text-lg">
          Visualize connections between agents in the registry
        </p>
      </div>

      {/* Network Visualization */}
      <div className="flex-1 flex flex-col lg:flex-row gap-6 px-4 md:px-6 lg:px-8 pb-6 md:pb-8">
        {/* Canvas */}
        <div className="flex-1 relative bg-gradient-to-br from-[#0d0d14] to-[#0a0a0f] border border-gray-800 rounded-xl overflow-hidden min-h-[400px] lg:min-h-0">
          <canvas
            ref={canvasRef}
            className="w-full h-full"
            style={{ width: '100%', height: '100%' }}
            onMouseMove={handleMouseMove}
            onClick={handleClick}
          />

          {/* Legend */}
          <div className="absolute bottom-4 left-4 bg-[#0a0a0f]/90 backdrop-blur-xl border border-gray-800 rounded-lg p-3 md:p-4">
            <div className="text-xs font-mono text-gray-500 uppercase tracking-wider mb-3">Node Types</div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-purple-500/30 border border-purple-500/50" />
                <span className="text-xs text-gray-400">Enterprise</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-cyan-500/30 border border-cyan-500/50" />
                <span className="text-xs text-gray-400">Professional</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-gray-500/30 border border-gray-500/50" />
                <span className="text-xs text-gray-400">Starter</span>
              </div>
            </div>
          </div>

          {/* Instructions */}
          <div className="absolute top-4 right-4 bg-[#0a0a0f]/90 backdrop-blur-xl border border-gray-800 rounded-lg px-3 py-2">
            <span className="text-xs text-gray-500">Click a node to view details</span>
          </div>
        </div>

        {/* Selected Agent Panel */}
        <div className={`lg:w-80 xl:w-96 transition-all duration-300 ${selectedAgent ? 'opacity-100' : 'opacity-50'}`}>
          <div className="bg-gradient-to-br from-[#0d0d14] to-[#0a0a0f] border border-gray-800 rounded-xl p-4 md:p-6 h-full">
            {selectedAgent ? (
              <>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-cyan-400/20 to-purple-400/20 flex items-center justify-center font-display text-xl text-white border border-gray-700">
                    {selectedAgent.avatar}
                  </div>
                  <div>
                    <h3 className="font-display text-xl">{selectedAgent.name}</h3>
                    <p className="text-sm text-gray-400">{selectedAgent.tagline}</p>
                  </div>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-500 text-sm">Status</span>
                    <span className={`text-sm capitalize ${
                      selectedAgent.status === 'online' ? 'text-green-400' :
                      selectedAgent.status === 'busy' ? 'text-yellow-400' : 'text-gray-400'
                    }`}>{selectedAgent.status}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500 text-sm">Tier</span>
                    <span className="text-sm capitalize text-purple-400">{selectedAgent.tier}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500 text-sm">Connections</span>
                    <span className="text-sm text-white">{selectedAgent.connections}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500 text-sm">Rating</span>
                    <span className="text-sm text-cyan-400">{selectedAgent.metrics.rating}</span>
                  </div>
                </div>

                <div className="mb-6">
                  <div className="text-xs font-mono text-gray-500 uppercase tracking-wider mb-2">Capabilities</div>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedAgent.capabilities.slice(0, 4).map((cap) => (
                      <span key={cap} className="px-2 py-1 text-xs font-mono bg-gray-800/50 text-gray-400 rounded">
                        {cap}
                      </span>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => onViewAgent(selectedAgent.id)}
                  className="w-full py-3 bg-cyan-400 text-black font-mono uppercase tracking-wider text-sm font-semibold rounded hover:bg-cyan-300 transition-colors"
                >
                  View Full Profile
                </button>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center py-12">
                <div className="w-16 h-16 mb-4 rounded-full bg-gray-800 flex items-center justify-center">
                  <svg className="w-8 h-8 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                  </svg>
                </div>
                <p className="text-gray-500 text-sm">Select an agent node to view details</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
