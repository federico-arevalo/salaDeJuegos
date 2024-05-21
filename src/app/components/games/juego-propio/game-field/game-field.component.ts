import { Component, ContentChild, Input, OnInit } from '@angular/core';
import { SnakeComponent } from '../snake/snake.component';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-game-field',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './game-field.component.html',
  styleUrl: './game-field.component.scss',
})
export class GameFieldComponent implements OnInit {
  @Input()
  width: number = 0;

  @Input()
  height: number = 0;

  @Input()
  food: { x: number; y: number } = {
    x: 0,
    y: 0,
  };

  widthArray: Array<number> = [];
  heightArray: Array<number> = [];

  @ContentChild(SnakeComponent)
  snake!: SnakeComponent;

  constructor() {}

  ngOnInit() {
    this.widthArray = new Array(this.width).fill(0).map((x, i) => i);
    this.heightArray = new Array(this.height).fill(0).map((x, i) => i);
  }

  isSnake(x: number, y: number): boolean {
    return this.snake.pos.some((coords) => coords.x === x && coords.y === y);
  }
}
