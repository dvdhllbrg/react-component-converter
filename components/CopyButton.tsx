import React from "react";

type CopyButtonProps = {
  content: string;
};
export const CopyButton = ({ content }: CopyButtonProps) => {
  const type = "text/plain";
  const blob = new Blob([content], { type });
  const data = [new ClipboardItem({ [type]: blob })];
  const copy = () => navigator.clipboard.write(data);

  return (
    <button
      className="block rounded-lg bg-white text-sm cursor-pointer px-3 py-1.5 border border-gray-300 hover:bg-gray-300 dark:bg-gray-800 dark:text-gray-300"
      onClick={copy}
    >
      📋 Copy
    </button>
  );
};
