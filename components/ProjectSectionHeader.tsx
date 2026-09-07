type ProjectSectionHeaderProps = {
  title: string;
  description?: string;
  className?: string;
};

export default function ProjectSectionHeader({
  title,
  description,
  className = "mb-16 md:mb-24",
}: ProjectSectionHeaderProps) {
  return (
    <div className={`space-y-6 max-w-2xl ${className}`}>
      <h2 className="text-3xl font-medium tracking-tight dark:text-white light:text-black md:text-4xl">
        {title}
      </h2>
      {description && (
        <p className="text-sm leading-relaxed dark:text-neutral-400 light:text-neutral-700 md:text-base">
          {description}
        </p>
      )}
    </div>
  );
}
