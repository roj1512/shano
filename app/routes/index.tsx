import { useState } from "react";
import { FaCircleNotch, FaMicrophone, FaMicrophoneSlash } from "react-icons/fa";
import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";
import Typing from "~/components/Typing";
import { useHeader } from "~/contexts/header";

export default function Index() {
  const { setLogoAnimated, setText } = useHeader();
  const [loading, setLoading] = useState(false);
  const [recording, setRecording] = useState(false);
  const [loadingText, setLoadingText] = useState("");
  const [result, setResult] = useState("");
  const [recorder, setRecorder] = useState<MediaRecorder>();

  return (
    <main className="w-full max-w-3xl mx-auto p-2 flex flex-col gap-2 items-center justify-center flex-grow">
      {!loading && !result && (
        <>
          {!recording && (
            <>
              <h1 className="text-2xl font-bold">فایلێک ڕاکێشە ئێرە.</h1>
              <p>یان</p>
            </>
          )}
          <div>
            {recording
              ? (
                <button
                  onClick={() => recorder?.stop()}
                  className="rounded-full px-4 py-2 bg-[rgba(0,0,0,0.07)] dark:bg-[rgba(255,255,255,0.07)] hover:bg-[rgba(0,0,0,0.15)] dark:hover:bg-[rgba(255,255,255,0.15)] flex items-center justify-center gap-1.5"
                >
                  <FaMicrophoneSlash size={16} /> تۆمارکردن ڕاوەستێنە
                </button>
              )
              : (
                <button
                  onClick={async () => {
                    const stream = await navigator.mediaDevices.getUserMedia({
                      audio: true,
                    });
                    const recorder = new MediaRecorder(stream, {
                      audioBitsPerSecond: 16_000,
                    });
                    setRecorder(recorder);
                    const blobs = new Array<Blob>();
                    recorder.ondataavailable = (e) => {
                      blobs.push(e.data);
                    };
                    recorder.onstop = async () => {
                      setText(null);
                      setLogoAnimated(false);
                      setRecording(false);
                      stream.getAudioTracks()[0].enabled = false;
                      const ffmpeg = createFFmpeg({
                        mainName: "main",
                        corePath:
                          "https://unpkg.com/@ffmpeg/core-st@0.11.1/dist/ffmpeg-core.js",
                      });
                      setLoading(true);
                      setLoadingText("FFmpeg دادەمەزرێنرێت...");
                      await ffmpeg.load();
                      setLoadingText("کار لەسەر دەنگەکەت دەکرێت...");
                      ffmpeg.FS(
                        "writeFile",
                        "input.ogg",
                        await fetchFile(new Blob(blobs)),
                      );
                      await ffmpeg.run(
                        "-y",
                        "-i",
                        "input.ogg",
                        "-ar",
                        "16K",
                        "-ac",
                        "1",
                        "output.wav",
                      );
                      const output = ffmpeg.FS("readFile", "output.wav");
                      const data = new FormData();
                      data.append("BeamSize", "50");
                      data.append("audioFile", new Blob([output]));
                      const res = await fetch(
                        "https://dc91-31-208-75-248.eu.ngrok.io/upload",
                        {
                          method: "POST",
                          body: data,
                        },
                      );
                      if (res.status == 200) {
                        const data = await res.json();
                        setResult(data[0]["transcription"]);
                        setLoadingText("");
                        setLoading(false);
                      }
                    };
                    recorder.start();
                    setText("تۆمار دەکرێت");
                    setLogoAnimated(true);
                    setRecording(true);
                  }}
                  className="rounded-full px-4 py-2 bg-[rgba(0,0,0,0.07)] dark:bg-[rgba(255,255,255,0.07)] hover:bg-[rgba(0,0,0,0.15)] dark:hover:bg-[rgba(255,255,255,0.15)] flex items-center justify-center gap-1.5"
                >
                  <FaMicrophone size={16} /> دەنگت تۆمار بکە
                </button>
              )}
          </div>
        </>
      )}
      {loading && (
        <>
          <div className="flex gap-2 items-center justify-center text-xl">
            <FaCircleNotch size={20} className="animate-spin" />
            {loadingText}
          </div>
        </>
      )}
      {!loading && result && (
        <div className="w-full flex-grow p-3">
          <Typing>
            {result}
          </Typing>
        </div>
      )}
    </main>
  );
}
