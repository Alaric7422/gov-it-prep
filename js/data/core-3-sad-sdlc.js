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
    subtitle: 'ปูพื้นจากศูนย์เรื่อง SA&D, TOR ราชการ, วงจร SDLC 7 ขั้น, Feasibility/ROI/NPV, Waterfall vs Agile (Scrum), Flowchart vs DFD, UML และระดับการทดสอบ UAT',
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
      'SA&D คือการทำความเข้าใจปัญหา (Analysis) และเขียนแบบแปลนระบบ (Design) ก่อนเขียนโค้ด โดยมีนักวิเคราะห์ระบบ (SA) เป็นตัวกลางเชื่อมผู้ใช้กับทีมพัฒนา และมี TOR เป็นสัญญาขอบเขตงานราชการ',
      'SDLC มี 7 ขั้นตอนเรียงลำดับชัดเจน โดยขั้น Planning ต้องทำ Feasibility Study 4 ด้าน (Technical, Economic ด้วย ROI/Payback/NPV, Operational, Schedule) และขั้น Deploy เลือกเปลี่ยนระบบได้ 4 แบบ (Direct Cutover, Parallel, Pilot, Phased)',
      'Waterfall เดินหน้าทีละขั้นเหมาะกับงาน TOR ขอบเขตนิ่ง ส่วน Agile (Scrum) ทำงานเป็นรอบสั้น 1–4 สัปดาห์ (Sprint) โดยมี Product Owner คุม Backlog และ Scrum Master ดูแลทีม',
      'Flowchart ใช้วาดลำดับคำสั่งและการตัดสินใจของโปรแกรม (แคปซูล=เริ่ม/จบ, ผืนผ้า=ประมวลผล, ข้าวหลามตัด=เงื่อนไข, ด้านขนาน=รับ/แสดงผล) ส่วน DFD ใช้วาดเส้นทางไหลของข้อมูลทั้งระบบ',
      'DFD Level 0 (Context Diagram) มี Process ก้อนเดียวและห้ามมี Data Store; ข้อมูลทุกเส้นต้องวิ่งผ่าน Process เสมอ ส่วน Use Case: <<include>> ชี้ไปตัวบังคับ, <<extend>> ชี้จากตัวเสริมกลับไปตัวหลัก และ UAT คือด่านตรวจรับโดยผู้ใช้จริง'
    ],
    sections: [
      {
        id: 'sdlc-models',
        title: '1. วงจรการพัฒนาระบบ (SDLC) และ Waterfall vs Agile',
        analogyBox: {
          title: 'เปรียบเทียบให้เห็นภาพ: สร้างตึกสำนักงานตามแบบแปลน vs เปิดร้านอาหารแบบทำเมนูชิม',
          body: '• <strong>SA&amp;D และ SDLC:</strong> ก่อนสร้างอาคารกรมที่ดิน ต้องมี <strong>สถาปนิก (SA)</strong> ไปถามเจ้าหน้าที่ว่าต้องการกี่ห้อง เอกสารเดินยังไง แล้วเขียนแบบแปลนให้ <strong>ผู้รับเหมา (Programmer)</strong> สร้างตาม <strong>สัญญา TOR</strong><br>• <strong>Waterfall (น้ำตก):</strong> เหมือน <strong>"สร้างอาคารราชการตามแบบแปลนเป๊ะ"</strong> ต้องออกแบบให้จบ 100% ก่อนตอกเสาเข็ม แก้กลางคันยากมาก แต่งบและเอกสารส่งมอบชัดเจน<br>• <strong>Agile (Scrum):</strong> เหมือน <strong>"เปิดร้านอาหารแบบทำเมนูชิม"</strong> ทำจานแรกออกมาให้ลูกค้าชิมใน 2 สัปดาห์ (<strong>Sprint</strong>) แล้วรับฟีดแบ็กมาปรับปรุงรอบหน้าจนถูกใจ'
        },
        bodyHtml: `
<p>น้องๆ ที่เพิ่งเริ่มอ่านวิชาการวิเคราะห์และออกแบบระบบ อย่าเพิ่งจำศัพท์อังกฤษรวดเดียวครับ พี่ขอปูพื้นให้เห็นภาพก่อนว่า <strong>"ทำไมเราถึงไม่เปิดคอมแล้วเขียนโค้ดเลย?"</strong> เพราะระบบราชการ 1 ระบบมีมูลค่าหลายสิบล้านบาท เชื่อมโยงข้อมูลประชาชนทั้งประเทศ ถ้าคิดไม่ครบแล้วลงมือเขียนเลย พอสร้างเสร็จอาจใช้งานจริงไม่ได้หรือแก้บานปลายครับ</p>

<h3>อะไรคือ SA&amp;D, System Analyst (SA) และ TOR ในงานไอทีภาครัฐ?</h3>
<ul>
  <li><strong>SA&amp;D (System Analysis and Design — การวิเคราะห์และออกแบบระบบ):</strong> คืองาน 2 ช่วงสำคัญก่อนลงมือเขียนโปรแกรม:
    <ul>
      <li><strong>Analysis (วิเคราะห์ = ทำ "อะไร"):</strong> สำรวจปัญหาและเก็บความต้องการให้ชัดเจนว่าระบบต้องทำอะไรได้บ้างเพื่อแก้ปัญหาขององค์กร</li>
      <li><strong>Design (ออกแบบ = ทำ "อย่างไร"):</strong> แปลงความต้องการนั้นเป็นพิมพ์เขียวทางเทคนิค เช่น โครงสร้างตารางฐานข้อมูล หน้าจอ UI โครงสร้างเครือข่าย และระบบความปลอดภัย</li>
    </ul>
  </li>
  <li><strong>System Analyst (SA — นักวิเคราะห์ระบบ):</strong> คือ <strong>"ล่ามและสะพานเชื่อม"</strong> ระหว่างผู้ใช้งานที่ไม่ถนัดภาษาคอมฯ (เช่น เจ้าหน้าที่ทะเบียนที่ดิน, ผู้บริหาร) กับโปรแกรมเมอร์ที่ไม่รู้ระเบียบกฎหมายหน้างาน SA ต้องฟังภาษาคนให้ออก แล้วเขียนสรุปเป็นสเปกให้ทีมโปรแกรมเมอร์สร้างได้ตรงปก</li>
  <li><strong>TOR (Terms of Reference — ขอบเขตของงาน):</strong> คือ <strong>"เอกสารสัญญาแม่บทในการจัดซื้อจัดจ้างภาครัฐ"</strong> เวลาหน่วยงานราชการจะจ้างเอกชนพัฒนาระบบ ต้องเขียน TOR ระบุให้ชัดว่าต้องทำฟีเจอร์อะไรบ้าง ใช้เทคโนโลยีระดับไหน ส่งมอบกี่งวด กำหนดวันแล้วเสร็จ รวมถึงเงื่อนไขการตรวจรับ (UAT) และการรับประกันหลังส่งมอบ (SLA)</li>
</ul>

<h3>วงจรการพัฒนาระบบ (SDLC) 7 ขั้นตอน: ขั้นไหนรับอะไรเข้า และส่งอะไรออก?</h3>
<p><strong>SDLC (Software Development Life Cycle)</strong> คือวงจรชีวิตมาตรฐานของซอฟต์แวร์ ตั้งแต่เกิดไอเดียจนถึงวันที่ปลดระวางเลิกใช้งาน มี 7 ขั้นตอนหลักที่ข้อสอบมักถามทั้งลำดับและรายละเอียดข้างใน:</p>

<ol>
  <li><strong>Planning (การวางแผนโครงการ):</strong>
    <em>รับเข้า:</em> ปัญหาหน้างาน / นโยบายผู้บริหาร | <em>ทำอะไร:</em> กำหนดเป้าหมาย ขอบเขต งบประมาณ ตารางเวลา และทำ <strong>Feasibility Study (การศึกษาความเป็นไปได้)</strong> เพื่อฟันธงว่า "โครงการนี้ควรเดินหน้าต่อหรือพับเก็บ?" โดยประเมิน 4 ด้าน:
    <ul>
      <li><strong>Technical Feasibility (ด้านเทคนิค):</strong> เทคโนโลยี ฮาร์ดแวร์ ซอฟต์แวร์ และทักษะทีมงานที่มีอยู่ สามารถสร้างระบบนี้ได้จริงหรือไม่</li>
      <li><strong>Economic Feasibility (ด้านความคุ้มค่าทางการเงิน):</strong> ลงทุนแล้วคุ้มไหม? ข้อสอบชอบถามตัวชี้วัด 3 ตัวนี้:
        <ul>
          <li><strong>ROI (Return on Investment — ผลตอบแทนจากการลงทุน):</strong> คิดเป็นเปอร์เซ็นต์ว่าผลประโยชน์สุทธิที่ได้เทียบกับเงินลงทุนคุ้มแค่ไหน สูตรจำง่ายคือ <code>(ผลประโยชน์รวม - ต้นทุนรวม) ÷ ต้นทุนรวม × 100%</code></li>
          <li><strong>Payback Period (ระยะเวลาคืนทุน):</strong> ต้องใช้เวลากี่ปีกี่เดือน ผลประโยชน์หรือเงินที่ประหยัดได้จึงจะเท่ากับเงินที่ลงทุนไป (ยิ่งคืนทุนเร็ว ยิ่งดี!)</li>
          <li><strong>NPV (Net Present Value — มูลค่าปัจจุบันสุทธิ):</strong> เงิน 1 ล้านบาทในอีก 5 ปีข้างหน้ามีค่าไม่เท่ากับ 1 ล้านบาทวันนี้ จึงต้องคำนวณผลตอบแทนในอนาคตทอนกลับมาเป็นมูลค่าเงินวันนี้แล้วหักเงินลงทุน <strong>ถ้า NPV &gt; 0 แปลว่าคุ้มค่าน่าลงทุน!</strong></li>
        </ul>
      </li>
      <li><strong>Operational Feasibility (ด้านการปฏิบัติงาน/คน):</strong> เมื่อระบบสร้างเสร็จ เจ้าหน้าที่หน้าเคาน์เตอร์และประชาชนจะใช้งานจริงได้ไหม ยอมรับการเปลี่ยนแปลงหรือเปล่า</li>
      <li><strong>Schedule Feasibility (ด้านระยะเวลา):</strong> สร้างเสร็จทันกรอบเวลาตามสัญญา TOR หรือวันประกาศใช้กฎหมายใหม่หรือไม่</li>
    </ul>
    <em>ผลลัพธ์ที่ได้:</em> รายงานความเป็นไปได้ (Feasibility Report) และแผนโครงการ (Project Plan)
  </li>

  <li><strong>System Analysis (การวิเคราะห์ระบบ):</strong>
    <em>รับเข้า:</em> แผนโครงการและขอบเขต | <em>ทำอะไร:</em> ลงพื้นที่เก็บความต้องการที่แท้จริง (<strong>Requirement Gathering</strong>) ด้วย 5 เทคนิคยอดฮิต แล้วนำไปวาดแบบจำลองการทำงาน (เช่น DFD, ERD):
    <ul>
      <li><strong>Interview (การสัมภาษณ์):</strong> คุยตัวต่อตัวกับผู้บริหารหรือเจ้าหน้าที่เก่งๆ → <em>ข้อดี:</em> ได้ข้อมูลลึก ถามซักต่อได้ทันที | <em>ข้อเสีย:</em> ใช้เวลานาน นัดยาก</li>
      <li><strong>Questionnaire (แบบสอบถาม):</strong> ส่งแบบฟอร์มให้ผู้ใช้หลายร้อยคนตอบ → <em>ข้อดี:</em> เก็บได้จำนวนมาก ประหยัดเวลา | <em>ข้อเสีย:</em> คำตอบสั้น ไม่ลึก คนมักตอบส่งๆ</li>
      <li><strong>Observation (การสังเกตการณ์):</strong> ไปนั่งดูเจ้าหน้าที่ทำงานจริงหน้าเคาน์เตอร์ → <em>ข้อดี:</em> เห็นขั้นตอนจริงและทางลัดที่ผู้ใช้อาจลืมเล่า | <em>ข้อเสีย:</em> คนถูกดูอาจเกร็ง ทำตามตำราเกินจริง</li>
      <li><strong>Document Analysis (การศึกษาเอกสารเดิม):</strong> อ่านคู่มือปฏิบัติงาน กฎหมาย ระเบียบ แบบฟอร์มกระดาษ → <em>ข้อดี:</em> เข้าใจกติการาชการแม่นยำ | <em>ข้อเสีย:</em> เอกสารบางฉบับเก่า ไม่อัปเดตตรงหน้างาน</li>
      <li><strong>JAD (Joint Application Design Workshop):</strong> จัดประชุมเวิร์กชอปดึงตัวแทนผู้ใช้ + SA + ทีมพัฒนามานั่งตกลงร่วมกันในห้องเดียว → <em>ข้อดี:</em> ลดความเข้าใจไม่ตรงกัน ตัดสินใจสรุปสเปกได้ไว</li>
    </ul>
    <em>ผลลัพธ์ที่ได้:</em> เอกสารข้อกำหนดซอฟต์แวร์ (<strong>SRS — Software Requirements Specification</strong>) และแบบจำลองระบบ
  </li>

  <li><strong>System Design (การออกแบบระบบ):</strong>
    <em>รับเข้า:</em> เอกสาร SRS จากขั้นวิเคราะห์ | <em>ทำอะไร:</em> ออกแบบหน้าจอ UI/UX, ออกแบบโครงสร้างฐานข้อมูล (Tables, Primary/Foreign Key), ออกแบบ API, สถาปัตยกรรมเครือข่าย และสิทธิ์ความปลอดภัย | <em>ผลลัพธ์ที่ได้:</em> เอกสารออกแบบระบบ (System Design Document)
  </li>

  <li><strong>Development / Coding (การพัฒนาโปรแกรม):</strong>
    <em>รับเข้า:</em> แบบแปลน System Design | <em>ทำอะไร:</em> โปรแกรมเมอร์ลงมือเขียนโค้ด สร้างฐานข้อมูล และเชื่อมต่อระบบตามสเปก | <em>ผลลัพธ์ที่ได้:</em> ซอฟต์แวร์ที่รันทำงานได้จริง (Source Code &amp; Modules)
  </li>

  <li><strong>Testing (การทดสอบระบบ):</strong>
    <em>รับเข้า:</em> ซอฟต์แวร์ที่พัฒนาเสร็จ | <em>ทำอะไร:</em> ไล่ตรวจจับ Bug ตั้งแต่ระดับฟังก์ชันย่อย การเชื่อมต่อระบบ ทดสอบรับโหลด จนถึงให้ผู้ใช้จริงทดสอบตรวจรับ (UAT) | <em>ผลลัพธ์ที่ได้:</em> รายงานผลการทดสอบและใบตรวจรับระบบ
  </li>

  <li><strong>Implementation / Deployment (การติดตั้งและเปลี่ยนผ่านสู่ระบบจริง):</strong>
    <em>รับเข้า:</em> ระบบที่ผ่าน UAT แล้ว | <em>ทำอะไร:</em> ย้ายข้อมูลจริง (Data Migration), อบรมเจ้าหน้าที่, และเปิดใช้ระบบจริงโดยเลือก <strong>กลยุทธ์การเปลี่ยนระบบ (System Conversion)</strong> ให้เหมาะกับความเสี่ยง | <em>ผลลัพธ์ที่ได้:</em> ระบบจริงที่เปิดให้บริการ (Production System)
  </li>

  <li><strong>Maintenance (การบำรุงรักษา):</strong>
    <em>รับเข้า:</em> ระบบที่เปิดใช้งานจริงและฟีดแบ็กปัญหาหน้างาน | <em>ทำอะไร:</em> แก้ไขข้อผิดพลาด ปรับตามกฎหมายใหม่ เพิ่มฟีเจอร์ และดูแลความเสถียรตลอดอายุการใช้งาน
  </li>
</ol>

<h3>กลยุทธ์การเปลี่ยนผ่านระบบ 4 แบบ (System Conversion Strategies)</h3>
<div class="table-wrap">
  <table>
    <caption>เปรียบเทียบวิธีเปลี่ยนจากระบบเก่าเป็นระบบใหม่ (ออกสอบเลือกกลยุทธ์บ่อย!)</caption>
    <thead>
      <tr>
        <th scope="col">กลยุทธ์</th>
        <th scope="col">วิธีทำงานคืออะไร</th>
        <th scope="col">ข้อดี / ข้อเสีย และตัวอย่างงานราชการ</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th scope="row">1. Direct Cutover<br>(เปลี่ยนทันที / หักดิบ)</th>
        <td>ปิดระบบเก่า 100% แล้วเปิดใช้ระบบใหม่ทันทีในวันรุ่งขึ้น</td>
        <td><strong>ข้อดี:</strong> เร็ว ประหยัดสุด ไม่ต้องทำงานซ้ำซ้อน | <strong>ข้อเสีย:</strong> <em>เสี่ยงสูงสุด!</em> ถ้าระบบใหม่ล่มไม่มีระบบเก่าให้ถอยกลับ<br><em>ตัวอย่าง:</em> เปลี่ยนระบบเว็บไซต์ประชาสัมพันธ์ข่าวสารในช่วงวันหยุดยาว</td>
      </tr>
      <tr>
        <th scope="row">2. Parallel<br>(รันคู่ขนาน)</th>
        <td>เปิดใช้งานทั้งระบบเก่าและระบบใหม่พร้อมกันสักระยะ เพื่อเทียบผลลัพธ์ให้ตรงกันก่อนปิดตัวเก่า</td>
        <td><strong>ข้อดี:</strong> <em>ปลอดภัยที่สุด!</em> มีแผนสำรองตลอดเวลา | <strong>ข้อเสีย:</strong> เปลืองงบและแรงงาน เจ้าหน้าที่ต้องคีย์ข้อมูลซ้ำ 2 รอบ<br><em>ตัวอย่าง:</em> ระบบคำนวณภาษี/การเงินการคลัง หรือระบบจดทะเบียนสิทธิ์ที่ดินที่ห้ามพลาด</td>
      </tr>
      <tr>
        <th scope="row">3. Pilot<br>(นำร่องบางพื้นที่)</th>
        <td>เปิดใช้ระบบใหม่เต็มรูปแบบเฉพาะ 1–2 สาขานำร่องก่อน ถ้าเสถียรค่อยขยายทั่วประเทศ</td>
        <td><strong>ข้อดี:</strong> คุมความเสียหายให้อยู่ในวงแคบ แก้ไขปัญหาก่อนปูพรม | <strong>ข้อเสีย:</strong> กว่าจะใช้ครบทุกที่ต้องใช้เวลา<br><em>ตัวอย่าง:</em> ทดลองใช้ระบบคิวหรือจดทะเบียนออนไลน์ที่สำนักงานที่ดินนำร่อง 5 จังหวัดก่อนขยายครบ 462 สาขา</td>
      </tr>
      <tr>
        <th scope="row">4. Phased<br>(ทยอยเปิดทีละส่วน)</th>
        <td>แบ่งระบบใหญ่เป็นโมดูลย่อย แล้วทยอยเปิดทีละฟังก์ชันตามลำดับเดือน</td>
        <td><strong>ข้อดี:</strong> เจ้าหน้าที่ค่อยๆ เรียนรู้ทีละส่วน ไม่ช็อกงาน | <strong>ข้อเสีย:</strong> ต้องทำตัวเชื่อมชั่วคราวกับระบบเก่าที่ยังเปิดอยู่<br><em>ตัวอย่าง:</em> เดือนที่ 1 เปิดระบบรับคำขอ เดือนที่ 2 เปิดระบบชำระเงิน เดือนที่ 3 เปิดระบบออกรายงาน</td>
      </tr>
    </tbody>
  </table>
</div>

<h3>Waterfall vs Agile (Scrum): อะไรคืออะไร?</h3>
<p><strong>Waterfall Model (แบบน้ำตก)</strong> คือการทำ SDLC 7 ขั้นแบบเรียงตรงลงมาเหมือนน้ำตก ต้องเซ็นปิดขั้นก่อนหน้าให้จบ 100% ก่อนขยับไปขั้นถัดไป มีเอกสารครบถ้วนชัดเจน จึงเข้ากับโครงการจ้างทำตาม TOR ราชการที่งบประมาณและขอบเขตล็อกตายตัวไว้แล้ว</p>

<p>ส่วน <strong>Agile</strong> คือแนวคิดการพัฒนาที่ยอมรับว่า "ความต้องการของผู้ใช้เปลี่ยนได้เสมอ" โดยกรอบการทำงานของ Agile ที่ฮิตที่สุดในโลกคือ <strong>Scrum</strong> ซึ่งมีคำศัพท์เฉพาะที่ข้อสอบชอบเอามาถามว่าคืออะไร:</p>
<ul>
  <li><strong>Product Backlog:</strong> รายการฟีเจอร์และความต้องการทั้งหมดของระบบที่อยากสร้าง จัดเรียงตามความสำคัญจากบนลงล่าง (เหมือน To-Do List ใหญ่ของโครงการ)</li>
  <li><strong>Sprint:</strong> รอบการทำงานสั้นๆ ที่มีเวลาตายตัว ปกติรอบละ <strong>1–4 สัปดาห์</strong> จบ 1 Sprint ต้องได้ซอฟต์แวร์ส่วนที่ใช้งานได้จริงออกมาส่งมอบ</li>
  <li><strong>Daily Standup (Daily Scrum):</strong> การประชุมยืนสั้นๆ ทุกวัน วันละไม่เกิน 15 นาที เพื่ออัปเดตว่า "เมื่อวานทำอะไร / วันนี้จะทำอะไร / ติดปัญหาอะไรไหม" (จะได้รีบช่วยกันแก้ทันที)</li>
  <li><strong>Sprint Review:</strong> ประชุมตอนจบ Sprint เพื่อนำซอฟต์แวร์ที่สร้างเสร็จในรอบนี้มาเปิดเดโมให้ผู้ใช้จริงลองเล่นและติชม เพื่อปรับปรุงใน Sprint ถัดไป</li>
  <li><strong>Product Owner (PO):</strong> เจ้าของผลิตภัณฑ์ (ตัวแทนฝั่งผู้ใช้/เจ้าของงาน) มีหน้าที่จัดลำดับความสำคัญใน Product Backlog และตัดสินใจว่าฟีเจอร์ไหนทำก่อน-หลัง</li>
  <li><strong>Scrum Master:</strong> โค้ชผู้ดูแลกระบวนการ Scrum คอยช่วยให้ทีมทำงานราบรื่นและขจัดอุปสรรค (Impediments) — <em>ระวังหลอก! Scrum Master ไม่ใช่เจ้านายคอยสั่งโค้ดโปรแกรมเมอร์</em></li>
</ul>

<h4>ตารางสรุปเปรียบเทียบ Waterfall vs Agile (Scrum)</h4>
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
        analogyBox: {
          title: 'เปรียบเทียบให้เห็นภาพ: Flowchart vs DFD ต่างกันตรงไหน?',
          body: '• <strong>Flowchart (ผังงาน):</strong> เหมือน <strong>"สูตรทำอาหารทีละบรรทัด"</strong> โฟกัสที่ <em>ลำดับการทำงานของโปรแกรม (Control Flow)</em> เช่น เริ่มต้น → ใส่ไข่ → ถ้าสุกแล้วตักใส่จาน ถ้ายังไม่สุกให้ผัดวนซ้ำ!<br>• <strong>DFD (แผนภาพกระแสข้อมูล):</strong> เหมือน <strong>"แผนที่เส้นทางเดินเอกสารในกรมที่ดิน"</strong> โฟกัสที่ <em>ข้อมูลไหลจากใคร ไปผ่านงานอะไร และเก็บลงตู้ไหน (Data Movement)</em> ไม่สนใจว่าโค้ดข้างในเขียน Loop หรือ If-Else ยังไง!'
        },
        bodyHtml: `
<p>เวลาสอบภาค ข. หรือสอบตำแหน่งนักวิชาการคอมพิวเตอร์ หลายคนชอบจำสลับระหว่าง <strong>Flowchart</strong> กับ <strong>DFD</strong> เพราะทั้งคู่มีกล่องและลูกศรเหมือนกัน! พี่ขอเคลียร์ให้ชัดจากพื้นฐานเลยครับ:</p>

<h3>อะไรคือ Flowchart (ผังงาน)?</h3>
<p><strong>Flowchart</strong> คือแผนภาพที่ใช้สัญลักษณ์มาตรฐาน (ANSI/ISO) วาดแสดง <strong>"ลำดับขั้นตอนการทำงานและการตัดสินใจของโปรแกรม (Program Control Flow)"</strong> ตั้งแต่จุดเริ่มต้นจนจบ ทำให้นักพัฒนาเห็นตรรกะ (เงื่อนไข <code>if/else</code> และการวนลูป) ชัดเจนก่อนลงมือเขียนโค้ดจริง</p>

<h3>เจาะทีละตัว: สัญลักษณ์ Flowchart 6 ตัวที่ห้ามจำสลับ</h3>
<ul>
  <li><strong>Terminator (รูปแคปซูล / วงรีหัวท้ายมน):</strong> จุดเริ่มต้น (Start) และจุดสิ้นสุด (End/Stop) ของผังงาน ทุกผังงานต้องมีจุดเริ่มและจุดจบชัดเจน</li>
  <li><strong>Input / Output (สี่เหลี่ยมด้านขนาน — เอียงๆ):</strong> ขั้นตอนการ <strong>รับข้อมูลเข้า</strong> (เช่น รับเลขโฉนดจากแป้นพิมพ์/หน้าจอ) หรือ <strong>แสดงผลลัพธ์ออก</strong> (เช่น พิมพ์ใบเสร็จรับเงิน แสดงผลหน้าจอ) — <em>จำง่ายๆ: ด้านขนาน = ทางเข้า-ออกของข้อมูล!</em></li>
  <li><strong>Process (สี่เหลี่ยมผืนผ้าธรรมดา):</strong> ขั้นตอนการ <strong>ประมวลผล คำนวณ หรือกำหนดค่า</strong> เช่น <code>fee = price * 0.02</code> หรือ "ตรวจสอบข้อมูลกับฐานข้อมูล"</li>
  <li><strong>Decision (สี่เหลี่ยมข้าวหลามตัด):</strong> จุด <strong>ตัดสินใจ/ตรวจสอบเงื่อนไข</strong> ต้องมีลูกศรขาออกอย่างน้อย 2 ทาง พร้อมป้ายกำกับชัดเจน เช่น <strong>ใช่ (True/Yes)</strong> หรือ <strong>ไม่ใช่ (False/No)</strong></li>
  <li><strong>Predefined Process (สี่เหลี่ยมผืนผ้ามีขีดคู่แนวตั้งซ้าย-ขวา):</strong> การเรียกใช้ <strong>ฟังก์ชันหรือโปรแกรมย่อย (Subroutine)</strong> ที่เขียนแยกไว้แล้ว เช่น เรียกโมดูล "คำนวณภาษีหัก ณ ที่จ่าย"</li>
  <li><strong>Connector &amp; Flowline (วงกลมเล็ก และลูกศร):</strong> ลูกศรชี้ทิศทางการไหลของงาน (ปกติจากบนลงล่าง ซ้ายไปขวา) ส่วน <strong>วงกลมเล็ก</strong> ใช้เป็นจุดเชื่อมบนหน้ากระดาษเดียวกัน (On-page Connector) เมื่อเส้นยาวจนต้องตัดไปต่ออีกมุม (หากข้ามหน้ากระดาษอื่นจะใช้รูปห้าเหลี่ยมหัวทิ่มคล้ายป้ายบ้านเรียกว่า <em>Off-page Connector</em>)</li>
</ul>

<div class="callout callout-tip">
  <strong><i class="fa-solid fa-lightbulb" aria-hidden="true"></i> ทริคแยก Flowchart กับ DFD ใน 3 วินาที:</strong>
  ถ้าเห็นรูป <strong>ข้าวหลามตัด (Decision)</strong> หรือคำว่า Start / End / เงื่อนไข Yes-No → นั่นคือ <strong>Flowchart</strong>!<br>
  แต่ถ้าเห็นกล่องเก็บข้อมูลเปิดปลาย <strong>Data Store</strong> กับคำว่า <strong>External Entity</strong> (เช่น ประชาชน, ธนาคาร) → นั่นคือ <strong>DFD</strong>!
</div>`,
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
        analogyBox: {
          title: 'เปรียบเทียบให้เห็นภาพ: มุมมองโดรน (Level 0) vs เปิดหลังคาดูข้างในตึก (Level 1)',
          body: '• <strong>Context Diagram (DFD Level 0):</strong> เหมือนบินโดรนมองลงมาเห็น <strong>"ตึกกรมที่ดินทั้งหลังเป็นกล่องเดียว"</strong> เห็นแค่ว่าประชาชนส่งคำขอเข้าตึก แล้วตึกส่งใบเสร็จคืนให้ (ยังไม่เห็นห้องข้างในและตู้เก็บแฟ้ม!)<br>• <strong>DFD Level 1:</strong> เหมือน <strong>"เปิดหลังคาตึกออก"</strong> จะเห็นแผนกย่อยข้างใน (เช่น ห้องตรวจสิทธิ์, ห้องคำนวณเงิน) และเห็น <strong>ตู้เก็บแฟ้มฐานข้อมูล (Data Store)</strong> ว่าข้อมูลถูกส่งไปเก็บที่ตู้ไหน'
        },
        bodyHtml: `
<p>ต่างจาก Flowchart ที่เน้น <em>"ลำดับการทำงานของโปรแกรม (ทำอะไรก่อนหลัง, วนลูปยังไง)"</em> ตัว <strong>DFD (Data Flow Diagram)</strong> คือแผนภาพที่เน้นมองว่า <em>"ข้อมูลมาจากใคร (External Entity) วิ่งผ่านงานแปรรูปอะไร (Process) และถูกเก็บลงฐานข้อมูลใด (Data Store)"</em> โดยใช้สัญลักษณ์เพียง 4 อย่าง:</p>

<div class="table-wrap">
  <table>
    <caption>องค์ประกอบ 4 ส่วนของ Data Flow Diagram (DFD)</caption>
    <thead>
      <tr>
        <th scope="col">องค์ประกอบ</th>
        <th scope="col">สัญลักษณ์ (Gane &amp; Sarson)</th>
        <th scope="col">อะไรคืออะไร? หน้าที่และการตั้งชื่อ</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th scope="row">External Entity</th>
        <td>สี่เหลี่ยมจัตุรัส/ผืนผ้า</td>
        <td><strong>ตัวตนภายนอกระบบ:</strong> คน หน่วยงาน หรือระบบภายนอกที่ส่งข้อมูลเข้าหรือรับข้อมูลออก (ตั้งชื่อเป็น <strong>คำนาม</strong> เช่น ประชาชน, กรมสรรพากร, ระบบธนาคาร)</td>
      </tr>
      <tr>
        <th scope="row">Process</th>
        <td>สี่เหลี่ยมมุมมน (หรือวงกลม)</td>
        <td><strong>ตัวแปรรูปข้อมูล:</strong> กิจกรรม/ซอฟต์แวร์ที่รับข้อมูลเข้ามาแปลงเป็นผลลัพธ์ (ตั้งชื่อขึ้นต้นด้วย <strong>คำกริยา + กรรม</strong> เช่น ตรวจสอบสิทธิ์, คำนวณภาษีโอน)</td>
      </tr>
      <tr>
        <th scope="row">Data Store</th>
        <td>สี่เหลี่ยมเปิดด้านขวา (D1)</td>
        <td><strong>คลังเก็บข้อมูล:</strong> แฟ้มเอกสาร ตารางฐานข้อมูล หรือไฟล์ที่พักข้อมูลไว้ใช้งานต่อ (ตั้งชื่อเป็น <strong>คำนามพหูพจน์</strong> เช่น D1 ทะเบียนแปลงที่ดิน)</td>
      </tr>
      <tr>
        <th scope="row">Data Flow</th>
        <td>ลูกศรชี้ทิศทาง</td>
        <td><strong>เส้นทางไหลของข้อมูล:</strong> ข้อมูลที่กำลังวิ่งจากจุดหนึ่งไปอีกจุดหนึ่ง (ตั้งชื่อเป็น <strong>คำนาม</strong> เช่น ข้อมูลคำขอ, ใบเสร็จรับเงิน)</td>
      </tr>
    </tbody>
  </table>
</div>

<h3>Context Diagram (Level 0) แตกเป็น Level 1 อย่างไร?</h3>
<ol>
  <li><strong>DFD Level 0 (Context Diagram):</strong> วาดภาพรวมทั้งระบบให้เป็น <strong>Process ก้อนใหญ่เพียง 1 ก้อน</strong> (ปกติใส่เลข <code>0</code>) อยู่ตรงกลาง ล้อมรอบด้วย External Entity ที่ติดต่อกับระบบเรา และ <strong>ห้ามวาด Data Store</strong> ลงใน Level 0 เด็ดขาด เพราะถือว่าฐานข้อมูลซ่อนอยู่ภายในระบบแล้ว</li>
  <li><strong>DFD Level 1 (Explosion / Decomposition):</strong> นำ Process ก้อนใหญ่หมายเลข <code>0</code> มา "ระเบิดแตกออก" เป็น Process ย่อยๆ เช่น <code>1.0 รับคำขอ</code>, <code>2.0 คำนวณค่าธรรมเนียม</code>, <code>3.0 ออกใบเสร็จ</code> พร้อมเปิดเผย <strong>Data Store</strong> (เช่น <code>D1 ทะเบียนโฉนด</code>) เพื่อให้เห็นชัดว่าแต่ละงานอ่านหรือเขียนข้อมูลลงตารางไหนบ้าง</li>
</ol>

<h3>ทำไมกฎเหล็กของ DFD ถึงห้ามทำสิ่งเหล่านี้? (เข้าใจเหตุผล ไม่ต้องท่องแบบนกแก้ว!)</h3>
<ul>
  <li><strong>ทำไม External Entity ห้ามต่อตรงถึง Data Store?</strong> → เพราะคนนอก (เช่น ประชาชน) จะเดินถือปากกาเข้ามาแก้ตารางฐานข้อมูลดิบในเซิร์ฟเวอร์โดยตรงไม่ได้! ข้อมูลจากคนนอก <em>ต้องผ่าน Process ของระบบ</em> เพื่อตรวจสอบสิทธิ์และความถูกต้อง (Validation) ก่อนบันทึกเสมอ</li>
  <li><strong>ทำไม External Entity ห้ามต่อตรงหากันเอง?</strong> → เช่น ประชาชนยื่นเงินให้ธนาคารโดยตรงไม่ผ่านระบบเราเลย แสดงว่าเหตุการณ์นั้น <em>อยู่นอกขอบเขตระบบที่เราสร้าง</em> ไม่ต้องเอามาวาดใน DFD ของระบบเรา</li>
  <li><strong>ทำไม Data Store ห้ามต่อตรงถึง Data Store?</strong> → ตารางข้อมูลในฮาร์ดดิสก์เดินย้ายตัวเองไปอีกตารางไม่ได้ ต้องมีโปรแกรม (Process) เป็นคนอ่านจาก <code>D1</code> แล้วประมวลผลเขียนลง <code>D2</code></li>
  <li><strong>ระวังข้อผิดพลาด Black Hole &amp; Miracle:</strong> Process ทุกตัวต้องมีทั้ง <em>เส้นเข้า (Input)</em> และ <em>เส้นออก (Output)</em>! ถ้ามีแต่เส้นเข้าไม่มีเส้นออกเรียก <strong>Black Hole (หลุมดำ)</strong>, ถ้ามีแต่เส้นออกโดยไม่มีเส้นเข้าเลยเรียก <strong>Miracle (เสกข้อมูลจากความว่างเปล่า)</strong>!</li>
</ul>

<div class="callout callout-warn">
  <strong><i class="fa-solid fa-triangle-exclamation" aria-hidden="true"></i> สรุปกฎเหล็ก DFD สำหรับจับผิดภาพในห้องสอบ:</strong>
  <ul>
    <li><strong>Context Diagram (DFD Level 0):</strong> มี <strong>Process เพียง 1 ก้อน</strong> เท่านั้น และ <strong>ห้ามมี Data Store</strong>!</li>
    <li><strong>ทุกข้อมูลต้องวิ่งผ่าน Process เสมอ:</strong> ห้าม External Entity ↔ Data Store, ห้าม External Entity ↔ External Entity, และห้าม Data Store ↔ Data Store โดยตรง!</li>
    <li><strong>Balancing (ความสมดุลระหว่าง Level):</strong> เส้น Data Flow ที่เข้า-ออกระหว่าง External Entity กับ Process ใน Level 0 ต้องตรงกับ Level 1 เมื่อแตก Process ย่อยออกมาครบทุกเส้น ห้ามหายและห้ามงอกใหม่</li>
  </ul>
</div>`,
      },
      {
        id: 'uml-diagrams',
        title: '4. แผนภาพเชิงวัตถุ UML: Use Case & Sequence Diagram',
        analogyBox: {
          title: 'เปรียบเทียบให้เห็นภาพ: แบบแปลนโครงสร้างบ้าน vs คู่มือระบบน้ำไฟตอนคนใช้งาน',
          body: '• <strong>UML (Unified Modeling Language):</strong> คือ <strong>"ภาษาภาพมาตรฐานสากลของสาย OOP"</strong> ที่นักวิเคราะห์ระบบทั่วโลกใช้วาดสื่อสารกัน (เหมือนแบบแปลนก่อสร้างที่ช่างทั่วโลกอ่านเข้าใจตรงกัน)<br>• <strong>Structural Diagrams (แผนภาพโครงสร้าง):</strong> เหมือน <em>แปลนผนัง เสา คาน</em> ที่หยุดนิ่ง (เช่น Class Diagram)<br>• <strong>Behavioral Diagrams (แผนภาพพฤติกรรม):</strong> เหมือน <em>แผนผังแสดงจังหวะคนกดปุ่มแล้วน้ำไหลไปตามท่อทีละขั้น</em> (เช่น Use Case Diagram และ Sequence Diagram)'
        },
        bodyHtml: `
<p>ยุคก่อนตอนเขียนโปรแกรมแบบดั้งเดิม (Structured Programming) เรานิยมวาด DFD กับ Flowchart แต่พอมาพัฒนาระบบสมัยใหม่แบบ <strong>OOP (เชิงวัตถุ — Object-Oriented Programming)</strong> วงการซอฟต์แวร์จึงใช้ภาษาภาพมาตรฐานชื่อ <strong>UML (Unified Modeling Language)</strong> โดยแบ่งแผนภาพออกเป็น 2 กลุ่มใหญ่ชัดเจน:</p>

<ul>
  <li><strong>1. Structural Diagrams (แผนภาพเชิงโครงสร้าง — มุมมองนิ่ง):</strong> แสดงองค์ประกอบ โครงสร้างคลาส ความสัมพันธ์ของข้อมูล หรือเครื่องเซิร์ฟเวอร์ เช่น <strong>Class Diagram</strong> (บอกชื่อคลาส, ตัวแปร Attribute, เมธอด Method), Component Diagram, Deployment Diagram</li>
  <li><strong>2. Behavioral Diagrams (แผนภาพเชิงพฤติกรรม — มุมมองเคลื่อนไหว):</strong> แสดงว่าผู้ใช้โต้ตอบกับระบบยังไงและเกิดอะไรขึ้นตามลำดับเวลา เช่น <strong>Use Case Diagram</strong>, <strong>Sequence Diagram</strong>, Activity Diagram</li>
</ul>

<h3>Use Case Diagram: อะไรคือ Actor, Use Case และหัวลูกศร &lt;&lt;include&gt;&gt; vs &lt;&lt;extend&gt;&gt;?</h3>
<p><strong>Use Case Diagram</strong> คือแผนภาพที่สรุปให้เห็นในหน้าเดียวว่า <em>"ใครใช้ระบบทำอะไรได้บ้าง?"</em> เหมาะเอาไปคุยกับผู้บริหารและผู้ใช้ตั้งแต่ต้นโครงการ มีส่วนประกอบหลักดังนี้:</p>
<ul>
  <li><strong>Actor (รูปคนก้างปลา):</strong> แทน <strong>"บทบาท"</strong> ของผู้ใช้งานหรือระบบภายนอกที่เข้ามาโต้ตอบกับระบบ (ไม่ได้ระบุชื่อนาย ก. แต่วางเป็นบทบาท เช่น ประชาชน, เจ้าหน้าที่รังวัด, ระบบชำระเงินธนาคาร)</li>
  <li><strong>Use Case (วงรี):</strong> แทน <strong>"บริการหรือความสามารถ 1 อย่างที่ระบบทำให้ Actor"</strong> ตั้งชื่อขึ้นต้นด้วยคำกริยา เช่น จองคิวออนไลน์, ตรวจสอบโฉนด, พิมพ์ใบเสร็จ</li>
  <li><strong><code>&lt;&lt;include&gt;&gt;</code> (ความสัมพันธ์แบบ "ต้องทำเสมอ / บังคับ"):</strong>
    <ul>
      <li><strong>ทิศทางลูกศร:</strong> ลูกศรเส้นประชี้ <strong>จาก Use Case หลัก → ไปยัง Use Case ที่ถูกบังคับเรียกใช้เสมอ</strong></li>
      <li><strong>วิธีอ่านให้ไม่ผิด:</strong> เช่น <code>[จองคิวออนไลน์] -- &lt;&lt;include&gt;&gt; --&gt; [เข้าสู่ระบบ Login]</code> อ่านว่า <em>"จะจองคิวได้ <strong>ต้องรวม</strong> การเข้าสู่ระบบไว้ด้วยทุกครั้ง ขาดไม่ได้!"</em> (ถ้าขาด Login ก็จองคิวไม่สำเร็จ)</li>
    </ul>
  </li>
  <li><strong><code>&lt;&lt;extend&gt;&gt;</code> (ความสัมพันธ์แบบ "ทางเลือกเสริม / ทำหรือไม่ทำก็ได้"):</strong>
    <ul>
      <li><strong>ทิศทางลูกศร (ระวัง! ชี้กลับทิศกับ include):</strong> ลูกศรเส้นประชี้ <strong>จาก Use Case เสริม → กลับมายัง Use Case หลัก</strong></li>
      <li><strong>วิธีอ่านให้ไม่ผิด:</strong> เช่น <code>[แจ้งเตือนทาง SMS] -- &lt;&lt;extend&gt;&gt; --&gt; [จองคิวออนไลน์]</code> อ่านว่า <em>"การแจ้งเตือน SMS มา <strong>ต่อขยายเสริม</strong> ให้การจองคิวเฉพาะกรณีที่ผู้ใช้ติ๊กเลือก หรือเกิดเงื่อนไขพิเศษ"</em> (ถึงไม่ส่ง SMS การจองคิวหลักก็ยังสำเร็จสมบูรณ์!)</li>
    </ul>
  </li>
  <li><strong>Generalization (ลูกศรเส้นทึบหัวสามเหลี่ยมโปร่ง):</strong> ใช้แสดงการสืบทอดบทบาท เช่น <code>[หัวหน้าสำนักงาน] ──▷ [เจ้าหน้าที่]</code> แปลว่าหัวหน้าทำทุกอย่างที่เจ้าหน้าที่ทำได้ และมีสิทธิ์เพิ่มพิเศษ</li>
</ul>

<div class="callout callout-tip">
  <strong><i class="fa-solid fa-compass" aria-hidden="true"></i> ทริคจำหัวลูกศร &lt;&lt;include&gt;&gt; vs &lt;&lt;extend&gt;&gt; ไม่เคยพลาด:</strong>
  • <strong>Include (บังคับ):</strong> ตัวหลัก <em>วิ่งไปหา</em> ตัวบังคับ (<code>จองคิว ----&gt; Login</code>)<br>
  • <strong>Extend (เสริม):</strong> ตัวเสริม <em>วิ่งกลับมาเกาะ</em> ตัวหลัก (<code>ส่ง SMS ----&gt; จองคิว</code>)
</div>

<h3>Sequence Diagram: ไล่ลำดับการส่งข้อความตามแกนเวลา (บนลงล่าง)</h3>
<p><strong>Sequence Diagram</strong> คือแผนภาพที่ซูมเข้าไปดูว่า <em>"ตอนระบบทำงานจริง 1 งาน ใครคุยกับใครก่อนหลัง?"</em> โดยอ่านเวลา <strong>จากบนลงล่าง</strong> องค์ประกอบที่ต้องรู้จักคือ:</p>
<ul>
  <li><strong>Participant / Actor:</strong> กล่องหรือรูปคนด้านบนสุด แทนผู้ใช้งาน หน้าเว็บ API หรือฐานข้อมูลที่ร่วมสนทนา</li>
  <li><strong>Lifeline:</strong> เส้นประแนวดิ่งที่ลากลงมาจากใต้กล่อง แสดงช่วงเวลาการมีตัวตนของสิ่งนั้นระหว่างการทำงาน</li>
  <li><strong>Activation Bar (Execution Occurrence):</strong> แท่งสี่เหลี่ยมแคบๆ แนวตั้งที่วางซ้อนบนเส้น Lifeline แสดงช่วงเวลาที่วัตถุนั้นกำลัง <strong>ตื่นตัวและประมวลผลคำสั่งอยู่</strong></li>
  <li><strong>Synchronous Message (ลูกศรเส้นทึบ หัวลูกศรทึบ <code>-&gt;&gt;</code>):</strong> ส่งคำขอไปแล้ว <strong>"ยืนรอคำตอบ"</strong> จนกว่าฝั่งรับจะทำงานเสร็จแล้วส่งผลกลับมา (เช่น หน้าเว็บส่งคำขอเช็กคิวไปยัง API แล้วรอผลมาแสดง) — <em>หมายเหตุ: หากเป็นลูกศรหัวเปิดแบบไม่ต้องรอตอบกลับเรียกว่า Asynchronous Message</em></li>
  <li><strong>Return Message (ลูกศรเส้นประ <code>--&gt;&gt;</code>):</strong> การส่งผลลัพธ์ย้อนกลับคืนมายังผู้เรียก (เช่น ฐานข้อมูลคืนรายการเวลาว่างกลับมาให้ API)</li>
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
        analogyBox: {
          title: 'เปรียบเทียบให้เห็นภาพ: ทดสอบรถยนต์ก่อนส่งมอบ + ดูแลรถหลังใช้งาน',
          body: '• <strong>การทดสอบ 4 ระดับ (Testing):</strong> เริ่มจากตรวจนอตทีละตัว (<strong>Unit</strong>) → ประกอบเครื่องยนต์กับล้อแล้วสตาร์ตดูว่าคุยกันรู้เรื่องไหม (<strong>Integration</strong>) → เอารถทั้งคันไปวิ่งทดสอบถนนจริงความเร็วสูง (<strong>System</strong>) → ให้ผู้ซื้อตัวจริงลองขับตรวจรับก่อนเซ็นจ่ายเงิน (<strong>UAT</strong>)<br>• <strong>การบำรุงรักษา 4 แบบ (Maintenance):</strong> รถเสียแก้ซ่อม (<strong>Corrective</strong>), กฎหมายจราจรเปลี่ยนเลยไปติดฟิล์ม/เปลี่ยนป้ายให้ถูกกฎ (<strong>Adaptive</strong>), แต่งเครื่องแรงขึ้นติดจอเพิ่ม (<strong>Perfective</strong>), และเช็กระยะเปลี่ยนถ่ายน้ำมันเครื่องกันพังล่วงหน้า (<strong>Preventive</strong>)'
        },
        bodyHtml: `
<p>เมื่อโปรแกรมเมอร์เขียนโค้ดเสร็จ ยังนำไปเปิดให้ประชาชนใช้ทันทีไม่ได้ครับ! ในงานราชการต้องผ่านด่านทดสอบอย่างเป็นระบบตั้งแต่ระดับโค้ดย่อยจนถึงคณะกรรมการตรวจรับงาน และยังต้องวางแผนดูแลต่อหลังเปิดใช้งานด้วย</p>

<h3>เทคนิคการทดสอบพื้นฐาน: White-box vs Black-box Testing</h3>
<ul>
  <li><strong>White-box Testing (การทดสอบแบบกล่องใส / กล่องขาว):</strong> ผู้ทดสอบ (มักเป็น Developer) <strong>เปิดดูไส้ในของ Source Code</strong> ได้หมด เพื่อตรวจว่าทุกเส้นทางของ <code>if/else</code>, <code>loop</code> และตัวแปรทำงานถูกต้องตามตรรกะ (เช็ก Code Coverage)</li>
  <li><strong>Black-box Testing (การทดสอบแบบกล่องดำ):</strong> ผู้ทดสอบ <strong>ไม่ต้องมองเห็นโค้ดข้างใน</strong> มองระบบเป็นกล่องดำทึบ สนใจแค่ว่า <em>"เมื่อป้อน Input นี้เข้าไป ระบบคืน Output ออกมาตรงตามสเปก/TOR หรือไม่?"</em> (ใช้มากในระดับ System Testing และ UAT)</li>
</ul>

<h3>ระดับการทดสอบระบบ 4 ขั้นตอน (Testing Levels)</h3>
<div class="table-wrap">
  <table>
    <caption>ลำดับขั้นการทดสอบซอฟต์แวร์จากระดับโค้ดย่อยถึงผู้ใช้งานจริง</caption>
    <thead>
      <tr>
        <th scope="col">ระดับการทดสอบ</th>
        <th scope="col">ผู้รับผิดชอบหลัก</th>
        <th scope="col">เป้าหมายและตัวอย่างการทดสอบ</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th scope="row">1. Unit Testing</th>
        <td>Developer (ผู้เขียนโค้ด)</td>
        <td>ทดสอบฟังก์ชันหรือโมดูลย่อยที่สุดทีละชิ้นแยกจากกัน (มักใช้ <strong>White-box Testing</strong>) เช่น ทดสอบฟังก์ชันคำนวณค่าธรรมเนียม 2% ว่าทศนิยมปัดถูกไหม</td>
      </tr>
      <tr>
        <th scope="row">2. Integration Testing</th>
        <td>Developer / QA Team</td>
        <td>ทดสอบการเชื่อมต่อระหว่างโมดูลหรือ API ที่นำมาประกอบรวมกัน เช่น หน้าเว็บจองคิวส่งข้อมูลไปเช็กเลขบัตรประชาชนกับ API กรมการปกครองได้ถูกต้องไหม</td>
      </tr>
      <tr>
        <th scope="row">3. System Testing</th>
        <td>QA / Tester Team</td>
        <td>ทดสอบทั้งระบบครบวงจรเสมือนใช้งานจริง (ใช้ <strong>Black-box Testing</strong> ตาม Spec รวมถึงทดสอบรับภาระคนเข้าพร้อมกัน Load Test และช่องโหว่ Security Test)</td>
      </tr>
      <tr>
        <th scope="row">4. User Acceptance Testing (UAT)</th>
        <td><strong>ผู้ใช้งานจริง / คณะกรรมการตรวจรับ</strong></td>
        <td>ด่านสุดท้าย! ทดสอบในสภาพแวดล้อมเสมือนจริงเพื่อยืนยันว่าระบบใช้งานตรงตามระเบียบราชการและครบถ้วนตาม TOR ก่อนลงนามเซ็นตรวจรับมอบงาน</td>
      </tr>
    </tbody>
  </table>
</div>

<h3>การบำรุงรักษาซอฟต์แวร์ 4 ประเภท (ออกสอบนิยามบ่อยมาก!)</h3>
<p>หลังระบบเปิดให้บริการ (Go-Live) ไม่ได้แปลว่างานจบนะครับ วงจร Maintenance กินเวลายาวนานที่สุดในชีวิตซอฟต์แวร์ และข้อสอบชอบยกสถานการณ์มาถามว่าจัดเป็นประเภทใดใน 4 ตัวนี้:</p>
<ul>
  <li><strong>1. Corrective Maintenance (แก้ไขข้อผิดพลาด / แก้บั๊ก):</strong> ระบบเปิดใช้งานแล้วเจอ Bug หรือ Error ที่หลุดรอดมา เช่น กดพิมพ์ใบเสร็จบางเคสแล้วหน้าจอค้าง → แก้ให้กลับมาทำงานถูกต้อง</li>
  <li><strong>2. Adaptive Maintenance (ปรับตัวให้เข้ากับสภาพแวดล้อมภายนอกที่เปลี่ยน):</strong> ตัวระบบไม่ได้พัง แต่ <strong>"โลกภายนอกเปลี่ยน"</strong> จนต้องแก้ระบบตาม เช่น <strong>กฎหมายเปลี่ยนอัตราค่าธรรมเนียมโอนที่ดินใหม่</strong>, อัปเกรดระบบปฏิบัติการจาก Windows Server รุ่นเก่าเป็นรุ่นใหม่, หรือเปลี่ยนฐานข้อมูล</li>
  <li><strong>3. Perfective Maintenance (พัฒนาเพิ่มความสามารถ / เพิ่มประสิทธิภาพ):</strong> ผู้ใช้ขอฟีเจอร์ใหม่เพิ่มเติม หรือปรับปรุงความเร็ว เช่น เพิ่มปุ่ม Export รายงานเป็น Excel หรือจูนคิวรีฐานข้อมูลให้เปิดหน้าค้นหาเร็วขึ้น 3 เท่า</li>
  <li><strong>4. Preventive Maintenance (บำรุงรักษาเชิงป้องกันปัญหาในอนาคต):</strong> ปัจจุบันระบบ <em>ยังทำงานได้ปกติไม่มีบั๊ก</em> แต่โค้ดเก่าอ่านยากหรือไลบรารีเริ่มล้าสมัย ทีมพัฒนาจึงเข้าไปปรับโครงสร้างโค้ดเบื้องหลัง (<strong>Code Refactoring</strong>) หรืออัปเดตแพ็กเกจล่วงหน้า เพื่อไม่ให้ดูแลยากหรือพังในวันข้างหน้า</li>
</ul>

<div class="callout callout-info">
  <strong><i class="fa-solid fa-key" aria-hidden="true"></i> ทริคแยก Adaptive vs Perfective vs Preventive ในห้องสอบ:</strong>
  • เจอคำว่า <strong>แก้ Bug / Error หลังใช้งาน</strong> → <strong>Corrective</strong><br>
  • เจอคำว่า <strong>กฎหมายใหม่ / OS ใหม่ / ฮาร์ดแวร์เปลี่ยน</strong> → <strong>Adaptive</strong><br>
  • เจอคำว่า <strong>เพิ่มฟีเจอร์ใหม่ / ทำให้เร็วขึ้น</strong> → <strong>Perfective</strong><br>
  • เจอคำว่า <strong>Refactoring / ปรับโครงสร้างโค้ดให้ดูแลง่ายกันพังอนาคต</strong> → <strong>Preventive</strong>
</div>`
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
