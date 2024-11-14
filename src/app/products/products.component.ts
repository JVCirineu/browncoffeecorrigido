import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ProductsService } from '../../model/service/products.service';
import { Iproduct } from '../../model/service/iproduct';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule],
  providers:[ProductsService],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {
  products: Iproduct[]=[];
  filteredProducts: Iproduct[]=[];

  selectedButton: string = 'featured';

  constructor(private productsService: ProductsService){
    this.loadProducts(this.selectedButton);
  }

  loadProducts(selectedButton: string): void{
    this.productsService.getProducts(). subscribe(
      (data:Iproduct[])=>{
        this.products = data;
        if(selectedButton ==='featured'){
          this.filteredProducts = this.products;
        } else {
          this.filteredProducts = this.products.filter(product => product.filter === selectedButton);
        }
        this.selectedButton = selectedButton;
      },
      (error) => {
        console.error('erro ao carregar os produtos:', error);
      }
    );
  }

}
