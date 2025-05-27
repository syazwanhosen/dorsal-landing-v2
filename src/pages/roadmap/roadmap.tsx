import React, { useState } from "react";
import { Button } from "@/components/ui/buttons/button"
import { SteeringQuestions } from "@/components/roadmap/steering-questions";
import { Badge } from "@/components/ui/badge";
import Separator from "@/components/ui/separator";
import { Search, Filter, PlusCircle, ArrowRight } from "lucide-react"
import { features } from "@/lib/data"
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger,  } from "@/components/ui/tab"
import { FeatureCard } from "./feature-card";
import { FeatureHighlight } from "./feature-highlight";
import { VisualRoadmap } from "./visual-roadmap";
import { NavbarSecondary } from "@/components/NavbarSecondary";
import { Footer } from "@/components/Footer";
import { ScrollToTop } from "@/components/ScrollToTop";



const Roadmap: React.FC = () => {

    const [activeTab, setActiveTab] = useState("roadmap")
    const [activeCategory, setActiveCategory] = useState("all")
    const [searchQuery, setSearchQuery] = useState("")
    const [viewMode, setViewMode] = useState<"list" | "visual">("list")
  
    // Filter features based on active tab and search query
    const filteredFeatures = features.filter((feature) => {
      const matchesSearch =
        feature.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        feature.description.toLowerCase().includes(searchQuery.toLowerCase())
  
      if (activeCategory === "all") return matchesSearch
      if (activeCategory === "patient") return matchesSearch && feature.userType === "patient"
      if (activeCategory === "provider") return matchesSearch && feature.userType === "provider"
      if (activeCategory === "live") return matchesSearch && feature.status === "live"
      if (activeCategory === "development") return matchesSearch && feature.status === "development"
      if (activeCategory === "planned")
        return matchesSearch && (feature.status === "planned" || feature.status === "coming")
  
      return matchesSearch
    })
  
    // Get features for each tab
    const getTabFeatures = (tab: string) => {
      if (tab === "all") return filteredFeatures
      if (tab === "production") return filteredFeatures.filter((f) => f.status === "live")
      if (tab === "wip") return filteredFeatures.filter((f) => f.status === "development")
      if (tab === "roadmap") return filteredFeatures.filter((f) => f.status === "planned" || f.status === "coming")
      return filteredFeatures
    }
  
    const tabFeatures = getTabFeatures(activeTab)
  
    // Get featured items for the highlight section
    const featuredItems = features.filter((f) => f.votes > 300).slice(0, 3)

  return (
    <>
      <NavbarSecondary />
    <div className="min-h-screen bg-gray-50 p-6 pt-0">
          <header className="border-b border-gray-200 bg-white sticky top-0 z-10">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-2">
              <div className="bg-purple-100 p-2 rounded">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M19 16L22 19L19 22"
                    stroke="#7C3AED"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path d="M13 19H22" stroke="#7C3AED" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path
                    d="M5 8L2 5L5 2"
                    stroke="#7C3AED"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path d="M11 5H2" stroke="#7C3AED" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path
                    d="M14.5 11.5C14.5 7.91 11.59 5 8 5"
                    stroke="#7C3AED"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M9.5 11.5C9.5 15.09 12.41 18 16 18"
                    stroke="#7C3AED"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <span className="text-xl font-semibold text-purple-700">dorsal.fyi</span>
            </div>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="hidden md:block">
              <TabsList>
                <TabsTrigger value="all">All products</TabsTrigger>
                <TabsTrigger value="production">
                  Production
                  <span className="ml-1.5 h-1.5 w-1.5 rounded-full bg-green-500"></span>
                </TabsTrigger>
                <TabsTrigger value="wip">
                  WIP
                  <span className="ml-1.5 h-1.5 w-1.5 rounded-full bg-amber-500"></span>
                </TabsTrigger>
                <TabsTrigger value="roadmap">
                  Roadmap
                  <span className="ml-1.5 h-1.5 w-1.5 rounded-full bg-rose-500"></span>
                </TabsTrigger>
              </TabsList>
            </Tabs>
        
          </div>

          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm">
              Log in
            </Button>
            <Button size="sm">Sign up</Button>
          </div>
        </div>
      </header>
     
       <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <div className="mb-12 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl p-8 border border-purple-100">
            <div className="max-w-3xl">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">Dorsal.fyi Product Roadmap</h1>
              <p className="text-gray-600 mb-6">
                Help shape the future of medical bill transparency. Vote on features, provide feedback, and see what
                we're building next.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button className="bg-purple-600 hover:bg-purple-700">
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Request a feature
                </Button>
                <Button variant="outline">
                  Learn about our process
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

             {/* Feature Highlights */}
             <div className="mb-12">
            <div className="flex items-center justify-between flex-wrap mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Featured Initiatives</h2>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className={viewMode === "list" ? "bg-purple-50 text-purple-700" : ""}
                >
                  List View
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setViewMode("visual")}
                  className={viewMode === "visual" ? "bg-purple-50 text-purple-700" : ""}
                >
                  Visual Roadmap
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {featuredItems.map((feature) => (
                <FeatureHighlight key={feature.id} feature={feature} />
              ))}
            </div>
          </div>

          {/* Visual Roadmap (conditionally rendered) */}
          {viewMode === "visual" && (
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Visual Roadmap</h2>
              <VisualRoadmap features={features} />
            </div>
          )}


             {/* Search and Filter */}
             <div className="mb-8 space-y-4 bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">All Features</h2>
              <div className="flex items-center gap-2 flex-wrap justify-end">
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                  Live: {features.filter((f) => f.status === "live").length}
                </Badge>
                <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                  In Progress: {features.filter((f) => f.status === "development").length}
                </Badge>
                <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                  Planned: {features.filter((f) => f.status === "planned" || f.status === "coming").length}
                </Badge>
              </div>
            </div>

            <Separator />

            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search features..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button variant="outline" className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                <span>Filter</span>
              </Button>
            </div>

            <Tabs value={activeCategory} onValueChange={setActiveCategory}>
              <TabsList className="grid grid-cols-3 sm:grid-cols-6">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="patient">Patient</TabsTrigger>
                <TabsTrigger value="provider">Provider</TabsTrigger>
                <TabsTrigger value="live">Live</TabsTrigger>
                <TabsTrigger value="development">In Progress</TabsTrigger>
                <TabsTrigger value="planned">Planned</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {/* Feature List */}
          <div className="space-y-4 mb-12">
            {tabFeatures.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
                <p className="text-gray-500">No features match your criteria.</p>
              </div>
            ) : (
              tabFeatures.map((feature) => <FeatureCard key={feature.id} feature={feature} />)
            )}
          </div>


      {/* Steering Questions */}
      <SteeringQuestions />
        </div>
      </main>

    </div>
     <Footer />
            <ScrollToTop />
    </>
  );
};

export default Roadmap;
