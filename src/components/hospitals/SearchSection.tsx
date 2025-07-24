import React from 'react';
import { PopularSearches } from './PopularSearches';
import { TopHospitals } from './TopHospitals';
import { TopServices } from './TopServices';

export const SearchSection: React.FC = () => {
    return (
        <div className="container flex flex-col md:flex-row gap-4 w-full lg:pb-8 pb-6 px-4 sm:px-6 md:px-4 lg:px-8 xl:px-16">
            <TopServices />
            <TopHospitals />
        </div>

    );
};
