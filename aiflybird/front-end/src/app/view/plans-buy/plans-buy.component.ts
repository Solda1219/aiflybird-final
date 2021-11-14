import { Component, OnInit } from '@angular/core';
import { UserService } from '../../service/user.service';
import { CommonFunctionService } from '../../function/commonFunction.service';
declare var $:any;

@Component({
  selector: 'app-plans-buy',
  templateUrl: './plans-buy.component.html',
  styleUrls: ['./plans-buy.component.scss', '../../../assets/theme/admin-panel/css/main.css']
})
export class PlansBuyComponent implements OnInit {
  loading = false;
  allPlans= [];
  aboutExpire= [];
  expired= [];
  planForm= {type:'', additional_participants:'', duration: 0, additional_storage: '', additional_webinar:'', billing_addr: {street1: '', street2: '', city: '', province: '', postal: '', country: 0}};
  countrys= [];
  constructor(
    private userService: UserService,
    public cf:CommonFunctionService,
  ) { }
  
  async ngOnInit() {
    await this.readCountrys();
    await this.readAllPlans();
    await this.readAboutExpire();
    await this.readExpired();
  }
  async readCountrys(){
    const res= await this.userService.getRequest('_api/plans/getCountrys').toPromise();
    this.countrys= res['result'];
  }
  async readAllPlans(){
    const res= await this.userService.postRequest('_api/plans/all').toPromise();
    this.allPlans= res['result'];
  }
  async readAboutExpire(){
    const res= await this.userService.postRequest('_api/plans/aboutExpire').toPromise();
    this.aboutExpire= res['result'];
  }
  async readExpired(){
    const res= await this.userService.postRequest('_api/plans/expired').toPromise();
    this.expired= res['result'];
  }
  async buyPlan(){
    //validation
    if(!$( ".cust_box1" ).hasClass("box_active")&&!$( ".cust_box2" ).hasClass("box_active")){
      this.userService.errorMessage('Please select one of plan type!');
      return;
    }
    if(!$( ".cust_box9" ).hasClass("box_active")&&!$( ".cust_box10" ).hasClass("box_active")&&!$( ".cust_box11" ).hasClass("box_active")){
      this.userService.errorMessage('Please select duration!');
      return;
    }
    if($('#street1').val()==''){
      this.userService.errorMessage('Street Address Line1 field on billing address is required!');
      return;
    }
    if($('#city').val()==''){
      this.userService.errorMessage('City field on billing address is required!');
      return;
    }
    if($('#province').val()==''){
      this.userService.errorMessage('State/Province field on billing address is required!');
      return;
    }
    if($('#postal').val()==''){
      this.userService.errorMessage('ZIP/Postal field on billing address is required!');
      return;
    }
    if($('#country').val()==null){
      this.userService.errorMessage('Country field on billing address is required!');
      return;
    }
    //set form
    var type= $( ".cust_box1" ).hasClass("box_active")?'Pro': 'Business';
    var additional_participants= $( ".cust_box3" ).hasClass("box_active")?'50 Participants': '100 Participants';
    var additional_storage=$( ".cust_box5" ).hasClass("box_active")?'50GB Storage': '';
    var duration= $( ".cust_box9" ).hasClass("box_active")? 365: $( ".cust_box10" ).hasClass("box_active")? 365*2: 365*3;
    var additional_webinar= $( ".cust_box6" ).hasClass("box_active")? "Webinar 500 Participants": $( ".cust_box7" ).hasClass("box_active")? "Webinar 1000 Participants": "Webinar 3000 Participants";
    var street1= $('#street1').val();
    var street2= $('#street2').val();
    var city= $('#city').val();
    var province= $('#province').val();
    var postal= $('#postal').val();
    var country= parseInt($('#country').val());
    this.planForm= {type, additional_participants,additional_storage, duration, additional_webinar, billing_addr:{street1, street2, city, province, postal, country}};
    try{
      const res= await this.userService.postRequest('_api/plans/buyPlan', this.planForm).toPromise();
      this.userService.handleSuccess(res['message']);
    }
    catch(err){
      this.userService.handleError(err);
    }
    console.log('planForm', this.planForm);
  }
  custBoxClick1(){
    $(".cust_box1").toggleClass('box_active');
    $(".cust_box2").removeClass('box_active');
  }
  custBoxClick2(){
    $(".cust_box2").toggleClass('box_active');
    $(".cust_box1").removeClass('box_active');
  }
  custBoxClick3(){
    $(".cust_box3").toggleClass('box_active');
    $(".cust_box4").removeClass('box_active');
  }
  custBoxClick4(){
    $(".cust_box4").toggleClass('box_active');
    $(".cust_box3").removeClass('box_active');
  }
  custBoxClick5(){
    $(".cust_box5").toggleClass('box_active');
  }
  custBoxClick6(){
    $(".cust_box6").toggleClass('box_active');
    $(".cust_box7").removeClass('box_active');
    $(".cust_box8").removeClass('box_active');
  }
  custBoxClick7(){
    $(".cust_box7").toggleClass('box_active');
    $(".cust_box6").removeClass('box_active');
    $(".cust_box8").removeClass('box_active');
  }
  custBoxClick8(){
    $(".cust_box8").toggleClass('box_active');
    $(".cust_box6").removeClass('box_active');
    $(".cust_box7").removeClass('box_active');
  }
  custBoxClick9(){
    $(".cust_box9").toggleClass('box_active');
    $(".cust_box10").removeClass('box_active');
    $(".cust_box11").removeClass('box_active');
  }
  custBoxClick10(){
    $(".cust_box10").toggleClass('box_active');
    $(".cust_box9").removeClass('box_active');
    $(".cust_box11").removeClass('box_active');
  }
  custBoxClick11(){
    $(".cust_box11").toggleClass('box_active');
    $(".cust_box9").removeClass('box_active');
    $(".cust_box10").removeClass('box_active');
  }


}
