import Link from "next/link";

export default function Header() {
    return (
        <h2 className="font-bold mt-8 leading-tight mb-20 tracking-tight text-2xl md:tracking-tighter md:text-4xl">
            <Link href="/">
                <a className="hover:underline">The Blog</a>
            </Link>
            .
        </h2>
    );
}
