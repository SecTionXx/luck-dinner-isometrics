import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const outDir = new URL("../public/articles/", import.meta.url);

const articles = [
  ["aries", "เมษ", "♈", "เร็ว ตรง ชอบตัดสินใจให้จบ", "ปลาย่างสมุนไพร + ข้าวกล้อง + ผักลวกน้ำพริก", "Wall sit 20-30 วินาที x 3 รอบ"],
  ["taurus", "พฤษภ", "♉", "ชอบของอร่อยที่มั่นคงและอุ่นใจ", "ต้มจืดเต้าหู้หมูสับ + ข้าวไรซ์เบอร์รี่ + ผักสด", "Towel pull hold 15 วินาที x 4 รอบ"],
  ["gemini", "เมถุน", "♊", "อยากได้หลายรส หลาย texture", "กะเพราเต้าหู้ + ไข่ต้ม + แตงกวา + ข้าวกล้องน้อย", "Forearm plank 15-25 วินาที x 3 รอบ"],
  ["cancer", "กรกฎ", "♋", "มื้อเย็นต้องให้ความรู้สึกเหมือนกลับบ้าน", "แกงเลียงกุ้ง + ข้าวกล้อง + ผลไม้ชิ้นเล็ก", "Glute bridge hold 20 วินาที x 3 รอบ"],
  ["leo", "สิงห์", "♌", "อยากให้จานดูดีและรู้สึกมีพลัง", "สเต๊กไก่ไม่ติดหนัง + สลัดผัก + มันหวาน", "Standing calf raise hold 20 วินาที x 4 รอบ"],
  ["virgo", "กันย์", "♍", "ชอบความเป็นระบบ วัดผลได้", "ข้าวกล้อง 1 ส่วน + ผัก 2 ส่วน + อกไก่/เต้าหู้ 1 ส่วน", "Dead bug hold 10-15 วินาทีต่อข้าง x 3 รอบ"],
  ["libra", "ตุล", "♎", "เน้นสมดุล รสไม่หนักไปทางเดียว", "ยำวุ้นเส้นทะเลแบบน้ำยำน้อย + ผักเยอะ + ซุปใส", "Wall press hold 20 วินาที x 4 รอบ"],
  ["scorpio", "พิจิก", "♏", "ต้องการรสเข้ม แต่ยังคุมเกมได้", "ลาบปลา/ลาบเต้าหู้ + ผักสด + ข้าวเหนียวดำเล็กน้อย", "Low squat hold 15-20 วินาที x 3 รอบ"],
  ["sagittarius", "ธนู", "♐", "อยากรู้สึกเหมือนได้ออกไปเที่ยว", "ข้าวยำสมุนไพร + ไข่ต้ม + ปลา/เต้าหู้", "Split stance hold 20 วินาทีต่อข้าง x 3 รอบ"],
  ["capricorn", "มังกร", "♑", "เน้นคุ้มค่า ทำแล้วอยู่ท้อง", "ปลานึ่งมะนาว + ผัดผักน้ำมันน้อย + ข้าวกล้อง", "Chair hover hold 15 วินาที x 4 รอบ"],
  ["aquarius", "กุมภ์", "♒", "ชอบทดลองสูตรใหม่แบบมีเหตุผล", "โบวล์เต้าหู้ย่าง + ธัญพืช + ผักหลายสี + ซอสโยเกิร์ต", "Hollow body hold 10-20 วินาที x 3 รอบ"],
  ["pisces", "มีน", "♓", "ต้องการมื้อที่นุ่มนวลและไม่เร่งร่างกาย", "โจ๊กข้าวกล้องปลา + ขิง + ผักลวก + ผลไม้หวานน้อย", "Breathing plank on knees 15 วินาที x 3 รอบ"],
];

function page([slug, sign, symbol, tone, dinner, move]) {
  const title = `ลัคนา${sign}: เย็นนี้กินอะไรดี`;
  return `<!doctype html>
<html lang="th">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${title}</title>
    <meta name="description" content="ไอเดียมื้อเย็นและท่า isometric สำหรับลัคนา${sign} ใช้เพื่อความบันเทิงและการตัดสินใจมื้อเย็นแบบง่าย" />
    <link rel="canonical" href="https://luck-dinner-isometrics.vercel.app/articles/${slug}.html" />
    <style>
      :root { color-scheme: dark; font-family: system-ui, -apple-system, "Noto Sans Thai", sans-serif; background: #07161b; color: #fff8ec; }
      body { margin: 0; background: linear-gradient(135deg, #07161b, #0f3d3a 55%, #14110e); min-height: 100vh; }
      main { width: min(920px, calc(100% - 36px)); margin: 0 auto; padding: 64px 0; }
      a { color: #6bd0bf; }
      .card { border: 1px solid rgba(255,248,236,.18); background: rgba(7,22,27,.72); padding: clamp(24px, 5vw, 54px); }
      .symbol { color: #d6a94a; font-size: clamp(4rem, 12vw, 8rem); line-height: 1; }
      h1 { font-size: clamp(2.6rem, 8vw, 5.6rem); line-height: 1.02; margin: 18px 0; }
      h2 { color: #6bd0bf; margin-top: 34px; }
      p, li { color: #dacdb8; line-height: 1.8; font-size: 1.05rem; }
      strong { color: #fff8ec; }
    </style>
  </head>
  <body>
    <main>
      <article class="card">
        <div class="symbol">${symbol}</div>
        <h1>${title}</h1>
        <p><strong>Mood:</strong> ${tone}</p>
        <h2>เมนูแนะนำ</h2>
        <p>${dinner}</p>
        <h2>ท่า isometric</h2>
        <p>${move}</p>
        <h2>หมายเหตุ</h2>
        <p>โหราศาสตร์ในเว็บนี้ใช้เป็น entertainment และ mood prompt เท่านั้น ไม่ใช่คำแนะนำทางการแพทย์หรือโภชนาการเฉพาะบุคคล</p>
        <p><a href="/#articles">กลับไปหน้า Rising Dinner Lab</a></p>
      </article>
    </main>
  </body>
</html>`;
}

mkdirSync(outDir, { recursive: true });
articles.forEach((article) => {
  writeFileSync(join(outDir.pathname, `${article[0]}.html`), page(article), "utf8");
});
