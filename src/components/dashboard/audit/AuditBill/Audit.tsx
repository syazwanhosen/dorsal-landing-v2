import AuditBillTable from "./AuditBillTable";

export default function Audit() {
  return (
    <>
      <div className="p-6 bg-white rounded-lg shadow-md lg:mt-6 mt-4 lg:mb-8 mb-4 overflow-hidden">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">
          Transaction Details
        </h2>

        <div className="mb-8">
          <div className="lg:flex flex-wrap items-center">
            <p className="text-gray-600 lg:pb-4 w-32 min-w-[6rem]">
              Receipt No:
            </p>
            <p className="text-gray-800 pb-4 flex-1">EL-5414587</p>
          </div>
          <div className="lg:flex flex-wrap items-center">
            <p className="text-gray-600 lg:pb-4 w-32 min-w-[6rem]">Date:</p>
            <p className="text-gray-800 pb-4 flex-1">25 Dec, 2024</p>
          </div>
          <div className="lg:flex flex-wrap items-center">
            <p className="text-gray-600 w-32 min-w-[6rem]">Hospital:</p>
            <p className="text-gray-800 flex-1">
              Alaska Medical Center, Anchorage, AK 99508
            </p>
          </div>
        </div>

        {/* Responsive Container for Patient & Practitioner Info */}
        <div className="mb-8 flex flex-col lg:flex-row lg:space-x-4 gap-6 max-w-full mx-auto items-stretch">
          {/* Left Column - Patient Information */}
          <div className="w-full lg:w-1/2 h-full flex-grow">
            <h2 className="text-lg font-semibold text-gray-700 mb-3 lg:pb-4">
              Patient Information
            </h2>
            <div className="flex flex-col sm:flex-row flex-wrap items-center gap-4 p-4 lg:py-6 border border-gray-300 rounded-md h-full">
              <img
                src="/src/assets/user.png"
                alt="User Profile Image"
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover border border-gray-200"
              />
              <div className="space-y-1 text-center sm:text-left">
                <p className="text-gray-800 font-medium pb-2 break-words">
                  John A Rogers
                </p>
                <p className="text-gray-600 pb-2 break-words">
                  1234, Aurora Drive, Anchorage, AK 99508
                </p>
                <p className="text-gray-600 pb-2 break-words">
                  john.rogers@example.com
                </p>
                <p className="text-gray-600 pb-2 break-words">
                  +1-901-7654-234
                </p>
              </div>
            </div>
          </div>

          {/* Right Column - Practitioner Information */}
          <div className="w-full lg:w-1/2 h-full flex-grow">
            <h2 className="text-lg font-semibold text-gray-700 mb-3 lg:pb-4">
              Practitioner Information
            </h2>
            <div className="space-y-1 p-4 lg:py-6 border border-gray-300 rounded-md h-full">
              <p className="text-gray-800 font-medium pb-2 break-words">
                Oliver Liam
              </p>
              <p className="text-gray-600 pb-2">
                Practitioner ID:{" "}
                <span className="text-gray-800 break-words">1234567</span>
              </p>
              <p className="text-gray-600 pb-2">
                Contact Info:{" "}
                <span className="text-gray-800 break-words">
                  +1-786-234-5678
                </span>
              </p>
              <p className="text-gray-600 pb-2">
                Specialty:{" "}
                <span className="text-gray-800 break-words">
                  Family Medicine
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>

      <AuditBillTable />
    </>
  );
}
