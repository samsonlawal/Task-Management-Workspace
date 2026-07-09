"use client";

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import Notification from "@/components/reuseables/Notification";
import { showSuccessToast } from "@/utils/toaster";

const SlackIcon = () => (
  <svg viewBox="0 0 24 24" className="h-6 w-6">
    <g fill="none" fillRule="evenodd">
      <path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523 2.528 2.528 0 0 1-2.522-2.523 2.528 2.528 0 0 1 2.522-2.52h2.52v2.52zm1.261 0a2.528 2.528 0 0 1 2.52-2.52h5.043a2.528 2.528 0 0 1 2.522 2.52v5.042a2.528 2.528 0 0 1-2.522 2.52H8.824a2.528 2.528 0 0 1-2.52-2.52v-5.042z" fill="#36C5F0"/>
      <path d="M8.824 5.043a2.528 2.528 0 0 1-2.52-2.52A2.528 2.528 0 0 1 8.824 0a2.528 2.528 0 0 1 2.52 2.522v2.52h-2.52zm0 1.262a2.528 2.528 0 0 1 2.52 2.52v5.043a2.528 2.528 0 0 1-2.52 2.522H3.782a2.528 2.528 0 0 1-2.52-2.522V8.825a2.528 2.528 0 0 1 2.52-2.52h5.042z" fill="#2EB67D"/>
      <path d="M18.958 8.825a2.528 2.528 0 0 1 2.52-2.52 2.528 2.528 0 0 1 2.522 2.52 2.528 2.528 0 0 1-2.522 2.52h-2.52v-2.52zm-1.262 0a2.528 2.528 0 0 1-2.52 2.52h-5.043a2.528 2.528 0 0 1-2.522-2.52V3.783a2.528 2.528 0 0 1 2.522-2.52h5.043a2.528 2.528 0 0 1 2.52 2.52v5.042z" fill="#ECB22E"/>
      <path d="M15.176 18.958a2.528 2.528 0 0 1 2.52 2.52 2.528 2.528 0 0 1-2.52 2.522 2.528 2.528 0 0 1-2.522-2.522v-2.52h2.522zm0-1.262a2.528 2.528 0 0 1-2.522-2.52v-5.043a2.528 2.528 0 0 1 2.522-2.52h5.043a2.528 2.528 0 0 1 2.52 2.52v5.043a2.528 2.528 0 0 1-2.52 2.522h-5.043z" fill="#E01E5A"/>
    </g>
  </svg>
);

const GithubIcon = () => (
  <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current text-slate-900 dark:text-white">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z" />
  </svg>
);

const GoogleCalendarIcon = () => (
  <svg viewBox="0 0 48 48" className="h-6 w-6">
    <path fill="#EA4335" d="M38 10H10c-2.21 0-4 1.79-4 4v24c0 2.21 1.79 4 4 4h28c2.21 0 4-1.79 4-4V14c0-2.21-1.79-4-4-4z" />
    <path fill="#4285F4" d="M38 10H10c-2.21 0-4 1.79-4 4v4h36v-4c0-2.21-1.79-4-4-4z" />
    <text x="50%" y="72%" fill="white" fontSize="20" fontWeight="bold" fontFamily="sans-serif" textAnchor="middle">31</text>
  </svg>
);

const FigmaIcon = () => (
  <svg className="h-6 w-6" viewBox="0 0 38 57" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M19 19C19 9.61 27.51 2 38 2C48.49 2 57 9.61 57 19C57 28.39 48.49 36 38 36C27.51 36 19 28.39 19 19Z" fill="#FF7262" transform="translate(-19, -2)"/>
    <path d="M19 19C19 9.61 27.51 2 38 2C48.49 2 57 9.61 57 19C57 28.39 48.49 36 38 36C27.51 36 19 28.39 19 19Z" fill="#F24E1E" transform="translate(-38, -2)"/>
    <path d="M19 38C19 28.61 27.51 21 38 21H57V57H38C27.51 57 19 49.39 19 38Z" fill="#A259FF" transform="translate(-38, -2)"/>
    <path d="M19 57C19 47.61 27.51 40 38 40H57V57C57 67.39 48.49 75 38 75C27.51 75 19 67.39 19 57Z" fill="#0ACF83" transform="translate(-38, -2)"/>
    <path d="M38 38C38 28.61 46.51 21 57 21C67.49 21 76 28.61 76 38C76 47.39 67.49 55 57 55C46.51 55 38 47.39 38 38Z" fill="#1ABC9C" transform="translate(-38, -2)"/>
  </svg>
);

