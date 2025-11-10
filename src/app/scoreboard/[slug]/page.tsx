"use client";

import { toPng, toBlob } from "html-to-image";
import { useRef, useState, useCallback, useMemo } from "react";
import { BasicScoreBoard } from "@/components/app/basicSB";
import {
  ScoreboardForm,
  ScoreboardValues,
} from "@/components/app/scoreboardForm";
import { Button } from "@/components/ui/button";
import Img from "next/image";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Loader2,
  Download,
  ImagePlus,
  Clipboard as ClipboardIcon,
  Check,
} from "lucide-react";

export default function ScoreboardPage() {
  const scoreboardRef = useRef<HTMLDivElement>(null);

  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [copyStatus, setCopyStatus] = useState("一鍵複製到剪貼簿");
  const [copied, setCopied] = useState(false);
  const [clipboardSupported] = useState(
    () =>
      typeof window !== "undefined" &&
      !!navigator.clipboard &&
      "ClipboardItem" in window,
  );

  const pixelRatio = useMemo(
    () => Math.max(2, Math.floor(window.devicePixelRatio || 2)),
    [],
  );
  const commonCaptureOptions = useMemo(
    () => ({
      cacheBust: true,
      pixelRatio,
      style: {
        transform: "none",
        transformOrigin: "top left",
        background: "transparent",
      },
    }),
    [pixelRatio],
  );

  const onGenerate = useCallback(() => {
    if (scoreboardRef.current === null) return;
    setIsGenerating(true);

    toPng(scoreboardRef.current, commonCaptureOptions)
      .then((dataUrl) => {
        setImageUrl(dataUrl);
      })
      .catch((err) => {
        console.error("產生圖片時出錯", err);
      })
      .finally(() => {
        setIsGenerating(false);
      });
  }, [scoreboardRef, commonCaptureOptions]);

  const onCopyToClipboard = useCallback(() => {
    if (scoreboardRef.current === null) return;
    setCopied(false);
    setCopyStatus("複製中...");

    toBlob(scoreboardRef.current, commonCaptureOptions)
      .then(async (blob) => {
        if (!blob) return;
        try {
          if (!clipboardSupported) {
            setCopyStatus("瀏覽器不支援");
            return;
          }
          type ClipboardItemCtor = new (items: Record<string, Blob>) => unknown;
          const DynamicClipboardItem = (
            window as unknown as { ClipboardItem?: ClipboardItemCtor }
          ).ClipboardItem;
          if (!DynamicClipboardItem) {
            setCopyStatus("瀏覽器不支援");
            return;
          }
          await navigator.clipboard.write([
            new DynamicClipboardItem({
              "image/png": blob,
            }) as unknown as ClipboardItem,
          ]);
          setCopied(true);
          setCopyStatus("已複製");
        } catch (err) {
          console.error("複製失敗", err);
          setCopyStatus("複製失敗");
        }
      })
      .catch(() => setCopyStatus("產生失敗"))
      .finally(() => {
        setTimeout(() => {
          setCopied(false);
          setCopyStatus("一鍵複製到剪貼簿");
        }, 1800);
      });
  }, [scoreboardRef, commonCaptureOptions, clipboardSupported]);

  const onDownload = useCallback(() => {
    if (scoreboardRef.current === null) return;
    toPng(scoreboardRef.current, commonCaptureOptions)
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.download = "baseball-scoreboard.png";
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        console.error("下載失敗", err);
      });
  }, [scoreboardRef, commonCaptureOptions]);

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
    <div className="w-full px-4 py-8 md:py-12 lg:py-16">
      <div className="mx-auto grid w-full max-w-6xl gap-6 md:grid-cols-2 lg:gap-8">

        <Card className="md:row-span-2">
          <CardContent>
            <div className="w-full items-center">
              <ScoreboardForm onChange={setScoreboardValues} />
            </div>
          </CardContent>
        </Card>
        <Card className="overflow-hidden">
          <CardHeader>
            <CardTitle>比賽記分板</CardTitle>
            <CardDescription>調整下方表單即可即時預覽</CardDescription>
          </CardHeader>
          <CardContent>
            <div
              aria-label="記分板預覽"
              className="bg-background relative mx-auto inline-block overflow-visible rounded-lg border p-2 shadow-sm"
            >
              <div ref={scoreboardRef} className="isolate">
                <BasicScoreBoard {...scoreboardValues} />
              </div>
            </div>
            <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-3">
              <Button
                onClick={onDownload}
                className="w-full"
                aria-label="下載圖片"
                disabled={isGenerating}
              >
                <Download className="mr-1" /> 下載
              </Button>
              <Button
                onClick={onGenerate}
                className="w-full"
                aria-label="一鍵產生圖片"
                disabled={isGenerating}
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="mr-1 animate-spin" /> 產生中...
                  </>
                ) : (
                  <>
                    <ImagePlus className="mr-1" /> 一鍵產生圖片
                  </>
                )}
              </Button>
              <Button
                onClick={onCopyToClipboard}
                className="w-full"
                aria-label="複製圖片到剪貼簿"
                disabled={isGenerating || !clipboardSupported}
                variant={copied ? "secondary" : "default"}
              >
                {copied ? (
                  <>
                    <Check className="mr-1" /> 已複製
                  </>
                ) : (
                  <>
                    <ClipboardIcon className="mr-1" /> {copyStatus}
                  </>
                )}
              </Button>
            </div>
            <p
              className="text-muted-foreground mt-2 text-xs"
              aria-live="polite"
            >
              小技巧：行動裝置可長按預覽圖片進行儲存。
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>輸出預覽</CardTitle>
            <CardDescription>按下「一鍵產生圖片」後顯示</CardDescription>
          </CardHeader>
          <CardContent>
            {isGenerating && (
              <div
                className="bg-muted/30 mx-auto h-[300px] w-full max-w-[820px] animate-pulse rounded-lg border"
                aria-label="載入中"
              />
            )}
            {!isGenerating && imageUrl && (
              <div className="bg-background mx-auto w-full max-w-[420px] overflow-hidden rounded-lg border p-2">
                <Img
                  className="mx-auto block"
                  src={imageUrl}
                  alt="Scoreboard Image"
                  width={400}
                  height={320}
                />
              </div>
            )}
            {!isGenerating && !imageUrl && (
              <p className="text-muted-foreground text-sm">
                尚未產生圖片，請先點擊上方「一鍵產生圖片」。
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
