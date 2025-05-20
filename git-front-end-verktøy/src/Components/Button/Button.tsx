type ButtonProps = {
    onClick: React.MouseEventHandler<HTMLButtonElement> | undefined
    className: string
    innerText: string
}

export const Button = (props: ButtonProps) =>{
    return (
        <button className={props.className} onClick={props.onClick}>{props.innerText}</button>
    )
}   