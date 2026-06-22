// ─── Carousel ────────────────────────────────────────────────────────────────
const track = document.getElementById("carouselTrack");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

if (track && prevBtn && nextBtn) {
  const CARD_WIDTH = 333;
  const GAP = 24;
  const STEP = CARD_WIDTH + GAP;
  const TOTAL_CARDS = 5;
  const VISIBLE_CARDS = 3;
  let currentIndex = 0;

  prevBtn.addEventListener("click", () => {
    if (currentIndex > 0) {
      currentIndex--;
      track.style.transform = `translateX(-${currentIndex * STEP}px)`;
    }
  });

  nextBtn.addEventListener("click", () => {
    if (currentIndex < TOTAL_CARDS - VISIBLE_CARDS) {
      currentIndex++;
      track.style.transform = `translateX(-${currentIndex * STEP}px)`;
    }
  });
}

// ─── FAQ ─────────────────────────────────────────────────────────────────────
document.querySelectorAll(".faqQuestion").forEach((btn) => {
  btn.addEventListener("click", () => {
    const item = btn.closest(".faqItem");
    const isOpen = item.classList.contains("open");
    document
      .querySelectorAll(".faqItem.open")
      .forEach((el) => el.classList.remove("open"));
    if (!isOpen) item.classList.add("open");
  });
});

// ─── Day select ───────────────────────────────────────────────────────────────
const daySelect = document.getElementById("daySelect");
if (daySelect) {
  for (let i = 1; i <= 31; i++) {
    const opt = document.createElement("option");
    opt.value = i;
    opt.textContent = i;
    daySelect.appendChild(opt);
  }
}

// ─── Year select ──────────────────────────────────────────────────────────────
const yearSelect = document.getElementById("yearSelect");
if (yearSelect) {
  for (let y = 2008; y >= 1930; y--) {
    const opt = document.createElement("option");
    opt.value = y;
    opt.textContent = y;
    yearSelect.appendChild(opt);
  }
}

// ─── Select placeholder colour ────────────────────────────────────────────────
document.querySelectorAll(".appFormSelect").forEach((sel) => {
  sel.addEventListener("change", function () {
    this.classList.toggle("has-value", !!this.value);
  });
});

// ─── Name ────────────────────────────────────────────────────────────────────
function isNameValid(value) {
  const parts = value.trim().split(/\s+/);
  return parts.length >= 2 && parts.every((p) => p.length > 0);
}

const nameInput = document.getElementById("fullName");
if (nameInput) {
  nameInput.addEventListener("input", function () {
    const val = this.value;
    const pos = this.selectionStart;
    const newVal = val.replace(/([а-яёa-z])([А-ЯЁA-Z])/g, "$1 $2");
    if (newVal !== val) {
      const shift = newVal.length - val.length;
      this.value = newVal;
      this.setSelectionRange(pos + shift, pos + shift);
    }
    if (this.classList.contains("input-error") && isNameValid(this.value)) {
      this.classList.remove("input-error");
    }
  });

  nameInput.addEventListener("blur", function () {
    if (this.value) {
      this.classList.toggle("input-error", !isNameValid(this.value));
    } else {
      this.classList.remove("input-error");
    }
  });
}

// ─── Phone ───────────────────────────────────────────────────────────────────
function getPhoneDigits(value) {
  let d = value.replace(/\D/g, "");
  if (d.startsWith("7") || d.startsWith("8")) d = d.slice(1);
  return d.slice(0, 10);
}

function formatPhone(digits) {
  let r = "+7";
  if (digits.length > 0) r += " " + digits.slice(0, 3);
  if (digits.length > 3) r += " " + digits.slice(3, 6);
  if (digits.length > 6) r += "-" + digits.slice(6, 8);
  if (digits.length > 8) r += "-" + digits.slice(8, 10);
  return r;
}

const phoneInput = document.getElementById("phone");
if (phoneInput) {
  phoneInput.addEventListener("keydown", function (e) {
    if (e.key === "Backspace") {
      e.preventDefault();
      const digits = getPhoneDigits(this.value);
      const newDigits = digits.slice(0, -1);
      this.value = newDigits.length > 0 ? formatPhone(newDigits) : "";
      if (this.classList.contains("input-error") && newDigits.length === 10) {
        this.classList.remove("input-error");
      }
    }
  });

  phoneInput.addEventListener("input", function () {
    const digits = getPhoneDigits(this.value);
    this.value = digits.length > 0 ? formatPhone(digits) : "";
    if (this.classList.contains("input-error") && digits.length === 10) {
      this.classList.remove("input-error");
    }
  });

  phoneInput.addEventListener("blur", function () {
    if (this.value) {
      this.classList.toggle(
        "input-error",
        getPhoneDigits(this.value).length !== 10,
      );
    } else {
      this.classList.remove("input-error");
    }
  });
}

