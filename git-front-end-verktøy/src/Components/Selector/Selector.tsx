import type {DataType} from "../../Types/DataType"

type SelectorProps = {
    onChange: React.ChangeEventHandler<HTMLSelectElement>
    inputTypes: DataType[]
}

export const Selector = (props: SelectorProps) => {
    return (
      <select onChange={props.onChange} defaultValue="">
        <option value="" disabled style={{fontSize: "inherit"}}>-- Velg type --</option>
        {props.inputTypes.map((inputType) => (
          <option key={inputType.type} value={inputType.type}>
            {inputType.description}
          </option>
        ))}
      </select>
    )
}