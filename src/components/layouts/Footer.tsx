import Logo from "@/assets/icons/Logo";

const Footer = () => {
  return (
    <footer className="bg-background border-t border-border">
      <div className="mx-auto max-w-7xl px-4 py-10">
        <div className="flex justify-center items-center gap-2">
          <Logo />
          <h1 className="text-2xl font-bold text-foreground">
            Deliver<span className="text-primary">X</span>
          </h1>
        </div>

        <p className="mx-auto mt-6 max-w-2xl text-center leading-relaxed text-muted-foreground">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Incidunt
          consequuntur amet culpa cum itaque neque.
        </p>

        {/* Navigation Links */}
        <ul className="mt-12 flex flex-wrap justify-center gap-6 md:gap-8 lg:gap-12">
          {["About", "Careers", "History", "Services", "Projects", "Blog"].map(
            (item) => (
              <li key={item}>
                <a
                  className="text-foreground/80 transition hover:text-foreground"
                  href="#"
                >
                  {item}
                </a>
              </li>
            )
          )}
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
