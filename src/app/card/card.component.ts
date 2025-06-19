import { Component } from '@angular/core';

@Component({
  selector: 'app-card',
  imports: [],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {
  isTextExpanded = false; // переключатель состояния (текст свернут), true (полностью)
  toggleText() { // метод, который меняет состояние
    this.isTextExpanded = !this.isTextExpanded;
  }
}
