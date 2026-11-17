/**
 * Lesson View: Renders rich Thai educational modules with hero visual + lightbox zoom,
 * collapsible AI prompt + copy, key takeaways, analogy boxes, prose, SVG/image cards,
 * Mermaid diagrams, embedded SQL mini-runners, end-of-lesson practice quiz, and prev/next footer.
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

  function renderVisualImageFigure(opts) {
    var src = opts.image || '';
    var alt = opts.alt || opts.caption || 'ภาพประกอบบทเรียน';
    var caption = opts.caption || '';
    var prompt = opts.prompt || '';
    var width = opts.width || 1200;
    var height = opts.height || 675;
    var aspectRatio = opts.aspectRatio || '16 / 9';

    var promptHtml = '';
    if (prompt) {
      promptHtml =
        '<details class="prompt-details">' +
        '<summary><i class="fa-solid fa-wand-magic-sparkles" aria-hidden="true"></i> ดู AI Prompt สำหรับสร้าง/แก้ไขภาพประกอบนี้</summary>' +
        '<div class="space-y-2 pt-1">' +
        '<p class="text-xs text-muted font-mono leading-relaxed" data-prompt-text>' +
        escapeHtml(prompt) +
        '</p>' +
        '<button type="button" class="btn btn-secondary btn-sm" data-copy-prompt="' +
        escapeHtml(prompt) +
        '">' +
        '<i class="fa-regular fa-copy" aria-hidden="true"></i> คัดลอก Prompt' +
        '</button>' +
        '</div>' +
        '</details>';
    }

    return (
      '<figure class="visual-figure">' +
      '<div class="visual-figure-media">' +
      '<img src="' +
      escapeHtml(src) +
      '" alt="' +
      escapeHtml(alt) +
      '" width="' +
      escapeHtml(width) +
      '" height="' +
      escapeHtml(height) +
      '" style="aspect-ratio: ' +
      escapeHtml(aspectRatio) +
      ';" loading="lazy">' +
      '</div>' +
      '<figcaption class="visual-figure-caption">' +
      '<span>' +
      escapeHtml(caption) +
      '</span>' +
      '<button type="button" class="btn btn-secondary btn-sm" data-zoom-src="' +
      escapeHtml(src) +
      '" data-zoom-alt="' +
      escapeHtml(alt) +
      '" data-zoom-caption="' +
      escapeHtml(caption) +
      '">' +
      '<i class="fa-solid fa-magnifying-glass-plus" aria-hidden="true"></i> ขยายภาพเต็มจอ' +
      '</button>' +
      '</figcaption>' +
      (promptHtml ? '<div class="px-4 pb-3">' + promptHtml + '</div>' : '') +
      '</figure>'
    );
  }

  function findAgencyLabel(lesson, registry) {
    if (!lesson || lesson.category !== 'agency') {
      return 'หมวดวิชาการคอมพิวเตอร์';
    }
    var agencies = Array.isArray(registry.agencies) ? registry.agencies : [];
    for (var i = 0; i < agencies.length; i += 1) {
      if (agencies[i].id === lesson.agencyId) {
        return agencies[i].shortName || agencies[i].name || 'เฉพาะทางหน่วยงาน';
      }
    }
    return 'เฉพาะทางหน่วยงาน';
  }

  function render(containerEl, lessonId) {
    if (!containerEl) return;

    var registry = global.GOV_PREP || {};
    var stateApi = registry.state;
    var appApi = registry.app;
    var sqlEngine = registry.sqlEngine;
    var quizEngine = registry.quizEngine;

    var lesson = typeof registry.getLessonById === 'function' ? registry.getLessonById(lessonId) : null;
    if (!lesson) {
      containerEl.innerHTML =
        '<div class="card space-y-4">' +
        '<h1>ไม่พบบทเรียนที่เลือก</h1>' +
        '<p class="text-muted">บทเรียนรหัส <code>' +
        escapeHtml(lessonId) +
        '</code> อาจถูกย้ายหรือยังไม่ได้ลงทะเบียนในระบบ</p>' +
        '<a href="#dashboard" class="btn btn-primary">กลับหน้าหลัก</a>' +
        '</div>';
      return;
    }

    var allOrdered = typeof registry.getAllLessonsOrdered === 'function' ? registry.getAllLessonsOrdered() : [];
    var currentIdx = -1;
    for (var idx = 0; idx < allOrdered.length; idx += 1) {
      if (allOrdered[idx].id === lesson.id) {
        currentIdx = idx;
        break;
      }
    }
    var prevLesson = currentIdx > 0 ? allOrdered[currentIdx - 1] : null;
    var nextLesson = currentIdx >= 0 && currentIdx < allOrdered.length - 1 ? allOrdered[currentIdx + 1] : null;

    var isCompleted = stateApi ? stateApi.isLessonCompleted(lesson.id) : false;
    var categoryLabel = findAgencyLabel(lesson, registry);

    // Build sections HTML
    var sections = Array.isArray(lesson.sections) ? lesson.sections : [];
    var sqlSlots = [];

    var sectionsHtml = sections
      .map(function (sec, secIdx) {
        var analogyHtml = '';
        if (sec.analogyBox && (sec.analogyBox.title || sec.analogyBox.body)) {
          analogyHtml =
            '<div class="analogy-box">' +
            '<div class="analogy-title">' +
            '<i class="fa-solid fa-lightbulb text-accent-token" aria-hidden="true"></i> ' +
            '<span>' +
            escapeHtml(sec.analogyBox.title || 'เปรียบเทียบให้เห็นภาพ') +
            '</span>' +
            '</div>' +
            '<div class="lesson-prose">' +
            (sec.analogyBox.body || '') +
            '</div>' +
            '</div>';
        }

        var bodyHtml = sec.bodyHtml
          ? '<div class="lesson-prose">' + sec.bodyHtml + '</div>'
          : '';

        var visualHtml = '';
        if (sec.visualCard) {
          if (sec.visualCard.type === 'image' && sec.visualCard.image) {
            visualHtml = renderVisualImageFigure(sec.visualCard);
          } else if (sec.visualCard.type === 'svg' && sec.visualCard.svgHtml) {
            visualHtml =
              '<figure class="visual-figure">' +
              '<div class="svg-visual-box">' +
              sec.visualCard.svgHtml +
              '</div>' +
              (sec.visualCard.caption
                ? '<figcaption class="visual-figure-caption"><span>' +
                  escapeHtml(sec.visualCard.caption) +
                  '</span></figcaption>'
                : '') +
              '</figure>';
          }
        }

        var mermaidHtml = '';
        if (sec.mermaid && sec.mermaid.code) {
          mermaidHtml =
            '<figure class="mermaid-card">' +
            (sec.mermaid.title
              ? '<div class="mermaid-card-title">' +
                '<i class="fa-solid fa-diagram-project" aria-hidden="true"></i> ' +
                '<span>' +
                escapeHtml(sec.mermaid.title) +
                '</span>' +
                '</div>'
              : '') +
            '<div class="mermaid" data-mermaid-source="' +
            escapeHtml(sec.mermaid.code) +
            '">' +
            escapeHtml(sec.mermaid.code) +
            '</div>' +
            (sec.mermaid.caption
              ? '<figcaption class="text-sm text-muted text-center mt-2">' +
                escapeHtml(sec.mermaid.caption) +
                '</figcaption>'
              : '') +
            '</figure>';
        }

        var sqlTryItHtml = '';
        if (sec.sqlTryIt) {
          var slotId = 'lesson-sql-slot-' + secIdx;
          sqlSlots.push({ slotId: slotId, cfg: sec.sqlTryIt });
          sqlTryItHtml =
            '<div class="card card-muted space-y-3" data-sql-tryit-wrap="' +
            slotId +
            '">' +
            '<div id="' +
            slotId +
            '"></div>' +
            '<div class="flex flex-wrap items-center justify-between gap-2 pt-1">' +
            '<span class="text-xs text-muted">อยากทดสอบคิวรีซับซ้อนหรือดู Schema ทั้ง 4 ตาราง?</span>' +
            '<button type="button" class="btn btn-accent btn-sm" data-open-full-sql="' +
            slotId +
            '" data-fallback-sql="' +
            escapeHtml(sec.sqlTryIt.initialQuery || '') +
            '">' +
            '<i class="fa-solid fa-up-right-from-square" aria-hidden="true"></i> เปิดโจทย์นี้ในลานซ้อม SQL เต็มรูปแบบ' +
            '</button>' +
            '</div>' +
            '</div>';
        }

        return (
          '<section class="card card-lg space-y-4" id="sec-' +
          escapeHtml(sec.id || String(secIdx)) +
          '" aria-labelledby="heading-sec-' +
          escapeHtml(sec.id || String(secIdx)) +
          '">' +
          '<h2 id="heading-sec-' +
          escapeHtml(sec.id || String(secIdx)) +
          '">' +
          escapeHtml(sec.title || '') +
          '</h2>' +
          analogyHtml +
          bodyHtml +
          visualHtml +
          mermaidHtml +
          sqlTryItHtml +
          '</section>'
        );
      })
      .join('');

    // Takeaways box
    var takeaways = Array.isArray(lesson.summaryTakeaways) ? lesson.summaryTakeaways : [];
    var takeawaysHtml = takeaways.length
      ? '<aside class="takeaways-box" aria-labelledby="takeaways-heading">' +
        '<h2 id="takeaways-heading" class="text-lg font-semibold flex items-center gap-2 mb-2">' +
        '<i class="fa-solid fa-key text-primary-token" aria-hidden="true"></i>' +
        '<span>สรุปประเด็นสำคัญออกสอบ (Key Takeaways)</span>' +
        '</h2>' +
        '<ul class="list-disc pl-5 space-y-1.5 lesson-prose">' +
        takeaways
          .map(function (item) {
            return '<li>' + escapeHtml(item) + '</li>';
          })
          .join('') +
        '</ul>' +
        '</aside>'
      : '';

    // Hero visual
    var heroVisualHtml =
      lesson.heroVisual && lesson.heroVisual.image
        ? renderVisualImageFigure(lesson.heroVisual)
        : '';

    var quizCount = Array.isArray(lesson.quiz) ? lesson.quiz.length : 0;

    containerEl.innerHTML =
      '<div class="space-y-6" data-lesson-root="' +
      escapeHtml(lesson.id) +
      '">' +
      // Header & Breadcrumb
      '<header class="hero-card cadastral-grid space-y-4">' +
      '<nav aria-label="เส้นทางบทเรียน" class="flex flex-wrap items-center gap-2 text-sm text-muted">' +
      '<a href="#dashboard" class="font-semibold">หน้าหลัก</a>' +
      '<span aria-hidden="true">/</span>' +
      '<span>' +
      escapeHtml(categoryLabel) +
      '</span>' +
      '<span aria-hidden="true">/</span>' +
      '<span class="font-mono font-semibold text-primary-token">' +
      escapeHtml(lesson.code || lesson.id) +
      '</span>' +
      '</nav>' +
      '<div class="flex flex-wrap items-start justify-between gap-4">' +
      '<div class="space-y-2 flex-1 min-w-[240px]">' +
      '<div class="flex flex-wrap items-center gap-2">' +
      '<span class="badge-pill badge-primary font-mono"><i class="' +
      escapeHtml(lesson.icon || 'fa-solid fa-book-open') +
      '" aria-hidden="true"></i> ' +
      escapeHtml(lesson.code || '') +
      '</span>' +
      '<span class="badge-pill"><i class="fa-regular fa-clock" aria-hidden="true"></i> ประมาณ ' +
      escapeHtml(lesson.estimatedMinutes || 15) +
      ' นาที</span>' +
      '<span class="badge-pill"><i class="fa-solid fa-list-check" aria-hidden="true"></i> แบบฝึกหัด ' +
      quizCount +
      ' ข้อ</span>' +
      '</div>' +
      '<h1>' +
      escapeHtml(lesson.title) +
      '</h1>' +
      (lesson.subtitle ? '<p class="text-muted prose-content">' + escapeHtml(lesson.subtitle) + '</p>' : '') +
      '</div>' +
      '<div class="flex flex-wrap items-center gap-2">' +
      '<button type="button" class="btn ' +
      (isCompleted ? 'btn-secondary' : 'btn-primary') +
      '" data-toggle-complete aria-pressed="' +
      (isCompleted ? 'true' : 'false') +
      '">' +
      '<i class="fa-solid ' +
      (isCompleted ? 'fa-circle-check text-primary-token' : 'fa-check') +
      '" aria-hidden="true"></i> ' +
      '<span>' +
      (isCompleted ? 'เรียนจบแล้ว (คลิกเพื่อยกเลิก)' : 'ทำเครื่องหมายว่าเรียนจบแล้ว') +
      '</span>' +
      '</button>' +
      '</div>' +
      '</div>' +
      '</header>' +
      // Hero Visual Figure
      heroVisualHtml +
      // Key Takeaways
      takeawaysHtml +
      // Sections
      sectionsHtml +
      // End-of-lesson Quiz Section
      '<section class="card card-lg space-y-4" id="lesson-quiz-section" aria-labelledby="lesson-quiz-heading">' +
      '<div class="flex flex-wrap items-center justify-between gap-2">' +
      '<h2 id="lesson-quiz-heading" class="flex items-center gap-2">' +
      '<i class="fa-solid fa-circle-question text-primary-token" aria-hidden="true"></i>' +
      '<span>แบบฝึกหัดทบทวนท้ายบทเรียน (' +
      quizCount +
      ' ข้อ)</span>' +
      '</h2>' +
      '<span class="badge-pill badge-primary">โหมดฝึกทำ • เฉลยละเอียดทันทีทีละข้อ</span>' +
      '</div>' +
      '<div id="lesson-quiz-mount"></div>' +
      '</section>' +
      // Previous / Next Lesson Navigation Footer
      '<nav class="card flex flex-wrap items-center justify-between gap-3" aria-label="นำทางระหว่างบทเรียน">' +
      '<div class="flex flex-wrap items-center gap-2">' +
      (prevLesson
        ? '<a href="#lesson/' +
          escapeHtml(prevLesson.id) +
          '" class="btn btn-secondary">' +
          '<i class="fa-solid fa-arrow-left" aria-hidden="true"></i> ' +
          '<span>บทก่อนหน้า: ' +
          escapeHtml(prevLesson.shortTitle || prevLesson.title) +
          '</span></a>'
        : '<a href="#dashboard" class="btn btn-secondary"><i class="fa-solid fa-house" aria-hidden="true"></i> กลับหน้าหลัก</a>') +
      '</div>' +
      '<div class="flex flex-wrap items-center gap-2">' +
      (nextLesson
        ? '<a href="#lesson/' +
          escapeHtml(nextLesson.id) +
          '" class="btn btn-primary">' +
          '<span>บทถัดไป: ' +
          escapeHtml(nextLesson.shortTitle || nextLesson.title) +
          '</span> ' +
          '<i class="fa-solid fa-arrow-right" aria-hidden="true"></i></a>'
        : '<a href="#mock-exam" class="btn btn-accent"><i class="fa-solid fa-stopwatch" aria-hidden="true"></i> พร้อมแล้ว! ลุยข้อสอบจำลอง 50 ข้อ</a>') +
      '</div>' +
      '</nav>' +
      '</div>';

    // Mount embedded SQL mini runners
    if (sqlEngine && typeof sqlEngine.mountMiniRunner === 'function') {
      for (var s = 0; s < sqlSlots.length; s += 1) {
        var slotEl = containerEl.querySelector('#' + sqlSlots[s].slotId);
        if (slotEl) {
          sqlEngine.mountMiniRunner(slotEl, sqlSlots[s].cfg);
        }
      }
    }

    // Mount end-of-lesson Quiz
    var quizMount = containerEl.querySelector('#lesson-quiz-mount');
    if (quizMount && quizEngine && typeof quizEngine.renderQuiz === 'function') {
      var quizId = 'quiz-' + lesson.id;
      var saved = stateApi ? stateApi.getQuizResult(quizId) : null;
      var questions = Array.isArray(lesson.quiz) ? lesson.quiz : [];

      var computeAndSave = function (answersSnapshot) {
        if (!stateApi) return;
        var total = questions.length;
        var score = 0;
        for (var q = 0; q < total; q += 1) {
          if (answersSnapshot && answersSnapshot[q] === questions[q].correctIndex) {
            score += 1;
          }
        }
        var pct = total > 0 ? Math.round((score / total) * 100) : 0;
        stateApi.saveQuizResult(quizId, {
          score: score,
          total: total,
          percentage: pct,
          answers: answersSnapshot || {}
        });
      };

      quizEngine.renderQuiz(quizMount, {
        quizId: quizId,
        questions: questions,
        mode: 'practice',
        savedAnswers: saved && saved.answers ? saved.answers : {},
        showAnswersImmediately: true,
        onAnswer: function (_qIdx, _optIdx, _isCorrect, answersSnapshot) {
          computeAndSave(answersSnapshot);
        },
        onComplete: function (result) {
          if (stateApi) {
            stateApi.saveQuizResult(quizId, result);
          }
          if (appApi && typeof appApi.announce === 'function') {
            var hasAnswers = result && result.answers && Object.keys(result.answers).length > 0;
            if (hasAnswers) {
              appApi.announce(
                'ทำแบบฝึกหัดท้ายบทครบ ' + result.total + ' ข้อ ได้ ' + result.score + ' คะแนน (' + result.percentage + '%)'
              );
            } else {
              appApi.announce('รีเซ็ตแบบฝึกหัดท้ายบทเรียนเรียบร้อยแล้ว');
            }
          }
        }
      });
    }

    // Bind interaction events
    bindEvents(containerEl, lesson, stateApi, appApi);
  }

  function bindEvents(containerEl, lesson, stateApi, appApi) {
    // Completion toggle
    var toggleBtn = containerEl.querySelector('[data-toggle-complete]');
    if (toggleBtn && stateApi) {
      toggleBtn.addEventListener('click', function () {
        var nowDone = stateApi.toggleLessonComplete(lesson.id);
        toggleBtn.setAttribute('aria-pressed', nowDone ? 'true' : 'false');
        toggleBtn.className = 'btn ' + (nowDone ? 'btn-secondary' : 'btn-primary');
        toggleBtn.innerHTML =
          '<i class="fa-solid ' +
          (nowDone ? 'fa-circle-check text-primary-token' : 'fa-check') +
          '" aria-hidden="true"></i> ' +
          '<span>' +
          (nowDone ? 'เรียนจบแล้ว (คลิกเพื่อยกเลิก)' : 'ทำเครื่องหมายว่าเรียนจบแล้ว') +
          '</span>';

        if (appApi && typeof appApi.refreshSidebar === 'function') {
          appApi.refreshSidebar();
        }
        if (appApi && typeof appApi.announce === 'function') {
          appApi.announce(nowDone ? 'บันทึกว่าเรียนจบบทเรียนนี้แล้ว' : 'ยกเลิกสถานะเรียนจบบทเรียนนี้');
        }
      });
    }

    // Zoom image modal buttons
    var zoomBtns = containerEl.querySelectorAll('[data-zoom-src]');
    for (var z = 0; z < zoomBtns.length; z += 1) {
      zoomBtns[z].addEventListener('click', function () {
        var src = this.getAttribute('data-zoom-src');
        var alt = this.getAttribute('data-zoom-alt');
        var caption = this.getAttribute('data-zoom-caption');
        if (appApi && typeof appApi.openImageModal === 'function') {
          appApi.openImageModal({ src: src, alt: alt, caption: caption });
        }
      });
    }

    // Copy AI prompt buttons
    var copyBtns = containerEl.querySelectorAll('[data-copy-prompt]');
    for (var c = 0; c < copyBtns.length; c += 1) {
      copyBtns[c].addEventListener('click', function () {
        var promptText = this.getAttribute('data-copy-prompt') || '';
        if (appApi && typeof appApi.copyToClipboard === 'function') {
          appApi.copyToClipboard(promptText, this);
        }
      });
    }

    // Open mini SQL in full SQL Sandbox
    var fullSqlBtns = containerEl.querySelectorAll('[data-open-full-sql]');
    for (var f = 0; f < fullSqlBtns.length; f += 1) {
      fullSqlBtns[f].addEventListener('click', function () {
        var slotId = this.getAttribute('data-open-full-sql');
        var fallbackSql = this.getAttribute('data-fallback-sql') || '';
        var slotEl = slotId ? containerEl.querySelector('#' + slotId) : null;
        var textarea = slotEl ? slotEl.querySelector('textarea.sql-editor') : null;
        var sqlToOpen = textarea && textarea.value.trim() ? textarea.value : fallbackSql;
        if (appApi && typeof appApi.openSqlWithQuery === 'function') {
          appApi.openSqlWithQuery(sqlToOpen);
        }
      });
    }
  }

  global.GOV_PREP = global.GOV_PREP || {};
  global.GOV_PREP.views = global.GOV_PREP.views || {};
  global.GOV_PREP.views.lesson = {
    render: render
  };
})(window);
