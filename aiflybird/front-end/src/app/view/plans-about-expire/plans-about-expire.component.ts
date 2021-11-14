import { Component, OnInit } from '@angular/core';
import { UserService } from '../../service/user.service';
import { CommonFunctionService } from '../../function/commonFunction.service';

@Component({
  selector: 'app-plans-about-expire',
  templateUrl: './plans-about-expire.component.html',
  styleUrls: ['./plans-about-expire.component.scss', '../../../assets/theme/admin-panel/css/main.css']
})
export class PlansAboutExpireComponent implements OnInit {

  loading = false;
  allPlans= [];
  filteredAboutExpire= [];
  aboutExpire= [];
  expired= [];
  owner= '';
  constructor(
    private userService: UserService,
    public cf:CommonFunctionService,
  ) { }
  
  async ngOnInit() {
    await this.readAllPlans();
    await this.readAboutExpire();
    await this.readExpired();
    this.owner= this.userService.getUserInfo().display_name;
  }
  async readAllPlans(){
    const res= await this.userService.postRequest('_api/plans/all').toPromise();
    this.allPlans= res['result'];
  }
  async readAboutExpire(){
    const res= await this.userService.postRequest('_api/plans/aboutExpire').toPromise();
    this.aboutExpire= res['result'];
    this.filteredAboutExpire= res['result'];
  }
  async readExpired(){
    const res= await this.userService.postRequest('_api/plans/expired').toPromise();
    this.expired= res['result'];
  }
  filter(e) {
    var word= e.target.value;
    var filterTemp = this.aboutExpire;
    this.filteredAboutExpire= filterTemp.filter(one => one.type&&one.type.includes(word) || one.expiration_at&&one.expiration_at.includes(word) || one.subscription_at&&one.subscription_at.includes(word));
  }

}
