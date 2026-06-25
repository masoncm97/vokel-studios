import { ServiceRow } from "./ServiceRow";
import type { ServiceEntry } from "@/sanity/types";

export function ServiceIndex({ services }: { services?: ServiceEntry[] }) {
  if (!services || services.length === 0) return null;

  return (
    <section id="services" className="vk-wrap py-16 md:py-24">
      <div className="vk-mono mb-2 flex items-center justify-between">
        <span>Service index</span>
        <span aria-hidden>{String(services.length).padStart(2, "0")}</span>
      </div>

      <ul>
        {services.map((service, i) => (
          <ServiceRow key={service._key} service={service} index={i} />
        ))}
      </ul>
    </section>
  );
}
