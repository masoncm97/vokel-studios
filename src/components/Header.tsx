import Link from "next/link";

type HeaderProps = {
  wordmark: string;
};

export function Header({ wordmark }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 border-b border-[color:var(--color-hairline)] bg-[color:var(--color-paper)]/85 backdrop-blur-sm">
      <div className="vk-wrap flex items-center justify-between py-4">
        <Link
          href="/"
          className="font-display text-base font-medium tracking-tight"
        >
          {wordmark}
        </Link>
        <nav>
          <a
            href="#contact"
            className="vk-mono transition-colors hover:text-[color:var(--color-ink)]"
          >
            Contact
          </a>
        </nav>
      </div>
    </header>
  );
}
