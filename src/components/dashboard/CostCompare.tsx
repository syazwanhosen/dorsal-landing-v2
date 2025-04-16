import { useEffect, useState } from "react";
import { fetchStates, fetchHospitals, fetchPriceComparison } from "../../api/api";
import { CostMap } from "./Map";

export const CostCompare = () => {
    const [states, setStates] = useState<string[]>([]);
    const [selectedState1, setSelectedState1] = useState("");
    const [selectedState2, setSelectedState2] = useState("");
    const [hospitals1, setHospitals1] = useState<string[]>([]);
    const [hospitals2, setHospitals2] = useState<string[]>([]);
    const [selectedHospital1, setSelectedHospital1] = useState("");
    const [selectedHospital2, setSelectedHospital2] = useState("");
    const [priceType, setPriceType] = useState<"min" | "max">("min");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const loadStates = async () => {
            try {
                const statesData = await fetchStates();
                setStates(statesData);
            } catch (error) {
                console.error("Error loading states:", error);
            }
        };
        loadStates();
    }, []);

    useEffect(() => {
        if (selectedState1) {
            const loadHospitals = async () => {
                try {
                    const hospitalsData = await fetchHospitals(selectedState1);
                    setHospitals1(hospitalsData);
                } catch (error) {
                    console.error(`Error loading hospitals for ${selectedState1}:`, error);
                }
            };
            loadHospitals();
        }
    }, [selectedState1]);

    useEffect(() => {
        if (selectedState2) {
            const loadHospitals = async () => {
                try {
                    const hospitalsData = await fetchHospitals(selectedState2);
                    setHospitals2(hospitalsData);
                } catch (error) {
                    console.error(`Error loading hospitals for ${selectedState2}:`, error);
                }
            };
            loadHospitals();
        }
    }, [selectedState2]);

    useEffect(() => {
        if (selectedHospital1 && selectedHospital2) {
            handleCompare("min");
        }
    }, [selectedHospital1, selectedHospital2]);

    const handleCompare = async (type: "min" | "max") => {
        if (!selectedState1 || !selectedState2 || !selectedHospital1 || !selectedHospital2) {
            alert("Please select both states and hospitals before choosing a price type.");
            return;
        }
        
        setPriceType(type);
        setLoading(true);

        try {
            const data = await fetchPriceComparison(selectedHospital1, selectedHospital2);
            const chartData = Object.keys(data).reduce((acc, service) => {
                acc[service] = {
                    [selectedHospital1]: data[service][selectedHospital1],
                    [selectedHospital2]: data[service][selectedHospital2],
                };
                return acc;
            }, {} as Record<string, Record<string, { min: number; max: number }>>);

            const iframe = document.getElementById("chartFrame") as HTMLIFrameElement;
            if (iframe?.contentWindow) {
                iframe.contentWindow.postMessage({
                    type: "compareHospitals",
                    hospitals: [selectedHospital1, selectedHospital2],
                    data: chartData,
                    priceType: type,
                }, "*");
            }
        } catch (error) {
            console.error("Comparison error:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <section id="HospitalPrices" className="container px-4 py-6 mx-auto">
            <div className="grid gap-4">
                <h2 className="text-xl font-bold text-left">
                    <span className="bg-gradient-to-b text-transparent bg-clip-text text-purple">
                        Cost{" "}
                    </span>
                    Comparison Across Medical Service
                </h2>

                {/* State & Hospital Selectors */}
                <div className="flex flex-col md:flex-row items-center justify-center gap-4 lg:py-5">
                    {/* Left Side: State 1 & Hospital 1 */}
                    <div className="flex flex-col sm:flex-row items-center gap-2 w-full md:w-1/2 lg:pr-8 ">
                        <select 
                            value={selectedState1} 
                            onChange={(e) => setSelectedState1(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded bg-white appearance-none"
                            disabled={loading}
                        >
                            <option value="">Select State</option>
                            {states.map(state => 
                                <option key={state} value={state}>{state}</option>
                            )}
                        </select>

                        <select 
                            value={selectedHospital1} 
                            onChange={(e) => setSelectedHospital1(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded bg-white appearance-none"
                            disabled={!selectedState1 || loading}
                        >
                            <option value="">Select Hospital</option>
                            {hospitals1.map(hospital => 
                                <option key={hospital} value={hospital}>{hospital}</option>
                            )}
                        </select>
                    </div>

                    {/* VS Separator */}
                    <div className="text-2xl font-bold text-purple hidden md:block">VS</div>

                    {/* Right Side: State 2 & Hospital 2 */}
                    <div className="flex flex-col sm:flex-row items-center gap-2 w-full md:w-1/2 lg:pl-8">
                        <select 
                            value={selectedState2} 
                            onChange={(e) => setSelectedState2(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded bg-white appearance-none"
                            disabled={loading}
                        >
                            <option value="">Select State</option>
                            {states.map(state => 
                                <option key={state} value={state}>{state}</option>
                            )}
                        </select>

                        <select 
                            value={selectedHospital2} 
                            onChange={(e) => setSelectedHospital2(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded bg-white appearance-none"
                            disabled={!selectedState2 || loading}
                        >
                            <option value="">Select Hospital</option>
                            {hospitals2.map(hospital => 
                                <option key={hospital} value={hospital}>{hospital}</option>
                            )}
                        </select>
                    </div>
                </div>

                {/* Dropdown & CostMap (Appears only after selections) */}
                <div className="w-full h-48 sm:h-64 md:h-80 min-h-[600px] bg-white border items-center justify-center rounded px-4">
                    <div className="flex flex-col sm:flex-row justify-between items-center py-5">
                        {/* Left Side Text Updating Based on Selection */}
                        <div className="text-lg font-bold text-black pb-4">
                            {priceType === "min" ? "Comparing Minimum Price" : "Comparing Maximum Price"}
                        </div>

                        {/* Dropdown Selection With Custom White Arrow */}
                        <div className="relative">
                            <select 
                                value={priceType}
                                onChange={(e) => handleCompare(e.target.value as "min" | "max")}
                                className="px-4 py-2 rounded bg-purple text-white cursor-pointer appearance-none pr-8"
                                
                                onClick={() => {
                                    if (!selectedState1 || !selectedState2 || !selectedHospital1 || !selectedHospital2) {
                                        alert("Please select both states and hospitals before choosing a price type.");
                                    }
                                }}
                            >
                                <option value="min">Show Minimum Prices</option>
                                <option value="max">Show Maximum Prices</option>
                            </select>
                            <div className="absolute inset-y-0 right-2 flex items-center pointer-events-none">
                                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M5.5 7.5l4.5 4.5 4.5-4.5" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <CostMap /> 
                </div>
            </div>
        </section>
    );
};
