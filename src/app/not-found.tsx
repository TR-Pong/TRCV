import Link from 'next/link';
import { cookies, headers } from 'next/headers';
import { FiArrowRight, FiHome } from 'react-icons/fi';
import { defaultPublicLocale, isPublicLocale, LANGUAGE_COOKIE_KEY } from '@/lib/i18n/public-resources';

const PUBLIC_LOCALE_HEADER = 'x-public-locale';

const copy = {
  en: {
    eyebrow: '404 / field incident',
    title: 'A lost page met an unknown cable.',
    description:
      'The route is gone. The cave technician is still investigating why the strange black wire tasted like thunder.',
    primary: 'Back to Home',
    secondary: 'View Work',
    figureLabel: 'Cartoon ancient character getting surprised by an unknown cable',
    status: 'No route signal',
    noteLabel: 'Incident note',
    note: 'Unknown cable connected to mouth. Result: temporary page outage.',
  },
  th: {
    eyebrow: '404 / บันทึกเหตุขัดข้อง',
    title: 'หน้านี้หลุดไปกับสายไฟปริศนา',
    description:
      'เส้นทางนี้หายไปแล้ว ส่วนช่างยุคโบราณกำลังตรวจสอบว่าสายสีดำแปลก ๆ ทำไมถึงมีรสเหมือนฟ้าร้อง',
    primary: 'กลับหน้าหลัก',
    secondary: 'ดูผลงาน',
    figureLabel: 'ภาพการ์ตูนตัวละครยุคโบราณตกใจจากสายไฟที่ไม่รู้จัก',
    status: 'ไม่พบสัญญาณของเส้นทาง',
    noteLabel: 'บันทึกเหตุการณ์',
    note: 'นำสายที่ไม่รู้จักไปแตะปาก ผลลัพธ์คือหน้านี้หยุดทำงานชั่วคราว',
  },
} as const;

export default async function NotFound() {
  const [headerStore, cookieStore] = await Promise.all([headers(), cookies()]);
  const headerLocale = headerStore.get(PUBLIC_LOCALE_HEADER) ?? undefined;
  const cookieLocale = cookieStore.get(LANGUAGE_COOKIE_KEY)?.value;
  const locale = isPublicLocale(headerLocale)
    ? headerLocale
    : isPublicLocale(cookieLocale)
      ? cookieLocale
      : defaultPublicLocale;
  const text = copy[locale];

  return (
    <main className="min-h-screen overflow-hidden bg-background text-foreground">
      <section className="public-container grid min-h-screen min-w-0 grid-rows-[auto_1fr_auto] gap-8 py-8 md:gap-10 md:py-10">
        <div className="flex items-center justify-between border-b border-[var(--color-rule)] pb-5">
          <Link href="/" className="focus-ring font-display text-2xl font-black tracking-[-0.04em]">
            Tana.CV
          </Link>
          <span className="hidden text-sm font-semibold text-[var(--color-ink-2)] sm:block">
            {text.status}
          </span>
        </div>

        <div className="grid min-w-0 items-center gap-10 lg:grid-cols-[minmax(0,0.86fr)_minmax(0,1.14fr)]">
          <div className="relative min-w-0">
            <div
              className={`mb-7 inline-flex items-center gap-2 rounded-full border border-[var(--color-interactive-border)] bg-[var(--color-paper-2)] px-4 py-2 text-xs font-bold text-[var(--color-signal)] shadow-[var(--shadow-button-inset)] ${
                locale === 'th' ? 'font-thai tracking-normal' : 'uppercase tracking-[0.18em]'
              }`}
            >
            <span className="h-2 w-2 rounded-full bg-[var(--color-signal)]" />
            {text.eyebrow}
          </div>

          <h1
            className={`max-w-[11ch] text-[clamp(3.6rem,13vw,8.5rem)] font-black ${
              locale === 'th'
                ? 'font-thai leading-[1.08] tracking-normal'
                : 'font-display leading-[0.82] tracking-[-0.06em]'
            }`}
          >
            {text.title}
          </h1>

          <p className="mt-8 max-w-[62ch] text-lg leading-8 text-[var(--color-ink-2)] md:text-xl md:leading-9">
            {text.description}
          </p>

          <div className="mt-10 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
            <Link
              href="/"
              className="focus-ring inline-flex items-center justify-center gap-3 whitespace-nowrap rounded-full bg-[var(--color-ink)] px-6 py-4 text-sm font-extrabold leading-none text-[var(--color-on-dark)] transition-colors hover:bg-[var(--color-signal)] active:opacity-80"
            >
              <FiHome aria-hidden="true" />
              {text.primary}
            </Link>
            <Link
              href="/#projects"
              className="focus-ring inline-flex items-center justify-center gap-3 whitespace-nowrap rounded-full border border-[var(--color-interactive-border)] bg-transparent px-6 py-4 text-sm font-extrabold leading-none transition-colors hover:bg-[var(--color-signal-soft)] active:opacity-80"
            >
              {text.secondary}
              <FiArrowRight aria-hidden="true" />
            </Link>
          </div>
        </div>

          <figure className="relative min-w-0">
            <div className="not-found-panel relative overflow-hidden rounded-[1.75rem] border border-[var(--color-rule)] bg-[var(--color-paper-2)] p-3 md:p-5">
              <div className="absolute left-5 top-5 z-10 rounded-full border border-[var(--color-rule)] bg-[var(--color-paper-2)] px-4 py-2 font-display text-4xl font-black leading-none tracking-[-0.06em] md:text-6xl">
                404
              </div>
              <NotFoundIllustration label={text.figureLabel} />
            </div>

            <figcaption className="mt-4 grid gap-3 border-t border-[var(--color-rule)] pt-4 text-sm text-[var(--color-ink-2)] sm:grid-cols-[auto_minmax(0,1fr)]">
              <span className="font-bold text-foreground">{text.noteLabel}</span>
              <span>{text.note}</span>
            </figcaption>
          </figure>
        </div>

        <div className="flex items-center justify-between border-t border-[var(--color-rule)] pt-5 text-xs font-bold text-[var(--color-ink-2)]">
          <span>HTTP 404</span>
          <span>{text.status}</span>
        </div>
      </section>
    </main>
  );
}

