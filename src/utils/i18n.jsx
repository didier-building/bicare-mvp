import React, { useContext } from "react";

// i18n Context and utilities
export const LangCtx = React.createContext({ lang: "rw", setLang: () => {} });

export const useLang = () => useContext(LangCtx);

export const tr = (lang, rw, en) => (lang === "rw" ? rw : en);

export const T = ({ rw, en }) => {
  const { lang } = useLang();
  return <span>{tr(lang, rw, en)}</span>;
};