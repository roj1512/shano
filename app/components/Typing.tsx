import { createRef, useEffect } from "react";
import Typed from "typed.js";

export default function Typing({ children }: { children: string }) {
  const pRef = createRef<HTMLParagraphElement>();

  useEffect(() => {
    const p = pRef.current;
    if (p) {
      new Typed(p, { strings: [children], showCursor: false, typeSpeed: 80 });
    }
  }, []);

  return <p ref={pRef} className="text-2xl whitespace-pre-wrap"></p>;
}
