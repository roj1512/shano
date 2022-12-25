import { useEffect, useState } from "react";
import {
  FaCircleNotch,
  FaFileAudio,
  FaMicrophone,
  FaMicrophoneSlash,
} from "react-icons/fa";
import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";
import Typing from "~/components/Typing";
import { useHeader } from "~/contexts/header";

const supportedMimeTypes = [
  "audio/mp3",
  "audio/ogg",
  "audio/x-wav",
  "video/ogg",
  "audio/mp4",
  "video/mp4",
];

export default function Index() {
  const { setLogoAnimated, setText } = useHeader();
  const [loading, setLoading] = useState(false);
  const [recording, setRecording] = useState(false);
  const [loadingText, setLoadingText] = useState("");
  const [result, setResult] = useState("");
  const [recorder, setRecorder] = useState<MediaRecorder>();

  async function process(file: Blob | File) {
    const ffmpeg = createFFmpeg({
      mainName: "main",
      corePath: "https://unpkg.com/@ffmpeg/core-st@0.11.1/dist/ffmpeg-core.js",
    });
    setLoading(true);
    setLoadingText("FFmpeg دادەمەزرێنرێت...");
    await ffmpeg.load();
    setLoadingText("کار لەسەر دەنگەکەت دەکرێت...");
    ffmpeg.FS(
      "writeFile",
      "input.ogg",
      await fetchFile(file),
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
      // @ts-expect-error
      new URL("/upload", window.env.API_URL),
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
  }

  useEffect(() => {
    async function drop(e: DragEvent) {
      const item = e.dataTransfer?.items[0];
      if (item?.kind == "file" && supportedMimeTypes.includes(item.type)) {
        const file = item.getAsFile();
        if (file) {
          await process(file);
        }
      }
    }

    addEventListener("drop", drop);

    return () => removeEventListener("drop", drop);
  }, []);

  return (
    <main className="w-full max-w-3xl mx-auto p-3 flex flex-col gap-2 items-center justify-center flex-grow">
      {!loading && !result && (
        <div className="flex flex-col items-center gap-2">
          {!recording && (
            <div className="flex-grow w-full">
              <label className="cursor-pointer duration-100 rounded-full w-full px-5 py-2 bg-[rgba(0,0,0,0.07)] dark:bg-[rgba(255,255,255,0.07)] hover:bg-[rgba(0,0,0,0.15)] dark:hover:bg-[rgba(255,255,255,0.15)] flex items-center justify-center gap-1.5">
                <input
                  type="file"
                  accept={supportedMimeTypes.join(", ")}
                  onChange={async (e) => {
                    const file = e.target.files?.[0];
                    if (file && supportedMimeTypes.includes(file.type)) {
                      await process(file);
                    }
                  }}
                  hidden
                />
                <FaFileAudio size={16} />
                فایلێکی دەنگ هەڵبژێرە
              </label>
            </div>
          )}
          <div>
            {recording
              ? (
                <button
                  onClick={() => recorder?.stop()}
                  className="duration-100 rounded-full px-5 py-2 bg-[rgba(0,0,0,0.07)] dark:bg-[rgba(255,255,255,0.07)] hover:bg-[rgba(0,0,0,0.15)] dark:hover:bg-[rgba(255,255,255,0.15)] flex items-center justify-center gap-1.5"
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
                    recorder.onstop = () => {
                      setText(null);
                      setLogoAnimated(false);
                      setRecording(false);
                      stream.getAudioTracks()[0].enabled = false;
                      return process(new Blob(blobs));
                    };
                    recorder.start();
                    setText("تۆمار دەکرێت");
                    setLogoAnimated(true);
                    setRecording(true);
                  }}
                  className="duration-100 rounded-full px-5 py-2 bg-[rgba(0,0,0,0.07)] dark:bg-[rgba(255,255,255,0.07)] hover:bg-[rgba(0,0,0,0.15)] dark:hover:bg-[rgba(255,255,255,0.15)] flex items-center justify-center gap-1.5"
                >
                  <FaMicrophone size={16} /> دەست بکە بە تۆمارکردن
                </button>
              )}
          </div>
        </div>
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
        <div className="w-full flex-grow">
          <Typing>
            {result}
          </Typing>
        </div>
      )}
    </main>
  );
}
