import { Treatment } from './treatment.model';

export class User {

    constructor(
        public userID: number,
        public userName: string,
        public userEmail: string,
        public userType: number,
        public userPassword?: string,
        public userImg?: string,
        public userTreatments?: Array<Treatment>,
        public userSpecialty?: any,
        public activeAppointments?: number,
        public finishedAppointments?: number,
        public userSchool?: string,
        public userLocation?: string,
        public userPhone?: string,
        public userNotes?: string,
    ){}
}

