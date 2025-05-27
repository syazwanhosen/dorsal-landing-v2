import type { FeatureType } from "@/lib/data"
import { Badge } from "@/components/ui/badge"

import {
  CheckCircle2,
  Clock,
  AlertCircle,
  ArrowRight,
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
import { Button } from "@/components/ui/buttons/button"

interface FeatureHighlightProps {
  feature: FeatureType
}

export function FeatureHighlight({ feature }: FeatureHighlightProps) {
  const getFeatureIcon = (iconName: string) => {
    const icons = {
      fileText: <FileText className="h-6 w-6 text-purple-600" />,
      receipt: <Receipt className="h-6 w-6 text-purple-600" />,
      fileSearch: <FileSearch className="h-6 w-6 text-purple-600" />,
      barChart: <BarChart3 className="h-6 w-6 text-purple-600" />,
      stethoscope: <Stethoscope className="h-6 w-6 text-purple-600" />,
      shield: <Shield className="h-6 w-6 text-purple-600" />,
      wallet: <Wallet className="h-6 w-6 text-purple-600" />,
      trophy: <Trophy className="h-6 w-6 text-purple-600" />,
      userCog: <UserCog className="h-6 w-6 text-purple-600" />,
      badgeAlert: <BadgeAlert className="h-6 w-6 text-purple-600" />,
      sparkles: <Sparkles className="h-6 w-6 text-purple-600" />,
      users: <Users className="h-6 w-6 text-purple-600" />,
    }

    return icons[iconName as keyof typeof icons] || <FileText className="h-6 w-6 text-purple-600" />
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

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="bg-purple-50 p-3 rounded-lg">{getFeatureIcon(feature.icon)}</div>
          <Badge variant="outline" className={getStatusColor(feature.status)}>
            {getStatusIcon(feature.status)}
            <span className="ml-1">
              {feature.status === "live"
                ? "Live"
                : feature.status === "development"
                  ? "In Development"
                  : feature.status === "planned"
                    ? "Planned"
                    : "Coming Soon"}
            </span>
          </Badge>
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">{feature.description}</p>

        {feature.progress !== undefined && (
          <div className="mb-4">
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className={`h-2.5 rounded-full ${
                  feature.status === "live"
                    ? "bg-green-500"
                    : feature.status === "development"
                      ? "bg-blue-500"
                      : "bg-purple-500"
                }`}
                style={{ width: `${feature.progress}%` }}
              ></div>
            </div>
            <div className="flex justify-between mt-1">
              <span className="text-xs text-gray-500">Progress</span>
              <span className="text-xs font-medium text-gray-700">{feature.progress}%</span>
            </div>
          </div>
        )}

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <span className="text-sm font-medium text-gray-700 mr-2">{feature.votes}</span>
            <span className="text-sm text-gray-500">votes</span>
          </div>
          <Button variant="ghost" size="sm" className="text-purple-600 hover:text-purple-700 p-0">
            Learn more
            <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
