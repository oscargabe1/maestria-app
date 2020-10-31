export class Appointment {
    constructor(
        public appointmentID: number,
        public appointmentUser: string,
        public appointmentDoctor: string,
        public appointmentTreatment: string,
        public appointmentNotes: string,
        public appointmentStartDate: number,
        public appointmentEndDate: any,
        public appointmentStatus: any,
        public appointmentEndTimestamp?: any,
    ){}
}
