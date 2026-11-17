(function (global) {
  'use strict';

  if (!global.GOV_PREP || typeof global.GOV_PREP.registerLesson !== 'function') {
    console.error('[CORE-04] GOV_PREP.registerLesson not found');
    return;
  }

  global.GOV_PREP.registerLesson({
    id: 'core-4-network-security',
    code: 'CORE-04',
    category: 'core',
    agencyId: null,
    order: 4,
    title: 'เครือข่ายคอมพิวเตอร์ ความมั่นคงไซเบอร์ และกฎหมาย IT',
    shortTitle: 'เครือข่าย ความปลอดภัย & กฎหมาย',
    subtitle: 'สรุปครบ OSI 7 Layers, TCP/IP, Port สำคัญ, IP/Subnet, Firewall/VPN, ภัยไซเบอร์, พ.ร.บ.คอมฯ 2560 (ม.5-26) และ PDPA 2562',
    estimatedMinutes: 24,
    icon: 'fa-solid fa-shield-halved',
    heroVisual: {
      image: 'assets/images/core-network-topology.png',
      alt: 'แผนผังเครือข่ายคอมพิวเตอร์ระดับองค์กรแสดงเส้นทางอินเทอร์เน็ต ไฟร์วอลล์ โซน DMZ สวิตช์หลัก และการเชื่อมต่อ VPN ไปยังสาขา',
      caption: 'สถาปัตยกรรมเครือข่ายปลอดภัย (Defense-in-Depth): แยกโซน DMZ และใช้ VPN เชื่อมต่อสำนักงานสาขาอย่างมั่นคงปลอดภัย',
      aspectRatio: '16 / 9',
      width: 1200,
      height: 675,
      prompt: 'Clean flat isometric tech illustration in Cadastral GIS & Tech Studio palette (emerald #0F5E4D, amber #D97706, warm white #F4F7F6). Enterprise government network topology diagram: cloud internet gateway connected through dual brick-wall Firewalls into a DMZ web server zone and a secure internal Core Switch with Database servers, plus an encrypted amber VPN tunnel bridge connecting to regional branch offices. Crisp modern vector style.'
    },
    summaryTakeaways: [
      'ท่อง OSI 7 Layers จากล่างขึ้นบน (1→7): Physical, Data Link, Network, Transport, Session, Presentation, Application',
      'Layer 2 (Switch/MAC/Frame) vs Layer 3 (Router/IP/Packet) และ Port สำคัญ เช่น HTTP 80, HTTPS 443, SSH 22, DNS 53, RDP 3389',
      'Subnet /24 (255.255.255.0) มี Host ใช้งานได้ 254 เครื่อง และ Private IPv4 มี 3 ช่วง: 10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16',
      'พ.ร.บ.คอมพิวเตอร์ 2560: ม.5 เข้าถึงระบบ, ม.7 เข้าถึงข้อมูล, ม.9 แก้ไข/ทำลายข้อมูล, ม.10 ขัดขวางระบบ, ม.11 สแปม, ม.12 โครงสร้างพื้นฐาน, ม.14 นำเข้าข้อมูลเท็จ (ย้ายหมิ่นประมาทไปประมวลอาญา), ม.16 ตัดต่อภาพ, ม.26 เก็บ Log >= 90 วัน',
      'PDPA 2562: แยก Data Subject (เจ้าของข้อมูล) vs Data Controller (ผู้ควบคุม) vs Data Processor (ผู้ประมวลผลตามคำสั่ง) และข้อมูลอ่อนไหว ม.26 ต้องขอความยินยอมโดยชัดแจ้ง'
    ],
    sections: [
      {
        id: 'osi-tcpip',
        title: '1. แบบจำลอง OSI 7 Layers เทียบ TCP/IP 4 Layers และ Port สำคัญ',
        analogyBox: {
          title: 'เปรียบเทียบให้เห็นภาพ: ระบบส่งพัสดุไปรษณีย์จากโต๊ะสู่ปลายทาง',
          body: '• <strong>Layer 7–5 (Application / Presentation / Session):</strong> คุณเขียนจดหมาย (Data) แปลงภาษา/เข้ารหัส ใส่ซอง และจ่าหน้าถึงผู้รับ<br>• <strong>Layer 4 (Transport):</strong> เลือกส่งแบบ "EMS มีใบเซ็นรับแน่นอน" (<strong>TCP</strong>) หรือส่งแบบ "ไปรษณียบัตรเร็วแต่ไม่เช็กปลายทาง" (<strong>UDP</strong>) แปะหมายเลข Port ที่ซอง<br>• <strong>Layer 3 (Network):</strong> เขียนรหัสไปรษณีย์ปลายทาง (<strong>IP Address</strong>) เพื่อให้บุรุษไปรษณีย์ <strong>Router</strong> หาเส้นทางข้ามจังหวัด<br>• <strong>Layer 2 (Data Link):</strong> ติดป้ายทะเบียนรถขนส่งช่วงสั้นๆ ภายในซอย (<strong>MAC Address</strong> ผ่าน <strong>Switch</strong>)<br>• <strong>Layer 1 (Physical):</strong> ถนน สายเคเบิลใยแก้วนำแสง หรือคลื่นวิทยุ Wi-Fi ที่วิ่งส่งสัญญาณจริง (0 และ 1)'
        },
        bodyHtml: `
<p>สูตรจำ <strong>OSI 7 Layers จากล่างขึ้นบน (Layer 1 → Layer 7)</strong> ที่ใช้ได้ผลจริงในห้องสอบ:<br>
ภาษาอังกฤษ: <strong>"Please Do Not Throw Sausage Pizza Away"</strong><br>
ภาษาไทย: <strong>"พะ (1) - ดา (2) - เน็ต (3) - ทาน (4) - เซส (5) - พรี (6) - แอป (7)"</strong></p>

<div class="table-wrap">
  <table>
    <caption>เปรียบเทียบ OSI 7 Layers, TCP/IP 4 Layers, หน่วยข้อมูล (PDU) และอุปกรณ์/โปรโตคอล</caption>
    <thead>
      <tr>
        <th scope="col">ชั้น OSI (7→1)</th>
        <th scope="col">ชั้น TCP/IP (4 ชั้น)</th>
        <th scope="col">หน่วยข้อมูล (PDU)</th>
        <th scope="col">อุปกรณ์และโปรโตคอลสำคัญ (จุดออกสอบ!)</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th scope="row">7. Application</th>
        <td rowspan="3">4. Application</td>
        <td>Data</td>
        <td>โปรแกรมติดต่อผู้ใช้: HTTP, HTTPS, FTP, DNS, DHCP, SMTP, SSH</td>
      </tr>
      <tr>
        <th scope="row">6. Presentation</th>
        <td>Data</td>
        <td>แปลงรูปแบบข้อมูล บีบอัด และ<strong>เข้ารหัส (SSL/TLS Encryption)</strong>, JPEG, UTF-8</td>
      </tr>
      <tr>
        <th scope="row">5. Session</th>
        <td>Data</td>
        <td>เปิด-รักษา-ปิดเซสชันการสื่อสารระหว่างเครื่อง (เช่น RPC, Session Token)</td>
      </tr>
      <tr>
        <th scope="row">4. Transport</th>
        <td>3. Transport</td>
        <td><strong>Segment (TCP) / Datagram (UDP)</strong></td>
        <td><strong>TCP</strong> (เชื่อถือได้ ทำ 3-Way Handshake: SYN → SYN-ACK → ACK) vs <strong>UDP</strong> (เร็ว ไม่เช็กตอบรับ) + <strong>Port Number</strong></td>
      </tr>
      <tr>
        <th scope="row">3. Network</th>
        <td>2. Internet</td>
        <td><strong>Packet</strong></td>
        <td><strong>Router</strong>, Layer 3 Switch | ระบุตัวตนด้วย <strong>IP Address</strong>, หาเส้นทาง (Routing), ICMP (<code>ping</code>)</td>
      </tr>
      <tr>
        <th scope="row">2. Data Link</th>
        <td rowspan="2">1. Network Access</td>
        <td><strong>Frame</strong></td>
        <td><strong>Switch</strong>, Bridge, NIC | ระบุตัวตนด้วย <strong>MAC Address (48-bit)</strong>, ARP, VLAN</td>
      </tr>
      <tr>
        <th scope="row">1. Physical</th>
        <td><strong>Bit</strong></td>
        <td>Hub, Repeater, สาย UTP (RJ45), Fiber Optic, คลื่น Wi-Fi (ส่ง 0/1)</td>
      </tr>
    </tbody>
  </table>
</div>

<h3>ตาราง Port Number &amp; Protocol ที่ออกสอบแทบทุกสนาม</h3>
<div class="table-wrap">
  <table>
    <caption>พอร์ตมาตรฐาน (Well-Known &amp; Registered Ports) ที่นักวิชาการคอมพิวเตอร์ต้องจำได้</caption>
    <thead>
      <tr>
        <th scope="col">Port</th>
        <th scope="col">Protocol / Service</th>
        <th scope="col">Transport</th>
        <th scope="col">หน้าที่และการใช้งาน</th>
      </tr>
    </thead>
    <tbody>
      <tr><td><code>20 / 21</code></td><td>FTP</td><td>TCP</td><td>รับ-ส่งไฟล์ (20 = Data, 21 = Control; ไม่เข้ารหัส)</td></tr>
      <tr><td><code>22</code></td><td><strong>SSH / SFTP</strong></td><td>TCP</td><td>รีโมตจัดการ Linux Server และโอนไฟล์แบบเข้ารหัสปลอดภัย</td></tr>
      <tr><td><code>23</code></td><td>Telnet</td><td>TCP</td><td>รีโมตแบบดั้งเดิม ไม่เข้ารหัส (ไม่ปลอดภัย ไม่ควรใช้งาน)</td></tr>
      <tr><td><code>25</code></td><td>SMTP</td><td>TCP</td><td>ส่งอีเมลขาออก (Mail Transfer)</td></tr>
      <tr><td><code>53</code></td><td><strong>DNS</strong></td><td>UDP / TCP</td><td>แปลงชื่อโดเมนเป็น IP Address (UDP ใช้ Query ปกติ, TCP ใช้ Zone Transfer)</td></tr>
      <tr><td><code>67 / 68</code></td><td>DHCP</td><td>UDP</td><td>แจก IP Address อัตโนมัติ (กระบวนการ DORA: Discover-Offer-Request-Ack)</td></tr>
      <tr><td><code>80</code></td><td>HTTP</td><td>TCP</td><td>เว็บปกติ (ไม่เข้ารหัส Plaintext)</td></tr>
      <tr><td><code>443</code></td><td><strong>HTTPS</strong></td><td>TCP</td><td>เว็บเข้ารหัสผ่าน SSL/TLS (มาตรฐานเว็บราชการยุคใหม่)</td></tr>
      <tr><td><code>161 / 162</code></td><td>SNMP</td><td>UDP</td><td>เฝ้าระวังและมอนิเตอร์สถานะอุปกรณ์เครือข่าย (161 Query, 162 Trap)</td></tr>
      <tr><td><code>1433 / 3306 / 5432</code></td><td>Database Ports</td><td>TCP</td><td>MS SQL Server (<code>1433</code>), MySQL/MariaDB (<code>3306</code>), PostgreSQL (<code>5432</code>)</td></tr>
      <tr><td><code>3389</code></td><td><strong>RDP</strong></td><td>TCP / UDP</td><td>Remote Desktop Protocol สำหรับรีโมตหน้าจอ Windows</td></tr>
    </tbody>
  </table>
</div>`
      },
      {
        id: 'ip-routing-defense',
        title: '2. IP Address, Subnet Mask, DNS, Firewall และ VPN',
        bodyHtml: `
<p>เมื่ออุปกรณ์คุยกันข้ามเครือข่ายต้องมี <strong>IP Address</strong> เป็นบ้านเลขที่ โดยแบ่งเป็น 2 รุ่นที่ข้อสอบชอบเปรียบเทียบ:</p>
<ul>
  <li><strong>IPv4:</strong> ขนาด <strong>32 บิต</strong> (แบ่งเป็น 4 Octet คั่นด้วยจุด เช่น <code>192.168.1.10</code> แต่ละช่องค่า 0–255)</li>
  <li><strong>IPv6:</strong> ขนาด <strong>128 บิต</strong> เขียนด้วยเลขฐานสิบหก (Hexadecimal) คั่นด้วยโคลอน เช่น <code>2001:db8::1</code> สร้างมาแก้ปัญหา IPv4 ขาดแคลน</li>
</ul>

<h3>ช่วง Private IPv4 (ใช้ภายในองค์กร ออกเน็ตตรงไม่ได้ต้องผ่าน NAT) และสูตร Subnet เร็ว</h3>
<ul>
  <li><strong>Class A Private:</strong> <code>10.0.0.0 – 10.255.255.255</code> (<code>10.0.0.0/8</code>)</li>
  <li><strong>Class B Private:</strong> <code>172.16.0.0 – 172.31.255.255</code> (<code>172.16.0.0/12</code>)</li>
  <li><strong>Class C Private:</strong> <code>192.168.0.0 – 192.168.255.255</code> (<code>192.168.0.0/16</code>)</li>
  <li><strong>Loopback Address:</strong> <code>127.0.0.1</code> (ใช้ทดสอบการ์ดแลนและเซิร์ฟเวอร์ในเครื่องตัวเอง <code>localhost</code>)</li>
</ul>

<div class="callout callout-tip">
  <strong><i class="fa-solid fa-calculator" aria-hidden="true"></i> สูตรลัดคำนวณจำนวนเครื่อง (Usable Hosts) จาก CIDR:</strong>
  เอา <code>32 - เลข CIDR</code> ได้เป็นจำนวนบิตของ Host (<code>h</code>) แล้วใช้สูตร <strong><code>2^h - 2</code></strong> (ลบ 2 ตัวคือ Network Address ตัวแรก กับ Broadcast Address ตัวสุดท้าย)<br>
  <em>ตัวอย่าง:</em> <code>192.168.10.0/24</code> (Subnet Mask <code>255.255.255.0</code>) มี <code>h = 32 - 24 = 8</code> บิต → ใช้งานได้จริง <strong><code>2^8 - 2 = 254</code> เครื่อง</strong>! หากเป็น <code>/25</code> มี <code>h = 7</code> → <code>2^7 - 2 = 126</code> เครื่อง
</div>

<h3>อุปกรณ์และกลไกป้องกันเครือข่ายหน่วยงานราชการ</h3>
<ul>
  <li><strong>Firewall:</strong> กำแพงกั้นกรอง Traffic เข้า-ออก (Packet Filtering, Stateful Inspection, หรือ <strong>WAF — Web Application Firewall</strong> ที่ช่วยกรอง SQL Injection / XSS หน้าเว็บ)</li>
  <li><strong>IDS vs IPS:</strong> <strong>IDS (Detection)</strong> ตรวจจับและ<em>แจ้งเตือน</em>อย่างเดียว ส่วน <strong>IPS (Prevention)</strong> ตรวจจับและ<em>บล็อก</em>การโจมตีอัตโนมัติแบบ Real-time</li>
  <li><strong>DMZ (Demilitarized Zone):</strong> โซนกึ่งกลางสำหรับวาง Web Server / e-QLands ที่เปิดให้ประชาชนจากอินเทอร์เน็ตเข้าถึงได้ โดยแยกออกจากเครือข่ายภายใน (Internal LAN &amp; Database) เพื่อไม่ให้แฮกเกอร์ทะลุถึงฐานข้อมูลหลักโดยตรง</li>
  <li><strong>VPN (Virtual Private Network):</strong> สร้างอุโมงค์เข้ารหัส (Encrypted Tunnel เช่น IPSec / SSL VPN) ผ่านอินเทอร์เน็ตสาธารณะ เพื่อให้สำนักงานที่ดินสาขาหรือเจ้าหน้าที่ทำงานจากภายนอกเชื่อมต่อเข้าฐานข้อมูลส่วนกลางได้อย่างปลอดภัย</li>
</ul>`,
        mermaid: {
          title: 'สถาปัตยกรรมเครือข่ายปลอดภัย (Network Topology) หน่วยงานราชการ',
          caption: 'แยกโซน DMZ สำหรับบริการประชาชนออกจาก Internal Network และใช้ VPN เชื่อมต่อสำนักงานสาขา',
          code: `flowchart LR
  NET(("อินเทอร์เน็ตภายนอก")) --> FW1["Perimeter Firewall"]
  FW1 --> DMZ["DMZ Zone (Web Server / e-QLands)"]
  FW1 --> IPS["Internal Firewall & IPS"]
  IPS --> CORE["Core Switch & LAN ส่วนกลาง"]
  CORE --> DB[("Database Server ทะเบียนที่ดิน")]
  FW1 -.->|"IPSec VPN Tunnel (เข้ารหัส)"| BR["สำนักงานที่ดินจังหวัดและสาขา"]`
        }
      },
      {
        id: 'cyber-threats',
        title: '3. ภัยคุกคามไซเบอร์ (Phishing, Malware, Ransomware) และหลัก CIA Triad',
        visualCard: {
          type: 'image',
          image: 'assets/images/core-cyber-shield.png',
          alt: 'ภาพประกอบโล่ป้องกันภัยไซเบอร์แสดงหลัก CIA Triad การป้องกัน Phishing, Ransomware และโครงสร้างความปลอดภัยข้อมูล',
          caption: 'เกราะป้องกันข้อมูลภาครัฐ: ผสานหลัก CIA Triad (ลับ-ถูกต้อง-พร้อมใช้) การเข้ารหัส และการป้องกันมัลแวร์เรียกค่าไถ่',
          prompt: 'Clean flat isometric cybersecurity illustration in Cadastral GIS & Tech Studio palette (emerald #0F5E4D, amber #D97706, slate #122026). A glowing emerald digital shield protecting government land registry servers against phishing hooks, ransomware padlocks, and malware bugs, surrounded by three pillars labeled Confidentiality, Integrity, and Availability, plus a 3-2-1 backup vault. Crisp modern editorial tech vector art.'
        },
        bodyHtml: `
<p>รากฐานของความมั่นคงปลอดภัยสารสนเทศ (Information Security) ทุกมาตรฐาน (เช่น ISO/IEC 27001 และ พ.ร.บ. ไซเบอร์) ตั้งอยู่บนเสาหลัก <strong>CIA Triad</strong>:</p>
<ul>
  <li><strong>C — Confidentiality (ความลับ):</strong> ข้อมูลต้องถูกเปิดเผยเฉพาะผู้มีสิทธิ์เท่านั้น ป้องกันด้วย <em>Encryption (เข้ารหัส), Access Control, MFA</em></li>
  <li><strong>I — Integrity (ความถูกต้องครบถ้วน):</strong> ข้อมูลต้องไม่ถูกแก้ไขดัดแปลงโดยมิชอบระหว่างเก็บหรือส่ง ป้องกันด้วย <em>Hashing (SHA-256), Digital Signature</em></li>
  <li><strong>A — Availability (ความพร้อมใช้งาน):</strong> ระบบและข้อมูลต้องพร้อมให้บริการผู้มีสิทธิ์ตลอดเวลาที่ต้องการ ป้องกันด้วย <em>Redundancy/RAID, Load Balancer, Backup, Anti-DDoS</em></li>
</ul>

<h3>ตารางภัยคุกคามไซเบอร์และวิธีรับมือที่ออกสอบประจำ</h3>
<div class="table-wrap">
  <table>
    <caption>จำแนกภัยคุกคามทางไซเบอร์ ช่องทางโจมตี และแนวทางป้องกัน</caption>
    <thead>
      <tr>
        <th scope="col">ภัยคุกคาม</th>
        <th scope="col">กลไกการทำงาน</th>
        <th scope="col">วิธีป้องกันหลัก</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th scope="row">Phishing / Spear Phishing</th>
        <td>หลอกลวงทางจิตวิทยา (Social Engineering) ส่งอีเมล/SMS ปลอมเป็นหน่วยงานให้คลิกลิงก์กรอกรหัสผ่าน (Spear = เจาะจงเป้าหมาย)</td>
        <td>ตรวจสอบโดเมนจริงก่อนคลิก, เปิดใช้ <strong>MFA (Multi-Factor Authentication)</strong>, อบรมเจ้าหน้าที่</td>
      </tr>
      <tr>
        <th scope="row">Virus vs Worm vs Trojan</th>
        <td><strong>Virus</strong> ต้องเกาะไฟล์และรอคนกดเปิด; <strong>Worm</strong> แพร่กระจายเองผ่านเครือข่ายได้โดยไม่ต้องอาศัยคน; <strong>Trojan</strong> ปลอมเป็นโปรแกรมดีเพื่อแอบเปิดประตูหลัง</td>
        <td>อัปเดต OS Patch สม่ำเสมอ, ติดตั้ง Endpoint Detection &amp; Response (EDR)</td>
      </tr>
      <tr>
        <th scope="row">Ransomware</th>
        <td>มัลแวร์เรียกค่าไถ่ เข้าล็อก/เข้ารหัสไฟล์ทั้งหมดในเครื่องและ Share Drive จนเปิดใช้งานไม่ได้</td>
        <td><strong>ห้ามจ่ายค่าไถ่</strong> (ไม่รับประกันได้คืน), กู้คืนด้วย <strong>3-2-1 Offline Backup</strong>, ปิดพอร์ต SMB ที่ไม่จำเป็น</td>
      </tr>
      <tr>
        <th scope="row">DDoS Attack</th>
        <td>ระดมส่ง Request จากเครื่องซอมบี้ (Botnet) มหาศาลจนเซิร์ฟเวอร์ล่ม (ทำลาย <strong>Availability</strong>)</td>
        <td>ใช้ CDN / Anti-DDoS Scrubbing, Rate Limiting, Load Balancer</td>
      </tr>
      <tr>
        <th scope="row">SQL Injection &amp; XSS</th>
        <td><strong>SQLi:</strong> แทรกคำสั่ง SQL ผ่านช่องกรอกข้อมูลเพื่อขโมย/แก้ฐานข้อมูล; <strong>XSS:</strong> ฝัง JavaScript ร้ายบนหน้าเว็บเพื่อขโมย Cookie</td>
        <td>ใช้ <strong>Prepared Statement / Parameterized Query</strong>, ตรวจกรอง Input/Output Encoding, ใช้ WAF</td>
      </tr>
      <tr>
        <th scope="row">Man-in-the-Middle (MitM)</th>
        <td>ดักฟังหรือปลอมตัวคั่นกลางระหว่างผู้ใช้กับเซิร์ฟเวอร์ (เช่น Wi-Fi สาธารณะปลอม)</td>
        <td>บังคับใช้ HTTPS (TLS), ตรวจใบรับรอง Digital Certificate, ใช้ VPN</td>
      </tr>
    </tbody>
  </table>
</div>

<h3>สรุปเรื่องการเข้ารหัส (Cryptography) แบบสั้นแต่แม่น</h3>
<ul>
  <li><strong>Symmetric Encryption (เช่น AES-256):</strong> ใช้กุญแจ <em>ดอกเดียวกัน</em> ทั้งเข้ารหัสและถอดรหัส → ทำงานเร็วมาก เหมาะกับเข้ารหัสไฟล์ขนาดใหญ่</li>
  <li><strong>Asymmetric Encryption (เช่น RSA, ECC):</strong> ใช้กุญแจ <em>คู่</em> (<strong>Public Key</strong> แจกทุกคน และ <strong>Private Key</strong> เก็บไว้คนเดียว) → ถ้าอยากส่งความลับให้ผู้รับ ให้เข้ารหัสด้วย <em>Public Key ของผู้รับ</em>; ถ้าอยากทำ <strong>Digital Signature</strong> เพื่อยืนยันว่าเราเป็นคนส่งจริง ให้เซ็นด้วย <em>Private Key ของผู้ส่ง</em>!</li>
  <li><strong>Hash Function (เช่น SHA-256):</strong> แปลงข้อมูลเป็นค่าลายนิ้วมือทางเดียว (One-way) ถอดย้อนกลับเป็นข้อความเดิมไม่ได้ ใช้เก็บรหัสผ่านและตรวจความถูกต้องของไฟล์ (Integrity)</li>
</ul>`
      },
      {
        id: 'it-laws',
        title: '4. กฎหมายไอที: พ.ร.บ. คอมพิวเตอร์ฯ (ฉบับที่ 2) พ.ศ. 2560 และ PDPA พ.ศ. 2562',
        bodyHtml: `
<p>ส่วนนี้คือ <strong>"คะแนนช่วย" ที่ห้ามพลาดเด็ดขาด</strong> เพราะออกสอบทั้งภาค ก. ภาค ข. และภาคเฉพาะตำแหน่งราชการทุกกรม! มาสรุปตัวบทกฎหมายให้แม่นยำ 100% ตามกฎหมายฉบับบังคับใช้จริงครับ</p>

<h3>ส่วนที่ 1: พ.ร.บ. ว่าด้วยการกระทำความผิดเกี่ยวกับคอมพิวเตอร์ พ.ศ. 2550 และ (ฉบับที่ 2) พ.ศ. 2560</h3>
<div class="table-wrap">
  <table>
    <caption>สรุปมาตราสำคัญ พ.ร.บ. คอมพิวเตอร์ฯ พ.ศ. 2560 ที่ออกสอบเป็นประจำ</caption>
    <thead>
      <tr>
        <th scope="col">มาตรา</th>
        <th scope="col">ฐานความผิดและสาระสำคัญ</th>
        <th scope="col">อัตราโทษ / จุดเน้นที่ต้องจำ</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th scope="row">มาตรา 5</th>
        <td>เข้าถึง <strong>ระบบ</strong> คอมพิวเตอร์โดยมิชอบ (มีมาตรการป้องกันไว้แต่ไปแอบเจาะเข้าใช้)</td>
        <td>จำคุกไม่เกิน <strong>6 เดือน</strong> หรือปรับไม่เกิน <strong>10,000 บาท</strong> หรือทั้งจำทั้งปรับ</td>
      </tr>
      <tr>
        <th scope="row">มาตรา 6</th>
        <td>ล่วงรู้มาตรการป้องกันการเข้าถึงระบบฯ แล้วนำไปเปิดเผยโดยมิชอบ</td>
        <td>จำคุกไม่เกิน <strong>1 ปี</strong> หรือปรับไม่เกิน <strong>20,000 บาท</strong> หรือทั้งจำทั้งปรับ</td>
      </tr>
      <tr>
        <th scope="row">มาตรา 7</th>
        <td>เข้าถึง <strong>ข้อมูล</strong> คอมพิวเตอร์โดยมิชอบ (เช่น แอบล็อกอินเข้าไปเปิดดูข้อมูลลับในระบบ)</td>
        <td>จำคุกไม่เกิน <strong>2 ปี</strong> หรือปรับไม่เกิน <strong>40,000 บาท</strong> หรือทั้งจำทั้งปรับ</td>
      </tr>
      <tr>
        <th scope="row">มาตรา 9</th>
        <td>ทำให้เสียหาย ทำลาย แก้ไข เปลี่ยนแปลง หรือเพิ่มเติม <strong>ข้อมูล</strong> คอมพิวเตอร์โดยมิชอบ</td>
        <td>จำคุกไม่เกิน <strong>5 ปี</strong> หรือปรับไม่เกิน <strong>100,000 บาท</strong> หรือทั้งจำทั้งปรับ</td>
      </tr>
      <tr>
        <th scope="row">มาตรา 10</th>
        <td>กระทำการใดๆ เพื่อให้การทำงานของ <strong>ระบบ</strong> คอมพิวเตอร์ผู้อื่นถูกระงับ ชะลอ ขัดขวาง หรือรบกวน (เช่น DDoS)</td>
        <td>จำคุกไม่เกิน <strong>5 ปี</strong> หรือปรับไม่เกิน <strong>100,000 บาท</strong> หรือทั้งจำทั้งปรับ</td>
      </tr>
      <tr>
        <th scope="row">มาตรา 11</th>
        <td><strong>สแปม (Spam — แก้ไขเพิ่มใหม่ใน พ.ศ. 2560):</strong> ส่งข้อมูลหรืออีเมลก่อกวนโดยปกปิดแหล่งที่มา หรือไม่เปิดโอกาสให้ผู้รับแจ้งยกเลิกไม่รับได้โดยง่าย</td>
        <td>ปรับไม่เกิน <strong>200,000 บาท</strong> (กรณีส่งโดยไม่เปิดช่อง Unsubscribe)</td>
      </tr>
      <tr>
        <th scope="row">มาตรา 12</th>
        <td>การกระทำตาม ม.9 หรือ ม.10 ต่อระบบที่เกี่ยวกับ <strong>ความมั่นคงปลอดภัยของประเทศ ความปลอดภัยสาธารณะ ความมั่นคงทางเศรษฐกิจ หรือบริการสาธารณะ</strong> (Critical Infrastructure)</td>
        <td>โทษหนักขึ้นมาก: จำคุก <strong>1–7 ปี</strong> และปรับ <strong>20,000–140,000 บาท</strong> (หากก่อความเสียหายร้ายแรง 3–15 ปี)</td>
      </tr>
      <tr>
        <th scope="row">มาตรา 14</th>
        <td>นำเข้าข้อมูลปลอม/เท็จที่น่าจะเกิดความเสียหายแก่ประชาชน ความมั่นคง เศรษฐกิจ หรือข้อมูลลามก<br><strong>ข้อควรจำ (แก้ไขปี 2560):</strong> <em>ความผิดฐานหมิ่นประมาทถูกตัดออกจาก ม.14(1) แล้ว ให้ไปดำเนินคดีตามประมวลกฎหมายอาญาแทน!</em></td>
        <td>จำคุกไม่เกิน <strong>5 ปี</strong> หรือปรับไม่เกิน <strong>100,000 บาท</strong> (กรณีทุจริตหลอกลวง/มั่นคง)</td>
      </tr>
      <tr>
        <th scope="row">มาตรา 16</th>
        <td>นำเข้าภาพผู้อื่นที่สร้างขึ้น <strong>ตัดต่อ เติม หรือดัดแปลง</strong> ทำให้ผู้อื่นเสียชื่อเสียง อับอาย ถูกดูหมิ่น (คุ้มครองรวมถึงผู้เสียชีวิตด้วย)</td>
        <td>จำคุกไม่เกิน <strong>3 ปี</strong> และปรับไม่เกิน <strong>200,000 บาท</strong> (ยกเว้นกระทำโดยสุจริตตามวรรคท้าย)</td>
      </tr>
      <tr>
        <th scope="row">มาตรา 26</th>
        <td>ผู้ให้บริการ (รวมถึงองค์กร/หน่วยงานรัฐที่จัดให้มีเครือข่ายหรือ Wi-Fi) ต้องเก็บรักษาข้อมูลจราจรทางคอมพิวเตอร์ (<strong>Log File</strong>)</td>
        <td>เก็บไว้ <strong>ไม่น้อยกว่า 90 วัน</strong> (พนักงานเจ้าหน้าที่สั่งเก็บเพิ่มกรณีจำเป็นได้ไม่เกิน <strong>2 ปี</strong>) ฝ่าฝืนปรับไม่เกิน 500,000 บาท</td>
      </tr>
    </tbody>
  </table>
</div>

<h3>ส่วนที่ 2: พ.ร.บ. คุ้มครองข้อมูลส่วนบุคคล พ.ศ. 2562 (PDPA)</h3>
<p><strong>PDPA (Personal Data Protection Act)</strong> คุ้มครองข้อมูลของบุคคลธรรมดาที่มีชีวิตอยู่ (ไม่รวมนิติบุคคลและผู้เสียชีวิต) โดยมีตัวละครหลักที่ข้อสอบถามทุกครั้ง:</p>
<ul>
  <li><strong>Data Subject (เจ้าของข้อมูลส่วนบุคคล):</strong> บุคคลธรรมดาที่เป็นเจ้าของข้อมูล เช่น ประชาชนผู้มายื่นคำขอจดทะเบียนที่ดิน</li>
  <li><strong>Data Controller (ผู้ควบคุมข้อมูลส่วนบุคคล):</strong> บุคคลหรือนิติบุคคลที่มีอำนาจหน้าที่<em>ตัดสินใจ</em>เกี่ยวกับการเก็บรวบรวม ใช้ หรือเปิดเผยข้อมูลส่วนบุคคล เช่น <strong>กรมที่ดิน</strong></li>
  <li><strong>Data Processor (ผู้ประมวลผลข้อมูลส่วนบุคคล):</strong> บุคคลหรือนิติบุคคลที่ดำเนินการเก็บ ใช้ หรือเปิดเผยข้อมูล<em>ตามคำสั่งหรือในนามของผู้ควบคุมข้อมูลส่วนบุคคล</em> (ไม่ได้ตัดสินใจเอง) เช่น บริษัท Outsource ที่รับจ้างดูแลระบบ Server/Cloud ให้หน่วยงาน</li>
  <li><strong>DPO (Data Protection Officer):</strong> เจ้าหน้าที่คุ้มครองข้อมูลส่วนบุคคล — หน่วยงานของรัฐตามประกาศคณะกรรมการฯ ต้องแต่งตั้ง DPO เพื่อกำกับดูแลและให้คำปรึกษา</li>
</ul>

<div class="table-wrap">
  <table>
    <caption>เปรียบเทียบข้อมูลส่วนบุคคลทั่วไป (มาตรา 6) vs ข้อมูลส่วนบุคคลอ่อนไหว (มาตรา 26)</caption>
    <thead>
      <tr>
        <th scope="col">ประเภทข้อมูลตาม PDPA</th>
        <th scope="col">ตัวอย่างข้อมูล</th>
        <th scope="col">หลักเกณฑ์การเก็บรวบรวม/ใช้</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th scope="row">Personal Data<br>(ข้อมูลส่วนบุคคลทั่วไป)</th>
        <td>ชื่อ-นามสกุล, เลขบัตรประชาชน, ที่อยู่, เบอร์โทรศัพท์, อีเมล, รูปถ่าย, ทะเบียนรถ, IP Address/Cookie ที่ระบุตัวบุคคลได้</td>
        <td>เก็บใช้ได้โดยอาศัยฐานกฎหมาย (Lawful Basis) เช่น ความยินยอม (Consent), หน้าที่ตามกฎหมาย (Legal Obligation), ภารกิจเพื่อประโยชน์สาธารณะ/อำนาจรัฐ (Public Task), สัญญา</td>
      </tr>
      <tr>
        <th scope="row">Sensitive Personal Data<br>(ข้อมูลอ่อนไหว มาตรา 26)</th>
        <td>เชื้อชาติ, เผ่าพันธุ์, ความคิดเห็นทางการเมือง, ความเชื่อในลัทธิ/ศาสนา, พฤติกรรมทางเพศ, ประวัติอาชญากรรม, <strong>ข้อมูลสุขภาพ</strong>, ความพิการ, ข้อมูลสหภาพแรงงาน, พันธุกรรม, <strong>ข้อมูลชีวภาพ (Biometric เช่น ลายนิ้วมือ/สแกนใบหน้า)</strong></td>
        <td>ห้ามเก็บรวบรวมเด็ดขาด เว้นแต่ได้รับ <strong>ความยินยอมโดยชัดแจ้ง (Explicit Consent)</strong> หรือเข้าข้อยกเว้นเฉพาะตามกฎหมาย (เช่น ป้องกันอันตรายต่อชีวิต หรือประโยชน์สาธารณะสำคัญตาม ม.26)</td>
      </tr>
    </tbody>
  </table>
</div>

<div class="callout callout-info">
  <strong><i class="fa-solid fa-gavel" aria-hidden="true"></i> สิทธิของเจ้าของข้อมูล (Data Subject Rights) ตาม PDPA:</strong>
  สิทธิได้รับแจ้งรายละเอียด (Right to be Informed), สิทธิขอเข้าถึงและขอรับสำเนา (Access), สิทธิขอโอนย้ายข้อมูล (Data Portability), สิทธิคัดค้าน (Object), สิทธิขอให้ลบ/ทำลาย (Erasure / Right to be Forgotten), สิทธิขอระงับการใช้ (Restrict), และสิทธิขอแก้ไขข้อมูลให้ถูกต้อง (Rectification)
</div>`
      }
    ],
    quiz: [
      {
        id: 'q-core4-1',
        question: 'อุปกรณ์ Router ทำหน้าที่หลักในการเลือกเส้นทางด้วย IP Address อยู่ใน Layer ใดของแบบจำลอง OSI และมีหน่วยข้อมูล (PDU) เรียกว่าอะไร?',
        options: [
          'Layer 2 (Data Link) — Frame',
          'Layer 3 (Network) — Packet',
          'Layer 4 (Transport) — Segment',
          'Layer 1 (Physical) — Bit'
        ],
        correctIndex: 1,
        explanation: {
          summary: 'Router ทำงานที่ Layer 3 (Network Layer) โดยอ้างอิง IP Address และส่งข้อมูลในหน่วย Packet',
          perOption: [
            'ก. ผิด Layer 2 (Frame) เป็นระดับของอุปกรณ์ Switch และใช้ MAC Address',
            'ข. ถูกต้อง Router ทำงานที่ Layer 3 (Network) เพื่อจัดเส้นทาง (Routing) ของ Packet ข้ามเครือข่าย',
            'ค. ผิด Layer 4 (Segment) เป็นระดับของโปรโตคอล TCP/UDP และ Port Number',
            'ง. ผิด Layer 1 (Bit) เป็นระดับของสายสัญญาณและ Hub/Repeater'
          ]
        }
      },
      {
        id: 'q-core4-2',
        question: 'ข้อใดจับคู่บริการเครือข่ายกับหมายเลข Port มาตรฐานได้ถูกต้องทั้งหมด?',
        options: [
          'SSH = 22, HTTPS = 443, DNS = 53, RDP = 3389',
          'SSH = 23, HTTPS = 80, DNS = 53, MySQL = 5432',
          'FTP = 25, SMTP = 21, HTTP = 443, RDP = 3306',
          'SSH = 22, DHCP = 80, HTTPS = 8443, PostgreSQL = 1433'
        ],
        correctIndex: 0,
        explanation: {
          summary: 'พอร์ตมาตรฐานที่ถูกต้องคือ SSH=22, HTTPS=443, DNS=53, RDP=3389',
          perOption: [
            'ก. ถูกต้องทุกคู่ทั้ง 4 บริการ',
            'ข. ผิด เพราะ 23 คือ Telnet, 80 คือ HTTP, และ 5432 คือ PostgreSQL (MySQL คือ 3306)',
            'ค. ผิด เพราะ FTP คือ 20/21, SMTP คือ 25, HTTP คือ 80, RDP คือ 3389',
            'ง. ผิด เพราะ DHCP คือ 67/68 และ 1433 คือ MS SQL Server'
          ]
        }
      },
      {
        id: 'q-core4-3',
        question: 'สำนักงานที่ดินแห่งหนึ่งได้รับจัดสรร IP เครือข่ายย่อย 192.168.50.0/24 (Subnet Mask 255.255.255.0) จะสามารถกำหนด IP ให้เครื่องคอมพิวเตอร์และเครื่องพิมพ์ใช้งานได้สูงสุดกี่เครื่อง?',
        options: [
          '256 เครื่อง',
          '255 เครื่อง',
          '254 เครื่อง',
          '126 เครื่อง'
        ],
        correctIndex: 2,
        explanation: {
          summary: 'เครือข่าย /24 เหลือ Host Bit 8 บิต ใช้สูตร 2^8 - 2 = 254 เครื่อง (หัก Network และ Broadcast)',
          perOption: [
            'ก. ผิด 256 คือจำนวน IP ทั้งหมดก่อนหัก Network (.0) และ Broadcast (.255)',
            'ข. ผิด ต้องหักออก 2 IP เสมอ (Network Address และ Broadcast Address)',
            'ค. ถูกต้อง 2^(32-24) - 2 = 2^8 - 2 = 256 - 2 = 254 เครื่อง',
            'ง. ผิด 126 เครื่องเป็นขนาดของ Subnet Mask /25'
          ]
        }
      },
      {
        id: 'q-core4-4',
        question: 'หน่วยงานราชการต้องการนำ Web Server บริการประชาชนมาวางให้เข้าถึงได้จากอินเทอร์เน็ต แต่ต้องการป้องกันไม่ให้ผู้บุกรุกเข้าถึงฐานข้อมูลทะเบียนภายในโดยตรงหาก Web Server ถูกเจาะ ควรจัดวาง Web Server ไว้ที่ใด และเชื่อมต่อสาขาต่างจังหวัดด้วยเทคโนโลยีใด?',
        options: [
          'วาง Web Server ใน Internal LAN เดียวกับฐานข้อมูล และเชื่อมต่อสาขาด้วย Telnet',
          'วาง Web Server ในโซน DMZ (Demilitarized Zone) และเชื่อมต่อสาขาผ่านอุโมงค์เข้ารหัส VPN',
          'วาง Web Server บน Hub สาธารณะโดยปิด Firewall ทั้งหมด',
          'เชื่อมต่อสาขาด้วย FTP แบบไม่เข้ารหัสแทนการใช้เครือข่าย'
        ],
        correctIndex: 1,
        explanation: {
          summary: 'DMZ ใช้กั้น Server ที่ต้องออกอินเทอร์เน็ตออกจากเครือข่ายภายใน ส่วน VPN ใช้สร้างท่อเข้ารหัสเชื่อมสาขาระยะไกล',
          perOption: [
            'ก. ผิด การวาง Web Server ใน LAN เดียวกับ Database เสี่ยงสูงมากหากถูกยึดเครื่อง และ Telnet ไม่เข้ารหัส',
            'ข. ถูกต้อง การวางบริการสาธารณะใน DMZ ช่วยจำกัดความเสียหาย (Defense-in-Depth) และ VPN เข้ารหัสข้อมูลระหว่างสาขาได้อย่างปลอดภัย',
            'ค. ผิด การปิด Firewall เป็นอันตรายร้ายแรงต่อระบบ',
            'ง. ผิด FTP เป็นโปรโตคอลโอนไฟล์ไม่เข้ารหัส ไม่ใช่โครงสร้างเชื่อมต่อเครือข่ายสาขา'
          ]
        }
      },
      {
        id: 'q-core4-5',
        question: 'เหตุการณ์ใดถือเป็นการละเมิดเสาหลัก "Availability" ของ CIA Triad และควรเตรียมรับมือด้วยวิธีใด?',
        options: [
          'แฮกเกอร์แอบดักอ่านไฟล์สัญญาซื้อขายที่ส่งผ่านอีเมลไม่เข้ารหัส — แก้ด้วย SHA-256',
          'ถูกโจมตีด้วย Ransomware เข้ารหัสไฟล์เซิร์ฟเวอร์จนเจ้าหน้าที่เปิดบริการประชาชนไม่ได้ — รับมือด้วย 3-2-1 Offline Backup',
          'พนักงานแอบแก้ตัวเลขยอดเงินในตารางฐานข้อมูล — แก้ด้วย Load Balancer',
          'เว็บไซต์แสดงใบรับรอง SSL หมดอายุ — แก้ด้วย RAID 0'
        ],
        correctIndex: 1,
        explanation: {
          summary: 'Ransomware หรือ DDoS ทำให้ระบบและข้อมูลไม่สามารถใช้งานได้ จึงกระทบต่อ Availability และกู้คืนได้ปลอดภัยด้วย 3-2-1 Backup',
          perOption: [
            'ก. ผิด การดักอ่านความลับกระทบ Confidentiality และ SHA-256 เป็น Hash ไม่ใช่การเข้ารหัสลับ (ต้องใช้ Encryption)',
            'ข. ถูกต้อง Ransomware ทำลายความพร้อมใช้งาน (Availability) และแนวทางกู้คืนที่สำคัญที่สุดคือ 3-2-1 Offline/Air-gapped Backup',
            'ค. ผิด การแก้ไขข้อมูลโดยมิชอบกระทบ Integrity ส่วน Load Balancer ช่วยเรื่อง Availability',
            'ง. ผิด RAID 0 ไม่มีระบบสำรองความเสียหายและไม่เกี่ยวกับใบรับรอง SSL'
          ]
        }
      },
      {
        id: 'q-core4-6',
        question: 'ตาม พ.ร.บ. ว่าด้วยการกระทำความผิดเกี่ยวกับคอมพิวเตอร์ (ฉบับที่ 2) พ.ศ. 2560 ข้อใดกล่าว "ถูกต้อง"?',
        options: [
          'ความผิดฐานหมิ่นประมาททางออนไลน์ยังคงฟ้องตามมาตรา 14(1) ของ พ.ร.บ. คอมพิวเตอร์ฯ 2560 ได้เหมือนเดิม',
          'พ.ร.บ. ฉบับที่ 2 พ.ศ. 2560 ได้ตัดความผิดฐานหมิ่นประมาทออกจากมาตรา 14(1) และเพิ่มความผิดเรื่องส่งสแปม (Spam) ในมาตรา 11',
          'การแอบเข้าถึงข้อมูลคอมพิวเตอร์ของผู้อื่นโดยมิชอบ (มาตรา 7) มีโทษเบากว่าการเข้าถึงระบบคอมพิวเตอร์ (มาตรา 5)',
          'การตัดต่อภาพบุคคลที่เสียชีวิตไปแล้วไม่ถือเป็นความผิดตามมาตรา 16'
        ],
        correctIndex: 1,
        explanation: {
          summary: 'พ.ร.บ.คอมฯ 2560 แก้ไข ม.14(1) ไม่รวมหมิ่นประมาท (ให้ไปใช้ ป.อาญา) และเพิ่มโทษสแปมใน ม.11 หากไม่ให้กดยกเลิกได้ง่าย',
          perOption: [
            'ก. ผิด กฎหมายปี 2560 แก้ไข ม.14(1) เพื่อไม่ให้นำมาฟ้องคดีหมิ่นประมาท โดยให้ใช้ประมวลกฎหมายอาญาแทน',
            'ข. ถูกต้อง เป็นจุดเปลี่ยนแปลงสำคัญของฉบับ พ.ศ. 2560 ที่ข้อสอบออกบ่อยมาก',
            'ค. ผิด มาตรา 7 (เข้าถึงข้อมูล) โทษจำคุกไม่เกิน 2 ปี ปรับ 40,000 บาท หนักกว่ามาตรา 5 (เข้าถึงระบบ) ที่จำคุกไม่เกิน 6 เดือน ปรับ 10,000 บาท',
            'ง. ผิด มาตรา 16 คุ้มครองภาพตัดต่อที่ทำให้เสียหายหรืออับอาย รวมถึงกรณีผู้ตายด้วย'
          ]
        }
      },
      {
        id: 'q-core4-7',
        question: 'ตามมาตรา 26 แห่ง พ.ร.บ. คอมพิวเตอร์ฯ พ.ศ. 2560 หน่วยงานหรือผู้ให้บริการต้องเก็บรักษาข้อมูลจราจรทางคอมพิวเตอร์ (Log File) ไว้อย่างน้อยกี่วัน และในกรณีจำเป็นพนักงานเจ้าหน้าที่สามารถสั่งให้เก็บขยายเวลาได้สูงสุดไม่เกินเท่าใด?',
        options: [
          'อย่างน้อย 30 วัน และสั่งเก็บเพิ่มได้ไม่เกิน 6 เดือน',
          'อย่างน้อย 60 วัน และสั่งเก็บเพิ่มได้ไม่เกิน 1 ปี',
          'อย่างน้อย 90 วัน และสั่งเก็บเพิ่มกรณีจำเป็นได้ไม่เกิน 2 ปี',
          'อย่างน้อย 180 วัน และสั่งเก็บเพิ่มได้ไม่เกิน 5 ปี'
        ],
        correctIndex: 2,
        explanation: {
          summary: 'มาตรา 26 กำหนดเก็บ Log ขั้นต่ำไม่น้อยกว่า 90 วัน และพนักงานเจ้าหน้าที่มีอำนาจสั่งให้เก็บเพิ่มได้ไม่เกิน 2 ปี',
          perOption: [
            'ก. ผิด 30 วันน้อยกว่าที่กฎหมายกำหนด',
            'ข. ผิด ไม่ใช่ 60 วัน และ 1 ปี',
            'ค. ถูกต้อง เก็บ Log ไม่น้อยกว่า 90 วัน และกรณีจำเป็นเฉพาะรายพนักงานเจ้าหน้าที่สั่งให้เก็บเกิน 90 วันได้แต่ไม่เกิน 2 ปี',
            'ง. ผิด ตัวเลข 180 วันและ 5 ปีไม่ตรงตามมาตรา 26'
          ]
        }
      },
      {
        id: 'q-core4-8',
        question: 'ตาม พ.ร.บ. คุ้มครองข้อมูลส่วนบุคคล พ.ศ. 2562 (PDPA) หากกรมที่ดินจ้างบริษัทเอกชน (Vendor) ให้ช่วยดูแลและประมวลผลข้อมูลบนระบบคลาวด์ตามคำสั่งของกรมที่ดิน บทบาทของบริษัทเอกชนคือข้อใด และข้อมูล "ลายนิ้วมือ/สแกนใบหน้า" ของประชาชนจัดเป็นข้อมูลประเภทใด?',
        options: [
          'บริษัทเอกชนคือ Data Controller และลายนิ้วมือเป็นข้อมูลส่วนบุคคลทั่วไป',
          'บริษัทเอกชนคือ Data Processor และลายนิ้วมือเป็นข้อมูลส่วนบุคคลอ่อนไหว (Sensitive Data) ตามมาตรา 26',
          'บริษัทเอกชนคือ Data Subject และลายนิ้วมือไม่อยู่ภายใต้กฎหมาย PDPA',
          'บริษัทเอกชนคือ DPO และข้อมูลอ่อนไหวสามารถเก็บได้โดยไม่ต้องขอความยินยอมใดๆ'
        ],
        correctIndex: 1,
        explanation: {
          summary: 'ผู้ที่ทำตามคำสั่งของผู้ควบคุมข้อมูลคือ Data Processor ส่วนข้อมูลชีวภาพ (Biometric) เป็นข้อมูลอ่อนไหวตามมาตรา 26',
          perOption: [
            'ก. ผิด กรมที่ดินเป็นผู้ตัดสินใจวัตถุประสงค์ จึงเป็น Data Controller ส่วนบริษัทรับจ้างเป็น Data Processor',
            'ข. ถูกต้อง บริษัทผู้รับจ้างดำเนินการตามคำสั่งจึงเป็น Data Processor และข้อมูลชีวภาพ (ลายนิ้วมือ/ใบหน้า) เป็น Sensitive Data ตาม ม.26',
            'ค. ผิด Data Subject คือบุคคลธรรมดาเจ้าของข้อมูล (ประชาชน)',
            'ง. ผิด DPO คือเจ้าหน้าที่คุ้มครองข้อมูลส่วนบุคคล ไม่ใช่บริษัทรับจ้างประมวลผล และข้อมูลอ่อนไหวมีเงื่อนไขคุ้มครองเข้มงวดมาก'
          ]
        }
      }
    ]
  });
})(window);
