export default function Home() {
  return <></>;
}

const MovingSquares = () => {
  return (
    <div className="flex flex-col justify-evenly min-h-[calc(100dvh-6.75rem)]">
      <div className="container">
        {[...Array(3)].map((_, index) => (
          <div
            key={index}
            className={`moving-square move-right delay-${index}`}
          ></div>
        ))}
      </div>

      <div className="container">
        {[...Array(3)].map((_, index) => (
          <div
            key={index}
            className={`moving-square move-left delay-${index}`}
          ></div>
        ))}
      </div>
    </div>
  );
};
