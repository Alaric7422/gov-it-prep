# Gov IT Prep — แพลตฟอร์มติวสอบนักวิชาการคอมพิวเตอร์ปฏิบัติการ (กรมที่ดิน)

เว็บแอปพลิเคชัน E-Learning ภาษาไทยแบบ **100% Static (No-Build / No-Backend)** สำหรับเตรียมสอบข้าราชการตำแหน่ง **นักวิชาการคอมพิวเตอร์ปฏิบัติการ** โดยเฉพาะสังกัด **กรมที่ดิน (Department of Lands)** ถูกออกแบบให้เปิดใช้งานได้ทันทีทั้งจากการเปิดไฟล์ `index.html` โดยตรง (`file://`) บนเครื่องส่วนตัว หรือนำไปโฮสต์ฟรีบน **GitHub Pages**

---

## 1. ภาพรวมและฟีเจอร์หลัก

* **8 บทเรียนเต็มรูปแบบ (อ่านเข้าใจง่ายแบบพี่ติวน้อง):**
  * **หมวดวิชาการคอมพิวเตอร์ (Core IT — 5 บท):**
    1. `CORE-01`: สถาปัตยกรรมคอมพิวเตอร์ ระบบปฏิบัติการ และคลาวด์
    2. `CORE-02`: ฐานข้อมูลเชิงสัมพันธ์ (RDBMS), Normalization, ER Diagram และภาษา SQL
    3. `CORE-03`: การวิเคราะห์และออกแบบระบบ (SAD), SDLC, Flowchart, DFD และ UML
    4. `CORE-04`: เครือข่ายคอมพิวเตอร์, Cyber Security, พ.ร.บ.คอมพิวเตอร์ พ.ศ. 2560 และ PDPA พ.ศ. 2562
    5. `CORE-05`: ตรรกะการเขียนโปรแกรม และโครงสร้างข้อมูล (Array, Stack, Queue)
  * **หมวดเฉพาะทางกรมที่ดิน (DOL Domain — 3 บท):**
    1. `DOL-01`: บทบาท ภารกิจ วิสัยทัศน์ พันธกิจ 4 ข้อ และโครงสร้างกรมที่ดิน (ส่วนกลาง + สำนักงานที่ดินกว่า 460 แห่ง)
    2. `DOL-02`: ประมวลกฎหมายที่ดิน พ.ศ. 2497, เปรียบเทียบเอกสารสิทธิ์ (น.ส.4 จ., น.ส.3 ก., น.ส.3, ส.ป.ก. 4-01), พ.ร.บ.อาคารชุด พ.ศ. 2522 และ พ.ร.บ.การจัดสรรที่ดิน พ.ศ. 2543
    3. `DOL-03`: ระบบสารสนเทศกรมที่ดิน (LandsMaps, พื้นฐาน GIS Vector/Raster/Layer Overlay/UTM, SmartLands Plus+, e-QLands และการจดทะเบียนออนไลน์ต่างสำนักงาน)
