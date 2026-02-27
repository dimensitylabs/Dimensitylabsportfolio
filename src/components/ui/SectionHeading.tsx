// src/components/ui/SectionHeading.tsx

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  titleHtml?: string;
  maxWidth?: string;
  dark?: boolean;
}

export function SectionHeading({
  eyebrow,
  title,
  titleHtml,
  maxWidth,
  dark = false,
}: SectionHeadingProps) {
  return (
    <div>
      <div className="section-eyebrow">
        <span
          className="t-label"
          style={dark ? { color: 'rgba(198,241,53,0.6)' } : undefined}
        >
          {eyebrow}
        </span>
      </div>
      {titleHtml ? (
        <h2
          className="t-h2"
          style={{
            maxWidth,
            color: dark ? 'var(--clr-white)' : undefined,
          }}
          dangerouslySetInnerHTML={{ __html: titleHtml }}
        />
      ) : (
        <h2
          className="t-h2"
          style={{
            maxWidth,
            color: dark ? 'var(--clr-white)' : undefined,
          }}
        >
          {title}
        </h2>
      )}
    </div>
  );
}
