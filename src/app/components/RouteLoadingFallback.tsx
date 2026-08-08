export function RouteLoadingFallback() {
  return (
    <div
      role="status"
      aria-live="polite"
      className="flex min-h-[45vh] items-center justify-center px-6 py-20 text-[#a9a9be]"
    >
      <span className="text-sm uppercase tracking-[0.16em]">Loading page…</span>
    </div>
  );
}
