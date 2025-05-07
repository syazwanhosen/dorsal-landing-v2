type SearchResults = {
    hospital_names: string[];
    prices: number[];
};

export type HospitalMapProps = {
    searchResults: SearchResults;
};


export type Hospital = {
    name: string;
    rating: number;
    ratingValue: number; // Ensure this exists
    phone: string; // Add phone number
    distance: string;
    price: number;
    negotiation_status: "Fixed" | "Negotiated";
    latitude: number;
    longitude: number;
    address: string;
};


export type ResizeHandlerProps = {
    sidebarOpen: boolean;
};

export type FlyToLocationProps = {
    location: [number, number] | null;
};