import React, { useEffect, useMemo, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  Activity,
  ArrowRight,
  ArrowUp,
  Clock3,
  Dumbbell,
  ExternalLink,
  Menu,
  MoonStar,
  Pause,
  Play,
  RefreshCw,
  RotateCcw,
  ShieldCheck,
  Sparkles,
  Timer,
  Utensils,
  X,
} from "lucide-react";
import "./styles.css";

const ascendants = [
  {
    sign: "เมษ",
    symbol: "♈",
    tone: "เร็ว ตรง ชอบตัดสินใจให้จบ",
    dinner: "ปลาย่างสมุนไพร + ข้าวกล้อง + ผักลวกน้ำพริก",
    move: "Wall sit 20-30 วินาที x 3 รอบ",
    note: "ลดตัวเลือกให้เหลือ 2 เมนู จะตัดสินใจง่ายกว่าเลื่อนดูไปเรื่อยๆ",
  },
  {
    sign: "พฤษภ",
    symbol: "♉",
    tone: "ชอบของอร่อยที่มั่นคงและอุ่นใจ",
    dinner: "ต้มจืดเต้าหู้หมูสับ + ข้าวไรซ์เบอร์รี่ + ผักสด",
    move: "Towel pull hold 15 วินาที x 4 รอบ",
    note: "เลือกเมนูคุ้นเคย แต่ปรับสัดส่วนผักให้ชนะครึ่งจาน",
  },
  {
    sign: "เมถุน",
    symbol: "♊",
    tone: "อยากได้หลายรส หลาย texture",
    dinner: "กะเพราเต้าหู้ + ไข่ต้ม + แตงกวา + ข้าวกล้องน้อย",
    move: "Forearm plank 15-25 วินาที x 3 รอบ",
    note: "ทำเป็น tasting plate เล็กๆ จะสนุกกว่าจานเดียวใหญ่",
  },
  {
    sign: "กรกฎ",
    symbol: "♋",
    tone: "มื้อเย็นต้องให้ความรู้สึกเหมือนกลับบ้าน",
    dinner: "แกงเลียงกุ้ง + ข้าวกล้อง + ผลไม้ชิ้นเล็ก",
    move: "Glute bridge hold 20 วินาที x 3 รอบ",
    note: "ซุปผักอุ่นๆ ช่วยให้มื้อเย็นเบาแต่ไม่รู้สึกขาด",
  },
  {
    sign: "สิงห์",
    symbol: "♌",
    tone: "อยากให้จานดูดีและรู้สึกมีพลัง",
    dinner: "สเต๊กไก่ไม่ติดหนัง + สลัดผัก + มันหวาน",
    move: "Standing calf raise hold 20 วินาที x 4 รอบ",
    note: "จัดจานให้สวยก่อนกิน จะทำให้เมนูสุขภาพไม่น่าเบื่อ",
  },
  {
    sign: "กันย์",
    symbol: "♍",
    tone: "ชอบความเป็นระบบ วัดผลได้",
    dinner: "ข้าวกล้อง 1 ส่วน + ผัก 2 ส่วน + อกไก่/เต้าหู้ 1 ส่วน",
    move: "Dead bug hold 10-15 วินาทีต่อข้าง x 3 รอบ",
    note: "ใช้สูตร 2:1:1 เป็น default แล้วค่อยเปลี่ยนวัตถุดิบตามของในตู้เย็น",
  },
  {
    sign: "ตุล",
    symbol: "♎",
    tone: "เน้นสมดุล รสไม่หนักไปทางเดียว",
    dinner: "ยำวุ้นเส้นทะเลแบบน้ำยำน้อย + ผักเยอะ + ซุปใส",
    move: "Wall press hold 20 วินาที x 4 รอบ",
    note: "เลือกเมนูที่มีเปรี้ยว เค็ม หวานพอดี และไม่ทอด",
  },
  {
    sign: "พิจิก",
    symbol: "♏",
    tone: "ต้องการรสเข้ม แต่ยังคุมเกมได้",
    dinner: "ลาบปลา/ลาบเต้าหู้ + ผักสด + ข้าวเหนียวดำเล็กน้อย",
    move: "Low squat hold 15-20 วินาที x 3 รอบ",
    note: "ใช้สมุนไพรและพริกแทนน้ำมัน จะได้รสจัดโดยไม่หนัก",
  },
  {
    sign: "ธนู",
    symbol: "♐",
    tone: "อยากรู้สึกเหมือนได้ออกไปเที่ยว",
    dinner: "ข้าวยำสมุนไพร + ไข่ต้ม + ปลา/เต้าหู้",
    move: "Split stance hold 20 วินาทีต่อข้าง x 3 รอบ",
    note: "เลือกเมนูที่มีสีและกลิ่นสมุนไพร ทำให้มื้อบ้านๆ ดูมี adventure",
  },
  {
    sign: "มังกร",
    symbol: "♑",
    tone: "เน้นคุ้มค่า ทำแล้วอยู่ท้อง",
    dinner: "ปลานึ่งมะนาว + ผัดผักน้ำมันน้อย + ข้าวกล้อง",
    move: "Chair hover hold 15 วินาที x 4 รอบ",
    note: "เตรียมโปรตีนหลักไว้ก่อน แล้วหมุนผักกับคาร์บตามวัน",
  },
  {
    sign: "กุมภ์",
    symbol: "♒",
    tone: "ชอบทดลองสูตรใหม่แบบมีเหตุผล",
    dinner: "โบวล์เต้าหู้ย่าง + ธัญพืช + ผักหลายสี + ซอสโยเกิร์ต",
    move: "Hollow body hold 10-20 วินาที x 3 รอบ",
    note: "ตั้งโจทย์เป็น prototype มื้อเย็น: ผักครึ่งจาน โปรตีนชัด คาร์บไม่ล้น",
  },
  {
    sign: "มีน",
    symbol: "♓",
    tone: "ต้องการมื้อที่นุ่มนวลและไม่เร่งร่างกาย",
    dinner: "โจ๊กข้าวกล้องปลา + ขิง + ผักลวก + ผลไม้หวานน้อย",
    move: "Breathing plank on knees 15 วินาที x 3 รอบ",
    note: "กินเบาๆ และคุมจังหวะหายใจหลังอาหาร จะช่วยปิดวันแบบสงบ",
  },
];

