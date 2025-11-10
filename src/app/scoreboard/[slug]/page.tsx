"use client";

import { useRef, useState } from "react";
import { BasicScoreBoard } from "@/components/app/basicSB";
import {
  ScoreboardForm,
  ScoreboardValues,
} from "@/components/app/scoreboardForm";

export default function ScoreboardPage() {
  const scoreboardRef = useRef<HTMLDivElement>(null);

  const [scoreboardValues, setScoreboardValues] = useState<ScoreboardValues>({
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
        className={`scale-[1.2] hover:scale-[1.5] transition-transform duration-300`}
        ref={scoreboardRef}
      >
        <BasicScoreBoard {...scoreboardValues} />
      </div>
      <div className="w-full max-w-md">
        <ScoreboardForm onChange={setScoreboardValues} />
      </div>
    </div>
  );
}
