import { Pipe, PipeTransform } from '@angular/core';
import { CalendarDay } from './CalendarDay';

@Pipe({
  name: 'chunk'
})
export class ChunkPipe implements PipeTransform {

  transform(calendarDaysArray: CalendarDay[], chunkSize: number): any {
   
    let calendarDays:CalendarDay[] = [];
    let weekDays:any = [];
    
    calendarDaysArray.map((day:CalendarDay,index:number) => {
      
        weekDays.push(day);
        if (++index % chunkSize  === 0) {
          calendarDays.push(weekDays);
          weekDays = [];
        }
    });
  
    return calendarDays;
  }

}
