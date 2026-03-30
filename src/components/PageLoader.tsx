'use client';

import { motion } from 'framer-motion';

export default function PageLoader({
  label = 'Loading',
  fullscreen = true,
}: {
  label?: string;
  fullscreen?: boolean;
}) {
  return (
    <div
      className={`flex items-center justify-center ${
        fullscreen ? 'min-h-screen px-6 py-10' : 'absolute inset-0 px-6 py-10'
      }`}
    >
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center gap-5 rounded-[32px] border border-border bg-white/88 px-8 py-7 text-center shadow-[0_24px_60px_rgba(15,23,42,0.08)] backdrop-blur"
      >
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-slate-950" />
          <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-slate-400 [animation-delay:120ms]" />
          <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-slate-300 [animation-delay:240ms]" />
        </div>
        <div className="text-sm font-medium tracking-[0.12em] text-muted-foreground uppercase">{label}</div>
      </motion.div>
    </div>
  );
}
