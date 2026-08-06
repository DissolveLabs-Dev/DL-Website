// deck-engine.js — ported verbatim from legacy/index.legacy.html L2955-3133.
// Founder / logo photo decks (stacked-card cycler) + the two auto-scrolling
// quote tickers on the Contact section. Kept imperative on purpose: this is
// DOM-churn animation code, not view logic.

const founderImages = [
  "After the MIT Deep Learning Course.webp", "Appointed Mentor for the Fulbright Austin Conference 2025.webp", "AWS Gen AI Loft after winning a hackathon.webp", "Cambridge Innovation Center Hackathon Win.. picture from during presentation.webp", "Harvard Leadership Course- Masters of Management.webp", "Harvard Summer School - Project Management Cohort.webp", "Harvard Summer School - Purple Squirrel Award.webp", "IMF AI in Finance Meeting.webp", "Infront of the Great Dome at MIT.webp", "Instacart Headquarter San Francisco.webp", "International Monetary Fund Spring Conference 2025.webp", "Martin Trust Center for MIT Entrepreneurship_.webp", "Martin Trust Center of Entrepreneurship MIT.webp", "Me at Harvard Business School.webp", "MIT Arts Incubator.webp", "MIT Delta V Banner 2025.webp", "MIT Delta V Team with Center of Entrepreneurship Head Bill Aulet_.webp", "MIT Media Lab after winning Harvard and MIT Joint Hackathon.webp", "MIT Media Lab after winning Joint Harvard and MIT Hackathon.webp", "MIT Sloan School of Management.webp", "Pitched at MIT Design X 2025.webp", "TechCrunch Disrupt Conference.webp", "TechCrunch.webp", "Welcome to Harvard Summer School 2025.webp", "With Elizabeth Segren - Masters in Management Harvard.webp", "With Nikita Shamgunov VP Engineering Data Bricks.webp", "World Bank Group - Spring Meetings 2025.webp", "Y Combinator AI Startup School_s AWS After Party.webp", "YCombinator AI Startup School.webp", "YCombinator Startup School HackHouse.webp"
];

// Per-photo object-position overrides. .deck-card img is object-fit:cover
// inside a landscape-ish 280px-tall card; most of these source photos are
// portrait (e.g. this one is 608x1080), so the default centred crop only
// shows the vertical middle ~39% of the image, which happened to land on
// this subject's torso and clip the head. "top" anchors the crop to the top
// of the source photo instead, trading the legs (already out of frame) for
// the head staying fully in.
const FOUNDER_PHOTO_POSITION = {
  "Appointed Mentor for the Fulbright Austin Conference 2025.webp": "center top",
};

const logoImages = [
  "aws-gen-ai.webp", "cambridge-innovation-center.png", "harvard-innovation-lab.webp", "harvard-university-seeklogo.svg", "international-monetary-fund-seeklogo.svg", "mit-delta-v.webp", "mit.png", "mtc-hex.png", "northeastern-university.png", "TechCrunch-Logo.wine.svg", "World-bank-logo.svg", "world-summit-ai.webp", "y-combinator-seeklogo.webp"
];

// cambridge-innovation-center.png bakes its "cambridge" wordmark in solid
// white, invisible on the light backing .deck-card.logo-card now shares with
// the hero's logo strip. public/cambridge-innovation-center-light.png is a
// pixel-recoloured copy (only the near-white wordmark pixels touched, the
// orange "cic" mark is untouched) for that surface. Emit both and let
// .theme-swap-dark/-light (02-site.css) pick one per theme — same mechanism
// Hero.jsx uses for its own copy of this logo.
function logoImgHtml(file) {
  const url = "https://nfuozimtwnfww445.public.blob.vercel-storage.com/src/logos/" + file;
  if (file === "cambridge-innovation-center.png") {
    return (
      "<img class=\"theme-swap-dark\" data-src=\"" + url + "\" alt=\"Logo\" decoding=\"async\">" +
      "<img class=\"theme-swap-light\" data-src=\"/cambridge-innovation-center-light.png\" alt=\"Logo\" decoding=\"async\">"
    );
  }
  return "<img data-src=\"" + url + "\" alt=\"Logo\" decoding=\"async\">";
}

