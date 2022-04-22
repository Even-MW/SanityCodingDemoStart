import PostPreview from "../components/post-preview";

export default function MoreStories({ posts }) {
    return (
        <section>
            <h2 className="font-bold mb-8 leading-tight tracking-tighter text-6xl md:text-7xl">More Stories</h2>
            <div className="mb-32 grid grid-cols-1 row-gap-20 md:grid-cols-2 md:col-gap-16 md:row-gap-32 lg:col-gap-32">
                {posts.map((post) => (
                    <PostPreview
                        key={post.slug}
                        title={post.title}
                        coverImage={post.coverImage}
                        date={post.date}
                        author={post.author}
                        slug={post.slug}
                        excerpt={post.excerpt}
                    />
                ))}
            </div>
        </section>
    );
}
