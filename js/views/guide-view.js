/**
 * Guide View: Step-by-step visual guide in Thai for:
 * (1) Deploying to GitHub Pages for free (no build step)
 * (2) Adding future government agency modules with registerAgency()
 * (3) Updating/replacing lesson illustrations in assets/images/ using built-in AI Prompts
 */
(function (global) {
  'use strict';

  var AGENCY_TEMPLATE_CODE = [
    '// ไฟล์ตัวอย่าง: js/data/agencies/dopa.js (กรมการปกครอง หรือหน่วยงานอื่น)',
    '(function (global) {',
    "  'use strict';",
    '',
    "  if (!global.GOV_PREP || typeof global.GOV_PREP.registerAgency !== 'function') {",
    "    console.error('GOV_PREP.registerAgency not found');",
    '    return;',
    '  }',
    '',
    '  global.GOV_PREP.registerAgency({',
    "    id: 'dopa', // รหัสเฉพาะตัวอักษรพิมพ์เล็ก ห้ามซ้ำกับหน่วยงานอื่น",
    "    name: 'กรมการปกครอง (DOPA)',",
    "    shortName: 'กรมการปกครอง',",
    "    badge: 'หน่วยงานเพิ่มเติม',",
    "    description: 'ความรู้เฉพาะทางทะเบียนราษฎร บัตรประจำตัวประชาชน และระบบดิจิทัลกรมการปกครอง',",
    '    lessons: [',
    '      {',
    "        id: 'dopa-1-civil-reg',",
    "        code: 'DOPA-01',",
    "        category: 'agency',",
    "        agencyId: 'dopa',",
    '        order: 9, // เรียงต่อจากบทเรียนเดิม (บทที่ 1-8)',
    "        title: 'พ.ร.บ.การทะเบียนราษฎร และระบบฐานข้อมูลกลางประชาชน',",
    "        shortTitle: 'ทะเบียนราษฎร & ฐานข้อมูล',",
    "        subtitle: 'โครงสร้างเลขประจำตัวประชาชน 13 หลัก การเชื่อมโยง Linkage Center และ API ภาครัฐ',",
    '        estimatedMinutes: 15,',
    "        icon: 'fa-solid fa-id-card',",
    '        heroVisual: {',
    "          image: 'assets/images/hero-banner.png', // แนะนำให้สร้างภาพใหม่ใส่ assets/images/",
    "          alt: 'แผนภาพระบบทะเบียนราษฎรและการเชื่อมโยงข้อมูลกลาง',",
    "          caption: 'สถาปัตยกรรมการเชื่อมโยงฐานข้อมูลทะเบียนราษฎรกับหน่วยงานภาครัฐ',",
    "          aspectRatio: '16 / 9',",
    '          width: 1200,',
    '          height: 675,',
    "          prompt: 'Clean flat isometric vector illustration of digital citizen registry database...'",
    '        },',
    '        summaryTakeaways: [',
    "          'สรุปประเด็นสำคัญข้อที่ 1 สำหรับใช้ทบทวนก่อนสอบ',",
    "          'สรุปประเด็นสำคัญข้อที่ 2 พร้อมจุดที่ข้อสอบชอบหลอก'",
    '        ],',
    '        sections: [',
    '          {',
    "            id: 'dopa-sec-1',",
    "            title: '1. โครงสร้างข้อมูลและกฎหมายที่เกี่ยวข้อง',",
    '            analogyBox: {',
    "              title: 'เปรียบเทียบให้เห็นภาพ',",
    "              body: 'อธิบายเรื่องยากด้วยตัวอย่างใกล้ตัวในชีวิตประจำวัน...'",
    '            },',
    "            bodyHtml: '<p>เนื้อหาบทเรียนพร้อมตารางเปรียบเทียบใน &lt;div class=\"table-wrap\"&gt;</p>'",
    '          }',
    '        ],',
    '        quiz: [',
    '          {',
    "            id: 'q-dopa1-1',",
    "            question: 'คำถามท้ายบทเรียนข้อที่ 1?',",
    "            options: ['ตัวเลือก ก', 'ตัวเลือก ข', 'ตัวเลือก ค', 'ตัวเลือก ง'],",
    '            correctIndex: 0,',
    '            explanation: {',
    "              summary: 'สรุปเหตุผลของคำตอบที่ถูกต้อง',",
    '              perOption: [',
    "                'ก. ถูกต้อง เพราะ...',",
    "                'ข. ผิด เพราะ...',",
    "                'ค. ผิด เพราะ...',",
    "                'ง. ผิด เพราะ...'",
    '              ]',
    '            }',
    '          }',
    '        ]',
    '      }',
    '    ]',
    '  });',
    '})(window);'
  ].join('\n');

  var INDEX_SCRIPT_SNIPPET = [
    '<!-- เพิ่ม 1 บรรทัดใน index.html ต่อจาก js/data/agencies/dol.js -->',
    '<script defer src="js/data/agencies/dol.js"></script>',
    '<script defer src="js/data/agencies/dopa.js"></script>'
  ].join('\n');

  function escapeHtml(str) {
    return String(str == null ? '' : str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function copyTextWithFeedback(text, btnEl) {
    if (global.GOV_PREP && global.GOV_PREP.app && typeof global.GOV_PREP.app.copyToClipboard === 'function') {
      global.GOV_PREP.app.copyToClipboard(text, btnEl);
      return;
    }

    var originalHtml = btnEl.getAttribute('data-orig-html') || btnEl.innerHTML;
    btnEl.setAttribute('data-orig-html', originalHtml);

    function markCopied() {
      if (btnEl._copyResetTimer) {
        global.clearTimeout(btnEl._copyResetTimer);
      }
      btnEl.innerHTML = '<i class="fa-solid fa-check" aria-hidden="true"></i> คัดลอกเรียบร้อย!';
      btnEl._copyResetTimer = global.setTimeout(function () {
        btnEl.innerHTML = originalHtml;
        btnEl._copyResetTimer = null;
      }, 2000);
    }

    if (navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
      navigator.clipboard
        .writeText(text)
        .then(markCopied)
        .catch(function () {
          fallbackCopy(text);
          markCopied();
        });
    } else {
      fallbackCopy(text);
      markCopied();
    }
  }

  function fallbackCopy(text) {
    var ta = document.createElement('textarea');
    ta.value = text;
    ta.setAttribute('readonly', '');
    ta.style.position = 'fixed';
    ta.style.left = '-9999px';
    document.body.appendChild(ta);
    ta.select();
    try {
      document.execCommand('copy');
    } catch (e) {}
    document.body.removeChild(ta);
  }

  function render(containerEl) {
    if (!containerEl) return;

    var registry = global.GOV_PREP || {};
    var lessons = typeof registry.getAllLessonsOrdered === 'function' ? registry.getAllLessonsOrdered() : [];

    var assetRowsHtml = lessons
      .map(function (lesson) {
        var hv = lesson.heroVisual || {};
        return (
          '<tr>' +
          '<th scope="row" class="font-mono">' +
          escapeHtml(lesson.code || lesson.id) +
          '</th>' +
          '<td>' +
          escapeHtml(lesson.shortTitle || lesson.title) +
          '</td>' +
          '<td><code>' +
          escapeHtml(hv.image || '-') +
          '</code></td>' +
          '<td>' +
          (hv.width && hv.height ? escapeHtml(hv.width + ' × ' + hv.height + ' px') : '1200 × 675 px') +
          '</td>' +
          '</tr>'
        );
      })
      .join('');

    containerEl.innerHTML =
      '<div class="space-y-8" data-guide-root>' +
      // Hero
      '<header class="hero-card cadastral-grid space-y-3">' +
      '<span class="badge-pill badge-primary"><i class="fa-solid fa-book-bookmark" aria-hidden="true"></i> Documentation &amp; Modular Extension</span>' +
      '<h1>คู่มือเผยแพร่ขึ้น GitHub Pages และการขยายระบบ</h1>' +
      '<p class="text-muted prose-content">' +
      'โปรเจกต์นี้ถูกออกแบบเป็น <strong>Static Web 100% (No Build Step)</strong> เปิดใช้งานได้ทั้งจากเครื่องคอมพิวเตอร์โดยตรง (<code>file://</code>) และโฮสต์ออนไลน์ฟรีบน GitHub Pages รวมถึงรองรับการเพิ่มหน่วยงานราชการใหม่ในอนาคตได้ภายในไฟล์เดียว' +
      '</p>' +
      '</header>' +
      // Section 1: GitHub Pages
      '<section class="card card-lg space-y-5" aria-labelledby="guide-gh-heading">' +
      '<div class="flex flex-wrap items-center justify-between gap-2">' +
      '<h2 id="guide-gh-heading" class="flex items-center gap-2">' +
      '<i class="fa-brands fa-github text-primary-token" aria-hidden="true"></i>' +
      '<span>1. วิธีนำโปรเจกต์อัปโหลดขึ้น GitHub Pages ฟรี (ภายใน 5 นาที)</span>' +
      '</h2>' +
      '<span class="badge-pill badge-success">ฟรี 100% • ไม่ต้องเช่าโฮสต์</span>' +
      '</div>' +
      '<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">' +
      '<div class="card-muted space-y-2">' +
      '<span class="badge-pill badge-primary font-mono">STEP 1</span>' +
      '<h3 class="text-base font-semibold">สร้าง Repository ใหม่บน GitHub</h3>' +
      '<p class="text-sm text-muted">ล็อกอินเข้า GitHub แล้วกด <strong>New repository</strong> ตั้งชื่อเช่น <code>gov-it-prep</code> เลือกสถานะเป็น <strong>Public</strong> (สำหรับบัญชีฟรี) แล้วกด Create repository</p>' +
      '</div>' +
      '<div class="card-muted space-y-2">' +
      '<span class="badge-pill badge-primary font-mono">STEP 2</span>' +
      '<h3 class="text-base font-semibold">อัปโหลดไฟล์ทั้งหมดขึ้น Repo</h3>' +
      '<p class="text-sm text-muted">ลากโฟลเดอร์โปรเจกต์ทั้งหมด (<code>index.html</code>, <code>css/</code>, <code>js/</code>, <code>assets/</code>) ผ่านปุ่ม <strong>Add file → Upload files</strong> หรือใช้คำสั่ง <code>git push</code> โดยให้ <code>index.html</code> อยู่ที่ชั้นนอกสุด (Root)</p>' +
      '</div>' +
      '<div class="card-muted space-y-2">' +
      '<span class="badge-pill badge-primary font-mono">STEP 3</span>' +
      '<h3 class="text-base font-semibold">เปิดใช้งาน GitHub Pages</h3>' +
      '<p class="text-sm text-muted">เข้าไปที่เมนู <strong>Settings → Pages</strong> ตรงหัวข้อ Build and deployment เลือก Source เป็น <strong>Deploy from a branch</strong> แล้วเลือก Branch <code>main</code> และโฟลเดอร์ <code>/ (root)</code> จากนั้นกด <strong>Save</strong></p>' +
      '</div>' +
      '<div class="card-muted space-y-2">' +
      '<span class="badge-pill badge-success font-mono">STEP 4</span>' +
      '<h3 class="text-base font-semibold">รับลิงก์เว็บพร้อมแชร์</h3>' +
      '<p class="text-sm text-muted">รอประมาณ 1–2 นาที GitHub จะแสดง URL <code>https://&lt;username&gt;.github.io/gov-it-prep/</code> ซึ่งจะใช้ <strong>sql.js WASM</strong> เต็มรูปแบบผ่าน HTTPS และเปิดเรียนจากมือถือได้ทันที</p>' +
      '</div>' +
      '</div>' +
      '<div class="callout callout-tip">' +
      '<div class="callout-title"><i class="fa-solid fa-circle-info" aria-hidden="true"></i> จุดเด่นสำคัญ: ไม่ต้องตั้งค่า Node.js, Vite หรือ GitHub Actions</div>' +
      '<p class="text-sm">ระบบใช้ Relative Path ทั้งหมด (เช่น <code>assets/images/hero-banner.png</code> และ <code>#lesson/...</code> Hash Routing) จึงไม่เกิดปัญหา 404 เมื่ออยู่ภายใต้ Sub-path ของ GitHub Pages</p>' +
      '</div>' +
      '</section>' +
      // Section 2: Modular Agency Extension
      '<section class="card card-lg space-y-5" aria-labelledby="guide-agency-heading">' +
      '<div class="flex flex-wrap items-center justify-between gap-2">' +
      '<h2 id="guide-agency-heading" class="flex items-center gap-2">' +
      '<i class="fa-solid fa-cubes text-accent-token" aria-hidden="true"></i>' +
      '<span>2. วิธีเพิ่มโมดูลกรมอื่นๆ ในอนาคต (Modular Agency Architecture)</span>' +
      '</h2>' +
      '<span class="badge-pill badge-accent">Plug &amp; Play 1 ไฟล์</span>' +
      '</div>' +
      '<p class="prose-content text-muted">' +
      'หากในอนาคตคุณต้องการเพิ่มแนวข้อสอบเฉพาะทางของหน่วยงานอื่น เช่น <strong>กรมการปกครอง, กรมสรรพากร, กรมพัฒนาที่ดิน หรือสำนักงาน ก.พ.</strong> เพียงสร้างไฟล์ JS ใหม่ 1 ไฟล์ในโฟลเดอร์ <code>js/data/agencies/</code> แล้วเรียกฟังก์ชัน <code>window.GOV_PREP.registerAgency({...})</code> หน้าแรก แถบความคืบหน้า และเมนูด้านข้างจะสร้างให้อัตโนมัติทันทีโดยไม่ต้องแก้โค้ดส่วน UI เลยครับ' +
      '</p>' +
      '<div class="space-y-3">' +
      '<div class="flex flex-wrap items-center justify-between gap-2">' +
      '<h3 class="text-base font-semibold">ขั้นตอนที่ 1: คัดลอกเทมเพลต <code>registerAgency()</code> ไปสร้างไฟล์ใหม่</h3>' +
      '<button type="button" class="btn btn-primary btn-sm" data-guide-copy="agency">' +
      '<i class="fa-regular fa-copy" aria-hidden="true"></i> คัดลอกเทมเพลต JS</button>' +
      '</div>' +
      '<pre tabindex="0"><code id="guide-agency-code">' +
      escapeHtml(AGENCY_TEMPLATE_CODE) +
      '</code></pre>' +
      '</div>' +
      '<div class="space-y-3">' +
      '<div class="flex flex-wrap items-center justify-between gap-2">' +
      '<h3 class="text-base font-semibold">ขั้นตอนที่ 2: โหลดไฟล์ใหม่ใน <code>index.html</code></h3>' +
      '<button type="button" class="btn btn-secondary btn-sm" data-guide-copy="index">' +
      '<i class="fa-regular fa-copy" aria-hidden="true"></i> คัดลอกแท็ก &lt;script&gt;</button>' +
      '</div>' +
      '<pre tabindex="0"><code id="guide-index-code">' +
      escapeHtml(INDEX_SCRIPT_SNIPPET) +
      '</code></pre>' +
      '</div>' +
      '</section>' +
      // Section 3: Updating / Replacing Illustrations via AI Prompt
      '<section class="card card-lg space-y-5" aria-labelledby="guide-assets-heading">' +
      '<div class="flex flex-wrap items-center justify-between gap-2">' +
      '<h2 id="guide-assets-heading" class="flex items-center gap-2">' +
      '<i class="fa-solid fa-wand-magic-sparkles text-primary-token" aria-hidden="true"></i>' +
      '<span>3. วิธีอัปเดตหรือแทนที่ภาพประกอบใน <code>assets/images/</code> ด้วย AI Prompt</span>' +
      '</h2>' +
      '<span class="badge-pill badge-primary">ปรับแต่งภาพได้ไม่จำกัด</span>' +
      '</div>' +
      '<div class="prose-content space-y-2">' +
      '<p>ทุกบทเรียนได้แนบ <strong>AI Prompt สำเร็จรูป</strong> ซ่อนไว้ใต้ภาพปกบทเรียนในกล่องพับ <em>"ดู AI Prompt สำหรับสร้าง/แก้ไขภาพประกอบนี้"</em> พร้อมปุ่มคัดลอกไว้ให้แล้ว หากต้องการสร้างภาพสไตล์ใหม่หรือแก้ไขข้อความในภาพ ให้ทำตาม 3 ขั้นตอนดังนี้:</p>' +
      '<ol>' +
      '<li>เปิดเข้าไปในบทเรียนที่ต้องการ แล้วกดเปิดกล่อง <strong>AI Prompt</strong> ใต้ภาพประกอบ จากนั้นกดปุ่ม <strong>คัดลอก Prompt</strong></li>' +
      '<li>นำ Prompt ไปสร้างภาพด้วยเครื่องมือ AI Image Generator ที่คุณถนัด (เช่น Imagen, Gemini, Midjourney หรือ DALL·E) โดยตั้งค่าสัดส่วนภาพ <strong>16:9</strong> (สำหรับบทเรียน) หรือ <strong>2:1</strong> (สำหรับแบนเนอร์หน้าแรก)</li>' +
      '<li>บันทึกไฟล์ทับชื่อไฟล์เดิมในโฟลเดอร์ <code>assets/images/</code> (หรือปรับชื่อไฟล์ในฟิลด์ <code>heroVisual.image</code> ของไฟล์ข้อมูลบทเรียน) แล้วรีเฟรชเบราว์เซอร์</li>' +
      '</ol>' +
      '</div>' +
      '<div class="table-wrap">' +
      '<table class="data-table">' +
      '<caption>รายการไฟล์ภาพประกอบบทเรียนทั้งหมดในโฟลเดอร์ assets/images/</caption>' +
      '<thead><tr>' +
      '<th scope="col">รหัสบท</th>' +
      '<th scope="col">ชื่อบทเรียน</th>' +
      '<th scope="col">เส้นทางไฟล์ (Path)</th>' +
      '<th scope="col">ขนาดแนะนำ</th>' +
      '</tr></thead>' +
      '<tbody>' +
      '<tr>' +
      '<th scope="row" class="font-mono">HOME</th>' +
      '<td>แบนเนอร์หลักหน้า Dashboard</td>' +
      '<td><code>assets/images/hero-banner.png</code></td>' +
      '<td>1200 × 600 px (2:1)</td>' +
      '</tr>' +
      assetRowsHtml +
      '<tr>' +
      '<th scope="row" class="font-mono">CORE-04 (Sec 3)</th>' +
      '<td>ภาพประกอบเกราะป้องกันภัยไซเบอร์ &amp; พ.ร.บ.คอมฯ</td>' +
      '<td><code>assets/images/core-cyber-shield.png</code></td>' +
      '<td>1200 × 675 px (16:9)</td>' +
      '</tr>' +
      '</tbody>' +
      '</table>' +
      '</div>' +
      '</section>' +
      '</div>';

    var copyAgencyBtn = containerEl.querySelector('[data-guide-copy="agency"]');
    if (copyAgencyBtn) {
      copyAgencyBtn.addEventListener('click', function () {
        copyTextWithFeedback(AGENCY_TEMPLATE_CODE, copyAgencyBtn);
      });
    }

    var copyIndexBtn = containerEl.querySelector('[data-guide-copy="index"]');
    if (copyIndexBtn) {
      copyIndexBtn.addEventListener('click', function () {
        copyTextWithFeedback(INDEX_SCRIPT_SNIPPET, copyIndexBtn);
      });
    }
  }

  global.GOV_PREP = global.GOV_PREP || {};
  global.GOV_PREP.views = global.GOV_PREP.views || {};
  global.GOV_PREP.views.guide = {
    render: render
  };
})(window);
