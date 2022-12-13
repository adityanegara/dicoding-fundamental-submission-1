const elipsisOnText = (text, maxString) => {
  if (text.length > maxString) {
    return text.substring(0, maxString) + "...";
  }
  return text;
};

export default elipsisOnText;