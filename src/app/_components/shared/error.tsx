const ErrorMsg = ({ error }: { error: string }) => {
  return (
    error && <span className="text-negative-foreground text-s">{error}</span>
  );
};

export default ErrorMsg;
