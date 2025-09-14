interface ErrorFallbackProps {
  error: Error;
  resetErrorBoundary: () => void;
}

export const ErrorFallback = ({ error, resetErrorBoundary }: ErrorFallbackProps) => {
  // When encountering an error in the development mode, rethrow it and don't display the boundary.
  // The parent UI will take care of showing a more helpful dialog.
  if (import.meta.env.DEV) throw error;

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
        <div className="text-center mb-6">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Error en la Aplicación
          </h2>
          <p className="text-gray-600">
            Ha ocurrido un error inesperado. Por favor, intenta recargar la página.
          </p>
        </div>
        
        <div className="bg-gray-100 border rounded-lg p-4 mb-6">
          <h3 className="font-semibold text-sm text-gray-700 mb-2">Detalles del Error:</h3>
          <pre className="text-xs text-red-600 bg-white p-3 rounded border overflow-auto max-h-32">
            {error.message}
          </pre>
        </div>
        
        <button 
          onClick={resetErrorBoundary} 
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
        >
          🔄 Intentar de Nuevo
        </button>
      </div>
    </div>
  );
}
