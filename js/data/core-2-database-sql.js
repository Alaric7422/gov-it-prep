(function (global) {
  'use strict';

  if (!global.GOV_PREP || typeof global.GOV_PREP.registerLesson !== 'function') {
    console.error('[CORE-02] GOV_PREP.registerLesson not found');
    return;
  }

  global.GOV_PREP.registerLesson({
    id: 'core-2-database-sql',
    code: 'CORE-02',
    category: 'core',
    agencyId: null,
    order: 2,
    title: 'ระบบฐานข้อมูลเชิงสัมพันธ์ Normalization ER-Diagram และ SQL',
    shortTitle: 'ฐานข้อมูล & SQL',
    subtitle: 'ปูพื้นตั้งแต่ศูนย์: ฐานข้อมูลต่างจาก Excel อย่างไร, Table/NULL, Keys ทุกชนิด, Transaction & ACID, อ่าน ER Diagram & แตก M:N, Normalization 1NF-3NF และฝึกเขียน SQL JOIN จริง',
    estimatedMinutes: 22,
    icon: 'fa-solid fa-database',
    heroVisual: {
      image: 'assets/images/core-database-erd.png',
      alt: 'แผนภาพระบบฐานข้อมูลเชิงสัมพันธ์แสดงตารางทะเบียนที่ดิน สำนักงาน และผู้ถือกรรมสิทธิ์เชื่อมโยงด้วย Primary Key และ Foreign Key',
      caption: 'โครงสร้างฐานข้อมูลเชิงสัมพันธ์ (RDBMS): แยกข้อมูลเป็นตารางอิสระแล้วเชื่อมด้วยกุญแจหลักและกุญแจนอก เพื่อความแม่นยำและไม่ซ้ำซ้อน',
      aspectRatio: '16 / 9',
      width: 1200,
      height: 675,
      prompt: 'Clean flat isometric tech illustration in Cadastral GIS & Tech Studio palette (emerald #0F5E4D, amber #D97706, off-white #F4F7F6). Relational database entity-relationship diagram floating like crisp blueprint cards: LAND_OFFICE, USER, LAND_PLOT, and TRANSACTION tables connected by glowing golden key icons (PK and FK) and structured 1:N crow-foot lines. Subtle cadastral map grid lines in the background. Clean modern educational style.'
    },
    summaryTakeaways: [
      'NULL ไม่ใช่เลข 0 และไม่ใช่ข้อความว่าง "" แต่หมายถึง "ไม่ทราบค่า/ยังไม่มีข้อมูล" จึงต้องตรวจสอบด้วย IS NULL ห้ามใช้ = NULL',
      'ลำดับคีย์: Super Key (ระบุแถวได้ไม่ซ้ำ) → Candidate Key (Super Key ที่เล็กสุด) → Primary Key (เลือกใช้ 1 ชุด, ห้ามซ้ำ, ห้าม NULL) และ Foreign Key (เชื่อมตารางรักษา Referential Integrity)',
      'Transaction ใช้ COMMIT (ยืนยันถาวร) และ ROLLBACK (ย้อนกลับทั้งหมด) ภายใต้กฎ ACID: Atomicity, Consistency, Isolation, Durability',
      'ใน ER Diagram ความสัมพันธ์ M:N ไม่สามารถสร้างใน RDBMS ตรงๆ ได้ ต้องแตกเป็นตารางเชื่อมกลาง (Junction Table) เพื่อเปลี่ยนเป็น 1:N สองข้างเสมอ',
      'Normalization แก้ปัญหา Insert/Update/Delete Anomaly: 1NF = ค่าเป็น Atomic ไม่มีกลุ่มซ้ำ, 2NF = ปลอด Partial Dependency, 3NF = ปลอด Transitive Dependency',
      'ลำดับการทำงานจริงของ SQL คือ FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY → LIMIT (WHERE กรองแถวก่อนจัดกลุ่ม, HAVING กรองกลุ่มหลังรวมผล)'
    ],
    sections: [
      {
        id: 'rdbms-keys',
        title: '1. หัวใจของ RDBMS, ชนิดของ Keys และคุณสมบัติ ACID',
        analogyBox: {
          title: 'เปรียบเทียบให้เห็นภาพ: ตู้ทะเบียนราษฎร์ที่เชื่อมกันด้วยเลขรหัส + ภารกิจโอนเงิน/โอนที่ดิน',
          body: 'หากสำนักงานจดทะเบียนพิมพ์ <em>ชื่อ-ที่อยู่-เบอร์โทรเจ้าของที่ดิน</em> ซ้ำลงไปในแฟ้มโฉนดทุกแปลงเวลาโอน พอเจ้าของย้ายบ้านครั้งเดียว เจ้าหน้าที่ต้องตามแก้แฟ้มเป็นร้อยเล่มและมีโอกาสตกหล่นเพี้ยนสูงมาก!<br>แนวคิดของ <strong>RDBMS (Relational Database Management System)</strong> คือแยกเก็บข้อมูล <strong>"คน"</strong> ไว้ที่แฟ้ม <code>users</code> เพียงที่เดียว (มีเลขรหัสประจำตัวไม่ซ้ำ = <strong>Primary Key</strong>) แล้วแฟ้ม <code>land_plots</code> แค่อ้างอิงเลขรหัสนั้นมาใช้ (<strong>Foreign Key</strong>) แก้ที่อยู่จุดเดียว ข้อมูลอัปเดตถูกต้องตรงกันทั้งระบบครับ'
        },
        bodyHtml: `
<h3>1.1 Database และ DBMS / RDBMS คืออะไร? ทำไมไม่ใช้แค่ Excel เก็บข้อมูล?</h3>
<ul>
  <li><strong>Database (ฐานข้อมูล):</strong> คือแหล่งเก็บรวบรวมข้อมูลที่มีความสัมพันธ์กันอย่างเป็นระบบ เพื่อให้ค้นหา แก้ไข และนำมาใช้วิเคราะห์ได้รวดเร็ว</li>
  <li><strong>DBMS (Database Management System):</strong> คือ "ซอฟต์แวร์บรรณารักษ์" ที่ทำหน้าที่บริหารจัดการฐานข้อมูล ตรวจสิทธิ์ ควบคุมการแก้ไขพร้อมกัน และสำรองกู้คืนข้อมูล</li>
  <li><strong>RDBMS (Relational DBMS):</strong> คือ DBMS ชนิดที่จัดเก็บข้อมูลในรูปแบบ<strong>ตารางสองมิติ (Tables)</strong> ที่เชื่อมโยงกันได้ด้วยคีย์ (เช่น <em>PostgreSQL, MySQL, Oracle, SQL Server, SQLite</em>) ซึ่งเป็นมาตรฐานหลักของระบบงานภาครัฐ</li>
</ul>
<p>คำถามยอดฮิตของมือใหม่คือ <strong>"ในเมื่อ Excel ก็เป็นตารางเหมือนกัน ทำไมหน่วยงานไม่ใช้ Excel เก็บข้อมูลทั้งหมด?"</strong> คำตอบมี 4 ข้อสำคัญครับ:</p>
<ol>
  <li><strong>การทำงานพร้อมกันหลายคน (Multi-user &amp; Locking):</strong> ถ้าเจ้าหน้าที่ 462 สาขาเปิดแก้ไฟล์ Excel เดียวกันพร้อมกัน ไฟล์จะชนกันหรือพัง แต่ RDBMS มีระบบล็อกระดับแถว (Row-level Locking) ให้คนหลายพันคนอ่าน-เขียนพร้อมกันได้</li>
  <li><strong>การบังคับความถูกต้องอัตโนมัติ (Data Integrity):</strong> ใน Excel ใครจะพิมพ์ตัวอักษรใส่ช่องราคา หรือพิมพ์รหัสสำนักงานที่ไม่มีอยู่จริงก็ได้ แต่ RDBMS มีกฎ <em>Constraints</em> (<code>PRIMARY KEY</code>, <code>FOREIGN KEY</code>, <code>NOT NULL</code>, <code>CHECK</code>) คอยดักจับทันทีก่อนบันทึก</li>
  <li><strong>ความเร็วกับข้อมูลหลักล้านแถว (Indexing):</strong> Excel ที่มีข้อมูล 500,000+ แถวจะเปิดอืดหรือค้าง แต่ RDBMS มีดัชนี (<em>Index</em>) ช่วยค้นหาเจอภายในเสี้ยววินาที</li>
  <li><strong>ความปลอดภัยและกู้คืน (Security &amp; Recovery):</strong> RDBMS กำหนดสิทธิ์แยกตามตาราง/ผู้ใช้ และมีระบบ Transaction Log ช่วยกู้ข้อมูลเมื่อไฟดับกลางคันได้</li>
</ol>

<h3>1.2 โครงสร้างตาราง, Data Types และความหมายที่แท้จริงของ <code>NULL</code></h3>
<p>ในภาษาวิชาการฐานข้อมูล คำศัพท์ของตารางจะเรียกได้หลายชื่อ (ข้อสอบชอบสลับคำเรียกมาหลอก!):</p>
<ul>
  <li><strong>Table = Relation:</strong> ตารางเก็บข้อมูลเรื่องเดียวกัน (เช่น ตาราง <code>land_plots</code>)</li>
  <li><strong>Row = Record = Tuple:</strong> ข้อมูล 1 แถวในแนวนอน (แทนสิ่งของหรือเหตุการณ์ 1 รายการ เช่น โฉนด 1 แปลง)</li>
  <li><strong>Column = Field = Attribute:</strong> หัวข้อคุณสมบัติในแนวตั้ง (เช่น <code>deed_no</code>, <code>appraised_price_per_wah</code>)</li>
  <li><strong>Data Types (ชนิดข้อมูล):</strong> การกำหนดประเภทของข้อมูลในแต่ละคอลัมน์เพื่อความแม่นยำและประหยัดพื้นที่ เช่น <code>INT</code> (จำนวนเต็ม), <code>NUMERIC / DECIMAL</code> (ตัวเลขทศนิยมที่ต้องการความเป๊ะ เช่น เงิน/พื้นที่ตารางวา), <code>VARCHAR / TEXT</code> (ข้อความ), <code>DATE / TIMESTAMP</code> (วันที่/เวลา), <code>BOOLEAN</code> (จริง/เท็จ)</li>
</ul>

<div class="callout callout-warn">
  <strong><i class="fa-solid fa-triangle-exclamation" aria-hidden="true"></i> ระวังโดนหลอก! <code>NULL</code> คืออะไร?</strong>
  <p style="margin-top:0.4rem; margin-bottom:0;"><strong><code>NULL</code> ไม่ใช่เลข <code>0</code> และไม่ใช่ข้อความว่าง <code>""</code></strong> แต่หมายถึง <strong>"ยังไม่ทราบค่า / ยังไม่ได้กรอกข้อมูล (Unknown / Missing)"</strong> เช่น ราคาประเมิน <code>0</code> บาท แปลว่าประเมินแล้วได้ 0 บาท แต่ราคาประเมิน <code>NULL</code> แปลว่า <em>ยังไม่มีผลการประเมิน</em>!<br>
  และใน SQL เรา<strong>ห้ามเขียน <code>WHERE price = NULL</code></strong> (จะได้ผลลัพธ์ว่างเปล่าเสมอ เพราะค่าที่ "ไม่รู้" เทียบเท่ากับ "ไม่รู้" ไม่ได้) ต้องเขียนว่า <strong><code>WHERE price IS NULL</code></strong> หรือ <strong><code>IS NOT NULL</code></strong> เท่านั้นครับ!</p>
</div>

<h3>1.3 เจาะลึก Keys ทุกชนิดทีละขั้นจากข้อมูลตัวอย่างจริง</h3>
<p>ลองดูตารางตัวอย่างเล็กๆ <code>PLOTS_SAMPLE</code> (4 แถว) ด้านล่างนี้ เพื่อทำความเข้าใจตั้งแต่ Super Key ไล่มาจนถึง Foreign Key แบบเห็นภาพชัดที่สุดครับ:</p>
<div class="table-wrap">
  <table>
    <caption>ตารางตัวอย่าง PLOTS_SAMPLE สำหรับไล่ดูชนิดของคีย์</caption>
    <thead>
      <tr>
        <th scope="col">plot_id</th>
        <th scope="col">deed_no</th>
        <th scope="col">office_id</th>
        <th scope="col">zone_type</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>101</td>
        <td>น.ส.4จ-500</td>
        <td>OF-01</td>
        <td>ที่อยู่อาศัย</td>
      </tr>
      <tr>
        <td>102</td>
        <td>น.ส.4จ-501</td>
        <td>OF-01</td>
        <td>พาณิชยกรรม</td>
      </tr>
      <tr>
        <td>103</td>
        <td>น.ส.4จ-500</td>
        <td>OF-02</td>
        <td>เกษตรกรรม</td>
      </tr>
      <tr>
        <td>104</td>
        <td>น.ส.4จ-888</td>
        <td>OF-02</td>
        <td>ที่อยู่อาศัย</td>
      </tr>
    </tbody>
  </table>
</div>
<p>สังเกตดูนะครับ: <code>deed_no</code> ตัวเดียวซ้ำได้ข้ามจังหวัด (<code>น.ส.4จ-500</code> มีทั้งที่ <code>OF-01</code> และ <code>OF-02</code>) และ <code>zone_type</code> ก็ซ้ำได้ (<code>ที่อยู่อาศัย</code> มี 2 แถว) ทีนี้มาไล่จับคู่คีย์ทีละขั้น:</p>
<ol>
  <li><strong>Super Key (คีย์ใหญ่ที่แยกแถวไม่ซ้ำ):</strong> คอลัมน์หรือกลุ่มคอลัมน์ใดๆ ที่รวมกันแล้วระบุแถวได้ไม่ซ้ำแน่นอน <em>แม้จะมีคอลัมน์ส่วนเกินติดมาด้วยก็ตาม</em> เช่น <code>{plot_id}</code>, <code>{plot_id, zone_type}</code>, <code>{deed_no, office_id}</code>, หรือแม้แต่เอาทุกคอลัมน์มารวมกันก็เป็น Super Key</li>
  <li><strong>Candidate Key (ตัวเต็งคีย์หลัก):</strong> คัดเฉพาะ Super Key ที่<strong>กะทัดรัดที่สุด (Minimal) ไม่มีคอลัมน์ส่วนเกิน</strong> จากตารางตัวอย่างจะได้ Candidate Key 2 ชุด คือ:
    <ul>
      <li>ชุดที่ 1: <code>plot_id</code> (แค่ตัวเดียวก็ไม่ซ้ำแล้ว — <code>{plot_id, zone_type}</code> ไม่ใช่ Candidate Key เพราะตัด <code>zone_type</code> ทิ้งได้!)</li>
      <li>ชุดที่ 2: <code>(deed_no, office_id)</code> (เลขโฉนด + สำนักงานที่ดิน 2 ตัวรวมกันจะไม่ซ้ำแน่นอน และตัดตัวใดตัวหนึ่งออกไม่ได้)</li>
    </ul>
  </li>
  <li><strong>Primary Key (PK — คีย์หลักตัวจริง):</strong> Candidate Key ที่นักออกแบบเลือกมาใช้เป็นตัวแทนแถว <strong>มีได้แค่ 1 ชุดต่อตาราง</strong> โดยมีกฎเหล็ก 2 ข้อคือ <strong>ห้ามซ้ำ (Unique)</strong> และ <strong>ห้ามว่าง (NOT NULL)</strong> ในตัวอย่างนี้เราเลือก <code>plot_id</code> เป็น PK</li>
  <li><strong>Alternate Key (คีย์สำรอง):</strong> Candidate Key ตัวที่เหลือที่<em>ไม่ได้</em>ถูกเลือกเป็น Primary Key ในตัวอย่างนี้ก็คือ <code>(deed_no, office_id)</code> (หรือในตาราง <code>users</code> ถ้าเลือก <code>user_id</code> เป็น PK เลขบัตรประชาชนก็จะเป็น Alternate Key)</li>
  <li><strong>Composite Key (คีย์รวม):</strong> Primary Key ที่เกิดจากการนำ <strong>2 คอลัมน์ขึ้นไปมัดรวมกัน</strong> เพราะคอลัมน์เดียวไม่พอจะไม่ซ้ำ เช่น ตารางรายการค่าธรรมเนียมย่อยในใบเสร็จ <code>TX_ITEMS</code> ที่มี <code>(tx_id, item_seq)</code> เป็น PK ร่วมกัน (ใบเสร็จ 101 มีรายการที่ 1, 2)</li>
  <li><strong>Foreign Key (FK — กุญแจนอก):</strong> คอลัมน์ในตารางลูกที่นำค่าไปอ้างอิงหา PK ของตารางแม่ เช่น <code>office_id</code> ในตาราง <code>land_plots</code> ชี้ไปหา <code>office_id</code> (PK) ในตาราง <code>land_offices</code></li>
</ol>

<div class="callout callout-info">
  <strong><i class="fa-solid fa-link" aria-hidden="true"></i> Referential Integrity ในทางปฏิบัติแปลว่าอะไร?</strong>
  <p style="margin-top:0.4rem; margin-bottom:0;"><strong>Referential Integrity (ความคงสภาพการอ้างอิง)</strong> คือกฎที่ห้าม Foreign Key อ้างถึงสิ่งที่ไม่มีอยู่จริงในตารางแม่ ส่งผลจริง 2 อย่างคือ:<br>
  1) <strong>ห้ามแทรกลูกเถื่อน:</strong> เราจะ <code>INSERT</code> แปลงที่ดินที่มี <code>office_id = 99</code> ไม่ได้ ถ้าในตาราง <code>land_offices</code> ไม่มีสำนักงานรหัส <code>99</code> อยู่จริง<br>
  2) <strong>ห้ามลบแม่ทิ้งดื้อๆ:</strong> เราจะ <code>DELETE</code> สำนักงาน <code>OF-01</code> ออกจาก <code>land_offices</code> ไม่ได้ หากยังมีแถวแปลงที่ดินชี้มาหา <code>OF-01</code> ค้างอยู่ (ยกเว้นกำหนดนโยบาย <code>ON DELETE CASCADE</code> หรือลบ/ย้ายแปลงลูกออกก่อน)</p>
</div>

<h3>1.4 Transaction, COMMIT / ROLLBACK และคุณสมบัติ ACID</h3>
<p><strong>Transaction (ทรานแซกชัน)</strong> คือกลุ่มของคำสั่ง SQL หลายคำสั่งที่ต้องถูกมัดรวมเสมือน <strong>"ภารกิจเดียว"</strong> เช่น เมื่อประชาชนมาจดทะเบียนโอนขายที่ดิน 1 แปลง ระบบต้องทำ 2 คำสั่งติดกัน: (1) <code>UPDATE land_plots</code> เปลี่ยน <code>owner_id</code> เป็นผู้ซื้อ และ (2) <code>INSERT INTO transactions</code> บันทึกประวัติ + ค่าธรรมเนียม</p>
<ul>
  <li><strong><code>COMMIT</code>:</strong> สั่งยืนยันให้บันทึกผลลัพธ์ของทุกคำสั่งใน Transaction นั้นลงฐานข้อมูลอย่างถาวร</li>
  <li><strong><code>ROLLBACK</code>:</strong> สั่งยกเลิกและย้อนกลับไปสภาพเดิมก่อนเริ่ม Transaction ทั้งหมด (ใช้เมื่อเกิด Error หรือยกเลิกรายการกลางทาง)</li>
</ul>
<p>เพื่อให้การโอนที่ดินหรือการเงินปลอดภัย 100% ฐานข้อมูล RDBMS ต้องมีคุณสมบัติ <strong>ACID</strong> ทั้ง 4 ข้อนี้:</p>
<ul>
  <li><strong>A — Atomicity (ความเป็นหนึ่งเดียว / All or Nothing):</strong> ต้องทำสำเร็จครบทุกคำสั่ง (<code>COMMIT</code>) หรือถ้าเกิดไฟดับ/พังระหว่างทางหลังเปลี่ยนชื่อเจ้าของไปแล้วแต่ยังไม่ออกใบเสร็จ ระบบต้องย้อนกลับ (<code>ROLLBACK</code>) คืนชื่อเจ้าของเดิมทั้งหมด จะไม่ยอมให้สำเร็จครึ่งๆ กลางๆ</li>
  <li><strong>C — Consistency (ความถูกต้องสอดคล้องตามกฎ):</strong> ก่อนและหลัง Transaction ข้อมูลต้องถูกต้องตามกฎ <em>Constraints</em> ทุกข้อเสมอ เช่น ค่าธรรมเนียมห้ามติดลบ, รหัส <code>owner_id</code> ต้องมีอยู่จริงในตาราง <code>users</code> หากผิดกฎระบบจะปฏิเสธทั้ง Transaction</li>
  <li><strong>I — Isolation (ความเป็นอิสระต่อกัน):</strong> แม้มีเจ้าหน้าที่ 500 คนใช้งานพร้อมกัน Transaction ของคนหนึ่งต้องไม่ไปแอบอ่านค่าที่ยังไม่ <code>COMMIT</code> ของอีกคน (ป้องกันปัญหา Dirty Read หรือแก้ไขทับกันจนยอดเพี้ยน)</li>
  <li><strong>D — Durability (ความคงทนถาวร):</strong> ทันทีที่ระบบตอบว่า <code>COMMIT</code> สำเร็จแล้ว ข้อมูลจะถูกเขียนลง Log/Storage อย่างถาวร ต่อให้เซิร์ฟเวอร์ปลั๊กหลุดดับวูบในวินาทีถัดไป ข้อมูลที่โอนสำเร็จแล้วก็ไม่มีวันหายครับ</li>
</ul>`
      },
      {
        id: 'er-diagram',
        title: '2. การออกแบบ ER Diagram และความสัมพันธ์ 1:1, 1:N, M:N',
        analogyBox: {
          title: 'เปรียบเทียบให้เห็นภาพ: พิมพ์เขียวสถาปนิกก่อนก่อสร้างบ้าน',
          body: 'ก่อนช่างจะก่ออิฐฉาบปูน (พิมพ์คำสั่ง <code>CREATE TABLE</code>) สถาปนิกต้องวาด<strong>พิมพ์เขียว (ER Diagram)</strong> ให้ดูทั้งภาพก่อนว่ามีห้องอะไรบ้าง (<strong>Entity</strong>) แต่ละห้องมีรายละเอียดอะไร (<strong>Attribute</strong>) และประตูเชื่อมห้องไหนต่อกับห้องไหนแบบ 1 ต่อ 1, 1 ต่อหลาย หรือหลายต่อหลาย (<strong>Relationship &amp; Cardinality</strong>) เพื่อไม่ให้สร้างฐานข้อมูลผิดทางจนต้องรื้อทำใหม่ครับ'
        },
        bodyHtml: `
<h3>2.1 ER Diagram คืออะไร? และองค์ประกอบ 3 อย่าง</h3>
<p><strong>ER Diagram (Entity-Relationship Diagram)</strong> คือแผนภาพจำลองโครงสร้างข้อมูลเชิงแนวคิดก่อนนำไปสร้างเป็นตารางจริง ประกอบด้วย 3 ส่วนหลัก:</p>
<ul>
  <li><strong>Entity (เอนทิตี):</strong> สิ่งของ บุคคล สถานที่ หรือเหตุการณ์ที่เราต้องการเก็บข้อมูล (เทียบเท่า <strong>1 ตาราง</strong>) เช่น <code>LAND_OFFICE</code>, <code>USER</code>, <code>LAND_PLOT</code>, <code>TRANSACTION</code></li>
  <li><strong>Attribute (แอตทริบิวต์):</strong> รายละเอียดหรือคุณสมบัติของ Entity นั้นๆ (เทียบเท่า <strong>คอลัมน์</strong>) เช่น <code>deed_no</code>, <code>province</code></li>
  <li><strong>Relationship (ความสัมพันธ์):</strong> เส้นเชื่อมแสดงความเกี่ยวข้องระหว่าง Entity พร้อมบอกจำนวนคู่สัมพันธ์ที่เรียกว่า <strong>Cardinality</strong></li>
</ul>

<h3>2.2 ความสัมพันธ์ 1:1, 1:N, M:N และวิธีอ่านสัญลักษณ์ Crow's Foot</h3>
<p>ในแผนภาพ ER มาตรฐาน (รวมถึงแผนภาพ Mermaid ด้านล่าง) นิยมใช้เส้นแบบ<strong>ตีนกา (Crow's Foot Notation)</strong> เพื่อบอกจำนวนขั้นต่ำและสูงสุดที่จับคู่กันได้:</p>
<ul>
  <li>ขีดแนวตั้งคู่ <code>||</code> = <strong>1 พอดี</strong> (หนึ่งและหนึ่งเท่านั้น)</li>
  <li>วงกลม + ขีด <code>|o</code> = <strong>0 หรือ 1</strong> (มีหรือไม่มีก็ได้ แต่ไม่เกิน 1)</li>
  <li>ขีด + ตีนกา <code>|{</code> = <strong>1 หรือมากกว่า</strong> (อย่างน้อย 1 ตัว)</li>
  <li>วงกลม + ตีนกา <code>o{</code> = <strong>0 หรือหลายตัว</strong> (ไม่มีเลยก็ได้ หรือมีหลายตัวก็ได้)</li>
</ul>
<p>ดังนั้นเมื่อเห็นเส้น <code>LAND_OFFICE ||--o{ LAND_PLOT</code> ให้อ่านจากซ้ายไปขวาว่า <em>"สำนักงานที่ดิน <strong>1 แห่ง</strong> ดูแลแปลงที่ดินได้ <strong>0 หรือหลายแปลง</strong>"</em> และอ่านย้อนจากขวาไปซ้ายว่า <em>"แปลงที่ดิน 1 แปลง สังกัดสำนักงานที่ดิน <strong>1 แห่งพอดี</strong>"</em> ครับ</p>

<p>กฎการแปลงความสัมพันธ์ทั้ง 3 แบบเป็นตารางจริงใน RDBMS จำง่ายๆ ดังนี้:</p>
<ul>
  <li><strong>1:1 (One-to-One):</strong> หนึ่งแถวของ A คู่กับไม่เกินหนึ่งแถวของ B (เช่น 1 แปลงที่ดิน มี 1 ชุดเอกสารสิทธิ์ต้นฉบับ/พิกัดเฉพาะ) → นำ PK ของฝั่งหนึ่งไปวางเป็น FK (แบบ Unique) ในอีกฝั่ง</li>
  <li><strong>1:N (One-to-Many):</strong> ความสัมพันธ์ยอดฮิตที่สุด — <strong>ให้นำ PK ของฝั่ง "1 (One)" ไปวางเป็น FK ในฝั่ง "N (Many)" เสมอ!</strong> เช่น 1 สำนักงาน (<code>land_offices</code>) ดูแลหลายแปลง (<code>land_plots</code>) จึงนำ <code>office_id</code> ไปวางเป็น FK ในตาราง <code>land_plots</code></li>
  <li><strong>M:N (Many-to-Many):</strong> เช่น 1 แปลงมีเจ้าของร่วมหลายคน และเจ้าของ 1 คนก็ถือโฉนดได้หลายแปลง ใน RDBMS ไม่สามารถยัด M:N ลงในตารางตรงๆ ได้ (ห้ามใส่ <code>owner_id = "1, 2"</code> ในช่องเดียว!) <strong>จึงต้องแตกเป็น "ตารางเชื่อมกลาง (Junction / Associative Table)" เสมอ</strong> เพื่อเปลี่ยน M:N เป็น 1:N สองข้างชนกัน</li>
</ul>

<h3>2.3 ตัวอย่างแบบเห็นภาพชัดๆ: การแตกความสัมพันธ์ M:N เป็น Junction Table</h3>
<p>สมมติโฉนด <code>plot_id = 1</code> มีผู้ถือกรรมสิทธิ์ร่วม 2 คนคือ <strong>นายสมชาย (user_id = 1)</strong> และ <strong>นางสาวพิมพ์ชนก (user_id = 2)</strong> คนละ 50% และนายสมชายยังถือโฉนด <code>plot_id = 2</code> อยู่ด้วย วิธีออกแบบที่ถูกต้องคือสร้างตารางเชื่อมกลางชื่อ <code>PLOT_OWNERS</code> ดังนี้ครับ:</p>
<div class="table-wrap">
  <table>
    <caption>ตัวอย่างตารางเชื่อมกลาง PLOT_OWNERS ที่แตกจากความสัมพันธ์ M:N ระหว่าง LAND_PLOTS กับ USERS</caption>
    <thead>
      <tr>
        <th scope="col">plot_id (PK, FK → LAND_PLOTS)</th>
        <th scope="col">user_id (PK, FK → USERS)</th>
        <th scope="col">share_percent</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>1 (น.ส.4จ-10452)</td>
        <td>1 (นายสมชาย ใจดี)</td>
        <td>50%</td>
      </tr>
      <tr>
        <td>1 (น.ส.4จ-10452)</td>
        <td>2 (นางสาวพิมพ์ชนก รักษ์ดิน)</td>
        <td>50%</td>
      </tr>
      <tr>
        <td>2 (น.ส.4จ-22891)</td>
        <td>1 (นายสมชาย ใจดี)</td>
        <td>100%</td>
      </tr>
    </tbody>
  </table>
</div>
<p>เห็นไหมครับว่า ตาราง <code>PLOT_OWNERS</code> ใช้ <code>(plot_id, user_id)</code> เป็น <strong>Composite Primary Key</strong> และแต่ละคอลัมน์ยังทำหน้าที่เป็น <strong>Foreign Key</strong> ชี้กลับไปหาตารางหลักทั้งสองข้าง กลายเป็นความสัมพันธ์ <code>LAND_PLOTS (1) ──&lt; PLOT_OWNERS (N)</code> และ <code>USERS (1) ──&lt; PLOT_OWNERS (N)</code> ที่สะอาดและสืบค้นด้วย SQL ได้อย่างแม่นยำครับ!</p>

<div class="callout callout-info">
  <strong><i class="fa-solid fa-circle-info" aria-hidden="true"></i> โครงสร้างตารางจริงในลานซ้อม SQL ของแพลตฟอร์มนี้:</strong>
  ด้านล่างคือแผนภาพ ER ของฐานข้อมูลจำลองกรมที่ดิน 4 ตาราง (<code>land_offices</code>, <code>users</code>, <code>land_plots</code>, <code>transactions</code>) ซึ่งใช้ความสัมพันธ์แบบ 1:N ทั้งหมด และคุณจะได้ลงมือรันคำสั่ง SQL จริงในหัวข้อถัดไปครับ!
</div>`,
        mermaid: {
          title: 'ER Diagram ระบบฐานข้อมูลทะเบียนที่ดิน (4 ตารางหลัก)',
          caption: 'เส้นแบบตีนกา (Crow-foot) แสดงความสัมพันธ์ 1:N จากสำนักงานและเจ้าของไปยังแปลงที่ดิน และจากแปลงที่ดินไปยังประวัติธุรกรรม',
          code: `erDiagram
  LAND_OFFICE ||--o{ LAND_PLOT : "ดูแล"
  USER ||--o{ LAND_PLOT : "ถือครอง"
  LAND_PLOT ||--o{ TRANSACTION : "มีนิติกรรม"

  LAND_OFFICE {
    int office_id PK "รหัสสำนักงาน"
    string office_name "ชื่อสำนักงานที่ดิน"
    string province "จังหวัด"
    string region "ภูมิภาค"
    int cross_office_ready "พร้อมโอนต่างสนง"
  }
  USER {
    int user_id PK "รหัสผู้ใช้"
    string full_name "ชื่อ-นามสกุล"
    string citizen_type "ประเภทบุคคล"
    string province "จังหวัด"
    int registered_year "ปีที่ลงทะเบียน"
  }
  LAND_PLOT {
    int plot_id PK "รหัสแปลง"
    string deed_no "เลขโฉนด"
    string deed_type "ประเภทเอกสารสิทธิ์"
    int office_id FK "รหัสสำนักงาน"
    int owner_id FK "รหัสเจ้าของ"
    int appraised_price_per_wah "ราคาประเมินต่อตร.ว."
  }
  TRANSACTION {
    int tx_id PK "รหัสธุรกรรม"
    int plot_id FK "รหัสแปลง"
    string tx_type "ประเภทนิติกรรม"
    string tx_date "วันที่ทำรายการ"
    int fee_amount "ค่าธรรมเนียม"
  }`
        }
      },
      {
        id: 'normalization',
        title: '3. Normalization (1NF → 2NF → 3NF) พร้อมตาราง Before / After',
        analogyBox: {
          title: 'เปรียบเทียบให้เห็นภาพ: แยกแฟ้มข้อมูลไม่ให้ซ้ำซ้อนและพังเวลาเพิ่ม/แก้/ลบ',
          body: '<strong>Normalization</strong> เหมือนการจัดระเบียบตู้เอกสารที่เคยเขียนทุกอย่างปนในแผ่นเดียว ให้แยกเป็นแฟ้มเฉพาะทางที่มีรหัสอ้างอิงเชื่อมกัน เพื่อป้องกันอาการข้อมูลเพี้ยน 3 อย่างที่เรียกว่า <strong>Anomalies</strong> ครับ!'
        },
        bodyHtml: `
<h3>3.1 Normalization คืออะไร? และปัญหา 3 Anomalies ถ้าไม่ทำ Normalization</h3>
<p><strong>Normalization</strong> คือกระบวนการจัดโครงสร้างตารางฐานข้อมูลตามกฎเป็นลำดับขั้น (1NF → 2NF → 3NF) เพื่อ<strong>ลดความซ้ำซ้อนของข้อมูล (Redundancy)</strong> และ<strong>ป้องกันความผิดปกติในการเพิ่ม-แก้ไข-ลบข้อมูล (Anomalies)</strong> หากเราออกแบบตารางเดียวเก็บทุกอย่างปนกันหมด จะเจอปัญหาทั้ง 3 ข้อนี้ทันที:</p>
<ul>
  <li><strong>1. Insert Anomaly (เพิ่มข้อมูลที่ควรเพิ่มได้ไม่ได้):</strong> สมมติกรมที่ดินเปิด <em>"สำนักงานที่ดินสาขาใหม่"</em> แต่ยังไม่มีแปลงที่ดินมาจดทะเบียนเลย หากเรามีตารางเดียวที่ใช้เลขโฉนด <code>deed_no</code> เป็น PK เราจะไม่สามารถบันทึกรหัสและชื่อสำนักงานใหม่เข้าไปในระบบได้ เพราะ PK ห้ามเป็น <code>NULL</code>!</li>
  <li><strong>2. Update Anomaly (แก้ไขข้อมูลไม่ครบแล้วขัดแย้งกัน):</strong> สมมติเจ้าของที่ดินชื่อ <em>"นายสมชาย ใจดี"</em> ถือครอง 200 แปลง แล้วไปจดทะเบียนเปลี่ยนชื่อ ถ้าเราเก็บชื่อซ้ำอยู่ในตารางโฉนดทั้ง 200 แถว แล้วตอนแก้เกิดผิดพลาดหรือเปลี่ยนไม่ครบ ระบบจะมีทั้งชื่อเก่าและชื่อใหม่ของคนเดียวกันปนกัน!</li>
  <li><strong>3. Delete Anomaly (ลบเรื่องหนึ่ง แต่อีกเรื่องหายตามไปด้วย):</strong> สมมติสำนักงานที่ดินสาขา A มีแปลงที่ดินเหลือในตารางแค่ 1 แปลง เมื่อเกิดการเวนคืนและลบแถวแปลงที่ดินนั้นออก ข้อมูลชื่อและจังหวัดของสำนักงานสาขา A ที่มีอยู่แถวเดียวก็จะถูกลบหายสาบสูญไปด้วย!</li>
</ul>

<h3>3.2 ปูศัพท์ 5 คำก่อนเริ่ม 1NF → 2NF → 3NF (เข้าใจ 5 คำนี้ ทำข้อสอบได้ทุกข้อ!)</h3>
<ol>
  <li><strong>Atomic Value (ค่าเชิงเดี่ยว/หน่วยย่อย):</strong> 1 ช่อง (Cell) ต้องเก็บข้อมูลเพียง <strong>1 ค่าเดียว</strong> เท่านั้น แตกย่อยเป็นรายการย่อยไม่ได้อีก (ห้ามยัดหลายรายการคั่นด้วยคอมมาในช่องเดียว)</li>
  <li><strong>Repeating Group (กลุ่มข้อมูลซ้ำซ้อน):</strong> ช่องที่มีค่าซ้อนหลายรายการในช่องเดียว (เช่น <code>2025-01-10 โอนขาย, 2025-06-15 จำนอง</code>) หรือการสร้างคอลัมน์เผื่อซ้ำๆ (<code>tx_1</code>, <code>tx_2</code>, <code>tx_3</code>)</li>
  <li><strong>Functional Dependency (<code>A → B</code> อ่านว่า "B ขึ้นอยู่กับ A"):</strong> หมายถึงถ้ารู้ค่า <code>A</code> แล้ว จะสามารถระบุค่า <code>B</code> ได้ถูกต้องแน่นอน เช่น รู้ <code>owner_id = U01</code> ย่อมรู้ทันทีว่า <code>owner_name = นายสมชาย ใจดี</code> (เขียนเป็น <code>owner_id → owner_name</code>)</li>
  <li><strong>Partial Dependency (ขึ้นต่อคีย์หลักเพียงบางส่วน):</strong> เกิดเฉพาะเมื่อตารางมี <strong>Composite PK</strong> เช่น PK คือ <code>(deed_no, tx_date)</code> แต่คอลัมน์ <code>owner_name</code> ดันขึ้นกับแค่ <code>deed_no</code> ตัวเดียว ไม่ได้ขึ้นกับ <code>tx_date</code> เลย (รู้แค่เลขโฉนดก็รู้ชื่อเจ้าของแล้ว) — นี่คือปัญหาที่ต้องแก้ใน <strong>2NF</strong>!</li>
  <li><strong>Transitive Dependency (ขึ้นต่อกันทางอ้อมเป็นลูกโซ่ <code>A → B → C</code>):</strong> คอลัมน์ที่ไม่ใช่คีย์ไปขึ้นต่อกับคอลัมน์ที่ไม่ใช่คีย์อีกตัวหนึ่ง เช่น <code>deed_no (PK) → office_id (Non-Key) → office_name (Non-Key)</code> กล่าวคือชื่อสำนักงานขึ้นกับรหัสสำนักงาน ไม่ได้ขึ้นกับเลขโฉนดโดยตรง — นี่คือปัญหาที่ต้องแก้ใน <strong>3NF</strong>!</li>
</ol>

<h3>3.3 Before: ตารางดิบก่อน Normalize (Unnormalized Form — UNF)</h3>
<p>เรามาแปลงตารางดิบที่รวมข้อมูลทุกอย่างปนกันในตารางเดียวนี้ ไปสู่ <strong>1NF → 2NF → 3NF</strong> ทีละขั้นครับ สังเกตว่าช่อง <code>tx_list</code> ยังเป็น <strong>Repeating Group</strong> (มี 2 รายการซ้อนในช่องเดียว) และเก็บชื่อเจ้าของกับชื่อสำนักงานซ้ำทุกแถว:</p>
<div class="table-wrap">
  <table>
    <caption>ตารางก่อน Normalize (UNF): มีค่าหลายค่าในช่องเดียวและข้อมูลซ้ำซ้อน</caption>
    <thead>
      <tr>
        <th scope="col">deed_no</th>
        <th scope="col">owner_id</th>
        <th scope="col">owner_name</th>
        <th scope="col">office_id</th>
        <th scope="col">office_name</th>
        <th scope="col">tx_list (วันที่ / ประเภท)</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>น.ส.4-1001</td>
        <td>U01</td>
        <td>นายสมชาย ใจดี</td>
        <td>OF10</td>
        <td>สนง.ที่ดินจตุจักร</td>
        <td>2025-01-10 โอนขาย, 2025-06-15 จำนอง</td>
      </tr>
      <tr>
        <td>น.ส.4-1002</td>
        <td>U02</td>
        <td>นางสาวมาลี สุขสันต์</td>
        <td>OF10</td>
        <td>สนง.ที่ดินจตุจักร</td>
        <td>2025-02-20 โอนมรดก</td>
      </tr>
    </tbody>
  </table>
</div>

<h3>3.4 ขั้นที่ 1 (1NF): ทำให้ทุกช่องเป็น Atomic Value ไม่มีกลุ่มซ้ำ</h3>
<p><strong>กฎ 1NF:</strong> ทุกเซลล์ต้องเก็บค่าเดียวเท่านั้น (Atomic) ห้ามมีลิสต์หลายรายการในช่องเดียว เราจึงแยก <code>tx_date</code> และ <code>tx_type</code> ออกมาเป็นแถวละ 1 รายการ โดยให้ Primary Key ร่วม (Composite PK) คือ <code>(deed_no, tx_date)</code></p>
<div class="table-wrap">
  <table>
    <caption>ผลลัพธ์หลังทำ 1NF: แยกแต่ละรายการธุรกรรมเป็นแถวเดี่ยว ค่าในเซลล์เป็น Atomic</caption>
    <thead>
      <tr>
        <th scope="col">deed_no (PK)</th>
        <th scope="col">tx_date (PK)</th>
        <th scope="col">tx_type</th>
        <th scope="col">owner_id</th>
        <th scope="col">owner_name</th>
        <th scope="col">office_id</th>
        <th scope="col">office_name</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>น.ส.4-1001</td>
        <td>2025-01-10</td>
        <td>โอนขาย</td>
        <td>U01</td>
        <td>นายสมชาย ใจดี</td>
        <td>OF10</td>
        <td>สนง.ที่ดินจตุจักร</td>
      </tr>
      <tr>
        <td>น.ส.4-1001</td>
        <td>2025-06-15</td>
        <td>จำนอง</td>
        <td>U01</td>
        <td>นายสมชาย ใจดี</td>
        <td>OF10</td>
        <td>สนง.ที่ดินจตุจักร</td>
      </tr>
      <tr>
        <td>น.ส.4-1002</td>
        <td>2025-02-20</td>
        <td>โอนมรดก</td>
        <td>U02</td>
        <td>นางสาวมาลี สุขสันต์</td>
        <td>OF10</td>
        <td>สนง.ที่ดินจตุจักร</td>
      </tr>
    </tbody>
  </table>
</div>

<h3>3.5 ขั้นที่ 2 (2NF): ขจัด Partial Dependency (ห้ามขึ้นกับแค่ครึ่งเดียวของ PK)</h3>
<p><strong>กฎ 2NF:</strong> ต้องผ่าน 1NF ก่อน และ<strong>ทุกคอลัมน์ที่ไม่ใช่คีย์ต้องขึ้นอยู่กับ Primary Key ทั้งชุด</strong> ห้ามขึ้นอยู่กับแค่ส่วนใดส่วนหนึ่งของ Composite PK<br>
<em>วิเคราะห์ปัญหาใน 1NF ด้านบน:</em> PK คือ <code>(deed_no, tx_date)</code> แต่คอลัมน์ <code>owner_id, owner_name, office_id, office_name</code> ขึ้นอยู่กับแค่ <code>deed_no</code> ตัวเดียว ไม่ได้ขึ้นอยู่กับ <code>tx_date</code> เลย (จึงทำให้ข้อมูลนายสมชายและ สนง.จตุจักร ซ้ำทุกครั้งที่โฉนดนี้ทำธุรกรรม)! เราจึงแตกออกเป็น 2 ตาราง:</p>
<div class="table-wrap">
  <table>
    <caption>ผลลัพธ์หลังทำ 2NF: แยกตาราง PLOTS_2NF และ TRANSACTIONS_2NF ออกจากกัน</caption>
    <thead>
      <tr>
        <th scope="col">ตาราง (2NF)</th>
        <th scope="col">โครงสร้างคอลัมน์ (PK / FK)</th>
        <th scope="col">สถานะและความหมาย</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th scope="row">TRANSACTIONS_2NF</th>
        <td><code>tx_id (PK), deed_no (FK), tx_date, tx_type</code></td>
        <td>เก็บประวัติธุรกรรมแต่ละครั้ง ไม่ต้องเก็บชื่อเจ้าของหรือสำนักงานซ้ำแล้ว</td>
      </tr>
      <tr>
        <th scope="row">PLOTS_2NF</th>
        <td><code>deed_no (PK), owner_id, owner_name, office_id, office_name</code></td>
        <td>ไม่มี Partial Dependency แล้ว แต่ยังติด <strong>Transitive Dependency</strong> เพราะ <code>office_name</code> ขึ้นกับ <code>office_id</code>!</td>
      </tr>
    </tbody>
  </table>
</div>

<h3>3.6 ขั้นที่ 3 (3NF): ขจัด Transitive Dependency (After สุดท้ายพร้อมใช้งาน)</h3>
<p><strong>กฎ 3NF:</strong> ต้องผ่าน 2NF ก่อน และ<strong>ห้ามคอลัมน์ที่ไม่ใช่คีย์ไปขึ้นต่อกันเองเป็นลูกโซ่ (<code>A → B → C</code>)</strong><br>
ใน <code>PLOTS_2NF</code> จะเห็นลูกโซ่ <code>deed_no → office_id → office_name</code> และ <code>deed_no → owner_id → owner_name</code> จึงต้องดึงข้อมูลคน (<code>USERS</code>) และข้อมูลสำนักงาน (<code>LAND_OFFICES</code>) แยกออกไปเป็นตารางอิสระ ได้โครงสร้าง <strong>3NF ที่สะอาด ปลอด Anomaly ทั้ง 3 ข้อ</strong> ดังนี้ครับ:</p>
<div class="table-wrap">
  <table>
    <caption>After (3NF): ตารางอิสระ 4 ตารางที่ปราศจากความซ้ำซ้อนและ Anomaly</caption>
    <thead>
      <tr>
        <th scope="col">ตาราง (3NF)</th>
        <th scope="col">คอลัมน์หลัก</th>
        <th scope="col">การเชื่อมโยง</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th scope="row">LAND_OFFICES</th>
        <td><code>office_id (PK), office_name, province</code></td>
        <td>1 สำนักงาน มีหลายแปลง (เพิ่มสำนักงานใหม่ได้แม้ยังไม่มีแปลง!)</td>
      </tr>
      <tr>
        <th scope="row">USERS</th>
        <td><code>user_id (PK), full_name, citizen_type</code></td>
        <td>1 เจ้าของ ถือครองได้หลายแปลง (แก้ชื่อจุดเดียวตรงทั้งระบบ!)</td>
      </tr>
      <tr>
        <th scope="row">LAND_PLOTS</th>
        <td><code>plot_id (PK), deed_no, office_id (FK), owner_id (FK)</code></td>
        <td>อ้างอิงสำนักงานและเจ้าของด้วยรหัส FK</td>
      </tr>
      <tr>
        <th scope="row">TRANSACTIONS</th>
        <td><code>tx_id (PK), plot_id (FK), tx_type, tx_date, fee_amount</code></td>
        <td>อ้างอิงแปลงที่ดินด้วย <code>plot_id</code></td>
      </tr>
    </tbody>
  </table>
</div>

<div class="callout callout-tip">
  <strong><i class="fa-solid fa-lightbulb" aria-hidden="true"></i> คาถาจำสั้น 1NF–3NF ก่อนเข้าห้องสอบ:</strong>
  <strong>1NF</strong> = ตัดกลุ่มซ้ำ ให้ช่องละ 1 ค่า (Atomic) → <strong>2NF</strong> = ตัดการพึ่งแค่ครึ่งคีย์ (Partial) → <strong>3NF</strong> = ตัดการพึ่งกันเองนอกคีย์ (Transitive)
</div>`
      },
      {
        id: 'sql-select-where',
        title: '4. คำสั่ง SQL พื้นฐาน: DDL, DML, DQL และ SELECT / WHERE / ORDER BY',
        analogyBox: {
          title: 'เปรียบเทียบให้เห็นภาพ: ภาษาสั่งงานบรรณารักษ์ฐานข้อมูล',
          body: '<strong>SQL (Structured Query Language)</strong> คือ "ภาษามาตรฐานกลาง" ที่เราใช้พูดคุยกับระบบ RDBMS ทุกยี่ห้อ ไม่ว่าจะเป็นการสร้างตู้เอกสารใหม่ (<strong>DDL</strong>), การเพิ่ม/แก้ไข/ลบใบทะเบียน (<strong>DML</strong>), การเขียนใบเบิกขอค้นหาข้อมูลตามเงื่อนไข (<strong>DQL</strong>), การแจกกุญแจสิทธิ์ (<strong>DCL</strong>) หรือการสั่งยืนยัน/ยกเลิกภารกิจ (<strong>TCL</strong>) ครับ'
        },
        bodyHtml: `
<h3>4.1 5 หมวดคำสั่งของภาษา SQL (DDL / DML / DQL / DCL / TCL) พร้อมตัวอย่างจริง</h3>
<ul>
  <li><strong>DDL (Data Definition Language) — จัดการ "โครงสร้างตาราง":</strong> ใช้สร้าง แก้ไข หรือลบตัวตาราง ได้แก่ <code>CREATE</code>, <code>ALTER</code>, <code>DROP</code>, <code>TRUNCATE</code>
    <pre tabindex="0"><code>CREATE TABLE land_offices (office_id INT PRIMARY KEY, office_name TEXT);
ALTER TABLE land_offices ADD COLUMN province TEXT;</code></pre>
  </li>
  <li><strong>DML (Data Manipulation Language) — จัดการ "ข้อมูลในแถว":</strong> ใช้เพิ่ม แก้ไข หรือลบแถวข้อมูล ได้แก่ <code>INSERT</code>, <code>UPDATE</code>, <code>DELETE</code>
    <pre tabindex="0"><code>INSERT INTO land_offices (office_id, office_name) VALUES (9, 'สนง.ที่ดินกระบี่');
UPDATE land_plots SET appraised_price_per_wah = 150000 WHERE plot_id = 2;
DELETE FROM transactions WHERE tx_id = 114;  -- อย่าลืม WHERE ไม่งั้นลบเกลี้ยงทั้งตาราง!</code></pre>
  </li>
  <li><strong>DQL (Data Query Language) — สอบถามดึงข้อมูลมาแสดง:</strong> ได้แก่คำสั่ง <code>SELECT</code>
    <pre tabindex="0"><code>SELECT deed_no, appraised_price_per_wah FROM land_plots WHERE deed_type = 'น.ส.4 จ.';</code></pre>
  </li>
  <li><strong>DCL (Data Control Language) — กำหนดสิทธิ์ผู้ใช้:</strong> ได้แก่ <code>GRANT</code> (ให้สิทธิ์) และ <code>REVOKE</code> (ถอนสิทธิ์)
    <pre tabindex="0"><code>GRANT SELECT, INSERT ON land_plots TO officer_role;
REVOKE DELETE ON land_plots FROM officer_role;</code></pre>
  </li>
  <li><strong>TCL (Transaction Control Language) — ควบคุมทรานแซกชัน:</strong> ได้แก่ <code>COMMIT</code>, <code>ROLLBACK</code>, <code>SAVEPOINT</code></li>
</ul>

<div class="table-wrap">
  <table>
    <caption>เปรียบเทียบคำสั่งลบยอดฮิต: DELETE vs TRUNCATE vs DROP (ออกสอบบ่อยมาก!)</caption>
    <thead>
      <tr>
        <th scope="col">คำสั่ง</th>
        <th scope="col">หมวด</th>
        <th scope="col">สิ่งที่หายไป</th>
        <th scope="col">ระบุ WHERE / กู้คืน ROLLBACK</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th scope="row">DELETE</th>
        <td>DML</td>
        <td>ลบเฉพาะแถวที่ระบุ (โครงตารางยังอยู่)</td>
        <td>ใส่ <code>WHERE</code> ได้ / <strong><code>ROLLBACK</code> ได้</strong></td>
      </tr>
      <tr>
        <th scope="row">TRUNCATE</th>
        <td>DDL</td>
        <td>ล้างข้อมูลทั้งตารางเกลี้ยง (โครงตารางยังอยู่)</td>
        <td>ใส่ <code>WHERE</code> ไม่ได้ / เร็วกว่า DELETE / มัก Rollback ไม่ได้</td>
      </tr>
      <tr>
        <th scope="row">DROP</th>
        <td>DDL</td>
        <td>ลบทิ้งทั้งข้อมูล <strong>และตัวโครงสร้างตารางหายหมด</strong></td>
        <td>ใส่ <code>WHERE</code> ไม่ได้ / ถูกลบออกจากระบบเลย</td>
      </tr>
    </tbody>
  </table>
</div>

<h3>4.2 ตัวช่วยกรองเงื่อนไขใน <code>WHERE</code> ที่ต้องใช้เป็น</h3>
<p>คำสั่ง <code>WHERE</code> ใช้คัดกรองเฉพาะแถวที่ตรงเงื่อนไขก่อนแสดงผล โดยตัวดำเนินการสำคัญที่ออกสอบบ่อย ได้แก่:</p>
<ul>
  <li><strong>เปรียบเทียบพื้นฐาน:</strong> <code>=</code> (เท่ากับ), <code>!=</code> หรือ <code>&lt;&gt;</code> (ไม่เท่ากับ), <code>&gt;</code>, <code>&lt;</code>, <code>&gt;=</code>, <code>&lt;=</code> ร่วมกับตัวเชื่อม <code>AND</code> (ต้องจริงทั้งคู่), <code>OR</code> (จริงอย่างน้อยหนึ่ง), <code>NOT</code></li>
  <li><strong><code>LIKE</code> (ค้นหาข้อความแบบเทียบแพตเทิร์น):</strong> ใช้คู่กับ <code>%</code> (แทนตัวอักษรกี่ตัวก็ได้) และ <code>_</code> (แทนตัวอักษร 1 ตัวพอดี) เช่น <code>WHERE tx_date LIKE '2025-%'</code> (ขึ้นต้นด้วย 2025-)</li>
  <li><strong><code>IN</code> (ตรงกับค่าใดค่าหนึ่งในรายการ):</strong> เขียนสั้นกว่าการใช้ <code>OR</code> ยาวๆ เช่น <code>WHERE deed_type IN ('น.ส.4 จ.', 'อ.ช.2')</code></li>
  <li><strong><code>BETWEEN</code> (อยู่ในช่วงแบบรวมหัวและท้าย):</strong> เช่น <code>WHERE fee_amount BETWEEN 10000 AND 50000</code> (เท่ากับ <code>&gt;= 10000 AND &lt;= 50000</code>)</li>
  <li><strong><code>IS NULL</code> / <code>IS NOT NULL</code>:</strong> ใช้ตรวจหาช่องที่ยังไม่กรอกข้อมูล (ห้ามเขียน <code>= NULL</code> เด็ดขาด)</li>
</ul>

<h3>4.3 ลำดับการทำงานจริงของ SQL (Query Execution Order)</h3>
<p>ข้อสอบชอบหลอกเรื่องนี้มาก! ถึงแม้เวลาพิมพ์โค้ดเราจะขึ้นต้นด้วย <code>SELECT</code> เป็นบรรทัดแรก แต่ระบบฐานข้อมูลจะประมวลผลจริงตามลำดับ 7 ขั้นนี้ครับ:</p>
<pre tabindex="0"><code>1. FROM / JOIN    -- ดึงตารางต้นทางและเชื่อมตารางก่อน
2. WHERE          -- กรองแถวดิบทีละแถว (ยังใช้ชื่อ Alias ใน SELECT หรือ COUNT/SUM ไม่ได้!)
3. GROUP BY       -- จัดกลุ่มแถวตามคอลัมน์ที่ระบุ
4. HAVING         -- กรอง "กลุ่ม" หลังจากจัดกลุ่มและคำนวณ Aggregate แล้ว
5. SELECT         -- เลือกคอลัมน์ คำนวณสูตร และตั้งชื่อเล่น (Alias AS)
6. ORDER BY       -- เรียงลำดับผลลัพธ์ (ASC น้อยไปมาก / DESC มากไปน้อย)
7. LIMIT          -- ตัดเอาเฉพาะจำนวนแถวสูงสุดที่ต้องการ</code></pre>

<p>ลองกดปุ่ม <strong>รันคำสั่ง SQL</strong> ด้านล่างเพื่อทดสอบดึง 5 แปลงที่ดินที่มีราคาประเมินต่อตารางวาสูงสุดจากตาราง <code>land_plots</code> ได้เลยครับ (หรือลองแก้เพิ่มเงื่อนไข <code>WHERE deed_type = 'น.ส.4 จ.'</code> ดูด้วยตัวเอง!)</p>`,
        sqlTryIt: {
          title: 'ลองรันจริง #1: ค้นหาแปลงที่ดินราคาประเมินสูงสุด 5 อันดับแรก',
          description: 'ใช้คำสั่ง SELECT, ORDER BY DESC และ LIMIT กับตาราง land_plots',
          initialQuery: 'SELECT plot_id, deed_no, deed_type, appraised_price_per_wah FROM land_plots ORDER BY appraised_price_per_wah DESC LIMIT 5;',
          hint: 'ลองเพิ่ม WHERE rai >= 1 ก่อนหน้า ORDER BY เพื่อกรองเฉพาะแปลงที่มีขนาดอย่างน้อย 1 ไร่'
        }
      },
      {
        id: 'sql-join-aggregate',
        title: '5. การเชื่อมตาราง (JOIN) และฟังก์ชันสรุปผล (GROUP BY / HAVING)',
        analogyBox: {
          title: 'เปรียบเทียบให้เห็นภาพ: INNER JOIN (จับคู่เฉพาะคนมีคู่) vs LEFT JOIN (เช็กชื่อฝั่งซ้ายครบทุกคน)',
          body: 'ลองนึกว่ามีโต๊ะรายชื่อสำนักงานอยู่ฝั่งซ้าย และโต๊ะแปลงที่ดินอยู่ฝั่งขวา:<br>• <strong>INNER JOIN:</strong> ยอมให้เข้าห้องเฉพาะคู่ที่จับมือกันครบทั้งสองฝั่ง (สำนักงานไหนยังไม่มีแปลงที่ดินในระบบ จะถูกคัดออกไม่แสดง!)<br>• <strong>LEFT JOIN:</strong> รักษา<strong>รายชื่อฝั่งซ้ายไว้ครบ 100%</strong> ใครมีคู่ก็จับคู่มาแสดง ส่วนสำนักงานที่ยังไม่มีแปลงที่ดิน ก็ยังแสดงชื่ออยู่โดยช่องข้อมูลแปลงฝั่งขวาจะเป็น <code>NULL</code> ครับ!'
        },
        bodyHtml: `
<h3>5.1 JOIN คืออะไร? ดูตัวอย่าง Input และ Output ของ <code>INNER JOIN</code> vs <code>LEFT JOIN</code></h3>
<p>หลังจากที่เราทำ Normalization แยกข้อมูลออกเป็นหลายตารางแล้ว (เช่น <code>land_plots</code> เก็บแค่ตัวเลข <code>office_id</code> ไม่ได้เก็บชื่อสำนักงาน) เวลาต้องการออกรายงานที่แสดงทั้ง<em>ชื่อสำนักงาน</em>และ<em>เลขโฉนด</em>พร้อมกัน เราจึงต้องใช้คำสั่ง <strong>JOIN</strong> มาจับคู่แถวจากสองตารางเข้าด้วยกันครับ</p>
<p>เพื่อให้เห็นภาพชัดแบบไม่สับสน ลองดูข้อมูลจำลองขนาดเล็ก 2 ตารางนี้ (สังเกตว่า <strong>สำนักงานรหัส 8 สงขลา ยังไม่มีแปลงที่ดิน</strong> ส่วนอีก 2 แห่งมีแปลงจับคู่):</p>

<div class="table-wrap">
  <table>
    <caption>ตาราง Input ตัวอย่าง: MINI_OFFICES (ซ้าย) และ MINI_PLOTS (ขวา)</caption>
    <thead>
      <tr>
        <th scope="col">MINI_OFFICES (ซ้าย)</th>
        <th scope="col">MINI_PLOTS (ขวา)</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><code>office_id = 1</code> | พระโขนง<br><code>office_id = 2</code> | นนทบุรี<br><code>office_id = 8</code> | สงขลา <em>(ยังไม่มีแปลง)</em></td>
        <td><code>plot_id = 10</code> | น.ส.4จ-104 | <code>office_id = 1</code><br><code>plot_id = 11</code> | น.ส.4จ-331 | <code>office_id = 2</code></td>
      </tr>
    </tbody>
  </table>
</div>

<div class="table-wrap">
  <table>
    <caption>เปรียบเทียบผลลัพธ์จริง: INNER JOIN (ได้ 2 แถว) vs LEFT JOIN (ได้ 3 แถวพร้อม NULL)</caption>
    <thead>
      <tr>
        <th scope="col">ผลลัพธ์ของ INNER JOIN</th>
        <th scope="col">ผลลัพธ์ของ LEFT JOIN (MINI_OFFICES อยู่ซ้าย)</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>
          1) พระโขนง — น.ส.4จ-104<br>
          2) นนทบุรี — น.ส.4จ-331<br>
          <em>(สงขลาหายไป เพราะไม่มีคู่ใน MINI_PLOTS!)</em>
        </td>
        <td>
          1) พระโขนง — น.ส.4จ-104<br>
          2) นนทบุรี — น.ส.4จ-331<br>
          3) <strong>สงขลา — <code>NULL</code></strong> <em>(ฝั่งซ้ายอยู่ครบ!)</em>
        </td>
      </tr>
    </tbody>
  </table>
</div>

<h3>5.2 ตารางเปรียบเทียบคำสั่ง JOIN ทั้ง 4 รูปแบบ</h3>
<div class="table-wrap">
  <table>
    <caption>เปรียบเทียบคำสั่ง JOIN ทั้ง 4 รูปแบบใน SQL</caption>
    <thead>
      <tr>
        <th scope="col">ชนิดของ JOIN</th>
        <th scope="col">ผลลัพธ์ที่ได้</th>
        <th scope="col">การใช้งานจริง</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th scope="row">INNER JOIN</th>
        <td>คืนค่าเฉพาะแถวที่จับคู่คีย์ตรงกันได้ <strong>ทั้งสองตาราง</strong></td>
        <td>ดูรายการแปลงที่ดินที่มีข้อมูลเจ้าของและสำนักงานจับคู่ถูกต้อง</td>
      </tr>
      <tr>
        <th scope="row">LEFT JOIN</th>
        <td>คืนค่าตาราง <strong>ฝั่งซ้ายทั้งหมด</strong> แม้ฝั่งขวาไม่มีคู่ (ฝั่งขวาจะเป็น <code>NULL</code>)</td>
        <td>ดูรายชื่อสำนักงานหรือผู้ใช้ทั้งหมด รวมถึงรายที่ <em>ยังไม่มี</em> แปลงที่ดิน</td>
      </tr>
      <tr>
        <th scope="row">RIGHT JOIN</th>
        <td>คืนค่าตาราง <strong>ฝั่งขวาทั้งหมด</strong> แม้ฝั่งซ้ายไม่มีคู่</td>
        <td>ตรงข้ามกับ LEFT JOIN (นิยมเขียนสลับฝั่งใช้ LEFT JOIN แทนเพื่ออ่านง่าย)</td>
      </tr>
      <tr>
        <th scope="row">FULL OUTER JOIN</th>
        <td>คืนค่าทั้งสองฝั่งทั้งหมด ตัวไหนไม่เข้าคู่ก็แสดง <code>NULL</code> ในอีกฝั่ง</td>
        <td>เทียบข้อมูลข้ามระบบเพื่อหาเรคอร์ดตกหล่นทั้งสองฝั่ง</td>
      </tr>
    </tbody>
  </table>
</div>

<h3>5.3 Aggregate Functions, <code>GROUP BY</code> และ <code>HAVING</code> (vs <code>WHERE</code>)</h3>
<p><strong>Aggregate Functions (ฟังก์ชันสรุปรวมกลุ่ม)</strong> มี 5 ตัวพื้นฐานคือ <code>COUNT()</code> (นับจำนวน), <code>SUM()</code> (ผลรวม), <code>AVG()</code> (ค่าเฉลี่ย), <code>MAX()</code> (สูงสุด), <code>MIN()</code> (ต่ำสุด) ซึ่งจะยุบหลายแถวในกลุ่มเดียวกันให้เหลือ 1 คำตอบ โดยมีกฎเหล็ก 3 ข้อที่ออกสอบประจำครับ:</p>
<ol>
  <li><strong>กฎของ <code>GROUP BY</code>:</strong> เมื่อนำคอลัมน์ปกติ (เช่น <code>o.office_name</code>) มาแสดงคู่กับฟังก์ชันสรุปผล (เช่น <code>COUNT(p.plot_id)</code>) ใน <code>SELECT</code> ต้องใส่คอลัมน์ปกตินั้นไว้หลัง <code>GROUP BY</code> เสมอ</li>
  <li><strong>ข้อแตกต่างของ <code>COUNT(*)</code> vs <code>COUNT(column)</code>:</strong> <code>COUNT(*)</code> นับทุกแถวรวมแถวที่เป็น <code>NULL</code> ด้วย ส่วน <code>COUNT(p.plot_id)</code> จะนับเฉพาะแถวที่<strong>ไม่เป็น <code>NULL</code></strong>! ดังนั้นถ้าทำ <code>LEFT JOIN</code> เพื่อนับจำนวนแปลงของสำนักงานที่ยังไม่มีแปลงเลย ต้องใช้ <code>COUNT(p.plot_id)</code> จึงจะได้เลข <code>0</code> (ถ้าเผลอใช้ <code>COUNT(*)</code> จะได้ <code>1</code> เพราะแถวสงขลายังมีอยู่!)</li>
  <li><strong><code>WHERE</code> vs <code>HAVING</code>:</strong> <code>WHERE</code> ใช้กรอง "แถวดิบ" <em>ก่อน</em>จัดกลุ่ม (ห้ามใส่ <code>COUNT</code> หรือ <code>SUM</code> ใน <code>WHERE</code>!) ส่วน <strong><code>HAVING</code></strong> ใช้กรอง "ทั้งกลุ่ม" <em>หลัง</em>จัดกลุ่มและคำนวณ Aggregate แล้ว เช่น เอาเฉพาะสำนักงานที่มีตั้งแต่ 2 แปลงขึ้นไป:
    <pre tabindex="0"><code>SELECT o.office_name, COUNT(p.plot_id) AS total_plots
FROM land_offices o
LEFT JOIN land_plots p ON o.office_id = p.office_id
GROUP BY o.office_name
HAVING COUNT(p.plot_id) &gt;= 2;</code></pre>
  </li>
</ol>

<p>ด้านล่างนี้เป็นตัวอย่างคิวรีจริงแบบ <strong>INNER JOIN</strong> เชื่อมตาราง <code>land_plots</code> เข้ากับ <code>users</code> และ <code>land_offices</code> กดรันดูผลลัพธ์ได้เลยครับ:</p>`,
        sqlTryIt: {
          title: 'ลองรันจริง #2: เชื่อมตาราง land_plots กับ users และ land_offices (JOIN)',
          description: 'ดูชื่อเจ้าของที่ดิน เลขโฉนด สำนักงานที่ดินที่สังกัด และราคาประเมินต่อตารางวา',
          initialQuery: 'SELECT u.full_name, p.deed_no, p.deed_type, o.office_name, p.appraised_price_per_wah FROM land_plots p INNER JOIN users u ON p.owner_id = u.user_id INNER JOIN land_offices o ON p.office_id = o.office_id ORDER BY p.appraised_price_per_wah DESC LIMIT 8;',
          hint: 'ลองเปลี่ยนคิวรีเป็น GROUP BY เพื่อสรุปจำนวนแปลงต่อสำนักงาน: SELECT o.office_name, COUNT(p.plot_id) AS total_plots FROM land_offices o LEFT JOIN land_plots p ON o.office_id = p.office_id GROUP BY o.office_name;'
        }
      }
    ],
    quiz: [
      {
        id: 'q-core2-1',
        question: 'ข้อใดกล่าวถึงคุณสมบัติของ Primary Key (PK) และ Foreign Key (FK) ในฐานข้อมูลเชิงสัมพันธ์ได้ถูกต้องที่สุด?',
        options: [
          'Primary Key มีค่าซ้ำกันได้แต่ห้ามเป็น NULL ส่วน Foreign Key ห้ามเป็นค่าซ้ำ',
          'Primary Key ต้องไม่ซ้ำและห้ามเป็น NULL ส่วน Foreign Key ใช้เชื่อมโยงไปยัง PK ของอีกตารางและมีค่าซ้ำกันได้',
          'ตารางหนึ่งตารางสามารถกำหนด Primary Key แยกกันได้มากกว่า 1 ชุดเสมอ',
          'Foreign Key ไม่จำเป็นต้องอ้างอิงค่าที่มีอยู่จริงในตารางปลายทาง'
        ],
        correctIndex: 1,
        explanation: {
          summary: 'PK เป็นตัวระบุแถวที่ไม่ซ้ำและไม่ว่าง ส่วน FK ใช้เชื่อมความสัมพันธ์ (เช่น เจ้าของ 1 คนมีได้หลายแปลง จึงซ้ำได้)',
          perOption: [
            'ก. ผิด Primary Key ห้ามซ้ำเด็ดขาด และ Foreign Key ในความสัมพันธ์ 1:N มีค่าซ้ำกันได้',
            'ข. ถูกต้อง PK บังคับ Unique + NOT NULL ส่วน FK อ้างอิงกลับไปยัง PK ต้นทางเพื่อรักษา Referential Integrity',
            'ค. ผิด หนึ่งตารางมี Primary Key ได้เพียงชุดเดียวเท่านั้น (แม้ชุดนั้นอาจประกอบด้วยหลายคอลัมน์เป็น Composite Key ก็ตาม)',
            'ง. ผิด หากไม่ตรงค่าที่มีในตารางปลายทาง (และไม่ใช่ NULL) ระบบจะปฏิเสธด้วยกฎ Referential Integrity'
          ]
        }
      },
      {
        id: 'q-core2-2',
        question: 'ในระหว่างที่เจ้าหน้าที่กดบันทึกโอนกรรมสิทธิ์และหักค่าธรรมเนียมใน Transaction เดียวกัน เกิดไฟฟ้าดับกะทันหันก่อนบันทึกเสร็จ ระบบฐานข้อมูลจึงยกเลิกคำสั่งย่อยก่อนหน้าทั้งหมดกลับสู่สภาพเดิม สอดคล้องกับคุณสมบัติใดของ ACID?',
        options: [
          'Atomicity',
          'Consistency',
          'Isolation',
          'Durability'
        ],
        correctIndex: 0,
        explanation: {
          summary: 'Atomicity คือหลัก "ทำทั้งหมดหรือยกเลิกทั้งหมด (All or Nothing)" โดยใช้ ROLLBACK เมื่อล้มเหลวกลางคัน',
          perOption: [
            'ก. ถูกต้อง Atomicity รับประกันว่าจะไม่เกิดสถานะสำเร็จครึ่งเดียว เมื่อพังกลางทางต้อง Rollback ทั้งชุด',
            'ข. ผิด Consistency เน้นความถูกต้องตามกฎ Constraint ของฐานข้อมูลก่อนและหลัง Transaction',
            'ค. ผิด Isolation เน้นการแยกตัวจากการรบกวนของ Transaction อื่นที่รันพร้อมกัน',
            'ง. ผิด Durability เน้นว่าข้อมูลที่ COMMIT เสร็จแล้วจะต้องคงอยู่ถาวรแม้ไฟดับหลังจากนั้น'
          ]
        }
      },
      {
        id: 'q-core2-3',
        question: 'เมื่อต้องการแปลงความสัมพันธ์แบบ Many-to-Many (M:N) จาก ER Diagram เช่น "ผู้ถือสิทธิ์ 1 คนถือหลายแปลง และ 1 แปลงมีผู้ถือสิทธิ์ร่วมหลายคน" ให้เป็นตารางจริงใน RDBMS ต้องดำเนินการอย่างไร?',
        options: [
          'ใส่รหัสผู้ถือสิทธิ์หลายค่าคั่นด้วยเครื่องหมายจุลภาคในคอลัมน์เดียว',
          'นำ Primary Key ของทั้งสองตารางมาสร้างเป็นตารางเชื่อมกลาง (Junction Table) เพื่อแยกเป็นความสัมพันธ์ 1:N สองข้าง',
          'ลบความสัมพันธ์ M:N ออกแล้วเปลี่ยนเป็น 1:1 แทน',
          'คัดลอกข้อมูลทุกคอลัมน์ของทั้งสองตารางมารวมเป็นตารางขนาดใหญ่เพียงตารางเดียว'
        ],
        correctIndex: 1,
        explanation: {
          summary: 'ความสัมพันธ์ M:N ต้องแตกออกเป็นตารางเชื่อมกลาง (Associative / Junction Table) ที่มี FK ชี้ไปหาตารางหลักทั้งสองฝั่ง',
          perOption: [
            'ก. ผิด การเก็บหลายค่าในคอลัมน์เดียวผิดกฎ 1NF อย่างร้ายแรง',
            'ข. ถูกต้อง การสร้างตารางเชื่อมกลาง เช่น PLOT_OWNERS (plot_id, user_id) เป็นวิธีมาตรฐานในการทำ M:N บน RDBMS',
            'ค. ผิด จะทำให้ผิดข้อกำหนดทางธุรกิจที่ไม่สามารถบันทึกเจ้าของร่วมได้',
            'ง. ผิด จะทำให้เกิดข้อมูลซ้ำซ้อนและผิดหลัก Normalization'
          ]
        }
      },
      {
        id: 'q-core2-4',
        question: 'ตารางข้อมูลผ่าน 2NF แล้ว แต่พบว่ามีคอลัมน์ที่ไม่ใช่คีย์ตัวหนึ่ง (เช่น ชื่อจังหวัดของสำนักงาน) ขึ้นอยู่กับคอลัมน์ที่ไม่ใช่คีย์อีกตัวหนึ่ง (เช่น รหัสสำนักงาน) ไม่ได้ขึ้นกับคีย์หลักโดยตรง ลักษณะนี้เรียกว่าอะไร และต้องแก้ไขให้เป็นระดับใด?',
        options: [
          'Repeating Group — ต้องแก้ไขให้เป็น 1NF',
          'Partial Dependency — ต้องแก้ไขให้เป็น 2NF',
          'Transitive Dependency — ต้องแยกตารางออกไปให้เป็น 3NF',
          'Referential Integrity — ต้องลบ Foreign Key ออก'
        ],
        correctIndex: 2,
        explanation: {
          summary: 'การพึ่งพาทางอ้อมระหว่างคอลัมน์ที่ไม่ใช่คีย์ (A → B → C) เรียกว่า Transitive Dependency ซึ่งเป็นเงื่อนไขที่ต้องแก้เพื่อให้อยู่ในระดับ 3NF',
          perOption: [
            'ก. ผิด Repeating Group คือปัญหาของตารางก่อนเข้า 1NF',
            'ข. ผิด Partial Dependency คือการขึ้นกับส่วนหนึ่งของ Composite Key ซึ่งแก้ไปแล้วในขั้น 2NF',
            'ค. ถูกต้อง Transitive Dependency คือความสัมพันธ์ทางอ้อม (PK → Non-Key → Non-Key) ต้องแยกออกเพื่อให้เป็น 3NF',
            'ง. ผิด ไม่ได้แก้ด้วยการลบ Foreign Key แต่ต้องแยกตารางใหม่แล้วเชื่อมด้วย FK'
          ]
        }
      },
      {
        id: 'q-core2-5',
        question: 'เหตุใดคำสั่ง SQL ต่อไปนี้จึงเกิด Error: "SELECT office_id, COUNT(*) FROM land_plots WHERE COUNT(*) > 5 GROUP BY office_id;"?',
        options: [
          'ห้ามใช้เครื่องหมาย * ภายในฟังก์ชัน COUNT',
          'ไม่สามารถใช้ Aggregate Function (COUNT) ในเงื่อนไข WHERE ได้ ต้องย้ายไปใช้ใน HAVING หลัง GROUP BY',
          'คำสั่ง GROUP BY ต้องเขียนไว้ก่อนคำสั่ง FROM เสมอ',
          'ต้องเปลี่ยนชื่อตาราง land_plots เป็นตัวพิมพ์ใหญ่ทั้งหมด'
        ],
        correctIndex: 1,
        explanation: {
          summary: 'WHERE ทำงานก่อนการรวมกลุ่ม (GROUP BY) จึงยังไม่รู้จักค่า COUNT(*); การกรองหลังรวมกลุ่มต้องใช้ HAVING',
          perOption: [
            'ก. ผิด COUNT(*) เป็นไวยากรณ์มาตรฐานที่ใช้กันทั่วไปสำหรับนับจำนวนแถว',
            'ข. ถูกต้อง ควรแก้ไขเป็น GROUP BY office_id HAVING COUNT(*) > 5 จึงจะทำงานได้ถูกต้อง',
            'ค. ผิด ไวยากรณ์ SQL ต้องเรียง SELECT → FROM → WHERE → GROUP BY → HAVING → ORDER BY',
            'ง. ผิด ชื่อตารางใน SQL มาตรฐานไม่บังคับตัวพิมพ์ใหญ่ทั้งหมด'
          ]
        }
      },
      {
        id: 'q-core2-6',
        question: 'หากต้องการดึงรายชื่อ "สำนักงานที่ดินทั้งหมดทุกแห่ง" พร้อมจำนวนแปลงที่ดินที่รับผิดชอบ โดยสำนักงานที่ยังไม่มีข้อมูลแปลงที่ดินในระบบก็ยังต้องแสดงชื่ออยู่ด้วย (แสดงจำนวนเป็น 0) ควรใช้ JOIN ชนิดใด?',
        options: [
          'INNER JOIN ระหว่าง land_offices กับ land_plots',
          'LEFT JOIN โดยให้ land_offices อยู่ฝั่งซ้าย และ land_plots อยู่ฝั่งขวา',
          'CROSS JOIN ระหว่าง land_offices กับ land_plots',
          'SELF JOIN บนตาราง land_plots เพียงตารางเดียว'
        ],
        correctIndex: 1,
        explanation: {
          summary: 'LEFT JOIN จะรักษาแถวทั้งหมดของตารางฝั่งซ้าย (land_offices) ไว้ แม้ไม่มีข้อมูลจับคู่ในฝั่งขวา (land_plots)',
          perOption: [
            'ก. ผิด INNER JOIN จะตัดสำนักงานที่ยังไม่มีแปลงที่ดินทิ้งไปจากผลลัพธ์',
            'ข. ถูกต้อง LEFT JOIN จาก land_offices ไป land_plots ร่วมกับ COUNT(p.plot_id) จะแสดงทุกสำนักงานและนับแปลงที่ไม่มีคู่เป็น 0',
            'ค. ผิด CROSS JOIN เป็นการคูณไขว้ทุกแถว (Cartesian Product) ซึ่งไม่ตรงความต้องการ',
            'ง. ผิด SELF JOIN ใช้เมื่อตารางเชื่อมกับตัวเอง ไม่ได้เชื่อมกับข้อมูลสำนักงาน'
          ]
        }
      },
      {
        id: 'q-core2-7',
        question: 'ความแตกต่างสำคัญระหว่างคำสั่ง DELETE, TRUNCATE และ DROP ในภาษา SQL คือข้อใด?',
        options: [
          'DELETE เป็น DDL ส่วน DROP เป็น DML',
          'DELETE ลบเฉพาะแถวที่ต้องการและสามารถ ROLLBACK ได้, TRUNCATE ลบข้อมูลทั้งตารางแต่คงโครงสร้างไว้, DROP ลบทิ้งทั้งข้อมูลและโครงสร้างตาราง',
          'TRUNCATE และ DROP ไม่สามารถลบข้อมูลในตารางได้หากไม่มี WHERE',
          'คำสั่งทั้งสามทำงานเหมือนกันทุกประการ ต่างกันเพียงชื่อเรียกในแต่ละยี่ห้อ'
        ],
        correctIndex: 1,
        explanation: {
          summary: 'DELETE = DML ลบรายแถว/Rollback ได้, TRUNCATE = DDL ล้างข้อมูลเกลี้ยงแต่เหลือโครงตาราง, DROP = DDL ลบทิ้งทั้งตาราง',
          perOption: [
            'ก. ผิด สลับกัน — DELETE เป็น DML ส่วน DROP และ TRUNCATE จัดเป็น DDL',
            'ข. ถูกต้อง เป็นข้อเปรียบเทียบสุดคลาสสิกที่ออกสอบเป็นประจำ',
            'ค. ผิด TRUNCATE และ DROP ไม่ใช้ WHERE เลย และลบทั้งหมดทันที',
            'ง. ผิด ทั้งสามคำสั่งมีระดับผลกระทบและการบันทึก Transaction Log ต่างกันชัดเจน'
          ]
        }
      },
      {
        id: 'q-core2-8',
        question: 'จงพิจารณาคำสั่ง SQL: SELECT tx_type, SUM(fee_amount) AS total_fee FROM transactions WHERE channel = \'จดทะเบียนออนไลน์ต่างสำนักงาน\' GROUP BY tx_type HAVING SUM(fee_amount) >= 10000 ORDER BY total_fee DESC; คำสั่งนี้ให้ผลลัพธ์อย่างไร?',
        options: [
          'แสดงยอดรวมค่าธรรมเนียมแยกตามช่องทางออนไลน์และเคาน์เตอร์ โดยเรียงจากน้อยไปมาก',
          'คัดเฉพาะรายการช่องทาง "จดทะเบียนออนไลน์ต่างสำนักงาน" มารวมค่าธรรมเนียมแยกตามประเภทนิติกรรม แสดงเฉพาะประเภทที่มียอดรวมตั้งแต่ 10,000 ขึ้นไป และเรียงจากมากไปน้อย',
          'ลบรายการที่มียอดค่าธรรมเนียมน้อยกว่า 10,000 ออกจากตาราง transactions',
          'แสดงทุกแถวของตาราง transactions โดยไม่รวมกลุ่มข้อมูล'
        ],
        correctIndex: 1,
        explanation: {
          summary: 'WHERE กรองช่องทางจดทะเบียนออนไลน์ต่างสำนักงาน → GROUP BY รวมตาม tx_type → HAVING กรองยอดรวม >= 10000 → ORDER BY DESC เรียงมากไปน้อย',
          perOption: [
            'ก. ผิด WHERE channel = \'จดทะเบียนออนไลน์ต่างสำนักงาน\' กรองเอาเฉพาะช่องทางนี้แล้ว และ DESC เรียงจากมากไปน้อย',
            'ข. ถูกต้อง แปลผลลัพธ์ของแต่ละ Clause ตามลำดับการทำงานของ SQL ได้ครบถ้วน',
            'ค. ผิด SELECT เป็นเพียงการเรียกดูข้อมูล ไม่ได้แก้ไขหรือลบข้อมูลในฐานข้อมูล',
            'ง. ผิด มี GROUP BY tx_type จึงเป็นการสรุปรวมผลตามประเภทนิติกรรม'
          ]
        }
      }
    ]
  });
})(window);
