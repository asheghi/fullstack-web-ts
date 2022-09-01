import React, { useState } from "react";

function Counter({ start, step }: { start?: number; step?: number }) {
  const [count, setCount] = useState(start || 0);

  return (
    <div className="text-gray-500">
      <button
        className="btn"
        type="button"
        onClick={() => setCount(() => count + (step || 1))}
      >
        Counter {count}
      </button>
      {start && <div className="">starting from {start}</div>}
      {step && <div>{step} steps</div>}
    </div>
  );
}

export { Counter };
