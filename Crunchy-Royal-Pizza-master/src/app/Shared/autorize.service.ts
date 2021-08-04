import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { IData, IPizza, ICheck, IPostre, IBebida, IComida } from "./data.model";

@Injectable()
export class ClassServiceAuth {
  //function related to login and verification
  currentUser: IData;
  private headers: HttpHeaders;
  private pizzaAccessPoint: string = "https://localhost:5001/pizzas";

  loginUser(userName: string, password: string) {
    this.currentUser = {
      firstname: "Bruno",
      lastname: "Mars",
      username: userName,
      password: password
    };
  }

  addUser(
    firstname: string,
    lastname: string,
    username: string,
    password: string
  ) {
    const user: IData = {
      firstname: firstname,
      lastname: lastname,
      username: username,
      password: password
    };

    userData.push(user);
  }

  ActualizarUsuario(userName: string, Password: string) {
    this.currentUser.username = userName;
    this.currentUser.password = Password;
  }

  isAutenticado() {
    return !!this.currentUser;
  }

  //function related to pizza display

  getPizzaList() {
    return pizzaMenu;
  }

  getPostreList() {
    return postresMenu;
  }

  getBebidasList() {
    return bebidasMenu;
  }

  getComidaList() {
    return comidasMenu;
  }

  getCheckOut() {
    return checkArray;
  }

  objeto: any;

  getCreateProductValues(
    id: string,
    name: string,
    description: string,
    price: string,
    imagen: string
  ) {
    this.objeto = {
      id: id,
      name: name,
      description: description,
      price: price,
      image: imagen
    };
    pizzaMenu.push(this.objeto);
    //console.log(pizzaMenu);
  }

  objeto1: any;

  getCreateCheckOut(id: string, name: string, price: string) {
    this.objeto1 = { id: id, name: name, price: price };
    checkArray.push(this.objeto1);
    //console.log(pizzaMenu);
  }

  getPizzaById(id: number) {
    return pizzaMenu.find(clases => clases.id === id);
  }

  getPostreById(id: number) {
    return postresMenu.find(clases => clases.id == id);
  }

  getBebidaById(id: number) {
    return bebidasMenu.find(clases => clases.id == id);
  }

  getComidaById(id: number) {
    return comidasMenu.find(clases => clases.id == id);
  }

  getAddPizza(id: number) {
    return pizzaMenu.find(clases => clases.id === id);
  }

  addToCart(obj: any) {
    checkArray.push(obj);
  }

  deletefromCart(obj: any) {
    checkArray.splice(checkArray.indexOf(obj), 1);
  }
}

const userData: IData[] = [
  {
    firstname: "Lewis",
    lastname: "Hamilton",
    username: "lewis_22",
    password: "admin"
  }
];

const checkArray: ICheck[] = [
  {
    id: 1,
    name: "Brooklyn Pizza",
    price: 295
  },

  {
    id: 2,
    name: "Supreme Pizza",
    price: 210
  },

  {
    id: 3,
    name: "Supreme Pizza",
    price: 210
  }
];

const pizzaMenu: IPizza[] = [
  {
    id: 100,
    name: "Boston Pizza",
    description: "NONE",
    price: 1,
    image:
      "https://greenwich-pizza-cdn.tillster.com/6fa30d87-fb0c-47ac-ab47-0fa59d59ade0.png"
  },
  {
    id: 101,
    name: "Suprema",
    description: "NONE",
    price: 1,
    image:
      "https://greenwich-pizza-cdn.tillster.com/4ab3c835-2bd7-492f-a1c9-867d10e649f8.png"
  },
  {
    id: 102,
    name: "California Style",
    description: "NONE",
    price: 1,
    image:
      "https://greenwich-pizza-cdn.tillster.com/a5818942-f3f8-407c-b96a-ffe94cc1e9df.png"
  },
  {
    id: 103,
    name: "Pepperoni",
    description: "NONE",
    price: 1,
    image: "https://www.customercaremc.com/wp-content/uploads/2017/03/pizza.png"
  },
  {
    id: 104,
    name: "Tres Carne",
    description: "NONE",
    price: 1,
    image:
      "https://greenwich-pizza-cdn.tillster.com/6b092509-fe69-4bcb-8786-236d5acc4301.png"
  }
];

