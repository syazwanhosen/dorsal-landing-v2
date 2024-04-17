import { LogoIcon } from "./Icons";

export const Footer = () => {
  return (
    <footer id="footer">
      <hr className="w-11/12 mx-auto" />

      <section className="container py-20 grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6 gap-x-12 gap-y-8">
        <div className="col-span-full xl:col-span-2">
          <a
            href="/"
            className="font-bold text-xl flex"
            style={{ fontFamily: 'the-seasons, sans-serif' }}
          >
            <LogoIcon />
          </a>
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="font-bold text-lg">Follow Us</h3>
          <div>
            <a
              href="https://github.com/abrarfrahman/dorsal-fyi-landing"
              className="opacity-60 hover:opacity-100"
              target="_blank" rel="noopener noreferrer"
            >
              Github
            </a>
          </div>

          <div>
            <a
              className="opacity-60 hover:opacity-100"
              target="_blank" rel="noopener noreferrer"
            >
              Twitter - Coming Soon
            </a>
          </div>

          <div>
            <a
              className="opacity-60 hover:opacity-100"
              target="_blank" rel="noopener noreferrer"
            >
              Substack - Coming Soon
            </a>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="font-bold text-lg">About</h3>
          <div>
            <a
              href="#howItWorks"
              className="opacity-60 hover:opacity-100"
            >
              Features
            </a>
          </div>

          <div>
            <a
              href="#pricing"
              className="opacity-60 hover:opacity-100"
            >
              Pricing
            </a>
          </div>

          <div>
            <a
              href="#waitlist"
              className="opacity-60 hover:opacity-100"
            >
              Waitlist
            </a>
          </div>

          <div>
            <a
              href="#team"
              className="opacity-60 hover:opacity-100"
            >
              Team
            </a>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="font-bold text-lg">Community</h3>
          <div>
            <a
              className="opacity-60 hover:opacity-100"
              target="_blank" rel="noopener noreferrer"
            >
              Discord - Coming Soon
            </a>
          </div>

          <div>
            <a
              href="https://www.linkedin.com/company/dorsal-fyi/"
              className="opacity-60 hover:opacity-100"
              target="_blank" rel="noopener noreferrer"
            >
              LinkedIn
            </a>
          </div>

          <div>
            <a
              className="opacity-60 hover:opacity-100"
              target="_blank" rel="noopener noreferrer"
            >
              Facebook - Coming Soon
            </a>
          </div>
          
          <div>
            <a
              className="opacity-60 hover:opacity-100"
              target="_blank" rel="noopener noreferrer"
            >
              YouTube - Coming Soon
            </a>
          </div>
        </div>
      </section>

      <section className="container pb-14 text-center">
        <h3>
          &copy; Dorsal.fyi 2024. Made with ♡ in CA. {" "}
          <a
            target="_blank"
            href="https://github.com/abrarfrahman"
            className="text-primary transition-all border-primary hover:border-b-2"
          >
            Abrar Rahman
          </a>
        </h3>
      </section>
    </footer>
  );
};
