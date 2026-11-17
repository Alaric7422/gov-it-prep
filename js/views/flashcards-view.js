/**
 * Flashcards View: Interactive 3D flip cards with deck filtering, shuffle,
 * keyboard accessibility, and persistent known/review self-rating.
 */
(function (global) {
  'use strict';

  var DECK_ORDER = [
    { id: 'all', label: 'ทั้งหมด' },
    { id: 'ports', label: 'Port & Protocol' },
    { id: 'acronyms', label: 'คำย่อ IT & กฎหมาย' },
    { id: 'land-deeds', label: 'เอกสารสิทธิ์ & กฎหมายที่ดิน' },
    { id: 'dol-gis', label: 'ระบบดิจิทัล & GIS' }
  ];

  var localState = {
    activeDeck: 'all',
    reviewOnly: false,
    shuffledIds: null,
    currentIndex: 0,
    isFlipped: false
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

  function getDeckTabs(allCards) {
    var tabs = [];
    var seen = {};
    for (var i = 0; i < DECK_ORDER.length; i += 1) {
      tabs.push({ id: DECK_ORDER[i].id, label: DECK_ORDER[i].label });
      seen[DECK_ORDER[i].id] = true;
    }
    for (var j = 0; j < allCards.length; j += 1) {
      var card = allCards[j];
      if (card && card.deck && !seen[card.deck]) {
        tabs.push({ id: card.deck, label: card.deckLabel || card.deck });
        seen[card.deck] = true;
      }
    }
    return tabs;
  }

  function shuffleArray(items) {
    var arr = items.slice();
    for (var i = arr.length - 1; i > 0; i -= 1) {
      var j = Math.floor(Math.random() * (i + 1));
      var tmp = arr[i];
      arr[i] = arr[j];
      arr[j] = tmp;
    }
    return arr;
  }

  function getOrderedCards(allCards) {
    if (!localState.shuffledIds) return allCards.slice();
    var map = {};
    for (var i = 0; i < allCards.length; i += 1) {
      map[allCards[i].id] = allCards[i];
    }
    var ordered = [];
    for (var k = 0; k < localState.shuffledIds.length; k += 1) {
      var found = map[localState.shuffledIds[k]];
      if (found) {
        ordered.push(found);
        delete map[localState.shuffledIds[k]];
      }
    }
    for (var m = 0; m < allCards.length; m += 1) {
      if (map[allCards[m].id]) ordered.push(allCards[m]);
    }
    return ordered;
  }

  function getFilteredCards(allCards, stateApi) {
    var ordered = getOrderedCards(allCards);
    return ordered.filter(function (card) {
      if (!card) return false;
      if (localState.activeDeck !== 'all' && card.deck !== localState.activeDeck) {
        return false;
      }
      if (localState.reviewOnly && stateApi) {
        return stateApi.getFlashcardStatus(card.id) === 'review';
      }
      return true;
    });
  }

  function getStatusMeta(status) {
    if (status === 'known') {
      return { text: 'จำได้แล้ว', cls: 'badge-success', icon: 'fa-solid fa-circle-check' };
    }
    if (status === 'review') {
      return { text: 'ต้องทบทวน', cls: 'badge-accent', icon: 'fa-solid fa-rotate' };
    }
    return { text: 'ยังไม่ประเมิน', cls: '', icon: 'fa-regular fa-circle' };
  }

  function render(containerEl) {
    if (!containerEl) return;

    var registry = global.GOV_PREP || {};
    var stateApi = registry.state;
    var allCards = Array.isArray(registry.flashcards) ? registry.flashcards : [];

    if (!allCards.length) {
      containerEl.innerHTML =
        '<div class="card space-y-3">' +
        '<h1>แฟลชการ์ดทบทวนความจำ</h1>' +
        '<div class="callout callout-warn">ยังไม่มีข้อมูลแฟลชการ์ดในระบบ</div>' +
        '</div>';
      return;
    }

    var counts = stateApi ? stateApi.getFlashcardCounts() : { known: 0, review: 0 };
    var totalAll = allCards.length;
    var unseenCount = Math.max(0, totalAll - counts.known - counts.review);
    var knownPct = totalAll ? Math.round((counts.known / totalAll) * 100) : 0;

    var tabs = getDeckTabs(allCards);
    var deckCountMap = { all: totalAll };
    for (var i = 0; i < allCards.length; i += 1) {
      var d = allCards[i].deck;
      deckCountMap[d] = (deckCountMap[d] || 0) + 1;
    }

    var filtered = getFilteredCards(allCards, stateApi);
    if (localState.currentIndex >= filtered.length) {
      localState.currentIndex = Math.max(0, filtered.length - 1);
    }

    var currentCard = filtered.length ? filtered[localState.currentIndex] : null;
    var currentStatus = currentCard && stateApi ? stateApi.getFlashcardStatus(currentCard.id) : null;
    var statusMeta = getStatusMeta(currentStatus);

    var tabsHtml = tabs
      .map(function (tab) {
        var isActive = localState.activeDeck === tab.id;
        var count = deckCountMap[tab.id] || 0;
        return (
          '<button type="button" class="tab-btn' +
          (isActive ? ' is-active' : '') +
          '" data-fc-deck="' +
          escapeHtml(tab.id) +
          '" aria-pressed="' +
          (isActive ? 'true' : 'false') +
          '">' +
          escapeHtml(tab.label) +
          ' <span class="font-mono text-xs opacity-80">(' +
          count +
          ')</span></button>'
        );
      })
      .join('');

    var cardStageHtml = '';
    if (!currentCard) {
      cardStageHtml =
        '<div class="card card-lg text-center space-y-4 max-w-xl mx-auto">' +
        '<div class="text-3xl text-primary-token"><i class="fa-solid fa-circle-check" aria-hidden="true"></i></div>' +
        '<h2>ไม่มีการ์ดที่ต้องทบทวนในหมวดนี้</h2>' +
        '<p class="text-muted">คุณสามารถปิดตัวกรอง "เฉพาะต้องทบทวน" หรือเลือกหมวดอื่นเพื่อฝึกต่อได้</p>' +
        '<button type="button" class="btn btn-primary" data-fc-clear-filters>' +
        '<i class="fa-solid fa-layer-group" aria-hidden="true"></i> แสดงการ์ดทั้งหมดในหมวดนี้</button>' +
        '</div>';
    } else {
      cardStageHtml =
        '<div class="flex flex-wrap items-center justify-between gap-2 max-w-[42rem] mx-auto">' +
        '<span class="text-sm font-medium text-muted">ใบที่ <strong class="font-mono text-base">' +
        (localState.currentIndex + 1) +
        '</strong> / ' +
        filtered.length +
        '</span>' +
        '<span class="badge-pill ' +
        statusMeta.cls +
        '">' +
        '<i class="' +
        statusMeta.icon +
        '" aria-hidden="true"></i> ' +
        escapeHtml(statusMeta.text) +
        '</span>' +
        '</div>' +
        '<div class="flashcard-scene">' +
        '<button type="button" class="flashcard-card' +
        (localState.isFlipped ? ' is-flipped' : '') +
        '" data-fc-flip aria-pressed="' +
        (localState.isFlipped ? 'true' : 'false') +
        '" aria-label="' +
        escapeHtml(
          localState.isFlipped
            ? 'ด้านหลังการ์ด: ' + currentCard.back + ' — กดเพื่อพลิกกลับด้านหน้า'
            : 'ด้านหน้าการ์ด: ' + currentCard.front + ' — กดเพื่อพลิกดูคำตอบ'
        ) +
        '">' +
        '<span class="flashcard-face flashcard-front">' +
        '<span class="flex items-center justify-between gap-2 w-full">' +
        '<span class="badge-pill badge-primary">' +
        escapeHtml(currentCard.deckLabel || currentCard.deck) +
        '</span>' +
        '<span class="text-xs text-muted font-heading font-semibold">ด้านหน้า • คำถาม</span>' +
        '</span>' +
        '<span class="flex flex-col items-center justify-center text-center gap-2 py-4 w-full">' +
        '<span class="font-heading font-bold text-2xl sm:text-3xl leading-snug">' +
        escapeHtml(currentCard.front) +
        '</span>' +
        (currentCard.frontSub
          ? '<span class="text-base text-muted">' + escapeHtml(currentCard.frontSub) + '</span>'
          : '') +
        '</span>' +
        '<span class="text-xs text-muted text-center w-full">' +
        '<i class="fa-solid fa-hand-pointer" aria-hidden="true"></i> คลิกที่การ์ด หรือกด Space / Enter เพื่อพลิกดูคำตอบ' +
        '</span>' +
        '</span>' +
        '<span class="flashcard-face flashcard-back">' +
        '<span class="flex items-center justify-between gap-2 w-full">' +
        '<span class="badge-pill badge-accent">' +
        escapeHtml(currentCard.deckLabel || currentCard.deck) +
        '</span>' +
        '<span class="text-xs text-muted font-heading font-semibold">ด้านหลัง • เฉลย</span>' +
        '</span>' +
        '<span class="flex flex-col gap-3 py-2 w-full">' +
        '<span class="font-heading font-semibold text-lg leading-relaxed">' +
        escapeHtml(currentCard.back) +
        '</span>' +
        (currentCard.tip
          ? '<span class="callout callout-tip block m-0 text-sm">' +
            '<strong><i class="fa-solid fa-lightbulb" aria-hidden="true"></i> เทคนิคจำ:</strong> ' +
            escapeHtml(currentCard.tip) +
            '</span>'
          : '') +
        '</span>' +
        '<span class="text-xs text-muted text-center w-full">' +
        '<i class="fa-solid fa-rotate-left" aria-hidden="true"></i> คลิกเพื่อพลิกกลับด้านหน้า' +
        '</span>' +
        '</span>' +
        '</button>' +
        '</div>' +
        '<div class="flex flex-wrap items-center justify-between gap-3 max-w-[42rem] mx-auto pt-2">' +
        '<div class="flex flex-wrap items-center gap-2">' +
        '<button type="button" class="btn btn-secondary" data-fc-prev' +
        (localState.currentIndex <= 0 ? ' disabled' : '') +
        '><i class="fa-solid fa-arrow-left" aria-hidden="true"></i> ก่อนหน้า</button>' +
        '<button type="button" class="btn btn-secondary" data-fc-flip-btn>' +
        '<i class="fa-solid fa-repeat" aria-hidden="true"></i> พลิกการ์ด</button>' +
        '<button type="button" class="btn btn-secondary" data-fc-next' +
        (localState.currentIndex >= filtered.length - 1 ? ' disabled' : '') +
        '>ถัดไป <i class="fa-solid fa-arrow-right" aria-hidden="true"></i></button>' +
        '</div>' +
        '<div class="flex flex-wrap items-center gap-2" role="group" aria-label="ประเมินความจำของการ์ดใบนี้">' +
        '<button type="button" class="btn ' +
        (currentStatus === 'known' ? 'btn-primary' : 'btn-secondary') +
        '" data-fc-rate="known" aria-pressed="' +
        (currentStatus === 'known' ? 'true' : 'false') +
        '"><i class="fa-solid fa-check" aria-hidden="true"></i> จำได้แล้ว</button>' +
        '<button type="button" class="btn ' +
        (currentStatus === 'review' ? 'btn-accent' : 'btn-secondary') +
        '" data-fc-rate="review" aria-pressed="' +
        (currentStatus === 'review' ? 'true' : 'false') +
        '"><i class="fa-solid fa-rotate" aria-hidden="true"></i> ทบทวนอีก</button>' +
        '</div>' +
        '</div>';
    }

    containerEl.innerHTML =
      '<div class="space-y-6" data-fc-root>' +
      '<header class="hero-card cadastral-grid">' +
      '<div class="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">' +
      '<div class="lg:col-span-7 space-y-2">' +
      '<span class="badge-pill badge-primary"><i class="fa-solid fa-layer-group" aria-hidden="true"></i> Active Recall • ' +
      totalAll +
      ' ใบ</span>' +
      '<h1>แฟลชการ์ดทบทวนความจำ (Flashcards)</h1>' +
      '<p class="text-muted">ฝึกพลิกการ์ดจำพอร์ตเครือข่าย คำย่อกฎหมายไซเบอร์ ประเภทเอกสารสิทธิ์ และระบบสารสนเทศกรมที่ดิน</p>' +
      '</div>' +
      '<div class="lg:col-span-5 card space-y-3">' +
      '<div class="grid grid-cols-3 gap-2 text-center">' +
      '<div>' +
      '<div class="font-mono font-bold text-lg text-primary-token">' +
      counts.known +
      ' / ' +
      totalAll +
      '</div>' +
      '<div class="text-xs text-muted">จำได้แล้ว ' +
      counts.known +
      ' / ' +
      totalAll +
      ' ใบ</div>' +
      '</div>' +
      '<div>' +
      '<div class="font-mono font-bold text-lg text-accent-token">' +
      counts.review +
      '</div>' +
      '<div class="text-xs text-muted">ต้องทบทวน ' +
      counts.review +
      ' ใบ</div>' +
      '</div>' +
      '<div>' +
      '<div class="font-mono font-bold text-lg">' +
      unseenCount +
      '</div>' +
      '<div class="text-xs text-muted">ยังไม่ประเมิน</div>' +
      '</div>' +
      '</div>' +
      '<div class="progress-track" role="progressbar" aria-label="ความคืบหน้าแฟลชการ์ดที่จำได้แล้ว" aria-valuenow="' +
      knownPct +
      '" aria-valuemin="0" aria-valuemax="100">' +
      '<div class="progress-fill" style="width: ' +
      knownPct +
      '%"></div>' +
      '</div>' +
      '</div>' +
      '</div>' +
      '</header>' +
      '<section class="card space-y-3" aria-label="ตัวกรองหมวดแฟลชการ์ดและเครื่องมือ">' +
      '<div class="flex flex-wrap items-center justify-between gap-3">' +
      '<div class="tab-group" role="group" aria-label="เลือกหมวดหมู่แฟลชการ์ด">' +
      tabsHtml +
      '</div>' +
      '<div class="flex flex-wrap items-center gap-2">' +
      '<button type="button" class="btn btn-sm ' +
      (localState.reviewOnly ? 'btn-accent' : 'btn-secondary') +
      '" data-fc-review-filter aria-pressed="' +
      (localState.reviewOnly ? 'true' : 'false') +
      '"><i class="fa-solid fa-filter" aria-hidden="true"></i> เฉพาะต้องทบทวน (' +
      counts.review +
      ')</button>' +
      '<button type="button" class="btn btn-secondary btn-sm" data-fc-shuffle>' +
      '<i class="fa-solid fa-shuffle" aria-hidden="true"></i> สับไพ่ (Shuffle)</button>' +
      (localState.shuffledIds
        ? '<button type="button" class="btn btn-ghost btn-sm" data-fc-reset-order><i class="fa-solid fa-arrow-down-1-9" aria-hidden="true"></i> เรียงลำดับเดิม</button>'
        : '') +
      '</div>' +
      '</div>' +
      '</section>' +
      '<section class="space-y-4" aria-label="พื้นที่ฝึกพลิกแฟลชการ์ด">' +
      '<h2 class="visually-hidden">การ์ดคำถาม-คำตอบ</h2>' +
      cardStageHtml +
      '<p class="text-xs text-muted text-center">' +
      '<i class="fa-regular fa-keyboard" aria-hidden="true"></i> คีย์ลัด: กด <code>Space</code> หรือ <code>Enter</code> บนการ์ดเพื่อพลิก และใช้ปุ่มลูกศร <code>←</code> / <code>→</code> เพื่อเลื่อนใบก่อนหน้า-ถัดไป' +
      '</p>' +
      '</section>' +
      '</div>';

    bindEvents(containerEl, allCards, filtered, currentCard, stateApi);
  }

  function bindEvents(containerEl, allCards, filtered, currentCard, stateApi) {
    var root = containerEl.querySelector('[data-fc-root]');
    if (!root) return;

    var deckBtns = root.querySelectorAll('[data-fc-deck]');
    for (var i = 0; i < deckBtns.length; i += 1) {
      deckBtns[i].addEventListener('click', function () {
        localState.activeDeck = this.getAttribute('data-fc-deck') || 'all';
        localState.currentIndex = 0;
        localState.isFlipped = false;
        render(containerEl);
      });
    }

    var reviewToggle = root.querySelector('[data-fc-review-filter]');
    if (reviewToggle) {
      reviewToggle.addEventListener('click', function () {
        localState.reviewOnly = !localState.reviewOnly;
        localState.currentIndex = 0;
        localState.isFlipped = false;
        render(containerEl);
      });
    }

    var clearFiltersBtn = root.querySelector('[data-fc-clear-filters]');
    if (clearFiltersBtn) {
      clearFiltersBtn.addEventListener('click', function () {
        localState.reviewOnly = false;
        localState.currentIndex = 0;
        localState.isFlipped = false;
        render(containerEl);
      });
    }

    var shuffleBtn = root.querySelector('[data-fc-shuffle]');
    if (shuffleBtn) {
      shuffleBtn.addEventListener('click', function () {
        var ids = allCards.map(function (c) {
          return c.id;
        });
        localState.shuffledIds = shuffleArray(ids);
        localState.currentIndex = 0;
        localState.isFlipped = false;
        announce('สับลำดับแฟลชการ์ดเรียบร้อยแล้ว');
        render(containerEl);
      });
    }

    var resetOrderBtn = root.querySelector('[data-fc-reset-order]');
    if (resetOrderBtn) {
      resetOrderBtn.addEventListener('click', function () {
        localState.shuffledIds = null;
        localState.currentIndex = 0;
        localState.isFlipped = false;
        announce('เรียงลำดับแฟลชการ์ดกลับเป็นค่าเริ่มต้นแล้ว');
        render(containerEl);
      });
    }

    function toggleFlip() {
      if (!currentCard) return;
      localState.isFlipped = !localState.isFlipped;
      var cardBtn = root.querySelector('[data-fc-flip]');
      if (cardBtn) {
        cardBtn.classList.toggle('is-flipped', localState.isFlipped);
        cardBtn.setAttribute('aria-pressed', localState.isFlipped ? 'true' : 'false');
        cardBtn.setAttribute(
          'aria-label',
          localState.isFlipped
            ? 'ด้านหลังการ์ด: ' + currentCard.back + ' — กดเพื่อพลิกกลับด้านหน้า'
            : 'ด้านหน้าการ์ด: ' + currentCard.front + ' — กดเพื่อพลิกดูคำตอบ'
        );
      }
    }

    var flipCard = root.querySelector('[data-fc-flip]');
    if (flipCard) {
      flipCard.addEventListener('click', toggleFlip);
    }

    var flipHelperBtn = root.querySelector('[data-fc-flip-btn]');
    if (flipHelperBtn) {
      flipHelperBtn.addEventListener('click', function () {
        toggleFlip();
        var cardBtn = root.querySelector('[data-fc-flip]');
        if (cardBtn) cardBtn.focus();
      });
    }

    var prevBtn = root.querySelector('[data-fc-prev]');
    if (prevBtn) {
      prevBtn.addEventListener('click', function () {
        if (localState.currentIndex > 0) {
          localState.currentIndex -= 1;
          localState.isFlipped = false;
          render(containerEl);
          var nextFocus = containerEl.querySelector('[data-fc-prev]');
          if (nextFocus && !nextFocus.disabled) nextFocus.focus();
        }
      });
    }

    var nextBtn = root.querySelector('[data-fc-next]');
    if (nextBtn) {
      nextBtn.addEventListener('click', function () {
        if (localState.currentIndex < filtered.length - 1) {
          localState.currentIndex += 1;
          localState.isFlipped = false;
          render(containerEl);
          var nextFocus = containerEl.querySelector('[data-fc-next]');
          if (nextFocus && !nextFocus.disabled) nextFocus.focus();
        }
      });
    }

    var rateBtns = root.querySelectorAll('[data-fc-rate]');
    for (var r = 0; r < rateBtns.length; r += 1) {
      rateBtns[r].addEventListener('click', function () {
        if (!currentCard || !stateApi) return;
        var chosen = this.getAttribute('data-fc-rate');
        var existing = stateApi.getFlashcardStatus(currentCard.id);
        var nextStatus = existing === chosen ? null : chosen;
        stateApi.setFlashcardStatus(currentCard.id, nextStatus);
        if (nextStatus === 'known') {
          announce('บันทึกการ์ด ' + currentCard.front + ' เป็นจำได้แล้ว');
        } else if (nextStatus === 'review') {
          announce('บันทึกการ์ด ' + currentCard.front + ' ไว้ในรายการต้องทบทวน');
        } else {
          announce('ล้างสถานะการ์ด ' + currentCard.front);
        }
        render(containerEl);
      });
    }

    root.addEventListener('keydown', function (ev) {
      var tag = ev.target && ev.target.tagName ? ev.target.tagName.toLowerCase() : '';
      if (tag === 'input' || tag === 'textarea' || tag === 'select') return;
      if (ev.key === 'ArrowLeft' && localState.currentIndex > 0) {
        ev.preventDefault();
        localState.currentIndex -= 1;
        localState.isFlipped = false;
        render(containerEl);
      } else if (ev.key === 'ArrowRight' && localState.currentIndex < filtered.length - 1) {
        ev.preventDefault();
        localState.currentIndex += 1;
        localState.isFlipped = false;
        render(containerEl);
      }
    });
  }

  global.GOV_PREP = global.GOV_PREP || {};
  global.GOV_PREP.views = global.GOV_PREP.views || {};
  global.GOV_PREP.views.flashcards = {
    render: render
  };
})(window);
