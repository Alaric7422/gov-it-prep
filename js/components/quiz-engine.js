/**
 * Quiz Engine component for Gov IT Prep.
 * Supports practice mode (immediate feedback + ก/ข/ค/ง per-option explanations),
 * exam mode (deferred grading), and review mode.
 */
(function (global) {
  'use strict';

  var THAI_LETTERS = ['ก', 'ข', 'ค', 'ง'];

  function escapeHtml(str) {
    return String(str === undefined || str === null ? '' : str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function cloneAnswers(answers) {
    var out = {};
    if (!answers || typeof answers !== 'object') return out;
    var keys = Object.keys(answers);
    for (var i = 0; i < keys.length; i += 1) {
      var val = answers[keys[i]];
      if (typeof val === 'number' && !isNaN(val)) {
        out[keys[i]] = val;
      }
    }
    return out;
  }

  function computeSummary(questions, answers) {
    var total = questions.length;
    var answeredCount = 0;
    var score = 0;
    for (var i = 0; i < total; i += 1) {
      var selected = answers[i];
      if (typeof selected === 'number') {
        answeredCount += 1;
        if (selected === questions[i].correctIndex) {
          score += 1;
        }
      }
    }
    var percentage = total > 0 ? Math.round((score / total) * 100) : 0;
    return {
      score: score,
      total: total,
      answeredCount: answeredCount,
      percentage: percentage
    };
  }

  function buildExplanationHtml(q, selectedIndex) {
    var exp = q.explanation || {};
    var summary = exp.summary || '';
    var perOption = Array.isArray(exp.perOption) ? exp.perOption : [];
    var isCorrect = selectedIndex === q.correctIndex;
    var isUnanswered = typeof selectedIndex !== 'number';

    var statusHtml = isUnanswered
      ? '<span class="quiz-feedback-badge is-unanswered"><i class="fa-solid fa-circle-minus" aria-hidden="true"></i> ไม่ได้เลือกคำตอบ</span>'
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
        var itemCls = isRightOpt
          ? 'quiz-per-option-item is-right'
          : isPickedWrong
          ? 'quiz-per-option-item is-picked-wrong'
          : 'quiz-per-option-item';
        var itemText = String(perOption[j] || '');
        var prefixRegex = new RegExp('^\\s*' + THAI_LETTERS[j] + '\\.?\\s*');
        var hasPrefix = prefixRegex.test(itemText);
        var labelPrefix = hasPrefix ? '' : THAI_LETTERS[j] + '. ';
        perOptionHtml +=
          '<li class="' +
          itemCls +
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

  function renderQuiz(containerEl, config) {
    if (!containerEl) return;
    var cfg = config || {};
    var questions = Array.isArray(cfg.questions) ? cfg.questions : [];
    var mode = cfg.mode || 'practice';
    var showAnswersImmediately =
      typeof cfg.showAnswersImmediately === 'boolean'
        ? cfg.showAnswersImmediately
        : mode === 'practice';
    var isReviewOnly = mode === 'review' || !!cfg.revealAll;
    var allowReset = cfg.allowReset !== false;
    var headingTag = cfg.headingTag === 'h2' || cfg.headingTag === 'h4' ? cfg.headingTag : 'h3';
    var showSubmitButton =
      typeof cfg.showSubmitButton === 'boolean'
        ? cfg.showSubmitButton
        : !showAnswersImmediately && !isReviewOnly && questions.length > 1;

    var answers = cloneAnswers(cfg.savedAnswers);
    var isSubmitted = isReviewOnly;
    var completionEmitted = false;

    if (!questions.length) {
      containerEl.innerHTML =
        '<div class="callout callout-info">ยังไม่มีคำถามสำหรับแบบทดสอบชุดนี้</div>';
      return;
    }

    function render() {
      var stats = computeSummary(questions, answers);
      var showScoreboard = showAnswersImmediately || isSubmitted;

      var html = '<div class="quiz-engine" data-quiz-id="' + escapeHtml(cfg.quizId || '') + '">';

      // Summary bar
      html += '<div class="quiz-toolbar">';
      html += '<div class="quiz-progress-text">';
      if (showScoreboard) {
        html +=
          '<i class="fa-solid fa-chart-simple" aria-hidden="true"></i> ' +
          'ตอบแล้ว <strong>' +
          stats.answeredCount +
          '/' +
          stats.total +
          '</strong> ข้อ • ถูกต้อง <strong>' +
          stats.score +
          '</strong> ข้อ (' +
          stats.percentage +
          '%)';
      } else {
        html +=
          '<i class="fa-solid fa-list-check" aria-hidden="true"></i> ' +
          'เลือกคำตอบแล้ว <strong>' +
          stats.answeredCount +
          '/' +
          stats.total +
          '</strong> ข้อ';
      }
      html += '</div>';

      if (allowReset && !isReviewOnly && stats.answeredCount > 0) {
        html +=
          '<button type="button" class="btn btn-secondary btn-sm" data-quiz-reset>' +
          '<i class="fa-solid fa-rotate-left" aria-hidden="true"></i> ทำชุดนี้ใหม่' +
          '</button>';
      }
      html += '</div>';

      // Question list
      html += '<div class="quiz-list">';
      for (var i = 0; i < questions.length; i += 1) {
        var q = questions[i];
        var selected = answers[i];
        var hasAnswered = typeof selected === 'number';
        var revealThis = isSubmitted || (showAnswersImmediately && hasAnswered);

        html += '<article class="quiz-card" data-question-index="' + i + '">';
        html += '<div class="quiz-card-header">';
        html += '<span class="quiz-num-badge">ข้อที่ ' + (i + 1) + '</span>';
        if (q.topic) {
          html += '<span class="badge-pill">' + escapeHtml(q.topic) + '</span>';
        }
        html += '</div>';
        html += '<' + headingTag + ' class="quiz-question-text">' + escapeHtml(q.question) + '</' + headingTag + '>';

        html += '<div class="quiz-options" role="group" aria-label="ตัวเลือกข้อที่ ' + (i + 1) + '">';
        var opts = Array.isArray(q.options) ? q.options : [];
        for (var optIdx = 0; optIdx < opts.length; optIdx += 1) {
          var isSelected = selected === optIdx;
          var isRight = optIdx === q.correctIndex;
          var btnCls = 'quiz-option';
          if (revealThis) {
            if (isRight) btnCls += ' is-correct';
            else if (isSelected && !isRight) btnCls += ' is-wrong';
          } else if (isSelected) {
            btnCls += ' is-selected';
          }

          var disabledAttr = revealThis ? ' disabled' : '';
          var pressedAttr = isSelected ? 'true' : 'false';

          html +=
            '<button type="button" class="' +
            btnCls +
            '" data-q-index="' +
            i +
            '" data-opt-index="' +
            optIdx +
            '" aria-pressed="' +
            pressedAttr +
            '"' +
            disabledAttr +
            '>' +
            '<span class="quiz-option-letter">' +
            (THAI_LETTERS[optIdx] || String(optIdx + 1)) +
            '</span>' +
            '<span class="quiz-option-text">' +
            escapeHtml(opts[optIdx]) +
            '</span>' +
            '</button>';
        }
        html += '</div>';

        if (revealThis) {
          html += buildExplanationHtml(q, selected);
        }

        html += '</article>';
      }
      html += '</div>';

      if (showSubmitButton && !isSubmitted) {
        html +=
          '<div class="quiz-submit-bar">' +
          '<button type="button" class="btn btn-primary" data-quiz-submit>' +
          '<i class="fa-solid fa-paper-plane" aria-hidden="true"></i> ส่งคำตอบและตรวจคะแนน' +
          '</button>' +
          '</div>';
      }

      if ((showAnswersImmediately && stats.answeredCount === stats.total) || isSubmitted) {
        var passed = stats.percentage >= 60;
        html +=
          '<div class="quiz-final-banner ' +
          (passed ? 'is-pass' : 'is-review') +
          '">' +
          '<div>' +
          '<strong>' +
          (passed ? 'เยี่ยมมาก! ผ่านเกณฑ์ 60% แล้ว' : 'ทบทวนจุดที่พลาดแล้วลองใหม่อีกครั้งนะ') +
          '</strong>' +
          '<p>คะแนนรวม ' +
          stats.score +
          ' / ' +
          stats.total +
          ' ข้อ (' +
          stats.percentage +
          '%)</p>' +
          '</div>' +
          '</div>';
      }

      html += '</div>';
      containerEl.innerHTML = html;
    }

    function handleOptionClick(btn) {
      var qIdx = Number(btn.getAttribute('data-q-index'));
      var optIdx = Number(btn.getAttribute('data-opt-index'));
      if (isNaN(qIdx) || isNaN(optIdx) || !questions[qIdx]) return;
      if (isSubmitted) return;
      if (showAnswersImmediately && typeof answers[qIdx] === 'number') return;

      answers[qIdx] = optIdx;
      var isCorrect = optIdx === questions[qIdx].correctIndex;
      var answersSnapshot = cloneAnswers(answers);

      render();

      // Restore focus gracefully to the same question card after DOM update
      var updatedCard = containerEl.querySelector('[data-question-index="' + qIdx + '"]');
      if (updatedCard) {
        var targetBtn = updatedCard.querySelector('[data-opt-index="' + optIdx + '"]');
        if (targetBtn && !targetBtn.disabled) {
          targetBtn.focus();
        }
      }

      if (typeof cfg.onAnswer === 'function') {
        cfg.onAnswer(qIdx, optIdx, isCorrect, answersSnapshot);
      }

      var stats = computeSummary(questions, answersSnapshot);
      if (showAnswersImmediately && stats.answeredCount === stats.total && !completionEmitted) {
        completionEmitted = true;
        if (typeof cfg.onComplete === 'function') {
          cfg.onComplete({
            score: stats.score,
            total: stats.total,
            percentage: stats.percentage,
            answers: answersSnapshot
          });
        }
      }
    }

    function handleReset() {
      answers = {};
      isSubmitted = false;
      completionEmitted = false;
      render();
      if (typeof cfg.onComplete === 'function' && showAnswersImmediately) {
        cfg.onComplete({
          score: 0,
          total: questions.length,
          percentage: 0,
          answers: {}
        });
      }
    }

    function handleSubmit() {
      isSubmitted = true;
      render();
      var stats = computeSummary(questions, answers);
      if (typeof cfg.onComplete === 'function') {
        cfg.onComplete({
          score: stats.score,
          total: stats.total,
          percentage: stats.percentage,
          answers: cloneAnswers(answers)
        });
      }
    }

    // Remove previous delegated handler if re-rendered into same container
    if (containerEl._govQuizHandler) {
      containerEl.removeEventListener('click', containerEl._govQuizHandler);
    }

    containerEl._govQuizHandler = function (ev) {
      var target = ev.target && ev.target.closest ? ev.target.closest('button') : null;
      if (!target || !containerEl.contains(target)) return;

      if (target.hasAttribute('data-opt-index')) {
        handleOptionClick(target);
      } else if (target.hasAttribute('data-quiz-reset')) {
        handleReset();
      } else if (target.hasAttribute('data-quiz-submit')) {
        handleSubmit();
      }
    };

    containerEl.addEventListener('click', containerEl._govQuizHandler);
    render();
  }

  var quizEngineApi = {
    renderQuiz: renderQuiz,
    THAI_LETTERS: THAI_LETTERS
  };

  global.GOV_PREP = global.GOV_PREP || {};
  global.GOV_PREP.quizEngine = quizEngineApi;
  global.GOV_PREP.components = global.GOV_PREP.components || {};
  global.GOV_PREP.components.quizEngine = quizEngineApi;
})(window);
