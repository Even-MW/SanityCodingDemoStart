import Container from "./container";
import cn from "classnames";
import { EXAMPLE_PATH } from "../lib/constants";

export default function Alert({ preview }) {
    return (
        <div
            className={cn("border-b", {
                "bg-accent-7 border-accent-7 text-white": preview,
                "bg-accent-1 border-accent-2": !preview,
            })}
        >
            <Container>
                <div className="text-center text-sm py-2">
                    {preview ? (
                        <>
                            This page is a preview.{" "}
                            <a
                                href="/api/exit-preview"
                                className="transition-colors duration-200 underline hover:text-cyan"
                            >
                                Click here
                            </a>{" "}
                            to exit preview mode.
                        </>
                    ) : (
                        <></>
                    )}
                </div>
            </Container>
        </div>
    );
}
