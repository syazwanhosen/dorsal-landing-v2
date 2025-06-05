import React, { useState } from "react";
import { X } from "lucide-react";

interface AuditFindingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type ComplexityLevel = "Simple" | "Standard" | "Technical";

const AuditFindingsModal: React.FC<AuditFindingsModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  const [currentLevel, setCurrentLevel] = useState<ComplexityLevel>("Simple");

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
  <div className="bg-white rounded-md shadow-lg w-[600px] max-w-[90%] max-h-[80vh] overflow-y-auto p-4 lg:p-6">
    {/* Modal Header */}
    <div className="flex justify-between items-center">
      <p className="text-gray-900 text-sm lg:text-base">Explanation Complexity Level</p>
      <button
        onClick={onClose}
        className="text-gray-500 hover:text-gray-700 focus:outline-none"
        aria-label="Close modal"
      >
        <X className="h-5 w-5" />
      </button>
    </div>

    <hr className="my-2 border-t border-gray-300" />

    {/* Progress Bar Section */}
    <div className="mb-6">
      <p className="text-sm text-purple-600 mb-3">Currently set to: {currentLevel} explanations</p>
      <div className="relative">
        <div className="relative w-full h-1.5 bg-gray-200 rounded-full">
          {/* Active indicator with gradient */}
          <div
            className={`absolute top-0 h-2 rounded-full transition-all duration-200`}
            style={{
              width: currentLevel === "Simple" ? "100%" : currentLevel === "Standard" ? "66%" : "33%",
              background: "linear-gradient(to right, #F3CC5C, #AFB940, #6CA724)",
            }}
          ></div>

          {/* Circle indicator */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 h-4 w-4 bg-white border border-gray-400 rounded-full"></div>
        </div>

        {/* Level markers */}
        <div className="flex justify-between">
          {(["Simple", "Standard", "Technical"] as ComplexityLevel[]).map((level) => (
            <button
              key={level}
              onClick={() => setCurrentLevel(level)}
              className="text-sm px-2 py-1 rounded-md transition-colors text-[#89868D]"
            >
              {level}
            </button>
          ))}
        </div>
      </div>
    </div>

    {/* AI Assistant Explanation */}
    <div className="space-y-4 border border-gray-200 p-4 rounded-lg bg-white">
      {[
        { title: "ICU Room & Nursing", text: "You were charged for 5 days in the ICU, but your medical records only show 4 days. This looks like a mistake that you should appeal." },
        { title: "Cardiologist Fees", text: "There's no record of seeing the heart doctor on Day 5. This fee should be removed." },
        { title: "Medication & Consumables", text: "You were charged for medical supplies that weren't used. Even though it's a smaller amount, it's still wrong." },
        { title: "Operating Theatre & CABG Surgery Package", text: "These charges are correct and match your treatment records." }
      ].map((item, index) => (
        <div key={index} className="text-xs lg:text-sm">
          <span className="font-medium">{item.title}</span>: {item.text}
        </div>
      ))}
    </div>
  </div>
</div>

  );
};

export default AuditFindingsModal;
