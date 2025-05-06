// Components
import HospitalMap from "../HospitalMap";

// Types
import { HospitalMapProps } from "../../types";

export const MapResult = ({ searchResults }: HospitalMapProps) => {
  return (
    <section id="MapResult" className="container pb-6">
      <HospitalMap searchResults={searchResults} />
    </section>
  );
};
