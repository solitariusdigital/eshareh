export function convertNumber(number) {
  return number.toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
}

export function fourGenerator() {
  return Math.floor(1000 + Math.random() * 9000);
}

export function sixGenerator() {
  return Math.floor(100000 + Math.random() * 900000);
}

export function getMobileOperatingSystem() {
  const userAgent = navigator.userAgent || navigator.vendor || window.opera;

  if (/windows phone/i.test(userAgent)) {
    return "windows";
  }

  if (/android/i.test(userAgent)) {
    return "android";
  }

  if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
    return "ios";
  }
}

export function convertDate(date) {
  return new Date(date).toLocaleDateString("fa-IR");
}

export function abbreviateNumber(num) {
  return new Intl.NumberFormat("en-GB", {
    notation: "compact",
    compactDisplay: "short",
  }).format(num);
}

export function toFarsiNumber(number) {
  const farsiDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
  return number
    .toString()
    .split("")
    .map((x) => farsiDigits[x])
    .join("");
}

export function toEnglishNumber(number) {
  const farsiDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
  return number
    .split("")
    .map((x) => farsiDigits.indexOf(x))
    .join("");
}

export function isEnglishNumber(str) {
  return Boolean(str.match(/^[A-Za-z0-9]*$/));
}

export function onlyLettersAndNumbers(str) {
  return Boolean(str.match(/^[A-Za-z0-9]*$/));
}

// upload media into s3 bucket
export async function uploadMedia(
  media,
  mediaId,
  mediaFolder,
  subFolder,
  format
) {
  const file = media;
  const res = await fetch(
    `/api/upload?file=${mediaFolder}/${subFolder}/${mediaId}${format}`
  );
  const { url, fields } = await res.json();

  const formData = new FormData();
  Object.entries({ ...fields, file }).forEach(([key, value]) => {
    formData.append(key, value);
  });

  await fetch(url, {
    method: "POST",
    body: formData,
  });
}

export function replaceSpacesAndHyphens(str) {
  let result = "";
  for (let i = 0; i < str.length; i++) {
    if (str[i] === " ") {
      result += "-";
    } else if (str[i] === "-") {
      result += " ";
    } else {
      result += str[i];
    }
  }
  return result;
}

export function sliceString(string, number) {
  return string.slice(0, number).split(" ").slice(0, -1).join(" ") + " ...";
}

export function areAllStatesValid(states) {
  for (const state of states) {
    const values = Object.values(state);
    for (const value of values) {
      if (value === "") {
        return false;
      }
    }
  }
  return true;
}

export function parsePersianDate(dateString) {
  const [day, month, year] = dateString.split("/").map(Number);
  const gregorianYear = year + 621;
  const date = new Date(gregorianYear, month - 1, day);
  return date.getTime();
}

export function validateEmail(value) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(value);
}

export function isValidDateFormat(dateString) {
  // Check if the input is a string
  if (typeof dateString !== "string") {
    return false; // Return false for non-string inputs
  }
  // Regular expression to match the format dd/mm/yyyy with both English and Farsi numbers
  const regex =
    /^(0[0-9]|[12][0-9]|3[01]|[۰-۹]{2})\/(0[0-9]|1[0-2]|[۰-۹]{2})\/(\d{4}|[۰-۹]{4})$/;
  // Test the date string against the regex
  return regex.test(dateString);
}

export function applyFontToEnglishWords(inputString, fontType, size, language) {
  let fontSize = language ? size : null;
  const pattern = language ? /[a-zA-Z0-9۰-۹]+/g : /[0-9]+/g;
  // Find and replace English words with span tags for specific font type
  const outputString = inputString.replace(pattern, function (match) {
    return `<span style="font-family: ${fontType}; font-size: ${fontSize};">${match}</span>`;
  });
  return outputString;
}

export function extractParagraphs(text) {
  return text
    .split(/-{3,}|\n\n+/)
    .filter((paragraph) => paragraph.trim() !== "");
}
