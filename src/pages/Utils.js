// src/utils.js
import header from '../assets/header.jpg'
import header1 from '../assets/header1.jpg'
import header2 from '../assets/header2.jpg'


export const products = [
   { id: 1, name: 'Stylish T-Shirt', price: 25.00, image: header, description: 'A trendy T-shirt for everyday wear.' },
   { id: 2, name: 'Casual Jacket', price: 50.00, image: header2, description: 'A warm jacket for chilly evenings.' },
   { id: 3, name: 'Casual Jacket', price: 50.00, image: header1, description: 'Comfortable and stylish jacket.' },
   { id: 4, name: 'Casual Jacket', price: 50.00, image: header1, description: 'Great for casual outings.' },
];

     
  
     export function getProductById(id) {
      return products.find(product => product.id === id);
  }
  