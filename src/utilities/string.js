const removeNewLine = text => {
  return text.replace(/\n|\r/g, "");
};

const removeWhiteSpace = text => {
  return text.replace(/\s/g,'');
};

export {
  removeNewLine,
  removeWhiteSpace,
};
