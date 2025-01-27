/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { useState } from "react";
import "./App.css";
import { marked } from "marked";
import hljs from "highlight.js";
import "highlight.js/styles/atom-one-dark.css"; // Importa el tema de highlight.js

const defaultMarkdown = `
# Welcome to my React Markdown Previewer!

## This is a sub-heading...
### And here's some other cool stuff:

Heres some code, \`<div></div>\`, between 2 backticks.

\`\`\`javascript
// this is multi-line code:

function anotherExample(firstLine, lastLine) {
  if (firstLine === '\`\`\`' && lastLine === '\`\`\`') {
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
  const renderer = new marked.Renderer();

  renderer.code = ({ text, lang }: { text: string; lang?: string; escaped?: boolean }) => {
    const validLanguage = lang && hljs.getLanguage(lang) ? lang : undefined;
    const highlighted = validLanguage
      ? hljs.highlight(text, { language: validLanguage }).value
      : hljs.highlightAuto(text).value;
    return `<pre><code class="hljs ${lang || ""}">${highlighted}</code></pre>`;
  }

  renderer.link = ({ href, title, text }: { href: string; title?: string | null; text: string }) => {
    return `<a href="${href}" target="_blank" rel="noopener noreferrer" title="${title || text}">${text}</a>`;
  }

  // Configura marked para usar el renderizador personalizado
  marked.setOptions({
    breaks: true, // Convertir saltos de línea en <br>
    gfm: true, // Activar Markdown con estilo GitHub
    renderer, // Usar el renderizador personalizado
  });

  const renderMarkdown = (markdown: string) => {
    return { __html: marked(markdown) };
  };

  return (
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
      <p className="footer">by aguuxdev</p>
    </div>
  );
}

export default App;