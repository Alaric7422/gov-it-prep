(function (global) {
  'use strict';

  if (!global.GOV_PREP || typeof global.GOV_PREP.registerLesson !== 'function') {
    console.error('[CORE-03] GOV_PREP.registerLesson not found');
    return;
  }

  global.GOV_PREP.registerLesson({
    id: 'core-3-sad-sdlc',
    code: 'CORE-03',
    category: 'core',
    agencyId: null,
    order: 3,
    title: 'การวิเคราะห์และออกแบบระบบ (SDLC, Flowchart, DFD และ UML)',
    shortTitle: 'วิเคราะห์ระบบ & SDLC',
    subtitle: 'เข้าใจวงจร SDLC แบบ Waterfall vs Agile, สัญลักษณ์ Flowchart, กฎของ DFD, แผนภาพ UML และระดับการทดสอบ UAT ก่อนส่งมอบงานราชการ',
    estimatedMinutes: 19,
    icon: 'fa-solid fa-diagram-project',
    heroVisual: {
      image: 'assets/images/core-sdlc-blueprint.png',
      alt: 'พิมพ์เขียวสถาปัตยกรรมซอฟต์แวร์แสดงขั้นตอน SDLC, ผังงาน Flowchart และแบบจำลอง UML ของระบบสารสนเทศภาครัฐ',
      caption: 'พิมพ์เขียวก่อนลงมือเขียนโค้ด: การวิเคราะห์และออกแบบระบบช่วยลดความผิดพลาดก่อนสร้างจริงเหมือนแบบแปลนก่อสร้าง',
      aspectRatio: '16 / 9',
      width: 1200,
      height: 675,
      prompt: 'Clean flat isometric tech illustration in Cadastral GIS & Tech Studio palette (emerald #0F5E4D, amber #D97706, warm white #F4F7F6). Architectural software blueprint drafting table showing interconnected SDLC spiral phases, crisp Flowchart diamond and rectangle symbols, UML Use Case actor stick figures, and Sequence Diagram lifelines glowing softly in emerald and amber. Modern Thai gov-tech studio aesthetic, crisp vector clarity.'
    },
    summaryTakeaways: [
      'SDLC มี 7 ขั้นตอนหลัก และต้องประเมินความเป็นไปได้ (Feasibility Study) 4 ด้าน ได้แก่ Technical, Economic, Operational และ Schedule',
      'Waterfall เดินหน้าเป็นขั้นเหมาะกับงานขอบเขตนิ่งตาม TOR ราชการ ส่วน Agile/Scrum ทำงานเป็น Sprint 2–4 สัปดาห์ ปรับตัวตามความต้องการที่เปลี่ยนได้ไว',
      'Flowchart: วงรี/แคปซูล = เริ่ม-จบ, สี่เหลี่ยมผืนผ้า = ประมวลผล, ข้าวหลามตัด = เงื่อนไขตัดสินใจ, ด้านขนาน = รับเข้า/แสดงผล',
      'DFD Level 0 (Context Diagram) มี Process ก้อนเดียวเท่านั้น และห้าม External Entity ต่อตรงถึง Data Store หรือ External Entity ด้วยกันเอง',
      'Use Case: <<include>> คือต้องทำเสมอ (บังคับ), <<extend>> คือทางเลือกเสริมตามเงื่อนไข ส่วน UAT คือการทดสอบตรวจรับโดยผู้ใช้งานจริง'
    ],
    sections: [
      {
        id: 'sdlc-models',
        title: '1. วงจรการพัฒนาระบบ (SDLC) และ Waterfall vs Agile',
        analogyBox: {
          title: 'เปรียบเทียบให้เห็นภาพ: สร้างตึกหลวง vs เปิดร้านอาหารยุคใหม่',
          body: '• <strong>Waterfall (น้ำตก):</strong> เหมือน <strong>"สร้างอาคารสำนักงานตามแบบแปลน TOR"</strong> ต้องเขียนแบบให้จบ 100% ก่อนตอกเสาเข็ม แก้กลางคันยากมาก แต่งบประมาณและเอกสารชัดเจน<br>• <strong>Agile (Scrum):</strong> เหมือน <strong>"เปิดร้านอาหารแบบทำเมนูชิม"</strong> ทำจานแรกออกมาให้ลูกค้าลองชิมภายใน 2 สัปดาห์ (Sprint) แล้วเก็บคำติชมมาปรับปรุงรอบหน้าจนอร่อยถูกใจ'
        },
        bodyHtml: `
<p><strong>SDLC (Software Development Life Cycle)</strong> คือวงจรมาตรฐานในการสร้างระบบสารสนเทศตั้งแต่เกิดไอเดียจนถึงปลดระวาง ประกอบด้วย 7 ขั้นตอนหลักที่ข้อสอบมักถามสลับลำดับกัน:</p>

<ol>
  <li><strong>Planning (วางแผนโครงการ):</strong> กำหนดปัญหา ขอบเขต และทำ <strong>Feasibility Study (ศึกษาความเป็นไปได้)</strong> 4 ด้านหลัก:
    <ul>
      <li><em>Technical Feasibility:</em> ฮาร์ดแวร์-ซอฟต์แวร์และทีมงานทำได้จริงไหม</li>
      <li><em>Economic Feasibility:</em> คุ้มค่าการลงทุนไหม (คำนวณ ROI, Payback Period, NPV)</li>
      <li><em>Operational Feasibility:</em> เจ้าหน้าที่และประชาชนจะยอมรับและใช้งานจริงได้ไหม</li>
      <li><em>Schedule Feasibility:</em> เสร็จทันกรอบเวลา TOR หรือกำหนดการกฎหมายไหม</li>
    </ul>
  </li>
  <li><strong>System Analysis (วิเคราะห์ระบบ):</strong> เก็บ Requirement (สัมภาษณ์, แบบสอบถาม, สังเกตการณ์, Workshop/JAD) แล้วสร้างแบบจำลอง Process และ Data (DFD, ERD)</li>
  <li><strong>System Design (ออกแบบระบบ):</strong> ออกแบบฐานข้อมูล, UI/UX, สถาปัตยกรรมระบบ และความปลอดภัย</li>
  <li><strong>Development / Coding (พัฒนาโปรแกรม):</strong> เขียนโค้ดตามแบบที่วางไว้</li>
  <li><strong>Testing (ทดสอบระบบ):</strong> ตรวจหา Bug ตั้งแต่ระดับฟังก์ชันย่อยจนถึงผู้ใช้งานจริงตรวจรับ (UAT)</li>
  <li><strong>Implementation / Deployment (ติดตั้งใช้งานจริง):</strong> มี 4 กลยุทธ์การเปลี่ยนระบบ (System Conversion) ที่ออกสอบบ่อย:
    <em>Direct Cutover</em> (ปิดเก่าเปิดใหม่ทันที เสี่ยงสูงแต่เร็ว), <em>Parallel</em> (รันคู่กันทั้งเก่า-ใหม่ ปลอดภัยสุดแต่เปลืองแรง), <em>Pilot</em> (นำร่อง 1 สาขาก่อน), และ <em>Phased</em> (ทยอยเปิดทีละโมดูล)</li>
  <li><strong>Maintenance (บำรุงรักษา):</strong> แก้ปัญหา ปรับปรุง และพัฒนาต่อหลังขึ้นระบบจริง</li>
</ol>

<h3>ตารางเปรียบเทียบ Waterfall vs Agile (Scrum)</h3>
<div class="table-wrap">
  <table>
    <caption>เปรียบเทียบแนวคิดการพัฒนาระบบแบบ Waterfall และ Agile</caption>
    <thead>
      <tr>
        <th scope="col">ประเด็นเปรียบเทียบ</th>
        <th scope="col">Waterfall Model</th>
        <th scope="col">Agile Model (เช่น Scrum)</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th scope="row">รูปแบบการทำงาน</th>
        <td>เรียงลำดับขั้นจากบนลงล่าง (Sequential) ต้องจบขั้นหนึ่งก่อนไปขั้นถัดไป</td>
        <td>ทำซ้ำเป็นรอบสั้นๆ (Iterative &amp; Incremental) รอบละ 1–4 สัปดาห์เรียกว่า <strong>Sprint</strong></td>
      </tr>
      <tr>
        <th scope="row">การรับมือการเปลี่ยนแปลง</th>
        <td>ปรับแก้ Requirement กลางคันยากและมีค่าใช้จ่ายสูง</td>
        <td>ยืดหยุ่นสูง ต้อนรับการปรับ Requirement ใหม่ได้ใน Sprint ถัดไป</td>
      </tr>
      <tr>
        <th scope="row">การส่งมอบงาน</th>
        <td>ส่งมอบซอฟต์แวร์ก้อนใหญ่ทีเดียวตอนท้ายโครงการ</td>
        <td>ส่งมอบซอฟต์แวร์ที่ใช้งานได้จริงทีละส่วน (Working Software) ทุกจบ Sprint</td>
      </tr>
      <tr>
        <th scope="row">บทบาทสำคัญในทีม</th>
        <td>Project Manager, System Analyst, Programmer, Tester แยกชัดเจน</td>
        <td><strong>Product Owner</strong> (จัดลำดับงาน Backlog), <strong>Scrum Master</strong> (ดูแลกระบวนการ), <strong>Dev Team</strong></td>
      </tr>
      <tr>
        <th scope="row">เหมาะกับงานแบบใด</th>
        <td>โครงการภาครัฐที่มี TOR ชัดเจน ขอบเขตคงที่ ไม่เปลี่ยนแปลงบ่อย</td>
        <td>ระบบบริการประชาชนที่ต้องปรับฟีเจอร์ตามฟีดแบ็กผู้ใช้งานจริงอย่างรวดเร็ว</td>
      </tr>
    </tbody>
  </table>
</div>`,
        mermaid: {
          title: 'เปรียบเทียบโครงสร้างการทำงาน Waterfall กับ Agile Sprint',
          caption: 'Waterfall เดินเป็นเส้นตรงทีละขั้น ส่วน Agile วนรอบสั้นๆ เพื่อทดสอบและปรับปรุงอย่างต่อเนื่อง',
          code: `flowchart LR
  subgraph WF["Waterfall Model (เดินหน้าตามลำดับขั้น)"]
    direction LR
    W1["1. Analysis"] --> W2["2. Design"] --> W3["3. Coding"] --> W4["4. Testing & Deploy"]
  end
  subgraph AG["Agile Scrum (ทำงานเป็นรอบ Sprint)"]
    direction LR
    A1["Product Backlog"] --> A2["Sprint Planning"] --> A3["Build & Daily Standup"] --> A4["Sprint Review"]
    A4 -.->|"รับฟีดแบ็กปรับรอบใหม่"| A1
  end`
        }
      },
      {
        id: 'flowchart-dfd',
        title: '2. สัญลักษณ์ Flowchart มาตรฐาน และ Data Flow Diagram (DFD)',
        bodyHtml: `
<p>ในการสอบนักวิชาการคอมพิวเตอร์ จะเจอคำถามถามชื่อและหน้าที่ของสัญลักษณ์ <strong>Flowchart</strong> รวมถึงกฎการวาด <strong>DFD (Data Flow Diagram)</strong> แทบทุกครั้งครับ เรามาดูแผนภาพสัญลักษณ์ Flowchart 6 ตัวที่ห้ามจำสลับกันก่อนเลย:</p>`,
        visualCard: {
          type: 'svg',
          caption: 'ชุดสัญลักษณ์ Flowchart มาตรฐาน ANSI/ISO ที่ออกสอบบ่อยที่สุด 6 ตัวแรก (จำรูปทรงให้แม่น!)',
          svgHtml: `<svg role="img" viewBox="0 0 760 390" width="100%" xmlns="http://www.w3.org/2000/svg" aria-labelledby="svg-fc-title">
  <title id="svg-fc-title">สัญลักษณ์ผังงาน Flowchart มาตรฐาน 6 ชนิด</title>
  <rect x="0" y="0" width="760" height="390" rx="14" fill="#F4F7F6" stroke="#D5E1DD" stroke-width="2"/>
  <text x="380" y="34" text-anchor="middle" font-family="Prompt, Sarabun, sans-serif" font-size="18" font-weight="700" fill="#0F5E4D">สัญลักษณ์ Flowchart มาตรฐานที่ออกสอบประจำ</text>

  <!-- Card 1: Terminator -->
  <rect x="24" y="54" width="224" height="145" rx="10" fill="#FFFFFF" stroke="#D5E1DD" stroke-width="1.5"/>
  <rect x="66" y="76" width="140" height="46" rx="23" ry="23" fill="#E6F4F1" stroke="#0F5E4D" stroke-width="2.5"/>
  <text x="136" y="104" text-anchor="middle" font-family="Sarabun, sans-serif" font-size="14" font-weight="700" fill="#0F5E4D">Start / End</text>
  <text x="136" y="150" text-anchor="middle" font-family="Prompt, sans-serif" font-size="14" font-weight="700" fill="#122026">Terminator (จุดเริ่ม/จบ)</text>
  <text x="136" y="172" text-anchor="middle" font-family="Sarabun, sans-serif" font-size="12" fill="#475569">รูปแคปซูล แสดงจุดเริ่มต้น-สิ้นสุด</text>

  <!-- Card 2: Process -->
  <rect x="268" y="54" width="224" height="145" rx="10" fill="#FFFFFF" stroke="#D5E1DD" stroke-width="1.5"/>
  <rect x="310" y="76" width="140" height="46" rx="3" fill="#E6F4F1" stroke="#0F5E4D" stroke-width="2.5"/>
  <text x="380" y="104" text-anchor="middle" font-family="Sarabun, sans-serif" font-size="14" font-weight="700" fill="#0F5E4D">Process</text>
  <text x="380" y="150" text-anchor="middle" font-family="Prompt, sans-serif" font-size="14" font-weight="700" fill="#122026">Process (การประมวลผล)</text>
  <text x="380" y="172" text-anchor="middle" font-family="Sarabun, sans-serif" font-size="12" fill="#475569">สี่เหลี่ยมผืนผ้า: คำนวณ กำหนดค่า</text>

  <!-- Card 3: Decision -->
  <rect x="512" y="54" width="224" height="145" rx="10" fill="#FFFFFF" stroke="#D5E1DD" stroke-width="1.5"/>
  <polygon points="624,68 688,99 624,130 560,99" fill="#FEF3C7" stroke="#D97706" stroke-width="2.5"/>
  <text x="624" y="104" text-anchor="middle" font-family="Sarabun, sans-serif" font-size="13" font-weight="700" fill="#92400E">เงื่อนไข?</text>
  <text x="624" y="150" text-anchor="middle" font-family="Prompt, sans-serif" font-size="14" font-weight="700" fill="#122026">Decision (การตัดสินใจ)</text>
  <text x="624" y="172" text-anchor="middle" font-family="Sarabun, sans-serif" font-size="12" fill="#475569">ข้าวหลามตัด: แยกทาง จริง/เท็จ</text>

  <!-- Card 4: Input / Output -->
  <rect x="24" y="218" width="224" height="145" rx="10" fill="#FFFFFF" stroke="#D5E1DD" stroke-width="1.5"/>
  <polygon points="82,240 206,240 190,286 66,286" fill="#E6F4F1" stroke="#0F5E4D" stroke-width="2.5"/>
  <text x="136" y="268" text-anchor="middle" font-family="Sarabun, sans-serif" font-size="13" font-weight="700" fill="#0F5E4D">Input / Output</text>
  <text x="136" y="314" text-anchor="middle" font-family="Prompt, sans-serif" font-size="14" font-weight="700" fill="#122026">Input / Output (รับ-แสดงผล)</text>
  <text x="136" y="336" text-anchor="middle" font-family="Sarabun, sans-serif" font-size="12" fill="#475569">สี่เหลี่ยมด้านขนาน: รับค่า/พิมพ์ผล</text>

  <!-- Card 5: Predefined Process -->
  <rect x="268" y="218" width="224" height="145" rx="10" fill="#FFFFFF" stroke="#D5E1DD" stroke-width="1.5"/>
  <rect x="310" y="240" width="140" height="46" fill="#E6F4F1" stroke="#0F5E4D" stroke-width="2.5"/>
  <line x1="324" y1="240" x2="324" y2="286" stroke="#0F5E4D" stroke-width="2"/>
  <line x1="436" y1="240" x2="436" y2="286" stroke="#0F5E4D" stroke-width="2"/>
  <text x="380" y="268" text-anchor="middle" font-family="Sarabun, sans-serif" font-size="13" font-weight="700" fill="#0F5E4D">Subroutine</text>
  <text x="380" y="314" text-anchor="middle" font-family="Prompt, sans-serif" font-size="14" font-weight="700" fill="#122026">Predefined Process</text>
  <text x="380" y="336" text-anchor="middle" font-family="Sarabun, sans-serif" font-size="12" fill="#475569">เรียกฟังก์ชันหรือโปรแกรมย่อย</text>

  <!-- Card 6: Connector & Flow -->
  <rect x="512" y="218" width="224" height="145" rx="10" fill="#FFFFFF" stroke="#D5E1DD" stroke-width="1.5"/>
  <circle cx="576" cy="263" r="18" fill="#FEF3C7" stroke="#D97706" stroke-width="2.5"/>
  <text x="576" y="268" text-anchor="middle" font-family="Sarabun, sans-serif" font-size="13" font-weight="700" fill="#92400E">A</text>
  <line x1="612" y1="263" x2="676" y2="263" stroke="#0F5E4D" stroke-width="3"/>
  <polygon points="688,263 674,255 674,271" fill="#0F5E4D"/>
  <text x="624" y="314" text-anchor="middle" font-family="Prompt, sans-serif" font-size="14" font-weight="700" fill="#122026">Connector &amp; Flowline</text>
  <text x="624" y="336" text-anchor="middle" font-family="Sarabun, sans-serif" font-size="12" fill="#475569">วงกลมเชื่อมหน้าเดียวกัน / ลูกศรทิศทาง</text>
</svg>`
        },
        mermaid: {
          title: 'ตัวอย่าง Flowchart: ขั้นตอนตรวจสอบคำขอจดทะเบียนโอนที่ดินออนไลน์',
          caption: 'สังเกตรูปทรงแคปซูล (Start/End), ด้านขนาน (รับข้อมูล), สี่เหลี่ยม (ประมวลผล), และข้าวหลามตัด (เงื่อนไข Yes/No)',
          code: `flowchart TD
  S(["เริ่มต้น: รับคำขอโอนที่ดินออนไลน์"]) --> IN[/"รับเลขโฉนดและเลขบัตรประชาชน"/]
  IN --> PROC["ตรวจสอบข้อมูลกับฐานข้อมูลทะเบียนที่ดิน"]
  PROC --> DEC{"เอกสารและสิทธิ์ครบถ้วนหรือไม่?"}
  DEC -->|"ใช่ (ครบถ้วน)"| OK["คำนวณค่าธรรมเนียมและออกบัตรคิว"]
  DEC -->|"ไม่ใช่ (ไม่ครบ)"| ERR["แจ้งให้ผู้ยื่นขอส่งเอกสารเพิ่มเติม"]
  OK --> E(["สิ้นสุดการทำงาน"])
  ERR --> E`
        }
      },
      {
        id: 'dfd-rules',
        title: '3. แผนภาพกระแสข้อมูล (DFD: Data Flow Diagram) และกฎเหล็กที่ห้ามผิด',
        bodyHtml: `
<p>ต่างจาก Flowchart ที่เน้น <em>"ลำดับการทำงานของโปรแกรม"</em> ตัว <strong>DFD</strong> จะเน้นมองว่า <em>"ข้อมูลวิ่งจากไหน ผ่านการประมวลผลอะไร และเก็บลงที่ใด"</em> โดยใช้สัญลักษณ์เพียง 4 อย่าง:</p>

<div class="table-wrap">
  <table>
    <caption>องค์ประกอบ 4 ส่วนของ Data Flow Diagram (DFD)</caption>
    <thead>
      <tr>
        <th scope="col">องค์ประกอบ</th>
        <th scope="col">สัญลักษณ์ (Gane &amp; Sarson)</th>
        <th scope="col">หน้าที่และการตั้งชื่อ</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th scope="row">External Entity</th>
        <td>สี่เหลี่ยมจัตุรัส/ผืนผ้า</td>
        <td>คน หน่วยงาน หรือระบบภายนอกที่ส่ง/รับข้อมูล (ตั้งชื่อเป็น <strong>คำนาม</strong> เช่น ประชาชน, กรมสรรพากร)</td>
      </tr>
      <tr>
        <th scope="row">Process</th>
        <td>สี่เหลี่ยมมุมมน (หรือวงกลม)</td>
        <td>กิจกรรมแปรรูปข้อมูล (ตั้งชื่อขึ้นต้นด้วย <strong>คำกริยา + กรรม</strong> เช่น ตรวจสอบสิทธิ์, คำนวณภาษี)</td>
      </tr>
      <tr>
        <th scope="row">Data Store</th>
        <td>สี่เหลี่ยมเปิดด้านขวา (D1)</td>
        <td>แหล่งเก็บข้อมูลหรือตารางฐานข้อมูล (ตั้งชื่อเป็น <strong>คำนามพหูพจน์</strong> เช่น ทะเบียนแปลงที่ดิน)</td>
      </tr>
      <tr>
        <th scope="row">Data Flow</th>
        <td>ลูกศรชี้ทิศทาง</td>
        <td>ข้อมูลที่ไหลผ่านเส้นทาง (ตั้งชื่อเป็น <strong>คำนาม</strong> เช่น ข้อมูลคำขอ, ใบเสร็จรับเงิน)</td>
      </tr>
    </tbody>
  </table>
</div>

<div class="callout callout-warn">
  <strong><i class="fa-solid fa-triangle-exclamation" aria-hidden="true"></i> กฎเหล็กของ DFD ที่ออกข้อสอบจับผิดภาพเป็นประจำ:</strong>
  <ul>
    <li><strong>Context Diagram (DFD Level 0):</strong> ต้องมี <strong>Process เพียง 1 ก้อนใหญ่</strong> แทนทั้งระบบ ห้ามแสดง Data Store ใน Context Diagram!</li>
    <li><strong>ทุกข้อมูลต้องวิ่งผ่าน Process เสมอ:</strong> ห้าม External Entity ต่อตรงถึง Data Store, ห้าม External Entity ต่อตรงหากันเอง, และห้าม Data Store ต่อตรงถึง Data Store โดยไม่ผ่าน Process!</li>
    <li><strong>Balancing (ความสมดุล):</strong> เส้น Data Flow ที่เข้า-ออกระหว่าง External Entity กับ Process ใน Level 0 ต้องตรงกับ Level 1 เมื่อแตก Process ย่อยออกมา</li>
  </ul>
</div>`
      },
      {
        id: 'uml-diagrams',
        title: '4. แผนภาพเชิงวัตถุ UML: Use Case & Sequence Diagram',
        bodyHtml: `
<p>สำหรับการพัฒนาระบบสมัยใหม่แบบ OOP นิยมใช้ภาษาภาพ <strong>UML (Unified Modeling Language)</strong> โดยแบ่งออกเป็น 2 กลุ่มใหญ่คือ <strong>Structural Diagram</strong> (แสดงโครงสร้างนิ่ง เช่น Class Diagram) และ <strong>Behavioral Diagram</strong> (แสดงพฤติกรรมและลำดับเวลา เช่น Use Case, Activity, Sequence Diagram)</p>

<h3>Use Case Diagram: จุดตายระหว่าง &lt;&lt;include&gt;&gt; กับ &lt;&lt;extend&gt;&gt;</h3>
<ul>
  <li><strong>Actor:</strong> รูปคนก้างปลา แทนผู้ใช้งานหรือระบบภายนอกที่มีปฏิสัมพันธ์กับระบบ</li>
  <li><strong>Use Case:</strong> วงรี แทนความสามารถหรือบริการที่ระบบทำให้ผู้ใช้</li>
  <li><strong><code>&lt;&lt;include&gt;&gt;</code> (ความสัมพันธ์แบบบังคับ):</strong> ลูกศรเส้นประชี้ <strong>จาก Use Case หลัก → ไปยัง Use Case ที่ถูกเรียกใช้เสมอ</strong> ตัวอย่าง: เมื่อทำ <em>"จองคิวออนไลน์"</em> หรือ <em>"ดูข้อมูลโฉนด"</em> ระบบ<strong>ต้องทำ</strong> <em>"ยืนยันตัวตน (Login)"</em> เสมอขาดไม่ได้</li>
  <li><strong><code>&lt;&lt;extend&gt;&gt;</code> (ความสัมพันธ์แบบทางเลือกเสริม):</strong> ลูกศรเส้นประชี้ <strong>จาก Use Case เสริม → กลับมายัง Use Case หลัก</strong> ตัวอย่าง: <em>"แจ้งเตือนทาง SMS"</em> หรือ <em>"พิมพ์ใบเสร็จซ้ำ"</em> อาจเกิดขึ้นหรือไม่เกิดก็ได้ ขึ้นอยู่กับเงื่อนไข</li>
</ul>

<h3>Sequence Diagram: ไล่ลำดับการสื่อสารตามแกนเวลา (บนลงล่าง)</h3>
<p>Sequence Diagram ใช้แสดงการส่งข้อความโต้ตอบกันระหว่าง Object หรือบริการต่างๆ ตามลำดับเวลาจากบนลงล่าง:</p>
<ul>
  <li><strong>Lifeline:</strong> เส้นประแนวดิ่งใต้ชื่อ Object/Participant</li>
  <li><strong>Activation Bar:</strong> แท่งสี่เหลี่ยมแนวตั้งบน Lifeline แสดงช่วงเวลาที่ Object นั้นกำลังประมวลผลอยู่</li>
  <li><strong>Synchronous Message (ลูกศรหัวทึบเส้นทึบ <code>-&gt;&gt;</code>):</strong> ส่งคำขอแล้วรอจนกว่าจะได้คำตอบ</li>
  <li><strong>Return Message (ลูกศรเส้นประ <code>--&gt;&gt;</code>):</strong> ส่งผลลัพธ์ย้อนกลับคืนมา</li>
</ul>`,
        mermaid: {
          title: 'Sequence Diagram: ลำดับการจองคิวออนไลน์ผ่านระบบ e-QLands',
          caption: 'อ่านเวลาจากบนลงล่างตามลำดับ 1–11 เห็นทั้ง Synchronous Request (->>) และ Return Response (-->>)',
          code: `sequenceDiagram
  autonumber
  actor User as ผู้ยื่นคำขอ
  participant Web as หน้าเว็บ e-QLands
  participant API as API Server กรมที่ดิน
  participant DB as ฐานข้อมูลคิวและแปลง

  User->>Web: เลือกสำนักงานที่ดินและวันที่ต้องการจอง
  Web->>API: ส่งคำขอตรวจสอบช่วงเวลาว่าง
  API->>DB: คิวรีจำนวนคิวคงเหลือ
  DB-->>API: คืนรายการช่วงเวลาที่ว่าง
  API-->>Web: ส่งข้อมูลตารางคิวว่าง
  User->>Web: กดยืนยันการจองคิว
  Web->>API: ส่งข้อมูลบันทึกการจอง
  API->>DB: บันทึกรายการนัดหมายลงตาราง
  DB-->>API: ยืนยันการบันทึกสำเร็จ
  API-->>Web: ส่งเลขที่คิวและข้อมูล QR Code
  Web-->>User: แสดงบัตรคิวอิเล็กทรอนิกส์`
        }
      },
      {
        id: 'testing-maintenance',
        title: '5. การทดสอบระบบ (Testing & UAT) และการบำรุงรักษา (Maintenance)',
        bodyHtml: `
<p>ก่อนเซ็นตรวจรับงานจ้างพัฒนาระบบในหน่วยงานราชการ ต้องผ่านการทดสอบเป็นลำดับขั้น (V-Model Testing) และรู้จักประเภทของการบำรุงรักษาหลังใช้งานจริง ดังนี้ครับ:</p>

<h3>ระดับการทดสอบระบบ 4 ขั้นตอน (Testing Levels)</h3>
<div class="table-wrap">
  <table>
    <caption>ลำดับขั้นการทดสอบซอฟต์แวร์จากระดับโค้ดย่อยถึงผู้ใช้งานจริง</caption>
    <thead>
      <tr>
        <th scope="col">ระดับการทดสอบ</th>
        <th scope="col">ผู้รับผิดชอบหลัก</th>
        <th scope="col">เป้าหมายสำคัญ</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th scope="row">1. Unit Testing</th>
        <td>Developer (ผู้เขียนโค้ด)</td>
        <td>ทดสอบฟังก์ชันหรือโมดูลย่อยที่สุดทีละชิ้น (มักใช้ <strong>White-box Testing</strong> ดูโครงสร้างโค้ดภายใน)</td>
      </tr>
      <tr>
        <th scope="row">2. Integration Testing</th>
        <td>Developer / QA Team</td>
        <td>ทดสอบการเชื่อมต่อระหว่างโมดูลหรือ API ที่นำมาประกอบรวมกัน</td>
      </tr>
      <tr>
        <th scope="row">3. System Testing</th>
        <td>QA / Tester Team</td>
        <td>ทดสอบทั้งระบบครบวงจร (ใช้ <strong>Black-box Testing</strong> ดู Input/Output ตาม Spec รวมถึง Load &amp; Security Test)</td>
      </tr>
      <tr>
        <th scope="row">4. User Acceptance Testing (UAT)</th>
        <td><strong>ผู้ใช้งานจริง / คณะกรรมการตรวจรับ</strong></td>
        <td>ทดสอบในสภาพแวดล้อมเสมือนจริงว่าใช้งานตรงตาม TOR และกระบวนงานราชการหรือไม่ก่อนเซ็นรับมอบ</td>
      </tr>
    </tbody>
  </table>
</div>

<h3>การบำรุงรักษาซอฟต์แวร์ 4 ประเภท (ออกสอบนิยามบ่อยมาก!)</h3>
<ul>
  <li><strong>Corrective Maintenance (แก้ไขข้อผิดพลาด):</strong> แก้ Bug หรือ Error ที่เพิ่งพบหลังจากเปิดใช้งานจริง</li>
  <li><strong>Adaptive Maintenance (ปรับให้เข้ากับสภาพแวดล้อมใหม่):</strong> แก้ระบบให้รองรับสิ่งที่เปลี่ยนไปจากภายนอก เช่น อัปเกรดเวอร์ชัน OS/Database, รองรับกฎกระทรวงใหม่ หรืออัตราภาษีใหม่</li>
  <li><strong>Perfective Maintenance (พัฒนาเพิ่มประสิทธิภาพ/ฟีเจอร์):</strong> เพิ่มความสามารถใหม่ตามคำขอผู้ใช้ หรือจูนคิวรีให้เร็วขึ้น</li>
  <li><strong>Preventive Maintenance (ป้องกันปัญหาในอนาคต):</strong> ทำ Code Refactoring หรือปรับปรุงโครงสร้างเบื้องหลังให้ดูแลรักษาง่ายขึ้น ลดความเสี่ยงพังในอนาคต (แม้ระบบยังทำงานได้ปกติอยู่)</li>
</ul>`
      }
    ],
    quiz: [
      {
        id: 'q-core3-1',
        question: 'การศึกษาความเป็นไปได้ (Feasibility Study) ในขั้นตอนวางแผน SDLC ที่ประเมินว่า "เจ้าหน้าที่หน้าเคาน์เตอร์สามารถเรียนรู้และยอมรับการใช้งานระบบใหม่ได้จริงหรือไม่" จัดเป็นความเป็นไปได้ด้านใด?',
        options: [
          'Technical Feasibility',
          'Economic Feasibility',
          'Operational Feasibility',
          'Schedule Feasibility'
        ],
        correctIndex: 2,
        explanation: {
          summary: 'Operational Feasibility ประเมินความพร้อมในการใช้งานจริงของคน กระบวนการ และองค์กร',
          perOption: [
            'ก. ผิด Technical Feasibility ดูว่าเทคโนโลยี ฮาร์ดแวร์ และทักษะทีมพัฒนาสร้างได้จริงหรือไม่',
            'ข. ผิด Economic Feasibility ดูความคุ้มค่าทางการเงิน เช่น ROI หรือระยะเวลาคืนทุน',
            'ค. ถูกต้อง Operational Feasibility ประเมินว่าระบบเมื่อสร้างเสร็จแล้วผู้ใช้จริงและองค์กรจะนำไปปฏิบัติใช้งานได้ราบรื่นหรือไม่',
            'ง. ผิด Schedule Feasibility ดูว่าโครงการจะแล้วเสร็จทันกำหนดเวลาที่วางไว้หรือไม่'
          ]
        }
      },
      {
        id: 'q-core3-2',
        question: 'ข้อใดคือจุดเด่นสำคัญที่สุดของการพัฒนาระบบแบบ Agile (เช่น Scrum) เมื่อเทียบกับแบบ Waterfall?',
        options: [
          'ไม่ต้องจัดทำเอกสารหรือวางแผนใดๆ ทั้งสิ้น สามารถเขียนโค้ดทันที',
          'แบ่งงานออกเป็นรอบสั้นๆ (Sprint) ส่งมอบซอฟต์แวร์ที่ใช้งานได้จริงทีละส่วน และเปิดรับการปรับแก้ไข Requirement ได้รวดเร็ว',
          'ต้องรอให้งานออกแบบเสร็จ 100% ก่อนจึงจะเริ่มเขียนโค้ดหน้าแรกได้',
          'เหมาะเฉพาะกับระบบที่ห้ามมีการเปลี่ยนแปลงความต้องการตลอดอายุโครงการ'
        ],
        correctIndex: 1,
        explanation: {
          summary: 'Agile เน้นการทำงานเป็นรอบสั้น (Iterative/Sprint) ส่งมอบงานใช้ได้จริงต่อเนื่อง และปรับตัวตามการเปลี่ยนแปลงได้ไว',
          perOption: [
            'ก. ผิด Agile ยังมีการวางแผน Sprint Planning และเอกสารเท่าที่จำเป็น (Just enough documentation) ไม่ใช่ไม่มีเลย',
            'ข. ถูกต้อง หัวใจของ Agile คือ Sprint สั้นๆ 1–4 สัปดาห์ รับฟีดแบ็กจาก Product Owner/ผู้ใช้ และส่งมอบคุณค่าต่อเนื่อง',
            'ค. ผิด นั่นคือลักษณะของ Waterfall Model',
            'ง. ผิด นั่นคือเงื่อนไขที่เหมาะกับ Waterfall มากกว่า Agile'
          ]
        }
      },
      {
        id: 'q-core3-3',
        question: 'ในผังงาน Flowchart หากต้องการเขียนขั้นตอน "ตรวจสอบว่ายอดเงินค่าธรรมเนียมเกิน 5,000 บาทหรือไม่ เพื่อแยกการทำงานเป็น 2 ทาง" ต้องใช้สัญลักษณ์รูปทรงใด?',
        options: [
          'สี่เหลี่ยมผืนผ้า (Rectangle)',
          'สี่เหลี่ยมด้านขนาน (Parallelogram)',
          'สี่เหลี่ยมข้าวหลามตัด (Diamond)',
          'วงรีหรือแคปซูล (Terminator)'
        ],
        correctIndex: 2,
        explanation: {
          summary: 'รูปสี่เหลี่ยมข้าวหลามตัด (Diamond) ใช้แทนจุดตัดสินใจ (Decision) ที่มีทางแยก True/False',
          perOption: [
            'ก. ผิด สี่เหลี่ยมผืนผ้าใช้แทนการประมวลผลหรือคำนวณ (Process)',
            'ข. ผิด สี่เหลี่ยมด้านขนานใช้แทนการรับข้อมูลเข้าหรือแสดงผล (Input/Output)',
            'ค. ถูกต้อง สี่เหลี่ยมข้าวหลามตัดคือ Decision Symbol สำหรับเงื่อนไขที่มีการแตกแขนงทางเลือก',
            'ง. ผิด รูปแคปซูลใช้แทนจุดเริ่มต้นและสิ้นสุดผังงาน (Start/End)'
          ]
        }
      },
      {
        id: 'q-core3-4',
        question: 'ในการวาด Data Flow Diagram (DFD) ข้อใดถือว่า "ผิดกฎมาตรฐาน" ของการเขียน DFD อย่างชัดเจน?',
        options: [
          'Context Diagram (Level 0) มี Process เพียง 1 ก้อนใหญ่ตรงกลาง',
          'External Entity ส่งเส้น Data Flow ตรงเข้าไปเก็บใน Data Store โดยไม่ผ่าน Process',
          'Process ดึงข้อมูลจาก Data Store แล้วส่งต่อให้ External Entity',
          'Process ชื่อ "คำนวณค่าธรรมเนียม" รับข้อมูลจาก External Entity "ประชาชน"'
        ],
        correctIndex: 1,
        explanation: {
          summary: 'ข้อมูลใน DFD ทุกเส้นต้องมี Process เป็นตัวกลางเสมอ ห้าม External Entity ต่อตรงเข้า Data Store เด็ดขาด',
          perOption: [
            'ก. ผิด (กล่าวถูกต้องตามกฎ) Context Diagram ต้องมี Process เดียวเสมอ',
            'ข. ถูกต้อง (เป็นสิ่งที่ผิดกฎ DFD) เพราะ External Entity ไม่สามารถเขียนหรืออ่านฐานข้อมูลโดยไม่ผ่านกระบวนการตรวจสอบ/ประมวลผลของระบบ',
            'ค. ผิด (กล่าวถูกต้องตามกฎ) Process ทำหน้าที่ดึงข้อมูลมาแสดงผลให้ External Entity ได้',
            'ง. ผิด (กล่าวถูกต้องตามกฎ) การตั้งชื่อ Process ใช้กริยา+กรรม และรับข้อมูลจาก External Entity ได้ถูกต้อง'
          ]
        }
      },
      {
        id: 'q-core3-5',
        question: 'ใน Use Case Diagram ของระบบจองคิวออนไลน์ หากการ "จองคิว" และ "ยกเลิกคิว" ต้องบังคับให้ผู้ใช้ผ่านขั้นตอน "เข้าสู่ระบบ (Login)" ทุกครั้ง และอาจมีทางเลือกเสริมเป็น "ส่ง SMS แจ้งเตือน" ในบางกรณี ข้อใดกำหนดความสัมพันธ์ได้ถูกต้อง?',
        options: [
          'ทั้ง "เข้าสู่ระบบ" และ "ส่ง SMS แจ้งเตือน" ใช้ความสัมพันธ์ <<extend>> ทั้งคู่',
          '"จองคิว" --<<include>>--> "เข้าสู่ระบบ" และ "ส่ง SMS แจ้งเตือน" --<<extend>>--> "จองคิว"',
          '"เข้าสู่ระบบ" --<<include>>--> "จองคิว" และ "จองคิว" --<<extend>>--> "ส่ง SMS แจ้งเตือน"',
          'ใช้เส้น Generalization จาก "ส่ง SMS แจ้งเตือน" ไปยัง "เข้าสู่ระบบ"'
        ],
        correctIndex: 1,
        explanation: {
          summary: '<<include>> ชี้จากหลักไปตัวบังคับ ส่วน <<extend>> ชี้จากตัวเสริมกลับไปหาตัวหลัก',
          perOption: [
            'ก. ผิด การเข้าสู่ระบบเป็นขั้นตอนบังคับที่ต้องทำเสมอ จึงต้องใช้ <<include>>',
            'ข. ถูกต้อง ทิศทางลูกศรของ <<include>> ชี้ไปหาส่วนที่ต้องทำเสมอ (Login) ส่วน <<extend>> ชี้จากทางเลือกเสริมกลับมายัง Use Case หลัก',
            'ค. ผิด หัวลูกศรกลับทิศทั้งคู่',
            'ง. ผิด Generalization ใช้แทนการสืบทอดบทบาท เช่น ผู้จัดการเป็นชนิดย่อยของพนักงาน ไม่ใช่กรณีเสริมเงื่อนไข'
          ]
        }
      },
      {
        id: 'q-core3-6',
        question: 'แผนภาพ UML ใดที่เหมาะที่สุดในการอธิบาย "ลำดับเหตุการณ์ตามเวลา" ของการส่ง Request/Response ระหว่างผู้ใช้งาน หน้าเว็บ API Server และฐานข้อมูล?',
        options: [
          'Class Diagram',
          'Sequence Diagram',
          'Deployment Diagram',
          'Component Diagram'
        ],
        correctIndex: 1,
        explanation: {
          summary: 'Sequence Diagram แสดงปฏิสัมพันธ์ระหว่าง Object/ระบบเรียงตามแกนเวลาจากบนลงล่าง',
          perOption: [
            'ก. ผิด Class Diagram แสดงโครงสร้างคลาส แอตทริบิวต์ และความสัมพันธ์แบบนิ่ง ไม่ได้แสดงลำดับเวลา',
            'ข. ถูกต้อง Sequence Diagram มี Lifeline และลูกศรข้อความเรียงตามลำดับเวลาชัดเจน',
            'ค. ผิด Deployment Diagram แสดงการติดตั้งซอฟต์แวร์ลงบนเครื่องฮาร์ดแวร์/โหนดเครือข่าย',
            'ง. ผิด Component Diagram แสดงการประกอบกันของโมดูลซอฟต์แวร์ระดับสถาปัตยกรรม'
          ]
        }
      },
      {
        id: 'q-core3-7',
        question: 'การทดสอบระบบในขั้นตอนใดที่เน้นการทดสอบด้วย "ผู้ใช้งานจริงหรือคณะกรรมการตรวจรับ" เพื่อยืนยันว่าระบบตอบโจทย์ธุรกิจและครบถ้วนตาม TOR ก่อนนำขึ้นใช้งานจริง (Production)?',
        options: [
          'Unit Testing',
          'Integration Testing',
          'User Acceptance Testing (UAT)',
          'White-box Code Coverage Testing'
        ],
        correctIndex: 2,
        explanation: {
          summary: 'UAT (User Acceptance Testing) เป็นด่านสุดท้ายที่ตัวแทนผู้ใช้จริงทดสอบและลงนามยอมรับระบบก่อนเปิดใช้จริง',
          perOption: [
            'ก. ผิด Unit Testing เป็นหน้าที่ของผู้พัฒนาทดสอบโค้ดทีละฟังก์ชันย่อย',
            'ข. ผิด Integration Testing เป็นการทดสอบการเชื่อมต่อระหว่างโมดูลโดยทีมพัฒนา/QA',
            'ค. ถูกต้อง UAT ย่อมาจาก User Acceptance Testing ซึ่งเป็นการทดสอบเพื่อการตรวจรับโดยผู้ใช้งานจริง',
            'ง. ผิด White-box Testing เป็นเทคนิคของนักพัฒนาที่ดูโครงสร้างโค้ดภายใน ไม่ใช่บทบาทผู้ใช้ปลายทาง'
          ]
        }
      },
      {
        id: 'q-core3-8',
        question: 'หลังจากใช้งานระบบจดทะเบียนที่ดินไปได้ 1 ปี รัฐบาลประกาศปรับปรุงอัตราค่าธรรมเนียมโอนอสังหาริมทรัพย์ใหม่ ทีม IT จึงแก้ไขสูตรคำนวณในโปรแกรมให้สอดคล้องกับกฎหมายใหม่ การปรับปรุงนี้จัดเป็นการบำรุงรักษา (Maintenance) ประเภทใด?',
        options: [
          'Corrective Maintenance',
          'Adaptive Maintenance',
          'Perfective Maintenance',
          'Preventive Maintenance'
        ],
        correctIndex: 1,
        explanation: {
          summary: 'การปรับระบบให้สอดคล้องกับการเปลี่ยนแปลงของสภาพแวดล้อมภายนอก เช่น กฎหมาย ระบบปฏิบัติการ หรือฐานข้อมูล คือ Adaptive Maintenance',
          perOption: [
            'ก. ผิด Corrective คือการแก้ Bug หรือข้อผิดพลาดเดิมที่มีอยู่ในโปรแกรม',
            'ข. ถูกต้อง การเปลี่ยนกฎระเบียบ/กฎหมาย หรือแพลตฟอร์มภายนอก ถือเป็น Adaptive Maintenance',
            'ค. ผิด Perfective คือการเพิ่มฟีเจอร์ใหม่ตามคำขอหรือปรับปรุงประสิทธิภาพให้ดีขึ้น',
            'ง. ผิด Preventive คือการปรับโครงสร้างโค้ดภายในเพื่อลดโอกาสเกิดปัญหาในอนาคต'
          ]
        }
      }
    ]
  });
})(window);
