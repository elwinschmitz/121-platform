import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ExportType } from 'src/app/models/export-type.model';
import { Program, ProgramPhase } from 'src/app/models/program.model';
import { ProgramsServiceApiService } from 'src/app/services/programs-service-api.service';

@Component({
  selector: 'app-registration-validation',
  templateUrl: './registration-validation.page.html',
  styleUrls: ['./registration-validation.page.scss'],
})
export class RegistrationValidationPage implements OnInit {
  public programId = this.route.snapshot.params.id;
  public program: Program;
  public thisPhase = ProgramPhase.registrationValidation;
  public isReady: boolean;

  public enumExportType = ExportType;

  constructor(
    private route: ActivatedRoute,
    private programsService: ProgramsServiceApiService,
  ) {}

  async ngOnInit() {
    this.program = await this.programsService.getProgramById(this.programId);
  }

  public onReady(state: boolean) {
    this.isReady = state;
  }
}
