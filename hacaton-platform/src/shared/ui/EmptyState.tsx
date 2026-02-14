type Props = {
    title: string
    actionText?: string;
    onAction?: () => void
}

export const EmptyState = ({ title, actionText, onAction }: Props) => (
    <div>
        <p>{title}</p>
        <button onClick={onAction}>{actionText}</button>
    </div>
)