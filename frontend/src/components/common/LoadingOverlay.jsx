import { LoaderCircle } from "lucide-react";

function LoadingOverlay({ message }) {
  return (
    <div className="fixed inset-0 z-50 flex h-screen w-screen items-center justify-center bg-black/30 backdrop-blur-sm">
      <div className="rounded-xl bg-background p-6 text-center shadow-lg">
        <LoaderCircle className="mx-auto mb-3 animate-spin" size={24} />

        <p className="text-sm text-text-secondary">{message}</p>
      </div>
    </div>
  );
}

export default LoadingOverlay;
