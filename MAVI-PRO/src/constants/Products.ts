export interface Product {
    id : number;
    price: number;
    name: string;
    stock: number;
}

export const PRODUCTS : Product[]=[
  {id:1,name:"Pomada Modeladora",price:35,stock:12},{id:2,name:"Shampoo Anticaspa",price:28,stock:8},
  {id:3,name:"Óleo de Barba",price:42,stock:5},{id:4,name:"Cera Capilar",price:30,stock:15},
  {id:5,name:"Condicionador",price:22,stock:20},{id:6,name:"Tônico Capilar",price:55,stock:3},
];