const NotionIcon = () => (
  <svg viewBox="0 0 32 32" className="h-6 w-6 fill-current text-slate-900 dark:text-white">
    <path d="M26.2 3.6h-20.4C4.3 3.6 3 4.9 3 6.4v19.1c0 1.6 1.3 2.9 2.8 2.9h20.4c1.6 0 2.8-1.3 2.8-2.9V6.4c0-1.5-1.2-2.8-2.8-2.8zm-1.8 17.6l-5-10.4V24h-2.5V8.4H19l5 10.4V8.4h2.5V24c-.1 0-2.1-2.8-2.1-2.8z" />
  </svg>
);

const DiscordIcon = () => (
  <svg viewBox="0 0 127.14 96.36" className="h-6 w-6 fill-current text-[#5865F2]">
    <path d="M107.7,8.07A105.15,105.15,0,0,0,77.26,0a77.19,77.19,0,0,0-3.3,6.83A96.67,96.67,0,0,0,53.22,6.83,77.19,77.19,0,0,0,49.88,0,105.15,105.15,0,0,0,19.44,8.07C3.66,31.58-1.86,54.65,1,77.53A105.73,105.73,0,0,0,32,96.36a77.7,77.7,0,0,0,6.63-10.85,68.43,68.43,0,0,1-10.5-5c.9-.65,1.76-1.34,2.58-2.06a75.7,75.7,0,0,0,72.77,0c.82.72,1.68,1.41,2.58,2.06a68.43,68.43,0,0,1-10.5,5,77.7,77.7,0,0,0,6.63,10.85,105.73,105.73,0,0,0,31-18.83C129.07,54.65,123.56,31.58,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53S36.18,40.36,42.45,40.36,53.9,46,53.9,53,48.72,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.24,60,73.24,53S78.41,40.36,84.69,40.36,96.14,46,96.14,53,91,65.69,84.69,65.69Z" />
  </svg>
);

interface IntegrationItem {
  id: string;
  name: string;
  category: "Communication" | "Development" | "Productivity" | "Design";
  description: string;
  icon: React.ReactNode;
}

const INTEGRATIONS_LIST: IntegrationItem[] = [
  {
    id: "slack",
    name: "Slack",
    category: "Communication",
    description: "Send notifications about task updates, mentions, and due dates directly to your team channels.",
    icon: <SlackIcon />,
  },
  {
    id: "github",
    name: "GitHub",
    category: "Development",
    description: "Link commits and pull requests to tasks. Automatically update task status on PR activity.",
    icon: <GithubIcon />,
  },
  {
    id: "google-calendar",
    name: "Google Calendar",
    category: "Productivity",
    description: "Sync due dates to your calendar and get quick alerts before your tasks are scheduled to end.",
    icon: <GoogleCalendarIcon />,
  },
  {
    id: "discord",
    name: "Discord",
    category: "Communication",
    description: "Keep your community server in sync with project progress and live team update posts.",
    icon: <DiscordIcon />,
  },
  {
    id: "figma",
    name: "Figma",
    category: "Design",
    description: "Embed files directly into task attachments and view live design file updates inside task views.",
    icon: <FigmaIcon />,
  },
  {
    id: "notion",
    name: "Notion",
    category: "Productivity",
    description: "Sync team notes, project databases, and resources directly between Notion pages and tasks.",
    icon: <NotionIcon />,
  },
];

const CATEGORIES = ["All", "Communication", "Development", "Productivity", "Design"] as const;

