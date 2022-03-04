import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Header } from '../components/header/header.interface';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  public bgVar = new Subject<string>();
  public bgVar$ = this.bgVar.asObservable();

  public titleVar = new Subject<string>();
  public titleVar$ = this.titleVar.asObservable();

  public buttonTitleVar = new Subject<string>();
  public btnTitlVar$ = this.buttonTitleVar.asObservable();

  public isButtonTextVar = new Subject<boolean>();
  public isButtonTextVar$ = this.isButtonTextVar.asObservable();

  public needHeaderVar = new Subject<boolean>();
  public needHeaderVar$ = this.needHeaderVar.asObservable();

  public updateDataSubject(data: Header) {
    this.bgVar.next(data.bg);
    this.titleVar.next(data.title);
    this.buttonTitleVar.next(data.button);
    this.isButtonTextVar.next(data.isButtonText);
    this.needHeaderVar.next(data.needHeader);
  }
}
