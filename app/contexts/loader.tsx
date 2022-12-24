import { createContext, useContext } from "react";

const context = createContext<
  [
    string | null,
    React.Dispatch<React.SetStateAction<string|null>>,
  ]
>([null, () => {}]);

export const useLoader = () => useContext(context);

export const LoaderProvider = context.Provider;
