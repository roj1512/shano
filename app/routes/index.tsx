import { useState } from "react";
import { FaCircleNotch, FaMicrophone, FaMicrophoneSlash } from "react-icons/fa";
import Typing from "~/components/Typing";
import { useHeader } from "~/contexts/header";

enum Status {
  None,
  Uploading,
  Recording,
  Result,
}

export default function Index() {
  const [status, setStatus] = useState(Status.None);
  const { setLogoAnimated } = useHeader();

  return (
    <main className="w-full max-w-3xl mx-auto p-2 flex flex-col gap-2 items-center justify-center flex-grow">
      {{
        [Status.None]: (
          <>
            <h1 className="text-2xl font-bold">فایلێک ڕاکێشە ئێرە.</h1>
            <p>یان</p>
            <div>
              <button
                onClick={async () => {
                  // const stream = await navigator.mediaDevices.getUserMedia({
                  //   audio: true,
                  // });
                  // const recorder = new MediaRecorder(stream, {
                  //   audioBitsPerSecond: 16_000,
                  // });
                  // recorder.ondataavailable = (e) => {
                  //   console.log(URL.createObjectURL(e.data));
                  // };
                  // recorder.start();
                  // await new Promise((r) => setTimeout(r, 5000));
                  // recorder.stop();
                  setLogoAnimated(true);
                  setStatus(Status.Recording);
                }}
                className="rounded-full px-4 py-2 bg-[rgba(0,0,0,0.07)] dark:bg-[rgba(255,255,255,0.07)] hover:bg-[rgba(0,0,0,0.15)] dark:hover:bg-[rgba(255,255,255,0.15)] flex items-center justify-center gap-1.5"
              >
                <FaMicrophone size={16} /> دەنگت تۆمار بکە
              </button>
            </div>
          </>
        ),
        [Status.Uploading]: (
          <div
            className="flex gap-1.5 items-center justify-center text-xl"
            onClick={() => {
              setStatus(Status.Result);
            }}
          >
            <FaCircleNotch size={20} className="animate-spin" />
            دەنگەکەت بار دەکرێت...
          </div>
        ),
        [Status.Recording]: (
          <div>
            <button
              onClick={async () => {
                setLogoAnimated(false);
                setStatus(Status.Uploading);
              }}
              className="rounded-full px-4 py-2 bg-[rgba(0,0,0,0.07)] dark:bg-[rgba(255,255,255,0.07)] hover:bg-[rgba(0,0,0,0.15)] dark:hover:bg-[rgba(255,255,255,0.15)] flex items-center justify-center gap-1.5"
            >
              <FaMicrophoneSlash size={16} /> تۆمارکردن ڕاوەستێنە
            </button>
          </div>
        ),
        [Status.Result]: (
          <div className="w-full flex-grow p-3">
            <Typing>
              .
            </Typing>
          </div>
        ),
      }[status]}
    </main>
  );
}
