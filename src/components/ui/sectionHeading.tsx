type SectionHeadingProps = {
  id: string;
  title: string;
  meta?: string;
};

function SectionHeading({ id, title, meta }: SectionHeadingProps) {
  return (
    <div className="mb-4 flex items-center justify-between">
      <h2 id={id} className="text-lg font-semibold text-white">
        {title}
      </h2>

      {meta && (
        <p className="text-sm text-neutral-400" aria-live="polite">
          {meta}
        </p>
      )}
    </div>
  );
}

export default SectionHeading;
