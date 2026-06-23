export default function SectionHeading({
  eyebrow,
  title,
  description,
  lang = 'en',
  align = 'left',
}: {
  eyebrow: string;
  title: string;
  description?: string;
  lang?: 'en' | 'th';
  align?: 'left' | 'center';
}) {
  const alignment = align === 'center' ? 'text-center items-center mx-auto' : 'text-left items-start';
  const titleClassName =
    lang === 'th'
      ? 'text-[2.35rem] font-thai font-semibold leading-[1.12] tracking-normal text-inherit md:text-5xl'
      : 'text-[2.35rem] font-display font-bold leading-[1.04] tracking-[-0.025em] text-inherit md:text-5xl';

  return (
    <div className={`flex max-w-3xl flex-col ${alignment}`}>
      <p className={`mb-4 text-sm font-semibold text-current opacity-65 ${lang === 'th' ? 'tracking-normal' : 'tracking-[0.08em]'}`}>
        {eyebrow}
      </p>
      <h2 className={titleClassName}>{title}</h2>
      {description ? (
        <p className="mt-5 max-w-2xl text-base leading-8 text-current opacity-65 md:text-lg">{description}</p>
      ) : null}
    </div>
  );
}
