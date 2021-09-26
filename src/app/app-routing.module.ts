import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddPropertyComponent } from './add-property/add-property.component';
import { SearchPropertyComponent } from './search-property/search-property.component';

const routes: Routes = [
{path:'addProperty', component:AddPropertyComponent},
{path:'searchProperty', component:SearchPropertyComponent},
{path: '',   redirectTo: '/addProperty', pathMatch: 'full' }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
