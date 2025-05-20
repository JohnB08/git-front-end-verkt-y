import { useState } from "react";
import inputData from "./data/dataSet.json";
import { Selector } from "./Components/Selector/Selector";
import "./App.css"
import { Output } from "./Components/Output/Output";
import type { DataType } from "./Types/DataType";
import { Button } from "./Components/Button/Button";

const App = () => {
  const [selectedType, setSelectedType] = useState<DataType | null>(null);
  const [inputValue, setInputValue] = useState("");
  const [isValid, setIsValid] = useState<boolean | null>(null);



  const handleTypeChange = (e: { target: { value: string; }; }) => {
    const selected = inputData.inputTypes.find(type => type.type === e.target.value) as DataType;
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
      <Selector onChange={handleTypeChange} inputTypes={inputData.inputTypes}></Selector>

      {selectedType && (
        <>
          <Output inputValue={inputValue} placeHolderText="Trykk på tastene!"></Output>
          <div className="inputField">
            {selectedType.allowedCharacters.map((char, index) => (
              <Button className="" onClick={()=>handleButtonClick(char)} innerText={char} key={index}/>
            ))}
            <Button
              onClick={handleBackspace}
              innerText="⬅ Tilbake"
              className="functionButton backSpace"
            />
            <Button
              onClick={handleReset}
              className="functionButton reset"
              innerText="reset"
            />
          </div>

          {inputValue && (
            <div className={"validator " + (isValid ? "valid" : "inValid")}>
              {isValid ? "Gyldig format ✅" : "Ugyldig format ❌"}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default App;
