/* Kiosk Studio — page behaviour
   1. Fills the page with the values from config.js and hides what is missing.
   2. Opens and closes the mobile menu.
   3. Reveals sections with a gentle animation as you scroll.
   4. Sends the contact form (Formspree), or falls back to an email draft. */

(function () {
  "use strict";

  var config = window.KIOSK_CONFIG || {};
  var root = document.documentElement;
  root.classList.remove("no-js");
  root.classList.add("js");

  /* ---------- 1. Settings from config.js ---------- */

  // Reads "email" or "demoLinks.florist" from the config, trimmed. Empty → "".
  function get(path) {
    var value = path.split(".").reduce(function (obj, key) {
      return obj && obj[key] !== undefined && obj[key] !== null ? obj[key] : "";
    }, config);
    return typeof value === "string" ? value.trim() : value ? String(value) : "";
  }

  // "email|whatsapp" is true when at least one of them has a value.
  function hasAny(paths) {
    return paths.split("|").some(function (path) { return get(path) !== ""; });
  }

  function format(value, type) {
    if (type === "mailto") return "mailto:" + value;
    if (type === "whatsapp") {
      var digits = value.replace(/\D/g, "");
      return "https://wa.me/" + digits + "?text=" + encodeURIComponent("Hi Kiosk Studio, I'd like to know more about a website for my business.");
    }
    return value;
  }

  document.querySelectorAll("[data-text]").forEach(function (el) {
    var value = get(el.getAttribute("data-text"));
    if (value) el.textContent = value;
  });

  document.querySelectorAll("[data-href]").forEach(function (el) {
    var value = get(el.getAttribute("data-href"));
    if (!value) return;
    var type = el.getAttribute("data-format");
    el.setAttribute("href", format(value, type));
    if (type === "whatsapp") {
      el.setAttribute("target", "_blank");
      el.setAttribute("rel", "noopener");
    }
  });

  document.querySelectorAll("[data-src]").forEach(function (el) {
    var value = get(el.getAttribute("data-src"));
    if (value) el.setAttribute("src", value);
  });

  document.querySelectorAll("[data-show-if]").forEach(function (el) {
    el.hidden = !hasAny(el.getAttribute("data-show-if"));
  });

  document.querySelectorAll("[data-hide-if]").forEach(function (el) {
    el.hidden = hasAny(el.getAttribute("data-hide-if"));
  });

  if (config.logoOnDark) root.classList.add("logo-on-dark");

  // If the logo file is missing or broken, fall back to the text wordmark.
  document.querySelectorAll(".brand-logo").forEach(function (img) {
    img.addEventListener("error", function () {
      img.hidden = true;
      document.querySelectorAll(".wordmark").forEach(function (w) { w.hidden = false; });
    });
  });
  // Same for the About photo: hide it rather than show a broken image.
  document.querySelectorAll(".about-photo").forEach(function (img) {
    img.addEventListener("error", function () { img.hidden = true; });
  });

  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  /* ---------- 2. Mobile menu ---------- */

  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("site-nav");

  function setMenu(open) {
    if (!toggle || !nav) return;
    toggle.setAttribute("aria-expanded", String(open));
    nav.classList.toggle("is-open", open);
    document.body.classList.toggle("menu-open", open);
  }

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      setMenu(toggle.getAttribute("aria-expanded") !== "true");
    });
    nav.addEventListener("click", function (event) {
      if (event.target.closest("a")) setMenu(false);
    });
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") {
        setMenu(false);
        toggle.focus();
      }
    });
    document.addEventListener("click", function (event) {
      if (!event.target.closest(".site-header")) setMenu(false);
    });
  }

  // Close the full-screen phone menu if the window becomes wide (desktop menu).
  window.addEventListener("resize", function () {
    if (window.innerWidth >= 1060) setMenu(false);
  });

  /* ---------- 3. Scroll animations ---------- */

  var revealItems = document.querySelectorAll("[data-reveal]");

  // Items that share a parent appear one after another, not all at once.
  revealItems.forEach(function (el) {
    var siblings = Array.prototype.filter.call(el.parentNode.children, function (child) {
      return child.hasAttribute("data-reveal");
    });
    var index = siblings.indexOf(el);
    if (index > 0) el.style.setProperty("--delay", Math.min(index, 5) * 0.09 + "s");
  });

  if ("IntersectionObserver" in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.1 });
    revealItems.forEach(function (el) { observer.observe(el); });
  } else {
    revealItems.forEach(function (el) { el.classList.add("is-visible"); });
  }

  /* ---------- 4. Contact form ---------- */

  var form = document.querySelector(".contact-form");
  if (!form) return;

  var status = form.querySelector(".form-status");
  var button = form.querySelector('button[type="submit"]');
  var endpoint = get("formEndpoint");
  var email = get("email");

  function showStatus(message, kind) {
    status.textContent = message;
    status.className = "form-status" + (kind ? " is-" + kind : "");
  }

  function validate() {
    var firstInvalid = null;
    form.querySelectorAll("[required]").forEach(function (field) {
      var ok = field.value.trim() !== "";
      field.setAttribute("aria-invalid", ok ? "false" : "true");
      if (!ok && !firstInvalid) firstInvalid = field;
    });
    if (firstInvalid) {
      firstInvalid.focus();
      showStatus("Please fill in your name, how to reach you and a short message.", "error");
      return false;
    }
    return true;
  }

  form.querySelectorAll("[required]").forEach(function (field) {
    field.addEventListener("input", function () {
      if (field.value.trim() !== "") field.setAttribute("aria-invalid", "false");
    });
  });

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    if (!validate()) return;

    var data = new FormData(form);
    if (data.get("_gotcha")) return; // a bot filled the hidden field

    // No form service yet: open the visitor's email app with the message ready.
    if (!endpoint && email) {
      var body =
        "Name: " + data.get("name") + "\n" +
        "Business: " + (data.get("business") || "-") + "\n" +
        "Reply to: " + data.get("reply_to") + "\n\n" +
        data.get("message");
      window.location.href = "mailto:" + email +
        "?subject=" + encodeURIComponent("Website enquiry from " + data.get("name")) +
        "&body=" + encodeURIComponent(body);
      showStatus("Your email app should open with your message ready to send.", "success");
      return;
    }

    button.disabled = true;
    showStatus("Sending…");

    fetch(endpoint, {
      method: "POST",
      body: data,
      headers: { Accept: "application/json" }
    })
      .then(function (response) {
        if (!response.ok) throw new Error("Request failed");
        form.reset();
        showStatus("Thank you. Your message has been sent and I will reply soon.", "success");
      })
      .catch(function () {
        var fallback = email ? " You can also email " + email + "." : "";
        showStatus("Sorry, your message could not be sent. Please try again in a moment." + fallback, "error");
      })
      .then(function () {
        button.disabled = false;
      });
  });
})();
