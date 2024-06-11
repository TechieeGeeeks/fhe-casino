

// import { FaDiscord } from "react-icons/fa";

import Link from "next/link";

import MobileDrawer from "@/components/MobileDrawer";
import NavDropdown from "./NavDropdown";

function Navbar() {
  return (
    <nav className="fixed left-0 top-0 z-20 mx-auto flex h-[88px] w-full items-center border-b-4 border-black bg-white px-5 m500:h-16 ">
      <div className="mx-auto flex w-[1300px] max-w-full items-center justify-between">
        <MobileDrawer />

        <div className="flex items-center gap-10 m400:flex-1 m400:pl-5">
          <Link
            className="text-4xl font-heading m500:text-xl"
            href={"/"}>
            fheCasino
          </Link>
        </div>

        <div className="flex items-center gap-10 m900:hidden">
          <Link className="text-xl font-base" href="/docs">
            New Geneartions
          </Link>

          <Link className="text-xl font-base" href="/templates">
            Docs
          </Link>

          <Link className="text-xl font-base" href="/templates">
            Grants
          </Link>
        </div>

        <NavDropdown />

       
      </div>
    </nav>
  );
}

export default Navbar;
