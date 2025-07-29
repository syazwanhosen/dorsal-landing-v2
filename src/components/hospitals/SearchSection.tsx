import { FC } from 'react';
import { TopHospitals } from './TopHospitals';
import { TopServices } from './TopServices';

export const SearchSection: FC = () => {
    return (
        <div className="container flex flex-col md:flex-row gap-4 w-full lg:pb-8 pb-6 px-4 sm:px-6 md:px-4 lg:px-8 xl:px-16">
            <TopServices />
            <TopHospitals />
        </div>

    );
};
