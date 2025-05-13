import React from 'react';
import { PopularSearches } from './PopularSearches';
import { TopHospitals } from './TopHospitals';

export const SearchSection: React.FC = () => {
    return (
        <div className="container flex flex-col md:flex-row gap-4 w-full">
            <PopularSearches />
            <TopHospitals />
        </div>

    );
};
