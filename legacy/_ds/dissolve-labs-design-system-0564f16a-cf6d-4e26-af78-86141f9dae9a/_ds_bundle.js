/* @ds-bundle: {"format":4,"namespace":"DissolveLabsDesignSystem_0564f1","components":[{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Eyebrow","sourcePath":"components/core/Eyebrow.jsx"},{"name":"GradientText","sourcePath":"components/core/GradientText.jsx"},{"name":"SectionHeading","sourcePath":"components/core/SectionHeading.jsx"},{"name":"Wordmark","sourcePath":"components/core/Wordmark.jsx"},{"name":"NavBar","sourcePath":"components/navigation/NavBar.jsx"},{"name":"Card","sourcePath":"components/surfaces/Card.jsx"},{"name":"GlassPanel","sourcePath":"components/surfaces/GlassPanel.jsx"},{"name":"MediaCard","sourcePath":"components/surfaces/MediaCard.jsx"}],"sourceHashes":{"components/core/Button.jsx":"c37be0854778","components/core/Eyebrow.jsx":"6f00c1569104","components/core/GradientText.jsx":"0502eb2b412f","components/core/SectionHeading.jsx":"28956efbf2bb","components/core/Wordmark.jsx":"62a63db1b00e","components/navigation/NavBar.jsx":"5480d880d6ec","components/surfaces/Card.jsx":"fa61702b917c","components/surfaces/GlassPanel.jsx":"8dcd95b810b7","components/surfaces/MediaCard.jsx":"3f852d529533","ui_kits/marketing-site/ContactSection.jsx":"9a6cdf602870","ui_kits/marketing-site/DepthEngine.js":"9ba5321e4606","ui_kits/marketing-site/DescendSection.jsx":"82fb42b639f3","ui_kits/marketing-site/Hero.jsx":"c22ea1ecc17f","ui_kits/marketing-site/ServicesSection.jsx":"f61019316978","ui_kits/marketing-site/Site.jsx":"992f32da7e96","ui_kits/marketing-site/SiteFooter.jsx":"f49af0a4a04a","ui_kits/marketing-site/WorkSection.jsx":"d02f21d109d2"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.DissolveLabsDesignSystem_0564f1 = window.DissolveLabsDesignSystem_0564f1 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const {
  useState
} = React;
const SIZES = {
  sm: {
    padding: 'var(--pad-btn-sm)',
    fontSize: 'var(--fs-xs)'
  },
  md: {
    padding: 'var(--pad-btn-md)',
    fontSize: 'var(--fs-base)'
  },
  lg: {
    padding: 'var(--pad-btn-lg)',
    fontSize: 'var(--fs-md)'
  }
};

/**
 * Button — the pill CTA. Gradient-teal primary, outline secondary, text ghost.
 * Self-contained hover (lift + glow); optional pulseGlow for hero moments.
 */
function Button({
  children,
  variant = 'primary',
  size = 'md',
  glow = true,
  pulse = false,
  full = false,
  href,
  disabled = false,
  style = {},
  ...rest
}) {
  const [hover, setHover] = useState(false);
  const sz = SIZES[size] || SIZES.md;
  const lifted = hover && !disabled;
  const variants = {
    primary: {
      background: 'var(--grad-teal)',
      color: 'var(--teal-ink)',
      border: 'none',
      fontWeight: 'var(--fw-bold)',
      boxShadow: pulse ? undefined : glow ? lifted ? 'var(--glow-lg)' : 'var(--glow-md)' : 'none'
    },
    secondary: {
      background: 'transparent',
      color: lifted ? 'var(--ink-100)' : 'var(--ink-300)',
      border: `1px solid ${lifted ? 'var(--teal)' : 'var(--line-teal)'}`,
      fontWeight: 'var(--fw-semibold)'
    },
    ghost: {
      background: 'transparent',
      color: lifted ? 'var(--teal-light)' : 'var(--teal)',
      border: 'none',
      fontWeight: 'var(--fw-semibold)'
    }
  };
  const base = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 'var(--space-4)',
    fontFamily: 'var(--font-display)',
    lineHeight: 1,
    whiteSpace: 'nowrap',
    textDecoration: 'none',
    borderRadius: 'var(--radius-pill)',
    cursor: disabled ? 'not-allowed' : 'pointer',
    width: full ? '100%' : 'auto',
    padding: sz.padding,
    fontSize: sz.fontSize,
    opacity: disabled ? 0.45 : 1,
    transform: lifted ? 'translateY(-2px)' : 'none',
    transition: 'transform var(--dur-fast) var(--ease-soft), box-shadow var(--dur-fast) var(--ease-soft), color var(--dur-fast) var(--ease-soft), border-color var(--dur-fast) var(--ease-soft)',
    animation: pulse ? 'pulseGlow 3s ease-in-out infinite' : undefined,
    ...variants[variant],
    ...style
  };
  const handlers = {
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false)
  };
  const Tag = href ? 'a' : 'button';
  const extra = href ? {
    href
  } : {
    disabled
  };
  return /*#__PURE__*/React.createElement(Tag, _extends({
    style: base
  }, handlers, extra, rest), children);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/Eyebrow.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Eyebrow — the tracked, uppercase micro-label that opens every section
 * ("Below the surface", "Mid-water — what we do"). Sora, 3px tracking.
 */
