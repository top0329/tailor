import Logo from "./logo";

const Header = () => {
  return (
    <div className='w-full flex justify-between items-center px-[32px] py-[16px] border-b-[1px] border-first-stroke'>
      <Logo />
    </div>
  );
};

export default Header;
