import { Component, OnInit } from '@angular/core';
import { DiaCalendario } from 'src/app/models/calendar';
import { getDay, startOfMonth, endOfMonth, addDays, format } from 'date-fns';
import { es } from 'date-fns/locale';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  mesActual!: Date;
  nombreMesActual!: string;
  diasCalendario!: DiaCalendario[]

  constructor() { }

  ngOnInit(): void {
    this.mesActual = new Date();
    this.nombreMesActual = format(this.mesActual, 'LLLL', {locale: es});
    this.generarCalendario();
  }

  generarCalendario() {
  const primerDia = startOfMonth(this.mesActual);
  const ultimoDia = endOfMonth(this.mesActual);
  const primerDiaSemana = getDay(primerDia); // Obtiene el día de la semana del primer día del mes
  const fechaActual = new Date(); // Obtiene la fecha actual

  this.diasCalendario = [];
  let diaActual = startOfMonth(this.mesActual);

  // Agrega días vacíos hasta el primer día de la semana
  for (let i = 0; i < primerDiaSemana; i++) {
    this.diasCalendario.push({ fecha: new Date(), numero: '', esFechaActual: false });
  }

  // Agrega los días del mes
  while (diaActual <= ultimoDia) {
    const esFechaActual = diaActual.toDateString() === fechaActual.toDateString();    
    this.diasCalendario.push({
      fecha: new Date(diaActual),
      numero: diaActual.getDate(),
      esFechaActual: esFechaActual // Nuevo atributo para indicar si es la fecha actual
    });
    diaActual = addDays(diaActual, 1);
  }
}

}
