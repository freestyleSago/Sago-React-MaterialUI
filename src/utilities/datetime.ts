import * as moment from 'moment';

/**
 * C# DateTime类型
 * 
 * @export
 * @class DateTime
 */
export class DateTime {
    /**
     * 当前时间
     * 
     * @static
     * @type {DateTime}
     * @memberOf DateTime
     */
    static readonly GetNow: () => DateTime = () => new DateTime(moment());
    /**
     * 最小日期
     * 
     * @static
     * @type {string}
     * @memberOf DateTime
     */
    static readonly MinValue: DateTime = new DateTime('0001-01-01 00:00:00');
    /**
     * 最大日期
     * 
     * @static
     * @type {DateTime}
     * @memberOf DateTime
     */
    static readonly MaxValue: DateTime = new DateTime('9999-12-31 23:59:59');

    constructor(datetime?: moment.MomentInput) {
        if (datetime) {
            this.Value = moment(datetime);
        } else {
            this.Value = moment(DateTime.MinValue.Value);
        }
    }

    /**
     * moment实例
     * 
     * @type {moment.Moment}
     * @memberOf DateTime
     */
    protected Value: moment.Moment;

    /**
     * 取得年
     * 
     * @returns {number} 
     * 
     * @memberOf DateTime
     */
    public GetYear(): number {
        if (this.Value) {
            return this.Value.years();
        }
        return 1;
    }

    /**
     * 取得月
     * 
     * @returns {number} 
     * 
     * @memberOf DateTime
     */
    public GetMonth(): number {
        if (this.Value) {
            return this.Value.months();
        }
        return 1;
    }

    /**
     * 取得天
     * 
     * @returns {number} 
     * 
     * @memberOf DateTime
     */
    public GetDay(): number {
        if (this.Value) {
            return this.Value.days();
        }
        return 1;
    }

    /**
     * 取得时
     * 
     * @returns {number} 
     * 
     * @memberOf DateTime
     */
    public GetHour(): number {
        if (this.Value) {
            return this.Value.hours();
        }
        return 0;
    }

    /**
     * 取得分
     * 
     * @returns {number} 
     * 
     * @memberOf DateTime
     */
    public GetMinute(): number {
        if (this.Value) {
            return this.Value.minutes();
        }
        return 0;
    }

    /**
     * 取得秒
     * 
     * @returns {number} 
     * 
     * @memberOf DateTime
     */
    public GetSecond(): number {
        if (this.Value) {
            return this.Value.seconds();
        }
        return 0;
    }

    /**
     * 取得毫秒
     * 
     * @returns {number} 
     * 
     * @memberOf DateTime
     */
    public GetMilliseconds(): number {
        if (this.Value) {
            return this.Value.milliseconds();
        }
        return 0;
    }

    /**
     * 增加年
     * 
     * @param {number} years 
     * @returns {DateTime} 
     * 
     * @memberOf DateTime
     */
    public AddYears(years: number): DateTime {
        this.Value.add(years, 'years');
        return this;
    }

    /**
     * 增加月
     * 
     * @param {number} months 
     * @returns {DateTime} 
     * 
     * @memberOf DateTime
     */
    public AddMonths(months: number): DateTime {
        this.Value.add(months, 'months');
        return this;
    }

    /**
     * 增加天
     * 
     * @param {number} days 
     * @returns {DateTime} 
     * 
     * @memberOf DateTime
     */
    public AddDay(days: number): DateTime {
        this.Value.add(days, 'days');
        return this;
    }

    /**
     * 增加小时
     * 
     * @param {number} hours 
     * @returns {DateTime} 
     * 
     * @memberOf DateTime
     */
    AddHours(hours: number): DateTime {
        this.Value.add(hours, 'hours');
        return this;
    }

    /**
     * 增加分
     * 
     * @param {number} minutes 
     * @returns {DateTime} 
     * 
     * @memberOf DateTime
     */
    public AddMinutes(minutes: number): DateTime {
        this.Value.add(minutes, 'minutes');
        return this;
    }

    /**
     * 增加秒
     * 
     * @param {number} seconds 
     * @returns {DateTime} 
     * 
     * @memberOf DateTime
     */
    public AddSeconds(seconds: number): DateTime {
        this.Value.add(seconds, 'seconds');
        return this;
    }

    /**
     * 增加毫秒
     * 
     * @param {number} millisecond 
     * @returns {DateTime} 
     * 
     * @memberOf DateTime
     */
    public AddMillisecond(millisecond: number): DateTime {
        this.Value.add(millisecond, 'millisecond');
        return this;
    }

    /**
     * 格式化字符串
     * 
     * @param {string} [formatExpression='YYYY-MM-DD HH:mm:ss'] moment.js的格式化字符串
     * @returns {string} 
     * 
     * @memberOf DateTime
     */
    public ToString(formatExpression = 'YYYY-MM-DD HH:mm:ss'): string {
        return this.Value.format(formatExpression);
    }
}