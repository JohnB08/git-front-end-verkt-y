import "./Output.css"

type OutputProps = {
    inputValue: string;
    placeHolderText: string
}

export const Output = (props: OutputProps) => {
    return (
        <div
            className="output"
          >
            {props.inputValue || props.placeHolderText}
          </div>
    )
}