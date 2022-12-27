import { json, type MetaFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import { useState } from "react";
import { cleanEnv, url } from "envalid";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { HeaderProvider } from "./contexts/header";
import styles from "./dist/built_main.css";
import Alert from "./components/Alert";
import { Alert as Alert_, AlertProvider } from "./contexts/alert";

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
      <body className="font-vazirmatn text-ourblack dark:bg-ourblack dark:text-white select-none flex flex-col h-screen gap-1">
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
            __html: `window.env = ${
              JSON.stringify(
                data.env,
              )
            };`,
          }}
        />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