// ─── Email ───────────────────────────────────────────────────────────────────
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const emailInput = document.getElementById("email");
if (emailInput) {
  emailInput.addEventListener("blur", function () {
    this.classList.toggle("input-error", !emailRegex.test(this.value));
  });

  emailInput.addEventListener("input", function () {
    if (this.classList.contains("input-error") && emailRegex.test(this.value)) {
      this.classList.remove("input-error");
    }
  });
}

// ─── Popup ───────────────────────────────────────────────────────────────────
function showPopup() {
  const existing = document.querySelector(".formPopup");
  if (existing) existing.remove();

  const popup = document.createElement("div");
  popup.className = "formPopup";
  popup.textContent = "Заявка успешно отправлена";
  document.body.appendChild(popup);

  requestAnimationFrame(() => {
    requestAnimationFrame(() => popup.classList.add("formPopup--visible"));
  });

  setTimeout(() => {
    popup.classList.remove("formPopup--visible");
    popup.addEventListener("transitionend", () => popup.remove(), {
      once: true,
    });
  }, 3000);
}

// ─── Form submit ──────────────────────────────────────────────────────────────
const appForm = document.getElementById("appForm");
if (appForm) {
  appForm.addEventListener("submit", function (e) {
    e.preventDefault();
    let valid = true;

    if (nameInput) {
      const ok =
        nameInput.value.trim().length > 0 && isNameValid(nameInput.value);
      nameInput.classList.toggle("input-error", !ok);
      if (!ok) valid = false;
    }

    if (phoneInput) {
      const ok = getPhoneDigits(phoneInput.value).length === 10;
      phoneInput.classList.toggle("input-error", !ok);
      if (!ok) valid = false;
    }

    if (emailInput) {
      const ok = emailRegex.test(emailInput.value);
      emailInput.classList.toggle("input-error", !ok);
      if (!ok) valid = false;
    }

    const day = document.getElementById("daySelect");
    const month = document.getElementById("monthSelect");
    const year = document.getElementById("yearSelect");
    if (day && month && year && (!day.value || !month.value || !year.value)) {
      valid = false;
    }

    if (valid) showPopup();
  });
}

// ─── Cart storage ─────────────────────────────────────────────────────────────
function getCart() {
  return JSON.parse(localStorage.getItem("cart") || "[]");
}
function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// ─── Shop hanging carousel ────────────────────────────────────────────────────
(function () {
  const container = document.getElementById("shopCardsContainer");
  if (!container) return;

  const cards = Array.from(container.querySelectorAll(".shopCard"));
  const prevBtn = document.getElementById("shopPrev");
  const nextBtn = document.getElementById("shopNext");
  const TOTAL = cards.length;
  const SPACING = 380;
  const ROTATIONS = [0, 10, 20];

  let current = Math.floor(TOTAL / 2);

  function update() {
    cards.forEach((card, i) => {
      const offset = i - current;
      const absOff = Math.abs(offset);
      const x = offset * SPACING;
      const rot = (offset < 0 ? -1 : 1) * ROTATIONS[Math.min(absOff, 2)];
      card.style.transform = "translateX(" + x + "px) rotate(" + rot + "deg)";
      card.style.opacity = absOff <= 1 ? "1" : "0";
      card.style.zIndex = String(10 - absOff);
      card.classList.toggle("shopCard--active", offset === 0);
    });
    prevBtn.disabled = current === 0;
    nextBtn.disabled = current === TOTAL - 1;
  }

  prevBtn.addEventListener("click", function () {
    if (current > 0) {
      current--;
      update();
    }
  });

  nextBtn.addEventListener("click", function () {
    if (current < TOTAL - 1) {
      current++;
      update();
    }
  });

  update();
})();

// ─── Shop: add to cart ────────────────────────────────────────────────────────
(function () {
  const container = document.getElementById("shopCardsContainer");
  if (!container) return;

  container.addEventListener("click", function (e) {
    const btn = e.target.closest(".shopCardCartBtn");
    if (!btn) return;

    const card = btn.closest(".shopCard");
    const id = card.dataset.id;
    const name = card.querySelector(".shopCardTitle").textContent.trim();
    const price = parseInt(card.dataset.price, 10);

    const cart = getCart();
    const existing = cart.find(function (item) { return item.id === id; });
    if (existing) {
      existing.qty++;
    } else {
      cart.push({ id: id, name: name, price: price, qty: 1 });
    }
    saveCart(cart);

    const original = btn.textContent;
    btn.textContent = "Добавлено!";
    btn.disabled = true;
    setTimeout(function () {
      btn.textContent = original;
      btn.disabled = false;
    }, 1500);
  });
})();

