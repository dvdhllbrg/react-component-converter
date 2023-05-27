"use client";
import { useEffect, useState } from "react";

type CopyButtonProps = {
  content: string;
};
export const CopyButton = ({ content }: CopyButtonProps) => {
  const copy = () => navigator.clipboard.writeText(content);

  return (
    <button
      className="block rounded-lg bg-white text-sm cursor-pointer px-3 py-1.5 border border-gray-300 hover:bg-gray-300 dark:bg-gray-800 dark:text-gray-300"
      onClick={copy}
    >
      📋 Copy
    </button>
  );
};
