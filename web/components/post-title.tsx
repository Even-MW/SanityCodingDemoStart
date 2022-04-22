export default function PostTitle({ children }) {
    return (
        <h1 className="font-bold text-center leading-tight mb-12 tracking-tighter text-6xl md:text-left md:leading-none md:text-7xl lg:text-8xl">
            {children}
        </h1>
    );
}
