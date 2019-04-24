import dayjs from 'dayjs';

export const logger = level => (...message) => {
    console[level](
        `${dayjs().format('YYYY-MM-DD HH:mm:ss').toString()}`, ...message
    );
};

export const log = logger('log');
export const debug = logger('debug');
export const warn = logger('warn');
export const error = logger('error');


export const timeFormat = (time) => {
    return dayjs(time).format('YYYY [年] MM [月] DD [日] HH:mm')
};