* **แบบทดสอบท้ายบทพร้อมเฉลยละเอียดทุกตัวเลือก (ก / ข / ค / ง):** บทละ 8 ข้อ รวม 64 ข้อ
* **คู่มือเจาะลึก Diagram & ออกแบบระบบสำหรับข้อเขียน (`#diagrams-lab`):** ปูพื้นฐานตั้งแต่ศูนย์ครบ 6 หมวด (`Flowchart`, `DFD Level 0/1`, `ER Diagram & 3NF`, `UML Use Case`, `Sequence & Class Diagram`, `System Architecture`) พร้อมแผนภาพ Mermaid และโจทย์ฝึกเขียนข้อสอบ 6 ข้อพร้อมแนวคิดและเกณฑ์ตรวจคำตอบ
* **คู่มือไวยากรณ์ SQL ครบทุกคำสั่งสำหรับข้อเขียน (`#sql-guide`):** สรุปทุกคำสั่งครบ 8 บท (`Data Types & NULL`, `DDL`, `DML`, `SELECT`, `WHERE`, `Aggregate & GROUP BY/HAVING`, `JOIN หลายตาราง`, `Subquery & CASE`) เชื่อมต่อตรงกับฐานข้อมูลกรมที่ดิน 4 ตารางและปุ่มส่งคำสั่งไปรันใน SQL Sandbox พร้อมโจทย์ข้อเขียน SQL 6 ข้อ
* **ลานซ้อม SQL แบบ Dual-Engine (`sql.js` WASM + `AlaSQL` Fallback):** จำลองฐานข้อมูลกรมที่ดิน 4 ตาราง (`land_offices`, `users`, `land_plots`, `transactions`) พร้อมโจทย์ฝึกหัด 10 ข้อตั้งแต่พื้นฐานจนถึง `JOIN`, `GROUP BY`, `HAVING` และ `Subquery`
* **บัตรคำทบทวน 3 มิติ (Flashcards 45 ใบ):** แบ่งเป็น 4 ชุด (`Port & Protocol`, `คำย่อ IT & กฎหมายไซเบอร์`, `เอกสารสิทธิ์ & กฎหมายที่ดิน`, `ระบบดิจิทัล & GIS กรมที่ดิน`)
* **ข้อสอบจำลองจับเวลาเสมือนจริง (Mock Exam 50 ข้อ / 60 นาที):** แบ่งสัดส่วน Core IT 25 ข้อ + กรมที่ดิน 25 ข้อ เลือกได้ทั้งโหมดฝึกทำทีละข้อและโหมดสอบจริง พร้อมวิเคราะห์คะแนนแยกหมวดและคำอธิบายครบทั้ง 4 ตัวเลือก
* **รองรับ Light / Dark Theme และบันทึกความก้าวหน้าอัตโนมัติ** ลงใน `localStorage` ของเบราว์เซอร์

---

## 2. โครงสร้างไฟล์ของโปรเจกต์

