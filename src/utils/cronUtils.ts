import { parseExpression } from "cron-parser";
import type { CronExpression } from "cron-parser";

export function getNextRunDate(cronExpression: string): Date {
  try {
    const interval = parseExpression(cronExpression);
    return interval.next().toDate();
  } catch (error) {
    console.error("Error parsing cron expression:", error);
    throw new Error("Invalid cron expression");
  }
}

export function validateCronExpression(cronExpression: string): boolean {
  try {
    parseExpression(cronExpression);
    return true;
  } catch (error) {
    return false;
  }
}

// Get next N run dates
export function getNextNRunDates(cronExpression: string, n: number): Date[] {
  try {
    const interval = parseExpression(cronExpression);
    const dates: Date[] = [];

    for (let i = 0; i < n; i++) {
      dates.push(interval.next().toDate());
    }

    return dates;
  } catch (error) {
    console.error("Error getting next run dates:", error);
    throw new Error("Invalid cron expression");
  }
}

// Helper function to generate human-readable description of cron schedule
export function describeCronSchedule(cronExpression: string): string {
  try {
    const parts = cronExpression.split(" ");
    if (parts.length !== 5) {
      throw new Error("Invalid cron expression format");
    }

    const [minute, hour, dayOfMonth, month, dayOfWeek] = parts;
    let description = "Runs ";

    if (minute === "*" && hour === "*") {
      description += "every minute";
    } else if (minute === "0" && hour === "*") {
      description += "hourly";
    } else if (minute === "0" && hour === "0") {
      description += "daily at midnight";
    } else if (minute === "0") {
      description += `daily at ${hour}:00`;
    } else {
      description += `at ${hour}:${minute}`;
    }

    if (dayOfMonth !== "*") {
      description += ` on day ${dayOfMonth} of the month`;
    }

    if (month !== "*") {
      const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
      description += ` in ${months[parseInt(month ?? "0") - 1]}`;
    }

    if (dayOfWeek !== "*") {
      const days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];
      description += ` on ${days[parseInt(dayOfWeek ?? "0")]}`;
    }

    return description;
  } catch {
    return "Invalid cron expression";
  }
}

// Common cron patterns
export const CronPatterns = {
  EVERY_MINUTE: "* * * * *",
  EVERY_HOUR: "0 * * * *",
  EVERY_DAY_MIDNIGHT: "0 0 * * *",
  EVERY_MONDAY: "0 0 * * 1",
  EVERY_WEEKDAY: "0 0 * * 1-5",
  EVERY_WEEKEND: "0 0 * * 0,6",
  EVERY_MONTH_FIRST_DAY: "0 0 1 * *",
  EVERY_YEAR_FIRST_DAY: "0 0 1 1 *",
} as const;

// Validate interval between runs (in minutes)
export function validateMinimumInterval(
  cronExpression: string,
  minimumMinutes: number,
): boolean {
  try {
    const interval = parseExpression(cronExpression);
    const firstRun = interval.next().getTime();
    const secondRun = interval.next().getTime();

    const differenceInMinutes = (secondRun - firstRun) / (1000 * 60);
    return differenceInMinutes >= minimumMinutes;
  } catch (error) {
    return false;
  }
}
