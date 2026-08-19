type AuthHeadingProps = {
  title: string;
  description: string;
};

function AuthHeading({ title, description }: AuthHeadingProps) {
  return (
    <div className="mb-6">
      <h1 className="mb-2 text-3xl font-bold text-white">{title}</h1>

      <p className="text-sm text-neutral-500">{description}</p>
    </div>
  );
}

export default AuthHeading;
