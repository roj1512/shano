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
    <header className="p-3 border-b-2 border-[rgba(0,0,0,.05)] dark:border-[rgba(255,255,255,.0375)]">
      <div className="w-full max-w-3xl mx-auto flex justify-between items-center">
        <SwitchTransition>
          <Transition key={text} timeout={100}>
            {(state) => (
              <div
                className={`rounded-full font-bold items-center gap-2 text-lg flex items-center duration-100 ${commonTransitionClasses[state]} `}
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
