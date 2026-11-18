/**
 * Dashboard View: Curriculum overview, hero banner, separated Core & Agency
 * progress trackers, flashcards/mock summary cards, and quick module directory.
 */
(function (global) {
  'use strict';

  function escapeHtml(str) {
    return String(str == null ? '' : str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function renderLessonCard(lesson, stateApi) {
    var completed = stateApi ? stateApi.isLessonCompleted(lesson.id) : false;
    var quizRes = stateApi ? stateApi.getQuizResult('quiz-' + lesson.id) : null;
    var hasQuizAttempt = quizRes && quizRes.answers && Object.keys(quizRes.answers).length > 0;
    var quizTotal = Array.isArray(lesson.quiz) ? lesson.quiz.length : 8;

    var statusBadge = completed
      ? '<span class="badge-pill badge-success"><i class="fa-solid fa-circle-check" aria-hidden="true"></i> เรียนจบแล้ว</span>'
      : '<span class="badge-pill"><i class="fa-regular fa-clock" aria-hidden="true"></i> ' +
        (lesson.estimatedMinutes || 15) +
        ' นาที</span>';

    var quizBadge = hasQuizAttempt
      ? '<span class="badge-pill badge-primary"><i class="fa-solid fa-award" aria-hidden="true"></i> แบบฝึกหัด ' +
        quizRes.score +
        '/' +
        (quizRes.total || quizTotal) +
        ' (' +
        quizRes.percentage +
        '%)</span>'
      : '<span class="badge-pill"><i class="fa-regular fa-pen-to-square" aria-hidden="true"></i> แบบฝึกหัด ' +
        quizTotal +
        ' ข้อ</span>';

    return (
      '<article class="module-card">' +
      '<div class="flex items-center justify-between gap-2 flex-wrap">' +
      '<span class="badge-pill badge-primary font-mono"><i class="' +
      escapeHtml(lesson.icon || 'fa-solid fa-book-open') +
      '" aria-hidden="true"></i> ' +
      escapeHtml(lesson.code || lesson.id) +
      '</span>' +
      statusBadge +
      '</div>' +
      '<h3 class="text-base font-semibold leading-snug">' +
      '<a href="#lesson/' +
      escapeHtml(lesson.id) +
      '" class="no-underline hover:underline text-inherit">' +
      escapeHtml(lesson.title) +
      '</a>' +
      '</h3>' +
      '<p class="text-sm text-muted flex-1">' +
      escapeHtml(lesson.subtitle || '') +
      '</p>' +
      '<div class="flex items-center justify-between gap-2 flex-wrap pt-2 border-t" style="border-color: var(--border-color);">' +
      quizBadge +
      '<a href="#lesson/' +
      escapeHtml(lesson.id) +
      '" class="btn btn-sm ' +
      (completed ? 'btn-secondary' : 'btn-primary') +
      '">' +
      (completed ? 'ทบทวนบทเรียน' : 'เริ่มเรียนบทนี้') +
      ' <i class="fa-solid fa-arrow-right" aria-hidden="true"></i>' +
      '</a>' +
      '</div>' +
      '</article>'
    );
  }

  function render(containerEl) {
    if (!containerEl) return;

    var registry = global.GOV_PREP || {};
    var stateApi = registry.state;
    var coreLessons = typeof registry.getCoreLessons === 'function' ? registry.getCoreLessons() : [];
    var agencies = Array.isArray(registry.agencies) ? registry.agencies : [];
    var allLessons = typeof registry.getAllLessonsOrdered === 'function' ? registry.getAllLessonsOrdered() : [];
    var allCards = Array.isArray(registry.flashcards) ? registry.flashcards : [];
    var mockExam = registry.mockExam;

    var coreDone = 0;
    for (var i = 0; i < coreLessons.length; i += 1) {
      if (stateApi && stateApi.isLessonCompleted(coreLessons[i].id)) coreDone += 1;
    }
    var coreTotal = coreLessons.length;
    var corePct = coreTotal ? Math.round((coreDone / coreTotal) * 100) : 0;

    // Next uncompleted lesson CTA
    var nextLesson = null;
    for (var n = 0; n < allLessons.length; n += 1) {
      if (!stateApi || !stateApi.isLessonCompleted(allLessons[n].id)) {
        nextLesson = allLessons[n];
        break;
      }
    }
    if (!nextLesson && allLessons.length) {
      nextLesson = allLessons[0];
    }
    var allCompleted = allLessons.length > 0 && stateApi && coreDone === coreTotal && allLessons.every(function (l) {
      return stateApi.isLessonCompleted(l.id);
    });

    // Flashcards & Mock Exam stats
    var fcCounts = stateApi ? stateApi.getFlashcardCounts() : { known: 0, review: 0 };
    var fcTotal = allCards.length || 45;
    var fcPct = fcTotal ? Math.round((fcCounts.known / fcTotal) * 100) : 0;

    var bestMock = stateApi ? stateApi.getBestMockScore() : null;
    var mockTotal = mockExam && Array.isArray(mockExam.questions) ? mockExam.questions.length : 50;
    var mockPct = bestMock && mockTotal ? Math.round((bestMock.score / (bestMock.total || mockTotal)) * 100) : 0;

    var diagramsGuide = registry.diagramsGuide || {};
    var diagramCatCount = Array.isArray(diagramsGuide.categories) ? diagramsGuide.categories.length : 6;
    var diagramExamCount = Array.isArray(diagramsGuide.writtenExams) ? diagramsGuide.writtenExams.length : 6;

    var sqlGuideData = registry.sqlGuide || {};
    var sqlChapterCount = Array.isArray(sqlGuideData.chapters) ? sqlGuideData.chapters.length : 8;
    var sqlExamCount = Array.isArray(sqlGuideData.writtenExams) ? sqlGuideData.writtenExams.length : 6;

    // Dynamic agency progress cards (DOL and any future agencies)
    var agencyProgressCardsHtml = agencies
      .map(function (ag) {
        var agLessons = typeof registry.getAgencyLessons === 'function' ? registry.getAgencyLessons(ag.id) : ag.lessons || [];
        var agDone = 0;
        for (var k = 0; k < agLessons.length; k += 1) {
          if (stateApi && stateApi.isLessonCompleted(agLessons[k].id)) agDone += 1;
        }
        var agTotal = agLessons.length;
        var agPct = agTotal ? Math.round((agDone / agTotal) * 100) : 0;

        return (
          '<div class="card flex flex-col gap-3">' +
          '<div class="flex items-center justify-between gap-2">' +
          '<span class="badge-pill badge-accent"><i class="fa-solid fa-landmark" aria-hidden="true"></i> ' +
          escapeHtml(ag.badge || 'เฉพาะทางหน่วยงาน') +
          '</span>' +
          '<span class="font-mono text-sm font-semibold">' +
          agDone +
          ' / ' +
          agTotal +
          ' บท</span>' +
          '</div>' +
          '<div>' +
          '<h3 class="text-base font-semibold">หมวดเฉพาะทาง: ' +
          escapeHtml(ag.shortName || ag.name) +
          '</h3>' +
          '<p class="text-sm text-muted">' +
          escapeHtml(ag.description || '') +
          '</p>' +
          '</div>' +
          '<div class="progress-track" role="progressbar" aria-label="ความคืบหน้าหมวด' +
          escapeHtml(ag.shortName || ag.name) +
          '" aria-valuenow="' +
          agPct +
          '" aria-valuemin="0" aria-valuemax="100">' +
          '<div class="progress-fill is-accent" style="width: ' +
          agPct +
          '%"></div>' +
          '</div>' +
          '<div class="text-xs text-muted flex justify-between">' +
          '<span>สำเร็จแล้ว ' +
          agPct +
          '%</span>' +
          (agLessons[0]
            ? '<a href="#lesson/' + escapeHtml(agLessons[0].id) + '" class="font-semibold">ไปยังบทเรียน →</a>'
            : '') +
          '</div>' +
          '</div>'
        );
      })
      .join('');

    // Dynamic agency lesson directory sections
    var agencySectionsHtml = agencies
      .map(function (ag) {
        var agLessons = typeof registry.getAgencyLessons === 'function' ? registry.getAgencyLessons(ag.id) : ag.lessons || [];
        var cardsHtml = agLessons
          .map(function (lesson) {
            return renderLessonCard(lesson, stateApi);
          })
          .join('');

        return (
          '<section class="space-y-4" aria-labelledby="dir-agency-' +
          escapeHtml(ag.id) +
          '">' +
          '<div class="flex flex-wrap items-center justify-between gap-2">' +
          '<div>' +
          '<h2 id="dir-agency-' +
          escapeHtml(ag.id) +
          '" class="flex items-center gap-2">' +
          '<i class="fa-solid fa-landmark text-accent-token" aria-hidden="true"></i>' +
          '<span>หมวดเฉพาะทาง: ' +
          escapeHtml(ag.name) +
          '</span>' +
          '</h2>' +
          '<p class="text-sm text-muted">' +
          escapeHtml(ag.description || '') +
          '</p>' +
          '</div>' +
          '<span class="badge-pill badge-accent">' +
          agLessons.length +
          ' บทเรียน</span>' +
          '</div>' +
          '<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">' +
          cardsHtml +
          '</div>' +
          '</section>'
        );
      })
      .join('');

    var coreCardsHtml = coreLessons
      .map(function (lesson) {
        return renderLessonCard(lesson, stateApi);
      })
      .join('');

    var primaryCtaLabel = allCompleted
      ? 'ทบทวนบทเรียนทั้งหมดอีกครั้ง'
      : coreDone === 0 && (!stateApi || stateApi.getState().completedLessons.length === 0)
      ? 'เริ่มเรียนบทที่ 1 ทันที'
      : 'เรียนต่อ: ' + (nextLesson ? nextLesson.shortTitle || nextLesson.title : 'บทเรียนถัดไป');

    containerEl.innerHTML =
      '<div class="space-y-8">' +
      // Hero Banner
      '<section class="hero-card cadastral-grid" aria-labelledby="dash-hero-title">' +
      '<div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">' +
      '<div class="lg:col-span-6 space-y-4">' +
      '<div class="flex flex-wrap items-center gap-2">' +
      '<span class="badge-pill badge-primary"><i class="fa-solid fa-compass-drafting" aria-hidden="true"></i> หลักสูตรเตรียมสอบข้าราชการ IT</span>' +
      '<span class="badge-pill badge-accent">กรมที่ดิน • นักวิชาการคอมพิวเตอร์</span>' +
      '</div>' +
      '<h1 id="dash-hero-title">ติวสอบนักวิชาการคอมพิวเตอร์ปฏิบัติการ แบบเข้าใจง่าย ใช้งานได้จริง</h1>' +
      '<p class="text-muted">' +
      'ปูพื้นฐานวิทยาการคอมพิวเตอร์ 5 บทหลัก เจาะลึกกฎหมายที่ดิน เอกสารสิทธิ์ และ GIS กรมที่ดิน 3 บท พร้อมคู่มือเจาะลึก Diagram &amp; คำสั่ง SQL สำหรับข้อเขียน ลานซ้อม SQL จริง แฟลชการ์ด 45 ใบ และข้อสอบจำลอง 50 ข้อ' +
      '</p>' +
      '<div class="flex flex-wrap gap-3 pt-1">' +
      (nextLesson
        ? '<a href="#lesson/' +
          escapeHtml(nextLesson.id) +
          '" class="btn btn-primary btn-lg">' +
          '<i class="fa-solid fa-play" aria-hidden="true"></i> ' +
          escapeHtml(primaryCtaLabel) +
          '</a>'
        : '') +
      '<a href="#diagrams-lab" class="btn btn-secondary">' +
      '<i class="fa-solid fa-diagram-project" aria-hidden="true"></i> คู่มือ Diagram ข้อเขียน' +
      '</a>' +
      '<a href="#sql-guide" class="btn btn-secondary">' +
      '<i class="fa-solid fa-terminal" aria-hidden="true"></i> คู่มือคำสั่ง SQL' +
      '</a>' +
      '<a href="#mock-exam" class="btn btn-accent">' +
      '<i class="fa-solid fa-stopwatch" aria-hidden="true"></i> ข้อสอบจำลอง 50 ข้อ' +
      '</a>' +
      '</div>' +
      '</div>' +
      '<div class="lg:col-span-6">' +
      '<figure class="visual-figure">' +
      '<div class="visual-figure-media">' +
      '<img src="assets/images/hero-banner.png" width="1200" height="600" style="aspect-ratio: 2 / 1;" alt="ภาพประกอบแพลตฟอร์ม Gov IT Prep เชื่อมโยงระบบฐานข้อมูล แผนที่แปลงที่ดิน และเทคโนโลยีสารสนเทศกรมที่ดิน">' +
      '</div>' +
      '</figure>' +
      '</div>' +
      '</div>' +
      '</section>' +
      // Separated Progress Cards
      '<section class="space-y-4" aria-labelledby="dash-progress-heading">' +
      '<h2 id="dash-progress-heading" class="flex items-center gap-2">' +
      '<i class="fa-solid fa-chart-line text-primary-token" aria-hidden="true"></i>' +
      '<span>สรุปความก้าวหน้าการเตรียมสอบ</span>' +
      '</h2>' +
      '<div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">' +
      // (a) Core IT Progress
      '<div class="card flex flex-col gap-3">' +
      '<div class="flex items-center justify-between gap-2">' +
      '<span class="badge-pill badge-primary"><i class="fa-solid fa-microchip" aria-hidden="true"></i> วิชาการคอมพิวเตอร์</span>' +
      '<span class="font-mono text-sm font-semibold">' +
      coreDone +
      ' / ' +
      coreTotal +
      ' บท</span>' +
      '</div>' +
      '<div>' +
      '<h3 class="text-base font-semibold">หมวดวิชาการคอมพิวเตอร์ (Core IT)</h3>' +
      '<p class="text-sm text-muted">Hardware/OS, Database/SQL, SAD, Network/PDPA และ Logic</p>' +
      '</div>' +
      '<div class="progress-track" role="progressbar" aria-label="ความคืบหน้าหมวดวิชาการคอมพิวเตอร์" aria-valuenow="' +
      corePct +
      '" aria-valuemin="0" aria-valuemax="100">' +
      '<div class="progress-fill" style="width: ' +
      corePct +
      '%"></div>' +
      '</div>' +
      '<div class="text-xs text-muted flex justify-between">' +
      '<span>สำเร็จแล้ว ' +
      corePct +
      '%</span>' +
      (coreLessons[0]
        ? '<a href="#lesson/' + escapeHtml(coreLessons[0].id) + '" class="font-semibold">ไปยังบทที่ 1 →</a>'
        : '') +
      '</div>' +
      '</div>' +
      // (b) Dynamic Agency Progress Cards
      agencyProgressCardsHtml +
      // (c1) Flashcards Progress
      '<div class="card flex flex-col gap-3">' +
      '<div class="flex items-center justify-between gap-2">' +
      '<span class="badge-pill badge-primary"><i class="fa-solid fa-clone" aria-hidden="true"></i> Flashcards</span>' +
      '<span class="font-mono text-sm font-semibold">' +
      fcCounts.known +
      ' / ' +
      fcTotal +
      ' ใบ</span>' +
      '</div>' +
      '<div>' +
      '<h3 class="text-base font-semibold">ความก้าวหน้า Flashcards</h3>' +
      '<p class="text-sm text-muted">จำได้แล้ว ' +
      fcCounts.known +
      ' ใบ • ต้องทบทวน ' +
      fcCounts.review +
      ' ใบ</p>' +
      '</div>' +
      '<div class="progress-track" role="progressbar" aria-label="ความก้าวหน้าแฟลชการ์ด" aria-valuenow="' +
      fcPct +
      '" aria-valuemin="0" aria-valuemax="100">' +
      '<div class="progress-fill" style="width: ' +
      fcPct +
      '%"></div>' +
      '</div>' +
      '<div class="text-xs text-muted flex justify-between">' +
      '<span>จำได้ ' +
      fcPct +
      '%</span>' +
      '<a href="#flashcards" class="font-semibold">เปิดทบทวน →</a>' +
      '</div>' +
      '</div>' +
      // (c2) Mock Exam Best Score
      '<div class="card flex flex-col gap-3">' +
      '<div class="flex items-center justify-between gap-2">' +
      '<span class="badge-pill ' +
      (bestMock && mockPct >= 60 ? 'badge-success' : 'badge-accent') +
      '"><i class="fa-solid fa-file-pen" aria-hidden="true"></i> ข้อสอบจำลอง</span>' +
      '<span class="font-mono text-sm font-semibold">' +
      (bestMock ? bestMock.score + ' / ' + (bestMock.total || mockTotal) : '0 / ' + mockTotal) +
      '</span>' +
      '</div>' +
      '<div>' +
      '<h3 class="text-base font-semibold">คะแนนสูงสุดข้อสอบจำลอง</h3>' +
      '<p class="text-sm text-muted">' +
      (bestMock
        ? 'สถิติสูงสุด ' + bestMock.score + ' คะแนน (' + mockPct + '%) จาก ' + stateApi.getMockHistory().length + ' ครั้ง'
        : 'ยังไม่มีประวัติการทำข้อสอบจำลอง (เกณฑ์ผ่าน 60%)') +
      '</p>' +
      '</div>' +
      '<div class="progress-track" role="progressbar" aria-label="คะแนนสูงสุดข้อสอบจำลอง" aria-valuenow="' +
      mockPct +
      '" aria-valuemin="0" aria-valuemax="100">' +
      '<div class="progress-fill ' +
      (mockPct >= 60 ? '' : 'is-accent') +
      '" style="width: ' +
      mockPct +
      '%"></div>' +
      '</div>' +
      '<div class="text-xs text-muted flex justify-between">' +
      '<span>' +
      (bestMock ? 'คิดเป็น ' + mockPct + '%' : 'พร้อมทดสอบเวลา 60 นาที') +
      '</span>' +
      '<a href="#mock-exam" class="font-semibold">เข้าห้องสอบ →</a>' +
      '</div>' +
      '</div>' +
      '</div>' +
      '</section>' +
      // Core IT Module Directory
      '<section class="space-y-4" aria-labelledby="dir-core-heading">' +
      '<div class="flex flex-wrap items-center justify-between gap-2">' +
      '<div>' +
      '<h2 id="dir-core-heading" class="flex items-center gap-2">' +
      '<i class="fa-solid fa-laptop-code text-primary-token" aria-hidden="true"></i>' +
      '<span>หมวดวิชาการคอมพิวเตอร์ (Core IT)</span>' +
      '</h2>' +
      '<p class="text-sm text-muted">ปูพื้นฐาน 5 เสาหลักที่ออกสอบตำแหน่งนักวิชาการคอมพิวเตอร์ปฏิบัติการทุกสนาม</p>' +
      '</div>' +
      '<span class="badge-pill badge-primary">' +
      coreLessons.length +
      ' บทเรียน</span>' +
      '</div>' +
      '<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">' +
      coreCardsHtml +
      '</div>' +
      '</section>' +
      // Agency Module Directories (Dynamic)
      agencySectionsHtml +
      // Practice Tools Directory
      '<section class="space-y-4" aria-labelledby="dir-tools-heading">' +
      '<h2 id="dir-tools-heading" class="flex items-center gap-2">' +
      '<i class="fa-solid fa-toolbox text-primary-token" aria-hidden="true"></i>' +
      '<span>เครื่องมือฝึกปฏิบัติและคู่มือใช้งาน</span>' +
      '</h2>' +
      '<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">' +
      '<a href="#diagrams-lab" class="module-card no-underline text-inherit">' +
      '<span class="badge-pill badge-accent self-start"><i class="fa-solid fa-diagram-project" aria-hidden="true"></i> ' +
      diagramCatCount +
      ' หมวด • ' +
      diagramExamCount +
      ' โจทย์ข้อเขียน</span>' +
      '<h3 class="text-base font-semibold">คู่มือ Diagram &amp; ออกแบบระบบ</h3>' +
      '<p class="text-sm text-muted">เจาะลึก Flowchart, DFD, ERD &amp; 3NF, Use Case, Sequence/Class และสถาปัตยกรรมระบบ พร้อมวิธีเขียนสอบ</p>' +
      '</a>' +
      '<a href="#sql-guide" class="module-card no-underline text-inherit">' +
      '<span class="badge-pill badge-accent self-start"><i class="fa-solid fa-terminal" aria-hidden="true"></i> ' +
      sqlChapterCount +
      ' บท • ' +
      sqlExamCount +
      ' โจทย์ข้อเขียน</span>' +
      '<h3 class="text-base font-semibold">คู่มือคำสั่ง SQL ครบชุด</h3>' +
      '<p class="text-sm text-muted">สรุปไวยากรณ์ตั้งแต่ Data Types, DDL/DML, SELECT, WHERE, GROUP BY, JOIN ถึง Subquery พร้อมรันจริง</p>' +
      '</a>' +
      '<a href="#flashcards" class="module-card no-underline text-inherit">' +
      '<span class="badge-pill badge-primary self-start"><i class="fa-solid fa-clone" aria-hidden="true"></i> ' +
      fcTotal +
      ' ใบ</span>' +
      '<h3 class="text-base font-semibold">แฟลชการ์ด 45 ใบ</h3>' +
      '<p class="text-sm text-muted">พลิกการ์ด 3 มิติท่อง Port, คำย่อ IT/พ.ร.บ.คอมฯ, เอกสารสิทธิ์ และ GIS</p>' +
      '</a>' +
      '<a href="#sql-sandbox" class="module-card no-underline text-inherit">' +
      '<span class="badge-pill badge-primary self-start"><i class="fa-solid fa-database" aria-hidden="true"></i> 10 โจทย์</span>' +
      '<h3 class="text-base font-semibold">ลานซ้อม SQL กรมที่ดิน</h3>' +
      '<p class="text-sm text-muted">เขียนคำสั่ง SQL จริงบนฐานข้อมูลจำลอง 4 ตาราง พร้อมตรวจคำตอบทันที</p>' +
      '</a>' +
      '<a href="#mock-exam" class="module-card no-underline text-inherit">' +
      '<span class="badge-pill badge-accent self-start"><i class="fa-solid fa-stopwatch" aria-hidden="true"></i> ' +
      mockTotal +
      ' ข้อ • 60 นาที</span>' +
      '<h3 class="text-base font-semibold">ข้อสอบจำลอง 50 ข้อ</h3>' +
      '<p class="text-sm text-muted">จำลองสอบจับเวลาหรือโหมดฝึกทำ พร้อมวิเคราะห์จุดอ่อนแยกตามหัวข้อ</p>' +
      '</a>' +
      '<a href="#guide" class="module-card no-underline text-inherit">' +
      '<span class="badge-pill self-start"><i class="fa-solid fa-book-bookmark" aria-hidden="true"></i> Guide</span>' +
      '<h3 class="text-base font-semibold">คู่มือ GitHub Pages &amp; ขยายกรม</h3>' +
      '<p class="text-sm text-muted">วิธีอัปโหลดเว็บขึ้น GitHub Pages ฟรี และการเพิ่มโมดูลกรมอื่นในอนาคต</p>' +
      '</a>' +
      '</div>' +
      '</section>' +
      '</div>';
  }

  global.GOV_PREP = global.GOV_PREP || {};
  global.GOV_PREP.views = global.GOV_PREP.views || {};
  global.GOV_PREP.views.dashboard = {
    render: render
  };
})(window);
