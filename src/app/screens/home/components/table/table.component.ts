import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/models/product.model';
import { HomeService } from '../../home.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit, OnDestroy {

  constructor(
    private homeService: HomeService
  ) {}

  productsSubscription: Subscription | undefined;
  products: Product[] = [];
  splittedData: Product[][] = [];
  itemsPerPage = 5
  currPage = 0

  onImageError(event: any) {
    event.target.src = './../assets/notAvailable.png';
  }
  onChangePage(value: number) {
    const tempPage = this.currPage + value;
    if (tempPage <= this.splittedData.length -1 && tempPage >= 0) {
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
    this.currPage = 0;
    this.splittedData = splittedData
  }

  ngOnInit(): void {
    this.productsSubscription = this.homeService.filteredProducts.subscribe((data)=>{
      this.products = data;
      this.onSplitData(this.itemsPerPage, data)
    })
  }

  ngOnDestroy(): void {
    this.productsSubscription && this.productsSubscription.unsubscribe();
  }
}
