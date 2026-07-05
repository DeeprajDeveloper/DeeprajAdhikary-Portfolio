import './CodeBlock.scss';

export default function CodeBlock({ code, caption, language = 'javascript' }) {
  if (!caption) {
    console.warn('CodeBlock: caption is required (File 03 evidence rule)');
  }

  return (
    <figure className="code-block">
      <pre className="code-block__pre">
        <code className={`code-block__code language-${language}`}>{code}</code>
      </pre>
      {caption && (
        <figcaption className="code-block__caption">{caption}</figcaption>
      )}
    </figure>
  );
}
