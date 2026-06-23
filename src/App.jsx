import "./App.css";
import { useEffect, useRef, useState } from "react";

function App() {
  const frame1Ref = useRef(null);
  const frame2Ref = useRef(null);
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const handleMessage = (event) => {

      // Origin Validation
      if (
        !event.origin.startsWith("http://localhost")
      ) {
        return;
      }

      const sourceWindow = event.source;

      if (!event.data?.type) {
        return;
      }

      // Skip logging typing events
      if (event.data.action !== "input") {
        const timestamp =
          new Date().toLocaleTimeString();

        const sender =
          sourceWindow === frame1Ref.current.contentWindow
            ? "Frame A"
            : "Frame B";

        setLogs(prev => [
          `${timestamp} - ${sender} -> ${event.data.action}`,
          ...prev,
        ]);
      }

      if (
        sourceWindow === frame1Ref.current.contentWindow
      ) {
        frame2Ref.current.contentWindow.postMessage(
          {
            ...event.data,
            isRemote: true,
          },
          "*"
        );
      }

      else if (
        sourceWindow === frame2Ref.current.contentWindow
      ) {
        frame1Ref.current.contentWindow.postMessage(
          {
            ...event.data,
            isRemote: true,
          },
          "*"
        );
      }
    };

    window.addEventListener(
      "message",
      handleMessage
    );

    return () =>
      window.removeEventListener(
        "message",
        handleMessage
      );
  }, []);

  return (
    <div className="container">
      <h1>Bidirectional Rich Text Sync</h1>
      <div className="frames">

        <iframe
          ref={frame1Ref}
          src="/editor.html"
          title="Editor A"
        />

        <iframe
          ref={frame2Ref}
          src="/editor.html"
          title="Editor B"
        />

      </div>

      <div className="log-panel">
        <h2>Action Log</h2>

        {logs.map((log, index) => (
          <div key={index}>
            {log}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;