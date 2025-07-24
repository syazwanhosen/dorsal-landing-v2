
import { useState } from "react"
import type { FeatureType } from "@/lib/data"
import { Badge } from "@/components/ui/badge"
import {
  CheckCircle2,
  Clock,
  AlertCircle,
  Lightbulb,
  PauseCircle,
  Award,
} from "lucide-react"
import { Button } from "@/components/ui/buttons/button"


interface VisualRoadmapProps {
  features: FeatureType[]
}

export function VisualRoadmap({ features }: VisualRoadmapProps) {
  const [activeQuarter, setActiveQuarter] = useState<string>("current")

  // Group features by quarter
  const currentQuarterFeatures = features.filter((f) => f.status === "In Progress")
  const nextQuarterFeatures = features.filter((f) => f.status === "Coming Soon")
  const futureFeatures = features.filter(
  (f) => ["Proposal", "Mothballed"].includes(f.status)
  );
  const releaseFeatures = features.filter(
  (f) => ["MVP", "Live"].includes(f.status)
  );

  const getStatusIcon = (status: string) => {
  switch (status.toLowerCase()) {
    case "live":
      return (
        <span className="inline-flex items-center justify-center h-5 w-5 rounded-full">
          <CheckCircle2 className="h-4 w-4 text-white" />
        </span>
      );
    case "in progress":
      return (
        <span className="inline-flex items-center justify-center h-5 w-5 rounded-full">
          <Clock className="h-4 w-4 text-white" />
        </span>
      );
    case "coming soon":
      return (
        <span className="inline-flex items-center justify-center h-5 w-5 rounded-full">
          <AlertCircle className="h-4 w-4 text-white" />
        </span>
      );
    case "proposal":
      return (
        <span className="inline-flex items-center justify-center h-5 w-5 rounded-full">
          <Lightbulb className="h-4 w-4 text-white" />
        </span>
      );
    case "mothballed":
      return (
        <span className="inline-flex items-center justify-center h-5 w-5 rounded-full">
          <PauseCircle className="h-4 w-4 text-white" />
        </span>
      );
    case "mvp":
      return (
        <span className="inline-flex items-center justify-center h-5 w-5 rounded-full">
          <Award className="h-4 w-4 text-white" />
        </span>
      );
    default:
      // fallback
      return (
        <span className="inline-flex items-center justify-center h-5 w-5 rounded-full">
          <AlertCircle className="h-4 w-4 text-white" />
        </span>
      );
  }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "live":
        return "bg-green-500 text-white"
      case "in progress":
        return "bg-blue-500 text-white"
      case "coming soon":
        return "bg-yellow-500 text-white"
      case "proposal":
        return "bg-teal-500 text-white"
      case "mothballed":
        return "bg-gray-500 text-white"
      case "mvp":
        return "bg-pink text-white"
      default:
        return "bg-gray-400 text-white"
    }
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <div className="border-b border-gray-200 p-4">
        <div className="flex space-x-4">
          <Button
            variant="ghost"
            className={activeQuarter === "current" ? "bg-purple text-white" : "bg-white text-gray-700 border border-gray-300"}
            onClick={() => setActiveQuarter("current")}
          >
            Current Quarter
          </Button>
          <Button
            variant="ghost"
            className={activeQuarter === "next" ? "bg-purple text-white" : "bg-white text-gray-700 border border-gray-300"}
            onClick={() => setActiveQuarter("next")}
          >
            Next Quarter
          </Button>
          <Button
            variant="ghost"
            className={activeQuarter === "future" ? "bg-purple text-white" : "bg-white text-gray-700 border border-gray-300"}
            onClick={() => setActiveQuarter("future")}
          >
            Future
          </Button>
          <Button
            variant="ghost"
            className={activeQuarter === "release" ? "bg-purple text-white" : "bg-white text-gray-700 border border-gray-300"}
            onClick={() => setActiveQuarter("release")}
          >
            Released
          </Button>
        </div>
      </div>

      <div className="p-6">
        {activeQuarter === "current" && (
          <div>
            <h3 className="text-lg font-semibold mb-4">Current Quarter</h3>
            <div className="relative">
              <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-blue-200"></div>
              <div className="space-y-6">
                {currentQuarterFeatures.map((feature) => (
                  <div key={feature.id} className="relative pl-10">
                    <div className="absolute left-1 top-1 h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center">
                      <div className="h-3 w-3 rounded-full bg-blue-500"></div>
                    </div>
                    <div className="flex items-start">
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{feature.title}</h4>
                        <p className="text-sm text-gray-600 mt-1">{feature.description}</p>
                        <div className="flex items-center mt-2 space-x-2">
                          <Badge className={getStatusColor(feature.status)}>
                            {getStatusIcon(feature.status)}
                            <span className="ml-1">{feature.status}</span>
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeQuarter === "next" && (
          <div>
            <h3 className="text-lg font-semibold mb-4">Next Quarter</h3>
            <div className="relative">
              <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-yellow-200"></div>
              <div className="space-y-6">
                {nextQuarterFeatures.map((feature) => (
                  <div key={feature.id} className="relative pl-10">
                    <div className="absolute left-1 top-1 h-6 w-6 rounded-full bg-yellow-100 flex items-center justify-center">
                      <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                    </div>
                    <div className="flex items-start">
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{feature.title}</h4>
                        <p className="text-sm text-gray-600 mt-1">{feature.description}</p>
                        <div className="flex items-center mt-2">
                          <Badge className={getStatusColor(feature.status)}>
                            {getStatusIcon(feature.status)}
                            <span className="ml-1">{feature.status}</span>
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeQuarter === "future" && (
          <div>
            <h3 className="text-lg font-semibold mb-4">Future</h3>
            <div className="relative">
              <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-teal-200"></div>
              <div className="space-y-6">
                {futureFeatures.map((feature) => (
                  <div key={feature.id} className="relative pl-10">
                    <div className="absolute left-1 top-1 h-6 w-6 rounded-full bg-teal-100 flex items-center justify-center">
                      <div className="h-3 w-3 rounded-full bg-teal-400"></div>
                    </div>
                    <div className="flex items-start">
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{feature.title}</h4>
                        <p className="text-sm text-gray-600 mt-1">{feature.description}</p>
                        <div className="flex items-center mt-2">
                          <Badge className={getStatusColor(feature.status)}>
                            {getStatusIcon(feature.status)}
                            <span className="ml-1">{feature.status}</span>
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeQuarter === "release" && (
          <div>
            <h3 className="text-lg font-semibold mb-4">Released</h3>
            <div className="relative">
              <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-green-200"></div>
              <div className="space-y-6">
                {releaseFeatures.map((feature) => (
                  <div key={feature.id} className="relative pl-10">
                    <div className="absolute left-1 top-1 h-6 w-6 rounded-full bg-green-100 flex items-center justify-center">
                      <div className="h-3 w-3 rounded-full bg-green-400"></div>
                    </div>
                    <div className="flex items-start">
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{feature.title}</h4>
                        <p className="text-sm text-gray-600 mt-1">{feature.description}</p>
                        <div className="flex items-center mt-2">
                          <Badge className={getStatusColor(feature.status)}>
                            {getStatusIcon(feature.status)}
                            <span className="ml-1">{feature.status}</span>
                          </Badge>
                        </div>
                      </div>
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
