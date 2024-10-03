export default function Loading() {
  return (
    <div className="-mt-24 flex min-h-screen items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="skeleton h-4 w-48"></div>
        <div className="skeleton h-4 w-72"></div>
        <div className="skeleton h-4 w-32"></div>
      </div>
    </div>
  );
}
