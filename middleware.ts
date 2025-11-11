/* eslint-disable @typescript-eslint/no-explicit-any */
import createMiddleware from "next-intl/middleware";
import { NextResponse } from "next/server";
import { routing } from "./i18n/routing";

// Yangi middleware funksiyasi
const intlMiddleware = createMiddleware(routing);

export default function middleware(request: Request) {
  const { pathname } = new URL(request.url);

  // Lokal prefikslar (yo‘nalishlar)
  const locales = ["uz", "ru", "en", "tr", "kz"];
  const hasLocalePrefix = locales.some((locale) => pathname.startsWith(`/${locale}`));

  // Agar URL da locale yo‘q bo‘lsa, defaultLocale (uz) ni qo‘shamiz
  if (!hasLocalePrefix) {
    const locale = "uz"; // defaultLocale
    return NextResponse.redirect(new URL(`/${locale}${pathname}`, request.url));
  }

  // Aks holda next-intl middleware davom ettiradi
  return intlMiddleware(request as any) as ReturnType<typeof intlMiddleware>;
}

// Harakat yo‘nalishlarini aniqlash
export const config = {
  matcher: [
    "/", // root
    "/(ru|en|uz|kz|tr)/:path*", // lokal yo‘nalishlar
    "/((?!api|_next|.*\\..*).*)", // boshqa barcha sahifalar
  ],
};
