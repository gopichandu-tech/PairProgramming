import { useEffect, useRef, useState } from "react";
import Editor from "@monaco-editor/react";
import type { OnMount } from "@monaco-editor/react";
import * as monacoAPI from "monaco-editor";
import { useParams } from "react-router-dom";

const CodeEditor: React.FC = () => {
  const { roomId } = useParams<{ roomId: string }>();
  const [code, setCode] = useState<string>("");
  const ws = useRef<WebSocket | null>(null);
  const skipNext = useRef<boolean>(false);
  const providerDisposable = useRef<monacoAPI.IDisposable | null>(null);
  // const WS_URL = "wss://pairprogramming-4ptc.onrender.com";
  const WS_URL = import.meta.env.VITE_WS_URL || "ws://localhost:8000";

  // ------------------------------
  // 1. WebSocket Sync
  // ------------------------------
  useEffect(() => {
    if (!roomId) return;

    ws.current = new WebSocket(`${WS_URL}/ws/${roomId}`);

    ws.current.onmessage = (event: MessageEvent) => {
      skipNext.current = true;
      setCode(event.data);
    };

    // safe onopen send example (if needed)
    ws.current.onopen = () => {
      // optional: announce presence or request current code
      // ws.current?.send(JSON.stringify({ type: "request-current-code" }));
    };

    return () => {
      try {
        const socket = ws.current;
        if (!socket) return;

        // close only if connecting or open
        if (
          socket.readyState === WebSocket.OPEN ||
          socket.readyState === WebSocket.CONNECTING
        ) {
          socket.close();
        }
      } catch (err) {
        console.warn("WS cleanup error:", err);
      }
    };
  }, [roomId]);

  // ------------------------------
  // 2. Monaco Autocomplete AI (onMount)
  // ------------------------------
  const handleMount: OnMount = (editor, monacoInstance) => {
    // Dispose previous provider if any (HMR / re-mount safety)
    providerDisposable.current?.dispose();

    // Register provider and keep the disposable
    providerDisposable.current = monacoInstance.languages.registerCompletionItemProvider(
      "python",
      {
        triggerCharacters: [".", "(", " "],

        provideCompletionItems: async (
          model: monacoAPI.editor.ITextModel,
          position: monacoAPI.Position
        ) => {
          try {
            const currentCode = model.getValue();
            const cursorPosition = model.getOffsetAt(position);

            const res = await fetch("http://localhost:8000/autocomplete", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                code: currentCode,
                cursorPosition,
                language: "python",
              }),
            });

            if (!res.ok) {
              return { suggestions: [] };
            }

            const data = await res.json();

            const word = model.getWordUntilPosition(position);

            const range: monacoAPI.IRange = {
              startLineNumber: position.lineNumber,
              endLineNumber: position.lineNumber,
              startColumn: word.startColumn,
              endColumn: word.endColumn,
            };

            const suggestion: monacoAPI.languages.CompletionItem = {
              label: data.suggestion ?? "",
              kind: monacoInstance.languages.CompletionItemKind.Text,
              insertText: data.suggestion ?? "",
              range,
            };

            return { suggestions: [suggestion] };
          } catch (err) {
            console.error("Autocomplete error:", err);
            return { suggestions: [] };
          }
        },
      }
    );
  };

  // Dispose provider on unmount (safety for HMR)
  useEffect(() => {
    return () => {
      providerDisposable.current?.dispose();
      providerDisposable.current = null;
    };
  }, []);

  // ------------------------------
  // 3. Change Handler + Sync WS
  // ------------------------------
  const handleChange = (value?: string) => {
    if (value === undefined) return;
    setCode(value);

    try {
      const socket = ws.current;
      if (!socket) return;

      // only send if OPEN
      if (socket.readyState === WebSocket.OPEN && !skipNext.current) {
        socket.send(value);
      }
    } catch (err) {
      console.warn("WS send error:", err);
    } finally {
      skipNext.current = false;
    }
  };

  return (
    <div className="bg-black rounded-lg border border-gray-700 mt-4 h-[600px]">
      <Editor
        height="100%"
        defaultLanguage="python"
        value={code}
        theme="vs-dark"
        onChange={handleChange}
        onMount={handleMount}
        options={{
          minimap: { enabled: false },
          fontSize: 16,
          automaticLayout: true,
        }}
      />
    </div>
  );
};

export default CodeEditor;
