import { Component, OnInit } from '@angular/core';
import {ProductModel} from './product.model';
import { ProductService} from '../product.service';
import { ActivatedRoute,Router } from '@angular/router';


@Component({
  selector: 'app-product-list',
  templateUrl:'./product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  title:String = "Product List";
  //product is the model class for a product item
 products: ProductModel[]=[];
  
  //image properties

  imageWidth: number =50;

  imageMargin: number = 2;

  showImage: boolean = false;
  //creating service object for calling getProducts()

  constructor(private router:Router,private productService: ProductService) { }
  
toggleImage(): void{
  this.showImage =!this.showImage
}

ngOnInit(): void{
  this.productService.getProducts().subscribe((data)=>{
    this.products=JSON.parse(JSON.stringify(data));
})
}

editProduct(product:any)
{
  localStorage.setItem("editProductId", product._id.toString());
  this.router.navigate(['update']);

}
deleteProduct(product:any)
{
  this.productService.deleteProduct(product._id)
    .subscribe((data) => {
      this.products = this.products.filter(p => p !== product);
    })


}
}