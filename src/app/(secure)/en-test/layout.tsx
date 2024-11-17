import Header from "@/app/_components/shared/header";

const TestLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='min-h-screen flex flex-col'>
      <Header />
      {children}
    </div>
  );
};

export default TestLayout;
