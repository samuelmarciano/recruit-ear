import hljs from "highlight.js"
import marked from "marked"

import "highlight.js/styles/base16/ocean.min.css"

interface MarkdownPreviewerProps {
  text: string
}

const MarkdownPreviewer = ({ text }: MarkdownPreviewerProps) => {
  const renderer = new marked.Renderer()
  renderer.code = ({ text, lang }) => {
    const validLanguage = hljs.getLanguage(lang) ? lang : "plaintext"
    const highlighted = hljs.highlight(validLanguage, text).value
    return `<pre><code class="hljs ${validLanguage}">${highlighted}</code></pre>`
  }

  const content = marked.parse(text, { renderer })
  return (
    <div
      className="markdown-body"
      dangerouslySetInnerHTML={{ __html: content }}></div>
  )
}

export default MarkdownPreviewer