```text
Gov IT Prep/
├── index.html                          # หน้าหลัก App Shell, Anti-FOUC, CDN และลำดับโหลดสคริปต์
├── README.md                           # คู่มือการใช้งาน การอัปโหลด GitHub Pages และการขยายโมดูล
├── css/
│   └── styles.css                      # ระบบสี Cadastral GIS & Tech Studio (Light/Dark) และ Layout
├── assets/
│   └── images/                         # ภาพประกอบบทเรียน (PNG / SVG)
│       ├── hero-banner.png
│       ├── core-hardware-room.png
│       ├── core-database-erd.png
│       ├── core-sdlc-blueprint.png
│       ├── core-network-topology.png
│       ├── core-cyber-shield.png
│       ├── core-programming-logic.png
│       ├── dol-office-workflow.svg
│       ├── dol-title-deeds.png
│       └── dol-landsmaps-gis.png
└── js/
    ├── registry.js                     # ศูนย์กลางลงทะเบียนบทเรียนและหน่วยงาน (window.GOV_PREP)
    ├── state.js                        # จัดการ State, ความก้าวหน้า, ธีม และ localStorage
    ├── app.js                          # Hash Router, Sidebar แบบ Modular และ Modal Dialog
    ├── data/
    │   ├── core-1-hardware-os.js       # บทเรียน CORE-01 + ข้อสอบ 8 ข้อ
    │   ├── core-2-database-sql.js      # บทเรียน CORE-02 + ข้อสอบ 8 ข้อ
    │   ├── core-3-sad-sdlc.js          # บทเรียน CORE-03 + ข้อสอบ 8 ข้อ
    │   ├── core-4-network-security.js  # บทเรียน CORE-04 + ข้อสอบ 8 ข้อ
    │   ├── core-5-programming-logic.js # บทเรียน CORE-05 + ข้อสอบ 8 ข้อ
    │   ├── flashcards.js               # ข้อมูลบัตรคำ 45 ใบ (4 หมวด)
    │   ├── mock-exam.js                # ข้อสอบจำลอง 50 ข้อ (25 Core IT + 25 DOL)
    │   ├── diagrams-guide.js           # คู่มือเจาะลึก Diagram 6 หมวด & โจทย์ข้อเขียน 6 ข้อ
    │   ├── sql-guide.js                # คู่มือคำสั่ง SQL 8 บท & โจทย์ข้อเขียน SQL 6 ข้อ
    │   └── agencies/
    │       └── dol.js                  # โมดูลเฉพาะทางกรมที่ดิน (DOL-01..DOL-03)
    ├── components/
    │   ├── mermaid-helper.js           # ตัวเรนเดอร์แผนภาพ Mermaid v11 รองรับสลับธีมอัตโนมัติ
    │   ├── sql-engine.js               # Dual SQL Engine (sql.js + AlaSQL) และฐานข้อมูล 4 ตาราง
    │   └── quiz-engine.js              # ระบบทำข้อสอบและเฉลย ก/ข/ค/ง รายตัวเลือก
    └── views/
        ├── dashboard.js                # หน้าแรกสรุปความคืบหน้าและทางลัดเข้าบทเรียน
        ├── lesson-view.js              # หน้าแสดงเนื้อหาบทเรียน, SVG, Mermaid, SQL Mini Runner และ Quiz
        ├── diagrams-view.js            # หน้าคู่มือเจาะลึก Diagram & ออกแบบระบบ (#diagrams-lab)
        ├── sql-guide-view.js           # หน้าคู่มือคำสั่ง SQL ครบทุกคำสั่ง (#sql-guide)
        ├── flashcards-view.js          # หน้าพลิกการ์ดทบทวน 3D พร้อมกรองหมวดและสับไพ่
        ├── sql-sandbox-view.js         # ลานซ้อม SQL เต็มรูปแบบพร้อม Schema Explorer และ 10 โจทย์
        ├── mock-exam-view.js           # หน้าสอบจำลอง 50 ข้อ จับเวลา 60 นาที และรายงานผล
        └── guide-view.js               # คู่มือ Deploy & ขยายโมดูลภายในแอป
```

---

## 3. ขั้นตอนอัปโหลดขึ้น GitHub Pages ทีละขั้น (ใช้งานฟรี ไม่มีค่าเซิร์ฟเวอร์)

โปรเจกต์นี้ไม่ต้องติดตั้ง Node.js หรือรันคำสั่ง Build ใดๆ สามารถนำขึ้น **GitHub Pages** เพื่อเปิดอ่านผ่านมือถือหรือแชร์ให้เพื่อนติวสอบร่วมกันได้ทันทีตามขั้นตอนนี้:

