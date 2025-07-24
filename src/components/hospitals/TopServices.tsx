import React from 'react';
import type { TopSearchServices } from '@/types';
import { Tag } from "lucide-react";

const hospitals: TopSearchServices[] = [
    {
        name: 'MRI with contrast',
        hospital_count: '256 hospitals',
    },
];

export const TopServices: React.FC = () => {
    return (
        <div className="border rounded-md p-4 w-full">
        <div className="flex items-center mb-4">
                    <div className="flex items-center justify-center w-10 h-10 lg:w-12 lg:h-12 lg:mr-4 mr-2 rounded-full bg-gradient-to-r from-[#9F70FD] to-[#E770C1]">
                      <Tag className="w-3 h-3 lg:w-5 lg:h-5 text-white" />
                    </div>
                    <h2 className="text-lg font-bold text-gray-900">
                      Popular Services
                    </h2>
                  </div>
        <ul>
          {hospitals.map((hospital) => (
            <li key={hospital.name} className="mb-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[#8770BC] font-medium">{hospital.name}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
      
    );
};
