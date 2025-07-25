import React from 'react';
import { Hospital } from 'lucide-react';
import { Link } from 'react-router-dom';

interface TopSearchHospital {
  name: string;
  state: string;
  hospital_count: number;
}

const topHospitals: TopSearchHospital[] = [
  { name: "Children's Hospital Of Alabama", state: 'Alabama', hospital_count: 1 },
  { name: "St Joseph's Hospital And Medical Center", state: 'Arizona', hospital_count: 1 },
  { name: "Chi St. Vincent Hospital Hot Springs", state: 'Arkansas', hospital_count: 1 },
  { name: "Loma Linda University Medical Center", state: 'California', hospital_count: 1 },
  { name: "Vibra Rehabilitation Hospital Of Denver", state: 'Colorado', hospital_count: 1 },
  { name: "Select Specialty Hospital Wilmington", state: 'Delaware', hospital_count: 1 },
  { name: "Memorial Hospital And Manor", state: 'Georgia', hospital_count: 1 },
  { name: "The Queen's Medical Center", state: 'Hawaii', hospital_count: 1 },
  { name: "Mountain View Hospital", state: 'Idaho', hospital_count: 1 },
  { name: "The Carle Foundation Hospital", state: 'Illinois', hospital_count: 1 }
];

export const TopHospitals: React.FC = () => {
  return (
    <div className="bg-[#F5F1FF] rounded-md py-4 px-4 lg:px-8 w-full">
      <div className="flex items-center mb-4">
        <div className="flex items-center justify-center w-10 h-10 lg:w-12 lg:h-12 lg:mr-4 mr-2 rounded-full bg-gradient-to-r from-[#9F70FD] to-[#E770C1]">
          <Hospital className="w-3 h-3 lg:w-5 lg:h-5 text-white" />
        </div>
        <h2 className="text-lg font-bold text-gray-900">Popular Hospitals</h2>
      </div>
      <ul>
        {topHospitals.map((hospital) => {
          const query = `state=${encodeURIComponent(hospital.state)}&category=${encodeURIComponent("General")}`;
          return (
            <li key={hospital.name} className="mb-2">
              <Link to={`/hospitals?${query}`} className="hover:underline">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[#8770BC] font-semibold">{hospital.name}</span>
                  <span className="italic text-gray-600">{hospital.state} </span>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
