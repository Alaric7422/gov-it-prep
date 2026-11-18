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
    subtitle: 'ปูพื้นฐานเครือข่ายจากศูนย์: LAN/WAN/Topology, OSI 7 Layers, TCP 3-Way Handshake, Port, IP/Subnet/CIDR, DNS/DHCP, Firewall/VPN, ภัยไซเบอร์ และกฎหมาย พ.ร.บ.คอมฯ-PDPA',
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
      'พื้นฐานเครือข่าย: LAN (ในอาคาร), MAN (ระดับเมือง), WAN (ข้ามจังหวัด/ประเทศ), Topology ยอดนิยมในออฟฟิศคือ Star (ผ่าน Switch กลาง) ส่วน Mesh ทนทานที่สุดแต่แพงสุด',
      'OSI 7 Layers (1→7: Physical, Data Link, Network, Transport, Session, Presentation, Application) แบ่งหน้าที่สื่อสารเป็นชั้นๆ พร้อมการห่อหุ้มข้อมูล (Encapsulation) ตั้งแต่ Bit → Frame → Packet → Segment → Data',
      'MAC Address คือเลขประจำตัวการ์ดแลนระดับ Layer 2 (Switch), IP Address คือที่อยู่ข้ามเครือข่ายระดับ Layer 3 (Router) มี ARP แปลง IP เป็น MAC, TCP จับมือ 3-Way Handshake (SYN→SYN-ACK→ACK), และ Port คือเลขห้องบริการ เช่น HTTP 80, HTTPS 443, SSH 22, DNS 53, RDP 3389',
      'Subnet /24 (255.255.255.0) มี Host ใช้งานได้ 2^8 - 2 = 254 เครื่อง (หัก Network ตัวแรกและ Broadcast ตัวสุดท้าย) ส่วน Private IPv4 มี 3 ช่วง (10.x, 172.16-31.x, 192.168.x) ที่ต้องผ่าน NAT เพื่อออกเน็ต',
      'CIA Triad + การป้องกัน (Firewall/WAF, DMZ, IDS/IPS, VPN, Prepared Statement กัน SQLi) คู่กับกฎหมาย: พ.ร.บ.คอมฯ 2560 (ม.5-16 และ ม.26 เก็บ Log >= 90 วัน) และ PDPA 2562 (6 ฐานกฎหมาย + ข้อมูลอ่อนไหว ม.26)'
    ],
    sections: [
      {
        id: 'osi-tcpip',
        title: '1. แบบจำลอง OSI 7 Layers เทียบ TCP/IP 4 Layers และ Port สำคัญ',
        analogyBox: {
          title: 'เปรียบเทียบให้เห็นภาพ: ระบบส่งพัสดุไปรษณีย์จากโต๊ะสู่ตึกปลายทาง',
          body: '• <strong>Layer 7–5 (Application / Presentation / Session):</strong> คุณเขียนจดหมาย (Data) แปลภาษา/ล็อกรหัส ใส่ซอง และเปิดรอบสนทนา<br>• <strong>Layer 4 (Transport):</strong> เลือกส่งแบบ "EMS มีใบเซ็นรับครบทุกหน้า" (<strong>TCP</strong>) หรือ "ไปรษณียบัตรส่งเร็วไม่เช็กตอบรับ" (<strong>UDP</strong>) แล้วแปะ <strong>เลขห้อง (Port Number)</strong> ที่หน้าซอง<br>• <strong>Layer 3 (Network):</strong> เขียน <strong>บ้านเลขที่และรหัสไปรษณีย์ (IP Address)</strong> เพื่อให้บุรุษไปรษณีย์ <strong>Router</strong> หาเส้นทางข้ามจังหวัด<br>• <strong>Layer 2 (Data Link):</strong> ติด <strong>ป้ายทะเบียนรถขนส่งช่วงสั้นๆ ในซอย (MAC Address)</strong> วิ่งผ่าน <strong>Switch</strong><br>• <strong>Layer 1 (Physical):</strong> ถนน สายแลน ใยแก้วนำแสง หรือคลื่น Wi-Fi ที่แปลงเป็นสัญญาณไฟฟ้า/แสง 0 กับ 1'
        },
        bodyHtml: `
<p>ก่อนจะกระโดดไปท่อง OSI 7 Layers พี่ขอปูพื้นฐานคำว่า <strong>เครือข่ายคอมพิวเตอร์</strong> ให้เคลียร์ก่อนครับ เพราะถ้าเข้าใจภาพรวมตั้งแต่สายแลนเส้นเดียวจนถึงอินเทอร์เน็ตแล้ว เรื่อง Layer จะกลายเป็นเรื่องง่ายมาก!</p>

<h3>พื้นฐานเครือข่ายจากศูนย์: Network, ประเภทขนาด, Client-Server และ Topology</h3>
<p><strong>เครือข่ายคอมพิวเตอร์ (Computer Network)</strong> คือการนำคอมพิวเตอร์ เซิร์ฟเวอร์ เครื่องพิมพ์ หรือสมาร์ตโฟนตั้งแต่ 2 เครื่องขึ้นไปมาเชื่อมต่อกัน เพื่อ <em>แลกเปลี่ยนข้อมูล</em> และ <em>ใช้ทรัพยากรร่วมกัน</em> (เช่น ใช้เครื่องพิมพ์หรือฐานข้อมูลชุดเดียวกัน) แบ่งตามขนาดพื้นที่ได้ 4 ระดับ:</p>
<ul>
  <li><strong>LAN (Local Area Network):</strong> เครือข่ายระยะใกล้ภายในห้อง อาคาร หรือสำนักงานเดียวกัน (เช่น วงแลนในสำนักงานที่ดินจังหวัด) ความเร็วสูงมาก เชื่อมต่อผ่านสาย UTP และ Switch/Wi-Fi</li>
  <li><strong>MAN (Metropolitan Area Network):</strong> เครือข่ายระดับเมืองหรือจังหวัด เชื่อมหลายอาคารในเขตเมืองเดียวกัน (เช่น เครือข่ายศาลากลางจังหวัดและอาคารราชการใกล้เคียง)</li>
  <li><strong>WAN (Wide Area Network):</strong> เครือข่ายระยะไกลระดับประเทศหรือข้ามทวีป (เช่น เชื่อมสำนักงานที่ดิน 462 สาขาทั่วไทยเข้าส่วนกลางผ่านสายเช่า MPLS หรือ VPN)</li>
  <li><strong>Internet:</strong> "เครือข่ายของเครือข่าย" ที่เชื่อมวง LAN/WAN ทั่วโลกเข้าด้วยกันเป็นเครือข่ายสาธารณะขนาดมหึมาโดยใช้ภาษากลางคือชุดโปรโตคอล <strong>TCP/IP</strong></li>
</ul>

<h4>สถาปัตยกรรมเครือข่าย: Client-Server vs Peer-to-Peer (P2P)</h4>
<ul>
  <li><strong>Client-Server:</strong> แยกบทบาทชัดเจน มีเครื่องแม่ข่ายกลาง (<strong>Server</strong>) คอยเก็บฐานข้อมูลและให้บริการ ส่วนเครื่องเจ้าหน้าที่ (<strong>Client</strong>) เป็นฝ่ายส่งคำขอไปใช้งาน — <em>ข้อดี:</em> คุมสิทธิ์ความปลอดภัยและ Backup ข้อมูลจุดเดียวได้ง่าย จึงใช้ในองค์กรและหน่วยงานรัฐเกือบทั้งหมด</li>
  <li><strong>Peer-to-Peer (P2P):</strong> ทุกเครื่องเท่าเทียมกัน ไม่มีเครื่องแม่ข่ายกลาง แต่ละเครื่องเป็นทั้งผู้ให้และผู้รับไฟล์โดยตรง — <em>ข้อดี:</em> ประหยัดไม่ต้องซื้อ Server | <em>ข้อเสีย:</em> คุมความปลอดภัยและสำรองข้อมูลยาก</li>
</ul>

<h4>Network Topology (รูปแบบการเดินสายเชื่อมต่ออุปกรณ์)</h4>
<div class="table-wrap">
  <table>
    <caption>เปรียบเทียบ Network Topology 4 แบบหลักที่ออกสอบบ่อย</caption>
    <thead>
      <tr>
        <th scope="col">Topology</th>
        <th scope="col">ลักษณะการเชื่อมต่อคืออะไร</th>
        <th scope="col">จุดเด่น / จุดอ่อน</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th scope="row">Star Topology<br>(แบบดาว — นิยมสุด!)</th>
        <td>ทุกเครื่องลากสายตรงเข้าหาอุปกรณ์ตัวกลาง (เช่น <strong>Switch</strong>)</td>
        <td><strong>จุดเด่น:</strong> สายขาด 1 เส้นกระทบแค่เครื่องนั้น หาจุดเสียง่าย | <strong>จุดอ่อน:</strong> ถ้า Switch ตัวกลางพัง ล่มทั้งวง!</td>
      </tr>
      <tr>
        <th scope="row">Bus Topology<br>(แบบบัส)</th>
        <td>ทุกเครื่องต่อพ่วงเข้ากับสายแกนหลักเส้นเดียว (Backbone) และมี Terminator ปิดหัวท้าย</td>
        <td><strong>จุดเด่น:</strong> ประหยัดสาย ติดตั้งง่าย | <strong>จุดอ่อน:</strong> สายหลักขาดจุดเดียวล่มทั้งระบบ และเกิดข้อมูลชนกัน (Collision) บ่อย</td>
      </tr>
      <tr>
        <th scope="row">Ring Topology<br>(แบบวงแหวน)</th>
        <td>เชื่อมต่อเรียงต่อกันเป็นวงปิด ส่งข้อมูลวนทิศทางเดียวด้วยสิทธิ์ที่เรียกว่า Token</td>
        <td><strong>จุดเด่น:</strong> ข้อมูลไม่ชนกัน | <strong>จุดอ่อน:</strong> หากสายขาดหรือเครื่องหนึ่งดับ วงจรจะขาดทันที (ยกเว้นทำวงแหวนคู่ Dual Ring)</td>
      </tr>
      <tr>
        <th scope="row">Mesh Topology<br>(แบบตาข่าย)</th>
        <td>แต่ละโหนดมีสายเชื่อมโยงสลับกันหลายเส้นทาง (Full Mesh = ทุกเครื่องต่อถึงกันหมด)</td>
        <td><strong>จุดเด่น:</strong> ทนทานสูงสุด เส้นหนึ่งขาดวิ่งอ้อมอีกทางได้ทันที | <strong>จุดอ่อน:</strong> เปลืองสายและแพงมาก (นิยมใช้เฉพาะ Core Router/Backbone)</td>
      </tr>
    </tbody>
  </table>
</div>

<h3>Protocol คืออะไร? และทำไมต้องมี OSI 7 Layers?</h3>
<p><strong>โปรโตคอล (Protocol)</strong> คือ <strong>"ภาษากลางและกติกาการสื่อสาร"</strong> ที่คอมพิวเตอร์ตกลงใช้ร่วมกัน เพื่อให้เครื่อง Windows, macOS, มือถือ Android และเซิร์ฟเวอร์ Linux คุยรู้เรื่องกันได้ (เช่น โปรโตคอล HTTP ใช้คุยเรื่องเว็บ, SMTP ใช้ส่งอีเมล)</p>
<p><strong>ทำไมต้องแบ่งการสื่อสารเป็น OSI 7 Layers?</strong> ลองนึกภาพการส่งสินค้า ถ้าคนเดียวทำตั้งแต่แพ็กของ ขับรถ ยันส่งข้ามประเทศ พอเปลี่ยนจากรถบรรทุกเป็นเรือก็ต้องรื้อระบบใหม่หมด! แต่พอแบ่งเป็น 7 ชั้นอิสระ (Modular) แต่ละชั้นรับผิดชอบหน้าที่เดียวแล้วส่งต่อให้ชั้นถัดไป ทำให้เปลี่ยนฮาร์ดแวร์ชั้นล่าง (เช่น เปลี่ยนสาย LAN เป็น Wi-Fi) ได้โดยไม่ต้องแก้โปรแกรมเว็บเบราว์เซอร์ชั้นบนเลย</p>

<h4>ไล่ดูของจริง: เวลาคุณเปิดเว็บ 1 หน้า ข้อมูลผ่านทั้ง 7 ชั้นเกิดอะไรขึ้น + PDU &amp; Encapsulation</h4>
<p>เมื่อข้อมูลเริ่มเดินทางจากเครื่องคุณ (<strong>ชั้น 7 → ชั้น 1</strong>) แต่ละชั้นจะนำข้อมูลจากชั้นบนมาห่อหุ้มแล้วแปะป้ายหน้าซอง (<strong>Header</strong>) ของตัวเองเพิ่มเข้าไป กระบวนการห่อทีละชั้นนี้เรียกว่า <strong>Encapsulation</strong> และก้อนข้อมูลในแต่ละชั้นมีชื่อเรียกเฉพาะว่า <strong>PDU (Protocol Data Unit)</strong> ดังนี้ (ฝั่งผู้รับจะแกะซองย้อนจาก 1 → 7 เรียกว่า De-encapsulation):</p>
<ol>
  <li><strong>Layer 7 — Application (PDU: Data):</strong> โปรแกรมที่ผู้ใช้โต้ตอบโดยตรง เช่น เปิด Chrome พิมพ์ URL เว็บ → โปรแกรมสร้างคำขอ HTTP/HTTPS (นอกจากนี้ยังมี DNS, FTP, SSH, DHCP, SMTP อยู่ในชั้นนี้)</li>
  <li><strong>Layer 6 — Presentation (PDU: Data):</strong> ทำหน้าที่เป็น "นักแปลและคนล็อกตู้เซฟ" แปลงรหัสอักขระ (UTF-8), บีบอัดไฟล์ (JPEG/ZIP), และ <strong>เข้ารหัสข้อมูล (SSL/TLS Encryption)</strong></li>
  <li><strong>Layer 5 — Session (PDU: Data):</strong> เปิด ดูแล และปิด "รอบการสนทนา (Session)" ระหว่างเครื่องเราและเว็บเซิร์ฟเวอร์ ให้รู้ว่าคำขอต่อเนื่องนี้มาจากเซสชันเดียวกัน</li>
  <li><strong>Layer 4 — Transport (PDU: Segment / Datagram):</strong> แบ่งข้อมูลใหญ่เป็นท่อนๆ เลือกว่าจะส่งแบบเช็กความครบถ้วน (<strong>TCP</strong>) หรือส่งไว (<strong>UDP</strong>) แล้วแปะ <strong>Port Number</strong> (เช่น 443) เพื่อให้ไปถูกโปรแกรมปลายทาง</li>
  <li><strong>Layer 3 — Network (PDU: Packet):</strong> แปะ <strong>IP Address</strong> ต้นทางและปลายทาง แล้วให้ <strong>Router</strong> ช่วยคำนวณเส้นทาง (Routing) ข้ามเครือข่ายไปยังเซิร์ฟเวอร์</li>
  <li><strong>Layer 2 — Data Link (PDU: Frame):</strong> แปะ <strong>MAC Address</strong> ของการ์ดแลนต้นทางและจุดกระโดดถัดไป (Next Hop) พร้อมรหัสตรวจจับข้อผิดพลาด (FCS/CRC) เพื่อวิ่งผ่าน <strong>Switch</strong> ในวง LAN</li>
  <li><strong>Layer 1 — Physical (PDU: Bit):</strong> แปลง Frame ทั้งก้อนเป็นสัญญาณไฟฟ้า แสง หรือคลื่นวิทยุ (เลขฐานสอง <code>0</code> และ <code>1</code>) วิ่งออกไปตามสาย UTP, Fiber Optic หรือเสา Wi-Fi!</li>
</ol>

<p>สูตรท่องจำ <strong>OSI 7 Layers จากล่างขึ้นบน (Layer 1 → Layer 7)</strong> ที่ใช้ได้ผลจริงในห้องสอบ:<br>
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
        <td><strong>TCP</strong> (เชื่อถือได้ ทำ 3-Way Handshake) vs <strong>UDP</strong> (เร็ว ไม่เช็กตอบรับ) + <strong>Port Number</strong></td>
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

<h3>เจาะศัพท์สำคัญ: MAC vs IP, ARP, TCP 3-Way Handshake vs UDP และ Port Number</h3>
<ul>
  <li><strong>MAC Address vs IP Address ต่างกันยังไง?</strong>
    <ul>
      <li><strong>MAC Address (Media Access Control — ขนาด 48 บิต / เลขฐานสิบหก 12 หลัก เช่น <code>00:1A:2B:3C:4D:5E</code>):</strong> เปรียบเหมือน <strong>"เลขบัตรประชาชนที่สลักติดการ์ดแลนมาจากโรงงาน"</strong> ไม่เปลี่ยนตามสถานที่ ใช้อ้างอิงตัวเครื่องภายในวง LAN เดียวกันที่ <strong>Layer 2 (Switch)</strong></li>
      <li><strong>IP Address:</strong> เปรียบเหมือน <strong>"ที่อยู่ไปรษณีย์ / บ้านเลขที่ปัจจุบัน"</strong> เปลี่ยนใหม่ได้เวลาคุณย้ายไปต่อ Wi-Fi ที่อื่น ใช้ส่ง Packet ข้ามเครือข่ายทั่วโลกที่ <strong>Layer 3 (Router)</strong></li>
      <li><strong>ARP (Address Resolution Protocol):</strong> โปรโตคอล "ล่ามแปล IP → MAC" เวลารู้แค่ IP ปลายทางในวงแลนเดียวกัน เครื่องจะส่ง Broadcast ถามทั้งวงว่า <em>"ใครถือ IP 192.168.1.1 ขอ MAC Address หน่อย!"</em> เพื่อจะได้ประกอบ Frame ส่งไปถูกการ์ดแลน</li>
    </ul>
  </li>
  <li><strong>TCP vs UDP และขั้นตอน 3-Way Handshake:</strong>
    <ul>
      <li><strong>TCP (Transmission Control Protocol — Connection-oriented):</strong> เน้นความถูกต้องครบถ้วน 100% ถ้า Packet หายกลางทางจะส่งซ้ำและเรียงลำดับใหม่ให้ (ใช้กับเว็บ, โอนไฟล์, ฐานข้อมูล) ก่อนส่งข้อมูลจริงจะจับมือกัน 3 ขั้นตอนที่เรียกว่า <strong>3-Way Handshake</strong>:
        <ol>
          <li><strong>Step 1 — <code>SYN</code>:</strong> เครื่อง Client ส่งข้อความไปหา Server ว่า <em>"สวัสดี ขอเปิดการเชื่อมต่อหน่อย"</em></li>
          <li><strong>Step 2 — <code>SYN-ACK</code>:</strong> เครื่อง Server ตอบกลับมาว่า <em>"รับทราบ! ฝั่งฉันพร้อมแล้ว และขอยืนยันเปิดฝั่งเธอด้วย"</em></li>
          <li><strong>Step 3 — <code>ACK</code>:</strong> เครื่อง Client ตอบยืนยันกลับว่า <em>"โอเค เริ่มส่งข้อมูลจริงได้เลย!"</em></li>
        </ol>
      </li>
      <li><strong>UDP (User Datagram Protocol — Connectionless):</strong> ไม่จับมือ ไม่เช็กว่าถึงครบไหม ยิงข้อมูลส่งรัวๆ ทันที! <em>ข้อดี:</em> เร็วมาก ดีเลย์ต่ำ (Latency ต่ำ) เหมาะกับ Live สด, วิดีโอคอล VoIP, เกมออนไลน์ และ DNS Query</li>
    </ul>
  </li>
  <li><strong>Port Number คืออะไร? (หมายเลข 0 – 65535):</strong> ลองจินตนาการว่า <strong>IP Address คือเลขที่ตึกคอนโด</strong> ส่วน <strong>Port Number คือเลขห้องในตึกนั้น!</strong> เซิร์ฟเวอร์ 1 เครื่องที่มี IP เดียวสามารถเปิดบริการหลายโปรแกรมพร้อมกันได้ เพราะแยกประตูเข้าตามเลขพอร์ต เช่น เว็บเข้ามาทาง Port <code>443</code>, รีโมตแอดมินเข้า Port <code>22</code>, ฐานข้อมูลเข้า Port <code>5432</code></li>
</ul>

<h4>ตาราง Port Number &amp; Protocol ที่ออกสอบแทบทุกสนาม</h4>
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
        analogyBox: {
          title: 'เปรียบเทียบให้เห็นภาพ: เบอร์โทรบริษัท 1 เบอร์ (Public IP) + เบอร์ต่อภายใน (Private IP)',
          body: '• <strong>Private IP + NAT:</strong> เหมือนบริษัทมี <strong>เบอร์โทรศัพท์สายนอกแค่ 1 เบอร์ (Public IP)</strong> แต่ข้างในมีโต๊ะพนักงาน 200 โต๊ะที่ใช้ <strong>เบอร์ต่อภายใน 101, 102... (Private IP)</strong> เวลาพนักงานโทรออกข้างนอก ตู้สาขา (<strong>NAT</strong>) จะสลับเป็นเบอร์บริษัทออกให้!<br>• <strong>Subnet Mask / CIDR:</strong> เหมือนเส้นคั่นระหว่าง <strong>"รหัสหมู่บ้าน (Network ID)"</strong> กับ <strong>"บ้านเลขที่ (Host ID)"</strong><br>• <strong>DNS &amp; DHCP:</strong> <strong>DNS</strong> คือ <em>สมุดรายชื่อโทรศัพท์</em> (แปลงชื่อเว็บจำง่ายเป็นเลข IP) ส่วน <strong>DHCP</strong> คือ <em>พนักงานแจกบัตรเลขประจำตัวชั่วคราว</em> ตอนคุณเดินเข้าออฟฟิศใหม่'
        },
        bodyHtml: `
<p>เมื่อรู้แล้วว่า Layer 3 ใช้ <strong>IP Address</strong> ส่ง Packet ข้ามเครือข่าย บทนี้พี่จะพาไปรู้จักเลข IP ทั้ง 2 รุ่น วิธีแยก Private/Public IP เทคนิคคำนวณ Subnet ทีละบิต และกลไกการทำงานของ DNS, DHCP, Firewall และ VPN ครับ</p>

<h3>IPv4 vs IPv6, Public IP vs Private IP และ NAT คืออะไร?</h3>
<ul>
  <li><strong>IPv4 (รุ่น 4):</strong> ขนาด <strong>32 บิต</strong> เขียนเป็นตัวเลขฐานสิบ 4 ชุด (เรียกว่า 4 Octet คั่นด้วยจุด เช่น <code>192.168.1.10</code> แต่ละช่องมีค่า 0–255) มีจำนวนรวมทั้งหมดราว 4.3 พันล้านหมายเลข ซึ่งปัจจุบันไม่พอใช้แล้ว</li>
  <li><strong>IPv6 (รุ่น 6):</strong> ขนาด <strong>128 บิต</strong> เขียนเป็นเลขฐานสิบหก (Hexadecimal) 8 ชุดคั่นด้วยโคลอน เช่น <code>2001:db8::1</code> สร้างมาแก้ปัญหา IPv4 ขาดแคลน รองรับอุปกรณ์ IoT ได้แทบไม่มีวันหมด</li>
  <li><strong>Public IP (IP จริง / สาธารณะ):</strong> หมายเลข IP ที่ไม่ซ้ำกับใครในโลก ใช้สื่อสารบนอินเทอร์เน็ตโดยตรง (ต้องขอเช่าหรือจัดสรรจากผู้ให้บริการ ISP / NIC)</li>
  <li><strong>Private IP (IP ส่วนตัว / ภายในองค์กร):</strong> ช่วง IP พิเศษที่สงวนไว้ให้ใช้ฟรีในวง LAN ของบ้านหรือหน่วยงาน <strong>ไม่สามารถวิ่งออกอินเทอร์เน็ตโดยตรงได้</strong> มี 3 ช่วงหลักที่ต้องจำเข้าห้องสอบ:
    <ul>
      <li><strong>Class A Private:</strong> <code>10.0.0.0 – 10.255.255.255</code> (<code>10.0.0.0/8</code>) — นิยมใช้ในองค์กรใหญ่/ราชการ</li>
      <li><strong>Class B Private:</strong> <code>172.16.0.0 – 172.31.255.255</code> (<code>172.16.0.0/12</code>)</li>
      <li><strong>Class C Private:</strong> <code>192.168.0.0 – 192.168.255.255</code> (<code>192.168.0.0/16</code>) — นิยมใช้ในบ้านและสำนักงานทั่วไป</li>
      <li><strong>IP พิเศษที่ควรรู้จัก:</strong> <code>127.0.0.1</code> คือ <strong>Loopback Address (<code>localhost</code>)</strong> ใช้ทดสอบระบบในเครื่องตัวเอง ส่วน <code>169.254.x.x</code> คือ <strong>APIPA</strong> ที่ Windows แจกชั่วคราวเวลาติดต่อ DHCP Server ไม่สำเร็จ</li>
    </ul>
  </li>
  <li><strong>NAT (Network Address Translation) คืออะไร?</strong> เมื่อเครื่องในออฟฟิศใช้ Private IP (เช่น <code>192.168.1.15</code>) ซึ่งออกอินเทอร์เน็ตตรงไม่ได้ เราเตอร์หน้าองค์กรจึงใช้ <strong>NAT</strong> แปลง Private IP หลายร้อยเครื่องให้สวมรอยใช้ Public IP ขององค์กร (ที่มีแค่ 1–2 เบอร์) ออกสู่อินเทอร์เน็ตได้พร้อมกัน! ช่วยทั้งประหยัด IPv4 และซ่อนโครงสร้างเครื่องภายในไม่ให้คนนอกเห็น</li>
</ul>

<h3>Subnet Mask &amp; CIDR (/24, /25, /26) คืออะไร? คิดทีละบิตแบบจับมือทำ</h3>
<p>IPv4 ทั้ง 32 บิต ไม่ได้ใช้ตั้งชื่อเครื่องทั้งหมด แต่ถูกแบ่งเป็น 2 ท่อนเสมอ: <strong>ท่อนหน้า = Network ID (ชื่อวงเครือข่าย)</strong> และ <strong>ท่อนหลัง = Host ID (เลขประจำเครื่องในวงนั้น)</strong></p>
<p><strong>Subnet Mask</strong> และ <strong>CIDR (Classless Inter-Domain Routing — เลขหลังเครื่องหมาย <code>/</code>)</strong> คือตัวกำหนดว่า "กี่บิตแรกเป็น Network ID และกี่บิตหลังเป็น Host ID" (บิตที่เป็น <code>1</code> คือ Network ส่วนบิตที่เป็น <code>0</code> คือ Host):</p>
<ul>
  <li><strong>Network Address (IP ตัวแรกสุดของวง):</strong> บิต Host เป็น <code>0</code> ทั้งหมด ใช้เป็น "ป้ายชื่อเรียกวงเครือข่าย" <em>ห้ามนำไปตั้งให้เครื่องลูก!</em></li>
  <li><strong>Broadcast Address (IP ตัวสุดท้ายของวง):</strong> บิต Host เป็น <code>1</code> ทั้งหมด ใช้สำหรับ "ตะโกนส่งข้อมูลถึงทุกเครื่องในวงพร้อมกัน" <em>ห้ามนำไปตั้งให้เครื่องลูก!</em></li>
</ul>

<h4>ตัวอย่างคำนวณทีละขั้นตอน: /24 vs /25 vs /26</h4>
<ul>
  <li><strong>กรณี <code>192.168.10.0/24</code>:</strong>
    <ul>
      <li>เลข <code>/24</code> แปลว่า 24 บิตแรก (3 ชุดแรก) เป็น Network: Subnet Mask = <code>11111111.11111111.11111111.00000000</code> = <code>255.255.255.0</code></li>
      <li>เหลือบิตสำหรับ Host: <code>32 - 24 = 8</code> บิต → จำนวน IP ทั้งหมด = <code>2^8 = 256</code> ตัว (<code>.0</code> ถึง <code>.255</code>)</li>
      <li>หัก <strong>Network Address (<code>.0</code>)</strong> และ <strong>Broadcast Address (<code>.255</code>)</strong> ออก 2 ตัว → เหลือ <strong>Usable Hosts = <code>2^8 - 2 = 254</code> เครื่อง</strong> (<code>192.168.10.1 – 192.168.10.254</code>)</li>
    </ul>
  </li>
  <li><strong>กรณีแบ่งครึ่งเป็น <code>/25</code> (เช่น <code>192.168.10.0/25</code>):</strong>
    <ul>
      <li>ยืม Host มา 1 บิตเป็น Network → Subnet Mask = <code>255.255.255.128</code> (เพราะบิตซ้ายสุดของชุดท้ายมีค่า <code>128</code>)</li>
      <li>เหลือ Host = <code>32 - 25 = 7</code> บิต → แต่ละวงย่อยมี IP รวม <code>2^7 = 128</code> ตัว → <strong>ใช้ได้จริง = <code>2^7 - 2 = 126</code> เครื่อง!</strong> (วงที่ 1: <code>.0–.127</code>, วงที่ 2: <code>.128–.255</code>)</li>
    </ul>
  </li>
  <li><strong>กรณีแบ่ง 4 ส่วนเป็น <code>/26</code> (เช่น <code>192.168.10.0/26</code>):</strong>
    <ul>
      <li>Subnet Mask = <code>255.255.255.192</code> (<code>128 + 64 = 192</code>), เหลือ Host = <code>32 - 26 = 6</code> บิต</li>
      <li>แต่ละวงย่อยมี IP รวม <code>2^6 = 64</code> ตัว → <strong>ใช้ได้จริง = <code>2^6 - 2 = 62</code> เครื่อง!</strong> (เช่น วงที่ 1: <code>.0–.63</code> ใช้ได้ <code>.1–.62</code>; วงที่ 2: <code>.64–.127</code> ใช้ได้ <code>.65–.126</code>)</li>
    </ul>
  </li>
</ul>

<div class="callout callout-tip">
  <strong><i class="fa-solid fa-calculator" aria-hidden="true"></i> สูตรลัดเข้าห้องสอบคำนวณจำนวนเครื่อง (Usable Hosts) จาก CIDR:</strong>
  เอา <code>32 - เลข CIDR</code> ได้เป็นจำนวนบิตของ Host (<code>h</code>) แล้วเข้าสูตร <strong><code>2^h - 2</code></strong> ทันที! (อย่าลืม <code>- 2</code> สำหรับ Network Address ตัวแรก และ Broadcast Address ตัวสุดท้ายเสมอ)
</div>

<h3>DNS และ DHCP ทำงานทีละขั้นตอนอย่างไร?</h3>
<ul>
  <li><strong>DNS (Domain Name System) — แปลงชื่อเว็บเป็นเลข IP ตอนพิมพ์ <code>landsmaps.dol.go.th</code>:</strong>
    <ol>
      <li>เบราว์เซอร์เช็กในหน่วยความจำสำรอง (DNS Cache) ในเครื่องเราก่อนว่าเคยจำ IP เว็บนี้ไว้หรือยัง</li>
      <li>ถ้าไม่เจอ เครื่องส่งคำถามไปยัง <strong>Recursive DNS Resolver</strong> (เช่น DNS ของ ISP หรือ <code>8.8.8.8</code>)</li>
      <li>Resolver ไล่ถามตามลำดับชั้น: เริ่มจาก <strong>Root Server (<code>.</code>)</strong> → ชี้ไปหา <strong>TLD Server (<code>.th</code> / <code>.go.th</code>)</strong> → ชี้ไปหา <strong>Authoritative DNS Server ของกรมที่ดิน (<code>dol.go.th</code>)</strong></li>
      <li>ได้เลข IP จริงของเซิร์ฟเวอร์ LandsMaps กลับมาให้เบราว์เซอร์เชื่อมต่อแสดงแผนที่บนหน้าจอ!</li>
    </ol>
  </li>
  <li><strong>DHCP (Dynamic Host Configuration Protocol) — แจก IP อัตโนมัติแบบ DORA 4 ขั้นตอน:</strong>
    เวลาเสียบสายแลนหรือต่อ Wi-Fi แล้วไม่ต้องตั้งค่า IP เอง เครื่องจะคุยกับ DHCP Server ผ่าน 4 ขั้นตอนจำง่ายว่า <strong>D-O-R-A</strong>:
    <ol>
      <li><strong>D — Discover:</strong> เครื่องลูกตะโกนหา (Broadcast) ทั้งวงแลนว่า <em>"มี DHCP Server อยู่แถวนี้ไหม? ขอ IP หน่อย!"</em></li>
      <li><strong>O — Offer:</strong> DHCP Server ตอบกลับมาเสนอว่า <em>"มีครับ! ลองเอา IP <code>192.168.1.50</code> พร้อม Mask/Gateway/DNS นี้ไปใช้ไหม?"</em></li>
      <li><strong>R — Request:</strong> เครื่องลูกตอบรับอย่างเป็นทางการว่า <em>"ตกลงครับ ขอรับ IP <code>192.168.1.50</code> มาใช้งาน!"</em></li>
      <li><strong>A — Acknowledge (ACK):</strong> DHCP Server ยืนยันอนุมัติพร้อมกำหนดเวลาเช่า (Lease Time เช่น 24 ชั่วโมง)</li>
    </ol>
  </li>
</ul>

<h3>อุปกรณ์และกลไกป้องกันเครือข่ายหน่วยงานราชการ (อะไรคืออะไร?)</h3>
<ul>
  <li><strong>Firewall (ไฟร์วอลล์) vs WAF:</strong> <strong>Firewall</strong> คือกำแพงกั้นคัดกรองการเชื่อมต่อเข้า-ออกตามกฎ (เช่น อนุญาตเฉพาะ IP, Port 443, หรือตรวจสอบสถานะการเชื่อมต่อ Stateful Inspection) ส่วน <strong>WAF (Web Application Firewall)</strong> เป็นไฟร์วอลล์เฉพาะทางที่อ่านลึกระดับ Layer 7 (HTTP/HTTPS) เพื่อตรวจจับและบล็อกการโจมตีหน้าเว็บ เช่น <strong>SQL Injection</strong> หรือ <strong>XSS</strong></li>
  <li><strong>DMZ (Demilitarized Zone — เขตปลอดทหาร):</strong> โซนเครือข่ายกึ่งกลางที่กั้นระหว่างอินเทอร์เน็ตภายนอกกับเครือข่ายภายในองค์กร ใช้สำหรับวางเครื่องที่ต้องเปิดให้ประชาชนเข้าถึงจากเน็ต (เช่น Web Server, e-QLands, Mail Relay) เพื่อว่าถ้าแฮกเกอร์เจาะ Web Server สำเร็จ ก็จะติด Firewall ชั้นใน ไม่สามารถวิ่งตรงไปขโมยฐานข้อมูลทะเบียนหลัก (Internal LAN) ได้</li>
  <li><strong>IDS vs IPS ต่างกันตรงคำลงท้าย!</strong>
    <ul>
      <li><strong>IDS (Intrusion Detection System — ระบบตรวจจับผู้บุกรุก):</strong> คอยดักฟัง Traffic แล้ว <strong>"แจ้งเตือน (Alert)"</strong> เจ้าหน้าที่เมื่อพบพฤติกรรมน่าสงสัย <em>(เหมือนกล้องวงจรปิดส่งสัญญาณเตือน แต่ไม่ได้ล็อกประตู!)</em></li>
      <li><strong>IPS (Intrusion Prevention System — ระบบป้องกันผู้บุกรุก):</strong> วางขวางกลางทางจราจร เมื่อเจอการโจมตีจะ <strong>"ตรวจจับและสั่งบล็อก/ตัดการเชื่อมต่อทันที"</strong> แบบ Real-time <em>(เหมือน รปภ. ที่จับขโมยล็อกตัวทันที!)</em></li>
    </ul>
  </li>
  <li><strong>VPN (Virtual Private Network):</strong> เทคโนโลยีสร้าง <strong>"อุโมงค์เข้ารหัส (Encrypted Tunnel เช่น IPSec / SSL VPN)"</strong> วิ่งคร่อมบนอินเทอร์เน็ตสาธารณะ ทำให้สำนักงานที่ดิน 462 สาขาหรือเจ้าหน้าที่ที่ทำงานจากบ้าน เชื่อมต่อเข้าใช้งานฐานข้อมูลส่วนกลางได้เสมือนนั่งอยู่ในวง LAN เดียวกันโดยข้อมูลไม่รั่วไหลระหว่างทาง</li>
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
        analogyBox: {
          title: 'เปรียบเทียบให้เห็นภาพ: ตู้เซฟเก็บโฉนดที่ดินกับเสาหลัก CIA Triad',
          body: '• <strong>C — Confidentiality (ความลับ):</strong> ตู้เซฟต้องใส่รหัส เฉพาะเจ้าของและเจ้าหน้าที่ผู้มีสิทธิ์เท่านั้นที่เปิดอ่านข้อมูลได้ (ป้องกันด้วยการเข้ารหัสและ MFA)<br>• <strong>I — Integrity (ความถูกต้องครบถ้วน):</strong> เอกสารในเซฟต้องไม่ถูกใครแอบลบแก้ตัวเลขเนื้อที่หรือสับเปลี่ยนใบ (ป้องกันด้วย Hash และ Digital Signature)<br>• <strong>A — Availability (ความพร้อมใช้งาน):</strong> เมื่อประชาชนมาติดต่อราชการ ตู้เซฟต้องเปิดหยิบใช้งานได้ทันที ไม่ถูกล็อกด้วยกุญแจผีของโจรเรียกค่าไถ่ (ป้องกันด้วย Backup 3-2-1 และ Anti-DDoS)'
        },
        visualCard: {
          type: 'image',
          image: 'assets/images/core-cyber-shield.png',
          alt: 'ภาพประกอบโล่ป้องกันภัยไซเบอร์แสดงหลัก CIA Triad การป้องกัน Phishing, Ransomware และโครงสร้างความปลอดภัยข้อมูล',
          caption: 'เกราะป้องกันข้อมูลภาครัฐ: ผสานหลัก CIA Triad (ลับ-ถูกต้อง-พร้อมใช้) การเข้ารหัส และการป้องกันมัลแวร์เรียกค่าไถ่',
          prompt: 'Clean flat isometric cybersecurity illustration in Cadastral GIS & Tech Studio palette (emerald #0F5E4D, amber #D97706, slate #122026). A glowing emerald digital shield protecting government land registry servers against phishing hooks, ransomware padlocks, and malware bugs, surrounded by three pillars labeled Confidentiality, Integrity, and Availability, plus a 3-2-1 backup vault. Crisp modern editorial tech vector art.'
        },
        bodyHtml: `
<p>ในยุคที่ข้อมูลภาครัฐทั้งหมดอยู่บนระบบดิจิทัล นักวิชาการคอมพิวเตอร์ต้องรู้ทั้ง <strong>หลักการป้องกัน</strong>, <strong>รูปแบบการโจมตี</strong> และ <strong>กลไกการเข้ารหัสลับ</strong> เพื่อออกแบบระบบไม่ให้ข้อมูลประชาชนรั่วไหลหรือถูกล็อกครับ</p>

<h3>เสาหลัก 3 ประการของความมั่นคงปลอดภัย: CIA Triad</h3>
<p>มาตรฐานสากลด้านความปลอดภัย (เช่น ISO/IEC 27001) ตั้งอยู่บนเสาหลัก <strong>CIA Triad</strong> 3 ด้านนี้:</p>
<ul>
  <li><strong>C — Confidentiality (การรักษาความลับ):</strong> ข้อมูลต้องถูกเปิดเผยเฉพาะผู้ได้รับอนุญาตเท่านั้น ห้ามคนนอกแอบอ่าน ป้องกันด้วย <em>Encryption (เข้ารหัส), Access Control, MFA (ยืนยันตัวตนหลายปัจจัย)</em></li>
  <li><strong>I — Integrity (ความถูกต้องครบถ้วน):</strong> ข้อมูลต้องสมบูรณ์ถูกต้อง ไม่ถูกแก้ไขดัดแปลงหรือปลอมแปลงระหว่างจัดเก็บและรับส่ง ป้องกันด้วย <em>Hash Function (เช่น SHA-256), Digital Signature</em></li>
  <li><strong>A — Availability (ความพร้อมใช้งาน):</strong> ระบบและข้อมูลต้องพร้อมให้บริการผู้มีสิทธิ์ตลอดเวลาที่ต้องการ ไม่ล่มหรือไม่ถูกล็อก ป้องกันด้วย <em>3-2-1 Backup, Redundancy/RAID, Load Balancer, Anti-DDoS</em></li>
</ul>

<h3>รู้จักภัยคุกคามไซเบอร์แต่ละแบบ (อะไรคืออะไร? โจมตียังไง?)</h3>
<ul>
  <li><strong>Social Engineering (วิศวกรรมสังคม) &amp; Phishing vs Spear Phishing:</strong> แทนที่จะเจาะไฟร์วอลล์ยากๆ แฮกเกอร์เลือก <em>"แฮกใจคน"</em> หลอกให้เหยื่อกดลิงก์หรือบอกรหัสเอง!
    <ul>
      <li><strong>Phishing:</strong> ส่งอีเมล/SMS ปลอมแบบ <em>หว่านแห</em> จำนวนมาก (เช่น อ้างว่าเป็นธนาคารหรือกรมสรรพากรให้รีบกดลิงก์ยืนยันตัวตน)</li>
      <li><strong>Spear Phishing:</strong> การหลอกแบบ <em>เจาะจงเป้าหมาย</em> (เช่น สืบชื่อ-ตำแหน่งผู้อำนวยการหรือเจ้าหน้าที่การเงิน แล้วส่งอีเมลปลอมเนียนๆ ให้โอนเงินหรือเปิดไฟล์แนบ)</li>
    </ul>
  </li>
  <li><strong>ตระกูล Malware (ซอฟต์แวร์ประสงค์ร้าย):</strong>
    <ul>
      <li><strong>Virus:</strong> ต้องเกาะแฝงไปกับไฟล์โปรแกรมอื่น และต้องรอให้ <em>คนกดเปิดไฟล์</em> จึงจะทำงานและแพร่เชื้อ</li>
      <li><strong>Worm (หนอนอินเทอร์เน็ต):</strong> แพร่กระจายข้ามเครื่องในเครือข่ายได้ <em>ด้วยตัวเองอัตโนมัติ</em> ผ่านช่องโหว่ระบบ โดยไม่ต้องรอคนกดเปิด (กินแบนด์วิดท์จนเครือข่ายล่มได้)</li>
      <li><strong>Trojan Horse (ม้าโทรจัน):</strong> ปลอมตัวเป็นโปรแกรมดีน่าใช้ (เช่น โปรแกรมแคร็กหรือไฟล์เอกสาร) เพื่อหลอกให้ผู้ใช้ติดตั้งเอง แล้วแอบเปิดประตูหลัง (Backdoor) ให้แฮกเกอร์เข้ามาคุมเครื่อง</li>
      <li><strong>Spyware:</strong> โปรแกรมสายลับที่แอบฝังตัวดักจับพฤติกรรมผู้ใช้ เช่น แอบบันทึกการกดแป้นพิมพ์ (Keylogger) เพื่อขโมยรหัสผ่านหรือข้อมูลบัตรเครดิตส่งกลับไปให้คนร้ายเงียบๆ</li>
      <li><strong>Ransomware (มัลแวร์เรียกค่าไถ่):</strong> เข้า <em>ล็อกและเข้ารหัสไฟล์ทั้งหมด</em> ทั้งในเครื่องและ Share Drive จนเปิดใช้งานไม่ได้ แล้วขึ้นหน้าจอเรียกเงินค่าไถ่ (ทำลายเสาหลัก <strong>Availability</strong>!) — <strong>วิธีรับมือ:</strong> ห้ามจ่ายค่าไถ่ (ไม่มีประกันว่าจะได้ไฟล์คืน) แต่ให้ตัดเน็ตเครื่องติดเชื้อแล้วกู้คืนจาก <strong>3-2-1 Offline Backup</strong> (เก็บสำรอง 3 ชุด, บนสื่อ 2 ชนิด, และเก็บ 1 ชุดแบบออฟไลน์/นอกสถานที่เพื่อไม่ให้ Ransomware วิ่งตามไปเข้ารหัส!)</li>
    </ul>
  </li>
  <li><strong>DDoS Attack &amp; Botnet:</strong> <strong>Botnet</strong> คือเครือข่ายคอมพิวเตอร์หรืออุปกรณ์ IoT ของผู้บริสุทธิ์ทั่วโลกที่ติดมัลแวร์จนกลายเป็น "เครื่องซอมบี้" นับหมื่นเครื่อง จากนั้นแฮกเกอร์สั่ง Botnet ทั้งหมดระดมยิงคำขอเข้าเว็บเป้าหมายพร้อมกันจนล่มรับคนจริงไม่ได้ เรียกว่า <strong>DDoS (Distributed Denial of Service)</strong></li>
  <li><strong>SQL Injection (SQLi) vs Cross-Site Scripting (XSS) — เห็นตัวอย่างจริงจะเข้าใจทันที!</strong>
    <ul>
      <li><strong>SQL Injection (โจมตีฐานข้อมูลหลังบ้าน):</strong> เกิดจากโปรแกรมเมอร์เอาข้อความที่ผู้ใช้พิมพ์มาต่อตรงกับคำสั่ง SQL เช่น เว็บเขียนโค้ดรับ <code>username</code> มาต่อสตริงตรงๆ ถ้าแฮกเกอร์พิมพ์ว่า <code>' OR '1'='1</code> ลงในช่องกรอกชื่อ คำสั่งจะกลายเป็น:
<pre tabindex="0"><code>SELECT * FROM users WHERE username = '' OR '1'='1' AND password = 'xxx';</code></pre>
        เนื่องจาก <code>'1'='1'</code> เป็นจริงเสมอ อาจทำให้ล็อกอินผ่านโดยไม่รู้รหัส หรือถูกขโมย/ลบตารางทั้งหมดได้! <strong>วิธีป้องกันเด็ดขาด:</strong> ใช้ <strong>Prepared Statement (Parameterized Query)</strong> ซึ่งแยกโครงสร้างคำสั่ง SQL ออกจากข้อมูลที่รับเข้ามา ทำให้ <code>' OR '1'='1</code> ถูกลดฐานะเป็นแค่ตัวอักษรธรรมดา ไม่ใช่คำสั่ง SQL!</li>
      <li><strong>XSS (Cross-Site Scripting — โจมตีเบราว์เซอร์ของผู้ใช้):</strong> แฮกเกอร์แอบฝังโค้ด JavaScript ร้าย (เช่น <code>&lt;script&gt;...ขโมย Cookie...&lt;/script&gt;</code>) ลงในช่องแสดงความเห็นหรือช่องค้นหา เมื่อผู้ใช้อื่นเปิดหน้านั้น เบราว์เซอร์จะเผลอรันสคริปต์ร้ายนั้นแล้วส่ง Session Cookie ให้แฮกเกอร์สวมรอยล็อกอินแทน! <strong>วิธีป้องกัน:</strong> ทำ Input Validation + <strong>Output Encoding</strong> (แปลง <code>&lt;</code> เป็น <code>&amp;lt;</code>) และตั้ง Cookie แบบ <code>HttpOnly</code></li>
    </ul>
  </li>
  <li><strong>Man-in-the-Middle (MitM):</strong> คนร้ายแอบมาดักคั่นกลางระหว่างผู้ใช้กับเซิร์ฟเวอร์ (เช่น ตั้ง Wi-Fi ฟรีปลอมในร้านกาแฟ) เพื่อแอบอ่านหรือแอบแก้ข้อมูลที่ส่งไปมา แก้ได้ด้วยการใช้ <strong>HTTPS (TLS)</strong> และ <strong>VPN</strong></li>
</ul>

<div class="table-wrap">
  <table>
    <caption>สรุปภัยคุกคามทางไซเบอร์ ช่องทางโจมตี และแนวทางป้องกัน (ทบทวนก่อนสอบ)</caption>
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
        <td>หลอกลวงทางจิตวิทยา (Social Engineering) ส่งอีเมล/SMS ปลอมให้คลิกลิงก์กรอกรหัสผ่าน (Spear = เจาะจงเป้าหมาย)</td>
        <td>ตรวจสอบโดเมนจริงก่อนคลิก, เปิดใช้ <strong>MFA (Multi-Factor Authentication)</strong>, อบรมเจ้าหน้าที่</td>
      </tr>
      <tr>
        <th scope="row">Virus vs Worm vs Trojan vs Spyware</th>
        <td><strong>Virus</strong> เกาะไฟล์รอคนเปิด; <strong>Worm</strong> แพร่ผ่านเน็ตเองได้; <strong>Trojan</strong> ปลอมเป็นโปรแกรมดีเปิด Backdoor; <strong>Spyware</strong> แอบดักขโมยข้อมูล</td>
        <td>อัปเดต OS Patch สม่ำเสมอ, ติดตั้ง Endpoint Detection &amp; Response (EDR), ไม่โหลดโปรแกรมเถื่อน</td>
      </tr>
      <tr>
        <th scope="row">Ransomware</th>
        <td>มัลแวร์เรียกค่าไถ่ เข้ารหัสล็อกไฟล์ทั้งหมดในเครื่องและ Share Drive จนเปิดใช้งานไม่ได้</td>
        <td><strong>ห้ามจ่ายค่าไถ่</strong>, กู้คืนด้วย <strong>3-2-1 Offline Backup</strong>, ปิดพอร์ต SMB ที่ไม่จำเป็น</td>
      </tr>
      <tr>
        <th scope="row">DDoS Attack &amp; Botnet</th>
        <td>ระดมส่ง Request จากกองทัพเครื่องซอมบี้ (Botnet) จนเซิร์ฟเวอร์ล่ม (ทำลาย <strong>Availability</strong>)</td>
        <td>ใช้ CDN / Anti-DDoS Scrubbing, Rate Limiting, Load Balancer</td>
      </tr>
      <tr>
        <th scope="row">SQL Injection &amp; XSS</th>
        <td><strong>SQLi:</strong> แทรกคำสั่ง SQL (<code>' OR '1'='1</code>) โจมตีฐานข้อมูล; <strong>XSS:</strong> ฝัง JavaScript ร้ายรันบนเบราว์เซอร์เหยื่อ</td>
        <td>ใช้ <strong>Prepared Statement / Parameterized Query</strong>, Output Encoding, ใช้ WAF</td>
      </tr>
      <tr>
        <th scope="row">Man-in-the-Middle (MitM)</th>
        <td>ดักฟังหรือปลอมตัวคั่นกลางระหว่างผู้ใช้กับเซิร์ฟเวอร์ (เช่น Wi-Fi สาธารณะปลอม)</td>
        <td>บังคับใช้ HTTPS (TLS), ตรวจใบรับรอง Digital Certificate, ใช้ VPN</td>
      </tr>
    </tbody>
  </table>
</div>

<h3>การเข้ารหัสลับ (Cryptography) และ Digital Certificate (SSL/TLS)</h3>
<ul>
  <li><strong>Symmetric Encryption (กุญแจสมมาตร เช่น AES-256):</strong> ใช้กุญแจ <strong>"ดอกเดียวกัน"</strong> ทั้งล็อก (เข้ารหัส) และไข (ถอดรหัส) → <em>ข้อดี:</em> ทำงานเร็วมาก เหมาะเข้ารหัสไฟล์/ข้อมูลก้อนใหญ่ | <em>ข้อจำกัด:</em> ต้องหาทางส่งมอบกุญแจให้อีกฝ่ายอย่างปลอดภัยก่อน</li>
  <li><strong>Asymmetric Encryption (กุญแจอสมมาตร เช่น RSA, ECC):</strong> ใช้กุญแจ <strong>"เป็นคู่ 2 ดอก"</strong> ที่ทำงานคู่กันคือ <strong>Public Key</strong> (แจกให้ทุกคนรู้ได้) และ <strong>Private Key</strong> (เก็บเป็นความลับไว้คนเดียว) ข้อสอบชอบถามสลับ 2 ภารกิจนี้:
    <ul>
      <li><strong>1) ส่งความลับ (Confidentiality):</strong> คุณอยากส่งความลับให้ผู้รับ → ให้เข้ารหัสด้วย <strong>Public Key ของผู้รับ</strong> เพราะมีแค่ <em>Private Key ของผู้รับ</em> ดอกเดียวที่ถอดอ่านได้!</li>
      <li><strong>2) ลายมือชื่อดิจิทัล (Digital Signature — ยืนยันตัวตน &amp; ห้ามปฏิเสธ):</strong> คุณอยากพิสูจน์ว่าเอกสารนี้มาจากคุณจริงไม่ได้ปลอม → คุณเซ็นกำกับด้วย <strong>Private Key ของตัวคุณเอง (ผู้ส่ง)</strong> แล้วให้ทุกคนเอา <em>Public Key ของคุณ</em> มาตรวจยืนยัน!</li>
    </ul>
  </li>
  <li><strong>Hash Function (เช่น SHA-256):</strong> ไม่ใช่การเข้ารหัสเพื่อถอดอ่านคืน แต่เป็นการ <strong>"ปั่นข้อมูลทางเดียว (One-way)"</strong> ได้รหัสลายนิ้วมือความยาวคงที่ (Digest) ถ้าข้อมูลต้นฉบับเปลี่ยนแม้แต่ตัวเดียว ค่า Hash จะเปลี่ยนไปคนละเรื่องและถอดย้อนกลับไม่ได้! นิยมใช้เก็บรหัสผ่านในฐานข้อมูลและเช็กความสมบูรณ์ของไฟล์ (Integrity)</li>
  <li><strong>SSL/TLS &amp; Digital Certificate (กุญแจล็อกบนเบราว์เซอร์ HTTPS):</strong> ทำไมเวลาเข้าเว็บราชการ <code>https://...</code> จึงปลอดภัย? เพราะเว็บมี <strong>Digital Certificate (ใบรับรองดิจิทัล)</strong> ที่ออกโดยองค์กรกลางที่เชื่อถือได้ (<strong>CA — Certificate Authority</strong>) เพื่อรับรองว่า Public Key นี้เป็นของหน่วยงานนั้นจริงไม่ได้ถูกแฮกเกอร์ปลอม จากนั้นเบราว์เซอร์และเซิร์ฟเวอร์จะจับมือแบบ Asymmetric เพื่อแลกกุญแจชั่วคราว แล้วสลับมาใช้ Symmetric คุยกันด้วยความเร็วสูงและเข้ารหัสตลอดทาง!</li>
</ul>`,
      },
      {
        id: 'it-laws',
        title: '4. กฎหมายไอที: พ.ร.บ. คอมพิวเตอร์ฯ (ฉบับที่ 2) พ.ศ. 2560 และ PDPA พ.ศ. 2562',
        analogyBox: {
          title: 'เปรียบเทียบให้เห็นภาพ: กฎหมายจราจรและอาญาไซเบอร์ vs กฎหมายสิทธิความเป็นส่วนตัว',
          body: '• <strong>พ.ร.บ. คอมพิวเตอร์ฯ 2560:</strong> เหมือน <strong>"กฎหมายอาญาและกฎจราจรบนถนนดิจิทัล"</strong> ห้ามบุกรุกบ้านคนอื่น (ม.5/ม.7), ห้ามลบแก้ไฟล์ (ม.9), ห้ามปิดถนนทำรถติด DDoS (ม.10), ห้ามยัดใบปลิวสแปม (ม.11) และร้านเน็ต/หน่วยงานรัฐต้องติดกล้องวงจรปิดเก็บ Log 90 วัน (ม.26)<br>• <strong>PDPA 2562:</strong> เหมือน <strong>"กฎหมายคุ้มครองเจ้าของข้อมูลส่วนบุคคล"</strong> ย้ำว่าข้อมูลบัตรประชาชน เบอร์โทร รูปถ่าย หรือลายนิ้วมือเป็นของประชาชน หน่วยงานจะเก็บหรือใช้ต้องบอกเหตุผลให้ชัด มีฐานกฎหมายรองรับ และห้ามนำไปใช้ผิดวัตถุประสงค์'
        },
        bodyHtml: `
<p>ส่วนนี้คือ <strong>"คะแนนช่วย" ที่ห้ามพลาดเด็ดขาด</strong> เพราะออกสอบทั้งภาค ก. ภาค ข. และภาคเฉพาะตำแหน่งนักวิชาการคอมพิวเตอร์ทุกกรม! มาทำความเข้าใจเหตุผลและตัวบทกฎหมายทั้ง 2 ฉบับให้แม่นยำ 100% ครับ</p>

<h3>ส่วนที่ 1: พ.ร.บ. ว่าด้วยการกระทำความผิดเกี่ยวกับคอมพิวเตอร์ พ.ศ. 2550 และ (ฉบับที่ 2) พ.ศ. 2560</h3>
<p>เวลาจำมาตรา 5–10 ให้แยก <strong>"ตัวระบบ (เครื่อง/เครือข่าย)"</strong> กับ <strong>"ข้อมูล (ไฟล์/ตัวเลข/ข้อความ)"</strong> ออกจากกันก่อนจะจำง่ายขึ้นมากครับ: เข้าถึง <em>ระบบ</em> (ม.5) → เผยวิธีเข้า (ม.6) → เข้าถึง <em>ข้อมูล</em> (ม.7) → แก้ไข/ทำลาย <em>ข้อมูล</em> (ม.9) → ก่อกวน <em>ระบบ</em> (ม.10)</p>

<div class="table-wrap">
  <table>
    <caption>สรุปมาตราสำคัญ พ.ร.บ. คอมพิวเตอร์ฯ พ.ศ. 2560 (อะไรคืออะไร และจุดเน้นออกสอบ)</caption>
    <thead>
      <tr>
        <th scope="col">มาตรา</th>
        <th scope="col">ฐานความผิดและตัวอย่างพฤติกรรมจริง</th>
        <th scope="col">อัตราโทษ / จุดเน้นที่ต้องจำ</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th scope="row">มาตรา 5</th>
        <td>เข้าถึง <strong>ระบบ</strong> คอมพิวเตอร์โดยมิชอบ (ระบบมีรหัสผ่าน/มาตรการป้องกันไว้ แต่ไปแอบเจาะหรือเดารหัสเข้าไปใช้โดยไม่มีสิทธิ์)</td>
        <td>จำคุกไม่เกิน <strong>6 เดือน</strong> หรือปรับไม่เกิน <strong>10,000 บาท</strong> หรือทั้งจำทั้งปรับ</td>
      </tr>
      <tr>
        <th scope="row">มาตรา 6</th>
        <td>ล่วงรู้มาตรการป้องกันการเข้าถึงระบบฯ แล้วนำไปเปิดเผยโดยมิชอบ (เช่น เอารหัสผ่านหรือช่องโหว่ระบบหน่วยงานไปโพสต์แจกคนอื่น)</td>
        <td>จำคุกไม่เกิน <strong>1 ปี</strong> หรือปรับไม่เกิน <strong>20,000 บาท</strong> หรือทั้งจำทั้งปรับ</td>
      </tr>
      <tr>
        <th scope="row">มาตรา 7</th>
        <td>เข้าถึง <strong>ข้อมูล</strong> คอมพิวเตอร์โดยมิชอบ (เช่น ล็อกอินเข้าเครื่องคนอื่นแล้วไปแอบเปิดอ่านไฟล์หรือดึงข้อมูลลับ)</td>
        <td>จำคุกไม่เกิน <strong>2 ปี</strong> หรือปรับไม่เกิน <strong>40,000 บาท</strong> หรือทั้งจำทั้งปรับ (หนักกว่า ม.5!)</td>
      </tr>
      <tr>
        <th scope="row">มาตรา 9</th>
        <td>ทำให้เสียหาย ทำลาย แก้ไข เปลี่ยนแปลง หรือเพิ่มเติม <strong>ข้อมูล</strong> คอมพิวเตอร์โดยมิชอบ (เช่น แอบลบประวัติหรือแก้ตัวเลขในฐานข้อมูล)</td>
        <td>จำคุกไม่เกิน <strong>5 ปี</strong> หรือปรับไม่เกิน <strong>100,000 บาท</strong> หรือทั้งจำทั้งปรับ</td>
      </tr>
      <tr>
        <th scope="row">มาตรา 10</th>
        <td>กระทำการใดๆ เพื่อให้การทำงานของ <strong>ระบบ</strong> คอมพิวเตอร์ผู้อื่นถูกระงับ ชะลอ ขัดขวาง หรือรบกวน (เช่น ยิง DDoS หรือปล่อย Worm จนระบบล่ม)</td>
        <td>จำคุกไม่เกิน <strong>5 ปี</strong> หรือปรับไม่เกิน <strong>100,000 บาท</strong> หรือทั้งจำทั้งปรับ</td>
      </tr>
      <tr>
        <th scope="row">มาตรา 11</th>
        <td><strong>สแปม (Spam — แก้ไขเพิ่มใหม่ใน พ.ศ. 2560):</strong> ส่งข้อมูลหรืออีเมลก่อกวนโดยปกปิด/ปลอมแหล่งที่มา หรือส่งโฆษณาโดยไม่เปิดโอกาสให้ผู้รับแจ้งยกเลิกไม่รับได้โดยง่าย (ไม่มีปุ่ม Unsubscribe)</td>
        <td>ปรับไม่เกิน <strong>200,000 บาท</strong> (กรณีส่งโดยไม่เปิดช่องให้บอกเลิกได้โดยง่าย)</td>
      </tr>
      <tr>
        <th scope="row">มาตรา 12</th>
        <td>การกระทำตาม ม.9 หรือ ม.10 ต่อระบบที่เกี่ยวกับ <strong>ความมั่นคงปลอดภัยของประเทศ ความปลอดภัยสาธารณะ ความมั่นคงทางเศรษฐกิจ หรือบริการสาธารณะ (Critical Infrastructure)</strong> เช่น ระบบไฟฟ้า ประปา โรงพยาบาล การเงิน หรือทะเบียนราษฎร/ที่ดิน</td>
        <td>โทษหนักขึ้นมาก: จำคุก <strong>1–7 ปี</strong> และปรับ <strong>20,000–140,000 บาท</strong> (หากก่อความเสียหายร้ายแรง 3–15 ปี)</td>
      </tr>
      <tr>
        <th scope="row">มาตรา 14</th>
        <td>นำเข้าข้อมูลปลอม/เท็จที่น่าจะเกิดความเสียหายแก่ประชาชน ความมั่นคง เศรษฐกิจ หรือข้อมูลลามก<br><strong>ข้อควรจำ (แก้ไขปี 2560):</strong> <em>ความผิดฐานหมิ่นประมาทถูกตัดออกจาก ม.14(1) แล้ว ให้ไปดำเนินคดีตามประมวลกฎหมายอาญาแทน!</em> เพื่อป้องกันการฟ้องปิดปากด้วยโทษหนักเกินเหตุ</td>
        <td>จำคุกไม่เกิน <strong>5 ปี</strong> หรือปรับไม่เกิน <strong>100,000 บาท</strong> (กรณีทุจริตหลอกลวง/กระทบประชาชน/ความมั่นคง)</td>
      </tr>
      <tr>
        <th scope="row">มาตรา 16</th>
        <td>นำเข้าภาพผู้อื่นที่สร้างขึ้น <strong>ตัดต่อ เติม หรือดัดแปลง</strong> (รวมถึงภาพ AI/Deepfake) ทำให้ผู้อื่นเสียชื่อเสียง อับอาย ถูกดูหมิ่น (คุ้มครองรวมถึงผู้เสียชีวิตด้วย)</td>
        <td>จำคุกไม่เกิน <strong>3 ปี</strong> และปรับไม่เกิน <strong>200,000 บาท</strong> (ยกเว้นกระทำโดยสุจริตตามวรรคท้าย)</td>
      </tr>
      <tr>
        <th scope="row">มาตรา 26</th>
        <td><strong>ผู้ให้บริการ (Service Provider — รวมถึงหน่วยงานรัฐ/องค์กรที่ให้บริการ Wi-Fi หรือเครือข่ายภายใน)</strong> ต้องเก็บรักษาข้อมูลจราจรทางคอมพิวเตอร์ (<strong>Log File</strong>)</td>
        <td>เก็บไว้ <strong>ไม่น้อยกว่า 90 วัน</strong> (พนักงานเจ้าหน้าที่สั่งเก็บขยายเวลาเฉพาะกรณีจำเป็นได้ไม่เกิน <strong>2 ปี</strong>) ฝ่าฝืนปรับไม่เกิน 500,000 บาท</td>
      </tr>
    </tbody>
  </table>
</div>

<div class="callout callout-info">
  <strong><i class="fa-solid fa-file-lines" aria-hidden="true"></i> ขยายความมาตรา 26: Log File คืออะไร? ต้องเก็บข้อมูลอะไรบ้าง?</strong>
  <strong>Log File (ข้อมูลจราจรทางคอมพิวเตอร์)</strong> ไม่ใช่การแอบบันทึกเนื้อหาแชทหรือรหัสผ่านของประชาชน แต่คือ <strong>"สมุดลงเวลาเข้า-ออกระบบ"</strong> ที่บันทึกหลักฐาน 4 อย่างเพื่อใช้สืบหาตัวคนร้ายย้อนหลัง: (1) <strong>ใคร</strong> (Username/MAC Address), (2) <strong>จากที่ไหน</strong> (IP Address &amp; Port ต้นทาง/ปลายทาง), (3) <strong>เมื่อไร</strong> (วันที่และเวลาที่ต้องซิงก์ตรงกับเวลามาตรฐาน NTP), และ (4) <strong>ทำกิจกรรมเชื่อมต่ออะไร</strong> — โดยต้องเก็บไว้ไม่น้อยกว่า <strong>90 วัน</strong>!
</div>

<h3>ส่วนที่ 2: พ.ร.บ. คุ้มครองข้อมูลส่วนบุคคล พ.ศ. 2562 (PDPA)</h3>
<p><strong>PDPA (Personal Data Protection Act)</strong> คือกฎหมายที่คุ้มครองข้อมูลของ <strong>"บุคคลธรรมดาที่มีชีวิตอยู่"</strong> เท่านั้น <em>(ไม่คุ้มครองข้อมูลของบริษัท/นิติบุคคล และไม่คุ้มครองผู้เสียชีวิตแล้ว)</em> โดยแบ่งบทบาทตัวละครหลักออกเป็น 4 ฝ่าย:</p>
<ul>
  <li><strong>Data Subject (เจ้าของข้อมูลส่วนบุคคล):</strong> บุคคลธรรมดาที่เป็นเจ้าของข้อมูลนั้น เช่น ประชาชนผู้มายื่นคำขอจดทะเบียนที่ดิน หรือข้าราชการในสังกัด</li>
  <li><strong>Data Controller (ผู้ควบคุมข้อมูลส่วนบุคคล):</strong> บุคคลหรือนิติบุคคลที่มีอำนาจหน้าที่ <strong>"ตัดสินใจ"</strong> ว่าจะเก็บ ใช้ หรือเปิดเผยข้อมูลส่วนบุคคลไปเพื่อวัตถุประสงค์ใด เช่น <strong>กรมที่ดิน</strong> (เป็นผู้กำหนดนโยบายและสั่งเก็บข้อมูล)</li>
  <li><strong>Data Processor (ผู้ประมวลผลข้อมูลส่วนบุคคล):</strong> บุคคลหรือนิติบุคคลที่เข้ามาเก็บ ใช้ หรือประมวลผลข้อมูล <strong>"ตามคำสั่งหรือในนามของ Data Controller"</strong> (ไม่ได้ตัดสินใจวัตถุประสงค์เอง) เช่น บริษัท Outsource เอกชนที่รับจ้างดูแลระบบ Server/Cloud หรือพัฒนาระบบให้กรมที่ดิน</li>
  <li><strong>DPO (Data Protection Officer — เจ้าหน้าที่คุ้มครองข้อมูลส่วนบุคคล):</strong> ผู้เชี่ยวชาญที่องค์กรแต่งตั้งขึ้นเพื่อตรวจสอบ กำกับดูแล ให้คำแนะนำ และเป็นจุดประสานงานกับสำนักงานคณะกรรมการคุ้มครองข้อมูลส่วนบุคคล (สคส.) — หน่วยงานของรัฐตามประกาศกำหนดต้องแต่งตั้ง DPO ด้วย</li>
</ul>

<h4>ข้อมูลส่วนบุคคลทั่วไป vs ข้อมูลส่วนบุคคลอ่อนไหว (Sensitive Data)</h4>
<div class="table-wrap">
  <table>
    <caption>เปรียบเทียบข้อมูลส่วนบุคคลทั่วไป (มาตรา 6) vs ข้อมูลส่วนบุคคลอ่อนไหว (มาตรา 26)</caption>
    <thead>
      <tr>
        <th scope="col">ประเภทข้อมูลตาม PDPA</th>
        <th scope="col">ตัวอย่างข้อมูล (จำกลุ่มเสี่ยงให้แม่น!)</th>
        <th scope="col">หลักเกณฑ์การเก็บรวบรวม/ใช้</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th scope="row">Personal Data<br>(ข้อมูลส่วนบุคคลทั่วไป)</th>
        <td>ชื่อ-นามสกุล, เลขบัตรประชาชน, ที่อยู่, เบอร์โทรศัพท์, อีเมล, รูปถ่าย, ทะเบียนรถ, IP Address/Cookie ที่สืบถึงตัวบุคคลได้</td>
        <td>เก็บใช้ได้โดยต้องอาศัย <strong>ฐานทางกฎหมาย 1 ใน 6 ข้อ (Lawful Basis)</strong> ด้านล่างนี้ พร้อมแจ้งวัตถุประสงค์ให้เจ้าของข้อมูลทราบ (Privacy Notice)</td>
      </tr>
      <tr>
        <th scope="row">Sensitive Personal Data<br>(ข้อมูลอ่อนไหว มาตรา 26)</th>
        <td>เชื้อชาติ, เผ่าพันธุ์, ความคิดเห็นทางการเมือง, ความเชื่อในลัทธิ/ศาสนา, พฤติกรรมทางเพศ, ประวัติอาชญากรรม, <strong>ข้อมูลสุขภาพ</strong>, ความพิการ, ข้อมูลสหภาพแรงงาน, พันธุกรรม, <strong>ข้อมูลชีวภาพ (Biometric เช่น ลายนิ้วมือ/สแกนใบหน้า/ม่านตา)</strong></td>
        <td><strong>ห้ามเก็บเด็ดขาด!</strong> เว้นแต่ได้รับ <strong>ความยินยอมโดยชัดแจ้ง (Explicit Consent)</strong> หรือเข้าข้อยกเว้นเฉพาะตามกฎหมาย (เช่น ป้องกันอันตรายต่อชีวิต หรือประโยชน์สาธารณะสำคัญตาม ม.26)</td>
      </tr>
    </tbody>
  </table>
</div>

<h4>ฐานทางกฎหมาย 6 ประการ (6 Lawful Bases) สำหรับการเก็บใช้ข้อมูลทั่วไป</h4>
<p><em>ข้อเข้าใจผิดยอดฮิต:</em> หลายคนนึกว่าทุกเรื่องต้องขอเซ็นยินยอม (Consent) เสมอ! จริงๆ แล้ว PDPA มีฐานกฎหมาย 6 ข้อให้เลือกใช้ตามความเหมาะสม (โดยงานราชการมักใช้ฐานที่ 3 และ 5 เป็นหลัก):</p>
<ol>
  <li><strong>Consent (ความยินยอม):</strong> เจ้าของข้อมูลกดยินยอมโดยอิสระและชัดแจ้ง (ต้องถอนความยินยอมเมื่อไรก็ได้ เช่น ยินยอมรับข่าวสารประชาสัมพันธ์)</li>
  <li><strong>Contract (การปฏิบัติตามสัญญา):</strong> จำเป็นต้องใช้ข้อมูลเพื่อทำตามสัญญา (เช่น เก็บที่อยู่และเลขบัญชีเพื่อทำสัญญาจ้างหรือส่งมอบของ)</li>
  <li><strong>Legal Obligation (หน้าที่ตามกฎหมาย):</strong> กฎหมายอื่นบังคับให้องค์กรต้องเก็บ (เช่น กฎหมายภาษีบังคับเก็บข้อมูลผู้เสียภาษี, พ.ร.บ.คอมฯ ม.26 บังคับเก็บ Log 90 วัน)</li>
  <li><strong>Vital Interests (ป้องกันหรือระงับอันตรายต่อชีวิต):</strong> เหตุฉุกเฉินเร่งด่วนเกี่ยวกับชีวิต ร่างกาย หรือสุขภาพ (เช่น ส่งประวัติการแพ้ยาของผู้ป่วยหมดสติให้ห้องฉุกเฉิน)</li>
  <li><strong>Public Task (ภารกิจเพื่อประโยชน์สาธารณะ / อำนาจรัฐ):</strong> <strong>ฐานหลักของหน่วยงานราชการ!</strong> เช่น กรมที่ดินเก็บข้อมูลผู้ซื้อ-ผู้ขายเพื่อจดทะเบียนโอนกรรมสิทธิ์ตามประมวลกฎหมายที่ดิน (ไม่ต้องให้ประชาชนเซ็น Consent เพิ่ม เพราะทำตามอำนาจหน้าที่รัฐ!)</li>
  <li><strong>Legitimate Interests (ประโยชน์โดยชอบด้วยกฎหมาย):</strong> ประโยชน์อันสมเหตุสมผลขององค์กรโดยไม่กระทบสิทธิเจ้าของข้อมูลเกินควร (เช่น ติดกล้อง CCTV รักษาความปลอดภัยหน้าอาคารสำนักงานพร้อมติดป้ายแจ้งเตือน)</li>
</ol>

<div class="callout callout-info">
  <strong><i class="fa-solid fa-gavel" aria-hidden="true"></i> สิทธิ 7 ประการของเจ้าของข้อมูล (Data Subject Rights) ตาม PDPA:</strong>
  (1) <strong>สิทธิได้รับแจ้งรายละเอียด (Right to be Informed)</strong> ว่าเก็บอะไรไปทำอะไร, (2) <strong>สิทธิขอเข้าถึงและขอรับสำเนา (Access)</strong>, (3) <strong>สิทธิขอโอนย้ายข้อมูล (Data Portability)</strong> ในรูปแบบที่เครื่องอ่านได้, (4) <strong>สิทธิคัดค้าน (Object)</strong> การเก็บ/ใช้/เปิดเผย, (5) <strong>สิทธิขอให้ลบ/ทำลาย (Erasure / Right to be Forgotten)</strong> เมื่อหมดความจำเป็นหรือถอน Consent, (6) <strong>สิทธิขอระงับการใช้ชั่วคราว (Restrict)</strong>, และ (7) <strong>สิทธิขอแก้ไขข้อมูลให้ถูกต้องเป็นปัจจุบัน (Rectification)</strong>
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
