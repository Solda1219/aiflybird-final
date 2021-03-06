import { Injectable } from '@angular/core';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import { Workbook } from 'exceljs/dist/exceljs.min.js';
const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Injectable({
  providedIn: 'root'
})
export class ExcelService {

  constructor() { }

  public exportAsExcelFile(fileName, header, data) {
     
    //Create workbook and worksheet
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet('new');
    // //Add title
    // let titleRow = worksheet.addRow([title]);
    // titleRow.font = { name: 'Comic Sans MS', family: 4, size: 16, underline: 'double', bold: true }
    // //add substitle 1
    // let subTitleRow1 = worksheet.addRow(subtitle1);
    // //add subtitle 2
    // let subTitleRow2= worksheet.addRow(subtile2);

    //Add Image
    // let logo = workbook.addImage({
    //   base64: logoFile.logoBase64,
    //   extension: 'png',
    // });
    // worksheet.addImage(logo, 'E1:F3');
    // worksheet.mergeCells('A1:D2');
    //Blank Row 
    //Add Title
    let titleRow= worksheet.addRow(['通讯录(Contacts)'] );
    worksheet.mergeCells('A1:E1');
    titleRow.font = { name: 'Calibri', family: 4, size: 16,  bold: true };
    titleRow.alignment = { vertical: 'middle', horizontal: 'center' };
    
    //Add Header Row
    let headerRow = worksheet.addRow(header);
    
    // Cell Style : Fill and Border
    headerRow.eachCell((cell, number) => {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FFFFFF00' },
        bgColor: { argb: 'FF0000FF' },
      }
      cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      cell.alignment= {wrapText: true, vertical: 'middle', horizontal: 'center'};
    })
    worksheet.getRow(1).height= 40;
    worksheet.getRow(2).height= 60
    worksheet.addRows(data);
    // Add Data and Conditional Formatting
    // data.forEach(d => {
    //   let row = worksheet.addRow(d);
    //   let qty = row.getCell(5);
    //   let color = 'FF99FF99';
    //   if (+qty.value < 500) {
    //     color = 'FF9999'
    //   }
    //   qty.fill = {
    //     type: 'pattern',
    //     pattern: 'solid',
    //     fgColor: { argb: color }
    //   }
    // }
    // );
    worksheet.getColumn(1).width = 20;
    worksheet.getColumn(2).width = 20;
    worksheet.getColumn(3).width = 20;
    worksheet.getColumn(4).width = 20;
    worksheet.getColumn(5).width = 20;
    worksheet.getColumn(6).width = 20;

    worksheet.getColumn(7).width = 20;
    worksheet.getColumn(8).width = 20;
    worksheet.getColumn(9).width = 20;
    worksheet.addRow([]);
    //Footer Row
    // let footerRow = worksheet.addRow(['This is system generated excel sheet.']);
    // footerRow.getCell(1).fill = {
    //   type: 'pattern',
    //   pattern: 'solid',
    //   fgColor: { argb: 'FFCCFFE5' }
    // };
    // footerRow.getCell(1).border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
    //Merge Cells
    // worksheet.mergeCells(`A${footerRow.number}:F${footerRow.number}`);
    //Generate Excel File with given name
    workbook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      FileSaver.saveAs(blob, fileName);
    })
  }
 
  arrayBuffer:any;
  // file:File;   
  // incomingfile(event) 
  // {
  //   this.file= event.target.files[0]; 
  // }
  // contactData:any;
  Import(file) {
    return new Promise((resolve, reject)=>{
      try {
        let fileReader = new FileReader();
        fileReader.onload = (e) => {
          this.arrayBuffer = fileReader.result;
          var data = new Uint8Array(this.arrayBuffer);
          var arr = new Array();
          for(var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
          var bstr = arr.join("");
          var workbook =  XLSX.read(bstr, {type:"binary"});
          var first_sheet_name = workbook.SheetNames[0];
          var worksheet = workbook.Sheets[first_sheet_name];
          var contactData= XLSX.utils.sheet_to_json(worksheet,{raw:true});
          resolve(contactData);
        }
        fileReader.readAsArrayBuffer(file);
      } catch (err) {
        reject(err.message);
      }
    });
    
  }

}