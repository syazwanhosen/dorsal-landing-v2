import { CircleDollarSign, Clock, Funnel, ShieldCheck, SquareCheck } from "lucide-react";
import { useState } from "react";
import { FaFilePdf } from "react-icons/fa";

// Define a type for the tab keys
type TabKey = "Today" | "Week" | "Month" | "Year";

type Transaction = {
  title: string;
  date: string;
  hospital: string;
  billing: string;
  amount: string;
  issue: string;
  status: "approved" | "pending" | "";
};

const TransactionList = () => {
  const [selectedTab, setSelectedTab] = useState<TabKey>("Today");

  const transactions: Record<TabKey, Transaction[]> = {
    Today: [
      {
        title: "Heart Surgery",
        date: "2025-05-01",
        hospital: "City Hospital",
        billing: "Bill #12345",
        amount: "-$5,000",
        issue: "No Issues",
        status: "approved",
      },
      {
        title: "Dental Checkup",
        date: "2025-05-02",
        hospital: "Smile Dental",
        billing: "Bill #12346",
        amount: "-$150",
        issue: "Error",
        status: "pending",
      },
      {
        title: "ENT Consultation",
        date: "2025-05-04",
        hospital: "Ear Nose Throat Center",
        billing: "Bill #12348",
        amount: "-$300",
        issue: "2 Errors",
        status: "pending",
      },
      {
        title: "ENT Consultation",
        date: "2025-05-04",
        hospital: "Valley Medical Center, San Gabriel",
        billing: "",
        amount: "",
        issue: "",
        status: "",
      },
    ],
    Week: [
      {
        title: "Eye Surgery",
        date: "2025-05-03",
        hospital: "Vision Clinic",
        billing: "Bill #12347",
        amount: "-$2,000",
        issue: "Refunded",
        status: "approved",
      },
      {
        title: "ENT Consultation",
        date: "2025-05-04",
        hospital: "Ear Nose Throat Center",
        billing: "Bill #12348",
        amount: "-$300",
        issue: "Pending",
        status: "pending",
      },
      {
        title: "Dental Checkup",
        date: "2025-05-02",
        hospital: "Smile Dental",
        billing: "Bill #12346",
        amount: "-$150",
        issue: "Pending",
        status: "pending",
      },
    ],
    Month: [],
    Year: [],
  };

  return (
    <div className="bg-white rounded-xl p-4 md:p-6">
    {/* Header */}
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-3 md:gap-0">
      <div className="flex items-center gap-2">
        <div className="bg-[#E7E7F4] p-2 rounded">
          <CircleDollarSign className="text-[#8770BC]" size={14}/>
        </div>
        <h2 className="text-lg md:text-xl font-semibold text-gray-700">Recent Transactions</h2>
      </div>
      <button className="bg-gradient-to-r bg-[#8771BC] text-white px-6 py-2 rounded-md flex items-center shadow-md hover:shadow-lg transition-shadow w-full md:w-auto justify-center">
        See All
      </button>
    </div>
  
    {/* Tabs and Filter */}
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-3 gap-3 md:gap-0">
      <div className="flex gap-1 md:gap-3 rounded-full px-1 md:px-2 py-1 overflow-x-auto w-full md:w-auto">
        {["Today", "Week", "Month", "Year"].map((tab) => (
          <button 
            key={tab} 
            onClick={() => setSelectedTab(tab as TabKey)}
            className={`px-3 md:px-6 py-1 rounded-full text-xs md:text-sm font-medium whitespace-nowrap ${
              selectedTab === tab 
                ? "bg-[#E7E7F4] text-[#8770BC]" 
                : "text-gray-400"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
      <div className="flex items-center gap-1 text-sm text-gray-500 cursor-pointer">
        <div className="bg-purple-100 p-2 rounded-full mr-2">
          <Funnel className="text-[#6E39CB]" size={12} />
        </div>
        <span className="sm:inline">Filter</span>
      </div>
    </div>
  
    {/* Transactions */}
    <div className="overflow-x-auto">
      <div className=" md:min-w-0 space-y-4 mt-4">
  
        
        {/* Transaction Items */}
        {transactions[selectedTab].map((tx, index) => (
          <div key={index} className="flex flex-col md:flex-row md:items-center justify-between border-t pt-4 border-gray-300 gap-2 md:gap-0">
            {/* Mobile View */}
            <div className="md:hidden flex justify-between w-full">
              <div className="font-medium text-gray-800">{tx.title}</div>
              <div className="text-sm text-gray-600">{tx.date}</div>
            </div>
            
            {/* Desktop View */}
            <div className="hidden md:block w-1/6 text-sm text-gray-800">{tx.title}</div>
            <div className="hidden md:block w-1/6 text-sm text-gray-600">{tx.date}</div>
            
            <div className="w-full md:w-1/6 text-sm text-gray-800">
              <span className="md:hidden text-gray-500 mr-2">Hospital:</span>
              {tx.hospital}
            </div>
            
            <div className="w-full md:w-1/6 flex items-center gap-2 text-sm text-gray-600">
              {tx.billing && (
                <>
                  <span className="md:hidden text-gray-500 mr-2">Billing:</span>
                  <FaFilePdf className="text-gray-800" size={24} />
                  {tx.billing}
                </>
              )}
            </div>
            
            <div className="w-full md:w-1/6 text-sm font-semibold text-red-500">
              <span className="md:hidden text-gray-500 mr-2">Amount:</span>
              {tx.amount}
            </div>
            
            <div className={`w-full md:w-1/6 text-sm ${tx.issue.includes("Error") ? "text-red-600" : "text-green-600"}`}>
  <span className="md:hidden text-gray-500 mr-2">Issue:</span>
  {tx.issue}
</div>

            
            <div className="w-full md:w-[40px] flex justify-start md:justify-end mt-2 md:mt-0">
              {tx.status === "approved" && (
                <div className="p-2 rounded-full">
                  <SquareCheck className="text-[#6CA724]" />
                </div>
              )}
              {tx.status === "pending" && (
                <div className="p-2 rounded-full">
                  <Clock className="text-[#F3CC5C]" />
                </div>
              )}
             {!tx.status && (
        <div className="p-2 rounded-full">
          <ShieldCheck className="text-[#8770BC]"  />
        </div>
      )}
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
  );
};

export default TransactionList;
