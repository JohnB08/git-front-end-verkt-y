import { useState } from "react";
import inputData from "./data/dataSet.json";

const App = () => {
  const [selectedType, setSelectedType] = useState<selectedtType | null>(null);
  const [inputValue, setInputValue] = useState("");
  const [isValid, setIsValid] = useState<boolean | null>(null);

  type selectedtType = {
    type: string,
    description: string,
    regex: string,
    validSample: string,
    allowedCharacters: string[],
    dateValidation?: undefined | {
      position: number[],
      format: string,
      note: string
    }
  }

  const handleTypeChange = (e: { target: { value: string; }; }) => {
    const selected = inputData.inputTypes.find(type => type.type === e.target.value) as selectedtType;
    setSelectedType(selected);
    setInputValue("");
    setIsValid(null);
  };

  const handleButtonClick = (char: string) => {
    const newValue = inputValue + char;
    setInputValue(newValue);

    if (selectedType) {
      const pattern = new RegExp(selectedType.regex);
      setIsValid(pattern.test(newValue));
    }
  };

  const handleBackspace = () => {
    const newValue = inputValue.slice(0, -1);
    setInputValue(newValue);

    if (selectedType) {
      const pattern = new RegExp(selectedType.regex);
      setIsValid(pattern.test(newValue));
    }
  };

  const handleReset = () => {
    setInputValue("");
  }

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial", maxWidth: "500px", width: "80vw", margin: "auto" }}>
      <h1>Registrer ankomst</h1>

      <select onChange={handleTypeChange} defaultValue="">
        <option value="" disabled style={{fontSize: "inherit"}}>-- Velg type --</option>
        {inputData.inputTypes.map((inputType) => (
          <option key={inputType.type} value={inputType.type}>
            {inputType.description}
          </option>
        ))}
      </select>

      {selectedType && (
        <>
          <div
            style={{
              marginTop: "2rem",
              padding: "1rem",
              fontSize: "1.5rem",
              backgroundColor: "inherit",
              textAlign: "center",
              borderRadius: "8px",
              border: "1px solid #ccc",
              color: "inherit"
            }}
          >
            {inputValue || "Trykk på tastene"}
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "1rem",
              marginTop: "1.5rem"
            }}
          >
            {selectedType.allowedCharacters.map((char, index) => (
              <button
                key={index}
                onClick={() => handleButtonClick(char)}
              >
                {char}
              </button>
            ))}
            <button
              onClick={handleBackspace}
              style={{
                gridColumn: "span 2",
                padding: "1rem",
                fontSize: "1.2rem",
                borderRadius: "8px",
                border: "1px solid #aaa",
                backgroundColor: "inherit",
                color: "inherit"
              }}
            >
              ⬅ Tilbake
            </button>
            <button
              onClick={handleReset}
              style={{
                gridColumn: "span 1",
                padding: "1rem",
                fontSize: "1.2rem",
                borderRadius: "8px",
                border: "1px solid #aaa",
                backgroundColor: "inherit",
                color: "inherit"
              }}
            >
              reset
            </button>
          </div>

          {inputValue && (
            <div
              style={{
                marginTop: "1rem",
                fontWeight: "bold",
                color: isValid ? "green" : "red"
              }}
            >
              {isValid ? "Gyldig format ✅" : "Ugyldig format ❌"}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default App;
