export class User {

    constructor(
        public userID: number,
        public userName: string,
        public userEmail: string,
        public userPassword?: string,
        public userImg?: string
    ){}
}
