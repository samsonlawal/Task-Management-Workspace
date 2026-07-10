"use client";

import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { toggleSidebar } from "@/redux/Slices/uiSlice";
import Notification from "@/components/reuseables/Notification";
import stringToColor from "@/utils/stringToColor";
import { 
  Hash, 
  Plus, 
  ChevronDown, 
  ChevronRight, 
  Send, 
  Paperclip, 
  Smile, 
  UsersRound, 
  Bot, 
  MessageSquare, 
  Search, 
  X, 
  Check,
  Workflow,
  Globe,
  Lock,
  User,
  MoreVertical,
  Settings,
  Bell,
  PanelLeft
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { showSuccessToast } from "@/utils/toaster";
import { Message as ChatBubble } from "@/components/reuseables/chat/Message";
import { MessageBox as ChatInput } from "@/components/reuseables/chat/MessageBox";

interface Message {
  id: string;
  senderId: string;
  senderName: string;
  senderAvatar?: string;
  content: string;
  timestamp: string;
  isBot?: boolean;
  attachedFileName?: string;
}

interface Channel {
  id: string;
  name: string;
  description: string;
  isPrivate: boolean;
  memberCount: number;
}

interface Integration {
  id: string;
  name: string;
  type: "github" | "jira" | "slack" | "figma";
  description: string;
  avatarUrl?: string;
  connected: boolean;
}

function Chats() {
  const dispatch = useDispatch();
  const members = useSelector(
    (state: RootState) => state.MemberData?.members || [],
  );
  const { user } = useSelector(
    (state: RootState) => state.auth as { user: any }
  );

  // Parse workspace members
  const formattedMembers = members.map((member: any) => {
    const userObj = member.userId || member;
    return {
      id: userObj?._id || member?._id || "unknown",
      fullname: userObj?.fullname || member?.fullname || "Unknown User",
      email: userObj?.email || member?.email || "",
      profileImage: userObj?.profileImage || member?.profileImage || "none",
      role: member?.role || "Member",
      status: member?.status || "Active",
    };
  });

  // State
  const [activeChat, setActiveChat] = useState<{
    type: "channel" | "member" | "integration";
    id: string;
    name: string;
    description?: string;
  }>({
    type: "channel",
    id: "general",
    name: "general",
    description: "Company-wide announcements and work-based discussions",
  });

  const [channels, setChannels] = useState<Channel[]>([
    { id: "general", name: "general", description: "Company-wide announcements and work-based discussions", isPrivate: false, memberCount: formattedMembers.length || 3 },
    { id: "random", name: "random", description: "Fun things, jokes, and watercooler chat", isPrivate: false, memberCount: Math.max(1, formattedMembers.length - 1) },
    { id: "design-qa", name: "design-qa", description: "Reviewing design implementations and user interfaces", isPrivate: true, memberCount: 2 },
  ]);

  const [integrations, setIntegrations] = useState<Integration[]>([
    { id: "github", name: "GitHub Bot", type: "github", description: "Repository webhooks and alerts", connected: true },
    { id: "jira", name: "Jira Sync", type: "jira", description: "Sprint updates and issue tracking", connected: false },
    { id: "slack-bridge", name: "Slack Bridge", type: "slack", description: "Mirror messages to external Slack", connected: false },
  ]);

  const [messages, setMessages] = useState<Record<string, Message[]>>({
    general: [
      { id: "1", senderId: "system", senderName: "System", content: "Welcome to the general channel!", timestamp: "10:00 AM" },
      { id: "2", senderId: "member-1", senderName: "Sarah Jenkins", content: "Hey team! Did anyone push the update for the workspace selector layout?", timestamp: "10:05 AM" },
      { id: "3", senderId: "member-2", senderName: "Michael Chang", content: "Yes Sarah, I just merged it into main. Let me know if you run into conflicts.", timestamp: "10:08 AM" },
    ],
    random: [
      { id: "1", senderId: "member-1", senderName: "Sarah Jenkins", content: "Look at this cat picture I found 🐱", timestamp: "Yesterday" },
      { id: "2", senderId: "member-2", senderName: "Michael Chang", content: "Haha, amazing!", timestamp: "Yesterday" },
    ],
    "design-qa": [
      { id: "1", senderId: "member-1", senderName: "Sarah Jenkins", content: "Are we using outfit font for headings or poppins?", timestamp: "11:15 AM" },
      { id: "2", senderId: "system", senderName: "Design Bot", content: "Theme guidelines: Headings use Outfit; body text uses Poppins.", timestamp: "11:16 AM", isBot: true },
    ],
    github: [
      { id: "git-1", senderId: "github-bot", senderName: "GitHub", content: "🟢 [main] Commit by *s-lawal*: 'fix: resolve workspace select state issue' (https://github.com/task-manager/commit/ae4d12)", timestamp: "2:04 PM", isBot: true },
      { id: "git-2", senderId: "github-bot", senderName: "GitHub", content: "🟢 [main] Pull Request #14 Opened by *s-lawal*: 'feat/chat-channels-view'", timestamp: "2:10 PM", isBot: true },
    ]
  });

  // Collapsible sections
  const [sections, setSections] = useState({
    integrations: true,
    channels: true,
    members: true,
  });

  // Modals
  const [showChannelModal, setShowChannelModal] = useState(false);
  const [newChannel, setNewChannel] = useState({ name: "", description: "", isPrivate: false });
  
  const [showIntegrationModal, setShowIntegrationModal] = useState(false);
  const [showRightSidebar, setShowRightSidebar] = useState(false);

  // Inputs & Typing
  const [search, setSearch] = useState("");
  const [inputText, setInputText] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isTyping, setIsTyping] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, activeChat, isTyping]);

  const toggleSection = (section: keyof typeof sections) => {
    setSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const handleSendMessage = () => {
    if (!inputText.trim() && !selectedFile) return;

    const chatKey = activeChat.id;
    const newMessage: Message = {
      id: Date.now().toString(),
      senderId: "current-user",
      senderName: "You",
      content: inputText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      attachedFileName: selectedFile ? selectedFile.name : undefined,
    };

    setMessages((prev) => ({
      ...prev,
      [chatKey]: [...(prev[chatKey] || []), newMessage],
    }));

    setInputText("");
    setSelectedFile(null);

    // Simulate replies
    if (activeChat.type === "member") {
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        const replyMessage: Message = {
          id: (Date.now() + 1).toString(),
          senderId: activeChat.id,
          senderName: activeChat.name,
          content: getRandomReply(activeChat.name),
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
        setMessages((prev) => ({
          ...prev,
          [chatKey]: [...(prev[chatKey] || []), replyMessage],
        }));
      }, 1500);
    } else if (activeChat.type === "integration" && activeChat.id === "github") {
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        const replyMessage: Message = {
          id: (Date.now() + 1).toString(),
          senderId: "github-bot",
          senderName: "GitHub Bot",
          content: `🤖 Webhook command registered: "${inputText}". Repository health check: 100% operational. No pending alerts.`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isBot: true
        };
        setMessages((prev) => ({
          ...prev,
          [chatKey]: [...(prev[chatKey] || []), replyMessage],
        }));
      }, 1200);
    }
  };

  const getRandomReply = (name: string) => {
    const replies = [
      `Hey! Thanks for messaging. I'm currently looking into the dashboard tasks.`,
      `Let's coordinate during the standup tomorrow. Does that work?`,
      `Awesome! Let me review that change and get back to you shortly.`,
      `Sure, I'll take a look at it right away.`,
      `Got it. I'm finishing up this feature and will respond soon!`
    ];
    return replies[Math.floor(Math.random() * replies.length)];
  };

  const handleCreateChannel = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newChannel.name) return;

    const formattedName = newChannel.name.toLowerCase().replace(/\s+/g, "-");
    const newChanObj: Channel = {
      id: formattedName,
      name: formattedName,
      description: newChannel.description || "No description provided",
      isPrivate: newChannel.isPrivate,
      memberCount: 1,
    };

    setChannels((prev) => [...prev, newChanObj]);
    setMessages((prev) => ({
      ...prev,
      [formattedName]: [
        {
          id: Date.now().toString(),
          senderId: "system",
          senderName: "System",
          content: `Channel #${formattedName} created by you. This is the start of the channel history.`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        }
      ]
    }));

    setShowChannelModal(false);
    setNewChannel({ name: "", description: "", isPrivate: false });
    showSuccessToast({ message: `Channel #${formattedName} created successfully!` });

    // Auto switch to new channel
    setActiveChat({
      type: "channel",
      id: formattedName,
      name: formattedName,
      description: newChanObj.description,
    });
  };

  const handleConnectIntegration = (id: string) => {
    setIntegrations((prev) =>
      prev.map((integration) => {
        if (integration.id === id) {
          const updatedState = !integration.connected;
          if (updatedState) {
            showSuccessToast({ message: `${integration.name} connected successfully!` });
            // Add initial welcome messages if first time
            if (!messages[id]) {
              setMessages((prevMsgs) => ({
                ...prevMsgs,
                [id]: [
                  {
                    id: Date.now().toString(),
                    senderId: id,
                    senderName: integration.name,
                    content: `🤖 Welcome to the ${integration.name} integration feed! Syncing real-time updates now...`,
                    timestamp: "Just now",
                    isBot: true
                  }
                ]
              }));
            }
          } else {
            showSuccessToast({ message: `${integration.name} disconnected.` });
          }
          return { ...integration, connected: updatedState };
        }
        return integration;
      })
    );
  };

  const filteredMembers = formattedMembers.filter((m) =>
    m.fullname.toLowerCase().includes(search.toLowerCase())
  );
  const currentChatMessages = messages[activeChat.id] || [];

  return (
    <div className="flex h-full w-full flex-col overflow-hidden bg-white dark:bg-[#111]">
      {/* Top Unified Header Row */}
      <div className="sticky top-0 w-full bg-[white] dark:bg-[#111] border-b border-[#565656]/10 z-20">
        <div className="poppins flex w-full items-center justify-between px-4 py-[11px]">
          <div className="flex flex-row items-center gap-1">
            <button
              onClick={() => dispatch(toggleSidebar())}
              className="flex lg:hidden p-1 text-[#707070] hover:text-[#111] dark:hover:text-white transition-all duration-300"
            >
              <PanelLeft size={18} strokeWidth={1.6} />
            </button>
            
            <div className="flex items-center gap-2 text-sm lg:text-[15px] text-[#707070] dark:text-[#a0a0a0]">
              <span className="font-semibold text-[#111] dark:text-white">Chat</span>
              <span className="text-[#565656]/30 dark:text-zinc-700">/</span>
              <div className="flex items-center gap-1.5 font-medium text-indigo-600 dark:text-indigo-400">
                {activeChat.type === "channel" ? (
                  <Hash className="w-4 h-4" />
                ) : activeChat.type === "integration" ? (
                  <Bot className="w-4 h-4 text-emerald-500" />
                ) : (
                  <User className="w-4 h-4 text-indigo-400" />
                )}
                <span>{activeChat.name}</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            {/* Toggle right sidebar button (mobile/tablet only) */}
            <button
              onClick={() => setShowRightSidebar(!showRightSidebar)}
              className="flex lg:hidden p-1.5 text-gray-400 hover:text-[#111] dark:hover:text-white transition-colors rounded-md hover:bg-gray-100 dark:hover:bg-zinc-800"
              title="Show Chat Members & Channels"
            >
              <UsersRound className="w-4 h-4" />
            </button>

            {/* Active chat settings icons */}
            <div className="hidden sm:flex items-center gap-3 text-gray-400 border-r border-[#565656]/10 pr-4">
              <button className="hover:text-black dark:hover:text-white transition-colors"><Bell className="w-4 h-4" /></button>
              <button className="hover:text-black dark:hover:text-white transition-colors"><Settings className="w-4 h-4" /></button>
              <button className="hover:text-black dark:hover:text-white transition-colors"><MoreVertical className="w-4 h-4" /></button>
            </div>
            
            {/* Global Notification system */}
            {/* <Notification /> */}
          </div>
        </div>
      </div>

      {/* Main Chat Area Grid (Message Stream & Right Sidebar) */}
      <div className="flex flex-1 flex-row overflow-hidden w-full relative">
        {/* 1. MAIN CHAT PANEL (Placed on the left) */}
        <div className="flex flex-1 flex-col h-full bg-white dark:bg-[#111] relative">
          
          {/* Message Stream */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {currentChatMessages.map((message) => {
              const isMe = message.senderId === "current-user";
              return (
                <ChatBubble
                  key={message.id}
                  senderName={isMe ? "You" : message.senderName}
                  senderAvatar={isMe ? (user?.profileImage || "none") : message.senderAvatar}
                  content={message.content}
                  timestamp={message.timestamp}
                  isMe={isMe}
                  isBot={message.isBot}
                  attachedFileName={message.attachedFileName}
                />
              );
            })}

            {isTyping && (
              <div className="flex gap-3 items-start max-w-xl">
                <span
                  className="flex h-8 w-8 items-center justify-center rounded-full text-[11px] text-white font-bold"
                  style={{ backgroundColor: stringToColor(activeChat.name) }}
                >
                  {activeChat.name.charAt(0).toUpperCase()}
                </span>
                <div className="flex flex-col space-y-1">
                  <span className="text-[12px] font-semibold text-[#111] dark:text-white">{activeChat.name}</span>
                  <div className="bg-gray-100 dark:bg-zinc-800/80 rounded-[8px] px-4 py-2.5 flex items-center space-x-1">
                    <span className="h-1.5 w-1.5 bg-[#707070] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="h-1.5 w-1.5 bg-[#707070] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="h-1.5 w-1.5 bg-[#707070] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Reusable Message Input Box */}
          <ChatInput
            value={inputText}
            onChange={(val) => setInputText(val)}
            onSend={handleSendMessage}
            placeholder={`Message ${activeChat.type === "channel" ? "#" : ""}${activeChat.name}...`}
            selectedFile={selectedFile}
            onFileSelect={(file) => setSelectedFile(file)}
            className="p-4 border-t border-[#565656]/10"
          />
        </div>

        {/* Backdrop for mobile right-sidebar overlay */}
        {showRightSidebar && (
          <div
            onClick={() => setShowRightSidebar(false)}
            className="fixed inset-0 z-10 bg-black/25 backdrop-blur-xs lg:hidden"
          />
        )}

        {/* 2. INNER DEDICATED SIDEBAR (Placed on the right side) */}
        <div 
          className={`absolute lg:relative right-0 top-0 z-20 flex h-full w-64 flex-col border-l border-[#565656]/10 bg-white lg:bg-gray-50/50 dark:bg-[#111] lg:dark:bg-[#161616]/40 transition-transform duration-300 transform lg:translate-x-0 ${
            showRightSidebar ? "translate-x-0 shadow-2xl" : "translate-x-full lg:translate-x-0"
          }`}
        >
          {/* Search */}
          <div className="p-4 border-b border-[#565656]/10">
            <div className="relative flex items-center">
              <Search className="absolute left-3 w-4 h-4 text-[#707070]" />
              <input
                type="text"
                placeholder="Search chat or members..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="h-[36px] w-full rounded-[6px] border border-[#565656]/15 bg-white pl-9 pr-3 text-[12px] placeholder:text-[#707070] focus:border-[#565656]/30 focus:outline-none dark:bg-[#111] dark:border-[#565656]/20 dark:text-white"
              />
            </div>
          </div>

          {/* Scrollable list of chats */}
          <div className="flex-1 overflow-y-auto p-3 space-y-4 scrollbar-hide">
            
            {/* A. INTEGRATIONS SECTION */}
            <div className="space-y-1">
              <div className="flex items-center justify-between px-2 py-1 text-[11px] font-semibold tracking-wider text-[#707070] uppercase">
                <button 
                  onClick={() => toggleSection("integrations")}
                  className="flex items-center gap-1 hover:text-[#111] dark:hover:text-white"
                >
                  {sections.integrations ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
                  <span>Integrations</span>
                </button>
                <button 
                  onClick={() => setShowIntegrationModal(true)}
                  className="rounded p-0.5 hover:bg-[#565656]/10 text-[#707070] hover:text-[#111] dark:hover:text-white"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              
              <AnimatePresence initial={false}>
                {sections.integrations && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="space-y-0.5 overflow-hidden"
                  >
                    {integrations.filter(i => i.connected).map((integration) => (
                      <button
                        key={integration.id}
                        onClick={() =>
                          setActiveChat({
                            type: "integration",
                            id: integration.id,
                            name: integration.name,
                            description: integration.description,
                          })
                        }
                        className={`flex w-full items-center gap-2.5 rounded-[5px] px-2.5 py-1.5 text-left text-[13px] font-medium transition-all duration-200 hover:bg-[#565656]/10 ${
                          activeChat.id === integration.id
                            ? "bg-[#565656]/10 text-[#111] dark:text-white"
                            : "text-[#707070] dark:text-[#a0a0a0]"
                        }`}
                      >
                        <Bot className="w-4 h-4 text-emerald-500" />
                        <span className="truncate">{integration.name}</span>
                      </button>
                    ))}
                    {integrations.filter(i => i.connected).length === 0 && (
                      <p className="px-3 py-1 text-[11px] text-[#707070]/80 italic">No integrations connected.</p>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* B. CHANNELS SECTION */}
            <div className="space-y-1">
              <div className="flex items-center justify-between px-2 py-1 text-[11px] font-semibold tracking-wider text-[#707070] uppercase">
                <button 
                  onClick={() => toggleSection("channels")}
                  className="flex items-center gap-1 hover:text-[#111] dark:hover:text-white"
                >
                  {sections.channels ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
                  <span>Channels</span>
                </button>
                <button 
                  onClick={() => setShowChannelModal(true)}
                  className="rounded p-0.5 hover:bg-[#565656]/10 text-[#707070] hover:text-[#111] dark:hover:text-white"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <AnimatePresence initial={false}>
                {sections.channels && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="space-y-0.5 overflow-hidden"
                  >
                    {channels.map((channel) => (
                      <button
                        key={channel.id}
                        onClick={() =>
                          setActiveChat({
                            type: "channel",
                            id: channel.id,
                            name: channel.name,
                            description: channel.description,
                          })
                        }
                        className={`flex w-full items-center justify-between rounded-[5px] px-2.5 py-1.5 text-left text-[13px] font-medium transition-all duration-200 hover:bg-[#565656]/10 ${
                          activeChat.id === channel.id
                            ? "bg-[#565656]/10 text-[#111] dark:text-white"
                            : "text-[#707070] dark:text-[#a0a0a0]"
                        }`}
                      >
                        <div className="flex items-center gap-2 truncate">
                          {channel.isPrivate ? <Lock className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" /> : <Hash className="w-4 h-4 flex-shrink-0" />}
                          <span className="truncate">{channel.name}</span>
                        </div>
                        <span className="text-[10px] bg-gray-200/50 dark:bg-zinc-800 px-1.5 py-0.5 rounded text-gray-500">
                          {channel.memberCount}
                        </span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* C. MEMBERS / DIRECT MESSAGES SECTION */}
            <div className="space-y-1">
              <div className="flex items-center justify-between px-2 py-1 text-[11px] font-semibold tracking-wider text-[#707070] uppercase">
                <button 
                  onClick={() => toggleSection("members")}
                  className="flex items-center gap-1 hover:text-[#111] dark:hover:text-white"
                >
                  {sections.members ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
                  <span>Direct Messages</span>
                </button>
              </div>

              <AnimatePresence initial={false}>
                {sections.members && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="space-y-0.5 overflow-hidden"
                  >
                    {filteredMembers.map((member) => (
                      <button
                        key={member.id}
                        onClick={() =>
                          setActiveChat({
                            type: "member",
                            id: member.id,
                            name: member.fullname,
                            description: member.email,
                          })
                        }
                        className={`flex w-full items-center gap-2.5 rounded-[5px] px-2 py-1.5 text-left text-[13px] font-medium transition-all duration-200 hover:bg-[#565656]/10 ${
                          activeChat.id === member.id
                            ? "bg-[#565656]/10 text-[#111] dark:text-white"
                            : "text-[#707070] dark:text-[#a0a0a0]"
                        }`}
                      >
                        <div className="relative flex-shrink-0">
                          {member.profileImage === "none" ? (
                            <span
                              className="flex h-6 w-6 items-center justify-center rounded-full text-[10px] text-white font-bold"
                              style={{ backgroundColor: stringToColor(member.fullname) }}
                            >
                              {member.fullname.charAt(0).toUpperCase()}
                            </span>
                          ) : (
                            <img
                              src={member.profileImage}
                              alt=""
                              className="h-6 w-6 rounded-full object-cover"
                            />
                          )}
                          <span className={`absolute bottom-0 right-0 h-2 w-2 rounded-full border border-white dark:border-[#111] ${member.status === "Suspended" ? "bg-red-500" : "bg-green-500"}`} />
                        </div>
                        <div className="flex flex-col truncate leading-tight">
                          <span className="truncate">{member.fullname}</span>
                          <span className="text-[10px] text-[#707070] truncate">{member.role}</span>
                        </div>
                      </button>
                    ))}
                    {filteredMembers.length === 0 && (
                      <p className="px-3 py-1 text-[11px] text-[#707070]/80 italic">No members found.</p>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </div>
      </div>
    </div>

      {/* 3. MODALS */}
      {/* Create Channel Modal */}
      {showChannelModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-[420px] rounded-lg border border-[#565656]/10 bg-white p-6 shadow-xl dark:bg-[#1a1a1a]"
          >
            <div className="flex items-center justify-between border-b border-[#565656]/10 pb-3">
              <h2 className="text-md font-semibold text-[#111] dark:text-white">Create a Channel</h2>
              <button onClick={() => setShowChannelModal(false)} className="text-gray-400 hover:text-black dark:hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>
            
            <form onSubmit={handleCreateChannel} className="mt-4 space-y-4">
              <div className="space-y-1">
                <label className="text-[12px] font-medium text-[#707070]">Name</label>
                <div className="relative flex items-center">
                  <span className="absolute left-3 text-gray-400 text-sm font-semibold">#</span>
                  <input
                    type="text"
                    required
                    placeholder="e.g. marketing-campaign"
                    value={newChannel.name}
                    onChange={(e) => setNewChannel((prev) => ({ ...prev, name: e.target.value }))}
                    className="h-10 w-full rounded-md border border-[#565656]/20 bg-transparent pl-7 pr-3 text-sm focus:border-black focus:outline-none dark:text-white dark:focus:border-white"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[12px] font-medium text-[#707070]">Description (optional)</label>
                <textarea
                  placeholder="What is this channel about?"
                  value={newChannel.description}
                  onChange={(e) => setNewChannel((prev) => ({ ...prev, description: e.target.value }))}
                  className="h-20 w-full rounded-md border border-[#565656]/20 bg-transparent p-3 text-sm focus:border-black focus:outline-none dark:text-white dark:focus:border-white"
                />
              </div>

              <div className="flex items-center justify-between py-2">
                <div className="flex flex-col">
                  <span className="text-sm font-semibold text-[#111] dark:text-white">Make Private</span>
                  <span className="text-[11px] text-gray-400">When private, it can only be viewed or joined by invitation</span>
                </div>
                <input
                  type="checkbox"
                  checked={newChannel.isPrivate}
                  onChange={(e) => setNewChannel((prev) => ({ ...prev, isPrivate: e.target.checked }))}
                  className="w-4 h-4 accent-black dark:accent-white"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-[#565656]/10">
                <button
                  type="button"
                  onClick={() => setShowChannelModal(false)}
                  className="rounded-md border border-[#565656]/20 px-4 py-2 text-sm font-medium hover:bg-gray-50 dark:hover:bg-zinc-800 text-gray-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-md bg-[#111] dark:bg-white text-white dark:text-[#111] px-4 py-2 text-sm font-medium hover:opacity-90"
                >
                  Create
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {/* Add Integration Modal */}
      {showIntegrationModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-[500px] rounded-lg border border-[#565656]/10 bg-white p-6 shadow-xl dark:bg-[#1a1a1a]"
          >
            <div className="flex items-center justify-between border-b border-[#565656]/10 pb-3">
              <h2 className="text-md font-semibold text-[#111] dark:text-white">Integrate Tools</h2>
              <button onClick={() => setShowIntegrationModal(false)} className="text-gray-400 hover:text-black dark:hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="mt-4 space-y-4 max-h-[350px] overflow-y-auto pr-1">
              <p className="text-[12px] text-[#707070]">Choose workspace applications to link with your Chat stream. Connected integrations push real-time activity and bots to your chats.</p>
              
              {integrations.map((app) => (
                <div key={app.id} className="flex items-center justify-between border border-[#565656]/15 rounded-lg p-3.5 bg-gray-50/30 dark:bg-[#161616]/30">
                  <div className="flex items-start gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-white shadow-sm border border-[#565656]/10 dark:bg-zinc-900">
                      {app.type === "github" ? (
                        <Globe className="w-6 h-6 text-black dark:text-white" />
                      ) : app.type === "slack" ? (
                        <MessageSquare className="w-5 h-5 text-indigo-500" />
                      ) : (
                        <Workflow className="w-5 h-5 text-amber-500" />
                      )}
                    </span>
                    <div className="flex flex-col leading-tight">
                      <span className="text-sm font-semibold text-[#111] dark:text-white">{app.name}</span>
                      <span className="text-[11px] text-gray-400 mt-0.5">{app.description}</span>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => handleConnectIntegration(app.id)}
                    className={`rounded-md px-3.5 py-1.5 text-xs font-semibold transition-colors ${
                      app.connected
                        ? "bg-red-500/10 hover:bg-red-500/20 text-red-500"
                        : "bg-[#111] dark:bg-white hover:opacity-90 text-white dark:text-[#111]"
                    }`}
                  >
                    {app.connected ? "Disconnect" : "Connect"}
                  </button>
                </div>
              ))}
            </div>

            <div className="flex justify-end pt-4 border-t border-[#565656]/10 mt-5">
              <button
                onClick={() => setShowIntegrationModal(false)}
                className="rounded-md bg-[#111] dark:bg-white text-white dark:text-[#111] px-5 py-2 text-sm font-medium hover:opacity-90"
              >
                Done
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}

export default Chats;
