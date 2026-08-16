import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, CalendarDays } from "lucide-react";
import { useAuth } from "../../../contexts/AuthContext";
import { useHome } from "../../../contexts/HomeContext";
import formatDate from "../../../utils/formatDate";
import NextBooking from "./components/NextBooking";
import TodaySchedule from "./components/TodaySchedule";
import UpcomingBookings from "./components/UpcomingBookings";

function Home() {
  const { user } = useAuth();
  const {
    todayBookings,
    getTodayBookings,
    upcomingBookings,
    getUpcomingBookings,
  } = useHome();

  useEffect(() => {
    getTodayBookings();
    getUpcomingBookings();
  }, []);

  const nextBooking = upcomingBookings[0];

  const hasAnyBookings =
    nextBooking || todayBookings.length > 0 || upcomingBookings.length > 0;

  return (
    <div className="min-h-full pb-12">
      <div className="flex flex-col justify-between gap-3 border-b border-border-light py-8 sm:flex-row sm:items-end">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">
            Hi {user?.fullName}
          </h1>

          <p className="mt-1 text-sm text-text-secondary">
            {hasAnyBookings
              ? "Here's your booking overview."
              : "Welcome to SlotDesk. Let's get you started."}
          </p>
        </div>

        <div className="flex items-center gap-2 text-sm text-text-secondary">
          <CalendarDays size={16} />
          <span>{formatDate(new Date())}</span>
        </div>
      </div>

      {!hasAnyBookings ? (
        <div className="mt-8">
          <section className="rounded-2xl border border-border-light bg-card px-6 py-16 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <CalendarDays size={26} />
            </div>

            <p className="mt-6 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
              Ready to book?
            </p>

            <h2 className="mt-3 text-2xl font-semibold">
              Find your next space
            </h2>

            <p className="mx-auto mt-2 max-w-md text-sm  text-text-secondary">
              Browse available facilities, choose a convenient time, and make
              your first booking.
            </p>

            <Link
              to="/facilities"
              className="group mt-8 inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-text shadow-lg shadow-primary/15 transition duration-200 hover:-translate-y-0.5 hover:bg-primary-hover hover:shadow-primary/30"
            >
              Browse Facilities
              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-0.5"
              />
            </Link>
          </section>
        </div>
      ) : (
        <>
          <div className="my-8 grid gap-5 lg:grid-cols-2">
            <NextBooking booking={nextBooking} />

            <TodaySchedule bookings={todayBookings} />
          </div>
          <UpcomingBookings bookings={upcomingBookings.slice(1)} />
        </>
      )}
    </div>
  );
}

export default Home;
