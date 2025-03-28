export default function Modal({
  children,
  close,
}: Readonly<{
  children: React.ReactNode;
  close: () => void;
}>) {
  return (
    <div className="fixed z-20 inset-0 flex items-center justify-center dark:bg-black bg-white dark:bg-opacity-80 bg-opacity-90">
      <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-xl">
        <div
          data-testid={"close-on-click"}
          className="fixed -z-10 inset-0 flex items-center justify-center"
          onClick={() => close()}
        />
        {children}
      </div>
    </div>
  );
}
