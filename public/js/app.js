// ===== CONFIG =====
const API_BASE = "";              // если фронт и сервер на одном домене — оставь пустым
const LEAD_ENDPOINT = `${API_BASE}/api/lead`;

const DEFAULT_STOCK = 54;
const STOCK_KEY = "pet_stock_v1";
const TIMER_KEY = "pet_timer_end_v1"; // end timestamp in ms

const PRICE_1 = 329;
const PRICE_2 = 599;

// ===== Helpers =====
const $ = (s, el=document) => el.querySelector(s);
const $$ = (s, el=document) => Array.from(el.querySelectorAll(s));

function clamp(n, a, b){ return Math.max(a, Math.min(b, n)); }
function pad2(n){ return String(n).padStart(2,"0"); }
function sleep(ms){ return new Promise(r=>setTimeout(r,ms)); }

function setText(id, value){
  const el = document.getElementById(id);
  if(el) el.textContent = String(value);
}

// ===== YEAR =====
setText("year", new Date().getFullYear());

// ===== Stock (persist locally; server also can manage in DB if you want) =====
let stock = Number(localStorage.getItem(STOCK_KEY));
if(!Number.isFinite(stock) || stock <= 0) stock = DEFAULT_STOCK;

function renderStock(){
  ["stockTop","stockHero","stockPromo","stockOrder"].forEach(id=>setText(id, stock));
}
renderStock();

// ===== Timer: 24h from first visit (persist) =====
let endTs = Number(localStorage.getItem(TIMER_KEY));
const now = Date.now();
if(!Number.isFinite(endTs) || endTs < now){
  endTs = now + 24*60*60*1000; // 24h
  localStorage.setItem(TIMER_KEY, String(endTs));
}

function formatRemaining(ms){
  const s = Math.floor(ms/1000);
  const hh = Math.floor(s/3600);
  const mm = Math.floor((s%3600)/60);
  const ss = s%60;
  return `${pad2(hh)}:${pad2(mm)}:${pad2(ss)}`;
}

function tickTimer(){
  const ms = endTs - Date.now();
  const val = ms > 0 ? formatRemaining(ms) : "00:00:00";
  setText("timerTop", val);
  setText("timerPromo", val);
  setText("timerOrder", val);
}
tickTimer();
setInterval(tickTimer, 1000);

// ===== Viewers counter (realistic random) =====
let viewers = clamp(Math.floor(7 + Math.random()*19), 7, 26);
setText("viewersTop", viewers);

setInterval(() => {
  const drift = Math.floor(-2 + Math.random()*5); // -2..+2
  viewers = clamp(viewers + drift, 6, 29);
  setText("viewersTop", viewers);
}, 4500);

// ===== Floating CTA appear on scroll =====
const floating = $(".floating-cta");
function onScroll(){
  const y = window.scrollY || 0;
  if(y > 520) floating.classList.add("show");
  else floating.classList.remove("show");
}
window.addEventListener("scroll", onScroll, { passive:true });
onScroll();

// ===== Reveal animations =====
const io = new IntersectionObserver((entries)=>{
  for(const e of entries){
    if(e.isIntersecting){
      e.target.classList.add("in");
      io.unobserve(e.target);
    }
  }
},{ threshold:0.12 });

$$(".reveal").forEach(el=>io.observe(el));

// ===== Reviews marquee duplication for seamless loop =====
(function duplicateReviews(){
  const track = $("#reviewsTrack");
  if(!track) return;
  // clone children once to allow -50% animation
  const items = Array.from(track.children);
  items.forEach(node => track.appendChild(node.cloneNode(true)));
})();

// ===== Social proof toast (fake but effective) =====
const toast = $("#socialToast");
const cities = ["Київ","Львів","Одеса","Дніпро","Харків","Вінниця","Полтава","Івано-Франківськ"];
const names = ["Анна","Олег","Ірина","Марина","Денис","Світлана","Катерина","Артем","Вікторія"];

