import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  matcher: [
    // Все маршруты кроме api, _next, и статических файлов
    "/((?!api|_next|_vercel|.*\\..*).*)",
  ],
};
