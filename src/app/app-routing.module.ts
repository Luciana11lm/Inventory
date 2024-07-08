import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InventoryComponent } from './menu-items/inventory/inventory.component';
import { ContactComponent } from './menu-items/contact/contact.component';
import { ScanComponent } from './menu-items/scan/scan.component';
import { AddItemsComponent } from './menu-items/add-items/add-items.component';
import { HomePageComponent } from './home-page/home-page.component';
import { ShowItemComponent } from './menu-items/show-item/show-item.component';

const routes: Routes = [
  {path: '', component: HomePageComponent},
  {path: 'inventory', component: InventoryComponent},
  {path: 'contact', component: ContactComponent},
  {path: 'scan', component: ScanComponent},
  {path: 'add-items', component: AddItemsComponent},
  {path: 'edit/:id', component: AddItemsComponent},
  {path: 'item/:id', component: ShowItemComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const RoutingComponent = [
  HomePageComponent,
  ContactComponent,
  ScanComponent,
  AddItemsComponent,
  InventoryComponent,
  ShowItemComponent
];
