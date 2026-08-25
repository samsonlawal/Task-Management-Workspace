"use client";

export default function Integrations() {
  const row1Tools = [
    {
      name: "GitHub",
      category: "VCS",
      badge: "PR Auto-Close",
      icon: (
        <svg className="h-4 w-4 shrink-0 fill-white" viewBox="0 0 24 24">
          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
        </svg>
      ),
    },
    {
      name: "Slack",
      category: "Messaging",
      badge: "Slash Commands",
      icon: (
        <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="none">
          <path
            d="M6 15a2 2 0 1 1-2-2h2v2zm1 0a2 2 0 0 1 2-2 2 2 0 0 1 2 2v5a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-5zM9 6a2 2 0 1 1 2-2v2H9zm0 1a2 2 0 0 1 2 2 2 2 0 0 1-2 2H4a2 2 0 0 1-2-2 2 2 0 0 1 2-2h5zm9 3a2 2 0 1 1 2 2h-2V10zm-1 0a2 2 0 0 1-2 2 2 2 0 0 1-2-2V5a2 2 0 0 1 2-2 2 2 0 0 1 2 2v5zm-3 9a2 2 0 1 1-2 2v-2h2zm0-1a2 2 0 0 1-2-2 2 2 0 0 1 2-2h5a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-5z"
            fill="#E01E5A"
          />
        </svg>
      ),
    },
    {
      name: "Figma",
      category: "Design",
      badge: "Live Embeds",
      icon: (
        <svg className="h-4 w-4 shrink-0" viewBox="0 0 38 57" fill="none">
          <path
            d="M19 28.5C19 23.2533 23.2533 19 28.5 19C33.7467 19 38 23.2533 38 28.5C38 33.7467 33.7467 38 28.5 38C23.2533 38 19 33.7467 19 28.5Z"
            fill="#1ABCFE"
          />
          <path
            d="M0 47.5C0 42.2533 4.25329 38 9.5 38H19V47.5C19 52.7467 14.7467 57 9.5 57C4.25329 57 0 52.7467 0 47.5Z"
            fill="#0ACF83"
          />
          <path
            d="M19 0V19H28.5C33.7467 19 38 14.7467 38 9.5C38 4.25329 33.7467 0 28.5 0H19Z"
            fill="#FF7262"
          />
          <path
            d="M0 9.5C0 14.7467 4.25329 19 9.5 19H19V0H9.5C4.25329 0 0 4.25329 0 9.5Z"
            fill="#F24E1E"
          />
          <path
            d="M0 28.5C0 33.7467 4.25329 38 9.5 38H19V19H9.5C4.25329 19 0 23.2533 0 28.5Z"
            fill="#A259FF"
          />
        </svg>
      ),
    },
    {
      name: "Linear",
      category: "VCS",
      badge: "Bi-directional",
      icon: (
        <svg className="h-4 w-4 shrink-0 fill-white" viewBox="0 0 24 24">
          <path d="M3.203 14.542L14.542 3.203a9.96 9.96 0 0 0-4.004-1.161L1.246 11.334a9.96 9.96 0 0 0 1.957 3.208zm-1.89-6.438L7.855 1.562A10.024 10.024 0 0 0 2.04 4.093c-.31.625-.56 1.3-.727 2.011zm8.145 14.588l11.338-11.338a9.96 9.96 0 0 0-1.161-4.004L8.297 18.689c.866.866 1.87 1.547 2.971 2.003zm6.438 1.89l6.542-6.542c.625-.31 1.3-.56 2.011-.727a10.024 10.024 0 0 0-2.531-5.815L15.344 20.98z" />
        </svg>
      ),
    },
  ];

  const row2Tools = [
    {
      name: "GitLab",
      category: "VCS",
      badge: "CI/CD Trigger",
      icon: (
        <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="#FC6D26">
          <path d="M23.955 13.587l-1.342-4.135-2.664-8.189c-.135-.423-.73-.423-.867 0L16.418 9.45H7.582L4.918 1.263c-.136-.423-.731-.423-.867 0L1.387 9.452.045 13.587a.972.972 0 0 0 .353 1.087l11.602 8.43 11.602-8.43a.972.972 0 0 0 .353-1.087" />
        </svg>
      ),
    },
    {
      name: "Google Calendar",
      category: "Productivity",
      badge: "Two-Way Sync",
      icon: (
        <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="none">
          <rect x="3" y="4" width="18" height="18" rx="2" fill="#4285F4" />
          <path d="M16 2v4M8 2v4M3 10h18" stroke="#fff" strokeWidth="1.5" />
          <rect x="7" y="13" width="3" height="3" fill="#fff" />
          <rect x="14" y="13" width="3" height="3" fill="#fff" />
        </svg>
      ),
    },
    {
      name: "Discord",
      category: "Messaging",
      badge: "Webhooks",
      icon: (
        <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="#5865F2">
          <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.893.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
        </svg>
      ),
    },
    {
      name: "VS Code",
      category: "Productivity",
      badge: "Extension",
      icon: (
        <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="#007ACC">
          <path d="M23.15 2.587L18.21.21a1.494 1.494 0 0 0-1.705.29l-9.46 8.63-4.12-3.128a.999.999 0 0 0-1.276.057L.327 7.276a1 1 0 0 0-.005 1.488L4.62 12 .322 15.236a1 1 0 0 0 .005 1.488l1.322 1.217a.998.998 0 0 0 1.276.057l4.12-3.128 9.46 8.63a1.492 1.492 0 0 0 1.704.29l4.942-2.377A1.5 1.5 0 0 0 24 20.06V3.939a1.5 1.5 0 0 0-.85-1.352z" />
        </svg>
      ),
    },
  ];

  const r1Marquee = [...row1Tools, ...row1Tools, ...row1Tools, ...row1Tools];
  const r2Marquee = [...row2Tools, ...row2Tools, ...row2Tools, ...row2Tools];

  return (
    <div id="integrations" className="poppins w-full py-8 md:py-12">
      <div className="flex w-full flex-col items-center gap-4">
        {/* Section Sub-heading */}
        <p className="text-center text-[11px] font-normal tracking-wide text-zinc-500 uppercase">
          Connected across your developer tools
        </p>

        {/* Dual Stream Marquee Container with Left & Right Gradient Fade Masks */}
        <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)] [-webkit-mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)] flex flex-col gap-2.5 py-1">
          {/* Row 1 -> Moves Left at Gentle 50s Pace */}
          <div className="animate-marquee items-center gap-3">
            {r1Marquee.map((tool, idx) => (
              <div
                key={`r1-${idx}`}
                className="flex items-center gap-2 rounded-[5px] border border-[#565656]/20 bg-[#141414] px-3.5 py-1.5 text-[12px] text-zinc-300 transition-colors hover:border-[#565656]/40 hover:text-white"
              >
                {tool.icon}
                <span className="font-normal text-white">{tool.name}</span>
                <span className="rounded bg-[#1c1c1c] px-1.5 py-0.5 text-[9px] font-mono text-zinc-400">
                  {tool.badge}
                </span>
              </div>
            ))}
          </div>

          {/* Row 2 -> Moves Right at Gentle 50s Pace */}
          <div className="animate-marquee-reverse items-center gap-3">
            {r2Marquee.map((tool, idx) => (
              <div
                key={`r2-${idx}`}
                className="flex items-center gap-2 rounded-[5px] border border-[#565656]/20 bg-[#141414] px-3.5 py-1.5 text-[12px] text-zinc-300 transition-colors hover:border-[#565656]/40 hover:text-white"
              >
                {tool.icon}
                <span className="font-normal text-white">{tool.name}</span>
                <span className="rounded bg-[#1c1c1c] px-1.5 py-0.5 text-[9px] font-mono text-zinc-400">
                  {tool.badge}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
