/**
 * Persistent state and theme management for Gov IT Prep.
 * Stores learning progress under 'gov_it_prep_v1' and theme override under 'gov_it_prep_theme'.
 */
(function (global) {
  'use strict';

  var STORAGE_KEY = 'gov_it_prep_v1';
  var THEME_KEY = 'gov_it_prep_theme';

  var memoryFallback = null;
  var themeMediaQuery = null;
  var listenersBound = false;

  function createDefaultState() {
    return {
      completedLessons: [],
      quizResults: {},
      mockHistory: [],
      flashcardStatus: {},
      lastRoute: 'dashboard'
    };
  }

  function safeReadStorage(key) {
    try {
      return global.localStorage ? global.localStorage.getItem(key) : null;
    } catch (e) {
      return null;
    }
  }

  function safeWriteStorage(key, value) {
    try {
      if (global.localStorage) {
        global.localStorage.setItem(key, value);
        return true;
      }
    } catch (e) {
      return false;
    }
    return false;
  }

  function safeRemoveStorage(key) {
    try {
      if (global.localStorage) {
        global.localStorage.removeItem(key);
        return true;
      }
    } catch (e) {
      return false;
    }
    return false;
  }

  function loadState() {
    var base = createDefaultState();
    var raw = safeReadStorage(STORAGE_KEY);
    if (!raw) {
      memoryFallback = base;
      return base;
    }
    try {
      var parsed = JSON.parse(raw);
      if (parsed && typeof parsed === 'object') {
        base.completedLessons = Array.isArray(parsed.completedLessons) ? parsed.completedLessons : [];
        base.quizResults = parsed.quizResults && typeof parsed.quizResults === 'object' ? parsed.quizResults : {};
        base.mockHistory = Array.isArray(parsed.mockHistory) ? parsed.mockHistory : [];
        base.flashcardStatus = parsed.flashcardStatus && typeof parsed.flashcardStatus === 'object' ? parsed.flashcardStatus : {};
        base.lastRoute = typeof parsed.lastRoute === 'string' && parsed.lastRoute ? parsed.lastRoute : 'dashboard';
      }
    } catch (e) {
      // Keep default state on corrupted JSON
    }
    memoryFallback = base;
    return base;
  }

  var stateData = loadState();

  function persistState() {
    memoryFallback = stateData;
    safeWriteStorage(STORAGE_KEY, JSON.stringify(stateData));
  }

  function getOsTheme() {
    if (global.matchMedia) {
      return global.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'light';
  }

  function getSavedThemeOverride() {
    var saved = safeReadStorage(THEME_KEY);
    return saved === 'light' || saved === 'dark' ? saved : null;
  }

  function getEffectiveTheme() {
    return getSavedThemeOverride() || getOsTheme();
  }

  function updateThemeToggleButtonUI() {
    var btn = document.getElementById('theme-toggle-btn');
    if (!btn) return;
    var effective = getEffectiveTheme();
    var override = getSavedThemeOverride();
    var icon = btn.querySelector('[data-theme-icon]');
    var text = btn.querySelector('[data-theme-label]');

    var isDark = effective === 'dark';
    btn.setAttribute('aria-pressed', isDark ? 'true' : 'false');
    btn.setAttribute(
      'aria-label',
      isDark
        ? 'สลับเป็นโหมดสว่าง (' + (override ? 'กำหนดเอง' : 'ตามระบบ') + ')'
        : 'สลับเป็นโหมดมืด (' + (override ? 'กำหนดเอง' : 'ตามระบบ') + ')'
    );
    btn.title = override
      ? 'โหมด' + (isDark ? 'มืด' : 'สว่าง') + ' (กดเพื่อกลับไปใช้ค่าตามระบบ)'
      : 'ตามระบบ (' + (isDark ? 'มืด' : 'สว่าง') + ' • กดเพื่อสลับโหมด)';

    if (icon) {
      icon.className = isDark ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
    }
    if (text) {
      text.textContent = isDark ? 'โหมดสว่าง' : 'โหมดมืด';
    }
  }

  function applyThemeToDocument(triggerMermaid) {
    var override = getSavedThemeOverride();
    var effective = override || getOsTheme();
    var root = document.documentElement;
    var meta = document.querySelector('meta[name="color-scheme"]');

    root.classList.remove('theme-light', 'theme-dark', 'dark');
    if (override === 'dark') {
      root.classList.add('theme-dark', 'dark');
      if (meta) meta.setAttribute('content', 'dark');
    } else if (override === 'light') {
      root.classList.add('theme-light');
      if (meta) meta.setAttribute('content', 'light');
    } else {
      if (effective === 'dark') {
        root.classList.add('dark');
      }
      if (meta) meta.setAttribute('content', 'light dark');
    }

    root.setAttribute('data-theme', effective);
    root.setAttribute('data-theme-mode', override ? 'override' : 'system');
    updateThemeToggleButtonUI();

    if (triggerMermaid && global.GOV_PREP && global.GOV_PREP.mermaidHelper && typeof global.GOV_PREP.mermaidHelper.reRenderAll === 'function') {
      global.GOV_PREP.mermaidHelper.reRenderAll();
    }
  }

  var stateApi = {
    get data() {
      return stateData;
    },

    getState: function () {
      return stateData;
    },

    isLessonCompleted: function (lessonId) {
      return stateData.completedLessons.indexOf(lessonId) !== -1;
    },

    markLessonComplete: function (lessonId, completed) {
      if (!lessonId) return false;
      var shouldComplete = completed !== false;
      var idx = stateData.completedLessons.indexOf(lessonId);
      if (shouldComplete && idx === -1) {
        stateData.completedLessons.push(lessonId);
        persistState();
      } else if (!shouldComplete && idx !== -1) {
        stateData.completedLessons.splice(idx, 1);
        persistState();
      }
      return shouldComplete;
    },

    toggleLessonComplete: function (lessonId) {
      var next = !this.isLessonCompleted(lessonId);
      return this.markLessonComplete(lessonId, next);
    },

    saveQuizResult: function (quizId, result) {
      if (!quizId || !result) return;
      stateData.quizResults[quizId] = {
        score: Number(result.score) || 0,
        total: Number(result.total) || 0,
        percentage: Number(result.percentage) || 0,
        answers: result.answers ? Object.assign({}, result.answers) : {},
        updatedAt: new Date().toISOString()
      };
      persistState();
    },

    getQuizResult: function (quizId) {
      return stateData.quizResults[quizId] || null;
    },

    saveMockAttempt: function (attempt) {
      if (!attempt) return;
      var entry = {
        id: attempt.id || 'attempt-' + Date.now(),
        date: attempt.date || new Date().toISOString(),
        mode: attempt.mode || 'exam',
        score: Number(attempt.score) || 0,
        total: Number(attempt.total) || 0,
        percentage: Number(attempt.percentage) || 0,
        durationSeconds: Number(attempt.durationSeconds) || 0,
        domainBreakdown: attempt.domainBreakdown || {},
        topicBreakdown: attempt.topicBreakdown || {},
        answers: attempt.answers || {}
      };
      stateData.mockHistory.unshift(entry);
      if (stateData.mockHistory.length > 30) {
        stateData.mockHistory = stateData.mockHistory.slice(0, 30);
      }
      persistState();
      return entry;
    },

    addMockAttempt: function (attempt) {
      return this.saveMockAttempt(attempt);
    },

    getMockHistory: function () {
      return stateData.mockHistory.slice();
    },

    getBestMockScore: function () {
      if (!stateData.mockHistory.length) return null;
      var best = stateData.mockHistory[0];
      for (var i = 1; i < stateData.mockHistory.length; i += 1) {
        var cur = stateData.mockHistory[i];
        if ((cur.score || 0) > (best.score || 0)) {
          best = cur;
        }
      }
      return best;
    },

    setFlashcardStatus: function (cardId, status) {
      if (!cardId) return;
      if (status === 'known' || status === 'review') {
        stateData.flashcardStatus[cardId] = status;
      } else {
        delete stateData.flashcardStatus[cardId];
      }
      persistState();
    },

    getFlashcardStatus: function (cardId) {
      return stateData.flashcardStatus[cardId] || null;
    },

    getFlashcardCounts: function () {
      var known = 0;
      var review = 0;
      var keys = Object.keys(stateData.flashcardStatus);
      for (var i = 0; i < keys.length; i += 1) {
        var st = stateData.flashcardStatus[keys[i]];
        if (st === 'known') known += 1;
        else if (st === 'review') review += 1;
      }
      return { known: known, review: review };
    },

    setLastRoute: function (route) {
      if (!route || typeof route !== 'string') return;
      stateData.lastRoute = route;
      persistState();
    },

    getLastRoute: function () {
      return stateData.lastRoute || 'dashboard';
    },

    resetProgress: function () {
      stateData = createDefaultState();
      persistState();
    },

    initTheme: function () {
      if (!listenersBound && global.matchMedia) {
        themeMediaQuery = global.matchMedia('(prefers-color-scheme: dark)');
        var onSystemChange = function () {
          // Only re-apply without changing saved override unless following system;
          // updating UI & Mermaid whenever OS theme changes while in system mode.
          if (!getSavedThemeOverride()) {
            applyThemeToDocument(true);
          } else {
            updateThemeToggleButtonUI();
          }
        };
        if (typeof themeMediaQuery.addEventListener === 'function') {
          themeMediaQuery.addEventListener('change', onSystemChange);
        } else if (typeof themeMediaQuery.addListener === 'function') {
          themeMediaQuery.addListener(onSystemChange);
        }
        listenersBound = true;
      }
      applyThemeToDocument(false);
    },

    toggleTheme: function () {
      var osTheme = getOsTheme();
      var saved = getSavedThemeOverride();
      var opposite = osTheme === 'dark' ? 'light' : 'dark';

      // 2-state toggle: System <-> Opposite of System
      if (saved === opposite) {
        safeRemoveStorage(THEME_KEY);
      } else if (saved === osTheme) {
        safeWriteStorage(THEME_KEY, opposite);
      } else {
        safeWriteStorage(THEME_KEY, opposite);
      }

      applyThemeToDocument(true);
      return getEffectiveTheme();
    },

    getEffectiveTheme: getEffectiveTheme,

    getThemePreference: function () {
      return getSavedThemeOverride() || 'system';
    }
  };

  global.GOV_PREP = global.GOV_PREP || {};
  global.GOV_PREP.state = stateApi;
})(window);
