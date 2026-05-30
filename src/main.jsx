import React, { useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  Activity,
  Apple,
  ArrowRight,
  Clock3,
  Dumbbell,
  ExternalLink,
  MoonStar,
  ShieldCheck,
  Sparkles,
  Utensils,
} from "lucide-react";
import "./styles.css";

const ascendants = [
  {
    sign: "เมษ",
    tone: "เร็ว ตรง ชอบตัดสินใจให้จบ",
    dinner: "ปลาย่างสมุนไพร + ข้าวกล้อง + ผักลวกน้ำพริก",
    move: "Wall sit 20-30 วินาที x 3 รอบ",
    note: "ลดตัวเลือกให้เหลือ 2 เมนู จะตัดสินใจง่ายกว่าเลื่อนดูไปเรื่อยๆ",
  },
  {
    sign: "พฤษภ",
    tone: "ชอบของอร่อยที่มั่นคงและอุ่นใจ",
    dinner: "ต้มจืดเต้าหู้หมูสับ + ข้าวไรซ์เบอร์รี่ + ผักสด",
    move: "Towel pull hold 15 วินาที x 4 รอบ",
    note: "เลือกเมนูคุ้นเคย แต่ปรับสัดส่วนผักให้ชนะครึ่งจาน",
  },
  {
    sign: "เมถุน",
    tone: "อยากได้หลายรส หลาย texture",
    dinner: "กะเพราเต้าหู้ + ไข่ต้ม + แตงกวา + ข้าวกล้องน้อย",
    move: "Forearm plank 15-25 วินาที x 3 รอบ",
    note: "ทำเป็น tasting plate เล็กๆ จะสนุกกว่าจานเดียวใหญ่",
  },
  {
    sign: "กรกฎ",
    tone: "มื้อเย็นต้องให้ความรู้สึกเหมือนกลับบ้าน",
    dinner: "แกงเลียงกุ้ง + ข้าวกล้อง + ผลไม้ชิ้นเล็ก",
    move: "Glute bridge hold 20 วินาที x 3 รอบ",
    note: "ซุปผักอุ่นๆ ช่วยให้มื้อเย็นเบาแต่ไม่รู้สึกขาด",
  },
  {
    sign: "สิงห์",
    tone: "อยากให้จานดูดีและรู้สึกมีพลัง",
    dinner: "สเต๊กไก่ไม่ติดหนัง + สลัดผัก + มันหวาน",
    move: "Standing calf raise hold 20 วินาที x 4 รอบ",
    note: "จัดจานให้สวยก่อนกิน จะทำให้เมนูสุขภาพไม่น่าเบื่อ",
  },
  {
    sign: "กันย์",
    tone: "ชอบความเป็นระบบ วัดผลได้",
    dinner: "ข้าวกล้อง 1 ส่วน + ผัก 2 ส่วน + อกไก่/เต้าหู้ 1 ส่วน",
    move: "Dead bug hold 10-15 วินาทีต่อข้าง x 3 รอบ",
    note: "ใช้สูตร 2:1:1 เป็น default แล้วค่อยเปลี่ยนวัตถุดิบตามของในตู้เย็น",
  },
  {
    sign: "ตุล",
    tone: "เน้นสมดุล รสไม่หนักไปทางเดียว",
    dinner: "ยำวุ้นเส้นทะเลแบบน้ำยำน้อย + ผักเยอะ + ซุปใส",
    move: "Wall press hold 20 วินาที x 4 รอบ",
    note: "เลือกเมนูที่มีเปรี้ยว เค็ม หวานพอดี และไม่ทอด",
  },
  {
    sign: "พิจิก",
    tone: "ต้องการรสเข้ม แต่ยังคุมเกมได้",
    dinner: "ลาบปลา/ลาบเต้าหู้ + ผักสด + ข้าวเหนียวดำเล็กน้อย",
    move: "Low squat hold 15-20 วินาที x 3 รอบ",
    note: "ใช้สมุนไพรและพริกแทนน้ำมัน จะได้รสจัดโดยไม่หนัก",
  },
  {
    sign: "ธนู",
    tone: "อยากรู้สึกเหมือนได้ออกไปเที่ยว",
    dinner: "ข้าวยำสมุนไพร + ไข่ต้ม + ปลา/เต้าหู้",
    move: "Split stance hold 20 วินาทีต่อข้าง x 3 รอบ",
    note: "เลือกเมนูที่มีสีและกลิ่นสมุนไพร ทำให้มื้อบ้านๆ ดูมี adventure",
  },
  {
    sign: "มังกร",
    tone: "เน้นคุ้มค่า ทำแล้วอยู่ท้อง",
    dinner: "ปลานึ่งมะนาว + ผัดผักน้ำมันน้อย + ข้าวกล้อง",
    move: "Chair hover hold 15 วินาที x 4 รอบ",
    note: "เตรียมโปรตีนหลักไว้ก่อน แล้วหมุนผักกับคาร์บตามวัน",
  },
  {
    sign: "กุมภ์",
    tone: "ชอบทดลองสูตรใหม่แบบมีเหตุผล",
    dinner: "โบวล์เต้าหู้ย่าง + ธัญพืช + ผักหลายสี + ซอสโยเกิร์ต",
    move: "Hollow body hold 10-20 วินาที x 3 รอบ",
    note: "ตั้งโจทย์เป็น prototype มื้อเย็น: ผักครึ่งจาน โปรตีนชัด คาร์บไม่ล้น",
  },
  {
    sign: "มีน",
    tone: "ต้องการมื้อที่นุ่มนวลและไม่เร่งร่างกาย",
    dinner: "โจ๊กข้าวกล้องปลา + ขิง + ผักลวก + ผลไม้หวานน้อย",
    move: "Breathing plank on knees 15 วินาที x 3 รอบ",
    note: "กินเบาๆ และคุมจังหวะหายใจหลังอาหาร จะช่วยปิดวันแบบสงบ",
  },
];

