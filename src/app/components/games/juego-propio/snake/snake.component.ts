import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-snake',
  standalone: true,
  imports: [],
  templateUrl: './snake.component.html',
  styleUrl: './snake.component.scss',
})
export class SnakeComponent {
  @Input()
  pos: { x: number; y: number }[] = [];
}
