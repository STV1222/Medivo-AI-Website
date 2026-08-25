"use client";

import { useLanguage } from "./I18n";

const languages = [
  { code: "en" as const, labelKey: "language.english" as const },
  { code: "zh-Hant" as const, labelKey: "language.traditionalChinese" as const },
];

export function FooterLanguage() {
  const { language, setLanguage, t } = useLanguage();
  const current = languages.find((item) => item.code === language) ?? languages[0];

  return (
    <details className="language-menu">
      <summary aria-label="Select language">
        <span className="language-globe" aria-hidden="true" />
        <span>{t(current.labelKey)}</span>
        <span className="language-caret" aria-hidden="true">⌃</span>
      </summary>
      <div className="language-options" role="listbox" aria-label="Language options">
        {languages.map((item) => (
          <button
            type="button"
            className={language === item.code ? "selected" : ""}
            aria-pressed={language === item.code}
            onClick={(event) => {
              setLanguage(item.code);
              event.currentTarget.closest("details")?.removeAttribute("open");
            }}
            key={item.code}
          >
            <span>{t(item.labelKey)}</span>
            {language === item.code ? <span aria-hidden="true">✓</span> : null}
          </button>
        ))}
      </div>
    </details>
  );
}
