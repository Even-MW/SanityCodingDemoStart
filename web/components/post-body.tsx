import markdownStyles from "./markdown-styles.module.css";
import BlockContent from "@sanity/block-content-to-react";
import getYouTubeId from "get-youtube-id";
import YouTube from "react-youtube";

const serializers = {
    types: {
        youtube: ({ node }) => {
            const { url } = node;
            const id = getYouTubeId(url);
            return <YouTube videoId={id} />;
        },
    },
};

export default function PostBody({ content }) {
    return (
        <div className="mx-auto max-w-2xl">
            <BlockContent blocks={content} className={markdownStyles.markdown} serializers={serializers} />
        </div>
    );
}
