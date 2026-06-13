import AuthTab from "../AuthTab";

interface FormWrapperProps {
  children: React.ReactNode;
  heading: string;
  description: string;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export default function FormWrapper({ children, heading, description, activeTab, onTabChange }: FormWrapperProps) {
  return (
    <div className={`flex flex-col gap-8 p-6 transition-all duration-500 ease-out max-w-[calc(100vw-48px)] h-fit ${
      activeTab === "signup" ? "w-[550px]" : "w-[425px]"
    }`}>
      <div className="flex flex-col w-full gap-2">
        <h2 className="w-full font-heading font-bold text-2xl text-slate-900">{heading}</h2>
        <p className="w-full font-sans font-medium text-sm text-slate-500">{description}</p>
      </div>
      <AuthTab activeTab={activeTab} onTabChange={onTabChange} />
      <div>
        {children}
      </div>
    </div>
  );
}