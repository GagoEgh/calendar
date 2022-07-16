import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { CalendarDay } from './CalendarDay';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [DatePipe],
})
export class AppComponent implements OnInit {

  date = new Date();
  year = this.date.getFullYear();
  month = this.date.getMonth();
  days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  calendar: CalendarDay[] = [];
  displayMonth!: string | null;
  monthIndex: number = 0;
  

  constructor(private datePipe: DatePipe) { }


  ngOnInit(): void {
    this.generateCalendarDays(this.monthIndex);
  }

  next() {
    this.monthIndex++;
    this.generateCalendarDays(this.monthIndex);

    if (this.month === 11) {
      this.year++
    }
  }

  preview() {
    this.monthIndex--
    this.generateCalendarDays(this.monthIndex);

    if (this.month === 0) {
      this.year--
    }
  }

  setCurrentMonth() {
    this.year = new Date().getFullYear()
    this.monthIndex = 0;
    this.generateCalendarDays(this.monthIndex);
  }

  markDay(day: any) {
    day.isActive = !day.isActive;
  }
  private startCalendar(selectedDate: Date) {
    let startingDate = new Date(selectedDate.setDate(0));
    if (startingDate.getDay() != 1) {
      while (startingDate.getDay() != 1) {

        startingDate = new Date(startingDate.setDate(startingDate.getDate() - 1));
      }
    }

    return startingDate;
  }


  private generateCalendarDays(monthIndex: number): void {
    this.calendar = [];
    let day: Date = new Date(new Date().setMonth(new Date().getMonth() + monthIndex))
    this.month = day.getMonth();
    this.date.setFullYear(this.year, this.month);
    this.displayMonth = this.transformDate(this.date, 'MMM y');
    let dateToAdd = this.startCalendar(day);

    for (var i = 0; i < 42; i++) {
      this.calendar.push(new CalendarDay(new Date(dateToAdd)));
      dateToAdd = new Date(dateToAdd.setDate(dateToAdd.getDate() + 1));
    }
  }

  private transformDate(date: any, format: string): string | null {
    return this.datePipe.transform(date, format);
  }
}