async function showSocialProof(){
  if(!toast) return;
  const city = cities[Math.floor(Math.random()*cities.length)];
  const name = names[Math.floor(Math.random()*names.length)];
  const mins = clamp(Math.floor(1+Math.random()*18), 1, 25);

  toast.innerHTML = `✅ <b>${name}</b> щойно оформив(ла) замовлення
    <small>${city} • ${mins} хв тому</small>`;
  toast.classList.add("show");
  await sleep(3200);
  toast.classList.remove("show");
}
setTimeout(showSocialProof, 4200);
setInterval(showSocialProof, 15000);

// ===== Phone mask UA (+380 (__) ___-__-__) =====
const phoneInput = $("#phone");
function maskPhone(value){
  // keep digits only
  let d = value.replace(/\D/g,"");
  // Ensure starts with 380
  if(d.startsWith("0")) d = "38" + d;
  if(!d.startsWith("380")) d = "380" + d.replace(/^38?0?/, "");
  d = d.slice(0, 12); // 380 + 9 digits

  const p = d.padEnd(12, "_").split("");
  // +380 (XX) XXX-XX-XX
  return `+${p[0]}${p[1]}${p[2]} (${p[3]}${p[4]}) ${p[5]}${p[6]}${p[7]}-${p[8]}${p[9]}-${p[10]}${p[11]}`.replace(/_/g,"");
}
function isValidUA(phone){
  const d = phone.replace(/\D/g,"");
  return d.length === 12 && d.startsWith("380");
}
if(phoneInput){
  phoneInput.addEventListener("input", (e)=>{
    const caret = e.target.selectionStart;
    e.target.value = maskPhone(e.target.value);
    // caret handling is complex; keep it simple
    e.target.setSelectionRange(e.target.value.length, e.target.value.length);
  });
}

// ===== Form submit =====
const form = $("#leadForm");
const statusEl = $("#formStatus");

function setStatus(msg, ok=false){
  if(!statusEl) return;
  statusEl.textContent = msg;
  statusEl.className = "form__status " + (ok ? "ok" : "bad");
}

function getSelectedPack(){
  const el = document.querySelector('input[name="pack"]:checked');
  return el ? el.value : "1";
}

function getUTM(){
  return Object.fromEntries(new URLSearchParams(window.location.search));
}

form?.addEventListener("submit", async (ev)=>{
  ev.preventDefault();
  setStatus("");

  const fd = new FormData(form);

  // honeypot
  const hp = String(fd.get("company") || "").trim();
  if(hp){
    setStatus("Помилка відправки. Спробуйте ще раз.", false);
    return;
  }

  const name = String(fd.get("name") || "").trim();
  const phone = String(fd.get("phone") || "").trim();
  const pack = getSelectedPack();

  if(name.length < 2){
    setStatus("Вкажіть ПІБ (мінімум 2 символи).", false);
    return;
  }
  if(!isValidUA(phone)){
    setStatus("Вкажіть номер у форматі +380 (XX) XXX-XX-XX", false);
    return;
  }

  const price_new = pack === "2" ? PRICE_2 : PRICE_1;
  const pack_label = pack === "2" ? "2 шт" : "1 шт";

  const payload = {
    name,
    phone,
    pack: pack_label,
    price_old: 500,
    price_new,
    stock_ui: stock,
    source: window.location.hostname + window.location.pathname,
    url: window.location.href,
    ts_client: new Date().toISOString(),
    utm: getUTM()
  };

  try{
    setStatus("Відправляємо заявку…", true);

    const res = await fetch(LEAD_ENDPOINT, {
      method:"POST",
      headers:{ "Content-Type":"application/json" },
      body: JSON.stringify(payload)
    });

    if(!res.ok){
      const t = await res.text().catch(()=> "");
      console.error("Server:", t);
      setStatus("Не вдалося відправити. Спробуйте ще раз.", false);
      return;
    }

    // decrement stock on success (UI)
    if(stock > 1){
      stock -= 1;
      localStorage.setItem(STOCK_KEY, String(stock));
      renderStock();
    }

    form.reset();
    // return mask placeholder
    if(phoneInput) phoneInput.value = "";

    setStatus("✅ Заявку відправлено! Ми зв’яжемось найближчим часом.", true);
  }catch(err){
    console.error(err);
    setStatus("Немає з’єднання. Спробуйте ще раз.", false);
  }
});
