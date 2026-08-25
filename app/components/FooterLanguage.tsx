export function FooterLanguage() {
  return (
    <details className="language-menu">
      <summary aria-label="Select language">
        <span className="language-globe" aria-hidden="true" />
        <span>English</span>
        <span className="language-caret" aria-hidden="true">⌃</span>
      </summary>
      <div className="language-options" role="listbox" aria-label="Language options">
        <button type="button" className="selected" aria-pressed="true">
          <span>English</span>
          <span aria-hidden="true">✓</span>
        </button>
        <button type="button" aria-pressed="false">繁體中文</button>
      </div>
    </details>
  );
}
