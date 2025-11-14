import { formatDateId } from './dateUtils';

 export const generateMonthDays = (year, month) => {
      const days = [];
      const firstDayOfMonth = new Date(year, month - 1, 1);
      const daysInMonth = new Date(year, month, 0).getDate();
      const startDay = firstDayOfMonth.getDay();

      // Add previous month's days
      const prevMonthDays = startDay === 0 ? 6 : startDay - 1;
      const prevMonthDate = new Date(year, month - 1, 0).getDate();

      for (let i = prevMonthDays; i > 0; i--) {
        const d = new Date(year, month - 2, prevMonthDate - i + 1);
        days.push({
          id: formatDateId(d),
          year: d.getFullYear(),
          month: d.getMonth() + 1,
          day: d.getDate(),
          weekday: d.getDay(),
          isCurrentMonth: false,
          tasks: [],
        });
      }

      // Current month's days
      for (let day = 1; day <= daysInMonth; day++) {
        const d = new Date(year, month - 1, day);
        days.push({
          id: formatDateId(d),
          year: year,
          month: month,
          day: day,
          weekday: d.getDay(),
          isCurrentMonth: true,
          tasks: [],
        });
      }

      // Next month's days
      const remaining = 42 - days.length;
      for (let i = 1; i <= remaining; i++) {
        const d = new Date(year, month, i);
        days.push({
          id: formatDateId(d),
          year: d.getFullYear(),
          month: d.getMonth() + 1,
          day: d.getDate(),
          weekday: d.getDay(),
          isCurrentMonth: false,
          tasks: [],
        });
      }
      
      return days;
    };