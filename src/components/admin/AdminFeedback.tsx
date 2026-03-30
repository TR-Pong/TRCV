import { motion } from 'framer-motion';

export function AdminFeedback({ message }: { message: string }) {
  if (!message) {
    return null;
  }

  const success = message.toLowerCase().includes('success');

  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      className={`rounded-2xl border px-4 py-3 text-sm font-medium ${
        success
          ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
          : 'border-red-200 bg-red-50 text-red-700'
      }`}
    >
      {message}
    </motion.div>
  );
}
