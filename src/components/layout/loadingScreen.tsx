function LoadingScreen() {
  return (
    <main
      aria-busy="true"
      className="flex min-h-screen items-center justify-center bg-neutral-950"
    >
      <p className="text-sm text-neutral-500">Laddar…</p>
    </main>
  );
}

export default LoadingScreen;
