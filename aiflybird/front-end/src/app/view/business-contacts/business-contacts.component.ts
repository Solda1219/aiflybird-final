import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, NgForm, ValidationErrors } from '@angular/forms';
import { UserService } from '../../service/user.service';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { CommonFunctionService } from '../../function/commonFunction.service';
import { ExcelService } from '../../function/excel.service';
// import {FileService} from '../../service/file.service';
declare var $:any;

@Component({
  selector: 'app-business-contacts',
  templateUrl: './business-contacts.component.html',
  styleUrls: ['./business-contacts.component.scss', '../../../assets/theme/admin-panel/css/main.css']
})
export class BusinessContactsComponent implements OnInit {

  loading = false;
  DeptGroup: FormGroup;
  BusinessContactGroup: FormGroup;
  ImportContactGroup: FormGroup;
  businessContacts= [];
  filteredContacts= [];
  deptWilldelete= 0;
  businessContactWilldelete= 0;
  businessContactEntered= 0;
  company= '';
  depts=[];
  file;
  deptStatus= "create";
  businessContactStatus= "create";
  deptEntered= 0;
  tbHeader = ['姓名(Name)', '邮箱(Email)', '电话(Phone)', '工作单位(Company)', '所在部门(Department)'];
  tbCol = ['name','email','phone', 'company', 'dept_name'];
  // @ViewChild('add_contacts') public createModal: ModalDirective;
  // @ViewChild('editModal') public editModal: ModalDirective;
  constructor(
    private userService: UserService,
    private _formBuilder: FormBuilder,
    public cf:CommonFunctionService,
    private excel: ExcelService,
    // private fileService: FileService
  ) {}

