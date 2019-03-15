/*
* harf.js 0.1.0
* Copyright © 2019 MrG0lden
* Released under MIT license
*/
'use strict';

var arabicForms = {
    "آ": {
        "final": "FE82"
    },
    "أ": {
        "final": "FE84"
    },
    "ؤ": {
        "final": "FE86"
    },
    "إ": {
        "final": "FE88"
    },
    "ا": {
        "final": "FE8E"
    },
    "د": {
        "final": "FEAA"
    },
    "ذ": {
        "final": "FEAC"
    },
    "ر": {
        "final": "FEAE"
    },
    "ز": {
        "final": "FEB0"
    },
    "و": {
        "final": "FEEE"
    },
    "ى": {
        "final": "FEF0"
    },
    "ة": {
        "final": "FE94"
    },
    "لا": {
        "final": "FEFC"
    },
    "لإ": {
        "final": "FEFA"
    },
    "لأ": {
        "final": "FEF8"
    },
    "لآ": {
        "final": "FEF6"
    },
    "ئ": {
        "final": "FE8A"
    },
    "ب": {
        "final": "FE90"
    },
    "ت": {
        "final": "FE96"
    },
    "ث": {
        "final": "FE9A"
    },
    "ج": {
        "final": "FE9E"
    },
    "ح": {
        "final": "FEA2"
    },
    "خ": {
        "final": "FEA6"
    },
    "س": {
        "final": "FEB2"
    },
    "ش": {
        "final": "FEB6"
    },
    "ص": {
        "final": "FEBA"
    },
    "ض": {
        "final": "FEBE"
    },
    "ط": {
        "final": "FEC2"
    },
    "ظ": {
        "final": "FEC6"
    },
    "ع": {
        "final": "FECA"
    },
    "غ": {
        "final": "FECE"
    },
    "ف": {
        "final": "FED2"
    },
    "ق": {
        "final": "FED6"
    },
    "ك": {
        "final": "FEDA"
    },
    "ل": {
        "final": "FEDE"
    },
    "م": {
        "final": "FEE2"
    },
    "ن": {
        "final": "FEE6"
    },
    "ه": {
        "final": "FEEA"
    },
    "ي": {
        "final": "FEF2"
    }
};

function harf(str) {
    var letters = str.split("");
    var finalString = "";
    for (var i = 0; i < letters.length; i++) {
        finalString += convertToForm(letters, i);
    }
    return finalString;
}
function convertToForm(letters, index) {
    var letter = letters[index];
    var form = "";
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
                form = unicodeToChar(arabicForms[letter].final);
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
                    var lamAlef = letter.concat(letters[index + 1]);
                    if (isCharAttachable(letters[index - 1])) {
                        form = unicodeToChar(arabicForms[lamAlef].final);
                        break;
                    }
                    form = unicodeToChar(arabicForms[lamAlef].final, -1);
                    break;
            }
            form = anAttachableLetterForm(letters, index);
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
            form = anAttachableLetterForm(letters, index);
            break;
        default:
            form = letter;
            break;
    }
    return form;
}
function unicodeToChar(u, mod) {
    if ( mod === void 0 ) mod = 0;

    return String.fromCharCode(parseInt(u) + mod);
}
function isCharAttachable(char) {
    if (char === " ")
        { return false; }
    var nonAttachableLetters = ["ا", "أ", "إ", "آ", "ؤ",
        "ة", "د", "ذ", "ر", "ز", "و", "ى", "ء"];
    for (var i = 0, list = nonAttachableLetters; i < list.length; i += 1) {
        var letter = list[i];

        if (char === letter) {
            return false;
        }
    }
    return true;
}
function anAttachableLetterForm(letters, index) {
    var letter = letters[index];
    //Initial form = final from + 1
    //Medial form = final form + 2
    //Refrence: https://unicode.org/charts/nameslist/c_FE70.html
    if (isCharAttachable(letters[index - 1])) {
        if (letters[index + 1] === " ") {
            return unicodeToChar(arabicForms[letter].final);
        }
        return unicodeToChar(arabicForms[letter].final, 2);
    }
    else if (letters[index + 1] !== " ") {
        return unicodeToChar(arabicForms[letter].final, 1);
    }
    return letter;
}

module.exports = harf;
