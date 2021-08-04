import { Songs } from './songs';

export class Albums{

    constructor(

        public id: number,
        public albumName: string,
        public artistName: string,
        public price: number,
        public rating: number,
        public img: string,
        public songs: Songs[],
        public genres: string,
        public releaseDate: string,
        public description: string,
        public state: boolean,
        public popularity: number
    )

    {}

}