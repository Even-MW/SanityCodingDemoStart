import Container from "./container";
import { EXAMPLE_PATH } from "../lib/constants";

export default function Footer() {
    return (
        <footer className="border-t bg-accent-1 border-accent-2">
            <Container>
                <div className="flex flex-col py-28 items-center lg:flex-row">
                    <h3 className="font-bold text-center leading-tight mb-10 tracking-tighter text-4xl lg:text-left lg:mb-0 lg:pr-4 lg:text-5xl lg:w-1/2">
                        Statically Generated with Next.js.
                    </h3>
                    <div className="flex flex-col justify-center items-center lg:flex-row lg:pl-4 lg:w-1/2"></div>
                </div>
            </Container>
        </footer>
    );
}
