import React, { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);
  const transition = (mode, replace = false) => {
    setMode(mode);

    if (!replace) {
      setHistory((prev) => [...prev, mode]);
    }
  };

  const back = () => {
    if (history.length > 1) {
      const newHistory = [...history];
      newHistory.pop();

      setHistory(newHistory);

      setMode(newHistory[newHistory.length - 1]);
    }
  };

  return { mode,transition, back };
}

