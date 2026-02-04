import Image from "next/image";
import Link from "next/link";
import OrderForm from "@/components/OrderForm";
import CountdownTimer from "@/components/CountdownTimer";

const container = "mx-auto w-full max-w-[1200px] px-[4vw]";

export default function Home() {
  return (
    <>
      {/* Topbar */}
      <header className="sticky top-0 z-50 border-b border-line/90 bg-bg/70 backdrop-blur-xl">
        <div className={`${container} flex items-center justify-between py-3.5`}>
          <Link href="#top" className="flex items-center gap-2.5 font-black">
            <span className="flex h-[38px] w-[38px] items-center justify-center rounded-xl border border-line bg-gradient-to-br from-white to-[#eef6ff] text-xl shadow-lg">
              🐾
            </span>
            <span>HomeMarket • PetCare</span>
          </Link>
          <nav className="hidden items-center gap-4 text-muted md:flex">
            <Link href="#benefits" className="rounded-xl px-2.5 py-2.5 font-extrabold hover:bg-white/80 hover:border hover:border-line">
              Переваги
            </Link>
            <Link href="#reviews" className="rounded-xl px-2.5 py-2.5 font-extrabold hover:bg-white/80 hover:border hover:border-line">
              Відгуки
            </Link>
            <Link href="#faq" className="rounded-xl px-2.5 py-2.5 font-extrabold hover:bg-white/80 hover:border hover:border-line">
              FAQ
            </Link>
          </nav>
          <Link
            href="#order"
            className="inline-flex h-[52px] items-center justify-center rounded-2xl bg-mint px-[18px] font-black text-[#052016] shadow-mint transition hover:-translate-y-0.5 hover:scale-[1.02] hover:shadow-lg"
          >
            Замовити за 329 грн
          </Link>
        </div>
        <div className="border-t border-line/85 bg-white/55">
          <div className={`${container} flex flex-wrap items-center gap-3 py-2.5 text-sm font-extrabold text-muted`}>
            <span className="flex items-center gap-2.5">
              <span className="relative h-2.5 w-2.5 rounded-full bg-sale dot-ping" />
              На складі: <b>54</b> шт
            </span>
            <span>⏳ До кінця акції: <b><CountdownTimer /></b></span>
          </div>
        </div>
      </header>

      <main id="top">
        {/* Hero: спочатку картинка товару — перше, що впадає в око */}
        <section className="relative">
          {/* Велика картинка товару в самому верху */}
          <div className="relative w-full overflow-hidden bg-gradient-to-b from-mint/10 to-transparent">
            <div className="relative aspect-[4/3] w-full min-h-[280px] sm:aspect-[16/10] sm:min-h-[320px] md:aspect-[2/1] md:min-h-[380px]">
              <Image
                src="/assets/dog-hero.jpg"
                alt="Рукавиця-рушник для собак і котів"
                fill
                className="object-cover object-center animate-floaty"
                priority
                sizes="100vw"
              />
              <div
                className="pointer-events-none absolute inset-0"
                style={{
                  background: "radial-gradient(circle at 70% 50%, rgba(32,201,151,.15), transparent 50%)",
                }}
              />
            </div>
          </div>

          {/* Під картинкою — текст, ціна, кнопки */}
          <div className={`${container} relative pt-6 pb-8`}>
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="inline-flex items-center gap-2.5 rounded-full border-0 bg-gradient-to-r from-sale to-orange px-3.5 py-2.5 font-extrabold text-white shadow-lg">
                🔥 Акція -34%
              </span>
              <span className="inline-flex items-center gap-2.5 rounded-full border border-line bg-white/80 px-3.5 py-2.5 font-extrabold text-muted backdrop-blur">
                <span className="relative h-2.5 w-2.5 rounded-full bg-sale dot-ping" />
                Залишилось: <b>54</b> шт
              </span>
              <span className="rounded-full border border-line bg-white/80 px-3.5 py-2.5 font-extrabold text-muted">
                🚚 Доставка 1–3 дні
              </span>
            </div>
            <h1 className="font-display mt-4 text-[clamp(28px,4vw,48px)] font-extrabold leading-tight tracking-tight">
              Висушіть улюбленця за 3 хвилини — без калюж і шерсті
            </h1>
            <p className="mt-3 max-w-[56ch] text-base leading-snug text-muted sm:text-lg">
              Мікрофіброва рукавиця-рушник: м'яка, зручна, супер-вбираюча. Ідеально після прогулянки в дощ або купання.
            </p>
            <div className="mt-4">
              <div className="text-xl font-black text-[#94A3B8] line-through">500 грн</div>
              <div className="font-display text-[clamp(36px,4.5vw,56px)] font-extrabold leading-none tracking-tight text-sale">
                329 грн
              </div>
              <div className="mt-2 flex flex-wrap gap-2.5">
                <span className="rounded-full border border-line bg-white/80 px-3 py-2.5 font-extrabold text-muted">
                  ⏳ Акція обмежена
                </span>
                <span className="rounded-full border border-line bg-white/80 px-3 py-2.5 font-extrabold text-muted">
                  🔒 Оплата при отриманні
                </span>
                <span className="rounded-full border border-line bg-white/80 px-3 py-2.5 font-extrabold text-muted">
                  ✅ 14 днів повернення
                </span>
              </div>
            </div>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link
                href="#order"
                className="inline-flex h-14 items-center justify-center rounded-[18px] bg-mint px-6 font-black text-[#052016] shadow-mint transition hover:-translate-y-0.5 hover:scale-[1.02] hover:shadow-lg"
              >
                Замовити зараз
              </Link>
              <Link
                href="#how"
                className="inline-flex h-14 items-center justify-center rounded-[18px] border border-line bg-white/80 px-6 font-black backdrop-blur transition hover:-translate-y-0.5 hover:shadow-soft2"
              >
                Дивитись як працює
              </Link>
            </div>
            <div className="mt-4 flex flex-wrap gap-3 text-muted">
              <span className="rounded-xl border border-line bg-white/75 px-3 py-2.5 font-extrabold backdrop-blur">
                🏠 Чисто вдома
              </span>
              <span className="rounded-xl border border-line bg-white/75 px-3 py-2.5 font-extrabold backdrop-blur">
                🐾 Для собак і котів
              </span>
              <span className="rounded-xl border border-line bg-white/75 px-3 py-2.5 font-extrabold backdrop-blur">
                🧼 Легко прати
              </span>
            </div>

            {/* Міні-фото товару та характеристики */}
            <div className="mt-8 rounded-card border border-line bg-white/80 p-4 shadow-soft">
              <div className="grid gap-3 sm:grid-cols-2">
                <Image
                  src="/assets/product-1.jpg"
                  alt="Рукавиця-рушник"
                  width={340}
                  height={220}
                  className="w-full rounded-2xl border border-line object-cover"
                />
                <Image
                  src="/assets/product-2.jpg"
                  alt="Фактура мікрофібри"
                  width={340}
                  height={220}
                  className="w-full rounded-2xl border border-line object-cover"
                />
              </div>
              <div className="mt-3 grid grid-cols-3 gap-2.5">
                <div className="rounded-2xl border border-line bg-white/80 py-3 text-center font-black text-muted">
                  💧 Супер-вбирання
                </div>
                <div className="rounded-2xl border border-line bg-white/80 py-3 text-center font-black text-muted">
                  📏 62×23 см
                </div>
                <div className="rounded-2xl border border-line bg-white/80 py-3 text-center font-black text-muted">
                  🪝 Петля
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section id="benefits" className="py-14">
          <div className={container}>
            <h2 className="font-display text-[clamp(24px,2.8vw,36px)] font-extrabold tracking-tight">
              Чому це купують
            </h2>
            <p className="mt-2 max-w-[70ch] font-semibold text-muted">
              Ми продаємо не &quot;рушник&quot;, а <b>швидкість</b> і <b>чистоту</b> після прогулянок.
            </p>
            <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { icon: "🧼", title: "Миттєво вбирає вологу", desc: "Щільна мікрофібра забирає воду з першого проходу." },
                { icon: "🐕", title: "Комфорт для тварини", desc: "М'яка текстура — без стресу та подразнень." },
                { icon: "🖐", title: "Не зісковзує з руки", desc: "Форма рукавиці дає контроль і не ковзає." },
                { icon: "🏠", title: "Чистота в домі", desc: "Менше мокрих слідів і шерсті по квартирі." },
              ].map((item) => (
                <article
                  key={item.title}
                  className="rounded-card border border-line bg-white/90 p-4 shadow-sm transition hover:-translate-y-1.5 hover:bg-white hover:shadow-soft2"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-line bg-gradient-to-br from-white to-[#eef6ff] text-xl shadow-md">
                    {item.icon}
                  </div>
                  <h3 className="mt-2 text-base font-extrabold tracking-tight">{item.title}</h3>
                  <p className="mt-1 text-sm font-bold leading-snug text-muted">{item.desc}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* How */}
        <section id="how" className="border-y border-line/85 bg-white/55 py-14">
          <div className={container}>
            <h2 className="font-display text-[clamp(24px,2.8vw,36px)] font-extrabold tracking-tight">
              Як працює
            </h2>
            <p className="mt-2 max-w-[70ch] font-semibold text-muted">
              3 кроки — і улюбленець сухий. Економить до 10 хвилин після кожної прогулянки.
            </p>
            <div className="mt-6 grid gap-4 lg:grid-cols-2 lg:items-stretch">
              <div className="rounded-card border border-line bg-white/90 p-4 shadow-md">
                <div className="mb-2 flex flex-wrap gap-2.5">
                  <span className="rounded-full border border-mint/35 bg-mint/10 px-3.5 py-2 font-extrabold text-[#0a3a2a]">
                    ⏱ 3 хвилини
                  </span>
                  <span className="rounded-full border border-line bg-white/80 px-3.5 py-2 font-extrabold text-muted">
                    Без калюж
                  </span>
                </div>
                <ul className="list-inside list-disc pl-4 font-semibold text-muted">
                  <li>Двостороння мікрофібра</li>
                  <li>Посилені краї</li>
                  <li>Петля для зберігання</li>
                </ul>
              </div>
              <div className="space-y-3">
                {[
                  { num: "1", title: "Одягніть рукавицю", desc: "Тримається як варежка — зручно навіть однією рукою." },
                  { num: "2", title: "Протріть шерсть або лапи", desc: "Ворсинки забирають вологу і бруд, не травмуючи шкіру." },
                  { num: "3", title: "Готово — чисто вдома", desc: "Менше калюж, менше запаху, менше шерсті." },
                ].map((step) => (
                  <div
                    key={step.num}
                    className="flex gap-3 rounded-2xl border border-line bg-white/90 p-3.5"
                  >
                    <span className="flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-xl border border-mint/35 bg-mint/10 font-extrabold text-[#0A3A2A]">
                      {step.num}
                    </span>
                    <div>
                      <b className="block font-extrabold">{step.title}</b>
                      <span className="text-sm font-bold text-muted">{step.desc}</span>
                    </div>
                  </div>
                ))}
                <div className="flex flex-wrap items-center justify-between gap-4 rounded-[20px] border border-line bg-white/90 p-4 shadow-sm">
                  <div>
                    <div className="font-extrabold">Забирайте по акції сьогодні</div>
                    <div className="mt-1 flex items-center gap-2 font-extrabold text-muted">
                      <span className="relative h-2.5 w-2.5 rounded-full bg-sale dot-ping" />
                      Залишилось: <b>54</b> шт
                    </div>
                  </div>
                  <Link
                    href="#order"
                    className="inline-flex h-[52px] items-center justify-center rounded-2xl bg-mint px-5 font-black text-[#052016] shadow-mint"
                  >
                    Забрати за 329
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Reviews */}
        <section id="reviews" className="py-14">
          <div className={container}>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <h2 className="font-display text-[clamp(24px,2.8vw,36px)] font-extrabold tracking-tight">
                  Відгуки покупців
                </h2>
                <p className="mt-2 font-semibold text-muted">Коротко, по суті, тільки те, що читають.</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-4xl font-extrabold tracking-tight">4.9</span>
                <div className="font-extrabold text-muted">
                  ★★★★★
                  <br />
                  <span className="text-xs font-bold">на основі відгуків</span>
                </div>
              </div>
            </div>
            <div className="mt-4 overflow-hidden rounded-card border border-line bg-white/70 p-4 shadow-md">
              <div className="flex w-max gap-3 animate-marquee hover:[animation-play-state:paused]">
                {[
                  { name: "Анна, Львів", letter: "А", text: "Після дощу — мастхев. Собака суха за кілька хвилин, підлога чиста." },
                  { name: "Олег, Київ", letter: "О", text: "Дуже м'яка. Пес не виривається як з звичайним рушником." },
                  { name: "Ірина, Дніпро", letter: "І", text: "Купила другу — одну тримаю в авто. Зручно й швидко." },
                  { name: "Марина, Одеса", letter: "М", text: "Підходить і для кота — лапи витираю моментально." },
                ].flatMap((r) => [r, r]).map((review, i) => (
                  <article
                    key={`${review.name}-${i}`}
                    className="w-[330px] shrink-0 rounded-[20px] border border-line bg-white/95 p-4 shadow-sm transition hover:-translate-y-1.5 hover:shadow-soft2"
                  >
                    <div className="mb-2.5 flex items-center gap-2.5">
                      <span className="flex h-[42px] w-[42px] items-center justify-center rounded-2xl border border-line bg-gradient-to-br from-mint/25 to-orange/20 font-extrabold">
                        {review.letter}
                      </span>
                      <div>
                        <b className="block">{review.name}</b>
                        <span className="text-sm font-extrabold text-amber-500">★★★★★</span>
                      </div>
                    </div>
                    <p className="text-sm font-bold leading-snug text-muted">{review.text}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="border-y border-line/85 bg-white/55 py-14">
          <div className={container}>
            <h2 className="font-display text-[clamp(24px,2.8vw,36px)] font-extrabold tracking-tight">
              FAQ
            </h2>
            <p className="mt-2 font-semibold text-muted">Знімаємо заперечення перед покупкою.</p>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {[
                { q: "Підійде для великого собаки?", a: "Так, розмір універсальний. Зручно витирати лапи, шерсть і живіт." },
                { q: "Можна прати в машинці?", a: "Так, 30–40°C. Без агресивних відбілювачів." },
                { q: "Підходить для котів?", a: "Так, особливо для лап та шерсті. М'яка тканина — без дискомфорту." },
                { q: "Оплата та гарантія?", a: "Оплата при отриманні. 14 днів на повернення за умови товарного вигляду." },
              ].map((faq) => (
                <details
                  key={faq.q}
                  className="group rounded-[20px] border border-line bg-white/90 p-4 shadow-sm"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-3 font-extrabold [&::-webkit-details-marker]:hidden">
                    {faq.q}
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-line bg-mint/10 transition group-open:rotate-45">
                      ＋
                    </span>
                  </summary>
                  <p className="mt-2.5 font-bold leading-snug text-muted">{faq.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Order */}
        <section id="order" className="py-14">
          <div className={container}>
            <h2 className="font-display text-[clamp(24px,2.8vw,36px)] font-extrabold tracking-tight">
              Оформіть замовлення
            </h2>
            <p className="mt-2 font-semibold text-muted">
              Заповніть ПІБ і телефон — заявка прийде вам у Telegram миттєво.
            </p>
            <div className="mt-6 grid gap-4 lg:grid-cols-2 lg:items-start">
              <div className="rounded-card border border-line bg-white/90 p-4 shadow-soft">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <div className="font-black text-muted">Сьогодні по акції</div>
                    <div className="mt-1 flex items-baseline gap-2.5">
                      <span className="font-black text-[#94A3B8] line-through">500 грн</span>
                      <span className="text-3xl font-extrabold tracking-tight text-sale">329 грн</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2.5 font-black text-muted">
                    <span className="relative h-2.5 w-2.5 rounded-full bg-sale dot-ping" />
                    Залишилось <b>54</b> шт
                  </div>
                </div>
                <div className="mt-2.5 rounded-2xl border border-line bg-white/80 py-3 px-3.5 font-extrabold text-muted">
                  ⏳ До кінця акції: <b><CountdownTimer /></b>
                </div>
                <div className="mt-3 flex flex-wrap gap-2.5">
                  <span className="rounded-full border border-line bg-white/80 px-3 py-2 font-extrabold text-muted">
                    🚚 1–3 дні
                  </span>
                  <span className="rounded-full border border-line bg-white/80 px-3 py-2 font-extrabold text-muted">
                    🔒 Оплата при отриманні
                  </span>
                  <span className="rounded-full border border-line bg-white/80 px-3 py-2 font-extrabold text-muted">
                    ✅ 14 днів повернення
                  </span>
                </div>
              </div>
              <OrderForm />
            </div>
          </div>
        </section>

        <footer className="border-t border-line/90 py-8 font-bold text-muted">
          <div className={`${container} flex flex-wrap justify-between gap-4`}>
            <div>© {new Date().getFullYear()} HomeMarket • PetCare</div>
            <div className="flex gap-3">
              <Link href="#order" className="font-black">
                Замовити
              </Link>
              <span>Політика конфіденційності</span>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}
