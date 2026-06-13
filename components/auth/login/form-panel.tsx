export default function FormPanel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 py-6 flex-1 max-w-full">
      {children}
    </div>
  );
}