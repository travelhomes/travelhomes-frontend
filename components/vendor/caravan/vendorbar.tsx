import Logo from "@/public/mainlogo.png";
import Image from "next/image";
import Link from "next/link";

export default function VendorBar() {
    return (
        <div className="pl-[80px] py-2">
            <Link href="/">
                <Image src={Logo} alt="Logo" width={100} height={100} />
            </Link>
        </div>
    )
}