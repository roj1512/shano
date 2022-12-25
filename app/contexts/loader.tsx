import { createContext, useContext } from "react";

const context = createContext<
  [
    boolean,
    React.Dispatch<React.SetStateAction<boolean>>,
  ]
>([false, () => {}]);

export const useLoader = () => useContext(context);

export const LoaderProvider = context.Provider;
