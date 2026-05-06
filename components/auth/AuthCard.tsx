export default function AuthCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center gap-2 bg-white shadow-[0px_10px_30px_0px_rgba(0,0,0,0.1)] rounded-2xl px-6 py-6">
      {children}
    </div>
  );
}