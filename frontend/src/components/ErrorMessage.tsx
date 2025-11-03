interface ErrorMessageProps {
  message: string
  onRetry: () => void
}

const ErrorMessage = ({ message, onRetry }: ErrorMessageProps) => {
  return (
    <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
      <div className="text-red-800 text-lg font-semibold mb-2">
        Error Loading Data
      </div>
      <div className="text-red-600 mb-4">{message}</div>
      <button
        onClick={onRetry}
        className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded transition duration-150"
      >
        Retry
      </button>
    </div>
  )
}

export default ErrorMessage