  async ngOnInit() {
    this.deptformSet();
    this.businessContactformSet();
    this.importContactGroupSet()
    var userInfo= this.userService.getUserInfo();
    this.company= userInfo.business_name;
    
    if(this.company==""||this.company==null){
      let companySign= "";
      while(companySign.length==0){
        companySign = prompt("You need to register company to go on.");
        if(companySign== null){
          break;
        }
        if(companySign.length>0){
          break;
        }
      }
      if(companySign== null){
        this.userService.goBack();
      }
      else{
        try {
          const res = await this.userService.postRequest('_api/user/signCompany', {business_name: companySign}).toPromise()
          this.userService.handleSuccess(res['message']);
          this.userService.setUserInfo({...this.userService.getUserInfo(), business_name: companySign});
          this.company= companySign;
        } catch (err) {
          this.userService.handleError(err)
          this.userService.goBack();
        }
      }

    }
    if(this.company){
      this.loading= true;
      await this.readDepts();
      await this.readBusinessContacts();
      this.loading= false;
    }
    await this.readDepts();
    
  }
  lengthOfEachDept(dept_id){
    var tempItem= this.businessContacts;
    var filtered= tempItem.filter(one=> one.dept_id==dept_id);
    return filtered.length;
  }
  deptformSet(item=null) {
    if(item==null){
      this.DeptGroup = this._formBuilder.group({
        name: ['', Validators.required],
        business_name: [this.company, Validators.required]
      });
    }else{
      this.DeptGroup = this._formBuilder.group({
        id: [item.id, Validators.required],
        name: [item.name, Validators.required],
        business_name: [this.company, Validators.required]
      });
    }
  }
  importContactGroupSet(){
    this.ImportContactGroup= this._formBuilder.group({
      importedContacts:[, Validators.required]
    })
  }
  businessContactformSet(item=null) {
    if(item==null){
      this.BusinessContactGroup = this._formBuilder.group({
        name: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        phone: ['', Validators.required],
        dept_id:[, Validators.required]
      });
    }else{
      this.BusinessContactGroup = this._formBuilder.group({
        id: [item.id, Validators.required],
        name: [item.name, Validators.required],
        email: [item.email, [Validators.required, Validators.email]],
        phone: [item.phone, Validators.required],
        dept_id:[item.dept_id, Validators.required]
      });
    }
  }
  exportToExcel(){
    const tbData = [];
    for(let i = 0; i < this.filteredContacts.length; i++){//set table body
        const it_r = [];
        // it_r.push("通讯录（Contacts)");
        for(let k = 0; k < this.tbCol.length; k++) it_r.push(this.filteredContacts[i][this.tbCol[k]])
        tbData.push(it_r);
    }
    if (this.filteredContacts.length<1){
      this.userService.errorMessage("There are no contacts to export!");
      return;
    }
    this.excel.exportAsExcelFile('Business_Contacts'+'_'+new Date().getTime(),this.tbHeader,tbData);
  }
  filter(e) {
    var word= e.target.value;
    var filterTemp = this.businessContacts;
    this.filteredContacts= filterTemp.filter(one => one.name&&one.name.includes(word) || one.email&&one.email.includes(word) || one.phone&&one.phone.includes(word) || one.dept_name&&one.dept_name.includes(word));
  }
  filterByDeptId(dept_id){
    console.log(dept_id);
    if(dept_id== 0){
      this.filteredContacts= this.businessContacts;
    }
    else{
      var filterTemp = this.businessContacts;
      this.filteredContacts= filterTemp.filter(one=> one.dept_id==dept_id);
    }
  }
  async readDepts(){
    const res= await this.userService.postRequest('_api/business_contacts/getDepts', {business_name: this.company}).toPromise();
    this.depts= res['result'];
    this.depts= this.depts.map(one=>{
      var length= this.lengthOfEachDept(one.id);
      return {...one, length};
    });
  }
  async readBusinessContacts(){
    const res= await this.userService.postRequest('_api/business_contacts/getBContacts', {business_name: this.company}).toPromise();
    this.businessContacts= res['result'].map(one=>{
      return {...one, company:this.company};
    });
    this.filteredContacts=this.businessContacts;
  }
  createOnDept(){
    this.deptStatus= "create";
    this.deptformSet();
  }
  createOnBusinessContact(){
    this.businessContactStatus= "create";
    this.businessContactformSet();
  }
  editOnDept(item){
    this.deptStatus= "edit";
    this.deptformSet(item);
  }
  editOnBusinessContact(item){
    this.businessContactStatus= 'edit';
    this.businessContactformSet(item);
  }
  delOnDept(item){
    this.deptWilldelete= item.id;
  }
  delOnBusinessContact(item){
    this.businessContactWilldelete= item.id;
  }
  async createDept(){
    this.loading= true;
    if(!this.DeptGroup.valid){
      this.userService.errorMessage('Please input all required fields correctly');
      return;
    }
    if(this.DeptGroup.value.name.length>16){
      this.userService.errorMessage('Name too long. Please fill 16 letters short.')
      return;
    }
    else{
      if(this.deptStatus== "create"){
        try{
          const res= await this.userService.postRequest('_api/business_contacts/createDepts', this.DeptGroup.value).toPromise();
          this.userService.handleSuccess(res['message']);
          await this.readDepts();
          await this.readBusinessContacts();
        }
        catch(err){
          this.userService.handleError(err);
        }
        
      }
      else{
        try{
          const res= await this.userService.postRequest('_api/business_contacts/editDepts', this.DeptGroup.value).toPromise();
          this.userService.handleSuccess(res['message']);
          await this.readDepts();
          await this.readBusinessContacts();
        }
        catch(err){
          this.userService.handleError(err);
        }
        
      }
    }
    this.closeModal('new_department');
    this.loading= false;
  }
  getFormValidationErrors() {
    Object.keys(this.BusinessContactGroup.controls).forEach(key => {
  
    const controlErrors: ValidationErrors = this.BusinessContactGroup.get(key).errors;
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
  async createBusinessContact(){
    this.loading= true;
    this.getFormValidationErrors();
    if(!this.BusinessContactGroup.valid){
      return
    }
    if(this.BusinessContactGroup.value.name.length>24){
      this.userService.errorMessage('Name too long. Please fill 24 letters short.');
      return
    }
    else{
      if(this.businessContactStatus== "create"){
        try{
          const res= await this.userService.postRequest('_api/business_contacts/createBContacts', this.BusinessContactGroup.value).toPromise();
          this.userService.handleSuccess(res['message']);
          
          await this.readBusinessContacts();
          await this.readDepts();
        }
        catch(err){
          this.userService.handleError(err);
        }
        
      }
      else{
        try{
          const res= await this.userService.postRequest('_api/business_contacts/editBContacts', this.BusinessContactGroup.value).toPromise();
          this.userService.handleSuccess(res['message']);
          
          await this.readBusinessContacts();
          await this.readDepts();
        }
        catch(err){
          this.userService.handleError(err);
        }
        
      }
    }
    this.closeModal('add_contacts');
    this.loading= false;
  }
  async delDept(){
    try{
      const res= await this.userService.postRequest('_api/business_contacts/delDepts', {id: this.deptWilldelete}).toPromise();
      this.userService.handleSuccess(res['message']);
      await this.readDepts();
      await this.readBusinessContacts();
    }
    catch(err){
      this.userService.handleError(err);
    }
    this.closeModal('del_department');
  }
  async delBusinessContact(){
    try{
      const res= await this.userService.postRequest('_api/business_contacts/delBContacts', {id: this.businessContactWilldelete}).toPromise();
      this.userService.handleSuccess(res['message']);
      await this.readBusinessContacts();
      await this.readDepts();
    }
    catch(err){
      this.userService.handleError(err);
    }
    this.closeModal('del_contacts');
  }
  closeModal(id){
    $(`#${id}`).modal('hide');
  }
  enterDept(item){
    this.deptEntered= item.id;
  }
  enterBusinessContact(item){
    this.businessContactEntered= item.id;
  }
  
  leaveDept(item){
    this.deptEntered= 0;
  }
  leaveBusinessContact(item){
    this.businessContactEntered= 0;
  }
  fileOpen(){

    $("#inputGroupFile01").click();
  }
  // setNull(){
  //   $("#inputGroupFile01").val
  // }
  changeFile(event){
    this.file= event.target.files[0];
  }
  async importContact(){
    this.closeModal('imports_contacts');
    if(this.company==""||this.company==null){
      this.userService.errorMessage("First add your compnay!");
      return;
    }
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
      //if company not match ignore
      if(contactData[i][keys[3]]!=this.company){
        this.userService.errorMessage('This is not your company!');
        continue;
      }
      //if department does not exist, create dept
      var dept= contactData[i][keys[4]];
      var name= contactData[i][keys[0]];
      var email= contactData[i][keys[1]];
      var phone= contactData[i][keys[2]];
      if(!dept){
        this.userService.errorMessage("This line is missing department field!")
        continue;
      }
      if(!name){
        this.userService.errorMessage("This line is missing name field!")
        continue;
      }
      if(!email){
        this.userService.errorMessage("This line is missing email field!")
        continue;
      }
      if(!phone){
        this.userService.errorMessage("This line is missing phone field")
        continue;
      }

      const res1= await this.userService.postRequest('_api/business_contacts/getDeptIdOrcreate', {name: dept, business_name: this.company}).toPromise();
      if(!res1['id']){
        continue;
      }
      else{
        try{
          const res= await this.userService.postRequest('_api/business_contacts/createBContacts', {name, email, phone, dept_id: res1['id']}).toPromise();
          this.userService.handleSuccess(res['message']);
          
        }
        catch(err){
          this.userService.errorMessage(name+' is already exist!')
        }
      }
    }
    await this.readDepts();
    await this.readBusinessContacts();
    await this.readDepts();
    this.loading= false;
  }
  // download(){
  //   this.fileService.downloadFile().subscribe(response => {

  //   }), error=> console.log(error);

  // }
  download() {
    const blob = new Blob(["http://localhost:3000/download/contacts.xlsx"], { type: 'xlsx' });
    const url= window.URL.createObjectURL(blob);
    window.open(url);
  }

}
