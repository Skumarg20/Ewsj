export function parseText(text:string) {
    const lines = text.split("\n\n"); // Split by double new lines for sections
    return lines.map((line, index) => {
      if (line.startsWith("## ")) {
        return { type: "heading", content: line.replace("## ", ""), id: index };
      } else if (line.startsWith("* ")) {
        const items = line.split("\n").map((item) => item.replace("* ", ""));
        return { type: "list", content: items, id: index };
      } else {
        return { type: "paragraph", content: line, id: index };
      }
    });
  }