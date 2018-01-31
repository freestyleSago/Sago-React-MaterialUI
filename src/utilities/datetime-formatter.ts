import * as moment from 'moment'

/**
 * 格式化日期
 * 
 * @export
 * @param {moment.DurationInputArg1} [amount=0] 
 * @param {moment.DurationInputArg2} [unit='seconds'] 
 * @param {string} [formatExpression='YYYY-MM-DD HH:mm:ss'] 
 * @param {moment.MomentInput} [datetime='1900-01-01 00:00:00'] 
 * @returns {string} 
 */
export function FormatDateTime(amount: moment.DurationInputArg1 = 0, unit: moment.DurationInputArg2 = 'seconds', formatExpression = 'YYYY-MM-DD HH:mm:ss', datetime: moment.MomentInput = '1900-01-01 00:00:00'): string {
    return moment(datetime).add(amount, unit).format(formatExpression);
}