"use client";

import { useState } from "react";
import { useLanguage } from "./I18n";

const languages = [
  { code: "en" as const, labelKey: "language.english" as const },
  { code: "zh-Hant" as const, labelKey: "language.traditionalChinese" as const },
];

export function FooterLanguage() {
  const { language, setLanguage, t } = useLanguage();
  const [open, setOpen] = useState(false);
  const current = languages.find((item) => item.code === language) ?? languages[0];

  return (
    <div className={open ? "language-menu open" : "language-menu"}>
      <button
        type="button"
        className="language-trigger"
        aria-label="Select language"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen(!open)}
      >
        <span className="language-globe" aria-hidden="true" />
        <span>{t(current.labelKey)}</span>
        <span className="language-caret" aria-hidden="true">⌃</span>
      </button>
      {open ? <div className="language-options" role="listbox" aria-label="Language options">
        {languages.map((item) => (
          <button
            type="button"
            className={language === item.code ? "selected" : ""}
            aria-pressed={language === item.code}
            onClick={() => {
              setLanguage(item.code);
              setOpen(false);
            }}
            key={item.code}
          >
            <span>{t(item.labelKey)}</span>
            {language === item.code ? <span aria-hidden="true">✓</span> : null}
          </button>
        ))}
      </div> : null}
    </div>
  );
}
