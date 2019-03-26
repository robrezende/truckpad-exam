const trucksArrivedDuringDayGetter = require('./trucksArrivedDuringDayGetter');
const trucksArrivedDuringWeekGetter = require('./trucksArrivedDuringWeekGetter');
const trucksArrivedDuringMonthGetter = require('./trucksArrivedDuringMonthGetter');


const get = async (period) => {
    const now = new Date();
    switch (period) {
        case 'day':
            return {
                day: await trucksArrivedDuringDayGetter.get(now)
            };
        case 'week':
            return {
                week: await trucksArrivedDuringWeekGetter.get(now)
            };

        case 'month':
            return {
                month: await trucksArrivedDuringMonthGetter.get(now)
            };
        default:
            return {
                day: await trucksArrivedDuringDayGetter.get(now),
                week: await trucksArrivedDuringWeekGetter.get(now),
                month: await trucksArrivedDuringMonthGetter.get(now)
            };

    }
}

module.exports.get = get;