const researchCards = [
  {
    title: "ดูดวงเป็น entertainment",
    body: "NASA แยก astronomy ออกจาก astrology ชัดเจน และระบุว่าคำกล่าวอ้างของ astrology ไม่ได้อยู่บนหลักฐานทางวิทยาศาสตร์ เว็บนี้จึงใช้ลัคนาเป็น mood prompt ไม่ใช่คำทำนายจริง",
    source: "NASA Space Place",
    href: "https://spaceplace.nasa.gov/constellations/en/index.html",
    featured: true,
  },
  {
    title: "ลัคนาใช้เวลาและสถานที่เกิด",
    body: "ในเชิงโหราศาสตร์ ลัคนาคือจุดตัดของเส้นสุริยวิถีกับขอบฟ้าทิศตะวันออก จึงต้องใช้เวลาและสถานที่เกิด ไม่ใช่แค่วันเกิด",
    source: "Astrodienst Astrowiki",
    href: "https://www.astro.com/astrowiki/en/Ascendant",
  },
  {
    title: "มื้อเย็นใช้หลักจานสุขภาพ",
    body: "สูตร 2:1:1 แบ่งจานเป็นผัก 2 ส่วน ข้าว/แป้ง 1 ส่วน และโปรตีน 1 ส่วน เหมาะกับการตัดสินใจเมนูโดยไม่ต้องนับแคลอรีละเอียด",
    source: "กรมอนามัย / Thai Heart Foundation",
    href: "https://www.thaiheartfound.org/Article/Detail/140054",
  },
  {
    title: "Isometric ต้องหายใจ",
    body: "ท่า isometric คือการเกร็งค้างแบบ static จุดสำคัญคือไม่กลั้นหายใจ เพราะการเบ่งหรือกลั้นลมหายใจอาจเพิ่มความดันโลหิต",
    source: "Mayo Clinic Health System",
    href: "https://www.mayoclinichealthsystem.org/hometown-health/speaking-of-health/isometric-exercise-and-blood-pressure",
  },
];

const cardIcons = [MoonStar, Sparkles, Utensils, Activity];

const dinnerFilters = [
  "ทั้งหมด",
  "งบน้อย",
  "ไม่มีครัว",
  "มังสวิรัติ",
  "โปรตีนสูง",
  "เบาๆ",
];

