import {PortableText} from '@portabletext/react';
import {PortableTextComponents} from '@portabletext/react'
import YouTube from "react-youtube";
import getYouTubeId from "get-youtube-id";
import markdownStyles from "./markdown-styles.module.css";

const serializers: PortableTextComponents = {
    types: {
        youtube: ({ value }) => {
            const { url } = value;
            const id = getYouTubeId(url);
            return <YouTube videoId={id} />;
        },
    },
};

export default function PostBody({ content }) {
    return (
        <div className="mx-auto max-w-2xl">
            <PortableText value={content} components={serializers} />
        </div>
    );
}
