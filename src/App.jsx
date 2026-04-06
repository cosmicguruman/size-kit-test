import { useState, useEffect } from "react";
import ReactDOM from "react-dom";

const FINGERS = ["Thumb", "Index", "Middle", "Ring", "Pinky"];
const TAG_PRESETS = ["Friends & family", "Shopify", "Etsy", "Test"];
const OVERRIDE_REASONS = ["Brand runs small", "Brand runs large", "Customer preference", "Doesn't look right", "Other"];

const THEME = {
  cosmic: '#0E0A1A',
  cosmicMid: '#1A0E2E',
  cosmicEnd: '#2A1548',
  cream: '#FEF6F0',
  pink: '#E8629A',
  pinkLight: '#F9A8D4',
  purple: '#A855F7',
  purpleDark: '#7C3AED',
  lavender: '#C4B5FD',
  teal: '#6ECFBD',
  tealDark: '#4ABEAA',
  green: '#16a34a',
  greenBg: '#dcfce7',
  greenBd: '#bbf7d0',
  text: '#18181b',
  textMuted: '#71717a',
  textFaint: '#a1a1aa',
  border: '#f4f4f5',
  cardBg: 'white',
  fontDisplay: "'Fraunces', Georgia, serif",
  fontBody: "'Outfit', -apple-system, sans-serif",
  radiusCard: 20,
  radiusSheet: 26,
  radiusPill: 100,
  maxWidth: 660,
  mobileBreak: 520,
};

const FINGER_PHOTOS = {
  'left-Thumb': '/fingers/left-thumb.png',
  'left-Index': '/fingers/left-index.png',
  'left-Middle': '/fingers/left-middle.png',
  'left-Ring': '/fingers/left-ring.png',
  'left-Pinky': '/fingers/left-pinky.png',
  'right-Thumb': '/fingers/right-thumb.png',
  'right-Index': '/fingers/right-index.png',
  'right-Middle': '/fingers/right-middle.png',
  'right-Ring': '/fingers/right-ring.png',
  'right-Pinky': '/fingers/right-pinky.png',
};

function NailShape({ size = 52 }) {
  return (
    <div style={{
      width: size, height: size * 1.2,
      borderRadius: "44% 44% 46% 46%",
      background: `linear-gradient(170deg, ${THEME.pinkLight} 0%, ${THEME.pink} 50%, ${THEME.purpleDark} 100%)`,
      boxShadow: "inset 0 1px 4px rgba(255,255,255,0.35), inset 0 -2px 3px rgba(0,0,0,0.04), 0 1px 3px rgba(0,0,0,0.06)",
    }} />
  );
}

function NailShapeLarge({ showOverlay = false }) {
  return (
    <div style={{
      width: "100%", aspectRatio: "3/4",
      borderRadius: 16,
      background: `linear-gradient(170deg, ${THEME.pinkLight} 0%, ${THEME.pink} 40%, ${THEME.purpleDark} 100%)`,
      boxShadow: "inset 0 2px 6px rgba(255,255,255,0.3), inset 0 -3px 4px rgba(0,0,0,0.04), 0 2px 6px rgba(0,0,0,0.06)",
      position: "relative", overflow: "hidden",
    }}>
      {showOverlay && (
        <>
          <div style={{ position: "absolute", top: "45%", left: "14%", right: "14%", height: 2, background: `rgba(232,98,154,0.6)` }} />
          <div style={{ position: "absolute", top: "calc(45% - 4px)", left: "14%", width: 10, height: 10, borderRadius: 100, background: THEME.pink, border: "2px solid white", boxShadow: "0 1px 3px rgba(0,0,0,0.15)" }} />
          <div style={{ position: "absolute", top: "calc(45% - 4px)", right: "14%", width: 10, height: 10, borderRadius: 100, background: THEME.pink, border: "2px solid white", boxShadow: "0 1px 3px rgba(0,0,0,0.15)" }} />
        </>
      )}
    </div>
  );
}

const MOCK_CUSTOMERS = [
  {
    id: 1, name: "Sarah Mitchell", date: "Feb 14, 2026", scanComplete: true, outcome: null, outcomeFingers: [], overrides: {}, changelog: [], manual: false,
    scans: [{ id: 1, date: "Feb 14, 2026", status: "active" }],
    notes: [{ id: 1, date: "Feb 14, 2026", text: "First-time client, referred by Jessica. Prefers natural look." }],
    mm: { left: { Thumb: 12.1, Index: 9.8, Middle: 9.5, Ring: 9.1, Pinky: 6.8 }, right: { Thumb: 12.4, Index: 9.4, Middle: 9.8, Ring: 9.3, Pinky: 6.8 } },
    coinMm: { left: { Thumb: 12.3, Index: 9.7, Middle: 9.6, Ring: 9.0, Pinky: 6.9 }, right: { Thumb: 12.2, Index: 9.5, Middle: 9.7, Ring: 9.4, Pinky: 6.7 } },
    borderline: { "left-Middle": 5, "right-Ring": 5 },
    photos: {
      "left-Thumb": "/fingers/left-thumb.png", "left-Index": "/fingers/left-index.png", "left-Middle": "/fingers/left-middle.png", "left-Ring": "/fingers/left-ring.png", "left-Pinky": "/fingers/left-pinky.png",
      "right-Thumb": "/fingers/right-thumb.png", "right-Index": "/fingers/right-index.png", "right-Middle": "/fingers/right-middle.png", "right-Ring": "/fingers/right-ring.png", "right-Pinky": "/fingers/right-pinky.png",
    },
    brands: [],
  },
  {
    id: 2, name: "Jessica Torres", date: "Feb 13, 2026", scanComplete: true, outcome: "perfect", outcomeFingers: [], overrides: {}, changelog: [], manual: false,
    scans: [{ id: 1, date: "Feb 13, 2026", status: "active" }],
    mm: { left: { Thumb: 11.9, Index: 9.2, Middle: 9.6, Ring: 8.9, Pinky: 7.2 }, right: { Thumb: 12.4, Index: 9.4, Middle: 9.5, Ring: 9.0, Pinky: 7.0 } },
    coinMm: { left: { Thumb: 11.8, Index: 9.3, Middle: 9.5, Ring: 9.0, Pinky: 7.1 }, right: { Thumb: 12.3, Index: 9.5, Middle: 9.4, Ring: 9.1, Pinky: 7.1 } },
    borderline: { "right-Ring": 7 },
    photos: {
      "left-Thumb": "/fingers/left-thumb.png", "left-Index": "/fingers/left-index.png", "left-Middle": "/fingers/left-middle.png", "left-Ring": "/fingers/left-ring.png", "left-Pinky": "/fingers/left-pinky.png",
      "right-Thumb": "/fingers/right-thumb.png", "right-Index": "/fingers/right-index.png", "right-Middle": "/fingers/right-middle.png", "right-Ring": "/fingers/right-ring.png", "right-Pinky": "/fingers/right-pinky.png",
    },
    brands: [
      { name: "Apres", shape: "Coffin", variant: "Medium",
        left: { Thumb: 2, Index: 6, Middle: 5, Ring: 6, Pinky: 8 },
        right: { Thumb: 1, Index: 5, Middle: 5, Ring: 6, Pinky: 8 } },
    ],
  },
  {
    id: 3, name: "Amanda Chen", date: "Feb 14, 2026", scanComplete: false, outcome: null, outcomeFingers: [], overrides: {}, changelog: [], manual: false,
    scans: [{ id: 1, date: "Feb 14, 2026", status: "pending" }],
    mm: { left: {}, right: {} }, coinMm: { left: {}, right: {} }, borderline: {},
    brands: [{ name: "PLA Tips", shape: "Coffin", variant: "Short", left: {}, right: {} }],
  },
  {
    id: 4, name: "Brianna Lopez", date: "Feb 12, 2026", scanComplete: true, outcome: "close",
    scans: [{ id: 1, date: "Feb 12, 2026", status: "active" }],
    notes: [
      { id: 1, date: "Feb 10, 2026", text: "Left ring finger runs small — keep an eye on this." },
      { id: 2, date: "Feb 12, 2026", text: "Rescanned after initial fit issue. Much better results." },
    ],
    outcomeFingers: [{ hand: "left", finger: "Ring", direction: "small" }],
    overrides: { "left-Ring-Supplies by Chloe": { newSize: 8, reason: "corrected" } }, changelog: [], manual: false,
    mm: { left: { Thumb: 12.6, Index: 9.1, Middle: 9.7, Ring: 8.6, Pinky: 6.9 }, right: { Thumb: 12.5, Index: 9.2, Middle: 9.6, Ring: 8.7, Pinky: 7.0 } },
    coinMm: { left: { Thumb: 12.5, Index: 9.2, Middle: 9.6, Ring: 8.7, Pinky: 7.0 }, right: { Thumb: 12.4, Index: 9.3, Middle: 9.7, Ring: 8.6, Pinky: 6.9 } },
    borderline: { "left-Ring": 8 },
    photos: {
      "left-Thumb": "/fingers/left-thumb.png", "left-Index": "/fingers/left-index.png", "left-Middle": "/fingers/left-middle.png", "left-Ring": "/fingers/left-ring.png", "left-Pinky": "/fingers/left-pinky.png",
      "right-Thumb": "/fingers/right-thumb.png", "right-Index": "/fingers/right-index.png", "right-Middle": "/fingers/right-middle.png", "right-Ring": "/fingers/right-ring.png", "right-Pinky": "/fingers/right-pinky.png",
    },
    brands: [
      { name: "Supplies by Chloe", shape: "Soft Square", variant: "Short",
        left: { Thumb: 1, Index: 6, Middle: 5, Ring: 7, Pinky: 9 },
        right: { Thumb: 1, Index: 6, Middle: 5, Ring: 7, Pinky: 9 } },
    ],
  },
  {
    id: 5, name: "Taylor Kim", date: "Feb 10, 2026", scanComplete: true, outcome: null, outcomeFingers: [], overrides: {}, changelog: [], manual: false,
    scans: [{ id: 1, date: "Feb 10, 2026", status: "active" }],
    mm: { left: { Thumb: 12.0, Index: 9.0, Middle: 9.4, Ring: 8.8, Pinky: 6.7 }, right: { Thumb: 12.1, Index: 9.1, Middle: 9.3, Ring: 8.9, Pinky: 6.8 } },
    coinMm: { left: { Thumb: 12.1, Index: 9.1, Middle: 9.3, Ring: 8.9, Pinky: 6.8 }, right: { Thumb: 12.0, Index: 9.0, Middle: 9.4, Ring: 8.8, Pinky: 6.7 } },
    borderline: {},
    photos: {
      "left-Thumb": "/fingers/left-thumb.png", "left-Index": "/fingers/left-index.png", "left-Middle": "/fingers/left-middle.png", "left-Ring": "/fingers/left-ring.png", "left-Pinky": "/fingers/left-pinky.png",
      "right-Thumb": "/fingers/right-thumb.png", "right-Index": "/fingers/right-index.png", "right-Middle": "/fingers/right-middle.png", "right-Ring": "/fingers/right-ring.png", "right-Pinky": "/fingers/right-pinky.png",
    },
    brands: [
      { name: "Tomicca", shape: "Almond", variant: "Short",
        left: { Thumb: 2, Index: 5, Middle: 4, Ring: 5, Pinky: 11 },
        right: { Thumb: 2, Index: 5, Middle: 4, Ring: 5, Pinky: 11 } },
      { name: "Apres", shape: "Coffin", variant: "Medium",
        left: { Thumb: 3, Index: 6, Middle: 5, Ring: 6, Pinky: 9 },
        right: { Thumb: 3, Index: 6, Middle: 5, Ring: 6, Pinky: 9 } },
    ],
  },
  {
    id: 6, name: "Destiny Williams", date: "Feb 11, 2026", scanComplete: true, outcome: "perfect", outcomeFingers: [], overrides: {}, changelog: [], manual: false,
    scans: [{ id: 1, date: "Feb 11, 2026", status: "active" }],
    mm: { left: { Thumb: 11.5, Index: 9.3, Middle: 9.1, Ring: 8.7, Pinky: 7.0 }, right: { Thumb: 11.6, Index: 9.2, Middle: 9.0, Ring: 8.8, Pinky: 7.1 } },
    coinMm: { left: { Thumb: 11.5, Index: 9.3, Middle: 9.1, Ring: 8.7, Pinky: 7.0 }, right: { Thumb: 11.6, Index: 9.2, Middle: 9.0, Ring: 8.8, Pinky: 7.1 } },
    borderline: {},
    photos: {
      "left-Thumb": "/fingers/left-thumb.png", "left-Index": "/fingers/left-index.png", "left-Middle": "/fingers/left-middle.png", "left-Ring": "/fingers/left-ring.png", "left-Pinky": "/fingers/left-pinky.png",
      "right-Thumb": "/fingers/right-thumb.png", "right-Index": "/fingers/right-index.png", "right-Middle": "/fingers/right-middle.png", "right-Ring": "/fingers/right-ring.png", "right-Pinky": "/fingers/right-pinky.png",
    },
    brands: [{ name: "Beetles", shape: "Coffin", variant: "Medium", left: { Thumb: 3, Index: 5, Middle: 6, Ring: 6, Pinky: 8 }, right: { Thumb: 3, Index: 5, Middle: 6, Ring: 6, Pinky: 8 } }],
  },
  {
    id: 7, name: "Mia Ramirez", date: "Feb 9, 2026", scanComplete: true, outcome: null, outcomeFingers: [], overrides: {}, changelog: [], manual: false,
    scans: [{ id: 1, date: "Feb 9, 2026", status: "active" }],
    mm: { left: { Thumb: 12.8, Index: 10.1, Middle: 9.9, Ring: 9.5, Pinky: 7.4 }, right: { Thumb: 12.7, Index: 10.0, Middle: 9.8, Ring: 9.4, Pinky: 7.3 } },
    coinMm: { left: { Thumb: 12.8, Index: 10.1, Middle: 9.9, Ring: 9.5, Pinky: 7.4 }, right: { Thumb: 12.7, Index: 10.0, Middle: 9.8, Ring: 9.4, Pinky: 7.3 } },
    borderline: { "left-Index": 4 },
    photos: {
      "left-Thumb": "/fingers/left-thumb.png", "left-Index": "/fingers/left-index.png", "left-Middle": "/fingers/left-middle.png", "left-Ring": "/fingers/left-ring.png", "left-Pinky": "/fingers/left-pinky.png",
      "right-Thumb": "/fingers/right-thumb.png", "right-Index": "/fingers/right-index.png", "right-Middle": "/fingers/right-middle.png", "right-Ring": "/fingers/right-ring.png", "right-Pinky": "/fingers/right-pinky.png",
    },
    brands: [{ name: "Una Gella", shape: "Almond", variant: "Short", left: { Thumb: 1, Index: 3, Middle: 4, Ring: 5, Pinky: 8 }, right: { Thumb: 1, Index: 3, Middle: 4, Ring: 5, Pinky: 8 } }],
  },
  {
    id: 8, name: "Kayla Washington", date: "Feb 8, 2026", scanComplete: true, outcome: "off",
    scans: [{ id: 1, date: "Feb 8, 2026", status: "active" }],
    outcomeFingers: [{ hand: "right", finger: "Thumb", direction: "small" }, { hand: "right", finger: "Pinky", direction: "big" }],
    overrides: {}, changelog: [], manual: false,
    mm: { left: { Thumb: 11.2, Index: 8.8, Middle: 9.2, Ring: 8.5, Pinky: 6.5 }, right: { Thumb: 11.3, Index: 8.9, Middle: 9.1, Ring: 8.6, Pinky: 6.6 } },
    coinMm: { left: { Thumb: 11.2, Index: 8.8, Middle: 9.2, Ring: 8.5, Pinky: 6.5 }, right: { Thumb: 11.3, Index: 8.9, Middle: 9.1, Ring: 8.6, Pinky: 6.6 } },
    borderline: {},
    photos: {
      "left-Thumb": "/fingers/left-thumb.png", "left-Index": "/fingers/left-index.png", "left-Middle": "/fingers/left-middle.png", "left-Ring": "/fingers/left-ring.png", "left-Pinky": "/fingers/left-pinky.png",
      "right-Thumb": "/fingers/right-thumb.png", "right-Index": "/fingers/right-index.png", "right-Middle": "/fingers/right-middle.png", "right-Ring": "/fingers/right-ring.png", "right-Pinky": "/fingers/right-pinky.png",
    },
    brands: [{ name: "Sinokame", shape: "Square", variant: "Short", left: { Thumb: 4, Index: 6, Middle: 5, Ring: 7, Pinky: 10 }, right: { Thumb: 4, Index: 6, Middle: 5, Ring: 7, Pinky: 10 } }],
  },
  {
    id: 9, name: "Lauren Davis", date: "Feb 7, 2026", scanComplete: true, outcome: null, outcomeFingers: [], overrides: {}, changelog: [], manual: true,
    scans: [{ id: 1, date: "Feb 7, 2026", status: "active" }],
    mm: { left: { Thumb: 0, Index: 0, Middle: 0, Ring: 0, Pinky: 0 }, right: { Thumb: 0, Index: 0, Middle: 0, Ring: 0, Pinky: 0 } },
    coinMm: { left: { Thumb: 0, Index: 0, Middle: 0, Ring: 0, Pinky: 0 }, right: { Thumb: 0, Index: 0, Middle: 0, Ring: 0, Pinky: 0 } },
    borderline: {},
    brands: [{ name: "Tomicca", shape: "Almond", variant: "Short", left: { Thumb: 2, Index: 4, Middle: 5, Ring: 5, Pinky: 10 }, right: { Thumb: 2, Index: 4, Middle: 5, Ring: 5, Pinky: 10 } }],
  },
];
// ── Cosmic Header Background ──────────────────────────────
function CosmicBg({ children, padBottom = 60 }) {
  return (
    <div style={{ background: `linear-gradient(170deg, ${THEME.cosmic}, ${THEME.cosmicMid}, ${THEME.cosmicEnd})`, position: 'relative', overflow: 'hidden', paddingBottom: padBottom }}>
      {[
        { size: 200, top: -60, left: -40, colors: 'rgba(168,85,247,0.3), transparent', dur: '8s' },
        { size: 260, top: 20, right: -60, colors: 'rgba(232,98,154,0.25), transparent', dur: '12s' },
        { size: 180, bottom: -30, left: '40%', colors: 'rgba(196,181,253,0.2), transparent', dur: '10s' },
      ].map((b, i) => (
        <div key={i} style={{ position: 'absolute', width: b.size, height: b.size, top: b.top, left: b.left, right: b.right, bottom: b.bottom, background: `radial-gradient(circle, ${b.colors})`, filter: 'blur(40px)', animation: `blobMorph ${b.dur} ease-in-out infinite`, opacity: 0.7 }} />
      ))}
      {Array.from({ length: 18 }, (_, i) => {
        const top = (7 + (i * 37) % 83) + '%';
        const left = (5 + (i * 53) % 89) + '%';
        const size = 1.5 + (i % 3);
        const dur = (2 + (i % 4)) + 's';
        const delay = (i * 0.4) + 's';
        return <div key={'s'+i} style={{ position: 'absolute', top, left, width: size, height: size, borderRadius: '50%', background: 'white', animation: `twinkle ${dur} ease-in-out ${delay} infinite` }} />;
      })}
      {['\u2726','\u2727','\u2726','\u2727'].map((ch, i) => (
        <div key={'sp'+i} style={{ position: 'absolute', fontSize: [14,10,12,8][i], color: [THEME.lavender, THEME.pinkLight, 'white', THEME.lavender][i], top: ['15%','60%','40%','80%'][i], left: ['80%','15%','65%','45%'][i], animation: `sparkleRotate ${3+i}s ease-in-out infinite`, opacity: 0.7 }}>{ch}</div>
      ))}
      <div style={{ position: 'relative', zIndex: 3 }}>
        {children}
      </div>
    </div>
  );
}

