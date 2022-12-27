import { createRef, useEffect, useState } from "react";

export default function Typing({ children }: { children: string }) {
  const [text, setText] = useState("");
  const pRef = createRef<HTMLParagraphElement>();

  useEffect(() => {
    let interval: NodeJS.Timer; // number

    function update() {
      setText((v) => {
        v = v + children.slice(v.length, v.length + 1);
        if (v.length >= children.length) {
          clearInterval(interval);
        }
        return v;
      });
      scrollTo(0, document.body.scrollHeight);
    }

    interval = setInterval(update, 50);
  }, []);

  return (
    <p
      className="whitespace-pre-wrap text-2xl"
      ref={pRef}
      onClick={() => setText(children)}
    >
      {text}
    </p>
  );
}
