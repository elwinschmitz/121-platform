import { Component, OnInit } from '@angular/core';
import { CustomTranslateService } from 'src/app/services/custom-translate.service';
import { Storage } from '@ionic/storage';
import { PersonalComponent } from '../personal-components.interface';
import { ConversationService } from 'src/app/services/conversation.service';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.scss'],
})
export class MainMenuComponent implements PersonalComponent {
  public menuOptions: any;
  public optionChoice: string;
  public optionSelected: boolean;

  constructor(
    public customTranslateService: CustomTranslateService,
    public storage: Storage,
    public conversationService: ConversationService,
  ) { }

  ngOnInit() {
    this.menuOptions = [
      { id: 'view-appointments', option: this.customTranslateService.translate('personal.main-menu.menu-option1'), disabled: false },
      { id: 'scan-qr', option: this.customTranslateService.translate('personal.main-menu.menu-option2'), disabled: false },
      { id: 'change-password', option: this.customTranslateService.translate('personal.main-menu.menu-option3'), disabled: true },
    ];
  }

  private storeOption(optionChoice: any) {
    this.storage.set('optionChoice', optionChoice);
  }

  public changeOption($event) {
    const optionChoice = $event.detail.value;
    this.optionChoice = optionChoice;
    this.storeOption(optionChoice);
  }

  public submitOption() {
    this.optionSelected = true;
    this.complete();
    console.log('optionChoice: ', this.optionChoice);
  }

  getNextSection() {
    return this.optionChoice;
  }

  complete() {
    this.conversationService.onSectionCompleted({
      name: 'main-menu',
      data: {
        option: this.optionChoice,
      },
      next: this.getNextSection(),
    });
  }

}
