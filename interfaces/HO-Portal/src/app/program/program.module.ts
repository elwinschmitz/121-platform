import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';

import { ProgramComponent } from './program.component';
import { PhaseNavigationComponent } from './phase-navigation/phase-navigation.component';
import { ProgramFundsComponent } from './program-funds/program-funds.component';
import { ProgramJsonComponent } from './program-json/program-json.component';
import { ProgramPayoutComponent } from './program-payout/program-payout.component';
import { ProgramPeopleComponent } from './program-people/program-people.component';
import { ProgramDetailsComponent } from './program-details/program-details.component';

import { ProgramsRoutingModule } from './program-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { PhaseNextComponent } from './phase-next/phase-next.component';

@NgModule({
  entryComponents: [
    ProgramJsonComponent
  ],
  declarations: [
    ProgramComponent,
    PhaseNavigationComponent,
    PhaseNextComponent,
    ProgramFundsComponent,
    ProgramJsonComponent,
    ProgramPayoutComponent,
    ProgramPeopleComponent,
    ProgramDetailsComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    ProgramsRoutingModule,
    TranslateModule.forChild(),
    NgxDatatableModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
})
export class ProgramsModule { }