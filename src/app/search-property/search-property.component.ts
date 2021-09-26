import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { PropertyService } from '../property.service';

@Component({
  selector: 'app-search-property',
  templateUrl: './search-property.component.html',
  styleUrls: ['./search-property.component.scss']
})
export class SearchPropertyComponent implements OnInit {
  propertyData:any = []
  listRef:any={}

  measureConverter:any="sqmt"
  priceRange:any = 0
  dateRange='Any'
  Location = "All"

  length = 100;
  pageSize = 10;
  pageEvent:any;
  LocalityAreaList = [
    'Hyderabad',
    'bangalore',
    'mumbai',
    'chennai',
    'All',

  ]
  dateSearch = [
    'Any',
    'This week',
      'Last 5 Week',
      'Last 15 week',

  ];
  measureList = [{"name":"Sq Ft" ,"value":"sqft" }, {"name":"Sq Yd" ,"value":"sqyd" }, {"name":"Sq Mt","value":"sqmt"}]

  constructor(private propertyService:PropertyService) { }

  setPageSizeOptions(setPageSizeOptionsInput: any) {
    console.log(setPageSizeOptionsInput)
    this.propertyData = this.listRef[setPageSizeOptionsInput.pageIndex+1]
  }
  doSomething(event:any){
    this.getProductesList();
  }
  pushInbuckt(bucketSize:number,items:any){
    let count=0
    let pagenumref= 1
    this.listRef[pagenumref] = []
    for(let i=0;i<items.length;i++){
      if(count <bucketSize){
        this.listRef[pagenumref].push(items[i]);
        count++;
      }
      else{
        pagenumref++;
        count=1
        this.listRef[pagenumref] = [items[i]]
      }
    }
  }
  getProductesList(){
    this.propertyService.getProducts(`?Location=${this.Location}&priceRange=${this.priceRange}&dateRange=${this.dateRange}&measureConverter=${this.measureConverter}`)
    .subscribe((data:any)=>{
      this.propertyData = data.data;
      this.length = data.data.length;
      for(let pd of this.propertyData){
        pd.Images= pd.Images.split(",")[0]
      }
      this.pushInbuckt(this.pageSize,this.propertyData);
      this.propertyData = this.listRef[1] || []
      console.log(this.listRef)
      console.log(this.propertyData);
    })
  }
  ngOnInit(): void {
    this.getProductesList()
  }

}
