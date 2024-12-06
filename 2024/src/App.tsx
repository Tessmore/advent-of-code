import { useState } from "react";
import { Day01, Day01B } from "./01/day01";

function App() {
  const [input, setInput] = useState<string>("");
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
  };

  return (
    <div className="container">
      <h2>
        <a href="https://adventofcode.com/" target="_blank">
          Advent of code
        </a>
      </h2>

      <div className="grid-layout">
        <div className="input-container">
          <textarea
            value={input}
            onChange={handleInputChange}
            placeholder="Input text"
          />
        </div>

        <div className="output-container">
          <Day01B input={input} />
        </div>
      </div>
    </div>
  );
}

export default App;
