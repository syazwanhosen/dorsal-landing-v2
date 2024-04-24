import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { MagnifierIcon, WalletIcon, ChartIcon } from "./Icons";
import cubeLeg from "../assets/Shot.png";

interface ServiceProps {
  title: string;
  description: string;
  icon: JSX.Element;
}

const serviceList: ServiceProps[] = [
  {
    title: "Show us your itemized bill",
    description:
      "Our AI technology ensures accuracy by obtaining itemized bills directly from your hospital, revealing hidden errors and inflated charges typically overlooked.",
    icon: <ChartIcon />,
  },
  {
    title: "Getting a second opinion",
    description:
      "Without the need for human agents, we meticulously compare your records against your bill, identifying and flagging any suspicious charges for further review.",
    icon: <WalletIcon />,
  },
  {
    title: "We have your back",
    description:
      "Our automated LLM agents get to work for you. You'll receive regular updates throughout the negotiation process.",
    icon: <MagnifierIcon />,
  },
];

export const Services = () => {
  return (
    <section className="container py-24 sm:py-32">
      <div className="grid lg:grid-cols-[1fr,1fr] gap-8 place-items-center">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold">
            It's {" "}
            <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
              Painless{" "}
            </span>
            to Get Started
          </h2>

          <p className="text-muted-foreground text-xl mt-4 mb-8 ">
            Our AI innovation simplifies hospital bill negotiation, saving you time and stress while maximizing savings.
          </p>

          <div className="flex flex-col gap-8">
            {serviceList.map(({ icon, title, description }: ServiceProps) => (
              <Card key={title}>
                <CardHeader className="space-y-1 flex md:flex-row justify-start items-start gap-4">
                  <div className="mt-1 bg-primary/20 p-1 rounded-2xl">
                    {icon}
                  </div>
                  <div>
                    <CardTitle>{title}</CardTitle>
                    <CardDescription className="text-md mt-2">
                      {description}
                    </CardDescription>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>

        <img
          src={cubeLeg}
          className="w-[100px] md:w-[167px] lg:w-[200px] object-contain"
          alt="mockup _ "
        />
      </div>
    </section>
  );
};
