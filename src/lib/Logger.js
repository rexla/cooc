/**
 * Todo:
 * console.time('name);
 * console.timeEnd('name')
 * https://developer.mozilla.org/en-US/docs/Web/API/Console/time
 */
import moment from "moment";
import { LogShowTime, LogLevel } from "../globals/Constants";
import Colors from "../globals/Colors";

export default class Logger {
  // 其實clazz在function typeof Foo === 'function'
  name = "";
  level = LogLevel;
  Level = {
    TRACE: 0, // For mobx
    DEBUG: 1, // 等於 ON，全開
    INFO: 2,
    WARN: 3,
    ERROR: 4,
    OFF: 99,
  };
  constructor(clazz, level) {
    this.name = clazz;
    if (typeof clazz === "function") {
      this.name = clazz.name;
    }

    level && (this.level = level);
  }
  setLevel(level) {
    this.level = level;
  }
  trace(msg, data) {
    if (this.level <= this.Level.TRACE) {
      this.log(msg, "Trace", Colors.success, data);
    }
  }
  debug(msg, data) {
    if (this.level <= this.Level.DEBUG) {
      this.log(msg, "Debug", Colors.primary["500"], data);
    }
  }
  info(msg, data) {
    if (this.level <= this.Level.INFO) {
      this.log(msg, "Info", Colors.info, data);
    }
  }
  warn(msg, data) {
    if (this.level <= this.Level.WARN) {
      this.log(msg, "Warn", Colors.warning, data);
    }
  }
  error(msg, data) {
    if (this.level <= this.Level.ERROR) {
      this.log(msg, "Error", Colors.danger, data);
      //console.log(msg); // 為了顯示stacktrace
    }
  }
  log(msg, type, color, data) {
    if (LogShowTime) {
      if (data) {
        console.log(
          `%c${this.name} - ${type} - ${moment().format(
            "YYYY-MM-DD, HH:mm:ss"
          )} - ${msg}`,
          `color: ${color}; background: ${Colors.white}`,
          data
        );
      } else {
        console.log(
          `%c${this.name} - ${type} - ${moment().format(
            "YYYY-MM-DD, HH:mm:ss"
          )} - ${msg}`,
          `color: ${color}; background: ${Colors.white}`
        );
      }
      return;
    }
    if (data) {
      console.log(
        `%c${this.name} - ${type} - ${msg}`,
        `color: ${color}; background: ${Colors.white}`,
        data
      );
    } else {
      console.log(
        `%c${this.name} - ${type} - ${msg}`,
        `color: ${color}; background: ${Colors.white}`
      );
    }
    // console.log("%c$zestlifia - warn - helloworld, color: red; background: white")
  }
  // todo: pattern, formatter
}
