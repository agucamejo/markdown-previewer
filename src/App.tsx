import { useState } from "react";
import "./App.css";
import ReactMarkdown from "react-markdown";
import { marked } from "marked";

const defaultMarkdown = `
# Welcome to my React Markdown Previewer!

## This is a sub-heading...
### And here's some other cool stuff:

Heres some code, \`<div></div>\`, between 2 backticks.

\`\`\`
// this is multi-line code:

function anotherExample(firstLine, lastLine) {
  if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
    return multiLineCode;
  }
}
\`\`\`

You can also make text **bold**... whoa!
Or _italic_.
Or... **_both!_**

There's also [links](https://www.freecodecamp.com), and
> Block Quotes!

![React Logo w/ Text](https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png)

- And of course there are lists.
  - Some are bulleted.
      - With different indentation levels.
        - That look like this.
`;

function App() {
  const [markdownText, setMarkdownText] = useState<string>(defaultMarkdown);

  marked.setOptions({
    breaks: true, // Convert line breaks to <br>
    gfm: true, // Enable GitHub Flavored Markdown
  });

  const renderMarkdown = (markdown: string) => {
    return { __html: marked(markdown) };
  };

  return (
    <>
      <div>
        <h1 style={{ textAlign: "center" }}>Markdown Previewer</h1>
        <div className="boxes-container">
          <div id="editor-container">
            <h2>Editor</h2>
            <textarea
              name="editor"
              id="editor"
              title="editor"
              value={markdownText}
              onChange={(e) => setMarkdownText(e.target.value)}
            ></textarea>
          </div>
          <div id="preview-container">
            <h2>Previewer</h2>
            <div
              id="preview"
              dangerouslySetInnerHTML={renderMarkdown(markdownText)}
            ></div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
