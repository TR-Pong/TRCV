import { FaEnvelope, FaGithub, FaLinkedin } from 'react-icons/fa';

interface FooterProps {
  lang: 'en' | 'th';
}

export default function Footer({ lang }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-white py-14">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-5 md:px-8 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <div className="text-2xl font-outfit font-semibold text-foreground">
            Tana<span className="text-primary">.</span>CV
          </div>
          <p className="mt-4 max-w-md text-sm leading-7 text-muted-foreground">
            {lang === 'th'
              ? '\u0e1e\u0e2d\u0e23\u0e4c\u0e15\u0e42\u0e1f\u0e25\u0e34\u0e42\u0e2d\u0e2a\u0e33\u0e2b\u0e23\u0e31\u0e1a\u0e23\u0e27\u0e1a\u0e23\u0e27\u0e21\u0e1b\u0e23\u0e30\u0e2a\u0e1a\u0e01\u0e32\u0e23\u0e13\u0e4c \u0e17\u0e31\u0e01\u0e29\u0e30 \u0e41\u0e25\u0e30\u0e1c\u0e25\u0e07\u0e32\u0e19\u0e14\u0e49\u0e32\u0e19\u0e01\u0e32\u0e23\u0e1e\u0e31\u0e12\u0e19\u0e32\u0e40\u0e27\u0e47\u0e1a\u0e41\u0e25\u0e30\u0e1c\u0e25\u0e34\u0e15\u0e20\u0e31\u0e13\u0e11\u0e4c\u0e14\u0e34\u0e08\u0e34\u0e17\u0e31\u0e25'
              : 'A portfolio focused on product thinking, frontend craft, and clear digital experiences.'}
          </p>
        </div>

        <div className="flex flex-col gap-6 lg:items-end">
          <div className="flex items-center gap-5">
            <a
              href="https://github.com/tr-pong"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground transition hover:text-foreground"
            >
              <FaGithub size={20} />
            </a>
            <a
              href="https://www.linkedin.com/in/tanakhom-rat/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground transition hover:text-foreground"
            >
              <FaLinkedin size={20} />
            </a>
            <a
              href="mailto:tanakhom.rattana@hotmail.com"
              className="text-muted-foreground transition hover:text-foreground"
            >
              <FaEnvelope size={20} />
            </a>
          </div>

          <div className="text-sm text-muted-foreground lg:text-right">
            <p>
              © {currentYear} Tanakhom Rattanasrisawat.{' '}
              {lang === 'th'
                ? 'สงวนลิขสิทธิ์.'
                : 'All rights reserved.'}
            </p>
            <p className="mt-2 text-xs opacity-80">
              {lang === 'th' ? 'สร้างด้วย' : 'Built with'} Next.js,
              Tailwind CSS & Framer Motion
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
