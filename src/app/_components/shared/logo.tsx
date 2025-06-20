import Image from "next/image";
import Link from "next/link";

const Logo = () => {
  return (
    <Link href="/">
      <div className="relative w-[180px] h-[50px] rounded-[16px] px-[16px] py-[8px] bg-opacity-50">
        <Image
          src="/_static/logo-main.png"
          fill
          alt="Logo"
          className="object-contain"
        />
      </div>
    </Link>
  );
};

export default Logo;
