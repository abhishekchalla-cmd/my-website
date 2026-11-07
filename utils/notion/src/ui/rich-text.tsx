import z from "zod/v4";
import { NotionRichTextPropertySchema } from "@abhishekchalla/notion/schema/properties";

type NotionRichTextProps = {
  value: z.infer<typeof NotionRichTextPropertySchema>["rich_text"];
};

export const NotionRichText: React.FC<NotionRichTextProps> = ({
  value: richText,
}) => {
  if (!richText || richText.length === 0) {
    return null;
  }

  return (
    <>
      {richText.map((block, index) => {
        // Fallback for non-text blocks (like mentions or equations)
        if (block.type !== "text" || !block.text) {
          return <span key={index}>{block.plain_text}</span>;
        }

        const { annotations, text } = block;
        let content: React.ReactNode = text.content;

        // 1. Apply formatting wrappers
        if (annotations.bold) content = <strong key="bold">{content}</strong>;
        if (annotations.italic) content = <em key="italic">{content}</em>;
        if (annotations.strikethrough) content = <s key="strike">{content}</s>;
        if (annotations.underline) content = <u key="underline">{content}</u>;
        if (annotations.code) {
          content = (
            <code
              key="code"
              style={{
                background: "rgba(135,131,120,0.15)",
                color: "#EB5757",
                padding: "0.2em 0.4em",
                borderRadius: "3px",
                fontFamily: "monospace",
              }}
            >
              {content}
            </code>
          );
        }

        // 2. Handle links
        if (text.link) {
          content = (
            <a
              key="link"
              href={text.link.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: "underline", color: "inherit" }}
            >
              {content}
            </a>
          );
        }

        // 3. Handle Notion colors and backgrounds
        const style: React.CSSProperties = {
          whiteSpace: "pre-wrap", // Preserves Notion's newlines (\n)
        };

        if (annotations.color !== "default") {
          if (annotations.color.endsWith("_background")) {
            style.backgroundColor = annotations.color.replace(
              "_background",
              "",
            );
          } else {
            style.color = annotations.color;
          }
        }

        return (
          <span
            key={index}
            style={style}
            className={`notion-${annotations.color}`}
          >
            {content}
          </span>
        );
      })}
    </>
  );
};
