import { useState, useEffect } from "react"
import axios from "axios"

import { Badge } from "@/components/ui/badge"
import {
  ChevronUp,
  ChevronDown,
  Circle,
  CheckCircle2,
  Clock,
  AlertCircle,
  FileText,
  Receipt,
  FileSearch,
  BarChart3,
  Stethoscope,
  Shield,
  Wallet,
  Trophy,
  UserCog,
  BadgeAlert,
  Sparkles,
  Users,
} from "lucide-react"
import type { FeatureType } from "@/lib/data"
import { getVote, setVote } from "@/lib/voteStorage"
import { Button } from "@/components/ui/buttons/button"

interface FeatureCardProps {
  feature: FeatureType
}

const baseUrl = import.meta.env.VITE_LANDING_BASE_URL;

export function FeatureCard({ feature }: FeatureCardProps) {
  const [votes, setVotes] = useState(0)
  const [hasVoted, setHasVoted] = useState<"upvote" | "downvote" | null>(null)

  const handleVote = async (value: number, _voteType: string) => {
    const stored = await getVote(feature.id);

    if (
      (stored?.voted &&
        (
          (value === 1 && stored?.voted === "upvote" && votes >= stored?.count) ||
          (value === -1 && stored?.voted === "downvote" && votes <= stored?.count)
        )
      ) ||
      (value === -1 && votes <= 0)
    ) {
      return;
    }

    const type = value === 1 ? "upvote" : "downvote";

    try {
      const res = await axios.post(`${baseUrl}/vote`, {
        id: feature.id,
        type,
      });

      setVotes(res.data.totalVotes);
      setHasVoted(value === 1 ? "upvote" : "downvote");
      const prevCount = typeof stored?.count === "number" ? stored.count : 0;
      await setVote(feature.id, { count: value === 1 ? prevCount + 1 : Math.max(prevCount - 1, 0), voted: type });
    } catch (error) {
      console.error("Voting failed", error);
    }
  };

  const getFeatureIcon = (iconName: string) => {
    const icons = {
      fileText: <FileText className="h-5 w-5 text-purple-600" />,
      receipt: <Receipt className="h-5 w-5 text-purple-600" />,
      fileSearch: <FileSearch className="h-5 w-5 text-purple-600" />,
      barChart: <BarChart3 className="h-5 w-5 text-purple-600" />,
      stethoscope: <Stethoscope className="h-5 w-5 text-purple-600" />,
      shield: <Shield className="h-5 w-5 text-purple-600" />,
      wallet: <Wallet className="h-5 w-5 text-purple-600" />,
      trophy: <Trophy className="h-5 w-5 text-purple-600" />,
      userCog: <UserCog className="h-5 w-5 text-purple-600" />,
      badgeAlert: <BadgeAlert className="h-5 w-5 text-purple-600" />,
      sparkles: <Sparkles className="h-5 w-5 text-purple-600" />,
      users: <Users className="h-5 w-5 text-purple-600" />,
    }

    return icons[iconName as keyof typeof icons] || <FileText className="h-5 w-5 text-purple-600" />
  }

  const getStatusIcon = (status: string) => {
  switch (status) {
    case "Live":
      return <CheckCircle2 className="h-4 w-4 text-green-600" />;
    case "In Progress":
      return <Clock className="h-4 w-4 text-blue-600" />;
    case "Coming Soon":
      return <AlertCircle className="h-4 w-4 text-yellow-500" />;
    case "Proposal":
      return <AlertCircle className="h-4 w-4 text-purple-600" />;
    case "Mothballed":
      return <Circle className="h-4 w-4 text-gray-500" />;
    case "MVP":
      return <CheckCircle2 className="h-4 w-4 text-indigo-500" />;
    default:
      return <AlertCircle className="h-4 w-4 text-gray-400" />;
  }
};

  const getStatusText = (status: string) => {
  switch (status) {
    case "Live":
      return "Live";
    case "In Progress":
      return "In Progress";
    case "Coming Soon":
      return "Coming Soon";
    case "Proposal":
      return "Proposal";
    case "Mothballed":
      return "Mothballed";
    case "MVP":
      return "MVP";
    default:
      return status;
  }
 };

  const getStatusColor = (status: string) => {
  switch (status) {
    case "Live":
      return "bg-green-50 text-green-700 border-green-200";
    case "In Progress":
      return "bg-blue-50 text-blue-700 border-blue-200";
    case "Coming Soon":
      return "bg-yellow-50 text-yellow-700 border-yellow-200";
    case "Proposal":
      return "bg-purple-50 text-purple-700 border-purple-200";
    case "Mothballed":
      return "bg-gray-100 text-gray-600 border-gray-300";
    case "MVP":
      return "bg-indigo-50 text-indigo-700 border-indigo-200";
    default:
      return "bg-gray-50 text-gray-700 border-gray-200";
  }
};


  useEffect(() => {
    if (!feature?.id) return;

    axios
      .get(`${baseUrl}/votes/${feature.id}`)
      .then(async (res) => {
        const stored = await getVote(feature.id);
        setVotes(res.data.totalVotes);
        setHasVoted(res.data.totalVotes ? (stored?.voted ?? null) : null);
        await setVote(feature.id, { count: res.data.totalVotes, voted: res.data.totalVotes ? (stored?.voted ?? null) : null });
      })
      .catch((error) => {
        console.error("Failed to fetch vote:", error);
      });
  }, [feature.id]);

  return (
    <div className="border border-gray-200 rounded-lg overfl
    ow-hidden bg-white hover:shadow-sm transition-shadow">
      <div className="flex p-4">
        {/* Voting column */}
        <div className="flex flex-col items-center mr-4 w-16">
          <Button
            variant="ghost"
            size="default"
            className={`h-8 w-8 rounded-full ${hasVoted === "upvote" ? "bg-purple-100 text-purple-600" : "hover:bg-purple-50 hover:text-purple-600"
              }`}
            onClick={() => handleVote(1, 'upvote')}
          >
            <ChevronUp className="h-5 w-5" />
            <span className="sr-only">Upvote</span>
          </Button>
          <span className="font-semibold text-lg my-1">{votes}</span>
          <Button
            variant="ghost"
            size="default"
            className={`h-8 w-8 rounded-full ${hasVoted === "downvote" ? "bg-purple-100 text-purple-600" : "hover:bg-purple-50 hover:text-purple-600"
              }`}
            onClick={() => handleVote(-1, 'downvote')}
          >
            <ChevronDown className="h-5 w-5" />
            <span className="sr-only">Downvote</span>
          </Button>
        </div>

        {/* Content column */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-purple-50 p-2 rounded-md">{getFeatureIcon(feature.icon)}</div>
              <div>
                <h3 className="font-semibold text-gray-900">{feature.title}</h3>
                <div className="flex flex-wrap items-center gap-2 mt-1 text-sm">
                  <Badge variant="outline" className={getStatusColor(feature.status)}>
                    {getStatusIcon(feature.status)}
                    <span className="ml-1">{getStatusText(feature.status)}</span>
                  </Badge>
                  {feature.category.map((cat, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="bg-gray-50 text-gray-700 border-gray-200 mr-1 mb-1"
                    >
                      <span className="capitalize">{cat}</span>
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

          </div>

          <div className="mt-2 text-gray-600">{feature.description}</div>

        </div>
      </div>
    </div>
  )
}
