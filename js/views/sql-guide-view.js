/**
 * SQL Guide View: Beginner-friendly Thai SQL Command Reference & Written Exam Workshop.
 * Covers Execution Order, 4 DOL Table Schemas, 8 SQL Chapters (Basics to Subquery/CASE),
 * and 6 Written Exam Scenarios with collapsible solutions, Copy, and SQL Sandbox launch.
 */
(function (global) {
  'use strict';

  var root = global || (typeof window !== 'undefined' ? window : globalThis);

  var TABS = [
    { id: 'all', label: 'ทั้งหมด' },
    { id: 'basics', label: 'พื้นฐาน & Types' },
    { id: 'ddl', label: 'DDL (สร้างตาราง)' },
    { id: 'dml', label: 'DML (เพิ่ม/แก้/ลบ)' },
    { id: 'dql-basic', label: 'SELECT พื้นฐาน' },
    { id: 'where-filters', label: 'WHERE ครบชุด' },
    { id: 'aggregate-groupby', label: 'GROUP BY & HAVING' },
    { id: 'joins', label: 'JOIN หลายตาราง' },
    { id: 'advanced-subquery', label: 'Subquery & CASE' },
    { id: 'written-exams', label: 'ฝึกทำข้อเขียน (6 ข้อ)' }
  ];

  var localState = {
    activeTab: 'all',
    activeSchemaTable: 'land_offices'
  };

  function escapeHtml(str) {
    return String(str == null ? '' : str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function announce(msg) {
    if (root.GOV_PREP && root.GOV_PREP.app && typeof root.GOV_PREP.app.announce === 'function') {
      root.GOV_PREP.app.announce(msg);
      return;
    }
    if (typeof document !== 'undefined') {
      var live = document.getElementById('live-announcer');
      if (live) live.textContent = msg;
    }
  }

  function copySql(text, btnEl) {
    if (root.GOV_PREP && root.GOV_PREP.app && typeof root.GOV_PREP.app.copyToClipboard === 'function') {
      root.GOV_PREP.app.copyToClipboard(text, btnEl);
      return;
    }
    if (typeof navigator !== 'undefined' && navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
      navigator.clipboard.writeText(String(text || '')).catch(function () {});
    }
  }

  function openInSandbox(sql) {
    if (root.GOV_PREP && root.GOV_PREP.app && typeof root.GOV_PREP.app.openSqlWithQuery === 'function') {
      root.GOV_PREP.app.openSqlWithQuery(sql);
      return;
    }
    if (root.location) {
      root.location.hash = '#sql-sandbox';
    }
  }

  function renderCheatSheet(guide, sqlStore) {
    var checklist = Array.isArray(guide.introChecklist) ? guide.introChecklist : [];
    var execOrder = Array.isArray(guide.executionOrder) ? guide.executionOrder : [];
    var tables = Array.isArray(guide.dolTables) ? guide.dolTables : [];

    var checklistHtml = checklist
      .map(function (item) {
        return (
          '<div class="card-muted space-y-1.5">' +
          '<span class="badge-pill badge-primary font-mono">STEP ' +
          escapeHtml(item.step) +
          '</span>' +
          '<div class="font-heading font-semibold text-sm">' +
          escapeHtml(item.title) +
          '</div>' +
          '<p class="text-sm text-muted">' +
          escapeHtml(item.detail) +
          '</p>' +
          '</div>'
        );
      })
      .join('');

    var execRowsHtml = execOrder
      .map(function (stepObj) {
        return (
          '<tr>' +
          '<th scope="row" class="font-mono">' +
          escapeHtml(stepObj.step) +
          '. ' +
          escapeHtml(stepObj.clause) +
          '</th>' +
          '<td>' +
          escapeHtml(stepObj.role) +
          '</td>' +
          '<td class="text-muted">' +
          escapeHtml(stepObj.rule) +
          '</td>' +
          '</tr>'
        );
      })
      .join('');

    var activeTable = tables[0] || null;
    for (var i = 0; i < tables.length; i += 1) {
      if (tables[i].tableName === localState.activeSchemaTable) {
        activeTable = tables[i];
        break;
      }
    }

    var schemaTabsHtml = tables
      .map(function (tbl) {
        var isActive = activeTable && activeTable.tableName === tbl.tableName;
        return (
          '<button type="button" class="tab-btn' +
          (isActive ? ' is-active' : '') +
          '" data-sqlg-schema="' +
          escapeHtml(tbl.tableName) +
          '" aria-pressed="' +
          (isActive ? 'true' : 'false') +
          '">' +
          '<span class="font-mono">' +
          escapeHtml(tbl.tableName) +
          '</span>' +
          '</button>'
        );
      })
      .join('');

    var activeSchemaHtml = '';
    if (activeTable) {
      var sampleId = 'schema-' + activeTable.tableName;
      sqlStore[sampleId] = activeTable.sampleSql;

      var colRows = (activeTable.columns || [])
        .map(function (col) {
          var keyBadge = col.key
            ? '<span class="badge-pill ' +
              (col.key === 'PK' ? 'badge-primary' : 'badge-accent') +
              ' font-mono">' +
              escapeHtml(col.key) +
              '</span>'
            : '<span class="text-muted">-</span>';
          return (
            '<tr>' +
            '<th scope="row" class="font-mono">' +
            escapeHtml(col.name) +
            '</th>' +
            '<td><code>' +
            escapeHtml(col.type) +
            '</code></td>' +
            '<td>' +
            keyBadge +
            '</td>' +
            '<td>' +
            escapeHtml(col.desc) +
            '</td>' +
            '</tr>'
          );
        })
        .join('');

      activeSchemaHtml =
        '<div class="card-muted space-y-3">' +
        '<div class="flex flex-wrap items-center justify-between gap-2">' +
        '<div>' +
        '<div class="font-heading font-semibold text-base">' +
        '<span class="font-mono text-primary-token">' +
        escapeHtml(activeTable.tableName) +
        '</span> — ' +
        escapeHtml(activeTable.thaiName) +
        '</div>' +
        '<div class="text-xs text-muted">PK: <code>' +
        escapeHtml(activeTable.pk) +
        '</code> • FK: <code>' +
        escapeHtml(activeTable.fk) +
        '</code></div>' +
        '</div>' +
        '<div class="flex flex-wrap gap-2">' +
        '<button type="button" class="btn btn-secondary btn-sm" data-sqlg-copy-id="' +
        escapeHtml(sampleId) +
        '">' +
        '<i class="fa-regular fa-copy" aria-hidden="true"></i> คัดลอก' +
        '</button>' +
        '<button type="button" class="btn btn-primary btn-sm" data-sqlg-run-id="' +
        escapeHtml(sampleId) +
        '">' +
        '<i class="fa-solid fa-play" aria-hidden="true"></i> ลองรันใน SQL Sandbox' +
        '</button>' +
        '</div>' +
        '</div>' +
        '<div class="table-wrap">' +
        '<table class="data-table">' +
        '<caption>โครงสร้างคอลัมน์ของตาราง ' +
        escapeHtml(activeTable.tableName) +
        '</caption>' +
        '<thead><tr>' +
        '<th scope="col">ชื่อคอลัมน์</th>' +
        '<th scope="col">ชนิดข้อมูล</th>' +
        '<th scope="col">คีย์</th>' +
        '<th scope="col">ความหมาย</th>' +
        '</tr></thead>' +
        '<tbody>' +
        colRows +
        '</tbody>' +
        '</table>' +
        '</div>' +
        '</div>';
    }

    return (
      '<section class="card card-lg space-y-6" aria-labelledby="sqlg-cheatsheet-heading">' +
      '<div class="flex flex-wrap items-center justify-between gap-2">' +
      '<h2 id="sqlg-cheatsheet-heading" class="flex items-center gap-2">' +
      '<i class="fa-solid fa-compass text-primary-token" aria-hidden="true"></i>' +
      '<span>Cheat-Sheet ก่อนเริ่ม: เช็กลิสต์, ลำดับ SQL 7 ขั้น และ 4 ตารางกรมที่ดิน</span>' +
      '</h2>' +
      '<span class="badge-pill badge-primary">อ่านจบพร้อมเขียนข้อสอบ</span>' +
      '</div>' +
      '<div class="space-y-3">' +
      '<h3>1. เช็กลิสต์มือใหม่ 4 ข้อก่อนเขียน SQL ลงกระดาษคำตอบ</h3>' +
      '<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">' +
      checklistHtml +
      '</div>' +
      '</div>' +
      '<div class="space-y-3">' +
      '<h3>2. ลำดับการทำงานจริงของ SQL 7 ขั้น (Execution Order)</h3>' +
      '<p class="text-sm text-muted">แม้ตอนพิมพ์เราจะขึ้นต้นด้วย <code>SELECT</code> แต่ฐานข้อมูลประมวลผลตามลำดับ 1 → 7 ด้านล่างนี้ จึงห้ามนำ Alias ที่ตั้งใน <code>SELECT</code> ไปใช้ใน <code>WHERE</code></p>' +
      '<div class="table-wrap">' +
      '<table class="data-table">' +
      '<caption>ลำดับการประมวลผลคำสั่ง SQL ทั้ง 7 ขั้นตอน</caption>' +
      '<thead><tr>' +
      '<th scope="col">ลำดับ &amp; คำสั่ง</th>' +
      '<th scope="col">หน้าที่การทำงาน</th>' +
      '<th scope="col">กฎสำคัญในห้องสอบ</th>' +
      '</tr></thead>' +
      '<tbody>' +
      execRowsHtml +
      '</tbody>' +
      '</table>' +
      '</div>' +
      '</div>' +
      '<div class="space-y-3">' +
      '<h3>3. โครงสร้าง 4 ตารางจำลองกรมที่ดิน (ใช้รันจริงได้ทุกตัวอย่าง)</h3>' +
      '<div class="tab-group" role="group" aria-label="เลือกดูโครงสร้างตารางกรมที่ดิน">' +
      schemaTabsHtml +
      '</div>' +
      activeSchemaHtml +
      '</div>' +
      '</section>'
    );
  }

  function renderComparisonTable(tableObj) {
    if (!tableObj || !Array.isArray(tableObj.headers) || !Array.isArray(tableObj.rows)) return '';
    var headerHtml = tableObj.headers
      .map(function (h) {
        return '<th scope="col">' + escapeHtml(h) + '</th>';
      })
      .join('');

    var rowsHtml = tableObj.rows
      .map(function (row) {
        var cells = row
          .map(function (cell, idx) {
            if (idx === 0) {
              return '<th scope="row" class="font-mono">' + escapeHtml(cell) + '</th>';
            }
            return '<td>' + escapeHtml(cell) + '</td>';
          })
          .join('');
        return '<tr>' + cells + '</tr>';
      })
      .join('');

    return (
      '<div class="space-y-2">' +
      '<h3>' +
      escapeHtml(tableObj.caption || 'ตารางสรุปเปรียบเทียบ') +
      '</h3>' +
      '<div class="table-wrap">' +
      '<table class="data-table">' +
      '<caption>' +
      escapeHtml(tableObj.caption || 'ตารางสรุปเปรียบเทียบ') +
      '</caption>' +
      '<thead><tr>' +
      headerHtml +
      '</tr></thead>' +
      '<tbody>' +
      rowsHtml +
      '</tbody>' +
      '</table>' +
      '</div>' +
      '</div>'
    );
  }

  function renderChapterItem(item, sqlStore) {
    var syntaxId = item.id + '-syntax';
    var exampleId = item.id + '-example';
    var runId = item.id + '-run';

    sqlStore[syntaxId] = item.syntaxTemplate || '';
    sqlStore[exampleId] = item.dolExampleSql || '';
    if (item.runnableSql) {
      sqlStore[runId] = item.runnableSql;
    }

    var pitfallsHtml = (item.examPitfalls || [])
      .map(function (pitfall) {
        return '<li>' + escapeHtml(pitfall) + '</li>';
      })
      .join('');

    var runButtonHtml = item.runnableSql
      ? '<button type="button" class="btn btn-primary btn-sm" data-sqlg-run-id="' +
        escapeHtml(runId) +
        '">' +
        '<i class="fa-solid fa-play" aria-hidden="true"></i> ' +
        escapeHtml(item.runnableLabel || 'ลองรันใน SQL Sandbox') +
        '</button>'
      : '';

    return (
      '<article class="card space-y-4" id="sqlg-item-' +
      escapeHtml(item.id) +
      '">' +
      '<div class="flex flex-wrap items-center justify-between gap-2">' +
      '<h3>' +
      escapeHtml(item.title) +
      '</h3>' +
      '<span class="badge-pill badge-primary font-mono">' +
      escapeHtml(item.commandName) +
      '</span>' +
      '</div>' +
      '<div class="space-y-1.5">' +
      '<h4 class="text-sm font-semibold text-primary-token">คำสั่งนี้คืออะไร / ใช้เมื่อไร?</h4>' +
      '<p class="prose-content text-sm sm:text-base">' +
      escapeHtml(item.whatAndWhen) +
      '</p>' +
      '</div>' +
      '<div class="space-y-2">' +
      '<div class="flex flex-wrap items-center justify-between gap-2">' +
      '<h4 class="text-sm font-semibold text-primary-token">ไวยากรณ์มาตรฐาน (Syntax Template)</h4>' +
      '<button type="button" class="btn btn-secondary btn-sm" data-sqlg-copy-id="' +
      escapeHtml(syntaxId) +
      '">' +
      '<i class="fa-regular fa-copy" aria-hidden="true"></i> คัดลอก' +
      '</button>' +
      '</div>' +
      '<pre tabindex="0"><code>' +
      escapeHtml(item.syntaxTemplate) +
      '</code></pre>' +
      '</div>' +
      '<div class="space-y-2">' +
      '<div class="flex flex-wrap items-center justify-between gap-2">' +
      '<h4 class="text-sm font-semibold text-primary-token">' +
      escapeHtml(item.dolExampleTitle || 'ตัวอย่างจริงกับตารางกรมที่ดิน') +
      '</h4>' +
      '<div class="flex flex-wrap gap-2">' +
      '<button type="button" class="btn btn-secondary btn-sm" data-sqlg-copy-id="' +
      escapeHtml(exampleId) +
      '">' +
      '<i class="fa-regular fa-copy" aria-hidden="true"></i> คัดลอก' +
      '</button>' +
      runButtonHtml +
      '</div>' +
      '</div>' +
      '<pre tabindex="0"><code>' +
      escapeHtml(item.dolExampleSql) +
      '</code></pre>' +
      (item.dolExampleNote
        ? '<div class="callout callout-info text-sm">' +
          '<div class="callout-title"><i class="fa-solid fa-circle-info" aria-hidden="true"></i> <span>อธิบายผลลัพธ์จากตัวอย่าง</span></div>' +
          '<p>' +
          escapeHtml(item.dolExampleNote) +
          '</p>' +
          '</div>'
        : '') +
      '</div>' +
      (pitfallsHtml
        ? '<div class="callout callout-warn space-y-1.5">' +
          '<h4 class="callout-title text-sm"><i class="fa-solid fa-triangle-exclamation" aria-hidden="true"></i> <span>ข้อผิดพลาดที่โดนหักคะแนนตอนเขียนด้วยมือ</span></h4>' +
          '<ul class="list-disc pl-5 space-y-1 text-sm">' +
          pitfallsHtml +
          '</ul>' +
          '</div>'
        : '') +
      '</article>'
    );
  }

  function renderChapter(chapter, sqlStore) {
    var itemsHtml = (chapter.items || [])
      .map(function (item) {
        return renderChapterItem(item, sqlStore);
      })
      .join('');

    return (
      '<section class="space-y-5" id="sqlg-chapter-' +
      escapeHtml(chapter.id) +
      '" aria-labelledby="sqlg-heading-' +
      escapeHtml(chapter.id) +
      '">' +
      '<div class="card card-lg space-y-4">' +
      '<div class="flex flex-wrap items-center justify-between gap-2">' +
      '<span class="badge-pill badge-primary"><i class="fa-solid fa-book-open" aria-hidden="true"></i> บทที่ ' +
      escapeHtml(chapter.order) +
      '</span>' +
      '<span class="badge-pill badge-accent">' +
      escapeHtml(chapter.badge || chapter.tabLabel) +
      '</span>' +
      '</div>' +
      '<h2 id="sqlg-heading-' +
      escapeHtml(chapter.id) +
      '">' +
      escapeHtml(chapter.title) +
      '</h2>' +
      '<p class="text-muted prose-content">' +
      escapeHtml(chapter.summary) +
      '</p>' +
      renderComparisonTable(chapter.comparisonTable) +
      '</div>' +
      '<div class="space-y-4">' +
      itemsHtml +
      '</div>' +
      '</section>'
    );
  }

  function renderWrittenExams(exams, sqlStore) {
    var examCardsHtml = exams
      .map(function (ex) {
        var solId = ex.id + '-solution';
        sqlStore[solId] = ex.solutionSql || '';

        var stepsHtml = (ex.thinkingSteps || [])
          .map(function (st) {
            return '<li>' + escapeHtml(st) + '</li>';
          })
          .join('');

        var expHtml = (ex.lineByLineExplanation || [])
          .map(function (line) {
            return '<li>' + escapeHtml(line) + '</li>';
          })
          .join('');

        var mistakesHtml = (ex.commonMistakes || [])
          .map(function (m) {
            return '<li>' + escapeHtml(m) + '</li>';
          })
          .join('');

        return (
          '<article class="card card-lg space-y-4" id="sqlg-' +
          escapeHtml(ex.id) +
          '">' +
          '<div class="flex flex-wrap items-center justify-between gap-2">' +
          '<div class="flex flex-wrap items-center gap-2">' +
          '<span class="badge-pill badge-accent font-mono">ข้อที่ ' +
          escapeHtml(ex.order) +
          '</span>' +
          '<span class="badge-pill badge-primary">' +
          escapeHtml(ex.level) +
          '</span>' +
          '</div>' +
          (ex.canRunInSandbox
            ? '<span class="badge-pill badge-success"><i class="fa-solid fa-play" aria-hidden="true"></i> รันตรวจผลใน SQL Sandbox ได้</span>'
            : '<span class="badge-pill"><i class="fa-solid fa-pen-to-square" aria-hidden="true"></i> ข้อเขียนโครงสร้าง/แก้ไขข้อมูล</span>') +
          '</div>' +
          '<h3>' +
          escapeHtml(ex.title) +
          '</h3>' +
          '<div class="card-muted space-y-2">' +
          '<h4 class="text-sm font-semibold text-primary-token">โจทย์ข้อเขียน</h4>' +
          '<p class="prose-content text-sm sm:text-base">' +
          escapeHtml(ex.promptText) +
          '</p>' +
          '</div>' +
          '<details class="hint-details">' +
          '<summary><i class="fa-solid fa-lightbulb" aria-hidden="true"></i> ดูแนวทางแกะโจทย์ทีละขั้น (4 Steps)</summary>' +
          '<div class="space-y-2 pt-1">' +
          '<h4 class="text-sm font-semibold">ขั้นตอนคิดก่อนลงมือเขียน</h4>' +
          '<ol class="list-decimal pl-5 space-y-1.5 text-sm">' +
          stepsHtml +
          '</ol>' +
          '</div>' +
          '</details>' +
          '<details class="hint-details">' +
          '<summary><i class="fa-solid fa-code" aria-hidden="true"></i> เปิดดูเฉลยคำสั่ง SQL, คำอธิบายทีละบรรทัด และจุดโดนหักคะแนน</summary>' +
          '<div class="space-y-4 pt-2">' +
          '<div class="flex flex-wrap items-center justify-between gap-2">' +
          '<h4 class="text-sm font-semibold text-primary-token">เฉลยคำสั่ง SQL มาตรฐาน</h4>' +
          '<div class="flex flex-wrap gap-2">' +
          '<button type="button" class="btn btn-secondary btn-sm" data-sqlg-copy-id="' +
          escapeHtml(solId) +
          '">' +
          '<i class="fa-regular fa-copy" aria-hidden="true"></i> คัดลอก' +
          '</button>' +
          (ex.canRunInSandbox
            ? '<button type="button" class="btn btn-primary btn-sm" data-sqlg-run-id="' +
              escapeHtml(solId) +
              '">' +
              '<i class="fa-solid fa-play" aria-hidden="true"></i> ลองรันใน SQL Sandbox' +
              '</button>'
            : '') +
          '</div>' +
          '</div>' +
          '<pre tabindex="0"><code>' +
          escapeHtml(ex.solutionSql) +
          '</code></pre>' +
          '<div class="space-y-1.5">' +
          '<h4 class="text-sm font-semibold">คำอธิบายทีละบรรทัด</h4>' +
          '<ul class="list-disc pl-5 space-y-1 text-sm">' +
          expHtml +
          '</ul>' +
          '</div>' +
          '<div class="callout callout-warn space-y-1.5">' +
          '<h4 class="callout-title text-sm"><i class="fa-solid fa-triangle-exclamation" aria-hidden="true"></i> <span>จุดโดนหักคะแนนในห้องสอบ</span></h4>' +
          '<ul class="list-disc pl-5 space-y-1 text-sm">' +
          mistakesHtml +
          '</ul>' +
          '</div>' +
          '</div>' +
          '</details>' +
          '</article>'
        );
      })
      .join('');

    return (
      '<section class="space-y-5" id="sqlg-written-exams" aria-labelledby="sqlg-exams-heading">' +
      '<div class="card card-lg space-y-3">' +
      '<div class="flex flex-wrap items-center justify-between gap-2">' +
      '<h2 id="sqlg-exams-heading" class="flex items-center gap-2">' +
      '<i class="fa-solid fa-pen-ruler text-accent-token" aria-hidden="true"></i>' +
      '<span>โจทย์ข้อเขียน SQL 6 ข้อ — ลองเขียนลงกระดาษก่อนกดดูเฉลย</span>' +
      '</h2>' +
      '<span class="badge-pill badge-accent">จำลองสอบข้อเขียนจริง</span>' +
      '</div>' +
      '<p class="text-muted prose-content">' +
      'ฝึกเขียนคำสั่งลงในกระดาษหรือสมุดทดโดยไม่ดูเฉลยก่อน (จับเวลาข้อละ 5-7 นาที) เมื่อเขียนเสร็จแล้วค่อยกดเปิดดูแนวคิด 4 ขั้น เฉลยทีละบรรทัด และลองนำข้อ SELECT ไปรันตรวจผลลัพธ์จริงใน SQL Sandbox' +
      '</p>' +
      '</div>' +
      '<div class="space-y-4">' +
      examCardsHtml +
      '</div>' +
      '</section>'
    );
  }

  function render(containerEl) {
    if (!containerEl) return;

    var registry = root.GOV_PREP || {};
    var guide = registry.sqlGuide;

    if (!guide || !Array.isArray(guide.chapters)) {
      containerEl.innerHTML =
        '<div class="card space-y-3">' +
        '<h1>คู่มือคำสั่ง SQL &amp; ข้อสอบข้อเขียน</h1>' +
        '<div class="callout callout-warn" role="alert">ไม่พบข้อมูลคู่มือคำสั่ง SQL (<code>GOV_PREP.sqlGuide</code>)</div>' +
        '</div>';
      return;
    }

    var chapters = guide.chapters || [];
    var writtenExams = Array.isArray(guide.writtenExams) ? guide.writtenExams : [];
    var sqlStore = {};

    var tabsHtml = TABS.map(function (tab) {
      var isActive = localState.activeTab === tab.id;
      return (
        '<button type="button" class="tab-btn' +
        (isActive ? ' is-active' : '') +
        '" data-sqlg-tab="' +
        escapeHtml(tab.id) +
        '" aria-pressed="' +
        (isActive ? 'true' : 'false') +
        '">' +
        escapeHtml(tab.label) +
        '</button>'
      );
    }).join('');

    var showChapters = chapters.filter(function (ch) {
      return localState.activeTab === 'all' || localState.activeTab === ch.id;
    });
    var showExams = localState.activeTab === 'all' || localState.activeTab === 'written-exams';

    var chaptersHtml = showChapters
      .map(function (ch) {
        return renderChapter(ch, sqlStore);
      })
      .join('');

    var examsHtml = showExams ? renderWrittenExams(writtenExams, sqlStore) : '';

    containerEl.innerHTML =
      '<div class="space-y-8" data-sql-guide-root>' +
      // Hero
      '<header class="hero-card cadastral-grid space-y-4">' +
      '<div class="flex flex-wrap items-center gap-2">' +
      '<span class="badge-pill badge-primary"><i class="fa-solid fa-terminal" aria-hidden="true"></i> SQL Zero-to-Written-Exam Guide</span>' +
      '<span class="badge-pill badge-accent">' +
      escapeHtml(chapters.length) +
      ' บทเรียน • ' +
      escapeHtml(writtenExams.length) +
      ' โจทย์ข้อเขียน</span>' +
      '</div>' +
      '<h1>' +
      escapeHtml(guide.title) +
      '</h1>' +
      '<p class="text-muted prose-content">' +
      escapeHtml(guide.subtitle) +
      '</p>' +
      '<div class="flex flex-wrap gap-3 pt-1">' +
      '<a href="#sql-sandbox" class="btn btn-primary">' +
      '<i class="fa-solid fa-database" aria-hidden="true"></i> เปิด SQL Sandbox เต็มจอ' +
      '</a>' +
      '<button type="button" class="btn btn-accent" data-sqlg-jump="written-exams">' +
      '<i class="fa-solid fa-pen-ruler" aria-hidden="true"></i> ฝึกทำโจทย์ข้อเขียน 6 ข้อ' +
      '</button>' +
      '</div>' +
      '</header>' +
      // Cheat-Sheet
      renderCheatSheet(guide, sqlStore) +
      // Filter Bar
      '<section class="card space-y-3" id="sqlg-filter-bar" aria-labelledby="sqlg-filter-heading">' +
      '<div class="flex flex-wrap items-center justify-between gap-2">' +
      '<h2 id="sqlg-filter-heading" class="text-lg flex items-center gap-2">' +
      '<i class="fa-solid fa-filter text-primary-token" aria-hidden="true"></i>' +
      '<span>เลือกหมวดคำสั่ง SQL หรือชุดฝึกข้อเขียน</span>' +
      '</h2>' +
      '<span class="text-xs text-muted">กดปุ่ม "ลองรันใน SQL Sandbox" เพื่อยิงคำสั่งจริงได้ทุกตัวอย่าง</span>' +
      '</div>' +
      '<div class="tab-group" role="group" aria-label="กรองหัวข้อคู่มือ SQL">' +
      tabsHtml +
      '</div>' +
      '</section>' +
      // Content
      chaptersHtml +
      examsHtml +
      '</div>';

    bindEvents(containerEl, sqlStore);
  }

  function bindEvents(containerEl, sqlStore) {
    var viewRoot = containerEl.querySelector('[data-sql-guide-root]');
    if (!viewRoot) return;

    var tabBtns = viewRoot.querySelectorAll('[data-sqlg-tab]');
    for (var i = 0; i < tabBtns.length; i += 1) {
      tabBtns[i].addEventListener('click', function () {
        var nextTab = this.getAttribute('data-sqlg-tab');
        if (!nextTab || nextTab === localState.activeTab) return;
        localState.activeTab = nextTab;
        var label = this.textContent ? this.textContent.trim() : nextTab;
        announce('แสดงหมวด ' + label);
        render(containerEl);
      });
    }

    var jumpBtns = viewRoot.querySelectorAll('[data-sqlg-jump]');
    for (var j = 0; j < jumpBtns.length; j += 1) {
      jumpBtns[j].addEventListener('click', function () {
        var targetTab = this.getAttribute('data-sqlg-jump');
        if (targetTab) {
          localState.activeTab = targetTab;
          announce('ไปยังหมวดฝึกทำโจทย์ข้อเขียน 6 ข้อ');
          render(containerEl);
          var examSection = containerEl.querySelector('#sqlg-written-exams') || containerEl.querySelector('#sqlg-filter-bar');
          if (examSection && typeof examSection.scrollIntoView === 'function') {
            examSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }
      });
    }

    var schemaBtns = viewRoot.querySelectorAll('[data-sqlg-schema]');
    for (var s = 0; s < schemaBtns.length; s += 1) {
      schemaBtns[s].addEventListener('click', function () {
        var tbl = this.getAttribute('data-sqlg-schema');
        if (!tbl || tbl === localState.activeSchemaTable) return;
        localState.activeSchemaTable = tbl;
        render(containerEl);
      });
    }

    var copyBtns = viewRoot.querySelectorAll('[data-sqlg-copy-id]');
    for (var c = 0; c < copyBtns.length; c += 1) {
      copyBtns[c].addEventListener('click', function () {
        var key = this.getAttribute('data-sqlg-copy-id');
        var text = sqlStore[key] || '';
        if (text) {
          copySql(text, this);
        }
      });
    }

    var runBtns = viewRoot.querySelectorAll('[data-sqlg-run-id]');
    for (var r = 0; r < runBtns.length; r += 1) {
      runBtns[r].addEventListener('click', function () {
        var key = this.getAttribute('data-sqlg-run-id');
        var sql = sqlStore[key] || '';
        if (sql) {
          openInSandbox(sql);
        }
      });
    }
  }

  root.GOV_PREP = root.GOV_PREP || {};
  root.GOV_PREP.views = root.GOV_PREP.views || {};
  root.GOV_PREP.views.sqlGuide = {
    render: render
  };
})(typeof window !== 'undefined' ? window : globalThis);
