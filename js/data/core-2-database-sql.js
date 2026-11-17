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
    subtitle: 'เจาะลึก RDBMS, Keys, ACID, การออกแบบ ER Diagram 1:1/1:N/M:N, การทำ Normalization 1NF-3NF และฝึกเขียน SQL คิวรีข้อมูลที่ดินจริง',
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
      'Primary Key (PK) ต้องไม่ซ้ำและห้ามเป็น NULL ส่วน Foreign Key (FK) ใช้เชื่อมโยงข้ามตารางเพื่อรักษา Referential Integrity',
      'คุณสมบัติ ACID (Atomicity, Consistency, Isolation, Durability) รับประกันความปลอดภัยเมื่อเกิดธุรกรรมพร้อมกันหรือไฟดับกลางคัน',
      'ความสัมพันธ์ M:N ใน ER Diagram ต้องแตกเป็นตารางเชื่อมกลาง (Junction Table) เสมอเมื่อนำไปสร้างเป็นตารางจริงใน RDBMS',
      '1NF = ข้อมูลเป็นหน่วยย่อย (Atomic) ไม่มีกลุ่มซ้ำ, 2NF = ปลอด Partial Dependency, 3NF = ปลอด Transitive Dependency',
      'ลำดับการทำงานจริงของ SQL คือ FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY → LIMIT (WHERE กรองก่อนจัดกลุ่ม, HAVING กรองหลังจัดกลุ่ม)'
    ],
    sections: [
      {
        id: 'rdbms-keys',
        title: '1. หัวใจของ RDBMS, ชนิดของ Keys และคุณสมบัติ ACID',
        analogyBox: {
          title: 'เปรียบเทียบให้เห็นภาพ: ตู้ทะเบียนราษฎร์ที่เชื่อมกันด้วยเลขบัตร',
          body: 'หากสำนักงานจดทะเบียนบันทึก <em>ชื่อ-ที่อยู่-เบอร์โทรเจ้าของที่ดิน</em> ซ้ำลงไปในเอกสารทุกแปลงเวลาโอน พอเจ้าของย้ายบ้านครั้งเดียว เจ้าหน้าที่ต้องตามแก้ทุกแฟ้มและอาจตกหล่น!<br>แนวคิดของ <strong>RDBMS (Relational Database Management System)</strong> คือเก็บข้อมูล <strong>"คน"</strong> ไว้ที่แฟ้ม <code>users</code> เพียงที่เดียว (มีเลขรหัสประจำตัวไม่ซ้ำ = <strong>Primary Key</strong>) แล้วแฟ้ม <code>land_plots</code> แค่อ้างอิงเลขรหัสนั้นมาใช้ (<strong>Foreign Key</strong>) แก้ที่อยู่จุดเดียว ข้อมูลอัปเดตถูกต้องตรงกันทั้งระบบ'
        },
        bodyHtml: `
<p>ฐานข้อมูลเชิงสัมพันธ์ (RDBMS เช่น PostgreSQL, MySQL, Oracle, SQL Server, SQLite) จัดเก็บข้อมูลในรูปแบบ<strong>ตาราง (Table / Relation)</strong> ประกอบด้วย<strong>แถว (Row / Record / Tuple)</strong> และ<strong>คอลัมน์ (Column / Field / Attribute)</strong> โดยมีกฎควบคุมความถูกต้องของข้อมูลที่ออกสอบบ่อยดังนี้ครับ</p>

<h3>ชนิดของ Key ที่ต้องแม่นก่อนเข้าห้องสอบ</h3>
<div class="table-wrap">
  <table>
    <caption>ตารางสรุปชนิดของคีย์ในฐานข้อมูลเชิงสัมพันธ์</caption>
    <thead>
      <tr>
        <th scope="col">ชนิดของ Key</th>
        <th scope="col">ความหมายและคุณสมบัติสำคัญ</th>
        <th scope="col">ตัวอย่างจากระบบกรมที่ดิน</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th scope="row">Super Key</th>
        <td>คอลัมน์เดียวหรือหลายคอลัมน์รวมกันที่ระบุตัวตนแถวได้ไม่ซ้ำ (อาจมีคอลัมน์เกินจำเป็นติดมาด้วย)</td>
        <td><code>{plot_id, deed_no}</code> หรือ <code>{plot_id, zone_type}</code></td>
      </tr>
      <tr>
        <th scope="row">Candidate Key</th>
        <td>Super Key ที่น้อยที่สุด (Minimal) ไม่ซ้ำและไม่มีคอลัมน์ส่วนเกิน พร้อมจะถูกเลือกเป็น PK</td>
        <td><code>plot_id</code> หรือ <code>(deed_no, office_id)</code></td>
      </tr>
      <tr>
        <th scope="row">Primary Key (PK)</th>
        <td>Candidate Key ที่ถูกเลือกเป็นกุญแจหลักประจำตาราง มีได้ชุดเดียวต่อตาราง <strong>ห้ามซ้ำ (Unique) และห้ามเป็นค่าว่าง (NOT NULL)</strong></td>
        <td><code>plot_id</code> ในตาราง <code>land_plots</code></td>
      </tr>
      <tr>
        <th scope="row">Alternate Key</th>
        <td>Candidate Key ตัวอื่นๆ ที่ไม่ได้ถูกเลือกเป็น Primary Key</td>
        <td>เลขบัตรประชาชน (กรณีใช้ <code>user_id</code> เป็น PK)</td>
      </tr>
      <tr>
        <th scope="row">Composite Key</th>
        <td>Primary Key ที่ประกอบขึ้นจาก <strong>2 คอลัมน์ขึ้นไปร่วมกัน</strong> จึงจะไม่ซ้ำ</td>
        <td><code>(tx_id, item_seq)</code> ในตารางรายการย่อย</td>
      </tr>
      <tr>
        <th scope="row">Foreign Key (FK)</th>
        <td>คอลัมน์ที่อ้างอิงไปหา PK (หรือ Unique Key) ของอีกตาราง เพื่อรักษา <strong>Referential Integrity</strong> (ห้ามอ้างรหัสที่ไม่มีอยู่จริง)</td>
        <td><code>office_id</code> และ <code>owner_id</code> ในตาราง <code>land_plots</code></td>
      </tr>
    </tbody>
  </table>
</div>

<h3>คุณสมบัติ ACID ของ Transaction (ออกสอบระบบงานสำคัญประจำ!)</h3>
<p>เมื่อประชาชนจดทะเบียนโอนขายที่ดิน 1 แปลง ระบบต้องเปลี่ยนชื่อผู้ถือกรรมสิทธิ์<em>พร้อมกับ</em>บันทึกใบเสร็จค่าธรรมเนียมใน Transaction เดียวกัน จะสำเร็จครึ่งๆ กลางๆ ไม่ได้ จึงต้องพึ่งหลัก <strong>ACID</strong>:</p>
<ul>
  <li><strong>A — Atomicity (ความเป็นหนึ่งเดียว):</strong> "All or Nothing" ต้องสำเร็จครบทุกคำสั่ง (<code>COMMIT</code>) หรือหากเกิดข้อผิดพลาด/ไฟดับระหว่างทาง ต้องย้อนกลับสภาพเดิมทั้งหมด (<code>ROLLBACK</code>)</li>
  <li><strong>C — Consistency (ความถูกต้องสอดคล้อง):</strong> หลังจบ Transaction ข้อมูลต้องเป็นไปตามกฎ Constraint ทั้งหมด เช่น ยอดเงินหรือ Foreign Key ไม่เพี้ยน</li>
  <li><strong>I — Isolation (ความเป็นอิสระต่อกัน):</strong> แม้มีเจ้าหน้าที่หลายร้อยคนใช้งานพร้อมกัน Transaction หนึ่งต้องไม่รบกวนผลลัพธ์ระหว่างทำงานของอีกตัว (Concurrency Control)</li>
  <li><strong>D — Durability (ความคงทนถาวร):</strong> เมื่อระบบแจ้งว่า <code>COMMIT</code> สำเร็จแล้ว ข้อมูลจะถูกบันทึกถาวรลง Storage แม้เซิร์ฟเวอร์ดับทันทีหลังจากนั้นข้อมูลก็ไม่หาย</li>
</ul>`
      },
      {
        id: 'er-diagram',
        title: '2. การออกแบบ ER Diagram และความสัมพันธ์ 1:1, 1:N, M:N',
        bodyHtml: `
<p>ก่อนเขียนคำสั่ง <code>CREATE TABLE</code> นักวิเคราะห์ระบบจะวาด <strong>ER Diagram (Entity-Relationship Diagram)</strong> เพื่อมองภาพรวมของข้อมูลและความสัมพันธ์ (Cardinality) ระหว่าง Entity:</p>

<ul>
  <li><strong>1:1 (One-to-One):</strong> หนึ่งแถวของ A คู่กับไม่เกินหนึ่งแถวของ B เช่น 1 แปลงที่ดิน มี 1 ข้อมูลพิกัดจุดศูนย์กลางระวาง</li>
  <li><strong>1:N (One-to-Many):</strong> ความสัมพันธ์ยอดฮิตที่สุด — ฝั่ง "One" นำ PK ของตัวเองไปวางเป็น <strong>FK ในฝั่ง "Many"</strong> เช่น 1 สำนักงานที่ดิน (<code>land_offices</code>) ดูแลได้หลายแปลงที่ดิน (<code>land_plots</code>) ดังนั้นจึงนำ <code>office_id</code> ไปเป็น FK ในตาราง <code>land_plots</code></li>
  <li><strong>M:N (Many-to-Many):</strong> เช่น เจ้าของที่ดิน 1 คนถือครองร่วมกันได้หลายแปลง และ 1 แปลงก็มีผู้ถือกรรมสิทธิ์ร่วมได้หลายคน ในฐานข้อมูลเชิงสัมพันธ์ไม่สามารถใส่ M:N ตรงๆ ได้ <strong>ต้องแตกเป็นตารางเชื่อมกลาง (Junction / Associative Table)</strong> เสมอ (กลายเป็น 1:N สองข้างชนกัน)</li>
</ul>

<div class="callout callout-info">
  <strong><i class="fa-solid fa-circle-info" aria-hidden="true"></i> โครงสร้างตารางจริงในลานซ้อม SQL ของแพลตฟอร์มนี้:</strong>
  ด้านล่างคือแผนภาพ ER ของฐานข้อมูลจำลองกรมที่ดิน 4 ตาราง (<code>land_offices</code>, <code>users</code>, <code>land_plots</code>, <code>transactions</code>) ซึ่งคุณจะได้ลงมือรันคำสั่ง SQL จริงในหัวข้อถัดไปและหน้าลานซ้อม SQL!
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
          title: 'เปรียบเทียบให้เห็นภาพ: จัดระเบียบแฟ้มลดความซ้ำซ้อน',
          body: 'ตารางที่ยังไม่ทำ Normalization จะเจอปัญหา <strong>3 Anomaly</strong>: <strong>Insert Anomaly</strong> (อยากเพิ่มรายชื่อสำนักงานที่ดินใหม่แต่ยังไม่มีแปลงที่ดินก็เพิ่มไม่ได้), <strong>Update Anomaly</strong> (เปลี่ยนชื่อสำนักงานต้องไล่แก้ทุกแถว), และ <strong>Delete Anomaly</strong> (ลบข้อมูลแปลงที่ดินเดียวที่มีอยู่ ทำให้ข้อมูลสำนักงานหายตามไปด้วย)'
        },
        bodyHtml: `
<p>เรามาดูตัวอย่างจริงทีละขั้นจากตารางดิบ (Unnormalized Form: UNF) ที่รวมข้อมูลทุกอย่างปนกันในตารางเดียว แล้วค่อยๆ แปลงเป็น <strong>1NF → 2NF → 3NF</strong> แบบเห็นภาพชัดเจนครับ</p>

<h3>Before: ตารางดิบก่อน Normalize (Unnormalized Form - UNF)</h3>
<p>สังเกตว่าช่อง <code>tx_list</code> มีข้อมูลซ้อนหลายค่าในช่องเดียว (Repeating Group) และเก็บชื่อเจ้าของกับชื่อสำนักงานซ้ำทุกแถว</p>
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

<h3>ขั้นที่ 1 (1NF - First Normal Form): ค่าต้องเป็นหน่วยย่อย (Atomic) ไม่มีกลุ่มซ้ำ</h3>
<p><strong>กฎ 1NF:</strong> แต่ละเซลล์ต้องเก็บค่าเดียวเท่านั้น ห้ามมีลิสต์หลายรายการในช่องเดียว เราจึงแยก <code>tx_date</code> และ <code>tx_type</code> ออกมาเป็นแถวละ 1 รายการ โดยให้ Primary Key ร่วมคือ <code>(deed_no, tx_date)</code></p>
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

<h3>ขั้นที่ 2 (2NF - Second Normal Form): ขจัด Partial Dependency</h3>
<p><strong>กฎ 2NF:</strong> ต้องเป็น 1NF ก่อน และ<strong>ทุกคอลัมน์ที่ไม่ใช่คีย์ต้องขึ้นอยู่กับ Primary Key ทั้งชุด</strong> ห้ามขึ้นอยู่กับแค่ส่วนใดส่วนหนึ่งของ Composite Key<br>
<em>ปัญหาที่เจอใน 1NF ด้านบน:</em> PK คือ <code>(deed_no, tx_date)</code> แต่ <code>owner_id, owner_name, office_id, office_name</code> ขึ้นอยู่กับแค่ <code>deed_no</code> ตัวเดียว ไม่ได้ขึ้นอยู่กับ <code>tx_date</code>! เราจึงแตกออกเป็น 2 ตาราง:</p>
<div class="table-wrap">
  <table>
    <caption>ผลลัพธ์หลังทำ 2NF: แยกตาราง PLOTS_2NF และ TRANSACTIONS_2NF ออกจากกัน</caption>
    <thead>
      <tr>
        <th scope="col">ตารางที่แยกได้ (2NF)</th>
        <th scope="col">โครงสร้างคอลัมน์ (PK / FK)</th>
        <th scope="col">ความหมาย</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th scope="row">TRANSACTIONS_2NF</th>
        <td><code>tx_id (PK), deed_no (FK), tx_date, tx_type</code></td>
        <td>เก็บประวัติธุรกรรมแต่ละครั้ง ไม่ต้องเก็บชื่อเจ้าของหรือสำนักงานซ้ำ</td>
      </tr>
      <tr>
        <th scope="row">PLOTS_2NF</th>
        <td><code>deed_no (PK), owner_id, owner_name, office_id, office_name</code></td>
        <td>ยังเหลือปัญหา Transitive Dependency เพราะ <code>office_name</code> ขึ้นกับ <code>office_id</code>!</td>
      </tr>
    </tbody>
  </table>
</div>

<h3>ขั้นที่ 3 (3NF - Third Normal Form): ขจัด Transitive Dependency (After สุดท้าย)</h3>
<p><strong>กฎ 3NF:</strong> ต้องเป็น 2NF ก่อน และ<strong>ห้ามคอลัมน์ที่ไม่ใช่คีย์ไปขึ้นต่อกันเอง (Transitive Dependency: A → B → C)</strong><br>
ใน <code>PLOTS_2NF</code> จะเห็นว่า <code>deed_no → office_id → office_name</code> และ <code>deed_no → owner_id → owner_name</code> จึงต้องแยก <code>USERS</code> และ <code>LAND_OFFICES</code> ออกไปเป็นตารางอิสระ ได้โครงสร้าง <strong>3NF ที่สะอาดพร้อมใช้งานจริง</strong> ดังนี้:</p>
<div class="table-wrap">
  <table>
    <caption>After (3NF): ตารางอิสระ 4 ตารางที่ปราศจากความซ้ำซ้อนและ Anomaly</caption>
    <thead>
      <tr>
        <th scope="col">ชื่อตาราง (3NF)</th>
        <th scope="col">คอลัมน์หลัก</th>
        <th scope="col">การเชื่อมโยง</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th scope="row">LAND_OFFICES</th>
        <td><code>office_id (PK), office_name, province</code></td>
        <td>1 สำนักงาน มีหลายแปลง</td>
      </tr>
      <tr>
        <th scope="row">USERS</th>
        <td><code>user_id (PK), full_name, citizen_type</code></td>
        <td>1 เจ้าของ ถือครองได้หลายแปลง</td>
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
</div>`
      },
      {
        id: 'sql-select-where',
        title: '4. คำสั่ง SQL พื้นฐาน: DDL, DML, DQL และ SELECT / WHERE / ORDER BY',
        bodyHtml: `
<p>ภาษา <strong>SQL (Structured Query Language)</strong> แบ่งออกเป็นหมวดหมู่ที่มักถูกถามในข้อสอบ ดังนี้ครับ:</p>
<ul>
  <li><strong>DDL (Data Definition Language):</strong> จัดการโครงสร้างตาราง — <code>CREATE</code>, <code>ALTER</code>, <code>DROP</code>, <code>TRUNCATE</code> (สังเกต: <code>TRUNCATE</code> ลบข้อมูลทั้งตารางเร็วและคืนพื้นที่ แต่โครงสร้างตารางยังอยู่ ส่วน <code>DROP</code> ลบทิ้งทั้งตาราง)</li>
  <li><strong>DML (Data Manipulation Language):</strong> จัดการข้อมูลในแถว — <code>INSERT</code>, <code>UPDATE</code>, <code>DELETE</code> (<code>DELETE</code> ลบเฉพาะแถวที่ตรง <code>WHERE</code> และ <code>ROLLBACK</code> ได้)</li>
  <li><strong>DQL (Data Query Language):</strong> สอบถามดึงข้อมูล — <code>SELECT</code></li>
  <li><strong>DCL (Data Control Language):</strong> กำหนดสิทธิ์ — <code>GRANT</code>, <code>REVOKE</code></li>
  <li><strong>TCL (Transaction Control Language):</strong> ควบคุมทรานแซกชัน — <code>COMMIT</code>, <code>ROLLBACK</code>, <code>SAVEPOINT</code></li>
</ul>

<h3>ลำดับการทำงานจริงของ SQL (Query Execution Order)</h3>
<p>ข้อสอบชอบหลอกเรื่องนี้มาก! ถึงแม้เราจะเขียน <code>SELECT</code> เป็นคำแรก แต่เครื่องยนต์ฐานข้อมูลประมวลผลจริงตามลำดับนี้:</p>
<pre tabindex="0"><code>1. FROM / JOIN    -- ดึงตารางและเชื่อมตาราง
2. WHERE          -- กรองแถวดิบทีละแถว (ห้ามใช้ Aggregate เช่น COUNT/SUM ใน WHERE!)
3. GROUP BY       -- จัดกลุ่มแถวตามคอลัมน์ที่ระบุ
4. HAVING         -- กรอง "กลุ่ม" หลังจากจัดกลุ่มและคำนวณ Aggregate แล้ว
5. SELECT         -- เลือกคอลัมน์และตั้งชื่อเล่น (Alias AS)
6. ORDER BY       -- เรียงลำดับผลลัพธ์ (ASC น้อยไปมาก / DESC มากไปน้อย)
7. LIMIT          -- ตัดเอาเฉพาะจำนวนแถวที่ต้องการ</code></pre>

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
        bodyHtml: `
<p>เมื่อเรา Normalize ตารางแยกออกจากกันแล้ว เวลาต้องการดูรายงานที่แสดงทั้ง<em>ชื่อเจ้าของ</em>และ<em>เลขโฉนด</em>พร้อมกัน เราต้องใช้คำสั่ง <strong>JOIN</strong> ซึ่งมี 4 แบบหลักที่ออกสอบบ่อย:</p>

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
        <td>ดูรายการแปลงที่ดินที่มีข้อมูลเจ้าของจับคู่ถูกต้อง</td>
      </tr>
      <tr>
        <th scope="row">LEFT (OUTER) JOIN</th>
        <td>คืนค่าตาราง <strong>ฝั่งซ้ายทั้งหมด</strong> แม้ฝั่งขวาไม่มีคู่ (ช่องฝั่งขวาจะเป็น <code>NULL</code>)</td>
        <td>ดูรายชื่อผู้ใช้ทั้งหมด รวมถึงคนที่ <em>ยังไม่มี</em> แปลงที่ดิน</td>
      </tr>
      <tr>
        <th scope="row">RIGHT (OUTER) JOIN</th>
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

<h3>Aggregate Functions &amp; ตัวอย่าง JOIN หลายตาราง</h3>
<p>ฟังก์ชันรวมกลุ่มพื้นฐานมี 5 ตัวคือ <code>COUNT()</code>, <code>SUM()</code>, <code>AVG()</code>, <code>MAX()</code>, <code>MIN()</code> เมื่อใช้คู่กับคอลัมน์ปกติใน <code>SELECT</code> ต้องใส่คอลัมน์ปกตินั้นใน <code>GROUP BY</code> เสมอ และหากต้องการกรองผลลัพธ์ของฟังก์ชันรวมกลุ่ม (เช่น เอาเฉพาะสำนักงานที่มีแปลงที่ดินตั้งแต่ 2 แปลงขึ้นไป) ต้องใช้ <strong><code>HAVING COUNT(p.plot_id) &gt;= 2</code></strong> ห้ามใช้ <code>WHERE</code>!</p>

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
