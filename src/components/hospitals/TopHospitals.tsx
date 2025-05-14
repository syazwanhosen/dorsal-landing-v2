import React from 'react';
import type { TopSearchHospital } from '@/types';
import { Chip } from '../Chip';

const hospitals: TopSearchHospital[] = [
    {
        name: 'Monroe Regional Hospital',
        address: '400 S Chestnut St, Aberdeen, MS 39730, USA',
        priceType: 'Fixed Price',
    },
    {
        name: 'Sharp Memorial',
        address: '400 S Chestnut St, Aberdeen, MS 39730, USA',
        priceType: 'Negotiated Price',
    },
    {
        name: 'Brooklyn Hospital',
        address: '400 S Chestnut St, Aberdeen, MS 39730, USA',
        priceType: 'Fixed Price',
    },
    {
        name: 'Jersey Medical Center',
        address: '400 S Chestnut St, Aberdeen, MS 39730, USA',
        priceType: 'Fixed Price',
    },
];

const badgeStyle = (type: TopSearchHospital['priceType']) => {
    return type === 'Fixed Price'
        ? 'green'
        : 'red';
};

export const TopHospitals: React.FC = () => {
    return (
        <div className="border rounded-md p-4 w-full">
            <h2 className="font-bold text-lg mb-1">Top Search Hospitals</h2>
            <ul>
                {hospitals.map((hospital) => (
                    <li key={hospital.name} className='mb-2'>
                        <div className="flex items-center">
                            <span className="text-[#8770BC] font-medium">{hospital.name}</span>
                            <div className="border-gray-200 pb-2 pl-2 text-center">
                                <Chip label={hospital.priceType} color={badgeStyle(hospital.priceType)} />
                            </div>
                        </div>
                        <p className="text-sm text-gray-600">{hospital.address}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};
