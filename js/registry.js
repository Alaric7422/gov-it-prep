/**
 * Central module registry for Gov IT Prep (Thai E-Learning Platform).
 * Provides registration hooks for core lessons, agency modules, flashcards,
 * mock exams, UI components, and views without any bundler or ES modules.
 */
(function (global) {
  'use strict';

  var existing = global.GOV_PREP || {};

  function sortByOrder(items) {
    return items.slice().sort(function (a, b) {
      var orderA = typeof a.order === 'number' ? a.order : 999;
      var orderB = typeof b.order === 'number' ? b.order : 999;
      if (orderA !== orderB) return orderA - orderB;
      return String(a.id || '').localeCompare(String(b.id || ''));
    });
  }

  function upsertById(collection, item) {
    if (!item || !item.id) return;
    var index = -1;
    for (var i = 0; i < collection.length; i += 1) {
      if (collection[i] && collection[i].id === item.id) {
        index = i;
        break;
      }
    }
    if (index >= 0) {
      collection[index] = item;
    } else {
      collection.push(item);
    }
  }

  var registry = {
    agencies: Array.isArray(existing.agencies) ? existing.agencies : [],
    lessons: Array.isArray(existing.lessons) ? existing.lessons : [],
    flashcards: Array.isArray(existing.flashcards) ? existing.flashcards : [],
    mockExam: existing.mockExam || null,
    components: existing.components || {},
    views: existing.views || {},
    state: existing.state || null,
    app: existing.app || null,
    sqlEngine: existing.sqlEngine || null,
    quizEngine: existing.quizEngine || null,
    mermaidHelper: existing.mermaidHelper || null,

    /**
     * Register a standalone lesson (core or agency).
     * @param {Object} lesson
     */
    registerLesson: function (lesson) {
      if (!lesson || !lesson.id) {
        console.warn('[GOV_PREP] registerLesson called with invalid lesson object');
        return;
      }
      if (!lesson.category) {
        lesson.category = lesson.agencyId ? 'agency' : 'core';
      }
      upsertById(this.lessons, lesson);
      this.lessons = sortByOrder(this.lessons);
    },

    /**
     * Register a modular government agency pack and all its bundled lessons.
     * Adding a new agency requires only one data file calling this method.
     * @param {Object} agency
     */
    registerAgency: function (agency) {
      if (!agency || !agency.id) {
        console.warn('[GOV_PREP] registerAgency called with invalid agency object');
        return;
      }
      var normalizedAgency = Object.assign({}, agency, {
        lessons: Array.isArray(agency.lessons) ? agency.lessons.slice() : []
      });

      for (var i = 0; i < normalizedAgency.lessons.length; i += 1) {
        var lesson = normalizedAgency.lessons[i];
        if (!lesson || !lesson.id) continue;
        lesson.category = 'agency';
        lesson.agencyId = lesson.agencyId || normalizedAgency.id;
        this.registerLesson(lesson);
      }

      normalizedAgency.lessons = sortByOrder(normalizedAgency.lessons);
      upsertById(this.agencies, normalizedAgency);
    },

    /**
     * Register flashcards deck items.
     * @param {Array<Object>} cards
     */
    registerFlashcards: function (cards) {
      if (!Array.isArray(cards)) {
        console.warn('[GOV_PREP] registerFlashcards expects an array');
        return;
      }
      for (var i = 0; i < cards.length; i += 1) {
        var card = cards[i];
        if (card && card.id) {
          upsertById(this.flashcards, card);
        }
      }
    },

    /**
     * Register the mock exam dataset.
     * @param {Object} exam
     */
    registerMockExam: function (exam) {
      if (!exam || !Array.isArray(exam.questions)) {
        console.warn('[GOV_PREP] registerMockExam called with invalid exam object');
        return;
      }
      this.mockExam = exam;
    },

    /**
     * Look up a single lesson by its exact id.
     * @param {string} id
     * @returns {Object|null}
     */
    getLessonById: function (id) {
      if (!id) return null;
      for (var i = 0; i < this.lessons.length; i += 1) {
        if (this.lessons[i] && this.lessons[i].id === id) {
          return this.lessons[i];
        }
      }
      return null;
    },

    /**
     * Return all Core IT lessons sorted by order.
     * @returns {Array<Object>}
     */
    getCoreLessons: function () {
      return sortByOrder(
        this.lessons.filter(function (lesson) {
          return lesson && lesson.category === 'core';
        })
      );
    },

    /**
     * Return agency lessons (filtered by agencyId if provided) sorted by order.
     * @param {string} [agencyId]
     * @returns {Array<Object>}
     */
    getAgencyLessons: function (agencyId) {
      return sortByOrder(
        this.lessons.filter(function (lesson) {
          if (!lesson || lesson.category !== 'agency') return false;
          if (agencyId) return lesson.agencyId === agencyId;
          return true;
        })
      );
    },

    /**
     * Return all lessons in curriculum order (core followed by agency modules).
     * @returns {Array<Object>}
     */
    getAllLessonsOrdered: function () {
      var core = this.getCoreLessons();
      var agency = [];
      for (var i = 0; i < this.agencies.length; i += 1) {
        var ag = this.agencies[i];
        agency = agency.concat(this.getAgencyLessons(ag.id));
      }
      return core.concat(agency);
    }
  };

  global.GOV_PREP = registry;
})(window);
