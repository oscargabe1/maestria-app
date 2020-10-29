import { Treatment } from '../models/treatment.model';
export interface UserForm {
    userID: number,
    userName: string,
    userEmail: string,
    userPassword?: string,
    userImg?: string,
    userTreatments?: Array<Treatment>,
    userSpecialty?: number,
    activeAppointments?: number,
    finishedAppointments?: number,
    userSchool?: string,
    userLocation?: string,
    userPhone?: string,
    userNotes?: string,
}
