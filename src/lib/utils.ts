import { DayAbbreviation, WeekDay } from "@/types/time";
import { RepeatInfoItem } from "@/types/todo";
import { type ClassValue, clsx } from "clsx";
import {
  addDays,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  isSameMonth,
  parse,
  startOfMonth,
  startOfWeek,
} from "date-fns";
import { ko } from "date-fns/locale";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getProfileImage(profileImageUrl: string) {
  return profileImageUrl.startsWith("https://")
    ? profileImageUrl
    : `${process.env.S3_PUBLIC_ENDPOINT}/${profileImageUrl}`;
}

// export function getRandomColor(): string {
//   const letters = "0123456789ABCDEF";
//   let color: string;
//   const getBrightness = (color: string): number => {
//     const r = parseInt(color.substring(1, 3), 16);
//     const g = parseInt(color.substring(3, 5), 16);
//     const b = parseInt(color.substring(5, 7), 16);
//     return (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
//   };

//   // 색상 생성 및 검증 반복
//   do {
//     color = "#";
//     for (let i = 0; i < 6; i++) {
//       color += letters[Math.floor(Math.random() * 16)];
//     }
//   } while (getBrightness(color) > 0.7); // 밝기 임계값 (0~1 범위, 낮을수록 어두운 색상)

//   return color;
// }

export function formatKoreanDate(date: Date): string {
  const year = format(date, "yyyy", { locale: ko });
  const month = format(date, "M", { locale: ko });
  return `${year}년 ${month}월`;
}

export function parseYearMonth(yearMonth: string) {
  // 연도와 월 정보를 추출
  const [year, month] = yearMonth.split("-").map(Number);

  // 월은 0부터 시작하므로 1을 빼줍니다.
  const dateString = `${year}-${month < 10 ? "0" : ""}${month}-01`;

  // Date 객체 생성
  return parse(dateString, "yyyy-MM-dd", new Date());
}

export function areDatesEqual(date1: Date, date2: Date) {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
}

export function getWeeksByMonth(date: Date) {
  const monthStart = startOfMonth(date);
  const monthEnd = endOfMonth(monthStart);
  const calendarStart = startOfWeek(monthStart);
  const calendarEnd = endOfWeek(monthEnd);

  const calendarDays: Date[] = eachDayOfInterval({
    start: calendarStart,
    end: calendarEnd,
  });

  const weeks: WeekDay[][] = [];
  let week: WeekDay[] = [];

  calendarDays.forEach((day) => {
    if (week.length === 7) {
      weeks.push(week);
      week = [];
    }
    week.push({
      date: day,
      isCurrentMonth: isSameMonth(day, monthStart),
    });
  });
  if (week.length > 0) {
    weeks.push(week);
  }

  return weeks;
}

export function getISOString(date: Date): string {
  // 한국 시간 (Asia/Seoul)과 UTC의 시간 차이
  const offsetInMillis = 9 * 60 * 60 * 1000;

  // UTC 기준으로 Date 객체를 조정
  const utcDate = new Date(date.getTime() + offsetInMillis);

  return utcDate.toISOString();
}

export function getDateFromTimeString(date: Date, timeString: string): string {
  const [hours, minutes] = timeString.split(":").map(Number);

  date.setHours(hours);
  date.setMinutes(minutes);
  date.setSeconds(0);

  return getISOString(date);
}

export function isDateMatching(day: Date, startAt: string): boolean {
  const startDate = new Date(startAt);
  return (
    day.getFullYear() === startDate.getFullYear() &&
    day.getMonth() === startDate.getMonth() &&
    day.getDate() === startDate.getDate()
  );
}

export function getRepeatInfoText(repeatInfoItem: RepeatInfoItem) {
  let text = "";

  switch (repeatInfoItem.frequency) {
    case "DAILY":
      if (repeatInfoItem.count) {
        text += `매일, ${repeatInfoItem.count}회`;
      } else if (repeatInfoItem.until) {
        const date = new Date(repeatInfoItem.until);
        const year = format(date, "yyyy", { locale: ko });
        const month = format(date, "M", { locale: ko });
        const day = format(date, "d", { locale: ko });
        text += `매일, 종료일: ${year}년 ${month}월 ${day}일`;
      }
      break;
    case "WEEKLY":
      const abbreviations = repeatInfoItem.byDay.split(
        ","
      ) as DayAbbreviation[];

      const dayMapping: Record<DayAbbreviation, string> = {
        MON: "월요일",
        TUE: "화요일",
        WED: "수요일",
        THU: "목요일",
        FRI: "금요일",
        SAT: "토요일",
        SUN: "일요일",
      };

      const koreanDays = abbreviations.map((abbr) => dayMapping[abbr]);

      text += `매주, ${koreanDays.join(", ")}`;
      break;
    case "MONTHLY":
      text += `매월, ${repeatInfoItem.byMonthDay}일`;
      break;
  }

  return text;
}

// 주의 월요일을 찾기 위해 현재 날짜로부터 일요일을 찾음
export function getStartOfWeek(date: Date) {
  const day = date.getDay();
  const difference = (day === 0 ? -6 : 1) - day; // 일요일은 0으로 설정되어 있으므로 -6로 조정
  return addDays(date, difference);
}
