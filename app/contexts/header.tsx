import { createContext, useContext } from "react";

const context = createContext<{
  logoAnimated: boolean;
  setLogoAnimated: React.Dispatch<React.SetStateAction<boolean>>;
  text: string | null;
  setText: React.Dispatch<React.SetStateAction<string | null>>;
  button: JSX.Element | null;
  setButton: React.Dispatch<React.SetStateAction<JSX.Element | null>>;
}>({
  logoAnimated: false,
  setLogoAnimated: () => {},
  text: null,
  setText: () => {},
  button: null,
  setButton: () => {},
});

export const useHeader = () => useContext(context);

export const HeaderProvider = context.Provider;
