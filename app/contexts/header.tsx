import { createContext, useContext } from "react";

const context = createContext<
  {
    logoAnimated: boolean;
    setLogoAnimated: React.Dispatch<React.SetStateAction<boolean>>;
    text: string | null;
    setText: React.Dispatch<React.SetStateAction<string | null>>;
  }
>({
  logoAnimated: false,
  setLogoAnimated: () => {},
  text: null,
  setText: () => {},
});

export const useHeader = () => useContext(context);

export const HeaderProvider = context.Provider;
