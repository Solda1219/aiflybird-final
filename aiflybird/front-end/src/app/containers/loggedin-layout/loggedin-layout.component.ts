import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, NgForm } from '@angular/forms';
import { UserService } from '../../service/user.service';
import { CommonFunctionService } from '../../function/commonFunction.service';

@Component({
  selector: 'app-loggedin-layout',
  templateUrl: './loggedin-layout.component.html',
  styleUrls: ['./loggedin-layout.component.scss', '../../../assets/theme/admin-panel/css/bootstrap.min.css',
    '../../../assets/theme/admin-panel/css/normalize.css', '../../../assets/theme/admin-panel/css/all.min.css',
  '../../../assets/theme/admin-panel/css/main.css',]
})
export class LoggedinLayoutComponent implements OnInit {
  userName= '';
  constructor(
    private userService: UserService,
    private _formBuilder: FormBuilder,
    public cf:CommonFunctionService,) { }

  ngOnInit(): void {
    this.userName= this.userService.getUserInfo().display_name;
  }
  signOut(){
    this.userService.logOut();
  }

}
