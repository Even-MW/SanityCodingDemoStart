import Avatar from "./avatar";
import Date from "./date";
import CoverImage from "./cover-image";
import PostTitle from "./post-title";

export default function PostHeader({ title, coverImage, date, author }) {
    return (
        <>
            <PostTitle>{title}</PostTitle>
            <div className="hidden md:mb-12 md:block">
                <Avatar name={author.name} picture={author.picture} />
            </div>
            <div className="mb-8 sm:mx-0 md:mb-16">
                <CoverImage title={title} image={coverImage} />
            </div>
            <div className="mx-auto max-w-2xl">
                <div className="mb-6 block md:hidden">
                    <Avatar name={author.name} picture={author.picture} />
                </div>
                <div className="text-lg mb-6">
                    <Date dateString={date} />
                </div>
            </div>
        </>
    );
}
