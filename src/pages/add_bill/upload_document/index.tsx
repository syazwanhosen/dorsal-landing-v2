// Components
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { UploadDocument, UpdateDataForm } from "@/components/add_bill";

import "./style.css"

interface SectionConfig {
    title: string;
    component: React.ReactNode;
}

const sections: SectionConfig[] = [
    {
        title: "Upload File",
        component: <UploadDocument />,
    },
    {
        title: "Update Data",
        component: <UpdateDataForm />,
    },
];

export default function UploadDocumentPage() {
    return (
        <>
            <h1 className="text-lg font-medium text-[#8770BC]">Upload Document</h1>
            {sections.map(({ title, component }, index) => (
                <Card key={index} className="max-w-xl mx-auto mt-10 border-gray-300">
                    <CardContent className="upload-file-card-content">
                        <Accordion
                            type="single"
                            collapsible
                            defaultValue="section-0"
                            className="w-full"
                        >
                            <AccordionItem value={`section-${index}`} className="upload-file-accordion-item">
                                <AccordionTrigger>{title}</AccordionTrigger>
                                <AccordionContent>{component}</AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </CardContent>
                </Card>
            ))}
        </>
    );
}

