import { useEffect, useState } from "react";
import { SwitchTransition, Transition } from "react-transition-group";
import { commonTransitionClasses } from "~/constants";
import { useHeader } from "~/contexts/header";
import Shano from "~/logos/Shano";

export default function Header() {
  const [button, setButton] = useState<JSX.Element>();
  const { logoAnimated, text, button: configuredButton } = useHeader();

  useEffect(() => {
    if (configuredButton != null) {
      setButton(configuredButton);
    }
  }, [configuredButton]);

  return (
    <header className="border-b-2 border-[rgba(0,0,0,.05)] p-3 dark:border-[rgba(255,255,255,.0375)]">
      <div className="mx-auto flex w-full max-w-3xl items-center justify-between">
        <SwitchTransition>
          <Transition key={text} timeout={100}>
            {(state) => (
              <div
                className={`flex items-center items-center gap-2 rounded-full text-lg font-bold duration-100 ${commonTransitionClasses[state]} `}
              >
                <Shano animated={logoAnimated} /> {text ?? "شانۆ"}
              </div>
            )}
          </Transition>
        </SwitchTransition>
        <Transition in={configuredButton != null} timeout={100}>
          {(state) => (
            <div className={`duration-100 ${commonTransitionClasses[state]}`}>
              {button}
            </div>
          )}
        </Transition>
      </div>
    </header>
  );
}
