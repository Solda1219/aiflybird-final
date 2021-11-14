import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Import Containers
import { HorizonLayoutComponent } from './containers/horizon-layout/horizon-layout.component';

import { P404Component } from './view/error/404.component';
import { P500Component } from './view/error/500.component';
import { LoginComponent } from './view/login/login.component';
import { SignupComponent } from './view/signup/signup.component';
import { AuthGuard } from './service/auth.guard';
import {LoggedinGuard} from './service/loggedin.guard';
import { DefaultLayoutComponent } from './containers/defalut-layout/default-layout.component';
import { ResetPasswordComponent } from './view/login/reset-password/reset-password.component';
import { DeptManageComponent } from './view/dept-manage/dept-manage.component';
import { UserComponent } from './view/user/user.component';
import { ProfileComponent } from './view/profile/profile.component';
import { ScheduleMettingComponent } from './view/video-conference/schedule-metting/schedule-metting.component';
import { SysteminfoComponent } from './view/system-manage/systeminfo/systeminfo.component';
import { ServerStatusComponent } from './view/system-manage/server-status/server-status.component';
import { MeetingStatusComponent } from './view/system-manage/meeting-status/meeting-status.component';
import { MessengerStatusComponent } from './view/system-manage/messenger-status/messenger-status.component';
import { DocumentShareComponent } from './view/knowledge-hub/document-share/document-share.component';
import { AddressBookComponent } from './view/address-book/address-book.component';
import { WebofficeSettingComponent } from './view/weboffice-setting/weboffice-setting.component';
import { ECardEditComponent } from './view/e-card-edit/e-card-edit.component';
import { ECardPreviewComponent } from './view/e-card-preview/e-card-preview.component';
import { RecordingManageComponent } from './view/cloud-storage/recording-manage/recording-manage.component';
import { CloudDiskComponent } from './view/cloud-storage/cloud-disk/cloud-disk.component';
import { AnonymousAccessComponent } from './view/anonymous-access/anonymous-access.component';
import { DocPreviewComponent } from './view/doc-preview/doc-preview.component';
import { InstantMeetingComponent } from './view/video-conference/instant-meeting/instant-meeting.component';
import { IncomingMeetingComponent } from './view/video-conference/incoming-meeting/incoming-meeting.component';
import { HistoryMeetingComponent } from './view/video-conference/history-meeting/history-meeting.component';
import { MessageBoardComponent } from './view/multimedia/message-board/message-board.component';
import { CheckMessageComponent } from './view/multimedia/check-message/check-message.component';
import { MeetingCalendarComponent } from './view/video-conference/meeting-calendar/meeting-calendar.component';
import { LearnRecordComponent } from './view/learn/view-detail/learn-record/learn-record.component';
import { MailWriteComponent } from './view/mail/mail-write/mail-write.component';
import { PlansComponent } from './view/plans/plans.component';
import { JoinMeetingComponent } from './view/join-meeting/join-meeting.component';
import { LoginLayoutComponent } from './containers/login-layout/login-layout.component';
import { FaqComponent } from './view/faq/faq.component';
import { VerificationComponent } from './view/signup/verification/verification.component';
import { LoggedinLayoutComponent } from './containers/loggedin-layout/loggedin-layout.component';
import { MeetingsComponent } from './view/meetings/meetings.component';
import { VerifyComponent } from './view/login/reset-password/verify/verify.component';
import { ChangePassComponent } from './view/login/reset-password/change-pass/change-pass.component';
import { ChangeSuccessComponent } from './view/login/reset-password/change-success/change-success.component';
import { ContactsComponent } from './view/contacts/contacts.component';
import { BusinessContactsComponent } from './view/business-contacts/business-contacts.component';
import { PlansAllComponent } from './view/plans-all/plans-all.component';
import { PlansAboutExpireComponent } from './view/plans-about-expire/plans-about-expire.component';
import { PlansExpiredComponent } from './view/plans-expired/plans-expired.component';
import { PlansBuyComponent } from './view/plans-buy/plans-buy.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: '404',
    component: P404Component,
  },
  {
    path: '500',
    component: P500Component,
  },
  
  {
    path: 'signup',
    canActivate:[LoggedinGuard],
    component: SignupComponent,
  },

  //move to AuthGuard
  
  {
    path: 'join-meeting',
    component: JoinMeetingComponent,
  },
  

  {
    path: 'anonymous-access',
    component: AnonymousAccessComponent,
  },
  {
    path: 'reset-password',
    component: ResetPasswordComponent,
  },
  {
    path:'doc-preview/:id',
    component:DocPreviewComponent,
  },
  {
    path: 'e-card/:key',
    component: ECardPreviewComponent,
  },
  {
    path: '',
    component: LoginLayoutComponent,
    canActivate:[LoggedinGuard],
    children: [
      {
        path: 'login',
        component: LoginComponent,
      },
    ]
  },
  {
    path: 'reset-pass/verification',
    component: VerifyComponent,
  },
  {
    path: 'reset-pass/change-pass/:email/:cookie',
    component:ChangePassComponent
  },
  {
    path: 'reset-pass/success',
    component: ChangeSuccessComponent,
  },
  {
    path: 'verification',
    component: VerificationComponent,
  },
  
  {
    path: '',
    component: LoggedinLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'meetings',
        component: MeetingsComponent,
      },
      {
        path: 'contacts',
        component: ContactsComponent,
      },
      {
        path: 'business_contacts',
        component: BusinessContactsComponent,
      },
      {
        path: 'plans/all',
        component: PlansAllComponent,
      },
      {
        path: 'plans/about-expire',
        component: PlansAboutExpireComponent,
      },
      {
        path: 'plans/expired',
        component: PlansExpiredComponent,
      },
      {
        path: 'plans/buy',
        component: PlansBuyComponent,
      }
    ]

  },
  

  {
    path: '',
    component: HorizonLayoutComponent,
    // canActivate: [AuthGuard],
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('./view/dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'dept-manage',
        component: DeptManageComponent,
      },
      {
        path: 'user',
        component: UserComponent,
      },
      {
        path:'calendarMeeting',
        component: MeetingCalendarComponent
      },
      {
        path:'myprofile',
        children:[
          {
          path:'',
          pathMatch:'prefix',
          redirectTo: 'profile',
          },
          {
            path:'profile',
            component: ProfileComponent,
          },
          {
            path:'office-setting',
            component: WebofficeSettingComponent,
          },
          {
            path:'addressbook',
            component: AddressBookComponent,
          },
          {
            path: 'ecard-setting',
            component: ECardEditComponent,
          },
        ]
      },
      {
        path: 'plans',
        component: PlansComponent,
      },
      {
        path: 'faq',
        component: FaqComponent,
      },
      {
        path:'cloud-storage',
        children:[
          {
          path:'',
          pathMatch:'prefix',
          redirectTo: 'recording',
          },
          {
            path:'recording',
            component: RecordingManageComponent,
          },
          {
            path:'disk',
            component: CloudDiskComponent,
          },
        ]
      },
      {
        path:'video-conference',
        children:[
          {
          path:'',
          pathMatch:'prefix',
          redirectTo: 'instantMeeting',
          },
          {
            path:'instantMeeting',
            component: InstantMeetingComponent,
          },
          {
            path:'sheduleMeeting',
            component: ScheduleMettingComponent,
          },
         
          {
            path:'incoming',
            component: IncomingMeetingComponent,
          },
          {
            path:'incoming/:id',
            component: IncomingMeetingComponent,
          },
          {
            path:'history',
            component: HistoryMeetingComponent,
          },
          {
            path:'history/:from/:id',
            component: HistoryMeetingComponent,
          },
          {
            path:'instantMeetingWithData/:key',
            component: InstantMeetingComponent,
          },
          {
            path:'sheduleMeetingWithData/:key',
            component: ScheduleMettingComponent,
          },
        ]
      },
      {
        path:'multi-message',
        children:[
          {
          path:'',
          pathMatch:'prefix',
          redirectTo: 'message-board',
          },
          {
            path:'message-board',
            component: MessageBoardComponent,
          },
          {
            path:'check-message',
            component: CheckMessageComponent,
          },
        ]
      },
      // {
      //   path:'knowledge-hub',
      //   children:[
      //     {
      //     path:'',
      //     pathMatch:'prefix',
      //     redirectTo: 'documentshare',
      //     },
      //     {
      //       path:'documentshare',
      //       component: DocumentShareComponent,
      //     },
      //   ]
      // },
      {
        path:'system-manage',
        children:[
          {
          path:'',
          pathMatch:'prefix',
          redirectTo: 'sys-info',
          },
          {
            path:'sys-info',
            component: SysteminfoComponent,
          },
          {
            path:'server-status',
            component: ServerStatusComponent,
          },
          {
            path:'meeting-status',
            component: MeetingStatusComponent,
          },
          {
            path:'messenger-status',
            component: MessengerStatusComponent,
          },
        ]
      },
      {
        path: 'learn',
        children: [
          {
            path: 'learn-Record',
            component: LearnRecordComponent,
          }
        ]
      },
      {
        path: 'mail',
        children: [
          {
            path: 'write',
            component: MailWriteComponent,
          }
        ]
      },

      // {
      //   path: 'group',
      //   loadChildren: () => import('./view/group/group.module').then(m => m.GroupModule)
      // },
    ]
  },
  { path: '**', component: P404Component }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' }) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
