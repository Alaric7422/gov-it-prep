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
    subtitle: 'เข้าใจการทำงานตั้งแต่ CPU, RAM, ROM, ระบบปฏิบัติการ Windows/Linux ไปจนถึง Virtualization, Cloud และระบบสำรองข้อมูล RAID',
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
      'ลำดับความเร็วความจำจากเร็วที่สุดไปช้าที่สุด: Registers > L1/L2/L3 Cache > RAM > NVMe SSD > SATA SSD > HDD',
      'RAM เป็นหน่วยความจำชั่วคราว (Volatile) ไฟดับข้อมูลหาย ส่วน ROM เก็บเฟิร์มแวร์ BIOS/UEFI สำหรับทำ POST ตอนเปิดเครื่อง',
      'ระบบปฏิบัติการจัดการ Process, Memory (Virtual Memory/Paging), File System (NTFS vs ext4) และสิทธิ์ผู้ใช้ (chmod)',
      'Cloud แบ่งความรับผิดชอบเป็น IaaS (เช่าเครื่องเสมือน) > PaaS (เช่าแพลตฟอร์มรันโค้ด) > SaaS (ใช้ซอฟต์แวร์สำเร็จรูป)',
      'RAID 1 (Mirror) ทนพังได้ 1 ลูก, RAID 5 (Parity ขั้นต่ำ 3 ลูก) ทนพัง 1 ลูก, และ Differential Backup ใช้ชุด Full + Diff ล่าสุดในการ Restore'
    ],
    sections: [
      {
        id: 'hardware-anatomy',
        title: '1. โครงสร้างฮาร์ดแวร์และลำดับชั้นความจำ (Memory Hierarchy)',
        analogyBox: {
          title: 'เปรียบเทียบให้เห็นภาพ: ห้องทำงานช่างวิศวกร',
          body: 'ลองนึกภาพคอมพิวเตอร์ 1 เครื่องเหมือน <strong>"ห้องทำงานของช่างคนเก่ง"</strong>:<br>• <strong>CPU</strong> คือ "ตัวช่าง" ที่คิดคำนวณและลงมือทำงานทุกอย่าง<br>• <strong>Registers &amp; Cache</strong> คือ "กระดาษโน้ตในมือช่าง" หยิบดูได้ในเสี้ยววินาที แต่จดได้น้อยมาก<br>• <strong>RAM</strong> คือ "โต๊ะทำงาน" ยิ่งโต๊ะกว้าง (RAM เยอะ) ช่างยิ่งวางแฟ้มเปิดทำงานหลายโปรแกรมพร้อมกันได้ลื่น แต่พอปิดไฟกลับบ้าน (Shutdown) แม่บ้านจะเก็บของบนโต๊ะออกหมด (Volatile)<br>• <strong>ROM (BIOS/UEFI)</strong> คือ "คู่มือเปิดร้านที่ติดถาวรบนผนัง" ไฟดับก็ไม่หาย เปิดเครื่องเมื่อไหร่ต้องอ่านคู่มือนี้ก่อนเสมอ<br>• <strong>Storage (SSD / HDD)</strong> คือ "ตู้เก็บแฟ้มเอกสาร" เก็บข้อมูลได้มหาศาลแม้ไฟดับ แต่ช่างต้องเดินไปหยิบแฟ้มมาวางบนโต๊ะ RAM ก่อนจึงจะทำงานได้'
        },
        bodyHtml: `
<p>เวลาสอบภาควิชาการคอมพิวเตอร์ คำถามเปิดหัวแทบทุกสนามคือเรื่อง <strong>สถาปัตยกรรมของคอมพิวเตอร์ (Von Neumann Architecture)</strong> และความแตกต่างของหน่วยความจำแต่ละชั้น เรามาไล่เก็บจุดออกสอบแบบไม่พลาดแม้แต่คะแนนเดียวครับ</p>

<h3>ส่วนประกอบภายใน CPU และ System Bus</h3>
<ul>
  <li><strong>CU (Control Unit - หน่วยควบคุม):</strong> ทำหน้าที่เป็น "หัวหน้างาน" ควบคุมวงรอบคำสั่ง <em>Fetch → Decode → Execute</em> และสั่งให้อุปกรณ์อื่นทำงานตามจังหวะสัญญาณนาฬิกา (Clock Speed)</li>
  <li><strong>ALU (Arithmetic Logic Unit - หน่วยคำนวณและตรรกะ):</strong> ทำหน้าที่บวก ลบ คูณ หาร และเปรียบเทียบทางตรรกะ (เช่น มากกว่า น้อยกว่า AND/OR)</li>
  <li><strong>Registers:</strong> หน่วยความจำขนาดจิ๋วที่ฝังอยู่ในตัว CPU เอง เร็วที่สุดในระบบ เก็บคำสั่งและตัวเลขที่กำลังประมวลผลอยู่ ณ ขณะนั้น</li>
  <li><strong>System Bus (เส้นทางลำเลียงข้อมูล):</strong> แบ่งออกเป็น 3 เส้นทางสำคัญ คือ
    <ol>
      <li><strong>Data Bus</strong> (สองทิศทาง): ขนส่งตัวข้อมูลจริงระหว่าง CPU, RAM และ I/O</li>
      <li><strong>Address Bus</strong> (ทิศทางเดียวจาก CPU): ชี้ตำแหน่งที่อยู่ (Memory Address) ว่าจะอ่านหรือเขียนข้อมูลที่ช่องไหน</li>
      <li><strong>Control Bus</strong> (สองทิศทาง): ส่งสัญญาณควบคุม เช่น สั่ง Read, Write หรือ Interrupt</li>
    </ol>
  </li>
</ul>

<h3>ลำดับชั้นหน่วยความจำและหน่วยจัดเก็บข้อมูล</h3>
<div class="table-wrap">
  <table>
    <caption>ตารางเปรียบเทียบหน่วยความจำและอุปกรณ์จัดเก็บข้อมูลในคอมพิวเตอร์</caption>
    <thead>
      <tr>
        <th scope="col">ประเภท</th>
        <th scope="col">คุณสมบัติไฟดับ (Volatility)</th>
        <th scope="col">ความเร็ว / ความจุ</th>
        <th scope="col">บทบาทสำคัญ &amp; จุดออกสอบ</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th scope="row">Registers</th>
        <td>Volatile (ข้อมูลหาย)</td>
        <td>เร็วที่สุด (ระดับ Sub-nanosecond) / น้อยมาก (ไบต์)</td>
        <td>อยู่ใน CPU เก็บค่าที่กำลังคำนวณ เช่น Program Counter (PC), Instruction Register (IR)</td>
      </tr>
      <tr>
        <th scope="row">Cache (L1 / L2 / L3)</th>
        <td>Volatile (ข้อมูลหาย)</td>
        <td>เร็วมาก (ใช้ <strong>SRAM</strong>) / หลัก KB ถึงสิบ MB</td>
        <td>พักข้อมูลที่ใช้บ่อยระหว่าง CPU กับ RAM เพื่อลดคอขวด (L1 เร็วสุดและเล็กสุด, L3 ใหญ่สุดและแชร์กันทุก Core)</td>
      </tr>
      <tr>
        <th scope="row">RAM (Main Memory)</th>
        <td>Volatile (ข้อมูลหาย)</td>
        <td>เร็ว (ใช้ <strong>DRAM</strong> เช่น DDR4/DDR5) / 8–128+ GB</td>
        <td>โหลด OS และโปรแกรมที่กำลังรันอยู่ ต้อง Refresh ประจุไฟฟ้าตลอดเวลา</td>
      </tr>
      <tr>
        <th scope="row">ROM / Flash BIOS-UEFI</th>
        <td>Non-Volatile (ไม่หาย)</td>
        <td>อ่านเป็นหลัก / ไม่กี่ MB</td>
        <td>เก็บเฟิร์มแวร์เปิดเครื่อง ทำการทดสอบฮาร์ดแวร์ <strong>POST (Power-On Self-Test)</strong> ก่อนเรียก Bootloader</td>
      </tr>
      <tr>
        <th scope="row">NVMe SSD (M.2 PCIe)</th>
        <td>Non-Volatile (ไม่หาย)</td>
        <td>เร็วสูงมาก (3,000–7,000+ MB/s)</td>
        <td>สื่อบันทึกข้อมูลแฟลชเชื่อมต่อตรงผ่านเลน PCIe เร็วกว่า SATA SSD หลายเท่า ไม่มีชิ้นส่วนหมุน</td>
      </tr>
      <tr>
        <th scope="row">HDD (Hard Disk Drive)</th>
        <td>Non-Volatile (ไม่หาย)</td>
        <td>ช้ากว่า SSD (80–160 MB/s) / ราคาต่อ GB ถูกสุด</td>
        <td>จานแม่เหล็กหมุน (5,400–7,200 RPM) เหมาะเก็บไฟล์ขนาดใหญ่หรือ Backup ระยะยาว</td>
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
          title: 'เปรียบเทียบให้เห็นภาพ: ผู้จัดการสำนักงานที่ดิน',
          body: 'ถ้าระบบฮาร์ดแวร์คือโต๊ะและตู้เอกสาร <strong>ระบบปฏิบัติการ (Operating System)</strong> ก็คือ <strong>"ผู้จัดการสำนักงาน"</strong> ที่คอยรับคำสั่งจากผู้ใช้ (ผ่าน GUI หรือ Command Line) แล้วจัดคิวให้โปรแกรมต่างๆ ได้ใช้ CPU อย่างยุติธรรม แบ่งพื้นที่บนโต๊ะ RAM ไม่ให้โปรแกรมตีกัน และตรวจบัตรประชาชน (Permission) ก่อนเปิดตู้เอกสาร'
        },
        bodyHtml: `
<p>ตัวแกนกลางของระบบปฏิบัติการเรียกว่า <strong>Kernel</strong> ทำหน้าที่สื่อสารกับฮาร์ดแวร์โดยตรงผ่าน <strong>Device Driver</strong> โดยแบ่งโหมดการทำงานออกเป็น <strong>Kernel Mode</strong> (สิทธิ์เต็ม) และ <strong>User Mode</strong> (สิทธิ์จำกัด เพื่อความปลอดภัย)</p>

<h3>4 หน้าที่หลักของ OS ที่ออกสอบประจำ</h3>
<ol>
  <li><strong>Process Management (การจัดการโปรเซส):</strong>
    โปรแกรมที่ถูกโหลดเข้า RAM เพื่อรันจะเรียกว่า <strong>Process</strong> (และหน่วยย่อยที่ทำงานคู่ขนานภายใน Process เดียวกันคือ <strong>Thread</strong>) OS จะจัดคิวเข้าใช้ CPU ด้วยอัลกอริทึม เช่น <em>FCFS (มาก่อนได้ก่อน)</em>, <em>SJF (งานสั้นทำก่อน)</em>, และ <strong>Round Robin (แบ่งเวลา Time Quantum เท่าๆ กัน)</strong> ซึ่งเหมาะกับระบบ Multi-tasking ที่สุด<br>
    <em>ข้อควรรู้เรื่อง Deadlock:</em> สภาวะที่ Process สองตัวขึ้นไปรอทรัพยากรซึ่งกันและกันจนค้างตลอดกาล เกิดครบ 4 เงื่อนไขพร้อมกัน (Mutual Exclusion, Hold and Wait, No Preemption, Circular Wait)
  </li>
  <li><strong>Memory Management &amp; Virtual Memory:</strong>
    เมื่อเปิดโปรแกรมเยอะจน RAM จริงใกล้เต็ม OS จะยืมพื้นที่บางส่วนของ SSD/HDD มาจำลองเป็น RAM เสริมเรียกว่า <strong>Virtual Memory (Paging / Swap)</strong> แต่ถ้าเกิดการสลับข้อมูลระหว่าง RAM กับ Disk บ่อยเกินไปเครื่องจะอืดมาก เรียกอาการนี้ว่า <strong>Thrashing</strong>
  </li>
  <li><strong>File System Management:</strong>
    ระบบจัดระเบียบไฟล์บนดิสก์ เช่น <strong>NTFS</strong> (มาตรฐาน Windows รองรับไฟล์ใหญ่เกิน 4GB และตั้งสิทธิ์ ACL), <strong>FAT32</strong> (ไฟล์เดียวใหญ่สุดได้แค่ 4GB ใช้กับ Flash Drive เก่า), <strong>exFAT</strong> (เหมาะกับ Flash Drive ยุคใหม่), และ <strong>ext4 / XFS</strong> (มาตรฐาน Linux Server)
  </li>
  <li><strong>Security &amp; Access Control:</strong> การพิสูจน์ตัวตนและกำหนดสิทธิ์ อ่าน-เขียน-ประมวลผล (Read/Write/Execute)</li>
</ol>

<h3>เปรียบเทียบ Windows vs Linux ในงานเซิร์ฟเวอร์ภาครัฐ</h3>
<div class="table-wrap">
  <table>
    <caption>เปรียบเทียบระบบปฏิบัติการ Windows และ Linux</caption>
    <thead>
      <tr>
        <th scope="col">มิติเปรียบเทียบ</th>
        <th scope="col">Microsoft Windows / Windows Server</th>
        <th scope="col">Linux (Ubuntu, RHEL, Rocky Linux)</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th scope="row">ลิขสิทธิ์และค่าใช้จ่าย</th>
        <td>ซอฟต์แวร์เชิงพาณิชย์ (Commercial) ต้องซื้อ License / CAL</td>
        <td>Open Source (GPL) ใช้งานฟรี (หรือซื้อ Support Enterprise เช่น RHEL)</td>
      </tr>
      <tr>
        <th scope="row">ระบบไฟล์ (File System)</th>
        <td>NTFS, ReFS (แยก Drive C:, D:)</td>
        <td>ext4, XFS (โครงสร้างต้นไม้เดียวเริ่มที่ Root <code>/</code>)</td>
      </tr>
      <tr>
        <th scope="row">การบริหารจัดการหลัก</th>
        <td>เน้น GUI และ PowerShell / Active Directory (AD)</td>
        <td>เน้น Command Line (CLI/SSH) เบาเครื่อง เสถียร รันต่อเนื่องได้นาน</td>
      </tr>
      <tr>
        <th scope="row">ความไวต่อมัลแวร์</th>
        <td>ตกเป็นเป้าหมายของไวรัสและ Ransomware บ่อยกว่า</td>
        <td>ปลอดภัยสูง แยกสิทธิ์ Root ชัดเจน อัปเดต Patch ผ่าน Package Manager (apt/dnf)</td>
      </tr>
      <tr>
        <th scope="row">งานที่นิยมใช้</th>
        <td>เครื่องลูกข่ายสำนักงาน, Active Directory, .NET, MS SQL Server</td>
        <td>Web Server (Nginx/Apache), Docker/Kubernetes, Database, GDCC Cloud</td>
      </tr>
    </tbody>
  </table>
</div>

<h3>คำสั่ง Linux พื้นฐาน &amp; สิทธิ์ไฟล์ (<code>chmod</code>) ที่ออกสอบบ่อย</h3>
<p>ระบบสิทธิ์ใน Linux แบ่งเจ้าของออกเป็น 3 กลุ่ม (<strong>User / Group / Others</strong>) โดยแต่ละกลุ่มมีค่าตัวเลข <strong>Read (r) = 4, Write (w) = 2, Execute (x) = 1</strong> ดังนั้น <code>chmod 755 script.sh</code> หมายถึง เจ้าของอ่าน-เขียน-รันได้ (4+2+1=7) ส่วนกลุ่มและคนอื่นอ่านและรันได้อย่างเดียว (4+1=5)</p>
<pre tabindex="0"><code># คำสั่ง Linux ยอดฮิตสำหรับผู้ดูแลระบบราชการ
ls -la /var/www/html     # ดูรายชื่อไฟล์ทั้งหมดพร้อมสิทธิ์และไฟล์ซ่อน
chmod 750 backup.sh      # ตั้งสิทธิ์ rwxr-x--- (เจ้าของเต็มสิทธิ์, กลุ่มอ่าน/รัน)
ps aux | grep nginx      # ค้นหา Process ของ Nginx ที่กำลังทำงานอยู่
df -h                    # ตรวจสอบพื้นที่ว่างของ Disk (Human-readable)
systemctl restart nginx  # รีสตาร์ท Service เว็บเซิร์ฟเวอร์</code></pre>`
      },
      {
        id: 'virtualization-cloud',
        title: '3. Virtualization, Container และ Cloud Computing (IaaS / PaaS / SaaS)',
        analogyBox: {
          title: 'เปรียบเทียบให้เห็นภาพ: ซื้อที่สร้างบ้าน vs เช่าห้อง vs พักโรงแรม',
          body: '• <strong>On-Premises:</strong> ซื้อที่ดิน สร้างตึก ดูแลระบบไฟ-รปภ. เองหมด (ลงทุนสูง แต่คุมข้อมูล 100%)<br>• <strong>IaaS (Infrastructure as a Service):</strong> เช่า "ห้องเปล่า" ที่มีน้ำไฟพร้อม (VM + Network) ที่เหลือเราเลือกติดตั้ง OS และโปรแกรมเอง<br>• <strong>PaaS (Platform as a Service):</strong> เช่า "ครัวพร้อมเตาและอุปกรณ์" เราแค่เตรียมสูตรอาหาร (Code &amp; Data) แล้วลงมือปรุงได้เลย<br>• <strong>SaaS (Software as a Service):</strong> เดินเข้า "ร้านอาหาร" สั่งกินได้เลย ไม่ต้องล้างจาน ไม่ต้องดูแลครัว (เปิดเบราว์เซอร์ใช้งานทันที)'
        },
        bodyHtml: `
<p>ยุคดิจิทัลภาครัฐ (เช่น ระบบ <strong>GDCC — Government Data Center and Cloud</strong>) ช่วยให้หน่วยงานไม่ต้องซื้อเซิร์ฟเวอร์ราคาแพงมาตั้งเองทุกเรื่อง โดยหัวใจเบื้องหลังคลาวด์ก็คือเทคโนโลยี <strong>Virtualization</strong> และ <strong>Containerization</strong> ครับ</p>

<h3>Hypervisor (VM) vs Container (Docker)</h3>
<ul>
  <li><strong>Virtual Machine (VM):</strong> ใช้ซอฟต์แวร์ <strong>Hypervisor</strong> แบ่งฮาร์ดแวร์เครื่องแม่ข่าย 1 เครื่องเป็นเครื่องเสมือนหลายเครื่อง โดยแต่ละ VM จะมี Guest OS เต็มรูปแบบเป็นของตัวเอง แบ่งเป็น:
    <ul>
      <li><strong>Type 1 (Bare-Metal Hypervisor):</strong> ติดตั้งทับบนฮาร์ดแวร์โดยตรง ไม่มี OS คั่นกลาง เร็วและเสถียรสูง ใช้ใน Data Center เช่น <em>VMware ESXi, Microsoft Hyper-V, KVM</em></li>
      <li><strong>Type 2 (Hosted Hypervisor):</strong> ติดตั้งเป็นโปรแกรมบน OS ปกติ (เช่น Windows/macOS) เหมาะกับงานทดสอบและเรียน เช่น <em>Oracle VirtualBox, VMware Workstation</em></li>
    </ul>
  </li>
  <li><strong>Container (เช่น Docker):</strong> จำลองเฉพาะชั้น Application และ Library โดย<strong>แชร์ OS Kernel ร่วมกับเครื่องแม่</strong> ทำให้ขนาดเล็กกว่า VM มาก เปิดใช้งานได้ภายในไม่กี่วินาทีและย้ายไปรันที่ไหนก็ได้ผลลัพธ์เหมือนกัน</li>
</ul>

<h3>ตารางเปรียบเทียบโมเดล Cloud Service (Shared Responsibility)</h3>
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
        <td>ทุกชั้น: ห้องเซิร์ฟเวอร์, Hardware, Network, OS, Runtime, App, Data</td>
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

<h3>รูปแบบการติดตั้ง Cloud (Deployment Models)</h3>
<ul>
  <li><strong>Public Cloud:</strong> ใช้โครงสร้างพื้นฐานร่วมกับองค์กรอื่นผ่านอินเทอร์เน็ต จ่ายตามการใช้งานจริง (Pay-as-you-go) ยืดหยุ่นสูง</li>
  <li><strong>Private Cloud:</strong> ใช้งานเฉพาะภายในองค์กรเดียว ควบคุมความปลอดภัยและข้อมูลชั้นความลับได้สูงสุด</li>
  <li><strong>Hybrid Cloud:</strong> ผสมผสาน Private + Public Cloud เชื่อมโยงข้อมูลหากันได้ เช่น เก็บข้อมูลทะเบียนราษฎร์ไว้ที่ Private Cloud แล้วให้หน้าเว็บรับจองคิวรันบน Public Cloud ช่วงคนใช้งานหนาแน่น</li>
  <li><strong>Community Cloud:</strong> แชร์ใช้เฉพาะกลุ่มองค์กรที่มีภารกิจคล้ายกัน เช่น คลาวด์กลางภาครัฐ (GDCC)</li>
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
        bodyHtml: `
<p>ในงานนักวิชาการคอมพิวเตอร์ปฏิบัติการ ข้อมูลทะเบียนประชาชนและแผนที่รูปแปลงต้องไม่สูญหายและล่มไม่ได้ ดังนั้น <strong>RAID (Redundant Array of Independent Disks)</strong> และ <strong>การสำรองข้อมูล (Backup)</strong> จึงออกสอบบ่อยเป็นอันดับต้นๆ ครับ</p>

<h3>เปรียบเทียบ RAID Levels ที่ออกสอบบ่อย</h3>
<div class="table-wrap">
  <table>
    <caption>ตารางสรุปคุณสมบัติ RAID 0, 1, 5, 6 และ RAID 10</caption>
    <thead>
      <tr>
        <th scope="col">ระดับ RAID</th>
        <th scope="col">เทคนิคหลัก</th>
        <th scope="col">จำนวนดิสก์ขั้นต่ำ</th>
        <th scope="col">ทนดิสก์เสียได้</th>
        <th scope="col">พื้นที่ใช้งานจริง (เมื่อใช้ดิสก์ N ลูกเท่ากัน)</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th scope="row">RAID 0</th>
        <td>Striping (แบ่งเขียนกระจาย)</td>
        <td>2 ลูก</td>
        <td><strong>0 ลูก (เสีย 1 พังหมด!)</strong></td>
        <td>100% (N ลูก) — เร็วสุด แต่ไม่เน้นความปลอดภัย</td>
      </tr>
      <tr>
        <th scope="row">RAID 1</th>
        <td>Mirroring (ทำสำเนาคู่แฝด)</td>
        <td>2 ลูก</td>
        <td>1 ลูก (ในคู่ 2 ลูก)</td>
        <td>50% (N / 2) — นิยมใช้ลง OS Server</td>
      </tr>
      <tr>
        <th scope="row">RAID 5</th>
        <td>Striping + Distributed Parity</td>
        <td>3 ลูก</td>
        <td>1 ลูก</td>
        <td>(N - 1) ลูก — สมดุลระหว่างความคุ้มค่าและความปลอดภัย</td>
      </tr>
      <tr>
        <th scope="row">RAID 6</th>
        <td>Striping + Dual Parity</td>
        <td>4 ลูก</td>
        <td>2 ลูก</td>
        <td>(N - 2) ลูก — ปลอดภัยสูงขึ้นสำหรับข้อมูลขนาดใหญ่</td>
      </tr>
      <tr>
        <th scope="row">RAID 10 (1+0)</th>
        <td>Mirror ก่อน แล้วค่อย Stripe</td>
        <td>4 ลูก (เลขคู่)</td>
        <td>1 ลูกต่อกลุ่ม Mirror</td>
        <td>50% (N / 2) — เร็วและทนทานมาก เหมาะกับ Database</td>
      </tr>
    </tbody>
  </table>
</div>

<h3>เปรียบเทียบ 3 รูปแบบการสำรองข้อมูล (Backup Types)</h3>
<div class="table-wrap">
  <table>
    <caption>เปรียบเทียบ Full, Incremental และ Differential Backup</caption>
    <thead>
      <tr>
        <th scope="col">รูปแบบ Backup</th>
        <th scope="col">สิ่งที่นำไปสำรอง</th>
        <th scope="col">ความเร็วตอนสำรอง &amp; พื้นที่</th>
        <th scope="col">ขั้นตอนตอนกู้คืน (Restore)</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th scope="row">Full Backup</th>
        <td>สำรองไฟล์ทั้งหมด 100% ทุกครั้ง</td>
        <td>ช้าที่สุด / ใช้พื้นที่มากที่สุด</td>
        <td>เร็วและง่ายสุด (ใช้ชุด Full ล่าสุดชุดเดียว)</td>
      </tr>
      <tr>
        <th scope="row">Incremental Backup</th>
        <td>สำรองเฉพาะไฟล์ที่เปลี่ยน <strong>นับจาก Backup ล่าสุด</strong> (ไม่ว่าจะเป็น Full หรือ Incremental)</td>
        <td>เร็วที่สุด / ใช้พื้นที่น้อยที่สุด</td>
        <td><strong>ช้าสุด:</strong> ต้องใช้ Full ล่าสุด + Incremental <em>ทุกชุด</em> ตั้งแต่วันแรกเรียงตามลำดับ</td>
      </tr>
      <tr>
        <th scope="row">Differential Backup</th>
        <td>สำรองเฉพาะไฟล์ที่เปลี่ยน <strong>นับจาก Full Backup ครั้งล่าสุด</strong></td>
        <td>ปานกลาง (ขนาดโตขึ้นเรื่อยๆ จนกว่าจะทำ Full ใหม่)</td>
        <td><strong>เร็วปานกลาง:</strong> ใช้แค่ <em>Full ล่าสุด + Differential ชุดสุดท้าย</em> แค่ 2 ชุดเท่านั้น</td>
      </tr>
    </tbody>
  </table>
</div>

<div class="callout callout-warn">
  <strong><i class="fa-solid fa-triangle-exclamation" aria-hidden="true"></i> กฎ 3-2-1 Backup Strategy:</strong>
  หลักสากลสำหรับป้องกัน Ransomware คือ เก็บข้อมูลอย่างน้อย <strong>3 ชุด</strong> (ต้นฉบับ 1 + สำรอง 2), บนสื่อต่างชนิดกัน <strong>2 ประเภท</strong> (เช่น NAS กับ Tape/External HDD), และต้องมีอย่างน้อย <strong>1 ชุดอยู่คนละสถานที่หรือตัดขาดจากเครือข่าย (Off-site / Air-gapped)</strong>
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
