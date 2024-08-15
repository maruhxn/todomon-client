interface WeekDay {
  date: Date;
  isCurrentMonth: boolean;
}

export type DayAbbreviation =
  | "MON"
  | "TUE"
  | "WED"
  | "THU"
  | "FRI"
  | "SAT"
  | "SUN";

export type FREQUENCY = "DAILY" | "WEEKLY" | "MONTHLY";
