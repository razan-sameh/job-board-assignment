export default function Container({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={`max-w-screen-xl md:max-w-screen-2xl lg:max-w-screen-3xl mx-auto px-4 sm:px-6 md:px-10 `}
    >
      {children}
    </div>
  );
}
