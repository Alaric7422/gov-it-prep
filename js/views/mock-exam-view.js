/**
 * Mock Exam View: 50-question simulation (25 Core IT + 25 DOL Domain)
 * with Practice Mode (per-question immediate Thai explanations) & Real Exam Mode (60-min timer),
 * sticky navigator grid, native <dialog> submit confirmation, domain/topic analytics,
 * and filterable 4-option explanation review.
 */
(function (global) {
  'use strict';

  var THAI_LETTERS = ['ก', 'ข', 'ค', 'ง'];

  var localState = {
    phase: 'start', // 'start' | 'active' | 'results'
    mode: 'exam', // 'exam' | 'practice'
    currentIndex: 0,
    answers: {},
    flagged: {},
    startedAtMs: 0,
    elapsedSeconds: 0,
    durationLimitSeconds: 3600,
    timerId: null,
    activeResult: null,
    reviewFilter: 'all' // 'all' | 'wrong' | 'core-it' | 'dol-domain'
  };

  function escapeHtml(str) {
    return String(str == null ? '' : str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function announce(msg) {
    if (global.GOV_PREP && global.GOV_PREP.app && typeof global.GOV_PREP.app.announce === 'function') {
      global.GOV_PREP.app.announce(msg);
      return;
    }
    var live = document.getElementById('live-announcer');
    if (live) live.textContent = msg;
  }

  function formatMMSS(totalSeconds) {
    var sec = Math.max(0, Math.floor(totalSeconds));
    var mins = Math.floor(sec / 60);
    var rem = sec % 60;
    return (mins < 10 ? '0' : '') + mins + ':' + (rem < 10 ? '0' : '') + rem;
  }

  function formatThaiDuration(totalSeconds) {
    var sec = Math.max(0, Math.floor(totalSeconds));
    var mins = Math.floor(sec / 60);
    var rem = sec % 60;
    if (mins === 0) return rem + ' วินาที';
    return mins + ' นาที ' + rem + ' วินาที';
  }

  function formatThaiDate(isoStr) {
    if (!isoStr) return '-';
    try {
      var dt = new Date(isoStr);
      return dt.toLocaleString('th-TH', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (e) {
      return String(isoStr);
    }
  }

  function getDomainLabel(domain) {
    if (domain === 'core-it') return 'วิชาการคอมพิวเตอร์ (Core IT)';
    if (domain === 'dol-domain') return 'เฉพาะทางกรมที่ดิน (DOL)';
    return domain || 'ทั่วไป';
  }

  function stopTimer() {
    if (localState.timerId) {
      global.clearInterval(localState.timerId);
      localState.timerId = null;
    }
  }

  function computeExamStats(questions, answers) {
    var total = questions.length;
    var score = 0;
    var answeredCount = 0;

    var domainBreakdown = {
      'core-it': { label: 'หมวดวิชาการคอมพิวเตอร์', score: 0, total: 0 },
      'dol-domain': { label: 'หมวดเฉพาะทางกรมที่ดิน', score: 0, total: 0 }
    };
    var topicMap = {};
    var topicOrder = [];

    for (var i = 0; i < total; i += 1) {
      var q = questions[i];
      var picked = answers[i];
      var isAnswered = typeof picked === 'number';
      var isCorrect = isAnswered && picked === q.correctIndex;

      if (isAnswered) answeredCount += 1;
      if (isCorrect) score += 1;

      var dom = q.domain || 'core-it';
      if (!domainBreakdown[dom]) {
        domainBreakdown[dom] = { label: getDomainLabel(dom), score: 0, total: 0 };
      }
      domainBreakdown[dom].total += 1;
      if (isCorrect) domainBreakdown[dom].score += 1;

      var topicKey = q.topic || 'อื่นๆ';
      if (!topicMap[topicKey]) {
        topicMap[topicKey] = {
          topic: topicKey,
          domain: dom,
          score: 0,
          total: 0
        };
        topicOrder.push(topicKey);
      }
      topicMap[topicKey].total += 1;
      if (isCorrect) topicMap[topicKey].score += 1;
    }

    var percentage = total > 0 ? Math.round((score / total) * 100) : 0;
    var topicBreakdown = {};
    for (var t = 0; t < topicOrder.length; t += 1) {
      var k = topicOrder[t];
      topicBreakdown[k] = topicMap[k];
    }

    return {
      score: score,
      total: total,
      answeredCount: answeredCount,
      percentage: percentage,
      domainBreakdown: domainBreakdown,
      topicBreakdown: topicBreakdown
    };
  }

  function buildExplanationBlock(q, selectedIndex) {
    var exp = q.explanation || {};
    var summary = exp.summary || '';
    var perOption = Array.isArray(exp.perOption) ? exp.perOption : [];
    var isUnanswered = typeof selectedIndex !== 'number';
    var isCorrect = !isUnanswered && selectedIndex === q.correctIndex;

    var statusHtml = isUnanswered
      ? '<span class="quiz-feedback-badge is-unanswered"><i class="fa-solid fa-circle-minus" aria-hidden="true"></i> ไม่ได้เลือกคำตอบ — เฉลยคือข้อ ' +
        THAI_LETTERS[q.correctIndex] +
        '</span>'
      : isCorrect
      ? '<span class="quiz-feedback-badge is-correct"><i class="fa-solid fa-circle-check" aria-hidden="true"></i> ถูกต้อง!</span>'
      : '<span class="quiz-feedback-badge is-wrong"><i class="fa-solid fa-circle-xmark" aria-hidden="true"></i> ยังไม่ถูก — คำตอบที่ถูกคือข้อ ' +
        THAI_LETTERS[q.correctIndex] +
        '</span>';

    var perOptionHtml = '';
    if (perOption.length) {
      perOptionHtml = '<ul class="quiz-per-option-list">';
      for (var j = 0; j < perOption.length; j += 1) {
        var isRightOpt = j === q.correctIndex;
        var isPickedWrong = j === selectedIndex && !isRightOpt;
        var cls = isRightOpt
          ? 'quiz-per-option-item is-right'
          : isPickedWrong
          ? 'quiz-per-option-item is-picked-wrong'
          : 'quiz-per-option-item';
        var itemText = String(perOption[j] || '');
        var prefixRegex = new RegExp('^\\s*' + THAI_LETTERS[j] + '\\.?\\s*');
        var labelPrefix = prefixRegex.test(itemText) ? '' : THAI_LETTERS[j] + '. ';

        perOptionHtml +=
          '<li class="' +
          cls +
          '">' +
          '<span class="quiz-per-option-tag">' +
          (isRightOpt
            ? '<i class="fa-solid fa-check" aria-hidden="true"></i> '
            : isPickedWrong
            ? '<i class="fa-solid fa-xmark" aria-hidden="true"></i> '
            : '') +
          '</span>' +
          '<span>' +
          escapeHtml(labelPrefix + itemText) +
          '</span>' +
          '</li>';
      }
      perOptionHtml += '</ul>';
    }

    return (
      '<div class="quiz-explanation">' +
      '<div class="quiz-explanation-head">' +
      statusHtml +
      '</div>' +
      (summary ? '<p class="quiz-explanation-summary">' + escapeHtml(summary) + '</p>' : '') +
      perOptionHtml +
      '</div>'
    );
  }

  function renderStartScreen(containerEl, exam, stateApi) {
    var questions = Array.isArray(exam.questions) ? exam.questions : [];
    var coreCount = 0;
    var dolCount = 0;
    for (var i = 0; i < questions.length; i += 1) {
      if (questions[i].domain === 'dol-domain') dolCount += 1;
      else coreCount += 1;
    }

    var history = stateApi ? stateApi.getMockHistory() : [];
    var best = stateApi ? stateApi.getBestMockScore() : null;

    var historyHtml = '';
    if (!history.length) {
      historyHtml =
        '<div class="callout callout-info">' +
        '<div class="callout-title"><i class="fa-solid fa-clock-rotate-left" aria-hidden="true"></i> ยังไม่มีประวัติการสอบจำลอง</div>' +
        '<p class="text-sm">เมื่อคุณส่งข้อสอบจำลองแต่ละครั้ง สถิติคะแนนและรายละเอียดคำตอบจะถูกบันทึกไว้ที่นี่เพื่อใช้วัดพัฒนาการครับ</p>' +
        '</div>';
    } else {
      var rows = history
        .map(function (item, idx) {
          var passed = (item.percentage || 0) >= 60;
          return (
            '<tr>' +
            '<th scope="row">' +
            (history.length - idx) +
            '</th>' +
            '<td>' +
            escapeHtml(formatThaiDate(item.date)) +
            '</td>' +
            '<td><span class="badge-pill ' +
            (item.mode === 'exam' ? 'badge-accent' : 'badge-primary') +
            '">' +
            (item.mode === 'exam' ? 'โหมดสอบจริง' : 'โหมดฝึกทำ') +
            '</span></td>' +
            '<td class="font-mono font-semibold">' +
            item.score +
            ' / ' +
            item.total +
            ' (' +
            item.percentage +
            '%)</td>' +
            '<td><span class="badge-pill ' +
            (passed ? 'badge-success' : 'badge-danger') +
            '">' +
            (passed ? 'ผ่านเกณฑ์' : 'ยังไม่ถึง 60%') +
            '</span></td>' +
            '<td class="font-mono">' +
            escapeHtml(formatThaiDuration(item.durationSeconds || 0)) +
            '</td>' +
            '<td><button type="button" class="btn btn-secondary btn-sm" data-exam-view-history="' +
            idx +
            '">ดูเฉลย</button></td>' +
            '</tr>'
          );
        })
        .join('');

      historyHtml =
        '<div class="table-wrap">' +
        '<table class="data-table">' +
        '<caption class="visually-hidden">ประวัติการทำข้อสอบจำลองที่ผ่านมา</caption>' +
        '<thead><tr>' +
        '<th scope="col">ครั้งที่</th>' +
        '<th scope="col">วันที่สอบ</th>' +
        '<th scope="col">รูปแบบ</th>' +
        '<th scope="col">คะแนน</th>' +
        '<th scope="col">ผลประเมิน</th>' +
        '<th scope="col">เวลาที่ใช้</th>' +
        '<th scope="col">ทบทวน</th>' +
        '</tr></thead>' +
        '<tbody>' +
        rows +
        '</tbody>' +
        '</table>' +
        '</div>';
    }

    containerEl.innerHTML =
      '<div class="space-y-6">' +
      '<header class="hero-card cadastral-grid space-y-4">' +
      '<div class="flex flex-wrap items-center gap-2">' +
      '<span class="badge-pill badge-accent"><i class="fa-solid fa-clipboard-check" aria-hidden="true"></i> Mock Exam Simulation</span>' +
      '<span class="badge-pill badge-primary">' +
      questions.length +
      ' ข้อ • ' +
      (exam.durationMinutes || 60) +
      ' นาที</span>' +
      (best
        ? '<span class="badge-pill badge-success"><i class="fa-solid fa-trophy" aria-hidden="true"></i> สถิติสูงสุด: ' +
          best.score +
          '/' +
          best.total +
          ' (' +
          best.percentage +
          '%)</span>'
        : '') +
      '</div>' +
      '<h1>' +
      escapeHtml(exam.title || 'ข้อสอบจำลองเสมือนจริง: นักวิชาการคอมพิวเตอร์ปฏิบัติการ (กรมที่ดิน)') +
      '</h1>' +
      '<p class="text-muted prose-content">' +
      'วัดความพร้อมก่อนเข้าห้องสอบจริงด้วยข้อสอบ <strong>' +
      questions.length +
      ' ข้อ</strong> ครอบคลุมทั้งวิชาการคอมพิวเตอร์ <strong>' +
      coreCount +
      ' ข้อ</strong> และความรู้เฉพาะทางกรมที่ดิน <strong>' +
      dolCount +
      ' ข้อ</strong> เกณฑ์ผ่านมาตรฐานราชการตั้งแต่ <strong>60% (' +
      Math.ceil(questions.length * 0.6) +
      ' ข้อ)</strong> ขึ้นไป' +
      '</p>' +
      '</header>' +
      '<section class="space-y-4" aria-labelledby="exam-mode-heading">' +
      '<h2 id="exam-mode-heading">เลือกรูปแบบการทำข้อสอบ</h2>' +
      '<div class="grid grid-cols-1 md:grid-cols-2 gap-4">' +
      // Practice Mode Card
      '<article class="card card-lg flex flex-col justify-between gap-4">' +
      '<div class="space-y-3">' +
      '<span class="badge-pill badge-primary"><i class="fa-solid fa-graduation-cap" aria-hidden="true"></i> เน้นเรียนรู้ &amp; อ่านเฉลยทันที</span>' +
      '<h3 class="text-lg font-semibold">โหมดฝึกทำ (ตรวจเฉลยละเอียดทีละข้อ)</h3>' +
      '<ul class="list-disc pl-5 text-sm text-muted space-y-1.5">' +
      '<li>เมื่อเลือกคำตอบในแต่ละข้อ ระบบจะตรวจถูก-ผิดพร้อมแสดง<strong>คำอธิบายทั้ง 4 ตัวเลือก (ก/ข/ค/ง)</strong> ทันที</li>' +
      '<li>ไม่บังคับตัดเวลา (แสดงเวลาฝึกทำสะสม) เหมาะกับการทบทวนเนื้อหาให้แน่น</li>' +
      '<li>สามารถข้ามข้อ ปักธง และกดส่งสรุปผลวิเคราะห์รายหัวข้อได้ทุกเมื่อ</li>' +
      '</ul>' +
      '</div>' +
      '<button type="button" class="btn btn-primary btn-lg w-full" data-exam-start="practice">' +
      '<i class="fa-solid fa-book-open-reader" aria-hidden="true"></i> เริ่มโหมดฝึกทำ (เฉลยทีละข้อ)' +
      '</button>' +
      '</article>' +
      // Real Exam Mode Card
      '<article class="card card-lg flex flex-col justify-between gap-4">' +
      '<div class="space-y-3">' +
      '<span class="badge-pill badge-accent"><i class="fa-solid fa-stopwatch" aria-hidden="true"></i> เสมือนสนามสอบจริง</span>' +
      '<h3 class="text-lg font-semibold">โหมดสอบจริง (จับเวลา ' +
      (exam.durationMinutes || 60) +
      ' นาที ส่งทีเดียว)</h3>' +
      '<ul class="list-disc pl-5 text-sm text-muted space-y-1.5">' +
      '<li>จับเวลาถอยหลัง <strong>' +
      (exam.durationMinutes || 60) +
      ':00 นาที</strong> และส่งข้อสอบอัตโนมัติเมื่อหมดเวลา</li>' +
      '<li>สามารถเปลี่ยนคำตอบไปมาระหว่างข้อ 1–' +
      questions.length +
      ' และปักธงข้อที่ไม่แน่ใจไว้กลับมาทวนได้</li>' +
      '<li>ตรวจคะแนน วิเคราะห์จุดอ่อน Core IT vs กรมที่ดิน และเปิดเฉลยทุกข้อหลังกดส่ง</li>' +
      '</ul>' +
      '</div>' +
      '<button type="button" class="btn btn-accent btn-lg w-full" data-exam-start="exam">' +
      '<i class="fa-solid fa-play" aria-hidden="true"></i> เริ่มโหมดสอบจริง (จับเวลา ' +
      (exam.durationMinutes || 60) +
      ' นาที)' +
      '</button>' +
      '</article>' +
      '</div>' +
      '</section>' +
      '<section class="card card-lg space-y-4" aria-labelledby="exam-history-heading">' +
      '<div class="flex flex-wrap items-center justify-between gap-2">' +
      '<h2 id="exam-history-heading" class="flex items-center gap-2">' +
      '<i class="fa-solid fa-clock-rotate-left text-primary-token" aria-hidden="true"></i>' +
      '<span>ประวัติผลการสอบที่ผ่านมา</span>' +
      '</h2>' +
      '<span class="badge-pill">' +
      history.length +
      ' ครั้ง</span>' +
      '</div>' +
      historyHtml +
      '</section>' +
      '</div>';

    var startBtns = containerEl.querySelectorAll('[data-exam-start]');
    for (var s = 0; s < startBtns.length; s += 1) {
      startBtns[s].addEventListener('click', function () {
        var chosenMode = this.getAttribute('data-exam-start') || 'exam';
        startExam(containerEl, exam, stateApi, chosenMode);
      });
    }

    var historyBtns = containerEl.querySelectorAll('[data-exam-view-history]');
    for (var h = 0; h < historyBtns.length; h += 1) {
      historyBtns[h].addEventListener('click', function () {
        var idx = Number(this.getAttribute('data-exam-view-history'));
        var entry = history[idx];
        if (!entry) return;
        localState.activeResult = entry;
        localState.phase = 'results';
        localState.reviewFilter = 'all';
        render(containerEl);
      });
    }
  }

  function startExam(containerEl, exam, stateApi, mode) {
    stopTimer();
    localState.phase = 'active';
    localState.mode = mode === 'practice' ? 'practice' : 'exam';
    localState.currentIndex = 0;
    localState.answers = {};
    localState.flagged = {};
    localState.startedAtMs = Date.now();
    localState.elapsedSeconds = 0;
    localState.durationLimitSeconds = (exam.durationMinutes || 60) * 60;
    localState.activeResult = null;
    localState.reviewFilter = 'all';

    render(containerEl);
    announce(
      localState.mode === 'exam'
        ? 'เริ่มการสอบจำลองโหมดจับเวลา ' + (exam.durationMinutes || 60) + ' นาที'
        : 'เริ่มข้อสอบจำลองโหมดฝึกทำ เฉลยทีละข้อ'
    );

    localState.timerId = global.setInterval(function () {
      if (localState.phase !== 'active' || !document.body.contains(containerEl)) {
        stopTimer();
        return;
      }
      localState.elapsedSeconds = Math.floor((Date.now() - localState.startedAtMs) / 1000);

      var timerEl = containerEl.querySelector('[data-exam-timer]');
      var timerText = containerEl.querySelector('[data-exam-timer-text]');
      if (localState.mode === 'exam') {
        var remaining = Math.max(0, localState.durationLimitSeconds - localState.elapsedSeconds);
        if (timerText) timerText.textContent = formatMMSS(remaining);
        if (timerEl) {
          timerEl.classList.toggle('is-urgent', remaining <= 300);
        }
        if (remaining <= 0) {
          stopTimer();
          finalizeExam(containerEl, exam, stateApi, true);
        }
      } else {
        if (timerText) timerText.textContent = formatMMSS(localState.elapsedSeconds);
      }
    }, 1000);
  }

  function finalizeExam(containerEl, exam, stateApi, autoSubmitted) {
    stopTimer();
    var questions = Array.isArray(exam.questions) ? exam.questions : [];
    var stats = computeExamStats(questions, localState.answers);
    var elapsed = Math.max(
      1,
      localState.mode === 'exam'
        ? Math.min(localState.durationLimitSeconds, Math.floor((Date.now() - localState.startedAtMs) / 1000))
        : Math.floor((Date.now() - localState.startedAtMs) / 1000)
    );

    var attemptPayload = {
      date: new Date().toISOString(),
      mode: localState.mode,
      score: stats.score,
      total: stats.total,
      percentage: stats.percentage,
      durationSeconds: elapsed,
      domainBreakdown: stats.domainBreakdown,
      topicBreakdown: stats.topicBreakdown,
      answers: Object.assign({}, localState.answers)
    };

    var savedEntry = stateApi ? stateApi.saveMockAttempt(attemptPayload) : attemptPayload;
    localState.activeResult = savedEntry || attemptPayload;
    localState.phase = 'results';
    localState.reviewFilter = 'all';

    render(containerEl);
    announce(
      (autoSubmitted ? 'หมดเวลาสอบ ระบบส่งคำตอบอัตโนมัติ ' : 'ส่งข้อสอบเรียบร้อย ') +
        'ได้คะแนน ' +
        stats.score +
        ' จาก ' +
        stats.total +
        ' ข้อ (' +
        stats.percentage +
        '%)'
    );
  }

  function renderActiveExam(containerEl, exam, stateApi) {
    var questions = Array.isArray(exam.questions) ? exam.questions : [];
    var total = questions.length;
    if (!total) {
      containerEl.innerHTML = '<div class="callout callout-warn">ไม่พบชุดคำถามข้อสอบจำลอง</div>';
      return;
    }

    if (localState.currentIndex >= total) localState.currentIndex = total - 1;
    if (localState.currentIndex < 0) localState.currentIndex = 0;

    var qIdx = localState.currentIndex;
    var q = questions[qIdx];
    var picked = localState.answers[qIdx];
    var isAnswered = typeof picked === 'number';
    var isFlagged = !!localState.flagged[qIdx];
    var isPracticeRevealed = localState.mode === 'practice' && isAnswered;

    var answeredCount = 0;
    var flaggedCount = 0;
    for (var i = 0; i < total; i += 1) {
      if (typeof localState.answers[i] === 'number') answeredCount += 1;
      if (localState.flagged[i]) flaggedCount += 1;
    }
    var progressPct = Math.round((answeredCount / total) * 100);

    var remaining = Math.max(0, localState.durationLimitSeconds - localState.elapsedSeconds);
    var isUrgent = localState.mode === 'exam' && remaining <= 300;
    var timerDisplay = localState.mode === 'exam' ? formatMMSS(remaining) : formatMMSS(localState.elapsedSeconds);

    // Navigator Grid 1..50
    var navButtonsHtml = questions
      .map(function (_, idx) {
        var ans = typeof localState.answers[idx] === 'number';
        var flg = !!localState.flagged[idx];
        var cur = idx === qIdx;
        var cls = 'exam-nav-btn';
        if (cur) cls += ' is-current';
        else if (ans) cls += ' is-answered';
        if (flg) cls += ' is-flagged';

        var label =
          'ข้อที่ ' +
          (idx + 1) +
          (cur ? ' (กำลังดู)' : ans ? ' (ตอบแล้ว)' : ' (ยังไม่ตอบ)') +
          (flg ? ' (ปักธง)' : '');

        return (
          '<button type="button" class="' +
          cls +
          '" data-exam-goto="' +
          idx +
          '" aria-label="' +
          escapeHtml(label) +
          '" aria-current="' +
          (cur ? 'step' : 'false') +
          '">' +
          (idx + 1) +
          (flg ? '★' : '') +
          '</button>'
        );
      })
      .join('');

    // Question options
    var opts = Array.isArray(q.options) ? q.options : [];
    var optionsHtml = opts
      .map(function (optText, optIdx) {
        var isSelected = picked === optIdx;
        var isRight = optIdx === q.correctIndex;
        var cls = 'quiz-option';
        if (isPracticeRevealed) {
          if (isRight) cls += ' is-correct';
          else if (isSelected && !isRight) cls += ' is-wrong';
        } else if (isSelected) {
          cls += ' is-selected';
        }

        return (
          '<button type="button" class="' +
          cls +
          '" data-exam-opt="' +
          optIdx +
          '" aria-pressed="' +
          (isSelected ? 'true' : 'false') +
          '"' +
          (isPracticeRevealed ? ' disabled' : '') +
          '>' +
          '<span class="quiz-option-letter">' +
          (THAI_LETTERS[optIdx] || String(optIdx + 1)) +
          '</span>' +
          '<span class="quiz-option-text">' +
          escapeHtml(optText) +
          '</span>' +
          '</button>'
        );
      })
      .join('');

    var unansweredCount = total - answeredCount;

    containerEl.innerHTML =
      '<div class="space-y-5" data-exam-active-root>' +
      '<h1 class="visually-hidden">' +
      escapeHtml(exam.title || 'ห้องสอบจำลอง 50 ข้อ') +
      '</h1>' +
      // Sticky Header Bar
      '<div class="exam-sticky-bar space-y-3">' +
      '<div class="flex flex-wrap items-center justify-between gap-3">' +
      '<div class="flex flex-wrap items-center gap-2">' +
      '<span class="badge-pill ' +
      (localState.mode === 'exam' ? 'badge-accent' : 'badge-primary') +
      '">' +
      (localState.mode === 'exam' ? 'โหมดสอบจริง (จับเวลา)' : 'โหมดฝึกทำ (เฉลยทีละข้อ)') +
      '</span>' +
      '<span class="text-sm font-semibold">ตอบแล้ว <span class="font-mono">' +
      answeredCount +
      '/' +
      total +
      '</span> ข้อ' +
      (flaggedCount ? ' • ปักธง <span class="font-mono text-accent-token">' + flaggedCount + '</span> ข้อ' : '') +
      '</span>' +
      '</div>' +
      '<div class="flex flex-wrap items-center gap-2">' +
      '<div class="exam-timer' +
      (isUrgent ? ' is-urgent' : '') +
      '" data-exam-timer role="timer" aria-label="' +
      (localState.mode === 'exam' ? 'เวลาสอบคงเหลือ' : 'เวลาฝึกทำสะสม') +
      '">' +
      '<i class="fa-regular fa-clock" aria-hidden="true"></i>' +
      '<span data-exam-timer-text>' +
      timerDisplay +
      '</span>' +
      '</div>' +
      '<button type="button" class="btn btn-primary btn-sm" data-exam-open-submit>' +
      '<i class="fa-solid fa-paper-plane" aria-hidden="true"></i> ส่งข้อสอบ' +
      '</button>' +
      '</div>' +
      '</div>' +
      '<div class="progress-track" role="progressbar" aria-label="ความคืบหน้าจำนวนข้อที่ตอบแล้ว" aria-valuenow="' +
      progressPct +
      '" aria-valuemin="0" aria-valuemax="100">' +
      '<div class="progress-fill" style="width: ' +
      progressPct +
      '%"></div>' +
      '</div>' +
      '</div>' +
      // Main 2-col layout: Current Question + Navigator Grid
      '<div class="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">' +
      '<div class="lg:col-span-8 space-y-4">' +
      '<article class="quiz-card space-y-4">' +
      '<div class="flex flex-wrap items-center justify-between gap-2">' +
      '<div class="quiz-card-header" style="margin-bottom:0;">' +
      '<span class="quiz-num-badge">ข้อที่ ' +
      (qIdx + 1) +
      ' / ' +
      total +
      '</span>' +
      '<span class="badge-pill ' +
      (q.domain === 'dol-domain' ? 'badge-accent' : 'badge-primary') +
      '">' +
      escapeHtml(getDomainLabel(q.domain)) +
      '</span>' +
      (q.topic ? '<span class="badge-pill">' + escapeHtml(q.topic) + '</span>' : '') +
      '</div>' +
      '<button type="button" class="btn btn-sm ' +
      (isFlagged ? 'btn-accent' : 'btn-secondary') +
      '" data-exam-flag aria-pressed="' +
      (isFlagged ? 'true' : 'false') +
      '">' +
      '<i class="fa-solid fa-flag" aria-hidden="true"></i> ' +
      (isFlagged ? 'ปักธงไว้แล้ว' : 'ปักธงทบทวน') +
      '</button>' +
      '</div>' +
      '<h2 class="quiz-question-text text-lg">' +
      escapeHtml(q.question) +
      '</h2>' +
      '<div class="quiz-options" role="group" aria-label="ตัวเลือกข้อที่ ' +
      (qIdx + 1) +
      '">' +
      optionsHtml +
      '</div>' +
      (isPracticeRevealed ? buildExplanationBlock(q, picked) : '') +
      '</article>' +
      '<div class="flex flex-wrap items-center justify-between gap-3">' +
      '<button type="button" class="btn btn-secondary" data-exam-prev' +
      (qIdx <= 0 ? ' disabled' : '') +
      '>' +
      '<i class="fa-solid fa-arrow-left" aria-hidden="true"></i> ข้อก่อนหน้า</button>' +
      '<div class="flex flex-wrap items-center gap-2">' +
      (unansweredCount > 0
        ? '<button type="button" class="btn btn-secondary btn-sm" data-exam-next-unanswered>' +
          '<i class="fa-solid fa-forward-step" aria-hidden="true"></i> ข้ามไปข้อที่ยังไม่ตอบ</button>'
        : '') +
      (qIdx < total - 1
        ? '<button type="button" class="btn btn-primary" data-exam-next>ข้อถัดไป <i class="fa-solid fa-arrow-right" aria-hidden="true"></i></button>'
        : '<button type="button" class="btn btn-accent" data-exam-open-submit><i class="fa-solid fa-paper-plane" aria-hidden="true"></i> ส่งข้อสอบทั้งหมด</button>') +
      '</div>' +
      '</div>' +
      '</div>' +
      // Navigator Sidebar
      '<aside class="lg:col-span-4 card space-y-3" aria-label="ตัวนำทางข้อสอบ 1 ถึง ' +
      total +
      '">' +
      '<div class="flex items-center justify-between gap-2">' +
      '<h2 class="text-base font-semibold">ผังข้อสอบ (1–' +
      total +
      ')</h2>' +
      '<button type="button" class="btn btn-ghost btn-sm" data-exam-abort>ออกจากรอบนี้</button>' +
      '</div>' +
      '<div class="flex flex-wrap gap-2 text-xs text-muted">' +
      '<span><span class="badge-pill badge-primary">สีเขียว</span> ตอบแล้ว</span>' +
      '<span><span class="badge-pill badge-accent">★ ขอบส้ม</span> ปักธง</span>' +
      '</div>' +
      '<div class="exam-nav-grid">' +
      navButtonsHtml +
      '</div>' +
      '</aside>' +
      '</div>' +
      // Submit Confirmation Native Dialog
      '<dialog id="mock-submit-dialog" class="gov-dialog" aria-labelledby="mock-submit-title">' +
      '<div class="gov-dialog-inner">' +
      '<div class="gov-dialog-header">' +
      '<h2 id="mock-submit-title" class="text-lg font-semibold flex items-center gap-2">' +
      '<i class="fa-solid fa-paper-plane text-primary-token" aria-hidden="true"></i>' +
      '<span>ยืนยันการส่งข้อสอบจำลอง</span>' +
      '</h2>' +
      '<button type="button" class="btn btn-ghost btn-sm" data-mock-dialog-close aria-label="ปิดหน้าต่าง">' +
      '<i class="fa-solid fa-xmark" aria-hidden="true"></i>' +
      '</button>' +
      '</div>' +
      '<div class="space-y-2 text-sm">' +
      '<p>คุณตอบคำถามไปแล้ว <strong>' +
      answeredCount +
      ' / ' +
      total +
      ' ข้อ</strong></p>' +
      (unansweredCount > 0
        ? '<p class="text-accent-token font-semibold"><i class="fa-solid fa-triangle-exclamation" aria-hidden="true"></i> ยังมีข้อที่ไม่ได้เลือกคำตอบอีก ' +
          unansweredCount +
          ' ข้อ</p>'
        : '<p class="text-primary-token font-semibold"><i class="fa-solid fa-circle-check" aria-hidden="true"></i> ตอบครบทั้ง ' +
          total +
          ' ข้อเรียบร้อยแล้ว</p>') +
      (flaggedCount > 0
        ? '<p class="text-muted">มีข้อที่ปักธงทบทวนค้างไว้ ' + flaggedCount + ' ข้อ</p>'
        : '') +
      '</div>' +
      '<div class="gov-dialog-actions">' +
      '<button type="button" class="btn btn-secondary" data-mock-dialog-close>กลับไปทบทวนต่อ</button>' +
      '<button type="button" class="btn btn-primary" data-exam-confirm-submit>' +
      '<i class="fa-solid fa-check" aria-hidden="true"></i> ยืนยันส่งคำตอบและตรวจคะแนน</button>' +
      '</div>' +
      '</div>' +
      '</dialog>' +
      '</div>';

    bindActiveExamEvents(containerEl, exam, stateApi, questions);
  }

  function bindActiveExamEvents(containerEl, exam, stateApi, questions) {
    var total = questions.length;

    var optBtns = containerEl.querySelectorAll('[data-exam-opt]');
    for (var o = 0; o < optBtns.length; o += 1) {
      optBtns[o].addEventListener('click', function () {
        var optIdx = Number(this.getAttribute('data-exam-opt'));
        if (localState.mode === 'practice' && typeof localState.answers[localState.currentIndex] === 'number') {
          return;
        }
        localState.answers[localState.currentIndex] = optIdx;
        render(containerEl);
        var focusTarget = containerEl.querySelector('[data-exam-opt="' + optIdx + '"]');
        if (focusTarget && !focusTarget.disabled) focusTarget.focus();
      });
    }

    var gotoBtns = containerEl.querySelectorAll('[data-exam-goto]');
    for (var g = 0; g < gotoBtns.length; g += 1) {
      gotoBtns[g].addEventListener('click', function () {
        localState.currentIndex = Number(this.getAttribute('data-exam-goto'));
        render(containerEl);
      });
    }

    var prevBtn = containerEl.querySelector('[data-exam-prev]');
    if (prevBtn) {
      prevBtn.addEventListener('click', function () {
        if (localState.currentIndex > 0) {
          localState.currentIndex -= 1;
          render(containerEl);
        }
      });
    }

    var nextBtn = containerEl.querySelector('[data-exam-next]');
    if (nextBtn) {
      nextBtn.addEventListener('click', function () {
        if (localState.currentIndex < total - 1) {
          localState.currentIndex += 1;
          render(containerEl);
        }
      });
    }

    var nextUnansBtn = containerEl.querySelector('[data-exam-next-unanswered]');
    if (nextUnansBtn) {
      nextUnansBtn.addEventListener('click', function () {
        for (var offset = 1; offset <= total; offset += 1) {
          var cand = (localState.currentIndex + offset) % total;
          if (typeof localState.answers[cand] !== 'number') {
            localState.currentIndex = cand;
            render(containerEl);
            return;
          }
        }
      });
    }

    var flagBtn = containerEl.querySelector('[data-exam-flag]');
    if (flagBtn) {
      flagBtn.addEventListener('click', function () {
        localState.flagged[localState.currentIndex] = !localState.flagged[localState.currentIndex];
        render(containerEl);
      });
    }

    var abortBtn = containerEl.querySelector('[data-exam-abort]');
    if (abortBtn) {
      abortBtn.addEventListener('click', function () {
        stopTimer();
        localState.phase = 'start';
        render(containerEl);
      });
    }

    var dialog = containerEl.querySelector('#mock-submit-dialog');
    var openSubmitBtns = containerEl.querySelectorAll('[data-exam-open-submit]');
    for (var s = 0; s < openSubmitBtns.length; s += 1) {
      openSubmitBtns[s].addEventListener('click', function () {
        if (dialog && typeof dialog.showModal === 'function') {
          if (!dialog.open) dialog.showModal();
        } else {
          finalizeExam(containerEl, exam, stateApi, false);
        }
      });
    }

    if (dialog) {
      dialog.addEventListener('click', function (ev) {
        var closeBtn = ev.target && ev.target.closest ? ev.target.closest('[data-mock-dialog-close]') : null;
        if (closeBtn || ev.target === dialog) {
          if (typeof dialog.close === 'function') dialog.close();
        }
      });
    }

    var confirmBtn = containerEl.querySelector('[data-exam-confirm-submit]');
    if (confirmBtn) {
      confirmBtn.addEventListener('click', function () {
        if (dialog && typeof dialog.close === 'function') dialog.close();
        finalizeExam(containerEl, exam, stateApi, false);
      });
    }
  }

  function renderResultsScreen(containerEl, exam, stateApi) {
    var questions = Array.isArray(exam.questions) ? exam.questions : [];
    var result = localState.activeResult;
    if (!result) {
      localState.phase = 'start';
      render(containerEl);
      return;
    }

    var answers = result.answers || {};
    var computed = computeExamStats(questions, answers);
    var domainBreakdown = result.domainBreakdown && Object.keys(result.domainBreakdown).length
      ? result.domainBreakdown
      : computed.domainBreakdown;
    var topicBreakdown = result.topicBreakdown && Object.keys(result.topicBreakdown).length
      ? result.topicBreakdown
      : computed.topicBreakdown;

    var passed = (result.percentage || 0) >= 60;

    // Domain cards
    var domainKeys = Object.keys(domainBreakdown);
    var domainCardsHtml = domainKeys
      .map(function (domKey) {
        var d = domainBreakdown[domKey];
        var pct = d.total > 0 ? Math.round((d.score / d.total) * 100) : 0;
        var isDol = domKey === 'dol-domain';
        return (
          '<div class="card space-y-3">' +
          '<div class="flex items-center justify-between gap-2">' +
          '<span class="badge-pill ' +
          (isDol ? 'badge-accent' : 'badge-primary') +
          '">' +
          escapeHtml(d.label || getDomainLabel(domKey)) +
          '</span>' +
          '<span class="font-mono font-semibold">' +
          d.score +
          ' / ' +
          d.total +
          ' ข้อ (' +
          pct +
          '%)</span>' +
          '</div>' +
          '<div class="progress-track" role="progressbar" aria-label="ผลคะแนน' +
          escapeHtml(d.label || domKey) +
          '" aria-valuenow="' +
          pct +
          '" aria-valuemin="0" aria-valuemax="100">' +
          '<div class="progress-fill ' +
          (isDol ? 'is-accent' : '') +
          '" style="width: ' +
          pct +
          '%"></div>' +
          '</div>' +
          '</div>'
        );
      })
      .join('');

    // Topic Breakdown Table
    var topicKeys = Object.keys(topicBreakdown);
    var topicRowsHtml = topicKeys
      .map(function (key) {
        var t = topicBreakdown[key];
        var pct = t.total > 0 ? Math.round((t.score / t.total) * 100) : 0;
        var weak = pct < 60;
        return (
          '<tr>' +
          '<th scope="row">' +
          escapeHtml(t.topic || key) +
          '</th>' +
          '<td><span class="badge-pill ' +
          (t.domain === 'dol-domain' ? 'badge-accent' : 'badge-primary') +
          '">' +
          (t.domain === 'dol-domain' ? 'กรมที่ดิน' : 'Core IT') +
          '</span></td>' +
          '<td class="font-mono">' +
          t.score +
          ' / ' +
          t.total +
          '</td>' +
          '<td style="min-width: 150px;">' +
          '<div class="flex items-center gap-2">' +
          '<div class="progress-track flex-1"><div class="progress-fill ' +
          (weak ? 'is-accent' : '') +
          '" style="width: ' +
          pct +
          '%"></div></div>' +
          '<span class="font-mono text-xs font-semibold">' +
          pct +
          '%</span>' +
          '</div>' +
          '</td>' +
          '<td><span class="badge-pill ' +
          (weak ? 'badge-danger' : 'badge-success') +
          '">' +
          (weak ? 'ควรทบทวน' : 'แม่นยำดี') +
          '</span></td>' +
          '</tr>'
        );
      })
      .join('');

    // Count wrong & domain questions for filter tabs
    var wrongCount = 0;
    var coreCount = 0;
    var dolCount = 0;
    for (var i = 0; i < questions.length; i += 1) {
      if (answers[i] !== questions[i].correctIndex) wrongCount += 1;
      if (questions[i].domain === 'dol-domain') dolCount += 1;
      else coreCount += 1;
    }

    var filterDefs = [
      { id: 'all', label: 'ทั้งหมด (' + questions.length + ')' },
      { id: 'wrong', label: 'เฉพาะข้อที่ผิด / ไม่ตอบ (' + wrongCount + ')' },
      { id: 'core-it', label: 'วิชาการคอมพิวเตอร์ (' + coreCount + ')' },
      { id: 'dol-domain', label: 'เฉพาะทางกรมที่ดิน (' + dolCount + ')' }
    ];

    var filterTabsHtml = filterDefs
      .map(function (f) {
        var active = localState.reviewFilter === f.id;
        return (
          '<button type="button" class="tab-btn' +
          (active ? ' is-active' : '') +
          '" data-review-filter="' +
          f.id +
          '" aria-pressed="' +
          (active ? 'true' : 'false') +
          '">' +
          escapeHtml(f.label) +
          '</button>'
        );
      })
      .join('');

    var filteredIndices = [];
    for (var idx = 0; idx < questions.length; idx += 1) {
      var q = questions[idx];
      if (localState.reviewFilter === 'wrong' && answers[idx] === q.correctIndex) continue;
      if (localState.reviewFilter === 'core-it' && q.domain !== 'core-it') continue;
      if (localState.reviewFilter === 'dol-domain' && q.domain !== 'dol-domain') continue;
      filteredIndices.push(idx);
    }

    var reviewCardsHtml = '';
    if (!filteredIndices.length) {
      reviewCardsHtml =
        '<div class="callout callout-tip">' +
        '<div class="callout-title"><i class="fa-solid fa-award" aria-hidden="true"></i> ไม่มีข้อผิดในตัวกรองนี้!</div>' +
        '<p class="text-sm">คุณตอบถูกครบทุกข้อในหมวดที่เลือก หรือสามารถสลับดูตัวกรอง "ทั้งหมด" ได้</p>' +
        '</div>';
    } else {
      reviewCardsHtml = filteredIndices
        .map(function (qIdx) {
          var q = questions[qIdx];
          var picked = answers[qIdx];
          var opts = Array.isArray(q.options) ? q.options : [];
          var optsHtml = opts
            .map(function (optText, optIdx) {
              var isRight = optIdx === q.correctIndex;
              var isPickedWrong = optIdx === picked && !isRight;
              var cls = 'quiz-option';
              if (isRight) cls += ' is-correct';
              else if (isPickedWrong) cls += ' is-wrong';
              return (
                '<div class="' +
                cls +
                '">' +
                '<span class="quiz-option-letter">' +
                (THAI_LETTERS[optIdx] || String(optIdx + 1)) +
                '</span>' +
                '<span class="quiz-option-text">' +
                escapeHtml(optText) +
                '</span>' +
                '</div>'
              );
            })
            .join('');

          return (
            '<article class="quiz-card space-y-3">' +
            '<div class="quiz-card-header">' +
            '<span class="quiz-num-badge">ข้อที่ ' +
            (qIdx + 1) +
            '</span>' +
            '<span class="badge-pill ' +
            (q.domain === 'dol-domain' ? 'badge-accent' : 'badge-primary') +
            '">' +
            escapeHtml(getDomainLabel(q.domain)) +
            '</span>' +
            (q.topic ? '<span class="badge-pill">' + escapeHtml(q.topic) + '</span>' : '') +
            '</div>' +
            '<h3 class="quiz-question-text">' +
            escapeHtml(q.question) +
            '</h3>' +
            '<div class="quiz-options">' +
            optsHtml +
            '</div>' +
            buildExplanationBlock(q, picked) +
            '</article>'
          );
        })
        .join('');
    }

    containerEl.innerHTML =
      '<div class="space-y-6">' +
      // Overall Result Banner
      '<header class="hero-card cadastral-grid space-y-4">' +
      '<div class="flex flex-wrap items-center justify-between gap-3">' +
      '<div class="flex flex-wrap items-center gap-2">' +
      '<span class="badge-pill ' +
      (passed ? 'badge-success' : 'badge-accent') +
      '">' +
      '<i class="fa-solid ' +
      (passed ? 'fa-circle-check' : 'fa-rotate') +
      '" aria-hidden="true"></i> ' +
      (passed ? 'ผ่านเกณฑ์สอบมาตรฐาน (>= 60%)' : 'ยังไม่ถึงเกณฑ์ 60% — แนะนำทบทวนข้อที่พลาด') +
      '</span>' +
      '<span class="badge-pill">' +
      (result.mode === 'exam' ? 'โหมดสอบจริง' : 'โหมดฝึกทำ') +
      ' • เวลาที่ใช้ ' +
      escapeHtml(formatThaiDuration(result.durationSeconds || 0)) +
      '</span>' +
      '</div>' +
      '<div class="flex flex-wrap gap-2">' +
      '<button type="button" class="btn btn-secondary btn-sm" data-exam-back-start>' +
      '<i class="fa-solid fa-house" aria-hidden="true"></i> กลับหน้าเริ่มสอบ</button>' +
      '<button type="button" class="btn btn-primary btn-sm" data-exam-retake="' +
      escapeHtml(result.mode || 'exam') +
      '"><i class="fa-solid fa-rotate-right" aria-hidden="true"></i> สอบใหม่อีกครั้ง</button>' +
      '</div>' +
      '</div>' +
      '<div class="flex flex-wrap items-baseline gap-4">' +
      '<h1>ผลการประเมินข้อสอบจำลอง: <span class="font-mono text-primary-token">' +
      result.score +
      ' / ' +
      result.total +
      '</span> คะแนน (' +
      result.percentage +
      '%)</h1>' +
      '</div>' +
      '<div class="progress-track" role="progressbar" aria-label="คะแนนรวมร้อยละ" aria-valuenow="' +
      result.percentage +
      '" aria-valuemin="0" aria-valuemax="100">' +
      '<div class="progress-fill ' +
      (passed ? '' : 'is-accent') +
      '" style="width: ' +
      result.percentage +
      '%"></div>' +
      '</div>' +
      '</header>' +
      // Domain Breakdown
      '<section class="space-y-3" aria-labelledby="res-domain-heading">' +
      '<h2 id="res-domain-heading">สรุปคะแนนแยกตามหมวดวิชา</h2>' +
      '<div class="grid grid-cols-1 md:grid-cols-2 gap-4">' +
      domainCardsHtml +
      '</div>' +
      '</section>' +
      // Topic Breakdown Table
      '<section class="card card-lg space-y-4" aria-labelledby="res-topic-heading">' +
      '<h2 id="res-topic-heading">วิเคราะห์จุดแข็ง-จุดอ่อนรายหัวข้อ</h2>' +
      '<div class="table-wrap">' +
      '<table class="data-table">' +
      '<caption class="visually-hidden">ตารางวิเคราะห์ผลคะแนนข้อสอบจำลองแยกตามหัวข้อ</caption>' +
      '<thead><tr>' +
      '<th scope="col">หัวข้อเนื้อหา</th>' +
      '<th scope="col">หมวด</th>' +
      '<th scope="col">คะแนน</th>' +
      '<th scope="col">ความแม่นยำ</th>' +
      '<th scope="col">ข้อแนะนำ</th>' +
      '</tr></thead>' +
      '<tbody>' +
      topicRowsHtml +
      '</tbody>' +
      '</table>' +
      '</div>' +
      '</section>' +
      // Filterable Question Review
      '<section class="space-y-4" aria-labelledby="res-review-heading">' +
      '<div class="flex flex-wrap items-center justify-between gap-3">' +
      '<h2 id="res-review-heading">เฉลยละเอียดครบทั้ง 4 ตัวเลือก (ก/ข/ค/ง)</h2>' +
      '<div class="tab-group" role="group" aria-label="ตัวกรองเฉลยข้อสอบ">' +
      filterTabsHtml +
      '</div>' +
      '</div>' +
      '<div class="quiz-list">' +
      reviewCardsHtml +
      '</div>' +
      '</section>' +
      '</div>';

    var filterBtns = containerEl.querySelectorAll('[data-review-filter]');
    for (var f = 0; f < filterBtns.length; f += 1) {
      filterBtns[f].addEventListener('click', function () {
        localState.reviewFilter = this.getAttribute('data-review-filter') || 'all';
        render(containerEl);
      });
    }

    var backBtn = containerEl.querySelector('[data-exam-back-start]');
    if (backBtn) {
      backBtn.addEventListener('click', function () {
        localState.phase = 'start';
        render(containerEl);
      });
    }

    var retakeBtn = containerEl.querySelector('[data-exam-retake]');
    if (retakeBtn) {
      retakeBtn.addEventListener('click', function () {
        var mode = this.getAttribute('data-exam-retake') || 'exam';
        startExam(containerEl, exam, stateApi, mode);
      });
    }
  }

  function render(containerEl) {
    if (!containerEl) return;

    var registry = global.GOV_PREP || {};
    var exam = registry.mockExam;
    var stateApi = registry.state;

    if (!exam || !Array.isArray(exam.questions) || !exam.questions.length) {
      containerEl.innerHTML =
        '<div class="card space-y-3">' +
        '<h1>ข้อสอบจำลองเสมือนจริง</h1>' +
        '<div class="callout callout-warn">ยังไม่มีข้อมูลข้อสอบจำลองในระบบ</div>' +
        '</div>';
      return;
    }

    if (localState.phase === 'results' && stateApi && stateApi.getMockHistory().length === 0) {
      localState.phase = 'start';
      localState.activeResult = null;
    }

    if (localState.phase === 'active') {
      renderActiveExam(containerEl, exam, stateApi);
    } else if (localState.phase === 'results') {
      renderResultsScreen(containerEl, exam, stateApi);
    } else {
      renderStartScreen(containerEl, exam, stateApi);
    }
  }

  global.GOV_PREP = global.GOV_PREP || {};
  global.GOV_PREP.views = global.GOV_PREP.views || {};
  global.GOV_PREP.views.mockExam = {
    render: render
  };
})(window);
