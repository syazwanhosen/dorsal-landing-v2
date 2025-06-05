import React, { useState, useRef } from "react";
import { X } from "lucide-react";

interface AuditFindingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}


const AuditFindingsModal: React.FC<AuditFindingsModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const [position, setPosition] = useState(0);
  const levels = ["Simple", "Standard", "Technical"];
  const currentLevel = levels[Math.round(position / 50)];
  const barRef = useRef<HTMLDivElement>(null);
  const handleRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    const barRect = barRef.current?.getBoundingClientRect();
    const handleRect = handleRef.current?.getBoundingClientRect();
    const offsetX = event.clientX - (handleRect?.left || 0);

    const handleMouseMove = (moveEvent: MouseEvent) => {
      if (barRect) {
        let newX = moveEvent.clientX - barRect.left - offsetX;
        newX = Math.max(0, Math.min(newX, barRect.width - (handleRect?.width || 0)));
        setPosition((newX / barRect.width) * 100);
      }
    };

    const handleMouseUp = () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-md shadow-lg w-[600px] max-w-[90%] max-h-[80vh] overflow-y-auto ">
        {/* Modal Header */}
        <div className="flex justify-between items-center p-4 lg:px-6 lg:py-4">
        <p className="text-gray-900 text-[14px] lg:text-base">
  Explanation Complexity Level
</p>

          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 focus:outline-none" aria-label="Close modal">
            <X className="h-5 w-5" />
          </button>
        </div>

        <hr className="my-0 border-t border-gray-300" />

        {/* Progress Bar Section */}
        <div className=" p-4 lg:px-6 lg:py-4">
          <p className="text-xs text-purple-600 mb-3 lg:mt-2">Currently set to: {currentLevel} explanations</p>
          <div ref={barRef} className="relative w-full h-2 bg-gradient-to-r from-[#F3CC5C] via-[#AFB940] to-[#6CA724] rounded-full">
            {/* Draggable Handle */}
            <div
              ref={handleRef}
              className="absolute top-1/2 -translate-y-1/2 h-5 w-5 bg-white border border-gray-400 rounded-full cursor-pointer"
              style={{ left: `${position}%` }}
              onMouseDown={handleMouseDown}
            ></div>
          </div>

          {/* Level markers */}
          <div className="flex justify-between mt-2">
            {levels.map((level) => (
              <span key={level} className="text-xs text-[#89868D]">
                {level}
              </span>
            ))}
          </div>
        </div>

        <p className="text-xs text-purple-600 lg:px-6 lg:pb-2 px-4 py-2">AI Assistant Explanation</p>

        {/* AI Assistant Explanation */}
        <div className="space-y-4 border border-gray-200 rounded-lg bg-white lg:px-4 lg:py-4 p-4 lg:mx-6 lg:mb-6 mx-4 mb-4">
          {[
            { title: "ICU Room & Nursing", text: "You were charged for 5 days in the ICU, but your medical records only show 4 days. This looks like a mistake that you should appeal." },
            { title: "Cardiologist Fees", text: "There's no record of seeing the heart doctor on Day 5. This fee should be removed." },
            { title: "Medication & Consumables", text: "You were charged for medical supplies that weren't used. Even though it's a smaller amount, it's still wrong." },
            { title: "Operating Theatre & CABG Surgery Package", text: "These charges are correct and match your treatment records." }
          ].map((item, index) => (
            <div key={index} className="text-xs lg:text-xs">
              <span className="font-semibold">{item.title}</span>: {item.text}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AuditFindingsModal;
