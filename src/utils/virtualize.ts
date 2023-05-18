"use client";

//shit function exported from somewhere else
export function virtualize(br: string) {
  var en2ar = new Array(
    "1",
    "١",
    "2",
    "٢",
    "3",
    "٣",
    "4",
    "٤",
    "5",
    "٥",
    "6",
    "٦",
    "7",
    "٧",
    "8",
    "٨",
    "9",
    "٩",
    "0",
    "٠",
    "q",
    "ض",
    "w",
    "ص",
    "e",
    "ث",
    "r",
    "ق",
    "t",
    "ف",
    "y",
    "غ",
    "u",
    "ع",
    "i",
    "ه",
    "o",
    "خ",
    "p",
    "ح",
    "{",
    "ج",
    "[",
    "ج",
    "}",
    "د",
    "]",
    "د",
    "a",
    "ش",
    "s",
    "س",
    "d",
    "ي",
    "f",
    "ب",
    "g",
    "ل",
    "h",
    "ا",
    "j",
    "ت",
    "k",
    "ن",
    "l",
    "م",
    ";",
    "ك",
    "'",
    "ط",
    "z",
    "ئ",
    "x",
    "ء",
    "c",
    "ؤ",
    "v",
    "ر",
    ".",
    "ز",
    "b",
    "لا",
    "n",
    "ى",
    "m",
    "ة",
    "<",
    "و",
    ",",
    "و",
    "-",
    "ظ",
    "/",
    "ظ",
    "D",
    "ذ",
    "Y",
    "إ",
    "Q",
    "َ",
    "W",
    "ً",
    "E",
    "ُ",
    "A",
    "ِ",
    "S",
    "ٍ",
    "G",
    "لأ",
    "H",
    "أ",
    "T",
    "لإ",
    "Y",
    "إ",
    "B",
    "لآ",
    "N",
    "آ",
    "J",
    "ـ",
    "K",
    "،",
    //German
    "ä",
    "ط",
    "ö",
    "ك",
    "ü",
    "ج",
    "+",
    "د"
  );

  for (let i = 0; i < en2ar.length; i = i + 2) {
    br = br.replace(en2ar[i], en2ar[i + 1]);
  }
  return br;
}

interface Alphabet {
  char: string;
  index: number;
}

export const alphabetIndexer: Alphabet[] = [
  { char: "أ", index: 0 },
  { char: "ا", index: 0 },
  { char: "آ", index: 0 },
  { char: "ب", index: 1 },
  { char: "ت", index: 2 },
  { char: "ث", index: 3 },
  { char: "ج", index: 4 },
  { char: "ح", index: 5 },
  { char: "خ", index: 6 },
  { char: "د", index: 7 },
  { char: "ذ", index: 8 },
  { char: "ر", index: 9 },
  { char: "ز", index: 10 },
  { char: "س", index: 11 },
  { char: "ش", index: 12 },
  { char: "ص", index: 13 },
  { char: "ض", index: 14 },
  { char: "ط", index: 15 },
  { char: "ظ", index: 16 },
  { char: "ع", index: 17 },
  { char: "غ", index: 18 },
  { char: "ف", index: 19 },
  { char: "ق", index: 20 },
  { char: "ك", index: 21 },
  { char: "ل", index: 22 },
  { char: "م", index: 23 },
  { char: "ن", index: 24 },
  { char: "ه", index: 25 },
  { char: "و", index: 26 },
  { char: "ئ", index: 27 },
  { char: "ة", index: 28 },
  { char: "ً", index: 29 },
  { char: "ٍ", index: 30 },
  { char: "ي", index: 31 },
  { char: " ", index: 32 },
];

export class AlphabetManager {
  private static alphabets = alphabetIndexer;
  private static regex = /[\u0600-\u06FF\u0750-\u077F\s]/;

  letterToAlphabet(char: string) {
    return (
      AlphabetManager.alphabets.find((c) => c.char == char) ?? {
        char: " ",
        index: 32,
      }
    );
  }

  stringCleaner(s: string): string[] {
    const $al = /ال/g;
    const $la = /لا/g;
    return s
      .trim()
      .replace($al, "ً")
      .replace($la, "ٍ")
      .split("")
      .filter((l) => l.match(AlphabetManager.regex))
      .join("")
      .trim()
      .split("");
  }

  imagePathGenerator(alphabet: Alphabet, root: string = "/alphabet") {
    return `${root}/alpha${alphabet.index}.jpg`;
  }

  getImageArray(s: string, root: string = "/alphabet") {
    return this.stringCleaner(s).map((c) => this.imagePathGenerator(this.letterToAlphabet(c), root));
  }
}
