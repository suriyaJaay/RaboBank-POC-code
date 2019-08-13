import {  Component, ViewChild, OnInit} from '@angular/core';
import { Papa} from 'ngx-papaparse';
import { MatPaginator, MatSort, MatTableDataSource} from '@angular/material';


@Component({
 selector: 'app-root',
 templateUrl: './app.component.html',
 styleUrls: ['./app.component.css']
})
export class AppComponent {
 title = 'Angular7-readCSV';
 displayedColumns = ['First_name', 'Sur_name', 'Issue_count', 'Date_of_birth'];
 dataSource: MatTableDataSource < csvFileModel > ;
temp = [];
 constructor(private papa: Papa) {}
ngOnInit(){
	
	this.temp.length = 0;
}
 processCSVFile(evt) {
	// this.dataSource.filteredData = [];
  const temp: csvFileModel[] = [];
  const selectedFiles = evt.target.files; // FileList object
  const currentSelection = selectedFiles[0];
  const reader = new FileReader();
  
  reader.readAsText(currentSelection);
  reader.onload = (e: any) => {
	  
   const csv = e.target.result; // Content of CSV file
   this.papa.parse(csv, {
    skipEmptyLines: true,
    header: true,
    complete: (results) => {
     let parsedData = results.data;
     for (let i = 0; i < parsedData.length; i++) {
      this.temp.push(parsedData[i])
	  console.log('temp', temp)
      this.dataSource = new MatTableDataSource(this.temp);     
     }
    }
   });
  }
 }
 tableSearch(userInput: string) {
  userInput = userInput.trim();
  userInput = userInput.toLowerCase();
  this.dataSource.filter = userInput;
 }
}

export class csvFileModel {
 First_name: string = '';
 Sur_name: string = '';
 Issue_count: string = '';
 Date_of_birth: string = '';
}