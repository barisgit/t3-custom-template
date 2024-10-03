export default function Loading() {
  return (
    <div className="bg-background-default -mt-24 flex min-h-screen items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="bg-background-level2 h-4 w-48 animate-pulse rounded"></div>
        <div className="bg-background-level2 h-4 w-72 animate-pulse rounded"></div>
        <div className="bg-background-level2 h-4 w-32 animate-pulse rounded"></div>
      </div>
    </div>
  );
}
