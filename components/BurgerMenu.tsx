"use client";

import Link from "next/link";
import { useState } from "react";
import { navigationItems } from "@/data/site";

export default function BurgerMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="burger-root">
      <button
        aria-expanded={isOpen}
        aria-controls="site-menu"
        aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
        className={`burger-button ${isOpen ? "open" : ""}`}
        onClick={() => setIsOpen((state) => !state)}
        type="button"
      >
        <span />
        <span />
        <span />
      </button>

      {isOpen && (
        <nav className="burger-panel" id="site-menu" onClick={() => setIsOpen(false)}>
          {navigationItems.map((item) => (
            <Link className="burger-link" href={item.href} key={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>
      )}
    </div>
  );
}
