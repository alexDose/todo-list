type PropsType = {
    title: string
    onClick: () => void
    className?: string
}

export const Button = ({title, onClick, className}: PropsType) => {
    return <button className={className} onClick={onClick}>{title}</button>
}
