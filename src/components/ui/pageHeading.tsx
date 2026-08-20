type PageHeadingProps = {
  title: string;
  description?: string;
};

function PageHeading({ title, description }: PageHeadingProps) {
  return (
    <div>
      <h1 className="text-2xl font-semibold text-white">{title}</h1>

      {description && (
        <p className="mt-1 text-sm text-neutral-400">{description}</p>
      )}
    </div>
  );
}

export default PageHeading;
