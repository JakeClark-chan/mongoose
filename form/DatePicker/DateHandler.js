import Context from './Context';
export default class DateHandler {
    context;
    constructor(dateString) {
        this.context = new Context(dateString);
    }
    getDate() {
        return this.context.date;
    }
    setDate(day) {
        this.context.date.set(new Date(day.year, day.month, day.number, 5, 0, 0));
    }
    getNavDate() {
        return this.context.navDate;
    }
    setMonth(month) {
        this.context.setMonth(month);
    }
    setYear(year) {
        this.context.setYear(year);
    }
    getCalendar() {
        return this.context.calendar;
    }
}
