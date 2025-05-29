import { JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal, useState, useEffect } from "react"
import axios from "axios"

import { Badge } from "@/components/ui/badge"
import {
  ChevronUp,
  ChevronDown,
  MessageSquare,
  ThumbsUp,
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
  Building2,
  ExternalLink,
} from "lucide-react"
import type { FeatureType } from "@/lib/data"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Separator from "@/components/ui/separator"
import { Button } from "@/components/ui/buttons/button"
import Progress from "@/components/ui/progress"

interface FeatureCardProps {
  feature: FeatureType
}

const baseUrl = import.meta.env.VITE_LANDING_BASE_URL;

export function FeatureCard({ feature }: FeatureCardProps) {
  const [votes, setVotes] = useState(0)
  const [isExpanded, setIsExpanded] = useState(false)
  const [hasVoted, setHasVoted] = useState<"up" | "down" | null>(null)
  const [initialVote, setInitialVote] = useState(votes)

  const handleVote = async (value: number) => {
    // Prevent multiple votes in the same direction
    if (initialVote !== votes && ((value === 1 && hasVoted === "up") || (value === -1 && hasVoted === "down"))) {
      return;
    }

    // Prevent downvote if votes is zero
    if (value === -1 && votes <= 0) {
      return;
    }

    const type = value === 1 ? "upvote" : "downvote";

    try {
      const res = await axios.post(`${baseUrl}/vote`, {
        id: feature.id,
        type,
      });

      setVotes(res.data.totalVotes);
      setHasVoted(value === 1 ? "up" : "down");
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
      case "live":
        return <CheckCircle2 className="h-4 w-4 text-green-600" />
      case "development":
        return <Clock className="h-4 w-4 text-blue-600" />
      case "planned":
      case "coming":
        return <AlertCircle className="h-4 w-4 text-purple-600" />
      default:
        return <AlertCircle className="h-4 w-4 text-purple-600" />
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "live":
        return "Live"
      case "development":
        return "In Development"
      case "planned":
        return "Planned"
      case "coming":
        return "Coming Soon"
      default:
        return status
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "live":
        return "bg-green-50 text-green-700 border-green-200"
      case "development":
        return "bg-blue-50 text-blue-700 border-blue-200"
      case "planned":
      case "coming":
        return "bg-purple-50 text-purple-700 border-purple-200"
      default:
        return "bg-gray-50 text-gray-700 border-gray-200"
    }
  }

  const getUserTypeIcon = (userType: string) => {
    return userType === "patient" ? (
      <Users className="h-4 w-4 text-gray-600" />
    ) : (
      <Building2 className="h-4 w-4 text-gray-600" />
    )
  }

  useEffect(() => {
    if (!feature?.id) return;

    axios.get(`${baseUrl}/votes/${feature.id}`)
      .then((res) => {
        setVotes(res.data.totalVotes);
        setInitialVote(res.data.totalVotes);
      })
      .catch((error) => {
        console.error('Failed to fetch vote:', error);
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
            size="sm"
            className={`h-8 w-8 rounded-full ${hasVoted === "up" ? "bg-purple-100 text-purple-600" : "hover:bg-purple-50 hover:text-purple-600"
              }`}
            onClick={() => handleVote(1)}
          >
            <ChevronUp className="h-5 w-5" />
            <span className="sr-only">Upvote</span>
          </Button>
          <span className="font-semibold text-lg my-1">{votes}</span>
          <Button
            variant="ghost"
            size="sm"
            className={`h-8 w-8 rounded-full ${hasVoted === "down" ? "bg-purple-100 text-purple-600" : "hover:bg-purple-50 hover:text-purple-600"
              }`}
            onClick={() => handleVote(-1)}
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
                  <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">
                    {getUserTypeIcon(feature.userType)}
                    <span className="ml-1 capitalize">{feature.userType}</span>
                  </Badge>
                  <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">
                    <span className="capitalize">{feature.category}</span>
                  </Badge>
                </div>
              </div>
            </div>

            <Button variant="ghost" size="sm" className="text-gray-500" onClick={() => setIsExpanded(!isExpanded)}>
              {isExpanded ? "Collapse" : "Expand"}
            </Button>
          </div>

          <div className={`mt-2 ${isExpanded ? "" : "line-clamp-2"} text-gray-600`}>{feature.description}</div>

          {isExpanded && (
            <div className="mt-4 space-y-4">
              {feature.progress !== undefined && (
                <div>
                  <div className="flex justify-between mb-1 text-sm">
                    <span className="font-medium text-gray-700">Progress</span>
                    <span className="font-medium text-gray-700">{feature.progress}%</span>
                  </div>
                  <Progress value={feature.progress} className="h-2" />
                </div>
              )}

              {feature.milestones && feature.milestones.length > 0 && (
                <div className="space-y-2">
                  <h4 className="font-medium text-gray-800">Milestones</h4>
                  <div className="space-y-2">
                    {feature.milestones.map((milestone: { completed: any; title: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; description: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined }, index: Key | null | undefined) => (
                      <div key={index} className="flex items-start gap-2">
                        <div
                          className={`mt-1 h-4 w-4 rounded-full flex items-center justify-center ${milestone.completed ? "bg-green-100 text-green-600" : "bg-gray-100 text-gray-400"
                            }`}
                        >
                          {milestone.completed && <CheckCircle2 className="h-3 w-3" />}
                        </div>
                        <div>
                          <p className={`font-medium ${milestone.completed ? "text-gray-900" : "text-gray-600"}`}>
                            {milestone.title}
                          </p>
                          <p className="text-sm text-gray-500">{milestone.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Demo section */}
              {feature.status === "live" && (
                <div className="mt-4">
                  <h4 className="font-medium text-gray-800 mb-2">Feature Demo</h4>
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                    <div className="aspect-video bg-gray-100 rounded-md flex items-center justify-center mb-3">
                      <img
                        src={`/placeholder.svg?height=270&width=480&text=Demo+Video:+${feature.title}`}
                        alt={`Demo for ${feature.title}`}
                        className="rounded-md"
                      />
                    </div>
                    <Button variant="outline" className="w-full">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      View full demo
                    </Button>
                  </div>
                </div>
              )}

              {/* Community feedback */}
              <div className="mt-4">
                <h4 className="font-medium text-gray-800 mb-2">Community Feedback</h4>
                <div className="space-y-3">
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="flex items-start gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src="/placeholder.svg?height=32&width=32" />
                        <AvatarFallback>JD</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center">
                          <span className="font-medium text-gray-900">Jane Doe</span>
                          <span className="text-gray-500 text-sm ml-2">2 days ago</span>
                        </div>
                        <p className="text-gray-600 text-sm mt-1">
                          This would be incredibly helpful for comparing prices across different hospitals.
                        </p>
                      </div>
                    </div>
                  </div>

                  {feature.status === "development" && (
                    <div className="bg-blue-50 rounded-lg p-3 border border-blue-100">
                      <div className="flex items-start gap-3">
                        <Avatar className="h-8 w-8 bg-blue-100">
                          <AvatarFallback className="bg-blue-500 text-white">DT</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex items-center">
                            <span className="font-medium text-gray-900">Dorsal Team</span>
                            <Badge variant="outline" className="ml-2 bg-blue-100 text-blue-700 border-blue-200 text-xs">
                              Team
                            </Badge>
                          </div>
                          <p className="text-gray-600 text-sm mt-1">
                            We're actively working on this feature and expect to release it next month.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <Separator className="my-4" />

              <div className="pt-2">
                <div className="flex items-center gap-2">
                  <Button className="bg-purple-600 hover:bg-purple-700">
                    <ThumbsUp className="mr-2 h-4 w-4" />
                    Vote for this feature
                  </Button>
                  <Button variant="outline" className="flex items-center gap-2">
                    <MessageSquare className="h-4 w-4" />
                    <span>Add feedback</span>
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
