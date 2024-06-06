import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import Talk from 'talkjs';

import { Product } from 'src/app/shared/models/product.model';
import { ProductService } from 'src/app/core/services/product.service';
import { User } from 'src/app/shared/models/user.model';
import { TalkService } from 'src/app/core/services/talk.service';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css']
})
export class ProductPageComponent implements OnInit {
  product: Product;
  private chatPopup: Talk.Popup;

  constructor(
    private productService: ProductService,
    private talkService: TalkService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() { 
    this.productService.getProduct(this.getProductId()).then(product => {
      this.product = product;

      this.preloadChatPopup(product.vendor);
    });
  }

  goToVendorPage(vendor: User) {
    this.router.navigate(['users/' + vendor.id]);
  }

  showChatPopup() {
    this.chatPopup.show();
  }

  private async preloadChatPopup(vendor: User) {
    this.chatPopup = await this.talkService.createPopup(vendor, false);
    this.chatPopup.mount({ show: false });
  }

  private getProductId() {
    return Number(this.route.snapshot.paramMap.get('id'));
  }

}
