const LoadingSpinner = () => {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-gray-900 mb-4"></div>
      <div className="text-gray-600 text-lg">Loading events...</div>
    </div>
  )
}

export default LoadingSpinner
