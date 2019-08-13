import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';

@Injectable({
  providedIn: 'root'
})
export class ParseCsvService {

  constructor() { }
   public importFromFile(bstr: string): XLSX.AOA2SheetOpts {   
    const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });   
    const wsname: string = wb.SheetNames[0];
    const ws: XLSX.WorkSheet = wb.Sheets[wsname];
    const data = <XLSX.AOA2SheetOpts>(XLSX.utils.sheet_to_json(ws, { header: 1 }));
    return data;
  }
}
