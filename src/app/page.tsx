import type { Metadata } from "next";

import { EmptyNotice } from "@/components/EmptyNotice";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Marquee } from "@/components/Marquee";
import { ServiceIndex } from "@/components/ServiceIndex";
import { WhatWeDo } from "@/components/WhatWeDo";
import { sanityFetch } from "@/sanity/lib/live";
import { HOME_QUERY, SETTINGS_QUERY } from "@/sanity/lib/queries";
import type { HomeData, SettingsData } from "@/sanity/types";

async function getContent() {
  const [home, settings] = await Promise.all([
    sanityFetch({ query: HOME_QUERY }),
    sanityFetch({ query: SETTINGS_QUERY }),
  ]);
  return {
    home: (home.data ?? null) as HomeData | null,
    settings: (settings.data ?? null) as SettingsData | null,
  };
}

export async function generateMetadata(): Promise<Metadata> {
  // stega:false so invisible editing markers never leak into SEO strings.
  const { data } = await sanityFetch({
    query: SETTINGS_QUERY,
    stega: false,
  });
  const settings = data as SettingsData | null;
  if (!settings?.title) return {};
  return {
    title: {
      absolute: `${settings.title} — Music Marketing Studio`,
    },
  };
}

export default async function HomePage() {
  const { home, settings } = await getContent();

  const wordmark = settings?.title || "Vokel.Studios";
  const isEmpty = !home;

  return (
    <>
      <Header wordmark={wordmark} />
      <main>
        {isEmpty ? <EmptyNotice /> : null}
        <Hero hero={home?.hero} />
        <Marquee items={home?.marquee?.items} />
        <WhatWeDo data={home?.whatWeDo} />
        <ServiceIndex services={home?.services} />
      </main>
      <Footer contact={home?.contact} settings={settings ?? undefined} />
    </>
  );
}
