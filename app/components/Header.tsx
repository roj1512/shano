import { useLoader } from "~/contexts/loader";
import Shano from "~/logos/Shano";

export default function Header() {
  const [loading] = useLoader();

  return (
    <header className="p-3 border-b-2 border-[rgba(0,0,0,.05)] dark:border-[rgba(255,255,255,.0375)]">
      <div className="w-full max-w-3xl mx-auto">
        <div className="rounded-full font-bold items-center gap-2 text-lg flex items-center">
          <Shano animated={loading != null} />
          {loading == null ? "شانۆ" : loading}
        </div>
      </div>
    </header>
  );
}
