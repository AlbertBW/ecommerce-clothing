export default function Modal({
  children,
  close,
}: Readonly<{
  children: React.ReactNode;
  close: () => void;
}>) {
  return (
    <div className="fixed inset-0 flex items-center justify-center dark:bg-black bg-white dark:bg-opacity-70 bg-opacity-70">
      <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-xl">
        <div
          className="fixed -z-10 inset-0 flex items-center justify-center"
          onClick={() => close()}
        />
        {children}
      </div>
    </div>
  );
}
