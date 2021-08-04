import { Products } from './products';
import { Warehouse } from './warehouse';



export class Grocery{

    constructor(

        public id: number,
        public name: string,
        public userId: number,
        public products: Products[],
    )

    {}

}