import { useState, useEffect } from "react";

const randomInt = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min) + min);

const funFacts = [
  "Laughter is the best syntax error handler!",
  "CSS stands for Can't Stop Styling.",
  "Semicolons are like salt. Too little, and it's bland; too much, and you ruin everything.",
  "I asked ChatGPT to generate these fun facts.",
  "This is neither fun, nor a fact.",
  "Web developers have their own secret handshake? It's called a 'Ctrl+C' followed by a 'Ctrl+V'!",
  "React development is fun and good.",
  "Tailwind is just 🧑‍🍳👌💋",
];
const useFunFact = () => {
  const [fact, setFact] = useState("");

  const setRandomFunFact = () => {
    const random = randomInt(0, funFacts.length);
    setFact(funFacts[random]);
  };

  useEffect(() => {
    setRandomFunFact();
    const intervalId = setInterval(setRandomFunFact, 5000);
    return () => clearInterval(intervalId);
  }, []);

  return fact;
};

type BouncyDotProps = { delay: number };
const BouncyDot = ({ delay }: BouncyDotProps) => (
  <div
    className="w-3 h-3 bg-gray-800 dark:bg-gray-300 rounded-full motion-safe:animate-bounce"
    style={{ animationDelay: `${delay}s` }}
  />
);

export const LoadingOverlay = () => {
  const funFact = useFunFact();

  return (
    <div className="w-full h-full absolute bg-gray-300 opacity-75 z-50 flex flex-col justify-between items-center p-6 dark:bg-gray-800">
      <div />
      <div className="flex space-x-2">
        <BouncyDot delay={0.1} />
        <BouncyDot delay={0.2} />
        <BouncyDot delay={0.3} />
      </div>
      <p className="text-gray-800 dark:text-gray-300">Fun fact: {funFact}</p>
    </div>
  );
};
