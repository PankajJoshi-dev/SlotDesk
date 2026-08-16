import { ArrowLeft, CircleAlert } from "lucide-react";
import { Link } from "react-router-dom";

function Error() {
  return (
    <section className="flex min-h-[50vh] items-center justify-center py-12">
      <div className="w-full max-w-md rounded-2xl border border-border-light bg-surface p-8 text-center shadow-xl shadow-black/10 sm:p-10">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-primary/15 text-primary">
          <CircleAlert size={22} />
        </div>

        <p className="mt-6 text-sm font-semibold uppercase tracking-[0.18em] text-primary">
          Error 404
        </p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight">
          Page not found
        </h1>
        <p className="mt-3 text-sm leading-6 text-text-secondary">
          The page you’re looking for doesn’t exist.
        </p>

        <Link
          to="/"
          className="mt-7 inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-text transition hover:bg-primary-hover"
        >
          <ArrowLeft size={16} />
          Back to home
        </Link>
      </div>
    </section>
  );
}

export default Error;
