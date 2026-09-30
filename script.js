/* ============================================================
   Portfolio Template — script.js
   Mobile navigation, footer year, and reveal-on-scroll.
   ============================================================ */

(function () {
  "use strict";

  /* ----- Mobile navigation ----- */
  const navToggle = document.querySelector(".nav-toggle");
  const siteNav = document.querySelector("#site-nav");

  function closeNav() {
    siteNav.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
  }

  if (navToggle && siteNav) {
    navToggle.addEventListener("click", () => {
      const open = siteNav.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", String(open));
    });

    // Close the menu after choosing a link
    siteNav.addEventListener("click", (event) => {
      if (event.target.closest("a")) closeNav();
    });

    // Close the menu when clicking outside the header
    document.addEventListener("click", (event) => {
      if (siteNav.classList.contains("open") && !event.target.closest(".site-header")) {
        closeNav();
      }
    });

    // Reset state when the viewport returns to desktop size
    window.addEventListener("resize", () => {
      if (window.innerWidth > 768) closeNav();
    });
  }

  /* ----- Theme switcher ----- */
  const themeBtn = document.querySelector(".theme-btn");
  const themeMenu = document.querySelector(".theme-menu");
  const themeOptions = document.querySelectorAll(".theme-option");

  if (themeBtn && themeMenu && themeOptions.length) {
    const THEME_KEY = "template-theme";
    const root = document.documentElement;

    const markActive = () => {
      const current = root.dataset.theme || "indigo";
      themeOptions.forEach((option) => {
        option.classList.toggle("active", option.dataset.theme === current);
      });
    };

    const setTheme = (theme) => {
      root.dataset.theme = theme;
      try {
        localStorage.setItem(THEME_KEY, theme);
      } catch (error) {
        /* storage unavailable (private mode) — theme still applies for this page */
      }
      markActive();
    };

    const closeThemeMenu = () => {
      themeMenu.hidden = true;
      themeBtn.setAttribute("aria-expanded", "false");
    };

    themeBtn.addEventListener("click", (event) => {
      event.stopPropagation();
      if (themeMenu.hidden) {
        themeMenu.hidden = false;
        themeBtn.setAttribute("aria-expanded", "true");
        markActive();
      } else {
        closeThemeMenu();
      }
    });

    themeOptions.forEach((option) => {
      option.addEventListener("click", () => {
        setTheme(option.dataset.theme);
        closeThemeMenu();
      });
    });

    document.addEventListener("click", (event) => {
      if (!themeMenu.hidden && !event.target.closest(".theme-switch")) {
        closeThemeMenu();
      }
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && !themeMenu.hidden) {
        closeThemeMenu();
      }
    });

    markActive();
  }

  /* ----- Footer year ----- */
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  /* ----- Reveal on scroll ----- */
  const reveals = document.querySelectorAll(".reveal");
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if ("IntersectionObserver" in window && !prefersReducedMotion && reveals.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );

    reveals.forEach((el) => observer.observe(el));
  } else {
    // Fall back to showing everything (also covers reduced motion)
    reveals.forEach((el) => el.classList.add("visible"));
  }
})();
