/**
 * Comprehensive Thai Guide & Written-Exam Workshop for Diagrams & System Design.
 * Covers 6 core diagram categories from absolute zero + 6 realistic Civil Service written exam cases
 * (นักวิชาการคอมพิวเตอร์ปฏิบัติการ - กรมที่ดิน).
 */
(function (global) {
  'use strict';

  var diagramsGuide = {
    id: 'diagrams-guide',
    title: 'คู่มือเจาะลึก Diagram & ออกแบบระบบสำหรับข้อเขียน (จากศูนย์ → สอบจริง)',
    subtitle:
      'ปูพื้นฐานทุกสัญลักษณ์ กฎเหล็กที่ห้ามผิด วิธีแกะโจทย์ข้อเขียนทีละขั้น จุดโดนหักคะแนน พร้อมแนวข้อสอบเขียนจำลอง 6 ข้อ สำหรับสอบนักวิชาการคอมพิวเตอร์ปฏิบัติการ (กรมที่ดิน)',
    whyDiagramsMatterHtml:
      '<p>ในสนามสอบ <strong>ข้อเขียน (อัตนัย) ตำแหน่งนักวิชาการคอมพิวเตอร์ปฏิบัติการ</strong> ทั้งภาค ก./ข. หรือสอบคัดเลือกเฉพาะทาง (เช่น กรมที่ดิน) กรรมการไม่ได้ตรวจแค่ว่าน้องจำคำศัพท์ได้ไหม แต่ดูว่า <strong>"น้องคิดเป็นระบบและสื่อสารแบบนักวิเคราะห์ระบบ (SA) ได้หรือไม่"</strong></p>' +
      '<ul>' +
      '<li><strong>รูป 1 แผนภาพแทนคำอธิบายได้เป็นหน้า:</strong> กรรมการตรวจกระดาษคำตอบหลายร้อยชุด ถ้าเห็นแผนภาพที่แบ่งโซนชัดเจน ใช้สัญลักษณ์ถูกมาตรฐาน และมีป้ายกำกับครบ จะได้คะแนนเต็มตั้งแต่ 10 วินาทีแรกที่เปิดอ่าน</li>' +
      '<li><strong>ข้อสอบออกวน 6 แผนภาพนี้แทบทุกปี:</strong> Flowchart (ตรรกะคำนวณ), DFD Level 0–1 (กระแสข้อมูล), ERD &amp; 3NF (ออกแบบฐานข้อมูล), Use Case (ขอบเขตระบบ), Sequence &amp; Class (พฤติกรรมและโครงสร้าง OOP) และ System Architecture (ออกแบบระบบเครือข่ายและความปลอดภัยภาครัฐ)</li>' +
      '<li><strong>ไม่ต้องวาดสวยเหมือนศิลปิน ขอแค่ "ถูกสัญลักษณ์ + หัวลูกศรไม่สลับ + มีเหตุผลรองรับ":</strong> บทเรียนนี้จะปูจากศูนย์ให้เข้าใจทีละเส้น จนลงมือเขียนในห้องสอบได้จริงครับ</li>' +
      '</ul>',

    introChecklist: [
      {
        step: '01',
        title: 'อ่านโจทย์แล้ว "ขีดเส้นใต้ 3 อย่าง" ก่อนจับปากกาวาด',
        detail:
          'ขีดเส้นใต้ (1) ผู้เกี่ยวข้อง/หน่วยงาน (Actor / Entity), (2) เงื่อนไขตัวเลข/คำว่า "ถ้า/ต้อง/สามารถเลือก" (Decision / Include / Extend) และ (3) ข้อมูลที่ต้องเก็บถาวร (Data Store / Table)'
      },
      {
        step: '02',
        title: 'แยกให้ออกว่าโจทย์ถาม "มุมมองไหน" อย่าใช้แผนภาพผิดประเภท',
        detail:
          'ถามขั้นตอนคำนวณ/เงื่อนไข → Flowchart | ถามเส้นทางเอกสาร/ข้อมูล → DFD | ถามการเก็บข้อมูล/ตาราง → ERD & 3NF | ถามขอบเขตฟีเจอร์ → Use Case | ถามจังหวะการคุยระหว่างหน้าจอ-API-DB → Sequence | ถามเซิร์ฟเวอร์และปลอดภัย → System Architecture'
      },
      {
        step: '03',
        title: 'ร่างด้วยดินสอในกระดาษทดก่อน 2 นาที ลดการขีดฆ่าเลอะกระดาษคำตอบ',
        detail:
          'จัดวางบนลงล่างหรือซ้ายไปขวาให้เส้นไม่ตัดกันยุ่งเหยิง เว้นที่ว่างระหว่างกล่องเผื่อเขียนป้ายกำกับบนลูกศร (Label) เสมอ'
      },
      {
        step: '04',
        title: 'กฎเหล็กหัวลูกศร: อย่าลืมเขียน "คำกำกับลูกศร" เด็ดขาด',
        detail:
          'ใน Flowchart ข้าวหลามตัดต้องเขียน ใช่/ไม่ใช่ (True/False) | ใน DFD เส้น Data Flow ต้องมีชื่อข้อมูลเป็นคำนาม | ใน Use Case ต้องเช็กหัวลูกศร «include» กับ «extend» ไม่ให้ชี้กลับด้าน!'
      },
      {
        step: '05',
        title: 'ทุกแผนภาพควรมี "คำอธิบายสั้นๆ ประกอบใต้ภาพ" 3–5 บรรทัด',
        detail:
          'เขียนสรุปสมมติฐานหรือมาตรการสำคัญกำกับไว้ เช่น ใน System Architecture ให้สรุปปิดท้ายว่าใช้ WAF, DMZ, HA/Replica, Backup 3-2-1, เก็บ Log &gt;= 90 วันตาม พ.ร.บ.คอมฯ และเข้ารหัสตาม PDPA'
      },
      {
        step: '06',
        title: 'เช็ก "ความสมดุลและความครบถ้วน" 30 วินาทีก่อนส่งกระดาษ',
        detail:
          'Flowchart มี Start และ End ครบไหม? | DFD มี Data Store ใน Level 0 หรือไม่ (ห้ามมี!)? | ERD แก้ M:N เป็น Junction Table แล้วหรือยัง? | System Arch เผลอเอา Database ไปวางใน DMZ หรือเปล่า?'
      }
    ],

    quickSelectorTable: [
      {
        keywordInExam: 'จงเขียนผังงานคำนวณ..., ตรวจสอบเงื่อนไข..., วนซ้ำจนกว่า...',
        diagramToUse: 'Flowchart',
        categoryId: 'flowchart',
        coreFocus: 'ลำดับการทำงานของโปรแกรม (Control Flow) การตัดสินใจ if-else และการวนลูป',
        firstStep: 'หา Input → ตัวแปรเริ่มต้น → เงื่อนไขข้าวหลามตัด → สูตรคำนวณ → Output'
      },
      {
        keywordInExam: 'จงเขียน Context Diagram, DFD Level 0 / Level 1, แสดงการไหลของข้อมูล...',
        diagramToUse: 'DFD',
        categoryId: 'dfd',
        coreFocus: 'เส้นทางข้อมูลจากบุคคลภายนอก ผ่าน Process แปรรูป ไปเก็บใน Data Store',
        firstStep: 'ลิสต์ External Entity (คำนาม) + ข้อมูลเข้า-ออก แล้ววาด Process 0 ก้อนเดียวก่อน'
      },
      {
        keywordInExam: 'จงออกแบบฐานข้อมูล, วาด ER Diagram, แปลงตารางเป็น 3NF...',
        diagramToUse: 'ERD & 3NF',
        categoryId: 'erd',
        coreFocus: 'โครงสร้างตาราง ความสัมพันธ์ 1:1, 1:N, M:N คีย์ PK/FK และการขจัดความซ้ำซ้อน',
        firstStep: 'วงกลมคำนามหลักเป็น Entity, หาความสัมพันธ์ M:N แล้วแตกเป็น Junction Table'
      },
      {
        keywordInExam: 'ใครทำอะไรในระบบได้บ้าง, ระบุ Actor, Use Case, <<include>>, <<extend>>',
        diagramToUse: 'Use Case',
        categoryId: 'usecase',
        coreFocus: 'ขอบเขตหน้าที่ของระบบในมุมมองผู้ใช้งาน (Functional Scope)',
        firstStep: 'วาดกรอบ System Boundary วาง Actor ไว้นอกกรอบ และฟังก์ชันกริยาไว้ในกรอบ'
      },
      {
        keywordInExam: 'ลำดับการส่งข้อความระหว่างหน้าจอ-API-DB, ออกแบบ Class เชิงวัตถุ (OOP)',
        diagramToUse: 'Sequence & Class',
        categoryId: 'sequence-class',
        coreFocus: 'เวลาจากบนลงล่างของ 1 งาน (Sequence) และคลาส/การสืบทอด OOP (Class)',
        firstStep: 'Sequence: เรียง Participant ซ้าย→ขวา | Class: หาคลาส 3 ช่องและแยก Aggregation/Composition'
      },
      {
        keywordInExam: 'จงออกแบบสถาปัตยกรรมระบบสารสนเทศภาครัฐ รองรับ 462 สาขา ปลอดภัยตามกฎหมาย...',
        diagramToUse: 'สถาปัตยกรรมระบบ',
        categoryId: 'sysarch',
        coreFocus: 'โซนเครือข่าย WAF/DMZ/Firewall, HA, Backup 3-2-1, VPN, Log 90 วัน, PDPA',
        firstStep: 'แบ่ง 5 ชั้น: User/Edge → DMZ → Internal App → Data/Backup → VPN & Security Log'
      }
    ],

    categories: [
      // =========================================================================
      // CATEGORY 1: FLOWCHART
      // =========================================================================
      {
        id: 'flowchart',
        tabLabel: 'Flowchart',
        order: 1,
        badge: 'หมวดที่ 1 • ตรรกะโปรแกรม (ANSI/ISO)',
        icon: 'fa-solid fa-diagram-next',
        title: '1. ผังงานโปรแกรม (Flowchart) — แปลงโจทย์คำนวณและเงื่อนไขให้เป็นผังงานเป๊ะ',
        whatIsItHtml:
          '<h3>อะไรคือ Flowchart (ผังงาน)?</h3>' +
          '<p><strong>Flowchart</strong> คือแผนภาพที่ใช้สัญลักษณ์มาตรฐานสากล (ANSI/ISO) เพื่ออธิบาย <strong>"ลำดับขั้นตอนการทำงานและการตัดสินใจของโปรแกรม (Control Flow)"</strong> ตั้งแต่วินาทีที่โปรแกรมเริ่มทำงาน (Start) รับข้อมูล (Input) ตรวจสอบเงื่อนไข <code>if / else</code> หรือวนซ้ำ <code>loop</code> คำนวณผลลัพธ์ (Process) แสดงผล (Output) จนจบการทำงาน (End)</p>' +
          '<p>ข้อสอบเขียนชอบให้ <strong>"โจทย์เงื่อนไขภาษาไทย"</strong> เช่น การคิดค่าธรรมเนียมโอนที่ดิน ภาษี หรือส่วนลดแบบขั้นบันได แล้วให้น้องวาดเป็น Flowchart เพื่อตรวจว่าน้องแยกกรณี <code>if / else if / else</code> และตรวจสอบข้อมูลผิดพลาด (Validation) ได้ครบทุกทางไหม</p>',
        analogy: {
          title: 'เปรียบเทียบให้เห็นภาพ: สูตรทำอาหารทีละบรรทัด vs แผนที่ตู้ไปรษณีย์',
          body: '• <strong>Flowchart</strong> เหมือน <strong>"สูตรทำอาหารทีละขั้นตอน"</strong>: เริ่มเปิดเตา → ใส่ไข่ → <em>ถ้า</em>ไข่สุกแล้วให้ตักใส่จาน (Yes) <em>ถ้า</em>ยังไม่สุกให้ทอดต่ออีก 10 วินาที (No - วนซ้ำ) → ปิดเตาจบงาน!<br>• นี่คือจุดต่างสำคัญจาก <strong>DFD</strong> ที่ไม่ได้สนว่าต้องผัดวนกี่รอบ แต่สนว่าวัตถุดิบส่งมาจากตลาดไหนแล้วเก็บเข้าตู้เย็นใบใดครับ'
        },
        symbolLegendSvg: {
          caption: 'สัญลักษณ์ Flowchart มาตรฐาน ANSI/ISO ครบทั้ง 7 ตัวที่ใช้ในห้องสอบข้อเขียน',
          svgHtml: `<svg role="img" viewBox="0 0 780 410" width="100%" xmlns="http://www.w3.org/2000/svg" aria-labelledby="svg-diag-fc-title">
  <title id="svg-diag-fc-title">สัญลักษณ์ผังงาน Flowchart มาตรฐาน 7 ชนิดสำหรับข้อเขียน</title>
  <rect x="0" y="0" width="780" height="410" rx="14" fill="#F4F7F6" stroke="#D5E1DD" stroke-width="2"/>
  <text x="390" y="34" text-anchor="middle" font-family="Prompt, Sarabun, sans-serif" font-size="18" font-weight="700" fill="#0F5E4D">สัญลักษณ์ Flowchart มาตรฐาน 7 ตัว (ห้ามจำสลับรูปทรง!)</text>

  <!-- 1 Terminator -->
  <rect x="20" y="54" width="175" height="150" rx="10" fill="#FFFFFF" stroke="#D5E1DD" stroke-width="1.5"/>
  <rect x="42" y="76" width="130" height="42" rx="21" ry="21" fill="#E6F4F1" stroke="#0F5E4D" stroke-width="2.5"/>
  <text x="107" y="102" text-anchor="middle" font-family="Sarabun, sans-serif" font-size="13" font-weight="700" fill="#0F5E4D">Start / End</text>
  <text x="107" y="146" text-anchor="middle" font-family="Prompt, sans-serif" font-size="13" font-weight="700" fill="#122026">1. Terminator</text>
  <text x="107" y="168" text-anchor="middle" font-family="Sarabun, sans-serif" font-size="11.5" fill="#475569">แคปซูล: จุดเริ่มต้น / สิ้นสุด</text>
  <text x="107" y="186" text-anchor="middle" font-family="Sarabun, sans-serif" font-size="11.5" fill="#475569">(มีจุดเริ่ม 1 จุดเสมอ)</text>

  <!-- 2 Input/Output -->
  <rect x="208" y="54" width="175" height="150" rx="10" fill="#FFFFFF" stroke="#D5E1DD" stroke-width="1.5"/>
  <polygon points="246,76 360,76 344,118 230,118" fill="#E6F4F1" stroke="#0F5E4D" stroke-width="2.5"/>
  <text x="295" y="102" text-anchor="middle" font-family="Sarabun, sans-serif" font-size="12.5" font-weight="700" fill="#0F5E4D">Input / Output</text>
  <text x="295" y="146" text-anchor="middle" font-family="Prompt, sans-serif" font-size="13" font-weight="700" fill="#122026">2. Input / Output</text>
  <text x="295" y="168" text-anchor="middle" font-family="Sarabun, sans-serif" font-size="11.5" fill="#475569">สี่เหลี่ยมด้านขนาน (เอียง)</text>
  <text x="295" y="186" text-anchor="middle" font-family="Sarabun, sans-serif" font-size="11.5" fill="#475569">รับค่าเข้า / แสดงผลออก</text>

  <!-- 3 Process -->
  <rect x="396" y="54" width="175" height="150" rx="10" fill="#FFFFFF" stroke="#D5E1DD" stroke-width="1.5"/>
  <rect x="418" y="76" width="130" height="42" rx="3" fill="#E6F4F1" stroke="#0F5E4D" stroke-width="2.5"/>
  <text x="483" y="102" text-anchor="middle" font-family="Sarabun, sans-serif" font-size="13" font-weight="700" fill="#0F5E4D">fee = price * 0.02</text>
  <text x="483" y="146" text-anchor="middle" font-family="Prompt, sans-serif" font-size="13" font-weight="700" fill="#122026">3. Process</text>
  <text x="483" y="168" text-anchor="middle" font-family="Sarabun, sans-serif" font-size="11.5" fill="#475569">สี่เหลี่ยมผืนผ้า</text>
  <text x="483" y="186" text-anchor="middle" font-family="Sarabun, sans-serif" font-size="11.5" fill="#475569">คำนวณ / กำหนดค่าตัวแปร</text>

  <!-- 4 Decision -->
  <rect x="584" y="54" width="175" height="150" rx="10" fill="#FFFFFF" stroke="#D5E1DD" stroke-width="1.5"/>
  <polygon points="671,66 732,97 671,128 610,97" fill="#FEF3C7" stroke="#D97706" stroke-width="2.5"/>
  <text x="671" y="102" text-anchor="middle" font-family="Sarabun, sans-serif" font-size="12" font-weight="700" fill="#92400E">เงื่อนไข?</text>
  <text x="671" y="146" text-anchor="middle" font-family="Prompt, sans-serif" font-size="13" font-weight="700" fill="#122026">4. Decision</text>
  <text x="671" y="168" text-anchor="middle" font-family="Sarabun, sans-serif" font-size="11.5" fill="#475569">ข้าวหลามตัด: แยก Yes / No</text>
  <text x="671" y="186" text-anchor="middle" font-family="Sarabun, sans-serif" font-size="11.5" fill="#475569">ห้ามลืมเขียนป้ายกำกับเส้น!</text>

  <!-- 5 Predefined Process -->
  <rect x="20" y="222" width="234" height="160" rx="10" fill="#FFFFFF" stroke="#D5E1DD" stroke-width="1.5"/>
  <rect x="64" y="246" width="146" height="44" fill="#E6F4F1" stroke="#0F5E4D" stroke-width="2.5"/>
  <line x1="78" y1="246" x2="78" y2="290" stroke="#0F5E4D" stroke-width="2"/>
  <line x1="196" y1="246" x2="196" y2="290" stroke="#0F5E4D" stroke-width="2"/>
  <text x="137" y="273" text-anchor="middle" font-family="Sarabun, sans-serif" font-size="12.5" font-weight="700" fill="#0F5E4D">calcTax(price)</text>
  <text x="137" y="320" text-anchor="middle" font-family="Prompt, sans-serif" font-size="13.5" font-weight="700" fill="#122026">5. Predefined Process</text>
  <text x="137" y="342" text-anchor="middle" font-family="Sarabun, sans-serif" font-size="12" fill="#475569">สี่เหลี่ยมมีขีดคู่ซ้าย-ขวา</text>
  <text x="137" y="362" text-anchor="middle" font-family="Sarabun, sans-serif" font-size="12" fill="#475569">เรียกใช้ฟังก์ชัน/โปรแกรมย่อย</text>

  <!-- 6 Connectors -->
  <rect x="272" y="222" width="236" height="160" rx="10" fill="#FFFFFF" stroke="#D5E1DD" stroke-width="1.5"/>
  <circle cx="344" cy="268" r="20" fill="#FEF3C7" stroke="#D97706" stroke-width="2.5"/>
  <text x="344" y="273" text-anchor="middle" font-family="Sarabun, sans-serif" font-size="13" font-weight="700" fill="#92400E">A</text>
  <polygon points="416,248 456,248 456,274 436,292 416,274" fill="#FEF3C7" stroke="#D97706" stroke-width="2.5"/>
  <text x="436" y="271" text-anchor="middle" font-family="Sarabun, sans-serif" font-size="12" font-weight="700" fill="#92400E">P.2</text>
  <text x="390" y="320" text-anchor="middle" font-family="Prompt, sans-serif" font-size="13.5" font-weight="700" fill="#122026">6. Connector (ใน/ข้ามหน้า)</text>
  <text x="390" y="342" text-anchor="middle" font-family="Sarabun, sans-serif" font-size="12" fill="#475569">วงกลม = เชื่อมในหน้าเดียวกัน</text>
  <text x="390" y="362" text-anchor="middle" font-family="Sarabun, sans-serif" font-size="12" fill="#475569">ห้าเหลี่ยมหัวทิ่ม = ข้ามไปหน้าถัดไป</text>

  <!-- 7 Flowline -->
  <rect x="526" y="222" width="233" height="160" rx="10" fill="#FFFFFF" stroke="#D5E1DD" stroke-width="1.5"/>
  <line x1="570" y1="268" x2="700" y2="268" stroke="#0F5E4D" stroke-width="3.5"/>
  <polygon points="714,268 696,258 696,278" fill="#0F5E4D"/>
  <text x="642" y="320" text-anchor="middle" font-family="Prompt, sans-serif" font-size="13.5" font-weight="700" fill="#122026">7. Flowline (เส้นทิศทาง)</text>
  <text x="642" y="342" text-anchor="middle" font-family="Sarabun, sans-serif" font-size="12" fill="#475569">ต้องมีหัวลูกศรชี้ทิศทางเสมอ</text>
  <text x="642" y="362" text-anchor="middle" font-family="Sarabun, sans-serif" font-size="12" fill="#475569">ไหลจากบนลงล่าง / ซ้ายไปขวา</text>
</svg>`
        },
        symbolsTable: {
          caption: 'ตารางสรุปสัญลักษณ์ Flowchart มาตรฐาน ANSI/ISO และข้อกำหนดการใช้งาน',
          headers: ['ชื่อสัญลักษณ์', 'รูปร่าง', 'หน้าที่และการใช้งาน', 'ตัวอย่างการเขียนข้อความข้างใน'],
          rows: [
            ['Terminator', 'รูปแคปซูล / วงรีหัวท้ายมน', 'บอกจุดเริ่มต้น (Start) และจุดสิ้นสุด (End) มีทางออก 1 เส้นที่ Start และเข้า End ได้หลายเส้น', 'Start / End (เริ่มต้น / สิ้นสุด)'],
            ['Input / Output', 'สี่เหลี่ยมด้านขนาน (เอียง)', 'รับข้อมูลเข้า (Read/Input) จากผู้ใช้/ไฟล์ หรือแสดงผลลัพธ์ออกหน้าจอ/เครื่องพิมพ์ (Print/Display)', 'รับค่า price, isFirstHome / แสดง totalFee'],
            ['Process', 'สี่เหลี่ยมผืนผ้า', 'ประมวลผล คำนวณ กำหนดค่าตัวแปร (Assignment) หรืออัปเดตตัวนับ Loop (ห้ามใส่เงื่อนไข Yes/No ในนี้!)', 'total = 0 / fee = price * 0.02'],
            ['Decision', 'สี่เหลี่ยมข้าวหลามตัด', 'ตรวจสอบเงื่อนไขตรรกะ (Comparison/Boolean) มีเส้นเข้า 1 เส้น และเส้นออกอย่างน้อย 2 เส้นพร้อมป้าย Yes/No', 'price &lt;= 7000000 ?'],
            ['Predefined Process', 'ผืนผ้ามีขีดแนวตั้งคู่ซ้าย-ขวา', 'เรียกใช้ฟังก์ชันหรือโปรแกรมย่อย (Subroutine) ที่ออกแบบแยกไว้อีกชุดหนึ่ง', 'เรียกโมดูล คำนวณภาษีหัก ณ ที่จ่าย()'],
            ['Connector (On/Off-page)', 'วงกลมเล็ก / ห้าเหลี่ยมหัวชี้ลง', 'เชื่อมเส้นเมื่อกระดาษเต็ม: วงกลมใช้ในหน้าเดียวกัน (ใส่ตัวอักษร A, B), ห้าเหลี่ยมหัวทิ่มใช้ต่อหน้ากระดาษใหม่', 'A (หน้าเดียวกัน) / 2 (ข้ามหน้า 2)'],
            ['Flowline', 'เส้นตรงพร้อมหัวลูกศร', 'บอกลำดับการทำงานถัดไป ห้ามวาดเส้นลอยที่ไม่มีหัวลูกศร และหลีกเลี่ยงเส้นตัดทับกันโดยใช้ Connector', 'ชี้จากบนลงล่าง หรือวนกลับเข้า Loop']
          ]
        },
        stepByStepHtml:
          '<h3>วิธีแปลงโจทย์ข้อเขียนเป็น Flowchart ทีละขั้น (สูตร 5 ขั้นตอน)</h3>' +
          '<ol>' +
          '<li><strong>ขั้นที่ 1 — วาด <code>Start</code> และหา <code>Input</code>:</strong> อ่านโจทย์แล้วลิสต์ว่า "ระบบต้องรับค่าอะไรจากผู้ใช้บ้าง?" เอาไปใส่ในกล่อง <strong>สี่เหลี่ยมด้านขนาน</strong> ทันที เช่น <code>รับค่าราคาประเมิน (price), จำนวนปีที่ถือครอง (years), จำนวนแปลง (n)</code></li>' +
          '<li><strong>ขั้นที่ 2 — กำหนดค่าเริ่มต้น (Initialize Variables):</strong> ถ้าโจทย์มีการหาผลรวม (Sum) หรือนับจำนวนรอบ (Loop) ต้องใส่กล่อง <strong>Process</strong> กำหนดค่าเริ่มต้นก่อนเข้าลูปเสมอ เช่น <code>totalFee = 0</code>, <code>i = 1</code></li>' +
          '<li><strong>ขั้นที่ 3 — ตรวจความถูกต้องข้อมูล (Input Validation) และแปลงเงื่อนไข <code>If / Else If / Else</code>:</strong> เจอคำว่า "ถ้า... ให้คิดอัตรา...", "หากเกิน..." ให้วาด <strong>ข้าวหลามตัด</strong> และเรียงช่วงตัวเลขจากน้อยไปมากหรือมากไปน้อยแบบไม่ทับซ้อนกัน</li>' +
          '<li><strong>ขั้นที่ 4 — แปลง Loop (ถ้าโจทย์บอก "ทำซ้ำ N แปลง" หรือ "รับจนกว่าจะกรอก 0"):</strong> วาดข้าวหลามตัดตรวจสอบเงื่อนไขทำซ้ำ <code>i &lt;= n ?</code> → <em>ใช่ (True):</em> เข้าไปทำคำนวณแล้วเพิ่มตัวนับ <code>i = i + 1</code> <strong>โยงเส้นวนกลับขึ้นไปหน้าข้าวหลามตัดเงื่อนไข Loop</strong> → <em>ไม่ใช่ (False):</em> ออกนอก Loop ไปแสดงผล</li>' +
          '<li><strong>ขั้นที่ 5 — แสดง <code>Output</code> (ด้านขนาน) แล้วรวมเส้นจบที่ <code>End</code> (แคปซูล):</strong> ทุกทางแยกจากเงื่อนไขต้องเดินมารวมจบที่จุด <code>End</code> (ควรมี <code>End</code> เพียงตัวเดียวเพื่อให้ผังสะอาดตามมาตรฐาน Structured Flowchart)</li>' +
          '</ol>' +
          '<h4>ตัวอย่างแกะโจทย์ &amp; Trace Table: ระบบคำนวณค่าธรรมเนียมโอนและภาษีธุรกิจเฉพาะ (โฉนดที่ดิน)</h4>' +
          '<p>สมมติโจทย์กำหนดกติกา: รับ <code>price</code> (ราคาประเมิน/ซื้อขาย) และ <code>holdYears</code> (ปีที่ถือครอง) โดย (1) ถ้าราคา &lt;= 0 ให้แจ้ง Error แล้วจบ, (2) ค่าธรรมเนียมโอนปกติ 2% แต่ถ้าราคาไม่เกิน 7,000,000 บาท ได้รับมาตรการลดค่าธรรมเนียมเหลือ 0.01%, (3) ถ้าถือครองน้อยกว่า 5 ปี ต้องเสียภาษีธุรกิจเฉพาะเพิ่ม 3.3% (ใช้ Sub-function คำนวณ), (4) แสดง <code>totalPay</code></p>' +
          '<div class="table-wrap">' +
          '<table class="data-table">' +
          '<caption>ตารางไล่ค่าตัวแปร (Trace Table) เพื่อเช็กความถูกต้องของ Flowchart ก่อนส่งคำตอบ</caption>' +
          '<thead><tr>' +
          '<th scope="col">กรณีทดสอบ</th>' +
          '<th scope="col">Input: price, holdYears</th>' +
          '<th scope="col">เงื่อนไขที่ 1 (Valid?)</th>' +
          '<th scope="col">เงื่อนไขที่ 2 (Fee)</th>' +
          '<th scope="col">เงื่อนไขที่ 3 (SBT &lt; 5 ปี?)</th>' +
          '<th scope="col">Output: totalPay</th>' +
          '</tr></thead>' +
          '<tbody>' +
          '<tr>' +
          '<th scope="row">เคส A: บ้านราคา 5 ล้าน ถือ 3 ปี</th>' +
          '<td>5,000,000 / 3</td>' +
          '<td>ผ่าน (&gt; 0)</td>' +
          '<td>5,000,000 × 0.01% = 500 บาท</td>' +
          '<td>ใช่ (&lt; 5 ปี) → 5,000,000 × 3.3% = 165,000</td>' +
          '<td><strong>165,500 บาท</strong></td>' +
          '</tr>' +
          '<tr>' +
          '<th scope="row">เคส B: ที่ดิน 10 ล้าน ถือ 6 ปี</th>' +
          '<td>10,000,000 / 6</td>' +
          '<td>ผ่าน (&gt; 0)</td>' +
          '<td>10,000,000 × 2% = 200,000 บาท</td>' +
          '<td>ไม่ใช่ (&gt;= 5 ปี) → ภาษีธุรกิจเฉพาะ = 0</td>' +
          '<td><strong>200,000 บาท</strong></td>' +
          '</tr>' +
          '</tbody>' +
          '</table>' +
          '</div>',
        mermaidDiagrams: [
          {
            title: 'Flowchart มาตรฐาน: คำนวณค่าธรรมเนียมโอนและภาษีธุรกิจเฉพาะ (พร้อม Predefined Process)',
            caption: 'สังเกตการใช้รูปแคปซูล (Start/End), ด้านขนาน (Input/Output), ข้าวหลามตัด (Decision พร้อมป้าย ใช่/ไม่ใช่), สี่เหลี่ยม (Process) และขีดคู่ (Subroutine)',
            code: `flowchart TD
  S(["Start: เริ่มคำนวณค่าใช้จ่ายโอนที่ดิน"]) --> IN[/"รับค่า price (บาท) และ holdYears (ปี)"/]
  IN --> CHK_VALID{"price มากกว่า 0 และ holdYears ตั้งแต่ 0?"}
  CHK_VALID -->|"ไม่ใช่ (ข้อมูลผิดพลาด)"| ERR[/"แสดงข้อความ: ข้อมูลราคาหรือปีไม่ถูกต้อง"/]
  ERR --> E(["End: สิ้นสุดการทำงาน"])
  CHK_VALID -->|"ใช่ (ข้อมูลถูกต้อง)"| CHK_CAP{"price ไม่เกิน 7,000,000 บาท?"}
  CHK_CAP -->|"ใช่ (เข้าเกณฑ์ลดหย่อน)"| FEE_LOW["transferFee = price * 0.0001"]
  CHK_CAP -->|"ไม่ใช่ (อัตราปกติ)"| FEE_STD["transferFee = price * 0.02"]
  FEE_LOW --> CHK_SBT{"holdYears น้อยกว่า 5 ปี?"}
  FEE_STD --> CHK_SBT
  CHK_SBT -->|"ใช่ (ต้องเสียภาษีธุรกิจเฉพาะ)"| SUB_SBT[["เรียกฟังก์ชัน calcSBT(price) = price * 0.033"]]
  CHK_SBT -->|"ไม่ใช่ (ยกเว้น)"| SBT_ZERO["sbtTax = 0"]
  SUB_SBT --> SUM["totalPay = transferFee + sbtTax"]
  SBT_ZERO --> SUM
  SUM --> OUT[/"แสดงผล totalPay (ยอดรวมที่ต้องชำระ)"/]
  OUT --> E`
          }
        ],
        examTraps: [
          'ลืมใส่ป้ายกำกับ <strong>"ใช่ / ไม่ใช่" (True / False)</strong> ออกจากสี่เหลี่ยมข้าวหลามตัด (Decision) — โดนหักคะแนนทุกข้อ!',
          'เอาคำสั่ง <code>รับค่า...</code> หรือ <code>แสดงผล...</code> ไปใส่ในกล่องสี่เหลี่ยมผืนผ้า (Process) แทนที่จะใช้ <strong>สี่เหลี่ยมด้านขนาน</strong>',
          'ใช้กล่อง Process แต่เขียนเป็นประโยคคำถาม เช่น <code>ตรวจสอบว่าอายุเกิน 5 ปี</code> — ถ้ามีการแยกทางเลือก ต้องใช้ข้าวหลามตัดเท่านั้น',
          'เขียน Loop โดยลืมเพิ่มค่าตัวนับ (เช่น ลืม <code>i = i + 1</code>) หรือโยงลูกศรกลับไปที่จุด <code>Start</code> แทนที่จะโยงกลับไปที่หน้าเงื่อนไข Loop (ทำให้งานวนล้างค่าเริ่มต้นใหม่ตลอดกาล)',
          'ปล่อยให้กิ่งใดกิ่งหนึ่งของเงื่อนไข (เช่น กิ่ง Error) ลอยค้างไม่ต่อเส้นมาที่ <code>End</code>'
        ]
      },

      // =========================================================================
      // CATEGORY 2: DFD
      // =========================================================================
      {
        id: 'dfd',
        tabLabel: 'DFD',
        order: 2,
        badge: 'หมวดที่ 2 • กระแสข้อมูล (Structured Analysis)',
        icon: 'fa-solid fa-share-nodes',
        title: '2. แผนภาพกระแสข้อมูล (DFD: Level 0 Context Diagram & Level 1)',
        whatIsItHtml:
          '<h3>อะไรคือ Data Flow Diagram (DFD)?</h3>' +
          '<p><strong>DFD</strong> คือแผนภาพที่ใช้อธิบาย <strong>"เส้นทางการไหลของข้อมูล (Data Movement)"</strong> ในระบบสารสนเทศว่า ข้อมูลมาจากแหล่งภายนอกไหน (External Entity) เข้าไปผ่านกระบวนการแปรรูปอะไร (Process) และถูกนำไปเก็บหรืออ่านจากแฟ้มข้อมูลไหน (Data Store)</p>' +
          '<div class="table-wrap">' +
          '<table class="data-table">' +
          '<caption>เปรียบเทียบ Flowchart vs DFD ให้ขาดภายใน 10 วินาที</caption>' +
          '<thead><tr>' +
          '<th scope="col">ประเด็น</th>' +
          '<th scope="col">Flowchart (ผังงานโปรแกรม)</th>' +
          '<th scope="col">DFD (แผนภาพกระแสข้อมูล)</th>' +
          '</tr></thead>' +
          '<tbody>' +
          '<tr><th scope="row">สิ่งที่แสดง</th><td>ลำดับการทำงาน การตัดสินใจ if-else และการวนลูป</td><td>การไหลของข้อมูลจากคนนอก → งานแปรรูป → คลังเก็บข้อมูล</td></tr>' +
          '<tr><th scope="row">จุดเริ่มต้น-จบ</th><td><strong>ต้องมี</strong> Start และ End</td><td><strong>ไม่มี</strong> Start / End และ <strong>ไม่มี</strong> ลูปหรือเงื่อนไข Yes/No</td></tr>' +
          '<tr><th scope="row">คลังข้อมูล (DB)</th><td>ไม่ค่อยแยกเป็นสัญลักษณ์เฉพาะ</td><td><strong>ต้องมี</strong> Data Store (D1, D2...) ชัดเจนใน Level 1 ขึ้นไป</td></tr>' +
          '<tr><th scope="row">ความหมายลูกศร</th><td>ลำดับคำสั่งถัดไป (ทำอันนี้เสร็จแล้วทำอันไหนต่อ)</td><td>ข้อมูลที่กำลังวิ่ง (เช่น ใบคำขอ, ข้อมูลโฉนด, ใบเสร็จ)</td></tr>' +
          '</tbody>' +
          '</table>' +
          '</div>',
        analogy: {
          title: 'เปรียบเทียบให้เห็นภาพ: มองจากโดรน (Level 0) vs เปิดหลังคาตึกดูห้องทำงาน (Level 1)',
          body: '• <strong>Context Diagram (DFD Level 0):</strong> เหมือนบินโดรนมองตึกสำนักงานที่ดินทั้งหลัง เห็นแค่กล่องใหญ่กล่องเดียวเลข <code>0</code> มีคนนอก (ประชาชน, ธนาคาร) ยื่นเอกสารเข้าตึก และตึกส่งใบเสร็จคืนให้ — <em>ห้ามวาดตู้เก็บแฟ้ม (Data Store) ออกมาข้างนอกตึกเด็ดขาด!</em><br>• <strong>DFD Level 1:</strong> เหมือน <strong>"เปิดหลังคาตึกออก"</strong> จะเห็นข้างในว่ามี 3 ห้องทำงานย่อย (<code>1.0</code>, <code>2.0</code>, <code>3.0</code>) และเห็นตู้เก็บแฟ้มข้อมูล (<code>D1</code>, <code>D2</code>) ตั้งอยู่ข้างในตึกครับ'
        },
        symbolLegendSvg: {
          caption: 'สัญลักษณ์ DFD 4 ชนิด (สไตล์ Gane & Sarson) และกฎเหล็กความสัมพันธ์ที่ห้ามวาดผิด',
          svgHtml: `<svg role="img" viewBox="0 0 780 410" width="100%" xmlns="http://www.w3.org/2000/svg" aria-labelledby="svg-diag-dfd-title">
  <title id="svg-diag-dfd-title">สัญลักษณ์ Data Flow Diagram 4 ตัวและกฎเหล็กที่ห้ามผิด</title>
  <rect x="0" y="0" width="780" height="410" rx="14" fill="#F4F7F6" stroke="#D5E1DD" stroke-width="2"/>
  <text x="390" y="34" text-anchor="middle" font-family="Prompt, Sarabun, sans-serif" font-size="18" font-weight="700" fill="#0F5E4D">สัญลักษณ์ DFD 4 ตัว (Gane &amp; Sarson) + กฎตั้งชื่อ</text>

  <!-- 1 External Entity -->
  <rect x="20" y="54" width="175" height="150" rx="10" fill="#FFFFFF" stroke="#D5E1DD" stroke-width="1.5"/>
  <rect x="46" y="76" width="122" height="44" fill="#FEF3C7" stroke="#D97706" stroke-width="2.5"/>
  <text x="107" y="103" text-anchor="middle" font-family="Sarabun, sans-serif" font-size="13" font-weight="700" fill="#92400E">ประชาชน</text>
  <text x="107" y="146" text-anchor="middle" font-family="Prompt, sans-serif" font-size="13" font-weight="700" fill="#122026">1. External Entity</text>
  <text x="107" y="168" text-anchor="middle" font-family="Sarabun, sans-serif" font-size="11.5" fill="#475569">สี่เหลี่ยม: คน/ระบบภายนอก</text>
  <text x="107" y="186" text-anchor="middle" font-family="Sarabun, sans-serif" font-size="11.5" font-weight="700" fill="#0F5E4D">ตั้งชื่อ = คำนาม (Noun)</text>

  <!-- 2 Process -->
  <rect x="208" y="54" width="175" height="150" rx="10" fill="#FFFFFF" stroke="#D5E1DD" stroke-width="1.5"/>
  <rect x="234" y="70" width="122" height="54" rx="10" fill="#E6F4F1" stroke="#0F5E4D" stroke-width="2.5"/>
  <line x1="234" y1="90" x2="356" y2="90" stroke="#0F5E4D" stroke-width="1.5"/>
  <text x="295" y="85" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="11.5" font-weight="700" fill="#0F5E4D">1.0</text>
  <text x="295" y="111" text-anchor="middle" font-family="Sarabun, sans-serif" font-size="12.5" font-weight="700" fill="#122026">ตรวจสอบคำขอ</text>
  <text x="295" y="146" text-anchor="middle" font-family="Prompt, sans-serif" font-size="13" font-weight="700" fill="#122026">2. Process</text>
  <text x="295" y="168" text-anchor="middle" font-family="Sarabun, sans-serif" font-size="11.5" fill="#475569">สี่เหลี่ยมมุมมน + เลขลำดับ</text>
  <text x="295" y="186" text-anchor="middle" font-family="Sarabun, sans-serif" font-size="11.5" font-weight="700" fill="#0F5E4D">ชื่อ = กริยา + กรรม</text>

  <!-- 3 Data Store -->
  <rect x="396" y="54" width="175" height="150" rx="10" fill="#FFFFFF" stroke="#D5E1DD" stroke-width="1.5"/>
  <path d="M 418 76 L 548 76 M 418 76 L 418 118 L 548 118 M 446 76 L 446 118" fill="none" stroke="#0F5E4D" stroke-width="2.5"/>
  <text x="432" y="102" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="11.5" font-weight="700" fill="#0F5E4D">D1</text>
  <text x="497" y="102" text-anchor="middle" font-family="Sarabun, sans-serif" font-size="12" font-weight="700" fill="#122026">ทะเบียนโฉนด</text>
  <text x="483" y="146" text-anchor="middle" font-family="Prompt, sans-serif" font-size="13" font-weight="700" fill="#122026">3. Data Store</text>
  <text x="483" y="168" text-anchor="middle" font-family="Sarabun, sans-serif" font-size="11.5" fill="#475569">กล่องเปิดขวา (ห้ามมีใน Lv.0!)</text>
  <text x="483" y="186" text-anchor="middle" font-family="Sarabun, sans-serif" font-size="11.5" font-weight="700" fill="#0F5E4D">ตั้งชื่อ = คำนาม (Noun)</text>

  <!-- 4 Data Flow -->
  <rect x="584" y="54" width="175" height="150" rx="10" fill="#FFFFFF" stroke="#D5E1DD" stroke-width="1.5"/>
  <line x1="604" y1="98" x2="722" y2="98" stroke="#0F5E4D" stroke-width="2.5"/>
  <polygon points="736,98 718,89 718,107" fill="#0F5E4D"/>
  <text x="670" y="88" text-anchor="middle" font-family="Sarabun, sans-serif" font-size="12" font-weight="700" fill="#0F5E4D">ข้อมูลคำขอ</text>
  <text x="671" y="146" text-anchor="middle" font-family="Prompt, sans-serif" font-size="13" font-weight="700" fill="#122026">4. Data Flow</text>
  <text x="671" y="168" text-anchor="middle" font-family="Sarabun, sans-serif" font-size="11.5" fill="#475569">เส้นลูกศรระบุชื่อข้อมูล</text>
  <text x="671" y="186" text-anchor="middle" font-family="Sarabun, sans-serif" font-size="11.5" font-weight="700" fill="#0F5E4D">ตั้งชื่อ = คำนาม (Noun)</text>

  <!-- Forbidden vs Allowed Panel -->
  <rect x="20" y="222" width="363" height="168" rx="10" fill="#FFF1F2" stroke="#BE123C" stroke-width="2"/>
  <text x="201" y="248" text-anchor="middle" font-family="Prompt, sans-serif" font-size="14" font-weight="700" fill="#BE123C">เส้นต้องห้าม! (วาดปุ๊บโดนหักคะแนนปั๊บ)</text>
  <text x="40" y="276" font-family="Sarabun, sans-serif" font-size="13" fill="#122026">✕ External Entity ──▶ Data Store (คนนอกแก้ DB ตรงๆ ไม่ได้)</text>
  <text x="40" y="302" font-family="Sarabun, sans-serif" font-size="13" fill="#122026">✕ External Entity ──▶ External Entity (อยู่นอกระบบเรา)</text>
  <text x="40" y="328" font-family="Sarabun, sans-serif" font-size="13" fill="#122026">✕ Data Store ──▶ Data Store (ตารางย้ายตัวเองไม่ได้)</text>
  <text x="40" y="354" font-family="Sarabun, sans-serif" font-size="13" fill="#122026">✕ Process มีแต่เข้า (Black Hole) / มีแต่ออก (Miracle)</text>
  <text x="40" y="376" font-family="Sarabun, sans-serif" font-size="12" font-weight="700" fill="#BE123C">✕ ห้ามมี Data Store ใน DFD Level 0 (Context Diagram)</text>

  <rect x="396" y="222" width="363" height="168" rx="10" fill="#E6F4F1" stroke="#0F5E4D" stroke-width="2"/>
  <text x="577" y="248" text-anchor="middle" font-family="Prompt, sans-serif" font-size="14" font-weight="700" fill="#0F5E4D">ทางที่ถูกต้อง! (ทุกเส้นต้องวิ่งผ่าน Process เสมอ)</text>
  <text x="416" y="278" font-family="Sarabun, sans-serif" font-size="13" fill="#122026">✓ External Entity ──▶ Process ──▶ Data Store</text>
  <text x="416" y="305" font-family="Sarabun, sans-serif" font-size="13" fill="#122026">✓ Data Store ──▶ Process ──▶ Data Store</text>
  <text x="416" y="332" font-family="Sarabun, sans-serif" font-size="13" fill="#122026">✓ Data Store ──▶ Process ──▶ External Entity</text>
  <text x="416" y="362" font-family="Sarabun, sans-serif" font-size="12.5" font-weight="700" fill="#0F5E4D">✓ Balancing: เส้นเข้า-ออก Entity ใน Lv.0 = Lv.1 เป๊ะ!</text>
</svg>`
        },
        symbolsTable: {
          caption: 'สรุป 4 องค์ประกอบของ DFD และกฎการตั้งชื่อ (จำให้ขึ้นใจก่อนลงมือวาด)',
          headers: ['องค์ประกอบ', 'กฎการตั้งชื่อ', 'ความหมายจากศูนย์', 'ตัวอย่างที่ถูก vs ตัวอย่างที่ผิด'],
          rows: [
            ['External Entity', 'คำนาม (Noun)', 'ผู้ส่งข้อมูลเข้าหรือรับผลลัพธ์จากระบบ (คน องค์กร หรือระบบไอทีอื่นที่อยู่นอกขอบเขตระบบเรา)', 'ถูก: ประชาชน, ระบบ ThaID | ผิด: ยื่นคำร้อง'],
            ['Process', 'เลขลำดับ + คำกริยา + กรรม', 'งานหรือซอฟต์แวร์ที่รับ Input มาแปรรูปเป็น Output (Lv.0 ใช้เลข 0, Lv.1 ใช้ 1.0, 2.0...)', 'ถูก: 1.0 ตรวจสอบเอกสาร | ผิด: เอกสารคำขอ'],
            ['Data Store', 'รหัส D1, D2 + คำนาม', 'แหล่งเก็บข้อมูลถาวร (ตารางฐานข้อมูล / แฟ้ม) มีได้ตั้งแต่ Level 1 ขึ้นไปเท่านั้น', 'ถูก: D1 ทะเบียนคิว | ผิด: บันทึกคิว'],
            ['Data Flow', 'คำนาม (Noun)', 'ชื่อของก้อนข้อมูลหรือเอกสารที่วิ่งบนลูกศร (ห้ามใช้กริยา!)', 'ถูก: ข้อมูลคำขอ, ใบคิว QR | ผิด: กดปุ่มยืนยัน']
          ]
        },
        stepByStepHtml:
          '<h3>กฎเหล็ก 5 ข้อของ DFD และ "เหตุผลว่าทำไมห้ามทำ"</h3>' +
          '<ol>' +
          '<li><strong>กฎข้อ 1 — ห้าม External Entity ต่อตรงเข้า Data Store (และห้ามออกตรงจาก Data Store):</strong> <em>เหตุผล:</em> บุคคลภายนอกไม่สามารถเดินเข้ามาอ่านหรือแก้ไขฐานข้อมูลดิบในเซิร์ฟเวอร์โดยตรงได้ ข้อมูลต้องผ่าน <code>Process</code> เพื่อตรวจสิทธิ์ (Auth), ตรวจรูปแบบ (Validation) และบันทึก Log เสมอ</li>' +
          '<li><strong>กฎข้อ 2 — ห้าม External Entity ต่อตรงถึง External Entity ด้วยกัน:</strong> <em>เหตุผล:</em> ถ้าคนนอก 2 ฝ่ายคุยกันเองโดยไม่ผ่านระบบซอฟต์แวร์ของเราเลย เหตุการณ์นั้น <em>อยู่นอกขอบเขตระบบ (Out of Scope)</em> ไม่ใช่งานของระบบเรา</li>' +
          '<li><strong>กฎข้อ 3 — ห้าม Data Store ต่อตรงถึง Data Store:</strong> <em>เหตุผล:</em> ตารางในฮาร์ดดิสก์ไม่สามารถคัดลอกตัวเองไปอีกตารางได้เอง ต้องมีโปรแกรม (<code>Process</code>) อ่านจาก <code>D1</code> มาแปรรูปแล้วเขียนลง <code>D2</code></li>' +
          '<li><strong>กฎข้อ 4 — ห้าม Process เป็น Black Hole (มีแต่เข้าไม่มีออก) หรือ Miracle (มีแต่ออกไม่มีเข้า):</strong> <em>เหตุผล:</em> ทุก Process ต้องรับข้อมูลมาประมวลผลแล้วส่งผลลัพธ์ออกไปเก็บหรือตอบกลับเสมอ จะรับแล้วหายไปในหลุมดำหรือเสกผลลัพธ์ขึ้นมาจากอากาศไม่ได้</li>' +
          '<li><strong>กฎข้อ 5 — กฎความสมดุล (Balancing Rule) ระหว่าง Level 0 กับ Level 1:</strong> <em>เหตุผล:</em> เมื่อ "ระเบิด (Explosion)" Process <code>0</code> ใน Level 0 ออกเป็น Process ย่อย <code>1.0, 2.0, 3.0</code> ใน Level 1 เส้น Data Flow ทั้งหมดที่ติดต่อกับ External Entity ต้องมีจำนวนและชื่อ <strong>ตรงกัน 100%</strong> ห้ามหายและห้ามงอกใหม่ (แต่ระหว่าง Process กับ Data Store เพิ่มข้างในได้เต็มที่!)</li>' +
          '</ol>' +
          '<h3>วิธีแปลงโจทย์เป็น DFD Level 0 (Context) → Level 1 ทีละขั้น</h3>' +
          '<ol>' +
          '<li><strong>ขั้นที่ 1:</strong> อ่านโจทย์แล้วลิสต์ <strong>External Entity</strong> (ใครใช้ระบบ + ระบบไหนต่อ API ด้วย?) และ <strong>Data Flow</strong> ที่รับ-ส่งกับระบบ</li>' +
          '<li><strong>ขั้นที่ 2 (วาด Level 0):</strong> วาง Process เลข <code>0</code> ก้อนเดียวตรงกลาง วาง Entity ล้อมรอบ ลากเส้นระบุชื่อข้อมูล (ห้ามวาด Data Store!)</li>' +
          '<li><strong>ขั้นที่ 3 (แตกเป็น Level 1):</strong> แตกงานหลักเป็น 3–4 Process ย่อย (<code>1.0, 2.0, 3.0...</code>) เพิ่ม Data Store <code>D1, D2...</code> ที่ต้องใช้อ่าน/เขียน แล้วไล่เช็กว่าเส้นเข้า-ออกจาก Entity ใน Level 0 ถูกต่อครบทุกเส้นใน Level 1 แล้วหรือยัง!</li>' +
          '</ol>',
        mermaidDiagrams: [
          {
            title: 'DFD Level 0 (Context Diagram): ระบบจองคิวและยื่นคำขอจดทะเบียนที่ดิน (1 Process ก้อนเดียว)',
            caption: 'สังเกตว่า Level 0 มี Process เลข 0 เพียงก้อนเดียว และไม่มี Data Store! เส้นเข้า-ออกกับ External Entity ทั้ง 3 ฝ่ายนี้จะต้องไปปรากฏครบใน Level 1 (Balancing)',
            code: `flowchart LR
  CIT["External Entity: ประชาชน"]
  THAID["External Entity: ระบบ ThaID"]
  STAFF["External Entity: เจ้าหน้าที่สำนักงานที่ดิน"]

  P0(("0. ระบบจองคิวและจดทะเบียนที่ดิน"))

  CIT -->|"ข้อมูลคำขอและเลขโฉนด"| P0
  P0 -->|"บัตรคิว QR Code และใบแจ้งยอด"| CIT
  P0 -->|"คำขอยืนยันตัวตน"| THAID
  THAID -->|"ผลยืนยันตัวตน"| P0
  P0 -->|"รายการคิวและเอกสารคำขอ"| STAFF
  STAFF -->|"ผลการตรวจเอกสารและอนุมัติ"| P0`
          },
          {
            title: 'DFD Level 1 (Diagram 1): ระเบิดจาก Process 0 เป็น 3 Process ย่อย + Data Stores (Balance 100%)',
            caption: 'เช็ก Balancing: เส้นจาก ประชาชน, ระบบ ThaID และ เจ้าหน้าที่ ตรงกับ Level 0 ครบทุกเส้น และเผยให้เห็น Data Store D1, D2, D3 ที่อยู่ภายในระบบ',
            code: `flowchart LR
  CIT["External Entity: ประชาชน"]
  THAID["External Entity: ระบบ ThaID"]
  STAFF["External Entity: เจ้าหน้าที่สำนักงานที่ดิน"]

  P1["1.0 ยืนยันตัวตนและรับคำขอ"]
  P2["2.0 ตรวจสอบแปลงและจองคิว"]
  P3["3.0 ออกบัตรคิวและส่งตรวจเอกสาร"]

  D1[("D1 ข้อมูลผู้ยื่นคำขอ")]
  D2[("D2 ทะเบียนแปลงที่ดิน")]
  D3[("D3 ตารางคิวนัดหมาย")]

  CIT -->|"ข้อมูลคำขอและเลขโฉนด"| P1
  P1 -->|"คำขอยืนยันตัวตน"| THAID
  THAID -->|"ผลยืนยันตัวตน"| P1
  P1 -->|"บันทึกประวัติผู้ยื่น"| D1
  P1 -->|"คำขอที่ยืนยันตัวตนแล้ว"| P2

  D2 -->|"ข้อมูลแปลงที่ดิน"| P2
  D3 -->|"ช่วงเวลาคิวว่าง"| P2
  P2 -->|"บันทึกคิวใหม่"| D3
  P2 -->|"ข้อมูลคิวที่ยืนยันแล้ว"| P3

  D1 -->|"ข้อมูลติดต่อผู้ยื่น"| P3
  P3 -->|"บัตรคิว QR Code และใบแจ้งยอด"| CIT
  P3 -->|"รายการคิวและเอกสารคำขอ"| STAFF
  STAFF -->|"ผลการตรวจเอกสารและอนุมัติ"| P3
  P3 -->|"อัปเดตสถานะคิว"| D3`
          }
        ],
        examTraps: [
          'วาด <strong>Data Store</strong> ลงใน <strong>Context Diagram (DFD Level 0)</strong> — ผิดกฎพื้นฐานทันที!',
          'วาดเส้นต่อตรงจาก <code>ประชาชน → D1 ทะเบียนคิว</code> โดยไม่ผ่าน Process',
          'ตั้งชื่อ Process เป็นคำนาม (เช่น <code>ระบบคิว</code> หรือ <code>ตารางนัดหมาย</code>) แทนที่จะขึ้นต้นด้วย <strong>กริยา + กรรม</strong> (เช่น <code>2.0 จองคิวนัดหมาย</code>)',
          'ตั้งชื่อเส้น Data Flow เป็นคำกริยา (เช่น <code>กดจองคิว</code>) แทนที่จะเป็นชื่อก้อนข้อมูล (เช่น <code>ข้อมูลการจองคิว</code>)',
          'เส้นระหว่าง External Entity ใน Level 0 กับ Level 1 ไม่ Balance กัน (เช่น ใน Level 0 มีเส้นจากธนาคาร แต่ Level 1 ลืมวาดธนาคาร)'
        ]
      },

      // =========================================================================
      // CATEGORY 3: ERD & 3NF
      // =========================================================================
      {
        id: 'erd',
        tabLabel: 'ERD & 3NF',
        order: 3,
        badge: 'หมวดที่ 3 • ออกแบบฐานข้อมูลเชิงสัมพันธ์',
        icon: 'fa-solid fa-table-cells',
        title: '3. ER Diagram (Crow’s Foot) และวิธีเขียน Schema ระดับ 1NF–3NF สำหรับข้อเขียน',
        whatIsItHtml:
          '<h3>อะไรคือ ER Diagram และ 3NF Schema?</h3>' +
          '<p><strong>ERD (Entity-Relationship Diagram)</strong> คือพิมพ์เขียวโครงสร้างฐานข้อมูลก่อนสร้างตารางจริงด้วย SQL เพื่อบอกว่ามีกลุ่มข้อมูลหลักอะไรบ้าง (<strong>Entity</strong>), เก็บรายละเอียดอะไร (<strong>Attribute</strong>), และแต่ละกลุ่มเชื่อมโยงกันด้วยสัดส่วนเท่าไร (<strong>Cardinality: 1:1, 1:N, M:N</strong>)</p>' +
          '<p>ส่วน <strong>Normalization (1NF → 2NF → 3NF)</strong> คือกระบวนการตรวจสอบและแยกตารางเพื่อขจัดความซ้ำซ้อนและป้องกันปัญหา Insert / Update / Delete Anomaly ในห้องสอบข้อเขียน มักให้โจทย์บรรยายระบบหรือใบเสร็จ/แบบฟอร์มกระดาษมา แล้วสั่งให้ <strong>"วาด ERD พร้อมเขียนโครงสร้างตาราง (Relational Schema) ที่อยู่ในรูป 3NF"</strong></p>',
        analogy: {
          title: 'เปรียบเทียบให้เห็นภาพ: แยกแฟ้มข้อมูลไม่ให้ซ้ำซ้อน และแตก M:N ด้วย "ใบทะเบียนสมรส/ใบถือหุ้น"',
          body: '• <strong>ปัญหา M:N:</strong> เจ้าของ 1 คนถือโฉนดได้หลายแปลง และโฉนด 1 แปลงก็มีผู้ถือกรรมสิทธิ์ร่วมได้หลายคน จะเอาเลขโฉนดไปยัดหลายช่องในตารางคนก็ไม่ได้ หรือเอาชื่อคนหลายคนมายัดในตารางโฉนดก็ไม่ได้ (ผิด 1NF!)<br>• <strong>ทางแก้ (Junction Table):</strong> จึงต้องสร้างตารางกลางชื่อ <code>PLOT_OWNERSHIP</code> เหมือน <strong>"ใบถือครองกรรมสิทธิ์ร่วม"</strong> ที่บันทึกว่า <em>แปลงไหน + คู่กับใคร + สัดส่วนกี่ %</em> แค่นี้ก็แตก M:N เป็น 1:N สองข้างได้สะอาดกริบ!'
        },
        symbolLegendSvg: {
          caption: 'สัญลักษณ์ Crow’s Foot Notation บนปลายเส้น ERD และเทคนิคแตก M:N เป็น Junction Table',
          svgHtml: `<svg role="img" viewBox="0 0 780 400" width="100%" xmlns="http://www.w3.org/2000/svg" aria-labelledby="svg-diag-erd-title">
  <title id="svg-diag-erd-title">สัญลักษณ์ Crow's Foot Notation บน ER Diagram และการแตก M:N</title>
  <rect x="0" y="0" width="780" height="400" rx="14" fill="#F4F7F6" stroke="#D5E1DD" stroke-width="2"/>
  <text x="390" y="34" text-anchor="middle" font-family="Prompt, Sarabun, sans-serif" font-size="18" font-weight="700" fill="#0F5E4D">อ่านหัวเส้น Crow's Foot บน ER Diagram (ฝั่งขวา/ซ้าย)</text>

  <!-- 1. || Exactly One -->
  <rect x="20" y="54" width="175" height="145" rx="10" fill="#FFFFFF" stroke="#D5E1DD" stroke-width="1.5"/>
  <line x1="45" y1="92" x2="155" y2="92" stroke="#0F5E4D" stroke-width="3"/>
  <line x1="125" y1="76" x2="125" y2="108" stroke="#0F5E4D" stroke-width="3"/>
  <line x1="138" y1="76" x2="138" y2="108" stroke="#0F5E4D" stroke-width="3"/>
  <text x="107" y="136" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="14" font-weight="700" fill="#0F5E4D">||  (1 และ 1 เท่านั้น)</text>
  <text x="107" y="160" text-anchor="middle" font-family="Prompt, sans-serif" font-size="12.5" font-weight="700" fill="#122026">Mandatory One</text>
  <text x="107" y="180" text-anchor="middle" font-family="Sarabun, sans-serif" font-size="11.5" fill="#475569">ต้องมี 1 รายการเสมอ (ห้ามว่าง)</text>

  <!-- 2. o| Zero or One -->
  <rect x="208" y="54" width="175" height="145" rx="10" fill="#FFFFFF" stroke="#D5E1DD" stroke-width="1.5"/>
  <line x1="233" y1="92" x2="345" y2="92" stroke="#0F5E4D" stroke-width="3"/>
  <circle cx="310" cy="92" r="9" fill="#FFFFFF" stroke="#0F5E4D" stroke-width="3"/>
  <line x1="330" y1="76" x2="330" y2="108" stroke="#0F5E4D" stroke-width="3"/>
  <text x="295" y="136" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="14" font-weight="700" fill="#0F5E4D">o|  (0 หรือ 1)</text>
  <text x="295" y="160" text-anchor="middle" font-family="Prompt, sans-serif" font-size="12.5" font-weight="700" fill="#122026">Optional One</text>
  <text x="295" y="180" text-anchor="middle" font-family="Sarabun, sans-serif" font-size="11.5" fill="#475569">ไม่มีก็ได้ หรือมีได้ไม่เกิน 1</text>

  <!-- 3. |{ One or Many -->
  <rect x="396" y="54" width="175" height="145" rx="10" fill="#FFFFFF" stroke="#D5E1DD" stroke-width="1.5"/>
  <line x1="420" y1="92" x2="544" y2="92" stroke="#D97706" stroke-width="3"/>
  <line x1="502" y1="76" x2="502" y2="108" stroke="#D97706" stroke-width="3"/>
  <line x1="516" y1="92" x2="544" y2="74" stroke="#D97706" stroke-width="3"/>
  <line x1="516" y1="92" x2="544" y2="110" stroke="#D97706" stroke-width="3"/>
  <text x="483" y="136" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="14" font-weight="700" fill="#92400E">|{  (อย่างน้อย 1..N)</text>
  <text x="483" y="160" text-anchor="middle" font-family="Prompt, sans-serif" font-size="12.5" font-weight="700" fill="#122026">Mandatory Many</text>
  <text x="483" y="180" text-anchor="middle" font-family="Sarabun, sans-serif" font-size="11.5" fill="#475569">ต้องมีอย่างน้อย 1 ถึงหลายแถว</text>

  <!-- 4. o{ Zero or Many -->
  <rect x="584" y="54" width="175" height="145" rx="10" fill="#FFFFFF" stroke="#D5E1DD" stroke-width="1.5"/>
  <line x1="608" y1="92" x2="732" y2="92" stroke="#D97706" stroke-width="3"/>
  <circle cx="688" cy="92" r="9" fill="#FFFFFF" stroke="#D97706" stroke-width="3"/>
  <line x1="704" y1="92" x2="732" y2="74" stroke="#D97706" stroke-width="3"/>
  <line x1="704" y1="92" x2="732" y2="110" stroke="#D97706" stroke-width="3"/>
  <text x="671" y="136" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="14" font-weight="700" fill="#92400E">o{  (0 หรือหลายแถว)</text>
  <text x="671" y="160" text-anchor="middle" font-family="Prompt, sans-serif" font-size="12.5" font-weight="700" fill="#122026">Optional Many</text>
  <text x="671" y="180" text-anchor="middle" font-family="Sarabun, sans-serif" font-size="11.5" fill="#475569">ไม่มีก็ได้ หรือมีได้หลายแถว</text>

  <!-- Bottom: Resolving M:N -->
  <rect x="20" y="218" width="739" height="162" rx="10" fill="#FFFFFF" stroke="#0F5E4D" stroke-width="2"/>
  <text x="390" y="246" text-anchor="middle" font-family="Prompt, sans-serif" font-size="14.5" font-weight="700" fill="#0F5E4D">กฎเหล็กข้อเขียน: ห้ามปล่อย M:N ค้างไว้! ให้แตกเป็น Junction Table ตรงกลาง</text>

  <rect x="44" y="274" width="150" height="58" rx="8" fill="#E6F4F1" stroke="#0F5E4D" stroke-width="2"/>
  <text x="119" y="299" text-anchor="middle" font-family="Prompt, sans-serif" font-size="13" font-weight="700" fill="#122026">OWNER</text>
  <text x="119" y="319" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="11" fill="#0F5E4D">owner_id [PK]</text>

  <line x1="194" y1="303" x2="290" y2="303" stroke="#0F5E4D" stroke-width="2.5"/>
  <text x="242" y="292" text-anchor="middle" font-family="Sarabun, sans-serif" font-size="12" font-weight="700" fill="#0F5E4D">1 : N</text>

  <rect x="290" y="266" width="200" height="74" rx="8" fill="#FEF3C7" stroke="#D97706" stroke-width="2.5"/>
  <text x="390" y="290" text-anchor="middle" font-family="Prompt, sans-serif" font-size="13" font-weight="700" fill="#92400E">PLOT_OWNERSHIP</text>
  <text x="390" y="310" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="11" fill="#122026">owner_id [PK, FK] + plot_id [PK, FK]</text>
  <text x="390" y="328" text-anchor="middle" font-family="Sarabun, sans-serif" font-size="11" fill="#92400E">share_percent (เก็บสัดส่วนถือครอง)</text>

  <line x1="490" y1="303" x2="586" y2="303" stroke="#0F5E4D" stroke-width="2.5"/>
  <text x="538" y="292" text-anchor="middle" font-family="Sarabun, sans-serif" font-size="12" font-weight="700" fill="#0F5E4D">N : 1</text>

  <rect x="586" y="274" width="150" height="58" rx="8" fill="#E6F4F1" stroke="#0F5E4D" stroke-width="2"/>
  <text x="661" y="299" text-anchor="middle" font-family="Prompt, sans-serif" font-size="13" font-weight="700" fill="#122026">LAND_PLOT</text>
  <text x="661" y="319" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="11" fill="#0F5E4D">plot_id [PK]</text>

  <text x="390" y="365" text-anchor="middle" font-family="Sarabun, sans-serif" font-size="12.5" font-weight="700" fill="#0F5E4D">จำง่ายๆ: "FK อยู่ฝั่ง N เสมอ!" → ตารางกลางจึงถือ FK ของทั้งสองฝั่งไว้ครบ</text>
</svg>`
        },
        symbolsTable: {
          caption: 'สรุป Cardinality 3 รูปแบบ และการวาง Foreign Key ที่ถูกต้องตามมาตรฐาน 3NF',
          headers: ['รูปแบบความสัมพันธ์', 'สัญลักษณ์ Crow’s Foot', 'การวาง Foreign Key (FK)', 'ตัวอย่างงานกรมที่ดิน'],
          rows: [
            ['1 : 1 (One-to-One)', '||──o| หรือ ||──||', 'เอา PK ของฝั่งแม่ไปเป็น FK (และตั้ง UNIQUE) ในฝั่งลูก หรือฝั่งที่ Optional', '1 ใบคำขอ มี 1 ใบเสร็จรับเงิน (RECEIPT เก็บ request_id [FK, UNIQUE])'],
            ['1 : N (One-to-Many)', '||──o{ หรือ ||──|{', '<strong>FK อยู่ฝั่ง N เสมอ!</strong> เอา PK ของฝั่ง 1 ไปเป็น FK ในตารางฝั่ง N', '1 สำนักงาน ดูแลหลายแปลง → LAND_PLOT เก็บ office_id [FK]'],
            ['M : N (Many-to-Many)', '}o──o{ (ใน Conceptual ERD)', '<strong>ห้ามปล่อยไว้ในฐานข้อมูลจริง!</strong> แตกเป็นตารางกลาง (Junction Table) แล้วรับ PK ของทั้ง 2 ฝั่งมาเป็น Composite PK + FK', 'เจ้าของ 1 คนถือหลายแปลง &amp; 1 แปลงมีเจ้าของร่วมหลายคน → แตกเป็น PLOT_OWNERSHIP']
          ]
        },
        stepByStepHtml:
          '<h3>เทคนิค "ขีดเส้นใต้ 3 สี" แปลงโจทย์ข้อเขียนเป็น ERD + 3NF Schema ทีละขั้น</h3>' +
          '<ol>' +
          '<li><strong>ขั้นที่ 1 — ขีดเส้นใต้คำนามหลัก (Entities):</strong> มองหา "บุคคล, สถานที่, เอกสาร, เหตุการณ์" ที่ต้องเก็บข้อมูล เช่น <code>สำนักงานที่ดิน (LAND_OFFICE)</code>, <code>เจ้าของที่ดิน (OWNER)</code>, <code>แปลงที่ดิน (LAND_PLOT)</code>, <code>ธุรกรรม/นิติกรรม (TRANSACTION)</code></li>' +
          '<li><strong>ขั้นที่ 2 — ขีดเส้นใต้คำนามย่อย (Attributes) &amp; แยก PK:</strong> ระบุรหัสประจำตัว (เช่น <code>office_id</code>, <code>plot_id</code>) เป็น Primary Key (<code>[PK]</code>) และเช็กกฎ <strong>1NF</strong>: ห้ามเก็บค่าหลายค่าคั่นด้วยคอมมาในช่องเดียว (เช่น ห้ามเก็บ <code>owner_names = "สมชาย, สมหญิง"</code> ในตารางแปลง!)</li>' +
          '<li><strong>ขั้นที่ 3 — ขีดเส้นใต้คำกริยา (Relationships) &amp; เช็ก Cardinality 2 ข้าง:</strong> ถามกลับไป-กลับมาระหว่างคู่ Entity เช่น <em>"1 เจ้าของ ถือได้กี่แปลง?" (หลายแปลง)</em> และ <em>"1 แปลง มีเจ้าของร่วมได้กี่คน?" (หลายคน)</em> → สรุปได้ <code>M:N</code> ให้แตกเป็น <strong>Junction Table</strong> ทันที!</li>' +
          '<li><strong>ขั้นที่ 4 — ตรวจ 2NF และ 3NF ก่อนเขียน Schema ส่งอาจารย์:</strong>' +
          '<ul>' +
          '<li><strong>เช็ก 2NF (Partial Dependency):</strong> ถ้าตารางมี Composite PK เช่น <code>(plot_id, owner_id)</code> คอลัมน์อื่นในตารางนั้นต้องขึ้นกับ <em>ทั้งคู่รวมกัน</em> (เช่น <code>share_percent</code> สัดส่วนของคนนี้ในแปลงนี้) ห้ามเอา <code>owner_name</code> (ขึ้นกับ <code>owner_id</code> แค่ตัวเดียว) มาฝากไว้ในตารางนี้!</li>' +
          '<li><strong>เช็ก 3NF (Transitive Dependency):</strong> ห้ามคอลัมน์ที่ไม่ใช่คีย์ไปขึ้นต่อกันเองเป็นลูกโซ่ เช่น ในตาราง <code>LAND_PLOT</code> ถ้ามี <code>office_id [FK]</code> แล้ว <strong>ห้ามมี</strong> <code>office_name</code> หรือ <code>office_province</code> ซ้ำอยู่ในตาราง <code>LAND_PLOT</code> ให้แยกไปอยู่ใน <code>LAND_OFFICE</code>!</li>' +
          '</ul></li>' +
          '<li><strong>ขั้นที่ 5 — เขียนบรรทัด 3NF Relational Schema ให้ดูสะอาดมืออาชีพ:</strong> ใช้รูปแบบ <code>TABLE_NAME(pk_col [PK], attr1, attr2, fk_col [FK -&gt; OTHER.pk])</code> พร้อมขีดเส้นใต้หรือวงเล็บ <code>[PK]</code>, <code>[FK]</code> ให้ชัดเจน!</li>' +
          '</ol>' +
          '<h4>ตัวอย่างการเขียน 3NF Schema ลงกระดาษคำตอบข้อเขียน</h4>' +
          '<pre tabindex="0"><code>LAND_OFFICE(office_id [PK], office_name, province, region)\n' +
          'OWNER(owner_id [PK], citizen_id [UNIQUE], full_name, phone)\n' +
          'LAND_PLOT(plot_id [PK], deed_no [UNIQUE], deed_type, rai, ngan, sq_wah, office_id [FK -&gt; LAND_OFFICE.office_id])\n' +
          'PLOT_OWNERSHIP(owner_id [PK, FK -&gt; OWNER.owner_id], plot_id [PK, FK -&gt; LAND_PLOT.plot_id], share_percent, acquired_date)\n' +
          'TRANSACTION(tx_id [PK], plot_id [FK -&gt; LAND_PLOT.plot_id], tx_type, tx_date, fee_amount)</code></pre>',
        mermaidDiagrams: [
          {
            title: 'ER Diagram ระดับ 3NF: ระบบทะเบียนแปลงที่ดินและการถือกรรมสิทธิ์ร่วม (แตก M:N เรียบร้อย)',
            caption: 'สังเกต Junction Table ชื่อ PLOT_OWNERSHIP ที่ใช้ Composite Key (PK, FK) เชื่อมระหว่าง OWNER กับ LAND_PLOT',
            code: `erDiagram
  LAND_OFFICE ||--o{ LAND_PLOT : "รับผิดชอบดูแล"
  OWNER ||--o{ PLOT_OWNERSHIP : "ถือสิทธิ์"
  LAND_PLOT ||--|{ PLOT_OWNERSHIP : "มีผู้ถือกรรมสิทธิ์"
  LAND_PLOT ||--o{ TRANSACTION : "มีประวัตินิติกรรม"

  LAND_OFFICE {
    int office_id PK "รหัสสำนักงาน"
    string office_name "ชื่อสำนักงานที่ดิน"
    string province "จังหวัด"
  }
  OWNER {
    int owner_id PK "รหัสเจ้าของ"
    string citizen_id UK "เลขบัตรประชาชน"
    string full_name "ชื่อ-นามสกุล"
    string phone "เบอร์โทร"
  }
  LAND_PLOT {
    int plot_id PK "รหัสแปลงที่ดิน"
    string deed_no UK "เลขที่โฉนด"
    string deed_type "ประเภทเอกสารสิทธิ์"
    int sq_wah_total "เนื้อที่รวม ตร.ว."
    int office_id FK "รหัสสำนักงานที่ดูแล"
  }
  PLOT_OWNERSHIP {
    int owner_id PK, FK "รหัสเจ้าของ"
    int plot_id PK, FK "รหัสแปลง"
    decimal share_percent "สัดส่วนถือครองร้อยละ"
    date acquired_date "วันที่ได้กรรมสิทธิ์"
  }
  TRANSACTION {
    int tx_id PK "รหัสนิติกรรม"
    int plot_id FK "รหัสแปลง"
    string tx_type "ประเภทนิติกรรม"
    date tx_date "วันที่จดทะเบียน"
    decimal fee_amount "ค่าธรรมเนียม"
  }`
          }
        ],
        examTraps: [
          'ปล่อยความสัมพันธ์แบบ <strong>M:N</strong> ค้างไว้ใน Logical ERD / Relational Schema โดยไม่แตกเป็น Junction Table',
          'วาง <strong>Foreign Key (FK) ผิดฝั่ง</strong> (เช่น เอา <code>plot_id</code> ไปใส่ไว้ในตาราง <code>LAND_OFFICE</code> ทั้งที่ 1 สำนักงานดูแลหลายแปลง — ต้องเอา <code>office_id</code> ไปใส่ใน <code>LAND_PLOT</code>!)',
          'ปล่อย <strong>Transitive Dependency (ผิด 3NF)</strong> ทิ้งไว้ เช่น เก็บ <code>office_name</code> และ <code>province</code> ซ้ำอยู่ในตาราง <code>LAND_PLOT</code>',
          'เก็บข้อมูลหลายค่าในช่องเดียว (ผิด 1NF) เช่น คอลัมน์ <code>owners = "สมชาย, สมศรี"</code> หรือ <code>tel1, tel2, tel3</code> (Repeating Group)',
          'ลืมระบุ <code>[PK]</code> และ <code>[FK]</code> ในบรรทัดเขียน Relational Schema 3NF ทำให้กรรมการไม่รู้ว่าคีย์ไหนเชื่อมตารางไหน'
        ]
      },

      // =========================================================================
      // CATEGORY 4: USE CASE
      // =========================================================================
      {
        id: 'usecase',
        tabLabel: 'Use Case',
        order: 4,
        badge: 'หมวดที่ 4 • พฤติกรรมและขอบเขตระบบ (UML)',
        icon: 'fa-solid fa-users-viewfinder',
        title: '4. UML Use Case Diagram — แยก Actor, Boundary และหัวลูกศร <<include>> vs <<extend>>',
        whatIsItHtml:
          '<h3>อะไรคือ Use Case Diagram?</h3>' +
          '<p><strong>Use Case Diagram</strong> คือแผนภาพเชิงพฤติกรรมในมาตรฐาน UML ที่สรุปให้เห็นในหน้าเดียวว่า <strong>"ใคร (Actor) สามารถสั่งให้ระบบทำบริการอะไรได้บ้าง (Use Case)?"</strong> นิยมใช้ในขั้นเก็บ Requirement และเขียน TOR เพื่อกำหนดขอบเขตงานให้ชัดเจนว่าอะไร "อยู่ในระบบ" และอะไร "อยู่นอกระบบ"</p>' +
          '<p>หัวใจที่ออกสอบแทบ 100% ทั้งข้อสอบช้อยส์และข้อเขียนคือ <strong>การแยกความต่างและทิศทางหัวลูกศรระหว่าง <code>&lt;&lt;include&gt;&gt;</code> กับ <code>&lt;&lt;extend&gt;&gt;</code></strong> เพราะถ้าชี้ลูกศรกลับทาง ความหมายจะเปลี่ยนจากหน้ามือเป็นหลังมือทันทีครับ!</p>',
        analogy: {
          title: 'เปรียบเทียบให้เห็นภาพ: เมนูก๋วยเตี๋ยว — "เส้น+น้ำซุป" (Include) vs "ใส่กากหมูพิเศษ" (Extend)',
          body: '• <strong><code>&lt;&lt;include&gt;&gt;</code> (บังคับ/ต้องทำเสมอ):</strong> เหมือนสั่งก๋วยเตี๋ยว ยังไงก็ <strong>"ต้องรวม"</strong> การลวกเส้นและตักน้ำซุป (ขาดไม่ได้! ไม่งั้นไม่เป็นก๋วยเตี๋ยว) → หัวลูกศรชี้ <strong>จากงานหลัก → ไปหางานบังคับ</strong> (<code>จองคิวออนไลน์ ----▶ ยืนยันตัวตน ThaID</code>)<br>• <strong><code>&lt;&lt;extend&gt;&gt;</code> (ทางเลือกเสริม/ทำเฉพาะบางเงื่อนไข):</strong> เหมือน "เพิ่มกากหมูเจียว" จะใส่หรือไม่ใส่ ก๋วยเตี๋ยวก็กินได้สมบูรณ์ แต่ถ้าลูกค้าขอเพิ่มก็มาต่อขยายจานหลัก → หัวลูกศรชี้ <strong>จากตัวเสริม → กลับมาเกาะงานหลัก</strong> (<code>แจ้งเตือนผ่าน SMS ----▶ จองคิวออนไลน์</code>)'
        },
        symbolLegendSvg: {
          caption: 'กายวิภาค Use Case Diagram และกฎเหล็กหัวลูกศร <<include>> vs <<extend>> ที่ห้ามชี้กลับทาง',
          svgHtml: `<svg role="img" viewBox="0 0 780 410" width="100%" xmlns="http://www.w3.org/2000/svg" aria-labelledby="svg-diag-uc-title">
  <title id="svg-diag-uc-title">สัญลักษณ์ UML Use Case Diagram และทิศลูกศร include กับ extend</title>
  <rect x="0" y="0" width="780" height="410" rx="14" fill="#F4F7F6" stroke="#D5E1DD" stroke-width="2"/>
  <text x="390" y="34" text-anchor="middle" font-family="Prompt, Sarabun, sans-serif" font-size="18" font-weight="700" fill="#0F5E4D">องค์ประกอบ Use Case Diagram &amp; ทิศทางหัวลูกศร Include / Extend</text>

  <!-- Left Actor (Primary) -->
  <circle cx="72" cy="128" r="16" fill="#E6F4F1" stroke="#0F5E4D" stroke-width="2.5"/>
  <line x1="72" y1="144" x2="72" y2="192" stroke="#0F5E4D" stroke-width="2.5"/>
  <line x1="46" y1="162" x2="98" y2="162" stroke="#0F5E4D" stroke-width="2.5"/>
  <line x1="72" y1="192" x2="50" y2="226" stroke="#0F5E4D" stroke-width="2.5"/>
  <line x1="72" y1="192" x2="94" y2="226" stroke="#0F5E4D" stroke-width="2.5"/>
  <text x="72" y="250" text-anchor="middle" font-family="Prompt, sans-serif" font-size="13" font-weight="700" fill="#122026">Primary Actor</text>
  <text x="72" y="268" text-anchor="middle" font-family="Sarabun, sans-serif" font-size="12" fill="#475569">ประชาชน (ซ้าย/นอกกรอบ)</text>

  <!-- System Boundary -->
  <rect x="165" y="58" width="450" height="252" rx="12" fill="#FFFFFF" stroke="#0F5E4D" stroke-width="2.5"/>
  <text x="390" y="84" text-anchor="middle" font-family="Prompt, sans-serif" font-size="14" font-weight="700" fill="#0F5E4D">System Boundary: ระบบจองคิว e-QLands</text>

  <!-- Main Use Case -->
  <ellipse cx="285" cy="182" rx="92" ry="34" fill="#E6F4F1" stroke="#0F5E4D" stroke-width="2.5"/>
  <text x="285" y="187" text-anchor="middle" font-family="Prompt, sans-serif" font-size="13" font-weight="700" fill="#122026">จองคิวนัดหมาย (Main)</text>

  <!-- Included Use Case -->
  <ellipse cx="515" cy="128" rx="84" ry="28" fill="#FEF3C7" stroke="#D97706" stroke-width="2"/>
  <text x="515" y="133" text-anchor="middle" font-family="Sarabun, sans-serif" font-size="12.5" font-weight="700" fill="#92400E">ยืนยันตัวตน ThaID</text>

  <!-- Extend Use Case -->
  <ellipse cx="515" cy="244" rx="84" ry="28" fill="#E0F2FE" stroke="#0369A1" stroke-width="2"/>
  <text x="515" y="249" text-anchor="middle" font-family="Sarabun, sans-serif" font-size="12.5" font-weight="700" fill="#0369A1">แจ้งเตือน SMS (เสริม)</text>

  <!-- Association Actor -> Main -->
  <line x1="98" y1="175" x2="193" y2="182" stroke="#122026" stroke-width="2"/>

  <!-- Include Arrow: Main -> Included -->
  <line x1="358" y1="160" x2="432" y2="138" stroke="#D97706" stroke-width="2.5" stroke-dasharray="6,4"/>
  <polygon points="440,136 424,132 429,146" fill="#D97706"/>
  <text x="394" y="134" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="11.5" font-weight="700" fill="#92400E">«include»</text>

  <!-- Extend Arrow: Extension -> Main -->
  <line x1="432" y1="234" x2="364" y2="206" stroke="#0369A1" stroke-width="2.5" stroke-dasharray="6,4"/>
  <polygon points="354,202 365,215 371,200" fill="#0369A1"/>
  <text x="415" y="208" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="11.5" font-weight="700" fill="#0369A1">«extend»</text>

  <!-- Right Actor (Secondary) -->
  <rect x="645" y="106" width="116" height="48" rx="6" fill="#FEF3C7" stroke="#D97706" stroke-width="2"/>
  <text x="703" y="126" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="10.5" fill="#92400E">«system»</text>
  <text x="703" y="144" text-anchor="middle" font-family="Prompt, sans-serif" font-size="12" font-weight="700" fill="#122026">ระบบ ThaID</text>
  <line x1="599" y1="128" x2="645" y2="128" stroke="#122026" stroke-width="2"/>

  <rect x="645" y="220" width="116" height="48" rx="6" fill="#E0F2FE" stroke="#0369A1" stroke-width="2"/>
  <text x="703" y="240" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="10.5" fill="#0369A1">«system»</text>
  <text x="703" y="258" text-anchor="middle" font-family="Prompt, sans-serif" font-size="12" font-weight="700" fill="#122026">SMS Gateway</text>
  <line x1="599" y1="244" x2="645" y2="244" stroke="#122026" stroke-width="2"/>

  <!-- Bottom rule bar -->
  <rect x="20" y="328" width="739" height="62" rx="10" fill="#FFFFFF" stroke="#D5E1DD" stroke-width="1.5"/>
  <text x="390" y="352" text-anchor="middle" font-family="Prompt, sans-serif" font-size="13.5" font-weight="700" fill="#0F5E4D">ทริคจำไม่มีวันลืม:  «include» วิ่งออกไปหาตัวบังคับ (Main ──▶ Required)   |   «extend» วิ่งกลับมาเกาะตัวหลัก (Optional ──▶ Main)</text>
  <text x="390" y="374" text-anchor="middle" font-family="Sarabun, sans-serif" font-size="12" fill="#475569">Generalization (หัวลูกศรสามเหลี่ยมโปร่ง ──▷): ใช้แสดงการสืบทอดสิทธิ์ เช่น หัวหน้าสำนักงาน ──▷ เจ้าหน้าที่</text>
</svg>`
        },
        symbolsTable: {
          caption: 'สรุปสัญลักษณ์และเส้นความสัมพันธ์ใน UML Use Case Diagram',
          headers: ['องค์ประกอบ / เส้น', 'รูปร่างและทิศลูกศร', 'หน้าที่และการใช้งาน', 'ตัวอย่างจากกรมที่ดิน'],
          rows: [
            ['Actor', 'รูปคนก้างปลา (หรือกล่อง &lt;&lt;system&gt;&gt;) อยู่นอกกรอบ', 'บทบาทผู้ใช้งานหรือระบบภายนอกที่โต้ตอบกับระบบ (Primary ไว้ซ้าย, Secondary ไว้ขวา)', 'ประชาชน, เจ้าหน้าที่ทะเบียน, ระบบ ThaID'],
            ['System Boundary', 'กรอบสี่เหลี่ยมใหญ่คลุม Use Case ทั้งหมด', 'บอกขอบเขตว่าระบบที่เราจะพัฒนาครอบคลุมฟังก์ชันไหนบ้าง (ชื่อระบบอยู่ด้านบนกรอบ)', 'ระบบจองคิวออนไลน์ e-QLands'],
            ['Use Case', 'รูปวงรี อยู่ภายในกรอบ System Boundary', 'ความสามารถหรือบริการ 1 งานของระบบ ตั้งชื่อเป็น กริยา + กรรม', 'จองคิวนัดหมาย, ตรวจสอบคิว'],
            ['Association', 'เส้นทึบไม่มีหัวลูกศร', 'เชื่อม Actor กับ Use Case ที่ Actor คนนั้นมีสิทธิ์เริ่มต้นใช้งานหรือเกี่ยวข้อง', 'ประชาชน ─── จองคิวนัดหมาย'],
            ['&lt;&lt;include&gt;&gt;', 'เส้นประชี้ จากตัวหลัก ──▶ ตัวบังคับ', 'ความสัมพันธ์บังคับ: ตัวหลักต้องเรียกใช้ตัวย่อยนี้เสมอ ขาดไม่ได้!', 'จองคิวนัดหมาย -. «include» .▶ ยืนยันตัวตน ThaID'],
            ['&lt;&lt;extend&gt;&gt;', 'เส้นประชี้ จากตัวเสริม ──▶ กลับไปตัวหลัก', 'ทางเลือกเสริม: ตัวเสริมมาต่อยอดตัวหลักเฉพาะบางเงื่อนไข (ไม่ทำตัวหลักก็จบงานได้)', 'แนบเอกสารล่วงหน้า -. «extend» .▶ จองคิวนัดหมาย'],
            ['Generalization', 'เส้นทึบหัวลูกศรสามเหลี่ยมโปร่ง ──▷', 'การสืบทอดบทบาท (Inheritance) ลูกทำได้ทุกอย่างเหมือนแม่ + ทำเพิ่มได้', 'หัวหน้าสำนักงาน ──▷ เจ้าหน้าที่ทะเบียน']
          ]
        },
        stepByStepHtml:
          '<h3>วิธีแปลงโจทย์ข้อเขียนเป็น Use Case Diagram ทีละขั้น</h3>' +
          '<ol>' +
          '<li><strong>ขั้นที่ 1 — วาดกรอบ System Boundary:</strong> เขียนชื่อระบบไว้ด้านบนกรอบ (เช่น <code>ระบบจองคิว e-QLands</code>) เพื่อแยกให้ชัดว่าอะไรอยู่ในระบบ อะไรอยู่นอกระบบ</li>' +
          '<li><strong>ขั้นที่ 2 — วาง Actor นอกกรอบ:</strong> คนหรือหน่วยงานที่ <em>กดใช้งานระบบเอง</em> (Primary Actor) วางด้านซ้าย ส่วนระบบภายนอกที่ถูกระบบเราไปเรียก (Secondary Actor เช่น <code>ThaID</code>, <code>ระบบธนาคาร</code>) วางด้านขวา</li>' +
          '<li><strong>ขั้นที่ 3 — ดึงฟีเจอร์หลักเป็น Use Case (วงรีในกรอบ):</strong> จับคำกริยาใหญ่ๆ ที่ให้ผลลัพธ์สมบูรณ์ เช่น <code>จองคิวนัดหมาย</code>, <code>ยกเลิกหรือเลื่อนนัด</code>, <code>ตรวจสอบเอกสารคำขอ</code> (อย่าแตกเล็กเกินไปจนกลายเป็น <code>กดปุ่มตกลง</code>!)</li>' +
          '<li><strong>ขั้นที่ 4 — ตรวจหา <code>&lt;&lt;include&gt;&gt;</code> กับ <code>&lt;&lt;extend&gt;&gt;</code> จากคำเชื่อมในโจทย์:</strong>' +
          '<ul>' +
          '<li>เจอคำว่า <em>"ต้อง... ทุกครั้ง", "ก่อนดำเนินการจะต้อง..."</em> → ใช้ <strong><code>&lt;&lt;include&gt;&gt;</code></strong> ชี้หัวลูกศร <strong>ออกไปหาตัวบังคับ</strong></li>' +
          '<li>เจอคำว่า <em>"สามารถเลือก...", "กรณีพิเศษอาจ...", "หากต้องการให้ระบบแจ้ง..."</em> → ใช้ <strong><code>&lt;&lt;extend&gt;&gt;</code></strong> ชี้หัวลูกศร <strong>ย้อนกลับมาที่ตัวหลัก</strong></li>' +
          '</ul></li>' +
          '<li><strong>ขั้นที่ 5 — เช็ก Generalization:</strong> ถ้าโจทย์บอกว่า "หัวหน้าสำนักงานสามารถทำงานทุกอย่างของเจ้าหน้าที่ได้ และสามารถอนุมัติคำขอพิเศษได้ด้วย" ให้ลากเส้นสามเหลี่ยมโปร่งจาก <code>หัวหน้าสำนักงาน ──▷ เจ้าหน้าที่</code> แทนการลากเส้น Association ซ้ำซ้อน</li>' +
          '</ol>',
        mermaidDiagrams: [
          {
            title: 'Use Case Diagram: ระบบจองคิวนัดหมายจดทะเบียนที่ดินออนไลน์ (e-QLands)',
            caption: 'สังเกตขอบเขตระบบ (Subgraph), Primary Actor ด้านซ้าย, External System Actor ด้านขวา, เส้นทึบ Association, และทิศลูกศร «include» vs «extend»',
            code: `flowchart LR
  CIT["Actor: ประชาชน"]
  STAFF["Actor: เจ้าหน้าที่ทะเบียน"]
  SUP["Actor: หัวหน้าสำนักงาน"]

  subgraph EQ["System Boundary: ระบบจองคิวออนไลน์ e-QLands"]
    direction TB
    UC_BOOK(["จองคิวนัดหมาย"])
    UC_AUTH(["ยืนยันตัวตน ThaID"])
    UC_DOC(["แนบเอกสารล่วงหน้า"])
    UC_SMS(["แจ้งเตือนคิวทาง SMS"])
    UC_CHECK(["ตรวจสอบคิวและเอกสาร"])
    UC_APPROVE(["อนุมัติโควตาคิวพิเศษ"])

    UC_BOOK -.->|"«include» ต้องทำเสมอ"| UC_AUTH
    UC_DOC -.->|"«extend» เลือกทำเสริม"| UC_BOOK
    UC_SMS -.->|"«extend» เฉพาะเมื่อเลือก"| UC_BOOK
    UC_CHECK -.->|"«include» ต้องทำเสมอ"| UC_AUTH
  end

  THAID["«system» ระบบ ThaID กรมการปกครอง"]
  SMS_GW["«system» SMS Gateway"]

  CIT --- UC_BOOK
  STAFF --- UC_CHECK
  SUP -.->|"Generalization (สืบทอดสิทธิ์)"| STAFF
  SUP --- UC_APPROVE

  UC_AUTH --- THAID
  UC_SMS --- SMS_GW`
          }
        ],
        examTraps: [
          '<strong>ชี้หัวลูกศร <code>&lt;&lt;include&gt;&gt;</code> กับ <code>&lt;&lt;extend&gt;&gt;</code> สลับกัน</strong> — จุดโดนหักคะแนนอันดับ 1 ของข้อสอบ UML!',
          'วาด Actor เข้าไปไว้ <em>ข้างใน</em> กรอบสี่เหลี่ยม System Boundary (Actor ต้องอยู่ <strong>นอกกรอบ</strong> เสมอ)',
          'ลากเส้น <code>&lt;&lt;include&gt;&gt;</code> จาก Actor ไปหา Use Case (Actor ใช้ได้แค่ Association เส้นทึบ หรือ Generalization ระหว่าง Actor เท่านั้น)',
          'แตก Use Case ยิบย่อยระดับปุ่ม UI (เช่น <code>กรอกชื่อ</code>, <code>กดปุ่มบันทึก</code>) แทนที่จะเป็นระดับภารกิจที่จบในตัว (เช่น <code>จองคิวนัดหมาย</code>)',
          'ลืมวาด Secondary Actor ฝั่งขวา (เช่น ระบบชำระเงิน, ThaID) ทั้งที่โจทย์ระบุว่ามีการเชื่อมต่อระบบภายนอก'
        ]
      },

      // =========================================================================
      // CATEGORY 5: SEQUENCE & CLASS DIAGRAM
      // =========================================================================
      {
        id: 'sequence-class',
        tabLabel: 'Sequence & Class',
        order: 5,
        badge: 'หมวดที่ 5 • ลำดับเวลา & โครงสร้าง OOP (UML)',
        icon: 'fa-solid fa-cubes',
        title: '5. UML Sequence Diagram & Class Diagram — แปลง Use Case เป็นลำดับเวลาและคลาส OOP',
        whatIsItHtml:
          '<h3>อะไรคือ Sequence Diagram และ Class Diagram?</h3>' +
          '<p>หลังจาก Use Case บอกแล้วว่า <em>"ระบบทำอะไรได้บ้าง"</em> พอถึงขั้นออกแบบเชิงเทคนิค (Design) นักวิเคราะห์ระบบจะใช้แผนภาพคู่หู 2 ตัวนี้:</p>' +
          '<ul>' +
          '<li><strong>Sequence Diagram (แผนภาพลำดับ — มุมมองเวลา):</strong> ซูมเข้าไปใน 1 Use Case แล้วแสดงให้เห็นว่า <strong>ผู้ใช้งาน → หน้าเว็บ → API → ฐานข้อมูล</strong> ส่งข้อความคุยโต้ตอบกันตามลำดับเวลาจาก <strong>บนลงล่าง</strong> อย่างไร รวมถึงช่วงไหนมีเงื่อนไข <code>alt</code> (if/else) หรือทำซ้ำ <code>loop</code></li>' +
          '<li><strong>Class Diagram (แผนภาพคลาส — มุมมองโครงสร้าง OOP):</strong> แสดงโครงสร้างของคลาสในโค้ด OOP (เช่น Java, C#, Python) ว่าแต่ละคลาสมีข้อมูลอะไร (<strong>Attributes</strong>), ทำฟังก์ชันอะไรได้ (<strong>Methods</strong>), ระดับการเข้าถึง (<code>+</code>, <code>-</code>, <code>#</code>), และคลาสต่างๆ สัมพันธ์กันแบบใด</li>' +
          '</ul>',
        analogy: {
          title: 'เปรียบเทียบให้เห็นภาพ: บทละครที่มีคิวพูด (Sequence) vs แผนผังตัวละครและมรดกตระกูล (Class)',
          body: '• <strong>Sequence Diagram</strong> เหมือน <strong>"บทละครที่มีคิวพูดตามเวลา 1-2-3-4"</strong>: บรรทัดบนเกิดก่อน บรรทัดล่างเกิดทีหลัง เห็นชัดว่าใครส่งคำขอแล้วต้องยืนรอคำตอบ (Synchronous <code>-&gt;&gt;</code>) และตอนไหนตอบกลับ (Return <code>--&gt;&gt;</code>)<br>• <strong>Class Diagram</strong> เหมือน <strong>"แฟ้มประวัติตัวละครและความสัมพันธ์"</strong>: คลาสแม่ <code>เอกสารสิทธิ์</code> ส่งมรดกให้คลาสลูก <code>โฉนด น.ส.4 จ.</code> และ <code>ห้องชุด อ.ช.2</code> ส่วน <code>อาคารชุด ◆── ห้องชุด</code> คือความสัมพันธ์แบบเป็นตายด้วยกัน (Composition)'
        },
        symbolLegendSvg: {
          caption: 'สัญลักษณ์หัวใจของ Sequence Diagram (ซ้าย) และความสัมพันธ์ Class Diagram 4 แบบ (ขวา)',
          svgHtml: `<svg role="img" viewBox="0 0 780 410" width="100%" xmlns="http://www.w3.org/2000/svg" aria-labelledby="svg-diag-seqcls-title">
  <title id="svg-diag-seqcls-title">สรุปสัญลักษณ์ Sequence Diagram และ Class Diagram</title>
  <rect x="0" y="0" width="780" height="410" rx="14" fill="#F4F7F6" stroke="#D5E1DD" stroke-width="2"/>
  <text x="390" y="34" text-anchor="middle" font-family="Prompt, Sarabun, sans-serif" font-size="18" font-weight="700" fill="#0F5E4D">สัญลักษณ์ Sequence Diagram (ซ้าย) และ Class Diagram (ขวา)</text>

  <!-- Left Panel: Sequence -->
  <rect x="20" y="54" width="360" height="336" rx="10" fill="#FFFFFF" stroke="#D5E1DD" stroke-width="1.5"/>
  <text x="200" y="80" text-anchor="middle" font-family="Prompt, sans-serif" font-size="14.5" font-weight="700" fill="#0F5E4D">Sequence Diagram (อ่านเวลาบน → ล่าง)</text>

  <!-- Participants -->
  <rect x="50" y="96" width="84" height="30" rx="5" fill="#E6F4F1" stroke="#0F5E4D" stroke-width="2"/>
  <text x="92" y="116" text-anchor="middle" font-family="Sarabun, sans-serif" font-size="12" font-weight="700" fill="#122026">:WebUI</text>
  <rect x="242" y="96" width="96" height="30" rx="5" fill="#E6F4F1" stroke="#0F5E4D" stroke-width="2"/>
  <text x="290" y="116" text-anchor="middle" font-family="Sarabun, sans-serif" font-size="12" font-weight="700" fill="#122026">:LandAPI</text>

  <!-- Lifelines -->
  <line x1="92" y1="126" x2="92" y2="274" stroke="#647B81" stroke-width="2" stroke-dasharray="5,4"/>
  <line x1="290" y1="126" x2="290" y2="274" stroke="#647B81" stroke-width="2" stroke-dasharray="5,4"/>

  <!-- Activation Bars -->
  <rect x="85" y="144" width="14" height="106" fill="#E6F4F1" stroke="#0F5E4D" stroke-width="1.8"/>
  <rect x="283" y="156" width="14" height="68" fill="#FEF3C7" stroke="#D97706" stroke-width="1.8"/>

  <!-- Sync Arrow -->
  <line x1="99" y1="158" x2="274" y2="158" stroke="#0F5E4D" stroke-width="2.2"/>
  <polygon points="283,158 271,152 271,164" fill="#0F5E4D"/>
  <text x="191" y="150" text-anchor="middle" font-family="Sarabun, sans-serif" font-size="11.5" font-weight="700" fill="#0F5E4D">Sync (-&gt;&gt;) ส่งและรอตอบ</text>

  <!-- Return Arrow -->
  <line x1="283" y1="216" x2="108" y2="216" stroke="#D97706" stroke-width="2.2" stroke-dasharray="5,3"/>
  <polygon points="99,216 111,210 111,222" fill="#D97706"/>
  <text x="191" y="208" text-anchor="middle" font-family="Sarabun, sans-serif" font-size="11.5" font-weight="700" fill="#92400E">Return (--&gt;&gt;) ส่งผลกลับ</text>

  <!-- Sequence legend bullets -->
  <text x="40" y="302" font-family="Sarabun, sans-serif" font-size="12" fill="#122026">• <tspan font-weight="700">Lifeline</tspan> = เส้นประแนวตั้งแสดงช่วงเวลาของวัตถุ</text>
  <text x="40" y="324" font-family="Sarabun, sans-serif" font-size="12" fill="#122026">• <tspan font-weight="700">Activation Bar</tspan> = แท่งสี่เหลี่ยมตอนกำลังทำงาน</text>
  <text x="40" y="346" font-family="Sarabun, sans-serif" font-size="12" fill="#122026">• <tspan font-weight="700">alt / else</tspan> = เงื่อนไข if/else | <tspan font-weight="700">loop</tspan> = วนซ้ำ</text>
  <text x="40" y="368" font-family="Sarabun, sans-serif" font-size="12" fill="#122026">• <tspan font-weight="700">Async (-))</tspan> = เส้นหัวเปิด ส่งแล้วทำต่อไม่รอ</text>

  <!-- Right Panel: Class -->
  <rect x="398" y="54" width="362" height="336" rx="10" fill="#FFFFFF" stroke="#D5E1DD" stroke-width="1.5"/>
  <text x="579" y="80" text-anchor="middle" font-family="Prompt, sans-serif" font-size="14.5" font-weight="700" fill="#0F5E4D">Class Diagram (3 ช่อง + 4 ความสัมพันธ์)</text>

  <!-- Class 3 boxes -->
  <rect x="444" y="94" width="270" height="96" rx="4" fill="#E6F4F1" stroke="#0F5E4D" stroke-width="2"/>
  <line x1="444" y1="120" x2="714" y2="120" stroke="#0F5E4D" stroke-width="1.5"/>
  <line x1="444" y1="156" x2="714" y2="156" stroke="#0F5E4D" stroke-width="1.5"/>
  <text x="579" y="112" text-anchor="middle" font-family="Prompt, sans-serif" font-size="12.5" font-weight="700" fill="#122026">1. Class Name (LandPlot)</text>
  <text x="454" y="136" font-family="JetBrains Mono, monospace" font-size="11" fill="#122026">- deedNo : string  (- private)</text>
  <text x="454" y="150" font-family="JetBrains Mono, monospace" font-size="11" fill="#122026"># areaSqWah : float (# protected)</text>
  <text x="454" y="176" font-family="JetBrains Mono, monospace" font-size="11" fill="#0F5E4D">+ calcFee() : float  (+ public)</text>

  <!-- 4 Class Arrows -->
  <text x="418" y="216" font-family="Prompt, sans-serif" font-size="12.5" font-weight="700" fill="#122026">ความสัมพันธ์ 4 แบบ (ระวังหัวลูกศร!):</text>

  <!-- Inheritance -->
  <line x1="422" y1="242" x2="500" y2="242" stroke="#0F5E4D" stroke-width="2.2"/>
  <polygon points="514,242 498,233 498,251" fill="#FFFFFF" stroke="#0F5E4D" stroke-width="2.2"/>
  <text x="526" y="246" font-family="Sarabun, sans-serif" font-size="12" fill="#122026"><tspan font-weight="700">Inheritance (Is-a):</tspan> ลูก ──▷ แม่</text>

  <!-- Composition -->
  <polygon points="420,276 432,268 444,276 432,284" fill="#0F5E4D" stroke="#0F5E4D" stroke-width="1.5"/>
  <line x1="444" y1="276" x2="514" y2="276" stroke="#0F5E4D" stroke-width="2.2"/>
  <text x="526" y="280" font-family="Sarabun, sans-serif" font-size="12" fill="#122026"><tspan font-weight="700">Composition (ทึบ):</tspan> ตายตามกัน (ตึก◆─ห้อง)</text>

  <!-- Aggregation -->
  <polygon points="420,310 432,302 444,310 432,318" fill="#FFFFFF" stroke="#D97706" stroke-width="2"/>
  <line x1="444" y1="310" x2="514" y2="310" stroke="#D97706" stroke-width="2.2"/>
  <text x="526" y="314" font-family="Sarabun, sans-serif" font-size="12" fill="#122026"><tspan font-weight="700">Aggregation (โปร่ง):</tspan> แยกอยู่ได้ (สนง◇─จนท)</text>

  <!-- Association -->
  <line x1="420" y1="344" x2="500" y2="344" stroke="#475569" stroke-width="2.2"/>
  <polyline points="494,337 508,344 494,351" fill="none" stroke="#475569" stroke-width="2.2"/>
  <text x="526" y="348" font-family="Sarabun, sans-serif" font-size="12" fill="#122026"><tspan font-weight="700">Association:</tspan> ใช้งาน/รู้จักกันทั่วไป</text>

  <text x="579" y="376" text-anchor="middle" font-family="Sarabun, sans-serif" font-size="11.5" font-weight="700" fill="#0F5E4D">Multiplicity: 1, 0..1, 1..*, 0..* วางที่ปลายเส้น</text>
</svg>`
        },
        symbolsTable: {
          caption: 'ตารางสรุปตัวบ่งชี้การเข้าถึง (Visibility) และความสัมพันธ์ใน UML Class Diagram',
          headers: ['สัญลักษณ์ / คำสั่ง', 'อยู่ในแผนภาพ', 'ความหมายและการใช้งานจริง'],
          rows: [
            ['+ (Public)', 'Class Diagram', 'เปิดเผยให้คลาสอื่นจากภายนอกเรียกใช้งานได้ทั้งหมด (มักใช้กับ Methods หลัก เช่น <code>+calculateFee()</code>)'],
            ['- (Private)', 'Class Diagram', 'ซ่อนไว้ใช้เฉพาะภายในคลาสนี้เท่านั้นตามหลัก <strong>Encapsulation</strong> (มักใช้กับ Attributes เช่น <code>-citizenId</code>)'],
            ['# (Protected)', 'Class Diagram', 'ใช้ได้เฉพาะคลาสตัวเองและ <strong>คลาสลูกที่สืบทอดไป (Inheritance)</strong> เท่านั้น'],
            ['──▷ Inheritance (Is-a)', 'Class Diagram', 'สืบทอดคุณสมบัติและเมธอดจากคลาสแม่สู่คลาสลูก (สามเหลี่ยมโปร่งชี้ไปหาคลาสแม่เสมอ)'],
            ['◆── Composition', 'Class Diagram', 'ความเป็นเจ้าของแบบ <strong>ขาดกันไม่ได้ / ตายตามกัน</strong> (ข้าวหลามตัดทึบอยู่ที่ตัวแม่ เช่น <code>CondoBuilding ◆── CondoUnit</code>)'],
            ['◇── Aggregation', 'Class Diagram', 'ความเป็นเจ้าของแบบ <strong>แยกกันอยู่ได้</strong> (ข้าวหลามตัดโปร่งอยู่ที่ตัวแม่ เช่น <code>LandOffice ◇── LandOfficer</code>)'],
            ['-&gt;&gt; / --&gt;&gt; / alt / loop', 'Sequence Diagram', '<code>-&gt;&gt;</code> ส่งคำขอรอตอบ, <code>--&gt;&gt;</code> ส่งค่ากลับ, กรอบ <code>alt/else</code> แสดงเงื่อนไข, กรอบ <code>loop</code> แสดงการวนซ้ำ']
          ]
        },
        stepByStepHtml:
          '<h3>วิธีแปลงโจทย์ข้อเขียนเป็น Sequence &amp; Class Diagram ทีละขั้น</h3>' +
          '<h4>ส่วนที่ 1: ขั้นตอนวาด Sequence Diagram</h4>' +
          '<ol>' +
          '<li><strong>วาง Actor &amp; Participants แนวนอนด้านบน:</strong> เรียงจากซ้ายไปขวาตามระยะใกล้ผู้ใช้ → ลึกเข้าหลังบ้านเสมอ (เช่น <code>Actor ประชาชน</code> → <code>หน้าเว็บ/แอป</code> → <code>API Server</code> → <code>ระบบภายนอก/ฐานข้อมูล</code>)</li>' +
          '<li><strong>ลาก Lifeline และวางแท่ง Activation Bar:</strong> เริ่มจากเส้นแรกซ้ายไปขวาด้วย Synchronous Message (<code>-&gt;&gt;</code>)</li>' +
          '<li><strong>ใส่กรอบ <code>alt / else</code> เมื่อมีทางเลือก 2 ทาง:</strong> เช่น ตรวจสอบสิทธิ์ผ่าน vs ไม่ผ่าน หรือ คิวว่าง vs คิวเต็ม และใส่กรอบ <code>loop</code> เมื่อต้องทำซ้ำหลายรายการ (เช่น ตรวจไฟล์แนบทีละไฟล์)</li>' +
          '<li><strong>อย่าลืมเส้น Return (<code>--&gt;&gt;</code>):</strong> ทุกการเรียกแบบ Synchronous เมื่อทำงานเสร็จควรส่งผลลัพธ์ (เช่น สถานะสำเร็จ / รหัสคิว / ข้อความแจ้งเตือน) กลับมายังผู้เรียกเสมอ</li>' +
          '</ol>' +
          '<h4>ส่วนที่ 2: ขั้นตอนวาด Class Diagram</h4>' +
          '<ol>' +
          '<li><strong>สกัดคลาส (Nouns) และแยก 3 ช่อง:</strong> ชื่อคลาส (เอกพจน์ตัวพิมพ์ใหญ่) → Attributes (ใส่ <code>-</code> หรือ <code>#</code> เพื่อ Encapsulation!) → Methods (ใส่ <code>+</code>)</li>' +
          '<li><strong>เช็กคำใบ้ Inheritance (เป็นชนิดหนึ่งของ...):</strong> เช่น "โฉนด น.ส.4 จ. และหนังสือกรรมสิทธิ์ห้องชุด อ.ช.2 ต่างเป็นเอกสารสิทธิ์" → ดึงข้อมูลร่วมขึ้นคลาสแม่ <code>DeedDocument</code></li>' +
          '<li><strong>เช็กคำใบ้ Aggregation vs Composition:</strong> ถามตัวเองว่า <em>"ถ้าลบคลาสฝั่งซ้ายทิ้ง คลาสฝั่งขวาต้องถูกลบหายไปด้วยไหม?"</em> ถ้าต้องหายไปด้วย (เช่น ลบใบคำขอ → รายการแนบในคำขอหายหมด) = <strong>Composition (◆──)</strong>; ถ้ายังอยู่ได้ (เช่น ยุบสำนักงาน → เจ้าหน้าที่ย้ายไปสาขาอื่นได้) = <strong>Aggregation (◇──)</strong></li>' +
          '</ol>',
        mermaidDiagrams: [
          {
            title: 'Sequence Diagram: การชำระค่าธรรมเนียมและออกใบเสร็จอิเล็กทรอนิกส์ (มี alt & loop)',
            caption: 'สังเกตลำดับ Participant (ซ้าย→ขวา), Activation Bar, เส้นทึบ (->>), เส้นประ (-->>), และกรอบเงื่อนไข alt / else',
            code: `sequenceDiagram
  autonumber
  actor Citizen as ประชาชนผู้ยื่นคำขอ
  participant App as แอป SmartLands
  participant API as ระบบรับชำระเงินกลาง
  participant Bank as ระบบธนาคาร
  participant DB as ฐานข้อมูลใบเสร็จ

  Citizen->>+App: กดเลือกชำระค่าธรรมเนียมด้วย QR Code
  App->>+API: สร้างคำขอชำระเงิน (รหัสคำขอ, ยอดเงิน)
  API->>+Bank: ขอสร้าง PromptPay QR ชำระเงิน
  Bank-->>-API: คืนข้อมูล QR Code และรหัสอ้างอิง
  API-->>-App: แสดง QR Code บนหน้าจอ
  Citizen->>Bank: สแกนจ่ายผ่านแอปธนาคาร

  loop ตรวจสอบสถานะการชำระเงิน
    API->>Bank: ตรวจสอบผลรายการโอน
    Bank-->>API: คืนสถานะรายการ
  end

  alt ชำระเงินสำเร็จ
    API->>+DB: บันทึกการชำระเงินและออกเลขที่ใบเสร็จ
    DB-->>-API: ยืนยันเลขที่ใบเสร็จอิเล็กทรอนิกส์
    API-->>App: แจ้งชำระเงินสำเร็จพร้อมลิงก์ใบเสร็จ
    App-->>Citizen: แสดงใบเสร็จรับเงินอิเล็กทรอนิกส์
  else ชำระเงินไม่สำเร็จหรือหมดเวลา
    API-->>App: แจ้งยกเลิก QR และให้สร้างรายการใหม่
    App-->>-Citizen: แสดงข้อความแจ้งเตือนชำระเงินไม่สำเร็จ
  end`
          },
          {
            title: 'Class Diagram: โครงสร้างคลาสระบบสำนักงานที่ดิน เอกสารสิทธิ์ และคำขอนิติกรรม',
            caption: 'แสดงทั้ง Inheritance (<|--), Aggregation (o--), Composition (*--), Association (-->) และ Visibility (+, -, #)',
            code: `classDiagram
  direction TB

  class LandOffice {
    -int officeId
    -string officeName
    -string province
    +getAvailableSlots() int
  }

  class LandOfficer {
    -int officerId
    -string fullName
    -string role
    +verifyDocument(reqId) boolean
  }

  class ServiceRequest {
    -int requestId
    -date requestDate
    -string status
    +submitRequest() boolean
    +calculateTotalFee() float
  }

  class RequestAttachment {
    -int attachmentId
    -string fileType
    -string fileUrl
    +validateFile() boolean
  }

  class DeedDocument {
    #string docNo
    #float areaSqMeter
    +getDeedDetail() string
    +calcTransferFee(price) float
  }

  class ChanoteNS4J {
    -int parcelNumber
    -string utmZone
    +getParcelPolygon() string
  }

  class CondoTitleAC2 {
    -string condoRegNo
    -float ownershipRatio
    +checkForeignQuota() boolean
  }

  LandOffice "1" o-- "1..*" LandOfficer : "สังกัด (Aggregation)"
  LandOffice "1" --> "0..*" ServiceRequest : "รับคำขอ"
  ServiceRequest "1" *-- "1..*" RequestAttachment : "ประกอบด้วย (Composition)"
  ServiceRequest "1" --> "1" DeedDocument : "อ้างอิงเอกสาร"
  DeedDocument <|-- ChanoteNS4J : "สืบทอด (Inheritance)"
  DeedDocument <|-- CondoTitleAC2 : "สืบทอด (Inheritance)"`
          }
        ],
        examTraps: [
          'ใน Sequence Diagram: ลากเส้นจาก <strong>Actor ข้ามไปคุยกับ Database โดยตรง</strong> ไม่ผ่านหน้าเว็บและ API Server — ผิดหลักสถาปัตยกรรม 3-Tier ทันที!',
          'ใน Sequence Diagram: ลืมใส่กรณีผิดพลาด (<code>alt / else</code>) เมื่อโจทย์ถามถึงการตรวจสอบข้อมูลหรือการชำระเงิน',
          'ใน Class Diagram: สลับหัวข้าวหลามตัด <strong>Aggregation (โปร่ง)</strong> กับ <strong>Composition (ทึบ)</strong> หรือเอาหัวข้าวหลามตัดไปวางไว้ฝั่งลูกแทนฝั่งแม่',
          'ใน Class Diagram: ชี้หัวลูกศรสามเหลี่ยมโปร่ง <strong>Inheritance</strong> ผิดทิศ (ต้องชี้จากคลาสลูกไปหาคลาสแม่เสมอ)',
          'ตั้ง Attributes ทั้งหมดเป็น <code>+ public</code> ซึ่งผิดหลักการห่อหุ้มข้อมูล (Encapsulation) — ข้อมูลภายในควรเป็น <code>- private</code> หรือ <code># protected</code>'
        ]
      },

      // =========================================================================
      // CATEGORY 6: SYSTEM ARCHITECTURE & NETWORK DESIGN
      // =========================================================================
      {
        id: 'sysarch',
        tabLabel: 'สถาปัตยกรรมระบบ',
        order: 6,
        badge: 'หมวดที่ 6 • ออกแบบระบบภาครัฐ (System Design Essay)',
        icon: 'fa-solid fa-shield-halved',
        title: '6. แผนภาพสถาปัตยกรรมระบบและเครือข่ายภาครัฐ (System Architecture Blueprint)',
        whatIsItHtml:
          '<h3>อะไรคือ System Architecture &amp; Network Design Diagram?</h3>' +
          '<p>นี่คือ <strong>"ข้อสอบปราบเซียน (20–30 คะแนน)"</strong> ในการสอบข้อเขียนนักวิชาการคอมพิวเตอร์ปฏิบัติการ! โจทย์มักจำลองว่า <em>"หน่วยงานมีสำนักงานทั่วประเทศ (เช่น กรมที่ดิน 462 สาขา) ต้องการพัฒนาระบบออนไลน์ให้ประชาชนใช้งานพร้อมกันจำนวนมาก มีความปลอดภัยสูง ข้อมูลไม่สูญหาย และถูกกฎหมายไทย — จงออกแบบสถาปัตยกรรมระบบ พร้อมวาดแผนภาพประกอบและอธิบาย"</em></p>' +
          '<p>การจะได้คะแนนเต็มข้อนี้ น้องต้องวาดให้ครบ <strong>6 โซนหลัก (Defense in Depth + High Availability + Law Compliance)</strong> แทนที่จะวาดแค่กล่อง "User → Web Server → DB" แบบนักเรียนเขียนเว็บทั่วไปครับ</p>',
        analogy: {
          title: 'เปรียบเทียบให้เห็นภาพ: ปราสาทที่มีค่ายคูประตูรบหลายชั้น (Defense in Depth)',
          body: '• <strong>CDN / Anti-DDoS / WAF:</strong> เหมือน <em>ด่านตรวจอาวุธและป้อมหน้าประตูเมือง</em> กันฝูงซอมบี้ (DDoS) และมือวางระเบิด (SQL Injection / XSS) ก่อนเข้าเขตเมือง<br>• <strong>DMZ Zone (Perimeter Firewall):</strong> เหมือน <em>ลานรับแขกหน้าวัง</em> เอาไว้ตั้งเคาน์เตอร์ต้อนรับ (Web/API Gateway) ห้ามเอาห้องคลังสมบัติ (Database) มาตั้งไว้ลานหน้าบ้านเด็ดขาด!<br>• <strong>Internal Firewall &amp; IPS → App &amp; Data Tier:</strong> เหมือน <em>กำแพงชั้นในและห้องนิรภัย</em> มีตู้เซฟสำรองพร้อมสลับทันที (Read Replica / HA) + สำเนาเก็บนอกเมือง (Backup 3-2-1 / DR Site) + กล้องวงจรปิดบันทึกเหตุการณ์เก็บไว้ 90 วัน (Log ตาม พ.ร.บ.คอมฯ)!'
        },
        symbolLegendSvg: {
          caption: 'แผนผัง 6 โซนมาตรฐานสำหรับข้อสอบออกแบบสถาปัตยกรรมระบบภาครัฐ (จำโครงนี้ไปใช้ได้ทุกกรม!)',
          svgHtml: `<svg role="img" viewBox="0 0 780 420" width="100%" xmlns="http://www.w3.org/2000/svg" aria-labelledby="svg-diag-arch-title">
  <title id="svg-diag-arch-title">6 โซนมาตรฐานของสถาปัตยกรรมระบบสารสนเทศภาครัฐที่มั่นคงปลอดภัย</title>
  <rect x="0" y="0" width="780" height="420" rx="14" fill="#F4F7F6" stroke="#D5E1DD" stroke-width="2"/>
  <text x="390" y="32" text-anchor="middle" font-family="Prompt, Sarabun, sans-serif" font-size="17.5" font-weight="700" fill="#0F5E4D">พิมพ์เขียว 6 โซนหลัก: ออกแบบระบบภาครัฐให้ได้คะแนนเต็มข้อเขียน</text>

  <!-- Zone 1: Edge -->
  <rect x="18" y="52" width="132" height="225" rx="10" fill="#FFFFFF" stroke="#D5E1DD" stroke-width="1.5"/>
  <text x="84" y="74" text-anchor="middle" font-family="Prompt, sans-serif" font-size="12.5" font-weight="700" fill="#0369A1">1. Users &amp; Edge</text>
  <rect x="30" y="90" width="108" height="44" rx="6" fill="#E0F2FE" stroke="#0369A1" stroke-width="1.5"/>
  <text x="84" y="110" text-anchor="middle" font-family="Sarabun, sans-serif" font-size="11.5" font-weight="700" fill="#122026">ประชาชน</text>
  <text x="84" y="126" text-anchor="middle" font-family="Sarabun, sans-serif" font-size="10.5" fill="#475569">Web / SmartLands</text>
  <rect x="30" y="152" width="108" height="50" rx="6" fill="#FEF3C7" stroke="#D97706" stroke-width="1.5"/>
  <text x="84" y="174" text-anchor="middle" font-family="Sarabun, sans-serif" font-size="11.5" font-weight="700" fill="#92400E">CDN / Anti-DDoS</text>
  <text x="84" y="191" text-anchor="middle" font-family="Sarabun, sans-serif" font-size="11" fill="#92400E">&amp; WAF (SQLi/XSS)</text>
  <text x="84" y="256" text-anchor="middle" font-family="Sarabun, sans-serif" font-size="10.5" font-weight="700" fill="#0369A1">TLS 1.3 (HTTPS)</text>

  <!-- Firewall 1 -->
  <rect x="160" y="70" width="22" height="190" rx="4" fill="#FFE4E6" stroke="#BE123C" stroke-width="1.8"/>
  <text x="171" y="165" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="10" font-weight="700" fill="#BE123C" transform="rotate(-90 171 165)">Perimeter FW</text>

  <!-- Zone 2: DMZ -->
  <rect x="192" y="52" width="142" height="225" rx="10" fill="#FEF3C7" stroke="#D97706" stroke-width="2"/>
  <text x="263" y="74" text-anchor="middle" font-family="Prompt, sans-serif" font-size="12.5" font-weight="700" fill="#92400E">2. DMZ Zone</text>
  <rect x="206" y="90" width="114" height="44" rx="6" fill="#FFFFFF" stroke="#D97706" stroke-width="1.5"/>
  <text x="263" y="110" text-anchor="middle" font-family="Sarabun, sans-serif" font-size="11.5" font-weight="700" fill="#122026">Load Balancer</text>
  <text x="263" y="126" text-anchor="middle" font-family="Sarabun, sans-serif" font-size="10.5" fill="#475569">กระจายโหลด (HA)</text>
  <rect x="206" y="148" width="114" height="50" rx="6" fill="#FFFFFF" stroke="#D97706" stroke-width="1.5"/>
  <text x="263" y="170" text-anchor="middle" font-family="Sarabun, sans-serif" font-size="11.5" font-weight="700" fill="#122026">Web / API Gateway</text>
  <text x="263" y="187" text-anchor="middle" font-family="Sarabun, sans-serif" font-size="10.5" fill="#475569">Reverse Proxy</text>
  <text x="263" y="256" text-anchor="middle" font-family="Sarabun, sans-serif" font-size="11" font-weight="700" fill="#BE123C">ห้ามวาง DB ใน DMZ!</text>

  <!-- Firewall 2 + IPS -->
  <rect x="344" y="70" width="24" height="190" rx="4" fill="#FFE4E6" stroke="#BE123C" stroke-width="1.8"/>
  <text x="356" y="165" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="10" font-weight="700" fill="#BE123C" transform="rotate(-90 356 165)">Internal FW + IPS</text>

  <!-- Zone 3: Internal App -->
  <rect x="378" y="52" width="166" height="225" rx="10" fill="#E6F4F1" stroke="#0F5E4D" stroke-width="2"/>
  <text x="461" y="74" text-anchor="middle" font-family="Prompt, sans-serif" font-size="12.5" font-weight="700" fill="#0F5E4D">3. Internal App Tier</text>
  <rect x="392" y="90" width="138" height="48" rx="6" fill="#FFFFFF" stroke="#0F5E4D" stroke-width="1.5"/>
  <text x="461" y="111" text-anchor="middle" font-family="Sarabun, sans-serif" font-size="11.5" font-weight="700" fill="#122026">App &amp; GIS Cluster</text>
  <text x="461" y="128" text-anchor="middle" font-family="Sarabun, sans-serif" font-size="10.5" fill="#475569">Auto-Scale หลาย Node</text>
  <rect x="392" y="150" width="138" height="48" rx="6" fill="#FFFFFF" stroke="#0F5E4D" stroke-width="1.5"/>
  <text x="461" y="171" text-anchor="middle" font-family="Sarabun, sans-serif" font-size="11.5" font-weight="700" fill="#122026">Auth (ThaID / MFA)</text>
  <text x="461" y="188" text-anchor="middle" font-family="Sarabun, sans-serif" font-size="10.5" fill="#475569">RBAC ตรวจสิทธิ์ผู้ใช้</text>
  <text x="461" y="256" text-anchor="middle" font-family="Sarabun, sans-serif" font-size="11" font-weight="700" fill="#0F5E4D">แยก Subnet ภายใน</text>

  <!-- Zone 4: Data & Backup -->
  <rect x="556" y="52" width="206" height="225" rx="10" fill="#FFFFFF" stroke="#0F5E4D" stroke-width="2"/>
  <text x="659" y="74" text-anchor="middle" font-family="Prompt, sans-serif" font-size="12.5" font-weight="700" fill="#0F5E4D">4. Data &amp; Resilience</text>
  <rect x="570" y="90" width="178" height="48" rx="6" fill="#E6F4F1" stroke="#0F5E4D" stroke-width="1.5"/>
  <text x="659" y="111" text-anchor="middle" font-family="Sarabun, sans-serif" font-size="11.5" font-weight="700" fill="#122026">Core DB (Active-Standby)</text>
  <text x="659" y="128" text-anchor="middle" font-family="Sarabun, sans-serif" font-size="10.5" fill="#475569">+ Read Replica แยกคิวรีอ่าน</text>
  <rect x="570" y="150" width="178" height="48" rx="6" fill="#FEF3C7" stroke="#D97706" stroke-width="1.5"/>
  <text x="659" y="171" text-anchor="middle" font-family="Sarabun, sans-serif" font-size="11.5" font-weight="700" fill="#92400E">Backup 3-2-1 &amp; DR Site</text>
  <text x="659" y="188" text-anchor="middle" font-family="Sarabun, sans-serif" font-size="10.5" fill="#92400E">Immutable + AES-256</text>
  <text x="659" y="256" text-anchor="middle" font-family="Sarabun, sans-serif" font-size="11" font-weight="700" fill="#0F5E4D">RAID + Off-site Backup</text>

  <!-- Zone 5 & 6 Bottom Bar: Branch VPN + Compliance -->
  <rect x="18" y="294" width="362" height="106" rx="10" fill="#FFFFFF" stroke="#0369A1" stroke-width="2"/>
  <text x="199" y="320" text-anchor="middle" font-family="Prompt, sans-serif" font-size="13.5" font-weight="700" fill="#0369A1">5. การเชื่อมต่อสาขา: 462 สำนักงานที่ดินทั่วประเทศ</text>
  <text x="199" y="346" text-anchor="middle" font-family="Sarabun, sans-serif" font-size="12" fill="#122026">เชื่อมเข้า Internal App/DB ผ่าน MPLS / IPSec VPN Tunnel (เข้ารหัส)</text>
  <text x="199" y="370" text-anchor="middle" font-family="Sarabun, sans-serif" font-size="12" fill="#475569">มี Link สำรอง (SD-WAN / 4G-5G Failover) ป้องกันสาขาตัดขาด</text>

  <rect x="396" y="294" width="366" height="106" rx="10" fill="#FFFFFF" stroke="#0F5E4D" stroke-width="2"/>
  <text x="579" y="320" text-anchor="middle" font-family="Prompt, sans-serif" font-size="13.5" font-weight="700" fill="#0F5E4D">6. กฎหมายและความมั่นคง (SIEM / PDPA / พ.ร.บ.คอมฯ)</text>
  <text x="579" y="346" text-anchor="middle" font-family="Sarabun, sans-serif" font-size="12" fill="#122026">Central Syslog / SIEM เก็บ Log จราจรคอมพิวเตอร์ &gt;= 90 วัน (ม.26)</text>
  <text x="579" y="370" text-anchor="middle" font-family="Sarabun, sans-serif" font-size="12" fill="#475569">PDPA: เข้ารหัส At-Rest/In-Transit, ปกปิดข้อมูลส่วนบุคคล, RBAC</text>
</svg>`
        },
        symbolsTable: {
          caption: 'หน้าที่ขององค์ประกอบแต่ละตัวในสถาปัตยกรรมระบบภาครัฐ (เอาไปเขียนอธิบายใต้ภาพได้ทันที)',
          headers: ['องค์ประกอบ / ชั้น', 'หน้าที่ทางเทคนิค (อธิบายแบบสั้นชัด)', 'แก้ปัญหา / ตอบโจทย์ข้อสอบเรื่องอะไร?'],
          rows: [
            ['CDN + Anti-DDoS + WAF', 'ช่วยแคชไฟล์นิ่ง ซับทราฟฟิกโจมตี DDoS และกรอง SQL Injection / XSS ที่ Layer 7 ก่อนถึงเซิร์ฟเวอร์', 'Security (OWASP Top 10) &amp; Availability'],
            ['Perimeter Firewall + DMZ', 'กั้นโซนกันชน (DMZ) สำหรับวาง Web / Reverse Proxy / API Gateway ที่ต้องเปิดพอร์ต 443 รับคนนอก', 'Defense in Depth แยกโซนสาธารณะออกจากข้อมูลภายใน'],
            ['Load Balancer', 'กระจายคำขอไปยัง Web/App Server หลายเครื่อง และตัดเครื่องที่ล่มออกอัตโนมัติ (Health Check)', 'Performance &amp; High Availability (ไม่ล่มจากจุดเดียว)'],
            ['Internal Firewall + IPS', 'กรองทราฟฟิกอีกรอบก่อนเข้าเครือข่ายภายใน และตรวจจับ-บล็อกการบุกรุกอัตโนมัติ (IPS)', 'ป้องกันผู้บุกรุกทะลุจาก DMZ เข้าถึงฐานข้อมูล'],
            ['App Cluster + Auth (ThaID/MFA)', 'รัน Business Logic / GIS Engine และพิสูจน์ตัวตนแบบ Multi-Factor พร้อมกำหนดสิทธิ์ RBAC', 'Scalability &amp; Access Control'],
            ['Core DB + Read Replica + 3-2-1 Backup', 'ฐานข้อมูลหลักแบบ Active-Standby, แยก Read Replica รับงานค้นหา และสำรอง 3 ชุด / 2 สื่อ / 1 นอกสถานที่ (DR)', 'Data Integrity, Performance, Disaster Recovery'],
            ['MPLS / IPSec VPN (462 สาขา)', 'ท่อสื่อสารเข้ารหัสระหว่างส่วนกลางกับสำนักงานที่ดิน 462 แห่งทั่วประเทศ พร้อมเส้นทางสำรอง', 'Secure Branch Connectivity'],
            ['SIEM / Central Syslog + PDPA', 'รวม Log ทุกอุปกรณ์ในเซิร์ฟเวอร์กลางด้วยเวลา NTP ตรงกัน เก็บ &gt;= 90 วัน (พ.ร.บ.คอมฯ ม.26) และเข้ารหัสข้อมูลส่วนบุคคล', 'Compliance (พ.ร.บ.คอมฯ 2560 &amp; PDPA 2562)']
          ]
        },
        stepByStepHtml:
          '<h3>สูตรตอบข้อสอบออกแบบสถาปัตยกรรม 5 ขั้น (เขียนแบบนี้ได้คะแนนเต็มเกือบทุกสนาม!)</h3>' +
          '<ol>' +
          '<li><strong>ขั้นที่ 1 — วาดแบ่ง "กรอบโซน" ก่อนวางกล่อง:</strong> ตีกรอบใหญ่แยก <strong>Public/Edge</strong> → <strong>DMZ</strong> → <strong>Internal App</strong> → <strong>Data &amp; DR</strong> → <strong>462 Branch VPN</strong> → <strong>Security &amp; Log Zone</strong> แค่วางโซนถูก กรรมการก็รู้ว่าน้องเข้าใจ Network Segmentation แล้วครับ</li>' +
          '<li><strong>ขั้นที่ 2 — ใส่ตัวกระจายโหลดและความพร้อมใช้งาน (HA):</strong> ห้ามวาดเซิร์ฟเวอร์ตัวเดียวโดดๆ ให้ใส่ <code>Load Balancer</code>, <code>App Server (2+ Nodes / Auto-scale)</code>, และ <code>Core DB + Read Replica</code> เพื่อปิดจุดอ่อน <strong>Single Point of Failure (SPOF)</strong></li>' +
          '<li><strong>ขั้นที่ 3 — เติมกำแพงป้องกัน 3 ชั้น:</strong> หน้าสุดใส่ <code>WAF &amp; Anti-DDoS</code> → <code>Perimeter Firewall</code> กั้นเข้า DMZ → <code>Internal Firewall &amp; IPS</code> กั้นเข้า Internal</li>' +
          '<li><strong>ขั้นที่ 4 — เติมการเชื่อมต่อสาขาและแผนกู้คืนภัยพิบัติ:</strong> วาดเส้นประท่อ <code>IPSec VPN / MPLS</code> เชื่อมสำนักงานภูมิภาค (462 แห่ง) และใส่กล่อง <code>Backup 3-2-1 / DR Site</code></li>' +
          '<li><strong>ขั้นที่ 5 — เขียนคำอธิบายใต้ภาพ 4 หัวข้อทอง:</strong> (1) <em>Performance &amp; Scalability</em>, (2) <em>High Availability &amp; Disaster Recovery</em>, (3) <em>Cybersecurity (CIA Triad &amp; Defense in Depth)</em>, และ (4) <em>Legal Compliance (พ.ร.บ.คอมฯ 2560 ม.26 เก็บ Log &gt;= 90 วัน + PDPA 2562)</em></li>' +
          '</ol>',
        mermaidDiagrams: [
          {
            title: 'System Architecture Blueprint: ระบบสารสนเทศกรมที่ดินกลางเชื่อมโยง 462 สาขาอย่างมั่นคงปลอดภัย',
            caption: 'แยกโซน Defense in Depth ตั้งแต่ Edge/WAF → DMZ → Internal App & GIS → Core DB + Replica + 3-2-1 Backup → VPN 462 สาขา & Log 90 วัน',
            code: `flowchart TB
  subgraph EDGE["1. ผู้ใช้งานและด่านหน้า (Edge Security)"]
    direction LR
    CIT["ประชาชน (Web / SmartLands Plus)"]
    WAF["CDN + Anti-DDoS + WAF"]
    CIT -->|"HTTPS (TLS 1.3)"| WAF
  end

  FW1["Perimeter Firewall"]

  subgraph DMZ["2. DMZ Zone (โซนกันชนสาธารณะ)"]
    direction LR
    LB["Load Balancer (Active-Active)"]
    APIGW["Web / API Gateway Cluster"]
    LB --> APIGW
  end

  FW2["Internal Firewall + IPS"]

  subgraph INT["3. Internal App & GIS Tier"]
    direction LR
    APP["Application Server Cluster (Auto-Scale)"]
    GIS["LandsMaps / Spatial GIS Engine"]
    AUTH["Auth Service (ThaID / MFA / RBAC)"]
    APP <--> AUTH
    APP <--> GIS
  end

  subgraph DATA["4. Data Tier & Disaster Recovery"]
    direction LR
    DB_PRI[("Core DB Primary (Spatial + สารบบ)")]
    DB_REP[("Read Replica (แยกงานค้นหา)")]
    BK["3-2-1 Immutable Backup & DR Site"]
    DB_PRI -->|"Sync Replication"| DB_REP
    DB_PRI -.->|"Encrypted Backup (AES-256)"| BK
  end

  subgraph BRANCH["5. สำนักงานที่ดิน 462 แห่งทั่วประเทศ"]
    OFF["กทม.+16 สาขา / 76 จังหวัด / 346 สาขา / 23 ส่วนแยก"]
  end

  subgraph GOV["6. ธรรมาภิบาลและกฎหมาย (SIEM / PDPA)"]
    LOG["Central SIEM / Syslog (NTP + เก็บ Log 90 วัน ตาม พ.ร.บ.คอมฯ ม.26)"]
  end

  WAF --> FW1
  FW1 --> LB
  APIGW --> FW2
  FW2 --> APP
  APP -->|"Write / Transaction"| DB_PRI
  GIS -->|"Read / Query"| DB_REP
  OFF -.->|"IPSec VPN / MPLS (เข้ารหัส)"| FW2
  FW1 -.->|"Syslog"| LOG
  FW2 -.->|"Syslog"| LOG
  APP -.->|"Audit Log + PDPA Access Log"| LOG`
          }
        ],
        examTraps: [
          '<strong>วาง Database Server ไว้ใน DMZ</strong> หรือวาดให้ User ต่อตรงเข้า Database ได้โดยไม่มี Firewall กั้น — ผิดหลักความปลอดภัยร้ายแรง!',
          'วาดแค่ Web 1 เครื่อง + DB 1 เครื่อง ไม่มี Load Balancer, ไม่มี Replica, ไม่มี Backup (เกิด <strong>Single Point of Failure</strong>)',
          'ลืมเรื่องการเชื่อมต่อจาก <strong>สำนักงานสาขาต่างจังหวัด (462 แห่ง)</strong> ว่าจะเข้ามาใช้ระบบกลางทางไหน (ต้องระบุ IPSec VPN / MPLS ไม่ใช่เปิดพอร์ต DB ทิ้งไว้บนอินเทอร์เน็ต!)',
          'ลืมกล่าวถึง <strong>พ.ร.บ.คอมพิวเตอร์ฯ ม.26 (เก็บ Log ไม่น้อยกว่า 90 วัน + เทียบเวลา NTP)</strong> และ <strong>PDPA 2562 (เข้ารหัส, สิทธิ์ RBAC, Consent)</strong> ซึ่งกรรมการราชการให้คะแนนส่วนนี้สูงมาก!'
        ]
      }
    ],

    // =========================================================================
    // 6 WRITTEN EXAM PRACTICE CASES
    // =========================================================================
    writtenExams: [
      {
        id: 'exam-1-flowchart-fee',
        number: 1,
        categoryId: 'flowchart',
        title: 'ข้อเขียนที่ 1: วาด Flowchart ระบบคำนวณค่าธรรมเนียมโอนและส่วนลดหลายแปลง (มี Validation + Loop)',
        diagramType: 'Flowchart',
        scoreWeight: '20 คะแนน',
        difficulty: 'พื้นฐาน → กลาง',
        promptText:
          'กรมที่ดินต้องการสร้างโปรแกรมคำนวณค่าธรรมเนียมจดทะเบียนโอนกรรมสิทธิ์ที่ดินให้กับผู้ยื่นคำขอ 1 ราย (สามารถยื่นโอนได้หลายแปลงพร้อมกันใน 1 รอบ) โดยมีเงื่อนไขดังนี้:\n' +
          '1) รับจำนวนแปลงที่ต้องการโอน (n) หาก n <= 0 ให้แสดงข้อความผิดพลาดแล้วจบการทำงาน\n' +
          '2) วนซ้ำรับข้อมูลทีละแปลง ได้แก่ ราคาประเมิน (price) และ ประเภทผู้ซื้อ (isFirstHome: true/false)\n' +
          '3) อัตราค่าธรรมเนียมปกติอยู่ที่ 2% ของราคาประเมิน แต่หากเป็นบ้านหลังแรก (isFirstHome = true) และราคาประเมินไม่เกิน 7,000,000 บาท จะได้สิทธิลดค่าธรรมเนียมเหลือ 0.01% ของราคาประเมิน\n' +
          '4) รวมค่าธรรมเนียมทุกแปลงเป็นยอดสุทธิ (totalFee) แล้วแสดงผลลัพธ์ออกทางหน้าจอ\n' +
          'คำสั่ง: จงวาด Flowchart แสดงขั้นตอนการทำงานของโปรแกรมนี้อย่างถูกต้องตามมาตรฐาน ANSI/ISO',
        thinkingSteps: [
          'ขั้นที่ 1 (จุดเริ่มและ Validation): เริ่มต้นที่ Start (แคปซูล) → รับค่า n (ด้านขนาน) → ตรวจด้วยข้าวหลามตัดว่า n มากกว่า 0 หรือไม่ ถ้าไม่ให้แสดง Error แล้วไป End',
          'ขั้นที่ 2 (กำหนดค่าเริ่มต้น Loop): ก่อนเข้า Loop ต้องตั้งค่าตัวแปรสะสม totalFee = 0 และตัวนับรอบ i = 1 ในกล่อง Process (สี่เหลี่ยมผืนผ้า)',
          'ขั้นที่ 3 (เงื่อนไขการวนซ้ำ): วาดข้าวหลามตัดตรวจว่า i น้อยกว่าหรือเท่ากับ n หรือไม่? ถ้าใช่ (True) ให้รับ price และ isFirstHome ของแปลงที่ i',
          'ขั้นที่ 4 (เงื่อนไขซ้อน): ตรวจว่า isFirstHome == true และ price <= 7,000,000 หรือไม่? ถ้าใช่คิด fee = price * 0.0001 ถ้าไม่ใช่คิด fee = price * 0.02 จากนั้นบวกทบเข้า totalFee = totalFee + fee และเพิ่มรอบ i = i + 1 แล้วโยงลูกศรวนกลับไปหน้าเงื่อนไข Loop (i <= n)',
          'ขั้นที่ 5 (จบ Loop และแสดงผล): เมื่อกิ่ง False ของ Loop ทำงาน (ทำครบทุกแปลงแล้ว) ให้ออกมาแสดงค่า totalFee (ด้านขนาน) แล้วจบที่ End (แคปซูล)'
        ],
        solutionMermaid: `flowchart TD
  S(["Start: เริ่มโปรแกรม"]) --> IN_N[/"รับค่าจำนวนแปลง n"/]
  IN_N --> CHK_N{"n มากกว่า 0 หรือไม่?"}
  CHK_N -->|"ไม่ใช่"| ERR[/"แสดงข้อความ: จำนวนแปลงไม่ถูกต้อง"/]
  ERR --> E(["End: จบการทำงาน"])
  CHK_N -->|"ใช่"| INIT["totalFee = 0 และ i = 1"]
  INIT --> LOOP{"i น้อยกว่าหรือเท่ากับ n ?"}
  LOOP -->|"ไม่ใช่ (ครบทุกแปลงแล้ว)"| OUT[/"แสดงผล totalFee (ยอดรวมสุทธิ)"/]
  OUT --> E
  LOOP -->|"ใช่ (ทำแปลงที่ i)"| IN_PLOT[/"รับค่า price และ isFirstHome"/]
  IN_PLOT --> CHK_DIS{"isFirstHome เป็นจริง และ price ไม่เกิน 7,000,000 ?"}
  CHK_DIS -->|"ใช่ (ได้สิทธิลดหย่อน)"| CALC_LOW["fee = price * 0.0001"]
  CHK_DIS -->|"ไม่ใช่ (อัตราปกติ)"| CALC_STD["fee = price * 0.02"]
  CALC_LOW --> ACC["totalFee = totalFee + fee และ i = i + 1"]
  CALC_STD --> ACC
  ACC --> LOOP`,
        solutionExplanation:
          '<p>การออกแบบ Flowchart ข้อนี้เน้น 3 จุดสำคัญที่กรรมการตรวจหา:</p>' +
          '<ul>' +
          '<li><strong>การตรวจสอบ Input ก่อนเข้า Loop:</strong> ถ้าผู้ใช้กรอก <code>n &lt;= 0</code> ระบบไม่ควรพังหรือแสดงยอด 0 บาทแบบงงๆ แต่ควรแจ้งเตือนแล้วจบงานทันที</li>' +
          '<li><strong>การกำหนดค่าเริ่มต้นนอก Loop:</strong> <code>totalFee = 0</code> และ <code>i = 1</code> ต้องอยู่ <em>ก่อน</em> ถึงข้าวหลามตัด Loop และลูกศรวนกลับต้องชี้กลับมาที่ <em>หน้าข้าวหลามตัด Loop</em> (<code>LOOP</code>) ไม่ใช่ชี้กลับไปที่ <code>INIT</code></li>' +
          '<li><strong>การรวมเส้นก่อนจบ:</strong> ทั้งกิ่งลดหย่อน (0.01% = 0.0001) และกิ่งปกติ (2% = 0.02) มารวมที่จุดอัปเดตตัวแปรเดียวกันเพื่อลดการเขียนโค้ดซ้ำซ้อน และทุกเส้นลงมาจบที่ <code>End</code> เดียว</li>' +
          '</ul>',
        rubric: [
          'ใช้รูปทรงถูกต้องครบทั้ง 4 ชนิดหลัก (แคปซูล=Start/End, ด้านขนาน=รับ/แสดงผล, ผืนผ้า=คำนวณ/กำหนดค่า, ข้าวหลามตัด=เงื่อนไข)',
          'เขียนป้ายกำกับ "ใช่ / ไม่ใช่" (หรือ True / False) ออกจากข้าวหลามตัดครบทุกจุด (ทั้งตรวจ n, ตรวจ Loop, และตรวจส่วนลด)',
          'กำหนด totalFee = 0 และ i = 1 ก่อนเข้า Loop และมีการเพิ่มค่า i = i + 1 ก่อนวนกลับ',
          'ลูกศรวนกลับของ Loop ชี้มาที่หน้าเงื่อนไข i <= n (ไม่ได้ชี้ไปทับกล่อง totalFee = 0)',
          'คิดตัวเลข 0.01% เป็นตัวคูณ 0.0001 และ 2% เป็น 0.02 ได้ถูกต้อง'
        ]
      },
      {
        id: 'exam-2-dfd-survey',
        number: 2,
        categoryId: 'dfd',
        title: 'ข้อเขียนที่ 2: วาด DFD Level 0 (Context) และ Level 1 ระบบยื่นขอรังวัดที่ดิน (แบ่งแยก / สอบเขต)',
        diagramType: 'DFD Level 0 & Level 1',
        scoreWeight: '25 คะแนน',
        difficulty: 'กลาง',
        promptText:
          'จงเขียน Data Flow Diagram (DFD) ระดับ Level 0 (Context Diagram) และระเบิดเป็น Level 1 สำหรับ "ระบบยื่นขอรังวัดที่ดินออนไลน์" ที่มีขั้นตอนดังนี้:\n' +
          '1) ประชาชนยื่นคำขอรังวัดพร้อมเลขโฉนดเข้าระบบ\n' +
          '2) ระบบตรวจสอบข้อมูลแปลงที่ดินจากทะเบียนแปลง และคำนวณค่ามัดจำรังวัด จากนั้นส่งใบแจ้งยอดชำระเงินให้ระบบธนาคาร และส่งข้อมูลให้ประชาชนนำไปชำระเงิน\n' +
          '3) เมื่อระบบธนาคารส่งหลักฐานยืนยันการชำระเงินกลับมา ระบบจะบันทึกใบเสร็จลงฐานข้อมูลการเงิน และจัดตารางคิวออกรังวัดให้ช่างรังวัด พร้อมบันทึกข้อมูลนัดหมาย\n' +
          '4) ระบบส่งหมายนัดรังวัดให้ประชาชน และส่งคำสั่งปฏิบัติงานพร้อมพิกัดแปลงให้ช่างรังวัด เพื่อไปรังวัดแล้วบันทึกผลรังวัดกลับเข้าระบบ',
        thinkingSteps: [
          'ขั้นที่ 1 (หา External Entities): มี 3 ตัวตนภายนอก ได้แก่ (1) ประชาชน, (2) ระบบธนาคาร, (3) ช่างรังวัด',
          'ขั้นที่ 2 (วาด Level 0 — Context Diagram): วาง Process 0 ชื่อ "0. ระบบยื่นขอรังวัดที่ดิน" ตรงกลาง ล้อมด้วย 3 Entities ลากเส้นเข้า-ออก (จำให้ขึ้นใจ: ห้ามมี Data Store ใน Level 0 เด็ดขาด!)',
          'ขั้นที่ 3 (แยก Process ใน Level 1): แตกงานเป็น 4 Process ย่อยเรียงตามหน้าที่ข้อมูล: 1.0 รับคำขอและตรวจข้อมูลแปลง, 2.0 คำนวณและจัดการชำระเงินค่ามัดจำ, 3.0 จัดตารางคิวและออกหมายนัด, 4.0 บันทึกผลการรังวัด',
          'ขั้นที่ 4 (เปิดเผย Data Stores): สร้างคลังข้อมูล D1 ทะเบียนแปลงที่ดิน, D2 ข้อมูลการชำระเงินและใบเสร็จ, D3 ตารางคิวนัดรังวัด',
          'ขั้นที่ 5 (ตรวจ Balancing Rule): ไล่เทียบเส้นทุกเส้นที่เข้า-ออกจาก ประชาชน, ระบบธนาคาร และ ช่างรังวัด ใน Level 0 กับ Level 1 ต้องมีชื่อและจำนวนตรงกันครบทุกเส้น!'
        ],
        solutionMermaid: `flowchart LR
  CIT["External Entity: ประชาชน"]
  BANK["External Entity: ระบบธนาคาร"]
  SUR["External Entity: ช่างรังวัด"]

  P1["1.0 รับคำขอและตรวจแปลง"]
  P2["2.0 คำนวณมัดจำและรับชำระเงิน"]
  P3["3.0 จัดตารางคิวและออกหมายนัด"]
  P4["4.0 บันทึกผลการรังวัด"]

  D1[("D1 ทะเบียนแปลงที่ดิน")]
  D2[("D2 ข้อมูลชำระเงินและใบเสร็จ")]
  D3[("D3 ตารางคิวนัดรังวัด")]

  CIT -->|"คำขอรังวัดและเลขโฉนด"| P1
  D1 -->|"ข้อมูลรูปแปลงและพิกัดเดิม"| P1
  P1 -->|"คำขอที่ตรวจผ่านแล้ว"| P2

  P2 -->|"ใบแจ้งยอดชำระเงิน"| CIT
  P2 -->|"ข้อมูลอ้างอิงใบแจ้งหนี้"| BANK
  BANK -->|"หลักฐานยืนยันชำระเงิน"| P2
  P2 -->|"บันทึกใบเสร็จรับเงิน"| D2
  P2 -->|"คำขอที่ชำระมัดจำแล้ว"| P3

  D3 -->|"ตารางคิวช่างว่าง"| P3
  P3 -->|"บันทึกวันนัดรังวัด"| D3
  P3 -->|"หมายนัดรังวัด"| CIT
  P3 -->|"คำสั่งงานและพิกัดแปลง"| SUR

  SUR -->|"ผลรังวัดและค่าพิกัดใหม่"| P4
  P4 -->|"อัปเดตสถานะนัดหมาย"| D3
  P4 -->|"อัปเดตข้อมูลรังวัดแปลง"| D1`,
        secondaryMermaid: {
          title: 'DFD Level 0 (Context Diagram) — 1 Process กลาง ไม่มี Data Store (Balance กับ Level 1 ด้านบน)',
          caption: 'เช็กความสมดุล: เส้นเข้า-ออกจาก ประชาชน (เข้า 1 ออก 2), ระบบธนาคาร (เข้า 1 ออก 1), ช่างรังวัด (เข้า 1 ออก 1) ตรงกับ Level 1 ทุกเส้น!',
          code: `flowchart LR
  CIT["External Entity: ประชาชน"]
  BANK["External Entity: ระบบธนาคาร"]
  SUR["External Entity: ช่างรังวัด"]

  P0(("0. ระบบยื่นขอรังวัดที่ดินออนไลน์"))

  CIT -->|"คำขอรังวัดและเลขโฉนด"| P0
  P0 -->|"ใบแจ้งยอดชำระเงิน"| CIT
  P0 -->|"หมายนัดรังวัด"| CIT

  P0 -->|"ข้อมูลอ้างอิงใบแจ้งหนี้"| BANK
  BANK -->|"หลักฐานยืนยันชำระเงิน"| P0

  P0 -->|"คำสั่งงานและพิกัดแปลง"| SUR
  SUR -->|"ผลรังวัดและค่าพิกัดใหม่"| P0`
        },
        solutionExplanation:
          '<p>เหตุผลสำคัญของการวางโครงสร้าง DFD ชุดนี้:</p>' +
          '<ul>' +
          '<li><strong>Level 0 สะอาดตามกฎ:</strong> มี Process <code>0</code> ก้อนเดียว และไม่ปรากฏ <code>D1, D2, D3</code> เลย</li>' +
          '<li><strong>ไม่มีเส้นต้องห้ามใน Level 1:</strong> เช่น เมื่อธนาคารส่งหลักฐานชำระเงินเข้ามา ต้องวิ่งเข้า Process <code>2.0</code> ก่อนแล้ว Process จึงไปเขียนลง <code>D2</code> (ไม่ให้ธนาคารวิ่งเข้า <code>D2</code> ตรงๆ)</li>' +
          '<li><strong>ชื่อตรงตามหลักภาษา:</strong> Process ขึ้นต้นด้วยคำกริยา+กรรม (<code>1.0 รับคำขอ...</code>) ส่วน Data Flow และ Data Store ใช้คำนามทั้งหมด และทุก Process มีทั้งเส้นเข้าและเส้นออก (ไม่เกิด Black Hole หรือ Miracle)</li>' +
          '</ul>',
        rubric: [
          'DFD Level 0 มี Process เลข 0 ก้อนเดียวและไม่มี Data Store ใดๆ ปรากฏอยู่',
          'ระบุ External Entity ครบ 3 ฝ่าย (ประชาชน, ระบบธนาคาร, ช่างรังวัด) และตั้งชื่อเป็นคำนาม',
          'ทุก Process ใน Level 1 มีหมายเลขกำกับ (1.0–4.0) ตั้งชื่อขึ้นต้นด้วยคำกริยา+กรรม และมีทั้ง Input กับ Output',
          'ไม่มีเส้นต่อตรงผิดกฎ (ไม่มี Entity↔Data Store, Entity↔Entity, Data Store↔Data Store)',
          'เส้นเข้า-ออกระหว่าง Entity ใน Level 0 และ Level 1 สมดุลกัน (Balanced) ครบ 100%'
        ]
      },
      {
        id: 'exam-3-erd-condo',
        number: 3,
        categoryId: 'erd',
        title: 'ข้อเขียนที่ 3: ออกแบบ ERD & เขียนโครงสร้าง 3NF ระบบจัดการการเช่าและโอนกรรมสิทธิ์ห้องชุด',
        diagramType: 'ERD & 3NF Schema',
        scoreWeight: '25 คะแนน',
        difficulty: 'กลาง → ยาก',
        promptText:
          'จงออกแบบฐานข้อมูลเชิงสัมพันธ์โดยวาด ER Diagram (แบบ Crow’s Foot) และเขียนโครงสร้างตารางระดับ 3NF (ระบุ PK และ FK ให้ครบ) สำหรับระบบบริหารจัดการห้องชุด (Condominium) ของสำนักงานที่ดิน โดยมีข้อกำหนดดังนี้:\n' +
          '1) อาคารชุด (Condominium) 1 โครงการ มีได้หลายห้องชุด (Unit) โดยเก็บชื่ออาคาร ทะเบียนอาคารชุด พื้นที่รวมอาคาร และโควตาพื้นที่ต่างด้าว\n' +
          '2) ห้องชุด 1 ห้อง (เก็บเลขที่ห้อง เลขหนังสือกรรมสิทธิ์ อ.ช.2 พื้นที่ ตร.ม. อัตราส่วนกรรมสิทธิ์) สามารถมีเจ้าของถือกรรมสิทธิ์ร่วมกันได้หลายคน และบุคคล 1 คนสามารถถือครองห้องชุดได้หลายห้อง โดยต้องบันทึกสัดส่วนการถือครอง (%) ของแต่ละคนในห้องนั้นด้วย\n' +
          '3) ผู้เช่า (บุคคล) สามารถทำสัญญาเช่าห้องชุดได้ และสัญญาเช่าแต่ละฉบับต้องระบุระยะเวลาเช่า (เดือน) และสถานะว่าต้องจดทะเบียนต่อพนักงานเจ้าหน้าที่หรือไม่ (กรณีเช่าเกิน 3 ปี / 36 เดือน ตามกฎหมาย)\n' +
          '4) ห้องชุด 1 ห้องสามารถเกิดประวัติการจดทะเบียนโอนกรรมสิทธิ์ (Deed Transfer) ได้หลายครั้งตามช่วงเวลา โดยเก็บวันที่โอน ราคาซื้อขาย และค่าธรรมเนียม',
        thinkingSteps: [
          'ขั้นที่ 1 (หา Entities หลักจากคำนาม): CONDOMINIUM (อาคารชุด), CONDO_UNIT (ห้องชุด), PERSON (บุคคล — เป็นได้ทั้งเจ้าของและผู้เช่า), LEASE_CONTRACT (สัญญาเช่า), DEED_TRANSFER (ธุรกรรมโอน อ.ช.2)',
          'ขั้นที่ 2 (ตรวจหาความสัมพันธ์ M:N): ข้อ 2 บอกชัดเจนว่า "1 ห้องชุด มีเจ้าของได้หลายคน และ 1 คน ถือได้หลายห้อง + เก็บสัดส่วน (%)" → นี่คือ M:N ระหว่าง CONDO_UNIT กับ PERSON! ต้องแตกเป็น Junction Table ชื่อ UNIT_OWNERSHIP เก็บ unit_id [PK, FK], person_id [PK, FK], share_percent',
          'ขั้นที่ 3 (กำหนดความสัมพันธ์ 1:N ที่เหลือ): CONDOMINIUM (1) ──< CONDO_UNIT (N) | CONDO_UNIT (1) ──< LEASE_CONTRACT (N) และ PERSON (1) ──< LEASE_CONTRACT (N) | CONDO_UNIT (1) ──< DEED_TRANSFER (N)',
          'ขั้นที่ 4 (ตรวจ 1NF–3NF): ไม่เก็บชื่ออาคารซ้ำในห้องชุด (ใช้ condo_id [FK]), ไม่เก็บชื่อเจ้าของซ้ำใน UNIT_OWNERSHIP หรือ DEED_TRANSFER (ใช้ person_id [FK]), และระยะเวลาเช่าเป็นตัวเลขชัดเจนเพื่อแยกสัญญา > 36 เดือนได้',
          'ขั้นที่ 5 (เขียน 3NF Schema พร้อม [PK]/[FK]): เรียงตารางแม่ขึ้นก่อน แล้วตามด้วยตารางลูกที่ถือ FK เพื่อให้อ่านง่ายเหมือนสคริปต์สร้างตารางจริง'
        ],
        solutionMermaid: `erDiagram
  CONDOMINIUM ||--|{ CONDO_UNIT : "ประกอบด้วยห้องชุด"
  CONDO_UNIT ||--|{ UNIT_OWNERSHIP : "มีผู้ถือกรรมสิทธิ์"
  PERSON ||--o{ UNIT_OWNERSHIP : "ถือครองห้องชุด"
  CONDO_UNIT ||--o{ LEASE_CONTRACT : "ถูกเช่าตามสัญญา"
  PERSON ||--o{ LEASE_CONTRACT : "ทำสัญญาเป็นผู้เช่า"
  CONDO_UNIT ||--o{ DEED_TRANSFER : "มีประวัติการโอน"

  CONDOMINIUM {
    int condo_id PK "รหัสโครงการอาคารชุด"
    string condo_reg_no UK "เลขทะเบียนอาคารชุด"
    string condo_name "ชื่อโครงการอาคารชุด"
    decimal total_unit_area_sqm "พื้นที่ห้องชุดรวมทั้งหมด"
  }
  CONDO_UNIT {
    int unit_id PK "รหัสห้องชุด"
    int condo_id FK "รหัสอาคารชุด"
    string ac2_no UK "เลขหนังสือกรรมสิทธิ์ อ.ช.2"
    string unit_no "เลขที่ห้อง"
    decimal area_sqm "พื้นที่ห้อง ตร.ม."
    decimal ownership_ratio "อัตราส่วนกรรมสิทธิ์"
  }
  PERSON {
    int person_id PK "รหัสบุคคล"
    string id_number UK "เลขบัตรประชาชนหรือพาสปอร์ต"
    string full_name "ชื่อ-นามสกุล"
    string nationality "สัญชาติ (ตรวจโควตา 49%)"
  }
  UNIT_OWNERSHIP {
    int unit_id PK, FK "รหัสห้องชุด"
    int person_id PK, FK "รหัสเจ้าของร่วม"
    decimal share_percent "สัดส่วนการถือครองร้อยละ"
    date acquired_date "วันที่ได้กรรมสิทธิ์"
  }
  LEASE_CONTRACT {
    int lease_id PK "รหัสสัญญาเช่า"
    int unit_id FK "รหัสห้องชุด"
    int tenant_id FK "รหัสผู้เช่า (ชี้ไป PERSON)"
    date start_date "วันเริ่มเช่า"
    int duration_months "ระยะเวลาเช่า (เดือน)"
    int is_registered "จดทะเบียนเกิน 3 ปี (1/0)"
  }
  DEED_TRANSFER {
    int transfer_id PK "รหัสการโอน"
    int unit_id FK "รหัสห้องชุด"
    date transfer_date "วันที่จดทะเบียนโอน"
    decimal sale_price "ราคาซื้อขาย"
    decimal fee_amount "ค่าธรรมเนียม"
  }`,
        solutionSchemaText:
          'CONDOMINIUM(condo_id [PK], condo_reg_no [UNIQUE], condo_name, total_unit_area_sqm)\n' +
          'PERSON(person_id [PK], id_number [UNIQUE], full_name, nationality)\n' +
          'CONDO_UNIT(unit_id [PK], condo_id [FK -> CONDOMINIUM.condo_id], ac2_no [UNIQUE], unit_no, area_sqm, ownership_ratio)\n' +
          'UNIT_OWNERSHIP(unit_id [PK, FK -> CONDO_UNIT.unit_id], person_id [PK, FK -> PERSON.person_id], share_percent, acquired_date)\n' +
          'LEASE_CONTRACT(lease_id [PK], unit_id [FK -> CONDO_UNIT.unit_id], tenant_id [FK -> PERSON.person_id], start_date, duration_months, is_registered)\n' +
          'DEED_TRANSFER(transfer_id [PK], unit_id [FK -> CONDO_UNIT.unit_id], transfer_date, sale_price, fee_amount)',
        solutionExplanation:
          '<p>จุดเด่นที่ทำให้ได้คะแนนเต็มในข้อสอบฐานข้อมูลชุดนี้:</p>' +
          '<ul>' +
          '<li><strong>แตก M:N สำเร็จด้วย <code>UNIT_OWNERSHIP</code>:</strong> รองรับการถือกรรมสิทธิ์ร่วมกันหลายคน พร้อมเก็บ <code>share_percent</code> และ <code>acquired_date</code> ซึ่งขึ้นกับทั้งคู่ <code>(unit_id, person_id)</code> จึงผ่าน 2NF</li>' +
          '<li><strong>รวมเจ้าของและผู้เช่าไว้ที่ <code>PERSON</code>:</strong> ไม่สร้างตารางคนซ้ำซ้อน ลด Update Anomaly และเก็บฟิลด์ <code>nationality</code> เพื่อนำไปคำนวณตรวจโควตาต่างด้าวไม่เกิน 49% ตาม พ.ร.บ.อาคารชุด ม.19 ทวิ ได้ทันที</li>' +
          '<li><strong>วาง FK ฝั่ง N ถูกต้องและผ่าน 3NF:</strong> ไม่มีข้อมูลชื่ออาคารชุดหรือชื่อเจ้าของไปโผล่ซ้ำในตารางลูกเลย</li>' +
          '</ul>',
        rubric: [
          'แยกตารางหลักครบทั้ง อาคารชุด (CONDOMINIUM), ห้องชุด (CONDO_UNIT), บุคคล (PERSON), สัญญาเช่า (LEASE_CONTRACT) และประวัติโอน (DEED_TRANSFER)',
          'แตกความสัมพันธ์ M:N ระหว่างห้องชุดและเจ้าของออกเป็น Junction Table (UNIT_OWNERSHIP) พร้อมเก็บ share_percent',
          'วาง Foreign Key ไว้ที่ฝั่ง N ทุกความสัมพันธ์ (เช่น condo_id อยู่ใน CONDO_UNIT, unit_id อยู่ใน LEASE_CONTRACT)',
          'สัญลักษณ์ Crow’s Foot (||, |{, o{) ตรงกับโจทย์ (1 อาคารต้องมีห้องชุด, 1 ห้องมีผู้ถือกรรมสิทธิ์ได้หลายคน)',
          'เขียน Schema 3NF ครบทุกตาราง พร้อมระบุ [PK] และ [FK] โดยไม่มี Partial หรือ Transitive Dependency'
        ]
      },
      {
        id: 'exam-4-uml-eqlands',
        number: 4,
        categoryId: 'usecase',
        title: 'ข้อเขียนที่ 4: วาด Use Case & Sequence Diagram ระบบจองคิว e-QLands (พร้อมเงื่อนไขคิวเต็ม)',
        diagramType: 'UML Use Case & Sequence',
        scoreWeight: '20 คะแนน',
        difficulty: 'กลาง',
        promptText:
          'จงออกแบบแผนภาพ UML สำหรับระบบจองคิวออนไลน์ e-QLands ของกรมที่ดิน ดังนี้:\n' +
          'ก) วาด Use Case Diagram: ประชาชนสามารถจองคิวและยกเลิกคิวได้ โดยทุกบริการของประชาชนจะต้องผ่านการยืนยันตัวตนด้วย ThaID ก่อนเสมอ นอกจากนี้ประชาชนสามารถเลือกแนบเอกสารล่วงหน้าเป็นทางเลือกเสริมได้ ส่วนเจ้าหน้าที่สาขาเป็นผู้ตรวจสอบคิวที่จองเข้ามา\n' +
          'ข) วาด Sequence Diagram เฉพาะขั้นตอน "ประชาชนกดจองคิวออนไลน์" เมื่อเลือกสำนักงานและวันที่แล้ว ระบบหน้าเว็บจะเรียก API ไปตรวจจำนวนคิวว่างในฐานข้อมูล โดยต้องรองรับทั้งกรณี "คิวว่าง (บันทึกการจองและส่ง QR Code)" และกรณี "คิวเต็ม (แจ้งให้เลือกวันอื่น)"',
        thinkingSteps: [
          'ขั้นที่ 1 (ส่วน ก. — Use Case Actors & Boundary): วางกรอบระบบ e-QLands; วาง Primary Actors (ประชาชน, เจ้าหน้าที่สาขา) ด้านซ้าย และ Secondary Actor (ระบบ ThaID) ด้านขวา',
          'ขั้นที่ 2 (ส่วน ก. — Include vs Extend): "จองคิว" และ "ยกเลิกคิว" ต้องยืนยันตัวตน ThaID เสมอ → ลาก «include» ชี้ออกจากตัวหลักไปหา "ยืนยันตัวตน ThaID" | ส่วน "แนบเอกสารล่วงหน้า" เป็นทางเลือกเสริม → ลาก «extend» ชี้จากตัวเสริมกลับมาหา "จองคิว"',
          'ขั้นที่ 3 (ส่วน ข. — Sequence Participants): เรียงซ้าย→ขวา: Citizen (ประชาชน) → WebUI (หน้าเว็บ e-QLands) → QueueAPI → QueueDB',
          'ขั้นที่ 4 (ส่วน ข. — แสดง 2 กรณีด้วย alt/else): หลังจาก QueueAPI คิวรีช่วงเวลาว่างจาก QueueDB และส่งให้ผู้ใช้กดยืนยัน ให้ใช้กรอบ alt เมื่อจองคิว (กรณีคิวว่าง → บันทึก DB → คืนบัตรคิว QR) และ else (กรณีคิวเต็ม → แจ้งให้เลือกวันหรือสาขาใหม่)',
          'ขั้นที่ 5 (ตรวจทิศลูกศร Return): ใช้เส้นทึบ ->> ส่งคำขอ และเส้นประ -->> ส่งผลลัพธ์กลับเสมอ อย่าให้ Citizen คุยตรงกับ DB!'
        ],
        solutionMermaid: `sequenceDiagram
  autonumber
  actor Citizen as ประชาชน
  participant Web as หน้าเว็บ e-QLands
  participant API as Queue API Server
  participant DB as ฐานข้อมูลคิวและแปลง

  Citizen->>+Web: เลือกสำนักงานที่ดินและวันที่นัดหมาย
  Web->>+API: ขอข้อมูลช่วงเวลาคิวว่าง
  API->>+DB: คิวรีจำนวนคิวคงเหลือตามวันที่
  DB-->>-API: คืนรายการช่วงเวลาที่เปิดรับ
  API-->>-Web: แสดงตารางช่วงเวลาให้ผู้ใช้เลือก

  Citizen->>Web: เลือกเวลาและกดยืนยันการจองคิว
  Web->>+API: ส่งคำขอบันทึกการจอง (เลขบัตร, รหัสเวลา)
  API->>+DB: ตรวจสอบโควตาคิวล่าสุดอีกครั้ง

  alt ยังมีคิวว่างอยู่
    DB-->>API: ยืนยันมีที่ว่างพร้อมบันทึก
    API->>DB: บันทึกรายการนัดหมายและสร้างเลขคิว
    DB-->>API: บันทึกสำเร็จ
    API-->>Web: ส่งเลขที่คิวและข้อมูล QR Code
    Web-->>Citizen: แสดงบัตรคิวอิเล็กทรอนิกส์สำเร็จ
  else คิวช่วงเวลานั้นเต็มพอดี
    DB-->>-API: แจ้งโควตาเต็มแล้ว
    API-->>-Web: ส่งรหัสแจ้งเตือนคิวเต็ม
    Web-->>-Citizen: แสดงข้อความขออภัยและให้เลือกเวลาใหม่
  end`,
        secondaryMermaid: {
          title: 'ส่วน ก. Use Case Diagram: ระบบจองคิว e-QLands (เช็กทิศลูกศร «include» กับ «extend»)',
          caption: 'สังเกต: «include» ชี้จาก จองคิว/ยกเลิกคิว → ยืนยันตัวตน ThaID ส่วน «extend» ชี้จาก แนบเอกสารล่วงหน้า → กลับไปที่ จองคิว',
          code: `flowchart LR
  CIT["Actor: ประชาชน"]
  STAFF["Actor: เจ้าหน้าที่สาขา"]

  subgraph EQL["System Boundary: ระบบจองคิว e-QLands"]
    direction TB
    UC_BOOK(["จองคิวนัดหมาย"])
    UC_CANCEL(["ยกเลิกคิวนัดหมาย"])
    UC_AUTH(["ยืนยันตัวตน ThaID"])
    UC_DOC(["แนบเอกสารล่วงหน้า"])
    UC_CHECK(["ตรวจสอบคิวและเอกสาร"])

    UC_BOOK -.->|"«include» ต้องทำเสมอ"| UC_AUTH
    UC_CANCEL -.->|"«include» ต้องทำเสมอ"| UC_AUTH
    UC_DOC -.->|"«extend» ทางเลือกเสริม"| UC_BOOK
  end

  THAID["«system» ระบบ ThaID"]

  CIT --- UC_BOOK
  CIT --- UC_CANCEL
  STAFF --- UC_CHECK
  UC_AUTH --- THAID`
        },
        solutionExplanation:
          '<p>ข้อสอบข้อนี้วัดความแม่นยำของ UML 2 ตัวพร้อมกัน:</p>' +
          '<ul>' +
          '<li><strong>ใน Use Case:</strong> ทั้ง <code>จองคิว</code> และ <code>ยกเลิกคิว</code> ต่างเรียกใช้ <code>ยืนยันตัวตน ThaID</code> แบบบังคับ (<code>&lt;&lt;include&gt;&gt;</code>) ทำให้ไม่จำเป็นต้องวาดขั้นตอนพิสูจน์ตัวตนซ้ำซ้อน ส่วน <code>แนบเอกสารล่วงหน้า</code> ชี้กลับไปที่ <code>จองคิว</code> ด้วย <code>&lt;&lt;extend&gt;&gt;</code></li>' +
          '<li><strong>ใน Sequence:</strong> ใช้การตรวจคิวซ้ำในจังหวะกดยืนยัน พร้อมแยกทางเลือกด้วยบล็อก <code>alt / else</code> อย่างเป็นระบบ เพื่อป้องกันปัญหา <em>Race Condition</em> กรณีมีผู้กดจองพร้อมกัน 2 คนในคิวสุดท้าย</li>' +
          '</ul>',
        rubric: [
          'Use Case: วาง Actor ทั้งประชาชน เจ้าหน้าที่ และระบบ ThaID ไว้นอกกรอบ System Boundary',
          'Use Case: หัวลูกศร «include» ชี้จาก จองคิว/ยกเลิกคิว ไปหา ยืนยันตัวตน ThaID ถูกต้อง',
          'Use Case: หัวลูกศร «extend» ชี้จาก แนบเอกสารล่วงหน้า กลับไปหา จองคิว ถูกต้อง',
          'Sequence: เรียง Participant ตามลำดับชั้น (Citizen → Web → API → DB) ไม่ข้ามขั้นไปคุย DB ตรงๆ',
          'Sequence: ใช้บล็อก alt/else แสดงทั้งกรณีคิวว่าง (บันทึกและออก QR) และคิวเต็ม (แจ้งเลือกใหม่)'
        ]
      },
      {
        id: 'exam-5-sysarch-462',
        number: 5,
        categoryId: 'sysarch',
        title: 'ข้อเขียนที่ 5: ออกแบบสถาปัตยกรรมระบบจดทะเบียนออนไลน์ต่างสำนักงาน เชื่อมโยง 462 สาขา',
        diagramType: 'System Architecture',
        scoreWeight: '25 คะแนน',
        difficulty: 'สูง (ระดับวิเคราะห์-ออกแบบ)',
        promptText:
          'กรมที่ดินต้องการเปิดให้บริการ "จดทะเบียนสิทธิและนิติกรรมออนไลน์ต่างสำนักงาน" ที่เชื่อมโยงข้อมูลโฉนดและสารบบจากฐานข้อมูลกลางให้เจ้าหน้าที่ทั้ง 462 สาขาทั่วประเทศ และประชาชนผ่านอินเทอร์เน็ตใช้งานพร้อมกันได้อย่างต่อเนื่อง โดยมีเงื่อนไขสำคัญดังนี้:\n' +
          '1) รองรับการใช้งานพร้อมกันสูง ไม่ล่มจากจุดเดียว (High Availability) และค้นหาข้อมูลแผนที่ได้รวดเร็วโดยไม่หน่วงการบันทึกข้อมูล\n' +
          '2) ป้องกันการโจมตีทางเว็บ (DDoS, SQL Injection, XSS) และห้ามให้บุคคลภายนอกเข้าถึงฐานข้อมูลได้โดยตรง\n' +
          '3) สำนักงานที่ดิน 462 แห่งทั่วประเทศเชื่อมต่อกับศูนย์ข้อมูลกลางอย่างปลอดภัยและมีเส้นทางสำรอง\n' +
          '4) ต้องรองรับการกู้คืนระบบจากภัยพิบัติ (DR) และปฏิบัติตาม พ.ร.บ.คอมพิวเตอร์ฯ 2560 (เก็บ Log >= 90 วัน) รวมถึง PDPA 2562\n' +
          'คำสั่ง: จงวาดแผนภาพสถาปัตยกรรมระบบและเครือข่าย (System Architecture Diagram) พร้อมอธิบายเหตุผลการออกแบบ',
        thinkingSteps: [
          'ขั้นที่ 1 (วาง 2 ช่องทางเข้าถึง): ฝั่งซ้ายบนรับประชาชนผ่านอินเทอร์เน็ต (TLS 1.3 → WAF/Anti-DDoS → Perimeter FW) ส่วนฝั่งล่างรับเจ้าหน้าที่ 462 สาขาผ่าน MPLS/IPSec VPN เข้ารหัส พร้อม SD-WAN/4G สำรอง',
          'ขั้นที่ 2 (ออกแบบ DMZ อย่างปลอดภัย): วางเฉพาะ Load Balancer และ Reverse Proxy / API Gateway ใน DMZ กั้นด้วย Perimeter Firewall (หน้า) และ Internal Firewall + IPS (หลัง) — ห้ามวาง App หลักหรือ DB ใน DMZ!',
          'ขั้นที่ 3 (แยก Performance & HA): ใช้ App Server Cluster (หลาย Node) + Auth (ThaID/MFA/RBAC) และแยกฐานข้อมูลเป็น Primary DB (รับงานเขียนนิติกรรม) + Read Replica (รับงานค้นหา GIS/แผนที่) แบบ Failover อัตโนมัติ',
          'ขั้นที่ 4 (วาง Backup 3-2-1 & DR Site): เชื่อม Primary DB ไปยัง Backup 3-2-1 (Immutable Backup ป้องกัน Ransomware) และส่งข้อมูลสำเนาแบบเข้ารหัสไปศูนย์สำรองต่างพื้นที่ (DR Site)',
          'ขั้นที่ 5 (Compliance กฎหมายไทย): เพิ่มส่วน Central SIEM / Syslog Server ที่ซิงก์เวลา NTP และเก็บ Log จราจรไม่น้อยกว่า 90 วัน (พ.ร.บ.คอมฯ ม.26) พร้อมมาตรการ PDPA (AES-256, TLS 1.3, Masking, RBAC)'
        ],
        solutionMermaid: `flowchart LR
  subgraph PUB["ฝั่งประชาชน (Internet)"]
    USER["ประชาชน (Browser / App)"]
    EDGE["CDN + Anti-DDoS + WAF"]
    USER -->|"HTTPS TLS 1.3"| EDGE
  end

  FW_EXT["Perimeter Firewall"]

  subgraph DMZ["DMZ Zone"]
    LB["Load Balancer (HA)"]
    GW["API Gateway / Web Proxy"]
    LB --> GW
  end

  FW_INT["Internal Firewall + IPS"]

  subgraph CORE["Internal Network (ศูนย์ข้อมูลส่วนกลาง)"]
    direction TB
    APP["App & Transaction Cluster (Auto-Scale)"]
    AUTH["ThaID / MFA & RBAC"]
    DB_M[("Core DB Primary (Write)")]
    DB_R[("Read Replica (ค้นหา GIS/สารบบ)")]
    APP <--> AUTH
    APP -->|"Transaction (ACID)"| DB_M
    APP -->|"Read Query"| DB_R
    DB_M -->|"Replication"| DB_R
  end

  subgraph SEC_DR["Backup, DR & Compliance"]
    direction TB
    DR["DR Site (สำรองต่างพื้นที่) & 3-2-1 Immutable Backup"]
    SIEM["Central SIEM / Syslog (NTP + เก็บ Log 90 วัน พ.ร.บ.คอมฯ ม.26)"]
  end

  subgraph BR["สำนักงานที่ดิน 462 แห่งทั่วประเทศ"]
    OFF["462 สาขา (MPLS หลัก + IPSec VPN / SD-WAN สำรอง)"]
  end

  EDGE --> FW_EXT
  FW_EXT --> LB
  GW --> FW_INT
  FW_INT --> APP
  OFF -.->|"Encrypted Tunnel"| FW_INT
  DB_M -.->|"AES-256 Encrypted Sync"| DR
  FW_EXT -.->|"Log"| SIEM
  FW_INT -.->|"Log"| SIEM
  APP -.->|"PDPA Audit Log"| SIEM`,
        solutionExplanation:
          '<p>แนวทางการเขียนอธิบายประกอบแผนภาพในกระดาษคำตอบ (ควรเขียนแยก 4 หัวข้อย่อยให้กรรมการให้คะแนนง่าย):</p>' +
          '<ul>' +
          '<li><strong>1. Performance &amp; Scalability:</strong> ใช้ Load Balancer กระจายภาระไปยัง App Cluster และแยก <strong>Read Replica</strong> ออกมารับภาระการค้นหารูปแปลง/ราคาประเมิน เพื่อไม่ให้คิวรีอ่านจำนวนมากไปทำให้การจดทะเบียนนิติกรรม (Write) ช้าลง</li>' +
          '<li><strong>2. High Availability &amp; Disaster Recovery:</strong> ปิดจุดอ่อน Single Point of Failure ด้วยการมี Cluster หลายเครื่อง, ลิงก์สำรอง SD-WAN ที่สาขา, Backup ตามกฎ <strong>3-2-1 (แบบ Immutable กัน Ransomware)</strong> และศูนย์สำรอง DR Site</li>' +
          '<li><strong>3. Cybersecurity (Defense in Depth):</strong> กรอง DDoS และ OWASP Top 10 (SQLi/XSS) ด้วย WAF → กั้น DMZ ด้วย Perimeter Firewall → กั้นชั้นในด้วย Internal Firewall + IPS เพื่อไม่ให้คนนอกถึงฐานข้อมูลโดยตรง และยืนยันตัวตนเจ้าหน้าที่ด้วย MFA + สิทธิ์ RBAC</li>' +
          '<li><strong>4. Legal Compliance:</strong> เก็บข้อมูลจราจรคอมพิวเตอร์ (Log) รวมศูนย์ผ่าน NTP ไม่น้อยกว่า <strong>90 วัน</strong> ตามมาตรา 26 แห่ง พ.ร.บ.คอมพิวเตอร์ฯ 2560 และคุ้มครองข้อมูลส่วนบุคคลตาม <strong>PDPA 2562</strong> ด้วยการเข้ารหัส AES-256 (At-Rest) และ TLS 1.3 (In-Transit)</li>' +
          '</ul>',
        rubric: [
          'แบ่งโซนเครือข่ายชัดเจน (Edge/WAF → DMZ → Internal App → Core DB) และไม่วาง Database ใน DMZ',
          'มีกลไก HA และประสิทธิภาพครบ (Load Balancer + App Cluster + Core DB & Read Replica)',
          'ระบุท่อเชื่อมต่อปลอดภัยสำหรับ 462 สาขา (MPLS / IPSec VPN พร้อมลิงก์สำรอง)',
          'มีแผนสำรองข้อมูลและกู้คืนภัยพิบัติ (Backup 3-2-1 / DR Site)',
          'ระบุข้อกำหนดกฎหมายไทยครบทั้ง พ.ร.บ.คอมฯ ม.26 (Log >= 90 วัน + NTP) และ PDPA (เข้ารหัส + RBAC)'
        ]
      },
      {
        id: 'exam-6-debug-diagrams',
        number: 6,
        categoryId: 'sysarch',
        title: 'ข้อเขียนที่ 6: จับผิดแผนภาพที่ผิดมาตรฐาน (Diagram Error Hunt 5 จุดยอดฮิต)',
        diagramType: 'จับผิดแผนภาพ (Diagram Audit)',
        scoreWeight: '20 คะแนน',
        difficulty: 'ปราบเซียน (ทบทวนทุกกฎ)',
        promptText:
          'นักวิเคราะห์ระบบมือใหม่ส่งแบบแปลนระบบคำขอรังวัดและการจองคิวออนไลน์ให้คุณตรวจ แต่มี "ข้อผิดพลาดเชิงมาตรฐาน" ซ่อนอยู่ 5 จุดต่อไปนี้ จงระบุว่าแต่ละข้อผิดกฎอะไร ทำไมถึงผิด และต้องแก้ไขอย่างไร:\n' +
          '• [จุดที่ 1 - Flowchart] เขียนกล่องสี่เหลี่ยมผืนผ้าข้อความว่า "จำนวนเงิน >= 0 ?" แล้วลากเส้น 2 เส้นออกมาโดยไม่เขียนป้ายกำกับเส้น\n' +
          '• [จุดที่ 2 - DFD Level 0] วาด Process 0 ก้อนเดียวตรงกลาง แต่มีกล่อง D1 ทะเบียนคิว ต่อเส้นตรงเข้าหา External Entity "ประชาชน" เพื่อให้ประชาชนเข้าไปแก้คิวเอง\n' +
          '• [จุดที่ 3 - ERD] วาดตาราง STUDENT และ COURSE เชื่อมกันแบบ M:N เฉยๆ และในตาราง LAND_PLOT เก็บทั้ง office_id (FK) กับ office_province ไว้ในตารางเดียวกัน\n' +
          '• [จุดที่ 4 - Use Case] วาด Actor "ประชาชน" ไว้ในกรอบสี่เหลี่ยม System Boundary และลากเส้น «extend» ชี้จาก "จองคิวออนไลน์" ไปยัง "แจ้งเตือนผ่าน SMS"\n' +
          '• [จุดที่ 5 - System Architecture] นำ Database Server ไปวางรวมกับ Web Server ในโซน DMZ เพื่อให้เชื่อมต่อกันเร็วขึ้น และไม่ได้เก็บ Log ในระบบ',
        thinkingSteps: [
          'จุดที่ 1 (Flowchart): เช็ก 2 เรื่องในประโยคเดียว — (ก) รูปทรงผิด (เงื่อนไขต้องเป็นข้าวหลามตัด ไม่ใช่ผืนผ้า) และ (ข) ขาดป้ายกำกับ "ใช่ / ไม่ใช่" บนลูกศรขาออก',
          'จุดที่ 2 (DFD Level 0): ผิดซ้อน 2 กฎ — (ก) Level 0 ห้ามมี Data Store เด็ดขาด และ (ข) ห้าม Data Store ต่อตรงเข้าหา External Entity โดยไม่ผ่าน Process',
          'จุดที่ 3 (ERD & 3NF): ผิด 2 เรื่อง — (ก) ปล่อย M:N ค้างไม่แตก Junction Table และ (ข) office_province ขึ้นกับ office_id ไม่ใช่ plot_id (Transitive Dependency ผิดกฎ 3NF)',
          'จุดที่ 4 (Use Case): ผิด 2 เรื่อง — (ก) Actor ต้องอยู่นอกกรอบ System Boundary และ (ข) «extend» หัวลูกศรชี้กลับทาง (ต้องชี้จากตัวเสริม แจ้งเตือน SMS → กลับมาหา จองคิวออนไลน์)',
          'จุดที่ 5 (System Architecture): ผิด 2 เรื่อง — (ก) ห้ามวาง DB ใน DMZ เพราะเสี่ยงโดนเจาะฐานข้อมูลโดยตรง และ (ข) ไม่เก็บ Log ขัดต่อ พ.ร.บ.คอมพิวเตอร์ฯ ม.26 (ต้องเก็บ >= 90 วัน)'
        ],
        solutionMermaid: `flowchart LR
  subgraph FIX1["แก้ไขจุดที่ 1: Flowchart"]
    F1_DEC{"จำนวนเงิน ตั้งแต่ 0?"} -->|"ใช่ (True)"| F1_OK["ดำเนินการต่อ"]
    F1_DEC -->|"ไม่ใช่ (False)"| F1_ERR[/"แจ้งข้อมูลผิดพลาด"/]
  end

  subgraph FIX2["แก้ไขจุดที่ 2: DFD Level 0 & 1"]
    D_CIT["External Entity: ประชาชน"] <-->|"ผ่าน Process เสมอ"| D_PROC["1.0 จัดการคิว"]
    D_PROC <--> D_DB[("D1 ทะเบียนคิว (เฉพาะ Lv.1)")]
  end

  subgraph FIX3["แก้ไขจุดที่ 3: ERD & 3NF"]
    E_S["ENTITY_A"] --> E_J["JUNCTION_TABLE (PK, FK)"]
    E_C["ENTITY_B"] --> E_J
  end

  subgraph FIX4["แก้ไขจุดที่ 4: Use Case"]
    U_CIT["Actor (อยู่นอกกรอบ)"] --- U_MAIN(["จองคิวออนไลน์"])
    U_SMS(["แจ้งเตือน SMS"]) -.->|"«extend» ชี้กลับตัวหลัก"| U_MAIN
  end

  subgraph FIX5["แก้ไขจุดที่ 5: System Arch"]
    A_DMZ["DMZ (Web/API เท่านั้น)"] -->|"ผ่าน Internal FW"| A_INT["Internal (App + DB)"]
    A_INT -.->|"เก็บ Log อย่างน้อย 90 วัน"| A_LOG["SIEM / Syslog"]
  end`,
        solutionExplanation:
          '<p>สรุปคำตอบฉบับกระชับสำหรับเขียนส่งในห้องสอบทั้ง 5 จุด:</p>' +
          '<ol>' +
          '<li><strong>จุดที่ 1 (Flowchart):</strong> ผิด 2 ข้อคือ (1) ใช้สี่เหลี่ยมผืนผ้าแทนการตัดสินใจ ต้องเปลี่ยนเป็น <strong>สี่เหลี่ยมข้าวหลามตัด (Decision)</strong> และ (2) ต้องเขียนป้ายกำกับทิศทาง <strong>"ใช่ / ไม่ใช่" (True / False)</strong> ออกจากเส้นทั้งสองทาง</li>' +
          '<li><strong>จุดที่ 2 (DFD Level 0):</strong> ผิด 2 ข้อคือ (1) <strong>ห้ามมี Data Store ใน Context Diagram (Level 0)</strong> ต้องย้ายไป Level 1 และ (2) <strong>ห้าม Data Store ต่อตรงกับ External Entity</strong> ข้อมูลต้องวิ่งผ่าน Process เพื่อตรวจสิทธิ์และความถูกต้องเสมอ</li>' +
          '<li><strong>จุดที่ 3 (ERD &amp; 3NF):</strong> ผิด 2 ข้อคือ (1) ต้องแตกความสัมพันธ์ <strong>M:N เป็น Junction Table</strong> และ (2) คอลัมน์ <code>office_province</code> ในตาราง <code>LAND_PLOT</code> ก่อให้เกิด <strong>Transitive Dependency (ผิด 3NF)</strong> เพราะขึ้นกับ <code>office_id</code> จึงต้องย้ายไปอยู่ในตาราง <code>LAND_OFFICE</code></li>' +
          '<li><strong>จุดที่ 4 (Use Case):</strong> ผิด 2 ข้อคือ (1) <strong>Actor ต้องวางอยู่นอกกรอบ System Boundary</strong> และ (2) เส้น <code>&lt;&lt;extend&gt;&gt;</code> ชี้ผิดทิศ ต้องชี้หัวลูกศร <strong>จาก Use Case เสริม (แจ้งเตือน SMS) → กลับมาหา Use Case หลัก (จองคิวออนไลน์)</strong></li>' +
          '<li><strong>จุดที่ 5 (System Architecture):</strong> ผิด 2 ข้อคือ (1) <strong>ห้ามวาง Database ใน DMZ</strong> ต้องแยก DB ไว้ในโซนเครือข่ายภายในหลัง Internal Firewall/IPS เพื่อป้องกันการโจมตีโดยตรง และ (2) การไม่เก็บ Log ผิด <strong>มาตรา 26 แห่ง พ.ร.บ.คอมพิวเตอร์ฯ 2560</strong> ซึ่งบังคับเก็บ Log ไม่น้อยกว่า 90 วันเพื่อใช้ตรวจสอบย้อนหลังเมื่อเกิดเหตุ</li>' +
          '</ol>',
        rubric: [
          'จุดที่ 1: ระบุครบทั้งการเปลี่ยนเป็นรูปข้าวหลามตัด และการใส่ป้ายกำกับ ใช่/ไม่ใช่',
          'จุดที่ 2: ระบุครบทั้งห้ามมี Data Store ใน Level 0 และห้าม Entity ต่อตรง Data Store',
          'จุดที่ 3: ระบุครบทั้งการแตก M:N เป็น Junction Table และการแยก office_province ออกเพื่อแก้ Transitive Dependency (3NF)',
          'จุดที่ 4: ระบุครบทั้งการย้าย Actor ไว้นอกกรอบ และการกลับหัวลูกศร «extend» จากตัวเสริม → ตัวหลัก',
          'จุดที่ 5: ระบุครบทั้งการย้าย DB ออกจาก DMZ ไปหลัง Internal Firewall และการเก็บ Log >= 90 วันตาม พ.ร.บ.คอมฯ ม.26'
        ]
      }
    ]
  };

  global.GOV_PREP = global.GOV_PREP || {};
  global.GOV_PREP.diagramsGuide = diagramsGuide;
})(window);
