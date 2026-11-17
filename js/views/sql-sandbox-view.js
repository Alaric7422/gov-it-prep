/**
 * SQL Sandbox View: Interactive Dual-Engine SQLite/AlaSQL Playground
 * with 4 Department of Lands tables, schema explorer, and 10 guided challenges.
 */
(function (global) {
  'use strict';

  var localState = {
    activeChallengeId: 'ch-01',
    showSolution: false,
    editorSql: "SELECT plot_id, deed_no, deed_type, appraised_price_per_wah\nFROM land_plots\nORDER BY appraised_price_per_wah DESC\nLIMIT 5;",
    solvedMap: {},
    lastResult: null,
    lastVerify: null,
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
    if (global.GOV_PREP && global.GOV_PREP.app && typeof global.GOV_PREP.app.announce === 'function') {
      global.GOV_PREP.app.announce(msg);
      return;
    }
    var live = document.getElementById('live-announcer');
    if (live) live.textContent = msg;
  }

  function normalizeCell(val) {
    if (val === null || val === undefined) return 'NULL';
    if (typeof val === 'number') {
      if (!isFinite(val)) return String(val);
      return Number(val.toFixed(4));
    }
    var str = String(val).trim();
    if (str !== '' && !isNaN(Number(str)) && /^-?\d+(\.\d+)?$/.test(str)) {
      return Number(Number(str).toFixed(4));
    }
    return str;
  }

  function cellsEqual(a, b) {
    var na = normalizeCell(a);
    var nb = normalizeCell(b);
    if (typeof na === 'number' && typeof nb === 'number') {
      return Math.abs(na - nb) < 1e-3;
    }
    return na === nb;
  }

  function compareResults(userRes, expectedRes, challenge) {
    if (!userRes || !userRes.ok) {
      return {
        passed: false,
        message: 'คำสั่ง SQL ยังทำงานไม่สำเร็จ กรุณาแก้ไขข้อผิดพลาดด้านล่างก่อนตรวจคำตอบ'
      };
    }

    if (!expectedRes || !expectedRes.ok) {
      return {
        passed: false,
        message: 'ไม่สามารถโหลดผลลัพธ์อ้างอิงเพื่อเปรียบเทียบได้'
      };
    }

    if (!userRes.columns || !userRes.columns.length) {
      return {
        passed: false,
        message: 'โจทย์ข้อนี้ต้องการผลลัพธ์จากคำสั่ง SELECT ที่คืนค่าตารางข้อมูล'
      };
    }

    if (userRes.columns.length !== expectedRes.columns.length) {
      return {
        passed: false,
        message:
          'จำนวนคอลัมน์ยังไม่ตรงตามโจทย์ (ผลลัพธ์ของคุณมี ' +
          userRes.columns.length +
          ' คอลัมน์, โจทย์ต้องการ ' +
          expectedRes.columns.length +
          ' คอลัมน์: ' +
          expectedRes.columns.join(', ') +
          ')'
      };
    }

    if (userRes.values.length !== expectedRes.values.length) {
      return {
        passed: false,
        message:
          'จำนวนแถวผลลัพธ์ยังไม่ตรงตามโจทย์ (ได้ ' +
          userRes.values.length +
          ' แถว, โจทย์ต้องการ ' +
          expectedRes.values.length +
          ' แถว)'
      };
    }

    var uColsLower = userRes.columns.map(function (c) {
      return String(c).toLowerCase();
    });
    var eColsLower = expectedRes.columns.map(function (c) {
      return String(c).toLowerCase();
    });
    var colIndexMap = [];
    var canMapByName = true;
    for (var i = 0; i < eColsLower.length; i += 1) {
      var foundIdx = uColsLower.indexOf(eColsLower[i]);
      if (foundIdx === -1) {
        canMapByName = false;
        break;
      }
      colIndexMap.push(foundIdx);
    }
    if (!canMapByName) {
      colIndexMap = eColsLower.map(function (_, idx) {
        return idx;
      });
    }

    var mapUserRow = function (row) {
      return colIndexMap.map(function (idx) {
        return row[idx];
      });
    };

    var requiresOrder = /\bORDER\s+BY\b/i.test(challenge.solutionSql || '');
    var userRows = userRes.values.map(mapUserRow);
    var expRows = expectedRes.values;

    if (requiresOrder) {
      for (var r = 0; r < expRows.length; r += 1) {
        for (var c = 0; c < expRows[r].length; c += 1) {
          if (!cellsEqual(userRows[r][c], expRows[r][c])) {
            return {
              passed: false,
              message:
                'ข้อมูลหรือลำดับการจัดเรียง (ORDER BY) ยังไม่ตรงกับเงื่อนไขโจทย์ ลองตรวจดูแถวที่ ' +
                (r + 1) +
                ' อีกครั้ง'
            };
          }
        }
      }
    } else {
      var serialize = function (row) {
        return JSON.stringify(
          row.map(function (cell) {
            return normalizeCell(cell);
          })
        );
      };
      var uSigs = userRows.map(serialize).sort();
      var eSigs = expRows.map(serialize).sort();
      for (var k = 0; k < eSigs.length; k += 1) {
        if (uSigs[k] !== eSigs[k]) {
          return {
            passed: false,
            message: 'ค่าข้อมูลที่ได้ยังไม่ตรงกับเงื่อนไขโจทย์ กรุณาตรวจสอบเงื่อนไข WHERE, JOIN หรือฟังก์ชันสรุปผลอีกครั้ง'
          };
        }
      }
    }

    return {
      passed: true,
      message: 'ยอดเยี่ยม! ผลลัพธ์ตรงตามโจทย์ "' + challenge.title + '" ครบถ้วนทุกแถวและคอลัมน์'
    };
  }

  function findChallengeById(challenges, id) {
    if (!id) return null;
    for (var i = 0; i < challenges.length; i += 1) {
      if (challenges[i].id === id) return challenges[i];
    }
    return null;
  }

  function getSolvedCount(challenges) {
    var count = 0;
    for (var i = 0; i < challenges.length; i += 1) {
      if (localState.solvedMap[challenges[i].id]) count += 1;
    }
    return count;
  }

  function renderChallengePanel(challenges) {
    var active = findChallengeById(challenges, localState.activeChallengeId);
    var solvedCount = getSolvedCount(challenges);

    var buttonsHtml = challenges
      .map(function (ch) {
        var isActive = active && active.id === ch.id;
        var isSolved = !!localState.solvedMap[ch.id];
        return (
          '<button type="button" class="challenge-item flex items-center justify-between gap-2' +
          (isActive ? ' is-active' : '') +
          '" data-sql-challenge="' +
          escapeHtml(ch.id) +
          '" aria-pressed="' +
          (isActive ? 'true' : 'false') +
          '">' +
          '<span class="flex items-center gap-2 min-w-0">' +
          '<span class="badge-pill font-mono ' +
          (isSolved ? 'badge-success' : isActive ? 'badge-primary' : '') +
          '" data-ch-badge>' +
          (isSolved ? '<i class="fa-solid fa-check" aria-hidden="true"></i>' : ch.order) +
          '</span>' +
          '<span class="text-sm font-medium truncate">' +
          escapeHtml(ch.title.replace(/^\d+\.\s*/, '')) +
          '</span>' +
          '</span>' +
          '<span class="badge-pill text-xs shrink-0">' +
          escapeHtml(ch.level) +
          '</span>' +
          '</button>'
        );
      })
      .join('');

    var detailHtml = '';
    if (active) {
      var solutionLines = (active.explanation || '')
        .split('\n')
        .filter(Boolean)
        .map(function (line) {
          return '<li>' + escapeHtml(line) + '</li>';
        })
        .join('');

      detailHtml =
        '<div class="card space-y-4">' +
        '<div class="flex flex-wrap items-start justify-between gap-2">' +
        '<div class="space-y-1">' +
        '<span class="badge-pill badge-primary">โจทย์ที่ ' +
        active.order +
        ' • ระดับ' +
        escapeHtml(active.level) +
        '</span>' +
        '<h3>' +
        escapeHtml(active.title) +
        '</h3>' +
        '</div>' +
        (localState.solvedMap[active.id]
          ? '<span class="badge-pill badge-success"><i class="fa-solid fa-circle-check" aria-hidden="true"></i> ผ่านแล้ว</span>'
          : '') +
        '</div>' +
        '<p class="prose-content">' +
        escapeHtml(active.description) +
        '</p>' +
        '<details class="hint-details">' +
        '<summary><i class="fa-solid fa-lightbulb" aria-hidden="true"></i> ดูคำใบ้ (Hint)</summary>' +
        '<p>' +
        escapeHtml(active.hint) +
        '</p>' +
        '</details>' +
        '<div>' +
        '<button type="button" class="btn btn-secondary btn-sm" data-sql-toggle-solution aria-expanded="' +
        (localState.showSolution ? 'true' : 'false') +
        '">' +
        '<i class="fa-solid ' +
        (localState.showSolution ? 'fa-eye-slash' : 'fa-code') +
        '" aria-hidden="true"></i> ' +
        (localState.showSolution ? 'ซ่อนตัวอย่างเฉลย' : 'โหลดตัวอย่าง/เฉลย') +
        '</button>' +
        '</div>' +
        (localState.showSolution
          ? '<div class="card-muted space-y-3">' +
            '<div class="flex flex-wrap items-center justify-between gap-2">' +
            '<strong class="text-sm font-heading">เฉลยคำสั่ง SQL ที่ถูกต้อง</strong>' +
            '<button type="button" class="btn btn-primary btn-sm" data-sql-load-solution>' +
            '<i class="fa-solid fa-play" aria-hidden="true"></i> นำโค้ดเฉลยใส่ใน Editor และรัน</button>' +
            '</div>' +
            '<pre tabindex="0"><code>' +
            escapeHtml(active.solutionSql) +
            '</code></pre>' +
            (solutionLines
              ? '<div class="text-sm space-y-1"><strong>คำอธิบายทีละบรรทัด:</strong><ul class="list-disc pl-5 space-y-1">' +
                solutionLines +
                '</ul></div>'
              : '') +
            '</div>'
          : '') +
        '</div>';
    } else {
      detailHtml =
        '<div class="card space-y-2">' +
        '<h3>โหมดเขียนคำสั่งอิสระ (Free Query Mode)</h3>' +
        '<p class="text-muted">คุณสามารถพิมพ์คำสั่ง SQL ทดลองสืบค้นตารางใดก็ได้ หรือคลิกเลือกโจทย์ฝึกหัดทั้ง 10 ข้อด้านซ้ายเพื่อตรวจคำตอบอัตโนมัติ</p>' +
        '</div>';
    }

    return (
      '<section class="space-y-4" aria-labelledby="sql-challenges-heading">' +
      '<div class="flex flex-wrap items-center justify-between gap-3">' +
      '<h2 id="sql-challenges-heading" class="flex items-center gap-2">' +
      '<i class="fa-solid fa-list-check text-primary-token" aria-hidden="true"></i>' +
      '<span>โจทย์ฝึกปฏิบัติ SQL กรมที่ดิน (10 ข้อ)</span>' +
      '</h2>' +
      '<div class="flex flex-wrap items-center gap-2" data-sql-ch-progress>' +
      '<span class="badge-pill badge-primary">ทำผ่านแล้ว ' +
      solvedCount +
      ' / ' +
      challenges.length +
      ' ข้อ</span>' +
      '<button type="button" class="btn btn-sm ' +
      (!active ? 'btn-primary' : 'btn-secondary') +
      '" data-sql-free-mode>โหมดเขียนอิสระ</button>' +
      '</div>' +
      '</div>' +
      '<div class="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">' +
      '<div class="lg:col-span-5 flex flex-col gap-2" role="group" aria-label="รายการโจทย์ฝึกปฏิบัติ SQL">' +
      buttonsHtml +
      '</div>' +
      '<div class="lg:col-span-7">' +
      detailHtml +
      '</div>' +
      '</div>' +
      '</section>'
    );
  }

  function renderSchemaExplorer(schema) {
    var tabsHtml = schema
      .map(function (tbl) {
        var isActive = localState.activeSchemaTable === tbl.tableName;
        return (
          '<button type="button" class="tab-btn' +
          (isActive ? ' is-active' : '') +
          '" data-schema-tab="' +
          escapeHtml(tbl.tableName) +
          '" aria-pressed="' +
          (isActive ? 'true' : 'false') +
          '">' +
          '<span class="font-mono">' +
          escapeHtml(tbl.tableName) +
          '</span> (' +
          escapeHtml(tbl.thaiName) +
          ')</button>'
        );
      })
      .join('');

    var activeTable = schema[0] || null;
    for (var i = 0; i < schema.length; i += 1) {
      if (schema[i].tableName === localState.activeSchemaTable) {
        activeTable = schema[i];
        break;
      }
    }

    var tableDetailHtml = '';
    if (activeTable) {
      var colsRows = activeTable.columns
        .map(function (col) {
          var keyBadges = '';
          if (col.isPK) {
            keyBadges += '<span class="badge-pill badge-primary">PK</span> ';
          }
          if (col.isFK) {
            keyBadges +=
              '<span class="badge-pill badge-accent" title="อ้างอิง ' +
              escapeHtml(col.fkRef || '') +
              '">FK' +
              (col.fkRef ? ' → ' + escapeHtml(col.fkRef) : '') +
              '</span>';
          }
          if (!col.isPK && !col.isFK) {
            keyBadges = '<span class="text-muted">—</span>';
          }

          return (
            '<tr>' +
            '<th scope="row"><button type="button" class="btn btn-ghost btn-sm font-mono p-1" data-sql-insert-col="' +
            escapeHtml(col.name) +
            '" title="คลิกเพื่อแทรกชื่อคอลัมน์ลงใน SQL Editor">' +
            escapeHtml(col.name) +
            '</button></th>' +
            '<td><code>' +
            escapeHtml(col.type) +
            '</code></td>' +
            '<td>' +
            keyBadges +
            '</td>' +
            '<td>' +
            escapeHtml(col.description) +
            '</td>' +
            '</tr>'
          );
        })
        .join('');

      tableDetailHtml =
        '<div class="card space-y-3">' +
        '<div class="flex flex-wrap items-center justify-between gap-3">' +
        '<div>' +
        '<h3><code>' +
        escapeHtml(activeTable.tableName) +
        '</code> — ' +
        escapeHtml(activeTable.thaiName) +
        '</h3>' +
        '<p class="text-sm text-muted">' +
        escapeHtml(activeTable.description) +
        '</p>' +
        '</div>' +
        '<button type="button" class="btn btn-secondary btn-sm" data-sql-sample-query="' +
        escapeHtml(activeTable.sampleQuery) +
        '">' +
        '<i class="fa-solid fa-table" aria-hidden="true"></i> ดูข้อมูลตารางนี้ทันที</button>' +
        '</div>' +
        '<div class="table-wrap">' +
        '<table class="data-table">' +
        '<caption class="visually-hidden">โครงสร้างคอลัมน์ของตาราง ' +
        escapeHtml(activeTable.tableName) +
        '</caption>' +
        '<thead><tr>' +
        '<th scope="col">คอลัมน์ (คลิกเพื่อแทรก)</th>' +
        '<th scope="col">ชนิดข้อมูล</th>' +
        '<th scope="col">คีย์ (PK/FK)</th>' +
        '<th scope="col">คำอธิบาย</th>' +
        '</tr></thead>' +
        '<tbody>' +
        colsRows +
        '</tbody>' +
        '</table>' +
        '</div>' +
        '</div>';
    }

    var quickChips = schema
      .map(function (tbl) {
        return (
          '<button type="button" class="btn btn-secondary btn-sm font-mono" data-sql-sample-query="' +
          escapeHtml(tbl.sampleQuery) +
          '">' +
          '<i class="fa-solid fa-play" aria-hidden="true"></i> ' +
          escapeHtml(tbl.tableName) +
          '</button>'
        );
      })
      .join('');

    return (
      '<section class="space-y-3" aria-labelledby="sql-schema-heading">' +
      '<div class="flex flex-wrap items-center justify-between gap-3">' +
      '<h2 id="sql-schema-heading" class="flex items-center gap-2">' +
      '<i class="fa-solid fa-diagram-project text-primary-token" aria-hidden="true"></i>' +
      '<span>โครงสร้างฐานข้อมูลกรมที่ดิน (Schema Explorer • 4 ตาราง)</span>' +
      '</h2>' +
      '<div class="flex flex-wrap items-center gap-2" aria-label="ปุ่มลัดเรียกดูข้อมูลแต่ละตาราง">' +
      '<span class="text-xs text-muted">คิวรีตัวอย่างด่วน:</span>' +
      quickChips +
      '</div>' +
      '</div>' +
      '<div class="tab-group" role="group" aria-label="เลือกดูโครงสร้างตาราง">' +
      tabsHtml +
      '</div>' +
      tableDetailHtml +
      '</section>'
    );
  }

  function renderOutputArea(sqlEngine) {
    var verifyHtml = '';
    if (localState.lastVerify) {
      var v = localState.lastVerify;
      verifyHtml =
        '<div class="sql-status mb-3 ' +
        (v.passed ? 'sql-status-ok' : 'sql-status-error') +
        '" role="status">' +
        '<span><i class="fa-solid ' +
        (v.passed ? 'fa-award' : 'fa-circle-info') +
        '" aria-hidden="true"></i> ' +
        escapeHtml(v.message) +
        '</span>' +
        '</div>';
    }

    var tableHtml = localState.lastResult
      ? sqlEngine.renderResultTableHtml(localState.lastResult)
      : '<div class="callout callout-info">กดปุ่ม <strong>รันคำสั่ง SQL</strong> หรือกด <code>Ctrl</code>+<code>Enter</code> เพื่อดูผลลัพธ์จากฐานข้อมูลจำลอง</div>';

    return verifyHtml + tableHtml;
  }

  function render(containerEl, prefillSql) {
    if (!containerEl) return;

    var registry = global.GOV_PREP || {};
    var sqlEngine = registry.sqlEngine;

    if (!sqlEngine) {
      containerEl.innerHTML =
        '<div class="card space-y-3"><h1>ลานซ้อม SQL (SQL Sandbox)</h1><div class="callout callout-warn">ไม่พบระบบ SQL Engine ในหน้าเว็บ</div></div>';
      return;
    }

    var shouldAutoRun = false;
    if (typeof prefillSql === 'string' && prefillSql.trim()) {
      localState.editorSql = prefillSql.trim();
      localState.activeChallengeId = null;
      localState.showSolution = false;
      localState.lastVerify = null;
      shouldAutoRun = true;
    } else if (!localState.lastResult) {
      shouldAutoRun = true;
    }

    var schema = sqlEngine.getSchemaMetadata();
    var challenges = sqlEngine.getChallenges();
    var engineName = sqlEngine.getEngineName();

    containerEl.innerHTML =
      '<div class="space-y-6" data-sql-view-root>' +
      '<header class="hero-card cadastral-grid">' +
      '<div class="flex flex-wrap items-start justify-between gap-4">' +
      '<div class="space-y-2 flex-1 min-w-[240px]">' +
      '<span class="badge-pill badge-primary"><i class="fa-solid fa-database" aria-hidden="true"></i> Dual-Engine SQL Playground</span>' +
      '<h1>ลานซ้อมเขียนคำสั่ง SQL (ฐานข้อมูลกรมที่ดิน)</h1>' +
      '<p class="text-muted prose-content">ฝึกสืบค้นข้อมูลจริงจากตารางสำนักงานที่ดิน ผู้ใช้งาน แปลงที่ดิน และประวัติธุรกรรม พร้อมตรวจคำตอบอัตโนมัติทั้ง 10 โจทย์</p>' +
      '</div>' +
      '<div class="card space-y-2 shrink-0">' +
      '<div class="flex items-center justify-between gap-3">' +
      '<span class="text-xs text-muted">SQL Engine:</span>' +
      '<span class="badge-pill badge-primary font-mono" data-sql-engine-name>' +
      escapeHtml(engineName === 'ไม่สามารถเชื่อมต่อตัวประมวลผล SQL ได้' ? 'กำลังเตรียม SQL Engine...' : engineName) +
      '</span>' +
      '</div>' +
      '<button type="button" class="btn btn-secondary btn-sm w-full" data-sql-reset-db>' +
      '<i class="fa-solid fa-rotate" aria-hidden="true"></i> รีเซ็ตฐานข้อมูลเป็นค่าเริ่มต้น</button>' +
      '</div>' +
      '</div>' +
      '</header>' +
      renderSchemaExplorer(schema) +
      renderChallengePanel(challenges) +
      '<section class="card card-lg space-y-4" aria-labelledby="sql-editor-heading">' +
      '<div class="flex flex-wrap items-center justify-between gap-2">' +
      '<h2 id="sql-editor-heading" class="flex items-center gap-2">' +
      '<i class="fa-solid fa-terminal text-primary-token" aria-hidden="true"></i>' +
      '<span>พื้นที่เขียนคำสั่ง SQL (SQL Editor)</span>' +
      '</h2>' +
      '<span class="text-xs text-muted">กด <code>Ctrl</code> + <code>Enter</code> เพื่อรันคำสั่ง</span>' +
      '</div>' +
      '<label for="sql-sandbox-textarea" class="visually-hidden">พิมพ์คำสั่ง SQL ที่นี่</label>' +
      '<textarea id="sql-sandbox-textarea" class="sql-editor" rows="7" spellcheck="false" placeholder="พิมพ์คำสั่ง SQL เช่น SELECT * FROM land_plots;">' +
      escapeHtml(localState.editorSql) +
      '</textarea>' +
      '<div class="flex flex-wrap items-center gap-2">' +
      '<button type="button" class="btn btn-primary" data-sql-run-main>' +
      '<i class="fa-solid fa-play" aria-hidden="true"></i> รันคำสั่ง SQL</button>' +
      '<button type="button" class="btn btn-secondary" data-sql-clear-editor>' +
      '<i class="fa-solid fa-eraser" aria-hidden="true"></i> ล้างช่องพิมพ์</button>' +
      '</div>' +
      '<div class="space-y-3" data-sql-output aria-live="polite">' +
      renderOutputArea(sqlEngine) +
      '</div>' +
      '</section>' +
      '</div>';

    bindEvents(containerEl, sqlEngine, challenges);

    sqlEngine.init().then(function (readyName) {
      var badge = containerEl.querySelector('[data-sql-engine-name]');
      if (badge) badge.textContent = readyName || sqlEngine.getEngineName();
    });

    if (shouldAutoRun) {
      executeEditorQuery(containerEl, sqlEngine, challenges, true);
    }
  }

  async function executeEditorQuery(containerEl, sqlEngine, challenges, skipChallengeVerifyOnInitial) {
    var textarea = containerEl.querySelector('#sql-sandbox-textarea');
    var runBtn = containerEl.querySelector('[data-sql-run-main]');
    var outputEl = containerEl.querySelector('[data-sql-output]');
    var badge = containerEl.querySelector('[data-sql-engine-name]');
    if (!textarea || !outputEl) return;

    localState.editorSql = textarea.value;
    if (runBtn) runBtn.disabled = true;

    var res = await sqlEngine.execute(localState.editorSql);
    localState.lastResult = res;
    if (badge) badge.textContent = res.engine || sqlEngine.getEngineName();

    var active = findChallengeById(challenges, localState.activeChallengeId);
    if (active && !skipChallengeVerifyOnInitial) {
      var expected = await sqlEngine.execute(active.solutionSql);
      var check = compareResults(res, expected, active);
      localState.lastVerify = check;
      if (check.passed) {
        localState.solvedMap[active.id] = true;
        announce('ผ่านโจทย์ SQL ข้อที่ ' + active.order + ' เรียบร้อยแล้ว');
        var activeBtn = containerEl.querySelector('[data-sql-challenge="' + active.id + '"]');
        if (activeBtn) {
          var badgeEl = activeBtn.querySelector('[data-ch-badge]');
          if (badgeEl) {
            badgeEl.className = 'badge-pill font-mono badge-success';
            badgeEl.innerHTML = '<i class="fa-solid fa-check" aria-hidden="true"></i>';
          }
        }
        var progressBadge = containerEl.querySelector('[data-sql-ch-progress] .badge-pill');
        if (progressBadge) {
          progressBadge.textContent = 'ทำผ่านแล้ว ' + getSolvedCount(challenges) + ' / ' + challenges.length + ' ข้อ';
        }
      }
    } else if (!active) {
      localState.lastVerify = null;
    }

    outputEl.innerHTML = renderOutputArea(sqlEngine);
    if (runBtn) runBtn.disabled = false;
  }

  function bindEvents(containerEl, sqlEngine, challenges) {
    var root = containerEl.querySelector('[data-sql-view-root]');
    if (!root) return;

    var textarea = root.querySelector('#sql-sandbox-textarea');
    if (textarea) {
      textarea.addEventListener('input', function () {
        localState.editorSql = textarea.value;
      });
      textarea.addEventListener('keydown', function (ev) {
        if ((ev.ctrlKey || ev.metaKey) && ev.key === 'Enter') {
          ev.preventDefault();
          executeEditorQuery(containerEl, sqlEngine, challenges, false);
        }
      });
    }

    var runBtn = root.querySelector('[data-sql-run-main]');
    if (runBtn) {
      runBtn.addEventListener('click', function () {
        executeEditorQuery(containerEl, sqlEngine, challenges, false);
      });
    }

    var clearBtn = root.querySelector('[data-sql-clear-editor]');
    if (clearBtn && textarea) {
      clearBtn.addEventListener('click', function () {
        textarea.value = '';
        localState.editorSql = '';
        localState.lastVerify = null;
        textarea.focus();
      });
    }

    var resetDbBtn = root.querySelector('[data-sql-reset-db]');
    if (resetDbBtn) {
      resetDbBtn.addEventListener('click', async function () {
        resetDbBtn.disabled = true;
        var engineName = await sqlEngine.resetDatabase();
        resetDbBtn.disabled = false;
        announce('รีเซ็ตฐานข้อมูลจำลองกรมที่ดินเป็นค่าเริ่มต้นเรียบร้อยแล้ว');
        var badge = root.querySelector('[data-sql-engine-name]');
        if (badge) badge.textContent = engineName;
        var outputEl = root.querySelector('[data-sql-output]');
        if (outputEl) {
          outputEl.innerHTML =
            '<div class="sql-status sql-status-ok"><i class="fa-solid fa-circle-check" aria-hidden="true"></i> <span>รีเซ็ตฐานข้อมูลทั้ง 4 ตารางเป็นข้อมูลตั้งต้นเรียบร้อยแล้ว (' +
            escapeHtml(engineName) +
            ')</span></div>';
        }
      });
    }

    var schemaTabs = root.querySelectorAll('[data-schema-tab]');
    for (var t = 0; t < schemaTabs.length; t += 1) {
      schemaTabs[t].addEventListener('click', function () {
        localState.activeSchemaTable = this.getAttribute('data-schema-tab');
        render(containerEl);
      });
    }

    var sampleBtns = root.querySelectorAll('[data-sql-sample-query]');
    for (var s = 0; s < sampleBtns.length; s += 1) {
      sampleBtns[s].addEventListener('click', function () {
        var q = this.getAttribute('data-sql-sample-query');
        if (!q) return;
        localState.editorSql = q;
        localState.lastVerify = null;
        var ed = root.querySelector('#sql-sandbox-textarea');
        if (ed) ed.value = q;
        executeEditorQuery(containerEl, sqlEngine, challenges, true);
        if (ed) ed.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      });
    }

    var colChips = root.querySelectorAll('[data-sql-insert-col]');
    for (var c = 0; c < colChips.length; c += 1) {
      colChips[c].addEventListener('click', function () {
        var colName = this.getAttribute('data-sql-insert-col');
        var ed = root.querySelector('#sql-sandbox-textarea');
        if (!ed || !colName) return;
        var start = ed.selectionStart || ed.value.length;
        var end = ed.selectionEnd || ed.value.length;
        var before = ed.value.slice(0, start);
        var after = ed.value.slice(end);
        var prefix = before && !/[\s,(]$/.test(before) ? ' ' : '';
        ed.value = before + prefix + colName + after;
        localState.editorSql = ed.value;
        ed.focus();
        var nextPos = start + prefix.length + colName.length;
        ed.setSelectionRange(nextPos, nextPos);
      });
    }

    var challengeBtns = root.querySelectorAll('[data-sql-challenge]');
    for (var ch = 0; ch < challengeBtns.length; ch += 1) {
      challengeBtns[ch].addEventListener('click', function () {
        var id = this.getAttribute('data-sql-challenge');
        localState.activeChallengeId = id;
        localState.showSolution = false;
        localState.lastVerify = null;
        render(containerEl);
      });
    }

    var freeModeBtn = root.querySelector('[data-sql-free-mode]');
    if (freeModeBtn) {
      freeModeBtn.addEventListener('click', function () {
        localState.activeChallengeId = null;
        localState.showSolution = false;
        localState.lastVerify = null;
        render(containerEl);
      });
    }

    var toggleSolBtn = root.querySelector('[data-sql-toggle-solution]');
    if (toggleSolBtn) {
      toggleSolBtn.addEventListener('click', function () {
        localState.showSolution = !localState.showSolution;
        render(containerEl);
      });
    }

    var loadSolBtn = root.querySelector('[data-sql-load-solution]');
    if (loadSolBtn) {
      loadSolBtn.addEventListener('click', function () {
        var active = findChallengeById(challenges, localState.activeChallengeId);
        if (!active) return;
        localState.editorSql = active.solutionSql;
        var ed = root.querySelector('#sql-sandbox-textarea');
        if (ed) ed.value = active.solutionSql;
        executeEditorQuery(containerEl, sqlEngine, challenges, false);
      });
    }
  }

  global.GOV_PREP = global.GOV_PREP || {};
  global.GOV_PREP.views = global.GOV_PREP.views || {};
  global.GOV_PREP.views.sqlSandbox = {
    render: render
  };
})(window);
