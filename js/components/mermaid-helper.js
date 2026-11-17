/**
 * Mermaid v11 helper for rendering and theme-re-rendering diagrams safely.
 * Preserves raw Mermaid source in data-mermaid-source so light/dark toggles
 * cleanly re-render SVGs, with graceful code fallback if CDN fails offline.
 */
(function (global) {
  'use strict';

  var renderCounter = 0;
  var initializedTheme = null;

  function getCurrentTheme() {
    if (global.GOV_PREP && global.GOV_PREP.state && typeof global.GOV_PREP.state.getEffectiveTheme === 'function') {
      return global.GOV_PREP.state.getEffectiveTheme();
    }
    return document.documentElement.classList.contains('theme-dark') ? 'dark' : 'light';
  }

  function getMermaidConfig(theme) {
    var isDark = theme === 'dark';
    return {
      startOnLoad: false,
      securityLevel: 'strict',
      theme: 'base',
      flowchart: {
        useMaxWidth: true,
        htmlLabels: true,
        curve: 'basis'
      },
      sequence: {
        useMaxWidth: true,
        diagramMarginX: 24,
        diagramMarginY: 16
      },
      er: {
        useMaxWidth: true
      },
      themeVariables: isDark
        ? {
            darkMode: true,
            background: '#131F26',
            fontFamily: "'Sarabun', 'Prompt', sans-serif",
            fontSize: '15px',
            primaryColor: '#163A3B',
            primaryTextColor: '#E6F0EE',
            primaryBorderColor: '#2DD4BF',
            secondaryColor: '#362B16',
            secondaryTextColor: '#FDE68A',
            secondaryBorderColor: '#F59E0B',
            tertiaryColor: '#1A2B34',
            tertiaryTextColor: '#E6F0EE',
            tertiaryBorderColor: '#38515E',
            lineColor: '#2DD4BF',
            textColor: '#E6F0EE',
            mainBkg: '#163A3B',
            nodeBorder: '#2DD4BF',
            clusterBkg: '#0F1B22',
            clusterBorder: '#233640',
            edgeLabelBackground: '#131F26',
            actorBkg: '#163A3B',
            actorBorder: '#2DD4BF',
            actorTextColor: '#E6F0EE',
            signalColor: '#2DD4BF',
            signalTextColor: '#E6F0EE',
            labelBoxBkgColor: '#131F26',
            labelBoxBorderColor: '#233640',
            attributeBackgroundColorOdd: '#131F26',
            attributeBackgroundColorEven: '#1A2B34'
          }
        : {
            darkMode: false,
            background: '#FFFFFF',
            fontFamily: "'Sarabun', 'Prompt', sans-serif",
            fontSize: '15px',
            primaryColor: '#E6F4F1',
            primaryTextColor: '#122026',
            primaryBorderColor: '#0F5E4D',
            secondaryColor: '#FEF3C7',
            secondaryTextColor: '#122026',
            secondaryBorderColor: '#D97706',
            tertiaryColor: '#F4F7F6',
            tertiaryTextColor: '#122026',
            tertiaryBorderColor: '#94B0A8',
            lineColor: '#0F5E4D',
            textColor: '#122026',
            mainBkg: '#E6F4F1',
            nodeBorder: '#0F5E4D',
            clusterBkg: '#F4F7F6',
            clusterBorder: '#D5E1DD',
            edgeLabelBackground: '#FFFFFF',
            actorBkg: '#E6F4F1',
            actorBorder: '#0F5E4D',
            actorTextColor: '#122026',
            signalColor: '#0F5E4D',
            signalTextColor: '#122026',
            labelBoxBkgColor: '#FFFFFF',
            labelBoxBorderColor: '#D5E1DD',
            attributeBackgroundColorOdd: '#FFFFFF',
            attributeBackgroundColorEven: '#F4F7F6'
          }
    };
  }

  function ensureInitialized(theme) {
    if (!global.mermaid || typeof global.mermaid.initialize !== 'function') {
      return false;
    }
    if (initializedTheme !== theme) {
      global.mermaid.initialize(getMermaidConfig(theme));
      initializedTheme = theme;
    }
    return true;
  }

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }

  function renderFallback(el, source, reasonText) {
    el.classList.add('mermaid-fallback-wrap');
    el.innerHTML =
      '<div class="mermaid-fallback-note"><i class="fa-solid fa-diagram-project" aria-hidden="true"></i> ' +
      escapeHtml(reasonText) +
      '</div><pre tabindex="0" class="mermaid-fallback-code"><code>' +
      escapeHtml(source) +
      '</code></pre>';
  }

  function isInsideInactiveView(el) {
    var view = el.closest ? el.closest('.spa-view') : null;
    return !!(view && view.classList.contains('inactive'));
  }

  function cleanOrphanMermaidTempNodes() {
    var orphans = document.querySelectorAll('body > [id^="dmermaid-"], body > [id^="mermaid-gov-"]');
    for (var i = 0; i < orphans.length; i += 1) {
      if (orphans[i].parentNode === document.body) {
        document.body.removeChild(orphans[i]);
      }
    }
  }

  async function renderElement(el, theme, force) {
    if (!el || isInsideInactiveView(el)) return;

    var source = el.getAttribute('data-mermaid-source');
    if (!source) {
      source = (el.textContent || '').trim();
      if (!source) return;
      el.setAttribute('data-mermaid-source', source);
    }

    var renderedTheme = el.getAttribute('data-mermaid-theme');
    var hasSvg = !!el.querySelector('svg');
    if (!force && renderedTheme === theme && hasSvg) {
      return;
    }

    if (!ensureInitialized(theme) || typeof global.mermaid.render !== 'function') {
      renderFallback(el, source, 'ไม่สามารถโหลด Mermaid CDN (แสดงโครงสร้างแผนภาพแบบข้อความแทน)');
      el.setAttribute('data-mermaid-theme', theme);
      return;
    }

    renderCounter += 1;
    var diagramId = 'mermaid-gov-' + renderCounter;

    try {
      var result = await global.mermaid.render(diagramId, source);
      el.classList.remove('mermaid-fallback-wrap');
      el.innerHTML = result.svg;
      if (typeof result.bindFunctions === 'function') {
        result.bindFunctions(el);
      }
      var svg = el.querySelector('svg');
      if (svg) {
        svg.setAttribute('role', 'img');
        svg.style.maxWidth = '100%';
        svg.style.height = 'auto';
      }
      el.setAttribute('data-mermaid-theme', theme);
    } catch (err) {
      cleanOrphanMermaidTempNodes();
      renderFallback(el, source, 'แสดงโค้ดแผนภาพสำรอง (Mermaid fallback)');
      el.setAttribute('data-mermaid-theme', theme);
    }
  }

  var mermaidHelper = {
    init: function () {
      var theme = getCurrentTheme();
      return ensureInitialized(theme);
    },

    renderAll: async function (containerEl, force) {
      var scope = containerEl || document;
      var nodes = scope.querySelectorAll ? scope.querySelectorAll('.mermaid') : [];
      if (!nodes.length) return;
      var theme = getCurrentTheme();

      for (var i = 0; i < nodes.length; i += 1) {
        await renderElement(nodes[i], theme, !!force);
      }
    },

    reRenderAll: async function () {
      initializedTheme = null;
      var activeViews = document.querySelectorAll('.spa-view:not(.inactive)');
      if (activeViews.length) {
        for (var i = 0; i < activeViews.length; i += 1) {
          await this.renderAll(activeViews[i], true);
        }
      } else {
        await this.renderAll(document, true);
      }
    }
  };

  global.GOV_PREP = global.GOV_PREP || {};
  global.GOV_PREP.mermaidHelper = mermaidHelper;
  global.GOV_PREP.components = global.GOV_PREP.components || {};
  global.GOV_PREP.components.mermaidHelper = mermaidHelper;
})(window);
