import Alert from "./components/Alert";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { AlertProvider, Alert as Alert_ } from "./contexts/alert";
import { HeaderProvider } from "./contexts/header";
import styles from "./dist/built_main.css";
import { type MetaFunction, json } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import { cleanEnv, url } from "envalid";
import { useState } from "react";

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "شانۆ",
  viewport: "width=device-width,initial-scale=1",
});

export function links() {
  return [
    { rel: "stylesheet", href: styles },
    {
      rel: "apple-touch-icon",
      sizes: "180x180",
      href: "/apple-touch-icon.png",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "32x32",
      href: "/favicon-32x32.png",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "16x16",
      href: "/favicon-16x16.png",
    },
  ];
}

export async function loader() {
  return json({
    env: cleanEnv(process.env, { API_URL: url() }),
  });
}

export default function App() {
  const data = useLoaderData<typeof loader>();
  const [logoAnimated, setLogoAnimated] = useState(false);
  const [alert, setAlert] = useState<Alert_>(null);
  const [text, setText] = useState<string | null>(null);
  const [button, setButton] = useState<JSX.Element | null>(null);

  return (
    <html dir="rtl">
      <head>
        <Meta />
        <Links />
      </head>
      <body className="flex h-screen select-none flex-col gap-1 font-vazirmatn text-ourblack dark:bg-ourblack dark:text-white">
        <AlertProvider value={[alert, setAlert]}>
          <HeaderProvider
            value={{
              logoAnimated,
              setLogoAnimated,
              text,
              setText,
              button,
              setButton,
            }}
          >
            <Alert />
            <Header />
            <Outlet />
            <Footer />
          </HeaderProvider>
        </AlertProvider>
        <ScrollRestoration />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.env = ${JSON.stringify(data.env)};`,
          }}
        />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
