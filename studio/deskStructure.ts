import { MdAccountCircle, MdChatBubble, MdGroup } from "react-icons/md";

import Iframe from "sanity-plugin-iframe-pane";
import S from "@sanity/desk-tool/structure-builder";
import resolveProductionUrl from "./resolveProductionUrl";
// We filter document types defined in structure to prevent
// them from being listed twice
const hiddenDocTypes = (listItem) => !["post", "author"].includes(listItem.getId());

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
            S.listItem()
                .title("Posts")
                .icon(MdChatBubble)
                .schemaType("post")
                .child(S.documentTypeList("post").title("Posts")),
            S.listItem()
                .title("Authors")
                .icon(MdAccountCircle)
                .schemaType("author")
                .child(S.documentTypeList("author").title("Authors")),
            S.divider(),
            S.listItem()
                .title("Posts by author")
                .icon(MdGroup)
                .child(
                    S.documentTypeList("author")
                        .title("Posts by author")
                        .child(
                            (_id) =>
                                S.documentList("post")
                                    .schemaType("post")
                                    .title("Posts by author")
                                    .filter('_type == "post" && author._ref == $_id')
                                    .params({ _id })
                        )
                ),
            ...S.documentTypeListItems().filter(hiddenDocTypes),
        ]);
