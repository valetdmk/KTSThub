type Props = {
    message: string
    onRetry?: () => void
}

export const ErrorBlock =({ message, onRetry }: Props) => (
    <div>
        <p>{message}</p>
        <button onClick={onRetry}>Повторить</button>
    </div>
)