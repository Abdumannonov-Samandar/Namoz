"use client";

import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";

export function useLocalizedUrl() {
  const locale = useLocale();
  const router = useRouter();

  const getLocalizedUrl = (path?: string) => {
    if (!path) return `/${locale}`;
    if (/^https?:\/\//.test(path)) return path;
    const normalized = path.startsWith("/") ? path : `/${path}`;
    return `/${locale}${normalized}`;
  };

  const pushLocalized = (path?: string) => router.push(getLocalizedUrl(path));
  const replaceLocalized = (path?: string) => router.replace(getLocalizedUrl(path));

  return { locale, getLocalizedUrl, pushLocalized, replaceLocalized };
}
