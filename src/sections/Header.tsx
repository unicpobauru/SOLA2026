import { Container } from "../components/ui/Container";
import { useScrolled } from "../hooks/useScrolled";

export function Header() {
  const scrolled = useScrolled(40);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-ink-900/90 shadow-[0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <Container>
        <div className="flex h-[72px] items-center lg:h-[84px]">
          <a href="#inicio" className="flex items-center">
            <img
              src="images/logo-unicpo.png"
              alt="Faculdade UniCPO"
              className="h-8 w-auto lg:h-9"
            />
          </a>
        </div>
      </Container>
    </header>
  );
}
