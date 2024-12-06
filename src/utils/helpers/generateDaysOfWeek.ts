import dayjs from "dayjs";

export const generateDaysOfWeek = (week: {start: dayjs.Dayjs, end: dayjs.Dayjs}) => {
    const days = [];
    for (let i = 0; i < 7; i++) {
      const day = week.start.add(i, "day");
      days.push(day);
    }
    return days;
  };