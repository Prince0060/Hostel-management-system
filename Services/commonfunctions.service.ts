import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class CommonfunctionsService {
  constructor(private _snackBar: MatSnackBar) {}

  callAlert(msg: any, action: any, addClass?: any) {
    return this._snackBar.open(msg, action, {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      panelClass: ['_cpssnackbar',addClass],
    });
  }

  calculateDiscount(mrp: any, isSpecialDiscount: any, sdPercent: any, otherDiscount: any) {
    if (isSpecialDiscount) return mrp - (mrp * sdPercent) / 100;
    else return mrp - (mrp * otherDiscount) / 100;
  }

  calculateDiscountPercent(isSpecialDiscount: any, sdPercent: any, otherDiscount: any) {
    if (isSpecialDiscount) return sdPercent;
    else return otherDiscount;
  }
}