const researchCards = [
  {
    title: "ลัคนาใช้เวลาและสถานที่เกิด",
    body: "ในเชิงโหราศาสตร์ ลัคนาคือจุดตัดของเส้นสุริยวิถีกับขอบฟ้าทิศตะวันออก จึงต้องใช้เวลาและสถานที่เกิด ไม่ใช่แค่วันเกิด",
    source: "Astrodienst Astrowiki",
    href: "https://www.astro.com/astrowiki/en/Ascendant",
  },
  {
    title: "ดูดวงเป็น entertainment",
    body: "NASA แยก astronomy ออกจาก astrology ชัดเจน และระบุว่าคำกล่าวอ้างของ astrology ไม่ได้อยู่บนหลักฐานทางวิทยาศาสตร์ เว็บนี้จึงใช้ลัคนาเป็น mood prompt ไม่ใช่คำทำนายจริง",
    source: "NASA Space Place",
    href: "https://spaceplace.nasa.gov/constellations/en/index.html",
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

function App() {
  const [selected, setSelected] = useState("กันย์");
  const current = useMemo(
    () => ascendants.find((item) => item.sign === selected) ?? ascendants[5],
    [selected],
  );

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
            <a href="#dinner">มื้อเย็น</a>
            <a href="#movement">Isometric</a>
            <a href="#sources">Sources</a>
          </div>
        </nav>

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
        <section className="intro-band">
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

        <section className="selector-section" id="selector">
          <div className="section-heading">
            <p className="section-kicker">Ascendant Picker</p>
            <h2>เลือกลัคนา แล้วให้ mood ช่วยตัดสินใจ</h2>
          </div>
          <div className="selector-layout">
            <div className="wheel-panel">
              <img src="/images/ascendant-wheel.png" alt="วงล้อลัคนาและสัญลักษณ์โหราศาสตร์เหนือกรุงเทพฯ" />
            </div>
            <div className="controls-panel">
              <div className="sign-grid" aria-label="เลือก 12 ลัคนา">
                {ascendants.map((item) => (
                  <button
                    className={item.sign === selected ? "active" : ""}
                    key={item.sign}
                    type="button"
                    onClick={() => setSelected(item.sign)}
                  >
                    {item.sign}
                  </button>
                ))}
              </div>
              <article className="result-card">
                <p className="result-label">ลัคนา {current.sign}</p>
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
              </article>
            </div>
          </div>
        </section>

        <section className="split-section" id="dinner">
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

        <section className="split-section reverse" id="movement">
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

        <section className="research-section" id="sources">
          <div className="section-heading">
            <p className="section-kicker">Research Notes</p>
            <h2>ข้อมูลที่ใช้กำกับเนื้อหา</h2>
          </div>
          <div className="research-layout">
            <img src="/images/research-board.png" alt="บอร์ด research สำหรับโหราศาสตร์ อาหาร และท่าออกกำลัง" />
            <div className="source-grid">
              {researchCards.map((card) => (
                <a className="source-card" href={card.href} key={card.title} target="_blank" rel="noreferrer">
                  <Apple size={20} aria-hidden="true" />
                  <h3>{card.title}</h3>
                  <p>{card.body}</p>
                  <span>
                    {card.source}
                    <ExternalLink size={15} aria-hidden="true" />
                  </span>
                </a>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

createRoot(document.getElementById("root")).render(<App />);
