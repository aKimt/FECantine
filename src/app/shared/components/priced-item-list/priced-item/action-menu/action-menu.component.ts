import { animate, keyframes, state, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Action } from 'src/app/models/actions.model';




@Component({
  selector: 'shared-action-menu',
  templateUrl: './action-menu.component.html',
  animations: [
    trigger("openClose", [
      state("open", style({})),
      state("closed", style({ height: "0px" })),
      transition('closed => open', animate('0.3s')),
      transition("open => closed", animate('0.2s'))
    ])
  ] ,
  styleUrls: ['./action-menu.component.scss']
})
export class ActionMenuComponent implements OnInit {

  @Input("isOpen")
  open = false;

  @Input()
  actions!: Action[]

  @Output()
  mousein=new EventEmitter<boolean>();

  @Output()
  optionClicked= new EventEmitter<string>();

  badgeHidden = true;

  constructor() { }

  ngOnInit(): void {
    console.log(this.actions)
  }

  triggerMouseIn(value: boolean){
    this.mousein.emit(value)
  }

  onClickOn(actionName: string){
    this.optionClicked.next(actionName);
  }




}
