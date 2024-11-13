import Image from "next/image";

const Logo = () => {
  return (
    <div className='relative w-[180px] h-[50px] rounded-[16px] px-[16px] py-[8px] bg-opacity-50'>
      <Image
        src='/_static/logo-main.png'
        fill
        alt='Logo'
        className='w-full h-[33px] object-contain'
      />
    </div>
  );
};

export default Logo;
