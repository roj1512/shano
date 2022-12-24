import { FaMicrophone } from "react-icons/fa";
import Shano from "~/logos/Shano";

export default function Index() {
  return (
    <>
      <header className="w-full max-w-screen-xl mx-auto p-2">
        <button className="rounded-full px-4 py-2 hover:bg-[rgba(0,0,0,0.05)] dark:hover:bg-[rgba(255,255,255,0.125)] flex font-bold items-center gap-1.5 text-lg">
          <Shano /> شانۆ
        </button>
      </header>
      <main className="w-full max-w-screen-xl mx-auto p-2 flex flex-col items-center">
        <div>
          <button className="rounded-full px-4 py-2 bg-[rgba(0,0,0,0.05)] dark:bg-[rgba(255,255,255,0.125)] hover:bg-[rgba(0,0,0,0.1)] dark:hover:bg-[rgba(255,255,255,0.1875)] flex items-center gap-1.5">
            <FaMicrophone size={20} /> دەست بکە بە تۆمارکردن
          </button>
        </div>
      </main>
    </>
  );
}
