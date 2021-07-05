import { formatDate } from '@angular/common';
import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'src/app/auth/auth.service';
import { UserRole } from 'src/app/auth/user-role.enum';
import { ActionType } from 'src/app/models/actions.model';
import { ImportType } from 'src/app/models/import-type.enum';
import { PaStatus } from 'src/app/models/person.model';
import { ProgramsServiceApiService } from 'src/app/services/programs-service-api.service';
import { FilePickerProps } from 'src/app/shared/file-picker-prompt/file-picker-prompt.component';
import { environment } from 'src/environments/environment';

export class ImportResult {
  countImported: number;
  countExistingPhoneNr: number;
  countInvalidPhoneNr: number;
}

@Component({
  selector: 'app-bulk-import',
  templateUrl: './bulk-import.component.html',
  styleUrls: ['./bulk-import.component.scss'],
})
export class BulkImportComponent implements OnInit {
  @Input()
  public programId: number;

  public disabled: boolean;
  public isInProgress = false;

  public PaStatus = PaStatus;
  public message: {
    [PaStatus.imported]: string;
    [PaStatus.registered]: string;
  };
  public filePickerProps: {
    [PaStatus.imported]: FilePickerProps;
    [PaStatus.registered]: FilePickerProps;
  };

  private locale: string;
  private dateFormat = 'yyyy-MM-dd, HH:mm';

  constructor(
    private authService: AuthService,
    private programsService: ProgramsServiceApiService,
    private translate: TranslateService,
    private alertController: AlertController,
  ) {
    this.locale = environment.defaultLocale;
  }

  async ngOnInit() {
    this.message = {
      [PaStatus.imported]: await this.getLatestActionMessage(PaStatus.imported),
      [PaStatus.registered]: await this.getLatestActionMessage(
        PaStatus.registered,
      ),
    };
    this.filePickerProps = {
      [PaStatus.imported]: {
        type: 'csv',
        explanation: this.translate.instant(
          'page.program.bulk-import.imported.explanation',
        ),
        programId: this.programId,
        downloadTemplate: ImportType.imported,
      },
      [PaStatus.registered]: {
        type: 'csv',
        explanation: this.translate.instant(
          'page.program.bulk-import.registered.explanation',
        ),
        programId: this.programId,
        downloadTemplate: ImportType.registered,
      },
    };
  }

  async ngOnChanges(changes: SimpleChanges) {
    if (
      changes.programId &&
      ['string', 'number'].includes(typeof changes.programId.currentValue)
    ) {
      this.disabled = !this.btnEnabled();
    }
  }

  private btnEnabled(): boolean {
    return this.authService.hasUserRole([
      UserRole.PersonalData,
      UserRole.RunProgram,
    ]);
  }

  public importPeopleAffected(event: { file: File }, destination: PaStatus) {
    this.isInProgress = true;

    this.programsService.import(this.programId, event.file, destination).then(
      (response) => {
        this.isInProgress = false;
        let resultMessage =
          this.translate.instant(
            'page.program.bulk-import.import-result.ready',
          ) + '<br><br>';

        resultMessage +=
          this.translate.instant('page.program.bulk-import.import-result.new', {
            countImported: `<strong>${response.countImported}</strong>`,
          }) + '<br><br>';

        if (response.countExistingPhoneNr) {
          resultMessage +=
            this.translate.instant(
              'page.program.bulk-import.import-result.existing',
              {
                countExistingPhoneNr: `<strong>${response.countExistingPhoneNr}</strong>`,
              },
            ) + '<br><br>';
        }
        if (response.countInvalidPhoneNr) {
          resultMessage += this.translate.instant(
            'page.program.bulk-import.import-result.invalid',
            {
              countInvalidPhoneNr: `<strong>${response.countInvalidPhoneNr}</strong>`,
            },
          );
        }

        this.actionResult(resultMessage, true);
      },
      (err) => {
        this.isInProgress = false;
        console.log('err: ', err);
        this.actionResult(
          this.translate.instant('page.program.bulk-import.import-error'),
        );
      },
    );
  }

  private async actionResult(resultMessage: string, refresh: boolean = false) {
    const alert = await this.alertController.create({
      backdropDismiss: false,
      message: resultMessage,
      buttons: [
        {
          text: this.translate.instant('common.ok'),
          handler: () => {
            alert.dismiss(true);
            if (refresh) {
              window.location.reload();
            }
            return false;
          },
        },
      ],
    });
    await alert.present();
  }

  private async getLatestActionMessage(type: PaStatus): Promise<string> {
    let action = ActionType.importPeopleAffected;

    if (type === PaStatus.registered) {
      action = ActionType.importRegistrations;
    }

    const latestAction = await this.programsService.retrieveLatestActions(
      action,
      this.programId,
    );

    if (!latestAction || !latestAction.timestamp) {
      return '';
    }

    return this.translate.instant('page.program.bulk-import.timestamp', {
      dateTime: formatDate(
        new Date(latestAction.timestamp),
        this.dateFormat,
        this.locale,
      ),
    });
  }
}
