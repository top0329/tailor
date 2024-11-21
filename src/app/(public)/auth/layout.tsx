import Header from "@/app/_components/shared/header";
import MaxWidthWrapper from "@/app/_components/wrappers/max-width-wrapper";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <MaxWidthWrapper>
      <div className="min-h-screen flex flex-col">
        <Header />
        {children}
      </div>
    </MaxWidthWrapper>
  );
};

export default layout;
