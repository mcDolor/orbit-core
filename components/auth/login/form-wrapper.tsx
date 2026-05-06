import AuthTab from "../AuthTab";

interface FormWrapperProps {
  children: React.ReactNode;
  heading: string;
  description: string;
}

export default function FormWrapper({ children, heading, description }: FormWrapperProps) {
  return (
    <div className="flex flex-col gap-8 p-2 w-[425px] h-fit">
      <div className="flex flex-col w-full gap-2">
        <h2 className="w-full font-heading font-bold text-2xl text-slate-900">{heading}</h2>
        <p className="w-full font-sans font-medium text-sm text-slate-500">{description}</p>
      </div>
      <AuthTab />
      <div>
        {children}
      </div>
    </div>
  );
}