function Eyebrow({
  children,
  tone = 'accent',
  as: Tag = 'div',
  style = {},
  ...rest
}) {
  const color = tone === 'muted' ? 'var(--ink-500)' : 'var(--teal-bright)';
  return /*#__PURE__*/React.createElement(Tag, _extends({
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 'var(--fw-semibold)',
      fontSize: 'var(--fs-eyebrow)',
      letterSpacing: 'var(--ls-eyebrow)',
      textTransform: 'uppercase',
      color,
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Eyebrow });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Eyebrow.jsx", error: String((e && e.message) || e) }); }

// components/core/GradientText.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * GradientText — clips the signature teal gradient onto its text. Use to
 * emphasise a single word inside a heading ("dissolved", "AI").
 */
function GradientText({
  children,
  as: Tag = 'span',
  style = {},
  ...rest
}) {
  return /*#__PURE__*/React.createElement(Tag, _extends({
    style: {
      background: 'var(--grad-teal-text)',
      WebkitBackgroundClip: 'text',
      backgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      color: 'transparent',
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { GradientText });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/GradientText.jsx", error: String((e && e.message) || e) }); }

// components/core/SectionHeading.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const SIZES = {
  display: {
    fontSize: 'var(--fs-display)',
    letterSpacing: 'var(--ls-display)',
    lineHeight: 'var(--lh-display)'
  },
  lg: {
    fontSize: 'var(--fs-h2)',
    letterSpacing: 'var(--ls-tight)',
    lineHeight: 'var(--lh-heading)'
  },
  md: {
    fontSize: 'var(--fs-h2-sm)',
    letterSpacing: 'var(--ls-tight)',
    lineHeight: 'var(--lh-heading)'
  },
  serif: {
    fontSize: 'var(--fs-serif-lg)',
    letterSpacing: 'var(--ls-tight-sm)',
    lineHeight: 'var(--lh-tight)'
  }
};

/**
 * SectionHeading — the big display heading. Sora black for structural
 * headings (`display`/`lg`/`md`); Cormorant serif for reflective "depth"
 * moments (`serif`). Compose <GradientText> inside to emphasise a word.
 */
function SectionHeading({
  children,
  size = 'lg',
  as: Tag = 'h2',
  align = 'left',
  style = {},
  ...rest
}) {
  const isSerif = size === 'serif';
  const sz = SIZES[size] || SIZES.lg;
  return /*#__PURE__*/React.createElement(Tag, _extends({
    style: {
      fontFamily: isSerif ? 'var(--font-serif)' : 'var(--font-display)',
      fontWeight: isSerif ? 'var(--fw-semibold)' : 'var(--fw-black)',
      color: isSerif ? 'var(--ink-200)' : 'var(--ink-100)',
      textAlign: align,
      margin: 0,
      textWrap: 'balance',
      ...sz,
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { SectionHeading });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/SectionHeading.jsx", error: String((e && e.message) || e) }); }

// components/core/Wordmark.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Wordmark — the Dissolve Labs text logo. There is no logo image; the mark
 * IS this type treatment. `nav` = compact Sora with a teal "Labs"; `serif` =
 * large single-colour Cormorant used in the footer / editorial contexts.
 */
function Wordmark({
  variant = 'nav',
  size,
  color = 'var(--ink-100)',
  accent = 'var(--teal)',
  as: Tag = 'span',
  style = {},
  ...rest
}) {
  if (variant === 'serif') {
    return /*#__PURE__*/React.createElement(Tag, _extends({
      style: {
        fontFamily: 'var(--font-serif)',
        fontWeight: 'var(--fw-semibold)',
        fontSize: size || 'var(--fs-wordmark-serif)',
        letterSpacing: 'var(--ls-tight-sm)',
        lineHeight: 'var(--lh-tight)',
        color,
        ...style
      }
    }, rest), "Dissolve Labs");
  }
  return /*#__PURE__*/React.createElement(Tag, _extends({
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 'var(--fw-black)',
      fontSize: size || 'var(--fs-md)',
      letterSpacing: 'var(--ls-snug)',
      color,
      cursor: rest.onClick ? 'pointer' : 'inherit',
      ...style
    }
  }, rest), "Dissolve", /*#__PURE__*/React.createElement("span", {
    style: {
      color: accent
    }
  }, "Labs"));
}
Object.assign(__ds_scope, { Wordmark });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Wordmark.jsx", error: String((e && e.message) || e) }); }

// components/surfaces/Card.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const {
  useState
} = React;
const RADII = {
  md: 'var(--radius-md)',
  lg: 'var(--radius-lg)',
  xl: 'var(--radius-xl)',
  '2xl': 'var(--radius-2xl)'
};
const SURFACES = {
  1: 'var(--surface-1)',
  2: 'var(--surface-2)',
  3: 'var(--surface-3)',
  4: 'var(--surface-4)'
};

/**
 * Card — the base dark surface with a hairline border and a radius. Set
 * `interactive` for the signature hover: scale up, teal glow, brighter edge.
 */
function Card({
  children,
  tone = 'neutral',
  surface = 2,
  radius = 'xl',
  interactive = false,
  padding = 'var(--pad-card)',
  overflow = 'visible',
  style = {},
  ...rest
}) {
  const [hover, setHover] = useState(false);
  const active = interactive && hover;
  const baseBorder = tone === 'accent' ? 'var(--line-teal)' : 'var(--line-soft)';
  const handlers = interactive ? {
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false)
  } : {};
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      position: 'relative',
      background: SURFACES[surface] || SURFACES[2],
      border: `1px solid ${active ? 'var(--teal-light)' : baseBorder}`,
      borderRadius: RADII[radius] || RADII.xl,
      padding,
      overflow,
      boxShadow: active ? 'var(--glow-lg), var(--shadow-card)' : 'none',
      transform: active ? 'scale(1.06)' : 'none',
      transition: 'transform var(--dur) var(--ease-soft), box-shadow var(--dur) var(--ease-soft), border-color var(--dur) var(--ease-soft)',
      ...style
    }
  }, handlers, rest), children);
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/surfaces/Card.jsx", error: String((e && e.message) || e) }); }

// components/surfaces/GlassPanel.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const VARIANTS = {
  nav: {
    background: 'var(--surface-nav)',
    border: '1px solid var(--line-teal-soft)',
    borderRadius: 'var(--radius-pill)',
    boxShadow: 'var(--shadow-nav)',
    blur: 'var(--blur-nav)'
  },
  panel: {
    background: 'var(--surface-panel)',
    border: '1px solid var(--line-teal-faint)',
    borderRadius: 'var(--radius-2xl)',
    boxShadow: 'var(--shadow-panel)',
    blur: 'var(--blur-panel)'
  }
};

/**
 * GlassPanel — the frosted-glass surface. `nav` = the pill bar; `panel` =
 * the large booking / modal container. Real backdrop blur + teal hairline.
 */
function GlassPanel({
  variant = 'panel',
  padding,
  as: Tag = 'div',
  style = {},
  children,
  ...rest
}) {
  const v = VARIANTS[variant] || VARIANTS.panel;
  return /*#__PURE__*/React.createElement(Tag, _extends({
    style: {
      background: v.background,
      border: v.border,
      borderRadius: v.borderRadius,
      boxShadow: v.boxShadow,
      backdropFilter: v.blur,
      WebkitBackdropFilter: v.blur,
      padding: padding != null ? padding : variant === 'panel' ? 'var(--pad-card)' : undefined,
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { GlassPanel });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/surfaces/GlassPanel.jsx", error: String((e && e.message) || e) }); }

// components/navigation/NavBar.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const {
  useState
} = React;
function NavLink({
  children,
  ...rest
}) {
  const [hover, setHover] = useState(false);
  return /*#__PURE__*/React.createElement("span", _extends({
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      fontFamily: 'var(--font-body)',
      fontWeight: 'var(--fw-medium)',
      fontSize: 'var(--fs-sm)',
      color: hover ? 'var(--ink-100)' : 'var(--ink-300)',
      cursor: 'pointer',
      padding: '6px 12px',
      borderRadius: '20px',
      background: hover ? 'var(--nav-hover-bg, rgba(38, 208, 206, 0.12))' : 'transparent',
      transition: 'color var(--dur-fast) var(--ease-soft), background var(--dur-fast) var(--ease-soft)'
    }
  }, rest), children);
}

/**
 * NavBar — the floating frosted pill nav: wordmark, links, and a primary CTA.
 * Composes GlassPanel + Wordmark + Button. Fixed & centred by default.
 */
function NavBar({
  links = [],
  cta,
  onBrandClick,
  fixed = true,
  style = {},
  ...rest
}) {
  const fixedStyle = fixed ? {
    position: 'fixed',
    top: 'var(--space-9)',
    left: '50%',
    transform: 'translateX(-50%)',
    zIndex: 200
  } : {};
  return /*#__PURE__*/React.createElement(__ds_scope.GlassPanel, _extends({
    variant: "nav",
    as: "nav",
    padding: "11px 12px 11px 26px",
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--space-12)',
      ...fixedStyle,
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement(__ds_scope.Wordmark, {
    onClick: onBrandClick
  }), links.length > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: '0px'
    }
  }, links.map((l, i) => /*#__PURE__*/React.createElement(NavLink, {
    key: i,
    onClick: l.onClick
  }, l.label))), cta && /*#__PURE__*/React.createElement(__ds_scope.Button, {
    size: "sm",
    onClick: cta.onClick,
    href: cta.href
  }, cta.label));
}
Object.assign(__ds_scope, { NavBar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/NavBar.jsx", error: String((e && e.message) || e) }); }

// components/surfaces/MediaCard.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * MediaCard — a portrait media tile with a legibility scrim and bottom-anchored
 * title + description. Drop a canvas, <img>, or <image-slot> in `media`.
 */
function MediaCard({
  title,
  description,
  media,
  children,
  ratio = '2/3',
  width,
  tone = 'neutral',
  surface = 1,
  interactive = true,
  scrim = true,
  style = {},
  ...rest
}) {
  return /*#__PURE__*/React.createElement(__ds_scope.Card, _extends({
    tone: tone,
    surface: surface,
    radius: "lg",
    interactive: interactive,
    padding: "0",
    overflow: "hidden",
    style: {
      width,
      aspectRatio: ratio,
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0
    }
  }, media || children), scrim && /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      background: 'var(--grad-scrim)',
      pointerEvents: 'none'
    }
  }), (title || description) && /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 'var(--space-8)',
      right: 'var(--space-8)',
      bottom: 'var(--space-8)'
    }
  }, title && /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 'var(--fw-bold)',
      fontSize: 'var(--fs-card-title)',
      letterSpacing: '-.3px',
      color: 'var(--ink-100)'
    }
  }, title), description && /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--fs-xs)',
      color: 'var(--ink-500)',
      marginTop: 'var(--space-2)'
    }
  }, description)));
}
Object.assign(__ds_scope, { MediaCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/surfaces/MediaCard.jsx", error: String((e && e.message) || e) }); }

// ui_kits/marketing-site/ContactSection.jsx
try { (() => {
// ContactSection ("the deep") — the bioluminescent booking experience: a pulsing
// CTA reveals a glass scheduling panel (calendar + time columns), ringed by
// dimmed edge tiles. Booking state is React; edge/tile canvases draw via DepthEngine.
const DS = window.DissolveLabsDesignSystem_0564f1;
const {
  Eyebrow,
  SectionHeading,
  Button,
  GlassPanel
} = DS;
const css = window.css;
const {
  useState
} = React;
const AVAIL = [3, 7, 10, 14, 17, 21, 24, 28];
const DAY_HEADS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const TIMES = ['8:00 AM', '10:00 AM', '2:00 PM', '4:00 PM', '6:00 PM'];
const EDGE_TOP = [['Signal Conf', 1], ['Interface', 2], ['Frontier AI', 3]];
const EDGE_BOTTOM = [['Automate', 3], ['Horizon', 1], ['Refract', 2]];
const EDGE_LEFT = [['Momentum', 2], ['Craft & Code', 1], ['Deep Dive', 3]];
const EDGE_RIGHT = [['Nexus', 3], ['Apex Dev', 2], ['Lattice', 1]];
function EdgeCard(name, style, col, i) {
  const box = col ? 'height:100px' : 'flex:1 1 0;min-width:120px;height:104px';
  return /*#__PURE__*/React.createElement("div", {
    key: i,
    className: "edge-card",
    style: css('position:relative;border:1px solid rgba(255,255,255,.12);border-radius:12px;overflow:hidden;background:#040c16;opacity:.35;filter:blur(2px);' + box)
  }, /*#__PURE__*/React.createElement("canvas", {
    "data-ev": style,
    style: css('position:absolute;inset:0;width:100%;height:100%')
  }), /*#__PURE__*/React.createElement("div", {
    style: css('position:absolute;inset:0;background:linear-gradient(to top,#03080f 20%,transparent 80%)')
  }), /*#__PURE__*/React.createElement("div", {
    style: css('position:absolute;left:12px;bottom:10px;font-family:Sora;font-weight:700;font-size:13px;color:#EAF3F4')
  }, name));
}
function ContactSection() {
  const [bookingOpen, setBookingOpen] = useState(false);
  const [vy, setVy] = useState(2026);
  const [vm, setVm] = useState(6);
  const [selDate, setSelDate] = useState(17);
  const [selCol, setSelCol] = useState(0);
  const [selTime, setSelTime] = useState(null);
  const [confirmed, setConfirmed] = useState(false);
  const prevMonth = () => {
    setVy(y => vm === 0 ? y - 1 : y);
    setVm(m => m === 0 ? 11 : m - 1);
  };
  const nextMonth = () => {
    setVy(y => vm === 11 ? y + 1 : y);
    setVm(m => m === 11 ? 0 : m + 1);
  };
  const buildCalendar = () => {
    const first = new Date(vy, vm, 1).getDay();
    const off = (first + 6) % 7;
    const dim = new Date(vy, vm + 1, 0).getDate();
    const cells = [];
    for (let i = 0; i < off; i++) cells.push({
      blank: true
    });
    for (let d = 1; d <= dim; d++) cells.push({
      day: d,
      avail: AVAIL.includes(d),
      sel: d === selDate
    });
    const today = new Date(2026, 6, 18);
    const isTodayMonth = vy === 2026 && vm === 6;
    return cells.map((c, idx) => {
      if (c.blank) return {
        key: idx,
        label: '',
        style: 'height:38px',
        onClick: () => {}
      };
      const base = 'height:38px;display:flex;align-items:center;justify-content:center;border-radius:9px;font-family:Manrope;font-weight:500;font-size:14px;cursor:none;position:relative;transition:background .2s;';
      let st;
      if (c.sel) st = base + 'background:linear-gradient(135deg,#33E0DE,#0E9AA7);color:#04121a;font-weight:700;box-shadow:0 0 18px rgba(38,208,206,.5)';else if (c.avail) st = base + 'color:#DCEBEE;background:rgba(38,208,206,.08)';else st = base + 'color:#5B6B77';
      if (isTodayMonth && c.day === today.getDate() && !c.sel) st += ';outline:1px solid rgba(107,235,232,.6);outline-offset:-1px';
      return {
        key: idx,
        label: String(c.day),
        style: st,
        onClick: c.avail ? () => setSelDate(c.day) : () => {}
      };
    });
  };
  const cal = buildCalendar();
  const days = AVAIL.slice(0, 5);
  const timeCols = days.map((d, ci) => {
    const date = new Date(vy, vm, d);
    return {
      wd: date.toLocaleString('en-US', {
        weekday: 'short'
      }),
      dm: date.toLocaleString('en-US', {
        month: 'short',
        day: 'numeric'
      }),
      slots: TIMES.map(tm => {
        const key = ci + '-' + tm;
        const sel = selTime === key;
        const b = 'text-align:center;font-family:Manrope;font-weight:600;font-size:12px;padding:9px 6px;border-radius:8px;cursor:none;transition:all .2s;';
        const style = sel ? b + 'background:linear-gradient(135deg,#33E0DE,#0E9AA7);color:#04121a;box-shadow:0 0 16px rgba(38,208,206,.45)' : b + 'background:rgba(255,255,255,.04);color:#9BA8B4;border:1px solid rgba(255,255,255,.08)';
        return {
          time: tm,
          style,
          onClick: () => {
            setSelTime(key);
            setSelCol(ci);
          }
        };
      })
    };
  });
  const monthLabel = new Date(vy, vm, 1).toLocaleString('en-US', {
    month: 'long',
    year: 'numeric'
  });
  const selDay = selTime != null ? timeCols[selCol] : null;
  const confirmMsg = selDay ? selDay.wd + ', ' + selDay.dm + ' at ' + selTime.split('-')[1] : 'We\u2019ll see you soon.';
  return /*#__PURE__*/React.createElement("section", {
    id: "contact",
    style: css('position:relative;z-index:1;padding:70px 5vw 150px')
  }, /*#__PURE__*/React.createElement("div", {
    className: "reveal",
    style: css('text-align:center;max-width:640px;margin:0 auto 50px')
  }, /*#__PURE__*/React.createElement(Eyebrow, {
    style: css('margin-bottom:16px')
  }, "The deep \u2014 bioluminescence only"), /*#__PURE__*/React.createElement(SectionHeading, {
    size: "md",
    align: "center"
  }, "Book time with our team"), /*#__PURE__*/React.createElement("p", {
    style: css('font-family:Manrope;font-size:17px;color:#9BA8B4;margin-top:16px')
  }, "Pick a slot. We\u2019ll walk you through your idea and what building it looks like.")), /*#__PURE__*/React.createElement("div", {
    style: css('max-width:1240px;margin:0 auto;display:grid;grid-template-columns:190px 1fr 190px;grid-template-rows:auto minmax(0,1fr) auto;gap:22px;align-items:center')
  }, /*#__PURE__*/React.createElement("div", {
    style: css('grid-column:2;grid-row:1;display:flex;gap:18px;justify-content:center')
  }, EDGE_TOP.map(([n, s], i) => EdgeCard(n, s, false, i))), /*#__PURE__*/React.createElement("div", {
    style: css('grid-column:1;grid-row:2;display:flex;flex-direction:column;gap:18px')
  }, EDGE_LEFT.map(([n, s], i) => EdgeCard(n, s, true, i))), /*#__PURE__*/React.createElement("div", {
    style: css('grid-column:2;grid-row:2;display:flex;align-items:center;justify-content:center;min-height:520px')
  }, !bookingOpen && /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "lg",
    pulse: true,
    onClick: () => setBookingOpen(true)
  }, "Book a Consultation"), bookingOpen && /*#__PURE__*/React.createElement(GlassPanel, {
    variant: "panel",
    style: css('width:100%;max-width:820px;padding:30px;animation:widgetIn .5s cubic-bezier(.34,1.56,.64,1)')
  }, !confirmed && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    style: css('display:flex;gap:30px;flex-wrap:wrap')
  }, /*#__PURE__*/React.createElement("div", {
    style: css('flex:1 1 300px')
  }, /*#__PURE__*/React.createElement("div", {
    style: css('display:flex;align-items:center;justify-content:space-between;margin-bottom:18px')
  }, /*#__PURE__*/React.createElement("div", {
    style: css('font-family:Sora;font-weight:700;font-size:18px;color:#F2F7F8')
  }, monthLabel), /*#__PURE__*/React.createElement("div", {
    style: css('display:flex;gap:10px')
  }, /*#__PURE__*/React.createElement("span", {
    onClick: prevMonth,
    style: css('width:32px;height:32px;display:flex;align-items:center;justify-content:center;border:1px solid rgba(255,255,255,.15);border-radius:8px;color:#9BA8B4;cursor:none')
  }, "\u2039"), /*#__PURE__*/React.createElement("span", {
    onClick: nextMonth,
    style: css('width:32px;height:32px;display:flex;align-items:center;justify-content:center;border:1px solid rgba(255,255,255,.15);border-radius:8px;color:#9BA8B4;cursor:none')
  }, "\u203A"))), /*#__PURE__*/React.createElement("div", {
    style: css('display:grid;grid-template-columns:repeat(7,1fr);gap:6px;margin-bottom:8px')
  }, DAY_HEADS.map((d, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: css('text-align:center;font-family:Sora;font-weight:600;font-size:11px;color:#4E7B7D;padding:4px 0')
  }, d))), /*#__PURE__*/React.createElement("div", {
    style: css('display:grid;grid-template-columns:repeat(7,1fr);gap:6px')
  }, cal.map(cell => /*#__PURE__*/React.createElement("div", {
    key: cell.key,
    onClick: cell.onClick,
    style: css(cell.style)
  }, cell.label)))), /*#__PURE__*/React.createElement("div", {
    style: css('flex:1 1 340px')
  }, /*#__PURE__*/React.createElement("div", {
    style: css('font-family:Sora;font-weight:700;font-size:15px;color:#F2F7F8;margin-bottom:16px')
  }, "Available times"), /*#__PURE__*/React.createElement("div", {
    style: css('display:flex;gap:12px;overflow-x:auto;padding-bottom:6px')
  }, timeCols.map((col, ci) => /*#__PURE__*/React.createElement("div", {
    key: ci,
    style: css('flex:0 0 auto;min-width:88px')
  }, /*#__PURE__*/React.createElement("div", {
    style: css('text-align:center;margin-bottom:10px')
  }, /*#__PURE__*/React.createElement("div", {
    style: css('font-family:Sora;font-weight:700;font-size:13px;color:#C7D4DA')
  }, col.wd), /*#__PURE__*/React.createElement("div", {
    style: css('font-family:Manrope;font-size:12px;color:#5B6B77')
  }, col.dm)), /*#__PURE__*/React.createElement("div", {
    style: css('display:flex;flex-direction:column;gap:8px')
  }, col.slots.map((s, si) => /*#__PURE__*/React.createElement("div", {
    key: si,
    onClick: s.onClick,
    style: css(s.style)
  }, s.time)))))))), /*#__PURE__*/React.createElement("button", {
    onClick: () => setConfirmed(true),
    style: css('width:100%;margin-top:26px;font-family:Sora;font-weight:700;font-size:15px;color:#04121a;background:linear-gradient(135deg,#33E0DE,#0E9AA7);border:none;padding:16px;border-radius:12px;cursor:none;box-shadow:0 0 30px rgba(38,208,206,.35)')
  }, "Confirm Booking")), confirmed && /*#__PURE__*/React.createElement("div", {
    style: css('text-align:center;padding:50px 20px')
  }, /*#__PURE__*/React.createElement("div", {
    style: css('width:64px;height:64px;margin:0 auto 22px;border-radius:50%;background:linear-gradient(135deg,#33E0DE,#0E9AA7);display:flex;align-items:center;justify-content:center;font-size:30px;color:#04121a;box-shadow:0 0 40px rgba(38,208,206,.5)')
  }, "\u2713"), /*#__PURE__*/React.createElement("div", {
    style: css('font-family:Sora;font-weight:800;font-size:26px;color:#F2F7F8')
  }, "You\u2019re booked"), /*#__PURE__*/React.createElement("div", {
    style: css('font-family:Manrope;font-size:16px;color:#9BA8B4;margin-top:10px')
  }, confirmMsg), /*#__PURE__*/React.createElement("div", {
    style: css('font-family:Manrope;font-size:14px;color:#5B6B77;margin-top:6px')
  }, "A calendar invite is on its way to your inbox.")))), /*#__PURE__*/React.createElement("div", {
    style: css('grid-column:3;grid-row:2;display:flex;flex-direction:column;gap:18px')
  }, EDGE_RIGHT.map(([n, s], i) => EdgeCard(n, s, true, i))), /*#__PURE__*/React.createElement("div", {
    style: css('grid-column:2;grid-row:3;display:flex;gap:18px;justify-content:center')
  }, EDGE_BOTTOM.map(([n, s], i) => EdgeCard(n, s, false, i)))));
}
window.ContactSection = ContactSection;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/marketing-site/ContactSection.jsx", error: String((e && e.message) || e) }); }

