import { ScoreBoardCard } from "@/components/app/scoreboardCard";

export default function ScoreBoardPage() {
  return (
    <div className="w-full">
      <section className="container mx-auto px-4 pb-16 sm:px-6 sm:pb-20 lg:px-8 lg:pb-24">
        <div className="mx-auto flex max-w-6xl grid-cols-2 flex-col gap-2 sm:grid">
          <ScoreBoardCard
            title="基本計分版"
            description="包含分數、局數、好壞球數、出局數、壘包狀態以及隊伍名稱等相關功能"
            imageSrc=""
            linkHref="/scoreboard/basic"
          />
          <ScoreBoardCard
            title="打序板"
            description="包含打者姓名、守備位置以及背號等相關功能"
            imageSrc=""
            linkHref="/scoreboard/lineup"
          />
          <ScoreBoardCard
            title="進階計分版"
            description="包含各局比賽分數、團隊安打以及團隊失誤等相關功能"
            imageSrc=""
            linkHref="/scoreboard/advanced"
          />
          <ScoreBoardCard
            title="球員數據"
            description="顯示守備員、打者數據等相關功能"
            imageSrc=""
            linkHref="/scoreboard/player-stats"
          />
        </div>
      </section>
    </div>
  );
}
