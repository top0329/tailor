const AuthHeading = ({ header, sub }: { header: string; sub: string }) => {
  return (
    <div className="flex flex-col gap-[8px]">
      <p className="text-h2 text-second-foreground font-[500]">{header}</p>
      <p className="text-h4 text-third-foreground">{sub}</p>
    </div>
  );
};

export default AuthHeading;
