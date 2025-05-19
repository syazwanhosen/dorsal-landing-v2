import { Card, CardContent } from "@/components/ui/card";
import { UpdateDataForm } from "@/components/add_bill";

export default function UploadDocumentPage() {
    return (
        <>
            <h1 className="text-lg font-medium text-[#8770BC]">Enter Manual Data</h1>
            <Card className="max-w-xl mx-auto mt-10 border-gray-300">
                <CardContent className="p-6">
                    <h1 className="text-lg font-medium mb-2">Enter Data</h1>
                    <hr className="mb-4 border-gray-200" />
                    <UpdateDataForm />
                </CardContent>
            </Card>
        </>
    );
}
