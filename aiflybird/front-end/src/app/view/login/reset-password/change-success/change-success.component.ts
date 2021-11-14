import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, NgForm } from '@angular/forms';
import { UserService } from '../../../../service/user.service';
import { CommonFunctionService } from '../../../../function/commonFunction.service';

@Component({
  selector: 'app-change-success',
  templateUrl: './change-success.component.html',
  styleUrls: ['./change-success.component.scss']
})
export class ChangeSuccessComponent implements OnInit {

  loading = false;
  constructor(
    private userService: UserService,
    private _formBuilder: FormBuilder,
    public cf:CommonFunctionService,
  ) {}

  ngOnInit(): void {
  }

}
