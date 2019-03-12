import { arabicForms } from "./presentation-forms";

export default function harf(str: string): string {
  const letters = str.split("")
  let finalString = ""
  for (let i = 0; i < letters.length; i++) {
    finalString += convertToForm(letters, i)
  }
  return finalString
}

function convertToForm(letters: string[], index: number): string {
  const letter = letters[index]


  let form = ""
  switch (letter) {
    case "ا":
    case "أ":
    case "إ":
    case "آ":
    case "ؤ":
    case "ة":
    case "د":
    case "ذ":
    case "ر":
    case "ز":
    case "و":
    case "ى":
      if (isCharAttachable(letters[index - 1])) {
        form = unicodeToChar(arabicForms[letter].final)
      }
      form = letter;
      break;
    case "ل":


      //if letter after ل is أ,آ,إ,ا Then use لا form considering the previous letter, otherwise no need.
      //لا forms: isolated form = final form - 1
      switch (letters[index + 1]) {
        case "ا":
        case "أ":
        case "إ":
        case "آ":
          const lamAlef = letter.concat(letters[index + 1])
          if (isCharAttachable(letters[index - 1])) {
            form = unicodeToChar(arabicForms[lamAlef].final)
            break;
          }
          form = unicodeToChar(arabicForms[lamAlef].final, -1)
          break;
      }

      form = anAttachableLetterForm(letters, index)
      break;

    case "ب":
    case "ت":
    case "ث":
    case "ج":
    case "ح":
    case "خ":
    case "س":
    case "ش":
    case "ص":
    case "ض":
    case "ط":
    case "ظ":
    case "ع":
    case "غ":
    case "ف":
    case "ق":
    case "ك":
    case "م":
    case "ن":
    case "ه":
    case "ي":
      //Initial form = final from + 1
      //Medial form = final form + 2
      form = anAttachableLetterForm(letters, index)
      break;
    default:
      form = letter
      break;
  }
  return form
}

function unicodeToChar(u: string, mod: number = 0): string {
  return String.fromCharCode(
    parseInt(u) + mod
  )
}

function isCharAttachable(char: string): boolean {
  if (char === " ")
    return false


  const nonAttachableLetters = ["ا", "أ", "إ", "آ", "ؤ",
    "ة", "د", "ذ", "ر", "ز", "و", "ى", "ء"]

  for (const letter of nonAttachableLetters) {
    if (char === letter) {
      return false
    }
  }

  return true
}

function anAttachableLetterForm(letters: string[], index: number): string {
  const letter = letters[index]

  //Initial form = final from + 1
  //Medial form = final form + 2
  //Refrence: https://unicode.org/charts/nameslist/c_FE70.html

  if (isCharAttachable(letters[index - 1])) {
    if (letters[index + 1] === " ") {
      return unicodeToChar(arabicForms[letter].final)
    }
    return unicodeToChar(arabicForms[letter].final, 2)
  } else if (letters[index + 1] !== " ") {
    return unicodeToChar(arabicForms[letter].final, 1)
  }
  return letter

}