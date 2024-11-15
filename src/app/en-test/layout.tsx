import Header from "@/components/shared/header";

const TestLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='min-h-screen flex flex-col'>
      <Header />
      {children}
    </div>
  );
};

export default TestLayout;