const dinnerOptions = [
  {
    name: "ข้าวกล้องปลานึ่งมะนาว",
    detail: "โปรตีนชัด ผักลวกครึ่งจาน น้ำจิ้มแยก",
    tags: ["โปรตีนสูง", "เบาๆ"],
  },
  {
    name: "กะเพราเต้าหู้ + ไข่ต้ม",
    detail: "ใช้เต้าหู้แทนเนื้อ ลดน้ำมัน เพิ่มแตงกวา",
    tags: ["มังสวิรัติ", "งบน้อย"],
  },
  {
    name: "สลัดไก่ย่างร้านสะดวกซื้อ",
    detail: "เลือกน้ำสลัดใส เพิ่มนมหรือโยเกิร์ตจืด",
    tags: ["ไม่มีครัว", "โปรตีนสูง", "เบาๆ"],
  },
  {
    name: "ต้มจืดเต้าหู้หมูสับ",
    detail: "ซุปอุ่น ผักเยอะ กินกับข้าวไรซ์เบอร์รี่ครึ่งทัพพี",
    tags: ["งบน้อย", "เบาๆ"],
  },
  {
    name: "โบวล์ไรซ์เบอร์รี่เต้าหู้ย่าง",
    detail: "ธัญพืชหนึ่งส่วน ผักหลายสี โปรตีนจากถั่วเหลือง",
    tags: ["มังสวิรัติ", "โปรตีนสูง"],
  },
  {
    name: "ลาบปลา + ผักสด",
    detail: "รสจัดจากสมุนไพร ไม่ต้องพึ่งของทอด",
    tags: ["โปรตีนสูง", "เบาๆ"],
  },
  {
    name: "โจ๊กข้าวกล้องปลา",
    detail: "เหมาะกับคืนที่อยากกินเบาและไม่อยากคิดเยอะ",
    tags: ["ไม่มีครัว", "เบาๆ"],
  },
  {
    name: "ไข่เจียวผักน้ำมันน้อย",
    detail: "ทำเร็ว ราคาดี เพิ่มผักสดข้างจานให้ครบ 2:1:1",
    tags: ["งบน้อย", "มังสวิรัติ"],
  },
];

const timerPresets = [15, 20, 30];

function getDailyIndex(length) {
  const today = new Date();
  const seed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
  return seed % length;
}

function formatTime(totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60).toString().padStart(2, "0");
  const seconds = (totalSeconds % 60).toString().padStart(2, "0");
  return `${minutes}:${seconds}`;
}