1. **เตรียม Repository บน GitHub**
   * ลงชื่อเข้าใช้ที่ [github.com](https://github.com) แล้วคลิกปุ่ม **New repository**
   * ตั้งชื่อ Repository เช่น `gov-it-prep-dol` เลือก **Public** (เพื่อให้ใช้ GitHub Pages ฟรี) แล้วกด **Create repository**
2. **อัปโหลดไฟล์ทั้งหมดขึ้น GitHub**
   * **วิธีที่ A (ผ่านหน้าเว็บ — ไม่ต้องใช้ Git CLI):** กดปุ่ม **uploading an existing file** แล้วลากโฟลเดอร์/ไฟล์ทั้งหมดใน `Gov IT Prep/` (`index.html`, `README.md`, `css/`, `js/`, `assets/`) เข้าไป ตรวจสอบให้แน่ใจว่าโฟลเดอร์ย่อยครบถ้วน จากนั้นกด **Commit changes**
   * **วิธีที่ B (ผ่าน Git CLI):**
     ```bash
     git init
     git add .
     git commit -m "Initial commit: Gov IT Prep (Department of Lands)"
     git branch -M main
     git remote add origin https://github.com/<username>/gov-it-prep-dol.git
     git push -u origin main
     ```
3. **เปิดใช้งาน GitHub Pages**
   * เข้าไปที่แท็บ **Settings** ของ Repository
   * เลือกเมนู **Pages** ทางแถบด้านซ้าย (ภายใต้หัวข้อ Code and automation)
   * ที่หัวข้อ **Build and deployment > Source** เลือก **Deploy from a branch**
   * ที่หัวข้อ **Branch** เลือก **`main`** และโฟลเดอร์ **`/ (root)`** แล้วกด **Save**
4. **เข้าใช้งานเว็บไซต์**
   * รอประมาณ 1–3 นาที แล้วรีเฟรชหน้า Settings > Pages จะเห็นลิงก์เว็บไซต์ของคุณ เช่น:
     `https://<username>.github.io/gov-it-prep-dol/`
   * สามารถเปิดใช้งานได้ทั้งบนคอมพิวเตอร์ แท็บเล็ต และสมาร์ทโฟน!

---

## 4. วิธีเพิ่มโมดูลหน่วยงานใหม่ด้วย `registerAgency()` ใน 1 ไฟล์

สถาปัตยกรรมของแอปถูกออกแบบแบบ **Modular Agency Plugin**: ทั้งแถบเมนู Sidebar, หน้าแรก Dashboard, หน้า Lesson และระบบติดตามความก้าวหน้าจะอ่านข้อมูลจาก `window.GOV_PREP.agencies` โดยอัตโนมัติ หากต้องการเพิ่มแนวข้อสอบของหน่วยงานอื่น (เช่น กรมการปกครอง กรมโยธาธิการและผังเมือง หรือสำนักงาน ก.พ.) ให้ทำเพียง **2 ขั้นตอน**:

### ขั้นตอนที่ 1: สร้างไฟล์ข้อมูลหน่วยงานใหม่ 1 ไฟล์
สร้างไฟล์ใหม่ใน `js/data/agencies/` เช่น `js/data/agencies/dopa.js` แล้วเรียกใช้ `window.GOV_PREP.registerAgency({ ... })`:

```javascript
// ตัวอย่าง: js/data/agencies/dopa.js
(function (global) {
  'use strict';

  if (!global.GOV_PREP || typeof global.GOV_PREP.registerAgency !== 'function') {
    console.error('[DOPA] GOV_PREP.registerAgency not found');
    return;
  }

  global.GOV_PREP.registerAgency({
    id: 'dopa', // รหัสเฉพาะตัวอักษรพิมพ์เล็ก ห้ามซ้ำกับ 'dol'
    name: 'กรมการปกครอง (DOPA)',
    shortName: 'กรมการปกครอง',
    badge: 'หน่วยงานเพิ่มเติม',
    description: 'ความรู้เฉพาะทางกฎหมายทะเบียนราษฎร บัตรประจำตัวประชาชน และ Linkage Center',
    lessons: [
      {
        id: 'dopa-1-civil-reg',
        code: 'DOPA-01',
        category: 'agency',
        agencyId: 'dopa',
        order: 9, // กำหนดลำดับต่อจากบทที่ 8
        title: 'พ.ร.บ.การทะเบียนราษฎร และระบบฐานข้อมูลกลางประชาชน',
        shortTitle: 'ทะเบียนราษฎร & Linkage',
        subtitle: 'โครงสร้างเลขบัตร 13 หลัก ระบบฐานข้อมูลทะเบียนกลาง และการเชื่อมโยงข้อมูลภาครัฐ',
        estimatedMinutes: 15,
        icon: 'fa-solid fa-id-card',
        heroVisual: {
          image: 'assets/images/hero-banner.png',
          alt: 'ภาพประกอบระบบฐานข้อมูลทะเบียนราษฎร',
          caption: 'สถาปัตยกรรมการเชื่อมโยงฐานข้อมูลประชาชนกลาง',
          aspectRatio: '16 / 9',
          width: 1200,
          height: 675,
          prompt: 'Clean flat isometric vector illustration of national citizen registry system...'
        },
        summaryTakeaways: [
          'สรุปสาระสำคัญข้อที่ 1 ที่ออกสอบบ่อย',
          'สรุปสาระสำคัญข้อที่ 2 พร้อมข้อควรระวัง'
        ],
        sections: [
          {
            id: 'dopa-sec-1',
            title: '1. โครงสร้างกฎหมายและระบบสารสนเทศ',
            analogyBox: {
              title: 'เปรียบเทียบให้เห็นภาพ',
              body: 'อธิบายแนวคิดหลักด้วยตัวอย่างที่เข้าใจง่าย...'
            },
            bodyHtml: '<p>เนื้อหาบทเรียน ตารางใน &lt;div class="table-wrap"&gt; และกล่องสรุป</p>',
            mermaid: {
              title: 'แผนภาพการเชื่อมโยงข้อมูล',
              caption: 'คำอธิบายใต้แผนภาพ',
              code: 'flowchart LR\n  A["ระบบทะเบียนราษฎร"] --> B["Linkage Center (API กลาง)"]'
            }
          }
        ],
        quiz: [
          {
            id: 'q-dopa1-1',
            question: 'คำถามท้ายบทเรียนข้อที่ 1?',
            options: ['ตัวเลือกที่ 1', 'ตัวเลือกที่ 2', 'ตัวเลือกที่ 3', 'ตัวเลือกที่ 4'],
            correctIndex: 0,
            explanation: {
              summary: 'สรุปเหตุผลของคำตอบที่ถูกต้อง',
              perOption: [
                'ก. ถูกต้อง เพราะ...',
                'ข. ผิด เพราะ...',
                'ค. ผิด เพราะ...',
                'ง. ผิด เพราะ...'
              ]
            }
          }
          // แนะนำให้เพิ่มให้ครบ 8 ข้อต่อ 1 บทเรียน
        ]
      }
    ]
  });
})(window);
```

### ขั้นตอนที่ 2: โหลดไฟล์ใน `index.html` เพียง 1 บรรทัด
เปิดไฟล์ `index.html` แล้วเพิ่มแท็ก `<script defer>` ต่อจาก `js/data/agencies/dol.js` (ก่อนโหลด `js/components/...` และ `js/app.js`):

```html
<script defer src="js/data/agencies/dol.js"></script>
<script defer src="js/data/agencies/dopa.js"></script>
```

เมื่อรีเฟรชหน้าเว็บ เมนู Sidebar หมวด **กรมการปกครอง** การ์ดความก้าวหน้าบน Dashboard และหน้าบทเรียนทั้งหมดจะปรากฏขึ้นโดยอัตโนมัติทันทีโดยไม่ต้องแก้โค้ด UI ใดๆ เพิ่มเติม!

---

## 5. เคล็ดลับสำหรับผู้เขียนเนื้อหาและแผนภาพ Mermaid

* **อ้างอิงภาษาไทยใน Mermaid:** ป้ายข้อความที่มีวงเล็บ `()`, เครื่องหมายทับ `/`, ทวิภาค `:` หรือช่องว่าง ควรใส่เครื่องหมายคำพูดครอบเสมอ เช่น `A["กรมที่ดิน (สังกัดกระทรวงมหาดไทย)"]` เพื่อให้ Mermaid v11 แปลงเป็น SVG ได้อย่างสมบูรณ์ทั้งใน Light และ Dark Mode
* **การเปิดใช้งานแบบ Offline:** แม้ไม่เชื่อมต่ออินเทอร์เน็ต แอปจะยังเปิดบทเรียน ข้อสอบ Flashcards และรัน SQL Sandbox (ผ่าน AlaSQL Fallback) ได้ตามปกติ
