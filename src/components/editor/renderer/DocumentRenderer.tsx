import { OutputBlockData } from "@editorjs/editorjs";
import { NextPage } from "next";

import HeaderRenderer from "./HeaderRenderer";
import InlineRenderer from "./InlineRenderer";
import ListRenderer from "./ListRenderer";

interface BlockData {
  type: string;
  // data property is not defined in the type
  // so I will define it as any
  data: any;
  id: string;
}

interface HeaderBlockData extends BlockData {
  type: "header";
  data: {
    text: string;
    level: number;
  };
}

interface ParagraphBlockData extends BlockData {
  type: "paragraph";
  data: {
    text: string;
  };
}

interface ListBlockData extends BlockData {
  type: "list";
  data: {
    style: "ordered" | "unordered";
    items: string[];
  };
}

export type OutputBlockType =
  | HeaderBlockData
  | ParagraphBlockData
  | ListBlockData;

const DocumentRenderer: NextPage<{
  blocks: OutputBlockType[];
}> = ({ blocks }) => {
  console.log(blocks);

  let keySeed = "document-renderer-";
  return (
    <div>
      {blocks.map((block) => {
        switch (block.type) {
          case "paragraph":
            return (
              <p key={keySeed + block.id}>
                <InlineRenderer text={block.data.text} />
              </p>
            );
          case "header":
            return (
              <HeaderRenderer
                key={keySeed + block.id}
                level={block.data.level}
                text={block.data.text}
              />
            );
          case "list":
            return (
              <ListRenderer
                key={keySeed + block.id}
                isOrdered={block.data.style === "ordered"}
                items={block.data.items}
              />
            );
        }
      })}
    </div>
  );
};
export default DocumentRenderer;
