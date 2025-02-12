export default function AdminSidebarMenu({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <nav className="sm:px-4 pb-4 min-w-fit overflow-y-scroll border-r rounded h-[calc(100vh-53px)] border-zinc-700">
      {children}
    </nav>
  );
}

export function SidebarItemsSkeleton() {
  return (
    <ul className="flex flex-col gap-2 font-light text-sm">
      {Object.keys(Array.from({ length: 7 })).map((_, i) => (
        <li key={i} className="animate-pulse -z-50">
          <button
            className={`${
              i === 0
                ? "bg-zinc-500/50"
                : i === 1
                ? "bg-zinc-600/50"
                : i === 2
                ? "bg-zinc-700/50"
                : "bg-zinc-800/50"
            } rounded text-transparent`}
          >
            loading...
          </button>
        </li>
      ))}
    </ul>
  );
}
