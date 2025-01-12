export default function DropdownMenu({
  title,
  listItems,
  listClassName,
}: {
  title: string;
  listItems: React.ReactNode[];
  listClassName?: string;
}) {
  return (
    <div
      className={`absolute transition-opacity group-hover:z-0 duration-300 ${
        true ? "opacity-100" : "opacity-0"
      } -top-2 -right-2`}
    >
      <div
        className={`flex flex-col border border-zinc-600 shadow-lg dark:bg-zinc-900 bg-zinc-100 min-w-52 p-4 rounded-xl`}
      >
        <p className="text-left">{title}</p>
        <div className="h-6" />
        <ul className={`${listClassName}`}>
          {listItems.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
