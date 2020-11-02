import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Appointment } from "../../models/appointment.model";
import { AppointmentService } from "../../services/appointment.service";

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.css']
})
export class AppointmentsComponent implements OnInit {

  activeAppointments:Array<Appointment>;
  finishedAppointments:Array<Appointment>;
  canceledAppointments:Array<Appointment>;
  loaded = false;

  constructor(public appointmentService:AppointmentService) { }

  ngOnInit() {
    this.getAppointments();
  }

  getAppointments(){
    this.appointmentService.getAppointments()
      .subscribe(resp =>{  
        let finishedAppointmentsArr = [];
        let activeAppointmentsArr = [];
        let canceledAppointmentsArr = [];
        resp.resultset.forEach(appointment => {
          if (appointment.appointmentStatus == 3) {
            finishedAppointmentsArr.push(appointment);
          } else if(appointment.appointmentStatus == 4){
            canceledAppointmentsArr.push(appointment);
          }
          else{
            activeAppointmentsArr.push(appointment);
          }
        });
        this.activeAppointments = activeAppointmentsArr;
        this.finishedAppointments = finishedAppointmentsArr;
        this.canceledAppointments = canceledAppointmentsArr;
        console.log(this.activeAppointments);
        console.log(this.finishedAppointments);
        console.log(this.canceledAppointments);

        this.loaded = true;

      })
  }

  cancelAppointment(id){
    let cancelObj = {
      appointmentID: id
    };
    this.appointmentService.cancelAppointment(cancelObj)
    .subscribe(resp => {
      console.log(resp);
      console.log("POST");
      if(resp.statusCode == 0){
        //Navegar al Dashboard
        Swal.fire('OK', 'La consulta se ha cancelado.', 'success');
        setTimeout(() => {
          window.location.reload();
      }, 1000);
      } else{
        console.warn(resp.statusMessage);
      }
    }, err =>{
      console.warn(err);
    })
    
  }

}
