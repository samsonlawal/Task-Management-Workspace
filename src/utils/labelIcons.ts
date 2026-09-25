import { 
  Bug, Sparkles, TrendingUp, Code, CheckCircle2, Zap,
  Flame, AlertTriangle, ArrowDown, Ban, Palette, Search,
  Layout, Layers, FileText, Server, Shield, Database,
  Megaphone, BarChart2, User, CreditCard, Calendar, Lightbulb, Tag
} from "lucide-react";

export const LABEL_ICON_MAP: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  bug: Bug,
  sparkles: Sparkles,
  "trending-up": TrendingUp,
  code: Code,
  "check-circle-2": CheckCircle2,
  zap: Zap,
  flame: Flame,
  "alert-triangle": AlertTriangle,
  "arrow-down": ArrowDown,
  ban: Ban,
  palette: Palette,
  search: Search,
  layout: Layout,
  layers: Layers,
  "file-text": FileText,
  server: Server,
  shield: Shield,
  database: Database,
  megaphone: Megaphone,
  "bar-chart-2": BarChart2,
  user: User,
  "credit-card": CreditCard,
  calendar: Calendar,
  lightbulb: Lightbulb,
  tag: Tag,
};
