import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  onMenuToggle: () => void;
}

export const Header = ({ onMenuToggle }: HeaderProps) => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={onMenuToggle}
            className="md:hidden"
          >
            <Menu className="h-5 w-5" />
          </Button>
          <h1 className="font-montserrat text-xl font-bold text-primary md:text-2xl">
            Zulu Lami
          </h1>
        </div>
        
        <nav className="hidden md:flex items-center gap-6">
          <a href="/" className="text-sm font-medium transition-colors hover:text-primary">
            Home
          </a>
          <a href="/search" className="text-sm font-medium transition-colors hover:text-primary">
            Search
          </a>
          <a href="/experiences" className="text-sm font-medium transition-colors hover:text-primary">
            Experiences
          </a>
          <a href="/login" className="text-sm font-medium transition-colors hover:text-primary">
            Login
          </a>
        </nav>
      </div>
    </header>
  );
};
