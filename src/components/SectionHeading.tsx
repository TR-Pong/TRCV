import { motion } from 'framer-motion';

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
  const eyebrowClassName =
    lang === 'th'
      ? 'text-xs font-semibold tracking-[0.03em] text-primary/80'
      : 'text-xs font-semibold uppercase tracking-[0.22em] text-primary/80';
  const titleClassName =
    lang === 'th'
      ? 'mt-4 text-4xl font-outfit font-semibold tracking-normal text-foreground md:text-5xl'
      : 'mt-4 text-4xl font-outfit font-semibold tracking-[-0.03em] text-foreground md:text-5xl';

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.45 }}
      className={`flex max-w-3xl flex-col ${alignment}`}
    >
      <div className="flex items-center gap-3">
        <span className="h-px w-10 bg-[rgba(28,28,28,0.4)]" />
        <div className={eyebrowClassName}>{eyebrow}</div>
      </div>
      <h2 className={titleClassName}>{title}</h2>
      {description ? (
        <p className="mt-5 max-w-2xl text-base leading-8 text-muted-foreground md:text-lg">{description}</p>
      ) : null}
    </motion.div>
  );
}