function Integrations() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [connected, setConnected] = useState<string[]>(["slack", "google-calendar"]);

  const handleToggleConnection = (id: string, name: string) => {
    if (connected.includes(id)) {
      setConnected((prev) => prev.filter((item) => item !== id));
      showSuccessToast({ message: `Disconnected from ${name}.` });
    } else {
      setConnected((prev) => [...prev, id]);
      showSuccessToast({ message: `Connected to ${name} successfully!` });
    }
  };

  const filteredIntegrations = INTEGRATIONS_LIST.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.description.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" || item.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="flex h-fit w-full flex-col gap-2 px-8 transition-all duration-300">
      <div className="sticky top-0 w-full bg-[white] dark:bg-[#111] z-10">
        <div className="poppins flex w-full items-center justify-between border-b border-[#565656]/10 py-[7px]">
          <h2 className="text-xl text-[#111] dark:text-white">Integrations</h2>
          <div className="flex flex-row items-center justify-center gap-3">
            <Notification />
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-6 transition-all duration-300">
        <div className="relative w-auto flex-initial rounded-md">
          {/* Search input */}
          <input
            type="text"
            placeholder="Search Integrations"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full sm:w-[300px] rounded-md border-[1px] border-[#565656]/50 bg-transparent py-2.5 pl-8 pr-8 text-xs outline-none placeholder:text-[#565656]/80 focus:border-[#565656] dark:text-[#eee]"
          />

          {/* Magnifier icon */}
          <div className="pointer-events-none absolute left-[1px] top-1/2 flex h-[90%] -translate-y-1/2 items-center justify-center rounded-md px-2 text-gray-400">
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              className="text-[12px] dark:text-[#565656]/80"
            />
          </div>

          {/* Clear button */}
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <FontAwesomeIcon
                icon={faXmark}
                className="text-[12px] dark:text-[#565656]/80"
              />
            </button>
          )}
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`rounded-full px-4 py-1.5 text-xs font-medium transition-all duration-200 ${
                selectedCategory === category
                  ? "bg-[#563892] text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-[#565656]/20 dark:text-gray-300 dark:hover:bg-[#565656]/30"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Grid List */}
      <div className="grid grid-cols-1npm run  md:grid-cols-2 lg:grid-cols-3 gap-6 pt-8 pb-24">
        {filteredIntegrations.length > 0 ? (
          filteredIntegrations.map((item) => {
            const isConnected = connected.includes(item.id);
            return (
              <div
                key={item.id}
                className="group flex flex-col justify-between h-[180px] rounded-xl border border-[#565656]/15 bg-[#F4F4F4]/30 dark:bg-[#565656]/5 p-5 hover:shadow-md hover:border-[#565656]/30 transition-all duration-300"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <div className="rounded-lg shadow-sm flex items-center justify-center gap-2">
                    <span className="">
                      {item.icon} 
                    </span>
                      <h3 className="text-base font-semibold text-[#111] dark:text-white">
                        {item.name}
                      </h3>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleToggleConnection(item.id, item.name)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full py-1 transition-colors outline-none focus:ring-2 focus:ring-[#563892]/20 ${
                        isConnected ? "bg-[#563892]" : "bg-gray-300 dark:bg-[#565656]/40"
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          isConnected ? "translate-x-6" : "translate-x-1"
                        }`}
                      />
                    </button>
                  </div>

                 
                  
                  <p className="text-xs text-gray-500 dark:text-[#787878] mt-3 line-clamp-2">
                    {item.description}
                  </p>
                </div>

                <div className="flex items-center justify-between border-t border-[#565656]/10 pt-3 mt-3">
                  <span className="text-[10px] font-semibold tracking-wider text-gray-400 dark:text-gray-500 uppercase">
                    {item.category}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <div
                      className={`h-1.5 w-1.5 rounded-full ${
                        isConnected ? "bg-green-500 animate-pulse" : "bg-gray-300 dark:bg-gray-600"
                      }`}
                    />
                    <span className="text-[11px] font-medium text-gray-500 dark:text-gray-400 capitalize">
                      {isConnected ? "Connected" : "Disconnected"}
                    </span>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="col-span-full flex flex-col items-center justify-center py-12 text-gray-500 dark:text-gray-400">
            <p className="text-sm">No integrations match your search query.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Integrations;
