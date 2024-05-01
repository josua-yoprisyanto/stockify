export const getCapitalize = (words: string) => {
  if (words) {
    var separateWord = words.toLowerCase().split("_").join(" ").split(" ");
    for (var i = 0; i < separateWord.length; i++) {
      separateWord[i] = separateWord[i].charAt(0).toUpperCase() + separateWord[i].substring(1);
    }
    return separateWord.join(" ");
  }
};
