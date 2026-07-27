import React from "react";

function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto flex max-w-7xl items-center justify-center px-6 py-5">
        <p className="text-sm text-text-muted">
          &copy; {new Date().getFullYear()} SlotDesk • Built for seamless
          facility booking
        </p>
      </div>
    </footer>
  );
}

export default Footer;
