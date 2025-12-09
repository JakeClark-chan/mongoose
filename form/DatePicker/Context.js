import { writable, derived } from 'svelte/store';
export default class Context {
    date;
    navDate;
    day;
    month;
    year;
    calendar;
    constructor(dateString) {
        this.date = writable(dateString ? new Date(dateString) : new Date());
        this.navDate = writable(dateString ? new Date(dateString) : new Date());
        this.month = this.getMonth();
        this.year = this.getYear();
        this.calendar = this.getCalendar();
    }
    getMonth() {
        return derived(this.navDate, ($date) => {
            return $date.getMonth();
        });
    }
    getYear() {
        return derived(this.navDate, ($date) => {
            return $date.getFullYear();
        });
    }
    setMonth(month) {
        const navDate = this.subscribe();
        navDate.setMonth(month);
        this.navDate.set(navDate);
    }
    setYear(year) {
        const navDate = this.subscribe();
        navDate.setFullYear(year);
        this.navDate.set(navDate);
    }
    getCalendar() {
        return derived([this.year, this.month], ([$year, $month]) => {
            const firstWeekday = new Date($year, $month, 1).getDay();
            let days = [];
            let weekStartsOn = 1;
            const daysBefore = (firstWeekday - weekStartsOn + 7) % 7;
            if (daysBefore > 0) {
                let lastMonth = $month - 1;
                let lastMonthYear = $year;
                if (lastMonth === -1) {
                    lastMonth = 11;
                    lastMonthYear = $year - 1;
                }
                days = this.getMonthDays(lastMonthYear, lastMonth).slice(-daysBefore);
            }
            days = days.concat(this.getMonthDays($year, $month));
            let nextMonth = $month + 1;
            let nextMonthYear = $year;
            if (nextMonth === 12) {
                nextMonth = 0;
                nextMonthYear = $year + 1;
            }
            const daysAfter = 42 - days.length;
            days = days.concat(this.getMonthDays(nextMonthYear, nextMonth).slice(0, daysAfter));
            return days;
        });
    }
    getMonthLength(year, month) {
        const feb = this.isLeapYear(year) ? 29 : 28;
        const monthLengths = [31, feb, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        return monthLengths[month];
    }
    isLeapYear(year) {
        return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
    }
    getMonthDays(year, month) {
        const monthLength = this.getMonthLength(year, month);
        const days = [];
        for (let i = 0; i < monthLength; i++) {
            days.push({
                year: year,
                month: month,
                number: i + 1,
            });
        }
        return days;
    }
    subscribe() {
        let $navDate;
        this.navDate.subscribe(store => $navDate = store);
        return $navDate;
    }
}
