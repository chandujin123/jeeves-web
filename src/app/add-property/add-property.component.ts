import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { PropertyService } from '../property.service';

@Component({
  selector: 'app-add-property',
  templateUrl: './add-property.component.html',
  styleUrls: ['./add-property.component.scss']
})
export class AddPropertyComponent implements OnInit {
  LocalityAreaList = [
    'Hyderabad',
    'bangalore',
    'mumbai',
    'chennai'

  ]
  formData= new FormData();
  measureList = [{"name":"Sq Ft" ,"value":"sqft" }, {"name":"Sq Yd" ,"value":"sqyd" }, {"name":"Sq Mt","value":"sqmt"}]

  propertyForm = new FormGroup({
    propertyName: new FormControl(),
    Description: new FormControl(),
    Address: new FormControl(),
    Price: new FormControl(),
    LocalityArea: new FormControl(),
    CarpetArea: new FormControl(),
    Measure: new FormControl(),
}); 
  constructor(private propertyService:PropertyService) {

   }
  submitFormValue(){
    this.propertyService.uploadFiles(this.formData).subscribe((imageReference:any)=>{

      const imageNmaes = imageReference.map((d:any)=>d.filename).join(',')
      console.log(imageNmaes)
      const propertyData = this.propertyForm.value;
      propertyData.Images = imageNmaes;
      this.propertyService.addProduct(propertyData).subscribe((data:any)=>{
          alert(data.msg)
      },
      (error)=>{
        debugger;
      }
      )
    },(err)=>{
      debugger;
    })
    console.log(this.propertyForm.value)   
  }
  handleCategoryBanner(target:any){
    console.log(target.files);
    this.formData = new FormData()
    for(let file of target.files){
      this.formData.append('photos', file);
    }
  }
  ngOnInit(): void {
  }

}
