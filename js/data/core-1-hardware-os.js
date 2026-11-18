(function (global) {
  'use strict';

  if (!global.GOV_PREP || typeof global.GOV_PREP.registerLesson !== 'function') {
    console.error('[CORE-01] GOV_PREP.registerLesson not found');
    return;
  }

  global.GOV_PREP.registerLesson({
    id: 'core-1-hardware-os',
    code: 'CORE-01',
    category: 'core',
    agencyId: null,
    order: 1,
    title: 'สถาปัตยกรรมคอมพิวเตอร์ ระบบปฏิบัติการ และคลาวด์',
    shortTitle: 'ฮาร์ดแวร์ OS & คลาวด์',
    subtitle: 'ปูพื้นตั้งแต่ศูนย์ให้เข้าใจว่าแต่ละอย่างคืออะไร: Hardware/Software/Firmware, CPU & Bus, RAM/ROM/SSD, ระบบปฏิบัติการ Process/Deadlock/chmod, Virtualization, Cloud, RAID และกลยุทธ์ Backup',
    estimatedMinutes: 18,
    icon: 'fa-solid fa-microchip',
    heroVisual: {
      image: 'assets/images/core-hardware-room.png',
      alt: 'ภาพประกอบเปรียบเทียบสถาปัตยกรรมคอมพิวเตอร์เป็นห้องทำงานช่างอัจฉริยะ มีโต๊ะทำงาน RAM ตู้เอกสาร Storage และแผงวงจร CPU',
      caption: 'ภาพจำลอง "ห้องทำงานช่าง": เปรียบเทียบ CPU, Cache, RAM, ROM และ Storage ให้เห็นความเชื่อมโยงภายในเสี้ยววินาที',
      aspectRatio: '16 / 9',
      width: 1200,
      height: 675,
      prompt: 'Clean flat isometric vector illustration in Cadastral GIS & Tech Studio palette (emerald #0F5E4D, warm amber #D97706, cream white #F4F7F6). A modern computer architecture metaphor shown as an engineer workshop room: a glowing emerald central processor desk (CPU), fast sticky notes on desk (Cache), a wide clean workbench (RAM), a wall-mounted startup manual frame (ROM/BIOS), and tall labeled filing cabinets (SSD/HDD Storage) connected by glowing circuit pathways. Minimal Thai-friendly tech aesthetic, crisp lines, no text clutter.'
    },
    summaryTakeaways: [
      'Hardware คือชิ้นส่วนจับต้องได้, Software คือชุดคำสั่งบน OS, Firmware คือโปรแกรมเล็กๆ ที่ฝังถาวรบนชิปเพื่อปลุกฮาร์ดแวร์ตอนเปิดเครื่อง',
      'ลำดับความเร็วหน่วยความจำจากเร็วสุดไปช้าสุด: Registers > L1/L2/L3 Cache (SRAM) > RAM (DRAM) > NVMe SSD > SATA SSD > HDD',
      'RAM เป็นแบบ Volatile (ไฟดับข้อมูลหาย) ส่วน ROM เก็บ BIOS/UEFI ทำ POST ตรวจอุปกรณ์ก่อนส่งไม้ต่อให้ Bootloader โหลด OS เข้า RAM',
      'ระบบปฏิบัติการจัดการ Process/Thread, จัดคิว CPU (FCFS/SJF/Round Robin), ป้องกัน Deadlock (4 เงื่อนไข), จัดการ Virtual Memory และสิทธิ์ไฟล์ (chmod r=4, w=2, x=1)',
      'Hypervisor Type 1 รันบนฮาร์ดแวร์ตรง (เช่น ESXi), Container (Docker) แชร์ Kernel จึงเบากว่า VM, และ Cloud แบ่งเป็น IaaS > PaaS > SaaS ตามสิ่งที่ผู้ให้บริการดูแล',
      'RAID 1 (Mirror) ทนเสีย 1 ลูก, RAID 5 (Parity ขั้นต่ำ 3 ลูก) ทนเสีย 1 ลูก; Differential Backup กู้คืนด้วย Full ล่าสุด + Diff ล่าสุดเพียง 2 ชุด'
    ],
    sections: [
      {
        id: 'hardware-anatomy',
        title: '1. โครงสร้างฮาร์ดแวร์และลำดับชั้นความจำ (Memory Hierarchy)',
        analogyBox: {
          title: 'เปรียบเทียบให้เห็นภาพ: ห้องทำงานของช่างวิศวกร',
          body: 'ลองนึกภาพคอมพิวเตอร์ 1 เครื่องเหมือน <strong>"ห้องทำงานของช่างคนเก่ง"</strong> ตั้งแต่เปิดไฟเข้าห้องจนลงมือทำงาน:<br>• <strong>Hardware</strong> คือโต๊ะ เก้าอี้ ปากกา และเครื่องคิดเลขที่จับต้องได้จริง ส่วน <strong>Software</strong> คือคู่มือขั้นตอนการทำงานและโปรแกรมต่างๆ<br>• <strong>CPU</strong> คือ "ตัวช่าง" ที่คิดคำนวณและลงมือทำงานทุกอย่าง (ยิ่งมีหลาย <em>Core</em> ก็เหมือนมีช่างหลายคนช่วยกันทำในห้องเดียวกัน)<br>• <strong>Registers &amp; Cache</strong> คือ "กระดาษโน้ตในมือและมุมโต๊ะช่าง" หยิบดูได้ในเสี้ยววินาที แต่จดได้น้อยมาก<br>• <strong>RAM</strong> คือ "หน้าโต๊ะทำงาน" ยิ่งโต๊ะกว้าง (RAM เยอะ) ช่างยิ่งวางแฟ้มเปิดทำงานหลายโปรแกรมพร้อมกันได้ลื่น แต่พอปิดไฟกลับบ้าน (Shutdown) แม่บ้านจะเก็บของบนโต๊ะออกหมด (<em>Volatile</em>)<br>• <strong>ROM (BIOS/UEFI)</strong> คือ "ป้ายคู่มือเปิดร้านที่ตอกติดถาวรบนผนัง" ไฟดับก็ไม่หาย เปิดเครื่องเมื่อไหร่ช่างต้องอ่านคู่มือนี้ตรวจโต๊ะตรวจไฟ (<em>POST</em>) ก่อนเสมอ<br>• <strong>Storage (SSD / HDD)</strong> คือ "ตู้เก็บแฟ้มเอกสารขนาดใหญ่" เก็บข้อมูลได้มหาศาลแม้ไฟดับ (<em>Non-Volatile</em>) แต่ช่างต้องเดินไปหยิบแฟ้มมาวางบนโต๊ะ RAM ก่อนจึงจะเปิดแก้ไขได้'
        },
        bodyHtml: `
<p>สำหรับคนที่ลืมพื้นฐานไปแล้วหรือกำลังเริ่มปูพื้นใหม่ ข้อสอบวิชาการคอมพิวเตอร์มักถามตั้งแต่คำศัพท์พื้นฐานอย่าง <strong>Hardware / Software / Firmware</strong> สถาปัตยกรรมเครื่อง ไปจนถึงความแตกต่างของหน่วยความจำแต่ละชั้น เรามาไล่ทำความเข้าใจทีละคำว่า <strong>"มันคืออะไร และทำงานด้วยกันอย่างไร"</strong> แบบไม่ข้ามขั้นตอนครับ</p>

<h3>1.1 ปูพื้นจากศูนย์: Hardware, Software และ Firmware คืออะไร?</h3>
<ul>
  <li><strong>Hardware (ฮาร์ดแวร์):</strong> ชิ้นส่วนกายภาพของคอมพิวเตอร์ที่มองเห็นและจับต้องได้จริง เช่น ซีพียู (CPU), แรม (RAM), เมนบอร์ด, ฮาร์ดดิสก์, จอภาพ, เมาส์, คีย์บอร์ด หรือเครื่องสแกนบาร์โค้ด</li>
  <li><strong>Software (ซอฟต์แวร์):</strong> ชุดคำสั่งหรือโปรแกรมที่สั่งให้ฮาร์ดแวร์ทำงานตามต้องการ (จับต้องไม่ได้) แบ่งเป็น 2 กลุ่มใหญ่ คือ <em>System Software</em> (เช่น Windows, Linux, Device Driver) และ <em>Application Software</em> (เช่น Word, Chrome, ระบบสารบรรณ, LandsMaps)</li>
  <li><strong>Firmware (เฟิร์มแวร์):</strong> โปรแกรมขนาดเล็กที่เป็น <strong>"กึ่งกลางระหว่าง Hardware กับ Software"</strong> โดยถูกเขียนฝังถาวรลงบนชิปหน่วยความจำ (ROM/Flash) ของตัวอุปกรณ์นั้นๆ เพื่อสอนให้อุปกรณ์รู้จักวิธีเริ่มต้นทำงาน เช่น <strong>BIOS/UEFI</strong> บนเมนบอร์ด, เฟิร์มแวร์ของเราเตอร์ Wi-Fi หรือเฟิร์มแวร์ของเครื่องพิมพ์</li>
</ul>

<h3>1.2 สถาปัตยกรรม Von Neumann (วอน นอยมันน์) คืออะไร?</h3>
<p>คอมพิวเตอร์สมัยใหม่แทบทั้งหมดสร้างตามแนวคิดของ <strong>John von Neumann</strong> ที่เรียกว่า <strong>Stored-Program Concept</strong> (แนวคิดเก็บโปรแกรมไว้ในความจำ) — หมายความว่า ก่อนคอมพิวเตอร์จะทำงานได้ <strong>ทั้ง "ตัวโปรแกรม (คำสั่ง)" และ "ข้อมูลที่จะนำมาคำนวณ" ต้องถูกโหลดมาวางอยู่ในหน่วยความจำหลัก (RAM) เดียวกันก่อน</strong> แล้ว CPU จึงค่อยๆ ดึงคำสั่งออกมาทำทีละบรรทัด โดยแบ่งองค์ประกอบเครื่องออกเป็น 4 ส่วนหลัก คือ <strong>Input Unit</strong> (รับเข้า) → <strong>CPU</strong> (หน่วยประมวลผลกลาง: CU + ALU) ↔ <strong>Memory Unit</strong> (หน่วยความจำหลัก) → <strong>Output Unit</strong> (แสดงผล)</p>

<h3>1.3 CPU คืออะไร? ทำความเข้าใจ GHz, Core และ Thread</h3>
<p><strong>CPU (Central Processing Unit)</strong> คือสมองหลักของคอมพิวเตอร์ที่คอยคำนวณและตัดสินใจตามคำสั่งโปรแกรม เวลาซื้อเครื่องหรือทำข้อสอบสเปกเครื่อง เรามักเจอ 3 คำนี้:</p>
<ul>
  <li><strong>Clock Speed (ความเร็วสัญญาณนาฬิกา — หน่วย Hz / GHz):</strong> คือ "จังหวะเคาะกลอง" ที่คอยบอกให้วงจรภายใน CPU ทำงานพร้อมกันเป็นรอบๆ คำว่า <code>1 Hz</code> แปลว่า 1 รอบต่อวินาที ดังนั้น CPU ความเร็ว <code>3.5 GHz</code> แปลว่าสัญญาณนาฬิกาเต้น <strong>3,500 ล้านรอบต่อวินาที</strong> ยิ่ง GHz สูง ก็ยิ่งเดินจังหวะคำสั่งได้เร็วขึ้น</li>
  <li><strong>Core (คอร์ / แกนประมวลผล):</strong> คือ "หน่วยสมองจริง" ที่บรรจุชุด CU + ALU + Registers แยกเป็นอิสระอยู่ภายในชิป CPU ตัวเดียว เช่น <strong>4-Core CPU</strong> เปรียบเสมือนมีช่าง 4 คนนั่งอยู่ในชิปเดียวกัน สามารถรันงาน 4 งานพร้อมกันได้จริงๆ (True Parallelism)</li>
  <li><strong>Thread (เธรด — สายงานเสมือน):</strong> คือ "คิวงาน" ที่ CPU 1 Core รับผิดชอบได้ในหนึ่งช่วงเวลา เทคโนโลยีอย่าง <em>Hyper-Threading / SMT</em> ทำให้ <strong>1 Core แบ่งรับได้ 2 Threads</strong> (เช่น CPU 4 Cores / 8 Threads) เปรียบเหมือนช่าง 1 คนที่มี 2 มือ พออ่านคำสั่งงานแรกแล้วต้องหยุดรอข้อมูลจาก RAM มืออีกข้างก็สลับไปทำอีกคิวทันที ทำให้ไม่เสียเวลาว่าง</li>
</ul>

<h3>1.4 ส่วนประกอบภายใน CPU, System Bus และวงจร Fetch → Decode → Execute</h3>
<p>เมื่อเปิดเข้าไปดูข้างใน CPU 1 Core จะพบ 3 ส่วนสำคัญที่ทำงานประสานกับเส้นทางลำเลียงข้อมูลที่เรียกว่า <strong>System Bus</strong>:</p>
<ul>
  <li><strong>CU (Control Unit — หน่วยควบคุม):</strong> ทำหน้าที่เป็น "หัวหน้างาน" ไม่ได้คำนวณเอง แต่คอยดึงคำสั่ง ตีความคำสั่ง แล้วส่งสัญญาณควบคุมว่าจังหวะนี้ต้องสั่ง ALU บวกเลข หรือสั่ง RAM ส่งข้อมูลมา</li>
  <li><strong>ALU (Arithmetic Logic Unit — หน่วยคำนวณและตรรกะ):</strong> ทำหน้าที่คิดคำนวณเลข (+, -, ×, ÷) และเปรียบเทียบทางตรรกะ (เช่น มากกว่า, น้อยกว่า, เท่ากับ, AND, OR, NOT)</li>
  <li><strong>Registers (รีจิสเตอร์):</strong> ช่องความจำขนาดจิ๋วที่ฝังอยู่<strong>ในเนื้อ CPU เอง</strong> เร็วที่สุดในคอมพิวเตอร์ เก็บค่าที่กำลังทำอยู่ ณ วินาทีนั้น เช่น <code>PC (Program Counter)</code> จำว่าบรรทัดคำสั่งถัดไปอยู่ที่ช่องไหน และ <code>IR (Instruction Register)</code> เก็บคำสั่งที่เพิ่งดึงเข้ามา</li>
  <li><strong>System Bus (เส้นทางสายไฟบนเมนบอร์ดที่เชื่อม CPU กับ RAM และอุปกรณ์อื่น):</strong> แบ่งเป็น 3 เส้นทางจำให้แม่น:
    <ol>
      <li><strong>Address Bus (ทิศทางเดียวจาก CPU เท่านั้น):</strong> ใช้ส่ง "เลขที่อยู่ช่องความจำ (Memory Address)" เพื่อชี้เป้าว่า CPU อยากอ่านหรือเขียนที่ช่องไหนใน RAM (เช่น ช่อง <code>#104</code>)</li>
      <li><strong>Control Bus (สองทิศทาง):</strong> ใช้ส่งสัญญาณควบคุมสั่งการ เช่น สัญญาณ <code>READ</code> (ขออ่าน), <code>WRITE</code> (ขอเขียน) หรือสัญญาณขัดจังหวะ <code>Interrupt</code></li>
      <li><strong>Data Bus (สองทิศทาง):</strong> ใช้ขนส่ง "ตัวข้อมูลจริงหรือรหัสคำสั่งจริง" วิ่งไปมาระหว่าง CPU, RAM และ I/O</li>
    </ol>
  </li>
</ul>

<h4>ตัวอย่างจริง 1 รอบ: CPU อ่านข้อมูลจาก RAM และทำงานวงจร Fetch → Decode → Execute</h4>
<p>สมมติใน RAM ช่องที่ <code>#104</code> เก็บคำสั่งให้บวกเลข <code>5 + 3</code> มาดูว่าเกิดอะไรขึ้นทีละก้าวครับ:</p>
<ol>
  <li><strong>ขั้นที่ 1 — Fetch (ดึงคำสั่งจาก RAM):</strong> หน่วยควบคุม (CU) ดูเลขช่องถัดไปจากรีจิสเตอร์ <code>PC</code> ได้เลข <code>#104</code> → CU ส่งเลข <code>104</code> ออกไปทาง <strong>Address Bus</strong> และส่งคำสั่ง <code>READ</code> ออกไปทาง <strong>Control Bus</strong> → แผง RAM เปิดช่อง <code>#104</code> แล้วส่งรหัสคำสั่งวิ่งกลับมาทาง <strong>Data Bus</strong> เข้ามาเก็บในรีจิสเตอร์ <code>IR</code> ของ CPU</li>
  <li><strong>ขั้นที่ 2 — Decode (ตีความคำสั่ง):</strong> CU ถอดรหัสเลขฐานสองใน <code>IR</code> จนเข้าใจว่าคำสั่งนี้สั่งให้ "นำค่า <code>5</code> กับ <code>3</code> มาบวกกัน"</li>
  <li><strong>ขั้นที่ 3 — Execute (ลงมือประมวลผล):</strong> CU ส่งเลข <code>5</code> และ <code>3</code> เข้าไปที่ <strong>ALU</strong> เพื่อบวกกัน ได้ผลลัพธ์ <code>8</code> แล้วนำไปเก็บพักไว้ใน Register (หรือเขียนกลับลง RAM หากคำสั่งบอกให้บันทึก) จากนั้น CPU ก็วนกลับไปทำคำสั่งถัดไปในเสี้ยวนาโนวินาที!</li>
</ol>

<h3>1.5 ความจำชั่วคราว vs ถาวร และเจาะลึก Cache / SRAM vs DRAM</h3>
<p>คำถามยอดฮิตในห้องสอบคือเรื่อง <strong>Volatility (การคงอยู่ของข้อมูลเมื่อไฟดับ)</strong> และความแตกต่างระหว่างหน่วยความจำแบบ <strong>SRAM</strong> กับ <strong>DRAM</strong>:</p>
<ul>
  <li><strong>Volatile Memory (หน่วยความจำชั่วคราว):</strong> ต้องมีกระแสไฟฟ้าเลี้ยงตลอดเวลา <strong>ถ้าปิดเครื่องหรือไฟดับ ข้อมูลจะหายเกลี้ยงทันที</strong> ได้แก่ Registers, Cache (L1/L2/L3) และ RAM</li>
  <li><strong>Non-Volatile Memory (หน่วยความจำถาวร):</strong> <strong>แม้ไฟดับหรือถอดปลั๊ก ข้อมูลก็ยังอยู่ครบ</strong> ได้แก่ ROM / Flash BIOS-UEFI, SSD, HDD และ Flash Drive</li>
</ul>

<h4>ทำไมต้องมี L1 / L2 / L3 Cache? และ SRAM ต่างจาก DRAM อย่างไร?</h4>
<p>ปัญหาคือ CPU คิดเลขเร็วมาก แต่ RAM ตอบสนองช้ากว่า CPU หลายสิบเท่า ถ้าให้ CPU รอ RAM ทุกครั้งเครื่องจะอืดมาก จึงต้องสร้างหน่วยพักความเร็วสูงระหว่าง CPU กับ RAM ที่เรียกว่า <strong>Cache Memory</strong>:</p>
<ul>
  <li><strong>SRAM (Static RAM — ใช้ทำ L1, L2, L3 Cache):</strong> สร้างจากวงจรทรานซิสเตอร์ 6 ตัวต่อ 1 บิต (Flip-Flop) เก็บค่า 0/1 ได้นิ่งสนิทตราบที่มีไฟเลี้ยง <strong>ไม่ต้องคอยชาร์จประจุซ้ำ (No Refresh)</strong> จึงตอบสนองเร็วระดับเสี้ยวนาโนวินาที แต่โครงสร้างใหญ่ กินพื้นที่ซิลิคอนและ<strong>ราคาแพงมาก</strong> จึงใส่ได้แค่หลัก KB ถึงสิบ MB:
    <ul>
      <li><strong>L1 Cache:</strong> เล็กที่สุด (หลักสิบ KB) แต่<strong>เร็วที่สุด</strong> ฝังติดอยู่เฉพาะตัวในแต่ละ Core</li>
      <li><strong>L2 Cache:</strong> ใหญ่กว่า L1 (หลักร้อย KB – ไม่กี่ MB) เร็วรองลงมา มักประจำอยู่เฉพาะ Core</li>
      <li><strong>L3 Cache:</strong> ใหญ่ที่สุด (หลักหลาย MB – สิบ MB) ช้ากว่า L1/L2 เล็กน้อย และ<strong>แชร์ใช้ร่วมกันทุก Core</strong> ในชิป CPU</li>
    </ul>
  </li>
  <li><strong>DRAM (Dynamic RAM — ใช้ทำ RAM หลัก เช่น DDR4 / DDR5):</strong> สร้างจากทรานซิสเตอร์ 1 ตัว + ตัวเก็บประจุ (<strong>Capacitor</strong>) 1 ตัวต่อ 1 บิต จึงอัดความจุได้มหาศาล (8–128+ GB) และ<strong>ราคาถูกกว่า SRAM มาก</strong> แต่ข้อเสียคือ Capacitor เหมือนถังน้ำที่มีรูรั่ว ประจุไฟจะค่อยๆ รั่วไหลหายไปภายในไม่กี่มิลลิวินาที วงจรจึงต้องคอยวิ่งเติมไฟซ้ำตลอดเวลา เรียกว่าการ <strong>Refresh</strong> ทำให้ช้ากว่า SRAM</li>
</ul>

<h3>1.6 ROM, BIOS/UEFI, POST, Bootloader: Timeline ตั้งแต่กดปุ่ม Power จนถึงหน้า Login</h3>
<p>เมื่อเรากดปุ่มเปิดเครื่องคอมพิวเตอร์ ขณะนั้นใน RAM ยังว่างเปล่าไม่มี Windows หรือ Linux อยู่เลย แล้วเครื่องรู้ได้อย่างไรว่าจะไปเปิดระบบปฏิบัติการตรงไหน? คำตอบอยู่ที่ 4 ตัวละครนี้ครับ:</p>
<ul>
  <li><strong>ROM (Read-Only Memory):</strong> ชิปหน่วยความจำถาวรบนเมนบอร์ดที่ไฟดับข้อมูลไม่หาย (ปัจจุบันใช้ชิป Flash ROM ที่อัปเดตเวอร์ชันได้)</li>
  <li><strong>BIOS / UEFI:</strong> เฟิร์มแวร์ที่เก็บอยู่ในชิป ROM โดย <strong>BIOS</strong> เป็นรุ่นเก่า (หน้าจอข้อความ 16-bit ใช้คีย์บอร์ด รองรับดิสก์ใหญ่สุด 2 TB) ส่วน <strong>UEFI</strong> เป็นรุ่นใหม่มาตรฐานปัจจุบัน (รองรับเมาส์, สถาปัตยกรรม 64-bit, บูตดิสก์แบบ GPT ขนาดเกิน 2 TB และมีระบบความปลอดภัย <em>Secure Boot</em> ป้องกันไวรัสฝังตัวก่อน OS โหลด)</li>
  <li><strong>POST (Power-On Self-Test):</strong> ขั้นตอนที่ BIOS/UEFI ทดสอบเช็กสุขภาพอุปกรณ์พื้นฐานทันทีหลังเปิดไฟ เช่น มี RAM เสียบอยู่ไหม การ์ดจอตอบสนองไหม คีย์บอร์ดมีปัญหาไหม (ถ้า RAM หลวมหรือพังจะร้องเสียง <em>Beep Code</em> เตือนและจอไม่ติด)</li>
  <li><strong>Bootloader:</strong> โปรแกรมตัวเล็กๆ ที่เก็บอยู่บนหัวดิสก์ (เช่น <em>Windows Boot Manager</em> หรือ <em>GRUB</em> ใน Linux) ทำหน้าที่เป็นสะพานโหลดตัวระบบปฏิบัติการจาก SSD/HDD เข้าไปวางใน RAM</li>
</ul>
<div class="callout callout-info">
  <strong><i class="fa-solid fa-power-off" aria-hidden="true"></i> Timeline 5 วินาทีแรกหลังกดปุ่ม Power:</strong>
  <ol style="margin-bottom:0;">
    <li>กดปุ่ม <strong>Power</strong> → แหล่งจ่ายไฟ (PSU) ส่งไฟเลี้ยงคงที่ให้เมนบอร์ดและ CPU</li>
    <li>CPU ตื่นขึ้นมาแล้ววิ่งไปอ่านคำสั่งแรกจากชิป <strong>ROM (BIOS/UEFI)</strong></li>
    <li>BIOS/UEFI รัน <strong>POST</strong> ตรวจเช็ก CPU, RAM, การ์ดจอ และอุปกรณ์ต่อพ่วง</li>
    <li>POST ผ่าน → BIOS/UEFI ค้นหาไดรฟ์บูตแล้วเรียกโปรแกรม <strong>Bootloader</strong></li>
    <li>Bootloader อ่านไฟล์ <strong>OS Kernel</strong> จาก SSD/HDD โหลดเข้าสู่ <strong>RAM</strong> → ระบบปฏิบัติการเริ่มทำงานจนโชว์หน้า Login!</li>
  </ol>
</div>

<h3>1.7 สื่อเก็บข้อมูลถาวร (Storage): HDD vs SATA SSD vs NVMe SSD คืออะไร?</h3>
<ul>
  <li><strong>HDD (Hard Disk Drive):</strong> ฮาร์ดดิสก์จานหมุน ใช้แผ่นจานเคลือบสารแม่เหล็กหมุนด้วยความเร็วสูง (เช่น <strong>5,400 หรือ 7,200 RPM</strong> รอบต่อนาที) และมีหัวอ่านเชิงกลขยับไปมาเพื่ออ่านเขียนข้อมูล จุดเด่นคือ<strong>ราคาต่อความจุถูกที่สุด</strong> (เหมาะเก็บข้อมูล Archive หรือ Backup ขนาดใหญ่) แต่จุดอ่อนคือ<strong>ช้า</strong>และหากตกกระแทกขณะจานหมุนหัวอ่านอาจขูดแผ่นพังได้</li>
  <li><strong>SSD (Solid State Drive):</strong> ไดรฟ์บันทึกข้อมูลที่ใช้<strong>ชิปหน่วยความจำแฟลช (NAND Flash)</strong> ไม่มีชิ้นส่วนขยับหมุน จึงเงียบ กินไฟน้อย ทนแรงกระแทก และอ่านเขียนเร็วกว่า HDD หลายเท่า แบ่งตามช่องทางเชื่อมต่อ 2 แบบหลัก:
    <ul>
      <li><strong>SATA SSD:</strong> รูปทรง 2.5 นิ้ว (หรือ M.2 SATA) ส่งข้อมูลผ่านพอร์ตสาย SATA เดิม ทำให้ความเร็วถูกบีบคอขวดอยู่ที่ประมาณ <strong>500–600 MB/s</strong></li>
      <li><strong>NVMe SSD (M.2 PCIe):</strong> รูปทรงการ์ดเล็กๆ เสียบตรงบนเมนบอร์ดและส่งข้อมูลผ่านทางด่วน <strong>PCIe</strong> ตรงเข้าใกล้ CPU ไม่ต้องผ่านคอขวด SATA จึงทำความเร็วได้สูงถึง <strong>3,000–7,000+ MB/s</strong></li>
    </ul>
  </li>
</ul>

<h3>1.8 ตารางสรุปลำดับชั้นหน่วยความจำและอุปกรณ์จัดเก็บข้อมูล</h3>
<div class="table-wrap">
  <table>
    <caption>ตารางเปรียบเทียบหน่วยความจำและอุปกรณ์จัดเก็บข้อมูลในคอมพิวเตอร์</caption>
    <thead>
      <tr>
        <th scope="col">ประเภท</th>
        <th scope="col">ไฟดับ (Volatility)</th>
        <th scope="col">ความเร็ว / ความจุ</th>
        <th scope="col">บทบาทสำคัญ &amp; จุดออกสอบ</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th scope="row">Registers</th>
        <td>Volatile (ข้อมูลหาย)</td>
        <td>เร็วที่สุด (Sub-nanosecond) / หลักไบต์</td>
        <td>อยู่ใน CPU เก็บค่าและคำสั่งที่กำลังประมวลผล เช่น <code>PC</code>, <code>IR</code></td>
      </tr>
      <tr>
        <th scope="row">Cache (L1–L3)</th>
        <td>Volatile (ข้อมูลหาย)</td>
        <td>เร็วมาก (ใช้ <strong>SRAM</strong>) / KB–สิบ MB</td>
        <td>พักข้อมูลใช้บ่อยลดคอขวดระหว่าง CPU กับ RAM (L1 เล็ก/เร็วสุด, L3 แชร์ทุก Core)</td>
      </tr>
      <tr>
        <th scope="row">RAM</th>
        <td>Volatile (ข้อมูลหาย)</td>
        <td>เร็ว (ใช้ <strong>DRAM</strong>) / 8–128+ GB</td>
        <td>โหลด OS และโปรแกรมที่กำลังรันอยู่ ต้อง Refresh ประจุไฟใน Capacitor ตลอดเวลา</td>
      </tr>
      <tr>
        <th scope="row">ROM (BIOS/UEFI)</th>
        <td>Non-Volatile (ไม่หาย)</td>
        <td>อ่านเป็นหลัก / ไม่กี่ MB</td>
        <td>เก็บเฟิร์มแวร์เปิดเครื่อง ทำการตรวจฮาร์ดแวร์ <strong>POST</strong> ก่อนเรียก Bootloader</td>
      </tr>
      <tr>
        <th scope="row">NVMe SSD</th>
        <td>Non-Volatile (ไม่หาย)</td>
        <td>เร็วสูงมาก (3,000–7,000+ MB/s)</td>
        <td>ชิป NAND Flash เชื่อมต่อตรงผ่านเลน <strong>PCIe</strong> ไม่มีจานหมุน</td>
      </tr>
      <tr>
        <th scope="row">SATA SSD</th>
        <td>Non-Volatile (ไม่หาย)</td>
        <td>เร็วปานกลาง (500–600 MB/s)</td>
        <td>ชิป NAND Flash แต่จำกัดความเร็วตามพอร์ต SATA III</td>
      </tr>
      <tr>
        <th scope="row">HDD</th>
        <td>Non-Volatile (ไม่หาย)</td>
        <td>ช้าสุด (80–160 MB/s) / ถูกสุดต่อ GB</td>
        <td>จานแม่เหล็กหมุน 5,400–7,200 RPM เหมาะเก็บไฟล์ใหญ่หรือ Backup ระยะยาว</td>
      </tr>
    </tbody>
  </table>
</div>

<div class="callout callout-tip">
  <strong><i class="fa-solid fa-lightbulb" aria-hidden="true"></i> ทริกจำก่อนเข้าห้องสอบ:</strong>
  ถ้าข้อสอบถามว่า <em>"SRAM กับ DRAM ต่างกันอย่างไร?"</em> จำง่ายๆ ว่า <strong>S = Static (ทำ Cache, เร็ว, แพง, ไม่ต้อง Refresh)</strong> ส่วน <strong>D = Dynamic (ทำ RAM หลัก, ช้ากว่า, ถูกกว่า, ต้อง Refresh ประจุตลอด)</strong> และหากถามลำดับความเร็วคำตอบอันดับ 1 เสมอคือ <strong>Registers</strong> (หรือ L1 Cache หากไม่มี Registers ในตัวเลือก) ครับ
</div>`,
        visualCard: {
          type: 'svg',
          caption: 'พีระมิดลำดับชั้นความจำ (Memory Hierarchy): ยิ่งอยู่ยอดบน ยิ่งเร็วและราคาต่อบิตยิ่งแพง แต่ความจุยิ่งน้อย',
          svgHtml: `<svg role="img" viewBox="0 0 760 360" width="100%" xmlns="http://www.w3.org/2000/svg" aria-labelledby="svg-mem-title">
  <title id="svg-mem-title">แผนภาพพีระมิดลำดับชั้นหน่วยความจำคอมพิวเตอร์</title>
  <rect x="0" y="0" width="760" height="360" rx="14" fill="#F4F7F6" stroke="#D5E1DD" stroke-width="2"/>
  <text x="380" y="34" text-anchor="middle" font-family="Prompt, Sarabun, sans-serif" font-size="18" font-weight="700" fill="#0F5E4D">Memory Hierarchy (ลำดับชั้นความจำ)</text>

  <!-- Pyramid tiers -->
  <polygon points="380,58 310,108 450,108" fill="#0F5E4D" stroke="#FFFFFF" stroke-width="2"/>
  <text x="380" y="95" text-anchor="middle" font-family="Sarabun, sans-serif" font-size="13" font-weight="700" fill="#FFFFFF">Registers</text>

  <polygon points="310,108 450,108 495,158 265,158" fill="#177863" stroke="#FFFFFF" stroke-width="2"/>
  <text x="380" y="138" text-anchor="middle" font-family="Sarabun, sans-serif" font-size="14" font-weight="700" fill="#FFFFFF">L1 / L2 / L3 Cache (SRAM)</text>

  <polygon points="265,158 495,158 545,212 215,212" fill="#21967D" stroke="#FFFFFF" stroke-width="2"/>
  <text x="380" y="190" text-anchor="middle" font-family="Sarabun, sans-serif" font-size="15" font-weight="700" fill="#FFFFFF">Main Memory: RAM (DRAM)</text>

  <polygon points="215,212 545,212 595,268 165,268" fill="#D97706" stroke="#FFFFFF" stroke-width="2"/>
  <text x="380" y="245" text-anchor="middle" font-family="Sarabun, sans-serif" font-size="15" font-weight="700" fill="#FFFFFF">NVMe / SATA SSD (Solid State)</text>

  <polygon points="165,268 595,268 645,324 115,324" fill="#334E58" stroke="#FFFFFF" stroke-width="2"/>
  <text x="380" y="301" text-anchor="middle" font-family="Sarabun, sans-serif" font-size="15" font-weight="700" fill="#FFFFFF">HDD / Magnetic Tape / Cloud Archive</text>

  <!-- Left Arrow: Speed & Cost -->
  <line x1="72" y1="318" x2="72" y2="70" stroke="#0F5E4D" stroke-width="3"/>
  <polygon points="72,58 64,74 80,74" fill="#0F5E4D"/>
  <text x="72" y="340" text-anchor="middle" font-family="Sarabun, sans-serif" font-size="12" font-weight="700" fill="#122026">เร็วขึ้น &amp; แพงขึ้น</text>

  <!-- Right Arrow: Capacity -->
  <line x1="688" y1="70" x2="688" y2="318" stroke="#D97706" stroke-width="3"/>
  <polygon points="688,330 680,314 696,314" fill="#D97706"/>
  <text x="688" y="346" text-anchor="middle" font-family="Sarabun, sans-serif" font-size="12" font-weight="700" fill="#122026">ความจุมากขึ้น</text>
</svg>`
        }
      },
      {
        id: 'operating-system',
        title: '2. ระบบปฏิบัติการ (OS): การจัดการ Process, Memory และ Windows vs Linux',
        analogyBox: {
          title: 'เปรียบเทียบให้เห็นภาพ: ผู้จัดการสำนักงานที่ดิน + ร้านอาหาร',
          body: '• <strong>ระบบปฏิบัติการ (OS)</strong> คือ <strong>"ผู้จัดการสำนักงาน"</strong> ที่คอยรับคำสั่งจากผู้ใช้ แล้วจัดคิวให้โปรแกรมต่างๆ ใช้ CPU อย่างยุติธรรม แบ่งโต๊ะ RAM ไม่ให้โปรแกรมเขียนทับกัน และตรวจบัตรอนุญาต (Permission) ก่อนเปิดตู้เอกสาร<br>• <strong>Device Driver</strong> คือ <strong>"ล่ามแปลภาษา"</strong> ประจำเครื่องพิมพ์หรือสแกนเนอร์แต่ละรุ่น เพื่อให้ผู้จัดการพูดคำสั่งกลางแล้วอุปกรณ์ทุกยี่ห้อเข้าใจ<br>• <strong>Process vs Thread:</strong> ลองนึกว่า <strong>Process</strong> คือ <strong>"ร้านอาหาร 1 ร้าน"</strong> (มีห้องครัวและเงินทุน RAM แยกเป็นสัดส่วน ไม่ยุ่งกับร้านอื่น) ส่วน <strong>Thread</strong> คือ <strong>"พ่อครัวหลายคนที่ทำงานในครัวเดียวกัน"</strong> (ช่วยกันผัด หั่น ต้ม และหยิบใช้วัตถุดิบในตู้เย็น RAM ของร้านเดียวกันได้เลย!)'
        },
        bodyHtml: `
<h3>2.1 ระบบปฏิบัติการ (OS) คืออะไร? ถ้าคอมพิวเตอร์ไม่มี OS จะเกิดอะไรขึ้น?</h3>
<p><strong>ระบบปฏิบัติการ (Operating System: OS)</strong> คือซอฟต์แวร์ระบบพื้นฐานที่ทำหน้าที่เป็น <strong>"ตัวกลางระหว่างผู้ใช้/แอปพลิเคชัน กับฮาร์ดแวร์คอมพิวเตอร์"</strong> (เช่น Windows, Linux, macOS, Android, iOS) ลองจินตนาการว่า<strong>ถ้าคอมพิวเตอร์ไม่มี OS</strong>: ทุกโปรแกรมที่เราเขียนขึ้นมาจะต้องเขียนโค้ดสั่งงานฮาร์ดแวร์เองตั้งแต่ศูนย์ เช่น สั่งให้หัวอ่านดิสก์หมุนไปจุดไหน สั่งให้การ์ดจอวาดพิกเซลทีละจุด ซึ่งทำได้ยากมาก แถมเปิดสองโปรแกรมพร้อมกันไม่ได้เพราะจะแย่ง RAM กันจนเครื่องพังทันทีครับ!</p>

<h3>2.2 Kernel, Device Driver และ Kernel Mode vs User Mode คืออะไร?</h3>
<ul>
  <li><strong>Kernel (เคอร์เนล):</strong> คือ <strong>"แกนกลางหัวใจของ OS"</strong> ที่ทำงานอยู่เบื้องหลังตลอดเวลา มีหน้าที่คุยกับ CPU, RAM และอุปกรณ์ฮาร์ดแวร์โดยตรง</li>
  <li><strong>Device Driver (ไดรเวอร์):</strong> คือโปรแกรมขนาดเล็กที่ทำหน้าที่เป็น <strong>"ล่ามแปลภาษา"</strong> ระหว่าง OS กับฮาร์ดแวร์เฉพาะยี่ห้อ/รุ่น เช่น เครื่องพิมพ์บัตรประชาชน หรือเครื่องสแกนโฉนด A0 เมื่อเราสั่ง Print จากเว็บ OS จะส่งคำสั่งมาตรฐานไปยัง Driver แล้ว Driver จะแปลเป็นสัญญาณไฟฟ้าที่เครื่องพิมพ์รุ่นนั้นเข้าใจ</li>
  <li><strong>User Mode vs Kernel Mode (การแบ่งโหมดสิทธิ์ความปลอดภัย):</strong>
    <ul>
      <li><strong>User Mode (โหมดผู้ใช้):</strong> พื้นที่ที่โปรแกรมทั่วไป (เช่น Chrome, Word) ทำงานอยู่ ถูกจำกัดสิทธิ์<strong>ห้ามสั่งฮาร์ดแวร์โดยตรง และห้ามแอบไปอ่าน RAM ของโปรแกรมอื่น</strong> เพื่อกันไม่ให้โปรแกรมที่เขียนพลาดหรือมัลแวร์ทำเครื่องล่มทั้งระบบ หากต้องการอ่านไฟล์หรือต่อเน็ต โปรแกรมต้องส่งคำขอผ่าน <em>System Call</em></li>
      <li><strong>Kernel Mode (โหมดผู้ดูแลระบบแกนกลาง):</strong> พื้นที่ของ <strong>Kernel และ Driver</strong> เท่านั้น มีสิทธิ์เข้าถึง CPU, RAM และฮาร์ดแวร์ทุกชิ้นได้ 100%</li>
    </ul>
  </li>
</ul>

<h3>2.3 Process vs Thread คืออะไร?</h3>
<ul>
  <li><strong>Program vs Process:</strong> ไฟล์โปรแกรมที่ยังไม่เปิดใช้งานบน SSD (เช่น <code>chrome.exe</code>) เรียกว่า <em>Program</em> แต่ทันทีที่ดับเบิลคลิกเปิดขึ้นมาและ OS โหลดเข้า RAM พร้อมจองทรัพยากรให้ทำงาน จะเรียกว่า <strong>Process</strong> (แต่ละ Process มีพื้นที่ RAM แยกขาดจากกัน ถ้าโปรแกรมหนึ่งแฮงก์ อีกโปรแกรมจึงไม่พังตาม)</li>
  <li><strong>Thread:</strong> หน่วยการทำงานย่อยที่สุดที่อยู่<strong>ภายใน Process เดียวกัน</strong> เช่น ใน 1 Process ของเว็บเบราว์เซอร์ อาจมี Thread #1 คอยวาดหน้าจอ, Thread #2 คอยดาวน์โหลดรูป, Thread #3 คอยเล่นเสียง โดยทุก Thread ใน Process เดียวกันสามารถ<strong>แชร์ RAM และข้อมูลร่วมกันได้</strong> จึงสลับงานเร็วและประหยัดทรัพยากรมากกว่าการเปิด Process ใหม่ทั้งก้อน</li>
</ul>

<h3>2.4 การจัดคิวเข้าใช้ CPU (CPU Scheduling): FCFS, SJF และ Round Robin</h3>
<p>เมื่อมีหลาย Process รอใช้ CPU พร้อมกัน OS ต้องเลือกจัดคิวให้ยุติธรรม มาดูอัลกอริทึม 3 ตัวที่ออกสอบประจำด้วย<strong>ตัวอย่างคิวงานจริง</strong>: สมมติมี 3 งานเข้ามาพร้อมกันที่เวลา <code>0 ms</code> คือ <strong>งาน A (ใช้เวลา 8 ms)</strong>, <strong>งาน B (ใช้เวลา 2 ms)</strong>, <strong>งาน C (ใช้เวลา 4 ms)</strong></p>
<ol>
  <li><strong>FCFS (First-Come, First-Served — มาก่อนได้ทำก่อน):</strong> เหมือนต่อคิวซื้อข้าว ทำตามลำดับ A → B → C
    <br><em>ตัวอย่างเวลารอ:</em> A รอ 0 ms, B ต้องรอ A นาน 8 ms, C รอ 8+2 = 10 ms → <strong>เวลารอเฉลี่ย = (0 + 8 + 10) / 3 = 6.0 ms</strong> (ข้อเสียคือหากงานยักษ์มาก่อน งานเล็กๆ ข้างหลังจะรอนานมาก เรียกว่า <em>Convoy Effect</em>)</li>
  <li><strong>SJF (Shortest Job First — งานสั้นได้ทำก่อน):</strong> จับงานที่ใช้เวลาน้อยสุดขึ้นทำก่อน คือ B (2 ms) → C (4 ms) → A (8 ms)
    <br><em>ตัวอย่างเวลารอ:</em> B รอ 0 ms, C รอ 2 ms, A รอ 2+4 = 6 ms → <strong>เวลารอเฉลี่ย = (0 + 2 + 6) / 3 = 2.67 ms</strong> (ให้เวลารอเฉลี่ยต่ำที่สุด! แต่ข้อเสียคือถ้าระบบมีงานสั้นเข้ามาแทรกเรื่อยๆ งานใหญ่อย่าง A อาจไม่ได้ทำสักที เรียกว่า <em>Starvation</em>)</li>
  <li><strong>Round Robin (RR — แบ่งเวลาหมุนเวียนเท่าๆ กัน):</strong> กำหนดช่วงเวลาสั้นๆ เรียกว่า <strong>Time Quantum</strong> (เช่น รอบละ <code>2 ms</code>) ทุกคนผลัดกันทำคนละ 2 ms วนเป็นวงกลม:
    <br><em>ลำดับการทำงาน:</em> <code>A(2 ms) → B(2 ms จบ!) → C(2 ms) → A(2 ms) → C(2 ms จบ!) → A(2 ms) → A(2 ms จบ!)</code>
    <br>ข้อดีคือทุกโปรแกรมได้ตอบสนองไว ไม่ค้างรอ จึงเป็นหัวใจของระบบ <strong>Multi-tasking</strong> อย่าง Windows และ Linux ครับ</li>
</ol>

<h3>2.5 Deadlock (สภาวะติดตาย) คืออะไร? และ 4 เงื่อนไขที่ต้องเกิดพร้อมกัน</h3>
<p>ลองนึกภาพ <strong>"คน 2 คนนั่งกินก๋วยเตี๋ยว แต่มีตะเกียบวางอยู่บนโต๊ะแค่ 1 คู่ (2 ข้าง)"</strong> นาย ก. หยิบตะเกียบซ้ายไว้ในมือแล้วรอนาย ข. วางตะเกียบขวา ส่วนนาย ข. ก็หยิบตะเกียบขวาไว้แน่นแล้วรอนาย ก. วางตะเกียบซ้าย ต่างคนต่างถือไว้คนละข้างและไม่ยอมวาง ทั้งคู่จึงนั่งจ้องตากันค้างตลอดกาล — นี่แหละครับคือ <strong>Deadlock</strong> (หรือเหมือนรถ 2 คันวิ่งสวนกันบนสะพานแคบเลนเดียวแล้วไม่มีใครถอย)!</p>
<p>ในระบบปฏิบัติการ Deadlock จะเกิดขึ้นได้ก็ต่อเมื่อ<strong>ครบทั้ง 4 เงื่อนไข (Coffman Conditions) พร้อมกันเท่านั้น</strong>:</p>
<ol>
  <li><strong>Mutual Exclusion (ใช้ร่วมกันไม่ได้):</strong> ทรัพยากร 1 ชิ้น (เช่น เครื่องพิมพ์หรือตะเกียบ 1 ข้าง) ใช้ได้ทีละ Process เดียว</li>
  <li><strong>Hold and Wait (ถือไว้แล้วรอเพิ่ม):</strong> Process ถือทรัพยากรที่ตัวเองได้มาแล้วไว้แน่น ไม่ยอมปล่อย ในขณะที่กำลังรอขอทรัพยากรชิ้นอื่นเพิ่ม</li>
  <li><strong>No Preemption (ห้ามแย่งชิงกลางคัน):</strong> OS ไม่สามารถไปยึดทรัพยากรคืนจาก Process ได้ ต้องรอให้ Process นั้นใช้งานเสร็จและปล่อยเองเท่านั้น</li>
  <li><strong>Circular Wait (รอกันเป็นวงกลม):</strong> เกิดลูกโซ่การรอปิดเป็นวง เช่น Process A รอของจาก B และ Process B ก็รอของจาก A</li>
</ol>
<div class="callout callout-tip">
  <strong><i class="fa-solid fa-key" aria-hidden="true"></i> จุดออกสอบ Deadlock:</strong> ถ้าเราออกแบบระบบให้<strong>ทำลายเงื่อนไขข้อใดข้อหนึ่งใน 4 ข้อนี้</strong>ได้ (เช่น บังคับให้ขอทรัพยากรทั้งหมดทีเดียว หรืออนุญาตให้ OS สั่งปล่อย/แย่งคืนได้) Deadlock จะไม่มีทางเกิดขึ้นครับ!
</div>

<h3>2.6 Memory Management: Virtual Memory, Paging / Swap และ Thrashing</h3>
<ul>
  <li><strong>Virtual Memory (หน่วยความจำเสมือน):</strong> เทคนิคที่ OS <strong>แอบยืมพื้นที่บางส่วนของ SSD/HDD มาจำลองเป็น RAM เสริม</strong> (ใน Windows เรียก <em>Page File</em> / ใน Linux เรียก <em>Swap</em>) ทำให้เราสามารถเปิดโปรแกรมหลายตัวที่มีขนาดรวมกันใหญ่กว่า RAM จริงในเครื่องได้</li>
  <li><strong>Paging / Swap:</strong> OS จะซอยข้อมูลในโปรแกรมเป็นก้อนเล็กขนาดเท่ากันเรียกว่า <strong>Page</strong> (เช่น ก้อนละ 4 KB) ก้อนไหนที่กำลังใช้งานจะอยู่ใน RAM ส่วนก้อนที่เปิดทิ้งไว้แต่ยังไม่แตะ OS จะย้ายไปฝากบน Disk (<em>Swap Out</em>) พอผู้ใช้คลิกกลับมาดูจึงค่อยดึงกลับเข้า RAM (<em>Swap In</em>)</li>
  <li><strong>Thrashing (อาการเครื่องอืดค้างหนัก):</strong> เกิดขึ้นเมื่อเราเปิดโปรแกรมหนักเกินความจุ RAM จริงไปมากๆ ทำให้พื้นที่ RAM เหลือน้อยจน OS ต้องเสียเวลาวิ่งย้ายข้อมูลเข้า-ออกระหว่าง RAM กับ Disk ตลอดเวลา CPU แทบไม่ได้ทำงานจริง ไฟอ่านเขียน Disk วิ่ง 100% เครื่องจะกระตุกค้าง (วิธีแก้ที่ดีที่สุดคือเพิ่ม RAM จริง หรือปิดโปรแกรมที่ไม่จำเป็น)</li>
</ul>

<h3>2.7 File System คืออะไร? เปรียบเทียบ FAT32, exFAT, NTFS, ext4 และ XFS</h3>
<p><strong>File System (ระบบจัดการไฟล์)</strong> คือระบบบัญชีและกติกาที่ OS ใช้จัดระเบียบการเก็บไฟล์ลงบนดิสก์ (ว่าไฟล์นี้ชื่ออะไร เก็บอยู่ช่องไหน ขนาดเท่าไหร่ ใครมีสิทธิ์เปิด) ถ้าไม่มี File System ดิสก์ก็เป็นเพียงพื้นที่ว่างที่คอมพิวเตอร์อ่านไม่รู้เรื่องครับ</p>
<div class="table-wrap">
  <table>
    <caption>เปรียบเทียบระบบไฟล์ยอดนิยมที่ออกสอบบ่อย</caption>
    <thead>
      <tr>
        <th scope="col">File System</th>
        <th scope="col">ระบบปฏิบัติการหลัก</th>
        <th scope="col">ขนาดไฟล์สูงสุด / 1 ไฟล์</th>
        <th scope="col">จุดเด่นและข้อจำกัดสำคัญ</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th scope="row">FAT32</th>
        <td>อ่านได้แทบทุก OS</td>
        <td><strong>ไม่เกิน 4 GB</strong></td>
        <td>รุ่นเก่า ใช้กับ Flash Drive ทั่วไป แต่ก๊อปปี้ไฟล์วิดีโอ/ISO ใหญ่กว่า 4 GB ลงไปไม่ได้!</td>
      </tr>
      <tr>
        <th scope="row">exFAT</th>
        <td>Windows / macOS</td>
        <td>ใหญ่มาก (ระดับ Exabyte)</td>
        <td>พัฒนาต่อจาก FAT32 สำหรับ Flash Drive / SD Card ยุคใหม่ เก็บไฟล์เกิน 4 GB ได้</td>
      </tr>
      <tr>
        <th scope="row">NTFS</th>
        <td>Windows</td>
        <td>ใหญ่มาก (ระดับ TB–PB)</td>
        <td>มาตรฐาน Windows มีระบบสิทธิ์ ACL, เข้ารหัส EFS, และ Journaling กันไฟล์พังเมื่อไฟดับ</td>
      </tr>
      <tr>
        <th scope="row">ext4</th>
        <td>Linux (เช่น Ubuntu)</td>
        <td>สูงสุด 16 TB</td>
        <td>เสถียร นิยมใช้บน Linux Server ทั่วไป มี Journaling ลดโอกาสข้อมูลเสียหาย</td>
      </tr>
      <tr>
        <th scope="row">XFS</th>
        <td>Linux Enterprise (RHEL)</td>
        <td>ใหญ่มาก (ระดับ Exabyte)</td>
        <td>จัดการไฟล์ขนาดมหึมาและ I/O ความเร็วสูงได้ดีเยี่ยม เป็นค่าเริ่มต้นของ RHEL/Rocky Linux</td>
      </tr>
    </tbody>
  </table>
</div>

<h3>2.8 เปรียบเทียบ Windows vs Linux ในงานเซิร์ฟเวอร์ภาครัฐ</h3>
<div class="table-wrap">
  <table>
    <caption>เปรียบเทียบระบบปฏิบัติการ Windows และ Linux</caption>
    <thead>
      <tr>
        <th scope="col">มิติเปรียบเทียบ</th>
        <th scope="col">Microsoft Windows / Server</th>
        <th scope="col">Linux (Ubuntu, RHEL, Rocky)</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th scope="row">ลิขสิทธิ์</th>
        <td>Commercial ต้องซื้อ License / CAL</td>
        <td>Open Source (GPL) ใช้ฟรี (หรือซื้อ Support เชิงองค์กรเช่น RHEL)</td>
      </tr>
      <tr>
        <th scope="row">ระบบไฟล์</th>
        <td>NTFS, ReFS (แยก Drive <code>C:</code>, <code>D:</code>)</td>
        <td>ext4, XFS (โครงสร้างต้นไม้เดียวเริ่มที่ Root <code>/</code>)</td>
      </tr>
      <tr>
        <th scope="row">การบริหารจัดการ</th>
        <td>เน้น GUI, PowerShell และ Active Directory (AD)</td>
        <td>เน้น Command Line (CLI/SSH) เบาเครื่อง เสถียร รันต่อเนื่องได้นาน</td>
      </tr>
      <tr>
        <th scope="row">ความปลอดภัย</th>
        <td>ตกเป็นเป้าหมายของไวรัสและ Ransomware บ่อยกว่า</td>
        <td>แยกสิทธิ์ <code>root</code> ชัดเจน อัปเดต Patch ผ่าน Package Manager (<code>apt</code>/<code>dnf</code>)</td>
      </tr>
      <tr>
        <th scope="row">งานที่นิยมใช้</th>
        <td>เครื่องสำนักงาน, Active Directory, .NET, MS SQL Server</td>
        <td>Web Server (Nginx/Apache), Docker/Kubernetes, Database, GDCC Cloud</td>
      </tr>
    </tbody>
  </table>
</div>

<h3>2.9 คำสั่ง Linux พื้นฐาน และวิธีอ่าน/คำนวณ <code>chmod 750</code> ทีละขั้น</h3>
<p>ระบบสิทธิ์ไฟล์ใน Linux จะแบ่งผู้ใช้งานออกเป็น <strong>3 กลุ่ม</strong> เรียงลำดับจากซ้ายไปขวาเสมอ:</p>
<ol>
  <li><strong>User (u — เจ้าของไฟล์):</strong> ตัวคนที่สร้างหรือเป็นเจ้าของไฟล์นั้น</li>
  <li><strong>Group (g — กลุ่มงาน):</strong> เพื่อนร่วมทีมที่อยู่ในกลุ่มเดียวกัน</li>
  <li><strong>Others (o — คนอื่นๆ):</strong> บัญชีผู้ใช้อื่นทั้งหมดในเครื่อง</li>
</ol>
<p>แต่ละกลุ่มจะมีสิทธิ์ย่อย 3 อย่างคือ <strong>Read (r = อ่าน)</strong>, <strong>Write (w = แก้ไข/ลบ)</strong>, <strong>Execute (x = รันโปรแกรม/เข้าโฟลเดอร์)</strong> เหตุผลที่ค่าตัวเลขเป็น <strong>r=4, w=2, x=1</strong> ก็เพราะคอมพิวเตอร์เก็บสถานะ "เปิด(1)/ปิด(0)" เป็นเลขฐานสอง 3 หลัก (หลักร้อยคือ <code>2² = 4</code>, หลักสิบคือ <code>2¹ = 2</code>, หลักหน่วยคือ <code>2⁰ = 1</code>) ดังนั้นเวลาตั้งค่า <code>chmod 750 backup.sh</code> จึงคำนวณได้ดังนี้ครับ:</p>

<div class="table-wrap">
  <table>
    <caption>ถอดรหัสคำสั่ง chmod 750 backup.sh ทีละหลัก</caption>
    <thead>
      <tr>
        <th scope="col">กลุ่มผู้ใช้</th>
        <th scope="col">เลขฐานแปด</th>
        <th scope="col">เลขฐานสอง (r w x)</th>
        <th scope="col">วิธีบวกค่า (4, 2, 1)</th>
        <th scope="col">ความหมายสิทธิ์ที่ได้</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th scope="row">หลักที่ 1: User</th>
        <td><strong>7</strong></td>
        <td><code>111</code> (<code>rwx</code>)</td>
        <td>4 + 2 + 1 = 7</td>
        <td>เจ้าของ อ่าน-แก้ไข-รัน ได้ครบทุกอย่าง</td>
      </tr>
      <tr>
        <th scope="row">หลักที่ 2: Group</th>
        <td><strong>5</strong></td>
        <td><code>101</code> (<code>r-x</code>)</td>
        <td>4 + 0 + 1 = 5</td>
        <td>กลุ่ม อ่านและรันได้ แต่แก้ไข/เขียนทับไม่ได้</td>
      </tr>
      <tr>
        <th scope="row">หลักที่ 3: Others</th>
        <td><strong>0</strong></td>
        <td><code>000</code> (<code>---</code>)</td>
        <td>0 + 0 + 0 = 0</td>
        <td>คนอื่นไม่มีสิทธิ์อ่าน เขียน หรือรันได้เลย</td>
      </tr>
    </tbody>
  </table>
</div>

<pre tabindex="0"><code># คำสั่ง Linux ยอดฮิตสำหรับผู้ดูแลระบบราชการ
ls -la /var/www/html     # ดูรายชื่อไฟล์ทั้งหมดพร้อมสิทธิ์ (เช่น -rwxr-x---) และไฟล์ซ่อน
chmod 750 backup.sh      # ตั้งสิทธิ์ rwxr-x--- (เจ้าของเต็มสิทธิ์, กลุ่มอ่าน/รัน, คนอื่นห้ามเข้า)
ps aux | grep nginx      # ค้นหา Process ของ Nginx ที่กำลังทำงานอยู่
df -h                    # ตรวจสอบพื้นที่ว่างของ Disk แบบอ่านง่าย (Human-readable: GB/TB)
systemctl restart nginx  # รีสตาร์ท Service เว็บเซิร์ฟเวอร์</code></pre>`
      },
      {
        id: 'virtualization-cloud',
        title: '3. Virtualization, Container และ Cloud Computing (IaaS / PaaS / SaaS)',
        analogyBox: {
          title: 'เปรียบเทียบให้เห็นภาพ: ซื้อที่สร้างบ้าน vs เช่าห้อง vs พักโรงแรม (และบ้านเดี่ยว vs คอนโด)',
          body: '<strong>1) VM vs Container:</strong> <strong>Virtual Machine (VM)</strong> เหมือนการสร้าง "บ้านเดี่ยวหลายหลัง" ในที่ดินผืนเดียว ทุกหลังต้องเดินท่อน้ำ-ไฟฟ้า-ระบบ OS แยกของตัวเองหมด จึงหนักและเปิดช้า ส่วน <strong>Container (Docker)</strong> เหมือน "ห้องชุดในคอนโด" ที่แชร์ระบบน้ำไฟส่วนกลาง (Host OS Kernel) ร่วมกัน กินพื้นที่น้อยมากและเปิดเข้าอยู่ได้ในไม่กี่วินาที!<br><br><strong>2) ระดับบริการ Cloud:</strong><br>• <strong>On-Premises:</strong> ซื้อที่ดิน สร้างตึก ดูแลระบบไฟ-รปภ. เองหมด (ลงทุนสูง แต่คุมข้อมูล 100%)<br>• <strong>IaaS:</strong> เช่า "ห้องเปล่า" ที่มีน้ำไฟพร้อม (VM + Network) ที่เหลือเราเลือกติดตั้ง OS และโปรแกรมเอง<br>• <strong>PaaS:</strong> เช่า "ครัวพร้อมเตาและอุปกรณ์" เราแค่เตรียมสูตรอาหาร (Code &amp; Data) แล้วลงมือปรุงได้เลย<br>• <strong>SaaS:</strong> เดินเข้า "ร้านอาหาร" สั่งกินได้เลย ไม่ต้องล้างจาน ไม่ต้องดูแลครัว (เปิดเบราว์เซอร์ใช้งานทันที)'
        },
        bodyHtml: `
<h3>3.1 Virtualization คืออะไร? และ Hypervisor Type 1 vs Type 2 ต่างกันอย่างไร?</h3>
<p>สมัยก่อน 1 เว็บเซิร์ฟเวอร์ต้องซื้อเครื่องจริง (Physical Server) 1 เครื่อง ทำให้ใช้ CPU จริงแค่ 10–15% ที่เหลือทิ้งเปล่า เทคโนโลยี <strong>Virtualization (การจำลองเครื่องเสมือน)</strong> จึงเกิดขึ้นเพื่อแบ่งเครื่องเซิร์ฟเวอร์จริง 1 เครื่องให้กลายเป็น <strong>Virtual Machine (VM)</strong> หลายเครื่องทำงานอิสระจากกัน โดยมีซอฟต์แวร์ผู้คุมที่ชื่อว่า <strong>Hypervisor</strong> คอยแบ่งส่วน CPU, RAM และ Disk แจกให้ VM แต่ละตัว:</p>
<ul>
  <li><strong>Type 1 (Bare-Metal Hypervisor):</strong> ติดตั้งทับลงบนฮาร์ดแวร์เครื่องแม่โดยตรง <strong>ไม่มี Windows/Linux ปกติคั่นกลาง</strong> จึงเร็ว เสถียร และปลอดภัยสูงสุด นิยมใช้ในศูนย์ข้อมูล (Data Center) จริง เช่น <em>VMware ESXi, Microsoft Hyper-V, KVM / Proxmox</em></li>
  <li><strong>Type 2 (Hosted Hypervisor):</strong> ติดตั้งเป็นโปรแกรมธรรมดาซ้อนอยู่บน OS ปกติที่เราใช้งาน (เช่น ติดตั้งบน Windows 11 หรือ macOS) ช้ากว่า Type 1 เพราะต้องขอทรัพยากรผ่าน OS หลัก เหมาะกับนักพัฒนาหรือนักศึกษาใช้ฝึก Lab เช่น <em>Oracle VirtualBox, VMware Workstation</em></li>
</ul>

<h3>3.2 Virtual Machine (VM) vs Container (เช่น Docker) ต่างกันอย่างไร?</h3>
<p>ทั้ง VM และ Container ใช้แยกระบบออกจากกันไม่ให้ตีกัน แต่ระดับการจำลองต่างกันชัดเจนตามตารางนี้ครับ:</p>
<div class="table-wrap">
  <table>
    <caption>เปรียบเทียบ Virtual Machine (VM) และ Container (Docker)</caption>
    <thead>
      <tr>
        <th scope="col">ประเด็นเปรียบเทียบ</th>
        <th scope="col">Virtual Machine (VM)</th>
        <th scope="col">Container (เช่น Docker)</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th scope="row">สิ่งที่จำลอง</th>
        <td>จำลอง<strong>ฮาร์ดแวร์ + Guest OS เต็มตัว</strong>แยกทุกเครื่อง</td>
        <td>จำลองเฉพาะ <strong>App + Library</strong> แล้ว<strong>แชร์ Host OS Kernel</strong> ร่วมกัน</td>
      </tr>
      <tr>
        <th scope="row">ขนาดและทรัพยากร</th>
        <td>ใหญ่ (หลักสิบ GB ต่อเครื่อง) กิน RAM เยอะ</td>
        <td>เล็กมาก (หลักสิบ–ร้อย MB) ประหยัด CPU/RAM สูง</td>
      </tr>
      <tr>
        <th scope="row">เวลาในการบูตเปิด</th>
        <td>ช้ากว่า (หลักสิบวินาที ถึงนาที)</td>
        <td>เร็วมาก (ระดับเสี้ยววินาที – ไม่กี่วินาที)</td>
      </tr>
      <tr>
        <th scope="row">การพกพาและจุดเด่น</th>
        <td>แยกขาดระดับ Kernel รัน Windows บน Linux ได้</td>
        <td>แพ็กโค้ด+Library เป็น Image ย้ายไปรันเครื่องไหนผลลัพธ์เหมือนกัน 100%</td>
      </tr>
    </tbody>
  </table>
</div>

<h3>3.3 Cloud Computing คืออะไร? และ GDCC ของภาครัฐไทยคืออะไร?</h3>
<p><strong>Cloud Computing (การประมวลผลแบบคลาวด์)</strong> คือการเช่าใช้ทรัพยากรไอที (เซิร์ฟเวอร์, พื้นที่เก็บข้อมูล, ฐานข้อมูล, ซอฟต์แวร์) ผ่านเครือข่ายอินเทอร์เน็ตแบบ <em>On-Demand</em> ปรับเพิ่ม-ลดขนาดได้ทันที (Elasticity) และจ่ายเฉพาะเท่าที่ใช้งานจริง (Pay-as-you-go) โดยไม่ต้องควักงบซื้อตู้เซิร์ฟเวอร์มาดูแลเอง</p>
<p>ในภาครัฐไทยมีระบบคลาวด์กลางแห่งชาติชื่อว่า <strong>GDCC (Government Data Center and Cloud Service)</strong> ดูแลโดยสำนักงานคณะกรรมการดิจิทัลเพื่อเศรษฐกิจและสังคมแห่งชาติ (BDE/MDES) ร่วมกับ NT เพื่อให้กระทรวง กรม และสำนักงานทั่วประเทศสามารถขอใช้ VM, พื้นที่จัดเก็บข้อมูล และระบบคลาวด์ที่ได้มาตรฐานความปลอดภัยภาครัฐร่วมกันครับ</p>

<h3>3.4 เปรียบเทียบโมเดลบริการ Cloud (Shared Responsibility)</h3>
<div class="table-wrap">
  <table>
    <caption>เปรียบเทียบความรับผิดชอบและตัวอย่างการใช้งาน On-Premises, IaaS, PaaS และ SaaS</caption>
    <thead>
      <tr>
        <th scope="col">โมเดลบริการ</th>
        <th scope="col">ผู้ให้บริการดูแลอะไร</th>
        <th scope="col">หน่วยงาน (เรา) ดูแลอะไร</th>
        <th scope="col">ตัวอย่างบริการจริง</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th scope="row">On-Premises</th>
        <td>ไม่มี (เราจัดหาเองทั้งหมด)</td>
        <td>ทุกชั้น: ห้อง Server, Hardware, Network, OS, Runtime, App, Data</td>
        <td>ห้อง Server ภายในสำนักงาน</td>
      </tr>
      <tr>
        <th scope="row">IaaS</th>
        <td>Physical Server, Storage, Network, Virtualization</td>
        <td>OS, Patch ความปลอดภัย, Runtime, Database, Application, Data</td>
        <td>GDCC VM, AWS EC2, Azure Virtual Machines</td>
      </tr>
      <tr>
        <th scope="row">PaaS</th>
        <td>Hardware ถึง OS และ Runtime/Database Engine</td>
        <td>เฉพาะ Application Code และ Data ของหน่วยงาน</td>
        <td>Google App Engine, Azure App Service, Heroku</td>
      </tr>
      <tr>
        <th scope="row">SaaS</th>
        <td>ดูแลให้ครบทุกชั้นตั้งแต่ Server ยันตัว Application</td>
        <td>การตั้งค่าสิทธิ์ผู้ใช้และข้อมูลที่นำเข้า (Data &amp; User Access)</td>
        <td>Microsoft 365, Google Workspace, ระบบจองคิวออนไลน์</td>
      </tr>
    </tbody>
  </table>
</div>

<h3>3.5 รูปแบบการติดตั้ง Cloud 4 ประเภท (Deployment Models)</h3>
<ul>
  <li><strong>Public Cloud:</strong> คลาวด์สาธารณะที่ผู้ให้บริการเปิดให้ทุกองค์กรเช่าใช้โครงสร้างพื้นฐานร่วมกันผ่านอินเทอร์เน็ต (เช่น AWS, Azure, Google Cloud) จ่ายตามจริง ขยายขนาดได้รวดเร็ว</li>
  <li><strong>Private Cloud:</strong> คลาวด์ส่วนตัวที่สร้างขึ้นเพื่อใช้งานเฉพาะภายในองค์กรเดียวเท่านั้น (อาจตั้งในห้อง Server องค์กรหรือเช่าตู้แยกขาด) ควบคุมความปลอดภัยและข้อมูลชั้นความลับได้สูงสุด</li>
  <li><strong>Hybrid Cloud:</strong> การผสมผสานระหว่าง Private + Public Cloud ให้เชื่อมต่อสื่อสารกันได้ เช่น เก็บฐานข้อมูลทะเบียนราษฎร์ความลับสูงไว้บน Private Cloud แล้วให้หน้าเว็บรับจองคิวรันบน Public Cloud ช่วงที่มีประชาชนเข้าใช้งานพร้อมกันหลักแสนคน</li>
  <li><strong>Community Cloud:</strong> คลาวด์ที่แชร์โครงสร้างพื้นฐานเฉพาะใน <strong>กลุ่มองค์กรที่มีภารกิจ กฎระเบียบ หรือมาตรฐานความปลอดภัยเดียวกัน</strong> เช่น <strong>คลาวด์กลางภาครัฐ (GDCC)</strong> ที่ให้เฉพาะหน่วยงานรัฐใช้งานร่วมกัน</li>
</ul>`,
        mermaid: {
          title: 'แผนภาพเปรียบเทียบขอบเขตความรับผิดชอบบน Cloud (IaaS / PaaS / SaaS)',
          caption: 'สังเกตการส่งต่อภาระการดูแลระบบจากทีม IT หน่วยงาน ไปยังผู้ให้บริการ Cloud ตามลำดับขั้น',
          code: `flowchart LR
  subgraph ONPREM["On-Premises (ดูแลเองทั้งหมด)"]
    direction TB
    O1["Application & Data (ทีม IT ดูแล)"] --> O2["OS & Runtime (ทีม IT ดูแล)"] --> O3["Server & Network (ทีม IT ดูแล)"]
  end
  subgraph IAAS["IaaS (เช่าโครงสร้างพื้นฐาน)"]
    direction TB
    I1["Application & Data (ทีม IT ดูแล)"] --> I2["OS & Runtime (ทีม IT ดูแล)"] --> I3["Server & Network (Cloud ดูแล)"]
  end
  subgraph PAAS["PaaS (เช่าแพลตฟอร์ม)"]
    direction TB
    P1["Application & Data (ทีม IT ดูแล)"] --> P2["OS & Runtime (Cloud ดูแล)"] --> P3["Server & Network (Cloud ดูแล)"]
  end
  subgraph SAAS["SaaS (ใช้ซอฟต์แวร์สำเร็จรูป)"]
    direction TB
    S1["Application & Data (Cloud ดูแล)"] --> S2["OS & Runtime (Cloud ดูแล)"] --> S3["Server & Network (Cloud ดูแล)"]
  end`
        }
      },
      {
        id: 'server-availability',
        title: '4. ความพร้อมใช้งานของเซิร์ฟเวอร์: RAID และกลยุทธ์ Backup',
        analogyBox: {
          title: 'เปรียบเทียบให้เห็นภาพ: ยางอะไหล่รถยนต์ (RAID) vs ตู้นิรภัยสำรองนอกบ้าน (Backup)',
          body: 'หลายคนชอบจำสับสนระหว่าง RAID กับ Backup! จำง่ายๆ ว่า:<br>• <strong>RAID</strong> เหมือนการติดล้อคู่หรือมียางอะไหล่ติดรถ ถ้ายางแตกกลางทาง (ฮาร์ดดิสก์พัง 1 ลูก) รถยังวิ่งต่อถึงปลายทางได้ไม่หยุดชะงัก (<em>High Availability</em>) แต่ถ้าคนขับขับรถตกน้ำหรือโดนโจรลักรถ (<strong>โดนไวรัส Ransomware หรือเผลอลบไฟล์ผิด</strong>) RAID จะก๊อปปี้ความพังนั้นลงดิสก์ทุกลูกพร้อมกัน!<br>• <strong>Backup</strong> เหมือนการถ่ายสำเนาเอกสารสำคัญเก็บไว้ในตู้นิรภัยอีกตึกหนึ่ง ต่อให้ไฟไหม้บ้านหรือเผลอลบไฟล์ต้นฉบับทิ้ง เรายังย้อนเวลากลับไปหยิบสำเนาเมื่อวานมาฟื้นคืนชีพได้ครับ'
        },
        bodyHtml: `
<p>ในงานนักวิชาการคอมพิวเตอร์ปฏิบัติการ ข้อมูลทะเบียนประชาชนและแผนที่รูปแปลงต้องไม่สูญหายและระบบล่มไม่ได้ ดังนั้น <strong>RAID</strong> และ <strong>กลยุทธ์ Backup</strong> จึงออกสอบคำนวณและวิเคราะห์สถานการณ์เป็นประจำครับ</p>

<h3>4.1 RAID คืออะไร? รู้จัก 3 เทคนิคหัวใจ: Striping, Mirroring และ Parity</h3>
<p><strong>RAID (Redundant Array of Independent Disks)</strong> คือเทคนิคการนำฮาร์ดดิสก์หรือ SSD หลายลูกมาต่อรวมกันให้ระบบปฏิบัติการมองเห็นเป็นไดรฟ์ใหญ่ไดรฟ์เดียว โดยมี 3 กลไกพื้นฐานที่ใช้ผสมเป็นระดับ RAID ต่างๆ:</p>
<ul>
  <li><strong>Striping (การหั่นข้อมูลกระจายเขียนหลายลูก):</strong> สมมติมีไฟล์ 100 MB ระบบจะหั่นครึ่งส่ง 50 MB ลงดิสก์ลูกที่ 1 และอีก 50 MB ลงดิสก์ลูกที่ 2 พร้อมกัน ทำให้<strong>อ่าน-เขียนเร็วขึ้นมาก</strong> แต่ข้อเสียคือ<em>ไม่สำรองเผื่อพัง</em> ถ้าพัง 1 ลูก ไฟล์ก็แหว่งพังทั้งชุด</li>
  <li><strong>Mirroring (การก๊อปปี้คู่แฝด):</strong> เขียนข้อมูลชุดเดียวกันเป๊ะๆ ลงบนดิสก์ 2 ลูกพร้อมกัน (เหมือนส่องกระจก) ถ้าลูกที่ 1 พัง ลูกที่ 2 ยังมีข้อมูลครบ 100% พร้อมทำงานต่อทันที แต่เสียพื้นที่ไปครึ่งหนึ่ง (50%)</li>
  <li><strong>Parity (การสร้างข้อมูลคณิตศาสตร์สำหรับกู้คืน):</strong> แทนที่จะเสียพื้นที่ก๊อปปี้ซ้ำ 50% เราเก็บ "ผลสรุปทางคณิตศาสตร์ (ในคอมพิวเตอร์ใช้ XOR)" ไว้ช่วยคำนวณย้อนกลับหาข้อมูลที่หายไปแทน</li>
</ul>

<div class="callout callout-info">
  <strong><i class="fa-solid fa-calculator" aria-hidden="true"></i> เข้าใจ Parity ใน 30 วินาทีด้วยเลขง่ายๆ: <code>A + B = P</code></strong>
  <p style="margin-top:0.4rem; margin-bottom:0;">สมมติเราทำ RAID 5 ด้วยดิสก์ 3 ลูก: ดิสก์ 1 เก็บข้อมูล <code>A = 5</code>, ดิสก์ 2 เก็บข้อมูล <code>B = 3</code>, และดิสก์ 3 เก็บค่า Parity <code>P = A + B = 5 + 3 = 8</code> (ในการใช้งานจริง ระบบ RAID 5 จะสลับวางก้อน Parity กระจายไปทุกดิสก์ = <em>Distributed Parity</em> เพื่อไม่ให้ดิสก์ลูกใดรับภาระหนักอยู่ลูกเดียว)<br>
  หากวันหนึ่ง <strong>ดิสก์ 2 พังหายไป!</strong> ระบบจะเอาค่าจากดิสก์ที่เหลือมาแก้สมการทันที: <code>B = P - A = 8 - 5 = 3</code> ได้ข้อมูลเดิมกลับมาครบทุกบิตโดยไม่ต้องเสียพื้นที่ Mirror ถึงครึ่งหนึ่งครับ!</p>
</div>

<h3>4.2 เปรียบเทียบ RAID 0, 1, 5, 6 และ RAID 10 (พร้อมตัวอย่างดิสก์ 2 TB × 4 ลูก)</h3>
<div class="table-wrap">
  <table>
    <caption>ตารางสรุปคุณสมบัติ RAID 0, 1, 5, 6 และ RAID 10</caption>
    <thead>
      <tr>
        <th scope="col">ระดับ RAID</th>
        <th scope="col">เทคนิคหลัก</th>
        <th scope="col">ขั้นต่ำ</th>
        <th scope="col">ทนเสียได้</th>
        <th scope="col">พื้นที่ใช้งานจริง (เมื่อใช้ 2 TB × 4 ลูก)</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th scope="row">RAID 0</th>
        <td>Striping ล้วน (แบ่งเขียนกระจาย)</td>
        <td>2 ลูก</td>
        <td><strong>0 ลูก (เสีย 1 พังหมด!)</strong></td>
        <td>100% (<code>N</code> ลูก) → 4 × 2 TB = <strong>8 TB</strong> (เร็วสุดแต่เสี่ยงสุด)</td>
      </tr>
      <tr>
        <th scope="row">RAID 1</th>
        <td>Mirroring (ทำสำเนาคู่แฝด)</td>
        <td>2 ลูก</td>
        <td>1 ลูก (ในคู่ 2 ลูก)</td>
        <td>50% (<code>N / 2</code>) → (ต่อ 2 ลูกได้ 2 TB) นิยมลง OS Server</td>
      </tr>
      <tr>
        <th scope="row">RAID 5</th>
        <td>Striping + Distributed Parity</td>
        <td>3 ลูก</td>
        <td><strong>1 ลูก</strong></td>
        <td><code>(N - 1)</code> ลูก → (4 - 1) × 2 TB = <strong>6 TB</strong> (คุ้มค่าและสมดุลสุด)</td>
      </tr>
      <tr>
        <th scope="row">RAID 6</th>
        <td>Striping + Dual Parity (2 ชุด)</td>
        <td>4 ลูก</td>
        <td><strong>2 ลูกพร้อมกัน</strong></td>
        <td><code>(N - 2)</code> ลูก → (4 - 2) × 2 TB = <strong>4 TB</strong> (ปลอดภัยสูง)</td>
      </tr>
      <tr>
        <th scope="row">RAID 10 (1+0)</th>
        <td>Mirror ก่อน แล้วค่อย Stripe</td>
        <td>4 ลูก (เลขคู่)</td>
        <td>1 ลูกต่อกลุ่ม Mirror</td>
        <td>50% (<code>N / 2</code>) → (4 / 2) × 2 TB = <strong>4 TB</strong> (เร็ว+ทน เหมาะกับ Database)</td>
      </tr>
    </tbody>
  </table>
</div>

<h3>4.3 เปรียบเทียบ Full, Incremental และ Differential Backup (ตัวอย่าง จันทร์–อาทิตย์)</h3>
<p>จำง่ายๆ ว่า<strong>RAID ไม่ใช่ Backup</strong> เพราะ RAID ช่วยแค่เมื่อฮาร์ดดิสก์พัง แต่หากเจ้าหน้าที่เผลอลบไฟล์ หรือระบบโดนไวรัส <em>Ransomware</em> เข้ารหัสไฟล์ ระบบจะต้องพึ่งไฟล์สำรอง (Backup) เพื่อย้อนเวลากลับมา ซึ่งมี 3 รูปแบบสำคัญที่ข้อสอบชอบถามเรื่อง "วิธีประกอบร่างตอน Restore" ครับ:</p>
<ul>
  <li><strong>Full Backup:</strong> ก๊อปปี้ไฟล์ทั้งหมด 100% ทุกครั้ง</li>
  <li><strong>Incremental Backup:</strong> ก๊อปปี้เฉพาะไฟล์ที่เปลี่ยน/เพิ่มใหม่ <strong>"นับจาก Backup ครั้งล่าสุด (เมื่อวาน)"</strong> ไม่ว่าเมื่อวานจะเป็น Full หรือ Incremental</li>
  <li><strong>Differential Backup:</strong> ก๊อปปี้เฉพาะไฟล์ที่เปลี่ยน/เพิ่มใหม่ <strong>"นับสะสมจาก Full Backup ครั้งล่าสุด"</strong> (ของเดิมจากเมื่อวานก็ยังติดมาด้วยจนกว่าจะเริ่ม Full รอบใหม่)</li>
</ul>

<div class="table-wrap">
  <table>
    <caption>จำลองตาราง Backup ประจำสัปดาห์: ทำ Full วันอาทิตย์ แล้ววันพฤหัสบดีเครื่องพัง ต้องใช้อะไร Restore ถึงวันพุธ?</caption>
    <thead>
      <tr>
        <th scope="col">วัน</th>
        <th scope="col">งานที่เปลี่ยนในวันนั้น</th>
        <th scope="col">สาย Incremental (อิงเมื่อวาน)</th>
        <th scope="col">สาย Differential (อิงวันอาทิตย์เสมอ)</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th scope="row">อาทิตย์</th>
        <td>ตั้งต้นระบบ (ไฟล์ <code>F1, F2</code>)</td>
        <td>Full Backup: <code>[F1, F2]</code></td>
        <td>Full Backup: <code>[F1, F2]</code></td>
      </tr>
      <tr>
        <th scope="row">จันทร์</th>
        <td>เพิ่มงาน <code>A</code></td>
        <td>Inc (จ.): เก็บเฉพาะ <code>[A]</code></td>
        <td>Diff (จ.): เก็บ <code>[A]</code></td>
      </tr>
      <tr>
        <th scope="row">อังคาร</th>
        <td>เพิ่มงาน <code>B</code></td>
        <td>Inc (อ.): เก็บเฉพาะ <code>[B]</code></td>
        <td>Diff (อ.): เก็บสะสม <code>[A, B]</code></td>
      </tr>
      <tr>
        <th scope="row">พุธ</th>
        <td>เพิ่มงาน <code>C</code></td>
        <td>Inc (พ.): เก็บเฉพาะ <code>[C]</code></td>
        <td>Diff (พ.): เก็บสะสม <code>[A, B, C]</code></td>
      </tr>
      <tr>
        <th scope="row">พฤหัส (พัง!)</th>
        <td><strong>ต้องกู้ข้อมูลถึงวันพุธ</strong></td>
        <td><strong>ต้องใช้ 4 ชุดเรียงกัน:</strong><br>Full(อา.) + Inc(จ.) + Inc(อ.) + Inc(พ.)</td>
        <td><strong>ใช้แค่ 2 ชุดเท่านั้น:</strong><br>Full(อา.) + Diff(พ.)</td>
      </tr>
    </tbody>
  </table>
</div>

<div class="table-wrap">
  <table>
    <caption>สรุปข้อดี-ข้อเสียของ Full, Incremental และ Differential Backup</caption>
    <thead>
      <tr>
        <th scope="col">รูปแบบ Backup</th>
        <th scope="col">สิ่งที่นำไปสำรอง</th>
        <th scope="col">ความเร็วตอนสำรอง &amp; พื้นที่</th>
        <th scope="col">ความเร็วและจำนวนชุดตอน Restore</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th scope="row">Full</th>
        <td>ไฟล์ทั้งหมด 100%</td>
        <td>ช้าสุด / เปลืองพื้นที่ที่สุด</td>
        <td><strong>กู้คืนเร็วสุด:</strong> ใช้ชุด Full ล่าสุดแค่ 1 ชุด</td>
      </tr>
      <tr>
        <th scope="row">Incremental</th>
        <td>เปลี่ยน<strong>นับจาก Backup ล่าสุด</strong></td>
        <td><strong>สำรองเร็วสุด</strong> / ประหยัดพื้นที่ที่สุด</td>
        <td><strong>กู้คืนช้าสุด:</strong> ต้องใช้ Full + Inc ทุกวันเรียงครบ (หากหาย 1 ชุดกลางทาง ข้อมูลขาด!)</td>
      </tr>
      <tr>
        <th scope="row">Differential</th>
        <td>เปลี่ยน<strong>นับจาก Full ล่าสุด</strong></td>
        <td>ปานกลาง (ขนาดโตขึ้นเรื่อยๆ จนถึงวันทำ Full ใหม่)</td>
        <td><strong>กู้คืนเร็วปานกลาง:</strong> ใช้แค่ Full ล่าสุด + Diff ชุดสุดท้าย <strong>เพียง 2 ชุด</strong></td>
      </tr>
    </tbody>
  </table>
</div>

<div class="callout callout-warn">
  <strong><i class="fa-solid fa-triangle-exclamation" aria-hidden="true"></i> กฎ 3-2-1 Backup Strategy:</strong>
  หลักสากลสำหรับป้องกัน Ransomware และภัยพิบัติ คือ เก็บข้อมูลอย่างน้อย <strong>3 ชุด</strong> (ต้นฉบับ 1 + สำรอง 2), บนสื่อต่างชนิดกัน <strong>2 ประเภท</strong> (เช่น NAS กับ Tape/External HDD), และต้องมีอย่างน้อย <strong>1 ชุดอยู่คนละสถานที่หรือตัดขาดจากเครือข่าย (Off-site / Air-gapped)</strong> เพื่อไม่ให้ไวรัสวิ่งตามสายแลนไปล็อกไฟล์สำรองได้
</div>`
      }
    ],
    quiz: [
      {
        id: 'q-core1-1',
        question: 'เมื่อเปิดสวิตช์คอมพิวเตอร์ โปรแกรมเฟิร์มแวร์ใดจะทำงานเพื่อตรวจสอบความพร้อมของอุปกรณ์ฮาร์ดแวร์ (POST) ก่อนโหลดระบบปฏิบัติการ และเก็บอยู่ที่หน่วยความจำใด?',
        options: [
          'BIOS/UEFI เก็บอยู่ในหน่วยความจำถาวร (ROM/Flash)',
          'BIOS/UEFI เก็บอยู่ในหน่วยความจำชั่วคราว (DRAM)',
          'Kernel Driver เก็บอยู่ใน L1 Cache',
          'Virtual Memory เก็บอยู่ใน Paging File'
        ],
        correctIndex: 0,
        explanation: {
          summary: 'BIOS/UEFI เป็นเฟิร์มแวร์ที่ฝังอยู่ในหน่วยความจำแบบ Non-Volatile (ROM/Flash Memory) เพื่อทำ POST ทันทีเมื่อเปิดเครื่อง',
          perOption: [
            'ก. ถูกต้อง เพราะ BIOS/UEFI ต้องคงอยู่แม้ไม่มีไฟเลี้ยง จึงเก็บไว้ใน ROM/Flash เพื่อรัน POST (Power-On Self-Test) ก่อนเรียก Bootloader',
            'ข. ผิด เพราะ DRAM เป็นหน่วยความจำชั่วคราว (Volatile) เมื่อปิดเครื่องข้อมูลจะหายหมด',
            'ค. ผิด เพราะ L1 Cache อยู่ใน CPU และข้อมูลหายเมื่อไฟดับเช่นกัน',
            'ง. ผิด เพราะ Virtual Memory เป็นส่วนช่วยขยาย RAM บนดิสก์ขณะ OS ทำงานแล้ว'
          ]
        }
      },
      {
        id: 'q-core1-2',
        question: 'ข้อใดเรียงลำดับหน่วยความจำจาก "ความเร็วในการเข้าถึงข้อมูลสูงสุด" ไปหา "ช้าที่สุด" ได้ถูกต้อง?',
        options: [
          'RAM → L1 Cache → Registers → NVMe SSD',
          'Registers → L1 Cache → L3 Cache → RAM → NVMe SSD',
          'L1 Cache → Registers → DRAM → SRAM',
          'NVMe SSD → RAM → L2 Cache → Registers'
        ],
        correctIndex: 1,
        explanation: {
          summary: 'ความเร็วจะสูงสุดที่ Registers ภายใน CPU รองลงมาคือ Cache (L1 → L2 → L3), RAM และสื่อบันทึกข้อมูล SSD/HDD',
          perOption: [
            'ก. ผิด เพราะ Registers และ Cache เร็วกว่า RAM มาก',
            'ข. ถูกต้อง ตามหลัก Memory Hierarchy: Registers เร็วที่สุด ตามด้วย L1/L2/L3 Cache, RAM และ Storage',
            'ค. ผิด เพราะ Registers เร็วกว่า L1 Cache และ Cache ใช้ SRAM ซึ่งเร็วกว่า DRAM',
            'ง. ผิด เพราะเรียงสลับจากช้าไปเร็ว'
          ]
        }
      },
      {
        id: 'q-core1-3',
        question: 'อาการ "Thrashing" ในระบบปฏิบัติการเกิดจากสาเหตุใด และส่งผลต่อเครื่องคอมพิวเตอร์อย่างไร?',
        options: [
          'พัดลมระบายความร้อน CPU หมุนช้าลง ทำให้ปรับลดความถี่นาฬิกา',
          'RAM เต็มจน OS ต้องสลับหน้าข้อมูล (Paging) ไปมาบนฮาร์ดดิสก์ตลอดเวลา ทำให้เครื่องช้ามาก',
          'ฮาร์ดดิสก์ RAID 0 ทำงานเร็วเกินไปจน Bus เกิดคอขวด',
          'เกิดการติดไวรัสที่ทำให้ระบบแสดงโฆษณาซ้อนกันหลายหน้าต่าง'
        ],
        correctIndex: 1,
        explanation: {
          summary: 'Thrashing คือภาวะที่ระบบใช้เวลาสลับข้อมูล (Page Fault / Swap) ระหว่าง RAM กับ Disk มากกว่าเวลาที่ใช้ประมวลผลจริง',
          perOption: [
            'ก. ผิด นั่นคืออาการ Thermal Throttling จากความร้อนสูง',
            'ข. ถูกต้อง เมื่อ RAM ไม่พอและเกิดการ Swap/Paging อย่างหนักบน Storage ที่มี Disk I/O ช้ากว่า RAM มาก เครื่องจะค้างหรือช้าผิดปกติ',
            'ค. ผิด RAID 0 ไม่ใช่สาเหตุของอาการ Thrashing',
            'ง. ผิด นั่นเป็นพฤติกรรมของ Adware ไม่ใช่หลักการจัดการหน่วยความจำของ OS'
          ]
        }
      },
      {
        id: 'q-core1-4',
        question: 'ผู้ดูแลระบบ Linux รันคำสั่ง "chmod 750 deploy.sh" ผลลัพธ์ของสิทธิ์ไฟล์ดังกล่าวตรงกับข้อใด?',
        options: [
          'เจ้าของ (Owner) อ่าน-เขียน-รันได้, กลุ่ม (Group) อ่าน-รันได้, คนอื่น (Others) ไม่มีสิทธิ์เลย',
          'เจ้าของอ่าน-เขียนได้เท่านั้น, กลุ่มแก้ไขได้, คนอื่นอ่านได้',
          'ทุกคนสามารถอ่าน เขียน และลบไฟล์นี้ได้ทั้งหมด',
          'เจ้าของอ่านได้อย่างเดียว แต่กลุ่มและคนอื่นสามารถรันไฟล์ได้'
        ],
        correctIndex: 0,
        explanation: {
          summary: 'รหัสเลขฐานแปดของ chmod ใช้ค่า r=4, w=2, x=1 ดังนั้น 7=4+2+1 (rwx), 5=4+0+1 (r-x), 0=---',
          perOption: [
            'ก. ถูกต้อง 7 = rwx (เจ้าของทำได้หมด), 5 = r-x (กลุ่มอ่านและรันได้), 0 = --- (คนอื่นไม่มีสิทธิ์ใดๆ)',
            'ข. ผิด เพราะ 7 ต้องรัน (x) ได้ด้วย และเลข 0 หมายถึงไม่มีสิทธิ์เลย',
            'ค. ผิด นั่นคือสิทธิ์ chmod 777 ซึ่งเป็นอันตรายด้านความปลอดภัย',
            'ง. ผิด เพราะอ่านอย่างเดียวคือเลข 4 ไม่ใช่ 7'
          ]
        }
      },
      {
        id: 'q-core1-5',
        question: 'เหตุใดการปรับใช้แอปพลิเคชันด้วย Container (เช่น Docker) จึงใช้ทรัพยากรน้อยกว่าและเปิดทำงานได้เร็วกว่า Virtual Machine (VM) แบบดั้งเดิม?',
        options: [
          'Container ไม่ต้องใช้ CPU และ RAM ของเครื่องแม่ข่ายเลย',
          'Container แชร์ OS Kernel ร่วมกับเครื่องแม่ ไม่ต้องจำลอง Guest OS ซ้ำซ้อนทุกตัว',
          'Container ติดตั้งแทน BIOS ได้โดยตรงบนเมนบอร์ด',
          'Container จำกัดให้รันได้เฉพาะไฟล์ภาษา HTML เท่านั้น'
        ],
        correctIndex: 1,
        explanation: {
          summary: 'Container จำลองระดับ OS โดยแชร์ Kernel ของ Host OS ร่วมกัน จึงเบากว่า VM ที่ต้องบูต Guest OS แยกทุกเครื่อง',
          perOption: [
            'ก. ผิด Container ยังคงใช้ CPU และ RAM ของเครื่องแม่ (Host) เพียงแต่ overhead ต่ำกว่ามาก',
            'ข. ถูกต้อง การแชร์ Host OS Kernel ทำให้ตัดภาระการรัน Guest OS ซ้ำซ้อน จึงเปิด-ปิดได้ในระดับวินาที',
            'ค. ผิด Docker รันอยู่บน Host OS ไม่ได้แทนที่ BIOS',
            'ง. ผิด Container รันบริการได้ทุกภาษา เช่น Java, Node.js, Python, Database'
          ]
        }
      },
      {
        id: 'q-core1-6',
        question: 'หน่วยงานราชการต้องการเช่าระบบคลาวด์ที่ผู้ให้บริการดูแลทั้ง Server, Storage, OS และ Runtime ให้พร้อมเสร็จ ทีมพัฒนาของหน่วยงานเพียงแค่นำโค้ดเว็บแอปพลิเคชันมา Deploy และจัดการฐานข้อมูล รูปแบบคลาวด์นี้คือข้อใด?',
        options: [
          'IaaS (Infrastructure as a Service)',
          'PaaS (Platform as a Service)',
          'SaaS (Software as a Service)',
          'On-Premises Bare Metal'
        ],
        correctIndex: 1,
        explanation: {
          summary: 'PaaS ให้บริการสภาพแวดล้อมสำหรับพัฒนาและรันแอปพลิเคชัน (OS + Runtime) โดยผู้ใช้โฟกัสแค่โค้ดและข้อมูลของตนเอง',
          perOption: [
            'ก. ผิด ถ้าเป็น IaaS หน่วยงานต้องดูแลและแพตช์ระบบปฏิบัติการ (OS) รวมถึง Runtime เอง',
            'ข. ถูกต้อง PaaS เหมาะกับนักพัฒนาที่ต้องการอัปโหลดโค้ดขึ้นรันทันทีโดยไม่ต้องปวดหัวกับการตั้งค่า OS หรืออัปเดตเซิร์ฟเวอร์',
            'ค. ผิด SaaS คือซอฟต์แวร์สำเร็จรูปพร้อมใช้ทันที ผู้ใช้ไม่ต้องเขียนหรือ Deploy โค้ดเอง',
            'ง. ผิด On-Premises คือการซื้อเครื่องมาตั้งและดูแลเองทั้งหมดในหน่วยงาน'
          ]
        }
      },
      {
        id: 'q-core1-7',
        question: 'เซิร์ฟเวอร์ฐานข้อมูลมีฮาร์ดดิสก์ขนาด 2 TB จำนวน 4 ลูก และผู้ดูแลเลือกทำระบบ RAID 5 จะได้พื้นที่เก็บข้อมูลสุทธิเท่าใด และทนทานต่อดิสก์เสียพร้อมกันได้สูงสุดกี่ลูก?',
        options: [
          'พื้นที่สุทธิ 8 TB, ทนดิสก์เสียได้ 1 ลูก',
          'พื้นที่สุทธิ 4 TB, ทนดิสก์เสียได้ 2 ลูก',
          'พื้นที่สุทธิ 6 TB, ทนดิสก์เสียได้ 1 ลูก',
          'พื้นที่สุทธิ 6 TB, ทนดิสก์เสียได้ 2 ลูก'
        ],
        correctIndex: 2,
        explanation: {
          summary: 'RAID 5 มีความจุใช้งานจริงเท่ากับ (N - 1) × ขนาดดิสก์ 1 ลูก และทนความเสียหายได้ 1 ลูก',
          perOption: [
            'ก. ผิด 8 TB คือ RAID 0 ซึ่งไม่ทนดิสก์เสียเลยแม้แต่ลูกเดียว',
            'ข. ผิด พื้นที่ 4 TB และทนเสียได้ 2 ลูกเป็นคุณสมบัติของ RAID 6 สำหรับดิสก์ 4 ลูก',
            'ค. ถูกต้อง RAID 5 ใช้พื้นที่เทียบเท่า 1 ลูกเป็น Parity กระจายทุกดิสก์ ดังนั้น (4 - 1) × 2 TB = 6 TB และทนเสียได้ 1 ลูก',
            'ง. ผิด RAID 5 มี Single Parity จึงทนเสียได้เพียง 1 ลูก (หากเสีย 2 ลูกพร้อมกันข้อมูลจะเสียหาย)'
          ]
        }
      },
      {
        id: 'q-core1-8',
        question: 'กำหนดการสำรองข้อมูลกำหนดให้ทำ Full Backup ทุกวันอาทิตย์ และทำ Differential Backup ทุกวันจันทร์–เสาร์ หากวันพฤหัสบดีฮาร์ดดิสก์พัง จะต้องใช้ชุดข้อมูลใดบ้างในการ Restore ให้ได้สภาพล่าสุดถึงวันพุธ?',
        options: [
          'ใช้ Full Backup วันอาทิตย์ + Differential วันจันทร์ + อังคาร + พุธ รวม 4 ชุด',
          'ใช้ Full Backup วันอาทิตย์ + Differential วันพุธ เพียง 2 ชุดเท่านั้น',
          'ใช้ Differential วันพุธเพียงชุดเดียวก็กู้ได้ทั้งหมด',
          'ใช้ Full Backup วันอาทิตย์เพียงชุดเดียวก็จะได้ข้อมูลถึงวันพุธ'
        ],
        correctIndex: 1,
        explanation: {
          summary: 'Differential Backup จะเก็บการเปลี่ยนแปลงทั้งหมดสะสมนับตั้งแต่ Full Backup ล่าสุด จึงใช้เพียง Full ล่าสุด + Diff ล่าสุดในการกู้คืน',
          perOption: [
            'ก. ผิด การต้องไล่ใช้ทุกวันเรียงกันทีละชุดเป็นลักษณะของ Incremental Backup ไม่ใช่ Differential',
            'ข. ถูกต้อง Differential วันพุธได้รวมความเปลี่ยนแปลงของจันทร์ อังคาร และพุธไว้แล้ว จึงใช้แค่ Full วันอาทิตย์ + Diff วันพุธรวม 2 ชุด',
            'ค. ผิด Differential ไม่ได้เก็บไฟล์เดิมที่ไม่เปลี่ยนแปลง จึงขาดไม่ได้ซึ่งชุด Full Backup ตั้งต้น',
            'ง. ผิด Full วันอาทิตย์ไม่มีข้อมูลใหม่ที่เกิดขึ้นในวันจันทร์ถึงพุธ'
          ]
        }
      }
    ]
  });
})(window);