export function initDeck(containerId, items, isLogo) {
  const container = document.getElementById(containerId);
  if (!container) return;
  // The design-component runtime can remount this section in preview/HMR.
  // Tear down a previous deck before binding a fresh one to the new DOM.
  if (container._deckCleanup) container._deckCleanup();
  container.innerHTML = '';

  // Every card sits stacked in the same 280px box, so browser-native lazy
  // loading can't help: they'd all count as in-viewport together. Instead the
  // URLs live in data-src and only the cards about to be seen get hydrated.
  const LOOKAHEAD = 4;
  let domCards = [];
  if (isLogo) {
    for (let i = 0; i < logoImages.length; i += 2) {
      const card = document.createElement("div");
      card.className = "deck-card logo-card deck-hidden";
      const img1 = logoImgHtml(logoImages[i]);
      const img2 = logoImages[i + 1] ? logoImgHtml(logoImages[i + 1]) : "";
      card.innerHTML = img1 + img2;
      container.appendChild(card);
      domCards.push(card);
    }
  } else {
    founderImages.forEach(img => {
      const card = document.createElement("div");
      card.className = "deck-card deck-hidden";
      const title = img.split(".")[0].replace(/_/g, " ");
      const pos = FOUNDER_PHOTO_POSITION[img];
      const posAttr = pos ? " style=\"object-position: " + pos + "\"" : "";
      card.innerHTML = "<img data-src=\"https://nfuozimtwnfww445.public.blob.vercel-storage.com/src/Hamza%20Mubashir/" + img + "\" alt=\"" + title + "\" decoding=\"async\"" + posAttr + "><div class=\"deck-title\">" + title + "</div>";
      container.appendChild(card);
      domCards.push(card);
    });
  }

  let inView = false;
  function hydrate(fromIndex) {
    if (!inView) return;
    for (let n = 0; n < LOOKAHEAD; n++) {
      const card = domCards[(fromIndex + n) % domCards.length];
      card.querySelectorAll("img[data-src]").forEach(im => {
        im.src = im.getAttribute("data-src");
        im.removeAttribute("data-src");
      });
    }
  }

  let currentIndex = 0;
  function updateDeck(animateOutIndex = -1) {
    domCards.forEach((c, idx) => {
      c.className = "deck-card " + (isLogo ? "logo-card " : "");
      let diff = (idx - currentIndex + domCards.length) % domCards.length;
      if (idx === animateOutIndex) {
        c.classList.add("deck-out");
      } else if (diff === 0) {
        c.classList.add("deck-front");
      } else if (diff === 1) {
        c.classList.add("deck-middle");
      } else if (diff === 2) {
        c.classList.add("deck-back");
      } else {
        c.classList.add("deck-hidden");
      }
    });
    hydrate(currentIndex);
  }

  updateDeck();
  let isHovered = false;
  const onMouseEnter = () => isHovered = true;
  const onMouseLeave = () => isHovered = false;
  container.addEventListener("mouseenter", onMouseEnter);
  container.addEventListener("mouseleave", onMouseLeave);
  container.addEventListener("click", advance);

  function advance() {
    const outIndex = currentIndex;
    currentIndex = (currentIndex + 1) % domCards.length;
    updateDeck(outIndex);
  }

  // Only cycle while the deck is actually on screen — otherwise the timer
  // keeps forcing style recalcs on 30 cards nobody is looking at.
  let timer = null;
  let observer = null;
  function syncCycling() {
    const shouldRun = inView && !document.hidden;
    if (shouldRun && !timer) {
      timer = setInterval(() => { if (!isHovered) advance(); }, 4500);
    } else if (!shouldRun && timer) {
      clearInterval(timer);
      timer = null;
    }
  }
  if ("IntersectionObserver" in window) {
    observer = new IntersectionObserver(entries => {
      entries.forEach(e => {
        inView = e.isIntersecting;
        if (inView) hydrate(currentIndex);
        syncCycling();
      });
    }, { rootMargin: "300px 0px" });
    observer.observe(container);
  } else {
    inView = true;
    hydrate(currentIndex);
    syncCycling();
  }
  document.addEventListener("visibilitychange", syncCycling);
  container._deckCleanup = () => {
    if (timer) clearInterval(timer);
    if (observer) observer.disconnect();
    document.removeEventListener("visibilitychange", syncCycling);
    container.removeEventListener("mouseenter", onMouseEnter);
    container.removeEventListener("mouseleave", onMouseLeave);
    container.removeEventListener("click", advance);
    delete container._deckCleanup;
  };
}

export function initPartnershipDecks() {
  initDeck("founder-deck", founderImages, false);
  initDeck("logo-deck", logoImages, true);
}

const partnershipQuotes = [
  { t: "SOC 2–ready co-building", d: "Security baked in from day one." },
  { t: "NDA-first, always", d: "We treat your IP with co-founder stewardship." },
  { t: "Senior partner team", d: "The partners who scope it, build and co-own it." },
  { t: "Global & async", d: "4 timezones covered." },
  { t: "Complete IP Co-Ownership", d: "Zero vendor lock-in; built for scalable independence." },
  { t: "Fast alignment", d: "Co-building begins within a week." },
  { t: "Since ’19", d: "co-building for 6+ years" },
  { t: "No briefs. Only ownership.", d: "We don't take briefs. We take ownership." },
  { t: "Shared success", d: "Your product's success is our business too." },
  { t: "Co-founder, not vendor", d: "Not a vendor. A co-founder in the build." },
  { t: "Invested in outcomes", d: "We invest in outcomes, not invoices." },
  { t: "Built to last", d: "Every partnership, built to last beyond launch." }
];

const deliveryQuotes = [
  { t: "Alignment first", d: "Alignment first. Code second." },
  { t: "Rapid Prototyping", d: "Days, not quarters, to a working prototype." },
  { t: "Embedded Expertise", d: "Senior engineers, embedded in your repo." },
  { t: "Launch is Day Zero", d: "Launch is day zero, not day done." },
  { t: "Long-term Stewardship", d: "Stewardship that outlasts the ship date." },
  { t: "Continuous Delivery", d: "Deployments that match your market pace." },
  { t: "Scalable Architecture", d: "Built to scale from 10 to 10M users." },
  { t: "Transparent Velocity", d: "No black boxes. See progress daily." },
  { t: "User-Centric Refinement", d: "Iterating based on real user feedback loops." },
  { t: "Technical Excellence", d: "Zero compromise on code quality and security." }
];

export function initTicker(containerId, quotes) {
  const container = document.getElementById(containerId);
  if (!container) return;
  const listHtml = quotes.map(q =>
    "<div class=\"ticker-card\"><div class=\"ticker-title\">" + q.t + "</div><div class=\"ticker-desc\">" + q.d + "</div></div>"
  ).join("");
  container.innerHTML = listHtml + listHtml;
}

export function initTickers() {
  initTicker("partnership-ticker", partnershipQuotes);
  initTicker("delivery-ticker", deliveryQuotes);
}
