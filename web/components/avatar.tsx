import Image from "next/image";
import { urlForImage } from "../lib/sanity";

export default function Avatar({ name, picture }) {
    return (
        <div className="flex items-center">
            <div className="h-12 mr-4 w-12 relative">
                <Image
                    src={urlForImage(picture).height(96).width(96).fit("crop").url()}
                    layout="fill"
                    className="rounded-full"
                    alt={name}
                />
            </div>
            <div className="font-bold text-xl">{name}</div>
        </div>
    );
}
