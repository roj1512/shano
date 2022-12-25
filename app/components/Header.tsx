import { useHeader } from "~/contexts/header";
import Shano from "~/logos/Shano";

export default function Header() {
  const { logoAnimated, text, button } = useHeader();

  return (
    <header className="p-3 border-b-2 border-[rgba(0,0,0,.05)] dark:border-[rgba(255,255,255,.0375)]">
      <div className="w-full max-w-3xl mx-auto flex justify-between items-center">
        <div className="rounded-full font-bold items-center gap-2 text-lg flex items-center">
          <Shano animated={logoAnimated} /> {text ?? "شانۆ"}
        </div>
        {button}
      </div>
    </header>
  );
}
