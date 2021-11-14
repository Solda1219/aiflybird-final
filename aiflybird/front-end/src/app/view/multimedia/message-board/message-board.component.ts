import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../../../service/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  Event,
  NavigationCancel, 
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router
} from '@angular/router';
import { CommonFunctionService } from '../../../function/commonFunction.service';
import { SocketioService } from '../../../service/socketio.service';
declare var $:any;
@Component({
  selector: 'app-message-board',
  templateUrl: './message-board.component.html',
  styleUrls: ['./message-board.component.scss']
})
export class MessageBoardComponent implements OnInit {
  currentLanguage = "english";
  dept_row = [];
  user_row = [];
  dept_item = [];
  user_item1 = [];
  user_item2 = [];
  key;
  selected_dept;
  interval;
  intervalDept;
  formGroup:FormGroup;
  @ViewChild('cancelCall') cancelCall:ElementRef;
  @ViewChild('callTriger') callTriger:ElementRef;
  modal_src;
  constructor(
    private userService: UserService,
    private _formBuilder: FormBuilder,
    private route: Router,
    public cf: CommonFunctionService,
    private socket:SocketioService,
  ) { }

  ngOnInit(): void { 
    this.formSet();
    this.startIntervalDept();
    this.getUserlist();
    this.connectSocket();
  }
  ngOnDestroy() {
    localStorage.removeItem('language');
    if(this.interval) clearInterval(this.interval);
    if(this.intervalDept) clearInterval(this.intervalDept);
  }
  //for formset
  formSet(item:any=null) {
    this.modal_src = item;
    this.formGroup = this._formBuilder.group({
      title:['',Validators.required],
      content:[''],
      sender:[this.userService.getUserInfo()['memberId']],
      receiver:[item?item.memberId:'']
    });
  }
  //for sockect
  connectSocket(){
    this.socket.listen('resultOffice').subscribe(
      res=>{
        if(this.cancelCall.nativeElement) this.cancelCall.nativeElement.click();
        if(res['status']!==0){
          this.userService.errorMessage(res['message']);
        }
        else{
          console.log(res['url']);
          window.open(res['url'], "_blank");
        }
      },
      err=>{
        console.log(err)
      }
    );
  }
  enteroffice(item){
    this.modal_src = item;
    this.socket.emit('enterOffice',this.modal_src);
    this.callTriger.nativeElement.click();
  }
  canceloffice(){
    this.socket.emit('cancelOfficeByRequester',this.modal_src);
    this.cancelCall.nativeElement.click();
  }
  //for dept
  async getDept(){
    try{
       const res = await this.userService.postRequest('_api/annonymous/getDept',{},false).toPromise();
       const res_user = await this.userService.postRequest('_api/messageBoard/getUsers').toPromise();
       this.dept_row = res['result'];
       this.user_row = res_user['result'];
       this.makeTree(this.dept_row);
    }catch(err){
      console.log(err)
      // this.userService.handleError(err);
    }
  } 
  selectDepartment(item){
    this.selected_dept = item.id;
    this.getUserlist();
  }
  startInterval(){
    clearInterval(this.interval);
    this.getUserlist();
    this.interval = setInterval(()=>{
      this.getUserlist();
    },10*1000)
  }
  startIntervalDept(){
    clearInterval(this.interval);
    this.getDept();
    this.interval = setInterval(()=>{
      this.getDept();
    },10*1000)
  }
  async leaveMessage(){
    if(this.formGroup.invalid){
      this.userService.errorMessage("Please input subject.");
      return;
    }
    try{
      const res = await this.userService.postRequest('_api/messageBoard/leaveMessage',this.formGroup.value).toPromise();
      window.open(res['result'], "_blank");
    }catch(err){
      this.userService.handleError(err)
    }
  }
  async getUserlist(){
    const getChildren = (arr,c)=>{
      const result = [];
      for(let i = 0; i < arr.length; i++){
        if(c == arr[i].super_dept) result.push(arr[i])
      }
      return result
    }
    try{
      const res = await this.userService.postRequest('_api/messageBoard/getUsers').toPromise();
      const data = res['result'];
      let userForDept = [];
      let sel_depts = [this.selected_dept];
      const child =  getChildren(this.dept_row,this.selected_dept);
      for(let i = 0 ; i < child.length; i++){
        sel_depts.push(child[i].id);
      }
      for(let i = 0 ; i < data.length; i++){
        const dpt_id = data[i].dept_id;
        for(let k = 0; k < sel_depts.length; k++){
           if(dpt_id==sel_depts[k]) userForDept.push(data[i]);
        }
      }
      let userFilter = [];
      for(let i=0 ; i < userForDept.length;i++){
        if(this.key&&String(userForDept[i].nativeName).indexOf(this.key)!=-1){
          userFilter.push(userForDept[i]);
        }
        else if(!this.key) userFilter.push(userForDept[i]);
      }
      if(!this.selected_dept) userFilter = data;
      this.user_item1 = [];
      this.user_item2 = [];
      for(let i=0; i < userFilter.length;i++){
        if(i%2==0) this.user_item1.push(userFilter[i])
        if(i%2==1) this.user_item2.push(userFilter[i])
      }
    }catch(err){
      console.log(err)
    }
  }
  getCountOfmember(id){
    const getChildren = (arr,c)=>{
      const result = [];
      for(let i = 0; i < arr.length; i++){
        if(c == arr[i].super_dept) result.push(arr[i]);
      }
      return result
    }
    let sel_depts = [id];
    let userForDept = [];
    const child =  getChildren(this.dept_row,id);
    for(let i = 0 ; i < child.length; i++){
      sel_depts.push(child[i].id);
      const child1 =  getChildren(this.dept_row,child[i].id);
      for(let k = 0 ; k < child1.length; k++){
        sel_depts.push(child1[k].id);
        
      }
    }
    for(let i = 0 ; i < this.user_row.length; i++){
      const dpt_id = this.user_row[i].dept_id;
      for(let k = 0; k < sel_depts.length; k++){
          if(dpt_id==sel_depts[k]) userForDept.push(this.user_row[i]);
      }
    }
    return userForDept.length;
  }
  makeTree(item){
    const previos = JSON.parse(JSON.stringify(this.dept_item));
    const getChildren = (arr,c)=>{
      const result = [];
      for(let i = 0; i < arr.length; i++){
        if(c.id == arr[i].super_dept) result.push(arr[i])
      }
      return result
    }
    const data = JSON.parse(JSON.stringify(item));
    this.dept_item = [];
    for(let i = 0 ; i < data.length; i++){
      const {dept_level} = data[i];
      if(dept_level==0){
        data[i].is_collapse = this.getCollapse(previos,data[i].id);
        data[i].children = JSON.parse(JSON.stringify(getChildren(data,data[i])));
        for(let k = 0 ; k < data[i].children.length; k++){
          const {dept_level} = data[i].children[k];
          if(dept_level==1){
            data[i].children[k].is_collapse = this.getCollapse(previos,data[i].children[k].id);
            data[i].children[k].children= JSON.parse(JSON.stringify(getChildren(data,data[i].children[k])));
          }
        }
        this.dept_item.push(data[i]);
      }
    }
    if(this.dept_item.length>0) this.dept_item[0].is_collapse = true;
  }
  getCollapse(arr,id){
    for(let i = 0; i < arr.length; i++)
     {
       if(arr[i].id == id) return arr[i].is_collapse;
       for(let k = 0; k < arr[i]['children'].length; k++)
        {
          if(arr[i]['children'][k].id == id) return arr[i]['children'][k].is_collapse;
        }
     }
    return false; 
  }
  //LanguageChagePart
  changeLang(language: string) {
    this.currentLanguage = language;
    localStorage.setItem('language', language)
  }
}

