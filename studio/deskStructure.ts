import { MdAccountCircle, MdChatBubble } from "react-icons/md";

import Iframe from "sanity-plugin-iframe-pane";
import S from "@sanity/desk-tool/structure-builder";
import resolveProductionUrl from "./resolveProductionUrl";

// We filter document types defined in structure to prevent
// them from being listed twice

export const getDefaultDocumentNode = () => {
    // Return all documents with just 1 view: the form
    return S.document().views([
        S.view.form(),
        S.view
            .component(Iframe)
            .options({
                // Accepts an async function
                url: (doc) => resolveProductionUrl(doc),
            })
            .title("Preview"),
    ]);
};

export default () =>
    S.list()
        .title("Site")
        .items([
        ]);
