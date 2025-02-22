import { Component, OnInit } from '@angular/core';
import { InventoryItem } from '../../app-logic/inventory-item';
import { InventoryListMockService } from '../../app-logic/inventory-list-mock.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-show-item',
  templateUrl: './show-item.component.html',
  styleUrl: './show-item.component.css'
})
export class ShowItemComponent implements OnInit{
  item! : InventoryItem;
  itemId!: number;
  itemFound = false;


  constructor(private inventoryListMockService : InventoryListMockService,
    private router :  Router,
    private route: ActivatedRoute){

      this.route.params.subscribe((params) => {
        if(params['id']){
          this.itemId = params['id'];
        } else {
          this.itemId = 0;
        }
      })
    }
  ngOnInit(): void {
    this.item = this.inventoryListMockService.getItemById(this.itemId);
    this.itemFound = this.item ? true : false;
  }

  edit(){
    this.router.navigate(['edit/' + this.itemId]);
  }

}
