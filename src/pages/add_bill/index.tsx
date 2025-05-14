import { FileText } from "lucide-react";

// Components
import { Button } from "@/components/ui/buttons/button";
import { Card, CardContent } from "@/components/ui/card";

interface Bill {
    id: number;
    date: string;
}

const bills: Bill[] = [
    { id: 782, date: "Feb 2025" },
    { id: 780, date: "Dec 2024" },
    { id: 781, date: "Jan 2025" },
];

export default function AddBill() {
    return (
        <div className="p-4">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <h1 className="text-lg font-medium text-[#8770BC]">Add Bill</h1>
                <div className="space-x-4">
                    <Button className="bg-[#8770BC] hover:bg-primary text-white">
                        Upload Document
                    </Button>
                    <Button className="bg-[#8770BC] text-white hover:bg-primary">
                        Enter Manual Data
                    </Button>
                </div>
            </div>

            <main className="w-full flex justify-center">
                <div className="w-full max-w-3xl">
                    <Card className="bg-white w-full rounded border-gray-300">
                        <CardContent className="p-0">
                            <div className="px-6 py-4 font-semibold text-sm text-gray-700">
                                Added Bills
                            </div>
                            <ul>
                                {bills.map((bill) => (
                                    <li
                                        key={bill.id}
                                        className="flex items-center justify-between px-6 py-4 border-t border-gray-300"
                                    >
                                        <div className="flex items-center space-x-2">
                                            <FileText className="w-5 h-5 text-gray-600" />
                                            <span className="text-sm">
                                                Billing #{bill.id}:{bill.date}
                                            </span>
                                        </div>
                                        <Button className="bg-[#8770BC] text-white hover:bg-primary text-sm px-4 py-1 h-auto">
                                            View
                                        </Button>
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                    </Card>
                </div>
            </main>
        </div>
    );
}