// ui_kits/marketing-site/DepthEngine.js
try { (() => {
// Dissolve Labs — DepthEngine: the ocean-descent canvas + custom-cursor engine.
// Ported verbatim from the source site; React refs swapped for DOM lookups.
// Usage: const e = new DepthEngine(); e.attach();  (call after the DOM mounts)
(function () {
  'use strict';

  class DepthEngine {
    constructor() {
      this.stops = [[0, '#0D2B45'], [0.15, '#0A2238'], [0.30, '#081A2C'], [0.50, '#060F1C'], [0.70, '#040A14'], [0.85, '#03060D'], [1.0, '#020408']];
      this.depth = 0;
      this.mouse = {
        x: innerWidth / 2,
        y: innerHeight / 2
      };
      this.cur = {
        x: innerWidth / 2,
        y: innerHeight / 2
      };
      this.shipX = 0;
      this.evDrawn = false;
      this.big = false;
      this.lastRipple = 0;
      this.avail = [3, 7, 10, 14, 17, 21, 24, 28];
    }

    // ---------- helpers ----------
    hex(h) {
      return [parseInt(h.slice(1, 3), 16), parseInt(h.slice(3, 5), 16), parseInt(h.slice(5, 7), 16)];
    }
    colorAt(d) {
      d = Math.max(0, Math.min(1, d));
      const s = this.stops;
      for (let i = 0; i < s.length - 1; i++) {
        if (d <= s[i + 1][0]) {
          const a = this.hex(s[i][1]),
            b = this.hex(s[i + 1][1]);
          const t = (d - s[i][0]) / (s[i + 1][0] - s[i][0]);
          return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t];
        }
      }
      return this.hex(s[s.length - 1][1]);
    }
    rgb(c) {
      return 'rgb(' + (c[0] | 0) + ',' + (c[1] | 0) + ',' + (c[2] | 0) + ')';
    }
    size(c, w, h) {
      const dpr = Math.min(devicePixelRatio || 1, 2);
      c.width = Math.max(1, w * dpr);
      c.height = Math.max(1, h * dpr);
      c.cw = w;
      c.ch = h;
      const x = c.getContext('2d');
      x.setTransform(dpr, 0, 0, dpr, 0, 0);
      return x;
    }
    resize() {
      const p = this.parts,
        r = this.rays;
      if (p) this.size(p, innerWidth, innerHeight);
      if (r) this.size(r, innerWidth, innerHeight);
      [this.hero, this.sub, this.seabed].forEach(c => {
        if (c) this.size(c, c.clientWidth, c.clientHeight);
      });
      const root = document;
      if (root) {
        root.querySelectorAll('[data-svc]').forEach(c => this.size(c, c.clientWidth, c.clientHeight));
      }
      this.evDrawn = false;
    }
    attach() {
      this.bg = document.getElementById('depth-bg');
      this.rays = document.getElementById('rays-canvas');
      this.parts = document.getElementById('particles-canvas');
      this.vig = document.getElementById('vignette');
      this.curEl = document.getElementById('cursor-ring');
      this.dotEl = document.getElementById('cursor-dot');
      this.hero = document.getElementById('hero-canvas');
      this.sub = document.getElementById('sub-canvas');
      this.subZone = document.getElementById('descend');
      this.seabed = document.getElementById('seabed-canvas');
      this.scrollInd = document.getElementById('scroll-ind');
      this.rows = Array.from(document.querySelectorAll('[data-ev-row]'));
      if (matchMedia('(hover:none)').matches) {
        if (this.curEl) this.curEl.style.display = 'none';
        if (this.dotEl) this.dotEl.style.display = 'none';
      }
      this.particles = Array.from({
        length: 130
      }, () => ({
        x: Math.random(),
        y: Math.random(),
        vx: (Math.random() - .5) * .0006,
        vy: -(Math.random() * .0012 + .0004),
        s: Math.random() * 2 + .6,
        ph: Math.random() * 6.28
      }));
      this.seabedInit();
      window.addEventListener('scroll', this.onScroll, {
        passive: true
      });
      window.addEventListener('resize', this.onResize, {
        passive: true
      });
      window.addEventListener('mousemove', this.onMove, {
        passive: true
      });
      window.addEventListener('mouseover', this.onOver, {
        passive: true
      });
      this.resize();
      this.io = new IntersectionObserver(es => es.forEach(e => {
        if (e.isIntersecting) e.target.classList.add('in');
      }), {
        threshold: .15
      });
      document.querySelectorAll('.reveal').forEach(el => this.io.observe(el));
      this.raf = requestAnimationFrame(this.loop);
    }
    detach() {
      cancelAnimationFrame(this.raf);
      window.removeEventListener('scroll', this.onScroll);
      window.removeEventListener('resize', this.onResize);
      window.removeEventListener('mousemove', this.onMove);
      window.removeEventListener('mouseover', this.onOver);
      if (this.io) this.io.disconnect();
    }
    onScroll = () => {
      if (this.scrollInd) {
        this.scrollInd.style.opacity = scrollY > 80 ? '0' : '1';
      }
    };
    onResize = () => {
      this.resize();
    };
    onMove = e => {
      this.mouse = {
        x: e.clientX,
        y: e.clientY
      };
      const n = performance.now();
      if (n - this.lastRipple > 120) {
        this.lastRipple = n;
        this.ripple(e.clientX, e.clientY);
      }
    };
    onOver = e => {
      this.big = !!(e.target.closest && e.target.closest('[data-hov],a,button'));
    };
    ripple(x, y) {
      const d = document.createElement('div');
      d.style.cssText = 'position:fixed;left:' + x + 'px;top:' + y + 'px;width:50px;height:50px;border:1px solid rgba(107,235,232,.6);border-radius:50%;pointer-events:none;z-index:9997;animation:rippleOut .6s ease-out forwards';
      document.body.appendChild(d);
      setTimeout(() => d.remove(), 620);
    }
    scrollTo(id) {
      const el = document.getElementById(id);
      if (el) window.scrollTo({
        top: el.getBoundingClientRect().top + scrollY - 10,
        behavior: 'smooth'
      });
    }

    // ---------- master loop ----------
    loop = now => {
      const t = now / 1000;
      const doc = document.documentElement;
      const st = window.scrollY || doc.scrollTop || document.body.scrollTop || 0;
      const max = (doc.scrollHeight || document.body.scrollHeight) - innerHeight;
      this.depth = max > 0 ? Math.max(0, Math.min(1, st / max)) : 0;
      const d = this.depth;
      // background
      if (this.bg) {
        const top = this.colorAt(d),
          bot = this.colorAt(Math.min(1, d + 0.12));
        this.bg.style.background = 'linear-gradient(to bottom,' + this.rgb(top) + ',' + this.rgb(bot) + ')';
      }
      // vignette
      if (this.vig) {
        this.vig.style.opacity = String(Math.max(0, Math.min(1, (d - 0.4) / 0.5)) * .95);
      }
      // cursor
      this.cur.x += (this.mouse.x - this.cur.x) * .18;
      this.cur.y += (this.mouse.y - this.cur.y) * .18;
      if (this.curEl) {
        const s = this.big ? 32 : 34,
          exp = this.big ? 48 : 34;
        this.curEl.style.transform = 'translate(' + this.cur.x + 'px,' + this.cur.y + 'px)';
        this.curEl.style.width = exp + 'px';
        this.curEl.style.height = exp + 'px';
        this.curEl.style.margin = -exp / 2 + 'px 0 0 ' + -exp / 2 + 'px';
      }
      if (this.dotEl) this.dotEl.style.transform = 'translate(' + this.mouse.x + 'px,' + this.mouse.y + 'px)';
      // rays + particles
      this.drawRays(t, d);
      this.drawParticles(t, d);
      // hero
      this.drawHero(t);
      // services
      const root = document;
      if (root) {
        if (!this.evDrawn) this.drawEventBgs();
        root.querySelectorAll('[data-svc]').forEach(c => this.drawSvc(c, t));
      }
      // submarine + parallax
      this.drawSub(t);
      this.parallax();
      // seabed
      this.drawSeabed(t);
      this.raf = requestAnimationFrame(this.loop);
    };
    parallax() {
      const z = this.subZone; // reuse events section for rows
      const ev = document.getElementById('events');
      if (!ev) return;
      const r = ev.getBoundingClientRect();
      const p = Math.max(-1, Math.min(1, 1 - (r.top + r.height / 2) / ((innerHeight + r.height) / 2)));
      if (this.rows[0]) this.rows[0].style.transform = 'translateX(' + p * 180 + 'px)';
      if (this.rows[1]) this.rows[1].style.transform = 'translateX(' + p * 20 + 'px)';
      if (this.rows[2]) this.rows[2].style.transform = 'translateX(' + -p * 180 + 'px)';
    }

    // ---------- light rays ----------
    drawRays(t, d) {
      const c = this.rays;
      if (!c) return;
      const x = c.getContext('2d'),
        w = c.cw,
        h = c.ch;
      x.clearRect(0, 0, w, h);
      const op = Math.max(0, 1 - d / 0.5);
      if (op <= 0) return;
      x.globalCompositeOperation = 'screen';
      for (let i = 0; i < 7; i++) {
        const bx = w * (i / 6) + Math.sin(t * .3 + i) * 40;
        const sw = 60 + i * 10;
        const g = x.createLinearGradient(bx, 0, bx - 140, h * .9);
        g.addColorStop(0, 'rgba(120,230,225,' + .10 * op + ')');
        g.addColorStop(1, 'rgba(120,230,225,0)');
        x.fillStyle = g;
        x.beginPath();
        x.moveTo(bx - sw, 0);
        x.lineTo(bx + sw, 0);
        x.lineTo(bx - 90, h);
        x.lineTo(bx - 90 - sw * 1.6, h);
        x.closePath();
        x.fill();
      }
      x.globalCompositeOperation = 'source-over';
    }

    // ---------- particles ----------
    drawParticles(t, d) {
      const c = this.parts;
      if (!c) return;
      const x = c.getContext('2d'),
        w = c.cw,
        h = c.ch;
      x.clearRect(0, 0, w, h);
      let col, glow, dens, spd;
      if (d < 0.2) {
        col = [200, 245, 242];
        glow = 6;
        dens = 1;
        spd = 1.6;
      } else if (d < 0.4) {
        col = [130, 200, 220];
        glow = 4;
        dens = .8;
        spd = 1;
      } else if (d < 0.6) {
        col = [70, 160, 175];
        glow = 3;
        dens = .55;
        spd = .6;
      } else if (d < 0.8) {
        col = [80, 255, 210];
        glow = 9;
        dens = .5;
        spd = .35;
      } else {
        col = [100, 255, 230];
        glow = 14;
        dens = .4;
        spd = .2;
      }
      x.globalCompositeOperation = 'screen';
      const n = Math.floor(this.particles.length * dens);
      for (let i = 0; i < n; i++) {
        const p = this.particles[i];
        p.x += p.vx * spd * 4;
        p.y += p.vy * spd * 4;
        if (p.y < -.02) {
          p.y = 1.02;
          p.x = Math.random();
        }
        if (p.x < 0) p.x = 1;
        if (p.x > 1) p.x = 0;
        const px = p.x * w,
          py = p.y * h;
        const tw = d > 0.6 ? 0.4 + 0.6 * Math.abs(Math.sin(t * 1.5 + p.ph)) : 1;
        const a = (d > 0.6 ? .9 : .5) * tw;
        x.beginPath();
        x.fillStyle = 'rgba(' + col[0] + ',' + col[1] + ',' + col[2] + ',' + a + ')';
        x.shadowBlur = glow;
        x.shadowColor = 'rgba(' + col[0] + ',' + col[1] + ',' + col[2] + ',.9)';
        x.arc(px, py, p.s * (d > 0.6 ? 1.3 : 1), 0, 6.28);
        x.fill();
      }
      x.shadowBlur = 0;
      x.globalCompositeOperation = 'source-over';
    }

    // ---------- hero water + ship ----------
    drawHero(t) {
      const c = this.hero;
      if (!c) return;
      const x = c.getContext('2d'),
        w = c.cw,
        h = c.ch;
      x.clearRect(0, 0, w, h);
      const base = h * 0.6;
      const waveY = px => base + Math.sin(px * .008 + t * 1.1) * 14 + Math.sin(px * .017 - t * 1.6) * 8 + Math.sin(px * .031 + t * .7) * 5 + Math.sin(px * .005 + t * .4) * 20;
      x.beginPath();
      x.moveTo(0, h);
      for (let px = 0; px <= w; px += 6) x.lineTo(px, waveY(px));
      x.lineTo(w, h);
      x.closePath();
      const g = x.createLinearGradient(0, base - 30, 0, h);
      g.addColorStop(0, '#1ABFB8');
      g.addColorStop(.5, '#12A29B');
      g.addColorStop(1, '#0A5E60');
      x.fillStyle = g;
      x.fill();
      // foam crests
      x.lineWidth = 2;
      x.strokeStyle = 'rgba(220,255,252,.5)';
      x.beginPath();
      for (let px = 0; px <= w; px += 6) {
        const y = waveY(px);
        px === 0 ? x.moveTo(px, y) : x.lineTo(px, y);
      }
      x.stroke();
      for (let px = 0; px < w; px += 14) {
        const y = waveY(px);
        if (Math.sin(px * .017 - t * 1.6) > .7) {
          x.fillStyle = 'rgba(240,255,253,.7)';
          x.beginPath();
          x.arc(px, y, 1.6, 0, 6.28);
          x.fill();
        }
      }
      // ship
      const targetX = Math.max(w * .2, Math.min(w * .85, this.mouse.x - c.getBoundingClientRect().left));
      this.shipX += (targetX - this.shipX) * .04;
      if (!this.shipX) this.shipX = w * .62;
      const sx = this.shipX,
        sy = waveY(sx) - 2 + Math.sin(t * 1.05) * 4;
      this.drawShip(x, sx, sy, t);
    }
    drawShip(x, sx, sy, t) {
      x.save();
      x.translate(sx, sy);
      const tilt = Math.sin(t * 1.05) * .03;
      x.rotate(tilt);
      // reflection
      x.save();
      x.scale(1, -1);
      x.globalAlpha = .16;
      this.shipBody(x);
      x.restore();
      x.globalAlpha = 1;
      this.shipBody(x);
      x.restore();
    }
    shipBody(x) {
      // hull
      x.fillStyle = '#0a1e2a';
      x.strokeStyle = 'rgba(90,220,215,.6)';
      x.lineWidth = 1.5;
      x.beginPath();
      x.moveTo(-58, 0);
      x.lineTo(58, 0);
      x.lineTo(44, 20);
      x.lineTo(-44, 20);
      x.closePath();
      x.fill();
      x.stroke();
      // deck cabin
      x.fillStyle = '#0d2836';
      x.beginPath();
      x.rect(-26, -20, 42, 20);
      x.fill();
      x.stroke();
      x.fillStyle = '#0d2836';
      x.beginPath();
      x.rect(-8, -34, 20, 14);
      x.fill();
      x.stroke();
      // portholes glow
      x.fillStyle = 'rgba(120,235,230,.9)';
      [-18, -6, 6].forEach(px => {
        x.beginPath();
        x.arc(px, -10, 2.2, 0, 6.28);
        x.fill();
      });
      // mast
      x.strokeStyle = 'rgba(150,235,230,.7)';
      x.lineWidth = 2;
      x.beginPath();
      x.moveTo(-40, -20);
      x.lineTo(-40, -60);
      x.stroke();
      // sail/flag
      x.fillStyle = 'rgba(51,224,222,.35)';
      x.beginPath();
      x.moveTo(-40, -58);
      x.lineTo(-18, -48);
      x.lineTo(-40, -40);
      x.closePath();
      x.fill();
    }

    // ---------- submarine ----------
    drawSub(t) {
      const c = this.sub;
      if (!c) return;
      const x = c.getContext('2d'),
        w = c.cw,
        h = c.ch;
      x.clearRect(0, 0, w, h);
      const z = this.subZone;
      if (!z) return;
      const r = z.getBoundingClientRect();
      const prog = Math.max(0, Math.min(1, (innerHeight - r.top) / (r.height + innerHeight)));
      const cy = h * 1.15 - prog * h * 1.5;
      const cx = w * .5 + Math.sin(t * .4) * 30;
      // wake bubbles
      x.globalCompositeOperation = 'screen';
      for (let i = 0; i < 6; i++) {
        const by = cy + 80 + (t * 40 + i * 60) % 300;
        const bx = cx - 90 - i * 8 + Math.sin(t + i) * 6;
        x.beginPath();
        x.fillStyle = 'rgba(120,220,220,' + .25 * (1 - i / 6) + ')';
        x.arc(bx, by, 6 + i * 2, 0, 6.28);
        x.fill();
      }
      x.globalCompositeOperation = 'source-over';
      x.save();
      x.translate(cx, cy);
      // body
      x.fillStyle = '#050f18';
      x.strokeStyle = 'rgba(60,210,205,.55)';
      x.lineWidth = 2;
      x.beginPath();
      x.ellipse(0, 0, 110, 34, 0, 0, 6.28);
      x.fill();
      x.stroke();
      // tail cone
      x.beginPath();
      x.moveTo(105, -14);
      x.lineTo(140, 0);
      x.lineTo(105, 14);
      x.closePath();
      x.fillStyle = '#050f18';
      x.fill();
      x.stroke();
      // propeller
      x.strokeStyle = 'rgba(120,235,230,.7)';
      x.lineWidth = 2;
      const pr = t * 4;
      for (let i = 0; i < 3; i++) {
        const a = pr + i * 2.09;
        x.beginPath();
        x.moveTo(140, 0);
        x.lineTo(140 + Math.cos(a) * 4, Math.sin(a) * 16);
        x.stroke();
      }
      // conning tower
      x.fillStyle = '#07131d';
      x.beginPath();
      x.moveTo(-26, -30);
      x.lineTo(20, -30);
      x.lineTo(14, -62);
      x.lineTo(-20, -62);
      x.closePath();
      x.fill();
      x.stroke();
      // periscope
      x.beginPath();
      x.moveTo(-4, -62);
      x.lineTo(-4, -80);
      x.lineTo(8, -80);
      x.stroke();
      // dive planes
      x.fillStyle = '#07131d';
      x.beginPath();
      x.moveTo(-70, 30);
      x.lineTo(-98, 44);
      x.lineTo(-70, 40);
      x.closePath();
      x.fill();
      x.stroke();
      // portholes
      x.fillStyle = 'rgba(130,240,235,.95)';
      x.shadowBlur = 12;
      x.shadowColor = 'rgba(90,235,230,.9)';
      [-55, -30, -5, 25].forEach(px => {
        x.beginPath();
        x.arc(px, 0, 5, 0, 6.28);
        x.fill();
      });
      x.shadowBlur = 0;
      x.restore();
    }

    // ---------- service canvases ----------
    drawSvc(c, t) {
      const type = c.dataset.svc;
      const x = c.getContext('2d'),
        w = c.cw,
        h = c.ch;
      if (type === 'matrix') this.svcMatrix(c, x, w, h, t);else if (type === 'robot') this.svcRobot(c, x, w, h, t);else if (type === 'neural') this.svcNeural(c, x, w, h, t);else this.svcBlueprint(c, x, w, h, t);
    }
    svcMatrix(c, x, w, h, t) {
      const fs = 15;
      const cols = Math.floor(w / fs);
      if (c._cols !== cols) {
        c._cols = cols;
        c._d = Array.from({
          length: cols
        }, () => Math.random() * -40);
      }
      x.fillStyle = 'rgba(5,14,24,.14)';
      x.fillRect(0, 0, w, h);
      x.font = fs + 'px monospace';
      for (let i = 0; i < cols; i++) {
        const ch = Math.random() < .5 ? '0' : '1';
        const px = i * fs,
          py = c._d[i] * fs;
        const grad = x.createLinearGradient(0, py - fs * 6, 0, py);
        grad.addColorStop(0, 'rgba(51,224,222,0)');
        grad.addColorStop(1, 'rgba(51,224,222,.9)');
        x.fillStyle = 'rgba(51,224,222,.9)';
        x.fillText(ch, px, py);
        x.fillStyle = 'rgba(140,240,236,.5)';
        if (Math.random() < .1) x.fillText(Math.random() < .5 ? '0' : '1', px, py - fs);
        c._d[i] += 0.55;
        if (py > h && Math.random() > .975) c._d[i] = 0;
      }
    }
    svcRobot(c, x, w, h, t) {
      x.clearRect(0, 0, w, h); // circuit bg
      x.strokeStyle = 'rgba(38,208,206,.08)';
      x.lineWidth = 1;
      for (let i = 0; i < 6; i++) {
        const gy = h * (i / 6);
        x.beginPath();
        x.moveTo(0, gy);
        x.lineTo(w, gy);
        x.stroke();
      }
      const bx = w * .5,
        by = h * .86;
      const a0 = -1.3 + Math.sin(t * .7) * .35,
        a1 = 0.7 + Math.sin(t * .7 + 1) * .5,
        a2 = 0.5 + Math.sin(t * .7 + 2) * .4;
      const L = [h * .22, h * .2, h * .13];
      let px = bx,
        py = by,
        ang = a0;
      const pts = [[px, py]];
      [a0, a0 + a1, a0 + a1 + a2].forEach((_, i) => {
        px += Math.cos(ang) * L[i];
        py += Math.sin(ang) * L[i];
        pts.push([px, py]);
        ang += i === 0 ? a1 : a2;
      });
      // base
      x.fillStyle = '#0a1c26';
      x.fillRect(bx - 26, by, 52, h * .12);
      x.lineCap = 'round';
      for (let i = 0; i < pts.length - 1; i++) {
        x.strokeStyle = 'rgba(46,208,206,.85)';
        x.lineWidth = 16 - i * 3;
        x.beginPath();
        x.moveTo(pts[i][0], pts[i][1]);
        x.lineTo(pts[i + 1][0], pts[i + 1][1]);
        x.stroke();
        x.strokeStyle = 'rgba(140,245,240,.5)';
        x.lineWidth = 4 - i;
        x.beginPath();
        x.moveTo(pts[i][0], pts[i][1]);
        x.lineTo(pts[i + 1][0], pts[i + 1][1]);
        x.stroke();
      }
      pts.forEach((p, i) => {
        x.fillStyle = '#04121a';
        x.beginPath();
        x.arc(p[0], p[1], 9 - i, 0, 6.28);
        x.fill();
        x.strokeStyle = 'rgba(120,240,235,.9)';
        x.lineWidth = 2;
        x.stroke();
      });
      // gripper
      const e = pts[pts.length - 1];
      x.strokeStyle = 'rgba(140,245,240,.8)';
      x.lineWidth = 3;
      x.beginPath();
      x.moveTo(e[0] - 6, e[1]);
      x.lineTo(e[0] - 10, e[1] - 10);
      x.moveTo(e[0] + 6, e[1]);
      x.lineTo(e[0] + 10, e[1] - 10);
      x.stroke();
    }
    svcNeural(c, x, w, h, t) {
      x.clearRect(0, 0, w, h);
      const layers = [5, 8, 8, 5];
      const pad = w * .14;
      const gap = (w - pad * 2) / (layers.length - 1);
      const pos = layers.map((n, li) => {
        const cx = pad + li * gap;
        const vpad = h * .16;
        return Array.from({
          length: n
        }, (_, i) => ({
          x: cx,
          y: vpad + (h - 2 * vpad) * (n === 1 ? .5 : i / (n - 1))
        }));
      });
      const front = t * .6 % 1 * (layers.length - 1);
      for (let li = 0; li < pos.length - 1; li++) {
        const act = Math.max(0, 1 - Math.abs(li + .5 - front) * 1.4);
        pos[li].forEach(a => pos[li + 1].forEach(b => {
          x.strokeStyle = 'rgba(38,208,206,' + (0.08 + act * .5) + ')';
          x.lineWidth = act > .3 ? 1.4 : .7;
          x.beginPath();
          x.moveTo(a.x, a.y);
          x.lineTo(b.x, b.y);
          x.stroke();
        }));
      }
      pos.forEach((layer, li) => {
        const act = Math.max(0, 1 - Math.abs(li - front) * 1.2);
        layer.forEach(nd => {
          x.beginPath();
          x.fillStyle = 'rgba(' + (20 + act * 120) + ',' + (120 + act * 135) + ',' + (160 + act * 95) + ',1)';
          x.shadowBlur = act * 16;
          x.shadowColor = 'rgba(80,240,235,.9)';
          x.arc(nd.x, nd.y, 5 + act * 3, 0, 6.28);
          x.fill();
        });
      });
      x.shadowBlur = 0;
    }
    svcBlueprint(c, x, w, h, t) {
      x.clearRect(0, 0, w, h); // grid
      x.strokeStyle = 'rgba(38,208,206,.06)';
      x.lineWidth = 1;
      for (let gx = 0; gx < w; gx += 26) {
        x.beginPath();
        x.moveTo(gx, 0);
        x.lineTo(gx, h);
        x.stroke();
      }
      for (let gy = 0; gy < h; gy += 26) {
        x.beginPath();
        x.moveTo(0, gy);
        x.lineTo(w, gy);
        x.stroke();
      }
      const m = w * .16;
      const els = [[m, h * .16, w - 2 * m, h * .09, 0], [m, h * .3, w - 2 * m, h * .22, .18], [m, h * .56, (w - 2 * m) * .55, h * .16, .42], [m + (w - 2 * m) * .6, h * .56, (w - 2 * m) * .4, h * .16, .42], [m, h * .76, (w - 2 * m) * .3, h * .08, .66], [m + (w - 2 * m) * .36, h * .76, (w - 2 * m) * .3, h * .08, .78]];
      const cyc = t % 5 / 5;
      const fade = cyc > .82 ? 1 - (cyc - .82) / .18 : 1;
      x.strokeStyle = 'rgba(51,224,222,' + .9 * fade + ')';
      x.lineWidth = 2;
      els.forEach(([ex, ey, ew, eh, st]) => {
        const p = Math.max(0, Math.min(1, (cyc - st) / .18));
        if (p <= 0) return;
        const peri = 2 * (ew + eh);
        x.setLineDash([peri]);
        x.lineDashOffset = peri * (1 - p);
        x.strokeRect(ex, ey, ew, eh);
      });
      x.setLineDash([]);
    }

    // ---------- event card backgrounds (static) ----------
    drawEventBgs() {
      const root = document;
      if (!root) return;
      let any = false;
      root.querySelectorAll('[data-ev]').forEach(c => {
        const w = c.clientWidth,
          h = c.clientHeight;
        if (!w || !h) return;
        any = true;
        const x = this.size(c, w, h);
        this.evBg(x, w, h, parseInt(c.dataset.ev) || 1);
      });
      if (any) this.evDrawn = true;
    }
    evBg(x, w, h, style) {
      x.clearRect(0, 0, w, h);
      const bg = x.createLinearGradient(0, 0, 0, h);
      bg.addColorStop(0, '#0a2130');
      bg.addColorStop(1, '#04101c');
      x.fillStyle = bg;
      x.fillRect(0, 0, w, h);
      if (style === 1) {
        x.strokeStyle = 'rgba(46,208,206,.28)';
        x.lineWidth = 1;
        const vx = w * .5,
          vy = h * .32;
        for (let i = -6; i <= 6; i++) {
          x.beginPath();
          x.moveTo(vx, vy);
          x.lineTo(vx + i * w * .13, h);
          x.stroke();
        }
        for (let j = 1; j < 7; j++) {
          const yy = vy + (h - vy) * Math.pow(j / 7, 1.6);
          x.beginPath();
          x.moveTo(w * .5 - yy * .9, yy);
          x.lineTo(w * .5 + yy * .9, yy);
          x.stroke();
        }
      } else if (style === 2) {
        for (let i = 0; i < 26; i++) {
          const px = Math.random() * w,
            ph = h * (.28 + Math.random() * .2),
            pw = w * .05;
          x.fillStyle = 'rgba(20,60,72,' + (.4 + Math.random() * .4) + ')';
          x.beginPath();
          x.arc(px, h - ph + pw, pw, Math.PI, 0);
          x.fillRect(px - pw, h - ph + pw, pw * 2, ph);
          x.fill();
          x.fillStyle = 'rgba(46,208,206,.15)';
          x.beginPath();
          x.arc(px, h - ph, pw * .7, 0, 6.28);
          x.fill();
        }
      } else {
        x.strokeStyle = 'rgba(46,208,206,.3)';
        x.lineWidth = 1;
        x.fillStyle = 'rgba(51,224,222,.5)';
        for (let i = 0; i < 10; i++) {
          const y = Math.random() * h,
            x0 = Math.random() * w;
          x.beginPath();
          x.moveTo(x0, y);
          const len = w * .3;
          x.lineTo(x0 + len, y);
          x.lineTo(x0 + len + 12, y - 12);
          x.stroke();
          x.beginPath();
          x.arc(x0, y, 2, 0, 6.28);
          x.fill();
          x.beginPath();
          x.arc(x0 + len + 12, y - 12, 2, 0, 6.28);
          x.fill();
        }
      }
    }

    // ---------- seabed ----------
    seabedInit() {
      this.corals = Array.from({
        length: 9
      }, (_, i) => ({
        x: .06 + i * .11 + Math.random() * .03,
        scale: .7 + Math.random() * .7,
        hue: Math.random() < .5 ? '46,208,206' : '90,235,200',
        branches: 3 + Math.floor(Math.random() * 3)
      }));
      this.anemones = Array.from({
        length: 6
      }, () => ({
        x: Math.random(),
        n: 7 + Math.floor(Math.random() * 4),
        ph: Math.random() * 6,
        scale: .6 + Math.random() * .5
      }));
      this.stars = Array.from({
        length: 5
      }, () => ({
        x: Math.random(),
        y: .9 + Math.random() * .08
      }));
      this.sbP = Array.from({
        length: 36
      }, () => ({
        x: Math.random(),
        y: Math.random(),
        s: Math.random() * 1.6 + .5,
        ph: Math.random() * 6
      }));
    }
    branch(x, ox, oy, ang, len, depth, hue) {
      if (depth <= 0) return;
      const ex = ox + Math.cos(ang) * len,
        ey = oy + Math.sin(ang) * len;
      x.strokeStyle = 'rgba(' + hue + ',.5)';
      x.lineWidth = depth;
      x.beginPath();
      x.moveTo(ox, oy);
      x.lineTo(ex, ey);
      x.stroke();
      this.branch(x, ex, ey, ang - .4, len * .75, depth - 1, hue);
      this.branch(x, ex, ey, ang + .4, len * .75, depth - 1, hue);
    }
    drawSeabed(t) {
      const c = this.seabed;
      if (!c) return;
      const x = c.getContext('2d'),
        w = c.cw,
        h = c.ch;
      x.clearRect(0, 0, w, h);
      const floor = h * .72;
      // water darkening at bottom
      const g = x.createLinearGradient(0, 0, 0, h);
      g.addColorStop(0, 'rgba(2,8,16,0)');
      g.addColorStop(.6, 'rgba(2,8,16,.6)');
      g.addColorStop(1, '#03060d');
      x.fillStyle = g;
      x.fillRect(0, 0, w, h);
      // sediment ripples
      x.strokeStyle = 'rgba(40,34,26,.6)';
      x.lineWidth = 1;
      for (let y = floor + 18; y < h; y += 7) {
        x.beginPath();
        for (let px = 0; px <= w; px += 10) {
          const yy = y + Math.sin(px * .02 + y) * 2;
          px === 0 ? x.moveTo(px, yy) : x.lineTo(px, yy);
        }
        x.stroke();
      }
      x.fillStyle = '#08100a';
      x.fillRect(0, floor + 14, w, h);
      x.shadowBlur = 8;
      // corals
      this.corals.forEach(cr => {
        x.shadowColor = 'rgba(' + cr.hue + ',.5)';
        const bx = cr.x * w,
          by = floor + 16,
          len = h * .12 * cr.scale;
        this.branch(x, bx, by, -Math.PI / 2, len, cr.branches, cr.hue);
      });
      x.shadowBlur = 0;
      // anemones
      this.anemones.forEach(an => {
        const bx = an.x * w,
          by = floor + 16;
        x.strokeStyle = 'rgba(70,220,200,.4)';
        x.lineWidth = 2;
        for (let i = 0; i < an.n; i++) {
          const a = -Math.PI / 2 + (i / (an.n - 1) - .5) * 1.6 + Math.sin(t * 1.5 + an.ph + i) * .12;
          const l = h * .06 * an.scale;
          x.beginPath();
          x.moveTo(bx, by);
          x.quadraticCurveTo(bx + Math.cos(a) * l * .5, by + Math.sin(a) * l * .6, bx + Math.cos(a) * l, by + Math.sin(a) * l);
          x.stroke();
        }
      });
      // sea stars
      this.stars.forEach(s => {
        const sx = s.x * w,
          sy = floor + 18 + s.y * (h - floor - 18) * .2;
        x.fillStyle = 'rgba(30,26,20,.9)';
        x.beginPath();
        for (let i = 0; i < 10; i++) {
          const a = -Math.PI / 2 + i * Math.PI / 5;
          const r = i % 2 ? 4 : 10;
          x.lineTo(sx + Math.cos(a) * r, sy + Math.sin(a) * r);
        }
        x.closePath();
        x.fill();
      });
      // anchor
      this.drawAnchor(x, w * .8, floor + 10, h);
      // particles
      x.globalCompositeOperation = 'screen';
      this.sbP.forEach(p => {
        p.y -= .0006;
        if (p.y < 0) p.y = 1;
        const px = p.x * w,
          py = p.y * h;
        x.beginPath();
        x.fillStyle = 'rgba(100,255,230,' + (.4 + .4 * Math.sin(t * 2 + p.ph)) + ')';
        x.shadowBlur = 8;
        x.shadowColor = 'rgba(100,255,230,.9)';
        x.arc(px, py, p.s, 0, 6.28);
        x.fill();
      });
      x.shadowBlur = 0;
      x.globalCompositeOperation = 'source-over';
    }
    drawAnchor(x, ax, ay, h) {
      x.save();
      x.translate(ax, ay);
      x.rotate(.35);
      x.strokeStyle = 'rgba(60,200,196,.4)';
      x.lineWidth = 6;
      x.fillStyle = '#060f16';
      // ring
      x.beginPath();
      x.arc(0, -h * .16, 12, 0, 6.28);
      x.stroke();
      // shank
      x.beginPath();
      x.moveTo(0, -h * .14);
      x.lineTo(0, h * .02);
      x.stroke();
      // stock
      x.beginPath();
      x.moveTo(-26, -h * .1);
      x.lineTo(26, -h * .1);
      x.stroke();
      // arms
      x.beginPath();
      x.moveTo(0, h * .02);
      x.quadraticCurveTo(-40, h * .02, -40, -h * .03);
      x.moveTo(0, h * .02);
      x.quadraticCurveTo(40, h * .02, 40, -h * .03);
      x.stroke();
      // flukes
      x.fillStyle = 'rgba(60,200,196,.3)';
      x.beginPath();
      x.moveTo(-40, -h * .03);
      x.lineTo(-52, -h * .02);
      x.lineTo(-38, h * .01);
      x.closePath();
      x.fill();
      x.beginPath();
      x.moveTo(40, -h * .03);
      x.lineTo(52, -h * .02);
      x.lineTo(38, h * .01);
      x.closePath();
      x.fill();
      // chain up
      x.fillStyle = 'rgba(60,200,196,.25)';
      for (let i = 0; i < 8; i++) {
        x.beginPath();
        x.arc(Math.sin(i) * 4, -h * .16 - i * 16, 4, 0, 6.28);
        x.fill();
      }
      x.restore();
    }
  }
  window.DepthEngine = DepthEngine;
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/marketing-site/DepthEngine.js", error: String((e && e.message) || e) }); }

// ui_kits/marketing-site/DescendSection.jsx
try { (() => {
// DescendSection — the transition into the deep. Submarine descends through
// sub-canvas; editorial serif copy. Section id="descend" is DepthEngine's subZone.
const DS = window.DissolveLabsDesignSystem_0564f1;
const {
  SectionHeading
} = DS;
const css = window.css;
function DescendSection() {
  return /*#__PURE__*/React.createElement("section", {
    id: "descend",
    style: css('position:relative;z-index:1;height:112vh;display:flex;align-items:center;justify-content:center;overflow:hidden')
  }, /*#__PURE__*/React.createElement("canvas", {
    id: "sub-canvas",
    style: css('position:absolute;inset:0;width:100%;height:100%;z-index:-1')
  }), /*#__PURE__*/React.createElement("div", {
    className: "reveal",
    style: css('text-align:center;max-width:660px;padding:0 8vw;position:relative')
  }, /*#__PURE__*/React.createElement(SectionHeading, {
    size: "serif",
    align: "center"
  }, "Descending deeper"), /*#__PURE__*/React.createElement("p", {
    style: css('font-family:Cormorant Garamond,serif;font-style:italic;font-weight:500;font-size:clamp(18px,2.2vw,26px);color:#8EA6AD;margin-top:22px;line-height:1.5')
  }, "Beyond the surface, past the noise \u2014 into the depths where real engineering lives.")));
}
window.DescendSection = DescendSection;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/marketing-site/DescendSection.jsx", error: String((e && e.message) || e) }); }

// ui_kits/marketing-site/Hero.jsx
try { (() => {
// Hero — surface: the ship rides the animated waterline (hero-canvas), depth begins here.
const DS = window.DissolveLabsDesignSystem_0564f1;
const {
  Eyebrow,
  SectionHeading,
  GradientText,
  Button
} = DS;
const css = window.css;
function Hero({
  onContact,
  onWork
}) {
  return /*#__PURE__*/React.createElement("section", {
    id: "hero",
    style: css('position:relative;z-index:1;min-height:100vh;display:flex;align-items:center;padding:0 8vw;overflow:hidden')
  }, /*#__PURE__*/React.createElement("canvas", {
    id: "hero-canvas",
    style: css('position:absolute;inset:0;width:100%;height:100%;z-index:-1')
  }), /*#__PURE__*/React.createElement("div", {
    style: css('max-width:780px;position:relative')
  }, /*#__PURE__*/React.createElement(Eyebrow, {
    style: css('margin-bottom:22px')
  }, "Premium Software Studio"), /*#__PURE__*/React.createElement(SectionHeading, {
    size: "display",
    as: "h1"
  }, "Ideas, ", /*#__PURE__*/React.createElement(GradientText, null, "dissolved"), " into software."), /*#__PURE__*/React.createElement("p", {
    style: css('font-family:Manrope;font-weight:400;font-size:clamp(16px,1.4vw,19px);line-height:1.6;color:#9BA8B4;margin-top:28px;max-width:560px')
  }, "We build bespoke software, AI systems, and digital products for companies that want to move faster than their competition."), /*#__PURE__*/React.createElement("div", {
    style: css('display:flex;gap:16px;margin-top:38px;flex-wrap:wrap')
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "md",
    onClick: onContact
  }, "Start a Project"), /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    size: "md",
    onClick: onWork
  }, "Explore Our Work"))), /*#__PURE__*/React.createElement("div", {
    id: "scroll-ind",
    style: css('position:absolute;bottom:34px;left:50%;transform:translateX(-50%);text-align:center;transition:opacity .4s')
  }, /*#__PURE__*/React.createElement("div", {
    style: css('font-family:Sora;font-weight:600;font-size:12px;letter-spacing:3px;text-transform:uppercase;color:#7FA6AE')
  }, "Descend \u2193"), /*#__PURE__*/React.createElement("div", {
    style: css('width:1px;height:46px;margin:14px auto 0;background:linear-gradient(to bottom,#33E0DE,transparent);animation:scrollLine 2.4s ease-in-out infinite')
  })));
}
window.Hero = Hero;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/marketing-site/Hero.jsx", error: String((e && e.message) || e) }); }

// ui_kits/marketing-site/ServicesSection.jsx
try { (() => {
// ServicesSection — mid-water: four expanding feature cards, each with a live
// canvas visualisation (data-svc: matrix | robot | neural | blueprint).
const DS = window.DissolveLabsDesignSystem_0564f1;
const {
  Eyebrow,
  SectionHeading
} = DS;
const css = window.css;
const SERVICES = [{
  svc: 'matrix',
  label: 'Software',
  title: 'Custom Software Engineering',
  desc: 'We architect and build tailored software that scales with your ambition — from internal tools to full SaaS platforms.'
}, {
  svc: 'robot',
  label: 'Robotics',
  title: 'Robotics & Automation',
  desc: 'Intelligent robotic systems that extend human capability, automate physical operations, and integrate with your existing workflows.'
}, {
  svc: 'neural',
  label: 'AI',
  title: 'Applied AI Systems',
  desc: 'From RAG pipelines to multimodal agents — we build AI that actually ships and delivers measurable business outcomes.'
}, {
  svc: 'blueprint',
  label: 'Product',
  title: 'Product Development',
  desc: 'Concept to launch. We shape raw ideas into refined, validated products through rigorous design, prototyping, and iteration.'
}];
function SvcCard({
  svc,
  label,
  title,
  desc
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "svc-card",
    style: css('flex:1 1 50%;position:relative;border-radius:20px;overflow:hidden;border:1px solid rgba(38,208,206,.4);background:#050e18')
  }, /*#__PURE__*/React.createElement("canvas", {
    "data-svc": svc,
    style: css('position:absolute;inset:0;width:100%;height:100%')
  }), /*#__PURE__*/React.createElement("div", {
    style: css('position:absolute;inset:0;background:linear-gradient(to top,#03090f 18%,rgba(3,9,15,.2) 55%,transparent 80%)')
  }), /*#__PURE__*/React.createElement("div", {
    style: css('position:absolute;top:26px;left:28px;font-family:Sora;font-weight:600;font-size:12px;letter-spacing:2px;text-transform:uppercase;color:#5CC6C4')
  }, label), /*#__PURE__*/React.createElement("div", {
    style: css('position:absolute;left:28px;right:28px;bottom:28px')
  }, /*#__PURE__*/React.createElement("h3", {
    style: css('font-family:Sora;font-weight:700;font-size:clamp(22px,2.5vw,40px);color:#F2F7F8;letter-spacing:-1px')
  }, title, " ", /*#__PURE__*/React.createElement("span", {
    className: "svc-arrow",
    style: css('display:inline-block;opacity:.4;transition:transform .4s,opacity .4s;color:#33E0DE')
  }, "\u2192")), /*#__PURE__*/React.createElement("p", {
    className: "svc-desc",
    style: css('font-family:Manrope;font-size:16px;line-height:1.6;color:#9BA8B4;margin-top:14px;max-width:440px')
  }, desc)));
}
function ServicesSection() {
  return /*#__PURE__*/React.createElement("section", {
    id: "services",
    style: css('position:relative;z-index:1;padding:110px 6vw 130px')
  }, /*#__PURE__*/React.createElement("div", {
    className: "reveal",
    style: css('max-width:720px;margin:0 auto 60px;text-align:center')
  }, /*#__PURE__*/React.createElement(Eyebrow, {
    style: css('margin-bottom:16px')
  }, "Mid-water \u2014 what we do"), /*#__PURE__*/React.createElement(SectionHeading, {
    size: "lg"
  }, "Engineering, top to bottom")), /*#__PURE__*/React.createElement("div", {
    className: "svc-pair",
    style: css('display:flex;gap:20px;height:78vh;min-height:520px;margin-bottom:22px')
  }, /*#__PURE__*/React.createElement(SvcCard, SERVICES[0]), /*#__PURE__*/React.createElement(SvcCard, SERVICES[1])), /*#__PURE__*/React.createElement("div", {
    className: "svc-pair",
    style: css('display:flex;gap:20px;height:78vh;min-height:520px')
  }, /*#__PURE__*/React.createElement(SvcCard, SERVICES[2]), /*#__PURE__*/React.createElement(SvcCard, SERVICES[3])));
}
window.ServicesSection = ServicesSection;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/marketing-site/ServicesSection.jsx", error: String((e && e.message) || e) }); }

// ui_kits/marketing-site/Site.jsx
try { (() => {
// Site — assembles the full landing page: fixed depth/cursor layers, the frosted
// NavBar, and every section. Boots the DepthEngine after mount.
const DS = window.DissolveLabsDesignSystem_0564f1;
const {
  NavBar
} = DS;
const css = window.css;
const {
  useEffect
} = React;
const Hero = window.Hero;
const WorkSection = window.WorkSection;
const ServicesSection = window.ServicesSection;
const DescendSection = window.DescendSection;
const ContactSection = window.ContactSection;
const SiteFooter = window.SiteFooter;
function scrollToId(id) {
  const el = document.getElementById(id);
  if (el) window.scrollTo({
    top: el.getBoundingClientRect().top + scrollY - 10,
    behavior: 'smooth'
  });
}
const toTop = () => window.scrollTo({
  top: 0,
  behavior: 'smooth'
});
function Site() {
  useEffect(() => {
    const e = new window.DepthEngine();
    e.attach();
    return () => e.detach();
  }, []);
  return /*#__PURE__*/React.createElement("div", {
    style: css('position:relative;width:100%;overflow-x:hidden')
  }, /*#__PURE__*/React.createElement("div", {
    id: "depth-bg",
    style: css('position:fixed;inset:0;z-index:-3;background:#0D2B45')
  }), /*#__PURE__*/React.createElement("canvas", {
    id: "rays-canvas",
    style: css('position:fixed;inset:0;width:100%;height:100%;z-index:-2;pointer-events:none')
  }), /*#__PURE__*/React.createElement("canvas", {
    id: "particles-canvas",
    style: css('position:fixed;inset:0;width:100%;height:100%;z-index:0;pointer-events:none')
  }), /*#__PURE__*/React.createElement("div", {
    id: "vignette",
    style: css('position:fixed;inset:0;z-index:3;pointer-events:none;opacity:0;background:radial-gradient(ellipse 120% 90% at 50% 50%,transparent 40%,rgba(0,0,0,.55) 78%,rgba(0,0,0,.9) 100%)')
  }), /*#__PURE__*/React.createElement("div", {
    id: "cursor-ring",
    style: css('position:fixed;top:0;left:0;width:34px;height:34px;margin:-17px 0 0 -17px;border:1.5px solid rgba(107,235,232,.7);border-radius:50%;z-index:9998;pointer-events:none;transition:width .25s,height .25s,margin .25s')
  }), /*#__PURE__*/React.createElement("div", {
    id: "cursor-dot",
    style: css('position:fixed;top:0;left:0;width:5px;height:5px;margin:-2.5px 0 0 -2.5px;background:#33E0DE;border-radius:50%;z-index:9999;pointer-events:none;box-shadow:0 0 8px #33E0DE')
  }), /*#__PURE__*/React.createElement(NavBar, {
    onBrandClick: toTop,
    links: [{
      label: 'Services',
      onClick: () => scrollToId('services')
    }, {
      label: 'Work',
      onClick: () => scrollToId('events')
    }, {
      label: 'About',
      onClick: () => scrollToId('descend')
    }, {
      label: 'Contact',
      onClick: () => scrollToId('contact')
    }],
    cta: {
      label: 'Start a Project',
      onClick: () => scrollToId('contact')
    }
  }), /*#__PURE__*/React.createElement(Hero, {
    onContact: () => scrollToId('contact'),
    onWork: () => scrollToId('events')
  }), /*#__PURE__*/React.createElement(WorkSection, null), /*#__PURE__*/React.createElement(ServicesSection, null), /*#__PURE__*/React.createElement(DescendSection, null), /*#__PURE__*/React.createElement(ContactSection, null), /*#__PURE__*/React.createElement(SiteFooter, null));
}
ReactDOM.createRoot(document.getElementById('root')).render(/*#__PURE__*/React.createElement(Site, null));
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/marketing-site/Site.jsx", error: String((e && e.message) || e) }); }

// ui_kits/marketing-site/SiteFooter.jsx
try { (() => {
// SiteFooter — the seabed. Corals, anemones, sea stars & an anchor render into
// seabed-canvas. Large serif wordmark closes the descent.
const DS = window.DissolveLabsDesignSystem_0564f1;
const {
  Wordmark
} = DS;
const css = window.css;
function SiteFooter() {
  return /*#__PURE__*/React.createElement("footer", {
    style: css('position:relative;z-index:1;height:92vh;min-height:640px;overflow:hidden;display:flex;flex-direction:column;justify-content:flex-end')
  }, /*#__PURE__*/React.createElement("canvas", {
    id: "seabed-canvas",
    style: css('position:absolute;inset:0;width:100%;height:100%;z-index:-1')
  }), /*#__PURE__*/React.createElement("div", {
    style: css('position:absolute;top:0;left:0;right:0;height:1.5px;background:linear-gradient(90deg,transparent,#26D0CE 25%,#6BEBE8 50%,#26D0CE 75%,transparent);box-shadow:0 0 30px rgba(38,208,206,.8)')
  }), /*#__PURE__*/React.createElement("div", {
    style: css('position:absolute;inset:0;background:linear-gradient(to bottom,transparent 0%,rgba(2,4,8,.6) 62%,rgba(2,4,8,.85) 100%)')
  }), /*#__PURE__*/React.createElement("div", {
    style: css('position:relative;padding:0 7vw 60px')
  }, /*#__PURE__*/React.createElement("div", {
    style: css('display:flex;justify-content:space-between;align-items:flex-end;flex-wrap:wrap;gap:30px')
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Wordmark, {
    variant: "serif",
    style: css('line-height:.9')
  }), /*#__PURE__*/React.createElement("a", {
    href: "mailto:contact@dissolvelabs.com",
    style: css('display:inline-block;font-family:Manrope;font-size:15px;color:#26D0CE;margin-top:14px')
  }, "contact@dissolvelabs.com")), /*#__PURE__*/React.createElement("div", {
    style: css('text-align:right')
  }, /*#__PURE__*/React.createElement("div", {
    style: css('font-family:Cormorant Garamond,serif;font-style:italic;font-size:20px;color:#8EA6AD')
  }, "Ideas, dissolved into software."), /*#__PURE__*/React.createElement("div", {
    style: css('font-family:Manrope;font-size:13px;color:#3C4A55;margin-top:12px')
  }, "\xA9 2026 Dissolve Labs")))));
}
window.SiteFooter = SiteFooter;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/marketing-site/SiteFooter.jsx", error: String((e && e.message) || e) }); }

// ui_kits/marketing-site/WorkSection.jsx
try { (() => {
// WorkSection ("events") — below the surface: three parallax rows of media tiles
// with generative canvas backgrounds (data-ev = style 1|2|3, drawn by DepthEngine).
const DS = window.DissolveLabsDesignSystem_0564f1;
const {
  Eyebrow,
  SectionHeading
} = DS;
const css = window.css;
const EV_DESCS = {
  'Signal Conf': 'Product & platform engineering',
  'Interface': 'Design systems at scale',
  'Frontier AI': 'Applied machine intelligence',
  'Craft & Code': 'Front-end deep dives',
  'Momentum': 'Where founders meet builders',
  'Deep Dive Summit': 'Systems thinking, live',
  'Automate': 'Robotics & embodied AI',
  'Horizon': 'What ships next',
  'Refract': 'Immersive & spatial computing'
};
const EV_ROWS = [[['Signal Conf', 1], ['Interface', 1], ['Frontier AI', 1]], [['Craft & Code', 2], ['Momentum', 2], ['Deep Dive Summit', 2]], [['Automate', 3], ['Horizon', 3], ['Refract', 3]]];
function EvCard(name, style, i) {
  return /*#__PURE__*/React.createElement("div", {
    key: i,
    className: "ev-card",
    style: css('flex:0 0 auto;width:clamp(220px,18vw,300px);aspect-ratio:2/3;position:relative;border:1px solid rgba(255,255,255,.12);border-radius:16px;overflow:hidden;background:#081A2C;backdrop-filter:blur(4px)')
  }, /*#__PURE__*/React.createElement("canvas", {
    "data-ev": style,
    style: css('position:absolute;inset:0;width:100%;height:100%')
  }), /*#__PURE__*/React.createElement("div", {
    style: css('position:absolute;inset:0;background:linear-gradient(to top,#04101c 10%,rgba(4,16,28,.1) 55%,transparent 75%)')
  }), /*#__PURE__*/React.createElement("div", {
    style: css('position:absolute;left:18px;right:18px;bottom:18px')
  }, /*#__PURE__*/React.createElement("div", {
    style: css('font-family:Sora;font-weight:700;font-size:21px;color:#F2F7F8;letter-spacing:-.3px')
  }, name), /*#__PURE__*/React.createElement("div", {
    style: css('font-family:Manrope;font-size:13px;color:#7F9AA2;margin-top:5px')
  }, EV_DESCS[name] || '')));
}
function WorkSection() {
  return /*#__PURE__*/React.createElement("section", {
    id: "events",
    style: css('position:relative;z-index:1;padding:150px 0 120px')
  }, /*#__PURE__*/React.createElement("div", {
    className: "reveal",
    style: css('text-align:center;margin-bottom:64px;padding:0 8vw')
  }, /*#__PURE__*/React.createElement(Eyebrow, {
    style: css('margin-bottom:16px')
  }, "Below the surface"), /*#__PURE__*/React.createElement(SectionHeading, {
    size: "lg"
  }, "Dissolve Labs At"), /*#__PURE__*/React.createElement("p", {
    style: css('font-family:Manrope;font-size:17px;color:#9BA8B4;margin-top:16px')
  }, "The conferences, summits, and rooms where the next decade gets built.")), /*#__PURE__*/React.createElement("div", {
    style: css('display:flex;flex-direction:column;gap:24px')
  }, EV_ROWS.map((row, ri) => /*#__PURE__*/React.createElement("div", {
    key: ri,
    style: css('overflow:hidden;padding:6px 0')
  }, /*#__PURE__*/React.createElement("div", {
    "data-ev-row": ri,
    className: "ev-grid",
    style: css('display:flex;gap:24px;justify-content:center;will-change:transform')
  }, row.map(([name, style], i) => EvCard(name, style, i)))))));
}
window.WorkSection = WorkSection;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/marketing-site/WorkSection.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Eyebrow = __ds_scope.Eyebrow;

__ds_ns.GradientText = __ds_scope.GradientText;

__ds_ns.SectionHeading = __ds_scope.SectionHeading;

__ds_ns.Wordmark = __ds_scope.Wordmark;

__ds_ns.NavBar = __ds_scope.NavBar;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.GlassPanel = __ds_scope.GlassPanel;

__ds_ns.MediaCard = __ds_scope.MediaCard;

})();
