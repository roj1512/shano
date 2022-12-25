import { createContext, useContext } from "react";

const context = createContext<
  {
    logoAnimated: boolean;
    setLogoAnimated: React.Dispatch<React.SetStateAction<boolean>>;
  }
>({ logoAnimated: false, setLogoAnimated: () => {} });

export const useHeader = () => useContext(context);

export const HeaderProvider = context.Provider;
