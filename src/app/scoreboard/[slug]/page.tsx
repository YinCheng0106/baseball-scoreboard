"use client";

import { toPng, toBlob } from "html-to-image";
import { useRef, useState, useCallback } from "react";
import { BasicScoreBoard } from "@/components/app/basicSB";
import {
  ScoreboardForm,
  ScoreboardValues,
} from "@/components/app/scoreboardForm";
import { Button } from "@/components/ui/button";
import Img from "next/image";

export default function ScoreboardPage() {
  const scoreboardRef = useRef<HTMLDivElement>(null);

  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [copyStatus, setCopyStatus] = useState("複製");

  const onGenerate = useCallback(() => {
    if (scoreboardRef.current === null) return;
    setIsGenerating(true);

    toPng(scoreboardRef.current, { cacheBust: true, pixelRatio: 2 }) // pixelRatio: 2 讓圖片更清晰
      .then((dataUrl) => {
        setImageUrl(dataUrl);
      })
      .catch((err) => {
        console.error("產生圖片時出錯", err);
      })
      .finally(() => {
        setIsGenerating(false);
      });
  }, [scoreboardRef]);

  const onCopyToClipboard = useCallback(() => {
    if (scoreboardRef.current === null) return;
    setCopyStatus("複製中...");

    toBlob(scoreboardRef.current, { cacheBust: true, pixelRatio: 2 })
      .then(async (blob) => {
        if (blob) {
          try {
            await navigator.clipboard.write([
              new ClipboardItem({ "image/png": blob }),
            ]);
            setCopyStatus("已複製");
          } catch (err) {
            console.error("複製失敗", err);
            setCopyStatus("複製失敗");
          }
        }
      })
      .catch(() => setCopyStatus("產生失敗"));

    setTimeout(() => setCopyStatus("一鍵複製到剪貼簿"), 2000);
  }, [scoreboardRef]);

  const onDownload = useCallback(() => {
    if (scoreboardRef.current === null) return;
    toPng(scoreboardRef.current)
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.download = "baseball-scoreboard.png";
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        console.error("oops, something went wrong!", err);
      });
  }, [scoreboardRef]);

  const [scoreboardValues, setScoreboardValues] = useState<ScoreboardValues>({
    homeColor: "#000000",
    awayColor: "#000000",
    homeScore: 0,
    awayScore: 0,
    inning: 1,
    topOfInning: true,
    strikes: 0,
    balls: 0,
    outs: 0,
    homeName: "HOME",
    awayName: "AWAY",
    base1: false,
    base2: false,
    base3: false,
  });

  return (
    <div
      className={`flex w-full flex-col items-center space-y-6 px-4 py-8 md:py-12 lg:py-16`}
    >
      <div
        className={`scale-[1.2] transition-transform duration-300 hover:scale-[1.5]`}
      >
        <div ref={scoreboardRef}>
          <BasicScoreBoard {...scoreboardValues} />
        </div>
      </div>
      <div className="w-full max-w-md">
        <ScoreboardForm onChange={setScoreboardValues} />
      </div>
      <div className="grid grid-cols-3 items-center gap-2">
        <Button onClick={onDownload} className="cursor-pointer">
          下載
        </Button>
        <Button onClick={onGenerate} className="cursor-pointer">
          {isGenerating ? "產生中..." : "一鍵產生圖片"}
        </Button>
        <Button onClick={onCopyToClipboard} className="cursor-pointer">
          {copyStatus}
        </Button>
      </div>
      <div>
        {imageUrl && (
          <div>
            <Img className="mt-2 border-2 border-dashed border-gray-400" src={imageUrl} alt="Scoreboard Image" width={500} height={300} />
          </div>
        )}
      </div>
    </div>
  );
}
