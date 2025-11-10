import { Base } from "@/components/app/base";

type Props = Readonly<{
  homeColor: string;
  awayColor: string;
  homeScore: number;
  awayScore: number;
  inning: number;
  topOfInning: boolean;
  strikes: number;
  balls: number;
  outs: number;
  homeName: string;
  awayName: string;
  base1: boolean;
  base2: boolean;
  base3: boolean;
}>;

export function BasicScoreBoard({
  homeColor,
  awayColor,
  homeScore,
  awayScore,
  inning,
  topOfInning,
  strikes,
  balls,
  outs,
  homeName,
  awayName,
  base1,
  base2,
  base3,
}: Props) {
  return (
    <div className="bg-accent-foreground/5 min-md mx-auto flex max-w-full flex-col select-none">
      <div className="flex justify-between">
        <div className="items-center justify-center">
          {/* Score */}

          <table className="h-20 max-w-35 min-w-30">
            <tbody>
              <tr
                className="items-center"
                style={{ backgroundColor: awayColor }}
              >
                <td className="pl-2 text-start text-xl font-bold sm:text-2xl">
                  {awayName}
                </td>

                <td className="w-8 px-2 text-center text-xl font-bold sm:text-2xl">
                  {awayScore}
                </td>
              </tr>

              <tr
                className="items-center"
                style={{ backgroundColor: homeColor }}
              >
                <td className="pl-2 text-start text-xl font-bold sm:text-2xl">
                  {homeName}
                </td>

                <td className="w-8 px-2 text-center text-xl font-bold sm:text-2xl">
                  {homeScore}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Bases */}
        <Base base1={base1} base2={base2} base3={base3} />
      </div>

      <div className="bg-accent flex justify-around">
        {/* Inning */}

        <div className="flex items-center justify-center px-2">
          <p className="w-6 text-center font-bold">{inning}</p>
          <p className="font-bold">{topOfInning ? "上" : "下"}</p>
        </div>

        <div className="flex items-center justify-center px-2">
          <p className="w-4 font-bold">{outs}</p>
          <p className="font-bold">Outs</p>
        </div>

        <div className="flex items-center justify-center px-2">
          <p className="w-4 text-center font-bold">{balls}</p>
          <p className="text-center font-bold">-</p>
          <p className="w-4 text-center font-bold">{strikes}</p>
        </div>
      </div>
    </div>
  );
}
