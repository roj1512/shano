import { createContext, useContext } from "react";

export type Alert = { title: string; body: string } | null;

const context = createContext<
  [Alert, React.Dispatch<React.SetStateAction<Alert>>]
>([null, () => {}]);

export const useAlert = () => useContext(context);

export const AlertProvider = context.Provider;
