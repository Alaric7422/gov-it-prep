(function (global) {
  'use strict';

  if (!global.GOV_PREP || typeof global.GOV_PREP.registerLesson !== 'function') {
    console.error('[CORE-05] GOV_PREP.registerLesson not found');
    return;
  }

  global.GOV_PREP.registerLesson({
    id: 'core-5-programming-logic',
    code: 'CORE-05',
    category: 'core',
    agencyId: null,
    order: 5,
    title: 'ตรรกะการเขียนโปรแกรม โครงสร้างควบคุม และโครงสร้างข้อมูล',
    shortTitle: 'เขียนโปรแกรม & โครงสร้างข้อมูล',
    subtitle: 'ปูพื้นฐานตัวแปร ตัวดำเนินการ If-Else/Loops การไล่โค้ด Trace Table, Array, Stack (LIFO), Queue (FIFO), OOP และ Big-O อัลกอริทึม',
    estimatedMinutes: 20,
    icon: 'fa-solid fa-code',
    heroVisual: {
      image: 'assets/images/core-programming-logic.png',
      alt: 'ภาพประกอบโครงสร้างข้อมูล Array, Stack, Queue และการไหลของอัลกอริทึมการเขียนโปรแกรม',
      caption: 'หัวใจของนักพัฒนา: คิดเป็นลำดับขั้นตอน (Control Flow) และเลือกโครงสร้างข้อมูล (Data Structures) ให้เหมาะกับงาน',
      aspectRatio: '16 / 9',
      width: 1200,
      height: 675,
      prompt: 'Clean flat isometric tech illustration in Cadastral GIS & Tech Studio palette (emerald #0F5E4D, amber #D97706, cream #F4F7F6). Visual programming logic studio showing clean floating blocks for If-Else branches, a circular For-Loop track, an indexed Array locker row, a vertical LIFO Stack of glowing plates, and a horizontal FIFO Queue conveyor belt. Crisp educational editorial vector style.'
    },
    summaryTakeaways: [
      'ลำดับความสำคัญตัวดำเนินการ: วงเล็บ () → คูณ/หาร/Mod (* / %) → บวก/ลบ (+ -) → เปรียบเทียบ (> < ==) → NOT (!) → AND (&&) → OR (||)',
      'ลูป while ตรวจสอบเงื่อนไขก่อนทำ (อาจไม่ทำเลย 0 รอบ), do-while ทำก่อนตรวจสอบ (ทำอย่างน้อย 1 รอบเสมอ), break = ออกจากลูปทันที, continue = ข้ามรอบนี้ไปรอบถัดไป',
      'Array เข้าถึงข้อมูลด้วย Index (เริ่มที่ 0) ใช้เวลา O(1), Stack ใช้หลัก LIFO (เข้าทีหลังออกก่อน), Queue ใช้หลัก FIFO (มาก่อนออกก่อน)',
      '4 เสาหลัก OOP (APIE): Encapsulation (ห่อหุ้มซ่อนข้อมูล), Inheritance (สืบทอดคลาส), Polymorphism (หลายรูปแบบ), Abstraction (นามธรรมซ่อนความซับซ้อน)',
      'Binary Search ค้นหาได้เร็วระดับ O(log n) แต่มีเงื่อนไขบังคับว่าข้อมูลใน Array ต้องเรียงลำดับ (Sorted) แล้วเท่านั้น!'
    ],
    sections: [
      {
        id: 'variables-operators',
        title: '1. ตัวแปร ชนิดข้อมูล ตัวดำเนินการ และตรรกศาสตร์',
        analogyBox: {
          title: 'เปรียบเทียบให้เห็นภาพ: กล่องติดป้ายชื่อเก็บข้อมูล',
          body: '<strong>ตัวแปร (Variable)</strong> เหมือน <strong>"กล่องเก็บของที่ติดป้ายชื่อไว้"</strong> แต่ละกล่องมีชนิดข้อมูล (Data Type) กำหนดไว้ว่าใส่ได้เฉพาะของประเภทไหน เช่น กล่อง <code>int</code> ใส่จำนวนเต็มอย่างจำนวนแปลงที่ดิน, กล่อง <code>float/double</code> ใส่ทศนิยมอย่างเนื้อที่ตารางวา, กล่อง <code>string</code> ใส่ข้อความเลขโฉนด, และกล่อง <code>boolean</code> เก็บได้แค่ค่าความจริง <code>true</code> หรือ <code>false</code>'
        },
        bodyHtml: `
<p>เวลาเจอข้อสอบอ่านโค้ด (Code Tracing) สิ่งที่ทำให้พลาดบ่อยที่สุดคือการคำนวณตัวดำเนินการผิดลำดับ และสับสนระหว่างการหารเอาเศษ (Modulo) กับตรรกศาสตร์ <code>AND / OR</code> ครับ</p>

<h3>ตัวดำเนินการที่ต้องแม่น (Arithmetic &amp; Logical Operators)</h3>
<ul>
  <li><strong>Modulo (<code>%</code>):</strong> หารเอา<strong>เศษ</strong> เช่น <code>17 % 5 = 2</code> (5 คูณ 3 ได้ 15 เหลือเศษ 2) นิยมใช้เช็กเลขคู่/คี่ (<code>x % 2 == 0</code>)</li>
  <li><strong>Integer Division vs Float Division:</strong> ในภาษา C / Java / SQLite หากนำจำนวนเต็มหารจำนวนเต็ม เช่น <code>7 / 2</code> จะได้ <code>3</code> (ปัดเศษทศนิยมทิ้ง!) ต้องใช้ <code>7.0 / 2</code> จึงจะได้ <code>3.5</code></li>
  <li><strong><code>=</code> vs <code>==</code> vs <code>===</code>:</strong> <code>=</code> คือการกำหนดค่าใส่ตัวแปร (Assignment), <code>==</code> คือเปรียบเทียบความเท่ากัน, ส่วน <code>===</code> ใน JavaScript เช็กทั้งค่า<em>และ</em>ชนิดข้อมูล (เช่น <code>5 === '5'</code> ได้ <code>false</code>)</li>
</ul>

<div class="table-wrap">
  <table>
    <caption>ตารางค่าความจริง (Truth Table) และลำดับความสำคัญตัวดำเนินการ</caption>
    <thead>
      <tr>
        <th scope="col">A</th>
        <th scope="col">B</th>
        <th scope="col">A &amp;&amp; B (AND)</th>
        <th scope="col">A || B (OR)</th>
        <th scope="col">A ^ B (XOR)</th>
        <th scope="col">!A (NOT A)</th>
      </tr>
    </thead>
    <tbody>
      <tr><td><code>true</code></td><td><code>true</code></td><td><strong>true</strong></td><td>true</td><td>false</td><td>false</td></tr>
      <tr><td><code>true</code></td><td><code>false</code></td><td>false</td><td>true</td><td><strong>true</strong></td><td>false</td></tr>
      <tr><td><code>false</code></td><td><code>true</code></td><td>false</td><td>true</td><td><strong>true</strong></td><td>true</td></tr>
      <tr><td><code>false</code></td><td><code>false</code></td><td>false</td><td><strong>false</strong></td><td>false</td><td>true</td></tr>
    </tbody>
  </table>
</div>

<div class="callout callout-tip">
  <strong><i class="fa-solid fa-bolt" aria-hidden="true"></i> ลำดับความสำคัญ (Operator Precedence) จากสูงไปต่ำ:</strong>
  <code>()</code> → <code>!</code> (NOT) → <code>* / %</code> → <code>+ -</code> → <code>&lt; &lt;= &gt; &gt;=</code> → <code>== !=</code> → <code>&amp;&amp;</code> (AND ทำก่อน OR!) → <code>||</code> (OR)<br>
  <em>ตัวอย่าง:</em> <code>true || false &amp;&amp; false</code> จะทำ <code>false &amp;&amp; false</code> ก่อนได้ <code>false</code> แล้วค่อยทำ <code>true || false</code> ได้ผลลัพธ์สุดท้ายเป็น <strong><code>true</code></strong>!
</div>`
      },
      {
        id: 'control-flow',
        title: '2. โครงสร้างควบคุม: If-Else, Loops และเทคนิคทำ Trace Table',
        bodyHtml: `
<p>โปรแกรมทุกโปรแกรมประกอบจากโครงสร้างควบคุมพื้นฐานเพียง 3 แบบ คือ <strong>1) ลำดับ (Sequence)</strong> ทำจากบนลงล่าง, <strong>2) ทางเลือก (Selection)</strong> <code>if / else if / else</code> และ <code>switch-case</code>, และ <strong>3) การวนซ้ำ (Iteration / Loop)</strong></p>

<h3>เปรียบเทียบ Loop ทั้ง 3 ชนิด + break &amp; continue</h3>
<div class="table-wrap">
  <table>
    <caption>เปรียบเทียบโครงสร้างวนซ้ำ for, while และ do-while</caption>
    <thead>
      <tr>
        <th scope="col">โครงสร้างวนซ้ำ</th>
        <th scope="col">จังหวะตรวจเงื่อนไข</th>
        <th scope="col">จำนวนรอบต่ำสุด</th>
        <th scope="col">เหมาะกับงานแบบใด</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th scope="row"><code>for</code> loop</th>
        <td>ตรวจก่อนเข้าแต่ละรอบ</td>
        <td>0 รอบ (หากเงื่อนไขเท็จตั้งแต่แรก)</td>
        <td>รู้จำนวนรอบแน่นอน เช่น วนอ่านแปลงที่ดินตั้งแต่รายการที่ 0 ถึง n-1</td>
      </tr>
      <tr>
        <th scope="row"><code>while</code> loop</th>
        <td>ตรวจก่อนเข้าแต่ละรอบ (Pre-test)</td>
        <td>0 รอบ</td>
        <td>ไม่รู้จำนวนรอบล่วงหน้า วนจนกว่าเงื่อนไขจะเป็นเท็จ เช่น อ่านไฟล์จนจบ (EOF)</td>
      </tr>
      <tr>
        <th scope="row"><code>do ... while</code></th>
        <td>ทำ 1 รอบก่อน แล้วค่อยตรวจ (Post-test)</td>
        <td><strong>อย่างน้อย 1 รอบเสมอ</strong></td>
        <td>แสดงเมนูให้ผู้ใช้เลือกหรือรับรหัสผ่านอย่างน้อย 1 ครั้งก่อนเช็กเงื่อนไข</td>
      </tr>
    </tbody>
  </table>
</div>

<h3>ฝึกไล่ค่าตัวแปร (Trace Table) ก่อนตอบข้อสอบ!</h3>
<p>อย่าคิดในใจเด็ดขาดเมื่อเจอโค้ดวนลูปในห้องสอบ! ให้เขียนตารางไล่ค่าตัวแปรทีละรอบเหมือนตัวอย่างคำนวณค่าธรรมเนียมรวมของแปลงที่ดิน 4 แปลงด้านล่างนี้:</p>
<pre tabindex="0"><code>let prices = [1200, 3500, 800, 4000];
let total = 0;
for (let i = 0; i &lt; prices.length; i++) {
  if (prices[i] &lt; 1000) {
    continue; // ข้ามแปลงที่ต่ำกว่า 1,000 บาท
  }
  total = total + prices[i];
}
// ไล่ Trace Table:
// รอบ i=0: prices[0]=1200 (&gt;=1000) -&gt; total = 0 + 1200 = 1200
// รอบ i=1: prices[1]=3500 (&gt;=1000) -&gt; total = 1200 + 3500 = 4700
// รอบ i=2: prices[2]=800  (&lt;1000)  -&gt; continue! (total ยังคงเป็น 4700)
// รอบ i=3: prices[3]=4000 (&gt;=1000) -&gt; total = 4700 + 4000 = 8700
// จบลูป: total = 8700</code></pre>`,
        mermaid: {
          title: 'แผนผังการทำงานของ For-Loop สะสมยอดค่าธรรมเนียม (Trace Flow)',
          caption: 'สังเกตเส้นทางวนกลับจาก continue ไปเพิ่มค่า i++ และจุดหยุดเมื่อเงื่อนไข i < 4 เป็นเท็จ',
          code: `flowchart TD
  S(["เริ่มต้น: total = 0, i = 0"]) --> COND{"i < 4 หรือไม่?"}
  COND -->|"เท็จ (จบวนลูป)"| OUT[/"แสดงผล total สุดท้าย"/] --> E(["สิ้นสุด"])
  COND -->|"จริง"| CHK{"prices[i] < 1000?"}
  CHK -->|"จริง (continue)"| INC["i = i + 1"]
  CHK -->|"เท็จ"| ADD["total = total + prices[i]"] --> INC
  INC --> COND`
        }
      },
      {
        id: 'data-structures',
        title: '3. โครงสร้างข้อมูลหลัก: Array, Stack (LIFO) และ Queue (FIFO)',
        analogyBox: {
          title: 'เปรียบเทียบให้เห็นภาพ: ตู้ล็อกเกอร์ กองจาน และแถวรอคิว',
          body: '• <strong>Array:</strong> เหมือน <strong>"ตู้ล็อกเกอร์เรียงติดกันมีเลขห้อง Index 0, 1, 2..."</strong> รู้เลขห้องเมื่อไรเปิดหยิบได้ทันทีใน 1 ก้าว (<code>O(1)</code>)<br>• <strong>Stack (LIFO):</strong> เหมือน <strong>"กองจานในร้านอาหาร"</strong> ใบที่ล้างเสร็จทีหลังวางซ้อนบนสุด (<strong>Push</strong>) และลูกค้าคนถัดไปจะหยิบใบบนสุดไปใช้ก่อน (<strong>Pop</strong>) → <em>Last-In, First-Out</em><br>• <strong>Queue (FIFO):</strong> เหมือน <strong>"แถวรอคิวหน้าเคาน์เตอร์กรมที่ดิน"</strong> ใครมาก่อนเข้าต่อท้ายแถว (<strong>Enqueue</strong>) และได้เรียกคิวออกจากหัวแถวก่อน (<strong>Dequeue</strong>) → <em>First-In, First-Out</em>'
        },
        bodyHtml: `
<p>ข้อสอบโครงสร้างข้อมูล (Data Structures) จะทดสอบทั้งความเข้าใจหลักการและการไล่ลำดับ <code>Push/Pop</code> กับ <code>Enqueue/Dequeue</code> รวมถึงการนำไปประยุกต์ใช้จริงในระบบคอมพิวเตอร์ครับ</p>`,
        visualCard: {
          type: 'svg',
          caption: 'ภาพเปรียบเทียบโครงสร้างข้อมูล Array (Index เริ่ม 0), Stack (LIFO) และ Queue (FIFO) พร้อมทิศทางคำสั่งหลัก',
          svgHtml: `<svg role="img" viewBox="0 0 760 440" width="100%" xmlns="http://www.w3.org/2000/svg" aria-labelledby="svg-ds-title">
  <title id="svg-ds-title">แผนภาพเปรียบเทียบ Array, Stack LIFO และ Queue FIFO</title>
  <rect x="0" y="0" width="760" height="440" rx="14" fill="#F4F7F6" stroke="#D5E1DD" stroke-width="2"/>
  <text x="380" y="34" text-anchor="middle" font-family="Prompt, Sarabun, sans-serif" font-size="18" font-weight="700" fill="#0F5E4D">โครงสร้างข้อมูลพื้นฐาน: Array vs Stack (LIFO) vs Queue (FIFO)</text>

  <!-- Panel 1: Array -->
  <rect x="24" y="54" width="712" height="114" rx="10" fill="#FFFFFF" stroke="#D5E1DD" stroke-width="1.5"/>
  <text x="44" y="80" font-family="Prompt, sans-serif" font-size="15" font-weight="700" fill="#0F5E4D">1. Array — เข้าถึงตรงด้วย Index O(1) (เริ่มที่ 0)</text>
  <text x="44" y="100" font-family="Sarabun, sans-serif" font-size="12" fill="#475569">เรียกใช้ arr[2] ได้ค่า 310 ทันทีโดยไม่ต้องไล่ค้นจากช่องแรก</text>

  <g transform="translate(335, 68)">
    <rect x="0" y="14" width="68" height="42" fill="#E6F4F1" stroke="#0F5E4D" stroke-width="2"/>
    <text x="34" y="40" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="14" font-weight="700" fill="#122026">101</text>
    <text x="34" y="74" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="11" fill="#475569">[0]</text>

    <rect x="68" y="14" width="68" height="42" fill="#E6F4F1" stroke="#0F5E4D" stroke-width="2"/>
    <text x="102" y="40" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="14" font-weight="700" fill="#122026">205</text>
    <text x="102" y="74" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="11" fill="#475569">[1]</text>

    <rect x="136" y="14" width="68" height="42" fill="#FEF3C7" stroke="#D97706" stroke-width="2.5"/>
    <text x="170" y="40" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="14" font-weight="700" fill="#92400E">310</text>
    <text x="170" y="74" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="11" font-weight="700" fill="#D97706">[2] Hit!</text>

    <rect x="204" y="14" width="68" height="42" fill="#E6F4F1" stroke="#0F5E4D" stroke-width="2"/>
    <text x="238" y="40" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="14" font-weight="700" fill="#122026">450</text>
    <text x="238" y="74" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="11" fill="#475569">[3]</text>

    <rect x="272" y="14" width="68" height="42" fill="#E6F4F1" stroke="#0F5E4D" stroke-width="2"/>
    <text x="306" y="40" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="14" font-weight="700" fill="#122026">520</text>
    <text x="306" y="74" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="11" fill="#475569">[4]</text>
  </g>

  <!-- Panel 2: Stack (LIFO) -->
  <rect x="24" y="184" width="348" height="232" rx="10" fill="#FFFFFF" stroke="#D5E1DD" stroke-width="1.5"/>
  <text x="44" y="210" font-family="Prompt, sans-serif" font-size="15" font-weight="700" fill="#0F5E4D">2. Stack — LIFO (เข้าหลังออกก่อน)</text>
  <text x="44" y="230" font-family="Sarabun, sans-serif" font-size="12" fill="#475569">ใช้กับ Undo/Redo, Back เบราว์เซอร์, Call Stack</text>

  <!-- Stack bucket -->
  <polyline points="140,295 140,398 256,398 256,295" fill="none" stroke="#334E58" stroke-width="3"/>
  <rect x="148" y="362" width="100" height="30" rx="4" fill="#E6F4F1" stroke="#0F5E4D" stroke-width="1.5"/>
  <text x="198" y="382" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="13" font-weight="700" fill="#122026">10 (Bottom)</text>
  <rect x="148" y="326" width="100" height="30" rx="4" fill="#E6F4F1" stroke="#0F5E4D" stroke-width="1.5"/>
  <text x="198" y="346" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="13" font-weight="700" fill="#122026">20</text>
  <rect x="148" y="290" width="100" height="30" rx="4" fill="#FEF3C7" stroke="#D97706" stroke-width="2"/>
  <text x="198" y="310" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="13" font-weight="700" fill="#92400E">30 (Top)</text>

  <!-- Push / Pop arrows -->
  <line x1="115" y1="252" x2="165" y2="285" stroke="#0F5E4D" stroke-width="2.5"/>
  <polygon points="168,287 156,286 162,276" fill="#0F5E4D"/>
  <text x="86" y="258" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="11" font-weight="700" fill="#0F5E4D">Push(30)</text>

  <line x1="232" y1="285" x2="282" y2="252" stroke="#D97706" stroke-width="2.5"/>
  <polygon points="285,250 273,251 279,261" fill="#D97706"/>
  <text x="312" y="258" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="11" font-weight="700" fill="#D97706">Pop()→30</text>

  <!-- Panel 3: Queue (FIFO) -->
  <rect x="388" y="184" width="348" height="232" rx="10" fill="#FFFFFF" stroke="#D5E1DD" stroke-width="1.5"/>
  <text x="408" y="210" font-family="Prompt, sans-serif" font-size="15" font-weight="700" fill="#0F5E4D">3. Queue — FIFO (มาก่อนออกก่อน)</text>
  <text x="408" y="230" font-family="Sarabun, sans-serif" font-size="12" fill="#475569">ใช้กับคิว e-QLands, Print Spooler, BFS</text>

  <!-- Queue lane -->
  <line x1="450" y1="294" x2="674" y2="294" stroke="#334E58" stroke-width="3"/>
  <line x1="450" y1="354" x2="674" y2="354" stroke="#334E58" stroke-width="3"/>

  <rect x="460" y="302" width="62" height="44" rx="4" fill="#FEF3C7" stroke="#D97706" stroke-width="2"/>
  <text x="491" y="329" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="13" font-weight="700" fill="#92400E">Q1</text>

  <rect x="531" y="302" width="62" height="44" rx="4" fill="#E6F4F1" stroke="#0F5E4D" stroke-width="1.5"/>
  <text x="562" y="329" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="13" font-weight="700" fill="#122026">Q2</text>

  <rect x="602" y="302" width="62" height="44" rx="4" fill="#E6F4F1" stroke="#0F5E4D" stroke-width="1.5"/>
  <text x="633" y="329" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="13" font-weight="700" fill="#122026">Q3</text>

  <text x="491" y="282" text-anchor="middle" font-family="Sarabun, sans-serif" font-size="12" font-weight="700" fill="#D97706">Front (หัวแถว)</text>
  <text x="633" y="282" text-anchor="middle" font-family="Sarabun, sans-serif" font-size="12" font-weight="700" fill="#0F5E4D">Rear (ท้ายแถว)</text>

  <!-- Dequeue / Enqueue arrows -->
  <line x1="452" y1="324" x2="408" y2="324" stroke="#D97706" stroke-width="2.5"/>
  <polygon points="402,324 414,317 414,331" fill="#D97706"/>
  <text x="434" y="384" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="11" font-weight="700" fill="#D97706">Dequeue()→Q1</text>

  <line x1="720" y1="324" x2="678" y2="324" stroke="#0F5E4D" stroke-width="2.5"/>
  <polygon points="672,324 684,317 684,331" fill="#0F5E4D"/>
  <text x="688" y="384" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="11" font-weight="700" fill="#0F5E4D">Enqueue(Q4)</text>
</svg>`
        }
      },
      {
        id: 'oop-algorithms',
        title: '4. พื้นฐาน OOP (APIE) และอัลกอริทึมค้นหา-เรียงลำดับ (Big-O)',
        bodyHtml: `
<p>ปิดท้ายคอร์สหลักด้วย 2 หัวข้อที่ออกสอบความเข้าใจเชิงสถาปัตยกรรมซอฟต์แวร์เสมอ ได้แก่ <strong>OOP (Object-Oriented Programming)</strong> และความซับซ้อนเชิงเวลา <strong>Big-O Notation</strong> ครับ</p>

<h3>4 เสาหลักของ OOP (จำง่ายว่า A-P-I-E)</h3>
<ul>
  <li><strong>E — Encapsulation (การห่อหุ้มข้อมูล):</strong> ซ่อนรายละเอียดภายใน (กำหนด Field เป็น <code>private</code>) แล้วเปิดให้เข้าถึงผ่านเมธอดที่ปลอดภัย (<code>public get/set</code>) เช่น ห้ามแก้ราคาประเมินที่ดินตรงๆ ต้องผ่านเมธอดตรวจสอบสิทธิ์ก่อน</li>
  <li><strong>I — Inheritance (การสืบทอด):</strong> คลาสลูก (Subclass) สืบทอดคุณสมบัติและเมธอดจากคลาสแม่ (Superclass) เพื่อลดโค้ดซ้ำซ้อน เช่น <code>TitleDeed</code> (โฉนด น.ส.4 จ.) สืบทอดมาจาก <code>LandDocument</code></li>
  <li><strong>P — Polymorphism (ความหลากหลายรูปแบบ):</strong> เมธอดชื่อเดียวกันแต่ทำงานต่างกันตามชนิดของวัตถุ (Overriding / Overloading) เช่น <code>calculateFee()</code> ของแปลงโฉนดกับอาคารชุดคำนวณสูตรต่างกัน</li>
  <li><strong>A — Abstraction (ความเป็นนามธรรม):</strong> เปิดเผยเฉพาะส่วนสำคัญที่ผู้ใช้ต้องเรียกใช้ และซ่อนความซับซ้อนเบื้องหลัง (ใช้ Abstract Class หรือ Interface)</li>
</ul>

<h3>ตารางเปรียบเทียบอัลกอริทึมค้นหา-เรียงลำดับ และ Big-O</h3>
<div class="table-wrap">
  <table>
    <caption>เปรียบเทียบเวลาการทำงาน (Time Complexity) และเงื่อนไขของอัลกอริทึมยอดฮิต</caption>
    <thead>
      <tr>
        <th scope="col">อัลกอริทึม</th>
        <th scope="col">Big-O (เฉลี่ย / แย่สุด)</th>
        <th scope="col">เงื่อนไขและจุดออกสอบ</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th scope="row">Array Index Lookup / Hash Table</th>
        <td><code>O(1)</code></td>
        <td>เร็วคงที่ไม่ว่าข้อมูลมีกี่ล้านรายการ (Hash Table กรณีไม่มี Collision)</td>
      </tr>
      <tr>
        <th scope="row">Binary Search (ค้นหาแบบทวิภาค)</th>
        <td><code>O(log n)</code></td>
        <td>แบ่งครึ่งช่วงค้นหาทีละครึ่ง! ข้อมูล 1,000,000 รายการค้นไม่เกิน 20 ครั้ง <strong>(เงื่อนไข: ข้อมูลต้องเรียงลำดับแล้วเท่านั้น!)</strong></td>
      </tr>
      <tr>
        <th scope="row">Linear Search (ค้นหาเรียงลำดับ)</th>
        <td><code>O(n)</code></td>
        <td>ไล่ตรวจทีละตัวตั้งแต่ต้นจนจบ ใช้ได้กับข้อมูลที่<em>ยังไม่ได้เรียงลำดับ</em></td>
      </tr>
      <tr>
        <th scope="row">Merge Sort / Quick Sort</th>
        <td><code>O(n log n)</code></td>
        <td>อัลกอริทึมเรียงลำดับประสิทธิภาพสูงแบบ Divide &amp; Conquer (Quick Sort กรณีแย่สุดเป็น <code>O(n²)</code>)</td>
      </tr>
      <tr>
        <th scope="row">Bubble Sort / Insertion Sort</th>
        <td><code>O(n²)</code></td>
        <td>วนลูปซ้อน 2 ชั้น (Nested Loop) เหมาะกับชุดข้อมูลขนาดเล็กหรือเกือบเรียงแล้ว</td>
      </tr>
    </tbody>
  </table>
</div>

<div class="callout callout-info">
  <strong><i class="fa-solid fa-repeat" aria-hidden="true"></i> ข้อควรระวังของ Recursion (ฟังก์ชันเรียกตัวเอง):</strong>
  ฟังก์ชัน Recursive ทุกตัว<strong>ต้องมี Base Case (เงื่อนไขหยุด)</strong> หากลืมเขียน Base Case ฟังก์ชันจะเรียกตัวเองไม่รู้จบจนหน่วยความจำ Call Stack เต็ม เกิด Error ที่เรียกว่า <strong>Stack Overflow</strong>!
</div>`,
        mermaid: {
          title: 'Binary Search Step Trace: ค้นหาเลข 50 ใน Array ที่เรียงแล้ว [10, 20, 30, 40, 50, 60, 70]',
          caption: 'แบ่งครึ่งช่วงค้นหาทุกครั้ง ทำให้เจอค่า 50 ในการเปรียบเทียบเพียง 2 รอบ (แทนที่จะไล่ 5 รอบแบบ Linear Search)',
          code: `flowchart LR
  S1["รอบที่ 1: ช่วง index 0..6 • ค่ากลาง mid=3 คือ 40"] --> CHK1{"50 > 40 จึงตัดครึ่งซ้ายทิ้ง"}
  CHK1 --> S2["รอบที่ 2: ช่วง index 4..6 • ค่ากลาง mid=5 คือ 60"]
  S2 --> CHK2{"50 < 60 จึงตัดครึ่งขวาทิ้ง"}
  CHK2 --> S3["รอบที่ 3: เหลือ index 4..4 • mid=4 คือ 50"]
  S3 --> FOUND(["พบเป้าหมาย 50 ที่ index 4!"])`
        }
      }
    ],
    quiz: [
      {
        id: 'q-core5-1',
        question: 'กำหนดให้ตัวแปร a = 14, b = 4, c = true, d = false ข้อใดคือผลลัพธ์ของนิพจน์: (a % b == 2) && d || c',
        options: [
          'true',
          'false',
          '2',
          'เกิด Syntax Error'
        ],
        correctIndex: 0,
        explanation: {
          summary: '14 % 4 ได้เศษ 2 (true), true && false ได้ false, แล้วทำ false || true ได้ผลลัพธ์เป็น true',
          perOption: [
            'ก. ถูกต้อง ตามลำดับความสำคัญ: (14 % 4 == 2) → (2 == 2) → true จากนั้นทำ true && false ได้ false แล้วค่อยทำ false || true ได้ true',
            'ข. ผิด เพราะตัวดำเนินการ && ทำก่อน || จึงเหลือ false || true ซึ่งมีค่าเป็น true',
            'ค. ผิด นิพจน์นี้มีตัวดำเนินการเปรียบเทียบและตรรกะ ผลลัพธ์จึงเป็นค่า Boolean ไม่ใช่ตัวเลข',
            'ง. ผิด ไวยากรณ์ถูกต้องสมบูรณ์ในภาษาตระกูล C, Java และ JavaScript'
          ]
        }
      },
      {
        id: 'q-core5-2',
        question: 'เมื่อรันโค้ดเงื่อนไขต่อไปนี้กับ score = 78 หน้าจอจะพิมพ์ข้อความใดออกมา?\nif (score >= 80) { print("A"); }\nelse if (score >= 70) { print("B"); }\nelse if (score >= 75) { print("B+"); }\nelse { print("C"); }',
        options: [
          'A',
          'B',
          'B+',
          'พิมพ์ทั้ง B และ B+'
        ],
        correctIndex: 1,
        explanation: {
          summary: 'โครงสร้าง if / else if จะทำงานเฉพาะบล็อกแรกที่เป็นจริงแล้วข้าม else if ที่เหลือทั้งหมดทันที',
          perOption: [
            'ก. ผิด 78 >= 80 เป็นเท็จ จึงข้ามไปตรวจเงื่อนไขถัดไป',
            'ข. ถูกต้อง เมื่อตรวจ 78 >= 70 ซึ่งเป็นจริง ระบบจะพิมพ์ "B" แล้วออกจากชุด if-else ทันที โดยไม่ลงไปตรวจ >= 75 เลย (เป็น Bug จากการเรียงเงื่อนไขที่พบบ่อย!)',
            'ค. ผิด เงื่อนไข >= 75 อยู่หลัง >= 70 จึงถูกบังและไม่มีวันถูกเข้าถึงสำหรับค่า >= 70',
            'ง. ผิด else if จะเลือกทำได้เพียงทางเดียวเท่านั้น ไม่เหมือน if แยกอิสระหลายตัว'
          ]
        }
      },
      {
        id: 'q-core5-3',
        question: 'จงไล่ค่าตัวแปรจากโค้ดต่อไปนี้ ค่าสุดท้ายของ sum เท่ากับเท่าใด?\nlet sum = 0;\nfor (let i = 1; i <= 5; i++) {\n  if (i === 3) continue;\n  if (i === 5) break;\n  sum = sum + i;\n}',
        options: [
          '3',
          '7',
          '10',
          '12'
        ],
        correctIndex: 1,
        explanation: {
          summary: 'รอบ i=1 (sum=1), i=2 (sum=3), i=3 (continue ข้าม), i=4 (sum=7), i=5 (break หยุดลูป)',
          perOption: [
            'ก. ผิด นั่นคือค่าก่อนรอบ i=4 (หาก break ที่ 3)',
            'ข. ถูกต้อง sum บวกเฉพาะ i=1, 2, 4 (1 + 2 + 4 = 7) เพราะ i=3 ถูกข้ามด้วย continue และ i=5 ออกจากลูปทันทีด้วย break',
            'ค. ผิด 10 คือกรณีที่ไม่ได้ใส่ continue ที่ i=3 (1+2+3+4) หรือไม่เจอ break',
            'ง. ผิด 12 คือกรณีที่บวก i=5 เข้าไปด้วย'
          ]
        }
      },
      {
        id: 'q-core5-4',
        question: 'ข้อใดกล่าวถึงความแตกต่างระหว่างลูป while และ do-while รวมถึง Array Index ได้ถูกต้อง?',
        options: [
          'while ทำงานอย่างน้อย 1 รอบเสมอ และ Array มี Index เริ่มที่ 1',
          'do-while ทำงานอย่างน้อย 1 รอบเสมอแม้เงื่อนไขเป็นเท็จตั้งแต่แรก และ Array เข้าถึงสมาชิกด้วย Index (เริ่มที่ 0) ในเวลา O(1)',
          'ทั้ง while และ do-while ไม่สามารถใช้คำสั่ง break ได้',
          'การเข้าถึงสมาชิก arr[5] ใน Array ต้องไล่นับตั้งแต่ arr[0] ใช้เวลา O(n)'
        ],
        correctIndex: 1,
        explanation: {
          summary: 'do-while เป็น Post-test loop (ทำก่อนตรวจ อย่างน้อย 1 รอบ) และ Array เก็บต่อเนื่องใน RAM จึงเข้าถึงผ่าน Index 0..n-1 ได้ใน O(1)',
          perOption: [
            'ก. ผิด while เป็น Pre-test (อาจทำ 0 รอบ) และ Array ในภาษาหลักเริ่มที่ Index 0',
            'ข. ถูกต้อง ครอบคลุมทั้งลักษณะการทำงานของ do-while และการเข้าถึง Array แบบ Random Access O(1)',
            'ค. ผิด ทั้ง while และ do-while รองรับ break และ continue ตามปกติ',
            'ง. ผิด O(n) เป็นความเร็วของการเข้าถึงสมาชิกใน Linked List ไม่ใช่ Array'
          ]
        }
      },
      {
        id: 'q-core5-5',
        question: 'เริ่มต้นมี Stack ว่างอยู่ 1 ชุด จากนั้นทำคำสั่งตามลำดับ: Push(10), Push(20), Pop(), Push(30), Push(40), Pop() อยากทราบว่าค่าที่ถูก Pop ออกมาล่าสุด และค่าที่อยู่บนสุด (Top) ของ Stack ในขณะนี้คือค่าใดตามลำดับ?',
        options: [
          'Pop ล่าสุด = 10, Top ของ Stack = 20',
          'Pop ล่าสุด = 40, Top ของ Stack = 30',
          'Pop ล่าสุด = 20, Top ของ Stack = 40',
          'Pop ล่าสุด = 40, Top ของ Stack = 10'
        ],
        correctIndex: 1,
        explanation: {
          summary: 'Stack ใช้หลัก LIFO: [10] → [10,20] → Pop ได้ 20 เหลือ [10] → [10,30] → [10,30,40] → Pop ได้ 40 เหลือ [10,30]',
          perOption: [
            'ก. ผิด นั่นเป็นการคิดแบบ Queue (FIFO) ที่หยิบตัวแรกสุดออก',
            'ข. ถูกต้อง Pop ครั้งแรกได้ 20, Pop ครั้งที่สองได้ 40, สุดท้ายเหลือ [10, 30] โดย Top คือ 30',
            'ค. ผิด Pop ครั้งที่สองต้องหยิบ 40 ที่เพิ่ง Push เข้าไปล่าสุดออกก่อน',
            'ง. ผิด 10 อยู่ด้านล่างสุด (Bottom) ส่วน 30 อยู่บนสุด (Top)'
          ]
        }
      },
      {
        id: 'q-core5-6',
        question: 'เริ่มต้นมี Queue ว่างอยู่ 1 ชุด จากนั้นทำคำสั่ง: Enqueue("Q1"), Enqueue("Q2"), Dequeue(), Enqueue("Q3"), Dequeue() ข้อมูลที่ยังเหลืออยู่ใน Queue และข้อมูลที่ถูก Dequeue ออกไปล่าสุดคือข้อใด?',
        options: [
          'เหลือ "Q3" และ Dequeue ล่าสุดคือ "Q2"',
          'เหลือ "Q1" และ Dequeue ล่าสุดคือ "Q3"',
          'เหลือ "Q2" และ Dequeue ล่าสุดคือ "Q1"',
          'เหลือ "Q3" และ Dequeue ล่าสุดคือ "Q1"'
        ],
        correctIndex: 0,
        explanation: {
          summary: 'Queue ใช้หลัก FIFO: [Q1] → [Q1,Q2] → Dequeue ได้ Q1 เหลือ [Q2] → [Q2,Q3] → Dequeue ได้ Q2 เหลือ [Q3]',
          perOption: [
            'ก. ถูกต้อง มาก่อนออกก่อน: Q1 ออกรอบแรก, Q2 ออกรอบสอง, เหลือ Q3 รออยู่ในคิว',
            'ข. ผิด Q1 ถูก Dequeue ออกไปเป็นตัวแรกสุดแล้ว',
            'ค. ผิด Q2 ออกไปในการ Dequeue ครั้งที่สอง',
            'ง. ผิด การ Dequeue ล่าสุด (ครั้งที่สอง) จะต้องได้ Q2 ไม่ใช่ Q1'
          ]
        }
      },
      {
        id: 'q-core5-7',
        question: 'ข้อใดคือเงื่อนไขบังคับก่อนใช้ Binary Search (O(log n)) และหากมีข้อมูลอยู่ 1,024 รายการ Binary Search จะใช้จำนวนการเปรียบเทียบในกรณีแย่ที่สุดประมาณกี่ครั้ง?',
        options: [
          'ไม่ต้องเรียงข้อมูลก่อน, ใช้ประมาณ 512 ครั้ง',
          'ข้อมูลต้องเรียงลำดับ (Sorted) แล้วเท่านั้น, ใช้ไม่เกินประมาณ 10–11 ครั้ง (log₂ 1024 = 10)',
          'ต้องเก็บข้อมูลใน Stack เท่านั้น, ใช้ 1 ครั้ง',
          'ข้อมูลต้องไม่มีเลขคู่, ใช้ประมาณ 1,024 ครั้ง'
        ],
        correctIndex: 1,
        explanation: {
          summary: 'Binary Search ตัดข้อมูลทิ้งทีละครึ่งจึงทำงานได้ใน O(log₂ n) แต่ต้องเรียงข้อมูลมาก่อนเสมอ',
          perOption: [
            'ก. ผิด 512 ครั้งเป็นค่าเฉลี่ยของ Linear Search และ Binary Search ใช้กับข้อมูลไม่เรียงไม่ได้',
            'ข. ถูกต้อง เพราะ 2¹⁰ = 1,024 จึงแบ่งครึ่งค้นหาไม่เกิน ~10–11 รอบเท่านั้น และจำเป็นต้องเรียงลำดับข้อมูลไว้ก่อน',
            'ค. ผิด Binary Search ใช้กับ Array ที่เข้าถึงตำแหน่งกึ่งกลางได้ทันที ไม่ใช่ Stack',
            'ง. ผิด 1,024 ครั้งคือ Worst-case ของ Linear Search (O(n))'
          ]
        }
      },
      {
        id: 'q-core5-8',
        question: 'ในแนวคิด OOP การกำหนด Attribute ยอดเงินหรือราคาประเมินในคลาสให้เป็น "private" เพื่อป้องกันการแก้ไขค่าโดยตรงจากภายนอก แล้วบังคับให้เรียกผ่านเมธอดตรวจสอบสิทธิ์แทน ตรงกับเสาหลักใดของ OOP?',
        options: [
          'Polymorphism',
          'Inheritance',
          'Encapsulation',
          'Recursion'
        ],
        correctIndex: 2,
        explanation: {
          summary: 'การห่อหุ้มข้อมูลและซ่อนรายละเอียดภายในด้วย Access Modifier (private/protected) คือ Encapsulation',
          perOption: [
            'ก. ผิด Polymorphism คือความสามารถที่เมธอดชื่อเดียวกันแสดงพฤติกรรมต่างกันตามชนิด Object',
            'ข. ผิด Inheritance คือการสืบทอดคุณสมบัติจากคลาสแม่สู่คลาสลูก',
            'ค. ถูกต้อง Encapsulation ช่วยปกป้องความถูกต้องของข้อมูลภายในคลาสผ่านการควบคุมการเข้าถึง',
            'ง. ผิด Recursion เป็นเทคนิคฟังก์ชันเรียกตัวเอง ไม่ใช่เสาหลักของ OOP'
          ]
        }
      }
    ]
  });
})(window);
