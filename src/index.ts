import { arabicForms } from "./presentation-forms";

export default function harf(str: string): HTMLElement[] {
  const letters = str.split("")
  //If it's a space don't pass it
  return []
}

function match(array: string[], index: number): string {
  const letter = array[index]


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
      if (isCharAttachable(array[index - 1])) {
        form = unicodeToChar(arabicForms[letter].final)
      }
      form = letter;
      break;
    case "ل":


      //if letter after ل is أ,آ,إ,ا Then use لا form considering the previous letter, otherwise no need.
      //لا forms: isolated form = final form - 1
      switch (array[index + 1]) {
        case "ا":
        case "أ":
        case "إ":
        case "آ":
          const lamAlef = letter.concat(array[index + 1])
          if (isCharAttachable(array[index - 1])) {
            form = unicodeToChar(arabicForms[lamAlef].final)
            break;
          }
          form = unicodeToChar(arabicForms[lamAlef].final, -1)
          break;
      }

      form = anAttachableLetterForm(array, index)
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
      form = anAttachableLetterForm(array, index)
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

function isCharAttachable(str: string): boolean {
  if (str === " ")
    return false


  const nonAttachableLetters = ["ا", "أ", "إ", "آ", "ؤ",
    "ة", "د", "ذ", "ر", "ز", "و", "ى", "ء"]

  for (const letter of nonAttachableLetters) {
    if (str === letter) {
      return false
    }
  }

  return true
}

function anAttachableLetterForm(array: string[], index: number): string {
  const letter = array[index]

  //Initial form = final from + 1
  //Medial form = final form + 2
  //Refrence: https://unicode.org/charts/nameslist/c_FE70.html

  if (isCharAttachable(array[index - 1])) {
    if (array[index + 1] === " ") {
      return unicodeToChar(arabicForms[letter].final)
    }
    return unicodeToChar(arabicForms[letter].final, 2)
  } else if (array[index + 1] !== " ") {
    return unicodeToChar(arabicForms[letter].final, 1)
  }
  return letter

}