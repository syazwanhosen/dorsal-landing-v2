
export interface MilestoneType {
  title: string;
  description: string;
  completed: boolean;
}

export interface FeatureType {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: string;
  status: "Live" | "In Progress" | "Coming Soon" | "Proposal" | "Mothballed" | "MVP";
  votes: number | null;
  progress?: number | null;
  learnMoreUrl?: string;
}

export const features: FeatureType[] = [
  {
    id: "price-transparency-dashboard",
    title: "Price Transparency Dashboard",
    description: "Procedure Data (No Surprises Act)",
    icon: "fileText",
    category: "Data.fyi",
    status: "Live",
    votes: 10,
    progress: null
  },
  {
    id: "bulk-claims-integration",
    title: "Bulk Claims Integration",
    description: "Integrate bulk claims data (ANSI 837)",
    icon: "fileText",
    category: "Data.fyi",
    status: "In Progress",
    votes: 10,
    progress: null
  },
  {
    id: "real-time-claims-intelligence",
    title: "Real-Time Claims Intelligence",
    description: "Connect uploaded medical bills to public data",
    icon: "fileText",
    category: "Data.fyi, Audit & Appeals",
    status: "In Progress",
    votes: 10,
    progress: null
  },
  {
    id: "bill-upload",
    title: "Bill Upload",
    description: "Upload medical bills (itemized, EOB, UB-04)",
    icon: "fileText",
    category: "Audit & Appeals, Data.fyi",
    status: "MVP",
    votes: 10,
    progress: null
  },
  {
    id: "bill-audit",
    title: "Bill Audit",
    description: "Automatic analysis and comparison against similar bills from the same provider and insurer.",
    icon: "fileText",
    category: "Audit & Appeals",
    status: "In Progress",
    votes: 10,
    progress: null
  },
  {
    id: "appeals-agents",
    title: "Appeals Agents",
    description: "AI-powered system to automatically generate and file appeals for suspicious charges, with progress tracking and updates.",
    icon: "fileText",
    category: "Audit & Appeals",
    status: "In Progress",
    votes: 10,
    progress: null
  },
  {
    id: "chart-/-ehr-integration",
    title: "Chart / EHR Integration",
    description: "Secure integration with medical chart data to better identify billing discrepancies and improve appeal success rates.",
    icon: "fileText",
    category: "Audit & Appeals, Enterprise",
    status: "In Progress",
    votes: 10,
    progress: null
  },
  {
    id: "plaid,-hsa-&-fsa-integration",
    title: "Plaid, HSA & FSA Integration",
    description: "Connect directly to payment systems to pay verified, fair medical bills after analysis and potential appeals.",
    icon: "fileText",
    category: "Audit & Appeals, Enterprise",
    status: "Coming Soon",
    votes: 10,
    progress: null
  },
  {
    id: "community-roadmap",
    title: "Community Roadmap",
    description: "Tell us what you want Dorsal to become!",
    icon: "fileText",
    category: "Community",
    status: "In Progress",
    votes: 10,
    progress: null
  },
  {
    id: "community-win-tracker",
    title: "Community Win Tracker",
    description: "Live counter showing total bills uploaded and analyzed, creating a sense of community contribution to price transparency.",
    icon: "fileText",
    category: "Community, Data.fyi",
    status: "In Progress",
    votes: 10,
    progress: null
  },
  {
    id: "patient-education-hub",
    title: "Patient Education Hub",
    description: "Resources to educate patients about medical billing processes, improving understanding and reducing disputes.",
    icon: "fileText",
    category: "Community",
    status: "MVP",
    votes: 10,
    progress: null
  },
  {
    id: "community-bill-drive",
    title: "Community Bill Drive",
    description: "Social campaigns to compete in 'bill drives' for increased participation navigate the medical billing system and earning rewards.",
    icon: "fileText",
    category: "Community, Data.fyi",
    status: "Coming Soon",
    votes: 10,
    progress: null
  },
  {
    id: "dorsal-ambassadors",
    title: "Dorsal Ambassadors",
    description: "Program for power users to become ambassadors, helping others navigate the medical billing system and earning rewards.",
    icon: "fileText",
    category: "Community",
    status: "Coming Soon",
    votes: 10,
    progress: null
  },
  {
    id: "dorsal-provider-certification",
    title: "Dorsal Provider Certification",
    description: "Certification program for providers who maintain transparent pricing practices, which can be displayed to patients as a trust signal.",
    icon: "fileText",
    category: "Community, Enterprise",
    status: "Proposal",
    votes: 10,
    progress: null
  },
  {
    id: "wellness-marketplace",
    title: "Wellness Marketplace",
    description: "Use your Dorsal Dollars points for your fitness, wellness, and other wellbeing needs",
    icon: "fileText",
    category: "Community, Enterprise",
    status: "Proposal",
    votes: 10,
    progress: null
  },
  {
    id: "provider-market-intelligence",
    title: "Provider Market Intelligence",
    description: "Dashboard for providers to see how their pricing compares to market rates, helping identify competitive pricing opportunities.",
    icon: "fileText",
    category: "Enterprise, Data.fyi",
    status: "In Progress",
    votes: 10,
    progress: null
  },
  {
    id: "disputed-claim-resolution-tool",
    title: "Disputed Claim Resolution Tool",
    description: "Streamlined process for resolving disputed claims with patients who use Dorsal.fyi, reducing administrative overhead.",
    icon: "fileText",
    category: "Enterprise, Audit & Appeals",
    status: "In Progress",
    votes: 10,
    progress: null
  },
  {
    id: "patient-experience-dashboard",
    title: "Patient Experience Dashboard",
    description: "Track patient satisfaction with billing processes and identify areas for improvement in the patient financial experience.",
    icon: "fileText",
    category: "Enterprise, Community",
    status: "Coming Soon",
    votes: 10,
    progress: null
  },
  {
    id: "loyalty-&-patient-education",
    title: "Loyalty & Patient Education",
    description: "Reward patients for reading EOBs, adhering to care plans, and loyalty",
    icon: "fileText",
    category: "Enterprise, Companion",
    status: "Proposal",
    votes: 10,
    progress: null
  },
  {
    id: "personal-bill-management",
    title: "Personal Bill Management",
    description: "Rocket Money for YOUR Medical Bills",
    icon: "fileText",
    category: "Companion",
    status: "MVP",
    votes: 10,
    progress: null
  },
  {
    id: "family-bill-management",
    title: "Family Bill Management",
    description: "Rocket Money for your WHOLE FAM",
    icon: "fileText",
    category: "Companion",
    status: "In Progress",
    votes: 10,
    progress: null
  },
  {
    id: "company-bill-management",
    title: "Company Bill Management",
    description: "Rocket Money for Self-Funded employee benefits programs",
    icon: "fileText",
    category: "Companion, Enterprise",
    status: "Proposal",
    votes: 10,
    progress: null
  },
  {
    id: "multilingual-support",
    title: "Multilingual Support",
    description: "Multilingual support, optionally tuning to the local patient population's needs, but accessible to all",
    icon: "fileText",
    category: "Companion, Community, Enterprise",
    status: "In Progress",
    votes: 10,
    progress: null
  },
  {
    id: "reading-level-support",
    title: "Reading Level Support",
    description: "Multiple levels of difficulty, from ELI5 to standard to PhD",
    icon: "fileText",
    category: "Companion, Enterprise",
    status: "In Progress",
    votes: 10,
    progress: null
  },

];