const postresMenu: IPostre[] = [
  {
    id: 201,
    name: "Tres Leches",
    description: "NONE",
    price: 1,
    image:
      "https://i2.wp.com/www.sugarspunrun.com/wp-content/uploads/2019/09/Tres-Leches-Cake-Recipe-1-of-1-500x375.jpg"
  },

  {
    id: 202,
    name: "Sundae",
    description: "NONE",
    price: 1,
    image:
      "https://chowhound1.cbsistatic.com/thumbnail/800/0/chowhound1.cbsistatic.com/blog-media/2015/07/ice-cream-sundae-history-recipes-chowhound-670x585.jpg"
  },

  {
    id: 203,
    name: "Flan de Coco",
    description: "NONE",
    price: 1,
    image:
      "https://www.recetashonduras.com/base/stock/Recipe/39-image/39-image_web.jpg"
  },

  {
    id: 204,
    name: "Enrollado de Canela",
    description: "NONE",
    price: 1,
    image:
      "https://www.midiariodecocina.com/wp-content/uploads/2015/08/Rollos-de-canela01.jpg"
  },

  {
    id: 205,
    name: "Cheesecake de fresa",
    description: "NONE",
    price: 1,
    image:
      "https://www.bakedbyanintrovert.com/wp-content/uploads/2018/05/Strawberry-Cheesecake-Recipe-Image-735x735.jpg"
  },

  {
    id: 206,
    name: "Pie de Manzana",
    description: "NONE",
    price: 1,
    image:
      "https://www.simplyrecipes.com/wp-content/uploads/2014/09/apple-pie-horiz-a-1800.jpg"
  }
];

const bebidasMenu: IBebida[] = [
  {
    id: 301,
    name: "Coca-Cola",
    description: "NONE",
    price: 1,
    image: "https://www.carusopizza.cz/248-large_default/coca-cola-05l.jpg"
  },

  {
    id: 302,
    name: "Sprite",
    description: "NONE",
    price: 1,
    image:
      "https://distribuidoracampostrini.com/wp-content/uploads/2019/07/sprite-1.5-lt.png"
  },

  {
    id: 303,
    name: "Dr. Pepper",
    description: "NONE",
    price: 1,
    image:
      "https://mrrjjustlikehome.com/wp-content/uploads/2018/03/dr-pepper-1.jpg"
  },

  {
    id: 304,
    name: "Mountain-Dew",
    description: "NONE",
    price: 1,
    image: "https://images-na.ssl-images-amazon.com/images/I/41sOUywYJYL.jpg"
  },

  {
    id: 305,
    name: "Pepsi",
    description: "NONE",
    price: 1,
    image: "https://www.opusdandies.com/wp-content/uploads/2018/04/pepsi.png"
  },

  {
    id: 306,
    name: "7UP",
    description: "NONE",
    price: 1,
    image:
      "https://s3-eu-west-1.amazonaws.com/glencrest/i/pmi/590_main.jpg?_t=1897175459"
  },

  {
    id: 307,
    name: "Iced Tea",
    description: "NONE",
    price: 1,
    image:
      "https://www.lipton.com/content/dam/unilever/lipton_international/south_africa/pack_shot/6001240237793_lipton_500ml_lemon_sugar_free-1806978-jpg.jpg"
  },

  {
    id: 308,
    name: "Crush - Orange",
    description: "NONE",
    price: 1,
    image:
      "https://images.freshop.com/00041710217982/330396f449ede37f31a580fdff1f90a7_large.png"
  }
];

const comidasMenu: IComida[] = [
  {
    id: 401,
    name: "Lasagna de Res",
    description: "NONE",
    price: 1,
    image:
      "https://assets.kraftfoods.com/recipe_images/opendeploy/91522_640x428.jpg"
  },

  {
    id: 402,
    name: "Panini de Pollo Buffalo",
    description: "NONE",
    price: 1,
    image:
      "https://images-gmi-pmc.edge-generalmills.com/61c53331-c9ef-48e4-a9e6-26e406cb0b72.jpg"
  },

  {
    id: 403,
    name: "Panini de Res",
    description: "NONE",
    price: 1,
    image:
      "https://lh3.googleusercontent.com/CjvG8Rl133U9i1jeujyiaClL7ywtSt-KcSfdmrX9MoZK60HroX4NNVDNkH4uh41UffVTV-0c0MoYiEigz40R=w2000-h1500-c-rj-v1-e365"
  },

  {
    id: 404,
    name: "Pasta Alfredo",
    description: "NONE",
    price: 1,
    image:
      "https://www.modernhoney.com/wp-content/uploads/2018/08/Fettuccine-Alfredo-Recipe-1.jpg"
  },

  {
    id: 405,
    name: "Penne Carbonara",
    description: "NONE",
    price: 1,
    image:
      "https://img.taste.com.au/4gQGiX7q/taste/2017/06/creamy-penne-carbonara_1980x1320-127839-1.jpg"
  }
];
