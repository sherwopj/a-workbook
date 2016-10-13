export class Ticket {
    constructor(
        public id: number,
        public message: string,
        public creationTime: Date,
        public status: string, //enum?
        public type: string, //enum? 
    ) {
        //some methods could go here
    }

}
