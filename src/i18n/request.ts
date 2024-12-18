import {getRequestConfig} from 'next-intl/server';
import { cookies } from 'next/headers'

export default getRequestConfig(async () => {
  // Provide a static locale, fetch a user setting,
  // read from `cookies()`, `headers()`, etc.
  const cookieStore = await cookies();
  const loc = await cookieStore.get("locale");
  const locale = loc? loc.value : "en";

  console.log(cookieStore.get("locale"));
  console.log(loc);
  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default
  };
});