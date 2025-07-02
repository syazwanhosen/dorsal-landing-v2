import { useAppSelector } from "@/store";
import AuditBillTable from "./AuditBillTable";

export default function Audit() {
  const auditRecords = useAppSelector((state) => state.audit.auditRecords);
  const latest = auditRecords.at(-1); 

  if (!latest) {
    return <p className="p-6 text-gray-600">No audit data available.</p>;
  }

  const { invoice_number, date, hospital_name, state, patient_information, doctor_information } = latest;

  return (
    <>
      <div className="p-6 bg-white rounded-lg shadow-md lg:mt-6 mt-4 lg:mb-8 mb-4 overflow-hidden">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">Transaction Details</h2>

        <div className="mb-8">
          <div className="lg:flex flex-wrap items-center">
            <p className="text-gray-600 lg:pb-4 w-32 min-w-[6rem]">Invoice No:</p>
            <p className="text-gray-800 pb-4 flex-1">{invoice_number}</p>
          </div>
          <div className="lg:flex flex-wrap items-center">
            <p className="text-gray-600 lg:pb-4 w-32 min-w-[6rem]">Date:</p>
            <p className="text-gray-800 pb-4 flex-1">{date}</p>
          </div>
          <div className="lg:flex flex-wrap items-center">
            <p className="text-gray-600 w-32 min-w-[6rem]">Hospital:</p>
            <p className="text-gray-800 flex-1">{hospital_name}, {state}</p>
          </div>
        </div>

        <div className="mb-8 flex flex-col lg:flex-row lg:space-x-4 gap-6 max-w-full mx-auto items-stretch">
          {/* Patient Info */}
          <div className="w-full lg:w-1/2 h-full flex-grow">
            <h2 className="text-lg font-semibold text-gray-700 mb-3 lg:pb-4">Patient Information</h2>
            <div className="flex flex-col sm:flex-row flex-wrap items-center gap-4 p-4 lg:py-6 border border-gray-300 rounded-md h-full">
              <img
                src="/src/assets/user.png"
                alt="User Profile Image"
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover border border-gray-200"
              />
              <div className="space-y-1 text-center sm:text-left">
                <p className="text-gray-800 font-medium pb-2 break-words">{patient_information.name}</p>
                <p className="text-gray-600 pb-2 break-words">{patient_information.details}</p>
              </div>
            </div>
          </div>

          {/* Doctor Info */}
          <div className="w-full lg:w-1/2 h-full flex-grow">
            <h2 className="text-lg font-semibold text-gray-700 mb-3 lg:pb-4">Practitioner Information</h2>
            <div className="space-y-1 p-4 lg:py-6 border border-gray-300 rounded-md h-full">
              <p className="text-gray-800 font-medium pb-2 break-words">{doctor_information.name}</p>
              <p className="text-gray-600 pb-2 break-words">{doctor_information.details}</p>
            </div>
          </div>
        </div>
      </div>

      <AuditBillTable billingData={latest.billing_data} />
    </>
  );
}
