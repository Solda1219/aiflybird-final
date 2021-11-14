import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, Validators, FormBuilder, NgForm, ValidationErrors } from '@angular/forms';
import { UserService } from '../../service/user.service';
import { CommonFunctionService } from '../../function/commonFunction.service';
import { ExcelService } from '../../function/excel.service';
declare var $:any;

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss',  '../../../assets/theme/admin-panel/css/main.css']
})
export class ContactsComponent implements OnInit {

  loading = false;
  ContactGroup: FormGroup;
  ImportContactGroup: FormGroup;
  items= [];
  filteredItems= [];
  file;
  status= "create";
  willdelete= 0;
  entered= 0;
  tbHeader = ['姓名(Name)', '邮箱(Email)', '电话(Phone)', '工作单位(Company)', '所在部门(Department)'];
  tbCol = ['name','email','phone','company', 'department'];
  // @ViewChild('add_contacts') public createModal: ModalDirective;
  // @ViewChild('editModal') public editModal: ModalDirective;
  constructor(
    private userService: UserService,
    private _formBuilder: FormBuilder,
    public cf:CommonFunctionService,
    private excel: ExcelService
  ) {}
  
  async ngOnInit(){
    this.formSet();
    this.importContactGroupSet()
    await this.read();
  }
  formSet(item=null) {
    if(item==null){
      this.ContactGroup = this._formBuilder.group({
        name: ['', Validators.required],
        email:['',[Validators.required, Validators.email]],
        phone:[''],
        company:[''],
        department: ['']
      });
    }else{
      this.ContactGroup = this._formBuilder.group({
        id: [item.id, Validators.required],
        name: [item.name, Validators.required],
        email:[item.email, [Validators.required, Validators.email]],
        phone:[item.phone],
        company:[item.company],
        department: [item.department]
      });
    }
  }
  importContactGroupSet(){
    this.ImportContactGroup= this._formBuilder.group({
      importedContacts:[, Validators.required]
    })
  }
  filter(e) {
    var word= e.target.value;
    var filterTemp = this.items;
    this.filteredItems = filterTemp.filter(one => one.name&&one.name.includes(word) || one.email&&one.email.includes(word) || one.phone&&one.phone.includes(word));
  }
  mouseEnter(item){
    this.entered= item.id;
  }
  
  mouseLeave(item){
    this.entered= 0;
  }
  create(){
    this.status= "create";
    this.formSet();
  }
  edit(item){
    this.status= "edit";
    this.formSet(item);
  }
  delete(item){
    this.willdelete= item.id;
  }
  async deleteContact(){
    this.loading= true;
    const res = await this.userService.postRequest('_api/contacts/del',{id: this.willdelete}).toPromise()
    this.userService.handleSuccess(res['message']);
    this.closeModal('del_contacts');
    await this.read();
    this.loading= false;
  }
  getFormValidationErrors() {
    Object.keys(this.ContactGroup.controls).forEach(key => {
  
    const controlErrors: ValidationErrors = this.ContactGroup.get(key).errors;
    if (controlErrors != null) {
        Object.keys(controlErrors).forEach(keyError => {
          // console.log('Key control: ' + key + ', keyError: ' + keyError + ', err value: ', controlErrors[keyError]);
          if(keyError== 'email'){
            this.userService.errorMessage('Email format is not correct!');
          }
          this.userService.errorMessage('Fill '+ key.toUpperCase()+ ' field correctly!');
        });
      }
    });
  }
  async createContact (){
    this.getFormValidationErrors();
    if(!this.ContactGroup.valid){
      return
    }
    if(this.ContactGroup.value.name.length>24){
      this.userService.errorMessage('Name too long. Please fill 24 letters short.');
      return
    }
    this.loading= true;
    try {
      if(this.status== "create"){
        const res = await this.userService.postRequest('_api/contacts/create',this.ContactGroup.value).toPromise()
        this.userService.handleSuccess(res['message']);
      }
      else{
        const res = await this.userService.postRequest('_api/contacts/update',this.ContactGroup.value).toPromise()
        this.userService.handleSuccess(res['message']);
      }
      
      await this.read()
      this.closeModal('add_contacts');
    } catch (err) {
      this.userService.handleError(err)
    }
    this.loading = false;
  }
  closeModal(id){
    $(`#${id}`).modal('hide');
  }
  async read() {
    this.loading = true;
    try {
      const res = await this.userService.getRequest('_api/contacts/getAll', true).toPromise()
      this.items = res['result'];
      this.filteredItems= res['result'];
    } catch (err) {
      this.userService.handleError(err)
    }
    this.loading = false;
  }
  exportToExcel(){
    const tbData = [];
    for(let i = 0; i < this.filteredItems.length; i++){//set table body
        const it_r = [];
        for(let k = 0; k < this.tbCol.length; k++) it_r.push(this.filteredItems[i][this.tbCol[k]])
        tbData.push(it_r);
    }
    if (this.filteredItems.length<1){
      this.userService.errorMessage("There are no contacts to export!");
      return;
    }
    this.excel.exportAsExcelFile('My_Contacts'+'_'+new Date().getTime(),this.tbHeader,tbData);
  }
  fileOpen(){

    $("#inputGroupFile01").click();
  }
  changeFile(event){
    this.file= event.target.files[0];
    
  }
  async importContact(){
    this.closeModal('imports_contacts');
    if(!this.ImportContactGroup.valid){
      this.userService.errorMessage("Please choose file!");
      return;
    }
    var contactData= await this.excel.Import(this.file);
    if((<any>contactData).length<1){
      this.userService.errorMessage("This excel is empty!")
      return;
    }
    var keys= Object.keys(contactData[0]);
    if (keys.length!=5){
      this.userService.errorMessage('This excel is not standart format. Please download standard excel format.')
      return;
    }
    this.loading= true;
    for(var i= 1; i<(<any>contactData).length; i++){
      //if department does not exist, create dept
      var dept= contactData[i][keys[4]];
      var name= contactData[i][keys[0]];
      var email= contactData[i][keys[1]];
      var phone= contactData[i][keys[2]];
      var company= contactData[i][keys[3]];
      if(!name){
        this.userService.errorMessage('This line is missing name field!')
        continue;
      }
      if(!email){
        this.userService.errorMessage("This line is missing email field!")
        continue;
      }
      else{
        try{
          const res= await await this.userService.postRequest('_api/contacts/create',{name, email, phone, company, department: dept}).toPromise()
          this.userService.handleSuccess(res['message']);
          await this.read();
        }
        catch(err){
          this.userService.errorMessage(name+' is already exist!');
        }
      }
    }
    this.loading= false;
  }

}
