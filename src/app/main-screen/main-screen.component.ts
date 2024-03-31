import { Component, OnInit } from '@angular/core';
import { Product } from '../types/products';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-screen',
  templateUrl: './main-screen.component.html',
  styleUrls: ['./main-screen.component.css']
})
export class MainScreenComponent implements OnInit {
  constructor (
    private router: Router,
  ) {

  }
  products: Product[] = [];

  splittedProducts: Product[][] = [this.products];
  itemsPerPage = 5
  currPage = 0

  onImageError(event: any) {
    event.target.src = './../assets/notAvailable.png';
  }

  onAdd() {
    this.router.navigate(['agregar']);
  }
  onUpdate(productId: String) {
    console.log(productId);
  }

  onDelete(productId: String) {
    console.log(productId);
  }

  onChangePage(value: number) {
    const tempPage = this.currPage + value;
    // console.log(tempPage, this.splittedProducts.length);
    if (tempPage <= this.splittedProducts.length -1 && tempPage >= 0) {
      console.log('me actualizo');
      this.currPage = tempPage;
    }
  }

  onSplitData(itemsPerPage: number, list: Product[]) {
    this.itemsPerPage = itemsPerPage
    const splittedData: Product[][] = [];
    list.forEach((product, index: number) => {
      if (!(index % itemsPerPage)) {
        splittedData.push([product]);
      } else {
        splittedData[(Math.floor(index / itemsPerPage))].push(product);
      }
    })
    // console.log(splittedData);
    this.currPage = 0;
    this.splittedProducts = splittedData
  }

  onSearch (event: any) {
    const value = event.target.value;
    console.log(value);
    if (!value) {
      this.onSplitData(this.itemsPerPage, this.products);
      return;
    }
    const prevResult = this.products.filter( product =>
      (
        product.name.includes(value) ||
        product.description.includes(value) ||
        product.date_release.includes(value) ||
        product.date_revision.includes(value)
      )
    );
    this.onSplitData(this.itemsPerPage, prevResult);
  }

  ngOnInit(): void {
    const dataFromEndpoint = [ 
      {
        "id": "trj-cdr",
        "name": "Tarjeta de débito",
        "description": "Esta tarjeta sirve para comprar cosas a crédito.",
        "logo": "https://latam.mastercard.com/content/dam/public/mastercardcom/lac/mx/home/consumidores/encontrar-una-tarjeta/tarjetas-de-credito/tarjeta-gold/tarjeta-credito-gold-1280x720.jpg",
        "date_release": "2023-02-01T00:00:00.000+00:00",
        "date_revision": "2023-02-01T00:00:00.000+00:00"
      },
      {
        "id": "trj-cdr",
        "name": "Tarjeta de crédito",
        "description": "Esta tarjeta sirve para comprar cosas a crédito.",
        "logo": "https://latam.rdcom/lac/mx/home/consumidtarjeta/tarjetas-de-credito/tarjeta-gold/tarjeta-credito-gold-1280x720.jpg",
        "date_release": "2023-02-01T00:00:00.000+00:00",
        "date_revision": "2023-02-01T00:00:00.000+00:00"
      },
      {
        "id": "trj-cdr",
        "name": "Prestamo",
        "description": "Esta tarjeta sirve para comprar cosas a crédito.",
        "logo": "https://latam.mastercaac/mx/home/consumidores/encontrar-una-tarjeta/tarjetas-de-credito/tarjeta-gold/tarjeta-credito-gold-1280x720.jpg",
        "date_release": "2023-02-01T00:00:00.000+00:00",
        "date_revision": "2023-02-01T00:00:00.000+00:00"
      },
      {
        "id": "trj-cdr",
        "name": "Sistema",
        "description": "Esta tarjeta sirve para comprar cosas a crédito.",
        "logo": "https://latam.mastercard.com/content/dam/public/mastercardcom/lac/mx/home/consumidores/encontrar-una-tarjeta/tarjetas-de-credito/tarjeta-gold/tarjeta-credito-gold-1280x720.jpg",
        "date_release": "2023-02-01T00:00:00.000+00:00",
        "date_revision": "2023-02-01T00:00:00.000+00:00"
      },
      {
        "id": "trj-cdr",
        "name": "Tarjeta de crédito",
        "description": "Esta tarjeta sirve para comprar cosas a crédito.",
        "logo": "https://latam.rdcom/lac/mx/home/consumidtarjeta/tarjetas-de-credito/tarjeta-gold/tarjeta-credito-gold-1280x720.jpg",
        "date_release": "2023-02-01T00:00:00.000+00:00",
        "date_revision": "2023-02-01T00:00:00.000+00:00"
      },
      {
        "id": "trj-cdr",
        "name": "Tarjeta de crédito",
        "description": "Esta tarjeta sirve para comprar cosas a crédito.",
        "logo": "https://latam.mastercaac/mx/home/consumidores/encontrar-una-tarjeta/tarjetas-de-credito/tarjeta-gold/tarjeta-credito-gold-1280x720.jpg",
        "date_release": "2023-02-01T00:00:00.000+00:00",
        "date_revision": "2023-02-01T00:00:00.000+00:00"
      },
      {
        "id": "trj-cdr",
        "name": "Tarjeta de crédito",
        "description": "Esta tarjeta sirve para comprar cosas a crédito.",
        "logo": "https://latam.mastercard.com/content/dam/public/mastercardcom/lac/mx/home/consumidores/encontrar-una-tarjeta/tarjetas-de-credito/tarjeta-gold/tarjeta-credito-gold-1280x720.jpg",
        "date_release": "2023-02-01T00:00:00.000+00:00",
        "date_revision": "2023-02-01T00:00:00.000+00:00"
      },
    ];
    this.products = dataFromEndpoint;
    this.onSplitData(this.itemsPerPage, dataFromEndpoint)
  }
}
