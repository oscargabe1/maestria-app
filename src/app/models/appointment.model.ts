export class Appointment {
    constructor(
        public appointmentID: number,
        public appointmentUser: string,
        public appointmentDoctor: string,
        public appointmentTreatment: string,
        public appointmentNotes: string,
        public appointmentStartDate: number,
        public appointmentEndDate: number,
        public appointmentStatus: number,
    ){}
}
