"use client";
import { useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { LoadingOverlay } from "@/components/LoadingOverlay";
import { javascript } from "@codemirror/lang-javascript";
import { UploadFileButton } from "@/components/UploadFileButton";
import { CopyButton } from "@/components/CopyButton";
import { ErrorAlert } from "@/components/ErrorAlert";

export default function Home() {
  const [input, setInput] = useState(
    "class Welcome extends React.Component {\n  render() {\n    return <h1>Hello, {this.props.name}</h1>;\n  }\n}\n"
  );
  const [response, setResponse] = useState("");
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dark = window.matchMedia("(prefers-color-scheme: dark)").matches;

  const convert = async () => {
    setIsLoading(true);
    const rawRes = await fetch("/api", {
      method: "POST",
      body: JSON.stringify(input),
    });
    const res = await rawRes.json();
    if (res.error) {
      setError(true);
    } else if (res.content) {
      setResponse(res.content);
    }
    setIsLoading(false);
  };

  const onEditorChange = (value: string) => {
    setError(false);
    setInput(value);
  };

  return (
    <div className="container mx-auto px-6  py-9 max-w-7xl lg:px-0">
      <main>
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-300 lg:text-4xl">
          Convert your old React components with the power of{" "}
          <span className="line-through">magic</span> AI
        </h1>
        <p className="mt-4 text-gray-500 dark:text-gray-300">
          You&apos;re a React developer. You know class components are old and
          outdated, but your huge codebase is littered with them and converting
          them is a hassle. Let AI do the heavy lifting so you can focus on
          building new stuff, without being bogged down by old cruft. Just paste
          a class component in the first textbox and hit the button. The machine
          will convert it to a new and modern functional component (or you know,
          it will try. It&apos;s not a perfect technology and it can be pretty
          flaky).
        </p>
        <p className="mt-4 text-gray-500 dark:text-gray-300 mb-4">
          Note that while this site does not store any data about the components
          you send in, all data uploaded is passed on to OpenAI.{" "}
          <a
            href="https://openai.com/policies/api-data-usage-policies"
            className="underline text-blue-400 hover:text-blue-600 visited:text-blue-500"
          >
            They say that they don&apos;t use API submitted data to train their
            models
          </a>
          , but it is up to you to decide how sensitive the code you&apos;re
          submitting is and whether your comfortable letting them read it.
        </p>
        <ErrorAlert show={error} />
        <div className="flex flex-col lg:flex-row w-full gap-4 mt-4">
          <div className="w-full lg:w-1/2">
            <div className="flex justify-between mb-2 items-center">
              <h2 className="text-lg font-bold text-gray-800 dark:text-gray-300 lg:text-xl">
                Old component (clunky, kinda bad)
              </h2>
              <UploadFileButton onChange={(text) => setInput(text)} />
            </div>
            <CodeMirror
              height="500px"
              value={input}
              extensions={[javascript({ jsx: true })]}
              onChange={onEditorChange}
              theme={dark ? "dark" : "light"}
            />
          </div>
          <div className="w-full lg:w-1/2">
            <div className="flex justify-between mb-2">
              <h2 className="text-lg font-bold text-gray-800 items-center dark:text-gray-300 lg:text-xl">
                New component (sleek, smells like flowers)
              </h2>
              <CopyButton content={response} />
            </div>
            <div className="relative">
              {isLoading && <LoadingOverlay />}
              <CodeMirror
                height="500px"
                value={response}
                extensions={[javascript({ jsx: true })]}
                theme={dark ? "dark" : "light"}
                readOnly
              />
            </div>
          </div>
        </div>
        <button
          onClick={convert}
          disabled={isLoading}
          className="mt-4 block rounded-lg mx-auto bg-blue-600 px-6 py-3 font-medium text-white w-44 hover:bg-blue-500 disabled:opacity-50 disabled:hover:bg-blue-600 disabled:cursor-not-allowed"
        >
          🪄 Convert
        </button>
      </main>
      <footer className="text-sm mt-32 text-center">
        Made by{" "}
        <a
          className="underline text-blue-400 hover:text-blue-600 visited:text-blue-500"
          href="https://davidhallberg.dev"
        >
          David
        </a>
        . Check the code{" "}
        <a
          className="underline text-blue-400 hover:text-blue-600 visited:text-blue-500"
          href="https://github.com/dvdhllbrg/react-component-converter"
        >
          on GitHub
        </a>
        .
      </footer>
    </div>
  );
}
