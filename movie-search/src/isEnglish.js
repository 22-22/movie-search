function isEnglish(value) {
  const engNum = /[a-z]/i;
  return engNum.test(value);
}

export default isEnglish;
