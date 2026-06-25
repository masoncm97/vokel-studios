import { LocalTimeTicker } from "./LocalTimeTicker";
import type { HomeData, SettingsData } from "@/sanity/types";

type FooterProps = {
  contact?: HomeData["contact"];
  settings?: SettingsData;
};

export function Footer({ contact, settings }: FooterProps) {
  const email = settings?.contactEmail;
  const socials = settings?.socials ?? [];
  const year = new Date().getFullYear();
  const footerText = settings?.footerText
    ? `${settings.footerText} · ©${year}`
    : `©${year}`;

  return (
    <footer
      id="contact"
      className="vk-wrap border-t border-[color:var(--color-hairline)] pt-20 pb-12 md:pt-28"
    >
      {contact?.line ? (
        <p className="font-display text-[clamp(2.25rem,8vw,6rem)] font-medium leading-[0.95] tracking-[-0.02em]">
          {email ? (
            <a
              href={`mailto:${email}`}
              className="inline decoration-[color:var(--color-hairline)] underline-offset-[0.15em] transition-[background-color,box-shadow] hover:bg-[color:var(--color-signal)] hover:box-decoration-clone"
            >
              {contact.line}
            </a>
          ) : (
            contact.line
          )}
        </p>
      ) : null}

      <div className="mt-16 flex flex-col gap-6 border-t border-[color:var(--color-hairline)] pt-6 md:flex-row md:items-center md:justify-between">
        {email ? (
          <a href={`mailto:${email}`} className="vk-mono normal-case tracking-normal">
            {email}
          </a>
        ) : (
          <span />
        )}

        {socials.length > 0 ? (
          <ul className="flex flex-wrap gap-x-5 gap-y-1">
            {socials.map((s) => (
              <li key={s._key}>
                <a
                  href={s.url}
                  target="_blank"
                  rel="noreferrer"
                  className="vk-mono normal-case tracking-normal hover:text-[color:var(--color-ink)]"
                >
                  {s.platform}
                </a>
              </li>
            ))}
          </ul>
        ) : null}
      </div>

      <div className="mt-10 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <span className="vk-mono">{footerText}</span>
        <LocalTimeTicker label={settings?.locationLabel || "now"} />
      </div>
    </footer>
  );
}
