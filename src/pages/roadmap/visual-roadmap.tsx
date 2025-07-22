
import { useState } from "react"
import type { FeatureType } from "@/lib/data"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, Clock, AlertCircle, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/buttons/button"


interface VisualRoadmapProps {
  features: FeatureType[]
}

export function VisualRoadmap({ features }: VisualRoadmapProps) {
  const [activeQuarter, setActiveQuarter] = useState<string>("current")

  // Group features by quarter
  const currentQuarterFeatures = features.filter((f) => f.status === "In Progress")
  const nextQuarterFeatures = features.filter((f) => f.status === "Proposal")
  const futureFeatures = features.filter((f) => f.status === "Coming Soon")

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
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <div className="border-b border-gray-200 p-4">
        <div className="flex space-x-4">
          <Button
            variant="ghost"
            className={activeQuarter === "current" ? "bg-purple-50 text-purple-700" : ""}
            onClick={() => setActiveQuarter("current")}
          >
            Current Quarter
          </Button>
          <Button
            variant="ghost"
            className={activeQuarter === "next" ? "bg-purple-50 text-purple-700" : ""}
            onClick={() => setActiveQuarter("next")}
          >
            Next Quarter
          </Button>
          <Button
            variant="ghost"
            className={activeQuarter === "future" ? "bg-purple-50 text-purple-700" : ""}
            onClick={() => setActiveQuarter("future")}
          >
            Future
          </Button>
        </div>
      </div>

      <div className="p-6">
        {activeQuarter === "current" && (
          <div>
            <h3 className="text-lg font-semibold mb-4">Q2 2025 - Current Quarter</h3>
            <div className="relative">
              <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-blue-200"></div>
              <div className="space-y-6">
                {currentQuarterFeatures.map((feature) => (
                  <div key={feature.id} className="relative pl-10">
                    <div className="absolute left-2 top-1 h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center">
                      <div className="h-3 w-3 rounded-full bg-blue-500"></div>
                    </div>
                    <div className="flex items-start">
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{feature.title}</h4>
                        <p className="text-sm text-gray-600 mt-1">{feature.description}</p>
                        <div className="flex items-center mt-2 space-x-2">
                          <Badge variant="outline" className={getStatusColor(feature.status)}>
                            {getStatusIcon(feature.status)}
                            <span className="ml-1">In Development</span>
                          </Badge>
                          <span className="text-sm text-gray-500">{feature.progress}% complete</span>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" className="ml-2">
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeQuarter === "next" && (
          <div>
            <h3 className="text-lg font-semibold mb-4">Q3 2025 - Next Quarter</h3>
            <div className="relative">
              <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-purple-200"></div>
              <div className="space-y-6">
                {nextQuarterFeatures.map((feature) => (
                  <div key={feature.id} className="relative pl-10">
                    <div className="absolute left-2 top-1 h-6 w-6 rounded-full bg-purple-100 flex items-center justify-center">
                      <div className="h-3 w-3 rounded-full bg-purple-500"></div>
                    </div>
                    <div className="flex items-start">
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{feature.title}</h4>
                        <p className="text-sm text-gray-600 mt-1">{feature.description}</p>
                        <div className="flex items-center mt-2">
                          <Badge variant="outline" className={getStatusColor(feature.status)}>
                            {getStatusIcon(feature.status)}
                            <span className="ml-1">Planned</span>
                          </Badge>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" className="ml-2">
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeQuarter === "future" && (
          <div>
            <h3 className="text-lg font-semibold mb-4">Q4 2025 & Beyond</h3>
            <div className="relative">
              <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200"></div>
              <div className="space-y-6">
                {futureFeatures.map((feature) => (
                  <div key={feature.id} className="relative pl-10">
                    <div className="absolute left-2 top-1 h-6 w-6 rounded-full bg-gray-100 flex items-center justify-center">
                      <div className="h-3 w-3 rounded-full bg-gray-400"></div>
                    </div>
                    <div className="flex items-start">
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{feature.title}</h4>
                        <p className="text-sm text-gray-600 mt-1">{feature.description}</p>
                        <div className="flex items-center mt-2">
                          <Badge variant="outline" className={getStatusColor(feature.status)}>
                            {getStatusIcon(feature.status)}
                            <span className="ml-1">Coming Soon</span>
                          </Badge>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" className="ml-2">
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
