/**
 * Diagrams & System Design Studio View (#diagrams-lab).
 * Renders beginner-friendly diagram guides (Flowchart, DFD, ERD & 3NF, Use Case,
 * Sequence & Class, System Architecture) plus 6 interactive Written Exam practice cases
 * with collapsible hints, Mermaid solutions, copyable code/schemas, and self-check rubrics.
 */
(function (global) {
  'use strict';

  var TABS = [
    { id: 'all', label: 'ทั้งหมด' },
    { id: 'flowchart', label: 'Flowchart' },
    { id: 'dfd', label: 'DFD' },
    { id: 'erd', label: 'ERD & 3NF' },
    { id: 'usecase', label: 'Use Case' },
    { id: 'sequence-class', label: 'Sequence & Class' },
    { id: 'sysarch', label: 'สถาปัตยกรรมระบบ' },
    { id: 'written-exams', label: 'ฝึกทำข้อเขียน (6 ข้อ)' }
  ];

  var localState = {
    activeTab: 'all',
    rubricChecks: {}
  };

  function escapeHtml(str) {
    return String(str == null ? '' : str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function formatPromptLines(text) {
    var lines = String(text || '').split('\n');
    return lines
      .map(function (line) {
        var trimmed = line.trim();
        if (!trimmed) return '';
        return '<p class="mb-1.5 last:mb-0">' + escapeHtml(trimmed) + '</p>';
      })
      .join('');
  }

  function announce(msg) {
    if (global.GOV_PREP && global.GOV_PREP.app && typeof global.GOV_PREP.app.announce === 'function') {
      global.GOV_PREP.app.announce(msg);
      return;
    }
    var live = document.getElementById('live-announcer');
    if (live) live.textContent = msg;
  }

  function renderMermaidFigure(diagramObj, copyKey) {
    if (!diagramObj || !diagramObj.code) return '';
    return (
      '<figure class="mermaid-card space-y-3">' +
      (diagramObj.title
        ? '<div class="mermaid-card-title">' +
          '<i class="fa-solid fa-diagram-project" aria-hidden="true"></i> ' +
          '<span>' +
          escapeHtml(diagramObj.title) +
          '</span>' +
          '</div>'
        : '') +
      '<div class="mermaid" data-mermaid-source="' +
      escapeHtml(diagramObj.code) +
      '">' +
      escapeHtml(diagramObj.code) +
      '</div>' +
      (diagramObj.caption
        ? '<figcaption class="text-sm text-muted text-center">' +
          escapeHtml(diagramObj.caption) +
          '</figcaption>'
        : '') +
      '<details class="hint-details">' +
      '<summary><i class="fa-solid fa-code" aria-hidden="true"></i> ดู / คัดลอกโค้ด Mermaid ต้นฉบับ</summary>' +
      '<div class="space-y-2 pt-1">' +
      '<div class="flex justify-end">' +
      '<button type="button" class="btn btn-secondary btn-sm" data-copy-text="' +
      escapeHtml(diagramObj.code) +
      '" data-copy-id="' +
      escapeHtml(copyKey || 'mermaid') +
      '">' +
      '<i class="fa-regular fa-copy" aria-hidden="true"></i> คัดลอกโค้ด Mermaid' +
      '</button>' +
      '</div>' +
      '<pre tabindex="0"><code>' +
      escapeHtml(diagramObj.code) +
      '</code></pre>' +
      '</div>' +
      '</details>' +
      '</figure>'
    );
  }

  function renderSymbolsTable(tbl) {
    if (!tbl || !Array.isArray(tbl.headers) || !Array.isArray(tbl.rows)) return '';
    var headerHtml = tbl.headers
      .map(function (h) {
        return '<th scope="col">' + escapeHtml(h) + '</th>';
      })
      .join('');

    var rowsHtml = tbl.rows
      .map(function (row) {
        var cells = row
          .map(function (cell, idx) {
            if (idx === 0) {
              return '<th scope="row">' + String(cell || '') + '</th>';
            }
            return '<td>' + String(cell || '') + '</td>';
          })
          .join('');
        return '<tr>' + cells + '</tr>';
      })
      .join('');

    return (
      '<div class="table-wrap">' +
      '<table class="data-table">' +
      (tbl.caption ? '<caption>' + escapeHtml(tbl.caption) + '</caption>' : '') +
      '<thead><tr>' +
      headerHtml +
      '</tr></thead>' +
      '<tbody>' +
      rowsHtml +
      '</tbody>' +
      '</table>' +
      '</div>'
    );
  }

  function renderIntroChecklistSection(guide) {
    var items = Array.isArray(guide.introChecklist) ? guide.introChecklist : [];
    var quickRows = Array.isArray(guide.quickSelectorTable) ? guide.quickSelectorTable : [];
    if (!items.length && !quickRows.length) return '';

    var cardsHtml = items
      .map(function (item, idx) {
        if (typeof item === 'string') {
          return (
            '<div class="card-muted space-y-1.5">' +
            '<span class="badge-pill badge-primary font-mono">RULE 0' +
            (idx + 1) +
            '</span>' +
            '<p class="text-sm font-semibold">' +
            escapeHtml(item) +
            '</p>' +
            '</div>'
          );
        }
        return (
          '<div class="card-muted space-y-2">' +
          '<span class="badge-pill badge-primary font-mono">STEP ' +
          escapeHtml(item.step || String(idx + 1)) +
          '</span>' +
          '<h3 class="text-base font-semibold">' +
          escapeHtml(item.title || '') +
          '</h3>' +
          '<p class="text-sm text-muted">' +
          escapeHtml(item.detail || '') +
          '</p>' +
          '</div>'
        );
      })
      .join('');

    var quickRowsHtml = quickRows
      .map(function (row) {
        return (
          '<tr>' +
          '<th scope="row">' +
          escapeHtml(row.diagramToUse) +
          '</th>' +
          '<td>' +
          escapeHtml(row.keywordInExam) +
          '</td>' +
          '<td>' +
          escapeHtml(row.coreFocus) +
          '</td>' +
          '<td>' +
          escapeHtml(row.firstStep) +
          '</td>' +
          '<td>' +
          '<button type="button" class="btn btn-secondary btn-sm" data-jump-tab="' +
          escapeHtml(row.categoryId) +
          '">เปิดดู</button>' +
          '</td>' +
          '</tr>'
        );
      })
      .join('');

    return (
      '<section class="card card-lg space-y-6" aria-labelledby="diag-checklist-heading">' +
      '<div class="flex flex-wrap items-center justify-between gap-2">' +
      '<h2 id="diag-checklist-heading" class="flex items-center gap-2">' +
      '<i class="fa-solid fa-compass-drafting text-primary-token" aria-hidden="true"></i>' +
      '<span>เช็กลิสต์ 6 ขั้นก่อนลงปากกาวาดในห้องสอบ &amp; ตารางเลือกแผนภาพ</span>' +
      '</h2>' +
      '<span class="badge-pill badge-accent">เริ่มจากศูนย์</span>' +
      '</div>' +
      (cardsHtml
        ? '<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">' + cardsHtml + '</div>'
        : '') +
      (quickRowsHtml
        ? '<div class="space-y-2">' +
          '<h3>ตารางเลือกใช้แผนภาพให้ถูกกับโจทย์ข้อเขียนภายใน 5 วินาที</h3>' +
          '<div class="table-wrap">' +
          '<table class="data-table">' +
          '<caption>เปรียบเทียบคำสำคัญในโจทย์ข้อเขียนกับแผนภาพที่ต้องเลือกวาด</caption>' +
          '<thead><tr>' +
          '<th scope="col">แผนภาพ</th>' +
          '<th scope="col">คำสำคัญที่มักพบในโจทย์ข้อเขียน</th>' +
          '<th scope="col">จุดเน้นหลัก</th>' +
          '<th scope="col">ก้าวแรกที่ควรเริ่มวาด</th>' +
          '<th scope="col">ทางลัด</th>' +
          '</tr></thead>' +
          '<tbody>' +
          quickRowsHtml +
          '</tbody>' +
          '</table>' +
          '</div>' +
          '</div>'
        : '') +
      '</section>'
    );
  }

  function renderCategorySection(cat) {
    if (!cat) return '';

    var analogyHtml = '';
    if (cat.analogy && (cat.analogy.title || cat.analogy.body)) {
      analogyHtml =
        '<div class="analogy-box">' +
        '<div class="analogy-title">' +
        '<i class="fa-solid fa-lightbulb text-accent-token" aria-hidden="true"></i> ' +
        '<span>' +
        escapeHtml(cat.analogy.title || 'เปรียบเทียบให้เห็นภาพ') +
        '</span>' +
        '</div>' +
        '<div class="lesson-prose">' +
        (cat.analogy.body || '') +
        '</div>' +
        '</div>';
    }

    var svgHtml = '';
    if (cat.symbolLegendSvg && cat.symbolLegendSvg.svgHtml) {
      svgHtml =
        '<figure class="visual-figure">' +
        '<div class="svg-visual-box">' +
        cat.symbolLegendSvg.svgHtml +
        '</div>' +
        (cat.symbolLegendSvg.caption
          ? '<figcaption class="visual-figure-caption"><span>' +
            escapeHtml(cat.symbolLegendSvg.caption) +
            '</span></figcaption>'
          : '') +
        '</figure>';
    }

    var symbolsHtml = '';
    if (cat.symbolsTable) {
      symbolsHtml =
        '<div class="space-y-3">' +
        '<h3>สัญลักษณ์มาตรฐาน กฎการใช้งาน และวิธีตั้งชื่อ</h3>' +
        svgHtml +
        renderSymbolsTable(cat.symbolsTable) +
        '</div>';
    } else if (svgHtml) {
      symbolsHtml = svgHtml;
    }

    var diagrams = Array.isArray(cat.mermaidDiagrams) ? cat.mermaidDiagrams : [];
    var mermaidHtml = diagrams.length
      ? '<div class="space-y-3">' +
        '<h3>ตัวอย่างแผนภาพมาตรฐานพร้อมโค้ด Mermaid</h3>' +
        diagrams
          .map(function (d, dIdx) {
            return renderMermaidFigure(d, cat.id + '-d-' + dIdx);
          })
          .join('') +
        '</div>'
      : '';

    var traps = Array.isArray(cat.examTraps) ? cat.examTraps : [];
    var trapsHtml = traps.length
      ? '<div class="space-y-2">' +
        '<h3>จุดโดนหักคะแนนในห้องสอบที่ต้องระวัง</h3>' +
        '<div class="callout callout-warn">' +
        '<div class="callout-title"><i class="fa-solid fa-triangle-exclamation" aria-hidden="true"></i> ระวังพลาด 5 ข้อนี้!</div>' +
        '<ul class="list-disc pl-5 space-y-1.5 lesson-prose">' +
        traps
          .map(function (t) {
            return '<li>' + t + '</li>';
          })
          .join('') +
        '</ul>' +
        '</div>' +
        '</div>'
      : '';

    return (
      '<section class="card card-lg space-y-6" id="diag-cat-' +
      escapeHtml(cat.id) +
      '" aria-labelledby="heading-diag-cat-' +
      escapeHtml(cat.id) +
      '">' +
      '<div class="flex flex-wrap items-center justify-between gap-2 border-b pb-4" style="border-color: var(--border-color);">' +
      '<div class="space-y-2">' +
      '<span class="badge-pill badge-primary"><i class="' +
      escapeHtml(cat.icon || 'fa-solid fa-diagram-project') +
      '" aria-hidden="true"></i> ' +
      escapeHtml(cat.badge || cat.tabLabel || '') +
      '</span>' +
      '<h2 id="heading-diag-cat-' +
      escapeHtml(cat.id) +
      '">' +
      escapeHtml(cat.title || '') +
      '</h2>' +
      '</div>' +
      '<button type="button" class="btn btn-accent btn-sm" data-jump-tab="written-exams">' +
      '<i class="fa-solid fa-pen-to-square" aria-hidden="true"></i> ไปฝึกทำข้อเขียน' +
      '</button>' +
      '</div>' +
      '<div class="lesson-prose space-y-3">' +
      (cat.whatIsItHtml || '') +
      '</div>' +
      analogyHtml +
      symbolsHtml +
      (cat.stepByStepHtml ? '<div class="lesson-prose space-y-3">' + cat.stepByStepHtml + '</div>' : '') +
      mermaidHtml +
      trapsHtml +
      '</section>'
    );
  }

  function countRubricChecked(examId, total) {
    var checkedMap = localState.rubricChecks[examId] || {};
    var done = 0;
    for (var i = 0; i < total; i += 1) {
      if (checkedMap[i]) done += 1;
    }
    return done;
  }

  function renderWrittenExamCard(exam) {
    if (!exam) return '';
    var steps = Array.isArray(exam.thinkingSteps) ? exam.thinkingSteps : [];
    var rubric = Array.isArray(exam.rubric) ? exam.rubric : [];
    var checkedMap = localState.rubricChecks[exam.id] || {};
    var checkedCount = countRubricChecked(exam.id, rubric.length);

    var stepsHtml = steps
      .map(function (st) {
        return '<li>' + escapeHtml(st) + '</li>';
      })
      .join('');

    var primaryDiagramObj = exam.solutionMermaid
      ? {
          title: 'แผนภาพเฉลยหลัก (' + (exam.diagramType || 'Diagram') + ')',
          caption: 'ตรวจทานทิศลูกศร สัญลักษณ์ และป้ายกำกับให้ตรงตามเกณฑ์ด้านล่าง',
          code: exam.solutionMermaid
        }
      : null;

    var schemaHtml = exam.solutionSchemaText
      ? '<div class="space-y-2">' +
        '<div class="flex flex-wrap items-center justify-between gap-2">' +
        '<span class="font-heading font-semibold text-sm text-primary-token">' +
        '<i class="fa-solid fa-table" aria-hidden="true"></i> โครงสร้าง Relational Schema 3NF สำหรับเขียนตอบ' +
        '</span>' +
        '<button type="button" class="btn btn-secondary btn-sm" data-copy-text="' +
        escapeHtml(exam.solutionSchemaText) +
        '" data-copy-id="schema-' +
        escapeHtml(exam.id) +
        '">' +
        '<i class="fa-regular fa-copy" aria-hidden="true"></i> คัดลอก Schema 3NF' +
        '</button>' +
        '</div>' +
        '<pre tabindex="0"><code>' +
        escapeHtml(exam.solutionSchemaText) +
        '</code></pre>' +
        '</div>'
      : '';

    var rubricHtml = rubric
      .map(function (item, rIdx) {
        var inputId = 'rubric-' + exam.id + '-' + rIdx;
        var isChecked = !!checkedMap[rIdx];
        return (
          '<li>' +
          '<label for="' +
          escapeHtml(inputId) +
          '" class="flex items-start gap-2.5 p-2.5 rounded-lg border cursor-pointer" style="border-color: var(--border-color); background-color: var(--bg-surface);">' +
          '<input type="checkbox" id="' +
          escapeHtml(inputId) +
          '" class="mt-1 shrink-0" data-rubric-exam="' +
          escapeHtml(exam.id) +
          '" data-rubric-idx="' +
          rIdx +
          '"' +
          (isChecked ? ' checked' : '') +
          '>' +
          '<span class="text-sm">' +
          escapeHtml(item) +
          '</span>' +
          '</label>' +
          '</li>'
        );
      })
      .join('');

    return (
      '<article class="card card-lg space-y-5" id="written-' +
      escapeHtml(exam.id) +
      '" aria-labelledby="heading-' +
      escapeHtml(exam.id) +
      '">' +
      '<div class="flex flex-wrap items-center justify-between gap-2">' +
      '<div class="flex flex-wrap items-center gap-2">' +
      '<span class="badge-pill badge-accent font-mono">ข้อเขียน ' +
      escapeHtml(String(exam.number || '')) +
      ' / 6</span>' +
      '<span class="badge-pill badge-primary">' +
      escapeHtml(exam.diagramType || '') +
      '</span>' +
      (exam.scoreWeight ? '<span class="badge-pill">' + escapeHtml(exam.scoreWeight) + '</span>' : '') +
      (exam.difficulty ? '<span class="badge-pill">' + escapeHtml(exam.difficulty) + '</span>' : '') +
      '</div>' +
      '</div>' +
      '<h2 id="heading-' +
      escapeHtml(exam.id) +
      '">' +
      escapeHtml(exam.title || '') +
      '</h2>' +
      '<div class="callout callout-info space-y-2">' +
      '<div class="callout-title"><i class="fa-solid fa-file-lines" aria-hidden="true"></i> โจทย์ข้อเขียนเสมือนห้องสอบจริง</div>' +
      '<div class="lesson-prose text-sm sm:text-base">' +
      formatPromptLines(exam.promptText) +
      '</div>' +
      '</div>' +
      '<details class="hint-details" data-exam-hint="' +
      escapeHtml(exam.id) +
      '">' +
      '<summary><i class="fa-solid fa-lightbulb" aria-hidden="true"></i> ดูแนวทางแกะโจทย์ทีละขั้น (Thinking Steps)</summary>' +
      '<div class="space-y-2 pt-2">' +
      '<p class="text-sm text-muted">ลองคิดตามลำดับขั้นนี้ก่อนลงมือวาดแผนภาพบนกระดาษ:</p>' +
      '<ol class="list-decimal pl-5 space-y-1.5 text-sm lesson-prose">' +
      stepsHtml +
      '</ol>' +
      '</div>' +
      '</details>' +
      '<details class="hint-details" data-exam-solution="' +
      escapeHtml(exam.id) +
      '">' +
      '<summary><i class="fa-solid fa-circle-check" aria-hidden="true"></i> เปิดดูเฉลยแผนภาพ คำอธิบาย และเกณฑ์ตรวจคำตอบ (Rubric)</summary>' +
      '<div class="space-y-5 pt-3">' +
      '<div class="space-y-3">' +
      '<h3>1. เฉลยแผนภาพมาตรฐาน</h3>' +
      renderMermaidFigure(primaryDiagramObj, 'sol-primary-' + exam.id) +
      (exam.secondaryMermaid ? renderMermaidFigure(exam.secondaryMermaid, 'sol-secondary-' + exam.id) : '') +
      schemaHtml +
      '</div>' +
      '<div class="space-y-2">' +
      '<h3>2. เหตุผลที่ออกแบบและวาดแบบนี้</h3>' +
      '<div class="lesson-prose">' +
      (exam.solutionExplanation || '') +
      '</div>' +
      '</div>' +
      '<div class="space-y-3">' +
      '<div class="flex flex-wrap items-center justify-between gap-2">' +
      '<h3>3. เกณฑ์ตรวจกระดาษคำตอบด้วยตนเอง (Rubric)</h3>' +
      '<span class="badge-pill ' +
      (checkedCount === rubric.length && rubric.length > 0 ? 'badge-success' : 'badge-primary') +
      '" data-rubric-score="' +
      escapeHtml(exam.id) +
      '">ตรวจผ่านแล้ว ' +
      checkedCount +
      ' / ' +
      rubric.length +
      ' ข้อ</span>' +
      '</div>' +
      '<ul class="list-none p-0 m-0 space-y-2">' +
      rubricHtml +
      '</ul>' +
      '</div>' +
      '</div>' +
      '</details>' +
      '</article>'
    );
  }

  function renderActiveBodyHtml(guide) {
    var categories = Array.isArray(guide.categories) ? guide.categories : [];
    var writtenExams = Array.isArray(guide.writtenExams) ? guide.writtenExams : [];
    var tab = localState.activeTab;

    if (tab === 'written-exams') {
      return (
        '<div class="space-y-6">' +
        '<div class="callout callout-tip">' +
        '<div class="callout-title"><i class="fa-solid fa-pen-ruler" aria-hidden="true"></i> วิธีฝึกให้ได้ผลสูงสุดสำหรับห้องสอบ</div>' +
        '<p class="text-sm">แนะนำให้หยิบกระดาษ A4 กับปากกาหรือดินสอมา <strong>ลองวาดคำตอบด้วยมือให้เสร็จก่อน</strong> แล้วค่อยคลิกเปิดดู <em>แนวทางแกะโจทย์ (Hint)</em> และ <em>เฉลย + Rubric</em> เพื่อตรวจว่าขาดจุดไหนบ้าง</p>' +
        '</div>' +
        writtenExams.map(renderWrittenExamCard).join('') +
        '</div>'
      );
    }

    if (tab !== 'all') {
      var matched = null;
      for (var i = 0; i < categories.length; i += 1) {
        if (categories[i].id === tab) {
          matched = categories[i];
          break;
        }
      }
      var relatedExams = writtenExams.filter(function (ex) {
        return ex.categoryId === tab;
      });
      return (
        '<div class="space-y-6">' +
        (matched ? renderCategorySection(matched) : '<div class="callout callout-warn">ไม่พบหมวดหมู่ที่เลือก</div>') +
        (relatedExams.length ? relatedExams.map(renderWrittenExamCard).join('') : '') +
        '</div>'
      );
    }

    return (
      '<div class="space-y-6">' +
      renderIntroChecklistSection(guide) +
      categories.map(renderCategorySection).join('') +
      writtenExams.map(renderWrittenExamCard).join('') +
      '</div>'
    );
  }

  function bindJumpButtons(scopeEl, containerEl, guide) {
    if (!scopeEl) return;
    var jumpBtns = scopeEl.querySelectorAll('[data-jump-tab]');
    for (var j = 0; j < jumpBtns.length; j += 1) {
      jumpBtns[j].addEventListener('click', function () {
        var targetTab = this.getAttribute('data-jump-tab');
        if (targetTab) {
          switchTab(containerEl, guide, targetTab);
          if (typeof containerEl.scrollIntoView === 'function') {
            containerEl.scrollIntoView({ behavior: 'auto', block: 'start' });
          }
        }
      });
    }
  }

  function bindDynamicEvents(mountEl, containerEl, guide) {
    if (!mountEl) return;

    var copyBtns = mountEl.querySelectorAll('[data-copy-text]');
    for (var c = 0; c < copyBtns.length; c += 1) {
      copyBtns[c].addEventListener('click', function () {
        var text = this.getAttribute('data-copy-text') || '';
        if (global.GOV_PREP && global.GOV_PREP.app && typeof global.GOV_PREP.app.copyToClipboard === 'function') {
          global.GOV_PREP.app.copyToClipboard(text, this);
        }
      });
    }

    bindJumpButtons(mountEl, containerEl, guide);

    var solutionDetails = mountEl.querySelectorAll('details[data-exam-solution]');
    for (var d = 0; d < solutionDetails.length; d += 1) {
      solutionDetails[d].addEventListener('toggle', function () {
        if (this.open && global.GOV_PREP && global.GOV_PREP.mermaidHelper && typeof global.GOV_PREP.mermaidHelper.renderAll === 'function') {
          global.GOV_PREP.mermaidHelper.renderAll(this, true);
        }
      });
    }

    var rubricInputs = mountEl.querySelectorAll('input[data-rubric-exam]');
    var exams = Array.isArray(guide.writtenExams) ? guide.writtenExams : [];
    for (var r = 0; r < rubricInputs.length; r += 1) {
      rubricInputs[r].addEventListener('change', function () {
        var examId = this.getAttribute('data-rubric-exam');
        var idx = Number(this.getAttribute('data-rubric-idx'));
        if (!localState.rubricChecks[examId]) {
          localState.rubricChecks[examId] = {};
        }
        localState.rubricChecks[examId][idx] = !!this.checked;

        var total = 0;
        for (var e = 0; e < exams.length; e += 1) {
          if (exams[e].id === examId && Array.isArray(exams[e].rubric)) {
            total = exams[e].rubric.length;
            break;
          }
        }
        var done = countRubricChecked(examId, total);
        var scoreBadge = mountEl.querySelector('[data-rubric-score="' + examId + '"]');
        if (scoreBadge) {
          scoreBadge.textContent = 'ตรวจผ่านแล้ว ' + done + ' / ' + total + ' ข้อ';
          scoreBadge.className = 'badge-pill ' + (done === total && total > 0 ? 'badge-success' : 'badge-primary');
        }
      });
    }
  }

  function updateTabButtons(containerEl) {
    var tabBtns = containerEl.querySelectorAll('[data-diagram-tab]');
    for (var i = 0; i < tabBtns.length; i += 1) {
      var btn = tabBtns[i];
      var isActive = btn.getAttribute('data-diagram-tab') === localState.activeTab;
      btn.classList.toggle('is-active', isActive);
      btn.setAttribute('aria-pressed', isActive ? 'true' : 'false');
    }
  }

  function switchTab(containerEl, guide, tabId) {
    localState.activeTab = tabId || 'all';
    updateTabButtons(containerEl);

    var mountEl = containerEl.querySelector('#diagrams-lab-body');
    if (mountEl) {
      mountEl.innerHTML = renderActiveBodyHtml(guide);
      bindDynamicEvents(mountEl, containerEl, guide);
    }

    if (global.GOV_PREP && global.GOV_PREP.mermaidHelper && typeof global.GOV_PREP.mermaidHelper.renderAll === 'function') {
      global.GOV_PREP.mermaidHelper.renderAll(containerEl);
    }

    var activeLabel = tabId;
    for (var i = 0; i < TABS.length; i += 1) {
      if (TABS[i].id === tabId) {
        activeLabel = TABS[i].label;
        break;
      }
    }
    announce('แสดงหมวดหมู่ ' + activeLabel);
  }

  function render(containerEl) {
    if (!containerEl) return;

    var registry = global.GOV_PREP || {};
    var guide = registry.diagramsGuide;

    if (!guide) {
      containerEl.innerHTML =
        '<div class="card card-lg space-y-3">' +
        '<h1>คู่มือ Diagram &amp; ออกแบบระบบ</h1>' +
        '<div class="callout callout-warn" role="alert">ไม่พบข้อมูล <code>GOV_PREP.diagramsGuide</code> กรุณาตรวจสอบการโหลดไฟล์ <code>js/data/diagrams-guide.js</code></div>' +
        '</div>';
      return;
    }

    var catCount = Array.isArray(guide.categories) ? guide.categories.length : 0;
    var examCount = Array.isArray(guide.writtenExams) ? guide.writtenExams.length : 0;

    var tabsHtml = TABS.map(function (tab) {
      var isActive = localState.activeTab === tab.id;
      return (
        '<button type="button" class="tab-btn' +
        (isActive ? ' is-active' : '') +
        '" data-diagram-tab="' +
        escapeHtml(tab.id) +
        '" aria-pressed="' +
        (isActive ? 'true' : 'false') +
        '">' +
        escapeHtml(tab.label) +
        '</button>'
      );
    }).join('');

    containerEl.innerHTML =
      '<div class="space-y-6" data-diagrams-lab-root>' +
      '<header class="hero-card cadastral-grid space-y-4">' +
      '<nav aria-label="เส้นทางหน้านี้" class="flex flex-wrap items-center gap-2 text-sm text-muted">' +
      '<a href="#dashboard" class="font-semibold">หน้าหลัก</a>' +
      '<span aria-hidden="true">/</span>' +
      '<span>เจาะลึกข้อเขียน</span>' +
      '<span aria-hidden="true">/</span>' +
      '<span class="font-semibold text-primary-token">คู่มือ Diagram &amp; ออกแบบระบบ</span>' +
      '</nav>' +
      '<div class="flex flex-wrap items-center gap-2">' +
      '<span class="badge-pill badge-primary"><i class="fa-solid fa-diagram-project" aria-hidden="true"></i> Written Exam Studio</span>' +
      '<span class="badge-pill badge-accent">' +
      catCount +
      ' หมวดแผนภาพหลัก</span>' +
      '<span class="badge-pill badge-success">' +
      examCount +
      ' แนวข้อสอบเขียนจริง</span>' +
      '</div>' +
      '<h1>' +
      escapeHtml(guide.title || 'คู่มือเจาะลึก Diagram & ออกแบบระบบสำหรับข้อเขียน') +
      '</h1>' +
      (guide.subtitle ? '<p class="text-muted prose-content">' + escapeHtml(guide.subtitle) + '</p>' : '') +
      (guide.whyDiagramsMatterHtml
        ? '<div class="callout callout-tip">' +
          '<div class="callout-title"><i class="fa-solid fa-award" aria-hidden="true"></i> ทำไมแผนภาพจึงเป็นตัวชี้ขาดคะแนนสอบข้อเขียน?</div>' +
          '<div class="lesson-prose text-sm sm:text-base">' +
          guide.whyDiagramsMatterHtml +
          '</div>' +
          '</div>'
        : '') +
      '<div class="flex flex-wrap items-center gap-2 pt-1">' +
      '<button type="button" class="btn btn-accent btn-sm" data-jump-tab="written-exams">' +
      '<i class="fa-solid fa-pen-to-square" aria-hidden="true"></i> ข้ามไปฝึกทำข้อเขียน 6 ข้อ' +
      '</button>' +
      '<a href="#lesson/core-3-sad-sdlc" class="btn btn-secondary btn-sm">' +
      '<i class="fa-solid fa-book-open" aria-hidden="true"></i> ทบทวนบทที่ 3 (SDLC &amp; SA&amp;D)' +
      '</a>' +
      '<a href="#sql-guide" class="btn btn-secondary btn-sm">' +
      '<i class="fa-solid fa-terminal" aria-hidden="true"></i> คู่มือคำสั่ง SQL ข้อเขียน' +
      '</a>' +
      '</div>' +
      '</header>' +
      '<div class="card space-y-3">' +
      '<div class="flex flex-wrap items-center justify-between gap-2">' +
      '<span class="font-heading font-semibold text-sm text-muted">' +
      '<i class="fa-solid fa-filter" aria-hidden="true"></i> เลือกดูเฉพาะแผนภาพหรือโหมดฝึกข้อเขียน' +
      '</span>' +
      '<span class="text-xs text-muted">คลิกสลับหมวดได้ทันที</span>' +
      '</div>' +
      '<div class="tab-group" role="group" aria-label="ตัวกรองหมวดหมู่แผนภาพและข้อเขียน">' +
      tabsHtml +
      '</div>' +
      '</div>' +
      '<div id="diagrams-lab-body">' +
      renderActiveBodyHtml(guide) +
      '</div>' +
      '</div>';

    var tabButtons = containerEl.querySelectorAll('[data-diagram-tab]');
    for (var t = 0; t < tabButtons.length; t += 1) {
      tabButtons[t].addEventListener('click', function () {
        var nextTab = this.getAttribute('data-diagram-tab');
        switchTab(containerEl, guide, nextTab);
      });
    }

    bindJumpButtons(containerEl.querySelector('header.hero-card'), containerEl, guide);
    bindDynamicEvents(containerEl.querySelector('#diagrams-lab-body'), containerEl, guide);

    if (global.GOV_PREP && global.GOV_PREP.mermaidHelper && typeof global.GOV_PREP.mermaidHelper.renderAll === 'function') {
      global.GOV_PREP.mermaidHelper.renderAll(containerEl);
    }
  }

  global.GOV_PREP = global.GOV_PREP || {};
  global.GOV_PREP.views = global.GOV_PREP.views || {};
  global.GOV_PREP.views.diagramsLab = {
    render: render
  };
})(window);
