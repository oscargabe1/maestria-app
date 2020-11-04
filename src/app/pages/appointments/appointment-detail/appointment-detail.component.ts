import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Appointment } from "../../../models/appointment.model";
import { AppointmentService } from "../../../services/appointment.service";

@Component({
  selector: 'app-appointment-detail',
  templateUrl: './appointment-detail.component.html',
  styleUrls: ['./appointment-detail.component.css']
})
export class AppointmentDetailComponent implements OnInit {

  appointment:Appointment;
  loaded:boolean = false;

  constructor(private activatedRoute:ActivatedRoute, public appointmentService:AppointmentService) { }

  ngOnInit() {
    this.getAppointment();
  }

  getAppointment(){

    this.activatedRoute.params.subscribe(params =>{
      this.appointmentService.getAppointment(params.id)
        .subscribe(resp =>{  
          console.log(resp);
          console.log("RESP");
          this.appointment = resp.resultset;
          switch (this.appointment.appointmentStatus) {
            case 1:
              this.appointment.appointmentStatus = {
                name:'Activa',
                color:'badge bg-primary'
              };
              break;
            case 2:
                this.appointment.appointmentStatus = {
                  name:'En Curso',
                  color:'badge bg-warning'
                };
              break;
            case 3:
                this.appointment.appointmentStatus = {
                  name:'Terminada',
                  color:'badge bg-success'
                };
              break;
            case 4:
                this.appointment.appointmentStatus = {
                  name:'Cancelada',
                  color:'badge bg-danger'
                };
              break;
          
            default:
              this.appointment.appointmentStatus = {
                name:'Activa',
                color:'badge bg-primary'
              };
              break;
          }
          console.log(this.appointment);
          this.loaded = true;
  
        })
    })

  }

}
