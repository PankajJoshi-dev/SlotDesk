import { Link } from "react-router-dom";
import { ArrowRight, CalendarDays, Check, Clock3, Search } from "lucide-react";

const features = [
  {
    icon: Search,
    title: "Find a facility",
    description: "Explore available spaces and find one that suits your needs.",
  },
  {
    icon: CalendarDays,
    title: "Book your time",
    description: "Select a date and time that works best for you.",
  },
  {
    icon: Check,
    title: "Manage bookings",
    description: "View and manage your upcoming bookings from one dashboard.",
  },
];

function LandingPage() {
  return (
    <div>
      {/* Hero */}
      <section>
        <div className="mx-auto grid min-h-[80vh] max-w-7xl items-center gap-14 px-6 py-28 sm:px-8 lg:grid-cols-2 lg:px-10">
          <div className="max-w-2xl">
            <p className="mb-5 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary sm:text-sm">
              ---Simple space booking
            </p>

            <h1 className="max-w-xl text-4xl font-bold leading-[1.1] tracking-tighter sm:text-5xl lg:text-6xl">
              Find the perfect space for your next booking.
            </h1>

            <p className="my-7 max-w-lg text-lg text-text-secondary">
              Browse available facilities, choose a convenient time, and manage
              all your bookings in one simple place.
            </p>

            <div className="flex flex-wrap gap-3">
              <Link
                to="/facilities"
                className="group flex items-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-text shadow-lg shadow-primary/15 transition duration-200 hover:-translate-y-0.5 hover:bg-primary-hover hover:shadow-primary/30"
              >
                Browse Facilities
                <ArrowRight
                  size={16}
                  className="transition-transform group-hover:translate-x-0.5"
                />
              </Link>

              <Link
                to="/register"
                className="rounded-lg border border-border bg-surface/60 px-5 py-3 text-sm font-semibold text-text transition duration-200 hover:-translate-y-0.5 hover:border-primary/60 hover:bg-card"
              >
                Create Account
              </Link>
            </div>
          </div>

          <div className="mx-auto w-full max-w-md lg:justify-self-end">
            <div className="rounded-2xl border border-border/80 bg-card/90 p-6 shadow-2xl shadow-black/20">
              <div className="flex items-center justify-between border-b border-border-light pb-5">
                <div>
                  <p className="text-sm font-semibold">Your next booking</p>
                  <p className="mt-1 text-xs text-text-muted">
                    Ready when you are
                  </p>
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/15 text-primary">
                  <CalendarDays size={20} />
                </div>
              </div>
              <div className="mt-5 rounded-xl border border-border-light bg-surface p-4">
                <p className="text-xs font-medium uppercase tracking-wider text-text-muted">
                  Featured space
                </p>
                <p className="mt-2 text-lg font-semibold">
                  Riverside Meeting Room
                </p>
                <div className="mt-4 flex items-center gap-2 text-sm text-text-secondary">
                  <Clock3 size={16} className="text-primary" />
                  Today, 2:00 PM – 3:00 PM
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="border-y border-border-light bg-background px-6 py-20 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto mb-11 max-w-xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
              How it works
            </p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
              Everything you need
            </h2>
            <p className="mt-4 text-text-secondary">
              Booking your space should be quick and stress-free.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {features.map(({ icon: Icon, title, description }, index) => (
              <div
                key={title}
                className="group rounded-2xl border border-border-light bg-surface p-6 transition duration-200 hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl hover:shadow-black/10"
              >
                <div className="flex items-center justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/15 text-primary transition-colors group-hover:bg-primary group-hover:text-text">
                    <Icon size={20} />
                  </div>
                  <span className="text-sm font-semibold text-text-muted">
                    0{index + 1}
                  </span>
                </div>
                <h3 className="mt-6 text-lg font-semibold">{title}</h3>
                <p className="mt-2 text-sm text-text-secondary">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="px-6 py-20 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-5xl overflow-hidden rounded-2xl border border-primary/25 bg-card px-6 py-14 text-center shadow-xl shadow-black/10 sm:px-10 sm:py-16">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
            Get started today
          </p>
          <h2 className="mx-auto mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
            Ready to book your space?
          </h2>
          <p className="mx-auto mt-4 leading-7 text-text-secondary">
            Get started today and make your next booking in just a few clicks.
          </p>
          <Link
            to="/facilities"
            className="group mt-8 inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-text shadow-lg shadow-primary/15 transition duration-200 hover:-translate-y-0.5 hover:bg-primary-hover hover:shadow-primary/30"
          >
            Get Started
            <ArrowRight
              size={16}
              className="transition-transform group-hover:translate-x-0.5"
            />
          </Link>
        </div>
      </section>
    </div>
  );
}

export default LandingPage;
