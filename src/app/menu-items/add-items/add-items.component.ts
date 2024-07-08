import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InventoryListMockService } from '../../app-logic/inventory-list-mock.service';
import { ActivatedRoute, Router } from '@angular/router';
import { InventoryItem } from '../../app-logic/inventory-item';
import { Options } from 'ngx-qrcode-styling';


@Component({
  selector: 'app-add-items',
  templateUrl: './add-items.component.html',
  styleUrl: './add-items.component.css'
})
export class AddItemsComponent implements OnInit{

  addItemForm!: FormGroup;
  item! : InventoryItem;
  itemId!: number;

  public config: Options = {
    width: 300,
    height: 300,
    data: "https://www.facebook.com/",
    image: "https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg",
    margin: 5,
    dotsOptions: {
      color: "#f4acb7",
      type: "dots"
    },
    backgroundOptions: {
      color: "#ffffff",
    },
    imageOptions: {
      crossOrigin: "anonymous",
      margin: 0
    }
  };

  constructor(private fb : FormBuilder,
    private inventoryListMockService : InventoryListMockService,
    private router :  Router,
    private route: ActivatedRoute
   ) {
    this.route.params.subscribe((params) => {
      if(params['id']){
        this.itemId = params['id'];
      } else {
        this.itemId = 0;
      }
    })
   }
  
  ngOnInit(): void {
    this.item = this.itemId == 0 ? new InventoryItem() : this.inventoryListMockService.getItemById(this.itemId);

    this.addItemForm = this.fb.group({
      name: [this.item.name, Validators.required],
      description: [this.item.description, Validators.maxLength(100)],
      user: [this.item.user, Validators.required],
      location: [this.item.location, Validators.required],
      inventoryNumber: [this.item.inventoryNumber, Validators.required],
      createdAt: [this.item.createdAt?.toISOString().split('T')[0], Validators.required]
    });
  }

  onSubmit(){
    if(this.itemId == 0) {
      this.item = new InventoryItem(this.addItemForm.value);
      this.item.createdAt = new Date(this.item.createdAt);
      this.item.modifiedAt = new Date();
      this.item.deleted = false;
      this.item.id = this.inventoryListMockService.getLastId() + 1;
      this.inventoryListMockService.addItem(this.item);
    } else {
      this.item.name = this.addItemForm.value.name;
      this.item.description = this.addItemForm.value.description;
      this.item.user = this.addItemForm.value.user;
      this.item.location = this.addItemForm.value.location;
      this.item.inventoryNumber = this.addItemForm.value.inventoryNumber;
      this.item.createdAt = new Date(this.addItemForm.value.createdAt);
      this.item.modifiedAt = new Date();
    }
    
    this.router.navigate(['/inventory']);
    
  }

  public hasError = (controlName : string, errorName : string) => {
    return this.addItemForm.controls[controlName].hasError(errorName);
  }

}
