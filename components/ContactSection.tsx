import { contactLinkOrder, contactLinks } from "@/data/contact";
import { getStrings } from "@/strings";
import StickySection from "@/components/StickySection";

export default function ContactSection() {
  const { contact: s } = getStrings();

  // Optimization: Pre-compute external status and labels to keep the map render loop completely pure
  const formattedLinks = contactLinkOrder.map((key) => {
    const item = contactLinks[key];
    const isExternal = item.href.startsWith("http") || item.href.startsWith("//");
    
    return {
      ...item,
      label: s.labels[item.key],
      isExternal,
      // Safely spread your conditional target attributes upfront
      linkAttributes: isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {},
    };
  });

  return (
    <StickySection id="contact" badgeLabel={s.sectionLabel}>
      <h2 className="text-3xl font-medium tracking-tight dark:text-white light:text-black md:text-4xl">
        {s.title}
      </h2>
      <p className="mt-3 text-sm leading-relaxed dark:text-neutral-500 light:text-neutral-600 md:text-base">
        {s.description}
      </p>

      {/* Optimized Links Directory Container */}
      <ul className="mt-12 divide-y dark:divide-white/5 light:divide-black/5 border-y dark:border-white/5 light:border-black/5">
        {formattedLinks.map(({ key, href, display, label, isExternal, linkAttributes }) => (
          <li key={key}>
            <a
              href={href}
              {...linkAttributes}
              className="group flex flex-col gap-1 py-6 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8 dark:hover:bg-white/[0.01] light:hover:bg-black/[0.02] px-2 -mx-2 rounded-lg transition-all duration-200"
            >
              {/* Category Label */}
              <span className="text-[12px] uppercase tracking-[0.2em] dark:text-neutral-500 light:text-neutral-600 transition-colors duration-200 dark:group-hover:text-neutral-400 light:group-hover:text-neutral-800">
                {label}
              </span>
              
              {/* Action Display String */}
              <span className="text-sm dark:text-neutral-200 light:text-neutral-800 transition-colors duration-200 dark:group-hover:text-white light:group-hover:text-black md:text-base flex items-center gap-1.5">
                {display}
                {isExternal && (
                  <span className="inline-block dark:text-neutral-600 light:text-neutral-500 transition-transform duration-300 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-indigo-400">
                    ↗
                  </span>
                )}
              </span>
            </a>
          </li>
        ))}
      </ul>
    </StickySection>
  );
}
