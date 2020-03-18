# just-time
 Add, Subtract, Compare and Create time as strings formatted "HH:mm:ss"

## Install

Install with `npm`

```bash
$ npm install just-time
```

## Usage

### Import
```js
import justTime from "just-time";
```

### Functions

**timeStringFromSeconds(*number*)**

Takes a duration as Seconds and returns a formatted string "HH:mm:ss"

```js
justTime.timeStringFromSeconds(75); // returns "00:01:15"
```

**shortTimeStringFromSeconds(*number*)**

Takes a duration as Seconds and returns a short formatted string "hh:mm:ss", "mm:ss" or "m:ss"
```js
justTime.shortTimeStringFromSeconds(75); // returns "1:15"
```

**durationFromTimeString(*string*)**

Takes a formatted time string "HH:mm:ss" and returns the number of seconds
```js
justTime.durationFromTimeString("00:00:15"); // returns 15
```

**elapsedTimeString(*startString, endString*)**

Takes 2 formatted strings "hh:mm:ss" and returns a formatted string "hh:mm:ss" of the duration between the start and the end.
```js
justTime.elapsedTimeString("15:59:55","16:00:25"); // returns "00:00:30"
```

**addTimeStrings(*array*)**

Takes an array of time strings and returns the total as a formatted string
```js
let times = ["00:01:00", "00:00:15", "00:00:45"];
justTime.addTimeStrings(times); // returns "00:02:00"
```

**compareTimeStrings(*estimated, actual*)**

Takes 2 formatted time strings (estimated & actual) and returns an object with:
  *textDirection:* over or under the estimated time
  *timeText:* formatted text string of the over/under amount
  *shortTimeText:* short version of the over/under amount
  *display:* string with over/under included
  *shortDisplay:* short string with over/under included

```js
justTime.compareTimeStrings("00:00:30", "00:00:45"); 
// returns {
//   textDirection: "over",
//   timeText: "00:00:15",
//   display: "+00:00:15",
//   shortTimeText: "0:15",
//   shortDisplay: "+0:15"
// }
```

**timeStringNow()**

Returns a formatted string of the current time

```js
justTime.timeStringNow(); 
// at 4pm returns "16:00:00"
```



## License

MIT © Brad Duns