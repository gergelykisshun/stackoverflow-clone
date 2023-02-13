export const decodeSpecialChars = (str: string): string => {
  return str
    .replaceAll("&#39;", "'")
    .replaceAll("&amp;", "&")
    .replaceAll("&quot;", '"');
};
