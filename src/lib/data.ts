export interface MilestoneType {
    title: string
    description: string
    completed: boolean
  }
  
  export interface FeatureType {
    id: string
    title: string
    description: string
    icon: string
    category: string
    userType: "patient" | "provider"
    status: "live" | "development" | "planned" | "new" | "coming"
    votes: number
    progress?: number
    milestones?: MilestoneType[]
    learnMoreUrl?: string
  }
  

export const features: FeatureType[] = [
  // Patient/Payor Features
  {
    id: "bill-upload",
    title: "Bill Upload & Analysis",
    description:
      "Upload medical bills (itemized, EOB, UB-04) for automatic analysis and comparison against similar bills from the same provider and insurer.",
    icon: "fileText",
    category: "core",
    userType: "patient",
    status: "live",
    votes: 342,
    progress: 100,
    milestones: [
      { title: "Basic upload functionality", description: "Support for PDF and image uploads", completed: true },
      { title: "OCR integration", description: "Automatic text extraction from documents", completed: true },
      { title: "CPT code matching", description: "Identify and match CPT codes from bills", completed: true },
      { title: "Price comparison", description: "Compare against similar bills in database", completed: true },
    ],
  },
  {
    id: "gamified-engagement",
    title: "Gamified Engagement",
    description:
      "Duolingo-style engagement with streaks, achievements, and social campaigns to compete in 'bill drives' for increased participation.",
    icon: "trophy",
    category: "engagement",
    userType: "patient",
    status: "development",
    votes: 280,
    progress: 65,
    milestones: [
      { title: "User achievements", description: "Badges and rewards for participation", completed: true },
      { title: "Streaks system", description: "Track and reward consistent usage", completed: true },
      { title: "Social campaigns", description: "Bill drive competitions between users", completed: false },
      { title: "Leaderboards", description: "Community rankings and recognition", completed: false },
    ],
  },
  {
    id: "price-transparency",
    title: "Price Transparency Dashboard",
    description:
      "Interactive dashboard showing how your medical bills compare to recent uploads from the same providers and insurers.",
    icon: "barChart",
    category: "analytics",
    userType: "patient",
    status: "live",
    votes: 315,
    progress: 100,
  },
  {
    id: "bill-counter",
    title: "Community Bill Counter",
    description:
      "Live counter showing total bills uploaded and analyzed, creating a sense of community contribution to price transparency.",
    icon: "fileSearch",
    category: "engagement",
    userType: "patient",
    status: "live",
    votes: 187,
    progress: 100,
  },
  {
    id: "ambassador-program",
    title: "Dorsal Ambassadors",
    description:
      "Program for power users to become ambassadors, helping others navigate the medical billing system and earning rewards.",
    icon: "userCog",
    category: "engagement",
    userType: "patient",
    status: "planned",
    votes: 156,
  },
  {
    id: "automated-appeals",
    title: "One-Click Appeals",
    description:
      "AI-powered system to automatically generate and file appeals for suspicious charges, with progress tracking and updates.",
    icon: "badgeAlert",
    category: "billing",
    userType: "patient",
    status: "development",
    votes: 423,
    progress: 40,
    milestones: [
      {
        title: "Suspicious charge detection",
        description: "AI analysis to identify potential overcharges",
        completed: true,
      },
      { title: "Appeal document generation", description: "Automated creation of appeal documents", completed: true },
      { title: "Progress tracking", description: "Real-time updates on appeal status", completed: false },
      { title: "Provider communication", description: "Direct integration with provider systems", completed: false },
    ],
  },
  {
    id: "payment-integration",
    title: "Integrated Payments",
    description:
      "Connect directly to payment systems to pay verified, fair medical bills after analysis and potential appeals.",
    icon: "wallet",
    category: "billing",
    userType: "patient",
    status: "coming",
    votes: 389,
  },
  {
    id: "hipaa-compliance",
    title: "HIPAA-Compliant Chart Data",
    description:
      "Secure integration with medical chart data to better identify billing discrepancies and improve appeal success rates.",
    icon: "shield",
    category: "security",
    userType: "patient",
    status: "planned",
    votes: 276,
  },

  // Provider Features
  {
    id: "provider-dashboard",
    title: "Provider Transparency Dashboard",
    description:
      "Dashboard for providers to see how their pricing compares to market rates, helping identify competitive pricing opportunities.",
    icon: "barChart",
    category: "analytics",
    userType: "provider",
    status: "development",
    votes: 198,
    progress: 75,
    milestones: [
      { title: "Market rate analysis", description: "Comparison with regional pricing data", completed: true },
      { title: "Competitive positioning", description: "Identify pricing opportunities", completed: true },
      { title: "Patient feedback integration", description: "Incorporate patient sentiment data", completed: false },
    ],
  },
  {
    id: "billing-optimization",
    title: "Billing Code Optimization",
    description:
      "AI-powered suggestions for accurate coding to reduce rejected claims and improve reimbursement rates.",
    icon: "sparkles",
    category: "billing",
    userType: "provider",
    status: "live",
    votes: 245,
    progress: 100,
  },
  {
    id: "patient-satisfaction",
    title: "Billing Satisfaction Metrics",
    description:
      "Track patient satisfaction with billing processes and identify areas for improvement in the patient financial experience.",
    icon: "users",
    category: "analytics",
    userType: "provider",
    status: "planned",
    votes: 167,
  },
  {
    id: "claim-resolution",
    title: "Accelerated Claim Resolution",
    description:
      "Streamlined process for resolving disputed claims with patients who use Dorsal.fyi, reducing administrative overhead.",
    icon: "receipt",
    category: "billing",
    userType: "provider",
    status: "coming",
    votes: 213,
  },
  {
    id: "price-transparency-certification",
    title: "Price Transparency Certification",
    description:
      "Certification program for providers who maintain transparent pricing practices, which can be displayed to patients as a trust signal.",
    icon: "shield",
    category: "engagement",
    userType: "provider",
    status: "planned",
    votes: 178,
  },
  {
    id: "medical-billing-education",
    title: "Patient Billing Education Portal",
    description:
      "Resources for providers to educate patients about medical billing processes, improving understanding and reducing disputes.",
    icon: "fileText",
    category: "engagement",
    userType: "provider",
    status: "development",
    votes: 156,
    progress: 30,
    milestones: [
      {
        title: "Educational content creation",
        description: "Develop clear, accessible billing guides",
        completed: true,
      },
      { title: "Interactive tutorials", description: "Step-by-step billing process walkthroughs", completed: false },
      {
        title: "Provider customization",
        description: "Ability to tailor content to specific practices",
        completed: false,
      },
    ],
  },
]
