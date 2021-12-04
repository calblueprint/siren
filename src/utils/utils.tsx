const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
const daysOfWeek = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

// convert camelCase to Title Case
export const convertCamelToTitleCase = (str: string) => {
  let result = str.replace(/([A-Z])/g, ' $1');
  result = result.charAt(0).toUpperCase() + result.slice(1);
  return result;
};

// convert a Date object into a readable string
export const convertDateObjectToString = (date: Date) => {
  const localeTimeString: string = date.toLocaleTimeString();
  const time: string =
    localeTimeString.substring(0, localeTimeString.lastIndexOf(':')) +
    localeTimeString.substring(localeTimeString.lastIndexOf(':') + 3);

  return `${daysOfWeek[date.getDay()]}, ${
    months[date.getMonth()]
  } ${date.getDate()} at ${time}`;
};