function NotFoundIllustration({ label }: { label: string }) {
  return (
    <svg
      className="not-found-illustration h-auto w-full"
      viewBox="0 0 720 520"
      role="img"
      aria-label={label}
    >
      <defs>
        <linearGradient id="caveShadow" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stopColor="var(--color-rule)" stopOpacity="0.55" />
          <stop offset="100%" stopColor="var(--color-rule)" stopOpacity="0.08" />
        </linearGradient>
      </defs>

      <rect width="720" height="520" rx="28" fill="var(--color-paper)" />
      <path d="M520 410V175c0-74 41-118 91-118s91 44 91 118v235" fill="url(#caveShadow)" opacity="0.72" />
      <path d="M60 410h600" className="nf-ground" />
      <path d="M96 410c35-54 86-54 121 0" className="nf-bush" />
      <path d="M571 410c25-39 61-39 86 0" className="nf-bush" />

      <g className="nf-sparks" fill="none" stroke="var(--color-signal)" strokeLinecap="round" strokeWidth="8">
        <path d="M347 119l-17 34 31-9-17 34" />
        <path d="M418 140l-14 25 25-6-14 25" />
        <path d="M279 154l-11 20 20-5-11 21" />
      </g>

      <path d="M106 405c96 0 155-18 211-93 36-48 65-55 96-15 38 49 81 90 188 82" className="nf-wire" />
      <path d="M393 285c37 0 46 36 31 65-10 19-28 35-54 35-43 0-67-33-58-67 8-27 35-33 81-33Z" fill="var(--color-signal-soft)" />

      <g className="nf-character">
        <path d="M326 393l-19 58" className="nf-limb" />
        <path d="M388 393l22 58" className="nf-limb" />
        <path d="M295 286l-54 67" className="nf-limb" />
        <path d="M419 286l68 51" className="nf-limb" />
        <path d="M292 242c43-36 106-31 135 9 26 37 12 99-26 132-34 30-90 26-121-8-34-38-27-100 12-133Z" fill="var(--color-cave-hide)" />
        <path d="M306 267c23-18 57-19 82 4 26 24 31 67 9 94-27 33-79 27-105-5-23-28-15-70 14-93Z" fill="var(--color-signal-soft)" opacity="0.65" />
        <circle cx="356" cy="208" r="55" fill="var(--color-cave-skin)" />
        <path d="M301 199c10-52 44-74 88-55 38 17 46 52 28 76-21-12-41-30-57-54-13 23-32 35-59 33Z" fill="var(--color-ink)" />
        <path d="M310 217c27 46 74 58 112 24-4 35-30 62-65 62-32 0-54-28-47-86Z" fill="var(--color-ink)" />
        <circle cx="338" cy="211" r="5" fill="var(--color-ink)" />
        <circle cx="379" cy="211" r="5" fill="var(--color-ink)" />
        <path d="M352 229c10 8 20 8 30 0" fill="none" stroke="var(--color-ink)" strokeLinecap="round" strokeWidth="5" />
      </g>

      <path d="M251 354c-14 9-18 22-8 34" className="nf-hand" />
      <path d="M485 337c16-2 28 6 33 21" className="nf-hand" />
      <path d="M333 249c41 19 84 51 105 90" className="nf-mouth-wire" />
    </svg>
  );
}
