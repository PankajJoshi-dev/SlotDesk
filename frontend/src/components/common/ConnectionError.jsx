import { WifiOff } from "lucide-react";

function ConnectionError() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background">
      <div className="text-center">
        <WifiOff className="mx-auto mb-4 text-text-secondary" size={30} />

        <h1 className="text-lg font-medium">Unable to connect</h1>

        <p className="mt-2 text-sm text-text-secondary">
          The server may be starting up. Please try again.
        </p>

        <button
          onClick={() => window.location.reload()}
          className="mt-6 rounded-sm bg-primary px-3 py-2 text-sm transition-all hover:bg-primary-hover"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}

export default ConnectionError;