function CreamSection({ children, style = {} }) {
  return (
    <div style={{ background: THEME.cream, borderRadius: `${THEME.radiusSheet}px ${THEME.radiusSheet}px 0 0`, marginTop: -36, position: 'relative', zIndex: 2, minHeight: '60vh', paddingBottom: 100, ...style }}>
      {children}
    </div>
  );
}


export default function App() {
  const [customers, setCustomers] = useState(MOCK_CUSTOMERS);
  const [view, setView] = useState("home");
  const [selectedId, setSelectedId] = useState(null);
  const [search, setSearch] = useState("");
  const [fingerDetail, setFingerDetail] = useState(null);
  const [overrideMode, setOverrideMode] = useState(false);
  const [overrideSize, setOverrideSize] = useState(null);
  const [overrideReason, setOverrideReason] = useState("");
  const [outcomeOpen, setOutcomeOpen] = useState(false);
  const [outcomeStep, setOutcomeStep] = useState(1);
  const [tempOutcome, setTempOutcome] = useState(null);
  const [tempFingers, setTempFingers] = useState([]);
  const [addBrandOpen, setAddBrandOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [filter, setFilter] = useState("all");
  const [showWelcome, setShowWelcome] = useState(true);
  const [reviewedFingers, setReviewedFingers] = useState({});
  const [addBrandStep, setAddBrandStep] = useState(1);
  const [addBrandName, setAddBrandName] = useState(null);
  const [addBrandShape, setAddBrandShape] = useState(null);
  const [tipsOpen, setTipsOpen] = useState(false);

  // New Barbie redesign states
  const [searchFocused, setSearchFocused] = useState(false);
  const [curvature, setCurvature] = useState("normal");
  const [isMobile, setIsMobile] = useState(typeof window !== 'undefined' ? window.innerWidth < THEME.mobileBreak : false);
  const [deckOpen, setDeckOpen] = useState(false);
  const [scanHistoryOpen, setScanHistoryOpen] = useState(false);
  const [notesOpen, setNotesOpen] = useState(false);
  const [newNoteText, setNewNoteText] = useState("");
  const [scanPreview, setScanPreview] = useState(null);
  const [customerTags, setCustomerTags] = useState(["Friends & family"]);
  const [showCreateKit, setShowCreateKit] = useState(false);
  const [newKitName, setNewKitName] = useState("");
  const [newKitTags, setNewKitTags] = useState([]);

  // Inject CSS keyframe animations
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes blobMorph {
        0%, 100% { border-radius: 40% 60% 60% 40% / 60% 30% 70% 40%; transform: translate(0, 0) scale(1); }
        25% { border-radius: 50% 50% 40% 60% / 40% 60% 50% 50%; transform: translate(10px, -10px) scale(1.05); }
        50% { border-radius: 60% 40% 50% 50% / 50% 50% 40% 60%; transform: translate(-5px, 5px) scale(0.98); }
        75% { border-radius: 40% 60% 55% 45% / 55% 45% 60% 40%; transform: translate(5px, 10px) scale(1.02); }
      }
      @keyframes twinkle {
        0%, 100% { opacity: 0.2; transform: scale(0.8); }
        50% { opacity: 1; transform: scale(1.2); }
      }
      @keyframes sparkleRotate {
        0% { transform: rotate(0deg) scale(1); opacity: 0.6; }
        50% { transform: rotate(180deg) scale(1.3); opacity: 1; }
        100% { transform: rotate(360deg) scale(1); opacity: 0.6; }
      }
      @keyframes shimmer {
        0% { transform: translateX(-100%); }
        100% { transform: translateX(100%); }
      }
      @keyframes fadeUp {
        from { opacity: 0; transform: translateY(12px); }
        to { opacity: 1; transform: translateY(0); }
      }
      @keyframes springDrop {
        0% { opacity: 0; transform: translateY(-20px) scale(0.95); }
        60% { opacity: 1; transform: translateY(4px) scale(1.02); }
        80% { transform: translateY(-2px) scale(0.99); }
        100% { opacity: 1; transform: translateY(0) scale(1); }
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  // Responsive listener
  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < THEME.mobileBreak);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const sel = customers.find(c => c.id === selectedId);
  const filtered = filter === "all" ? customers : filter === "pending" ? customers.filter(c => !c.scanComplete) : customers.filter(c => c.scanComplete);
  const list = search.trim()
    ? filtered.filter(c => c.name.toLowerCase().includes(search.toLowerCase()) || c.brands.some(b => b.name.toLowerCase().includes(search.toLowerCase())))
    : filtered;
  const needsReview = customers.filter(c => c.scanComplete && !c.outcome);

  const open = id => { setSelectedId(id); setView("customer"); setFingerDetail(null); setOutcomeOpen(false); setAddBrandOpen(false); };
  const home = () => { setView("home"); setSelectedId(null); setFingerDetail(null); setOutcomeOpen(false); setAddBrandOpen(false); setSearch(""); setFilter("all"); setDeckOpen(false); };
  const openFinger = (hand, finger, brandName) => { setFingerDetail({ hand, finger, brandName }); setOverrideMode(false); };
  const dismissFinger = () => { setFingerDetail(null); setOverrideMode(false); };
  const confirmFinger = (overrideKey, newSize, reason) => {
    if (!fingerDetail || !selectedId) return;
    const brandName = fingerDetail.brandName;
    // Save override if size was changed
    if (overrideKey && newSize !== undefined) {
      saveOverride(overrideKey, newSize, reason);
    }
    // Mark current finger as reviewed
    const key = `${selectedId}-${brandName}-${fingerDetail.hand}-${fingerDetail.finger}`;
    setReviewedFingers(prev => ({ ...prev, [key]: true }));
    // Find next unreviewed finger for this brand
    const seq = [];
    ["left", "right"].forEach(h => FINGERS.forEach(f => seq.push({ hand: h, finger: f })));
    const currentIdx = seq.findIndex(s => s.hand === fingerDetail.hand && s.finger === fingerDetail.finger);
    // Look for next unreviewed starting after current, then wrap
    const order = [...seq.slice(currentIdx + 1), ...seq.slice(0, currentIdx)];
    const next = order.find(s => {
      const rk = `${selectedId}-${brandName}-${s.hand}-${s.finger}`;
      return !reviewedFingers[rk];
    });
    if (next) {
      setFingerDetail({ hand: next.hand, finger: next.finger, brandName });
      setOverrideMode(false);
    } else {
      // All done
      setFingerDetail(null); setOverrideMode(false);
    }
  };

  const addBrand = () => {
    if (!addBrandName || !addBrandShape) return;
    const genSizes = (hand) => {
      const sizes = {};
      FINGERS.forEach(f => {
        const mm = sel.mm[hand]?.[f];
        if (mm) sizes[f] = Math.max(0, Math.round((14 - mm) * 1.5));
      });
      return sizes;
    };
    const newBrand = { name: addBrandName, shape: addBrandShape, variant: "Standard", left: genSizes("left"), right: genSizes("right") };
    setCustomers(p => p.map(c => c.id === selectedId ? { ...c, brands: [...c.brands, newBrand] } : c));
    setAddBrandOpen(false); setAddBrandStep(1); setAddBrandName(null); setAddBrandShape(null);
  };

  const saveOverride = (key, newSize, reason) => {
    setCustomers(p => p.map(c => {
      if (c.id !== selectedId) return c;
      const prevSize = c.overrides[key]?.newSize ?? (() => { const parts = key.split("-"); const b = c.brands.find(br => br.name === parts[2]); return b?.[parts[0]]?.[parts[1]]; })();
      const entry = { key, from: prevSize, to: newSize, reason: reason || "Quick edit", time: new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit" }) };
      return { ...c, overrides: { ...c.overrides, [key]: { newSize, reason: reason || "corrected" } }, changelog: [...(c.changelog || []), entry] };
    }));
  };

  const submitOutcome = (d) => {
    setCustomers(p => p.map(c => c.id === selectedId ? { ...c, outcome: d || tempOutcome, outcomeFingers: tempFingers } : c));
    setOutcomeOpen(false); setOutcomeStep(1); setTempOutcome(null); setTempFingers([]);
  };

  const toggleOF = (hand, finger, dir) => {
    setTempFingers(p => {
      const ex = p.find(f => f.hand === hand && f.finger === finger);
      if (ex) { if (ex.direction === dir) return p.filter(f => !(f.hand === hand && f.finger === finger)); return p.map(f => f.hand === hand && f.finger === finger ? { ...f, direction: dir } : f); }
      return [...p, { hand, finger, direction: dir }];
    });
  };

  // ── Nav Bar (shared) ──
  const NavBar = ({ onBack, light = false }) => (
    <div style={{ padding: '14px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative', zIndex: 3 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        {onBack ? (
          <button onClick={onBack} style={{ background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(8px)', border: 'none', width: 36, height: 36, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={light ? THEME.text : 'white'} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5"/><path d="M12 19l-7-7 7-7"/></svg>
          </button>
        ) : (
          <>
            <img src="/sizekit-logo.webp" style={{ width: 36, height: 36, borderRadius: 10, objectFit: 'cover' }} alt="SizeKit" />
            <span style={{ fontFamily: THEME.fontDisplay, fontStyle: 'italic', fontWeight: 900, fontSize: 20, color: 'white' }}>SizeKit</span>
          </>
        )}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <button onClick={() => setNotifOpen(!notifOpen)} style={{ width: 36, height: 36, borderRadius: 10, background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(8px)', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', position: 'relative' }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
          <div style={{ position: 'absolute', top: 6, right: 6, width: 8, height: 8, borderRadius: 4, background: THEME.pink, border: '1.5px solid rgba(14,10,26,0.8)' }} />
        </button>
        <div style={{ width: 36, height: 36, borderRadius: 10, background: `linear-gradient(135deg, ${THEME.purple}, ${THEME.pink})`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: 13, fontWeight: 800 }}>R</div>
      </div>
    </div>
  );


  return (
    <div style={{ fontFamily: THEME.fontBody, background: THEME.cream, minHeight: "100vh", color: THEME.text }}>
      <link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,700;0,800;0,900;1,700;1,800;1,900&family=Outfit:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />

      {/* ════════ HOME ════════ */}
      {view === "home" && (
        <div>
          <CosmicBg padBottom={60}>
            <NavBar />
            {/* Welcome section */}
            <div style={{ padding: '0 24px', paddingTop: 16, paddingBottom: 10 }}>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', color: THEME.pinkLight, marginBottom: 6 }}>HEY ROY</div>
              <h1 style={{ margin: 0, fontSize: isMobile ? 28 : 34, fontWeight: 900, lineHeight: 1.15 }}>
                <span style={{ fontFamily: THEME.fontDisplay, fontStyle: 'italic', color: THEME.pinkLight }}>Welcome back.</span>{' '}
                <span style={{ fontFamily: THEME.fontDisplay, fontStyle: 'italic', color: 'white' }}>Here's your SizeKit.</span>
              </h1>
            </div>
            {/* Create Size Kit CTA */}
            <div style={{ padding: '16px 24px 0' }}>
              <button onClick={() => setShowCreateKit(true)} style={{
                width: '100%', padding: 18, background: `linear-gradient(135deg, ${THEME.pink}, ${THEME.purple})`,
                border: 'none', borderRadius: THEME.radiusCard, color: 'white', fontSize: 16, fontWeight: 700,
                cursor: 'pointer', fontFamily: THEME.fontBody, position: 'relative', overflow: 'hidden',
                boxShadow: `0 6px 24px rgba(232,98,154,0.35)`, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              }}>
                <span style={{ fontSize: 20, fontWeight: 300 }}>+</span> Create Size Kit
                <div style={{ position: 'absolute', top: 0, left: 0, width: '50%', height: '100%', background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)', animation: 'shimmer 3s ease-in-out infinite' }} />
              </button>
            </div>
          </CosmicBg>

          <CreamSection>
            <div style={{ maxWidth: THEME.maxWidth, margin: '0 auto', padding: '28px 20px 0' }}>

              {/* Attention Cards — Stacked Deck */}
              {needsReview.length > 0 && (() => {
                const cards = needsReview.slice(0, 4);
                const cardGradients = [
                  'linear-gradient(140deg, #F472B6 0%, #E8629A 40%, #C084FC 100%)',
                  'linear-gradient(140deg, #D97AEB 0%, #A78BFA 50%, #C4B5FD 100%)',
                  'linear-gradient(140deg, #818CF8 0%, #6D72E8 45%, #A78BFA 100%)',
                  'linear-gradient(140deg, #6ECFBD 0%, #4ABEAA 45%, #6EE7B7 100%)',
                ];
                const stackRotations = [-1.5, 2, -0.5, 1.2];
                const fanRotations = [-2, 1.2, -0.6, 1.8];
                const CARD_H = isMobile ? 138 : 148;
                const PEEK = isMobile ? 40 : 44;
                const GAP = 16;
                const collapsedH = CARD_H + (cards.length - 1) * PEEK;
                const expandedH = cards.length * (CARD_H + GAP) - GAP;
                return (
                  <div style={{ marginBottom: deckOpen ? 28 : 24, maxWidth: isMobile ? '100%' : 520, marginLeft: isMobile ? 0 : 'auto', marginRight: isMobile ? 0 : 'auto' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <h2 style={{ fontSize: isMobile ? 22 : 26, fontWeight: 900, margin: 0, fontFamily: THEME.fontDisplay, fontStyle: 'italic', color: THEME.text }}>Ready to size</h2>
                        <div style={{ minWidth: 28, height: 28, borderRadius: THEME.radiusPill, background: `linear-gradient(135deg, ${THEME.pink}, ${THEME.purple})`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 800, color: 'white', padding: '0 8px' }}>{needsReview.length}</div>
                      </div>
                      <button onClick={() => { setView("allReady"); setSearch(""); }} style={{ background: 'none', border: 'none', fontSize: 13, fontWeight: 600, color: THEME.pink, cursor: 'pointer', fontFamily: THEME.fontBody }}>See all</button>
                    </div>
                    <div style={{
                      position: 'relative',
                      height: deckOpen ? expandedH : collapsedH,
                      transition: 'height 0.45s cubic-bezier(0.34, 1.56, 0.64, 1)',
                      cursor: deckOpen ? 'default' : 'pointer',
                    }} onClick={() => { if (!deckOpen) setDeckOpen(true); }}>
                      {cards.map((c, i) => {
                        const isTop = i === 0;
                        const collapsed = {
                          top: i * PEEK,
                          rotation: stackRotations[i % stackRotations.length],
                          zIndex: cards.length - i,
                          scale: 1 - i * 0.02,
                          xShift: i % 2 === 0 ? -i * 2 : i * 2,
                        };
                        const expanded = {
                          top: i * (CARD_H + GAP),
                          rotation: fanRotations[i % fanRotations.length],
                          zIndex: cards.length + i,
                          scale: 1,
                          xShift: 0,
                        };
                        const s = deckOpen ? expanded : collapsed;
                        return (
                          <button key={c.id} onClick={(e) => { if (deckOpen) { e.stopPropagation(); open(c.id); } }} style={{
                            position: 'absolute',
                            top: s.top,
                            left: 0,
                            width: '100%',
                            height: CARD_H,
                            background: cardGradients[i % cardGradients.length],
                            borderRadius: 24, border: 'none', textAlign: 'left',
                            padding: isMobile ? '20px 22px' : '24px 28px',
                            cursor: 'pointer', fontFamily: THEME.fontBody, color: 'white', overflow: 'hidden',
                            transform: `rotate(${s.rotation}deg) scale(${s.scale}) translateX(${s.xShift}px)`,
                            zIndex: s.zIndex,
                            transition: 'all 0.45s cubic-bezier(0.34, 1.56, 0.64, 1)',
                            boxShadow: isTop || deckOpen
                              ? '0 8px 32px rgba(0,0,0,0.18), 0 2px 8px rgba(0,0,0,0.08)'
                              : `0 ${2 + i * 3}px ${10 + i * 6}px rgba(0,0,0,${0.12 + i * 0.04})`,
                          }}>
                            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '50%', background: 'linear-gradient(180deg, rgba(255,255,255,0.12) 0%, transparent 100%)', borderRadius: '24px 24px 0 0', pointerEvents: 'none' }} />
                            <div style={{ position: 'absolute', top: '-20%', right: '-10%', width: '50%', height: '80%', background: 'radial-gradient(circle, rgba(255,255,255,0.10) 0%, transparent 70%)', pointerEvents: 'none' }} />
                            <div style={{ position: 'relative', zIndex: 1 }}>
                              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                                <div style={{ display: 'inline-flex', alignItems: 'center', fontSize: 9, fontWeight: 800, letterSpacing: 1.2, textTransform: 'uppercase', background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', padding: '5px 14px', borderRadius: THEME.radiusPill, color: 'rgba(255,255,255,0.95)', border: '1px solid rgba(255,255,255,0.15)' }}>READY TO SIZE</div>
                                <div style={{ width: 34, height: 34, borderRadius: 11, background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(255,255,255,0.12)', opacity: (deckOpen || isTop) ? 1 : 0, transition: 'opacity 0.3s' }}>
                                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round"><path d="M9 18l6-6-6-6"/></svg>
                                </div>
                              </div>
                              <div style={{ fontSize: isMobile ? 22 : 26, fontWeight: 900, fontFamily: THEME.fontDisplay, fontStyle: 'italic', lineHeight: 1.1, marginBottom: 6, textShadow: '0 2px 12px rgba(0,0,0,0.15)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{c.name}</div>
                              <div style={{ fontSize: isMobile ? 12 : 13, opacity: 0.85, fontWeight: 500, letterSpacing: 0.2 }}>{c.brands[0]?.name ? `${c.brands[0].name} · ${c.brands[0].shape} · ${c.brands[0].variant}` : 'Scan complete · Ready for sizing'}</div>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                    {/* Fan out / collapse control */}
                    {deckOpen ? (
                      <button onClick={() => setDeckOpen(false)} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, margin: '12px auto 0', background: THEME.cardBg, border: `1.5px solid ${THEME.border}`, borderRadius: THEME.radiusPill, fontSize: 12, fontWeight: 600, color: THEME.textMuted, cursor: 'pointer', fontFamily: THEME.fontBody, padding: '8px 20px', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={THEME.textMuted} strokeWidth="2" strokeLinecap="round"><path d="M18 15l-6-6-6 6"/></svg>
                        Collapse
                      </button>
                    ) : cards.length > 1 ? (
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, marginTop: 12, padding: '8px 18px', borderRadius: THEME.radiusPill, background: `linear-gradient(135deg, ${THEME.pink}18, ${THEME.purple}18)`, border: `1px solid ${THEME.pink}30`, width: 'fit-content', margin: '12px auto 0', cursor: 'pointer' }} onClick={() => setDeckOpen(true)}>
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={THEME.pink} strokeWidth="2.5" strokeLinecap="round"><path d="M6 9l6 6 6-6"/></svg>
                        <span style={{ fontSize: 12, fontWeight: 700, color: THEME.pink }}>
                          {needsReview.length > 4 ? `${needsReview.length} ready · Tap to expand` : `${cards.length} ready · Tap to expand`}
                        </span>
                      </div>
                    ) : null}
                  </div>
                );
              })()}

              {/* Customer Roster */}
              <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 14 }}>
                <h2 style={{ fontSize: isMobile ? 22 : 26, fontWeight: 900, margin: 0, fontFamily: THEME.fontDisplay, fontStyle: 'italic', color: THEME.text }}>Your customers</h2>
                <button onClick={() => { setView("allCustomers"); setSearch(""); }} style={{ background: 'none', border: 'none', fontSize: 13, fontWeight: 600, color: THEME.pink, cursor: 'pointer', fontFamily: THEME.fontBody }}>See all ({customers.length})</button>
              </div>

              {/* Search */}
              <div style={{
                background: THEME.cardBg, borderRadius: THEME.radiusCard, padding: '10px 14px',
                display: 'flex', alignItems: 'center', gap: 10,
                border: `1.5px solid ${searchFocused ? THEME.purple : THEME.border}`,
                marginBottom: 16, transition: 'border-color 0.2s',
              }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={THEME.textFaint} strokeWidth="2.5" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
                <input type="text" value={search} onChange={e => setSearch(e.target.value)} onFocus={() => setSearchFocused(true)} onBlur={() => setSearchFocused(false)} placeholder="Search customers..." style={{ border: 'none', outline: 'none', background: 'none', flex: 1, fontSize: 14, fontFamily: THEME.fontBody, color: THEME.text }} />
              </div>

              {/* Customer list */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {(search.trim() ? list : list.slice(0, 5)).map((c, i) => (
                  <button key={c.id} onClick={() => open(c.id)} style={{
                    display: 'flex', alignItems: 'center', gap: 12, width: '100%',
                    background: THEME.cardBg, border: 'none', borderRadius: THEME.radiusCard,
                    padding: '14px 16px', cursor: 'pointer', textAlign: 'left', fontFamily: THEME.fontBody,
                    boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
                    animation: `fadeUp 0.4s ease-out ${i * 0.05}s both`,
                  }}>
                    <div style={{ width: 42, height: 42, borderRadius: 14, background: c.manual ? THEME.border : `linear-gradient(135deg, ${THEME.pinkLight}, ${THEME.lavender})`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: c.manual ? THEME.textMuted : 'white', fontSize: 13, fontWeight: 800, flexShrink: 0 }}>{c.name.split(" ").map(n => n[0]).join("")}</div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 1, display: 'flex', alignItems: 'center', gap: 6 }}>
                        {c.name}
                        {c.manual && <span style={{ fontSize: 9, fontWeight: 700, color: THEME.textFaint, background: THEME.border, padding: '2px 6px', borderRadius: THEME.radiusPill }}>Manual</span>}
                      </div>
                      <div style={{ fontSize: 11, color: THEME.textFaint }}>{c.date}{c.brands[0] ? ` \u00b7 ${c.brands[0].name} \u00b7 ${c.brands[0].shape}` : ""}</div>
                    </div>
                    {!c.scanComplete && <div style={{ fontSize: 10, fontWeight: 700, color: THEME.purpleDark, background: THEME.lavender + '44', padding: '3px 10px', borderRadius: THEME.radiusPill }}>Waiting for scan</div>}
                    {c.scanComplete && !c.outcome && <div style={{ fontSize: 10, fontWeight: 700, color: THEME.pink, background: THEME.pinkLight + '33', padding: '3px 10px', borderRadius: THEME.radiusPill }}>Ready to size</div>}
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#d4d4d8" strokeWidth="2" strokeLinecap="round"><path d="M9 18l6-6-6-6"/></svg>
                  </button>
                ))}
                {list.length === 0 && <div style={{ textAlign: 'center', padding: 40, color: THEME.textFaint, fontSize: 13 }}>No customers found</div>}
              </div>


              {/* Help section */}
              {!search.trim() && (
                <div style={{ marginTop: 28 }}>
                  <div style={{ background: THEME.cardBg, borderRadius: THEME.radiusCard, padding: 20, boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
                    <div style={{ fontSize: 16, fontWeight: 800, color: THEME.text, marginBottom: 4, fontFamily: THEME.fontDisplay }}>We're here to help</div>
                    <div style={{ fontSize: 12, color: THEME.textMuted, lineHeight: 1.5, marginBottom: 14 }}>Questions about sizing, scans, or anything else? Your SizeKit team is just a tap away.</div>
                    <div style={{ display: 'flex', gap: 8 }}>
                      <button style={{ flex: 1, padding: '10px 14px', background: THEME.cosmic, border: 'none', borderRadius: 12, fontSize: 12, fontWeight: 700, color: 'white', cursor: 'pointer', fontFamily: THEME.fontBody, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
                        Book a call
                      </button>
                      <button style={{ flex: 1, padding: '10px 14px', background: 'white', border: `1.5px solid ${THEME.border}`, borderRadius: 12, fontSize: 12, fontWeight: 700, color: THEME.text, cursor: 'pointer', fontFamily: THEME.fontBody, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={THEME.text} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>
                        Send a message
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </CreamSection>
        </div>
      )}

      {/* ════════ ALL READY TO SIZE ════════ */}
      {view === "allReady" && (
        <div>
          <CosmicBg padBottom={46}>
            <div style={{ padding: '14px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative', zIndex: 3 }}>
              <button onClick={home} style={{ background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(8px)', border: 'none', width: 36, height: 36, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5"/><path d="M12 19l-7-7 7-7"/></svg>
              </button>
              <div style={{ minWidth: 28, height: 28, borderRadius: THEME.radiusPill, background: `linear-gradient(135deg, ${THEME.pink}, ${THEME.purple})`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 800, color: 'white', padding: '0 8px' }}>{needsReview.length}</div>
            </div>
            <div style={{ padding: '0 24px 10px' }}>
              <h1 style={{ fontSize: 24, fontWeight: 900, margin: 0, color: 'white', fontFamily: THEME.fontDisplay, fontStyle: 'italic' }}>Ready to size</h1>
            </div>
          </CosmicBg>
          <CreamSection>
            <div style={{ maxWidth: THEME.maxWidth, margin: '0 auto', padding: '24px 20px 0' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {needsReview.map((c, i) => (
                  <button key={c.id} onClick={() => open(c.id)} style={{
                    display: 'flex', alignItems: 'center', gap: 12, width: '100%',
                    background: THEME.cardBg, border: 'none', borderRadius: THEME.radiusCard,
                    padding: '14px 16px', cursor: 'pointer', textAlign: 'left', fontFamily: THEME.fontBody,
                    boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
                    animation: `fadeUp 0.4s ease-out ${i * 0.04}s both`,
                  }}>
                    <div style={{ width: 42, height: 42, borderRadius: 14, background: `linear-gradient(135deg, ${THEME.pinkLight}, ${THEME.lavender})`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: 13, fontWeight: 800, flexShrink: 0 }}>{c.name.split(" ").map(n => n[0]).join("")}</div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 1 }}>{c.name}</div>
                      <div style={{ fontSize: 11, color: THEME.textFaint }}>{c.date}{c.brands[0] ? ` \u00b7 ${c.brands[0].name} \u00b7 ${c.brands[0].shape}` : ' \u00b7 No brands yet'}</div>
                    </div>
                    <div style={{ fontSize: 10, fontWeight: 700, color: THEME.pink, background: THEME.pinkLight + '33', padding: '3px 10px', borderRadius: THEME.radiusPill }}>Ready to size</div>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#d4d4d8" strokeWidth="2" strokeLinecap="round"><path d="M9 18l6-6-6-6"/></svg>
                  </button>
                ))}
                {needsReview.length === 0 && <div style={{ textAlign: 'center', padding: 40, color: THEME.textFaint, fontSize: 13 }}>No customers ready to size</div>}
              </div>
            </div>
          </CreamSection>
        </div>
      )}

      {/* ════════ ALL CUSTOMERS ════════ */}
      {view === "allCustomers" && (
        <div>
          <CosmicBg padBottom={46}>
            <div style={{ padding: '14px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative', zIndex: 3 }}>
              <button onClick={home} style={{ background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(8px)', border: 'none', width: 36, height: 36, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5"/><path d="M12 19l-7-7 7-7"/></svg>
              </button>
              <button onClick={() => setView("addCustomer")} style={{ background: `linear-gradient(135deg, ${THEME.pink}, ${THEME.purple})`, border: 'none', borderRadius: THEME.radiusPill, padding: '8px 16px', fontSize: 12, fontWeight: 700, color: 'white', cursor: 'pointer', fontFamily: THEME.fontBody }}>+ Add Customer</button>
            </div>
            <div style={{ padding: '0 24px 10px' }}>
              <h1 style={{ fontSize: 24, fontWeight: 900, margin: 0, color: 'white', fontFamily: THEME.fontDisplay, fontStyle: 'italic' }}>All Customers</h1>
            </div>
          </CosmicBg>
          <CreamSection>
            <div style={{ maxWidth: THEME.maxWidth, margin: '0 auto', padding: '24px 20px 0' }}>
              <div style={{
                background: THEME.cardBg, borderRadius: THEME.radiusCard, padding: '10px 14px',
                display: 'flex', alignItems: 'center', gap: 10,
                border: `1.5px solid ${searchFocused ? THEME.purple : THEME.border}`,
                marginBottom: 16, transition: 'border-color 0.2s',
              }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={THEME.textFaint} strokeWidth="2.5" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
                <input type="text" value={search} onChange={e => setSearch(e.target.value)} onFocus={() => setSearchFocused(true)} onBlur={() => setSearchFocused(false)} placeholder="Search customers..." style={{ border: 'none', outline: 'none', background: 'none', flex: 1, fontSize: 14, fontFamily: THEME.fontBody, color: THEME.text }} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {list.map((c, i) => (
                  <button key={c.id} onClick={() => open(c.id)} style={{
                    display: 'flex', alignItems: 'center', gap: 12, width: '100%',
                    background: THEME.cardBg, border: 'none', borderRadius: THEME.radiusCard,
                    padding: '14px 16px', cursor: 'pointer', textAlign: 'left', fontFamily: THEME.fontBody,
                    boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
                    animation: `fadeUp 0.4s ease-out ${i * 0.04}s both`,
                  }}>
                    <div style={{ width: 42, height: 42, borderRadius: 14, background: c.manual ? THEME.border : `linear-gradient(135deg, ${THEME.pinkLight}, ${THEME.lavender})`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: c.manual ? THEME.textMuted : 'white', fontSize: 13, fontWeight: 800, flexShrink: 0 }}>{c.name.split(" ").map(n => n[0]).join("")}</div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 1, display: 'flex', alignItems: 'center', gap: 6 }}>
                        {c.name}
                        {c.manual && <span style={{ fontSize: 9, fontWeight: 700, color: THEME.textFaint, background: THEME.border, padding: '2px 6px', borderRadius: THEME.radiusPill }}>Manual</span>}
                      </div>
                      <div style={{ fontSize: 11, color: THEME.textFaint }}>{c.date}{c.brands[0] ? ` \u00b7 ${c.brands[0].name} \u00b7 ${c.brands[0].shape}` : ""}</div>
                    </div>
                    {!c.scanComplete && <div style={{ fontSize: 10, fontWeight: 700, color: THEME.purpleDark, background: THEME.lavender + '44', padding: '3px 10px', borderRadius: THEME.radiusPill }}>Waiting for scan</div>}
                    {c.scanComplete && !c.outcome && <div style={{ fontSize: 10, fontWeight: 700, color: THEME.pink, background: THEME.pinkLight + '33', padding: '3px 10px', borderRadius: THEME.radiusPill }}>Ready to size</div>}
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#d4d4d8" strokeWidth="2" strokeLinecap="round"><path d="M9 18l6-6-6-6"/></svg>
                  </button>
                ))}
              </div>
            </div>
          </CreamSection>
        </div>
      )}


      {/* ════════ CUSTOMER PROFILE ════════ */}
      {view === "customer" && sel && (
        <div>
          <CosmicBg padBottom={70}>
            <div style={{ padding: '14px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative', zIndex: 3 }}>
              <button onClick={home} style={{ background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(8px)', border: 'none', width: 36, height: 36, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5"/><path d="M12 19l-7-7 7-7"/></svg>
              </button>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                {sel.scanComplete && !sel.outcome && (
                  <button onClick={() => { setOutcomeOpen(true); setOutcomeStep(1); setTempOutcome(null); setTempFingers([]); }} style={{
                    background: `linear-gradient(135deg, ${THEME.pink}, ${THEME.purple})`,
                    border: 'none', borderRadius: THEME.radiusPill, padding: '8px 16px',
                    cursor: 'pointer', fontFamily: THEME.fontBody, color: 'white', fontSize: 12, fontWeight: 700,
                  }}>
                    How'd it fit?
                  </button>
                )}
                {sel.outcome && (
                  <span style={{ fontSize: 11, fontWeight: 700, padding: '4px 12px', borderRadius: THEME.radiusPill, background: sel.outcome === "perfect" ? THEME.greenBd : sel.outcome === "close" ? '#e8f5e9' : '#fee2e2', color: sel.outcome === "perfect" ? '#15803d' : sel.outcome === "close" ? '#4caf50' : '#dc2626' }}>{sel.outcome === "perfect" ? "Perfect fit" : sel.outcome === "close" ? "Good fit" : "Off"}</span>
                )}
                <div style={{ fontSize: 16, color: THEME.lavender }}>&#x2726;</div>
              </div>
            </div>
            {/* Profile header */}
            <div style={{ textAlign: 'center', padding: '8px 24px 0', position: 'relative', zIndex: 3 }}>
              <div style={{ width: 80, height: 80, borderRadius: 24, background: sel.manual ? 'rgba(255,255,255,0.1)' : `linear-gradient(135deg, ${THEME.pinkLight}, ${THEME.lavender})`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: sel.manual ? THEME.textFaint : 'white', fontSize: 24, fontWeight: 800, margin: '0 auto 12px', border: '3px solid rgba(255,255,255,0.15)' }}>{sel.name.split(" ").map(n => n[0]).join("")}</div>
              <div style={{ fontSize: 28, fontWeight: 900, color: 'white', fontFamily: THEME.fontDisplay, fontStyle: 'italic' }}>{sel.name}</div>
              <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.55)', marginTop: 4, fontWeight: 500 }}>
                Scanned {sel.date}
                {sel.manual && <span style={{ marginLeft: 8, fontSize: 10, fontWeight: 700, color: THEME.textFaint, background: 'rgba(255,255,255,0.1)', padding: '2px 8px', borderRadius: THEME.radiusPill }}>Manually added</span>}
              </div>
              {sel.scanComplete && (
                <div style={{ marginTop: 10, display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(22,163,74,0.18)', borderRadius: THEME.radiusPill, padding: '5px 14px', border: '1px solid rgba(34,197,94,0.2)' }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
                  <span style={{ fontSize: 12, fontWeight: 700, color: '#4ade80' }}>Scan complete</span>
                </div>
              )}
              {/* Curvature tag */}
              <div style={{ display: 'flex', justifyContent: 'center', marginTop: 12 }}>
                <div style={{ background: 'rgba(232,98,154,0.1)', border: '1.5px solid rgba(232,98,154,0.4)', borderRadius: THEME.radiusPill, padding: '5px 16px', fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.8)', fontFamily: THEME.fontBody }}>
                  {curvature === 'flat' ? 'Flat' : curvature === 'normal' ? 'Normal' : 'C-curve'} curvature
                </div>
              </div>
            </div>
          </CosmicBg>

          <CreamSection>
            <div style={{ maxWidth: THEME.maxWidth, margin: '0 auto', padding: '24px 20px 0' }}>

            {!sel.scanComplete ? (
              <div style={{ padding: '0' }}>
                <div style={{ background: '#fffbeb', borderRadius: THEME.radiusCard, padding: '16px 18px', border: '1px solid #fde68a', marginBottom: 16 }}>
                  <div style={{ fontSize: 14, fontWeight: 800, color: '#92400e', marginBottom: 4 }}>Waiting for scan</div>
                  <div style={{ fontSize: 12, color: '#a16207', lineHeight: 1.4 }}>You'll be notified when {sel.name.split(" ")[0]} completes their scan.</div>
                </div>
                <div style={{ fontSize: 12, fontWeight: 700, color: THEME.textMuted, marginBottom: 8 }}>Resend scan link</div>
                <div style={{ background: THEME.cardBg, borderRadius: THEME.radiusCard, padding: '12px 14px', display: 'flex', alignItems: 'center', gap: 10, border: `1px solid ${THEME.border}`, boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
                  <div style={{ width: 30, height: 30, borderRadius: 8, background: `linear-gradient(135deg, ${THEME.pink}, ${THEME.purple})`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/></svg>
                  </div>
                  <div style={{ flex: 1, fontSize: 12, color: THEME.purpleDark, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontFamily: 'monospace', fontWeight: 600 }}>sizekit.co/scan/{sel.id}</div>
                  <button onClick={() => { navigator.clipboard.writeText(`https://sizekit.co/scan/${sel.id}`); }} style={{ background: `linear-gradient(135deg, ${THEME.pink}, ${THEME.purple})`, border: 'none', borderRadius: 10, padding: '7px 14px', fontSize: 11, fontWeight: 700, color: 'white', cursor: 'pointer', fontFamily: THEME.fontBody, whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', gap: 5 }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>
                    Copy
                  </button>
                </div>
              </div>
            ) : (
              <>
                {/* Scan captured card — only shown before brands are added */}
                {sel.brands.length === 0 && (
                  <div style={{ background: THEME.cardBg, borderRadius: THEME.radiusCard, padding: '20px 18px', marginBottom: 20, boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
                      <div style={{ width: 36, height: 36, borderRadius: 10, background: `${THEME.pinkLight}22`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={THEME.pink} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z"/><circle cx="12" cy="13" r="4"/></svg>
                      </div>
                      <div style={{ fontSize: 18, fontWeight: 900, fontFamily: THEME.fontDisplay, fontStyle: 'italic' }}>Scan captured</div>
                    </div>
                    <div style={{ fontSize: 13, color: THEME.textFaint, marginBottom: 16 }}>Tap any finger to preview the capture.</div>
                    {["left", "right"].map(hand => (
                      <div key={hand} style={{ marginBottom: hand === "left" ? 12 : 0 }}>
                        <div style={{ fontSize: 10, fontWeight: 700, color: THEME.textMuted, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8 }}>{hand} hand</div>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 8 }}>
                          {FINGERS.map(finger => {
                            const photoKey = `${hand}-${finger}`;
                            const hasPhoto = sel.photos?.[photoKey];
                            return (
                              <button key={finger} onClick={() => setScanPreview({ hand, finger })} style={{
                                textAlign: 'center', background: 'none', border: 'none', padding: 0, cursor: 'pointer', fontFamily: THEME.fontBody,
                              }}>
                                <div style={{
                                  aspectRatio: '3/4', borderRadius: 12, overflow: 'hidden',
                                  background: hasPhoto ? `url(${sel.photos[photoKey]}) center/cover` : `${THEME.lavender}20`,
                                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                                  border: `1.5px solid ${THEME.lavender}33`,
                                }}>
                                  {!hasPhoto && (
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={THEME.lavender} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg>
                                  )}
                                </div>
                                <div style={{ fontSize: 9, fontWeight: 700, color: THEME.textFaint, marginTop: 4 }}>{finger}</div>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Pending rescan banner */}
                {sel.scans?.some(s => s.status === "pending") && (() => {
                  const pending = sel.scans.find(s => s.status === "pending");
                  return (
                    <div style={{ background: '#fffbeb', borderRadius: THEME.radiusCard, padding: '12px 14px', border: '1px solid #fde68a', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 12, fontWeight: 700, color: '#92400e', marginBottom: 2 }}>Rescan pending</div>
                        <div style={{ fontSize: 11, color: '#a16207', display: 'flex', alignItems: 'center', gap: 6 }}>
                          <span style={{ fontFamily: 'monospace', fontWeight: 600 }}>sizekit.co/scan/{sel.id}/{pending.id}</span>
                        </div>
                      </div>
                      <button onClick={() => navigator.clipboard.writeText(`https://sizekit.co/scan/${sel.id}/${pending.id}`)} style={{ background: `linear-gradient(135deg, ${THEME.pink}, ${THEME.purple})`, border: 'none', borderRadius: 10, padding: '6px 12px', fontSize: 10, fontWeight: 700, color: 'white', cursor: 'pointer', fontFamily: THEME.fontBody, whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', gap: 4 }}>
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>
                        Copy
                      </button>
                    </div>
                  );
                })()}

                {/* Sizes section */}
                <h2 style={{ fontSize: 22, fontWeight: 900, margin: '0 0 4px', fontFamily: THEME.fontDisplay, fontStyle: 'italic' }}>Sizes</h2>
                {sel.brands.length > 0 && (
                  <p style={{ fontSize: 13, color: THEME.textFaint, margin: '0 0 16px', lineHeight: 1.5, fontStyle: 'italic' }}>
                    Tap each size to view the scan and adjust if needed.
                  </p>
                )}

                {sel.brands.length === 0 ? (
                  <>
                    {/* Empty state — fresh scan, no brands */}
                    <p style={{ fontSize: 13, color: THEME.textFaint, margin: '0 0 20px', lineHeight: 1.5 }}>
                      Add a brand to generate sizes.
                    </p>
                  </>
                ) : (
                  <>
                    {/* Has brands — cards with per-brand progress */}
                    {sel.brands.map((brand, bi) => (
                      <BrandSizeCard key={bi} brand={brand} brandIndex={bi} customer={sel} customerId={sel.id} reviewedFingers={reviewedFingers}
                        onFingerTap={(hand, finger) => openFinger(hand, finger, brand.name)}
                        onRemove={(idx) => setCustomers(p => p.map(c => c.id === selectedId ? { ...c, brands: c.brands.filter((_, i) => i !== idx) } : c))}
                        onEditSize={(idx, hand, finger, newSize) => setCustomers(p => p.map(c => {
                          if (c.id !== selectedId) return c;
                          const brands = [...c.brands];
                          brands[idx] = { ...brands[idx], [hand]: { ...brands[idx][hand], [finger]: newSize } };
                          return { ...c, brands };
                        }))}
                      />
                    ))}
                  </>
                )}

                {/* Add brand CTA - full width gradient */}
                <button onClick={() => { setAddBrandOpen(true); setAddBrandStep(1); setAddBrandName(null); setAddBrandShape(null); }} style={{
                  width: '100%', padding: 16, background: `linear-gradient(135deg, ${THEME.pink}, ${THEME.purple})`,
                  border: 'none', borderRadius: THEME.radiusPill, marginTop: 4, marginBottom: 12,
                  fontSize: 14, fontWeight: 700, color: 'white', cursor: 'pointer', fontFamily: THEME.fontBody,
                  boxShadow: `0 4px 16px rgba(232,98,154,0.25)`, position: 'relative', overflow: 'hidden',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                }}>
                  <span style={{ fontSize: 18, fontWeight: 400 }}>+</span> Add Brand
                  <div style={{ position: 'absolute', top: 0, left: 0, width: '50%', height: '100%', background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)', animation: 'shimmer 3s ease-in-out infinite' }} />
                </button>

                {/* Rescan button - full width dark */}
                <button onClick={() => {
                  const today = new Date();
                  const todayFormatted = today.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
                  setCustomers(prev => prev.map(c => {
                    if (c.id !== sel.id) return c;
                    const scans = c.scans || [];
                    const hasPending = scans.some(s => s.status === "pending");
                    if (hasPending) return c;
                    const newId = Math.max(...scans.map(s => s.id), 0) + 1;
                    return { ...c, scans: [...scans, { id: newId, date: todayFormatted, status: "pending" }] };
                  }));
                }} style={{
                  width: '100%', padding: 16, background: THEME.cosmic, border: 'none', borderRadius: THEME.radiusPill,
                  fontSize: 14, fontWeight: 700, color: 'white', cursor: 'pointer', fontFamily: THEME.fontBody,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: 24,
                }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z"/><circle cx="12" cy="13" r="4"/></svg>
                  Rescan
                </button>

                {/* Scan history - collapsible */}
                <div style={{ borderTop: `1px solid ${THEME.border}`, paddingTop: 16, marginBottom: 20 }}>
                  <button onClick={() => setScanHistoryOpen(!scanHistoryOpen)} style={{
                    width: '100%', background: 'none', border: 'none', padding: 0, display: 'flex',
                    alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer', fontFamily: THEME.fontBody,
                  }}>
                    <h3 style={{ fontSize: 16, fontWeight: 800, margin: 0, fontFamily: THEME.fontDisplay, color: THEME.text }}>Scan history</h3>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={THEME.textMuted} strokeWidth="2.5" strokeLinecap="round" style={{ transform: scanHistoryOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}><path d="M6 9l6 6 6-6"/></svg>
                  </button>
                  {scanHistoryOpen && (
                    <div style={{ marginTop: 12, display: 'flex', flexDirection: 'column', gap: 8 }}>
                      {(sel.scans || []).slice().sort((a, b) => b.id - a.id).map(scan => (
                        <div key={scan.id} style={{ background: THEME.cardBg, borderRadius: 14, padding: '12px 14px', border: `1px solid ${scan.status === "pending" ? '#fde68a' : THEME.border}` }}>
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <div>
                              <div style={{ fontSize: 13, fontWeight: 700, color: THEME.text }}>{scan.date}</div>
                              <div style={{ fontSize: 11, color: THEME.textFaint, marginTop: 2 }}>
                                {scan.status === "active" ? "10 fingers captured" : scan.status === "pending" ? "Waiting for scan" : "10 fingers captured"}
                              </div>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                              {scan.status === "active" && (
                                <div style={{ fontSize: 10, fontWeight: 700, color: THEME.green, background: THEME.greenBg, padding: '3px 10px', borderRadius: THEME.radiusPill, border: `1px solid ${THEME.greenBd}` }}>Active</div>
                              )}
                              {scan.status === "pending" && (
                                <div style={{ fontSize: 10, fontWeight: 700, color: '#92400e', background: '#fffbeb', padding: '3px 10px', borderRadius: THEME.radiusPill, border: '1px solid #fde68a' }}>Pending</div>
                              )}
                              {scan.status === "completed" && (
                                <button onClick={() => {
                                  setCustomers(prev => prev.map(c => {
                                    if (c.id !== sel.id) return c;
                                    const prevActive = c.scans.find(s => s.status === "active");
                                    const newScans = c.scans.map(s => {
                                      if (s.id === scan.id) return { ...s, status: "active" };
                                      if (s.status === "active") return { ...s, status: "completed", _savedData: { mm: c.mm, coinMm: c.coinMm, borderline: c.borderline, photos: c.photos, date: c.date } };
                                      return s;
                                    });
                                    const reactivated = c.scans.find(s => s.id === scan.id);
                                    const restored = reactivated._savedData || {};
                                    return {
                                      ...c,
                                      scans: newScans,
                                      date: restored.date || reactivated.date,
                                      mm: restored.mm || c.mm,
                                      coinMm: restored.coinMm || c.coinMm,
                                      borderline: restored.borderline || c.borderline,
                                      photos: restored.photos || c.photos,
                                    };
                                  }));
                                }} style={{ fontSize: 10, fontWeight: 700, color: THEME.purpleDark, background: `${THEME.lavender}22`, padding: '4px 10px', borderRadius: THEME.radiusPill, border: `1px solid ${THEME.lavender}44`, cursor: 'pointer', fontFamily: THEME.fontBody }}>
                                  Use this scan
                                </button>
                              )}
                            </div>
                          </div>
                          {scan.status === "pending" && (
                            <div style={{ marginTop: 10 }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#fffbeb', borderRadius: 10, padding: '8px 10px', border: '1px solid #fde68a' }}>
                                <div style={{ width: 24, height: 24, borderRadius: 6, background: `linear-gradient(135deg, ${THEME.pink}, ${THEME.purple})`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/></svg>
                                </div>
                                <div style={{ flex: 1, fontSize: 11, color: THEME.purpleDark, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontFamily: 'monospace', fontWeight: 600 }}>sizekit.co/scan/{sel.id}/{scan.id}</div>
                                <button onClick={() => navigator.clipboard.writeText(`https://sizekit.co/scan/${sel.id}/${scan.id}`)} style={{ background: `linear-gradient(135deg, ${THEME.pink}, ${THEME.purple})`, border: 'none', borderRadius: 8, padding: '5px 10px', fontSize: 10, fontWeight: 700, color: 'white', cursor: 'pointer', fontFamily: THEME.fontBody, whiteSpace: 'nowrap' }}>Copy</button>
                              </div>
                              <button onClick={() => {
                                setCustomers(prev => prev.map(c => {
                                  if (c.id !== sel.id) return c;
                                  const prevActive = c.scans.find(s => s.status === "active");
                                  const newScans = c.scans.map(s => {
                                    if (s.id === scan.id) return { ...s, status: "active" };
                                    if (s.status === "active") return { ...s, status: "completed", _savedData: { mm: c.mm, coinMm: c.coinMm, borderline: c.borderline, photos: c.photos, date: c.date } };
                                    return s;
                                  });
                                  // Generate slight variations of existing mm data for the new scan
                                  const vary = (obj) => {
                                    const result = {};
                                    for (const [k, v] of Object.entries(obj || {})) {
                                      if (typeof v === 'object') result[k] = vary(v);
                                      else result[k] = +(v + (Math.random() * 0.4 - 0.2)).toFixed(1);
                                    }
                                    return result;
                                  };
                                  return {
                                    ...c,
                                    scans: newScans,
                                    scanComplete: true,
                                    date: scan.date,
                                    mm: vary(c.mm),
                                    coinMm: vary(c.coinMm),
                                    borderline: c.borderline,
                                    photos: c.photos,
                                  };
                                }));
                              }} style={{ marginTop: 8, width: '100%', padding: '8px 12px', background: '#f59e0b', border: 'none', borderRadius: 10, fontSize: 11, fontWeight: 700, color: 'white', cursor: 'pointer', fontFamily: THEME.fontBody }}>
                                Complete scan (demo)
                              </button>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Tags section — tappable presets */}
                <div style={{ borderTop: `1px solid ${THEME.border}`, paddingTop: 16, marginBottom: 20 }}>
                  <h3 style={{ fontSize: 16, fontWeight: 800, margin: '0 0 10px', fontFamily: THEME.fontDisplay, color: THEME.text }}>Tags</h3>
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                    {TAG_PRESETS.map(tag => {
                      const active = (sel.tags || []).includes(tag);
                      return (
                        <button key={tag} onClick={() => setCustomers(prev => prev.map(c => {
                          if (c.id !== sel.id) return c;
                          const tags = c.tags || [];
                          return { ...c, tags: active ? tags.filter(t => t !== tag) : [...tags, tag] };
                        }))} style={{
                          background: active ? `linear-gradient(135deg, ${THEME.pink}18, ${THEME.purple}15)` : THEME.cardBg,
                          border: `1.5px solid ${active ? THEME.lavender : THEME.border}`,
                          borderRadius: THEME.radiusPill, padding: '8px 16px', fontSize: 12, fontWeight: 600,
                          color: active ? THEME.purpleDark : THEME.textMuted,
                          cursor: 'pointer', fontFamily: THEME.fontBody, transition: 'all 0.15s ease',
                        }}>
                          {active && <span style={{ marginRight: 4 }}>&#x2713;</span>}{tag}
                        </button>
                      );
                    })}
                    <button onClick={() => {
                      const tag = prompt("Enter a custom tag:");
                      if (tag?.trim() && !(sel.tags || []).includes(tag.trim())) setCustomers(prev => prev.map(c => c.id === sel.id ? { ...c, tags: [...(c.tags || []), tag.trim()] } : c));
                    }} style={{
                      background: 'none', border: `1.5px dashed ${THEME.textFaint}55`,
                      borderRadius: THEME.radiusPill, padding: '8px 16px', fontSize: 12, fontWeight: 600,
                      color: THEME.textFaint, cursor: 'pointer', fontFamily: THEME.fontBody,
                    }}>+ Custom</button>
                  </div>
                  {/* Custom tags (non-preset) shown as removable pills */}
                  {(sel.tags || []).filter(t => !TAG_PRESETS.includes(t)).length > 0 && (
                    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 10 }}>
                      {(sel.tags || []).filter(t => !TAG_PRESETS.includes(t)).map(tag => (
                        <div key={tag} style={{ background: `${THEME.lavender}18`, border: `1px solid ${THEME.lavender}44`, borderRadius: THEME.radiusPill, padding: '6px 14px', fontSize: 12, fontWeight: 600, color: THEME.purpleDark, display: 'flex', alignItems: 'center', gap: 6 }}>
                          {tag}
                          <span onClick={() => setCustomers(prev => prev.map(c => c.id === sel.id ? { ...c, tags: (c.tags || []).filter(t => t !== tag) } : c))} style={{ cursor: 'pointer', fontSize: 14, color: THEME.textFaint, lineHeight: 1 }}>&times;</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Notes section - collapsible */}
                <div style={{ borderTop: `1px solid ${THEME.border}`, paddingTop: 16, marginBottom: 20 }}>
                  <button onClick={() => setNotesOpen(!notesOpen)} style={{
                    width: '100%', background: 'none', border: 'none', padding: 0, display: 'flex',
                    alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer', fontFamily: THEME.fontBody,
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <h3 style={{ fontSize: 16, fontWeight: 800, margin: 0, fontFamily: THEME.fontDisplay, color: THEME.text }}>Notes</h3>
                      {(sel.notes || []).length > 0 && (
                        <span style={{ fontSize: 11, fontWeight: 700, color: THEME.textFaint, background: `${THEME.border}`, padding: '2px 8px', borderRadius: THEME.radiusPill }}>{(sel.notes || []).length}</span>
                      )}
                    </div>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={THEME.textMuted} strokeWidth="2.5" strokeLinecap="round" style={{ transform: notesOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}><path d="M6 9l6 6 6-6"/></svg>
                  </button>
                  {notesOpen && (
                    <div style={{ marginTop: 12, display: 'flex', flexDirection: 'column', gap: 8 }}>
                      {/* Add note input */}
                      <div style={{ display: 'flex', gap: 8 }}>
                        <input
                          value={newNoteText}
                          onChange={e => setNewNoteText(e.target.value)}
                          onKeyDown={e => {
                            if (e.key === 'Enter' && newNoteText.trim()) {
                              const today = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
                              const notes = sel.notes || [];
                              const newId = Math.max(...notes.map(n => n.id), 0) + 1;
                              setCustomers(prev => prev.map(c => c.id === sel.id ? { ...c, notes: [{ id: newId, date: today, text: newNoteText.trim() }, ...notes] } : c));
                              setNewNoteText("");
                            }
                          }}
                          placeholder="Add a note..."
                          style={{
                            flex: 1, padding: '10px 14px', borderRadius: 12,
                            border: `1.5px solid ${THEME.border}`, background: THEME.cardBg,
                            fontSize: 13, fontFamily: THEME.fontBody, color: THEME.text,
                            outline: 'none', boxSizing: 'border-box',
                          }}
                        />
                        <button onClick={() => {
                          if (!newNoteText.trim()) return;
                          const today = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
                          const notes = sel.notes || [];
                          const newId = Math.max(...notes.map(n => n.id), 0) + 1;
                          setCustomers(prev => prev.map(c => c.id === sel.id ? { ...c, notes: [{ id: newId, date: today, text: newNoteText.trim() }, ...notes] } : c));
                          setNewNoteText("");
                        }} style={{
                          background: `linear-gradient(135deg, ${THEME.pink}, ${THEME.purple})`, border: 'none', borderRadius: 12,
                          padding: '10px 16px', fontSize: 12, fontWeight: 700, color: 'white', cursor: 'pointer', fontFamily: THEME.fontBody, whiteSpace: 'nowrap',
                        }}>Add</button>
                      </div>
                      {/* Note entries */}
                      {(sel.notes || []).map(note => (
                        <div key={note.id} style={{ background: THEME.cardBg, borderRadius: 14, padding: '12px 14px', border: `1px solid ${THEME.border}` }}>
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
                            <div style={{ fontSize: 10, fontWeight: 700, color: THEME.textFaint }}>{note.date}</div>
                            <button onClick={() => {
                              setCustomers(prev => prev.map(c => c.id === sel.id ? { ...c, notes: (c.notes || []).filter(n => n.id !== note.id) } : c));
                            }} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 14, color: THEME.textFaint, lineHeight: 1, padding: '0 2px' }}>&times;</button>
                          </div>
                          <div style={{ fontSize: 13, color: THEME.text, lineHeight: 1.5 }}>{note.text}</div>
                        </div>
                      ))}
                      {(sel.notes || []).length === 0 && (
                        <div style={{ fontSize: 12, color: THEME.textFaint, fontStyle: 'italic', padding: '8px 0' }}>No notes yet.</div>
                      )}
                    </div>
                  )}
                </div>

                {/* Delete customer */}
                <div style={{ borderTop: `1px solid ${THEME.border}`, paddingTop: 20, textAlign: 'center', paddingBottom: 20 }}>
                  <button onClick={() => {
                    if (window.confirm(`Delete ${sel.name}? This cannot be undone.`)) {
                      setCustomers(p => p.filter(c => c.id !== sel.id));
                      home();
                    }
                  }} style={{
                    background: 'none', border: `1.5px solid ${THEME.pinkLight}55`,
                    borderRadius: THEME.radiusPill, padding: '10px 28px',
                    fontSize: 13, fontWeight: 600, color: THEME.pink,
                    cursor: 'pointer', fontFamily: THEME.fontBody,
                  }}>
                    Delete customer
                  </button>
                </div>

                {/* Outcome popup overlay */}
                {outcomeOpen && (
                  <>
                    <div onClick={() => setOutcomeOpen(false)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', zIndex: 90, backdropFilter: 'blur(4px)' }} />
                    <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, background: THEME.cardBg, borderRadius: `${THEME.radiusSheet}px ${THEME.radiusSheet}px 0 0`, zIndex: 100, boxShadow: '0 -4px 30px rgba(0,0,0,0.12)', padding: '12px 24px 32px' }}>
                      <div style={{ width: 36, height: 4, borderRadius: 2, background: '#d4d4d8', margin: '0 auto 20px' }} />
                      <div style={{ fontSize: 18, fontWeight: 800, marginBottom: 4, fontFamily: THEME.fontDisplay }}>How'd it fit?</div>
                      <div style={{ fontSize: 13, color: THEME.textFaint, marginBottom: 20 }}>Let us know how the set worked out.</div>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                        <button onClick={() => submitOutcome("perfect")} style={{
                          background: THEME.greenBg, border: `1.5px solid ${THEME.greenBd}`, borderRadius: THEME.radiusCard,
                          padding: '14px 16px', cursor: 'pointer', fontFamily: THEME.fontBody, textAlign: 'left',
                        }}>
                          <div style={{ fontSize: 15, fontWeight: 800, color: '#15803d', marginBottom: 3 }}>Perfect</div>
                          <div style={{ fontSize: 12, color: '#166534', lineHeight: 1.4 }}>Every nail fit great. Completely usable set, no issues.</div>
                        </button>

                        <button onClick={() => { setTempOutcome("good"); setOutcomeStep(2); }} style={{
                          background: '#f1f8f3', border: '1.5px solid #c8e6c9', borderRadius: THEME.radiusCard,
                          padding: '14px 16px', cursor: 'pointer', fontFamily: THEME.fontBody, textAlign: 'left',
                        }}>
                          <div style={{ fontSize: 15, fontWeight: 800, color: '#4caf50', marginBottom: 3 }}>Good</div>
                          <div style={{ fontSize: 12, color: '#66bb6a', lineHeight: 1.4 }}>Usable set, but some nails weren't ideal. Could be better next time.</div>
                        </button>

                        <button onClick={() => { setTempOutcome("off"); setOutcomeStep(2); }} style={{
                          background: '#fef2f2', border: '1.5px solid #fecaca', borderRadius: THEME.radiusCard,
                          padding: '14px 16px', cursor: 'pointer', fontFamily: THEME.fontBody, textAlign: 'left',
                        }}>
                          <div style={{ fontSize: 15, fontWeight: 800, color: '#dc2626', marginBottom: 3 }}>Off</div>
                          <div style={{ fontSize: 12, color: '#b91c1c', lineHeight: 1.4 }}>One or more nails were not wearable. Needs to be resized.</div>
                        </button>
                      </div>

                      {outcomeStep === 2 && (
                        <div style={{ marginTop: 20 }}>
                          <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 10 }}>Which nails were off?</div>
                          {["left", "right"].map(hand => (
                            <div key={hand} style={{ marginBottom: 10 }}>
                              <div style={{ fontSize: 9, fontWeight: 700, color: THEME.textFaint, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 6 }}>{hand} hand</div>
                              <div style={{ display: 'flex', gap: 4 }}>
                                {FINGERS.map(finger => {
                                  const fl = tempFingers.find(f => f.hand === hand && f.finger === finger);
                                  const size = sel.brands[0]?.[hand]?.[finger];
                                  return (
                                    <div key={finger} style={{ flex: 1, textAlign: 'center' }}>
                                      <div style={{ background: fl ? (fl.direction === "big" ? '#fef9c3' : '#fee2e2') : '#f9fafb', borderRadius: 8, padding: '5px 1px', marginBottom: 3, border: `2px solid ${fl ? (fl.direction === "big" ? '#eab308' : '#ef4444') : '#e4e4e7'}` }}>
                                        <div style={{ fontSize: 7, fontWeight: 700, color: THEME.textFaint }}>{finger}</div>
                                        <div style={{ fontSize: 14, fontWeight: 800 }}>{size}</div>
                                      </div>
                                      <div style={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
                                        <button onClick={() => toggleOF(hand, finger, "big")} style={{ width: 22, height: 16, borderRadius: 4, border: 'none', cursor: 'pointer', fontSize: 7, fontWeight: 800, fontFamily: THEME.fontBody, background: fl?.direction === "big" ? '#eab308' : THEME.border, color: fl?.direction === "big" ? 'white' : THEME.textFaint }}>BIG</button>
                                        <button onClick={() => toggleOF(hand, finger, "small")} style={{ width: 22, height: 16, borderRadius: 4, border: 'none', cursor: 'pointer', fontSize: 7, fontWeight: 800, fontFamily: THEME.fontBody, background: fl?.direction === "small" ? '#ef4444' : THEME.border, color: fl?.direction === "small" ? 'white' : THEME.textFaint }}>SML</button>
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          ))}
                          <button onClick={() => submitOutcome()} style={{ width: '100%', padding: 14, borderRadius: THEME.radiusCard, border: 'none', background: `linear-gradient(135deg, ${THEME.pink}, ${THEME.purple})`, color: 'white', fontSize: 14, fontWeight: 700, cursor: 'pointer', fontFamily: THEME.fontBody, marginTop: 8 }}>Submit</button>
                        </div>
                      )}
                    </div>
                  </>
                )}
              </>
            )}
            </div>
          </CreamSection>
        </div>
      )}

      {/* Add Brand Sheet */}
      {addBrandOpen && (
        <>
          <div onClick={() => setAddBrandOpen(false)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', zIndex: 90, backdropFilter: 'blur(4px)' }} />
          <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, background: THEME.cardBg, borderRadius: `${THEME.radiusSheet}px ${THEME.radiusSheet}px 0 0`, zIndex: 100, maxHeight: '85vh', overflowY: 'auto', boxShadow: '0 -4px 30px rgba(0,0,0,0.12)', padding: '12px 24px 32px' }}>
            <div style={{ width: 36, height: 4, borderRadius: 2, background: '#d4d4d8', margin: '0 auto 20px' }} />

            <div style={{ marginBottom: 24 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: THEME.pink, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 12 }}>Brand</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {["Apres Gel-X", "Apres Sculpted", "BTArtBox", "Beetles", "ESVY", "Luckyfairy", "Modelones", "NotPolish", "OPI", "PLA Tips", "Painted Desert", "SOFTIPS PRO XV", "Sinokame", "Supplies by Chloe", "Tipex", "Tomicca", "Una Gella"].map(b => (
                  <button key={b} onClick={() => setAddBrandName(b)} style={{
                    padding: '8px 16px', borderRadius: THEME.radiusPill,
                    border: addBrandName === b ? `2px solid ${THEME.purple}` : `1.5px solid ${THEME.border}`,
                    background: addBrandName === b ? `${THEME.lavender}22` : THEME.cardBg,
                    color: addBrandName === b ? THEME.purpleDark : THEME.text,
                    fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: THEME.fontBody,
                  }}>{b}</button>
                ))}
              </div>
            </div>

            <div style={{ marginBottom: 24 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: THEME.pink, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 12 }}>Shape</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {["Almond", "Coffin", "Medium Coffin", "Oval", "Square", "Squoval", "Stiletto"].map(s => (
                  <button key={s} onClick={() => setAddBrandShape(s)} style={{
                    padding: '8px 16px', borderRadius: THEME.radiusPill,
                    border: addBrandShape === s ? `2px solid ${THEME.purple}` : `1.5px solid ${THEME.border}`,
                    background: addBrandShape === s ? `${THEME.lavender}22` : THEME.cardBg,
                    color: addBrandShape === s ? THEME.purpleDark : THEME.text,
                    fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: THEME.fontBody,
                  }}>{s}</button>
                ))}
              </div>
            </div>

            <button onClick={addBrand} disabled={!addBrandName || !addBrandShape} style={{
              width: '100%', padding: 14, borderRadius: THEME.radiusCard, border: 'none',
              background: addBrandName && addBrandShape ? `linear-gradient(135deg, ${THEME.pink}, ${THEME.purple})` : '#e4e4e7',
              color: 'white', fontSize: 14, fontWeight: 700,
              cursor: addBrandName && addBrandShape ? 'pointer' : 'default',
              fontFamily: THEME.fontBody,
              boxShadow: addBrandName && addBrandShape ? `0 4px 16px rgba(232,98,154,0.25)` : 'none',
            }}>Add Brand</button>
          </div>
        </>
      )}



      {/* Finger Detail Sheet */}
      {fingerDetail && sel && <FingerSheet customer={sel} {...fingerDetail} onClose={dismissFinger} onConfirm={confirmFinger} onNavigate={(h, f) => { setFingerDetail({ hand: h, finger: f, brandName: fingerDetail.brandName }); setOverrideMode(false); }} reviewedFingers={reviewedFingers} customerId={selectedId} saveOverride={saveOverride} />}

      {/* Scan Preview Sheet — photo + measurements, no brand sizing */}
      {scanPreview && sel && (() => {
        const { hand, finger } = scanPreview;
        const photoKey = `${hand}-${finger}`;
        const photoSrc = sel.photos?.[photoKey] || FINGER_PHOTOS[photoKey] || '/fingers/left-thumb.png';
        const hasPhoto = !!sel.photos?.[photoKey];
        const mm = sel.mm?.[hand]?.[finger];
        const coinMm = sel.coinMm?.[hand]?.[finger];
        const seq = [];
        ["left", "right"].forEach(h => FINGERS.forEach(f => seq.push({ hand: h, finger: f })));
        const currentIdx = seq.findIndex(s => s.hand === hand && s.finger === finger);
        return (
          <>
            <div onClick={() => setScanPreview(null)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', zIndex: 90, backdropFilter: 'blur(4px)' }} />
            <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, background: THEME.cardBg, borderRadius: `${THEME.radiusSheet}px ${THEME.radiusSheet}px 0 0`, zIndex: 100, maxHeight: '92vh', overflowY: 'auto', boxShadow: '0 -4px 30px rgba(0,0,0,0.12)', padding: '12px 24px 32px' }}>
              <div style={{ width: 36, height: 4, borderRadius: 2, background: '#d4d4d8', margin: '0 auto 16px' }} />
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 4 }}>
                <div>
                  <div style={{ fontSize: 28, fontWeight: 900, color: THEME.text, fontFamily: THEME.fontDisplay, fontStyle: 'italic', lineHeight: 1.1 }}>{finger}</div>
                  <div style={{ fontSize: 14, color: THEME.textMuted, fontWeight: 500, marginTop: 2 }}>{hand === "left" ? "Left" : "Right"} hand</div>
                </div>
                <button onClick={() => setScanPreview(null)} style={{ width: 36, height: 36, borderRadius: 18, background: THEME.border, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 4 }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={THEME.textMuted} strokeWidth="2.5" strokeLinecap="round"><path d="M18 6L6 18"/><path d="M6 6l12 12"/></svg>
                </button>
              </div>

              {/* Finger nav — full names */}
              <div style={{ marginTop: 12, marginBottom: 20 }}>
                <div style={{ display: 'flex', gap: 3 }}>
                  {seq.map((s, i) => {
                    const isCurrent = i === currentIdx;
                    return (
                      <button key={i} onClick={() => setScanPreview({ hand: s.hand, finger: s.finger })} style={{
                        flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3,
                        background: 'none', border: 'none', padding: '4px 0', cursor: 'pointer',
                        fontFamily: THEME.fontBody, marginRight: i === 4 ? 8 : 0,
                      }}>
                        <div style={{ width: '100%', height: 5, borderRadius: 3, background: isCurrent ? THEME.pink : `${THEME.lavender}33`, transition: 'background 0.2s', boxShadow: isCurrent ? `0 0 6px ${THEME.pink}55` : 'none' }} />
                        <div style={{ fontSize: 7, fontWeight: 700, letterSpacing: 0.2, color: isCurrent ? THEME.pink : THEME.textFaint }}>{s.finger}</div>
                      </button>
                    );
                  })}
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 2 }}>
                  <div style={{ fontSize: 9, fontWeight: 600, color: THEME.textFaint, textTransform: 'uppercase', letterSpacing: 0.5, width: '50%', paddingLeft: 2 }}>Left</div>
                  <div style={{ fontSize: 9, fontWeight: 600, color: THEME.textFaint, textTransform: 'uppercase', letterSpacing: 0.5, width: '50%', paddingLeft: 10 }}>Right</div>
                </div>
              </div>

              {/* Photo — no overlay label */}
              <div style={{ borderRadius: THEME.radiusCard, overflow: 'hidden', background: `${THEME.lavender}15`, marginBottom: 16, aspectRatio: '1/1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {hasPhoto ? (
                  <img src={photoSrc} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke={`${THEME.lavender}66`} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg>
                )}
              </div>

              {/* Measurements */}
              {mm && (
                <div style={{ background: THEME.border, borderRadius: THEME.radiusCard, padding: '16px 20px', marginBottom: 12 }}>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
                    <div style={{ fontSize: 10, fontWeight: 600, color: THEME.textFaint }}>Width</div>
                    <div style={{ fontSize: 24, fontWeight: 900, color: THEME.text, fontFamily: THEME.fontDisplay }}>{mm}<span style={{ fontSize: 13, fontWeight: 600, color: THEME.textMuted, marginLeft: 2 }}>mm</span></div>
                  </div>
                  <div style={{ fontSize: 11, color: THEME.textFaint, marginTop: 6 }}>Coin used: US Quarter</div>
                </div>
              )}

              {/* What makes a good capture — collapsed by default */}
              <details style={{ marginBottom: 20 }}>
                <summary style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', padding: '12px 0', listStyle: 'none', WebkitAppearance: 'none' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={THEME.purpleDark} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
                  <span style={{ fontSize: 13, fontWeight: 700, color: THEME.text }}>What makes a good capture</span>
                </summary>
                <div style={{ background: `${THEME.lavender}10`, borderRadius: THEME.radiusCard, padding: '14px 16px', border: `1px solid ${THEME.lavender}22`, marginTop: 4 }}>
                  <ul style={{ margin: 0, paddingLeft: 18, fontSize: 12, color: THEME.textMuted, lineHeight: 1.8 }}>
                    <li>Finger is rolled or not completely flat against the surface</li>
                    <li>Dark environment or poor lighting conditions</li>
                    <li>Low-resolution or blurry images</li>
                  </ul>
                  <div style={{ fontSize: 12, color: THEME.textMuted, lineHeight: 1.6, marginTop: 8 }}>
                    If you notice any of these, consider reaching out to have the customer rescan with better lighting and flat finger placement.
                  </div>
                </div>
              </details>

              <button onClick={() => setScanPreview(null)} style={{
                width: '100%', padding: 18, background: THEME.cosmic, border: 'none',
                borderRadius: THEME.radiusPill, fontSize: 16, fontWeight: 700, color: 'white',
                cursor: 'pointer', fontFamily: THEME.fontBody, boxShadow: '0 4px 16px rgba(14,10,26,0.3)',
              }}>Done</button>
            </div>
          </>
        );
      })()}

      {/* Notifications Dropdown */}
      {notifOpen && (
        <>
          <div onClick={() => setNotifOpen(false)} style={{ position: 'fixed', inset: 0, zIndex: 60 }} />
          <div style={{ position: 'fixed', top: 56, right: 16, width: 300, background: THEME.cardBg, borderRadius: THEME.radiusCard, boxShadow: '0 8px 30px rgba(0,0,0,0.15)', border: `1px solid ${THEME.border}`, zIndex: 70, overflow: 'hidden' }}>
            <div style={{ padding: '12px 16px', borderBottom: `1px solid ${THEME.border}` }}>
              <div style={{ fontSize: 14, fontWeight: 800, fontFamily: THEME.fontDisplay }}>Notifications</div>
            </div>
            {[
              { text: "Sarah Mitchell completed her scan", time: "2 hours ago", dot: THEME.green },
              { text: "Scan link sent to Amanda Chen", time: "Yesterday", dot: '#3b82f6' },
              { text: "Mia Ramirez completed her scan", time: "2 days ago", dot: THEME.green },
              { text: "Scan link sent to Kayla Washington", time: "3 days ago", dot: '#3b82f6' },
              { text: "Taylor Kim completed her scan", time: "5 days ago", dot: THEME.green },
            ].map((n, i) => (
              <div key={i} style={{ padding: '10px 16px', borderBottom: i < 4 ? `1px solid ${THEME.border}` : 'none', display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                <div style={{ width: 8, height: 8, borderRadius: 4, background: n.dot, flexShrink: 0, marginTop: 5 }} />
                <div>
                  <div style={{ fontSize: 12, fontWeight: 600, color: THEME.text, lineHeight: 1.4 }}>{n.text}</div>
                  <div style={{ fontSize: 10, color: THEME.textFaint, marginTop: 2 }}>{n.time}</div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Stage 1 Welcome Popup */}
      {showWelcome && (
        <>
          <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 200, backdropFilter: 'blur(6px)' }} />
          <div style={{ position: 'fixed', inset: 0, zIndex: 210, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
            <div style={{ background: THEME.cardBg, borderRadius: THEME.radiusSheet, maxWidth: 380, width: '100%', maxHeight: '85vh', overflowY: 'auto', boxShadow: '0 20px 60px rgba(0,0,0,0.2)' }}>
              <div style={{ background: `linear-gradient(135deg, ${THEME.pink}, ${THEME.purple})`, borderRadius: `${THEME.radiusSheet}px ${THEME.radiusSheet}px 0 0`, padding: '28px 24px 20px', textAlign: 'center' }}>
                <img src="/sizekit-logo.webp" style={{ width: 48, height: 48, borderRadius: 14, objectFit: 'cover', marginBottom: 12, border: '2px solid rgba(255,255,255,0.2)' }} alt="SizeKit" />
                <div style={{ fontSize: 22, fontWeight: 900, color: 'white', marginBottom: 4, fontFamily: THEME.fontDisplay, fontStyle: 'italic' }}>Welcome to Stage 1</div>
                <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.85)', fontWeight: 500 }}>You can now use SizeKit with your customers</div>
              </div>

              <div style={{ padding: '24px 24px 28px' }}>
                <div style={{ marginBottom: 20 }}>
                  <div style={{ fontSize: 13, fontWeight: 800, color: THEME.text, marginBottom: 6 }}>What's happening</div>
                  <div style={{ fontSize: 13, color: '#52525b', lineHeight: 1.5 }}>Your customers scan, and SizeKit generates their sizes. You'll see them right here on your dashboard, ready to use.</div>
                </div>

                <div style={{ marginBottom: 20 }}>
                  <div style={{ fontSize: 13, fontWeight: 800, color: THEME.text, marginBottom: 6 }}>What we need from you</div>
                  <div style={{ fontSize: 13, color: '#52525b', lineHeight: 1.5 }}>While we make the transition from calibration to customer use, we've added a safety step: <strong>review and confirm</strong> each customer's sizes before sending out their set. This is temporary.</div>
                </div>

                <div style={{ background: `${THEME.lavender}22`, borderRadius: 14, padding: '12px 14px', marginBottom: 24 }}>
                  <div style={{ fontSize: 12, color: THEME.purpleDark, lineHeight: 1.5 }}>There will be instructions for reviewing each size along with each customer's capture.</div>
                </div>

                <div style={{ fontSize: 14, color: THEME.text, fontWeight: 700, textAlign: 'center', marginBottom: 16, fontFamily: THEME.fontDisplay }}>Review, confirm, and make great nails.</div>

                <button onClick={() => setShowWelcome(false)} style={{
                  width: '100%', padding: 16, background: `linear-gradient(135deg, ${THEME.pink}, ${THEME.purple})`,
                  border: 'none', borderRadius: THEME.radiusCard, color: 'white', fontSize: 15, fontWeight: 700,
                  cursor: 'pointer', fontFamily: THEME.fontBody,
                  boxShadow: `0 4px 20px rgba(168,85,247,0.3)`, position: 'relative', overflow: 'hidden',
                }}>
                  Got it, let's go
                  <div style={{ position: 'absolute', top: 0, left: 0, width: '50%', height: '100%', background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)', animation: 'shimmer 3s ease-in-out infinite' }} />
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Review Tips Popup */}
      {tipsOpen && (
        <>
          <div onClick={() => setTipsOpen(false)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 200, backdropFilter: 'blur(6px)' }} />
          <div style={{ position: 'fixed', inset: 0, zIndex: 210, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
            <div style={{ background: THEME.cardBg, borderRadius: THEME.radiusSheet, maxWidth: 380, width: '100%', maxHeight: '85vh', overflowY: 'auto', boxShadow: '0 20px 60px rgba(0,0,0,0.2)' }}>
              <div style={{ background: `linear-gradient(135deg, ${THEME.pink}, ${THEME.purple})`, borderRadius: `${THEME.radiusSheet}px ${THEME.radiusSheet}px 0 0`, padding: '28px 24px 20px', textAlign: 'center' }}>
                <div style={{ fontSize: 28, marginBottom: 8 }}>{"\u2728"}</div>
                <div style={{ fontSize: 20, fontWeight: 900, color: 'white', marginBottom: 4, fontFamily: THEME.fontDisplay, fontStyle: 'italic' }}>Quick Sizing Check</div>
                <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.85)', fontWeight: 500 }}>Here's how to get the best results</div>
              </div>
              <div style={{ padding: '20px 24px 28px' }}>
                <div style={{ background: `${THEME.pinkLight}22`, borderRadius: 14, padding: '14px 16px', marginBottom: 16, border: `1px solid ${THEME.pinkLight}33` }}>
                  <div style={{ fontSize: 13, color: '#9d174d', lineHeight: 1.6, fontWeight: 600 }}>During Stage 1, we recommend verifying sizes with a sizing method you already trust.</div>
                </div>

                <div style={{ fontSize: 13, fontWeight: 700, color: THEME.text, marginBottom: 12 }}>A few things that can affect accuracy:</div>

                {[
                  { icon: "\ud83d\udca1", text: "Low or uneven lighting" },
                  { icon: "\ud83e\ude99", text: "Coin wasn't fully visible" },
                  { icon: "\ud83d\udd18", text: "Wrong coin selected" },
                  { icon: "\ud83d\udd90\ufe0f", text: "Fingers weren't fully spread" },
                  { icon: "\ud83d\udcd0", text: "Hand was tilted or angled" },
                ].map((item, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                    <div style={{ width: 32, height: 32, borderRadius: 10, background: '#fef2f2', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 15, flexShrink: 0 }}>{item.icon}</div>
                    <div style={{ fontSize: 13, color: '#52525b', lineHeight: 1.4 }}>{item.text}</div>
                  </div>
                ))}

                <div style={{ background: '#fefce8', borderRadius: 14, padding: '12px 14px', marginTop: 16, marginBottom: 20, border: '1px solid #fde68a' }}>
                  <div style={{ fontSize: 12, color: '#92400e', lineHeight: 1.5 }}>If any of these came up, we recommend rescanning with clearer instructions.</div>
                </div>

                <button onClick={() => setTipsOpen(false)} style={{
                  width: '100%', padding: 16, background: `linear-gradient(135deg, ${THEME.pink}, ${THEME.purple})`,
                  border: 'none', borderRadius: THEME.radiusCard, color: 'white', fontSize: 15, fontWeight: 700,
                  cursor: 'pointer', fontFamily: THEME.fontBody,
                  boxShadow: `0 4px 20px rgba(168,85,247,0.3)`,
                }}>Got it</button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Create Size Kit Modal */}
      {showCreateKit && (() => {
        return (
        <>
          <div onClick={() => { setShowCreateKit(false); setNewKitName(""); setNewKitTags([]); }} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 200, backdropFilter: 'blur(6px)' }} />
          <div style={{ position: 'fixed', inset: 0, zIndex: 210, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }}>
            <div style={{
              borderRadius: THEME.radiusSheet + 2, maxWidth: 460, width: '100%',
              background: `linear-gradient(135deg, ${THEME.pink}, ${THEME.purple}, ${THEME.pinkLight})`,
              padding: 2,
              boxShadow: `0 25px 80px rgba(0,0,0,0.4), 0 0 40px rgba(232,98,154,0.2), 0 0 80px rgba(168,85,247,0.15)`,
            }}>
            <div style={{
              borderRadius: THEME.radiusSheet, width: '100%', overflow: 'hidden',
            }}>
              {/* ── Cosmic header — mirrors CosmicBg exactly ── */}
              <div style={{
                background: `linear-gradient(170deg, ${THEME.cosmic}, ${THEME.cosmicMid}, ${THEME.cosmicEnd})`,
                position: 'relative', overflow: 'hidden', paddingBottom: 28,
              }}>
                {/* Blobs — same as CosmicBg */}
                {[
                  { size: 200, top: -60, left: -40, colors: 'rgba(168,85,247,0.3), transparent', dur: '8s' },
                  { size: 260, top: 20, right: -60, colors: 'rgba(232,98,154,0.25), transparent', dur: '12s' },
                  { size: 180, bottom: -30, left: '40%', colors: 'rgba(196,181,253,0.2), transparent', dur: '10s' },
                ].map((b, i) => (
                  <div key={i} style={{ position: 'absolute', width: b.size, height: b.size, top: b.top, left: b.left, right: b.right, bottom: b.bottom, background: `radial-gradient(circle, ${b.colors})`, filter: 'blur(40px)', animation: `blobMorph ${b.dur} ease-in-out infinite`, opacity: 0.7 }} />
                ))}
                {/* Dot sparkles — same as CosmicBg */}
                {Array.from({ length: 18 }, (_, i) => {
                  const top = (7 + (i * 37) % 83) + '%';
                  const left = (5 + (i * 53) % 89) + '%';
                  const size = 1.5 + (i % 3);
                  const dur = (2 + (i % 4)) + 's';
                  const delay = (i * 0.4) + 's';
                  return <div key={'s'+i} style={{ position: 'absolute', top, left, width: size, height: size, borderRadius: '50%', background: 'white', animation: `twinkle ${dur} ease-in-out ${delay} infinite` }} />;
                })}
                {/* Star characters — same as CosmicBg */}
                {['\u2726','\u2727','\u2726','\u2727'].map((ch, i) => (
                  <div key={'sp'+i} style={{ position: 'absolute', fontSize: [14,10,12,8][i], color: [THEME.lavender, THEME.pinkLight, 'white', THEME.lavender][i], top: ['15%','60%','40%','80%'][i], left: ['80%','15%','65%','45%'][i], animation: `sparkleRotate ${3+i}s ease-in-out infinite`, opacity: 0.7 }}>{ch}</div>
                ))}

                <div style={{ position: 'relative', zIndex: 3 }}>
                  {/* Title → Avatar → Name → Instruction */}
                  <div style={{ textAlign: 'center', padding: '24px 24px 0' }}>
                    <h1 style={{ margin: '0 0 18px', fontSize: 32, fontWeight: 900, lineHeight: 1.15 }}>
                      <span style={{ fontFamily: THEME.fontDisplay, fontStyle: 'italic', color: THEME.pinkLight }}>Create</span>{' '}
                      <span style={{ fontFamily: THEME.fontDisplay, fontStyle: 'italic', color: 'white' }}>SizeKit</span>
                    </h1>
                    <div style={{
                      width: 80, height: 80, borderRadius: 24,
                      background: newKitName.trim() ? `linear-gradient(135deg, ${THEME.pinkLight}, ${THEME.lavender})` : `linear-gradient(135deg, rgba(249,168,212,0.25), rgba(196,181,253,0.25))`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      margin: '0 auto', border: `3px solid ${newKitName.trim() ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.1)'}`,
                      transition: 'all 0.3s ease',
                      boxShadow: newKitName.trim() ? '0 4px 20px rgba(232,98,154,0.3)' : 'none',
                    }}>
                      {newKitName.trim() ? (
                        <span style={{ fontSize: 26, fontWeight: 800, color: 'white' }}>{newKitName.trim().split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase()}</span>
                      ) : (
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" strokeLinecap="round"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                      )}
                    </div>
                    <div style={{ fontSize: 20, fontWeight: 800, color: 'white', fontFamily: THEME.fontDisplay, fontStyle: 'italic', marginTop: 12 }}>
                      {newKitName.trim() || 'New Customer'}
                    </div>
                    <div style={{ fontSize: 13, color: THEME.pinkLight, fontWeight: 600, marginTop: 6 }}>
                      {newKitName.trim() ? 'Looking good \u2014 hit create when ready.' : 'Enter a customer name to get started.'}
                    </div>
                  </div>
                </div>
              </div>

              {/* ── Cream form body ── */}
              <div style={{
                background: THEME.cream,
                position: 'relative', zIndex: 2,
                padding: '28px 24px 28px',
              }}>
                {/* Name input */}
                <div style={{ marginBottom: 20 }}>
                  <h3 style={{ fontSize: 16, fontWeight: 800, margin: '0 0 10px', fontFamily: THEME.fontDisplay, color: THEME.text }}>Customer Name</h3>
                  <input
                    autoFocus
                    value={newKitName}
                    onChange={e => setNewKitName(e.target.value)}
                    placeholder="Enter customer name..."
                    onKeyDown={e => {
                      if (e.key === 'Enter' && newKitName.trim()) {
                        const newId = customers.length > 0 ? Math.max(...customers.map(c => c.id)) + 1 : 1;
                        setCustomers(prev => [...prev, {
                          id: newId, name: newKitName.trim(),
                          date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
                          scanComplete: false, outcome: null, outcomeFingers: [], overrides: {}, changelog: [],
                          manual: false, mm: {}, coinMm: {}, borderline: {}, photos: {}, brands: [], tags: [...newKitTags],
                        }]);
                        setNewKitName(""); setNewKitTags([]); setShowCreateKit(false);
                      }
                    }}
                    style={{
                      width: '100%', padding: '14px 16px', borderRadius: 14,
                      border: `1.5px solid ${THEME.border}`, background: THEME.cardBg,
                      fontSize: 15, fontFamily: THEME.fontBody, color: THEME.text,
                      outline: 'none', boxSizing: 'border-box',
                      transition: 'border-color 0.2s, box-shadow 0.2s',
                    }}
                    onFocus={e => { e.target.style.borderColor = THEME.lavender; e.target.style.boxShadow = `0 0 0 3px ${THEME.lavender}22`; }}
                    onBlur={e => { e.target.style.borderColor = THEME.border; e.target.style.boxShadow = 'none'; }}
                  />
                  <div style={{ fontSize: 11, color: THEME.textFaint, marginTop: 6, paddingLeft: 2, fontStyle: 'italic' }}>Add a last name or nickname to avoid duplicates</div>
                </div>

                {/* Tags — tappable presets */}
                <div style={{ borderTop: `1px solid ${THEME.border}`, paddingTop: 16, marginBottom: 24 }}>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, margin: '0 0 12px' }}>
                    <h3 style={{ fontSize: 16, fontWeight: 800, margin: 0, fontFamily: THEME.fontDisplay, color: THEME.text }}>Tags</h3>
                    <span style={{ fontSize: 12, color: THEME.textFaint, fontWeight: 500 }}>optional</span>
                  </div>
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                    {TAG_PRESETS.map(tag => {
                      const active = newKitTags.includes(tag);
                      return (
                        <button key={tag} onClick={() => setNewKitTags(prev => active ? prev.filter(t => t !== tag) : [...prev, tag])} style={{
                          background: active ? `linear-gradient(135deg, ${THEME.pink}18, ${THEME.purple}15)` : THEME.cardBg,
                          border: `1.5px solid ${active ? THEME.lavender : THEME.border}`,
                          borderRadius: THEME.radiusPill, padding: '8px 16px', fontSize: 12, fontWeight: 600,
                          color: active ? THEME.purpleDark : THEME.textMuted,
                          cursor: 'pointer', fontFamily: THEME.fontBody, transition: 'all 0.15s ease',
                        }}>
                          {active && <span style={{ marginRight: 4 }}>&#x2713;</span>}{tag}
                        </button>
                      );
                    })}
                    <button onClick={() => {
                      const tag = prompt("Enter a custom tag:");
                      if (tag?.trim() && !newKitTags.includes(tag.trim())) setNewKitTags(prev => [...prev, tag.trim()]);
                    }} style={{
                      background: 'none', border: `1.5px dashed ${THEME.textFaint}55`,
                      borderRadius: THEME.radiusPill, padding: '8px 16px', fontSize: 12, fontWeight: 600,
                      color: THEME.textFaint, cursor: 'pointer', fontFamily: THEME.fontBody,
                    }}>+ Custom</button>
                  </div>
                  {/* Custom tags (non-preset) shown as removable pills */}
                  {newKitTags.filter(t => !TAG_PRESETS.includes(t)).length > 0 && (
                    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 10 }}>
                      {newKitTags.filter(t => !TAG_PRESETS.includes(t)).map(tag => (
                        <div key={tag} style={{ background: `${THEME.lavender}18`, border: `1px solid ${THEME.lavender}44`, borderRadius: THEME.radiusPill, padding: '6px 14px', fontSize: 12, fontWeight: 600, color: THEME.purpleDark, display: 'flex', alignItems: 'center', gap: 6 }}>
                          {tag}
                          <span onClick={() => setNewKitTags(prev => prev.filter(t2 => t2 !== tag))} style={{ cursor: 'pointer', fontSize: 14, color: THEME.textFaint, lineHeight: 1 }}>&times;</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Buttons */}
                <button
                  disabled={!newKitName.trim()}
                  onClick={() => {
                    const newId = customers.length > 0 ? Math.max(...customers.map(c => c.id)) + 1 : 1;
                    setCustomers(prev => [...prev, {
                      id: newId, name: newKitName.trim(),
                      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
                      scanComplete: false, outcome: null, outcomeFingers: [], overrides: {}, changelog: [],
                      manual: false, mm: {}, coinMm: {}, borderline: {}, photos: {}, brands: [], tags: [...newKitTags],
                    }]);
                    setNewKitName(""); setNewKitTags([]); setShowCreateKit(false);
                  }}
                  style={{
                    width: '100%', padding: 16, marginBottom: 10,
                    background: newKitName.trim() ? `linear-gradient(135deg, ${THEME.pink}, ${THEME.purple})` : THEME.border,
                    border: 'none', borderRadius: THEME.radiusPill, color: 'white', fontSize: 15, fontWeight: 700,
                    cursor: newKitName.trim() ? 'pointer' : 'default', fontFamily: THEME.fontBody,
                    boxShadow: newKitName.trim() ? `0 4px 16px rgba(232,98,154,0.25)` : 'none',
                    position: 'relative', overflow: 'hidden', opacity: newKitName.trim() ? 1 : 0.4,
                    transition: 'opacity 0.2s, box-shadow 0.2s',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                  }}
                >
                  <span style={{ fontSize: 18, fontWeight: 400 }}>+</span> Create SizeKit
                  {newKitName.trim() && <div style={{ position: 'absolute', top: 0, left: 0, width: '50%', height: '100%', background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)', animation: 'shimmer 3s ease-in-out infinite' }} />}
                </button>
                <button
                  onClick={() => { setShowCreateKit(false); setNewKitName(""); setNewKitTags([]); }}
                  style={{
                    width: '100%', padding: 14, background: THEME.cardBg, border: `1.5px solid ${THEME.border}`,
                    borderRadius: THEME.radiusPill, color: THEME.textMuted, fontSize: 14, fontWeight: 600,
                    cursor: 'pointer', fontFamily: THEME.fontBody,
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
            </div>
          </div>
        </>
        );
      })()}
    </div>
  );
}


// ── Brand Size Card ────────────────────────────────────────
function BrandSizeCard({ brand, brandIndex, customer, customerId, reviewedFingers, onFingerTap, onRemove, onEditSize }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [editing, setEditing] = useState(false);

  // Per-brand progress tracking
  const total = FINGERS.length * 2;
  const confirmed = FINGERS.reduce((acc, f) => acc + ["left", "right"].filter(h => reviewedFingers[`${customerId}-${brand.name}-${h}-${f}`]).length, 0);
  const allConfirmed = confirmed === total;
  const showProgress = !customer.manual && customer.scanComplete;

  return (
    <div style={{ background: THEME.cardBg, borderRadius: THEME.radiusCard, padding: '16px 12px', marginBottom: 12, boxShadow: '0 1px 4px rgba(0,0,0,0.04)', border: allConfirmed && showProgress ? `1.5px solid ${THEME.greenBd}` : '1.5px solid transparent' }}>
      {/* Header with brand info + actions */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: showProgress && !allConfirmed ? 8 : 14 }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: THEME.text, fontFamily: THEME.fontDisplay }}>{brand.name} · {brand.shape} · {brand.variant}</div>
            {allConfirmed && showProgress && (
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 4, background: THEME.greenBg, borderRadius: THEME.radiusPill, padding: '3px 10px', border: `1px solid ${THEME.greenBd}` }}>
                <span style={{ fontSize: 10, fontWeight: 700, color: THEME.green }}>{"\u2713"} Reviewed</span>
              </div>
            )}
          </div>
          <div style={{ fontSize: 10, fontWeight: 600, color: THEME.textFaint, marginTop: 2 }}>Sizes from {customer.date} scan</div>
        </div>
        <div style={{ position: 'relative' }}>
          <button onClick={() => setMenuOpen(!menuOpen)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '2px 6px', fontSize: 18, color: THEME.textFaint, lineHeight: 1 }}>{"\u22ee"}</button>
          {menuOpen && (
            <div style={{ position: 'absolute', top: 28, right: 0, background: THEME.cardBg, borderRadius: 14, boxShadow: '0 4px 20px rgba(0,0,0,0.12)', border: `1px solid ${THEME.border}`, overflow: 'hidden', zIndex: 10, minWidth: 140 }}>
              <button onClick={() => { setEditing(!editing); setMenuOpen(false); }} style={{ display: 'block', width: '100%', padding: '10px 14px', background: 'none', border: 'none', borderBottom: `1px solid ${THEME.border}`, fontSize: 13, fontWeight: 600, color: THEME.text, cursor: 'pointer', fontFamily: THEME.fontBody, textAlign: 'left' }}>
                {editing ? "Done editing" : "Edit sizes"}
              </button>
              {brandIndex > 0 && (
                <button onClick={() => { onRemove(brandIndex); setMenuOpen(false); }} style={{ display: 'block', width: '100%', padding: '10px 14px', background: 'none', border: 'none', fontSize: 13, fontWeight: 600, color: '#dc2626', cursor: 'pointer', fontFamily: THEME.fontBody, textAlign: 'left' }}>
                  Remove brand
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Per-brand progress bar */}
      {showProgress && !allConfirmed && (
        <div style={{ marginBottom: 14 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: THEME.purpleDark }}>
              {confirmed}/{total} reviewed
            </div>
            <div style={{ fontSize: 11, color: THEME.textFaint }}>Tap each to review</div>
          </div>
          <div style={{ height: 4, background: `${THEME.lavender}44`, borderRadius: 2, overflow: 'hidden' }}>
            <div style={{ height: '100%', background: `linear-gradient(135deg, ${THEME.pink}, ${THEME.purple})`, borderRadius: 2, width: `${(confirmed / total) * 100}%`, transition: 'width 0.3s ease' }} />
          </div>
        </div>
      )}

      {["left", "right"].map(hand => (
        <div key={hand} style={{ marginBottom: hand === "left" ? 14 : 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: THEME.textMuted, minWidth: 36 }}>
              {hand === "left" ? "Left" : "Right"}
            </div>
            <div style={{ display: 'flex', gap: 6, flex: 1 }}>
              {FINGERS.map(finger => {
                const oKey = `${hand}-${finger}-${brand.name}`;
                const override = customer.overrides[oKey];
                const size = brand[hand]?.[finger];
                const mm = customer.mm[hand]?.[finger];
                const displaySize = override ? override.newSize : size;
                const isCorrected = !!override;
                const reviewKey = `${customerId}-${brand.name}-${hand}-${finger}`;
                const isReviewed = reviewedFingers[reviewKey];
                const showFlag = !isReviewed && !customer.manual && customer.scanComplete;

                return (
                  <div key={finger} style={{ flex: 1, textAlign: 'center', position: 'relative' }}>
                    {!editing && showFlag && !allConfirmed && (
                      <div style={{
                        position: 'absolute', top: -6, right: -4, zIndex: 2,
                        padding: '2px 5px', borderRadius: 6,
                        background: `linear-gradient(135deg, ${THEME.pink}, ${THEME.purple})`,
                        border: '2px solid white',
                        boxShadow: '0 1px 4px rgba(0,0,0,0.1)',
                        fontSize: 7, fontWeight: 800, color: 'white', letterSpacing: 0.3,
                        whiteSpace: 'nowrap',
                      }}>Review</div>
                    )}
                    {!editing && isReviewed && (
                      <div style={{
                        position: 'absolute', top: -8, right: -6, zIndex: 2,
                        width: 20, height: 20, borderRadius: 10,
                        background: THEME.green,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: 11, color: 'white', fontWeight: 900,
                        border: '2.5px solid white',
                        boxShadow: '0 2px 6px rgba(0,0,0,0.12)',
                      }}>{"\u2713"}</div>
                    )}
                    {editing ? (
                      <div style={{ background: THEME.border, borderRadius: 12, padding: '4px 2px' }}>
                        <button onClick={() => onEditSize(brandIndex, hand, finger, displaySize + 1)} style={{ display: 'block', width: '100%', background: 'none', border: 'none', cursor: 'pointer', fontSize: 10, color: THEME.textFaint, fontFamily: THEME.fontBody, padding: '1px 0' }}>{"\u25b2"}</button>
                        <div style={{ fontSize: 8, fontWeight: 700, color: THEME.pink, letterSpacing: 0.3 }}>{finger}</div>
                        <div style={{ fontSize: 18, fontWeight: 900, color: isCorrected ? THEME.purple : THEME.text, lineHeight: 1.1 }}>{displaySize}</div>
                        <button onClick={() => onEditSize(brandIndex, hand, finger, Math.max(0, displaySize - 1))} style={{ display: 'block', width: '100%', background: 'none', border: 'none', cursor: 'pointer', fontSize: 10, color: THEME.textFaint, fontFamily: THEME.fontBody, padding: '1px 0' }}>{"\u25bc"}</button>
                      </div>
                    ) : (
                      <button onClick={() => onFingerTap(hand, finger)} style={{
                        width: '100%', background: showFlag ? `${THEME.lavender}22` : (isReviewed ? '#f0fdf4' : THEME.border),
                        border: showFlag ? `1.5px dashed ${THEME.lavender}` : `1.5px solid ${isReviewed ? THEME.greenBd : 'transparent'}`,
                        borderRadius: 12, padding: '8px 2px 7px', textAlign: 'center',
                        cursor: 'pointer', fontFamily: THEME.fontBody,
                      }}>
                        <div style={{ fontSize: 9, fontWeight: 700, color: THEME.pink, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 2 }}>{finger}</div>
                        <div style={{ fontSize: 22, fontWeight: 900, color: isCorrected ? THEME.purple : THEME.text, lineHeight: 1.1 }}>{displaySize}</div>
                        {mm && <div style={{ fontSize: 9, color: THEME.textFaint, marginTop: 2 }}>{mm}mm</div>}
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ))}
      {editing && (
        <div style={{ textAlign: 'center', marginTop: 8 }}>
          <button onClick={() => setEditing(false)} style={{ background: THEME.cosmic, border: 'none', borderRadius: THEME.radiusPill, padding: '8px 20px', fontSize: 12, fontWeight: 700, color: 'white', cursor: 'pointer', fontFamily: THEME.fontBody }}>Done</button>
        </div>
      )}
    </div>
  );
}


// ── Outcome Flow ───────────────────────────────────────────
function OutcomeFlow({ customer, step, setStep, tempOutcome, setTempOutcome, tempFingers, toggleFinger, submit, cancel }) {
  return (
    <div style={{ background: THEME.cardBg, borderRadius: THEME.radiusCard, padding: 16, boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
      {step === 1 ? (
        <div>
          <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 12 }}>How did the set fit?</div>
          <div style={{ display: 'flex', gap: 6 }}>
            {[{ key: "perfect", label: "Perfect", sub: "Every nail fit", color: "#15803d", bg: THEME.greenBg, bd: THEME.greenBd }, { key: "close", label: "Good", sub: "Minor issues", color: "#4caf50", bg: "#f1f8f3", bd: "#c8e6c9" }, { key: "off", label: "Off", sub: "Problems", color: "#dc2626", bg: "#fee2e2", bd: "#fecaca" }].map(o => (
              <button key={o.key} onClick={() => { setTempOutcome(o.key); if (o.key === "perfect") submit(o.key); else setStep(2); }} style={{ flex: 1, background: o.bg, border: `2px solid ${o.bd}`, borderRadius: THEME.radiusCard, padding: '12px 4px', cursor: 'pointer', textAlign: 'center', fontFamily: THEME.fontBody }}>
                <div style={{ fontSize: 13, fontWeight: 800, color: o.color }}>{o.label}</div>
                <div style={{ fontSize: 9, color: o.color, opacity: 0.7, marginTop: 1 }}>{o.sub}</div>
              </button>
            ))}
          </div>
          <button onClick={cancel} style={{ width: '100%', marginTop: 8, padding: 6, background: 'none', border: 'none', color: THEME.textFaint, fontSize: 11, cursor: 'pointer', fontFamily: THEME.fontBody }}>Cancel</button>
        </div>
      ) : (
        <div>
          <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 10 }}>Which nails were off?</div>
          {["left", "right"].map(hand => (
            <div key={hand} style={{ marginBottom: 10 }}>
              <div style={{ fontSize: 9, fontWeight: 700, color: THEME.textFaint, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 6 }}>{hand} hand</div>
              <div style={{ display: 'flex', gap: 4 }}>
                {FINGERS.map(finger => {
                  const fl = tempFingers.find(f => f.hand === hand && f.finger === finger);
                  const size = customer.brands[0]?.[hand]?.[finger];
                  return (
                    <div key={finger} style={{ flex: 1, textAlign: 'center' }}>
                      <div style={{ background: fl ? (fl.direction === "big" ? '#fef9c3' : '#fee2e2') : THEME.cardBg, borderRadius: 8, padding: '5px 1px', marginBottom: 3, border: `2px solid ${fl ? (fl.direction === "big" ? '#eab308' : '#ef4444') : THEME.border}` }}>
                        <div style={{ fontSize: 7, fontWeight: 700, color: THEME.textFaint }}>{finger}</div>
                        <div style={{ fontSize: 14, fontWeight: 800 }}>{size}</div>
                      </div>
                      <div style={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
                        <button onClick={() => toggleFinger(hand, finger, "big")} style={{ width: 22, height: 16, borderRadius: 4, border: 'none', cursor: 'pointer', fontSize: 7, fontWeight: 800, fontFamily: THEME.fontBody, background: fl?.direction === "big" ? '#eab308' : THEME.border, color: fl?.direction === "big" ? 'white' : THEME.textFaint }}>BIG</button>
                        <button onClick={() => toggleFinger(hand, finger, "small")} style={{ width: 22, height: 16, borderRadius: 4, border: 'none', cursor: 'pointer', fontSize: 7, fontWeight: 800, fontFamily: THEME.fontBody, background: fl?.direction === "small" ? '#ef4444' : THEME.border, color: fl?.direction === "small" ? 'white' : THEME.textFaint }}>SML</button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
          <div style={{ display: 'flex', gap: 6, marginTop: 8 }}>
            <button onClick={() => setStep(1)} style={{ flex: 1, padding: 8, borderRadius: 10, border: `1px solid ${THEME.border}`, background: THEME.cardBg, fontSize: 11, fontWeight: 600, cursor: 'pointer', fontFamily: THEME.fontBody, color: THEME.textMuted }}>Back</button>
            <button onClick={() => submit()} style={{ flex: 2, padding: 8, borderRadius: 10, border: 'none', background: `linear-gradient(135deg, ${THEME.pink}, ${THEME.purple})`, color: 'white', fontSize: 11, fontWeight: 700, cursor: 'pointer', fontFamily: THEME.fontBody }}>Submit</button>
          </div>
        </div>
      )}
    </div>
  );
}


// ── Finger Detail Sheet ────────────────────────────────────
function FingerSheet({ customer, hand, finger, brandName, onClose, onConfirm, onNavigate, reviewedFingers, customerId, saveOverride }) {
  const brand = customer.brands.find(b => b.name === brandName);
  const size = brand?.[hand]?.[finger];
  const altSize = customer.borderline[`${hand}-${finger}`];
  const override = customer.overrides[`${hand}-${finger}-${brandName}`];
  const currentSize = override ? override.newSize : size;
  const [tempSize, setTempSize] = useState(currentSize);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const hasChanged = tempSize !== currentSize;
  const photoKey = `${hand}-${finger}`;
  const photoSrc = customer.photos?.[photoKey] || FINGER_PHOTOS[photoKey] || '/fingers/left-thumb.png';

  // Reset tempSize when finger changes
  useEffect(() => {
    const o = customer.overrides[`${hand}-${finger}-${brandName}`];
    const s = brand?.[hand]?.[finger];
    setTempSize(o ? o.newSize : s);
  }, [hand, finger, brandName]);

  // Build finger sequence for progress bar
  const seq = [];
  ["left", "right"].forEach(h => FINGERS.forEach(f => seq.push({ hand: h, finger: f })));
  const currentIdx = seq.findIndex(s => s.hand === hand && s.finger === finger);

  // Borderline size labels based on fit preference
  const smallSize = altSize ? Math.min(size, altSize) : null;
  const largeSize = altSize ? Math.max(size, altSize) : null;

  const handleConfirm = () => {
    const key = `${hand}-${finger}-${brandName}`;
    if (hasChanged) {
      onConfirm(key, tempSize, "Adjusted during review");
    } else {
      onConfirm(null);
    }
  };

  return (
    <>
      <div onClick={onClose} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', zIndex: 90, backdropFilter: 'blur(4px)' }} />
      <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, background: THEME.cardBg, borderRadius: `${THEME.radiusSheet}px ${THEME.radiusSheet}px 0 0`, zIndex: 100, maxHeight: '92vh', overflowY: 'auto', boxShadow: '0 -4px 30px rgba(0,0,0,0.12)', padding: '12px 24px 32px', display: 'flex', flexDirection: 'column' }}>
        {/* Drag handle */}
        <div style={{ width: 36, height: 4, borderRadius: 2, background: '#d4d4d8', margin: '0 auto 16px' }} />

        {/* Header — big finger name + X */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 4 }}>
          <div>
            <div style={{ fontSize: 28, fontWeight: 900, color: THEME.text, fontFamily: THEME.fontDisplay, fontStyle: 'italic', lineHeight: 1.1 }}>{finger}</div>
            <div style={{ fontSize: 14, color: THEME.textMuted, fontWeight: 500, marginTop: 2 }}>{hand === "left" ? "Left" : "Right"} hand {"\u00b7"} {brandName}</div>
          </div>
          <button onClick={onClose} style={{ width: 36, height: 36, borderRadius: 18, background: THEME.border, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 4 }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={THEME.textMuted} strokeWidth="2.5" strokeLinecap="round"><path d="M18 6L6 18"/><path d="M6 6l12 12"/></svg>
          </button>
        </div>

        {/* Progress segments — tappable, labeled, grouped by hand */}
        <div style={{ marginTop: 12, marginBottom: 20 }}>
          <div style={{ display: 'flex', gap: 3 }}>
            {seq.map((s, i) => {
              const rk = `${customerId}-${brandName}-${s.hand}-${s.finger}`;
              const isReviewed = reviewedFingers[rk];
              const isCurrent = i === currentIdx;
              return (
                <button key={i} onClick={() => onNavigate(s.hand, s.finger)} style={{
                  flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3,
                  background: 'none', border: 'none', padding: '4px 0', cursor: 'pointer',
                  fontFamily: THEME.fontBody, position: 'relative',
                  marginRight: i === 4 ? 8 : 0,
                }}>
                  <div style={{
                    width: '100%', height: 5, borderRadius: 3,
                    background: isReviewed ? THEME.green : (isCurrent ? THEME.pink : `${THEME.lavender}33`),
                    transition: 'background 0.2s',
                    boxShadow: isCurrent ? `0 0 6px ${THEME.pink}55` : 'none',
                  }} />
                  <div style={{
                    fontSize: 7, fontWeight: 700, letterSpacing: 0.2,
                    color: isCurrent ? THEME.pink : (isReviewed ? THEME.green : THEME.textFaint),
                  }}>{s.finger}</div>
                </button>
              );
            })}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 2, paddingRight: 0 }}>
            <div style={{ fontSize: 9, fontWeight: 600, color: THEME.textFaint, textTransform: 'uppercase', letterSpacing: 0.5, width: '50%', paddingLeft: 2 }}>Left</div>
            <div style={{ fontSize: 9, fontWeight: 600, color: THEME.textFaint, textTransform: 'uppercase', letterSpacing: 0.5, width: '50%', paddingLeft: 10 }}>Right</div>
          </div>
        </div>

        {/* Photo area — larger */}
        <div onClick={() => setLightboxOpen(true)} style={{
          borderRadius: THEME.radiusCard, overflow: 'hidden', position: 'relative',
          background: `${THEME.lavender}15`, marginBottom: 16,
          aspectRatio: '1/1', display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer',
        }}>
          {customer.photos?.[photoKey] ? (
            <img src={photoSrc} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          ) : (
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke={`${THEME.lavender}66`} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/>
            </svg>
          )}
          <div style={{ position: 'absolute', top: 12, left: 12, background: 'rgba(0,0,0,0.45)', borderRadius: 8, padding: '5px 12px', backdropFilter: 'blur(8px)' }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: 'white' }}>{finger} {"\u00b7"} {hand === "left" ? "L" : "R"}</span>
          </div>
        </div>

        {/* Recommended size card */}
        <div style={{
          background: THEME.border, borderRadius: THEME.radiusCard, padding: '16px 20px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          marginBottom: altSize ? 12 : 20,
        }}>
          <div style={{ fontSize: 15, fontWeight: 600, color: THEME.text }}>Recommended size</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <button onClick={() => setTempSize(Math.min(11, tempSize + 1))} style={{
                width: 32, height: 24, borderRadius: 8, background: THEME.cardBg, border: `1.5px solid ${THEME.lavender}44`,
                cursor: tempSize >= 11 ? 'default' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: THEME.fontBody,
              }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={tempSize >= 11 ? '#d4d4d8' : THEME.purpleDark} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M18 15l-6-6-6 6"/></svg>
              </button>
              <button onClick={() => setTempSize(Math.max(0, tempSize - 1))} style={{
                width: 32, height: 24, borderRadius: 8, background: THEME.cardBg, border: `1.5px solid ${THEME.lavender}44`,
                cursor: tempSize <= 0 ? 'default' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: THEME.fontBody,
              }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={tempSize <= 0 ? '#d4d4d8' : THEME.purpleDark} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6"/></svg>
              </button>
            </div>
            <div style={{ fontSize: 36, fontWeight: 900, color: THEME.cosmic, fontFamily: THEME.fontDisplay, fontStyle: 'italic', minWidth: 40, textAlign: 'center', lineHeight: 1 }}>{tempSize}</div>
          </div>
        </div>

        {/* Borderline — preference-based options */}
        {altSize && (
          <div style={{ background: `${THEME.lavender}12`, borderRadius: 14, padding: '14px 16px', marginBottom: 20, border: `1px solid ${THEME.lavender}28` }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: THEME.purpleDark, marginBottom: 10, textTransform: 'uppercase', letterSpacing: 0.5 }}>This finger is between sizes</div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button onClick={() => setTempSize(smallSize)} style={{
                flex: 1, padding: '12px 8px', borderRadius: 12,
                background: tempSize === smallSize ? THEME.cosmic : THEME.cardBg,
                border: tempSize === smallSize ? 'none' : `1.5px solid ${THEME.border}`,
                cursor: 'pointer', fontFamily: THEME.fontBody, textAlign: 'center',
              }}>
                <div style={{ fontSize: 22, fontWeight: 900, color: tempSize === smallSize ? 'white' : THEME.text, lineHeight: 1 }}>{smallSize}</div>
                <div style={{ fontSize: 10, fontWeight: 600, color: tempSize === smallSize ? 'rgba(255,255,255,0.7)' : THEME.textMuted, marginTop: 4 }}>Snugger fit</div>
              </button>
              <button onClick={() => setTempSize(largeSize)} style={{
                flex: 1, padding: '12px 8px', borderRadius: 12,
                background: tempSize === largeSize ? THEME.cosmic : THEME.cardBg,
                border: tempSize === largeSize ? 'none' : `1.5px solid ${THEME.border}`,
                cursor: 'pointer', fontFamily: THEME.fontBody, textAlign: 'center',
              }}>
                <div style={{ fontSize: 22, fontWeight: 900, color: tempSize === largeSize ? 'white' : THEME.text, lineHeight: 1 }}>{largeSize}</div>
                <div style={{ fontSize: 10, fontWeight: 600, color: tempSize === largeSize ? 'rgba(255,255,255,0.7)' : THEME.textMuted, marginTop: 4 }}>More comfortable</div>
              </button>
            </div>
          </div>
        )}

        {/* Confirm button */}
        <button onClick={handleConfirm} style={{
          width: '100%', padding: 18, background: THEME.cosmic, border: 'none',
          borderRadius: THEME.radiusPill, fontSize: 16, fontWeight: 700, color: 'white',
          cursor: 'pointer', fontFamily: THEME.fontBody,
          boxShadow: '0 4px 16px rgba(14,10,26,0.3)',
        }}>
          Confirm
        </button>

        {/* Lightbox */}
        {lightboxOpen && ReactDOM.createPortal(
          <div onClick={() => setLightboxOpen(false)} style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.95)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: 0, padding: 0 }}>
            <button onClick={(e) => { e.stopPropagation(); setLightboxOpen(false); }} style={{ position: 'fixed', top: 20, right: 20, zIndex: 10000, width: 44, height: 44, borderRadius: 22, background: 'rgba(255,255,255,0.2)', border: '2px solid rgba(255,255,255,0.3)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(8px)' }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round"><path d="M18 6L6 18"/><path d="M6 6l12 12"/></svg>
            </button>
            <div onClick={e => e.stopPropagation()} style={{ width: '100vw', height: '100vh', overflow: 'scroll', WebkitOverflowScrolling: 'touch', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 0 }}>
              <img src={photoSrc} style={{ width: '200vw', maxWidth: 'none', height: 'auto', objectFit: 'contain', touchAction: 'manipulation' }} />
            </div>
          </div>,
          document.body
        )}
      </div>
    </>
  );
}
