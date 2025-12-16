export class DateTime {
    static format(dateString, format = { year: 'numeric', month: 'numeric', day: 'numeric' }, locale = 'fr-FR') {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat(locale, format).format(date);
    }
    static relative(dateString, locale = 'fr-FR') {
        let unit;
        const rtf = new Intl.RelativeTimeFormat(locale, { numeric: 'auto' });
        let fromNow = (new Date(dateString).getTime() - new Date().getTime()) / (24 * 60 * 60 * 1000);
        if (fromNow < -365 || fromNow > 365) {
            fromNow = fromNow / 365;
            unit = 'year';
        }
        else if (fromNow < -31 || fromNow > 31) {
            fromNow = fromNow / 31;
            unit = 'month';
        }
        else if (fromNow < -7 || fromNow > 7) {
            fromNow = fromNow / 7;
            unit = 'week';
        }
        else {
            fromNow = fromNow;
            unit = 'day';
        }
        const duration = parseFloat(fromNow.toFixed(0));
        return rtf.format(duration, unit);
    }
    static minus(dateString, value, unit = 'day') {
        const date = new Date(dateString);
        if (unit === 'year') {
            date.setFullYear(date.getFullYear() - value);
            return date.toISOString();
        }
        else if (unit === 'month') {
            date.setMonth(date.getMonth() - value);
            return date.toISOString();
        }
        else if (unit === 'week') {
            date.setDate(date.getDate() - (value * 7));
            return date.toISOString();
        }
        else {
            date.setDate(date.getDate() - value);
            return date.toISOString();
        }
    }
    static plus(dateString, value, unit = 'day') {
        const date = new Date(dateString);
        if (unit === 'year') {
            date.setFullYear(date.getFullYear() + value);
            return date.toISOString();
        }
        else if (unit === 'month') {
            date.setMonth(date.getMonth() + value);
            return date.toISOString();
        }
        else if (unit === 'week') {
            date.setDate(date.getDate() + (value * 7));
            return date.toISOString();
        }
        else {
            date.setDate(date.getDate() + value);
            return date.toISOString();
        }
    }
}
