import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Facebook, Instagram, Linkedin } from "lucide-react";

interface TeamProps {
  imageUrl: string;
  name: string;
  position: string;
  socialNetworks: SociaNetworkslProps[];
  bio: string;
}

interface SociaNetworkslProps {
  name: string;
  url: string;
}

const teamList: TeamProps[] = [
  {
    imageUrl: "./src/assets/abrar-rahman.jpg",
    name: "Abrar Rahman",
    position: "CEO",
    socialNetworks: [
      { name: "Linkedin", url: "https://www.linkedin.com/in/abrarfrahman/" },
      {
        name: "Instagram",
        url: "https://www.instagram.com/abrarramen/",
      },
    ],
    bio: "Prev. at Epic Systems, Amazon, Tesla, Berkeley Lab (LBNL)"
  },
  {
    imageUrl: "./src/assets/andy-young.jpeg",
    name: "Andy Young",
    position: "COO",
    socialNetworks: [
      { name: "Linkedin", url: "https://www.linkedin.com/in/andyyru/" },
      {
        name: "Instagram",
        url: "https://www.instagram.com/andyyru/",
      },
    ],
    bio: "Prev. 4x Investment Banking Analyst, 1x Private Equity Analyst"
  }
];

export const Team = () => {
  const socialIcon = (iconName: string) => {
    switch (iconName) {
      case "Linkedin":
        return <Linkedin size="20" />;

      case "Facebook":
        return <Facebook size="20" />;

      case "Instagram":
        return <Instagram size="20" />;
    }
  };

  return (
    <section
      id="team"
      className="container py-24 sm:py-32"
    >
      <h2 className="text-center text-3xl md:text-4xl font-bold justify-center">
        Our {" "}
        <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
          Team
        </span>
      </h2>

      <p className="text-center mt-4 mb-10 text-xl text-muted-foreground">
        Just two friends from Berkeley working to save Americans billions.
      </p>

      <div className="grid md:grid-cols-4 lg:grid-cols-2 gap-8 gap-y-10">
        {teamList.map(
          ({ imageUrl, name, position, socialNetworks, bio }: TeamProps) => (
            <Card
              key={name}
              className="bg-muted/50 relative mt-8 flex flex-col justify-center items-center"
            >
              <CardHeader className="mt-8 flex justify-center items-center pb-2">
                <img
                  src={imageUrl}
                  alt={`${name} ${position}`}
                  className="absolute -top-12 rounded-full w-24 h-24 aspect-square object-cover"
                />
                <CardTitle className="text-center">{name}</CardTitle>
                <CardDescription className="text-primary">
                  {position}
                </CardDescription>
              </CardHeader>

              <CardContent className="text-center pb-2">
                <p>{bio}</p>
              </CardContent>

              <CardFooter>
                {socialNetworks.map(({ name, url }: SociaNetworkslProps) => (
                  <div key={name}>
                    <a
                      href={url}
                      target="_blank"
                      className={buttonVariants({
                        variant: "ghost",
                        size: "sm",
                      })}
                    >
                      <span className="sr-only">{name} icon</span>
                      {socialIcon(name)}
                    </a>
                  </div>
                ))}
              </CardFooter>
            </Card>
          )
        )}
      </div>
    </section>
  );
};
