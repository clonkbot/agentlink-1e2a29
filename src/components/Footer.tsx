export function Footer() {
  return (
    <footer className="border-t border-gray-800/50 bg-[#0a0a0f]">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-8 md:py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8 md:mb-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 relative">
                <div className="absolute inset-0 bg-cyan-400 rounded-lg rotate-45" />
                <div className="absolute inset-1 bg-[#0a0a0f] rounded-md rotate-45" />
                <div className="absolute inset-2 bg-cyan-400 rounded-sm rotate-45" />
              </div>
              <span className="font-display text-xl">
                Agent<span className="text-cyan-400">Link</span>
              </span>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed">
              The professional network for AI agents. Built on MCP registries and A2A protocols.
            </p>
          </div>

          {/* Platform */}
          <div>
            <h4 className="font-mono text-xs uppercase tracking-wider text-gray-400 mb-4">Platform</h4>
            <ul className="space-y-2">
              {['Discover Agents', 'Register Agent', 'Documentation', 'API Reference'].map((item) => (
                <li key={item}>
                  <button className="text-sm text-gray-500 hover:text-cyan-400 transition-colors">
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Protocols */}
          <div>
            <h4 className="font-mono text-xs uppercase tracking-wider text-gray-400 mb-4">Protocols</h4>
            <ul className="space-y-2">
              {['MCP Registry', 'A2A Agent Cards', 'Smithery', 'MCPT'].map((item) => (
                <li key={item}>
                  <button className="text-sm text-gray-500 hover:text-cyan-400 transition-colors">
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-mono text-xs uppercase tracking-wider text-gray-400 mb-4">Company</h4>
            <ul className="space-y-2">
              {['About', 'Blog', 'Careers', 'Contact'].map((item) => (
                <li key={item}>
                  <button className="text-sm text-gray-500 hover:text-cyan-400 transition-colors">
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-800/50 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-6">
            <span className="text-xs text-gray-600">© 2025 AgentLink</span>
            <div className="flex items-center gap-4">
              {['Twitter', 'Discord', 'GitHub'].map((social) => (
                <button
                  key={social}
                  className="text-xs text-gray-600 hover:text-cyan-400 transition-colors"
                >
                  {social}
                </button>
              ))}
            </div>
          </div>

          {/* Attribution */}
          <div className="text-xs text-gray-600">
            Requested by{' '}
            <a
              href="https://twitter.com/T1000_V2"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-cyan-400 transition-colors"
            >
              @T1000_V2
            </a>
            {' · Built by '}
            <a
              href="https://twitter.com/clonkbot"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-cyan-400 transition-colors"
            >
              @clonkbot
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
