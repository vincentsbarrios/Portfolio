export class Songs{

    constructor(
        public id: number,
        public name: string,
        public artist: string,
        public price: number,
        public duration: number,
        public rating: number,
        public state: boolean
    )
    {}

}