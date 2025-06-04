import React, { useState } from "react";
import { Button } from "@/components/ui/buttons/button"
import { SteeringQuestions } from "@/components/roadmap/steering-questions";
import { Badge } from "@/components/ui/badge";
import Separator from "@/components/ui/separator";
import { Search, Filter, PlusCircle, ArrowRight } from "lucide-react"
import { features } from "@/lib/data"
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, } from "@/components/ui/tab"
import { FeatureCard } from "./feature-card";
import { FeatureHighlight } from "./feature-highlight";
import { VisualRoadmap } from "./visual-roadmap";
import { NavbarSecondary } from "@/components/NavbarSecondary";
import { Footer } from "@/components/Footer";
import { ScrollToTop } from "@/components/ScrollToTop";

const FILTERS = [
  {
    title: "Endpoints",
    options: [
      { label: "Patient", value: "patient" },
      { label: "Provider", value: "provider" },
    ]
  },
  {
    title: "Product Initiatives",
    options: [
      { label: "Engagement", value: "engagement" },
      { label: "Billing", value: "billing" },
      { label: "Security", value: "security" },
      { label: "Analytics", value: "analytics" },
    ]
  }
]

const Roadmap: React.FC = () => {

  const [activeTab, setActiveTab] = useState("roadmap")
  const [activeCategory, setActiveCategory] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [viewMode, setViewMode] = useState<"list" | "visual">("list")
  const [showFilter, setShowFilter] = useState(false)
  const [filterOption, setFilterOption] = useState<{ [key: string]: string[] }>({});
  const [tempFilterOption, setTempFilterOption] = useState<{ [key: string]: string[] }>({});

  const applyFilters = () => {
    return features.filter((feature) => {
      const matchesSearch =
        feature.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        feature.description.toLowerCase().includes(searchQuery.toLowerCase());

      const endpointFilters = filterOption["Endpoints"] || [];
      const productFilters = filterOption["Product Initiatives"] || [];

      const matchesEndpoints =
        endpointFilters.length === 0 || endpointFilters.includes(feature.userType);

      const matchesProduct =
        productFilters.length === 0 || productFilters.includes(feature.category);

      const matchesCategory =
        activeCategory === "all" ||
        (activeCategory === "patient" && feature.userType === "patient") ||
        (activeCategory === "provider" && feature.userType === "provider") ||
        (activeCategory === "live" && feature.status === "live") ||
        (activeCategory === "development" && feature.status === "development") ||
        (activeCategory === "planned" &&
          (feature.status === "planned" || feature.status === "coming"));

      return matchesSearch && matchesEndpoints && matchesProduct && matchesCategory;
    });
  };

  // Filter features based on active tab and search query
  const filteredFeatures = applyFilters();

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
            <div className="mb-8 space-y-4 bg-white p-6 rounded-xl border border-gray-200 shadow-sm relative flex-1">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">All Features</h2>
              </div>

              <Separator />

              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="w-full sm:w-2/3">
                  <Tabs value={activeCategory} onValueChange={setActiveCategory}>
                    <TabsList className="grid grid-cols-2 sm:grid-cols-4 gap-2 w-full">
                      <TabsTrigger value="all">All</TabsTrigger>

                      <TabsTrigger value="live" className="flex gap-2">
                        <span>Live</span>
                        <span className="h-2 w-2 rounded-full bg-green-500" />
                      </TabsTrigger>

                      <TabsTrigger value="development" className="flex gap-2">
                        <span>In Progress</span>
                        <span className="h-2 w-2 rounded-full bg-yellow-500" />
                      </TabsTrigger>

                      <TabsTrigger value="planned" className="flex gap-2">
                        <span>Planned</span>
                        <span className="h-2 w-2 rounded-full bg-red-500" />
                      </TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>

                <div className="w-full sm:w-1/3 flex flex-col sm:flex-row gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search features..."
                      className="pl-10 w-full"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <Button
                    variant="outline"
                    className="flex items-center gap-2 w-full sm:w-auto relative"
                    onClick={() => setShowFilter(!showFilter)}
                  >
                    <Filter className="h-4 w-4" />
                    <span>Filter</span>
                  </Button>
                  {showFilter && (
                    <div className="absolute right-0 top-0 z-50 w-72 bg-white border shadow-lg p-4">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold">Filter Features</h3>
                        <button
                          className="text-sm text-[#8771BC] bg-[#EEE5FF] px-3 py-1 rounded-full"
                          onClick={() => {
                            setTempFilterOption({});
                            setFilterOption({});
                            setShowFilter(false);
                          }}
                        >
                          Reset
                        </button>
                      </div>
                      {
                        FILTERS.map((filter) => (
                          <div key={filter.title} className="mb-4">
                            <h4 className="text-sm font-medium mb-2">{filter.title}</h4>
                            <div className="flex gap-2 flex-wrap">
                              {filter.options.map((option) => {
                                const isSelected = tempFilterOption[filter.title]?.includes(option.value);

                                return (
                                  <button
                                    key={option.value}
                                    className={`rounded-full px-3 py-1 text-sm ${isSelected ? "bg-[#EEE5FF] text-[#8771BC]" : "border border-gray-200"
                                      }`}
                                    onClick={() => {
                                      const selected = tempFilterOption[filter.title] || [];
                                      const isSelected = selected.includes(option.value);

                                      setTempFilterOption({
                                        ...tempFilterOption,
                                        [filter.title]: isSelected
                                          ? selected.filter((v) => v !== option.value)
                                          : [...selected, option.value]
                                      });
                                    }}

                                  >
                                    {option.label}
                                  </button>
                                )
                              })}
                            </div>
                          </div>
                        )
                        )
                      }


                      <button
                        className="w-full mt-2 bg-[#8771BC] text-white py-2 rounded-xl"
                        onClick={() => {
                          setShowFilter(false);
                          setFilterOption(tempFilterOption);
                        }}
                      >
                        Apply
                      </button>

                    </div>
                  )}

                </div>
              </div>
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
