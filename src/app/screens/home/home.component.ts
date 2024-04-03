import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product.model';
import { Router } from '@angular/router';
import { ProductStateService } from 'src/app/services/product-state.service';
import { HomeService } from './home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor (
    private router: Router,
    private productStateService: ProductStateService,
    private homeService: HomeService,
  ) {

  }

  onAdd() {
    this.router.navigate(['agregar']);
  }
  

  onSearch (event: any) {
    const value = event.target.value;
    this.homeService.handleSearch(value);
  }


  ngOnInit(): void {
    this.productStateService.clearSelectedProduct();
    this.homeService.setProducts();
  }
}
