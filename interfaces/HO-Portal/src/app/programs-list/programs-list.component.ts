import { Component, OnInit } from '@angular/core';
import { ProgramsServiceApiService } from '../services/programs-service-api.service';
import { Program } from '../models/program.model';

@Component({
  selector: 'app-programs-list',
  templateUrl: './programs-list.component.html',
  styleUrls: ['./programs-list.component.scss'],
})
export class ProgramsListComponent implements OnInit {

  public items: Program[];

  constructor(
    private programsService: ProgramsServiceApiService
  ) {
  }

  ngOnInit() {
    this.programsService.getAllPrograms().subscribe(response => this.items = response);
  }

}
