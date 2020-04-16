// JustTime.js
// Brad Duns - Well Duns, Inc.

// Tests if string is formatted as "hh:mm:ss"
function checkTime(time) {
  if (time.length > 9) { return false }
  return /^(\d+):([0-5][0-9]):([0-5][0-9])?$/.test(time);
}

// Tests if duration is a valid number
function checkDuration(duration) {
  duration = String(duration);
  if (duration.length > 9) { return false }
  return /^(\d+)?$/.test(duration);
}

// Takes a duration as Seconds and returns a formatted string "hh:mm:ss"
function timeStringFromSeconds(duration) {
  if (checkDuration(duration)) {
    let date = new Date(null);
    date.setSeconds(Number(duration));
    return date.toISOString().substr(11, 8);
  } else {
    throw new Error("The format of the duration is incorrect: " + duration);
  }
}

// Takes a duration as Seconds and returns a short formatted string "hh:mm:ss", "mm:ss", "m:ss"
function shortTimeStringFromSeconds(duration) {
  if (checkDuration(duration)) {
    let date = new Date(null);
    date.setSeconds(Number(duration));
    // 1996-10-15T00:05:32.000Z
    // 0123456789012345678901234
    switch (true) {
      case duration < 600:
        // output 0:00
        return date.toISOString().substr(15, 4);
      case duration < 3600:
        // output 00:00
        return date.toISOString().substr(14, 5);
      default:
        // output 00:00:00
        return date.toISOString().substr(11, 8);
    }
  } else {
    throw new Error("The format of the duration is incorrect: " + duration);
  }
}

// Takes a formatted time string "HH:mm:ss" and returns the number of seconds
function durationFromTimeString(time) {
  if (checkTime(time)) {
    let arr = time.split(".")[0].split(":");
    let h = Number(arr[0]) * 3600;
    let m = Number(arr[1]) * 60;
    let s = Number(arr[2]);
    return h + m + s;
  } else {
    throw new Error("The format of the time is incorrect: " + time);
  }
}

// Takes 2 formatted strings "hh:mm:ss" and returns a formatted
// string "hh:mm:ss" of the duration between the start and the end.
function elapsedTimeString(start, end) {
  let startDuration = durationFromTimeString(start);
  let endDuration = durationFromTimeString(end);
  let duration = 0;
  if (startDuration < endDuration) {
    duration = endDuration - startDuration;
  } else {
    duration = startDuration - endDuration;
  }
  return timeStringFromSeconds(duration);
}

// Takes an array of time strings and returns the total as a formatted string
function addTimeStrings(array) {
  let duration = 0;
  for (let item of array) {
    duration += durationFromTimeString(item);
  }
  return timeStringFromSeconds(duration);
}

// Takes 2 formatted time strings (estimated & actual) and returns an object with:
//   textDirection: over or under the estimated time
//   timeText: formatted text string of the over/under amount
//   shortTimeText: short version of the over/under amount
//   display: string with over/under included -> "-0:00:30"
//   shortDisplay: short string with over/under included -> "-0:30"
function compareTimeStrings(estimated, actual) {
  let estimatedSeconds = durationFromTimeString(estimated);
  let actualSeconds = durationFromTimeString(actual);
  if (estimatedSeconds > actualSeconds) {
    let dur = estimatedSeconds - actualSeconds;
    let text = timeStringFromSeconds(dur);
    let shortText = shortTimeStringFromSeconds(dur);
    let object = {
      textDirection: "under",
      timeText: text,
      shortTimeText: shortText,
      display: "-" + text,
      shortDisplay: "-" + shortText
    };
    return object;
  } else {
    let dur = actualSeconds - estimatedSeconds;
    let text = timeStringFromSeconds(dur);
    let shortText = shortTimeStringFromSeconds(dur);
    let object = {
      textDirection: "over",
      timeText: text,
      shortTimeText: shortText,
      display: "+" + text,
      shortDisplay: "+" + shortText
    };
    return object;
  }
}

// Returns a formatted string of the current time
function timeStringNow() {
  let date = new Date();
  let h = date.getHours();
  let m = date.getMinutes();
  let s = date.getSeconds();
  let returnVal = h;
  if (m < 10) {
    returnVal = returnVal + ":0" + m;
  } else {
    returnVal = returnVal + ":" + m;
  }
  if (s < 10) {
    returnVal = returnVal + ":0" + s;
  } else {
    returnVal = returnVal + ":" + s;
  }
  return returnVal;
}

module.exports = {
  timeStringFromSeconds,
  shortTimeStringFromSeconds,
  durationFromTimeString,
  elapsedTimeString,
  addTimeStrings,
  compareTimeStrings,
  timeStringNow
};