function App() {
  const [selected, setSelected] = useState("กันย์");
  const [filter, setFilter] = useState("ทั้งหมด");
  const [dailyPick, setDailyPick] = useState(() => getDailyIndex(ascendants.length));
  const [duration, setDuration] = useState(20);
  const [secondsLeft, setSecondsLeft] = useState(20);
  const [isRunning, setIsRunning] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [transitioning, setTransitioning] = useState(false);
  const [displayedSign, setDisplayedSign] = useState("กันย์");

  const current = useMemo(
    () => ascendants.find((item) => item.sign === displayedSign) ?? ascendants[5],
    [displayedSign],
  );
  const daily = ascendants[dailyPick];
  const filteredDinners = useMemo(
    () =>
      filter === "ทั้งหมด"
        ? dinnerOptions
        : dinnerOptions.filter((option) => option.tags.includes(filter)),
    [filter],
  );

  // Timer logic
  useEffect(() => {
    if (!isRunning || secondsLeft === 0) {
      return undefined;
    }

    const timerId = window.setInterval(() => {
      setSecondsLeft((value) => Math.max(0, value - 1));
    }, 1000);

    return () => window.clearInterval(timerId);
  }, [isRunning, secondsLeft]);

  useEffect(() => {
    if (secondsLeft === 0) {
      setIsRunning(false);
    }
  }, [secondsLeft]);

  // Scroll-reveal observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" },
    );

    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  function handleSelect(sign) {
    if (sign === selected) return;
    setTransitioning(true);
    setSelected(sign);
    setTimeout(() => {
      setDisplayedSign(sign);
      setTransitioning(false);
    }, 200);
  }

  function chooseDailyRoutine() {
    setDailyPick((value) => (value + 5) % ascendants.length);
    setSelected(ascendants[(dailyPick + 5) % ascendants.length].sign);
  }

  function selectDuration(nextDuration) {
    setDuration(nextDuration);
    setSecondsLeft(nextDuration);
    setIsRunning(false);
  }

  function resetTimer() {
    setSecondsLeft(duration);
    setIsRunning(false);
  }

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <>
      <header className="hero">
        <nav className="topbar" aria-label="Main navigation">
          <a href="#selector" className="brand">
            <MoonStar size={22} aria-hidden="true" />
            <span>Rising Dinner Lab</span>
          </a>
          <div className="navlinks">
            <a href="#selector">ลัคนา</a>
            <a href="#daily">สุ่มคืนนี้</a>
            <a href="#dinner">มื้อเย็น</a>
            <a href="#movement">Isometric</a>
            <a href="#sources">Sources</a>
          </div>
          <button
            className="hamburger"
            type="button"
            aria-label="เปิดเมนู"
            onClick={() => setMenuOpen(true)}
          >
            <Menu size={22} />
          </button>
        </nav>

        <div className="mobile-menu" aria-hidden={!menuOpen}>
          <button
            className="mobile-menu__close"
            type="button"
            aria-label="ปิดเมนู"
            onClick={closeMenu}
          >
            <X size={22} />
          </button>
          <a href="#selector" onClick={closeMenu}>ลัคนา</a>
          <a href="#daily" onClick={closeMenu}>สุ่มคืนนี้</a>
          <a href="#dinner" onClick={closeMenu}>มื้อเย็น</a>
          <a href="#movement" onClick={closeMenu}>Isometric</a>
          <a href="#sources" onClick={closeMenu}>Sources</a>
        </div>

        <div className="hero__media" aria-hidden="true">
          <img src="/images/hero-evening-ritual.png" alt="" />
        </div>
        <div className="hero__content">
          <p className="eyebrow">
            <Sparkles size={18} aria-hidden="true" />
            ดูดวงแบบมี research guardrails
          </p>
          <h1>เย็นนี้กินอะไรดี ถ้าลัคนาเป็นคนเลือก</h1>
          <p className="lead">
            เว็บเล่นสนุกที่เอาลัคนามาเป็น mood selector แล้วแปลงเป็นเมนูเย็นและท่า
            isometric แบบไม่ต้องขยับตัวมาก โดยแยกชัดว่าโหราศาสตร์คือความบันเทิง
            ส่วนอาหารและการออกกำลังกายอิงแหล่งสุขภาพที่ตรวจได้
          </p>
          <a className="cta" href="#selector">
            เริ่มเลือก
            <ArrowRight size={18} aria-hidden="true" />
          </a>
        </div>
      </header>

      <main>
        <section className="intro-band reveal">
          <div className="intro-copy">
            <p className="section-kicker">Concept</p>
            <h2>ไม่ใช่เว็บทำนายอนาคต แต่เป็น decision tool สำหรับคืนนี้</h2>
          </div>
          <div className="metric-strip" aria-label="Research backed principles">
            <div>
              <strong>12</strong>
              <span>ลัคนาเป็น mood filter</span>
            </div>
            <div>
              <strong>2:1:1</strong>
              <span>ผัก : ข้าว/แป้ง : โปรตีน</span>
            </div>
            <div>
              <strong>15-30s</strong>
              <span>เกร็งค้างสั้นๆ พร้อมหายใจ</span>
            </div>
          </div>
        </section>

        <section className="selector-section reveal" id="selector">
          <div className="section-heading">
            <p className="section-kicker">Ascendant Picker</p>
            <h2>เลือกลัคนา แล้วให้ mood ช่วยตัดสินใจ</h2>
          </div>
          <div className="selector-layout">
            <div className="wheel-panel">
              <img src="/images/ascendant-wheel.png" alt="วงล้อลัคนาและสัญลักษณ์โหราศาสตร์เหนือกรุงเทพฯ" />
            </div>
            <div className="controls-panel">
              <div className="sign-grid" role="group" aria-label="เลือก 12 ลัคนา">
                {ascendants.map((item) => (
                  <button
                    className={item.sign === selected ? "active" : ""}
                    key={item.sign}
                    type="button"
                    onClick={() => handleSelect(item.sign)}
                  >
                    <span className="zodiac-symbol">{item.symbol}</span>
                    {item.sign}
                  </button>
                ))}
              </div>
              <article className="result-card">
                <div className={`result-inner${transitioning ? " transitioning" : ""}`}>
                  <p className="result-label">
                    {current.symbol} ลัคนา {current.sign}
                  </p>
                  <h3>{current.tone}</h3>
                  <div className="result-row">
                    <Utensils size={22} aria-hidden="true" />
                    <span>{current.dinner}</span>
                  </div>
                  <div className="result-row">
                    <Dumbbell size={22} aria-hidden="true" />
                    <span>{current.move}</span>
                  </div>
                  <p className="note">{current.note}</p>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section className="phase-one reveal" id="daily">
          <div className="section-heading">
            <p className="section-kicker">Phase 1 Tools</p>
            <h2>สุ่ม routine คืนนี้ แล้วเริ่มทำได้ทันที</h2>
          </div>
          <div className="tool-grid">
            <article className="daily-card">
              <div className="tool-title">
                <RefreshCw size={24} aria-hidden="true" />
                <div>
                  <p>Daily Evening Generator</p>
                  <h3>คืนนี้ของลัคนา {daily.sign}</h3>
                </div>
              </div>
              <p className="tool-copy">{daily.tone}</p>
              <div className="mini-plan">
                <span>กิน: {daily.dinner}</span>
                <span>เกร็งค้าง: {daily.move}</span>
                <span>จำไว้: {daily.note}</span>
              </div>
              <button className="tool-button" type="button" onClick={chooseDailyRoutine}>
                สุ่มคืนนี้
                <RefreshCw size={18} aria-hidden="true" />
              </button>
            </article>

            <article className="timer-card">
              <div className="tool-title">
                <Timer size={24} aria-hidden="true" />
                <div>
                  <p>Isometric Timer</p>
                  <h3>{formatTime(secondsLeft)}</h3>
                </div>
              </div>
              <div className="timer-presets" aria-label="เลือกเวลาค้างท่า">
                {timerPresets.map((preset) => (
                  <button
                    className={preset === duration ? "active" : ""}
                    key={preset}
                    type="button"
                    onClick={() => selectDuration(preset)}
                  >
                    {preset}s
                  </button>
                ))}
              </div>
              <div className="timer-actions">
                <button
                  className="tool-button"
                  type="button"
                  onClick={() => setIsRunning((value) => !value)}
                  disabled={secondsLeft === 0}
                >
                  {isRunning ? <Pause size={18} aria-hidden="true" /> : <Play size={18} aria-hidden="true" />}
                  {isRunning ? "พักก่อน" : "เริ่มจับเวลา"}
                </button>
                <button className="ghost-button" type="button" onClick={resetTimer}>
                  <RotateCcw size={18} aria-hidden="true" />
                  รีเซ็ต
                </button>
              </div>
              <p className="tool-copy">หายใจต่อเนื่อง ไม่กลั้นลม และหยุดถ้าเจ็บหรือเวียนหัว</p>
            </article>
          </div>
        </section>

        <section className="split-section warm-bg reveal" id="dinner">
          <div className="text-block">
            <p className="section-kicker">Dinner Table</p>
            <h2>ตารางเย็นนี้กินอะไรดี</h2>
            <p>
              ใช้หลักง่ายๆ: เริ่มจากผักครึ่งจาน เลือกคาร์บไม่ขัดสีประมาณหนึ่งส่วน
              แล้วเติมโปรตีนไขมันต่ำอีกหนึ่งส่วน ถ้ามื้อเย็นหนักมาทั้งวัน ให้ลดน้ำมัน
              น้ำหวาน และของทอดก่อนลดอาหารหลักจนหิวเกินไป
            </p>
            <div className="dinner-list">
              <span>ปลา/ไก่/เต้าหู้</span>
              <span>ข้าวกล้อง/ไรซ์เบอร์รี่/มันหวาน</span>
              <span>ผักสด/ผักลวก/ซุปผัก</span>
              <span>ผลไม้หวานน้อยหรือโยเกิร์ต</span>
            </div>
          </div>
          <img className="section-image" src="/images/dinner-grid.png" alt="ตารางอาหารเย็นไทยแบบสมดุล 4 จาน" />
        </section>

        <section className="filter-section reveal" aria-labelledby="filter-heading">
          <div className="section-heading">
            <p className="section-kicker">Meal Filters</p>
            <h2 id="filter-heading">กรองเมนูตามชีวิตจริงของคืนนี้</h2>
          </div>
          <div className="filter-tabs" role="group" aria-label="ตัวกรองเมนูเย็น">
            {dinnerFilters.map((item) => (
              <button
                className={item === filter ? "active" : ""}
                key={item}
                type="button"
                onClick={() => setFilter(item)}
              >
                {item}
              </button>
            ))}
          </div>
          <div className="meal-grid">
            {filteredDinners.map((option) => (
              <article className="meal-card" key={option.name}>
                <p>{option.tags.join(" / ")}</p>
                <h3>{option.name}</h3>
                <span>{option.detail}</span>
              </article>
            ))}
          </div>
        </section>

        <section className="split-section reverse cool-bg reveal" id="movement">
          <img className="section-image" src="/images/isometric-home.png" alt="ตัวอย่างท่า wall sit plank และ towel pull ที่บ้าน" />
          <div className="text-block">
            <p className="section-kicker">Still Strength</p>
            <h2>ออกกำลังกายแบบไม่ขยับตัวมาก</h2>
            <p>
              Isometric คือการออกแรงค้างในท่าหนึ่งโดยแทบไม่มีการเคลื่อนข้อ เหมาะกับช่วงสั้นๆ
              ก่อนอาบน้ำหรือหลังเลิกงาน เริ่มเบา หายใจช้า และหยุดถ้ามีอาการเจ็บ เวียนหัว
              หรือหายใจไม่ทัน
            </p>
            <div className="safety-grid">
              <div>
                <Clock3 size={22} aria-hidden="true" />
                <strong>ค้างสั้น</strong>
                <span>15-30 วินาทีต่อรอบ</span>
              </div>
              <div>
                <Activity size={22} aria-hidden="true" />
                <strong>หายใจต่อเนื่อง</strong>
                <span>ไม่เบ่ง ไม่กลั้นลม</span>
              </div>
              <div>
                <ShieldCheck size={22} aria-hidden="true" />
                <strong>คุมความเสี่ยง</strong>
                <span>มีโรคประจำตัวให้ถามแพทย์ก่อน</span>
              </div>
            </div>
          </div>
        </section>

        <section className="research-section reveal" id="sources">
          <div className="section-heading">
            <p className="section-kicker">Research Notes</p>
            <h2>ข้อมูลที่ใช้กำกับเนื้อหา</h2>
          </div>
          <div className="research-layout">
            <img src="/images/research-board.png" alt="บอร์ด research สำหรับโหราศาสตร์ อาหาร และท่าออกกำลัง" />
            <div className="source-grid">
              {researchCards.map((card, i) => {
                const Icon = cardIcons[i];
                return (
                  <a
                    className={`source-card${card.featured ? " featured" : ""}`}
                    href={card.href}
                    key={card.title}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Icon size={20} aria-hidden="true" />
                    <div className="source-card__text">
                      <h3>{card.title}</h3>
                      <p>{card.body}</p>
                    </div>
                    <span>
                      {card.source}
                      <ExternalLink size={15} aria-hidden="true" />
                    </span>
                  </a>
                );
              })}
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div>
          <div className="footer-brand">
            <MoonStar size={20} aria-hidden="true" />
            Rising Dinner Lab
          </div>
          <p className="footer-tagline">
            <em>พรุ่งนี้ลัคนาเปลี่ยน — มื้อเย็นเปลี่ยนตาม</em>
            แต่หลักสุขภาพยังเดิม: ผักครึ่งจาน หายใจไม่กลั้น
          </p>
        </div>
        <a className="back-to-top" href="#">
          <ArrowUp size={16} aria-hidden="true" />
          กลับขึ้นบน
        </a>
        <div className="footer-meta">
          <span>โหราศาสตร์ = ความบันเทิง · อาหารและท่าออกกำลัง = แหล่งอ้างอิงตรวจได้</span>
          <span>Rising Dinner Lab © 2026</span>
        </div>
      </footer>
    </>
  );
}

createRoot(document.getElementById("root")).render(<App />);
