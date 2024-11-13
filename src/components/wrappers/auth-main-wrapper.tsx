const AuthMainWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="grid lg:grid-cols-2 items-center gap-[48px] p-[64px] flex-1">
      {children}
    </div>
  );
};

export default AuthMainWrapper;
