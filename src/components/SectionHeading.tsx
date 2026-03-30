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
  const alignment = align === 'center' ? 'text-center items-center' : 'text-left items-start';
  const eyebrowClassName =
    lang === 'th'
      ? 'text-xs font-semibold tracking-[0.04em] text-primary/75'
      : 'text-xs font-semibold uppercase tracking-[0.28em] text-primary/75';
  const titleClassName =
    lang === 'th'
      ? 'mt-4 text-4xl font-outfit font-semibold tracking-normal text-foreground md:text-5xl'
      : 'mt-4 text-4xl font-outfit font-semibold tracking-tight text-foreground md:text-5xl';

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.45 }}
      className={`flex max-w-3xl flex-col ${alignment}`}
    >
      <div className={eyebrowClassName}>{eyebrow}</div>
      <h2 className={titleClassName}>{title}</h2>
      {description ? (
        <p className="mt-4 text-base leading-8 text-muted-foreground md:text-lg">{description}</p>
      ) : null}
    </motion.div>
  );
}
