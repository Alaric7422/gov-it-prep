/**
 * Main Application Controller & Hash Router for Gov IT Prep.
 * Builds modular sidebar navigation from GOV_PREP registry, manages cached SPA views,
 * mobile drawer (with inert), native <dialog> modals, theme toggle, and Mermaid rendering.
 */
(function (global) {
  'use strict';

  var VIEW_IDS = {
    dashboard: 'view-dashboard',
    lesson: 'view-lesson',
    'diagrams-lab': 'view-diagrams-lab',
    'sql-guide': 'view-sql-guide',
    flashcards: 'view-flashcards',
    'sql-sandbox': 'view-sql-sandbox',
    'mock-exam': 'view-mock-exam',
    guide: 'view-guide'
  };

  var renderedViews = {};
  var currentLessonId = null;
  var pendingSqlPrefill = null;
  var activeRoute = 'dashboard';
  var isInitialBoot = true;

  function GP() {
    return global.GOV_PREP || {};
  }

  function escapeHtml(str) {
    return String(str === undefined || str === null ? '' : str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function announce(message) {
    var live = document.getElementById('live-announcer');
    if (!live || !message) return;
    live.textContent = '';
    global.setTimeout(function () {
      live.textContent = message;
    }, 30);
  }

  function updateHeaderProgressPill() {
    var pill = document.getElementById('header-progress-pill');
    if (!pill) return;
    var gp = GP();
    var allLessons = typeof gp.getAllLessonsOrdered === 'function' ? gp.getAllLessonsOrdered() : gp.lessons || [];
    var completedCount = 0;
    if (gp.state) {
      for (var i = 0; i < allLessons.length; i += 1) {
        if (gp.state.isLessonCompleted(allLessons[i].id)) {
          completedCount += 1;
        }
      }
    }
    var span = pill.querySelector('span');
    if (span) {
      span.textContent = completedCount + ' / ' + allLessons.length + ' บท';
    }
  }

  function buildNavItemHtml(route, iconClass, label, codeText, isCompleted, isActive) {
    var cls = 'nav-item-link' + (isActive ? ' is-active' : '');
    var currentAttr = isActive ? ' aria-current="page"' : '';
    var codeHtml = codeText ? '<span class="nav-item-code">' + escapeHtml(codeText) + '</span>' : '';
    var doneHtml = isCompleted
      ? '<i class="fa-solid fa-circle-check nav-done-icon" title="เรียนจบแล้ว" aria-label="เรียนจบแล้ว"></i>'
      : '';

    return (
      '<li>' +
      '<a href="#' +
      escapeHtml(route) +
      '" class="' +
      cls +
      '" data-route="' +
      escapeHtml(route) +
      '"' +
      currentAttr +
      '>' +
      '<i class="' +
      escapeHtml(iconClass || 'fa-solid fa-book-open') +
      ' nav-item-icon" aria-hidden="true"></i>' +
      '<span class="nav-item-text">' +
      codeHtml +
      '<span>' +
      escapeHtml(label) +
      '</span>' +
      '</span>' +
      doneHtml +
      '</a>' +
      '</li>'
    );
  }

  function refreshSidebar() {
    var nav = document.getElementById('sidebar-nav');
    if (!nav) return;

    var gp = GP();
    var state = gp.state;
    var coreLessons = typeof gp.getCoreLessons === 'function' ? gp.getCoreLessons() : [];
    var agencies = Array.isArray(gp.agencies) ? gp.agencies : [];

    var html = '';

    // Overview group
    html += '<div class="nav-group">';
    html += '<div class="nav-group-label"><span>ภาพรวมหลักสูตร</span></div>';
    html += '<ul class="nav-list">';
    html += buildNavItemHtml(
      'dashboard',
      'fa-solid fa-compass',
      'หน้าหลัก (Dashboard)',
      '',
      false,
      activeRoute === 'dashboard'
    );
    html += '</ul>';
    html += '</div>';

    // Core IT Lessons
    if (coreLessons.length) {
      html += '<div class="nav-group">';
      html += '<div class="nav-group-label"><span>พื้นฐานวิชาการคอมพิวเตอร์</span><span>' + coreLessons.length + ' บท</span></div>';
      html += '<ul class="nav-list">';
      for (var i = 0; i < coreLessons.length; i += 1) {
        var cl = coreLessons[i];
        var cRoute = 'lesson/' + cl.id;
        html += buildNavItemHtml(
          cRoute,
          cl.icon || 'fa-solid fa-microchip',
          cl.shortTitle || cl.title,
          cl.code || '',
          state ? state.isLessonCompleted(cl.id) : false,
          activeRoute === cRoute
        );
      }
      html += '</ul>';
      html += '</div>';
    }

    // Modular Agencies (automatically renders DOL and any future registered agencies)
    for (var a = 0; a < agencies.length; a += 1) {
      var agency = agencies[a];
      var agencyLessons = typeof gp.getAgencyLessons === 'function' ? gp.getAgencyLessons(agency.id) : agency.lessons || [];
      html += '<div class="nav-group">';
      html +=
        '<div class="nav-group-label"><span>' +
        escapeHtml(agency.shortName || agency.name) +
        '</span>' +
        (agency.badge ? '<span class="badge badge-accent">' + escapeHtml(agency.badge) + '</span>' : '') +
        '</div>';
      html += '<ul class="nav-list">';
      for (var j = 0; j < agencyLessons.length; j += 1) {
        var al = agencyLessons[j];
        var aRoute = 'lesson/' + al.id;
        html += buildNavItemHtml(
          aRoute,
          al.icon || 'fa-solid fa-landmark',
          al.shortTitle || al.title,
          al.code || '',
          state ? state.isLessonCompleted(al.id) : false,
          activeRoute === aRoute
        );
      }
      html += '</ul>';
      html += '</div>';
    }

    // Written-Exam Deep-Dive Hubs
    html += '<div class="nav-group">';
    html += '<div class="nav-group-label"><span>เจาะลึกข้อเขียน (พื้นฐาน → สอบจริง)</span></div>';
    html += '<ul class="nav-list">';
    html += buildNavItemHtml(
      'diagrams-lab',
      'fa-solid fa-diagram-project',
      'คู่มือ Diagram & ออกแบบระบบ',
      '',
      false,
      activeRoute === 'diagrams-lab'
    );
    html += buildNavItemHtml(
      'sql-guide',
      'fa-solid fa-terminal',
      'คู่มือคำสั่ง SQL ครบทุกคำสั่ง',
      '',
      false,
      activeRoute === 'sql-guide'
    );
    html += '</ul>';
    html += '</div>';

    // Practice Tools & Guide
    html += '<div class="nav-group">';
    html += '<div class="nav-group-label"><span>เครื่องมือฝึกซ้อม & คู่มือ</span></div>';
    html += '<ul class="nav-list">';
    html += buildNavItemHtml(
      'flashcards',
      'fa-solid fa-layer-group',
      'บัตรคำศัพท์ (Flashcards)',
      '',
      false,
      activeRoute === 'flashcards'
    );
    html += buildNavItemHtml(
      'sql-sandbox',
      'fa-solid fa-database',
      'ลานซ้อมคำสั่ง SQL',
      '',
      false,
      activeRoute === 'sql-sandbox'
    );
    html += buildNavItemHtml(
      'mock-exam',
      'fa-solid fa-clipboard-check',
      'ข้อสอบจำลอง 50 ข้อ',
      '',
      false,
      activeRoute === 'mock-exam'
    );
    html += buildNavItemHtml(
      'guide',
      'fa-solid fa-book-bookmark',
      'คู่มือขึ้นเว็บ & เพิ่มกรมใหม่',
      '',
      false,
      activeRoute === 'guide'
    );
    html += '</ul>';
    html += '</div>';

    nav.innerHTML = html;
    updateHeaderProgressPill();
  }

  function parseHashRoute() {
    var rawHash = (global.location.hash || '').replace(/^#\/?/, '').replace(/\/+$/, '').trim();
    if (!rawHash) {
      var gp = GP();
      var last = gp.state && typeof gp.state.getLastRoute === 'function' ? gp.state.getLastRoute() : 'dashboard';
      return last || 'dashboard';
    }
    return rawHash;
  }

  function showViewSection(viewKey) {
    var keys = Object.keys(VIEW_IDS);
    for (var i = 0; i < keys.length; i += 1) {
      var key = keys[i];
      var sec = document.getElementById(VIEW_IDS[key]);
      if (!sec) continue;
      if (key === viewKey) {
        sec.classList.remove('inactive');
      } else {
        sec.classList.add('inactive');
      }
    }
    return document.getElementById(VIEW_IDS[viewKey]);
  }

  function setDrawerOpen(open) {
    var sidebar = document.getElementById('app-sidebar');
    var backdrop = document.getElementById('sidebar-backdrop');
    var menuBtn = document.getElementById('mobile-menu-btn');
    var closeBtn = document.getElementById('sidebar-close-btn');
    var mainEl = document.getElementById('main-content');

    if (!sidebar || !backdrop || !menuBtn) return;

    if (open) {
      sidebar.classList.add('is-open');
      backdrop.classList.add('is-visible');
      menuBtn.setAttribute('aria-expanded', 'true');
      if (mainEl) {
        mainEl.inert = true;
        mainEl.setAttribute('aria-hidden', 'true');
      }
      if (closeBtn) {
        closeBtn.focus();
      }
    } else {
      var wasOpen = sidebar.classList.contains('is-open');
      sidebar.classList.remove('is-open');
      backdrop.classList.remove('is-visible');
      menuBtn.setAttribute('aria-expanded', 'false');
      if (mainEl) {
        mainEl.inert = false;
        mainEl.removeAttribute('aria-hidden');
      }
      if (wasOpen && global.innerWidth < 1024) {
        menuBtn.focus();
      }
    }
  }

  async function renderMermaidInView(sectionEl) {
    var gp = GP();
    if (gp.mermaidHelper && typeof gp.mermaidHelper.renderAll === 'function') {
      await gp.mermaidHelper.renderAll(sectionEl || document);
    }
  }

  function renderActiveRoute(route) {
    var gp = GP();
    var views = gp.views || {};
    var cleanRoute = route || 'dashboard';
    var viewKey = 'dashboard';
    var lessonId = null;
    var titlePrefix = 'ภาพรวมหลักสูตร';

    if (cleanRoute.indexOf('lesson/') === 0) {
      var candidateId = cleanRoute.slice('lesson/'.length).trim();
      var lessonObj = typeof gp.getLessonById === 'function' ? gp.getLessonById(candidateId) : null;
      if (lessonObj) {
        viewKey = 'lesson';
        lessonId = lessonObj.id;
        cleanRoute = 'lesson/' + lessonObj.id;
        titlePrefix = (lessonObj.code ? lessonObj.code + ': ' : '') + (lessonObj.shortTitle || lessonObj.title);
      } else {
        cleanRoute = 'dashboard';
      }
    } else if (cleanRoute === 'diagrams-lab') {
      viewKey = 'diagrams-lab';
      titlePrefix = 'คู่มือ Diagram & ออกแบบระบบ';
    } else if (cleanRoute === 'sql-guide') {
      viewKey = 'sql-guide';
      titlePrefix = 'คู่มือคำสั่ง SQL ครบทุกคำสั่ง';
    } else if (cleanRoute === 'flashcards') {
      viewKey = 'flashcards';
      titlePrefix = 'บัตรคำศัพท์ (Flashcards)';
    } else if (cleanRoute === 'sql-sandbox') {
      viewKey = 'sql-sandbox';
      titlePrefix = 'ลานซ้อมคำสั่ง SQL';
    } else if (cleanRoute === 'mock-exam') {
      viewKey = 'mock-exam';
      titlePrefix = 'ข้อสอบจำลอง 50 ข้อ';
    } else if (cleanRoute === 'guide') {
      viewKey = 'guide';
      titlePrefix = 'คู่มือขึ้นเว็บ & เพิ่มโมดูลกรม';
    } else {
      viewKey = 'dashboard';
      cleanRoute = 'dashboard';
      titlePrefix = 'หน้าหลักภาพรวม';
    }

    activeRoute = cleanRoute;
    if (gp.state && typeof gp.state.setLastRoute === 'function') {
      gp.state.setLastRoute(cleanRoute);
    }

    var sectionEl = showViewSection(viewKey);
    refreshSidebar();
    document.title = titlePrefix + ' | Gov IT Prep';

    if (sectionEl) {
      try {
        if (viewKey === 'dashboard' && views.dashboard && typeof views.dashboard.render === 'function') {
          views.dashboard.render(sectionEl);
          renderedViews.dashboard = true;
        } else if (viewKey === 'lesson' && views.lesson && typeof views.lesson.render === 'function') {
          if (!renderedViews.lesson || currentLessonId !== lessonId) {
            views.lesson.render(sectionEl, lessonId);
            renderedViews.lesson = true;
            currentLessonId = lessonId;
          }
        } else if (viewKey === 'diagrams-lab' && views.diagramsLab && typeof views.diagramsLab.render === 'function') {
          if (!renderedViews['diagrams-lab']) {
            views.diagramsLab.render(sectionEl);
            renderedViews['diagrams-lab'] = true;
          }
        } else if (viewKey === 'sql-guide' && views.sqlGuide && typeof views.sqlGuide.render === 'function') {
          if (!renderedViews['sql-guide']) {
            views.sqlGuide.render(sectionEl);
            renderedViews['sql-guide'] = true;
          }
        } else if (viewKey === 'flashcards' && views.flashcards && typeof views.flashcards.render === 'function') {
          if (!renderedViews.flashcards) {
            views.flashcards.render(sectionEl);
            renderedViews.flashcards = true;
          }
        } else if (viewKey === 'sql-sandbox' && views.sqlSandbox && typeof views.sqlSandbox.render === 'function') {
          if (!renderedViews['sql-sandbox'] || pendingSqlPrefill !== null) {
            var sqlArg = pendingSqlPrefill;
            pendingSqlPrefill = null;
            views.sqlSandbox.render(sectionEl, sqlArg);
            renderedViews['sql-sandbox'] = true;
          }
        } else if (viewKey === 'mock-exam' && views.mockExam && typeof views.mockExam.render === 'function') {
          if (!renderedViews['mock-exam']) {
            views.mockExam.render(sectionEl);
            renderedViews['mock-exam'] = true;
          }
        } else if (viewKey === 'guide' && views.guide && typeof views.guide.render === 'function') {
          if (!renderedViews.guide) {
            views.guide.render(sectionEl);
            renderedViews.guide = true;
          }
        }
      } catch (err) {
        console.error('[GOV_PREP app] Failed rendering view:', viewKey, err);
        sectionEl.innerHTML =
          '<div class="callout callout-warn" role="alert">' +
          '<strong>เกิดข้อผิดพลาดในการแสดงผลหน้านี้</strong><p>' +
          escapeHtml(err && err.message ? err.message : String(err)) +
          '</p></div>';
      }

      renderMermaidInView(sectionEl);
    }

    if (!isInitialBoot) {
      global.scrollTo({ top: 0, behavior: 'auto' });
      var mainEl = document.getElementById('main-content');
      if (mainEl) {
        mainEl.focus({ preventScroll: true });
      }
      announce('เปิดหน้า ' + titlePrefix);
    }
    isInitialBoot = false;
  }

  function navigate(route) {
    var normalized = String(route || 'dashboard').replace(/^#\/?/, '');
    if (global.location.hash !== '#' + normalized) {
      global.location.hash = '#' + normalized;
    } else {
      renderActiveRoute(normalized);
    }
  }

  function openSqlWithQuery(sql) {
    pendingSqlPrefill = typeof sql === 'string' ? sql : '';
    if (activeRoute === 'sql-sandbox') {
      renderActiveRoute('sql-sandbox');
    } else {
      navigate('sql-sandbox');
    }
  }

  function openImageModal(srcOrOpts, altArg, captionArg) {
    var dialog = document.getElementById('image-lightbox-dialog');
    var img = document.getElementById('lightbox-img');
    var captionEl = document.getElementById('lightbox-caption');
    if (!dialog || !img) return;

    var opts =
      srcOrOpts && typeof srcOrOpts === 'object'
        ? srcOrOpts
        : { src: srcOrOpts, alt: altArg, caption: captionArg };

    img.src = opts.src || '';
    img.alt = opts.alt || opts.caption || 'ภาพประกอบบทเรียน';
    if (captionEl) {
      captionEl.textContent = opts.caption || opts.alt || '';
    }

    if (typeof dialog.showModal === 'function') {
      if (!dialog.open) dialog.showModal();
    } else {
      dialog.setAttribute('open', 'open');
    }
  }

  function openResetDialog() {
    var dialog = document.getElementById('confirm-reset-dialog');
    if (!dialog) return;
    if (typeof dialog.showModal === 'function') {
      if (!dialog.open) dialog.showModal();
    } else {
      if (global.confirm('ต้องการล้างความคืบหน้าทั้งหมดในเบราว์เซอร์นี้หรือไม่?')) {
        performReset();
      }
    }
  }

  function performReset() {
    var gp = GP();
    if (gp.state && typeof gp.state.resetProgress === 'function') {
      gp.state.resetProgress();
    }
    renderedViews = {};
    currentLessonId = null;
    pendingSqlPrefill = null;
    refreshSidebar();
    renderActiveRoute(activeRoute);
    announce('ล้างความคืบหน้าทั้งหมดเรียบร้อยแล้ว');
  }

  async function copyToClipboard(text, buttonEl) {
    var copied = false;
    var str = String(text || '');
    if (global.navigator && global.navigator.clipboard && typeof global.navigator.clipboard.writeText === 'function') {
      try {
        await global.navigator.clipboard.writeText(str);
        copied = true;
      } catch (e) {
        copied = false;
      }
    }
    if (!copied) {
      try {
        var ta = document.createElement('textarea');
        ta.value = str;
        ta.setAttribute('readonly', '');
        ta.style.position = 'fixed';
        ta.style.opacity = '0';
        document.body.appendChild(ta);
        ta.select();
        copied = document.execCommand('copy');
        document.body.removeChild(ta);
      } catch (e) {
        copied = false;
      }
    }
    if (buttonEl && copied) {
      var origHtml = buttonEl.getAttribute('data-orig-html') || buttonEl.innerHTML;
      buttonEl.setAttribute('data-orig-html', origHtml);
      buttonEl.innerHTML = '<i class="fa-solid fa-check" aria-hidden="true"></i> คัดลอกแล้ว';
      global.setTimeout(function () {
        buttonEl.innerHTML = origHtml;
      }, 1800);
    }
    if (copied) announce('คัดลอกข้อความไปยังคลิปบอร์ดแล้ว');
    return copied;
  }

  function bindDialogClose(dialog) {
    if (!dialog) return;
    dialog.addEventListener('click', function (ev) {
      var closeBtn = ev.target && ev.target.closest ? ev.target.closest('[data-dialog-close]') : null;
      if (closeBtn || ev.target === dialog) {
        if (typeof dialog.close === 'function') {
          dialog.close();
        } else {
          dialog.removeAttribute('open');
        }
      }
    });
  }

  function bindEvents() {
    var themeBtn = document.getElementById('theme-toggle-btn');
    if (themeBtn) {
      themeBtn.addEventListener('click', function () {
        var gp = GP();
        if (gp.state && typeof gp.state.toggleTheme === 'function') {
          var next = gp.state.toggleTheme();
          announce('สลับเป็นโหมด' + (next === 'dark' ? 'มืด' : 'สว่าง'));
        }
      });
    }

    var resetBtn = document.getElementById('reset-progress-btn');
    if (resetBtn) {
      resetBtn.addEventListener('click', openResetDialog);
    }

    var resetConfirmBtn = document.getElementById('confirm-reset-accept');
    if (resetConfirmBtn) {
      resetConfirmBtn.addEventListener('click', function () {
        var dialog = document.getElementById('confirm-reset-dialog');
        if (dialog && typeof dialog.close === 'function') dialog.close();
        performReset();
      });
    }

    bindDialogClose(document.getElementById('confirm-reset-dialog'));
    bindDialogClose(document.getElementById('image-lightbox-dialog'));

    var menuBtn = document.getElementById('mobile-menu-btn');
    var closeBtn = document.getElementById('sidebar-close-btn');
    var backdrop = document.getElementById('sidebar-backdrop');
    var sidebarNav = document.getElementById('sidebar-nav');

    if (menuBtn) {
      menuBtn.addEventListener('click', function () {
        var sidebar = document.getElementById('app-sidebar');
        var isOpen = sidebar && sidebar.classList.contains('is-open');
        setDrawerOpen(!isOpen);
      });
    }
    if (closeBtn) {
      closeBtn.addEventListener('click', function () {
        setDrawerOpen(false);
      });
    }
    if (backdrop) {
      backdrop.addEventListener('click', function () {
        setDrawerOpen(false);
      });
    }
    if (sidebarNav) {
      sidebarNav.addEventListener('click', function (ev) {
        var link = ev.target && ev.target.closest ? ev.target.closest('a[data-route]') : null;
        if (link && global.innerWidth < 1024) {
          setDrawerOpen(false);
        }
      });
    }

    document.addEventListener('keydown', function (ev) {
      if (ev.key === 'Escape') {
        var sidebar = document.getElementById('app-sidebar');
        if (sidebar && sidebar.classList.contains('is-open')) {
          setDrawerOpen(false);
        }
      }
    });

    global.addEventListener('hashchange', function () {
      renderActiveRoute(parseHashRoute());
    });
  }

  function init() {
    var gp = GP();
    if (gp.state && typeof gp.state.initTheme === 'function') {
      gp.state.initTheme();
    }
    if (gp.mermaidHelper && typeof gp.mermaidHelper.init === 'function') {
      gp.mermaidHelper.init();
    }
    if (gp.sqlEngine && typeof gp.sqlEngine.init === 'function') {
      gp.sqlEngine.init();
    }

    bindEvents();
    refreshSidebar();
    renderActiveRoute(parseHashRoute());
  }

  var appApi = {
    init: init,
    navigate: navigate,
    openSqlWithQuery: openSqlWithQuery,
    openImageModal: openImageModal,
    openResetDialog: openResetDialog,
    refreshSidebar: refreshSidebar,
    announce: announce,
    renderMermaid: renderMermaidInView,
    copyToClipboard: copyToClipboard,
    invalidateView: function (viewKey) {
      if (viewKey) delete renderedViews[viewKey];
    }
  };

  global.GOV_PREP = global.GOV_PREP || {};
  global.GOV_PREP.app = appApi;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})(window);
