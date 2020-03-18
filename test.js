const assert = require('assert');
const justTime = require('./index');

console.time("Execution Time");

assert.strictEqual(justTime.timeStringFromSeconds(1), "00:00:01");
assert.strictEqual(justTime.timeStringFromSeconds(15), "00:00:15");
assert.strictEqual(justTime.timeStringFromSeconds(60), "00:01:00");
assert.strictEqual(justTime.timeStringFromSeconds(61), "00:01:01");
assert.strictEqual(justTime.timeStringFromSeconds(71), "00:01:11");
assert.strictEqual(justTime.timeStringFromSeconds(900), "00:15:00");
assert.strictEqual(justTime.timeStringFromSeconds(5401), "01:30:01");

assert.strictEqual(justTime.shortTimeStringFromSeconds(1), "0:01");
assert.strictEqual(justTime.shortTimeStringFromSeconds(15), "0:15");
assert.strictEqual(justTime.shortTimeStringFromSeconds(60), "1:00");
assert.strictEqual(justTime.shortTimeStringFromSeconds(61), "1:01");
assert.strictEqual(justTime.shortTimeStringFromSeconds(71), "1:11");
assert.strictEqual(justTime.shortTimeStringFromSeconds(900), "15:00");
assert.strictEqual(justTime.shortTimeStringFromSeconds(5401), "01:30:01");

assert.strictEqual(justTime.durationFromTimeString("00:00:01"), 1);
assert.strictEqual(justTime.durationFromTimeString("00:00:15"), 15);
assert.strictEqual(justTime.durationFromTimeString("00:01:00"), 60);
assert.strictEqual(justTime.durationFromTimeString("00:01:01"), 61);
assert.strictEqual(justTime.durationFromTimeString("00:01:11"), 71);
assert.strictEqual(justTime.durationFromTimeString("00:15:00"), 900);
assert.strictEqual(justTime.durationFromTimeString("01:30:01"), 5401);

assert.strictEqual(justTime.subtractTimeStrings("00:00:00","00:00:45"), "00:00:45");
assert.strictEqual(justTime.subtractTimeStrings("00:00:30","00:00:45"), "00:00:15");
assert.strictEqual(justTime.subtractTimeStrings("00:00:30","00:01:45"), "00:01:15");
assert.strictEqual(justTime.subtractTimeStrings("15:59:55","16:00:25"), "00:00:30");
assert.strictEqual(justTime.subtractTimeStrings("17:09:00","17:10:35"), "00:01:35");
assert.strictEqual(justTime.subtractTimeStrings("01:01:15","01:11:45"), "00:10:30");
assert.strictEqual(justTime.subtractTimeStrings("10:00:00","11:50:27"), "01:50:27");
assert.strictEqual(justTime.subtractTimeStrings("00:00:59","00:01:00"), "00:00:01");

let times = [
  "00:00:50", "00:09:10", "00:50:00", "01:00:01", "00:00:15", "00:00:45", "00:01:00", "00:00:50", "00:09:10", "00:50:00", "01:00:01", "00:00:15", "00:00:45", "00:01:00", "00:00:00"];
assert.strictEqual(justTime.addTimeStrings(times), "04:04:02");

assert.strictEqual(justTime.compareTimeStrings("00:00:30", "00:00:45").textDirection, "over");
assert.strictEqual(justTime.compareTimeStrings("00:00:30", "00:00:45").timeText, "00:00:15");
assert.strictEqual(justTime.compareTimeStrings("00:00:30", "00:00:45").display, "+00:00:15");
assert.strictEqual(justTime.compareTimeStrings("00:00:30", "00:00:45").shortTimeText, "0:15");
assert.strictEqual(justTime.compareTimeStrings("00:00:30", "00:00:45").shortDisplay, "+0:15");

assert.strictEqual(justTime.compareTimeStrings("01:59:55","01:59:25").textDirection, "under");
assert.strictEqual(justTime.compareTimeStrings("01:59:55","01:59:25").timeText, "00:00:30");
assert.strictEqual(justTime.compareTimeStrings("01:59:55","01:59:25").display, "-00:00:30");
assert.strictEqual(justTime.compareTimeStrings("01:59:55","01:59:25").shortTimeText, "0:30");
assert.strictEqual(justTime.compareTimeStrings("01:59:55","01:59:25").shortDisplay, "-0:30");

assert.strictEqual(justTime.compareTimeStrings("00:10:15","00:20:25").textDirection, "over");
assert.strictEqual(justTime.compareTimeStrings("00:10:15","00:20:25").timeText, "00:10:10");
assert.strictEqual(justTime.compareTimeStrings("00:10:15","00:20:25").display, "+00:10:10");
assert.strictEqual(justTime.compareTimeStrings("00:10:15","00:20:25").shortTimeText, "10:10");
assert.strictEqual(justTime.compareTimeStrings("00:10:15","00:20:25").shortDisplay, "+10:10");

assert.strictEqual(justTime.compareTimeStrings("00:00:15","00:00:15").textDirection, "over");
assert.strictEqual(justTime.compareTimeStrings("00:00:15","00:00:15").timeText, "00:00:00");
assert.strictEqual(justTime.compareTimeStrings("00:00:15","00:00:15").display, "+00:00:00");
assert.strictEqual(justTime.compareTimeStrings("00:00:15","00:00:15").shortTimeText, "0:00");
assert.strictEqual(justTime.compareTimeStrings("00:00:15","00:00:15").shortDisplay, "+0:00");

console.timeEnd("Execution Time");
console.log("All Tests Passed");

