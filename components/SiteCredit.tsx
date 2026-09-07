import Container from "@components/Container";
import { ORIGINAL_SITE_URL } from "@/data/attribution";
import { getStrings } from "@/strings";

export default function SiteCredit() {
  const { globalStrings } = getStrings();

  return (
    <footer className="relative z-10 border-t dark:border-white/5 light:border-black/5 py-10">
      <Container>
        <p className="text-center text-[11px] font-medium uppercase tracking-[0.2em] dark:text-neutral-600 light:text-neutral-500">
          <a
            href={ORIGINAL_SITE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors duration-200 dark:hover:text-neutral-400 light:hover:text-neutral-800"
          >
            {globalStrings.siteCredit}
          </a>
        </p>
      </Container>
    </footer>
  );
}
