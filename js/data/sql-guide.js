/**
 * SQL Command Guide & Written Exam Workshop Dataset for Gov IT Prep.
 * Teaches every SQL command from zero to civil service written exam level
 * ("สอบข้อเขียน นักวิชาการคอมพิวเตอร์ปฏิบัติการ - กรมที่ดิน")
 * using the exact 4 DOL tables in js/components/sql-engine.js.
 */
(function (global) {
  'use strict';

  var root = global || (typeof window !== 'undefined' ? window : globalThis);
  root.GOV_PREP = root.GOV_PREP || {};

  root.GOV_PREP.sqlGuide = {
    title: 'คู่มือคำสั่ง SQL ครบทุกคำสั่ง (จากศูนย์ → สอบข้อเขียน)',
    subtitle:
      'ปูพื้นตั้งแต่ศูนย์จนเขียน SQL ลงกระดาษข้อสอบได้จริง ทั้ง DDL, DML, DQL, WHERE, GROUP BY, JOIN, Subquery และ CASE พร้อมตัวอย่างรันจริงได้ทันทีบน 4 ตารางกรมที่ดิน',

    introChecklist: [
      {
        step: '1',
        title: 'รู้จัก 4 ตารางหลักและ PK/FK ก่อนเขียน',
        detail:
          'เช็กให้ชัวร์ว่าแต่ละตารางเก็บอะไร และเชื่อมกันด้วยคอลัมน์ไหน (เช่น land_plots.office_id -> land_offices.office_id, land_plots.owner_id -> users.user_id, transactions.plot_id -> land_plots.plot_id)'
      },
      {
        step: '2',
        title: 'แยกให้ออกว่าโจทย์สั่งให้ทำ DDL, DML หรือ DQL',
        detail:
          'โจทย์สั่ง "สร้าง/แก้โครงสร้างตาราง" ใช้ DDL (CREATE/ALTER/DROP), สั่ง "เพิ่ม/แก้/ลบแถวข้อมูล" ใช้ DML (INSERT/UPDATE/DELETE), สั่ง "ค้นหา/สรุปรายงาน" ใช้ DQL (SELECT)'
      },
      {
        step: '3',
        title: 'จำลำดับการทำงาน 7 ขั้นของเครื่องฐานข้อมูล',
        detail:
          'เวลาเขียนขึ้นต้นด้วย SELECT แต่เครื่องรันจริงเริ่มที่ FROM/JOIN -> WHERE -> GROUP BY -> HAVING -> SELECT -> ORDER BY -> LIMIT จึงห้ามเอา Alias จาก SELECT ไปใส่ใน WHERE'
      },
      {
        step: '4',
        title: 'เช็ก 5 จุดตายกันโดนหักคะแนนตอนเขียนด้วยมือ',
        detail:
          '1) ครอบข้อความ/วันที่ด้วย Single Quote (\'...\') เสมอ 2) อย่าลืม WHERE ใน UPDATE/DELETE 3) ห้ามเขียน = NULL ต้องใช้ IS NULL 4) คอลัมน์นอก Aggregate ต้องอยู่ใน GROUP BY 5) ปิดท้ายคำสั่งด้วยเครื่องหมาย ;'
      }
    ],

    executionOrder: [
      {
        step: 1,
        clause: 'FROM / JOIN',
        role: 'ดึงตารางต้นทางและเชื่อมตารางตามเงื่อนไข ON ก่อนเป็นอันดับแรก',
        rule: 'ต้องเชื่อมตารางให้ถูกคู่ FK = PK ก่อนจึงจะมีคอลัมน์จากหลายตารางมาใช้ต่อ'
      },
      {
        step: 2,
        clause: 'WHERE',
        role: 'กรองแถวดิบทีละแถว (Row-level Filter) ก่อนจัดกลุ่ม',
        rule: 'ใช้ฟังก์ชัน SUM/COUNT/AVG และใช้ชื่อ Alias ที่ตั้งใน SELECT ไม่ได้'
      },
      {
        step: 3,
        clause: 'GROUP BY',
        role: 'ยุบแถวที่ผ่าน WHERE แล้วจัดเป็นกลุ่มตามค่าคอลัมน์ที่ระบุ',
        rule: 'คอลัมน์ปกติใน SELECT ที่ไม่อยู่ในฟังก์ชันสรุปผลต้องใส่ในนี้ทั้งหมด'
      },
      {
        step: 4,
        clause: 'HAVING',
        role: 'กรองทั้งกลุ่ม (Group-level Filter) หลังจากจัดกลุ่มและคำนวณ Aggregate แล้ว',
        rule: 'ใช้เงื่อนไข COUNT(...), SUM(...), AVG(...) ได้ในขั้นนี้'
      },
      {
        step: 5,
        clause: 'SELECT',
        role: 'เลือกคอลัมน์ คำนวณสูตรคณิตศาสตร์ ตัดซ้ำ (DISTINCT) และตั้งชื่อ Alias (AS)',
        rule: 'ชื่อ Alias ที่ตั้งในขั้นนี้จะเริ่มมองเห็นได้ใน ORDER BY'
      },
      {
        step: 6,
        clause: 'ORDER BY',
        role: 'เรียงลำดับแถวผลลัพธ์จากน้อยไปมาก (ASC) หรือมากไปน้อย (DESC)',
        rule: 'สามารถอ้างอิงชื่อ Alias ที่ตั้งไว้ใน SELECT ได้แล้ว'
      },
      {
        step: 7,
        clause: 'LIMIT',
        role: 'ตัดเอาเฉพาะจำนวนแถวสูงสุดตามต้องการหลังเรียงลำดับเสร็จ',
        rule: 'ใช้คู่กับ ORDER BY เพื่อหา Top-N (ใน SQL Server ใช้ TOP แทน LIMIT)'
      }
    ],

    dolTables: [
      {
        tableName: 'land_offices',
        thaiName: 'สำนักงานที่ดิน (8 แถว)',
        pk: 'office_id',
        fk: '-',
        sampleSql: 'SELECT * FROM land_offices ORDER BY office_id;',
        columns: [
          { name: 'office_id', type: 'INT', key: 'PK', desc: 'รหัสสำนักงานที่ดิน (1-8)' },
          { name: 'office_name', type: 'TEXT', key: '', desc: 'ชื่อสำนักงานที่ดินจังหวัด/สาขา' },
          { name: 'province', type: 'TEXT', key: '', desc: 'จังหวัดที่ตั้ง' },
          { name: 'region', type: 'TEXT', key: '', desc: 'ภูมิภาค (เช่น ภาคกลาง, ภาคเหนือ)' },
          { name: 'cross_office_ready', type: 'INT', key: '', desc: 'พร้อมจดทะเบียนต่างสำนักงาน (1=พร้อม, 0=ยังไม่พร้อม)' }
        ]
      },
      {
        tableName: 'users',
        thaiName: 'ผู้ถือกรรมสิทธิ์ / ผู้ขอใช้บริการ (10 แถว)',
        pk: 'user_id',
        fk: '-',
        sampleSql: 'SELECT * FROM users ORDER BY user_id;',
        columns: [
          { name: 'user_id', type: 'INT', key: 'PK', desc: 'รหัสผู้ใช้งาน (1-10; หมายเหตุ: user_id 10 ยังไม่มีแปลง)' },
          { name: 'full_name', type: 'TEXT', key: '', desc: 'ชื่อ-นามสกุล หรือชื่อนิติบุคคล' },
          { name: 'citizen_type', type: 'TEXT', key: '', desc: 'บุคคลธรรมดา / นิติบุคคล / ชาวต่างชาติ' },
          { name: 'province', type: 'TEXT', key: '', desc: 'จังหวัดภูมิลำเนา' },
          { name: 'registered_year', type: 'INT', key: '', desc: 'ปี ค.ศ. ที่ลงทะเบียน (2020-2025)' }
        ]
      },
      {
        tableName: 'land_plots',
        thaiName: 'แปลงที่ดินและเอกสารสิทธิ์ (12 แถว)',
        pk: 'plot_id',
        fk: 'office_id -> land_offices, owner_id -> users',
        sampleSql: 'SELECT * FROM land_plots ORDER BY plot_id;',
        columns: [
          { name: 'plot_id', type: 'INT', key: 'PK', desc: 'รหัสแปลงที่ดิน (1-12)' },
          { name: 'deed_no', type: 'TEXT', key: '', desc: 'เลขที่เอกสารสิทธิ์ (เช่น น.ส.4จ-10452)' },
          { name: 'deed_type', type: 'TEXT', key: '', desc: 'น.ส.4 จ. / น.ส.3 ก. / น.ส.3 / อ.ช.2' },
          { name: 'office_id', type: 'INT', key: 'FK', desc: 'อ้างอิง land_offices.office_id' },
          { name: 'owner_id', type: 'INT', key: 'FK', desc: 'อ้างอิง users.user_id' },
          { name: 'rai', type: 'INT', key: '', desc: 'เนื้อที่ (ไร่)' },
          { name: 'ngan', type: 'INT', key: '', desc: 'เนื้อที่ (งาน)' },
          { name: 'sq_wah', type: 'NUMERIC', key: '', desc: 'เนื้อที่ (ตารางวา)' },
          { name: 'appraised_price_per_wah', type: 'INT', key: '', desc: 'ราคาประเมินทุนทรัพย์ (บาท/ตร.ว.)' },
          { name: 'zone_type', type: 'TEXT', key: '', desc: 'พาณิชยกรรม / ที่อยู่อาศัย / เกษตรกรรม / อุตสาหกรรม' }
        ]
      },
      {
        tableName: 'transactions',
        thaiName: 'ประวัติธุรกรรมจดทะเบียนสิทธิฯ (14 แถว)',
        pk: 'tx_id',
        fk: 'plot_id -> land_plots',
        sampleSql: 'SELECT * FROM transactions ORDER BY tx_id;',
        columns: [
          { name: 'tx_id', type: 'INT', key: 'PK', desc: 'รหัสธุรกรรม (101-114)' },
          { name: 'plot_id', type: 'INT', key: 'FK', desc: 'อ้างอิง land_plots.plot_id (แปลง 11-12 ยังไม่มีธุรกรรม)' },
          { name: 'tx_type', type: 'TEXT', key: '', desc: 'ซื้อขาย / จำนอง / โอนมรดก / ไถ่ถอนจำนอง / ให้ / แบ่งแยก' },
          { name: 'tx_date', type: 'TEXT', key: '', desc: 'วันที่จดทะเบียนรูปแบบ YYYY-MM-DD' },
          { name: 'fee_amount', type: 'INT', key: '', desc: 'ค่าธรรมเนียมที่จัดเก็บ (บาท)' },
          { name: 'channel', type: 'TEXT', key: '', desc: 'เคาน์เตอร์สำนักงาน / จดทะเบียนออนไลน์ต่างสำนักงาน / e-QLands + เคาน์เตอร์' }
        ]
      }
    ],

    chapters: [
      // =======================================================================
      // Chapter 1: basics
      // =======================================================================
      {
        id: 'basics',
        order: 1,
        tabLabel: 'พื้นฐาน & Types',
        title: 'บทที่ 1: โครงสร้างฐานข้อมูล, Data Types และความหมายของ NULL',
        badge: 'ปูพื้นจากศูนย์',
        summary:
          'ทำความเข้าใจโครงสร้างตาราง (Table/Row/Column), 4 กลุ่มคำสั่ง SQL, การเลือกใช้ Data Types ให้ถูกต้องในข้อสอบ และเหตุผลที่ห้ามเขียน = NULL เด็ดขาด',
        comparisonTable: {
          caption: 'ตารางสรุปชนิดข้อมูล (Data Types) ที่ออกสอบข้อเขียนบ่อยที่สุด',
          headers: ['ชนิดข้อมูล (Data Type)', 'เก็บค่าแบบไหน?', 'ตัวอย่างใช้งานในระบบกรมที่ดิน', 'จุดระวังในห้องสอบ'],
          rows: [
            ['INT / INTEGER', 'เลขจำนวนเต็ม ไม่มีทศนิยม', 'office_id, rai, ngan, registered_year', 'ห้ามใช้เก็บเลขที่มี 0 นำหน้า เช่น เบอร์โทร หรือรหัสไปรษณีย์ เพราะ 0 หน้าจะหาย'],
            ['DECIMAL(p,s) / NUMERIC', 'เลขทศนิยมแม่นยำสูง (ไม่คลาดเคลื่อน)', 'sq_wah, fee_amount (DECIMAL(12,2))', 'งานเงิน/ภาษี/เนื้อที่ต้องใช้ DECIMAL หรือ NUMERIC ห้ามใช้ FLOAT'],
            ['VARCHAR(n)', 'ข้อความความยาวผันแปร สูงสุด n ตัว', 'full_name VARCHAR(150), deed_no VARCHAR(30)', 'ประหยัดพื้นที่ เพราะเก็บจริงเท่าความยาวข้อความที่กรอก'],
            ['CHAR(n)', 'ข้อความความยาวคงที่ เติมช่องว่างให้ครบ n', 'citizen_id CHAR(13), post_code CHAR(5)', 'เหมาะกับรหัสที่ความยาวเท่ากันทุกแถว เช่น เลข ปชช. 13 หลัก'],
            ['TEXT', 'ข้อความยาวไม่จำกัดจำนวนสั้นๆ', 'remark TEXT, office_address TEXT', 'ไม่เหมาะนำมาทำ Primary Key หรือ Index ค้นหาความเร็วสูง'],
            ['DATE / TIMESTAMP', 'วันที่ (YYYY-MM-DD) และวันที่+เวลา', 'tx_date DATE, created_at TIMESTAMP', 'ตอนเปรียบเทียบใน SQL ต้องครอบด้วย Single Quote เช่น \'2025-03-25\''],
            ['BOOLEAN', 'ค่าความจริง จริง/เท็จ (TRUE / FALSE)', 'cross_office_ready (ใน SQLite เก็บ 1/0)', 'บาง DBMS เก็บเป็น BIT หรือ TINYINT(1) (1=จริง, 0=เท็จ)']
          ]
        },
        items: [
          {
            id: 'basics-1-structure',
            commandName: 'SQL & RDBMS Overview',
            title: '1.1 โครงสร้างตาราง และ 4 กลุ่มคำสั่งหลักของภาษา SQL',
            whatAndWhen:
              'SQL (Structured Query Language) คือภาษามาตรฐานสำหรับสื่อสารกับฐานข้อมูลเชิงสัมพันธ์ (RDBMS) โดยแบ่งข้อมูลเป็นตาราง (Table/Relation) ที่มีแถว (Row/Record/Tuple) และคอลัมน์ (Column/Field/Attribute) คำสั่ง SQL แบ่งออกเป็น 4 กลุ่มหลักตามหน้าที่: DDL (สร้าง/แก้โครงสร้าง), DML (เพิ่ม/แก้/ลบข้อมูล), DQL (สืบค้นด้วย SELECT) และ TCL/DCL (ควบคุม Transaction และสิทธิ์ผู้ใช้)',
            syntaxTemplate: [
              '-- กฎการเขียน SQL มาตรฐานบนกระดาษข้อสอบ:',
              '-- 1) คีย์เวิร์ดไม่สนตัวพิมพ์ใหญ่/เล็ก แต่แนะนำเขียนพิมพ์ใหญ่: SELECT, FROM, WHERE',
              '-- 2) ข้อความ (String) และวันที่ ต้องครอบด้วย Single Quote (\'...\') เสมอ',
              '-- 3) จบคำสั่งทุกครั้งด้วยเครื่องหมายเซมิโคลอน (;)',
              '',
              'SELECT col1, col2',
              'FROM table_name',
              'WHERE condition;'
            ].join('\n'),
            dolExampleTitle: 'ตัวอย่างจริง: ดึงรายชื่อสำนักงานที่ดินจากตาราง land_offices',
            dolExampleSql: 'SELECT office_id, office_name, province, region\nFROM land_offices;',
            dolExampleNote:
              'คืนค่า 8 แถว (4 คอลัมน์) จากตาราง land_offices โดยไม่เปลี่ยนแปลงข้อมูลจริงในฐานข้อมูล',
            runnableSql: 'SELECT office_id, office_name, province, region\nFROM land_offices;',
            runnableLabel: 'ลองรันใน SQL Sandbox',
            examPitfalls: [
              'ใช้ Double Quote ("...") ครอบค่าข้อความแทน Single Quote (\'...\') เช่น WHERE province = "ภูเก็ต" ซึ่งผิดมาตรฐาน SQL ใน Oracle/PostgreSQL/SQL Server',
              'ลืมปิดท้ายคำสั่งด้วยเครื่องหมายเซมิโคลอน (;) เมื่อเขียนคำตอบข้อเขียนหลายคำสั่งต่อกัน'
            ]
          },
          {
            id: 'basics-2-datatypes',
            commandName: 'Data Types (INT / DECIMAL / VARCHAR / CHAR / TEXT / DATE / BOOLEAN)',
            title: '1.2 การเลือกใช้ Data Types ให้แม่นยำ (จุดชี้ชะตาข้อเขียน DDL)',
            whatAndWhen:
              'ใช้เมื่อออกแบบตารางใหม่ด้วย CREATE TABLE หรือแก้ชนิดข้อมูลด้วย ALTER TABLE การเลือก Data Type ผิดทำให้คำนวณเงินเพี้ยน เลข 0 ด้านหน้าหาย หรือเปลืองพื้นที่จัดเก็บมหาศาล จุดที่ข้อสอบถามประจำคือความต่างระหว่าง VARCHAR(n) กับ CHAR(n) และเหตุผลที่ตัวเลขประเภท "รหัส" อย่างเบอร์โทรหรือเลขบัตรประชาชนต้องเก็บเป็นข้อความแทน INT',
            syntaxTemplate: [
              'column_name INT                    -- จำนวนเต็ม เช่น ไร่ งาน จำนวนแปลง',
              'column_name DECIMAL(10, 2)         -- ทศนิยมรวม 10 หลัก หลังจุด 2 หลัก (หรือ NUMERIC)',
              'column_name VARCHAR(100)           -- ข้อความยาวไม่เกิน 100 ตัว (เก็บจริงเท่าที่ใช้)',
              'column_name CHAR(13)               -- ข้อความยาวตายตัว 13 ตัวอักษรพอดี',
              'column_name TEXT                   -- ข้อความยาวมาก (หมายเหตุ/รายละเอียด)',
              'column_name DATE                   -- วันที่มาตรฐาน \'YYYY-MM-DD\'',
              'column_name BOOLEAN                -- ค่าจริง/เท็จ (TRUE / FALSE หรือ 1 / 0)'
            ].join('\n'),
            dolExampleTitle: 'ตัวอย่างจริง: ดูข้อมูลต่างชนิด (INT, TEXT, NUMERIC) ในตาราง land_plots',
            dolExampleSql:
              'SELECT plot_id, deed_no, rai, ngan, sq_wah, appraised_price_per_wah\nFROM land_plots\nORDER BY plot_id\nLIMIT 5;',
            dolExampleNote:
              'plot_id, rai, ngan, appraised_price_per_wah เป็น INT; deed_no เป็น TEXT; sq_wah เป็น NUMERIC เพื่อรองรับเนื้อที่เศษทศนิยมของตารางวา',
            runnableSql:
              'SELECT plot_id, deed_no, rai, ngan, sq_wah, appraised_price_per_wah\nFROM land_plots\nORDER BY plot_id\nLIMIT 5;',
            runnableLabel: 'ลองรันใน SQL Sandbox',
            examPitfalls: [
              'ใช้ INT เก็บเบอร์โทรศัพท์ เลขบัตรประชาชน 13 หลัก หรือรหัสไปรษณีย์ (เลข 0 หน้าหาย เช่น 0812345678 เหลือ 812345678 และเลข 13 หลักเกินขนาด INT 32-bit)',
              'ใช้ FLOAT เก็บจำนวนเงินค่าธรรมเนียมหรือราคาประเมิน ทำให้เกิดเศษทศนิยมคลาดเคลื่อน (เช่น 0.1 + 0.2 != 0.3) ต้องใช้ DECIMAL/NUMERIC เสมอ',
              'ใช้ CHAR(100) กับคอลัมน์ชื่อคน ทำให้ทุกแถวจองพื้นที่เต็ม 100 ตัวอักษรตลอดเวลา เปลืองพื้นที่โดยใช่เหตุ ควรใช้ VARCHAR(100)'
            ]
          },
          {
            id: 'basics-3-null',
            commandName: 'NULL, IS NULL & IS NOT NULL',
            title: '1.3 ความหมายของ NULL และเหตุผลที่ห้ามเขียน = NULL',
            whatAndWhen:
              'NULL หมายถึง "ไม่มีข้อมูล / ยังไม่ทราบค่า (Unknown or Missing Value)" ไม่ใช่เลข 0 และไม่ใช่ข้อความว่าง "" เช่น ช่องค่าธรรมเนียมเป็น 0 แปลว่ายกเว้นค่าธรรมเนียม (รู้ค่าคือ 0) แต่เป็น NULL แปลว่ายังไม่ได้ประเมินค่าธรรมเนียม เนื่องจาก NULL คือ "ไม่รู้ค่า" ในทางคณิตศาสตร์และตรรกะของ SQL การนำสิ่งที่ไม่รู้มาเทียบด้วย = NULL หรือ <> NULL จะได้ผลลัพธ์เป็น UNKNOWN (ไม่จริง) เสมอ จึงต้องใช้ตัวดำเนินการ IS NULL และ IS NOT NULL เท่านั้น',
            syntaxTemplate: [
              '-- ถูกต้อง (ใช้ IS NULL / IS NOT NULL เสมอ):',
              'SELECT * FROM table_name WHERE column_name IS NULL;',
              'SELECT * FROM table_name WHERE column_name IS NOT NULL;',
              '',
              '-- ผิด!! (จะได้ 0 แถวเสมอ แม้มีแถวที่เป็น NULL อยู่จริง):',
              '-- SELECT * FROM table_name WHERE column_name = NULL;'
            ].join('\n'),
            dolExampleTitle: 'ตัวอย่างจริง: หาผู้ใช้ที่ยังไม่เคยมีแปลงที่ดินในระบบ (เกิด NULL จาก LEFT JOIN)',
            dolExampleSql:
              'SELECT u.user_id, u.full_name, u.province, p.plot_id\nFROM users u\nLEFT JOIN land_plots p ON u.user_id = p.owner_id\nWHERE p.plot_id IS NULL;',
            dolExampleNote:
              'เมื่อเชื่อม users (ซ้าย) กับ land_plots (ขวา) ผู้ใช้ที่ยังไม่มีแปลงที่ดินจะมีค่า p.plot_id เป็น NULL จากนั้นกรองด้วย WHERE p.plot_id IS NULL จะพบ user_id = 10 (นายภูมิพัฒน์ พงษ์ไพบูลย์)',
            runnableSql:
              'SELECT u.user_id, u.full_name, u.province, p.plot_id\nFROM users u\nLEFT JOIN land_plots p ON u.user_id = p.owner_id\nWHERE p.plot_id IS NULL;',
            runnableLabel: 'ลองรันใน SQL Sandbox',
            examPitfalls: [
              'เขียน WHERE p.plot_id = NULL หรือ WHERE p.plot_id != NULL — ผิดหลัก SQL ได้ผลลัพธ์ว่างเปล่า 0 แถวทันที',
              'เขียน WHERE p.plot_id IS \'NULL\' (ใส่เครื่องหมาย \'...\' ครอบ NULL) — กลายเป็นการหาข้อความคำว่า "NULL" ไม่ใช่ค่าว่างจริง',
              'เข้าใจผิดว่าช่องที่ว่าง NULL จะถูกนำมาคำนวณ AVG() ด้วยค่า 0 — ความจริง Aggregate อย่าง AVG, SUM, COUNT(col) จะข้ามแถวที่ NULL ทิ้ง (ไม่นับเป็น 0)'
            ]
          }
        ]
      },

      // =======================================================================
      // Chapter 2: ddl
      // =======================================================================
      {
        id: 'ddl',
        order: 2,
        tabLabel: 'DDL (สร้างตาราง)',
        title: 'บทที่ 2: คำสั่ง DDL (CREATE TABLE, ALTER TABLE, DROP, TRUNCATE)',
        badge: 'สร้างและแก้โครงสร้าง',
        summary:
          'DDL (Data Definition Language) คือชุดคำสั่งสำหรับจัดการ "ตัวโครงสร้างตารางและกฎข้อบังคับ (Schema & Constraints)" มีผลถาวรทันที (Auto-commit)',
        comparisonTable: {
          caption: 'เปรียบเทียบ Constraints สำคัญในคำสั่ง CREATE TABLE',
          headers: ['Constraint', 'หน้าที่บังคับ', 'ตัวอย่างการเขียน'],
          rows: [
            ['PRIMARY KEY', 'คีย์หลักระบุตัวตนแถว: ห้ามซ้ำ (Unique) และห้ามว่าง (NOT NULL)', 'plot_id INT PRIMARY KEY'],
            ['FOREIGN KEY ... REFERENCES', 'คีย์นอกเชื่อมไปยัง PK ของตารางแม่ รักษา Referential Integrity', 'FOREIGN KEY (office_id) REFERENCES land_offices(office_id)'],
            ['NOT NULL', 'บังคับว่าต้องกรอกค่า ห้ามปล่อยว่าง NULL', 'deed_no VARCHAR(30) NOT NULL'],
            ['UNIQUE', 'ห้ามมีค่าซ้ำกันในคอลัมน์นี้ (ต่างจาก PK ตรงที่ตารางหนึ่งมี UNIQUE ได้หลายคอลัมน์)', 'citizen_id CHAR(13) UNIQUE'],
            ['CHECK (เงื่อนไข)', 'ตรวจความสมเหตุสมผลของค่าก่อนบันทึก', 'CHECK (rai >= 0 AND ngan BETWEEN 0 AND 3)'],
            ['DEFAULT ค่า', 'กำหนดค่าเริ่มต้นอัตโนมัติเมื่อผู้ใช้ไม่ได้ระบุค่าตอน INSERT', 'status VARCHAR(30) DEFAULT \'รอดำเนินการ\'']
          ]
        },
        items: [
          {
            id: 'ddl-1-create',
            commandName: 'CREATE TABLE & Constraints',
            title: '2.1 CREATE TABLE พร้อม Primary Key, Foreign Key และ Constraints',
            whatAndWhen:
              'ใช้สร้างตารางใหม่พร้อมกำหนดชื่อคอลัมน์ ชนิดข้อมูล (Data Types) และกฎความถูกต้อง (Constraints) ในข้อสอบข้อเขียนมักให้โจทย์สถานการณ์แล้วสั่งให้เขียน CREATE TABLE กำหนด PK, FK, NOT NULL, UNIQUE, CHECK และ DEFAULT โดยหลักสำคัญคือต้องสร้าง "ตารางแม่" (ที่มี PK) ให้เสร็จก่อนจึงจะสร้าง "ตารางลูก" (ที่มี FK ชี้ไปหา) ได้',
            syntaxTemplate: [
              'CREATE TABLE table_name (',
              '  id INT PRIMARY KEY,',
              '  code VARCHAR(30) NOT NULL UNIQUE,',
              '  parent_id INT NOT NULL,',
              '  amount DECIMAL(12, 2) NOT NULL DEFAULT 0 CHECK (amount >= 0),',
              '  created_date DATE,',
              '  FOREIGN KEY (parent_id) REFERENCES parent_table(id)',
              ');'
            ].join('\n'),
            dolExampleTitle: 'ตัวอย่างจริง: สร้างตาราง land_plots ที่เชื่อม land_offices และ users',
            dolExampleSql: [
              'CREATE TABLE land_plots (',
              '  plot_id INT PRIMARY KEY,',
              '  deed_no VARCHAR(30) NOT NULL UNIQUE,',
              '  deed_type VARCHAR(20) NOT NULL,',
              '  office_id INT NOT NULL,',
              '  owner_id INT NOT NULL,',
              '  rai INT NOT NULL DEFAULT 0 CHECK (rai >= 0),',
              '  ngan INT NOT NULL DEFAULT 0 CHECK (ngan >= 0 AND ngan < 4),',
              '  sq_wah NUMERIC(6, 2) NOT NULL DEFAULT 0 CHECK (sq_wah >= 0),',
              '  appraised_price_per_wah INT NOT NULL CHECK (appraised_price_per_wah > 0),',
              '  zone_type VARCHAR(50) NOT NULL,',
              '  FOREIGN KEY (office_id) REFERENCES land_offices(office_id),',
              '  FOREIGN KEY (owner_id) REFERENCES users(user_id)',
              ');'
            ].join('\n'),
            dolExampleNote:
              'สังเกตว่าทั้ง office_id และ owner_id มีชนิดข้อมูล INT ตรงกับ PK ของ land_offices และ users และบรรทัดสุดท้ายก่อนวงเล็บปิดไม่มีเครื่องหมายคอมม่า (,)',
            runnableSql:
              'SELECT plot_id, deed_no, deed_type, office_id, owner_id, rai, ngan, sq_wah, appraised_price_per_wah\nFROM land_plots\nORDER BY plot_id;',
            runnableLabel: 'ลองรัน SELECT ดูข้อมูลจริงใน land_plots',
            examPitfalls: [
              'ใส่เครื่องหมายจุลภาค (,) เกินหลังคอลัมน์หรือ Constraint บรรทัดสุดท้ายก่อนวงเล็บปิด ); — ผิดไวยากรณ์ทันที',
              'เขียน FOREIGN KEY (office_id) REFERENCES land_offices; โดยลืมระบุชื่อคอลัมน์แม่ (office_id) ในวงเล็บหลัง REFERENCES',
              'กำหนด Data Type ของ FK ไม่ตรงกับ PK ตารางแม่ (เช่น แม่เป็น INT แต่ลูกตั้งเป็น VARCHAR)',
              'สร้างตารางลูก (land_plots) ก่อนตารางแม่ (land_offices / users) ทำให้ Reference Error'
            ]
          },
          {
            id: 'ddl-2-alter',
            commandName: 'ALTER TABLE',
            title: '2.2 ALTER TABLE (เพิ่ม แก้ไข เปลี่ยนชื่อ ลบคอลัมน์ และเพิ่ม Constraint)',
            whatAndWhen:
              'ใช้แก้ไขโครงสร้างของตารางที่มีอยู่แล้วโดยไม่ต้องลบตารางทิ้งให้ข้อมูลเก่าหาย เช่น เพิ่มคอลัมน์เบอร์โทรศัพท์ใน users, ขยายขนาดคอลัมน์ deed_no, ลบคอลัมน์ที่ไม่ใช้งาน หรือเพิ่ม FOREIGN KEY ภายหลัง (หมายเหตุ: คำสั่งแก้ขนาดคอลัมน์แตกต่างเล็กน้อยตามยี่ห้อ เช่น MySQL ใช้ MODIFY COLUMN, PostgreSQL ใช้ ALTER COLUMN ... TYPE)',
            syntaxTemplate: [
              '-- 1) เพิ่มคอลัมน์ใหม่',
              'ALTER TABLE table_name ADD COLUMN col_name DATA_TYPE [CONSTRAINT];',
              '',
              '-- 2) แก้ไขชนิด/ขนาดคอลัมน์ (MySQL / Oracle ใช้ MODIFY; PostgreSQL ใช้ ALTER COLUMN)',
              'ALTER TABLE table_name MODIFY COLUMN col_name NEW_DATA_TYPE;',
              '',
              '-- 3) ลบคอลัมน์',
              'ALTER TABLE table_name DROP COLUMN col_name;',
              '',
              '-- 4) เพิ่ม Foreign Key ทีหลัง',
              'ALTER TABLE child_table ADD CONSTRAINT fk_name FOREIGN KEY (fk_col) REFERENCES parent_table(pk_col);'
            ].join('\n'),
            dolExampleTitle: 'ตัวอย่างจริง: ปรับโครงสร้างตาราง users และ land_plots ของกรมที่ดิน',
            dolExampleSql: [
              '-- เพิ่มคอลัมน์ phone และ email ในตาราง users',
              'ALTER TABLE users ADD COLUMN phone VARCHAR(20);',
              'ALTER TABLE users ADD COLUMN email VARCHAR(120);',
              '',
              '-- ขยายขนาดคอลัมน์ full_name ให้รองรับชื่อบริษัทที่ยาวขึ้น (MySQL syntax)',
              'ALTER TABLE users MODIFY COLUMN full_name VARCHAR(200) NOT NULL;',
              '',
              '-- ลบคอลัมน์ที่ไม่ได้ใช้งานแล้ว',
              'ALTER TABLE users DROP COLUMN email;'
            ].join('\n'),
            dolExampleNote:
              'ใน SQLite/PostgreSQL สามารถใช้ ALTER TABLE users RENAME COLUMN old_name TO new_name; เพื่อเปลี่ยนชื่อคอลัมน์ได้ด้วย',
            runnableSql: 'SELECT user_id, full_name, citizen_type, province, registered_year\nFROM users\nORDER BY user_id;',
            runnableLabel: 'ลองรัน SELECT ดูโครงสร้างข้อมูล users ปัจจุบัน',
            examPitfalls: [
              'สับสนระหว่าง ALTER TABLE (แก้โครงสร้าง/หัวคอลัมน์) กับ UPDATE (แก้ค่าข้อมูลในแถว)',
              'เขียน ALTER TABLE users DELETE COLUMN email; — ที่ถูกต้องใช้ DROP COLUMN ไม่ใช่ DELETE!'
            ]
          },
          {
            id: 'ddl-3-drop-truncate',
            commandName: 'DROP TABLE vs TRUNCATE TABLE',
            title: '2.3 DROP TABLE vs TRUNCATE TABLE (และเทียบกับ DELETE)',
            whatAndWhen:
              'เป็นข้อสอบแยกความแตกต่างยอดฮิตตลอดกาล! ทั้งสามคำสั่งเกี่ยวกับการลบ แต่ผลลัพธ์ต่างกันคนละเรื่อง: DELETE (DML) ลบเฉพาะแถวที่ตรง WHERE และ ROLLBACK ได้; TRUNCATE TABLE (DDL) ล้างทุกแถวในตารางทิ้งรวดเดียวโดยโครงสร้างตารางยังอยู่; ส่วน DROP TABLE (DDL) ทุบทิ้งทั้งข้อมูลและโครงสร้างตารางหายไปจากฐานข้อมูลเลย',
            syntaxTemplate: [
              '-- ลบข้อมูลบางแถว (โครงสร้างยังอยู่, ใช้ WHERE ได้, ROLLBACK ได้)',
              'DELETE FROM table_name WHERE condition;',
              '',
              '-- ล้างข้อมูลทุกแถวเกลี้ยงตาราง (โครงสร้างยังอยู่, ห้ามใส่ WHERE, เร็วกว่า DELETE)',
              'TRUNCATE TABLE table_name;',
              '',
              '-- ลบทิ้งทั้งตารางและโครงสร้าง (ตารางหายไปจากระบบเลย, ห้ามใส่ WHERE)',
              'DROP TABLE table_name;'
            ].join('\n'),
            dolExampleTitle: 'ตัวอย่างจริง: ล้างตารางชั่วคราว vs ลบตารางทดสอบ',
            dolExampleSql: [
              '-- กรณีต้องการล้างข้อมูลในตาราง temp_import_plots ให้ว่างเปล่าแต่เก็บหัวตารางไว้ใช้ต่อ:',
              'TRUNCATE TABLE temp_import_plots;',
              '',
              '-- กรณีต้องการลบตาราง temp_import_plots ทิ้งถาวรไม่ใช้แล้ว:',
              'DROP TABLE IF EXISTS temp_import_plots;'
            ].join('\n'),
            dolExampleNote:
              'ข้อควรรู้: ถ้ามีตารางอื่นผูก Foreign Key ชี้มาหาตารางนี้ จะสั่ง DROP หรือ TRUNCATE ตารางแม่ตรงๆ ไม่ได้ จนกว่าจะจัดการตารางลูกก่อน',
            runnableSql:
              'SELECT COUNT(*) AS office_count FROM land_offices;',
            runnableLabel: 'ลองรัน SELECT ตรวจจำนวนแถวใน land_offices',
            examPitfalls: [
              'เขียน TRUNCATE TABLE land_plots WHERE plot_id = 5; — ผิดไวยากรณ์! TRUNCATE ลบทีเดียวทั้งตาราง ไม่รองรับ WHERE',
              'เขียน DROP TABLE land_plots WHERE ...; — ผิดเช่นกัน DROP ลบทั้งตาราง',
              'เขียน DELETE TABLE land_plots; แทน DROP TABLE land_plots; — ผิดคำสั่ง!'
            ]
          }
        ]
      },

      // =======================================================================
      // Chapter 3: dml
      // =======================================================================
      {
        id: 'dml',
        order: 3,
        tabLabel: 'DML (เพิ่ม/แก้/ลบ)',
        title: 'บทที่ 3: คำสั่ง DML & Transaction (INSERT, UPDATE, DELETE, COMMIT/ROLLBACK)',
        badge: 'จัดการข้อมูลในแถว',
        summary:
          'DML (Data Manipulation Language) ใช้จัดการ "เนื้อข้อมูลภายในแถว" และทำงานคู่กับคำสั่งควบคุม Transaction (COMMIT/ROLLBACK) เพื่อความปลอดภัยเวลาแก้ไขหรือโอนกรรมสิทธิ์',
        items: [
          {
            id: 'dml-1-insert',
            commandName: 'INSERT INTO ... VALUES',
            title: '3.1 INSERT INTO ... VALUES (เพิ่ม 1 แถว และหลายแถวพร้อมกัน)',
            whatAndWhen:
              'ใช้เพิ่มแถวข้อมูลใหม่เข้าไปในตาราง แนะนำให้ระบุชื่อคอลัมน์ในวงเล็บหลังชื่อตารางเสมอ (Explicit Column List) เพราะแม้ในอนาคตตารางจะเพิ่มคอลัมน์ใหม่หรือสลับลำดับคอลัมน์ คำสั่ง INSERT ของเราก็จะไม่พัง',
            syntaxTemplate: [
              '-- แบบที่ 1: ระบุชื่อคอลัมน์ (แนะนำมากที่สุดในห้องสอบ)',
              'INSERT INTO table_name (col1, col2, col3)',
              'VALUES (val1, \'text_val\', \'2025-04-01\');',
              '',
              '-- แบบที่ 2: เพิ่มหลายแถวในคำสั่งเดียว (คั่นแต่ละชุดด้วยคอมม่า)',
              'INSERT INTO table_name (col1, col2, col3) VALUES',
              '  (val1, \'text_a\', \'2025-04-01\'),',
              '  (val2, \'text_b\', \'2025-04-02\');'
            ].join('\n'),
            dolExampleTitle: 'ตัวอย่างจริง: เพิ่มผู้ใช้งานใหม่ 2 รายเข้าตาราง users',
            dolExampleSql: [
              'INSERT INTO users (user_id, full_name, citizen_type, province, registered_year) VALUES',
              '  (11, \'นางสาวสุภาวดี รัตนชัย\', \'บุคคลธรรมดา\', \'เชียงใหม่\', 2025),',
              '  (12, \'บริษัท ล้านนาแลนด์ จำกัด\', \'นิติบุคคล\', \'ลำพูน\', 2025);'
            ].join('\n'),
            dolExampleNote:
              'ข้อความภาษาไทยครอบด้วย \'...\' ส่วนตัวเลข user_id และ registered_year (INT) ไม่ต้องใส่ Single Quote',
            runnableSql:
              'SELECT user_id, full_name, citizen_type, province, registered_year\nFROM users\nORDER BY user_id DESC\nLIMIT 5;',
            runnableLabel: 'ลองรัน SELECT ดูข้อมูลล่าสุดใน users',
            examPitfalls: [
              'จำนวนคอลัมน์ในวงเล็บแรกไม่เท่ากับจำนวนค่าใน VALUES (เช่น ระบุ 5 คอลัมน์ แต่ใส่ค่าแค่ 4 ตัว)',
              'ลืมใส่ \'...\' ครอบค่าข้อความหรือวันที่ หรือใส่ \'\' ครอบค่าตัวเลขในคอลัมน์ INT',
              'ใช้ INSERT INTO ... VALUE ... (ไม่มี s) — มาตรฐาน SQL ที่ถูกใช้ VALUES (มี s)'
            ]
          },
          {
            id: 'dml-2-update',
            commandName: 'UPDATE ... SET ... WHERE',
            title: '3.2 UPDATE ... SET ... WHERE (แก้ไขข้อมูล + จุดตายลืม WHERE)',
            whatAndWhen:
              'ใช้แก้ไขค่าในแถวที่มีอยู่แล้วในตาราง สามารถแก้ทีเดียวหลายคอลัมน์โดยคั่นด้วยคอมม่า (,) และสามารถนำค่าเดิมมาคำนวณเป็นค่าใหม่ได้ เช่น ปรับขึ้นราคาประเมิน 10% ในพื้นที่เป้าหมาย',
            syntaxTemplate: [
              'UPDATE table_name',
              'SET col1 = new_value1,',
              '    col2 = col2 * 1.10',
              'WHERE condition;'
            ].join('\n'),
            dolExampleTitle: 'ตัวอย่างจริง: ปรับราคาประเมินขึ้น 10% และเปลี่ยนโซนของแปลง น.ส.4 จ. ในสำนักงานรหัส 2',
            dolExampleSql: [
              'UPDATE land_plots',
              'SET appraised_price_per_wah = appraised_price_per_wah * 1.10,',
              '    zone_type = \'พาณิชยกรรม\'',
              'WHERE office_id = 2',
              '  AND deed_type = \'น.ส.4 จ.\';'
            ].join('\n'),
            dolExampleNote:
              'ก่อนสั่ง UPDATE จริงในงานระบบ มืออาชีพจะรัน SELECT ด้วย WHERE เดียวกันก่อนเสมอเพื่อเช็กว่าตรงกับกี่แถว (กดปุ่ม Sandbox เพื่อดู 2 แถวที่จะถูกแก้ใน office_id = 2)',
            runnableSql:
              "SELECT plot_id, deed_no, office_id, deed_type, zone_type, appraised_price_per_wah\nFROM land_plots\nWHERE office_id = 2\n  AND deed_type = 'น.ส.4 จ.';",
            runnableLabel: 'ลองรัน SELECT ดูแถวเป้าหมายที่จะถูก UPDATE',
            examPitfalls: [
              'จุดตายอันดับ 1: ลืมเขียน WHERE ทำให้ปรับราคาประเมินข้อมูลทั้งตาราง (โดนหักคะแนนหนักมากในข้อสอบ!)',
              'จุดตายอันดับ 2: เผลอใช้ AND เชื่อมคอลัมน์ที่ต้องการแก้หลัง SET เช่น SET col1 = 1 AND col2 = 2 (ผิด! ต้องคั่นด้วยคอมม่า , เท่านั้น ส่วน AND ใช้ใน WHERE)'
            ]
          },
          {
            id: 'dml-3-delete',
            commandName: 'DELETE FROM ... WHERE',
            title: '3.3 DELETE FROM ... WHERE (ลบแถวข้อมูลอย่างปลอดภัย)',
            whatAndWhen:
              'ใช้ลบแถวข้อมูลที่ไม่ต้องการออกจากตาราง โดยโครงสร้างตารางและคอลัมน์ยังอยู่ครบ หากต้องการลบเพียงบางแถวต้องระบุเงื่อนไข WHERE ให้ชัดเจน และระวังกฎ Foreign Key (ลบแถวแม่ที่ยังมีแถวลูกอ้างอิงอยู่ไม่ได้)',
            syntaxTemplate: [
              'DELETE FROM table_name',
              'WHERE condition;'
            ].join('\n'),
            dolExampleTitle: 'ตัวอย่างจริง: ลบรายการธุรกรรมที่เกิดขึ้นก่อนวันที่ 2024-05-01',
            dolExampleSql: [
              'DELETE FROM transactions',
              'WHERE tx_date < \'2024-05-01\';'
            ].join('\n'),
            dolExampleNote:
              'ในชุดข้อมูลตัวอย่าง มีธุรกรรมก่อน 2024-05-01 อยู่ 2 แถว (tx_id 101 และ 102) กดปุ่ม Sandbox เพื่อดูแถวเป้าหมายก่อนลบ',
            runnableSql:
              "SELECT tx_id, plot_id, tx_type, tx_date, fee_amount\nFROM transactions\nWHERE tx_date < '2024-05-01'\nORDER BY tx_date;",
            runnableLabel: 'ลองรัน SELECT ดูแถวเป้าหมายที่จะถูก DELETE',
            examPitfalls: [
              'เขียน DELETE * FROM transactions WHERE ...; — ผิดไวยากรณ์! คำสั่ง DELETE ไม่มีเครื่องหมาย *',
              'ลืมใส่ WHERE ทำให้ข้อมูลหายทั้งตาราง!',
              'ใช้ DELETE เพื่อล้างค่าเพียงคอลัมน์เดียว — ถ้าจะลบแค่ค่าในช่องเดียว (ให้เหลือ NULL) ต้องใช้ UPDATE ... SET col = NULL WHERE ...;'
            ]
          },
          {
            id: 'dml-4-tcl',
            commandName: 'BEGIN TRANSACTION / COMMIT / ROLLBACK',
            title: '3.4 ควบคุม Transaction ด้วย COMMIT และ ROLLBACK (กฎ ACID)',
            whatAndWhen:
              'ใช้ห่อหุ้มชุดคำสั่ง DML หลายคำสั่งที่ต้องสำเร็จพร้อมกันทั้งหมดหรือยกเลิกทั้งหมด (Atomicity) เช่น การโอนกรรมสิทธิ์พร้อมบันทึกค่าธรรมเนียม หากคำสั่งที่ 2 พังหรือเช็กแล้วเงื่อนไขผิดพลาด ให้สั่ง ROLLBACK เพื่อคืนค่าเดิมทั้งหมด แต่ถ้าตรวจสอบถูกต้องแล้วให้สั่ง COMMIT เพื่อบันทึกถาวร (Durability)',
            syntaxTemplate: [
              'BEGIN TRANSACTION;   -- (ใน MySQL ใช้ START TRANSACTION;)',
              '  UPDATE table_a SET ... WHERE ...;',
              '  INSERT INTO table_b (...) VALUES (...);',
              '-- ถ้าตรวจสอบแล้วถูกต้องทุกประการ:',
              'COMMIT;',
              '-- หรือถ้าพบข้อผิดพลาดกลางคัน ให้ย้อนกลับสภาพเดิมทั้งหมด:',
              '-- ROLLBACK;'
            ].join('\n'),
            dolExampleTitle: 'ตัวอย่างจริง: โอนกรรมสิทธิ์แปลงที่ดิน plot_id = 2 พร้อมบันทึกประวัติธุรกรรมใน Transaction เดียว',
            dolExampleSql: [
              'BEGIN TRANSACTION;',
              '  UPDATE land_plots SET owner_id = 4 WHERE plot_id = 2;',
              '  INSERT INTO transactions (tx_id, plot_id, tx_type, tx_date, fee_amount, channel)',
              '  VALUES (115, 2, \'ซื้อขาย\', \'2025-04-01\', 35000, \'เคาน์เตอร์สำนักงาน\');',
              '-- ตรวจความถูกต้อง: ถ้าพบว่า owner_id ใส่ผิดคน ให้รัน ROLLBACK; ทันที',
              'COMMIT;'
            ].join('\n'),
            dolExampleNote:
              'SAVEPOINT sp1; สามารถตั้งจุดคั่นกลางทางใน Transaction เพื่อสั่ง ROLLBACK TO sp1; ย้อนเฉพาะบางส่วนได้ใน PostgreSQL/MySQL/Oracle/SQLite',
            runnableSql:
              'SELECT tx_id, plot_id, tx_type, tx_date, fee_amount, channel\nFROM transactions\nORDER BY tx_id DESC\nLIMIT 6;',
            runnableLabel: 'ลองรัน SELECT ดูรายการธุรกรรมล่าสุด',
            examPitfalls: [
              'เข้าใจผิดว่าสั่ง ROLLBACK หลัง COMMIT ไปแล้วจะกู้คืนได้ (ไม่ได้! เมื่อ COMMIT แล้วข้อมูลถูกเขียนลงดิสก์ถาวร)',
              'เข้าใจผิดว่า DDL (CREATE/DROP/TRUNCATE) ใช้ ROLLBACK ได้ในทุกฐานข้อมูล (ใน MySQL/Oracle คำสั่ง DDL ทำ Auto-commit อัตโนมัติ ย้อนกลับไม่ได้)'
            ]
          }
        ]
      },

      // =======================================================================
      // Chapter 4: dql-basic
      // =======================================================================
      {
        id: 'dql-basic',
        order: 4,
        tabLabel: 'SELECT พื้นฐาน',
        title: 'บทที่ 4: คำสั่ง SELECT พื้นฐาน, DISTINCT, Alias, คำนวณคณิต, ORDER BY, LIMIT',
        badge: 'สืบค้นข้อมูลพื้นฐาน',
        summary:
          'DQL (Data Query Language) เป็นหัวใจหลักของข้อสอบ SQL ใช้ดึงข้อมูล คำนวณเนื้อที่/มูลค่าที่ดิน ตัดค่าซ้ำ และเรียงลำดับผลลัพธ์',
        items: [
          {
            id: 'dql-1-select-alias',
            commandName: 'SELECT & Alias (AS)',
            title: '4.1 SELECT * vs ระบุชื่อคอลัมน์ และการตั้งชื่อใหม่ด้วย AS',
            whatAndWhen:
              'SELECT ใช้ระบุคอลัมน์ที่ต้องการแสดงผล ในงานจริงและข้อสอบควรระบุชื่อคอลัมน์ที่โจทย์ถามให้ครบ (หลีกเลี่ยง SELECT * ยกเว้นโจทย์สั่งว่าให้แสดงทุกคอลัมน์) และสามารถใช้ AS ตั้งชื่อคอลัมน์ผลลัพธ์ใหม่ (Column Alias) ให้อ่านเข้าใจง่ายขึ้น',
            syntaxTemplate: [
              'SELECT col1 AS alias_1, col2 AS alias_2',
              'FROM table_name;'
            ].join('\n'),
            dolExampleTitle: 'ตัวอย่างจริง: ดึงข้อมูลแปลงที่ดินพร้อมตั้งชื่อคอลัมน์ภาษาอังกฤษที่สื่อความหมาย',
            dolExampleSql:
              'SELECT plot_id, deed_no AS title_deed_number, deed_type, zone_type, appraised_price_per_wah AS price_per_wah\nFROM land_plots;',
            dolExampleNote:
              'คำว่า AS สามารถละได้ในบาง DBMS แต่ตอนสอบข้อเขียนแนะนำให้ใส่ AS เสมอเพื่อความชัดเจน และหากชื่อ Alias มีเว้นวรรคให้ครอบด้วย "..." แต่ควรตั้งแบบติดกันด้วย _ จะปลอดภัยที่สุด',
            runnableSql:
              'SELECT plot_id, deed_no AS title_deed_number, deed_type, zone_type, appraised_price_per_wah AS price_per_wah\nFROM land_plots;',
            runnableLabel: 'ลองรันใน SQL Sandbox',
            examPitfalls: [
              'ใส่เครื่องหมายคอมม่า (,) เกินหลังคอลัมน์ตัวสุดท้ายก่อนคำว่า FROM (เช่น SELECT a, b, FROM land_plots — พัง Error!)',
              'นำชื่อ Alias ที่ตั้งใน SELECT (เช่น price_per_wah) ไปเขียนเป็นเงื่อนไขใน WHERE ทันที (ไม่ได้! เพราะ WHERE ทำงานก่อน SELECT)'
            ]
          },
          {
            id: 'dql-2-distinct',
            commandName: 'SELECT DISTINCT',
            title: '4.2 SELECT DISTINCT (ตัดแถวที่ซ้ำกันออกให้เหลือค่าเดียว)',
            whatAndWhen:
              'ใช้เมื่อโจทย์ถามหา "มีประเภทใดบ้าง", "รายชื่อจังหวัดที่ไม่ซ้ำกัน" โดยวาง DISTINCT ไว้หลังคำว่า SELECT ทันที (ถ้าเลือกมากกว่า 1 คอลัมน์ ระบบจะนับความไม่ซ้ำจากการจับคู่ของทุกคอลัมน์ในแถวนั้นรวมกัน)',
            syntaxTemplate: [
              'SELECT DISTINCT column_name',
              'FROM table_name;'
            ].join('\n'),
            dolExampleTitle: 'ตัวอย่างจริง: ดูประเภทเอกสารสิทธิ์ที่มีทั้งหมดในตาราง land_plots แบบไม่ซ้ำ',
            dolExampleSql:
              'SELECT DISTINCT deed_type\nFROM land_plots\nORDER BY deed_type ASC;',
            dolExampleNote:
              'จากข้อมูล 12 แปลง จะเหลือประเภทเอกสารสิทธิ์ไม่ซ้ำ 4 แบบ คือ น.ส.3, น.ส.3 ก., น.ส.4 จ., และ อ.ช.2',
            runnableSql:
              'SELECT DISTINCT deed_type\nFROM land_plots\nORDER BY deed_type ASC;',
            runnableLabel: 'ลองรันใน SQL Sandbox',
            examPitfalls: [
              'วาง DISTINCT ไว้ผิดตำแหน่ง เช่น SELECT deed_type DISTINCT (ผิด! ต้องวางหน้าชื่อคอลัมน์แรกหลัง SELECT)',
              'เข้าใจผิดว่า SELECT DISTINCT a, b จะตัดซ้ำเฉพาะคอลัมน์ a (ความจริงจะตัดซ้ำเฉพาะแถวที่ค่าของทั้ง a และ b เหมือนกันทั้งคู่)'
            ]
          },
          {
            id: 'dql-3-math',
            commandName: 'Arithmetic in SELECT',
            title: '4.3 การคำนวณทางคณิตศาสตร์ใน SELECT (สูตรไร่-งาน-ตารางวา)',
            whatAndWhen:
              'ใน SQL สามารถนำคอลัมน์ตัวเลขมาบวก ลบ คูณ หาร (+ - * /) ในคำสั่ง SELECT ได้โดยตรง ข้อสอบกรมที่ดินนิยมออกให้แปลงหน่วยที่ดินไทยเป็นตารางวารวม (1 ไร่ = 400 ตร.ว., 1 งาน = 100 ตร.ว.) และคูณกับราคาประเมินต่อตารางวาเพื่อหามูลค่าประเมินรวมทั้งแปลง',
            syntaxTemplate: [
              'SELECT col1,',
              '  (rai * 400) + (ngan * 100) + sq_wah AS total_sq_wah,',
              '  ((rai * 400) + (ngan * 100) + sq_wah) * appraised_price_per_wah AS total_value',
              'FROM land_plots;'
            ].join('\n'),
            dolExampleTitle: 'ตัวอย่างจริง: คำนวณเนื้อที่รวมเป็นตารางวาและมูลค่าประเมินรวมของทุกแปลง',
            dolExampleSql: [
              'SELECT',
              '  deed_no,',
              '  rai,',
              '  ngan,',
              '  sq_wah,',
              '  (rai * 400) + (ngan * 100) + sq_wah AS total_sq_wah,',
              '  ((rai * 400) + (ngan * 100) + sq_wah) * appraised_price_per_wah AS total_appraised_value',
              'FROM land_plots',
              'ORDER BY total_appraised_value DESC;'
            ].join('\n'),
            dolExampleNote:
              'สังเกตว่า ORDER BY สามารถเรียกใช้ Alias total_appraised_value ได้ทันทีเพราะ ORDER BY ทำงานหลัง SELECT',
            runnableSql: [
              'SELECT',
              '  deed_no,',
              '  rai,',
              '  ngan,',
              '  sq_wah,',
              '  (rai * 400) + (ngan * 100) + sq_wah AS total_sq_wah,',
              '  ((rai * 400) + (ngan * 100) + sq_wah) * appraised_price_per_wah AS total_appraised_value',
              'FROM land_plots',
              'ORDER BY total_appraised_value DESC;'
            ].join('\n'),
            runnableLabel: 'ลองรันใน SQL Sandbox',
            examPitfalls: [
              'ลืมใส่วงเล็บครอบผลบวกเนื้อที่ก่อนคูณราคา เช่น rai * 400 + ngan * 100 + sq_wah * appraised_price_per_wah — เครื่องจะคูณแค่ sq_wah กับราคาประเมินแล้วค่อยบวก rai*400 ผิดมหันต์!',
              'สูตรแปลงหน่วยที่ดิน: 1 ไร่ = 4 งาน = 400 ตารางวา, 1 งาน = 100 ตารางวา (อย่าจำสลับ)'
            ]
          },
          {
            id: 'dql-4-order-limit',
            commandName: 'ORDER BY & LIMIT',
            title: '4.4 ORDER BY (เรียง ASC / DESC หลายคอลัมน์) และ LIMIT',
            whatAndWhen:
              'ORDER BY ใช้เรียงลำดับผลลัพธ์ โดย ASC เรียงจากน้อยไปมาก (A->Z, ค่าเริ่มต้น) และ DESC เรียงจากมากไปน้อย (Z->A) ส่วน LIMIT ใช้จำกัดจำนวนแถวที่จะแสดง (เช่น หา 5 อันดับแรก หรือใช้ร่วมกับ OFFSET เพื่อแบ่งหน้า)',
            syntaxTemplate: [
              'SELECT col1, col2',
              'FROM table_name',
              'ORDER BY col1 ASC, col2 DESC',
              'LIMIT 5;'
            ].join('\n'),
            dolExampleTitle: 'ตัวอย่างจริง: เรียงตามโซนพื้นที่ (ก->ฮ) และภายในโซนเดียวกันเรียงราคาแพงสุดขึ้นก่อน เอา 6 แถว',
            dolExampleSql: [
              'SELECT plot_id, deed_no, zone_type, appraised_price_per_wah',
              'FROM land_plots',
              'ORDER BY zone_type ASC, appraised_price_per_wah DESC',
              'LIMIT 6;'
            ].join('\n'),
            dolExampleNote:
              'หมายเหตุข้อสอบ: ใน MySQL, PostgreSQL, SQLite ใช้ LIMIT 5 ปิดท้าย แต่ใน SQL Server (T-SQL) จะเขียนเป็น SELECT TOP 5 ... แทน',
            runnableSql: [
              'SELECT plot_id, deed_no, zone_type, appraised_price_per_wah',
              'FROM land_plots',
              'ORDER BY zone_type ASC, appraised_price_per_wah DESC',
              'LIMIT 6;'
            ].join('\n'),
            runnableLabel: 'ลองรันใน SQL Sandbox',
            examPitfalls: [
              'เขียน ORDER BY col1, col2 DESC โดยคิดว่าจะเรียง DESC ทั้งสองคอลัมน์ (ความจริง col1 จะเป็น ASC ส่วน col2 เป็น DESC ต้องระบุ ASC/DESC แยกทีละคอลัมน์)',
              'เขียน LIMIT ไว้ก่อน ORDER BY — ผิดไวยากรณ์! LIMIT ต้องอยู่ท้ายสุดเสมอ'
            ]
          }
        ]
      },

      // =======================================================================
      // Chapter 5: where-filters
      // =======================================================================
      {
        id: 'where-filters',
        order: 5,
        tabLabel: 'WHERE ครบชุด',
        title: 'บทที่ 5: เจาะลึก WHERE ครบทุกตัวดำเนินการกรองข้อมูล',
        badge: 'กรองข้อมูลแม่นยำ',
        summary:
          'รวมทุกตัวดำเนินการที่ใช้หลัง WHERE ตั้งแต่วงเล็บ AND/OR ที่คนตกม้าตายบ่อยที่สุด ไปจนถึง IN, NOT IN, BETWEEN, LIKE และ IS NULL',
        comparisonTable: {
          caption: 'สรุปตัวดำเนินการทั้งหมดที่ใช้ในคำสั่ง WHERE',
          headers: ['ตัวดำเนินการ', 'ความหมาย', 'ตัวอย่างเงื่อนไข'],
          rows: [
            ['=, <>, !=, >, <, >=, <=', 'เปรียบเทียบเท่ากับ ไม่เท่ากับ มากกว่า น้อยกว่า', 'fee_amount >= 20000 AND tx_type <> \'ให้\''],
            ['AND / OR / NOT', 'เชื่อมหลายเงื่อนไข (ลำดับทำ: NOT -> AND -> OR)', '(zone_type = \'พาณิชยกรรม\' OR zone_type = \'อุตสาหกรรม\') AND rai >= 1'],
            ['IN (...) / NOT IN (...)', 'ตรงกับ (หรือไม่ตรงกับ) ค่าใดค่าหนึ่งในรายการ', 'deed_type IN (\'น.ส.4 จ.\', \'อ.ช.2\')'],
            ['BETWEEN a AND b', 'อยู่ในช่วงตั้งแต่ a ถึง b (รวมค่าหัวและท้าย)', 'appraised_price_per_wah BETWEEN 50000 AND 150000'],
            ['LIKE \'%..._\'', 'ค้นหาข้อความ (% = กี่ตัวก็ได้, _ = 1 ตัวพอดี)', 'deed_no LIKE \'น.ส.4จ-%\''],
            ['IS NULL / IS NOT NULL', 'ตรวจสอบว่าช่องนั้นไม่มีค่า (NULL) หรือมีค่า', 'WHERE p.plot_id IS NULL']
          ]
        },
        items: [
          {
            id: 'where-1-compare',
            commandName: '= <> != > < >= <=',
            title: '5.1 ตัวดำเนินการเปรียบเทียบพื้นฐาน (เลข ข้อความ และวันที่)',
            whatAndWhen:
              'ใช้กรองแถวตามค่าที่ต้องการ ตัวเลขเขียนตรงๆ ได้เลย ส่วนข้อความและวันที่รูปแบบ YYYY-MM-DD ต้องครอบด้วย Single Quote (\'...\') เสมอ ทั้ง <> และ != ต่างแปลว่า "ไม่เท่ากับ" (แต่ <> เป็นมาตรฐาน ANSI SQL ดั้งเดิมที่ใช้ได้ทุกยี่ห้อ)',
            syntaxTemplate: [
              'SELECT col1, col2',
              'FROM table_name',
              'WHERE numeric_col >= 10000',
              '  AND date_col >= \'2025-01-01\'',
              '  AND status_col <> \'ยกเลิก\';'
            ].join('\n'),
            dolExampleTitle: 'ตัวอย่างจริง: ค้นหาธุรกรรมตั้งแต่ปี 2025 ที่มีค่าธรรมเนียม >= 20,000 และไม่ใช่การจำนอง',
            dolExampleSql: [
              'SELECT tx_id, plot_id, tx_type, tx_date, fee_amount',
              'FROM transactions',
              'WHERE tx_date >= \'2025-01-01\'',
              '  AND fee_amount >= 20000',
              '  AND tx_type <> \'จำนอง\'',
              'ORDER BY tx_date;'
            ].join('\n'),
            dolExampleNote:
              'วันที่แบบ ISO \'YYYY-MM-DD\' เรียงตัวอักษรตรงกับลำดับปฏิทิน ทำให้ใช้ >=, <, BETWEEN เปรียบเทียบได้แม่นยำ',
            runnableSql: [
              'SELECT tx_id, plot_id, tx_type, tx_date, fee_amount',
              'FROM transactions',
              "WHERE tx_date >= '2025-01-01'",
              '  AND fee_amount >= 20000',
              "  AND tx_type <> 'จำนอง'",
              'ORDER BY tx_date;'
            ].join('\n'),
            runnableLabel: 'ลองรันใน SQL Sandbox',
            examPitfalls: [
              'เขียนเครื่องหมาย == แทน = (ผิด! SQL ใช้ = ตัวเดียวทั้งใน SET และ WHERE)',
              'ลืม \'...\' ครอบวันที่ เช่น WHERE tx_date >= 2025-01-01 (เครื่องจะเอา 2025 ลบ 1 ลบ 1 เหลือเลข 2023!)'
            ]
          },
          {
            id: 'where-2-logic',
            commandName: 'AND / OR / NOT (และกฎวงเล็บ)',
            title: '5.2 ตัวเชื่อมตรรกะ AND, OR, NOT และจุดตายเมื่อลืมใส่วงเล็บ!',
            whatAndWhen:
              'AND ต้องจริงทั้งคู่, OR จริงอย่างน้อยหนึ่ง, NOT กลับความจริง กฎเหล็กที่คนทำข้อสอบพลาดมากที่สุดคือ Precedence (ลำดับความสำคัญ): SQL ทำ NOT ก่อน -> แล้วทำ AND -> แล้วค่อยทำ OR! ดังนั้นเมื่อไรก็ตามที่มีทั้ง AND และ OR อยู่ใน WHERE เดียวกัน ต้องใส่วงเล็บ (...) ครอบกลุ่ม OR ให้ชัดเจนเสมอ',
            syntaxTemplate: [
              '-- กฎเหล็ก: ใส่วงเล็บครอบเงื่อนไข OR เสมอเมื่อใช้คู่กับ AND',
              'SELECT *',
              'FROM table_name',
              'WHERE (cond_A OR cond_B)',
              '  AND cond_C;'
            ].join('\n'),
            dolExampleTitle: 'ตัวอย่างจริง: หาแปลงโซนพาณิชยกรรม หรือ อุตสาหกรรม ที่มีราคาประเมินตั้งแต่ 80,000 บาทขึ้นไป',
            dolExampleSql: [
              'SELECT plot_id, deed_no, zone_type, appraised_price_per_wah',
              'FROM land_plots',
              'WHERE (zone_type = \'พาณิชยกรรม\' OR zone_type = \'อุตสาหกรรม\')',
              '  AND appraised_price_per_wah >= 80000',
              'ORDER BY appraised_price_per_wah DESC;'
            ].join('\n'),
            dolExampleNote:
              'สังเกตผลลัพธ์: ถ้าเผลอลืมวงเล็บ เครื่องจะทำ (อุตสาหกรรม AND >= 80000) ก่อน แล้วค่อย OR กับ พาณิชยกรรม ทำให้แปลงอุตสาหกรรมราคา 75,000 หายไป (แต่ถ้ามีพาณิชยกรรมราคา 30,000 มันจะหลุดเข้ามาด้วย!)',
            runnableSql: [
              'SELECT plot_id, deed_no, zone_type, appraised_price_per_wah',
              'FROM land_plots',
              "WHERE (zone_type = 'พาณิชยกรรม' OR zone_type = 'อุตสาหกรรม')",
              '  AND appraised_price_per_wah >= 80000',
              'ORDER BY appraised_price_per_wah DESC;'
            ].join('\n'),
            runnableLabel: 'ลองรันใน SQL Sandbox',
            examPitfalls: [
              'ลืมใส่วงเล็บครอบกลุ่ม OR เมื่อมี AND ต่อท้าย — โดนหักคะแนนตรรกะผิดเกือบทุกครั้ง!',
              'เขียนย่อว่า WHERE zone_type = \'พาณิชยกรรม\' OR \'อุตสาหกรรม\' (ผิด! ต้องเขียน zone_type = ซ้ำ หรือใช้ IN)'
            ]
          },
          {
            id: 'where-3-in',
            commandName: 'IN (...) & NOT IN (...)',
            title: '5.3 IN (...) และ NOT IN (...) — เทียบหลายค่าแบบกระชับและปลอดภัย',
            whatAndWhen:
              'IN ใช้แทนชุด OR ที่เช็กคอลัมน์เดียวกันหลายค่า ทำให้โค้ดสั้น อ่านง่าย และเขียนลงกระดาษเร็วขึ้น ส่วน NOT IN ใช้คัดค่าที่ไม่อยู่ในรายการออก (ข้อควรระวังระดับสูง: ห้ามให้ในวงเล็บของ NOT IN มีค่า NULL ปนอยู่ มิฉะนั้นจะได้ 0 แถว!)',
            syntaxTemplate: [
              'WHERE column_name IN (\'val1\', \'val2\', \'val3\')',
              'WHERE column_name NOT IN (\'val4\', \'val5\')'
            ].join('\n'),
            dolExampleTitle: 'ตัวอย่างจริง: หาแปลงที่ดินที่เป็น น.ส.4 จ. หรือ อ.ช.2 โดยไม่ใช่โซนเกษตรกรรม',
            dolExampleSql: [
              'SELECT plot_id, deed_no, deed_type, zone_type, appraised_price_per_wah',
              'FROM land_plots',
              'WHERE deed_type IN (\'น.ส.4 จ.\', \'อ.ช.2\')',
              '  AND zone_type NOT IN (\'เกษตรกรรม\')',
              'ORDER BY plot_id;'
            ].join('\n'),
            dolExampleNote:
              'ช่วยลดความผิดพลาดจากการลืมวงเล็บใน OR ที่ใช้คู่กับ AND ได้ดีมาก!',
            runnableSql: [
              'SELECT plot_id, deed_no, deed_type, zone_type, appraised_price_per_wah',
              'FROM land_plots',
              "WHERE deed_type IN ('น.ส.4 จ.', 'อ.ช.2')",
              "  AND zone_type NOT IN ('เกษตรกรรม')",
              'ORDER BY plot_id;'
            ].join('\n'),
            runnableLabel: 'ลองรันใน SQL Sandbox',
            examPitfalls: [
              'เขียน WHERE deed_type = (\'น.ส.4 จ.\', \'อ.ช.2\') — ใช้ = กับหลายค่าในวงเล็บไม่ได้ ต้องใช้ IN',
              'ใช้ NOT IN (SELECT ...) เมื่อผล Subquery มีโอกาสติด NULL ออกมา (ควรเปลี่ยนเป็น NOT EXISTS หรือกรอง IS NOT NULL ใน Subquery)'
            ]
          },
          {
            id: 'where-4-between',
            commandName: 'BETWEEN ... AND ...',
            title: '5.4 BETWEEN ... AND ... (กรองช่วงตัวเลขและวันที่แบบรวมขอบ)',
            whatAndWhen:
              'ใช้กรองค่าที่อยู่ระหว่างขอบล่างและขอบบนแบบ "รวมค่าหัวและค่าท้าย (Inclusive)" เช่น BETWEEN 50000 AND 150000 มีความหมายเหมือน >= 50000 AND <= 150000 ทุกประการ ใช้ได้ทั้งตัวเลข วันที่ และข้อความ',
            syntaxTemplate: [
              'WHERE column_name BETWEEN low_value AND high_value',
              'WHERE date_col BETWEEN \'2025-01-01\' AND \'2025-03-31\''
            ].join('\n'),
            dolExampleTitle: 'ตัวอย่างจริง: ค้นหาแปลงที่ดินที่ราคาประเมินอยู่ระหว่าง 50,000 ถึง 150,000 บาท/ตร.ว.',
            dolExampleSql: [
              'SELECT plot_id, deed_no, zone_type, appraised_price_per_wah',
              'FROM land_plots',
              'WHERE appraised_price_per_wah BETWEEN 50000 AND 150000',
              'ORDER BY appraised_price_per_wah ASC;'
            ].join('\n'),
            dolExampleNote:
              'ค่าที่ 140,000, 120,000, 82,000, 75,000, 62,000, 54,000 ถูกรวมทั้งหมด และถ้ามีค่า 50,000 หรือ 150,000 พอดีก็จะติดมาด้วย',
            runnableSql: [
              'SELECT plot_id, deed_no, zone_type, appraised_price_per_wah',
              'FROM land_plots',
              'WHERE appraised_price_per_wah BETWEEN 50000 AND 150000',
              'ORDER BY appraised_price_per_wah ASC;'
            ].join('\n'),
            runnableLabel: 'ลองรันใน SQL Sandbox',
            examPitfalls: [
              'วางค่ามากไว้หน้าค่าน้อย เช่น BETWEEN 150000 AND 50000 (ได้ผลว่างเปล่า 0 แถวทันที!)',
              'ใช้คำว่า TO แทน AND เช่น BETWEEN 50000 TO 150000 (ผิดไวยากรณ์!)'
            ]
          },
          {
            id: 'where-5-like',
            commandName: 'LIKE \'% _\'',
            title: '5.5 LIKE กับ Wildcard % และ _ (ค้นหาข้อความตามรูปแบบ)',
            whatAndWhen:
              'ใช้ค้นหาข้อความที่ไม่ทราบค่าทั้งหมด หรือต้องการตรวจคำขึ้นต้น/ลงท้าย/คำข้างใน โดยใช้ Wildcard 2 ตัว: % (เปอร์เซ็นต์) แทนตัวอักษรอะไรก็ได้ 0 ตัวขึ้นไป และ _ (อันเดอร์สกอร์) แทนตัวอักษรอะไรก็ได้ "1 ตัวพอดี"',
            syntaxTemplate: [
              'WHERE col LIKE \'prefix%\'     -- ขึ้นต้นด้วย prefix',
              'WHERE col LIKE \'%keyword%\'   -- มี keyword อยู่ตรงไหนก็ได้',
              'WHERE col LIKE \'2025-03-__\'  -- ตรงกับ 2025-03- ตามด้วย 2 ตัวอักษรพอดี'
            ].join('\n'),
            dolExampleTitle: 'ตัวอย่างจริง: ค้นหาธุรกรรมที่ทำผ่านช่องทางที่มีคำว่า "ออนไลน์" หรือเกิดในเดือน 2025-03',
            dolExampleSql: [
              'SELECT tx_id, plot_id, tx_type, tx_date, channel',
              'FROM transactions',
              'WHERE channel LIKE \'%ออนไลน์%\'',
              '   OR tx_date LIKE \'2025-03-__\'',
              'ORDER BY tx_date;'
            ].join('\n'),
            dolExampleNote:
              'นอกจากนี้ถ้าต้องการหาโฉนดใน land_plots ที่เลขขึ้นต้นด้วย น.ส.4จ- ก็เขียนได้ว่า WHERE deed_no LIKE \'น.ส.4จ-%\'',
            runnableSql: [
              'SELECT tx_id, plot_id, tx_type, tx_date, channel',
              'FROM transactions',
              "WHERE channel LIKE '%ออนไลน์%'",
              "   OR tx_date LIKE '2025-03-__'",
              'ORDER BY tx_date;'
            ].join('\n'),
            runnableLabel: 'ลองรันใน SQL Sandbox',
            examPitfalls: [
              'เขียน WHERE channel = \'%ออนไลน์%\' (ใช้เครื่องหมาย = แทน LIKE — ทำให้ระบบหาข้อความที่มี % จริงๆ ไม่เจอแถวเลย!)',
              'ใช้ดอกจัน * แทน % (เช่น \'2025*\') — ใน SQL มาตรฐานต้องใช้ % และ _ เท่านั้น'
            ]
          },
          {
            id: 'where-6-isnull',
            commandName: 'IS NULL & IS NOT NULL',
            title: '5.6 IS NULL / IS NOT NULL หาข้อมูลขาดหายจาก LEFT JOIN',
            whatAndWhen:
              'นอกจากตรวจช่องว่างในตารางเดียวแล้ว การใช้ LEFT JOIN คู่กับ WHERE right_table.pk IS NULL เป็นท่าไม้ตายข้อเขียนสำหรับหาข้อมูลที่ "ยังไม่มีรายการเชื่อมโยง" เช่น แปลงที่ดินที่ยังไม่เคยทำธุรกรรมใดๆ หรือสำนักงานที่ยังไม่มีคำร้อง',
            syntaxTemplate: [
              'SELECT left_tbl.*',
              'FROM left_tbl',
              'LEFT JOIN right_tbl ON left_tbl.id = right_tbl.fk_id',
              'WHERE right_tbl.id IS NULL;'
            ].join('\n'),
            dolExampleTitle: 'ตัวอย่างจริง: ค้นหาแปลงที่ดินที่ยังไม่เคยมีประวัติการทำธุรกรรมเลย',
            dolExampleSql: [
              'SELECT p.plot_id, p.deed_no, p.deed_type, p.appraised_price_per_wah',
              'FROM land_plots p',
              'LEFT JOIN transactions t ON p.plot_id = t.plot_id',
              'WHERE t.tx_id IS NULL',
              'ORDER BY p.plot_id;'
            ].join('\n'),
            dolExampleNote:
              'คืนค่า plot_id = 11 (น.ส.4จ-91033) และ plot_id = 12 (น.ส.4จ-99407) เพราะสองแปลงนี้ยังไม่ปรากฏในตาราง transactions',
            runnableSql: [
              'SELECT p.plot_id, p.deed_no, p.deed_type, p.appraised_price_per_wah',
              'FROM land_plots p',
              'LEFT JOIN transactions t ON p.plot_id = t.plot_id',
              'WHERE t.tx_id IS NULL',
              'ORDER BY p.plot_id;'
            ].join('\n'),
            runnableLabel: 'ลองรันใน SQL Sandbox',
            examPitfalls: [
              'ใช้ INNER JOIN แทน LEFT JOIN (ถ้าใช้ INNER JOIN แปลงที่ไม่มีธุรกรรมจะถูกคัดทิ้งตั้งแต่แรก ทำให้ WHERE t.tx_id IS NULL ไม่เจออะไรเลย!)',
              'เผลอใช้ t.tx_id = NULL แทน IS NULL'
            ]
          }
        ]
      },

      // =======================================================================
      // Chapter 6: aggregate-groupby
      // =======================================================================
      {
        id: 'aggregate-groupby',
        order: 6,
        tabLabel: 'GROUP BY & HAVING',
        title: 'บทที่ 6: Aggregate Functions, กฎ GROUP BY, WHERE vs HAVING และลำดับ SQL 7 ขั้น',
        badge: 'สรุปผลจัดกลุ่ม',
        summary:
          'หัวใจของโจทย์รายงานสรุปยอด: เข้าใจความต่าง COUNT(*) vs COUNT(col), กฎเหล็ก GROUP BY และเหตุผลที่ HAVING เกิดมาเพื่อกรองกลุ่มหลังคำนวณ',
        comparisonTable: {
          caption: 'เปรียบเทียบ WHERE vs HAVING แบบชัดเจน',
          headers: ['ประเด็นเปรียบเทียบ', 'WHERE', 'HAVING'],
          rows: [
            ['กรองอะไร?', 'กรอง "แถวดิบทีละแถว" ก่อนจัดกลุ่ม', 'กรอง "ทั้งกลุ่ม" หลังจาก GROUP BY และคำนวณ Aggregate แล้ว'],
            ['ลำดับการทำงาน', 'ขั้นที่ 2 (ทำหลัง FROM/JOIN)', 'ขั้นที่ 4 (ทำหลัง GROUP BY)'],
            ['ใช้ COUNT / SUM / AVG ได้ไหม?', 'ห้ามเด็ดขาด! (Syntax Error)', 'ใช้ได้! และเป็นจุดประสงค์หลักของ HAVING'],
            ['ใช้คู่กันได้ไหม?', 'ใช้ร่วมกันได้ดีเยี่ยม: กรองแถวดิบด้วย WHERE ก่อน -> จัดกลุ่ม -> กรองผลรวมด้วย HAVING', 'ใช่ ใช้ร่วมกับ WHERE ได้เลยในคิวรีเดียว']
          ]
        },
        items: [
          {
            id: 'agg-1-functions',
            commandName: 'COUNT(*) vs COUNT(col), SUM, AVG, MAX, MIN',
            title: '6.1 ฟังก์ชันสรุปรวม 5 ตัว และความต่าง COUNT(*) vs COUNT(col)',
            whatAndWhen:
              'Aggregate Functions ยุบข้อมูลหลายแถวให้เหลือผลสรุป 1 ค่า ได้แก่ COUNT (นับจำนวน), SUM (ผลรวม), AVG (ค่าเฉลี่ย), MAX (ค่าสูงสุด), MIN (ค่าต่ำสุด) จุดสำคัญ: COUNT(*) นับ "ทุกแถว" รวมถึงแถวที่คอลัมน์ฝั่งขวาเป็น NULL แต่ COUNT(column) นับเฉพาะแถวที่คอลัมน์นั้น "ไม่เป็น NULL" เท่านั้น ส่วน COUNT(DISTINCT column) นับจำนวนค่าที่ไม่ซ้ำ',
            syntaxTemplate: [
              'SELECT',
              '  COUNT(*) AS total_rows,',
              '  COUNT(col_name) AS non_null_rows,',
              '  COUNT(DISTINCT col_name) AS unique_values,',
              '  SUM(num_col) AS total_sum,',
              '  AVG(num_col) AS avg_val,',
              '  MAX(num_col) AS max_val,',
              '  MIN(num_col) AS min_val',
              'FROM table_name;'
            ].join('\n'),
            dolExampleTitle: 'ตัวอย่างจริง: สรุปภาพรวมธุรกรรมทั้งหมดในตาราง transactions',
            dolExampleSql: [
              'SELECT',
              '  COUNT(*) AS total_tx,',
              '  COUNT(DISTINCT plot_id) AS distinct_plots_with_tx,',
              '  SUM(fee_amount) AS total_fees,',
              '  ROUND(AVG(fee_amount), 2) AS avg_fee,',
              '  MAX(fee_amount) AS max_fee,',
              '  MIN(fee_amount) AS min_fee',
              'FROM transactions;'
            ].join('\n'),
            dolExampleNote:
              'ทั้งหมดมี 14 ธุรกรรม จากแปลงไม่ซ้ำกัน 10 แปลง รวมค่าธรรมเนียมทั้งหมดและเฉลี่ยต่อรายการออกมาได้ในแถวเดียว',
            runnableSql: [
              'SELECT',
              '  COUNT(*) AS total_tx,',
              '  COUNT(DISTINCT plot_id) AS distinct_plots_with_tx,',
              '  SUM(fee_amount) AS total_fees,',
              '  ROUND(AVG(fee_amount), 2) AS avg_fee,',
              '  MAX(fee_amount) AS max_fee,',
              '  MIN(fee_amount) AS min_fee',
              'FROM transactions;'
            ].join('\n'),
            runnableLabel: 'ลองรันใน SQL Sandbox',
            examPitfalls: [
              'เขียน SUM(*) หรือ AVG(*) — ผิดไวยากรณ์! ฟังก์ชันทางเลขต้องระบุชื่อคอลัมน์ข้างในวงเล็บ มีแค่ COUNT(*) ที่ใส่ * ได้',
              'ใช้ COUNT(*) หลัง LEFT JOIN เพื่อนับจำนวนแปลงของคนที่ไม่มีแปลง (จะได้ 1 แถวที่ติด NULL แทนที่จะได้ 0! ต้องใช้ COUNT(p.plot_id))'
            ]
          },
          {
            id: 'agg-2-groupby',
            commandName: 'GROUP BY (กฎเหล็ก)',
            title: '6.2 กฎเหล็กของ GROUP BY (ทำไมคอลัมน์ใน SELECT ต้องอยู่ใน GROUP BY เสมอ)',
            whatAndWhen:
              'เมื่อต้องการสรุปสถิติ "แยกตามหมวดหมู่" (เช่น แยกตามประเภทเอกสารสิทธิ์ หรือแยกตามสำนักงาน) ต้องใช้ GROUP BY กฎเหล็ก: ทุกคอลัมน์ที่ปรากฏใน SELECT โดย "ไม่ได้" อยู่ในวงเล็บของ Aggregate Function จะต้องถูกนำไปใส่ไว้หลัง GROUP BY เสมอ เพราะหลังยุบแถวรวมกลุ่มแล้ว ระบบไม่สามารถเดาได้ว่าจะหยิบค่าคอลัมน์ปกติจากแถวใดในกลุ่มมาโชว์หากไม่จัดกลุ่มคอลัมน์นั้นด้วย',
            syntaxTemplate: [
              'SELECT group_col1, group_col2, COUNT(*) AS item_count, AVG(val_col) AS avg_val',
              'FROM table_name',
              'GROUP BY group_col1, group_col2',
              'ORDER BY item_count DESC;'
            ].join('\n'),
            dolExampleTitle: 'ตัวอย่างจริง: สรุปจำนวนแปลงและราคาประเมินเฉลี่ย แยกตามประเภทเอกสารสิทธิ์และโซนพื้นที่',
            dolExampleSql: [
              'SELECT',
              '  deed_type,',
              '  zone_type,',
              '  COUNT(*) AS plot_count,',
              '  ROUND(AVG(appraised_price_per_wah), 0) AS avg_price_per_wah',
              'FROM land_plots',
              'GROUP BY deed_type, zone_type',
              'ORDER BY plot_count DESC, avg_price_per_wah DESC;'
            ].join('\n'),
            dolExampleNote:
              'สังเกตว่าใน SELECT มีทั้ง deed_type และ zone_type ที่อยู่นอกวงเล็บ COUNT/AVG ดังนั้นหลัง GROUP BY จึงต้องระบุทั้ง deed_type, zone_type ครบทั้งคู่',
            runnableSql: [
              'SELECT',
              '  deed_type,',
              '  zone_type,',
              '  COUNT(*) AS plot_count,',
              '  ROUND(AVG(appraised_price_per_wah), 0) AS avg_price_per_wah',
              'FROM land_plots',
              'GROUP BY deed_type, zone_type',
              'ORDER BY plot_count DESC, avg_price_per_wah DESC;'
            ].join('\n'),
            runnableLabel: 'ลองรันใน SQL Sandbox',
            examPitfalls: [
              'ใส่คอลัมน์ใน SELECT เช่น SELECT office_id, office_name, COUNT(*) ... GROUP BY office_id (ลืม office_name ใน GROUP BY — ผิดมาตรฐาน ANSI SQL และพังใน PostgreSQL / SQL Server / Oracle)',
              'ใช้ SELECT * คู่กับ GROUP BY (ผิดกฎการยุบกลุ่ม!)'
            ]
          },
          {
            id: 'agg-3-having',
            commandName: 'WHERE vs HAVING',
            title: '6.3 ความแตกต่างระหว่าง WHERE กับ HAVING และการใช้คู่กัน',
            whatAndWhen:
              'WHERE กรองข้อมูล "ก่อน" จัดกลุ่ม (เช่น เอาเฉพาะธุรกรรมที่มีค่าธรรมเนียม >= 5,000 บาท) จากนั้น GROUP BY จึงจัดกลุ่มตาม tx_type และสุดท้าย HAVING จึงกรอง "ผลลัพธ์ของกลุ่ม" (เช่น เอาเฉพาะประเภทธุรกรรมที่มีตั้งแต่ 2 รายการขึ้นไป)',
            syntaxTemplate: [
              'SELECT group_col, COUNT(*) AS cnt, SUM(amount_col) AS total_amt',
              'FROM table_name',
              'WHERE row_condition           -- กรองแถวดิบก่อน (ห้ามใส่ COUNT/SUM)',
              'GROUP BY group_col',
              'HAVING COUNT(*) >= 2          -- กรองหลังจัดกลุ่ม (ใส่ Aggregate ได้!)',
              'ORDER BY total_amt DESC;'
            ].join('\n'),
            dolExampleTitle: 'ตัวอย่างจริง: สรุปประเภทธุรกรรมที่มีค่าธรรมเนียม >= 5,000 บาท และมีจำนวนตั้งแต่ 2 ครั้งขึ้นไป',
            dolExampleSql: [
              'SELECT',
              '  tx_type,',
              '  COUNT(*) AS tx_count,',
              '  SUM(fee_amount) AS total_fee',
              'FROM transactions',
              'WHERE fee_amount >= 5000',
              'GROUP BY tx_type',
              'HAVING COUNT(*) >= 2',
              'ORDER BY total_fee DESC;'
            ].join('\n'),
            dolExampleNote:
              'WHERE ตัดธุรกรรมค่าธรรมเนียมน้อยกว่า 5,000 (tx_id 109 และ 113) ออกก่อน จากนั้นจัดกลุ่มตาม tx_type และ HAVING คัดเฉพาะกลุ่มที่เหลืออย่างน้อย 2 รายการ (ซื้อขาย 5, จำนอง 4)',
            runnableSql: [
              'SELECT',
              '  tx_type,',
              '  COUNT(*) AS tx_count,',
              '  SUM(fee_amount) AS total_fee',
              'FROM transactions',
              'WHERE fee_amount >= 5000',
              'GROUP BY tx_type',
              'HAVING COUNT(*) >= 2',
              'ORDER BY total_fee DESC;'
            ].join('\n'),
            runnableLabel: 'ลองรันใน SQL Sandbox',
            examPitfalls: [
              'นำ COUNT(*) หรือ SUM(fee_amount) ไปเขียนใน WHERE (เช่น WHERE COUNT(*) >= 2) — พัง Error ทันที!',
              'นำเงื่อนไขระดับแถวเดี่ยวที่กรองได้ใน WHERE (เช่น tx_type = \'ซื้อขาย\') ไปเขียนใน HAVING โดยไม่จำเป็น ทำให้ประมวลผลช้ากว่า'
            ]
          },
          {
            id: 'agg-4-execution-order',
            commandName: '7-Step Execution Order',
            title: '6.4 ลำดับการทำงาน SQL 7 ขั้นในคำสั่งเดียว (ครบทั้ง WHERE, GROUP BY, HAVING, ORDER BY, LIMIT)',
            whatAndWhen:
              'ช่วยให้ไม่สับสนว่าตัวไหนอ้าง Alias ได้หรือไม่ได้: ลำดับที่เขียน (SELECT -> FROM -> WHERE -> GROUP BY -> HAVING -> ORDER BY -> LIMIT) กับลำดับที่เครื่องทำงานจริง (1. FROM -> 2. WHERE -> 3. GROUP BY -> 4. HAVING -> 5. SELECT -> 6. ORDER BY -> 7. LIMIT) ทำให้ WHERE อ้าง Alias ของ SELECT ไม่ได้ แต่ ORDER BY อ้างได้',
            syntaxTemplate: [
              'SELECT col, SUM(val) AS total_val   -- 5) เลือกคอลัมน์ & ตั้ง Alias',
              'FROM tbl                            -- 1) อ่านตารางต้นทาง',
              'WHERE filter_row                    -- 2) กรองแถวดิบ',
              'GROUP BY col                        -- 3) จัดกลุ่ม',
              'HAVING SUM(val) > 50000             -- 4) กรองกลุ่ม (อ้าง SUM เต็มๆ ปลอดภัยสุด)',
              'ORDER BY total_val DESC             -- 6) เรียงลำดับ (อ้าง Alias total_val ได้!)',
              'LIMIT 3;                            -- 7) ตัดเอา 3 อันดับแรก'
            ].join('\n'),
            dolExampleTitle: 'ตัวอย่างจริง: สรุปค่าธรรมเนียมแยกตามช่องทางบริการตั้งแต่กลางปี 2024 ที่ยอดรวมเกิน 50,000 บาท',
            dolExampleSql: [
              'SELECT',
              '  channel,',
              '  COUNT(*) AS tx_count,',
              '  SUM(fee_amount) AS total_fee',
              'FROM transactions',
              'WHERE tx_date >= \'2024-06-01\'',
              'GROUP BY channel',
              'HAVING SUM(fee_amount) > 50000',
              'ORDER BY total_fee DESC',
              'LIMIT 3;'
            ].join('\n'),
            dolExampleNote:
              'สังเกตว่าใน HAVING เราเขียน SUM(fee_amount) > 50000 แบบเต็ม (ไม่เขียน Alias total_fee) เพื่อให้ทำงานได้ถูกต้องตามมาตรฐาน SQL ทุกยี่ห้อทั้ง PostgreSQL และ Oracle',
            runnableSql: [
              'SELECT',
              '  channel,',
              '  COUNT(*) AS tx_count,',
              '  SUM(fee_amount) AS total_fee',
              'FROM transactions',
              "WHERE tx_date >= '2024-06-01'",
              'GROUP BY channel',
              'HAVING SUM(fee_amount) > 50000',
              'ORDER BY total_fee DESC',
              'LIMIT 3;'
            ].join('\n'),
            runnableLabel: 'ลองรันใน SQL Sandbox',
            examPitfalls: [
              'เขียนสลับลำดับในคำสั่ง เช่น เอา GROUP BY ไว้ก่อน WHERE หรือเอา ORDER BY ไว้ก่อน HAVING — Syntax Error ทันที',
              'เขียน HAVING total_fee > 50000 ใน Oracle หรือ PostgreSQL จะ Error เพราะ HAVING ทำงานในขั้นที่ 4 ก่อน SELECT ขั้นที่ 5! ให้เขียนฟังก์ชันเต็ม HAVING SUM(fee_amount) > 50000 เสมอ'
            ]
          }
        ]
      },

      // =======================================================================
      // Chapter 7: joins
      // =======================================================================
      {
        id: 'joins',
        order: 7,
        tabLabel: 'JOIN หลายตาราง',
        title: 'บทที่ 7: เจาะลึก JOIN (INNER, LEFT, RIGHT, SELF JOIN) และการเชื่อม 3-4 ตาราง',
        badge: 'เชื่อมสัมพันธ์หลายตาราง',
        summary:
          'วิธีเชื่อมตารางที่แตก Normal Form แล้วกลับมารวมเป็นรายงานเดียวด้วย Table Alias, INNER/LEFT/RIGHT/SELF JOIN พร้อม Trace ผลลัพธ์ทีละแถว',
        comparisonTable: {
          caption: 'สรุปรูปแบบการ JOIN ทั้งหมดที่ต้องแม่นก่อนเข้าห้องสอบ',
          headers: ['ประเภท JOIN', 'แถวที่แสดงในผลลัพธ์', 'กรณีฝั่งตรงข้ามไม่มีคู่', 'สถานการณ์ใช้จริง'],
          rows: [
            ['INNER JOIN', 'เฉพาะแถวที่มีคีย์ตรงกันทั้งสองตาราง', 'ตัดทิ้งทั้งคู่ ไม่แสดง', 'ดึงข้อมูลแปลงที่ดินพร้อมชื่อเจ้าของและสำนักงาน'],
            ['LEFT JOIN', 'ตารางฝั่งซ้าย (เขียนก่อน JOIN) อยู่ครบ 100%', 'คอลัมน์ฝั่งขวาแสดงค่า NULL', 'ดูรายชื่อผู้ใช้/สำนักงานทั้งหมด รวมคนที่ยังไม่มีแปลง (นับได้ 0)'],
            ['RIGHT JOIN', 'ตารางฝั่งขวา (เขียนหลัง JOIN) อยู่ครบ 100%', 'คอลัมน์ฝั่งซ้ายแสดงค่า NULL', 'ตรงข้าม LEFT JOIN (นิยมสลับฝั่งใช้ LEFT JOIN แทน)'],
            ['SELF JOIN', 'เชื่อมตารางเดียวกันกับตัวมันเองด้วย Alias ต่างกัน', 'ขึ้นกับ INNER/LEFT ที่ใช้', 'หาคู่พนักงานกับหัวหน้า หรือผู้ใช้ที่อยู่จังหวัดเดียวกัน']
          ]
        },
        items: [
          {
            id: 'joins-1-inner-alias',
            commandName: 'Table Alias & INNER JOIN',
            title: '7.1 การตั้ง Table Alias (p, u, o, t) และ INNER JOIN',
            whatAndWhen:
              'เมื่อเชื่อมหลายตาราง ชื่อคอลัมน์ที่เหมือนกันในหลายตาราง (เช่น province มีทั้งใน users และ land_offices หรือ office_id มีทั้งใน land_plots และ land_offices) จะทำให้ระบบฟ้อง Error "ambiguous column" จึงต้องตั้งชื่อย่อตาราง (Table Alias) เช่น p แทน land_plots, u แทน users, o แทน land_offices, t แทน transactions แล้วเขียน p.office_id = o.office_id เสมอ',
            syntaxTemplate: [
              'SELECT a.col1, b.col2',
              'FROM table_a a',
              'INNER JOIN table_b b ON a.fk_col = b.pk_col;'
            ].join('\n'),
            dolExampleTitle: 'ตัวอย่างจริง: เชื่อม land_plots (p) กับ users (u) และ land_offices (o) แสดง 3 ตารางพร้อมกัน',
            dolExampleSql: [
              'SELECT',
              '  p.plot_id,',
              '  p.deed_no,',
              '  u.full_name AS owner_name,',
              '  u.province AS owner_province,',
              '  o.office_name,',
              '  o.province AS office_province',
              'FROM land_plots p',
              'INNER JOIN users u ON p.owner_id = u.user_id',
              'INNER JOIN land_offices o ON p.office_id = o.office_id',
              'ORDER BY p.plot_id;'
            ].join('\n'),
            dolExampleNote:
              'ข้อควรจำ: ไม่ควรใส่คำว่า AS หน้า Table Alias (เขียน land_plots p แทน land_plots AS p) เพราะ Oracle SQL ห้ามใส่ AS หน้าชื่อตาราง แต่ไม่ใส่ AS ใช้ได้ทั้ง MySQL, PostgreSQL, SQL Server, Oracle และ SQLite!',
            runnableSql: [
              'SELECT',
              '  p.plot_id,',
              '  p.deed_no,',
              '  u.full_name AS owner_name,',
              '  u.province AS owner_province,',
              '  o.office_name,',
              '  o.province AS office_province',
              'FROM land_plots p',
              'INNER JOIN users u ON p.owner_id = u.user_id',
              'INNER JOIN land_offices o ON p.office_id = o.office_id',
              'ORDER BY p.plot_id;'
            ].join('\n'),
            runnableLabel: 'ลองรันใน SQL Sandbox',
            examPitfalls: [
              'เขียน SELECT province FROM land_plots p JOIN users u ... (ไม่ระบุ u.province หรือ o.province — เกิด Ambiguous column name)',
              'ลืมเงื่อนไข ON หลัง JOIN ทำให้เกิด Cartesian Product (คูณไขว้ทุกแถว x ทุกแถว)',
              'เชื่อมผิดคีย์ เช่น ON p.plot_id = o.office_id แทน ON p.office_id = o.office_id!'
            ]
          },
          {
            id: 'joins-2-left',
            commandName: 'LEFT JOIN (+ COUNT(col) vs WHERE trap)',
            title: '7.2 LEFT JOIN รักษาข้อมูลฝั่งซ้ายครบ 100% และกับดักที่ต้องระวัง',
            whatAndWhen:
              'ใช้เมื่อโจทย์สั่งว่า "ให้แสดงรายชื่อผู้ใช้งานทั้งหมด (หรือสำนักงานทั้งหมด) แม้จะยังไม่มีแปลงที่ดิน/ธุรกรรมเลยก็ตาม" โดยเอาตารางที่ต้องแสดงให้ครบวางเป็นฝั่งซ้าย (หลัง FROM) แล้วใช้ LEFT JOIN เชื่อมฝั่งขวา และเมื่อต้องนับจำนวน ให้ใช้ COUNT(คอลัมน์PKฝั่งขวา) เช่น COUNT(p.plot_id) เพื่อให้นับแถว NULL เป็น 0',
            syntaxTemplate: [
              'SELECT l.id, l.name, COUNT(r.id) AS item_count',
              'FROM left_table l',
              'LEFT JOIN right_table r ON l.id = r.fk_id',
              'GROUP BY l.id, l.name;'
            ].join('\n'),
            dolExampleTitle: 'ตัวอย่างจริง: แสดงรายชื่อผู้ใช้ทั้ง 10 คน พร้อมจำนวนแปลงที่ถือครอง (คนที่ยังไม่มีแปลงต้องขึ้น 0)',
            dolExampleSql: [
              'SELECT',
              '  u.user_id,',
              '  u.full_name,',
              '  COUNT(p.plot_id) AS plot_count',
              'FROM users u',
              'LEFT JOIN land_plots p ON u.user_id = p.owner_id',
              'GROUP BY u.user_id, u.full_name',
              'ORDER BY plot_count DESC, u.user_id ASC;'
            ].join('\n'),
            dolExampleNote:
              'user_id = 10 (นายภูมิพัฒน์) ไม่มีแปลงใน land_plots จึงจับคู่ฝั่งขวาเป็น NULL และ COUNT(p.plot_id) ไม่นับ NULL จึงได้เลข 0 อย่างถูกต้อง (ถ้าใช้ COUNT(*) จะได้ 1 ซึ่งผิด!)',
            runnableSql: [
              'SELECT',
              '  u.user_id,',
              '  u.full_name,',
              '  COUNT(p.plot_id) AS plot_count',
              'FROM users u',
              'LEFT JOIN land_plots p ON u.user_id = p.owner_id',
              'GROUP BY u.user_id, u.full_name',
              'ORDER BY plot_count DESC, u.user_id ASC;'
            ].join('\n'),
            runnableLabel: 'ลองรันใน SQL Sandbox',
            examPitfalls: [
              'ใช้ COUNT(*) แทน COUNT(p.plot_id) กับ LEFT JOIN — ทำให้คนไม่มีข้อมูลฝั่งขวาได้นับเป็น 1 แทน 0',
              'กับดักเงื่อนไขฝั่งขวา: ถ้าใส่ WHERE p.deed_type = \'น.ส.4 จ.\' ลงใน WHERE แถวที่ p เป็น NULL จะโดนตัดทิ้งจน LEFT JOIN กลายร่างเป็น INNER JOIN ทันที! ต้องย้ายเงื่อนไขฝั่งขวาไปไว้หลัง ON แทน (ON u.user_id = p.owner_id AND p.deed_type = \'น.ส.4 จ.\')'
            ]
          },
          {
            id: 'joins-3-right',
            commandName: 'RIGHT JOIN (และเทียบเท่า LEFT JOIN)',
            title: '7.3 RIGHT JOIN และวิธีสลับตารางเป็น LEFT JOIN',
            whatAndWhen:
              'RIGHT JOIN ทำงานตรงข้ามกับ LEFT JOIN โดยจะรักษาข้อมูลของตาราง "ฝั่งขวา" (ตารางที่เขียนหลัง RIGHT JOIN) ไว้ครบทุกแถว แม้ฝั่งซ้ายไม่มีคู่ก็แสดง NULL ในทางปฏิบัติและข้อสอบนิยมเขียนเป็น LEFT JOIN โดยวางตารางหลักไว้ฝั่งซ้ายเพราะอ่านจากบนลงล่างเข้าใจง่ายกว่า แต่เราต้องอ่านและเขียน RIGHT JOIN เป็นด้วยเผื่อข้อสอบบังคับหรือให้อ่านโค้ด',
            syntaxTemplate: [
              '-- แบบ RIGHT JOIN (รักษา right_table ครบ):',
              'SELECT l.col, r.col',
              'FROM left_table l',
              'RIGHT JOIN right_table r ON l.fk_id = r.id;',
              '',
              '-- เทียบเท่า 100% กับการสลับฝั่งใช้ LEFT JOIN:',
              'SELECT l.col, r.col',
              'FROM right_table r',
              'LEFT JOIN left_table l ON r.id = l.fk_id;'
            ].join('\n'),
            dolExampleTitle: 'ตัวอย่างจริง: ดูประวัติธุรกรรมคู่กับแปลงที่ดิน โดยรักษา land_plots (ฝั่งขวา) ไว้ครบทุกแปลง',
            dolExampleSql: [
              'SELECT',
              '  p.plot_id,',
              '  p.deed_no,',
              '  COUNT(t.tx_id) AS tx_count',
              'FROM transactions t',
              'RIGHT JOIN land_plots p ON t.plot_id = p.plot_id',
              'GROUP BY p.plot_id, p.deed_no',
              'ORDER BY tx_count ASC, p.plot_id ASC;'
            ].join('\n'),
            dolExampleNote:
              'แปลงที่ 11 และ 12 ซึ่งไม่มีอยู่ในตาราง transactions จะยังคงแสดงอยู่ในผลลัพธ์พร้อมค่า tx_count = 0 (และถ้าทดสอบเทียบกับ LEFT JOIN โดยเอา land_plots ขึ้นก่อนก็จะได้ผลเหมือนกันทุกประการ)',
            runnableSql: [
              'SELECT',
              '  p.plot_id,',
              '  p.deed_no,',
              '  COUNT(t.tx_id) AS tx_count',
              'FROM land_plots p',
              'LEFT JOIN transactions t ON p.plot_id = t.plot_id',
              'GROUP BY p.plot_id, p.deed_no',
              'ORDER BY tx_count ASC, p.plot_id ASC;'
            ].join('\n'),
            runnableLabel: 'ลองรันรูปเทียบเท่า LEFT JOIN ใน SQL Sandbox',
            examPitfalls: [
              'จำสลับข้างระหว่างฝั่งซ้าย (ก่อนคำว่า JOIN) กับฝั่งขวา (หลังคำว่า JOIN)',
              'ใช้ RIGHT JOIN ใน SQLite เวอร์ชันเก่ากว่า 3.39 หรือเอนจินเบาบางตัวที่ไม่รองรับ (แนะนำสลับฝั่งเขียนเป็น LEFT JOIN จะรองรับทุกเอนจิน)'
            ]
          },
          {
            id: 'joins-4-self',
            commandName: 'SELF JOIN',
            title: '7.4 SELF JOIN (เชื่อมตารางกับตัวมันเองเพื่อหาคู่ในตารางเดียว)',
            whatAndWhen:
              'SELF JOIN ไม่ใช่คีย์เวิร์ดพิเศษ แต่คือเทคนิคการนำตารางเดียวกันมา JOIN เข้ากับตัวมันเอง โดยตั้งชื่อ Alias ให้ต่างกัน 2 ชื่อ (เช่น u1 และ u2) ใช้บ่อยมากเมื่อในตารางมีคอลัมน์อ้างอิงกันเอง (เช่น manager_id ชี้กลับไป employee_id) หรือใช้จับคู่แถว 2 แถวในตารางเดียวกันที่มีคุณลักษณะร่วมกัน (เช่น อยู่จังหวัดเดียวกัน)',
            syntaxTemplate: [
              'SELECT a.name AS item_1, b.name AS item_2, a.shared_col',
              'FROM my_table a',
              'INNER JOIN my_table b',
              '  ON a.shared_col = b.shared_col',
              ' AND a.id < b.id;'
            ].join('\n'),
            dolExampleTitle: 'ตัวอย่างจริง: จับคู่ผู้ใช้งานในตาราง users ที่อยู่จังหวัด (province) เดียวกัน',
            dolExampleSql: [
              'SELECT',
              '  u1.user_id AS user_1_id,',
              '  u1.full_name AS user_1_name,',
              '  u2.user_id AS user_2_id,',
              '  u2.full_name AS user_2_name,',
              '  u1.province',
              'FROM users u1',
              'INNER JOIN users u2',
              '  ON u1.province = u2.province',
              ' AND u1.user_id < u2.user_id',
              'ORDER BY u1.province;'
            ].join('\n'),
            dolExampleNote:
              'เงื่อนไข AND u1.user_id < u2.user_id สำคัญมาก! ป้องกันไม่ให้คนเดิมจับคู่ตัวเอง (เช่น user 1 กับ 1) และไม่ให้ได้คู่สลับข้างซ้ำ (1-3 กับ 3-1) ผลลัพธ์จะพบคู่ในกรุงเทพมหานคร (1 กับ 3) และเชียงใหม่ (4 กับ 10)',
            runnableSql: [
              'SELECT',
              '  u1.user_id AS user_1_id,',
              '  u1.full_name AS user_1_name,',
              '  u2.user_id AS user_2_id,',
              '  u2.full_name AS user_2_name,',
              '  u1.province',
              'FROM users u1',
              'INNER JOIN users u2',
              '  ON u1.province = u2.province',
              ' AND u1.user_id < u2.user_id',
              'ORDER BY u1.province;'
            ].join('\n'),
            runnableLabel: 'ลองรันใน SQL Sandbox',
            examPitfalls: [
              'ลืมตั้ง Alias ต่างกัน 2 ชื่อ (ถ้าไม่ตั้งชื่อเล่นให้ตารางจะ Error ทันทีเพราะชื่อตารางซ้ำ)',
              'ลืมใส่เงื่อนไข a.id <> b.id หรือ a.id < b.id ทำให้ทุกแถวจับคู่กับตัวเองติดออกมาด้วย'
            ]
          },
          {
            id: 'joins-5-multi-trace',
            commandName: 'Multi-Table JOIN (3-4 Tables + Row Trace)',
            title: '7.5 การเชื่อม 4 ตารางต่อเนื่อง พร้อม Trace ผลลัพธ์ทีละแถว',
            whatAndWhen:
              'ในข้อสอบจริงมักต้องดึงข้อมูลข้าม 3-4 ตาราง เช่น ต้องการรายงานประวัติธุรกรรม (transactions) ที่แสดงเลขโฉนด (land_plots), ชื่อเจ้าของ (users) และชื่อสำนักงานที่ดิน (land_offices) วิธีคิดคือไล่เส้นเชื่อม Foreign Key ทีละข้อต่อ: t.plot_id = p.plot_id -> p.owner_id = u.user_id -> p.office_id = o.office_id',
            syntaxTemplate: [
              'SELECT t.tx_id, p.deed_no, u.full_name, o.office_name',
              'FROM transactions t',
              'INNER JOIN land_plots p   ON t.plot_id = p.plot_id',
              'INNER JOIN users u        ON p.owner_id = u.user_id',
              'INNER JOIN land_offices o ON p.office_id = o.office_id;'
            ].join('\n'),
            dolExampleTitle: 'ตัวอย่างจริง: รายงานธุรกรรมปี 2025 เชื่อมครบทั้ง 4 ตารางกรมที่ดิน',
            dolExampleSql: [
              'SELECT',
              '  t.tx_id,',
              '  t.tx_date,',
              '  t.tx_type,',
              '  t.fee_amount,',
              '  p.deed_no,',
              '  u.full_name AS owner_name,',
              '  o.office_name',
              'FROM transactions t',
              'INNER JOIN land_plots p ON t.plot_id = p.plot_id',
              'INNER JOIN users u ON p.owner_id = u.user_id',
              'INNER JOIN land_offices o ON p.office_id = o.office_id',
              'WHERE t.tx_date LIKE \'2025-%\'',
              'ORDER BY t.tx_date ASC;'
            ].join('\n'),
            dolExampleNote:
              'ไล่ Trace แถวแรก (tx_id = 108): 1) transactions แถว tx_id=108 มี plot_id=8 -> 2) วิ่งไป land_plots แถว plot_id=8 ได้ deed_no=\'น.ส.4จ-67210\', owner_id=3, office_id=6 -> 3) วิ่งไป users แถว user_id=3 ได้ \'บริษัท สยามแลนด์ ดีเวลลอปเมนท์ จำกัด\' -> 4) วิ่งไป land_offices แถว office_id=6 ได้ \'สำนักงานที่ดินจังหวัดภูเก็ต\' รวมออกมาเป็น 1 แถวผลลัพธ์ที่สมบูรณ์!',
            runnableSql: [
              'SELECT',
              '  t.tx_id,',
              '  t.tx_date,',
              '  t.tx_type,',
              '  t.fee_amount,',
              '  p.deed_no,',
              '  u.full_name AS owner_name,',
              '  o.office_name',
              'FROM transactions t',
              'INNER JOIN land_plots p ON t.plot_id = p.plot_id',
              'INNER JOIN users u ON p.owner_id = u.user_id',
              'INNER JOIN land_offices o ON p.office_id = o.office_id',
              "WHERE t.tx_date LIKE '2025-%'",
              'ORDER BY t.tx_date ASC;'
            ].join('\n'),
            runnableLabel: 'ลองรันใน SQL Sandbox',
            examPitfalls: [
              'พยายามเชื่อม transactions กับ users โดยตรง (เช่น t.tx_id = u.user_id — ผิด! ไม่มีคีย์ตรง ต้องเชื่อมผ่านตารางกลาง land_plots ก่อนเสมอ)',
              'ใช้ WHERE หลัง JOIN แต่ลืมระบุ Alias หน้าคอลัมน์ที่มีชื่อซ้ำกัน'
            ]
          }
        ]
      },

      // =======================================================================
      // Chapter 8: advanced-subquery
      // =======================================================================
      {
        id: 'advanced-subquery',
        order: 8,
        tabLabel: 'Subquery & CASE',
        title: 'บทที่ 8: Subquery (AVG, IN, NOT EXISTS) และ CASE WHEN แบ่งระดับราคา',
        badge: 'ระดับสูง & ออกข้อเขียนบ่อย',
        summary:
          'เทคนิคเขียน Query ซ้อน Query (Subquery) เพื่อเทียบค่าเฉลี่ยหรือหาข้อมูลที่ไม่มีอยู่จริง พร้อมคำสั่ง CASE WHEN สำหรับจัดกลุ่ม/แบ่งช่วงราคาประเมินที่ดิน',
        items: [
          {
            id: 'adv-1-scalar-subquery',
            commandName: 'Scalar Subquery (เทียบค่า AVG / MAX)',
            title: '8.1 Subquery ใน WHERE เพื่อเปรียบเทียบกับค่าเฉลี่ย AVG()',
            whatAndWhen:
              'ปัญหาคลาสสิก: เราไม่สามารถเขียน WHERE appraised_price_per_wah > AVG(appraised_price_per_wah) ได้ เพราะ WHERE ห้ามใช้ฟังก์ชันสรุปผล! ทางแก้คือเขียน Subquery ซ้อนเข้าไปในวงเล็บ (...) เพื่อให้ระบบคำนวณค่าเฉลี่ย (ได้เลขค่าเดียว = Scalar) ออกมาก่อน แล้วค่อยนำมาเปรียบเทียบใน WHERE',
            syntaxTemplate: [
              'SELECT col1, value_col',
              'FROM table_name',
              'WHERE value_col > (SELECT AVG(value_col) FROM table_name);'
            ].join('\n'),
            dolExampleTitle: 'ตัวอย่างจริง: ค้นหาแปลงที่ดินที่มีราคาประเมินต่อตารางวา "สูงกว่าค่าเฉลี่ย" ของทั้งประเทศ',
            dolExampleSql: [
              'SELECT',
              '  plot_id,',
              '  deed_no,',
              '  deed_type,',
              '  zone_type,',
              '  appraised_price_per_wah',
              'FROM land_plots',
              'WHERE appraised_price_per_wah > (',
              '  SELECT AVG(appraised_price_per_wah) FROM land_plots',
              ')',
              'ORDER BY appraised_price_per_wah DESC;'
            ].join('\n'),
            dolExampleNote:
              'ค่าเฉลี่ยราคาประเมินของทั้ง 12 แปลงอยู่ที่ 80,266.67 บาท/ตร.ว. Subquery จะคำนวณค่านี้ออกมาก่อน จากนั้น Query นอกจึงคัดเฉพาะแปลงที่แพงกว่าค่านี้ออกมา (ได้ 5 แปลง: 185k, 165k, 140k, 120k, 82k)',
            runnableSql: [
              'SELECT',
              '  plot_id,',
              '  deed_no,',
              '  deed_type,',
              '  zone_type,',
              '  appraised_price_per_wah',
              'FROM land_plots',
              'WHERE appraised_price_per_wah > (',
              '  SELECT AVG(appraised_price_per_wah) FROM land_plots',
              ')',
              'ORDER BY appraised_price_per_wah DESC;'
            ].join('\n'),
            runnableLabel: 'ลองรันใน SQL Sandbox',
            examPitfalls: [
              'เขียน WHERE appraised_price_per_wah > AVG(appraised_price_per_wah) โดยไม่ใช้ Subquery (Syntax Error!)',
              'ใช้เครื่องหมาย = กับ Subquery ที่คืนค่าออกมาหลายแถว (Error: Subquery returns more than 1 row — ถ้าคืนหลายแถวต้องใช้ IN แทน =)'
            ]
          },
          {
            id: 'adv-2-in-subquery',
            commandName: 'IN (SELECT ...)',
            title: '8.2 List Subquery ด้วย IN (SELECT ...) หาข้อมูลที่สัมพันธ์กับอีกตาราง',
            whatAndWhen:
              'ใช้เมื่อต้องการกรองแถวจากตารางหลักโดยอิงจากชุดรหัสที่ได้มาจาก Query อีกชุดหนึ่ง โดย Subquery ภายในวงเล็บต้อง SELECT ออกมาเพียง "1 คอลัมน์" เท่านั้นเพื่อให้เปรียบเทียบกับคอลัมน์ด้านหน้า IN ได้',
            syntaxTemplate: [
              'SELECT col1, col2',
              'FROM table_a',
              'WHERE id_col IN (',
              '  SELECT DISTINCT fk_col FROM table_b WHERE condition',
              ');'
            ].join('\n'),
            dolExampleTitle: 'ตัวอย่างจริง: หารายละเอียดแปลงที่ดินที่เคยทำธุรกรรมประเภท "จำนอง"',
            dolExampleSql: [
              'SELECT plot_id, deed_no, zone_type, appraised_price_per_wah',
              'FROM land_plots',
              'WHERE plot_id IN (',
              '  SELECT DISTINCT plot_id',
              '  FROM transactions',
              '  WHERE tx_type = \'จำนอง\'',
              ')',
              'ORDER BY plot_id;'
            ].join('\n'),
            dolExampleNote:
              'Subquery ด้านในดึงรายการ plot_id ที่มี tx_type = \'จำนอง\' (1, 2, 5, 8) ออกมาก่อน แล้ว Query นอกจึงดึงรายละเอียดของแปลงเหล่านั้นมาแสดง โดยไม่เกิดแถวซ้ำเหมือนตอน JOIN กับ transactions',
            runnableSql: [
              'SELECT plot_id, deed_no, zone_type, appraised_price_per_wah',
              'FROM land_plots',
              'WHERE plot_id IN (',
              '  SELECT DISTINCT plot_id',
              '  FROM transactions',
              "  WHERE tx_type = 'จำนอง'",
              ')',
              'ORDER BY plot_id;'
            ].join('\n'),
            runnableLabel: 'ลองรันใน SQL Sandbox',
            examPitfalls: [
              'ใส่คอลัมน์ใน Subquery เกิน 1 คอลัมน์ เช่น WHERE plot_id IN (SELECT plot_id, tx_type FROM ...) — พังทันที!',
              'ใช้ NOT IN (SELECT fk FROM ...) โดยไม่มั่นใจว่า fk มี NULL หรือไม่ (ถ้ามี NULL แม้แต่แถวเดียว NOT IN จะคืน 0 แถว! ให้ใช้ NOT EXISTS แทน)'
            ]
          },
          {
            id: 'adv-3-not-exists',
            commandName: 'EXISTS & NOT EXISTS',
            title: '8.3 Correlated Subquery ด้วย EXISTS / NOT EXISTS (ปลอดภัยจาก NULL)',
            whatAndWhen:
              'EXISTS / NOT EXISTS ใช้ตรวจว่ามีแถวที่เชื่อมโยงอยู่ในตารางย่อยหรือไม่ โดย Subquery ข้างในจะอ้างอิงคอลัมน์ของตารางหลัก (Correlated Subquery เช่น p.owner_id = u.user_id) ข้อดีสุดๆ ของ NOT EXISTS คือ "ไม่พังเมื่อมีค่า NULL" และหยุดค้นหาทันทีที่เจอตัวแรก (เร็วกว่ากับตารางใหญ่)',
            syntaxTemplate: [
              'SELECT a.id, a.name',
              'FROM table_a a',
              'WHERE NOT EXISTS (',
              '  SELECT 1',
              '  FROM table_b b',
              '  WHERE b.fk_id = a.id',
              ');'
            ].join('\n'),
            dolExampleTitle: 'ตัวอย่างจริง: หาผู้ใช้งานที่ยังไม่เคยมีแปลงที่ดินในระบบด้วย NOT EXISTS',
            dolExampleSql: [
              'SELECT u.user_id, u.full_name, u.citizen_type, u.province, u.registered_year',
              'FROM users u',
              'WHERE NOT EXISTS (',
              '  SELECT 1',
              '  FROM land_plots p',
              '  WHERE p.owner_id = u.user_id',
              ');'
            ].join('\n'),
            dolExampleNote:
              'SELECT 1 เป็นธรรมเนียมมาตรฐานใน EXISTS เพราะระบบแค่เช็กว่ามีแถวอยู่จริงหรือไม่ ไม่ได้สนใจค่าคอลัมน์ที่จะดึงออกมา ผลลัพธ์จะได้ user_id = 10 (นายภูมิพัฒน์)',
            runnableSql: [
              'SELECT u.user_id, u.full_name, u.citizen_type, u.province, u.registered_year',
              'FROM users u',
              'WHERE NOT EXISTS (',
              '  SELECT 1',
              '  FROM land_plots p',
              '  WHERE p.owner_id = u.user_id',
              ');'
            ].join('\n'),
            runnableLabel: 'ลองรันใน SQL Sandbox',
            examPitfalls: [
              'ลืมเขียนเงื่อนไขเชื่อมใน WHERE ของ Subquery (ลืม WHERE p.owner_id = u.user_id) ทำให้ NOT EXISTS เป็นเท็จตลอดกาลและไม่ได้ผลลัพธ์เลย!',
              'เผลอตั้ง Alias ซ้ำกันระหว่าง Query นอกกับ Query ในจนเงื่อนไขอ้างผิดตาราง'
            ]
          },
          {
            id: 'adv-4-case-when',
            commandName: 'CASE WHEN ... THEN ... ELSE ... END',
            title: '8.4 CASE WHEN จัดกลุ่มช่วงราคาประเมินที่ดิน (และใช้คู่กับ GROUP BY)',
            whatAndWhen:
              'CASE WHEN คือคำสั่ง If-Else ในภาษา SQL ใช้แปลงค่าหรือแบ่งช่วงข้อมูลตัวเลขออกเป็นป้ายกำกับ (Category/Tier) เช่น แบ่งราคาประเมินที่ดินเป็น "ระดับสูงมาก", "ระดับปานกลาง", "ระดับทั่วไป" และสามารถใช้ใน SELECT หรือใน GROUP BY ได้ด้วย',
            syntaxTemplate: [
              'SELECT col1,',
              '  CASE',
              '    WHEN condition_1 THEN \'Label 1\'',
              '    WHEN condition_2 THEN \'Label 2\'',
              '    ELSE \'Default Label\'',
              '  END AS category_name',
              'FROM table_name;'
            ].join('\n'),
            dolExampleTitle: 'ตัวอย่างจริง: แบ่งระดับราคาประเมินที่ดินออกเป็น 3 กลุ่ม และสรุปจำนวนแปลงต่อกลุ่ม',
            dolExampleSql: [
              'SELECT',
              '  CASE',
              '    WHEN appraised_price_per_wah >= 120000 THEN \'1. สูงมาก (>= 120,000)\'',
              '    WHEN appraised_price_per_wah >= 50000  THEN \'2. ปานกลาง (50,000-119,999)\'',
              '    ELSE \'3. ทั่วไป (< 50,000)\'',
              '  END AS price_tier,',
              '  COUNT(*) AS plot_count,',
              '  ROUND(AVG(appraised_price_per_wah), 0) AS avg_price',
              'FROM land_plots',
              'GROUP BY price_tier',
              'ORDER BY price_tier ASC;'
            ].join('\n'),
            dolExampleNote:
              'CASE WHEN ประเมินเงื่อนไขจากบนลงล่าง พอเข้าเงื่อนไขแรกที่เป็นจริงจะหยุดและคืนค่านั้นทันที จึงต้องเรียงช่วงคะแนน/ราคาจากมากสุดลงมาน้อยสุด (หรือเขียน BETWEEN ชัดเจน)',
            runnableSql: [
              'SELECT',
              '  CASE',
              "    WHEN appraised_price_per_wah >= 120000 THEN '1. สูงมาก (>= 120,000)'",
              "    WHEN appraised_price_per_wah >= 50000  THEN '2. ปานกลาง (50,000-119,999)'",
              "    ELSE '3. ทั่วไป (< 50,000)'",
              '  END AS price_tier,',
              '  COUNT(*) AS plot_count,',
              '  ROUND(AVG(appraised_price_per_wah), 0) AS avg_price',
              'FROM land_plots',
              'GROUP BY price_tier',
              'ORDER BY price_tier ASC;'
            ].join('\n'),
            runnableLabel: 'ลองรันใน SQL Sandbox',
            examPitfalls: [
              'ลืมคำว่า END ปิดท้าย CASE (และอย่าลืมตั้ง AS alias_name หลัง END ด้วย)',
              'เรียงเงื่อนไขผิดลำดับ เช่น เอา >= 50000 ไว้ก่อน >= 120000 ทำให้ราคา 185,000 บาทตกเข้าเงื่อนไข >= 50000 ไปหมดเลย!',
              'ลืมใส่ ELSE เมื่อต้องการป้ายกำกับสำรอง (ถ้าไม่ใส่ ELSE แถวที่ไม่เข้าเงื่อนไขใดๆ จะได้ค่า NULL)'
            ]
          }
        ]
      }
    ],

    // =========================================================================
    // 6 Written SQL Exam Scenarios ("โจทย์ข้อเขียน SQL 6 ข้อ — ลองเขียนลงกระดาษก่อนกดดูเฉลย")
    // =========================================================================
    writtenExams: [
      {
        id: 'exam-01',
        order: 1,
        level: 'พื้นฐาน–กลาง (DDL)',
        title: 'ข้อ 1: เขียนคำสั่ง CREATE TABLE กำหนด PK, FK, NOT NULL, CHECK และ DEFAULT',
        promptText:
          'กรมที่ดินต้องการสร้างตารางใหม่ชื่อ survey_requests เพื่อเก็บคำขอรังวัดสอบเขตที่ดิน โดยมีคอลัมน์ดังนี้: request_id (จำนวนเต็ม เป็น Primary Key), plot_id (จำนวนเต็ม ห้ามว่าง เชื่อมกับ land_plots.plot_id), office_id (จำนวนเต็ม ห้ามว่าง เชื่อมกับ land_offices.office_id), request_no (ข้อความไม่เกิน 30 ตัวอักษร ห้ามว่างและห้ามซ้ำ), request_date (วันที่ ห้ามว่าง), fee_paid (จำนวนเต็ม ต้อง >= 0 มีค่าเริ่มต้นเป็น 0), และ status (ข้อความไม่เกิน 40 ตัวอักษร มีค่าเริ่มต้นเป็น \'รอดำเนินการ\') จงเขียนคำสั่ง SQL สร้างตารางนี้ให้ถูกต้องสมบูรณ์',
        thinkingSteps: [
          '1) แกะโจทย์หาชื่อตารางและประเภทคำสั่ง: โจทย์สั่ง "สร้างตารางใหม่ชื่อ survey_requests" -> ใช้คำสั่ง DDL: CREATE TABLE survey_requests (...);',
          '2) ไล่คอลัมน์และชนิดข้อมูล (Data Types): request_id/plot_id/office_id/fee_paid เป็น INT; request_no เป็น VARCHAR(30); request_date เป็น DATE; status เป็น VARCHAR(40)',
          '3) ใส่ Constraints ระดับคอลัมน์ให้ครบตามโจทย์: request_id -> PRIMARY KEY; request_no -> NOT NULL UNIQUE; request_date/plot_id/office_id -> NOT NULL; fee_paid -> NOT NULL DEFAULT 0 CHECK (fee_paid >= 0); status -> NOT NULL DEFAULT \'รอดำเนินการ\'',
          '4) เพิ่ม Foreign Key 2 ตัวตอนท้าย (เชื่อมตารางแม่ land_plots และ land_offices) พร้อมตรวจสอบคอมม่าทุกบรรทัด และปิดท้ายด้วย );'
        ],
        solutionSql: [
          'CREATE TABLE survey_requests (',
          '  request_id INT PRIMARY KEY,',
          '  plot_id INT NOT NULL,',
          '  office_id INT NOT NULL,',
          '  request_no VARCHAR(30) NOT NULL UNIQUE,',
          '  request_date DATE NOT NULL,',
          '  fee_paid INT NOT NULL DEFAULT 0 CHECK (fee_paid >= 0),',
          '  status VARCHAR(40) NOT NULL DEFAULT \'รอดำเนินการ\',',
          '  FOREIGN KEY (plot_id) REFERENCES land_plots(plot_id),',
          '  FOREIGN KEY (office_id) REFERENCES land_offices(office_id)',
          ');'
        ].join('\n'),
        lineByLineExplanation: [
          'CREATE TABLE survey_requests (: ประกาศสร้างตารางใหม่ชื่อ survey_requests',
          'request_id INT PRIMARY KEY: กำหนดเป็นคีย์หลัก (ห้ามซ้ำ + ห้ามเป็น NULL อัตโนมัติ)',
          'plot_id INT NOT NULL / office_id INT NOT NULL: เตรียมคอลัมน์ชนิด INT ตรงกับ PK ตารางแม่ และบังคับต้องระบุค่าเสมอ',
          'request_no VARCHAR(30) NOT NULL UNIQUE: ข้อความไม่เกิน 30 ตัว ห้ามว่างและห้ามเลขคำขอซ้ำกัน',
          'request_date DATE NOT NULL: เก็บวันที่ยื่นคำขอรังวัดและบังคับห้ามว่าง',
          'fee_paid INT NOT NULL DEFAULT 0 CHECK (fee_paid >= 0): ค่าเริ่มต้น 0 บาท และห้ามใส่ค่าติดลบ',
          'status VARCHAR(40) NOT NULL DEFAULT \'รอดำเนินการ\': ตั้งสถานะเริ่มต้นเป็นภาษาไทยใน Single Quote',
          'FOREIGN KEY (...) REFERENCES ...: ผูกความสัมพันธ์อ้างอิงกลับไปยัง PK ของ land_plots และ land_offices (บรรทัดสุดท้ายไม่มีคอมม่า)'
        ],
        commonMistakes: [
          'ใส่คอมม่า (,) เกินหลังบรรทัด FOREIGN KEY (office_id) REFERENCES land_offices(office_id) ก่อนวงเล็บปิด );',
          'ลืมคำว่า REFERENCES หรือใส่แต่ชื่อตารางแม่ REFERENCES land_plots โดยลืม (plot_id)',
          'ใช้ String แทน VARCHAR หรือใช้ Single Quote ผิดเป็น Double Quote ใน DEFAULT "รอดำเนินการ"'
        ],
        canRunInSandbox: false
      },
      {
        id: 'exam-02',
        order: 2,
        level: 'พื้นฐาน–กลาง (DML)',
        title: 'ข้อ 2: เขียนคำสั่ง INSERT และ UPDATE ... WHERE อย่างถูกต้องปลอดภัย',
        promptText:
          'จงเขียนคำสั่ง SQL 2 คำสั่งต่อเนื่องกันสำหรับงานทะเบียนที่ดิน: (ก) เพิ่มข้อมูลผู้ขอใช้บริการรายใหม่ 1 รายเข้าตาราง users โดยมี user_id = 11, ชื่อเต็ม \'นางสาวรัตนาภรณ์ สุขใจ\', ประเภท \'บุคคลธรรมดา\', จังหวัด \'กรุงเทพมหานคร\', ปีลงทะเบียน 2025 และ (ข) ปรับปรุงราคาประเมินต่อตารางวา (appraised_price_per_wah) ในตาราง land_plots ให้เพิ่มขึ้น 10% เฉพาะแปลงที่อยู่ในสำนักงานรหัส 2 (office_id = 2) และเป็นเอกสารสิทธิ์ประเภท \'น.ส.4 จ.\' เท่านั้น',
        thinkingSteps: [
          '1) แยกงานเป็น 2 คำสั่ง DML: (ก) "เพิ่มข้อมูลรายใหม่" -> ใช้ INSERT INTO users (...) VALUES (...); (ข) "ปรับปรุงราคาในแถวเดิม" -> ใช้ UPDATE land_plots SET ... WHERE ...;',
          '2) ตรวจสอบชื่อคอลัมน์ของ users ให้ตรงสคีมาจริง: user_id, full_name, citizen_type, province, registered_year พร้อมแยกชนิดข้อมูล (ตัวเลขไม่ใส่ quote, ข้อความใส่ \'...\')',
          '3) คำนวณราคาประเมินเพิ่ม 10% ในคำสั่ง UPDATE: SET appraised_price_per_wah = appraised_price_per_wah * 1.10 (หรือ + (appraised_price_per_wah * 0.10))',
          '4) ใส่เงื่อนไข WHERE ใน UPDATE ให้ครบทั้ง 2 เงื่อนไขเชื่อมด้วย AND: WHERE office_id = 2 AND deed_type = \'น.ส.4 จ.\'; แล้วตรวจว่ามี ; ปิดท้ายทั้งสองคำสั่ง'
        ],
        solutionSql: [
          '-- (ก) เพิ่มข้อมูลผู้ขอใช้บริการรายใหม่เข้าตาราง users',
          'INSERT INTO users (user_id, full_name, citizen_type, province, registered_year)',
          'VALUES (11, \'นางสาวรัตนาภรณ์ สุขใจ\', \'บุคคลธรรมดา\', \'กรุงเทพมหานคร\', 2025);',
          '',
          '-- (ข) ปรับราคาประเมินขึ้น 10% เฉพาะแปลง น.ส.4 จ. ในสำนักงานรหัส 2',
          'UPDATE land_plots',
          'SET appraised_price_per_wah = appraised_price_per_wah * 1.10',
          'WHERE office_id = 2',
          '  AND deed_type = \'น.ส.4 จ.\';'
        ].join('\n'),
        lineByLineExplanation: [
          'INSERT INTO users (...): ระบุชื่อคอลัมน์ทั้ง 5 ช่องให้ชัดเจนตรงตามตาราง users',
          'VALUES (11, ... , 2025);: ใส่ค่า 5 ตัวเรียงตรงตามลำดับคอลัมน์ (11 และ 2025 เป็น INT ไม่ใส่ quote ส่วนข้อความใส่ \'...\')',
          'UPDATE land_plots: ระบุตารางที่ต้องการแก้ไขข้อมูล',
          'SET appraised_price_per_wah = appraised_price_per_wah * 1.10: อัปเดตคอลัมน์ราคาประเมินเป็น 1.10 เท่าของราคาเดิม (เพิ่มขึ้น 10%)',
          'WHERE office_id = 2 AND deed_type = \'น.ส.4 จ.\';: ล็อกเป้าเฉพาะ 2 เงื่อนไขนี้เท่านั้น ป้องกันการปรับราคาผิดแปลง'
        ],
        commonMistakes: [
          'ลืมเขียน WHERE ในคำสั่ง UPDATE — ถือเป็นความผิดพลาดร้ายแรง ทำให้ราคาประเมินปรับขึ้นทุกแปลงทั้งประเทศ!',
          'เขียน SET appraised_price_per_wah = * 1.10 (ลืมพิมพ์ชื่อคอลัมน์เดิมหลังเครื่องหมาย =)',
          'พิมพ์สะกดค่า deed_type ผิดเป็น \'น.ส.4จ.\' (ลืมเว้นวรรคก่อน จ. — ในฐานข้อมูลตาราง land_plots เก็บว่า \'น.ส.4 จ.\')'
        ],
        canRunInSandbox: false
      },
      {
        id: 'exam-03',
        order: 3,
        level: 'พื้นฐาน–กลาง (DQL + WHERE)',
        title: 'ข้อ 3: SELECT + WHERE (AND/OR/LIKE/BETWEEN) + ORDER BY',
        promptText:
          'จงเขียนคำสั่ง SQL เพื่อสืบค้นข้อมูล plot_id, deed_no, deed_type, zone_type และ appraised_price_per_wah จากตาราง land_plots โดยมีเงื่อนไขทั้งหมดดังนี้: (1) เลขที่เอกสารสิทธิ์ (deed_no) ต้องขึ้นต้นด้วยคำว่า \'น.ส.4จ-\' (2) อยู่ในโซน \'ที่อยู่อาศัย\' หรือ \'พาณิชยกรรม\' และ (3) มีราคาประเมินต่อตารางวาอยู่ระหว่าง 50,000 ถึง 180,000 บาท (รวม 50,000 และ 180,000 ด้วย) พร้อมเรียงลำดับผลลัพธ์จากราคาประเมินมากไปน้อย',
        thinkingSteps: [
          '1) แกะโจทย์หาตารางและคอลัมน์แสดงผล: ใช้ตารางเดียวคือ land_plots แสดง 5 คอลัมน์: plot_id, deed_no, deed_type, zone_type, appraised_price_per_wah',
          '2) แปลงเงื่อนไขทีละข้อ: ขึ้นต้นด้วย \'น.ส.4จ-\' -> deed_no LIKE \'น.ส.4จ-%\'; โซนที่อยู่อาศัยหรือพาณิชยกรรม -> (zone_type = \'ที่อยู่อาศัย\' OR zone_type = \'พาณิชยกรรม\'); ราคาช่วง 50k-180k -> appraised_price_per_wah BETWEEN 50000 AND 180000',
          '3) เชื่อมเงื่อนไขทั้งหมดด้วย AND และตรวจวงเล็บรอบ OR ให้แม่นยำ (หรือใช้ IN (\'ที่อยู่อาศัย\', \'พาณิชยกรรม\') ก็ได้)',
          '4) จัดเรียงจากราคาประเมินมากไปน้อย: ORDER BY appraised_price_per_wah DESC; แล้วลองไล่เช็กคำสั่งตั้งแต่ SELECT ถึง ;'
        ],
        solutionSql: [
          'SELECT plot_id, deed_no, deed_type, zone_type, appraised_price_per_wah',
          'FROM land_plots',
          'WHERE deed_no LIKE \'น.ส.4จ-%\'',
          '  AND (zone_type = \'ที่อยู่อาศัย\' OR zone_type = \'พาณิชยกรรม\')',
          '  AND appraised_price_per_wah BETWEEN 50000 AND 180000',
          'ORDER BY appraised_price_per_wah DESC;'
        ].join('\n'),
        lineByLineExplanation: [
          'SELECT plot_id, deed_no, deed_type, zone_type, appraised_price_per_wah: เลือกแสดงเฉพาะ 5 คอลัมน์ตามโจทย์สั่ง',
          'FROM land_plots: ระบุตารางแปลงที่ดิน',
          'WHERE deed_no LIKE \'น.ส.4จ-%\': ใช้ Wildcard % ต่อท้ายเพื่อกรองเลขเอกสารสิทธิ์ที่ขึ้นต้นด้วย น.ส.4จ-',
          'AND (zone_type = \'ที่อยู่อาศัย\' OR zone_type = \'พาณิชยกรรม\'): ใส่วงเล็บครอบ OR เสมอเพื่อไม่ให้ลำดับความสำคัญของ AND มาแยกเงื่อนไขจนพัง',
          'AND appraised_price_per_wah BETWEEN 50000 AND 180000: กรองช่วงราคาแบบรวมขอบทั้ง 50,000 และ 180,000',
          'ORDER BY appraised_price_per_wah DESC;: เรียงลำดับจากราคาประเมินสูงสุดลงมาน้อยสุด (ได้ 5 แปลง)'
        ],
        commonMistakes: [
          'ลืมใส่วงเล็บครอบ (zone_type = \'ที่อยู่อาศัย\' OR zone_type = \'พาณิชยกรรม\') ทำให้ OR ไปแยกลำดับกับ AND จนข้อมูลผิด!',
          'ใช้เครื่องหมาย = คู่กับ % เช่น deed_no = \'น.ส.4จ-%\' แทน LIKE',
          'เขียนคั่นด้วยจุลภาคในตัวเลข เช่น BETWEEN 50,000 AND 180,000 (ใน SQL ตัวเลขห้ามใส่ลูกน้ำคั่นหลักพัน! ต้องเขียน 50000 และ 180000)'
        ],
        canRunInSandbox: true
      },
      {
        id: 'exam-04',
        order: 4,
        level: 'กลาง (3-Table INNER JOIN + คำนวณ)',
        title: 'ข้อ 4: INNER JOIN 3 ตาราง + คำนวณเนื้อที่รวมและมูลค่าประเมินทั้งแปลง',
        promptText:
          'จงเขียนคำสั่ง SQL เพื่อแสดงเลขที่เอกสารสิทธิ์ (deed_no), ชื่อเจ้าของ (full_name), ชื่อสำนักงานที่ดิน (office_name), เนื้อที่รวมเป็นตารางวา (ตั้งชื่อว่า total_sq_wah โดย 1 ไร่ = 400 ตร.ว., 1 งาน = 100 ตร.ว.) และมูลค่าประเมินรวมทั้งแปลง (ตั้งชื่อว่า total_value = เนื้อที่รวม × ราคาประเมินต่อตารางวา) เฉพาะแปลงที่มีเนื้อที่รวมตั้งแต่ 400 ตารางวาขึ้นไป (อย่างน้อย 1 ไร่) และเรียงลำดับตามมูลค่าประเมินรวมจากมากไปน้อย',
        thinkingSteps: [
          '1) แกะโจทย์หาตารางที่ต้องเชื่อม: deed_no/rai/ngan/sq_wah/appraised_price_per_wah อยู่ที่ land_plots (p), full_name อยู่ที่ users (u), office_name อยู่ที่ land_offices (o) -> ต้อง INNER JOIN 3 ตาราง!',
          '2) หาคู่ Foreign Key สำหรับเชื่อม: p.owner_id = u.user_id และ p.office_id = o.office_id',
          '3) วางสูตรคณิตศาสตร์: total_sq_wah คือ (p.rai * 400) + (p.ngan * 100) + p.sq_wah และ total_value คือ ((p.rai * 400) + (p.ngan * 100) + p.sq_wah) * p.appraised_price_per_wah',
          '4) ใส่เงื่อนไขเนื้อที่รวม >= 400 ใน WHERE (ต้องเขียนสูตรเต็มใน WHERE ห้ามเขียน WHERE total_sq_wah >= 400 เพราะ WHERE ทำงานก่อน SELECT!) แล้วเรียง ORDER BY total_value DESC;'
        ],
        solutionSql: [
          'SELECT',
          '  p.deed_no,',
          '  u.full_name,',
          '  o.office_name,',
          '  (p.rai * 400) + (p.ngan * 100) + p.sq_wah AS total_sq_wah,',
          '  ((p.rai * 400) + (p.ngan * 100) + p.sq_wah) * p.appraised_price_per_wah AS total_value',
          'FROM land_plots p',
          'INNER JOIN users u ON p.owner_id = u.user_id',
          'INNER JOIN land_offices o ON p.office_id = o.office_id',
          'WHERE ((p.rai * 400) + (p.ngan * 100) + p.sq_wah) >= 400',
          'ORDER BY total_value DESC;'
        ].join('\n'),
        lineByLineExplanation: [
          'SELECT p.deed_no, u.full_name, o.office_name, ...: ดึงข้อมูลจากทั้ง 3 ตารางพร้อมระบุ Alias หน้าทุกคอลัมน์',
          '(p.rai * 400) + (p.ngan * 100) + p.sq_wah AS total_sq_wah: แปลงไร่-งาน-วาเป็นตารางวาทั้งหมด',
          '((p.rai * 400) + (p.ngan * 100) + p.sq_wah) * p.appraised_price_per_wah AS total_value: ใส่วงเล็บครอบเนื้อที่รวมก่อนคูณราคาประเมินต่อ ตร.ว.',
          'INNER JOIN users u ON p.owner_id = u.user_id: เชื่อมแปลงเข้ากับข้อมูลเจ้าของ',
          'INNER JOIN land_offices o ON p.office_id = o.office_id: เชื่อมแปลงเข้ากับสำนักงานที่ดิน',
          'WHERE ((p.rai * 400) + (p.ngan * 100) + p.sq_wah) >= 400: เขียนนิพจน์คำนวณเต็มใน WHERE เพราะ WHERE ประมวลผลก่อนที่ Alias total_sq_wah จะถูกสร้าง',
          'ORDER BY total_value DESC;: เรียงตามมูลค่าประเมินรวมจากมากไปน้อย (ได้ 8 แปลง)'
        ],
        commonMistakes: [
          'เขียน WHERE total_sq_wah >= 400 — อ้าง Alias ใน WHERE ไม่ได้! (พังใน PostgreSQL / SQL Server / Oracle)',
          'ลืมใส่วงเล็บครอบผลรวมตารางวาก่อนคูณ p.appraised_price_per_wah',
          'เชื่อม FK ผิดคอลัมน์ เช่น ON p.plot_id = u.user_id แทนที่จะใช้ p.owner_id = u.user_id'
        ],
        canRunInSandbox: true
      },
      {
        id: 'exam-05',
        order: 5,
        level: 'กลาง–สูง (LEFT JOIN + GROUP BY + HAVING)',
        title: 'ข้อ 5: LEFT JOIN + GROUP BY + HAVING สรุปจำนวนแปลงต่อสำนักงานตามเกณฑ์',
        promptText:
          'จงเขียนคำสั่ง SQL เพื่อสรุปรายงานข้อมูลสำนักงานที่ดินทุกแห่งจากตาราง land_offices แสดงคอลัมน์ o.office_id, o.office_name, o.province, จำนวนแปลงที่ดินในความรับผิดชอบ (plot_count) และราคาประเมินเฉลี่ยต่อตารางวาปัดเป็นจำนวนเต็ม (avg_price) โดยเชื่อมตารางแบบ LEFT JOIN กับ land_plots เพื่อรักษาชื่อสำนักงานไว้เป็นหลัก และคัดกรองแสดงเฉพาะสำนักงานที่มีจำนวนแปลงที่ดินตั้งแต่ 2 แปลงขึ้นไป พร้อมเรียงตามราคาประเมินเฉลี่ยจากมากไปน้อย',
        thinkingSteps: [
          '1) แกะโจทย์หาตาราง: ใช้ land_offices (o) เป็นตารางหลักฝั่งซ้าย และ LEFT JOIN land_plots (p) ON o.office_id = p.office_id',
          '2) หาฟังก์ชันสรุปผล: plot_count ใช้ COUNT(p.plot_id) (ไม่ใช้ COUNT(*) เพื่อความปลอดภัยกับ LEFT JOIN) และ avg_price ใช้ ROUND(AVG(p.appraised_price_per_wah), 0)',
          '3) จัดกลุ่มตามคอลัมน์ที่ไม่ใช่วงเล็บ Aggregate ให้ครบ: GROUP BY o.office_id, o.office_name, o.province',
          '4) กรองเฉพาะสำนักงานที่มีตั้งแต่ 2 แปลงขึ้นไป: เป็นเงื่อนไขหลังรวมกลุ่ม ต้องใช้ HAVING COUNT(p.plot_id) >= 2 (ห้ามใส่ใน WHERE!) แล้วปิดท้ายด้วย ORDER BY avg_price DESC;'
        ],
        solutionSql: [
          'SELECT',
          '  o.office_id,',
          '  o.office_name,',
          '  o.province,',
          '  COUNT(p.plot_id) AS plot_count,',
          '  ROUND(AVG(p.appraised_price_per_wah), 0) AS avg_price',
          'FROM land_offices o',
          'LEFT JOIN land_plots p ON o.office_id = p.office_id',
          'GROUP BY o.office_id, o.office_name, o.province',
          'HAVING COUNT(p.plot_id) >= 2',
          'ORDER BY avg_price DESC;'
        ].join('\n'),
        lineByLineExplanation: [
          'SELECT o.office_id, o.office_name, o.province, ...: เลือกคอลัมน์ระบุสำนักงานที่ดิน',
          'COUNT(p.plot_id) AS plot_count: นับเฉพาะแปลงที่ดินที่ไม่เป็น NULL',
          'ROUND(AVG(p.appraised_price_per_wah), 0) AS avg_price: หาค่าเฉลี่ยราคาประเมินและปัดเศษเป็นจำนวนเต็ม',
          'FROM land_offices o LEFT JOIN land_plots p ON o.office_id = p.office_id: ใช้ LEFT JOIN รักษาสำนักงานฝั่งซ้ายไว้เป็นหลัก',
          'GROUP BY o.office_id, o.office_name, o.province: ใส่คอลัมน์ปกติทั้งหมดจาก SELECT ลงใน GROUP BY ตามกฎเหล็ก',
          'HAVING COUNT(p.plot_id) >= 2: กรองกลุ่มหลังนับแล้วให้เหลือเฉพาะสำนักงานที่มีตั้งแต่ 2 แปลงขึ้นไป (ได้ 4 แห่ง: พระโขนง, ภูเก็ต, ชลบุรี, นนทบุรี)',
          'ORDER BY avg_price DESC;: เรียงลำดับตามราคาเฉลี่ยมากไปน้อย'
        ],
        commonMistakes: [
          'เอาเงื่อนไข COUNT(p.plot_id) >= 2 ไปใส่ใน WHERE (Error ทันที!)',
          'ลืมใส่ o.office_name และ o.province ใน GROUP BY (ใส่แค่ GROUP BY o.office_id ทำให้ผิดมาตรฐาน ANSI SQL)',
          'ใช้ COUNT(*) กับ LEFT JOIN แทน COUNT(p.plot_id)'
        ],
        canRunInSandbox: true
      },
      {
        id: 'exam-06',
        order: 6,
        level: 'สูง (Subquery)',
        title: 'ข้อ 6: Subquery หาแปลงที่ราคาประเมินสูงกว่าค่าเฉลี่ย (พร้อมเทียบส่วนต่างจากค่าเฉลี่ย)',
        promptText:
          'จงเขียนคำสั่ง SQL เพื่อค้นหาแปลงที่ดินที่มีราคาประเมินต่อตารางวา (appraised_price_per_wah) "สูงกว่าค่าเฉลี่ย" ของแปลงที่ดินทั้งหมดในตาราง land_plots โดยให้แสดงคอลัมน์ deed_no, deed_type, zone_type, appraised_price_per_wah และส่วนต่างที่สูงกว่าค่าเฉลี่ย (price_diff_from_avg ปัดเศษทศนิยม 2 ตำแหน่ง) เรียงลำดับจากราคาประเมินมากไปน้อย',
        thinkingSteps: [
          '1) แกะโจทย์: ต้องการเทียบค่าแต่ละแถวกับค่าเฉลี่ย AVG(appraised_price_per_wah) ทั้งตาราง -> เขียนใน WHERE ตรงๆ ไม่ได้ ต้องใช้ Scalar Subquery!',
          '2) สร้าง Subquery หาค่าเฉลี่ย: (SELECT AVG(appraised_price_per_wah) FROM land_plots)',
          '3) นำ Subquery ไปใช้ทั้งใน WHERE (appraised_price_per_wah > (SELECT ...)) และใช้คำนวณส่วนต่างใน SELECT: ROUND(appraised_price_per_wah - (SELECT AVG(appraised_price_per_wah) FROM land_plots), 2) AS price_diff_from_avg',
          '4) เรียงลำดับ ORDER BY appraised_price_per_wah DESC; และทบทวนความถูกต้องของวงเล็บเปิด-ปิดทุกคู่ (แถมเกร็ด: ถ้าโจทย์ถามหา "ผู้ใช้ที่ยังไม่เคยมีแปลงที่ดิน" ให้เปลี่ยน Subquery เป็น NOT EXISTS)'
        ],
        solutionSql: [
          'SELECT',
          '  deed_no,',
          '  deed_type,',
          '  zone_type,',
          '  appraised_price_per_wah,',
          '  ROUND(',
          '    appraised_price_per_wah - (SELECT AVG(appraised_price_per_wah) FROM land_plots),',
          '    2',
          '  ) AS price_diff_from_avg',
          'FROM land_plots',
          'WHERE appraised_price_per_wah > (',
          '  SELECT AVG(appraised_price_per_wah) FROM land_plots',
          ')',
          'ORDER BY appraised_price_per_wah DESC;'
        ].join('\n'),
        lineByLineExplanation: [
          'SELECT deed_no, deed_type, zone_type, appraised_price_per_wah: เลือกข้อมูลแปลงที่ดินตามโจทย์',
          'ROUND(appraised_price_per_wah - (SELECT AVG(...) FROM land_plots), 2) AS price_diff_from_avg: ใช้ Scalar Subquery ช่วยคำนวณส่วนต่างจากค่าเฉลี่ยทั้งระบบ (80,266.67)',
          'WHERE appraised_price_per_wah > (SELECT AVG(appraised_price_per_wah) FROM land_plots): กรองเอาเฉพาะแปลงที่แพงกว่าค่าเฉลี่ย (ได้ 5 แปลง)',
          'ORDER BY appraised_price_per_wah DESC;: เรียงลำดับจากแพงสุดลงมา',
          'หมายเหตุเสริม (โจทย์ Subquery อีกรูปแบบที่ออกคู่กัน): หากโจทย์ถามหา "ผู้ใช้ที่ยังไม่เคยมีแปลงที่ดิน" ให้เขียน SELECT user_id, full_name FROM users u WHERE NOT EXISTS (SELECT 1 FROM land_plots p WHERE p.owner_id = u.user_id);'
        ],
        commonMistakes: [
          'เขียน WHERE appraised_price_per_wah > AVG(appraised_price_per_wah) โดยไม่มี (SELECT ... FROM land_plots) ครอบ (Syntax Error)',
          'ลืมใส่วงเล็บครอบตัว Subquery หรือใส่วงเล็บเปิด-ปิดไม่ครบคู่',
          'ถ้าเขียนรูปแบบหาผู้ใช้ที่ไม่มีแปลงด้วย NOT IN (SELECT owner_id FROM land_plots) ต้องระวังหาก owner_id มี NULL (ควรใช้ NOT EXISTS ปลอดภัยกว่า)'
        ],
        canRunInSandbox: true
      }
    ]
  };
})(typeof window !== 'undefined' ? window : globalThis);
