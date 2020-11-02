import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { Appointment } from "../../../models/appointment.model";
import { User } from "../../../models/user.model";
import { AppointmentService } from "../../../services/appointment.service";
import { ScheduleService } from "../../../services/schedule.service";
import { UserService } from "../../../services/user.service";

@Component({
  selector: 'app-appointment-add',
  templateUrl: './appointment-add.component.html',
  styleUrls: ['./appointment-add.component.css']
})
export class AppointmentAddComponent implements OnInit {

  user:User;
  others:Array<User>;
  type:number;
  toggledButton;

  doctor:number;


  public appointmentForm = this.fb.group({
    user: ['', [Validators.required]],
    doctor: ['', [Validators.required]],
    start_date: ['', [Validators.required]],
    end_date: ['', []],
    treatment: ['', [Validators.required]],
    notes: ['', []],
  });


    week1 = {
      "active": "active",
      "title": "Octubre 5 - 11",
      "tab": "tab1",
      "text": "bruh",
      "days": [
        {
          "name":"Lunes",
          "number": 5,
          "hours": [
            {
              "display": "15:00",
              "timestamp": 1,
              "disabled": "disabled"
            },
            {
              "display": "17:00",
              "timestamp": 2,
              "disabled": "disabled"
            }
          ]
        },
        {
          "name":"Martes",
          "number": 6,
          "hours": [
            {
              "display": "15:00",
              "timestamp": 3,
              "disabled": "disabled"
            },
            {
              "display": "17:00",
              "timestamp": 4,
              "disabled": "disabled"
            }
          ]
        },
        {
          "name":"Miércoles",
          "number": 7,
          "hours": [
            {
              "display": "15:00",
              "timestamp": 5,
              "disabled": "disabled"
            },
            {
              "display": "17:00",
              "timestamp": 6,
              "disabled": ""
            }
          ]
        },
        {
          "name":"Jueves",
          "number": 8,
          "hours": [
            {
              "display": "15:00",
              "timestamp": 7,
              "disabled": ""
            },
            {
              "display": "17:00",
              "timestamp": 8,
              "disabled": ""
            }
          ]
        },
        {
          "name":"Viernes",
          "number": 9,
          "hours": [
            {
              "display": "15:00",
              "timestamp": 9,
              "disabled": ""
            },
            {
              "display": "17:00",
              "timestamp": 10,
              "disabled": ""
            }
          ]
        },
        {
          "name":"Sábado",
          "number": 10,
          "hours": [
            {
              "display": "15:00",
              "timestamp": 11,
              "disabled": ""
            },
            {
              "display": "17:00",
              "timestamp": 12,
              "disabled": ""
            }
          ]
        },
        {
          "name":"Domingo",
          "number": 11,
          "hours": [
            {
              "display": "15:00",
              "timestamp": 13,
              "disabled": ""
            },
            {
              "display": "17:00",
              "timestamp": 14,
              "disabled": ""
            }
          ]
        }
      ]
    };
    week2 = {
      "active": "",
      "title": "Octubre 12 - 19",
      "tab": "tab2",
      "text": "brah",
      "days": [
        {
          "name":"Lunes",
          "number": 12,
          "hours": [
            {
              "display": "15:00",
              "timestamp": 15,
              "disabled": "disabled"
            },
            {
              "display": "17:00",
              "timestamp": 16,
              "disabled": "disabled"
            }
          ]
        },
        {
          "name":"Martes",
          "number": 13,
          "hours": [
            {
              "display": "15:00",
              "timestamp": 17,
              "disabled": "disabled"
            },
            {
              "display": "17:00",
              "timestamp": 18,
              "disabled": "disabled"
            }
          ]
        },
        {
          "name":"Miércoles",
          "number": 14,
          "hours": [
            {
              "display": "15:00",
              "timestamp": 19,
              "disabled": "disabled"
            },
            {
              "display": "17:00",
              "timestamp": 20,
              "disabled": ""
            }
          ]
        },
        {
          "name":"Jueves",
          "number": 15,
          "hours": [
            {
              "display": "15:00",
              "timestamp": 21,
              "disabled": ""
            },
            {
              "display": "17:00",
              "timestamp": 22,
              "disabled": ""
            }
          ]
        },
        {
          "name":"Viernes",
          "number": 16,
          "hours": [
            {
              "display": "15:00",
              "timestamp": 23,
              "disabled": ""
            },
            {
              "display": "17:00",
              "timestamp": 24,
              "disabled": ""
            }
          ]
        },
        {
          "name":"Sábado",
          "number": 17,
          "hours": [
            {
              "display": "15:00",
              "timestamp": 25,
              "disabled": ""
            },
            {
              "display": "17:00",
              "timestamp": 26,
              "disabled": ""
            }
          ]
        },
        {
          "name":"Domingo",
          "number": 18,
          "hours": [
            {
              "display": "15:00",
              "timestamp": 27,
              "disabled": ""
            },
            {
              "display": "17:00",
              "timestamp": 28,
              "disabled": ""
            }
          ]
        }
      ]
    };

    schedule = [
      this.week1,
      this.week2];
  

  constructor(private activatedRoute:ActivatedRoute, public appointmentService:AppointmentService, public userService:UserService, public scheduleService:ScheduleService, private fb: FormBuilder, public router:Router) { }

  ngOnInit() {
    this.getDoctorsPatients();
    console.log(this.schedule);
  }

  getDoctorsPatients(){
    this.userService.getDoctorsPatients()
      .subscribe(resp =>{
        console.log(resp);
        this.user = resp.resultset.selfUser;
        this.others = resp.resultset.otherUsers;
        this.type = resp.resultset.selfUserType;

        this.populateFields();
        if(this.type == 2){
          this.switchDoctor(this.user.userID);
        }
      })
  }

  switchDoctor(doctorID:number){
    this.doctor = doctorID;
    this.getSchedule(doctorID);
  }

  getSchedule(doctorID:number){
    this.scheduleService.getSchedule(doctorID)
      .subscribe(resp =>{
        console.log(resp);
        this.schedule = resp.resultset; 
      })
  }

  populateFields(){
    if (this.type == 2) {
      this.appointmentForm.controls['doctor'].setValue(this.user.userName + ' - ' + this.user.userSpecialty);
    } else {
      this.appointmentForm.controls['user'].setValue(this.user.userName);
    }
  }


  toggleButtons(buttonID){
    console.log(buttonID);
    this.toggledButton = buttonID;
    this.appointmentForm.controls['start_date'].setValue(this.toggledButton);
    console.log(this.toggledButton);
  }

  postAppointment(){
    this.appointmentForm.controls['doctor'].setValue(this.user.userID);

    if (this.appointmentForm.valid) {
      this.appointmentService.addAppointment(this.appointmentForm.value)
      .subscribe(resp => {
        console.log(resp);
        console.log("POST");
        if(resp.statusCode == 0){
          //Navegar al Dashboard
          Swal.fire('OK', 'La consulta ha sido creada.', 'success');
          setTimeout(() => {
            this.router.navigateByUrl('/dashboard/appointments');
          }, 1000);
        } else{
          console.warn(resp.statusMessage);
        }
      }, err =>{
        console.warn(err);
      })
    }
  }
}
