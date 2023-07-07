import { Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { Subject, Subscription, debounceTime } from 'rxjs';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html'
})
export class SearchBoxComponent implements OnInit {

  private debouncer = new Subject<string>();
  private debouncerSuscription?:Subscription;

  @Input()
  public placeholder:string = '';

  @Input()
  public initialValue:string = '';

  @Output()
  public onValue:EventEmitter<string> = new EventEmitter();

  @Output()
  public onDebounce = new EventEmitter<string>();


  ngOnInit(): void {
    this.debouncerSuscription = this.debouncer
    .pipe(
      debounceTime(500)
    )
    .subscribe(value => {
      this.onDebounce.emit( value );
    })
  }

  ngOnDestroy():void {
    this.debouncerSuscription?.unsubscribe();
  }

  emitValue(value:string):void {
    this.onValue.emit( value );
  }

  onKeyPress(searchTerm:string){
    this.debouncer.next( searchTerm );
  }

}