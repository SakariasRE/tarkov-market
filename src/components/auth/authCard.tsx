type AuthCardProps = {
  children: React.ReactNode;
};

function AuthCard({ children }: AuthCardProps) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-neutral-950 px-6">
      <section className="w-full max-w-md">{children}</section>
    </main>
  );
}

export default AuthCard;
