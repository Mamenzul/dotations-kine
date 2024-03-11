import Link from "next/link";

export function Header() {
  return (
    <header className="sticky top-0 z-30 w-full items-center justify-center border bg-white p-2 shadow-sm lg:mx-auto">
      <div className="container flex items-center justify-center">
        <Link href="/">
          <h1 className="font-header flex pl-3 pr-3 text-sm  font-semibold md:text-xl ">
            DOTATIONS KINE OCCITANIE
          </h1>
        </Link>
      </div>
    </header>
  );
}

export default Header;
