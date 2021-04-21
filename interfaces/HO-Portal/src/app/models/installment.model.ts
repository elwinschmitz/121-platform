export class InstallmentData {
  id: number;
  amount: number;
  installmentDate: Date;
}

export class Installment extends InstallmentData {
  statusOpen?: boolean;
  isExportAvailable?: boolean;
}

export class PopupPayoutDetails {
  programId: number;
  installment: number;
  amount: number;
  referenceId: string;
  currency: string;
}
