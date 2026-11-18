(function (global) {
  'use strict';

  if (!global.GOV_PREP || typeof global.GOV_PREP.registerLesson !== 'function') {
    console.error('[CORE-05] GOV_PREP.registerLesson not found');
    return;
  }

  global.GOV_PREP.registerLesson({
    id: 'core-5-programming-logic',
    code: 'CORE-05',
    category: 'core',
    agencyId: null,
    order: 5,
    title: 'ตรรกะการเขียนโปรแกรม โครงสร้างควบคุม และโครงสร้างข้อมูล',
    shortTitle: 'เขียนโปรแกรม & โครงสร้างข้อมูล',
    subtitle: 'ปูพื้นเขียนโปรแกรมจากศูนย์: Algorithm, ตัวแปร-Data Types, Compiler vs Interpreter, ตัวดำเนินการ (++i vs i++), If-Else/Loops + Trace Table, Data Structures (Stack/Queue/Tree/Hash), OOP และ Big-O',
    estimatedMinutes: 20,
    icon: 'fa-solid fa-code',
    heroVisual: {
      image: 'assets/images/core-programming-logic.png',
      alt: 'ภาพประกอบโครงสร้างข้อมูล Array, Stack, Queue และการไหลของอัลกอริทึมการเขียนโปรแกรม',
      caption: 'หัวใจของนักพัฒนา: คิดเป็นลำดับขั้นตอน (Control Flow) และเลือกโครงสร้างข้อมูล (Data Structures) ให้เหมาะกับงาน',
      aspectRatio: '16 / 9',
      width: 1200,
      height: 675,
      prompt: 'Clean flat isometric tech illustration in Cadastral GIS & Tech Studio palette (emerald #0F5E4D, amber #D97706, cream #F4F7F6). Visual programming logic studio showing clean floating blocks for If-Else branches, a circular For-Loop track, an indexed Array locker row, a vertical LIFO Stack of glowing plates, and a horizontal FIFO Queue conveyor belt. Crisp educational editorial vector style.'
    },
    summaryTakeaways: [
      'Programming คือการเขียนคำสั่งตาม Algorithm (ขั้นตอนแก้ปัญหาที่ชัดเจนและมีจุดจบ) โดยใช้ Compiler แปลรวดเดียวทั้งไฟล์ หรือ Interpreter แปลรันทีละบรรทัด และระวัง Error 3 แบบ: Syntax (ผิดไวยากรณ์), Runtime (พังกลางทางเช่นหาร 0), Logic (รันผ่านแต่คำตอบผิด)',
      'ตัวดำเนินการต้องแม่น: Modulo (%) เอาเศษ, 7/2 แบบ Integer ได้ 3, ++i (บวกก่อนใช้) vs i++ (ใช้ก่อนค่อยบวก), ลำดับความสำคัญ () → ! → * / % → + - → เปรียบเทียบ → && → ||',
      'ลูป while ตรวจเงื่อนไขก่อนทำ (0+ รอบ), do-while ทำก่อนตรวจ (อย่างน้อย 1 รอบเสมอ), switch-case ต้องใส่ break กันไหลทะลุ, และใช้ Trace Table ไล่ค่าตัวแปรทุกครั้งที่ทำข้อสอบลูป',
      'Data Structures: Array เข้าถึง Index (เริ่มที่ 0) ใน O(1), Linked List เชื่อมด้วย Pointer แทรก-ลบไวแต่ไล่หาช้า O(n), Stack = LIFO (Push/Pop), Queue = FIFO (Enqueue/Dequeue), และมี BST กับ Hash Table O(1) ใช้ค้นหาไว',
      'Function รับ Parameter/Argument แล้วคืน Return Value; Recursion ต้องมี Base Case กัน Stack Overflow; OOP มี 4 เสาหลัก (APIE); และ Binary Search วิ่งเร็ว O(log n) แต่ข้อมูลต้องเรียง (Sorted) แล้วเท่านั้น'
    ],
    sections: [
      {
        id: 'variables-operators',
        title: '1. ตัวแปร ชนิดข้อมูล ตัวดำเนินการ และตรรกศาสตร์',
        analogyBox: {
          title: 'เปรียบเทียบให้เห็นภาพ: สูตรอาหาร กล่องติดป้ายชื่อ และล่ามแปลภาษา',
          body: '• <strong>Algorithm:</strong> เหมือน <strong>"สูตรทำกับข้าวทีละข้อ"</strong> ที่ใครทำตามก็ได้ผลลัพธ์เดิมเสมอ<br>• <strong>ตัวแปร (Variable):</strong> เหมือน <strong>"กล่องเก็บของติดป้ายชื่อ"</strong> ที่มีชนิดข้อมูล (Data Type) บอกว่าใส่ของแบบไหน เช่น กล่อง <code>int</code> ใส่จำนวนเต็มอย่างจำนวนแปลงที่ดิน, <code>float/double</code> ใส่ทศนิยมอย่างเนื้อที่ตารางวา, <code>char/string</code> ใส่ตัวอักษร/ข้อความเลขโฉนด, และ <code>boolean</code> ใส่แค่ <code>true</code> หรือ <code>false</code><br>• <strong>Compiler vs Interpreter:</strong> <strong>Compiler</strong> เหมือน <em>แปลหนังสือทั้งเล่มให้เสร็จก่อนแล้วค่อยอ่านทีเดียว</em> (รันเร็วมาก!) ส่วน <strong>Interpreter</strong> เหมือน <em>ล่ามแปลสดทีละประโยค</em> (เริ่มทำงานไว แก้ทดสอบง่าย)'
        },
        bodyHtml: `
<p>น้องๆ ที่ยังไม่เคยเขียนโปรแกรมหรือลืมพื้นฐานไปแล้ว ไม่ต้องกลัวเรื่องอ่านโค้ดในข้อสอบครับ! เรามาปูพื้นตั้งแต่ความหมายของ <strong>การเขียนโปรแกรม (Programming)</strong> ชนิดข้อมูล ตัวแปลภาษา ข้อผิดพลาด ไปจนถึงการคำนวณตัวดำเนินการแบบไม่โดนหลอก</p>

<h3>พื้นฐานที่ต้องรู้ก่อนอ่านโค้ด: Algorithm, ตัวแปร, Compiler และ Error 3 แบบ</h3>
<ul>
  <li><strong>Algorithm (อัลกอริทึม) &amp; Programming:</strong> <strong>Algorithm</strong> คือลำดับขั้นตอนวิธีแก้ปัญหาที่มีเหตุผล ชัดเจน ไม่กำกวม และมีจุดสิ้นสุด (ยังไม่ต้องเป็นโค้ด เขียนเป็นภาษาไทยหรือ Flowchart ก็ได้) ส่วน <strong>Programming</strong> คือการนำ Algorithm นั้นมาแปลงเขียนด้วยภาษาคอมพิวเตอร์ (เช่น Python, C, Java, JavaScript) ให้เครื่องทำตาม</li>
  <li><strong>ตัวแปร (Variable) และชนิดข้อมูล (Data Type) หลัก 4 ชนิด:</strong>
    <ul>
      <li><code>int</code> (Integer): จำนวนเต็ม ไม่มีจุดทศนิยม เช่น <code>0</code>, <code>150</code>, <code>-10</code> (ใช้กับจำนวนคิว, อายุ, นับรอบลูป)</li>
      <li><code>float / double</code>: เลขมีจุดทศนิยม เช่น <code>3.14</code>, <code>125.75</code> (ใช้คำนวณเงิน, พื้นที่ตารางวา, พิกัด GPS — <code>double</code> เก็บทศนิยมละเอียดกว่า <code>float</code>)</li>
      <li><code>char / string</code>: <code>char</code> เก็บอักขระ 1 ตัว เช่น <code>'A'</code> ส่วน <code>string</code> เก็บข้อความยาว เช่น <code>"น.ส.4 จ."</code> (ระวัง: <code>"123"</code> ในเครื่องหมายคำพูดคือข้อความ ไม่ใช่ตัวเลข!)</li>
      <li><code>boolean</code>: เก็บค่าความจริงได้ 2 ค่าเท่านั้นคือ <code>true</code> (จริง) หรือ <code>false</code> (เท็จ)</li>
    </ul>
  </li>
  <li><strong>Compiler vs Interpreter ต่างกันยังไง?</strong>
    <ul>
      <li><strong>Compiler (เช่น C, C++, Go):</strong> แปล Source Code ทั้งไฟล์เป็นภาษาเครื่อง (เช่นไฟล์ <code>.exe</code>) <em>ก่อนรัน</em> → เวลาเปิดใช้งานจะทำงานเร็วมาก แต่ถ้ามีจุดผิดต้องแก้แล้วคอมไพล์ใหม่ทั้งหมด</li>
      <li><strong>Interpreter (เช่น Python, JavaScript):</strong> อ่าน แปล และสั่งทำงาน <em>ทีละบรรทัด</em> → ทดสอบแก้โค้ดได้ไว ไม่ต้องรอ Build นาน แต่ความเร็วขณะรันจะช้ากว่าแบบ Compile (ส่วนภาษาอย่าง Java / C# ใช้แบบลูกผสม: Compile เป็น Bytecode กลางก่อน แล้วให้ VM แปลรัน)</li>
    </ul>
  </li>
  <li><strong>ข้อผิดพลาด 3 ประเภท (Error Types) ที่ออกสอบบ่อย:</strong>
    <ul>
      <li><strong>Syntax Error (ผิดไวยากรณ์):</strong> พิมพ์ผิดกฎภาษา เช่น ลืมปิดวงเล็บ <code>)</code> หรือลืม <code>;</code> → ตัวแปลภาษาจับได้ทันที โปรแกรมไม่ยอมรัน</li>
      <li><strong>Runtime Error (พังขณะทำงาน):</strong> ไวยากรณ์ถูกทุกอย่าง เริ่มรันได้ แต่เจอเหตุการณ์ผิดพลาดกลางทาง เช่น <strong>หารด้วยศูนย์ (<code>10 / 0</code>)</strong> หรือเปิดไฟล์ที่ไม่มีอยู่ → โปรแกรมค้างหรือหลุดกลางอากาศ</li>
      <li><strong>Logic Error (ผิดที่ตรรกะคนเขียน):</strong> โปรแกรมรันจบไม่แจ้ง Error อะไรเลย <em>แต่คำตอบออกมาผิด!</em> เช่น อยากหาค่าเฉลี่ย <code>(a + b) / 2</code> แต่ลืมใส่วงเล็บกลายเป็น <code>a + b / 2</code> — จับตัวยากที่สุด!</li>
    </ul>
  </li>
</ul>

<h3>ตัวดำเนินการที่ต้องแม่น (Arithmetic, Increment &amp; Comparison Operators)</h3>
<ul>
  <li><strong>Modulo (<code>%</code>):</strong> คือการหารเอาเฉพาะ <strong>"เศษ"</strong> เช่น <code>17 % 5 = 2</code> (เพราะ 5 × 3 = 15 เหลือเศษ 2) — นิยมใช้เช็กเลขคู่/คี่ (<code>x % 2 == 0</code> แปลว่าหาร 2 ลงตัว = เลขคู่!)</li>
  <li><strong>Integer Division vs Float Division:</strong> ในภาษา C / Java / SQLite ถ้าเอาจำนวนเต็มหารจำนวนเต็ม เช่น <code>7 / 2</code> จะได้ <strong><code>3</code></strong> (ตัดเศษ <code>.5</code> ทิ้ง ไม่ได้ปัดขึ้น!) ต้องเขียน <code>7.0 / 2</code> จึงจะได้ <code>3.5</code></li>
  <li><strong><code>++i</code> (Pre-increment) vs <code>i++</code> (Post-increment) — จุดหลอกระดับตำนาน!</strong>
    ทั้งคู่แปลว่าเพิ่มค่า <code>i</code> ขึ้น 1 (<code>i = i + 1</code>) เหมือนกัน <em>แต่จังหวะเอาไปใช้ต่างกัน:</em>
    <ul>
      <li><strong><code>++i</code> (บวกก่อน แล้วค่อยเอาไปใช้):</strong> เพิ่มค่า <code>i</code> ให้เรียบร้อยก่อน แล้วค่อยส่งค่าใหม่ไปคำนวณในสมการ</li>
      <li><strong><code>i++</code> (เอาค่าเดิมไปใช้ก่อน แล้วค่อยบวกทีหลัง):</strong> ส่งค่า <code>i</code> ปัจจุบันไปใช้ในสมการก่อน เสร็จแล้วค่อยเพิ่ม <code>i</code> ขึ้น 1</li>
    </ul>
<pre tabindex="0"><code>let i = 5;
let a = ++i; // ++ อยู่หน้า: เพิ่ม i จาก 5 -&gt; 6 ก่อน แล้วค่อยใส่ a =&gt; a = 6, i = 6

let j = 5;
let b = j++; // ++ อยู่หลัง: เอา j เดิม (5) ใส่ b ก่อน แล้วค่อยเพิ่ม j =&gt; b = 5, j = 6</code></pre>
  </li>
  <li><strong><code>=</code> vs <code>==</code> vs <code>===</code>:</strong> <code>=</code> คือ <em>กำหนดค่า</em> เก็บใส่ตัวแปร (เช่น <code>x = 10</code>), <code>==</code> คือ <em>เปรียบเทียบ</em> ว่าค่าเท่ากันไหม (เช่น <code>5 == '5'</code> ได้ <code>true</code> ใน JS), ส่วน <code>===</code> (Strict Equality) เช็กทั้ง <strong>ค่าและชนิดข้อมูล</strong> (<code>5 === '5'</code> ได้ <code>false</code> เพราะตัวเลขกับข้อความคนละชนิด!)</li>
</ul>

<h3>ตรรกศาสตร์ในโปรแกรม: AND, OR, XOR, NOT แปลเป็นภาษาคน</h3>
<ul>
  <li><strong>AND (<code>&amp;&amp;</code> — และ):</strong> "ต้องเป็นจริง <strong>ทั้งคู่</strong> ถึงจะผ่าน" (เช่น อายุ &gt;= 20 ปี <em>และ</em> นำบัตรประชาชนตัวจริงมาด้วย ถึงทำนิติกรรมได้)</li>
  <li><strong>OR (<code>||</code> — หรือ):</strong> "ขอแค่เป็นจริง <strong>อย่างน้อย 1 เงื่อนไข</strong> ก็ผ่านแล้ว" (เช่น ยืนยันตัวตนด้วยบัตรประชาชนตัวจริง <em>หรือ</em> แอป ThaiD อย่างใดอย่างหนึ่ง)</li>
  <li><strong>XOR (<code>^</code> — Exclusive OR):</strong> "ต้อง <strong>ต่างกัน</strong> ถึงจะจริง ถ้าเหมือนกันทั้งคู่เป็นเท็จ!" (เช่น เลือกโปรโมชันส่วนลดได้เพียงอย่างเดียว ห้ามเลือก 2 อันพร้อมกัน และห้ามไม่เลือกเลย)</li>
  <li><strong>NOT (<code>!</code> — นิเสธ):</strong> "กลับคำตรงข้าม" จาก <code>true</code> เป็น <code>false</code> และจาก <code>false</code> เป็น <code>true</code></li>
</ul>

<div class="table-wrap">
  <table>
    <caption>ตารางค่าความจริง (Truth Table) ของตัวดำเนินการตรรกศาสตร์</caption>
    <thead>
      <tr>
        <th scope="col">A</th>
        <th scope="col">B</th>
        <th scope="col">A &amp;&amp; B (AND)</th>
        <th scope="col">A || B (OR)</th>
        <th scope="col">A ^ B (XOR)</th>
        <th scope="col">!A (NOT A)</th>
      </tr>
    </thead>
    <tbody>
      <tr><td><code>true</code></td><td><code>true</code></td><td><strong>true</strong></td><td>true</td><td>false</td><td>false</td></tr>
      <tr><td><code>true</code></td><td><code>false</code></td><td>false</td><td>true</td><td><strong>true</strong></td><td>false</td></tr>
      <tr><td><code>false</code></td><td><code>true</code></td><td>false</td><td>true</td><td><strong>true</strong></td><td>true</td></tr>
      <tr><td><code>false</code></td><td><code>false</code></td><td>false</td><td><strong>false</strong></td><td>false</td><td>true</td></tr>
    </tbody>
  </table>
</div>

<div class="callout callout-tip">
  <strong><i class="fa-solid fa-bolt" aria-hidden="true"></i> ลำดับความสำคัญตัวดำเนินการ (Operator Precedence) จากสูงไปต่ำ:</strong>
  <code>()</code> (ทำในวงเล็บก่อนเสมอ) → <code>!</code> (NOT) → <code>* / %</code> → <code>+ -</code> → <code>&lt; &lt;= &gt; &gt;=</code> → <code>== !=</code> → <code>&amp;&amp;</code> (AND ทำก่อน OR!) → <code>||</code> (OR)<br>
  <strong>ตัวอย่างแกะทีละก้าว:</strong> นิพจน์ <code>(14 % 4 == 2) &amp;&amp; false || true</code><br>
  1) ทำในวงเล็บก่อน: <code>14 % 4</code> ได้เศษ <code>2</code> → <code>2 == 2</code> ได้ <code>true</code><br>
  2) ทำ <code>&amp;&amp;</code> ก่อน <code>||</code>: <code>true &amp;&amp; false</code> ได้ <code>false</code><br>
  3) สุดท้ายทำ <code>||</code>: <code>false || true</code> ได้ผลลัพธ์สุดท้ายเป็น <strong><code>true</code></strong>!
</div>`
      },
      {
        id: 'control-flow',
        title: '2. โครงสร้างควบคุม: If-Else, Loops และเทคนิคทำ Trace Table',
        analogyBox: {
          title: 'เปรียบเทียบให้เห็นภาพ: ขับรถบนถนน แยกไฟแดง กดลิฟต์ และวิ่งรอบสนาม',
          body: '• <strong>Sequence (ลำดับ):</strong> ขับรถตรงไปตามถนนทีละก้าวจากบนลงล่าง<br>• <strong><code>if / else if / else</code> (ทางแยก):</strong> เจอสี่แยกแล้วเช็กเงื่อนไข "ถ้าไฟเขียวไปต่อ มิฉะนั้นถ้าไฟเหลืองชะลอ มิฉะนั้นหยุด" (เข้าทางไหนแล้วออกทางแยกทันที ไม่ย้อนเข้าอันอื่น)<br>• <strong><code>switch-case</code> (แผงปุ่มลิฟต์):</strong> กดชั้นไหนก็กระโดดตรงไปชั้นนั้นทันที (และต้องมี <strong><code>break</code></strong> คั่น ไม่อย่างนั้นลิฟต์จะไหลเปิดประตูทุกชั้นลงไปเรื่อยๆ!)<br>• <strong>Loops (วนซ้ำ):</strong> วิ่งรอบสนามกีฬาจนกว่าจะครบ 10 รอบหรือเหนื่อย; <code>continue</code> คือ <em>"รอบนี้ไม่นับขอกินน้ำแล้วไปเริ่มรอบหน้า"</em> ส่วน <code>break</code> คือ <em>"หยุดวิ่งเดี๋ยวนี้ ออกจากสนามกลับบ้านเลย!"</em>'
        },
        bodyHtml: `
<p>โปรแกรมทุกโปรแกรมบนโลก ไม่ว่าจะซับซ้อนขนาดไหน ก็สร้างขึ้นมาจากโครงสร้างควบคุม (Control Flow) พื้นฐานเพียง 3 แบบเท่านั้น คือ <strong>1) ลำดับ (Sequence)</strong> ทำเรียงจากบนลงล่าง, <strong>2) ทางเลือก (Selection)</strong> เลือกตัดสินใจ, และ <strong>3) การวนซ้ำ (Iteration / Loop)</strong></p>

<h3>ทางเลือก: <code>if / else if / else</code> vs <code>switch-case</code> (และหน้าที่ของ <code>break</code>)</h3>
<ul>
  <li><strong><code>if / else if / else</code>:</strong> ตรวจสอบเงื่อนไขทีละข้อจากบนลงล่าง <strong>เจอเงื่อนไขไหนที่เป็นจริงอันแรก จะทำงานบล็อกนั้นแล้วข้าม <code>else if</code> ที่เหลือทั้งหมดทันที!</strong> (ข้อสอบชอบแกล้งเรียงช่วงคะแนนผิด เช่น เอา <code>&gt;= 70</code> ไว้ก่อน <code>&gt;= 75</code> ทำให้คะแนน 78 ติดที่ 70 ก่อนเสมอ!)</li>
  <li><strong><code>switch-case</code>:</strong> เหมาะกับการเช็กค่าที่ตรงตัวแน่นอนหลายกรณี (เช่น เลือกเมนูเลข 1, 2, 3) โดย <strong><code>break;</code></strong> มีหน้าที่สั่งให้หยุดและกระโดดออกจาก <code>switch</code> ทันทีที่ทำ <code>case</code> นั้นเสร็จ — <strong>ข้อควรระวัง:</strong> หาก<em>ลืมใส่ <code>break</code></em> โปรแกรมจะเกิดอาการ <strong>Fall-through</strong> คือไหลทะลุลงไปรันคำสั่งใน <code>case</code> ถัดไปเรื่อยๆ จนกว่าจะเจอ <code>break</code> หรือจบ <code>switch</code>! (และ <code>default:</code> ใช้รองรับกรณีไม่ตรงกับ <code>case</code> ใดเลย)</li>
</ul>

<h3>เปรียบเทียบ Loop ทั้ง 3 ชนิด + <code>break</code> &amp; <code>continue</code></h3>
<ul>
  <li><strong><code>break</code> (หยุดทั้งลูป):</strong> เจอปุ๊บสั่งจบการวนซ้ำทั้งหมดและออกจากลูปทันที (เหมือนกดปุ่มหยุดฉุกเฉิน)</li>
  <li><strong><code>continue</code> (ข้ามเฉพาะรอบนี้):</strong> ทิ้งคำสั่งที่เหลือในรอบปัจจุบัน แล้วย้อนกลับไปตรวจเงื่อนไข (หรืออัปเดตตัวนับ <code>i++</code>) เพื่อเริ่มรอบถัดไป</li>
</ul>

<div class="table-wrap">
  <table>
    <caption>เปรียบเทียบโครงสร้างวนซ้ำ for, while และ do-while</caption>
    <thead>
      <tr>
        <th scope="col">โครงสร้างวนซ้ำ</th>
        <th scope="col">จังหวะตรวจเงื่อนไข</th>
        <th scope="col">จำนวนรอบต่ำสุด</th>
        <th scope="col">เหมาะกับงานแบบใด</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th scope="row"><code>for</code> loop</th>
        <td>ตรวจก่อนเข้าแต่ละรอบ (Pre-test)</td>
        <td>0 รอบ (หากเงื่อนไขเท็จตั้งแต่แรก)</td>
        <td><strong>รู้จำนวนรอบแน่นอน</strong> เช่น วนอ่านแปลงที่ดินตั้งแต่รายการที่ 0 ถึง n-1</td>
      </tr>
      <tr>
        <th scope="row"><code>while</code> loop</th>
        <td>ตรวจก่อนเข้าแต่ละรอบ (Pre-test)</td>
        <td>0 รอบ (อาจไม่ทำงานเลยสักรอบ!)</td>
        <td><strong>ไม่รู้จำนวนรอบล่วงหน้า</strong> วนไปเรื่อยๆ จนกว่าเงื่อนไขจะเป็นเท็จ เช่น อ่านไฟล์จนกว่าจะจบ (EOF)</td>
      </tr>
      <tr>
        <th scope="row"><code>do ... while</code></th>
        <td>ทำ 1 รอบก่อน แล้วค่อยตรวจ (Post-test)</td>
        <td><strong>อย่างน้อย 1 รอบเสมอ!</strong></td>
        <td>แสดงเมนูให้ผู้ใช้เลือกหรือขอรับรหัสผ่านอย่างน้อย 1 ครั้งก่อนเช็กเงื่อนไข</td>
      </tr>
    </tbody>
  </table>
</div>

<h3>ฝึกไล่ค่าตัวแปร (Trace Table): ทั้ง Single Loop และ Nested Loop (ลูปซ้อนลูป)</h3>
<p><strong>กฎเหล็กในห้องสอบ:</strong> ห้ามคิดเลขลูปในใจเด็ดขาด! ให้ตีตาราง <strong>Trace Table</strong> จดค่าตัวแปรทีละรอบแบบนี้:</p>

<h4>ตัวอย่างที่ 1: Single Loop กับ <code>continue</code> (รวมค่าธรรมเนียมตั้งแต่ 1,000 บาทขึ้นไป)</h4>
<pre tabindex="0"><code>let prices = [1200, 3500, 800, 4000];
let total = 0;
for (let i = 0; i &lt; prices.length; i++) {
  if (prices[i] &lt; 1000) {
    continue; // ข้ามแปลงที่ต่ำกว่า 1,000 บาท (ไม่บวกเข้า total)
  }
  total = total + prices[i];
}
// ไล่ Trace Table:
// รอบ i=0: prices[0]=1200 (&gt;=1000) -&gt; total = 0 + 1200 = 1200
// รอบ i=1: prices[1]=3500 (&gt;=1000) -&gt; total = 1200 + 3500 = 4700
// รอบ i=2: prices[2]=800  (&lt;1000)  -&gt; continue! ข้ามไป i=3 (total ยังเป็น 4700)
// รอบ i=3: prices[3]=4000 (&gt;=1000) -&gt; total = 4700 + 4000 = 8700
// i=4: 4 &lt; 4 เป็นเท็จ -&gt; จบลูป: total = 8700</code></pre>

<h4>ตัวอย่างที่ 2: Nested Loop (ลูปซ้อนลูป — จุดออกสอบยอดฮิต!)</h4>
<p>หลักการของ <strong>Nested Loop</strong> คือ <em>"ลูปนอก <code>i</code> ขยับ 1 ก้าว → ลูปใน <code>j</code> ต้องวิ่งให้จบครบทุกรอบของมันก่อน!"</em> มาดูโค้ดและ Trace Table ด้านล่างครับ:</p>
<pre tabindex="0"><code>let count = 0;
for (let i = 1; i &lt;= 2; i++) {
  for (let j = 1; j &lt;= 3; j++) {
    count = count + (i * j);
  }
}</code></pre>

<div class="table-wrap">
  <table>
    <caption>ตาราง Trace Table แสดงค่า i, j และ count ทีละขั้นของ Nested Loop</caption>
    <thead>
      <tr>
        <th scope="col">ขั้นที่</th>
        <th scope="col">i (ลูปนอก)</th>
        <th scope="col">j (ลูปใน)</th>
        <th scope="col">คำนวณ i * j</th>
        <th scope="col">ค่า count ล่าสุด</th>
      </tr>
    </thead>
    <tbody>
      <tr><td>1</td><td>1</td><td>1</td><td>1 × 1 = 1</td><td>0 + 1 = <strong>1</strong></td></tr>
      <tr><td>2</td><td>1</td><td>2</td><td>1 × 2 = 2</td><td>1 + 2 = <strong>3</strong></td></tr>
      <tr><td>3</td><td>1</td><td>3</td><td>1 × 3 = 3</td><td>3 + 3 = <strong>6</strong> (จบลูป j รอบ i=1)</td></tr>
      <tr><td>4</td><td>2</td><td>1</td><td>2 × 1 = 2</td><td>6 + 2 = <strong>8</strong> (เริ่ม j=1 ใหม่!)</td></tr>
      <tr><td>5</td><td>2</td><td>2</td><td>2 × 2 = 4</td><td>8 + 4 = <strong>12</strong></td></tr>
      <tr><td>6</td><td>2</td><td>3</td><td>2 × 3 = 6</td><td>12 + 6 = <strong>18</strong> (จบทั้งหมด!)</td></tr>
    </tbody>
  </table>
</div>`,
        mermaid: {
          title: 'แผนผังการทำงานของ For-Loop สะสมยอดค่าธรรมเนียม (Trace Flow)',
          caption: 'สังเกตเส้นทางวนกลับจาก continue ไปเพิ่มค่า i++ และจุดหยุดเมื่อเงื่อนไข i < 4 เป็นเท็จ',
          code: `flowchart TD
  S(["เริ่มต้น: total = 0, i = 0"]) --> COND{"i < 4 หรือไม่?"}
  COND -->|"เท็จ (จบวนลูป)"| OUT[/"แสดงผล total สุดท้าย"/] --> E(["สิ้นสุด"])
  COND -->|"จริง"| CHK{"prices[i] < 1000?"}
  CHK -->|"จริง (continue)"| INC["i = i + 1"]
  CHK -->|"เท็จ"| ADD["total = total + prices[i]"] --> INC
  INC --> COND`
        }
      },
      {
        id: 'data-structures',
        title: '3. โครงสร้างข้อมูลหลัก: Array, Stack (LIFO) และ Queue (FIFO)',
        analogyBox: {
          title: 'เปรียบเทียบให้เห็นภาพ: ตู้ล็อกเกอร์ ขบวนรถไฟ กองจาน แถวรอคิว และสารบัญตู้ยา',
          body: '• <strong>Array:</strong> เหมือน <strong>"ตู้ล็อกเกอร์เรียงติดกันมีเลขห้อง Index 0, 1, 2..."</strong> รู้เลขห้องเมื่อไรเปิดหยิบได้ทันทีใน 1 ก้าว (<code>O(1)</code>)<br>• <strong>Linked List:</strong> เหมือน <strong>"โบกี้รถไฟคล้องต่อกัน"</strong> แทรกหรือถอดโบกี้กลางขบวนง่าย แต่ถ้าอยากไปโบกี้ที่ 50 ต้องเดินไล่จากหัวขบวนทีละตู้<br>• <strong>Stack (LIFO):</strong> เหมือน <strong>"กองจานในร้านอาหาร"</strong> ใบที่ล้างเสร็จทีหลังวางซ้อนบนสุด (<strong>Push</strong>) และหยิบใบบนสุดไปใช้ก่อน (<strong>Pop</strong>) → <em>Last-In, First-Out</em><br>• <strong>Queue (FIFO):</strong> เหมือน <strong>"แถวรอคิวหน้าเคาน์เตอร์กรมที่ดิน"</strong> มาก่อนเข้าต่อท้ายแถว (<strong>Enqueue</strong>) และถูกเรียกออกจากหัวแถวก่อน (<strong>Dequeue</strong>) → <em>First-In, First-Out</em><br>• <strong>Tree &amp; Hash Table:</strong> <strong>Tree</strong> เหมือน <em>ผังลำดับชั้นโฟลเดอร์/องค์กร</em> ส่วน <strong>Hash Table</strong> เหมือน <em>สูตรคำนวณเลขลิ้นชัก</em> รู้ชื่อปุ๊บเปิดถูกลิ้นชักทันที!'
        },
        bodyHtml: `
<h3>Data Structure คืออะไร? ทำไมต้องเลือกให้ถูก?</h3>
<p><strong>โครงสร้างข้อมูล (Data Structure)</strong> คือ <strong>"รูปแบบการจัดเก็บและจัดระเบียบข้อมูลในหน่วยความจำ (RAM)"</strong> เพื่อให้โปรแกรมเรียกใช้ ค้นหา เพิ่ม หรือลบข้อมูลได้อย่างมีประสิทธิภาพสูงสุด ลองนึกภาพว่าถ้าข้อมูลแปลงที่ดินมี 10 ล้านแปลง การเลือกโครงสร้างข้อมูลที่เหมาะสมอาจทำให้เวลาค้นหาลดจาก <em>10 วินาที เหลือไม่ถึง 1 มิลลิวินาที</em> เลยครับ!</p>

<h3>โครงสร้างข้อมูลเชิงเส้น 4 ตัวที่ออกสอบประจำ</h3>
<ul>
  <li><strong>1. Array (อาร์เรย์ — 1 มิติ และ 2 มิติ):</strong>
    <ul>
      <li><strong>คืออะไร:</strong> แถวช่องเก็บข้อมูลชนิดเดียวกันที่จองพื้นที่ <strong>เรียงติดกันใน RAM</strong> โดยทุกช่องมีหมายเลขกำกับเรียกว่า <strong>Index (เริ่มนับที่ <code>0</code> เสมอ!)</strong> ดังนั้นถ้า Array มี <code>n</code> ช่อง ตัวแรกคือ <code>arr[0]</code> และตัวสุดท้ายคือ <code>arr[n - 1]</code></li>
      <li><strong>Array 1 มิติ vs 2 มิติ:</strong> 1 มิติเหมือนแถวเดียว เช่น <code>prices[2]</code>, ส่วน <strong>Array 2 มิติ</strong> เหมือนตาราง Excel มีแถวและคอลัมน์ เช่น <code>grid[row][col]</code> (เช่น เก็บตารางค่าพิกัดหรือเมทริกซ์)</li>
      <li><strong>จุดเด่น / จุดด้อย:</strong> เข้าถึงข้อมูลด้วย Index ได้เร็วที่สุดในระดับ <strong><code>O(1)</code></strong> แต่ขนาดมักคงที่ และถ้าจะแทรกหรือลบข้อมูลตรงกลางต้องขยับเลื่อนช่องที่เหลือทั้งหมด (<code>O(n)</code>)</li>
    </ul>
  </li>
  <li><strong>2. Linked List (ลิงก์ลิสต์):</strong>
    <ul>
      <li><strong>ต่างจาก Array ยังไง?</strong> Linked List ไม่จำเป็นต้องจอง RAM ติดกันเป็นแถวยาว! แต่เก็บเป็นก้อนอิสระเรียกว่า <strong>Node</strong> โดยแต่ละ Node แบ่งเป็น 2 ช่อง: <strong>[ข้อมูล (Data) | ตัวชี้ (Pointer ไปยัง Node ถัดไป)]</strong></li>
      <li><strong>จุดเด่น / จุดด้อย:</strong> แทรกหรือลบ Node ตรงหัวหรือกลางขบวนทำได้ไว (แค่เปลี่ยนเส้นชี้ Pointer ไม่ต้องขยับก้อนอื่น) แต่ <em>เข้าถึงตำแหน่งที่ต้องการโดยตรงไม่ได้</em> ต้องเดินไล่จากหัวขบวน (Head) ทีละ Node ใช้เวลา <strong><code>O(n)</code></strong></li>
    </ul>
  </li>
  <li><strong>3. Stack (สแตก — หลักการ LIFO: Last-In, First-Out "เข้าทีหลัง ออกก่อน"):</strong>
    <ul>
      <li><strong>คำสั่งหลัก:</strong> <strong><code>Push(x)</code></strong> = วางข้อมูลใหม่ลงบนยอดสุด (Top), <strong><code>Pop()</code></strong> = หยิบข้อมูลที่อยู่ยอดสุดออกไป, <strong><code>Peek() / Top()</code></strong> = แอบดูค่าบนยอดสุดโดยยังไม่หยิบออก</li>
      <li><strong>ภาวะผิดพลาดที่ต้องรู้จัก:</strong> <strong>Stack Overflow</strong> (สแตกเต็มแล้วแต่ยังฝืน <code>Push</code> ใส่เพิ่มจนล้น!) และ <strong>Stack Underflow</strong> (สแตกว่างเปล่าแต่ยังสั่ง <code>Pop</code> หยิบของออก)</li>
      <li><strong>ใช้งานจริงที่ไหนบ้าง?</strong> <strong>Call Stack</strong> (จำลำดับการเรียกฟังก์ชันและตัวแปรย้อนกลับ), ปุ่ม <strong>Undo / Redo</strong> ใน Word, ปุ่ม <strong>Back</strong> ย้อนหน้าในเว็บเบราว์เซอร์, การตรวจสอบวงเล็บเปิด-ปิดสมดุล</li>
    </ul>
  </li>
  <li><strong>4. Queue (คิว — หลักการ FIFO: First-In, First-Out "มาก่อน ออกก่อน"):</strong>
    <ul>
      <li><strong>คำสั่งหลัก:</strong> <strong><code>Enqueue(x)</code></strong> = ต่อแถวเข้าด้านหลังสุด (<strong>Rear / Tail</strong>), <strong><code>Dequeue()</code></strong> = เรียกออกจากด้านหน้าสุด (<strong>Front / Head</strong>)</li>
      <li><strong>ใช้งานจริงที่ไหนบ้าง?</strong> ระบบจองคิวบริการประชาชน <strong>e-QLands</strong>, <strong>Print Spooler</strong> (จัดคิวงานสั่งพิมพ์เอกสารส่งเข้าเครื่องพิมพ์), คิวรับคำขอ Request บน Web Server, และอัลกอริทึมค้นหาแนวขวาง (<strong>BFS</strong>)</li>
    </ul>
  </li>
</ul>

<h3>รู้จัก Tree (Binary Search Tree) และ Hash Table แบบเข้าใจง่าย</h3>
<ul>
  <li><strong>Tree &amp; Binary Search Tree (BST):</strong> โครงสร้างข้อมูลแบบ <strong>ลำดับชั้น (Hierarchical)</strong> ไม่เป็นเส้นตรง โดยมีจุดสูงสุดเรียกว่า <strong>Root (ราก)</strong> แตกกิ่งเชื่อมลงไปหาโหนดลูก (Child) จนถึงปลายใบ (Leaf) — สำหรับ <strong>Binary Search Tree (BST)</strong> เป็นต้นไม้ที่แต่ละโหนดมีลูกได้ไม่เกิน 2 ฝั่ง (ซ้าย/ขวา) โดยมีกฎเหล็กว่า: <strong>"ลูกฝั่งซ้ายมีค่าน้อยกว่าแม่, ลูกฝั่งขวามีค่ามากกว่าแม่"</strong> ทำให้ค้นหาข้อมูลได้เร็วมากเพราะตัดฝั่งที่ไม่ใช่ทิ้งทีละครึ่ง!</li>
  <li><strong>Hash Table (แฮชเทเบิล):</strong> โครงสร้างที่เก็บข้อมูลเป็นคู่ <strong><code>Key → Value</code></strong> โดยส่ง Key (เช่น เลขบัตรประชาชน) ผ่านสูตร <strong>Hash Function</strong> เพื่อคำนวณออกมาเป็นเลขตำแหน่ง Index ในตารางทันที! จึงค้นหา เพิ่ม หรือลบข้อมูลได้เร็วระดับ <strong><code>O(1)</code></strong> ในกรณีปกติ (แต่หาก Key 2 ตัวคำนวณได้ช่องซ้ำกัน เรียกว่า <em>Hash Collision</em> ซึ่งต้องจัดการแก้การชนด้วยเทคนิคเสริม)</li>
</ul>`,
        visualCard: {
          type: 'svg',
          caption: 'ภาพเปรียบเทียบโครงสร้างข้อมูล Array (Index เริ่ม 0), Stack (LIFO) และ Queue (FIFO) พร้อมทิศทางคำสั่งหลัก',
          svgHtml: `<svg role="img" viewBox="0 0 760 440" width="100%" xmlns="http://www.w3.org/2000/svg" aria-labelledby="svg-ds-title">
  <title id="svg-ds-title">แผนภาพเปรียบเทียบ Array, Stack LIFO และ Queue FIFO</title>
  <rect x="0" y="0" width="760" height="440" rx="14" fill="#F4F7F6" stroke="#D5E1DD" stroke-width="2"/>
  <text x="380" y="34" text-anchor="middle" font-family="Prompt, Sarabun, sans-serif" font-size="18" font-weight="700" fill="#0F5E4D">โครงสร้างข้อมูลพื้นฐาน: Array vs Stack (LIFO) vs Queue (FIFO)</text>

  <!-- Panel 1: Array -->
  <rect x="24" y="54" width="712" height="114" rx="10" fill="#FFFFFF" stroke="#D5E1DD" stroke-width="1.5"/>
  <text x="44" y="80" font-family="Prompt, sans-serif" font-size="15" font-weight="700" fill="#0F5E4D">1. Array — เข้าถึงตรงด้วย Index O(1) (เริ่มที่ 0)</text>
  <text x="44" y="100" font-family="Sarabun, sans-serif" font-size="12" fill="#475569">เรียกใช้ arr[2] ได้ค่า 310 ทันทีโดยไม่ต้องไล่ค้นจากช่องแรก</text>

  <g transform="translate(335, 68)">
    <rect x="0" y="14" width="68" height="42" fill="#E6F4F1" stroke="#0F5E4D" stroke-width="2"/>
    <text x="34" y="40" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="14" font-weight="700" fill="#122026">101</text>
    <text x="34" y="74" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="11" fill="#475569">[0]</text>

    <rect x="68" y="14" width="68" height="42" fill="#E6F4F1" stroke="#0F5E4D" stroke-width="2"/>
    <text x="102" y="40" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="14" font-weight="700" fill="#122026">205</text>
    <text x="102" y="74" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="11" fill="#475569">[1]</text>

    <rect x="136" y="14" width="68" height="42" fill="#FEF3C7" stroke="#D97706" stroke-width="2.5"/>
    <text x="170" y="40" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="14" font-weight="700" fill="#92400E">310</text>
    <text x="170" y="74" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="11" font-weight="700" fill="#D97706">[2] Hit!</text>

    <rect x="204" y="14" width="68" height="42" fill="#E6F4F1" stroke="#0F5E4D" stroke-width="2"/>
    <text x="238" y="40" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="14" font-weight="700" fill="#122026">450</text>
    <text x="238" y="74" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="11" fill="#475569">[3]</text>

    <rect x="272" y="14" width="68" height="42" fill="#E6F4F1" stroke="#0F5E4D" stroke-width="2"/>
    <text x="306" y="40" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="14" font-weight="700" fill="#122026">520</text>
    <text x="306" y="74" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="11" fill="#475569">[4]</text>
  </g>

  <!-- Panel 2: Stack (LIFO) -->
  <rect x="24" y="184" width="348" height="232" rx="10" fill="#FFFFFF" stroke="#D5E1DD" stroke-width="1.5"/>
  <text x="44" y="210" font-family="Prompt, sans-serif" font-size="15" font-weight="700" fill="#0F5E4D">2. Stack — LIFO (เข้าหลังออกก่อน)</text>
  <text x="44" y="230" font-family="Sarabun, sans-serif" font-size="12" fill="#475569">ใช้กับ Undo/Redo, Back เบราว์เซอร์, Call Stack</text>

  <!-- Stack bucket -->
  <polyline points="140,295 140,398 256,398 256,295" fill="none" stroke="#334E58" stroke-width="3"/>
  <rect x="148" y="362" width="100" height="30" rx="4" fill="#E6F4F1" stroke="#0F5E4D" stroke-width="1.5"/>
  <text x="198" y="382" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="13" font-weight="700" fill="#122026">10 (Bottom)</text>
  <rect x="148" y="326" width="100" height="30" rx="4" fill="#E6F4F1" stroke="#0F5E4D" stroke-width="1.5"/>
  <text x="198" y="346" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="13" font-weight="700" fill="#122026">20</text>
  <rect x="148" y="290" width="100" height="30" rx="4" fill="#FEF3C7" stroke="#D97706" stroke-width="2"/>
  <text x="198" y="310" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="13" font-weight="700" fill="#92400E">30 (Top)</text>

  <!-- Push / Pop arrows -->
  <line x1="115" y1="252" x2="165" y2="285" stroke="#0F5E4D" stroke-width="2.5"/>
  <polygon points="168,287 156,286 162,276" fill="#0F5E4D"/>
  <text x="86" y="258" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="11" font-weight="700" fill="#0F5E4D">Push(30)</text>

  <line x1="232" y1="285" x2="282" y2="252" stroke="#D97706" stroke-width="2.5"/>
  <polygon points="285,250 273,251 279,261" fill="#D97706"/>
  <text x="312" y="258" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="11" font-weight="700" fill="#D97706">Pop()→30</text>

  <!-- Panel 3: Queue (FIFO) -->
  <rect x="388" y="184" width="348" height="232" rx="10" fill="#FFFFFF" stroke="#D5E1DD" stroke-width="1.5"/>
  <text x="408" y="210" font-family="Prompt, sans-serif" font-size="15" font-weight="700" fill="#0F5E4D">3. Queue — FIFO (มาก่อนออกก่อน)</text>
  <text x="408" y="230" font-family="Sarabun, sans-serif" font-size="12" fill="#475569">ใช้กับคิว e-QLands, Print Spooler, BFS</text>

  <!-- Queue lane -->
  <line x1="450" y1="294" x2="674" y2="294" stroke="#334E58" stroke-width="3"/>
  <line x1="450" y1="354" x2="674" y2="354" stroke="#334E58" stroke-width="3"/>

  <rect x="460" y="302" width="62" height="44" rx="4" fill="#FEF3C7" stroke="#D97706" stroke-width="2"/>
  <text x="491" y="329" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="13" font-weight="700" fill="#92400E">Q1</text>

  <rect x="531" y="302" width="62" height="44" rx="4" fill="#E6F4F1" stroke="#0F5E4D" stroke-width="1.5"/>
  <text x="562" y="329" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="13" font-weight="700" fill="#122026">Q2</text>

  <rect x="602" y="302" width="62" height="44" rx="4" fill="#E6F4F1" stroke="#0F5E4D" stroke-width="1.5"/>
  <text x="633" y="329" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="13" font-weight="700" fill="#122026">Q3</text>

  <text x="491" y="282" text-anchor="middle" font-family="Sarabun, sans-serif" font-size="12" font-weight="700" fill="#D97706">Front (หัวแถว)</text>
  <text x="633" y="282" text-anchor="middle" font-family="Sarabun, sans-serif" font-size="12" font-weight="700" fill="#0F5E4D">Rear (ท้ายแถว)</text>

  <!-- Dequeue / Enqueue arrows -->
  <line x1="452" y1="324" x2="408" y2="324" stroke="#D97706" stroke-width="2.5"/>
  <polygon points="402,324 414,317 414,331" fill="#D97706"/>
  <text x="434" y="384" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="11" font-weight="700" fill="#D97706">Dequeue()→Q1</text>

  <line x1="720" y1="324" x2="678" y2="324" stroke="#0F5E4D" stroke-width="2.5"/>
  <polygon points="672,324 684,317 684,331" fill="#0F5E4D"/>
  <text x="688" y="384" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="11" font-weight="700" fill="#0F5E4D">Enqueue(Q4)</text>
</svg>`
        }
      },
      {
        id: 'oop-algorithms',
        title: '4. พื้นฐาน OOP (APIE) และอัลกอริทึมค้นหา-เรียงลำดับ (Big-O)',
        analogyBox: {
          title: 'เปรียบเทียบให้เห็นภาพ: พิมพ์กดคุกกี้ (Class) vs ขนมคุกกี้ (Object) และขนาดความโต Big-O',
          body: '• <strong>Class vs Object:</strong> <strong>Class</strong> คือ <em>"แม่พิมพ์กดคุกกี้ / แบบแปลน"</em> ที่กำหนดว่าต้องมีรูปร่างและสูตรยังไง ส่วน <strong>Object</strong> คือ <em>"ขนมคุกกี้ชิ้นจริง"</em> ที่กดออกมาจากแม่พิมพ์นั้น 1 แม่พิมพ์สร้างคุกกี้ได้เป็นร้อยชิ้น แต่ละชิ้นมีรสชาติหรือขนาด (Attribute) ต่างกันได้<br>• <strong>Big-O Notation:</strong> ไม่ได้วัดเวลาเป็นวินาที (เพราะคอมพิวเตอร์แรงกับช้าต่างกัน) แต่วัดว่า <em>"ถ้าข้อมูลโตขึ้น 10 เท่า จำนวนรอบการทำงานจะพุ่งขึ้นกี่เท่า?"</em> เหมือนเปิดหาคำในพจนานุกรมแบบเปิดทีละครึ่งเล่ม (<code>O(log n)</code>) เทียบกับไล่อ่านทีละหน้าตั้งแต่หน้าแรก (<code>O(n)</code>)!'
        },
        bodyHtml: `
<p>ปิดท้ายบทเรียนหลักด้วย 3 เรื่องสำคัญที่ออกสอบความเข้าใจเชิงสถาปัตยกรรมซอฟต์แวร์เสมอ ได้แก่ <strong>Functions &amp; Recursion</strong>, <strong>OOP</strong> และ <strong>Big-O กับอัลกอริทึมค้นหา-เรียงลำดับ</strong> ครับ</p>

<h3>Functions &amp; Recursion: แยกย่อยงานและฟังก์ชันเรียกตัวเอง</h3>
<ul>
  <li><strong>Function (ฟังก์ชัน) คืออะไร?</strong> คือ "กล่องชุดคำสั่งย่อย" ที่ตั้งชื่อไว้ให้เรียกใช้งานซ้ำได้หลายครั้งโดยไม่ต้องก๊อปปี้โค้ดมาวางซ้ำ! คำศัพท์ 3 คำที่ต้องแยกให้ออก:
    <ul>
      <li><strong>Parameter:</strong> ชื่อตัวแปรที่ประกาศ <em>รอรับค่าตรงหัวฟังก์ชัน</em> (เหมือนช่องเติมวัตถุดิบของเครื่องปั่น เช่น <code>function calcTax(price)</code> → <code>price</code> คือ Parameter)</li>
      <li><strong>Argument:</strong> <em>ค่าข้อมูลจริงที่โยนส่งเข้าไป</em> ตอนเรียกใช้ฟังก์ชัน (เช่น ตอนเรียก <code>calcTax(500000)</code> → <code>500000</code> คือ Argument)</li>
      <li><strong>Return Value:</strong> ผลลัพธ์ที่ฟังก์ชันคำนวณเสร็จแล้ว <em>ส่งคืนกลับออกมา</em> ให้ผู้เรียกใช้คำสั่ง <code>return</code></li>
    </ul>
  </li>
  <li><strong>Recursion (การเรียกซ้ำตัวเอง):</strong> คือเทคนิคที่ฟังก์ชัน <em>เรียกใช้ตัวมันเองซ้ำ</em> เพื่อแตกปัญหาใหญ่เป็นปัญหาย่อยที่เล็กลงเรื่อยๆ เช่น <code>5! = 5 × 4!</code> (ทำซ้ำจนเหลือ <code>1!</code>) โดยฟังก์ชัน Recursive ทุกตัวต้องมี 2 ส่วนเสมอ:
    <ol>
      <li><strong>Base Case (กรณีพื้นฐาน / เงื่อนไขหยุด):</strong> จุดบอกให้หยุดเรียกตัวเองต่อ (เช่น <code>if (n &lt;= 1) return 1;</code>)</li>
      <li><strong>Recursive Step:</strong> การเรียกตัวเองด้วยค่าที่เข้าใกล้ Base Case มากขึ้นเรื่อยๆ (เช่น <code>return n * factorial(n - 1);</code>)</li>
    </ol>
  </li>
</ul>

<div class="callout callout-info">
  <strong><i class="fa-solid fa-repeat" aria-hidden="true"></i> ข้อควรระวังของ Recursion:</strong>
  หากลืมเขียน <strong>Base Case</strong> (หรือเขียนเงื่อนไขผิดจนไปไม่ถึงจุดหยุด) ฟังก์ชันจะเรียกตัวเองซ้ำไม่รู้จบจนหน่วยความจำ Call Stack เต็ม เกิด Error ร้ายแรงที่เรียกว่า <strong>Stack Overflow</strong>!
</div>

<h3>OOP (Object-Oriented Programming): Class vs Object และ 4 เสาหลัก (A-P-I-E)</h3>
<p>การเขียนโปรแกรมเชิงวัตถุ (<strong>OOP</strong>) จำลองระบบคอมพิวเตอร์ให้เหมือนวัตถุในโลกจริง โดยแยกชัดเจนระหว่าง:</p>
<ul>
  <li><strong>Class (คลาส):</strong> คือ <strong>"แม่พิมพ์ / แบบแปลน"</strong> ที่เขียนระบุว่าวัตถุชนิดนี้มีข้อมูลอะไรบ้าง (<strong>Attribute / Property</strong>) และทำพฤติกรรมอะไรได้บ้าง (<strong>Method</strong>)</li>
  <li><strong>Object / Instance (ออบเจกต์):</strong> คือ <strong>"ตัวตนจริงที่สร้างขึ้นมาจาก Class"</strong> (มักใช้คำสั่ง <code>new</code>) เช่น สร้าง Object โฉนดเลขที่ <code>1001</code> และโฉนดเลขที่ <code>1002</code> จาก Class <code>TitleDeed</code> เดียวกัน</li>
</ul>

<h4>4 เสาหลักของ OOP (จำง่ายว่า A-P-I-E)</h4>
<ul>
  <li><strong>E — Encapsulation (การห่อหุ้มและซ่อนข้อมูล):</strong> ป้องกันไม่ให้โค้ดภายนอกมาแก้ข้อมูลภายในมั่วๆ โดยกำหนด Attribute เป็น <code>private</code> แล้วบังคับให้เข้าถึงผ่านเมธอดตรวจสอบที่ปลอดภัย (<code>public get/set</code>) เช่น ห้ามแก้ราคาประเมินที่ดินตรงๆ ต้องผ่านเมธอด <code>updateAppraisalValue()</code> ที่ตรวจสิทธิ์เจ้าหน้าที่ก่อน</li>
  <li><strong>I — Inheritance (การสืบทอด):</strong> คลาสลูก (Subclass) สืบทอด Attribute และ Method จากคลาสแม่ (Superclass) ได้เลยเพื่อลดโค้ดซ้ำซ้อน เช่น <code>TitleDeed</code> (โฉนด น.ส.4 จ.) และ <code>NorSor3</code> สืบทอดคุณสมบัติพื้นฐานอย่างเลขที่ดินและเนื้อที่มาจากคลาสแม่ <code>LandDocument</code></li>
  <li><strong>P — Polymorphism (ความหลากหลายรูปแบบ):</strong> เมธอดชื่อเดียวกันแต่สามารถแสดงพฤติกรรมคำนวณต่างกันตามชนิดของ Object (ผ่าน Overriding / Overloading) เช่น สั่ง <code>doc.calculateFee()</code> เหมือนกัน แต่โฉนดที่ดินกับห้องชุดคำนวณสูตรคนละแบบ</li>
  <li><strong>A — Abstraction (ความเป็นนามธรรม):</strong> เปิดเผยเฉพาะปุ่มหรือช่องทางจำเป็นให้ผู้ใช้เรียกใช้ โดยซ่อนความซับซ้อนของโค้ดเบื้องหลังไว้ (เช่น กดปุ่ม <code>payFee()</code> จ่ายเงินได้ทันทีโดยไม่ต้องรู้รายละเอียดการเข้ารหัสเชื่อมต่อธนาคารข้างใน — มักออกแบบผ่าน Abstract Class หรือ Interface)</li>
</ul>

<h3>Big-O Notation คืออะไร? และอัลกอริทึมค้นหา-เรียงลำดับยอดฮิต</h3>
<p><strong>Big-O Notation</strong> คือสัญลักษณ์ใช้วัด <strong>"อัตราการเติบโตของเวลา/จำนวนขั้นตอน (Time Complexity)"</strong> เมื่อขนาดข้อมูล <code>n</code> เพิ่มขึ้นมหาศาล โดยเรียงลำดับจาก <em>เร็วที่สุด → ช้าที่สุด</em> ดังนี้:</p>
<ul>
  <li><strong><code>O(1)</code> — Constant Time (คงที่):</strong> ข้อมูลจะมี 10 ตัว หรือ 10 ล้านตัว ใช้เวลา <strong>เท่าเดิม 1 ก้าว</strong>! เช่น เปิดอ่าน Array ด้วย Index <code>arr[5]</code> หรือค้นหาใน Hash Table</li>
  <li><strong><code>O(log n)</code> — Logarithmic Time (ลอการิทึม):</strong> ทุก 1 ก้าวสามารถ <strong>ตัดข้อมูลทิ้งได้ทีละครึ่ง!</strong> ข้อมูลเพิ่มเป็น 2 เท่า ใช้เวลาเพิ่มแค่ 1 รอบเท่านั้น (1,000,000 รายการค้นไม่เกิน ~20 ครั้ง!) เช่น <strong>Binary Search</strong></li>
  <li><strong><code>O(n)</code> — Linear Time (เชิงเส้น):</strong> เวลาโตแปรผันตรงกับจำนวนข้อมูล เช่น <strong>Linear Search</strong> ที่ต้องเดินเช็กทีละช่องตั้งแต่ตัวแรกจนตัวสุดท้าย (เหมาะกับข้อมูลที่ยังไม่ได้เรียงลำดับ)</li>
  <li><strong><code>O(n log n)</code> — Linearithmic Time:</strong> มาตรฐานความเร็วสูงสุดของการเรียงลำดับข้อมูลทั่วไป (แบบแบ่งแยกและเอาชนะ Divide &amp; Conquer) เช่น <strong>Merge Sort</strong> (เสถียรการันตี <code>O(n log n)</code> เสมอ) และ <strong>Quick Sort</strong> (เฉลี่ยเร็วมาก <code>O(n log n)</code> แต่กรณีแย่สุดอาจตกเป็น <code>O(n²)</code>)</li>
  <li><strong><code>O(n²)</code> — Quadratic Time (กำลังสอง):</strong> มักเกิดจาก <strong>ลูปซ้อนลูป 2 ชั้น (Nested Loop)</strong> ข้อมูลเพิ่ม 10 เท่า เวลาพุ่งเป็น 100 เท่า! เช่น <strong>Bubble Sort</strong> (เทียบสลับคู่ข้างเคียงไปเรื่อยๆ) และ Insertion Sort — ใช้ได้เฉพาะข้อมูลน้อยๆ</li>
</ul>

<div class="table-wrap">
  <table>
    <caption>เปรียบเทียบเวลาการทำงาน (Time Complexity) และเงื่อนไขของอัลกอริทึมยอดฮิต</caption>
    <thead>
      <tr>
        <th scope="col">อัลกอริทึม</th>
        <th scope="col">Big-O (เฉลี่ย / แย่สุด)</th>
        <th scope="col">เงื่อนไขและจุดออกสอบ</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th scope="row">Array Index Lookup / Hash Table</th>
        <td><code>O(1)</code></td>
        <td>เร็วคงที่ไม่ว่าข้อมูลมีกี่ล้านรายการ (Hash Table กรณีไม่มี Collision)</td>
      </tr>
      <tr>
        <th scope="row">Binary Search (ค้นหาแบบทวิภาค)</th>
        <td><code>O(log n)</code></td>
        <td>แบ่งครึ่งช่วงค้นหาทีละครึ่ง! ข้อมูล 1,000,000 รายการค้นไม่เกิน 20 ครั้ง <strong>(เงื่อนไข: ข้อมูลต้องเรียงลำดับแล้วเท่านั้น!)</strong></td>
      </tr>
      <tr>
        <th scope="row">Linear Search (ค้นหาเรียงลำดับ)</th>
        <td><code>O(n)</code></td>
        <td>ไล่ตรวจทีละตัวตั้งแต่ต้นจนจบ ใช้ได้กับข้อมูลที่<em>ยังไม่ได้เรียงลำดับ</em></td>
      </tr>
      <tr>
        <th scope="row">Merge Sort / Quick Sort</th>
        <td><code>O(n log n)</code></td>
        <td>อัลกอริทึมเรียงลำดับประสิทธิภาพสูงแบบ Divide &amp; Conquer (Quick Sort กรณีแย่สุดเป็น <code>O(n²)</code>)</td>
      </tr>
      <tr>
        <th scope="row">Bubble Sort / Insertion Sort</th>
        <td><code>O(n²)</code></td>
        <td>วนลูปซ้อน 2 ชั้น (Nested Loop) เหมาะกับชุดข้อมูลขนาดเล็กหรือเกือบเรียงแล้ว</td>
      </tr>
    </tbody>
  </table>
</div>`,
        mermaid: {
          title: 'Binary Search Step Trace: ค้นหาเลข 50 ใน Array ที่เรียงแล้ว [10, 20, 30, 40, 50, 60, 70]',
          caption: 'แบ่งครึ่งช่วงค้นหาทุกครั้ง ทำให้เจอค่า 50 ในการเปรียบเทียบเพียง 2 รอบ (แทนที่จะไล่ 5 รอบแบบ Linear Search)',
          code: `flowchart LR
  S1["รอบที่ 1: ช่วง index 0..6 • ค่ากลาง mid=3 คือ 40"] --> CHK1{"50 > 40 จึงตัดครึ่งซ้ายทิ้ง"}
  CHK1 --> S2["รอบที่ 2: ช่วง index 4..6 • ค่ากลาง mid=5 คือ 60"]
  S2 --> CHK2{"50 < 60 จึงตัดครึ่งขวาทิ้ง"}
  CHK2 --> S3["รอบที่ 3: เหลือ index 4..4 • mid=4 คือ 50"]
  S3 --> FOUND(["พบเป้าหมาย 50 ที่ index 4!"])`
        }
      }
    ],
    quiz: [
      {
        id: 'q-core5-1',
        question: 'กำหนดให้ตัวแปร a = 14, b = 4, c = true, d = false ข้อใดคือผลลัพธ์ของนิพจน์: (a % b == 2) && d || c',
        options: [
          'true',
          'false',
          '2',
          'เกิด Syntax Error'
        ],
        correctIndex: 0,
        explanation: {
          summary: '14 % 4 ได้เศษ 2 (true), true && false ได้ false, แล้วทำ false || true ได้ผลลัพธ์เป็น true',
          perOption: [
            'ก. ถูกต้อง ตามลำดับความสำคัญ: (14 % 4 == 2) → (2 == 2) → true จากนั้นทำ true && false ได้ false แล้วค่อยทำ false || true ได้ true',
            'ข. ผิด เพราะตัวดำเนินการ && ทำก่อน || จึงเหลือ false || true ซึ่งมีค่าเป็น true',
            'ค. ผิด นิพจน์นี้มีตัวดำเนินการเปรียบเทียบและตรรกะ ผลลัพธ์จึงเป็นค่า Boolean ไม่ใช่ตัวเลข',
            'ง. ผิด ไวยากรณ์ถูกต้องสมบูรณ์ในภาษาตระกูล C, Java และ JavaScript'
          ]
        }
      },
      {
        id: 'q-core5-2',
        question: 'เมื่อรันโค้ดเงื่อนไขต่อไปนี้กับ score = 78 หน้าจอจะพิมพ์ข้อความใดออกมา?\nif (score >= 80) { print("A"); }\nelse if (score >= 70) { print("B"); }\nelse if (score >= 75) { print("B+"); }\nelse { print("C"); }',
        options: [
          'A',
          'B',
          'B+',
          'พิมพ์ทั้ง B และ B+'
        ],
        correctIndex: 1,
        explanation: {
          summary: 'โครงสร้าง if / else if จะทำงานเฉพาะบล็อกแรกที่เป็นจริงแล้วข้าม else if ที่เหลือทั้งหมดทันที',
          perOption: [
            'ก. ผิด 78 >= 80 เป็นเท็จ จึงข้ามไปตรวจเงื่อนไขถัดไป',
            'ข. ถูกต้อง เมื่อตรวจ 78 >= 70 ซึ่งเป็นจริง ระบบจะพิมพ์ "B" แล้วออกจากชุด if-else ทันที โดยไม่ลงไปตรวจ >= 75 เลย (เป็น Bug จากการเรียงเงื่อนไขที่พบบ่อย!)',
            'ค. ผิด เงื่อนไข >= 75 อยู่หลัง >= 70 จึงถูกบังและไม่มีวันถูกเข้าถึงสำหรับค่า >= 70',
            'ง. ผิด else if จะเลือกทำได้เพียงทางเดียวเท่านั้น ไม่เหมือน if แยกอิสระหลายตัว'
          ]
        }
      },
      {
        id: 'q-core5-3',
        question: 'จงไล่ค่าตัวแปรจากโค้ดต่อไปนี้ ค่าสุดท้ายของ sum เท่ากับเท่าใด?\nlet sum = 0;\nfor (let i = 1; i <= 5; i++) {\n  if (i === 3) continue;\n  if (i === 5) break;\n  sum = sum + i;\n}',
        options: [
          '3',
          '7',
          '10',
          '12'
        ],
        correctIndex: 1,
        explanation: {
          summary: 'รอบ i=1 (sum=1), i=2 (sum=3), i=3 (continue ข้าม), i=4 (sum=7), i=5 (break หยุดลูป)',
          perOption: [
            'ก. ผิด นั่นคือค่าก่อนรอบ i=4 (หาก break ที่ 3)',
            'ข. ถูกต้อง sum บวกเฉพาะ i=1, 2, 4 (1 + 2 + 4 = 7) เพราะ i=3 ถูกข้ามด้วย continue และ i=5 ออกจากลูปทันทีด้วย break',
            'ค. ผิด 10 คือกรณีที่ไม่ได้ใส่ continue ที่ i=3 (1+2+3+4) หรือไม่เจอ break',
            'ง. ผิด 12 คือกรณีที่บวก i=5 เข้าไปด้วย'
          ]
        }
      },
      {
        id: 'q-core5-4',
        question: 'ข้อใดกล่าวถึงความแตกต่างระหว่างลูป while และ do-while รวมถึง Array Index ได้ถูกต้อง?',
        options: [
          'while ทำงานอย่างน้อย 1 รอบเสมอ และ Array มี Index เริ่มที่ 1',
          'do-while ทำงานอย่างน้อย 1 รอบเสมอแม้เงื่อนไขเป็นเท็จตั้งแต่แรก และ Array เข้าถึงสมาชิกด้วย Index (เริ่มที่ 0) ในเวลา O(1)',
          'ทั้ง while และ do-while ไม่สามารถใช้คำสั่ง break ได้',
          'การเข้าถึงสมาชิก arr[5] ใน Array ต้องไล่นับตั้งแต่ arr[0] ใช้เวลา O(n)'
        ],
        correctIndex: 1,
        explanation: {
          summary: 'do-while เป็น Post-test loop (ทำก่อนตรวจ อย่างน้อย 1 รอบ) และ Array เก็บต่อเนื่องใน RAM จึงเข้าถึงผ่าน Index 0..n-1 ได้ใน O(1)',
          perOption: [
            'ก. ผิด while เป็น Pre-test (อาจทำ 0 รอบ) และ Array ในภาษาหลักเริ่มที่ Index 0',
            'ข. ถูกต้อง ครอบคลุมทั้งลักษณะการทำงานของ do-while และการเข้าถึง Array แบบ Random Access O(1)',
            'ค. ผิด ทั้ง while และ do-while รองรับ break และ continue ตามปกติ',
            'ง. ผิด O(n) เป็นความเร็วของการเข้าถึงสมาชิกใน Linked List ไม่ใช่ Array'
          ]
        }
      },
      {
        id: 'q-core5-5',
        question: 'เริ่มต้นมี Stack ว่างอยู่ 1 ชุด จากนั้นทำคำสั่งตามลำดับ: Push(10), Push(20), Pop(), Push(30), Push(40), Pop() อยากทราบว่าค่าที่ถูก Pop ออกมาล่าสุด และค่าที่อยู่บนสุด (Top) ของ Stack ในขณะนี้คือค่าใดตามลำดับ?',
        options: [
          'Pop ล่าสุด = 10, Top ของ Stack = 20',
          'Pop ล่าสุด = 40, Top ของ Stack = 30',
          'Pop ล่าสุด = 20, Top ของ Stack = 40',
          'Pop ล่าสุด = 40, Top ของ Stack = 10'
        ],
        correctIndex: 1,
        explanation: {
          summary: 'Stack ใช้หลัก LIFO: [10] → [10,20] → Pop ได้ 20 เหลือ [10] → [10,30] → [10,30,40] → Pop ได้ 40 เหลือ [10,30]',
          perOption: [
            'ก. ผิด นั่นเป็นการคิดแบบ Queue (FIFO) ที่หยิบตัวแรกสุดออก',
            'ข. ถูกต้อง Pop ครั้งแรกได้ 20, Pop ครั้งที่สองได้ 40, สุดท้ายเหลือ [10, 30] โดย Top คือ 30',
            'ค. ผิด Pop ครั้งที่สองต้องหยิบ 40 ที่เพิ่ง Push เข้าไปล่าสุดออกก่อน',
            'ง. ผิด 10 อยู่ด้านล่างสุด (Bottom) ส่วน 30 อยู่บนสุด (Top)'
          ]
        }
      },
      {
        id: 'q-core5-6',
        question: 'เริ่มต้นมี Queue ว่างอยู่ 1 ชุด จากนั้นทำคำสั่ง: Enqueue("Q1"), Enqueue("Q2"), Dequeue(), Enqueue("Q3"), Dequeue() ข้อมูลที่ยังเหลืออยู่ใน Queue และข้อมูลที่ถูก Dequeue ออกไปล่าสุดคือข้อใด?',
        options: [
          'เหลือ "Q3" และ Dequeue ล่าสุดคือ "Q2"',
          'เหลือ "Q1" และ Dequeue ล่าสุดคือ "Q3"',
          'เหลือ "Q2" และ Dequeue ล่าสุดคือ "Q1"',
          'เหลือ "Q3" และ Dequeue ล่าสุดคือ "Q1"'
        ],
        correctIndex: 0,
        explanation: {
          summary: 'Queue ใช้หลัก FIFO: [Q1] → [Q1,Q2] → Dequeue ได้ Q1 เหลือ [Q2] → [Q2,Q3] → Dequeue ได้ Q2 เหลือ [Q3]',
          perOption: [
            'ก. ถูกต้อง มาก่อนออกก่อน: Q1 ออกรอบแรก, Q2 ออกรอบสอง, เหลือ Q3 รออยู่ในคิว',
            'ข. ผิด Q1 ถูก Dequeue ออกไปเป็นตัวแรกสุดแล้ว',
            'ค. ผิด Q2 ออกไปในการ Dequeue ครั้งที่สอง',
            'ง. ผิด การ Dequeue ล่าสุด (ครั้งที่สอง) จะต้องได้ Q2 ไม่ใช่ Q1'
          ]
        }
      },
      {
        id: 'q-core5-7',
        question: 'ข้อใดคือเงื่อนไขบังคับก่อนใช้ Binary Search (O(log n)) และหากมีข้อมูลอยู่ 1,024 รายการ Binary Search จะใช้จำนวนการเปรียบเทียบในกรณีแย่ที่สุดประมาณกี่ครั้ง?',
        options: [
          'ไม่ต้องเรียงข้อมูลก่อน, ใช้ประมาณ 512 ครั้ง',
          'ข้อมูลต้องเรียงลำดับ (Sorted) แล้วเท่านั้น, ใช้ไม่เกินประมาณ 10–11 ครั้ง (log₂ 1024 = 10)',
          'ต้องเก็บข้อมูลใน Stack เท่านั้น, ใช้ 1 ครั้ง',
          'ข้อมูลต้องไม่มีเลขคู่, ใช้ประมาณ 1,024 ครั้ง'
        ],
        correctIndex: 1,
        explanation: {
          summary: 'Binary Search ตัดข้อมูลทิ้งทีละครึ่งจึงทำงานได้ใน O(log₂ n) แต่ต้องเรียงข้อมูลมาก่อนเสมอ',
          perOption: [
            'ก. ผิด 512 ครั้งเป็นค่าเฉลี่ยของ Linear Search และ Binary Search ใช้กับข้อมูลไม่เรียงไม่ได้',
            'ข. ถูกต้อง เพราะ 2¹⁰ = 1,024 จึงแบ่งครึ่งค้นหาไม่เกิน ~10–11 รอบเท่านั้น และจำเป็นต้องเรียงลำดับข้อมูลไว้ก่อน',
            'ค. ผิด Binary Search ใช้กับ Array ที่เข้าถึงตำแหน่งกึ่งกลางได้ทันที ไม่ใช่ Stack',
            'ง. ผิด 1,024 ครั้งคือ Worst-case ของ Linear Search (O(n))'
          ]
        }
      },
      {
        id: 'q-core5-8',
        question: 'ในแนวคิด OOP การกำหนด Attribute ยอดเงินหรือราคาประเมินในคลาสให้เป็น "private" เพื่อป้องกันการแก้ไขค่าโดยตรงจากภายนอก แล้วบังคับให้เรียกผ่านเมธอดตรวจสอบสิทธิ์แทน ตรงกับเสาหลักใดของ OOP?',
        options: [
          'Polymorphism',
          'Inheritance',
          'Encapsulation',
          'Recursion'
        ],
        correctIndex: 2,
        explanation: {
          summary: 'การห่อหุ้มข้อมูลและซ่อนรายละเอียดภายในด้วย Access Modifier (private/protected) คือ Encapsulation',
          perOption: [
            'ก. ผิด Polymorphism คือความสามารถที่เมธอดชื่อเดียวกันแสดงพฤติกรรมต่างกันตามชนิด Object',
            'ข. ผิด Inheritance คือการสืบทอดคุณสมบัติจากคลาสแม่สู่คลาสลูก',
            'ค. ถูกต้อง Encapsulation ช่วยปกป้องความถูกต้องของข้อมูลภายในคลาสผ่านการควบคุมการเข้าถึง',
            'ง. ผิด Recursion เป็นเทคนิคฟังก์ชันเรียกตัวเอง ไม่ใช่เสาหลักของ OOP'
          ]
        }
      }
    ]
  });
})(window);
