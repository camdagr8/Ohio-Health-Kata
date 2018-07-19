const moment = require('moment');

const defaultScale = {
    reg: 12,
    bed: 8,
    over: 16
};

const now = moment();
const tom = moment().add(1, 'days');
const min = moment(`${now.format('MM/DD/YYYY')} 5:00pm`, 'MM/DD/YYYY h:mma');
const max = moment(`${tom.format('MM/DD/YYYY')} 4:00am`, 'MM/DD/YYYY h:mma');

module.exports = function(params) {
    let { start, end, scale } = params;

    if (!scale) {
        scale = { ...defaultScale };
    } else {
        scale = { ...defaultScale, ...scale };
    }

    let hours = {
        total: 0,
        reg: 0,
        bed: 0,
        over: 0
    };

    let pay = {
        total: 0,
        reg: 0,
        bed: 0,
        over: 0
    };

    let output = { hours, pay, scale };

    if (!start) {
        output.error = {
            message: 'Start time must be string of format: `h:mma`',
            params: { start, end }
        };
        return output;
    }

    if (!end) {
        output.error = {
            message: 'End time must be string of format: `h:mma`',
            params: { start, end }
        };
        return output;
    }

    let stime =
        start.substr(-2) === 'am'
            ? moment(`${tom.format('MM/DD/YYYY')} ${start}`, 'MM/DD/YYYY h:mma')
            : moment(
                  `${now.format('MM/DD/YYYY')} ${start}`,
                  'MM/DD/YYYY h:mma'
              );

    let etime =
        end.substr(-2) === 'am'
            ? moment(`${tom.format('MM/DD/YYYY')} ${end}`, 'MM/DD/YYYY h:mma')
            : moment(`${now.format('MM/DD/YYYY')} ${end}`, 'MM/DD/YYYY h:mma');

    if (stime.unix() < min.unix()) {
        output.error = {
            message: `Start time ${start} is less than minimum time ${min.format(
                'h:mma'
            )}.`,
            params: { start, end }
        };

        return output;
    }

    if (etime.unix() < min.unix()) {
        output.error = {
            message: `End time ${end} is less than minimum time ${min.format(
                'h:mma'
            )}.`,
            params: { start, end }
        };

        return output;
    }

    if (stime.unix() > max.unix()) {
        output.error = {
            message: `Start time ${start} is greater than maximum time ${max.format(
                'h:mma'
            )}.`,
            params: { start, end }
        };

        return output;
    }

    if (etime.unix() > max.unix()) {
        output.error = {
            message: `End time ${end} is greater than maximum time ${max.format(
                'h:mma'
            )}.`,
            params: { start, end }
        };

        return output;
    }

    if (etime.unix() < stime.unix()) {
        output.error = {
            message: `Start time ${start} is greater than endtime ${end}.`,
            params: { start, end }
        };

        return output;
    }

    let rtime = moment(
        `${now.format('MM/DD/YYYY')} 5:00pm`,
        'MM/DD/YYYY h:mma'
    );
    let otime = moment(
        `${tom.format('MM/DD/YYYY')} 12:00am`,
        'MM/DD/YYYY h:mma'
    );
    let btime = moment(
        `${now.format('MM/DD/YYYY')} 8:00pm`,
        'MM/DD/YYYY h:mma'
    );

    hours.total = moment.duration(etime.diff(stime)).as('hours');

    // Bed time hours
    let bedDur = moment.duration(otime.diff(btime)).as('hours');

    // Max bedtime hours -> start and end times are outside of bedtime
    if (stime.unix() < btime.unix() && etime.unix() >= otime.unix()) {
        hours.bed = bedDur;
    } else {
        // All bedtime hours
        if (stime.unix() >= btime.unix() && etime.unix() <= otime.unix()) {
            hours.bed = Math.min(bedDur, hours.total);
        }

        // Partial bedtime hours
        if (stime.unix() >= btime.unix() && etime.unix() >= otime.unix()) {
            hours.bed = moment.duration(otime.diff(stime)).as('hours');
        }
        if (stime.unix() < btime.unix() && etime.unix() <= otime.unix()) {
            hours.bed = moment.duration(etime.diff(btime)).as('hours');
        }
    }
    hours.bed = Math.max(0, hours.bed);

    // Reg hours -> hours before btime
    if (stime.unix() < btime.unix()) {
        hours.reg = moment.duration(btime.diff(stime)).as('hours');

        if (etime.unix() < btime.unix()) {
            hours.reg = hours.total;
        }
    }

    // Overtime hours -> hours after otime
    if (etime.unix() > otime.unix()) {
        hours.over = moment.duration(etime.diff(otime)).as('hours');

        if (stime.unix() >= otime.unix()) {
            hours.over = hours.total;
        }
    }

    // Calculate pay
    Object.keys(scale).forEach(k => {
        pay[k] = hours[k] * scale[k];
        pay['total'] += pay[k];
    });

    return output;
};
