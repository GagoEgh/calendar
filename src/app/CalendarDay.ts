export class CalendarDay{
    public date: Date;
    public isToday: boolean;
    public isActive?:boolean;
    constructor(date: Date) {
      this.date = date;
      this.isToday = date.setHours(0, 0, 0, 0) == new Date().setHours(0, 0, 0, 0);
      this.isActive = false
    }
}