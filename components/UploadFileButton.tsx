import React from "react";

type UploadFileButtonProps = {
  onChange: (result: string) => void;
};
export const UploadFileButton = ({ onChange }: UploadFileButtonProps) => {
  const uploadFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    let file = event.target.files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => onChange((e.target?.result ?? "").toString());
      reader.readAsText(file);
    }
  };

  return (
    <label className="block rounded-lg bg-white text-sm cursor-pointer px-3 py-1.5 border border-gray-300 hover:bg-gray-300 dark:bg-gray-800 dark:text-gray-300">
      📄 Upload file
      <input
        type="file"
        className="hidden"
        onChange={uploadFile}
        accept=".js,.ts,.jsx,.tsx"
      />
    </label>
  );
};
