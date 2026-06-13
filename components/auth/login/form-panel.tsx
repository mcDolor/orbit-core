export default function FormPanel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-2 px-2 py-2 h-screen flex-1">
      {children}
    </div>
  );
}