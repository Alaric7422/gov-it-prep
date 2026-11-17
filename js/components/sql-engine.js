/**
 * Dual-Engine SQL Sandbox & Mini-Runner for Gov IT Prep.
 * Primary: sql.js v1.10.3 (SQLite WASM).
 * Fallback: AlaSQL (pure JS) when WASM/CDN fails (e.g., offline or strict file:// CORS).
 * Seeds 4 Department of Lands tables + 10 guided Thai SQL challenges.
 */
(function (global) {
  'use strict';

  var SQLJS_CDN_BASE = 'https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.10.3/';
  var ALASQL_DB_NAME = 'dol_gov_prep';

  var activeEngine = 'none'; // 'sqljs' | 'alasql' | 'none'
  var sqlJsModule = null;
  var sqlJsDb = null;
  var initPromise = null;

  var SEED_SQL = [
    'DROP TABLE IF EXISTS transactions;',
    'DROP TABLE IF EXISTS land_plots;',
    'DROP TABLE IF EXISTS users;',
    'DROP TABLE IF EXISTS land_offices;',
    '',
    'CREATE TABLE land_offices (',
    '  office_id INT PRIMARY KEY,',
    '  office_name TEXT,',
    '  province TEXT,',
    '  region TEXT,',
    '  cross_office_ready INT',
    ');',
    '',
    'CREATE TABLE users (',
    '  user_id INT PRIMARY KEY,',
    '  full_name TEXT,',
    '  citizen_type TEXT,',
    '  province TEXT,',
    '  registered_year INT',
    ');',
    '',
    'CREATE TABLE land_plots (',
    '  plot_id INT PRIMARY KEY,',
    '  deed_no TEXT,',
    '  deed_type TEXT,',
    '  office_id INT,',
    '  owner_id INT,',
    '  rai INT,',
    '  ngan INT,',
    '  sq_wah NUMERIC,',
    '  appraised_price_per_wah INT,',
    '  zone_type TEXT',
    ');',
    '',
    'CREATE TABLE transactions (',
    '  tx_id INT PRIMARY KEY,',
    '  plot_id INT,',
    '  tx_type TEXT,',
    '  tx_date TEXT,',
    '  fee_amount INT,',
    '  channel TEXT',
    ');',
    '',
    "INSERT INTO land_offices (office_id, office_name, province, region, cross_office_ready) VALUES",
    "  (1, 'สำนักงานที่ดินกรุงเทพมหานคร สาขาพระโขนง', 'กรุงเทพมหานคร', 'ภาคกลาง', 1),",
    "  (2, 'สำนักงานที่ดินจังหวัดนนทบุรี', 'นนทบุรี', 'ภาคกลาง', 1),",
    "  (3, 'สำนักงานที่ดินจังหวัดเชียงใหม่', 'เชียงใหม่', 'ภาคเหนือ', 1),",
    "  (4, 'สำนักงานที่ดินจังหวัดขอนแก่น', 'ขอนแก่น', 'ภาคตะวันออกเฉียงเหนือ', 1),",
    "  (5, 'สำนักงานที่ดินจังหวัดชลบุรี สาขาบางละมุง', 'ชลบุรี', 'ภาคตะวันออก', 1),",
    "  (6, 'สำนักงานที่ดินจังหวัดภูเก็ต', 'ภูเก็ต', 'ภาคใต้', 1),",
    "  (7, 'สำนักงานที่ดินจังหวัดนครราชสีมา สาขาปากช่อง', 'นครราชสีมา', 'ภาคตะวันออกเฉียงเหนือ', 0),",
    "  (8, 'สำนักงานที่ดินจังหวัดสงขลา', 'สงขลา', 'ภาคใต้', 0);",
    '',
    "INSERT INTO users (user_id, full_name, citizen_type, province, registered_year) VALUES",
    "  (1, 'นายสมชาย ใจดี', 'บุคคลธรรมดา', 'กรุงเทพมหานคร', 2021),",
    "  (2, 'นางสาวพิมพ์ชนก รักษ์ดิน', 'บุคคลธรรมดา', 'นนทบุรี', 2022),",
    "  (3, 'บริษัท สยามแลนด์ ดีเวลลอปเมนท์ จำกัด', 'นิติบุคคล', 'กรุงเทพมหานคร', 2020),",
    "  (4, 'นายกิตติพงษ์ แสงทอง', 'บุคคลธรรมดา', 'เชียงใหม่', 2023),",
    "  (5, 'นางนภาพร ศรีสุข', 'บุคคลธรรมดา', 'ขอนแก่น', 2022),",
    "  (6, 'บริษัท บูรพาพร็อพเพอร์ตี้ จำกัด', 'นิติบุคคล', 'ชลบุรี', 2021),",
    "  (7, 'Mr. Daniel Carter', 'ชาวต่างชาติ', 'ภูเก็ต', 2024),",
    "  (8, 'นายธนากร มั่นคง', 'บุคคลธรรมดา', 'นครราชสีมา', 2024),",
    "  (9, 'นางสาววิภาดา วงศ์สุวรรณ', 'บุคคลธรรมดา', 'สงขลา', 2025),",
    "  (10, 'นายภูมิพัฒน์ พงษ์ไพบูลย์', 'บุคคลธรรมดา', 'เชียงใหม่', 2025);",
    '',
    "INSERT INTO land_plots (plot_id, deed_no, deed_type, office_id, owner_id, rai, ngan, sq_wah, appraised_price_per_wah, zone_type) VALUES",
    "  (1, 'น.ส.4จ-10452', 'น.ส.4 จ.', 1, 3, 2, 1, 50, 185000, 'พาณิชยกรรม'),",
    "  (2, 'น.ส.4จ-22891', 'น.ส.4 จ.', 1, 1, 0, 1, 25, 140000, 'ที่อยู่อาศัย'),",
    "  (3, 'น.ส.4จ-33104', 'น.ส.4 จ.', 2, 2, 0, 2, 80, 62000, 'ที่อยู่อาศัย'),",
    "  (4, 'น.ส.4จ-45019', 'น.ส.4 จ.', 3, 4, 1, 3, 10, 48000, 'ที่อยู่อาศัย'),",
    "  (5, 'น.ส.3ก-11902', 'น.ส.3 ก.', 4, 5, 5, 0, 0, 8500, 'เกษตรกรรม'),",
    "  (6, 'น.ส.4จ-55820', 'น.ส.4 จ.', 5, 6, 4, 2, 40, 75000, 'อุตสาหกรรม'),",
    "  (7, 'อ.ช.2-8841', 'อ.ช.2', 6, 7, 0, 0, 32, 120000, 'ที่อยู่อาศัย'),",
    "  (8, 'น.ส.4จ-67210', 'น.ส.4 จ.', 6, 3, 1, 1, 60, 165000, 'พาณิชยกรรม'),",
    "  (9, 'น.ส.3-04915', 'น.ส.3', 7, 8, 8, 2, 0, 4200, 'เกษตรกรรม'),",
    "  (10, 'น.ส.3ก-78201', 'น.ส.3 ก.', 8, 9, 2, 0, 45, 19500, 'ที่อยู่อาศัย'),",
    "  (11, 'น.ส.4จ-91033', 'น.ส.4 จ.', 2, 1, 0, 3, 15, 54000, 'ที่อยู่อาศัย'),",
    "  (12, 'น.ส.4จ-99407', 'น.ส.4 จ.', 5, 6, 3, 1, 20, 82000, 'พาณิชยกรรม');",
    '',
    "INSERT INTO transactions (tx_id, plot_id, tx_type, tx_date, fee_amount, channel) VALUES",
    "  (101, 1, 'ซื้อขาย', '2024-03-15', 95000, 'เคาน์เตอร์สำนักงาน'),",
    "  (102, 2, 'จำนอง', '2024-04-20', 22000, 'เคาน์เตอร์สำนักงาน'),",
    "  (103, 3, 'ซื้อขาย', '2024-06-11', 38500, 'จดทะเบียนออนไลน์ต่างสำนักงาน'),",
    "  (104, 4, 'โอนมรดก', '2024-08-05', 12000, 'e-QLands + เคาน์เตอร์'),",
    "  (105, 5, 'จำนอง', '2024-09-18', 6500, 'เคาน์เตอร์สำนักงาน'),",
    "  (106, 6, 'ซื้อขาย', '2024-11-02', 74000, 'จดทะเบียนออนไลน์ต่างสำนักงาน'),",
    "  (107, 7, 'ซื้อขาย', '2024-12-10', 46000, 'เคาน์เตอร์สำนักงาน'),",
    "  (108, 8, 'จำนอง', '2025-01-14', 52000, 'e-QLands + เคาน์เตอร์'),",
    "  (109, 2, 'ไถ่ถอนจำนอง', '2025-01-28', 1500, 'จดทะเบียนออนไลน์ต่างสำนักงาน'),",
    "  (110, 1, 'จำนอง', '2025-02-09', 88000, 'เคาน์เตอร์สำนักงาน'),",
    "  (111, 3, 'ให้', '2025-02-19', 18000, 'e-QLands + เคาน์เตอร์'),",
    "  (112, 6, 'แบ่งแยก', '2025-03-04', 15500, 'เคาน์เตอร์สำนักงาน'),",
    "  (113, 9, 'โอนมรดก', '2025-03-12', 4200, 'เคาน์เตอร์สำนักงาน'),",
    "  (114, 10, 'ซื้อขาย', '2025-03-25', 21000, 'e-QLands + เคาน์เตอร์');"
  ].join('\n');

  var SCHEMA_METADATA = [
    {
      tableName: 'land_offices',
      thaiName: 'สำนักงานที่ดิน',
      description: 'ข้อมูลสำนักงานที่ดินจังหวัด/สาขา และความพร้อมบริการจดทะเบียนออนไลน์ต่างสำนักงาน',
      sampleQuery: 'SELECT * FROM land_offices;',
      columns: [
        { name: 'office_id', type: 'INT', isPK: true, isFK: false, description: 'รหัสสำนักงานที่ดิน' },
        { name: 'office_name', type: 'TEXT', isPK: false, isFK: false, description: 'ชื่อสำนักงานที่ดิน' },
        { name: 'province', type: 'TEXT', isPK: false, isFK: false, description: 'จังหวัดที่ตั้ง' },
        { name: 'region', type: 'TEXT', isPK: false, isFK: false, description: 'ภูมิภาค' },
        { name: 'cross_office_ready', type: 'INT', isPK: false, isFK: false, description: 'ความพร้อมจดทะเบียนต่างสำนักงาน (1=พร้อม, 0=ยังไม่พร้อม)' }
      ]
    },
    {
      tableName: 'users',
      thaiName: 'ผู้ถือกรรมสิทธิ์ / ผู้ขอใช้บริการ',
      description: 'ข้อมูลบุคคลธรรมดา นิติบุคคล และชาวต่างชาติที่ลงทะเบียนในระบบ',
      sampleQuery: 'SELECT * FROM users;',
      columns: [
        { name: 'user_id', type: 'INT', isPK: true, isFK: false, description: 'รหัสผู้ใช้งาน' },
        { name: 'full_name', type: 'TEXT', isPK: false, isFK: false, description: 'ชื่อ-นามสกุล หรือชื่อนิติบุคคล' },
        { name: 'citizen_type', type: 'TEXT', isPK: false, isFK: false, description: 'ประเภทผู้ถือสิทธิ (บุคคลธรรมดา/นิติบุคคล/ชาวต่างชาติ)' },
        { name: 'province', type: 'TEXT', isPK: false, isFK: false, description: 'จังหวัดภูมิลำเนา' },
        { name: 'registered_year', type: 'INT', isPK: false, isFK: false, description: 'ปี ค.ศ. ที่ลงทะเบียน' }
      ]
    },
    {
      tableName: 'land_plots',
      thaiName: 'แปลงที่ดินและเอกสารสิทธิ์',
      description: 'รายละเอียดโฉนด/หนังสือรับรองการทำประโยชน์ เนื้อที่ ราคาประเมิน และการใช้ประโยชน์',
      sampleQuery: 'SELECT plot_id, deed_no, deed_type, appraised_price_per_wah, zone_type FROM land_plots;',
      columns: [
        { name: 'plot_id', type: 'INT', isPK: true, isFK: false, description: 'รหัสแปลงที่ดิน' },
        { name: 'deed_no', type: 'TEXT', isPK: false, isFK: false, description: 'เลขที่เอกสารสิทธิ์' },
        { name: 'deed_type', type: 'TEXT', isPK: false, isFK: false, description: 'ประเภทเอกสารสิทธิ์ (น.ส.4 จ., น.ส.3 ก., น.ส.3, อ.ช.2)' },
        { name: 'office_id', type: 'INT', isPK: false, isFK: true, fkRef: 'land_offices.office_id', description: 'รหัสสำนักงานที่ดินผู้รับผิดชอบ' },
        { name: 'owner_id', type: 'INT', isPK: false, isFK: true, fkRef: 'users.user_id', description: 'รหัสผู้ถือกรรมสิทธิ์/ผู้ครอบครอง' },
        { name: 'rai', type: 'INT', isPK: false, isFK: false, description: 'เนื้อที่ (ไร่)' },
        { name: 'ngan', type: 'INT', isPK: false, isFK: false, description: 'เนื้อที่ (งาน)' },
        { name: 'sq_wah', type: 'NUMERIC', isPK: false, isFK: false, description: 'เนื้อที่ (ตารางวา)' },
        { name: 'appraised_price_per_wah', type: 'INT', isPK: false, isFK: false, description: 'ราคาประเมินทุนทรัพย์ (บาท/ตร.ว.)' },
        { name: 'zone_type', type: 'TEXT', isPK: false, isFK: false, description: 'ประเภทผังสี/โซนการใช้ประโยชน์' }
      ]
    },
    {
      tableName: 'transactions',
      thaiName: 'ประวัติการจดทะเบียนสิทธิและนิติกรรม',
      description: 'รายการซื้อขาย จำนอง โอนมรดก แบ่งแยก และช่องทางการให้บริการ',
      sampleQuery: 'SELECT * FROM transactions ORDER BY tx_date DESC;',
      columns: [
        { name: 'tx_id', type: 'INT', isPK: true, isFK: false, description: 'รหัสรายการธุรกรรม' },
        { name: 'plot_id', type: 'INT', isPK: false, isFK: true, fkRef: 'land_plots.plot_id', description: 'รหัสแปลงที่ดินที่ทำธุรกรรม' },
        { name: 'tx_type', type: 'TEXT', isPK: false, isFK: false, description: 'ประเภทนิติกรรม (ซื้อขาย, จำนอง, โอนมรดก ฯลฯ)' },
        { name: 'tx_date', type: 'TEXT', isPK: false, isFK: false, description: 'วันที่จดทะเบียน (YYYY-MM-DD)' },
        { name: 'fee_amount', type: 'INT', isPK: false, isFK: false, description: 'ค่าธรรมเนียมที่จัดเก็บ (บาท)' },
        { name: 'channel', type: 'TEXT', isPK: false, isFK: false, description: 'ช่องทางการยื่นคำขอ' }
      ]
    }
  ];

  var CHALLENGES = [
    {
      id: 'ch-01',
      order: 1,
      level: 'พื้นฐาน',
      title: '1. SELECT & WHERE: ค้นหาโฉนด น.ส.4 จ. ราคาประเมินสูง',
      description: 'ดึงข้อมูล plot_id, deed_no, deed_type และ appraised_price_per_wah จากตาราง land_plots เฉพาะแปลงที่เป็นประเภท "น.ส.4 จ." และมีราคาประเมินต่อตารางวาตั้งแต่ 100,000 บาทขึ้นไป',
      hint: 'ใช้ SELECT ระบุคอลัมน์ จากนั้นกรองด้วย WHERE deed_type = \'น.ส.4 จ.\' AND appraised_price_per_wah >= 100000',
      solutionSql: "SELECT plot_id, deed_no, deed_type, appraised_price_per_wah\nFROM land_plots\nWHERE deed_type = 'น.ส.4 จ.'\n  AND appraised_price_per_wah >= 100000;",
      explanation: [
        'บรรทัด 1: ระบุคอลัมน์ที่ต้องการแสดงผลแทนการใช้ * เพื่อลดภาระการดึงข้อมูลเกินจำเป็น',
        'บรรทัด 2: ระบุตารางต้นทาง land_plots',
        'บรรทัด 3-4: ใช้ WHERE ร่วมกับ AND เพื่อบังคับให้เงื่อนไขทั้งสองเป็นจริงพร้อมกัน'
      ].join('\n')
    },
    {
      id: 'ch-02',
      order: 2,
      level: 'พื้นฐาน',
      title: '2. WHERE + LIKE: กรองธุรกรรมปี 2025 และช่องทางออนไลน์',
      description: 'แสดงรายการธุรกรรมทั้งหมดจากตาราง transactions ที่เกิดขึ้นในปี 2025 (tx_date ขึ้นต้นด้วย "2025-") และมีค่าธรรมเนียมมากกว่า 10,000 บาท',
      hint: 'ใช้ tx_date LIKE \'2025-%\' ร่วมกับ AND fee_amount > 10000',
      solutionSql: "SELECT tx_id, plot_id, tx_type, tx_date, fee_amount, channel\nFROM transactions\nWHERE tx_date LIKE '2025-%'\n  AND fee_amount > 10000;",
      explanation: [
        'บรรทัด 1: เลือกคอลัมน์สำคัญของธุรกรรมมาแสดง',
        'บรรทัด 3: ตัวดำเนินการ LIKE พร้อม wildcard % ใช้จับคู่รูปแบบข้อความที่ขึ้นต้นด้วย 2025-',
        'บรรทัด 4: กรองเพิ่มด้วยตัวดำเนินการเปรียบเทียบ > 10000'
      ].join('\n')
    },
    {
      id: 'ch-03',
      order: 3,
      level: 'พื้นฐาน',
      title: '3. ORDER BY & LIMIT: จัดอันดับ 5 แปลงราคาประเมินสูงสุด',
      description: 'แสดงเลขที่เอกสารสิทธิ์ (deed_no), ประเภทเอกสารสิทธิ์ (deed_type), โซนพื้นที่ (zone_type) และราคาประเมินต่อตารางวา ของ 5 อันดับแรกที่แพงที่สุด',
      hint: 'เรียงลำดับด้วย ORDER BY appraised_price_per_wah DESC แล้วปิดท้ายด้วย LIMIT 5',
      solutionSql: "SELECT deed_no, deed_type, zone_type, appraised_price_per_wah\nFROM land_plots\nORDER BY appraised_price_per_wah DESC\nLIMIT 5;",
      explanation: [
        'บรรทัด 3: ORDER BY ... DESC จัดเรียงข้อมูลจากมากไปน้อย (มากสุดอยู่บนสุด)',
        'บรรทัด 4: LIMIT 5 ตัดเอาเฉพาะ 5 แถวแรกหลังเรียงลำดับเสร็จแล้ว'
      ].join('\n')
    },
    {
      id: 'ch-04',
      order: 4,
      level: 'พื้นฐาน',
      title: '4. Aggregate (COUNT / AVG): สรุปสถิติรวมของ น.ส.4 จ.',
      description: 'คำนวณจำนวนแปลงทั้งหมด (total_plots) และราคาประเมินเฉลี่ยต่อตารางวา (avg_price) เฉพาะแปลงที่เป็น "น.ส.4 จ."',
      hint: 'ใช้ COUNT(*) AS total_plots และ AVG(appraised_price_per_wah) AS avg_price พร้อม WHERE deed_type = \'น.ส.4 จ.\'',
      solutionSql: "SELECT\n  COUNT(*) AS total_plots,\n  AVG(appraised_price_per_wah) AS avg_price\nFROM land_plots\nWHERE deed_type = 'น.ส.4 จ.';",
      explanation: [
        'COUNT(*): นับจำนวนแถวที่ผ่านเงื่อนไข WHERE',
        'AVG(...): หาค่าเฉลี่ยเลขคณิตของคอลัมน์ราคาประเมิน',
        'AS ...: ตั้งชื่อคอลัมน์ผลลัพธ์ (Alias) ให้อ่านเข้าใจง่าย'
      ].join('\n')
    },
    {
      id: 'ch-05',
      order: 5,
      level: 'กลาง',
      title: '5. GROUP BY: สรุปจำนวนแปลงและราคาเฉลี่ยตามประเภทเอกสารสิทธิ์',
      description: 'จัดกลุ่มแปลงที่ดินตาม deed_type เพื่อดูจำนวนแปลง (plot_count) และราคาประเมินสูงสุด (max_price) ของแต่ละประเภท เรียงจากจำนวนแปลงมากไปน้อย',
      hint: 'ใช้ GROUP BY deed_type และเรียงด้วย ORDER BY plot_count DESC',
      solutionSql: "SELECT\n  deed_type,\n  COUNT(*) AS plot_count,\n  MAX(appraised_price_per_wah) AS max_price\nFROM land_plots\nGROUP BY deed_type\nORDER BY plot_count DESC;",
      explanation: [
        'GROUP BY deed_type: ยุบแถวที่มีประเภทเอกสารสิทธิ์เดียวกันให้อยู่กลุ่มเดียวกัน',
        'COUNT(*) และ MAX(...) จะคำนวณแยกภายในแต่ละกลุ่ม',
        'ORDER BY plot_count DESC เรียงผลลัพธ์กลุ่มที่มีจำนวนมากสุดขึ้นก่อน'
      ].join('\n')
    },
    {
      id: 'ch-06',
      order: 6,
      level: 'กลาง',
      title: '6. INNER JOIN (2 ตาราง): แปลงที่ดินพร้อมชื่อสำนักงานที่ดิน',
      description: 'เชื่อมตาราง land_plots กับ land_offices เพื่อแสดง deed_no, deed_type, office_name และ province เฉพาะสำนักงานที่ดินที่พร้อมจดทะเบียนต่างสำนักงาน (cross_office_ready = 1)',
      hint: 'ใช้ INNER JOIN land_offices o ON p.office_id = o.office_id แล้วกรอง WHERE o.cross_office_ready = 1',
      solutionSql: "SELECT\n  p.deed_no,\n  p.deed_type,\n  o.office_name,\n  o.province\nFROM land_plots p\nINNER JOIN land_offices o ON p.office_id = o.office_id\nWHERE o.cross_office_ready = 1;",
      explanation: [
        'ตั้งชื่อย่อตาราง p (land_plots) และ o (land_offices) เพื่ออ้างอิงคอลัมน์ได้กระชับ',
        'ON p.office_id = o.office_id จับคู่ Foreign Key กับ Primary Key ที่ตรงกัน',
        'WHERE o.cross_office_ready = 1 กรองเฉพาะสำนักงานที่เปิดระบบต่างสำนักงานแล้ว'
      ].join('\n')
    },
    {
      id: 'ch-07',
      order: 7,
      level: 'กลาง',
      title: '7. Multi-Table JOIN (3 ตาราง): รายละเอียดธุรกรรมพร้อมชื่อเจ้าของ',
      description: 'เชื่อม transactions, land_plots และ users เข้าด้วยกัน เพื่อแสดง tx_id, tx_date, tx_type, deed_no, full_name (เจ้าของ) และ fee_amount เรียงตามวันที่ล่าสุด',
      hint: 'JOIN ต่อกัน 2 ชั้น: transactions t -> land_plots p (บน plot_id) -> users u (บน owner_id = user_id)',
      solutionSql: "SELECT\n  t.tx_id,\n  t.tx_date,\n  t.tx_type,\n  p.deed_no,\n  u.full_name,\n  t.fee_amount\nFROM transactions t\nINNER JOIN land_plots p ON t.plot_id = p.plot_id\nINNER JOIN users u ON p.owner_id = u.user_id\nORDER BY t.tx_date DESC;",
      explanation: [
        'transactions เก็บ plot_id จึงเชื่อมไปยัง land_plots ได้โดยตรง',
        'land_plots เก็บ owner_id จึงเชื่อมต่อไปยัง users.user_id เพื่อดึงชื่อเจ้าของ (full_name)',
        'ORDER BY t.tx_date DESC แสดงรายการล่าสุดไว้ด้านบน'
      ].join('\n')
    },
    {
      id: 'ch-08',
      order: 8,
      level: 'กลาง',
      title: '8. LEFT JOIN: ตรวจนับธุรกรรมของทุกแปลง (รวมแปลงที่ยังไม่เคยทำรายการ)',
      description: 'แสดง plot_id, deed_no และจำนวนครั้งที่เกิดธุรกรรม (tx_count) ของแปลงที่ดินทุกแปลง โดยแปลงที่ยังไม่เคยมีธุรกรรมเลยต้องแสดงค่า 0',
      hint: 'ใช้ land_plots p LEFT JOIN transactions t ON p.plot_id = t.plot_id และ COUNT(t.tx_id) เพื่อไม่นับ NULL',
      solutionSql: "SELECT\n  p.plot_id,\n  p.deed_no,\n  COUNT(t.tx_id) AS tx_count\nFROM land_plots p\nLEFT JOIN transactions t ON p.plot_id = t.plot_id\nGROUP BY p.plot_id, p.deed_no\nORDER BY tx_count ASC, p.plot_id ASC;",
      explanation: [
        'LEFT JOIN รักษาแถวทั้งหมดของตารางซ้าย (land_plots) แม้ไม่มีคู่ใน transactions (จะได้ NULL)',
        'COUNT(t.tx_id) นับเฉพาะค่าที่ไม่เป็น NULL ดังนั้นแปลงที่ไม่มีธุรกรรมจะได้ 0 (ต่างจาก COUNT(*) ที่จะได้ 1)',
        'ในชุดข้อมูลนี้ แปลง 11 และ 12 จะแสดง tx_count = 0'
      ].join('\n')
    },
    {
      id: 'ch-09',
      order: 9,
      level: 'ขั้นสูง',
      title: '9. GROUP BY + HAVING: หาประเภทนิติกรรมที่เก็บค่าธรรมเนียมรวมสูง',
      description: 'สรุปจำนวนครั้ง (tx_count) และยอดรวมค่าธรรมเนียม (total_fee) แยกตาม tx_type โดยแสดงเฉพาะประเภทที่มียอดรวมค่าธรรมเนียมตั้งแต่ 50,000 บาทขึ้นไป',
      hint: 'WHERE กรองก่อนจัดกลุ่ม ส่วน HAVING กรองผลลัพธ์หลัง GROUP BY เช่น HAVING SUM(fee_amount) >= 50000',
      solutionSql: "SELECT\n  tx_type,\n  COUNT(*) AS tx_count,\n  SUM(fee_amount) AS total_fee\nFROM transactions\nGROUP BY tx_type\nHAVING SUM(fee_amount) >= 50000\nORDER BY total_fee DESC;",
      explanation: [
        'คำสั่ง SQL ประมวลผล GROUP BY ก่อน HAVING เสมอ',
        'ใช้ HAVING SUM(fee_amount) >= 50000 เพื่อกรองระดับกลุ่ม (ไม่สามารถใช้ WHERE กับ SUM ได้)',
        'ข้อสอบ ก.พ./นักวิชาการคอมพิวเตอร์ มักออกเปรียบเทียบความต่างระหว่าง WHERE กับ HAVING บ่อยมาก'
      ].join('\n')
    },
    {
      id: 'ch-10',
      order: 10,
      level: 'ขั้นสูง',
      title: '10. Subquery: หาแปลงที่ดินที่ราคาประเมินสูงกว่าค่าเฉลี่ยทั้งหมด',
      description: 'ค้นหา deed_no, deed_type, zone_type และ appraised_price_per_wah ของแปลงที่ดินที่มีราคาประเมินต่อตารางวาสูงกว่าค่าเฉลี่ยของแปลงทั้งหมดในตาราง land_plots',
      hint: 'เขียน Subquery หาค่าเฉลี่ยในวงเล็บ: WHERE appraised_price_per_wah > (SELECT AVG(appraised_price_per_wah) FROM land_plots)',
      solutionSql: "SELECT\n  deed_no,\n  deed_type,\n  zone_type,\n  appraised_price_per_wah\nFROM land_plots\nWHERE appraised_price_per_wah > (\n  SELECT AVG(appraised_price_per_wah)\n  FROM land_plots\n)\nORDER BY appraised_price_per_wah DESC;",
      explanation: [
        'คิวรีด้านใน (Subquery) จะทำงานก่อนเพื่อหาค่าเฉลี่ยกลางเพียงค่าเดียว (Scalar Subquery)',
        'คิวรีด้านนอกนำค่าเฉลี่ยนั้นมาเปรียบเทียบกับทุกแถวใน land_plots',
        'ช่วยแก้โจทย์เปรียบเทียบกับค่าสถิติรวมได้ในคำสั่งเดียวโดยไม่ต้องคิวรี 2 รอบ'
      ].join('\n')
    }
  ];

  function splitSqlStatements(sql) {
    var statements = [];
    var current = '';
    var inSingleQuote = false;
    var inDoubleQuote = false;
    var inLineComment = false;
    var inBlockComment = false;

    for (var i = 0; i < sql.length; i += 1) {
      var ch = sql[i];
      var next = i + 1 < sql.length ? sql[i + 1] : '';

      if (inLineComment) {
        current += ch;
        if (ch === '\n') inLineComment = false;
        continue;
      }

      if (inBlockComment) {
        current += ch;
        if (ch === '*' && next === '/') {
          current += next;
          i += 1;
          inBlockComment = false;
        }
        continue;
      }

      if (!inSingleQuote && !inDoubleQuote) {
        if (ch === '-' && next === '-') {
          inLineComment = true;
          current += ch;
          continue;
        }
        if (ch === '/' && next === '*') {
          inBlockComment = true;
          current += ch;
          continue;
        }
      }

      if (ch === "'" && !inDoubleQuote) {
        if (inSingleQuote && next === "'") {
          current += "''";
          i += 1;
          continue;
        }
        inSingleQuote = !inSingleQuote;
        current += ch;
        continue;
      }

      if (ch === '"' && !inSingleQuote) {
        inDoubleQuote = !inDoubleQuote;
        current += ch;
        continue;
      }

      if (ch === ';' && !inSingleQuote && !inDoubleQuote) {
        var trimmed = current.trim();
        if (trimmed) statements.push(trimmed);
        current = '';
        continue;
      }

      current += ch;
    }

    var tail = current.trim();
    if (tail) statements.push(tail);
    return statements;
  }

  function stripLeadingComments(stmt) {
    return stmt
      .replace(/^(\s*(--[^\n]*\n|\/\*[\s\S]*?\*\/)\s*)+/g, '')
      .trim();
  }

  function seedSqlJs() {
    if (!sqlJsModule) return false;
    if (sqlJsDb && typeof sqlJsDb.close === 'function') {
      try {
        sqlJsDb.close();
      } catch (e) {
        // Ignore close errors
      }
    }
    sqlJsDb = new sqlJsModule.Database();
    sqlJsDb.run(SEED_SQL);
    return true;
  }

  function seedAlaSql() {
    if (typeof global.alasql !== 'function') {
      throw new Error('ไม่พบไลบรารี AlaSQL ในหน้าเว็บ');
    }
    try {
      global.alasql('CREATE DATABASE IF NOT EXISTS ' + ALASQL_DB_NAME);
      global.alasql('USE ' + ALASQL_DB_NAME);
    } catch (e) {
      // Fallback to default database if CREATE/USE fails
    }

    var stmts = splitSqlStatements(SEED_SQL);
    for (var i = 0; i < stmts.length; i += 1) {
      global.alasql(stmts[i]);
    }
    return true;
  }

  function initSqlJsWithTimeout(timeoutMs) {
    if (typeof global.initSqlJs !== 'function') {
      return Promise.reject(new Error('initSqlJs is not loaded'));
    }

    return new Promise(function (resolve, reject) {
      var settled = false;
      var timer = setTimeout(function () {
        if (!settled) {
          settled = true;
          reject(new Error('sql.js WASM load timed out'));
        }
      }, timeoutMs);

      try {
        global
          .initSqlJs({
            locateFile: function (file) {
              return SQLJS_CDN_BASE + file;
            }
          })
          .then(function (SQL) {
            if (!settled) {
              settled = true;
              clearTimeout(timer);
              resolve(SQL);
            }
          })
          .catch(function (err) {
            if (!settled) {
              settled = true;
              clearTimeout(timer);
              reject(err);
            }
          });
      } catch (err) {
        if (!settled) {
          settled = true;
          clearTimeout(timer);
          reject(err);
        }
      }
    });
  }

  async function initEngine() {
    if (activeEngine !== 'none') {
      return getEngineName();
    }

    try {
      sqlJsModule = await initSqlJsWithTimeout(5500);
      seedSqlJs();
      activeEngine = 'sqljs';
      return getEngineName();
    } catch (sqlJsErr) {
      console.warn('[GOV_PREP sqlEngine] sql.js WASM failed, falling back to AlaSQL:', sqlJsErr && sqlJsErr.message ? sqlJsErr.message : sqlJsErr);
      try {
        seedAlaSql();
        activeEngine = 'alasql';
        return getEngineName();
      } catch (alaErr) {
        activeEngine = 'none';
        console.error('[GOV_PREP sqlEngine] Both sql.js and AlaSQL failed:', alaErr);
        return getEngineName();
      }
    }
  }

  function ensureReady() {
    if (!initPromise) {
      initPromise = initEngine();
    }
    return initPromise;
  }

  function getEngineName() {
    if (activeEngine === 'sqljs') return 'SQLite (sql.js WASM)';
    if (activeEngine === 'alasql') return 'AlaSQL (JS Fallback)';
    return 'ไม่สามารถเชื่อมต่อตัวประมวลผล SQL ได้';
  }

  function rowsFromColumnsValues(columns, values) {
    var rows = [];
    for (var r = 0; r < values.length; r += 1) {
      var obj = {};
      for (var c = 0; c < columns.length; c += 1) {
        obj[columns[c]] = values[r][c];
      }
      rows.push(obj);
    }
    return rows;
  }

  function normalizeAlaResult(res) {
    if (Array.isArray(res)) {
      if (res.length === 0) {
        return { columns: [], rows: [], values: [], rowCount: 0, message: 'รันคำสั่งสำเร็จ (ไม่พบข้อมูลที่ตรงเงื่อนไข 0 แถว)' };
      }
      var firstObj = res[0];
      if (firstObj && typeof firstObj === 'object' && !Array.isArray(firstObj)) {
        var colSet = [];
        for (var i = 0; i < res.length; i += 1) {
          var keys = Object.keys(res[i] || {});
          for (var k = 0; k < keys.length; k += 1) {
            if (colSet.indexOf(keys[k]) === -1) colSet.push(keys[k]);
          }
        }
        var values = res.map(function (row) {
          return colSet.map(function (col) {
            return row[col] !== undefined ? row[col] : null;
          });
        });
        return {
          columns: colSet,
          rows: res,
          values: values,
          rowCount: res.length,
          message: 'พบข้อมูลทั้งหมด ' + res.length + ' แถว'
        };
      }
    }

    if (typeof res === 'number') {
      return {
        columns: [],
        rows: [],
        values: [],
        rowCount: res,
        message: 'ดำเนินการคำสั่งเรียบร้อย (มีผล ' + res + ' แถว)'
      };
    }

    return {
      columns: [],
      rows: [],
      values: [],
      rowCount: 0,
      message: 'รันคำสั่งสำเร็จ'
    };
  }

  function formatThaiSqlError(err) {
    var msg = err && err.message ? String(err.message) : String(err || 'เกิดข้อผิดพลาดไม่ทราบสาเหตุ');
    if (/no such table/i.test(msg)) {
      return msg + ' — คำแนะนำ: ตรวจสอบชื่อตาราง (land_offices, users, land_plots, transactions)';
    }
    if (/no such column/i.test(msg)) {
      return msg + ' — คำแนะนำ: ตรวจสอบชื่อคอลัมน์ใน Schema ด้านบน';
    }
    if (/syntax error|parse error/i.test(msg)) {
      return msg + ' — คำแนะนำ: ตรวจสอบการสะกดคำสั่ง SQL เครื่องหมายจุลภาค (,) หรือเครื่องหมายคำพูด (\'\')';
    }
    return msg;
  }

  async function execute(sql) {
    await ensureReady();
    var trimmed = String(sql || '').trim();
    if (!trimmed) {
      return {
        ok: false,
        engine: getEngineName(),
        columns: [],
        rows: [],
        values: [],
        rowCount: 0,
        message: '',
        durationMs: 0,
        error: 'กรุณาพิมพ์คำสั่ง SQL ก่อนกดรัน'
      };
    }

    if (activeEngine === 'none') {
      return {
        ok: false,
        engine: getEngineName(),
        columns: [],
        rows: [],
        values: [],
        rowCount: 0,
        message: '',
        durationMs: 0,
        error: 'ไม่สามารถโหลดตัวประมวลผล SQL (sql.js / AlaSQL) ได้ กรุณาตรวจสอบการเชื่อมต่ออินเทอร์เน็ตหรือรีเฟรชหน้า'
      };
    }

    var t0 = global.performance && global.performance.now ? global.performance.now() : Date.now();

    try {
      if (activeEngine === 'sqljs') {
        var execResults = sqlJsDb.exec(trimmed);
        var elapsedSqlJs = (global.performance && global.performance.now ? global.performance.now() : Date.now()) - t0;

        if (!execResults || execResults.length === 0) {
          var changes = typeof sqlJsDb.getRowsModified === 'function' ? sqlJsDb.getRowsModified() : 0;
          var cleanFirst = stripLeadingComments(trimmed);
          var isSelectLike = /^(SELECT|WITH|PRAGMA|EXPLAIN)\b/i.test(cleanFirst);
          return {
            ok: true,
            engine: getEngineName(),
            columns: [],
            rows: [],
            values: [],
            rowCount: isSelectLike ? 0 : changes,
            message: isSelectLike
              ? 'รันคำสั่งสำเร็จ (ไม่พบข้อมูลที่ตรงเงื่อนไข 0 แถว)'
              : 'ดำเนินการคำสั่งเรียบร้อย' + (changes ? ' (ปรับปรุง ' + changes + ' แถว)' : ''),
            durationMs: Number(elapsedSqlJs.toFixed(2)),
            error: null
          };
        }

        var lastResult = execResults[execResults.length - 1];
        var cols = lastResult.columns || [];
        var vals = lastResult.values || [];
        return {
          ok: true,
          engine: getEngineName(),
          columns: cols,
          rows: rowsFromColumnsValues(cols, vals),
          values: vals,
          rowCount: vals.length,
          message: 'พบข้อมูลทั้งหมด ' + vals.length + ' แถว',
          durationMs: Number(elapsedSqlJs.toFixed(2)),
          error: null
        };
      }

      // AlaSQL fallback path
      try {
        global.alasql('USE ' + ALASQL_DB_NAME);
      } catch (e) {
        // Ignore if database context already active
      }

      var statements = splitSqlStatements(trimmed);
      var lastAlaRes = null;
      for (var i = 0; i < statements.length; i += 1) {
        var cleanStmt = stripLeadingComments(statements[i]);
        if (!cleanStmt) continue;
        lastAlaRes = global.alasql(cleanStmt);
      }

      var elapsedAla = (global.performance && global.performance.now ? global.performance.now() : Date.now()) - t0;
      var normalized = normalizeAlaResult(lastAlaRes);
      return {
        ok: true,
        engine: getEngineName(),
        columns: normalized.columns,
        rows: normalized.rows,
        values: normalized.values,
        rowCount: normalized.rowCount,
        message: normalized.message,
        durationMs: Number(elapsedAla.toFixed(2)),
        error: null
      };
    } catch (err) {
      var elapsedErr = (global.performance && global.performance.now ? global.performance.now() : Date.now()) - t0;
      return {
        ok: false,
        engine: getEngineName(),
        columns: [],
        rows: [],
        values: [],
        rowCount: 0,
        message: '',
        durationMs: Number(elapsedErr.toFixed(2)),
        error: formatThaiSqlError(err)
      };
    }
  }

  async function resetDatabase() {
    await ensureReady();
    if (activeEngine === 'sqljs') {
      seedSqlJs();
    } else if (activeEngine === 'alasql') {
      seedAlaSql();
    }
    return getEngineName();
  }

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function renderResultTableHtml(res) {
    if (!res.ok) {
      return (
        '<div class="sql-status sql-status-error" role="alert">' +
        '<i class="fa-solid fa-circle-exclamation" aria-hidden="true"></i> ' +
        '<span>' + escapeHtml(res.error) + '</span>' +
        '</div>'
      );
    }

    var metaBar =
      '<div class="sql-status sql-status-ok">' +
      '<span><i class="fa-solid fa-circle-check" aria-hidden="true"></i> ' + escapeHtml(res.message) + '</span>' +
      '<span class="sql-meta-pill">' + escapeHtml(res.engine) + ' • ' + res.durationMs + ' ms</span>' +
      '</div>';

    if (!res.columns.length) {
      return metaBar;
    }

    var headerCells = res.columns
      .map(function (col) {
        return '<th scope="col">' + escapeHtml(col) + '</th>';
      })
      .join('');

    var bodyRows = res.values
      .map(function (row) {
        var tds = row
          .map(function (cell) {
            if (cell === null || cell === undefined) {
              return '<td class="sql-null">NULL</td>';
            }
            return '<td>' + escapeHtml(String(cell)) + '</td>';
          })
          .join('');
        return '<tr>' + tds + '</tr>';
      })
      .join('');

    return (
      metaBar +
      '<div class="table-wrap">' +
      '<table class="data-table">' +
      '<caption class="visually-hidden">ผลลัพธ์คำสั่ง SQL</caption>' +
      '<thead><tr>' + headerCells + '</tr></thead>' +
      '<tbody>' + bodyRows + '</tbody>' +
      '</table>' +
      '</div>'
    );
  }

  function mountMiniRunner(containerEl, opts) {
    if (!containerEl) return;
    var options = opts || {};
    var initialQuery = options.initialQuery || 'SELECT * FROM land_plots LIMIT 5;';
    var title = options.title || 'ทดลองรันคำสั่ง SQL';
    var description = options.description || '';
    var hint = options.hint || '';

    var runnerId = 'mini-sql-' + Math.random().toString(36).slice(2, 8);
    var html = '<div class="sql-mini-runner">';

    if (!options.hideHeader) {
      var miniHeadingTag = options.headingTag === 'h2' || options.headingTag === 'h4' ? options.headingTag : 'h3';
      html +=
        '<div class="sql-mini-header">' +
        '<' + miniHeadingTag + ' class="sql-mini-title"><i class="fa-solid fa-terminal" aria-hidden="true"></i> ' + escapeHtml(title) + '</' + miniHeadingTag + '>' +
        '<span class="badge-pill" data-sql-engine-badge>กำลังเตรียม SQL Engine...</span>' +
        '</div>';
      if (description) {
        html += '<p class="sql-mini-desc">' + escapeHtml(description) + '</p>';
      }
    }

    html +=
      '<label for="' + runnerId + '" class="visually-hidden">ช่องเขียนคำสั่ง SQL</label>' +
      '<textarea id="' + runnerId + '" class="sql-editor sql-editor-mini" rows="4" spellcheck="false">' +
      escapeHtml(initialQuery) +
      '</textarea>' +
      '<div class="sql-mini-actions">' +
      '<button type="button" class="btn btn-primary btn-sm" data-sql-run>' +
      '<i class="fa-solid fa-play" aria-hidden="true"></i> รันคำสั่ง SQL</button>' +
      '<button type="button" class="btn btn-secondary btn-sm" data-sql-reset-query>' +
      '<i class="fa-solid fa-rotate-left" aria-hidden="true"></i> คืนค่าคำสั่งเริ่มต้น</button>' +
      '</div>';

    if (hint) {
      html +=
        '<details class="hint-details">' +
        '<summary><i class="fa-solid fa-lightbulb" aria-hidden="true"></i> ดูคำใบ้ (Hint)</summary>' +
        '<p>' + escapeHtml(hint) + '</p>' +
        '</details>';
    }

    html += '<div class="sql-mini-output" aria-live="polite"></div>';
    html += '</div>';

    containerEl.innerHTML = html;

    var textarea = containerEl.querySelector('#' + runnerId);
    var runBtn = containerEl.querySelector('[data-sql-run]');
    var resetBtn = containerEl.querySelector('[data-sql-reset-query]');
    var outputEl = containerEl.querySelector('.sql-mini-output');
    var badgeEl = containerEl.querySelector('[data-sql-engine-badge]');

    ensureReady().then(function () {
      if (badgeEl) badgeEl.textContent = getEngineName();
    });

    async function runCurrentQuery() {
      if (!textarea || !outputEl) return;
      if (runBtn) runBtn.disabled = true;
      var result = await execute(textarea.value);
      if (badgeEl) badgeEl.textContent = result.engine;
      outputEl.innerHTML = renderResultTableHtml(result);
      if (runBtn) runBtn.disabled = false;
    }

    if (runBtn) {
      runBtn.addEventListener('click', runCurrentQuery);
    }

    if (resetBtn && textarea) {
      resetBtn.addEventListener('click', function () {
        textarea.value = initialQuery;
        outputEl.innerHTML = '';
        textarea.focus();
      });
    }

    if (textarea) {
      textarea.addEventListener('keydown', function (ev) {
        if ((ev.ctrlKey || ev.metaKey) && ev.key === 'Enter') {
          ev.preventDefault();
          runCurrentQuery();
        }
      });
    }

    // Auto-run initial query once so learners immediately see live data
    runCurrentQuery();
  }

  var sqlEngineApi = {
    init: ensureReady,
    execute: execute,
    resetDatabase: resetDatabase,
    getEngineName: getEngineName,
    getEngineKey: function () {
      return activeEngine;
    },
    getSchemaMetadata: function () {
      return SCHEMA_METADATA.slice();
    },
    getChallenges: function () {
      return CHALLENGES.slice();
    },
    renderResultTableHtml: renderResultTableHtml,
    mountMiniRunner: mountMiniRunner
  };

  global.GOV_PREP = global.GOV_PREP || {};
  global.GOV_PREP.sqlEngine = sqlEngineApi;
  global.GOV_PREP.components = global.GOV_PREP.components || {};
  global.GOV_PREP.components.sqlEngine = sqlEngineApi;
})(window);
