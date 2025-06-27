import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-card',
  imports: [RouterLink], // импортировали для навигационных ссылок
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {
  isTextExpanded = false; // переключатель состояния (текст свернут), true (полностью)
  toggleText() { // метод, который меняет состояние
    this.isTextExpanded = !this.isTextExpanded;
  }
  @Input() cardData: any; 
}
