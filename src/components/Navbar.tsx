import { useEffect, useRef, useState } from "react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { buttonVariants } from "./ui/buttons/button";
import { Menu, ChevronDown } from "lucide-react";
import { LogoIcon } from "./Icons";

interface RouteProps {
  href: string;
  label: string;
  disabled?: boolean;
  group?: "about" | "terms";
}

const routeList: RouteProps[] = [
  { href: "/hospitals", label: "Search" },
  { href: "#UploadBill", label: "Upload" },
  { href: "#", label: "Community", disabled: true },
  { href: "/data", label: "Data" },
  { href: "https://www.linkedin.com/company/dorsal-fyi/", label: "Company", group: "about" },
  { href: "/team", label: "Team", group: "about" },
  { href: "/privacy-policy", label: "Privacy Policy", group: "terms" },
  { href: "/terms-and-conditions", label: "Terms & Conditions", group: "terms" },
  { href: "/security", label: "Security", group: "terms" },
];

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [termsOpen, setTermsOpen] = useState(false);

  const aboutRef = useRef<HTMLDivElement>(null);
  const termsRef = useRef<HTMLDivElement>(null);

  const mainNav = routeList.filter((r) => !r.group);
  const aboutLinks = routeList.filter((r) => r.group === "about");
  const termsLinks = routeList.filter((r) => r.group === "terms");

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
  
      if (
        aboutRef.current &&
        termsRef.current &&
        !aboutRef.current.contains(target) &&
        !termsRef.current.contains(target)
      ) {
        setAboutOpen(false);
        setTermsOpen(false);
      }
    };
  
    document.addEventListener("mousedown", handleClickOutside);
  
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="sticky top-0 z-40 w-full bg-white border-b" style={{ borderBottomColor: '#e5e7eb' }}>
      <NavigationMenu className="mx-auto">
        <NavigationMenuList className="container h-14 px-4 w-screen flex justify-between">
          <NavigationMenuItem className="font-bold flex">
            <a href="/" className="ml-2 font-bold text-xl flex" style={{ fontFamily: 'the-seasons, sans-serif' }}>
              <LogoIcon />
            </a>
          </NavigationMenuItem>

          {/* Mobile */}
          <span className="flex md:hidden justify-end">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger className="px-2">
                <Menu className="h-5 w-5" />
              </SheetTrigger>
              <SheetContent side="left">
                <SheetHeader>
                  <SheetTitle className="font-bold text-xl">dorsal.fyi</SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col items-center gap-2 mt-4">
                  {mainNav.map(({ href, label, disabled }) => (
                    <a
                      key={label}
                      href={disabled ? undefined : href}
                      onClick={(e) => disabled ? e.preventDefault() : setIsOpen(false)}
                      className={`${buttonVariants({ variant: "ghost" })} ${disabled ? "text-gray-400 cursor-not-allowed" : "text-center"}`}
                    >
                      {label} {disabled && "(Coming Soon)"}
                    </a>
                  ))}

                  {/* About dropdown */}
                  <div className="w-full flex flex-col items-center">
                    <button
                      onClick={() => {
                        setAboutOpen(!aboutOpen);
                        setTermsOpen(false);
                      }}
                      className="flex items-center justify-center w-11/12 px-4 py-2 text-sm font-medium text-center rounded"
                    >
                      About
                      <ChevronDown className={`ml-2 h-4 w-4 transform transition-transform duration-300 ${aboutOpen ? "rotate-180" : ""}`} />
                    </button>
                    {aboutOpen && (
                      <div className="flex flex-col items-center w-full text-sm">
                        {aboutLinks.map(({ href, label }) => (
                          <a
                            key={label}
                            href={href}
                            className="block w-full text-center px-4 py-2 hover:bg-gray-100 rounded"
                            target={href.startsWith("http") ? "_blank" : undefined}
                            rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                          >
                            {label}
                          </a>
                        ))}
                        <span className="block w-full text-center px-4 py-2 text-gray-400">Blog (Coming Soon)</span>
                      </div>
                    )}
                  </div>

                  {/* Terms dropdown */}
                  <div className="w-full flex flex-col items-center">
                    <button
                      onClick={() => {
                        setTermsOpen(!termsOpen);
                        setAboutOpen(false);
                      }}
                      className="flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-center rounded"
                    >
                      Terms
                      <ChevronDown className={`ml-2 h-4 w-4 transform transition-transform duration-300 ${termsOpen ? "rotate-180" : ""}`} />
                    </button>
                    {termsOpen && (
                      <div className="w-full px-8 text-sm">
                        {termsLinks.map(({ href, label }) => (
                          <a key={label} 
                            href={href} 
                            className="block w-full text-center px-2 py-2 text-gray-400 hover:bg-gray-100 rounded"
                            target={href.startsWith("http") ? "_blank" : undefined}
                            rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                            >
                            {label}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </span>

          {/* Desktop */}
          <nav className="hidden md:flex justify-center gap-2 items-center relative">
            {mainNav.map(({ label, href, disabled }) => (
              <a
                key={label}
                href={disabled ? undefined : href}
                onClick={disabled ? (e) => e.preventDefault() : undefined}
                className={`flex items-center text-sm font-medium rounded-md hover:hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 ${disabled ? "text-gray-400 cursor-not-allowed" : "hover:text-black"}`}
              >
                {label}
              </a>
            ))}

            {/* About Dropdown */}
            <div ref={aboutRef} className="relative">
              <button
                onClick={() => {
                  setAboutOpen(!aboutOpen);
                  setTermsOpen(false);
                }}
                className={`flex items-center text-sm font-medium rounded-md hover:hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 ${aboutOpen ? "text-black" : "text-gray-700"}`}
              >
                About <ChevronDown className={`ml-1 h-4 w-4 transform transition-transform duration-300 ${aboutOpen ? 'rotate-180' : ''}`} />
              </button>
              {aboutOpen && (
                <ul className="absolute left-0 mt-2 bg-white border rounded shadow-md w-44 z-50 animate-fade-in">
                  {aboutLinks.map(({ href, label }) => (
                    <li key={label}>
                      <a
                        href={href}
                        target={href.startsWith("http") ? "_blank" : undefined}
                        rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                        className="block px-4 py-2 hover:bg-gray-100 text-sm font-medium"
                      >
                        {label}
                      </a>
                    </li>
                  ))}
                  <li>
                    <span className="block px-4 py-2 text-sm text-gray-400 cursor-not-allowed">Blog (Coming Soon)</span>
                  </li>
                </ul>
              )}
            </div>

            {/* Terms Dropdown */}
            <div ref={termsRef} className="relative">
              <button
                onClick={() => {
                  setTermsOpen(!termsOpen);
                  setAboutOpen(false);
                }}
                className={`flex items-center text-sm font-medium rounded-md hover:hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 ${termsOpen ? "text-black" : "text-gray-700"}`}
              >
                Terms <ChevronDown className={`ml-1 h-4 w-4 transform transition-transform duration-300 ${termsOpen ? 'rotate-180' : ''}`} />
              </button>
              {termsOpen && (
                <ul className="absolute left-0 mt-2 bg-white border rounded shadow-md w-56 z-50 animate-fade-in">
                  {termsLinks.map(({ href, label }) => (
                    <li key={label}>
                      <a href={href} 
                      target={href.startsWith("http") ? "_blank" : undefined}
                      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="block px-4 py-2 hover:bg-gray-100 text-sm font-medium"
                      >
                        {label}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </nav>

          <div className="hidden md:flex items-center justify-end gap-2">
            <a href="/signin" className="text-sm px-4 font-medium rounded-md py-2 text-gray-700 hover:text-black hover:bg-gray-100">
              Sign In
            </a>
            <a href="/signup" className="text-sm px-4 py-2 bg-[#8B5FBF] text-white rounded-md hover:bg-purple-700">
              Sign Up
            </a>
          </div>
        </NavigationMenuList>
      </NavigationMenu>
    </header>
  );
};
