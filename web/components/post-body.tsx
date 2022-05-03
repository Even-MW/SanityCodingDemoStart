import { PortableText } from "@portabletext/react";
import Image from "next/image";
import { urlForImage } from "../lib/sanity";

const serializers = {
  types: {
    image: ({ value }) => (
      <>
        <Image
          width={500}
          height={500}
          src={urlForImage(value).height(500).width(500).url()}
        />
        <p>{value.alt}</p>
      </>
    ),
  },
};

export default function PostBody({ content }) {
  return (
    <div className="mx-auto max-w-2xl mt-10 mb-20">
      <PortableText value={content} components={serializers} />
    </div>
  );
}
