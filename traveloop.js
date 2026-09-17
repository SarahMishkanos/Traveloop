/* ============================================================
   TRAVELOOP — shared app shell
   Injects the global nav, resolves the signed-in / guest name,
   and provides small helpers used across every page.
   ============================================================ */
(function () {
  "use strict";

  var current = (location.pathname.split("/").pop() || "start.html").toLowerCase();
  var currentHash = (location.hash || "").replace("#", "");
  var PUBLIC_PAGES = ["start.html", "reg.html", "index.html", ""];

  var PAGES = [
    ["main2.html", "Dashboard"],
    ["main3.html", "Plan a Trip"],
    ["itnbuilder.html", "Itinerary Builder"],
    ["itnview.html", "My Itineraries"],
    ["cityview.html", "Cities"],
    ["activity.html", "Activities"],
    ["explorepub.html", "Explore"],
    ["prf-jour.html#journal", "Journal"]
  ];

  // href can be "page.html" or "page.html#hash" — only the one whose page AND
  // hash both match the current location gets marked active.
  function isActive(href) {
    var parts = href.split("#");
    var page = parts[0];
    var hash = parts[1] || "";
    if (page !== current) return false;
    return hash === currentHash;
  }

  function getName() {
    return localStorage.getItem("traveloop_name") || "";
  }
  function isGuest() {
    return localStorage.getItem("traveloop_guest") === "1";
  }
  function setTraveler(name, guest) {
    if (name) localStorage.setItem("traveloop_name", name);
    localStorage.setItem("traveloop_guest", guest ? "1" : "0");
  }
  function firstName(name) {
    return (name || "").trim().split(/\s+/)[0] || "";
  }
  function initials(name) {
    var parts = (name || "").trim().split(/\s+/).filter(Boolean);
    if (!parts.length) return "T";
    return (parts[0][0] + (parts[1] ? parts[1][0] : "")).toUpperCase();
  }
  window.traveloopLogout = function () {
    localStorage.removeItem("traveloop_name");
    localStorage.removeItem("traveloop_guest");
    location.href = "start.html";
  };
  window.traveloopSetName = setTraveler;

  function applyName() {
    var name = getName() || "Guest";
    document.querySelectorAll("[data-traveler-name]").forEach(function (el) {
      el.textContent = name;
    });
    document.querySelectorAll("[data-traveler-first]").forEach(function (el) {
      el.textContent = firstName(name) || "Guest";
    });
    document.querySelectorAll("[data-traveler-greeting]").forEach(function (el) {
      var h = new Date().getHours();
      var part = h < 12 ? "Good Morning" : h < 18 ? "Good Afternoon" : "Good Evening";
      el.textContent = part + ", " + (firstName(name) || "Guest");
    });
  }

  // ---- Guest / name capture modal (first visit to any app page) ----
  function ensureTraveler(onReady) {
    if (getName()) return onReady();
    var backdrop = document.createElement("div");
    backdrop.className = "tl-guest-backdrop";
    backdrop.innerHTML =
      '<div class="tl-guest-card">' +
      "<h3>Welcome to Traveloop</h3>" +
      "<p>Tell us what to call you, or just look around as a guest.</p>" +
      '<input type="text" id="tlGuestInput" placeholder="Your name" autocomplete="name" maxlength="40">' +
      '<div class="tl-guest-actions">' +
      '<button class="tl-guest-btn ghost" id="tlGuestSkip">Continue as Guest</button>' +
      '<button class="tl-guest-btn primary" id="tlGuestGo">Continue</button>' +
      "</div></div>";
    document.body.appendChild(backdrop);
    var input = backdrop.querySelector("#tlGuestInput");
    input.focus();
    function finish(name, guest) {
      setTraveler(name, guest);
      backdrop.remove();
      applyName();
      onReady();
    }
    backdrop.querySelector("#tlGuestGo").onclick = function () {
      var v = input.value.trim();
      finish(v || "Guest", !v);
    };
    backdrop.querySelector("#tlGuestSkip").onclick = function () {
      finish("Guest", true);
    };
    input.addEventListener("keydown", function (e) {
      if (e.key === "Enter") backdrop.querySelector("#tlGuestGo").click();
    });
  }

  function buildNav() {
    var name = getName() || "Guest";
    var nav = document.createElement("nav");
    nav.className = "tl-nav";

    var linksHtml = PAGES.map(function (p) {
      return (
        '<a href="' + p[0] + '" class="' + (isActive(p[0]) ? "active" : "") + '">' +
        p[1] +
        "</a>"
      );
    }).join("");

    nav.innerHTML =
      '<a class="tl-brand" href="main2.html">Traveloop</a>' +
      '<button class="tl-menu" type="button" aria-label="Open menu" aria-expanded="false">\u2630</button>' +
      '<div class="tl-links">' +
      linksHtml +
      '<a href="prf-jour.html#profile" class="' + (isActive("prf-jour.html#profile") ? "active" : "") + '">Profile</a>' +
      '<a href="#" class="tl-logout" id="tlLogout">Log out</a>' +
      '<div class="tl-user"><span class="tl-user-dot">' + initials(name) + "</span>" +
      '<span class="tl-user-name">' + name + (isGuest() ? ' <span class="tl-guest-tag">Guest</span>' : "") + "</span>" +
      "</div></div>";

    document.body.prepend(nav);

    var btn = nav.querySelector(".tl-menu");
    var links = nav.querySelector(".tl-links");
    btn.onclick = function () {
      var open = links.classList.toggle("open");
      btn.setAttribute("aria-expanded", open);
    };
    nav.querySelector("#tlLogout").onclick = function (e) {
      e.preventDefault();
      window.traveloopLogout();
    };

    function resyncActive() {
      currentHash = (location.hash || "").replace("#", "");
      nav.querySelectorAll(".tl-links a[href]").forEach(function (a) {
        var href = a.getAttribute("href");
        if (href === "#") return;
        a.classList.toggle("active", isActive(href));
      });
    }
    window.addEventListener("hashchange", resyncActive);
    window.addEventListener("tl-hash-sync", resyncActive);
  }

  function init() {
    applyName();
    document.body.classList.add("tl-ready");
  }

  if (PUBLIC_PAGES.indexOf(current) === -1) {
    ensureTraveler(function () {
      buildNav();
      init();
    });
  } else {
    init();
  }
})();
