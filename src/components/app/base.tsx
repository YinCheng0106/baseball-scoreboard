type BaseProps = Readonly<{
  base1: boolean;
  base2: boolean;
  base3: boolean;
}>;

export function Base({ base1, base2, base3 }: BaseProps) {
  return (
    <div>
      <svg
        className="h-20 w-22 fill-gray-400 dark:fill-gray-800 dark:stroke-white"
        viewBox="0 0 100 60"
        fill="none"
        preserveAspectRatio="xMidYMid meet"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* first base */}

        <polygon
          points="70,55 85,40 70,25 55,40"
          fill={base1 ? "#FFD700" : "white"}
          strokeWidth="2"
          className={
            base1
              ? "stroke-gray-400 dark:fill-yellow-400 dark:stroke-white"
              : "stroke-gray-400 dark:fill-gray-800 dark:stroke-white"
          }
        />

        {/* second base */}

        <polygon
          points="50,35 65,20 50,5 35,20"
          fill={base2 ? "#FFD700" : "white"}
          strokeWidth="2"
          className={
            base2
              ? "stroke-gray-400 dark:fill-yellow-400 dark:stroke-white"
              : "stroke-gray-400 dark:fill-gray-800 dark:stroke-white"
          }
        />

        {/* third base */}

        <polygon
          points="30,55 45,40 30,25 15,40"
          fill={base3 ? "#FFD700" : "white"}
          strokeWidth="2"
          className={
            base3
              ? "stroke-gray-400 dark:fill-yellow-400 dark:stroke-white"
              : "stroke-gray-400 dark:fill-gray-800 dark:stroke-white"
          }
        />
      </svg>
    </div>
  );
}
