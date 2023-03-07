type lang = {
  lang: string;
  setLang: (lang: string) => void;
}

type blockInfo = {
  id: string,
  setBlockId: (id: string | string[] | undefined) => void;
}