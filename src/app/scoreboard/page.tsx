import { ScoreBoardCard } from "@/components/app/scoreboardCard";

export default function ScoreBoardPage() {
  return (
    <div className="w-full">
      <section className="container mx-auto px-4 pb-16 sm:px-6 sm:pb-20 lg:px-8 lg:pb-24">
        <div className="mx-auto flex max-w-6xl grid-cols-2 flex-col gap-2 sm:grid">
          <ScoreBoardCard
            title="基本"
            description="基本的功能"
            imageSrc=""
            linkHref="/scoreboard/basic"
          />
          <ScoreBoardCard
            title="基礎_2"
            description="基礎的功能"
            imageSrc=""
            linkHref="/scoreboard/advanced"
          />
          <ScoreBoardCard
            title="進階"
            description="進階的功能"
            imageSrc=""
            linkHref="/scoreboard/advanced"
          />
          <ScoreBoardCard
            title="進階_2"
            description="進階的功能"
            imageSrc=""
            linkHref="/scoreboard/advanced"
          />
        </div>
      </section>
    </div>
  );
}