// ─── Cart page ────────────────────────────────────────────────────────────────
(function () {
  const cartMain = document.getElementById("cartMain");
  const cartEmpty = document.getElementById("cartEmpty");
  const cartItemsEl = document.getElementById("cartItems");
  if (!cartMain || !cartItemsEl) return;

  function formatPrice(n) {
    return n.toLocaleString("ru-RU") + " ₽";
  }

  function recalc() {
    const items = cartItemsEl.querySelectorAll(".cartItem");
    let total = 0;
    let count = 0;
    items.forEach(function (item) {
      const price = parseInt(item.querySelector(".cartItemPrice").dataset.price, 10);
      const qty = parseInt(item.querySelector(".cartQtyValue").textContent, 10);
      const line = price * qty;
      item.querySelector(".cartItemTotal").textContent = formatPrice(line);
      total += line;
      count += qty;
    });
    document.getElementById("cartCount").textContent = count;
    document.getElementById("cartSubtotal").textContent = formatPrice(total);
    document.getElementById("cartTotal").textContent = formatPrice(total);
  }

  function persistCart() {
    const cart = [];
    cartItemsEl.querySelectorAll(".cartItem").forEach(function (item) {
      cart.push({
        id: item.dataset.id,
        name: item.querySelector(".cartItemName").textContent,
        price: parseInt(item.querySelector(".cartItemPrice").dataset.price, 10),
        qty: parseInt(item.querySelector(".cartQtyValue").textContent, 10),
      });
    });
    saveCart(cart);
  }

  function showEmpty() {
    cartMain.style.display = "none";
    cartEmpty.style.display = "flex";
  }

  function renderCart() {
    const cart = getCart();
    cartItemsEl.innerHTML = "";

    if (cart.length === 0) {
      showEmpty();
      return;
    }

    cart.forEach(function (item) {
      const div = document.createElement("div");
      div.className = "cartItem";
      div.dataset.id = item.id;
      div.innerHTML =
        '<div class="cartItemImage"></div>' +
        '<div class="cartItemInfo">' +
          '<p class="cartItemName">' + item.name + "</p>" +
          '<p class="cartItemPrice" data-price="' + item.price + '">' + formatPrice(item.price) + "</p>" +
        "</div>" +
        '<div class="cartItemQty">' +
          '<button class="cartQtyBtn cartQtyMinus" aria-label="Уменьшить">−</button>' +
          '<span class="cartQtyValue">' + item.qty + "</span>" +
          '<button class="cartQtyBtn cartQtyPlus" aria-label="Увеличить">+</button>' +
        "</div>" +
        '<p class="cartItemTotal">' + formatPrice(item.price * item.qty) + "</p>" +
        '<button class="cartRemoveBtn" aria-label="Удалить">' +
          '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">' +
            '<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>' +
          "</svg>" +
        "</button>";
      cartItemsEl.appendChild(div);
    });

    cartMain.style.display = "";
    cartEmpty.style.display = "none";
    recalc();
  }

  cartItemsEl.addEventListener("click", function (e) {
    const item = e.target.closest(".cartItem");
    if (!item) return;

    if (e.target.closest(".cartQtyMinus")) {
      const span = item.querySelector(".cartQtyValue");
      const val = parseInt(span.textContent, 10);
      if (val > 1) {
        span.textContent = val - 1;
        recalc();
        persistCart();
      }
    }

    if (e.target.closest(".cartQtyPlus")) {
      const span = item.querySelector(".cartQtyValue");
      span.textContent = parseInt(span.textContent, 10) + 1;
      recalc();
      persistCart();
    }

    if (e.target.closest(".cartRemoveBtn")) {
      item.remove();
      persistCart();
      if (cartItemsEl.querySelectorAll(".cartItem").length === 0) {
        showEmpty();
      } else {
        recalc();
      }
    }
  });

  document.querySelector(".cartCheckoutBtn").addEventListener("click", function () {
    if (cartItemsEl.querySelectorAll(".cartItem").length === 0) return;
    alert("Заказ оформлен! Спасибо за покупку.");
    saveCart([]);
    cartItemsEl.innerHTML = "";
    showEmpty();
  });

  renderCart();
})();
