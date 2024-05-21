import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  BehaviorSubject,
  fromEvent,
  interval,
  Observable,
  Subject,
} from 'rxjs';
import { distinctUntilChanged, map, takeUntil, tap } from 'rxjs/operators';
import { GameFieldComponent } from './game-field/game-field.component';
import { SnakeComponent } from './snake/snake.component';

interface GameState {
  width: number;
  height: number;
  snakePos: { x: number; y: number }[];
  food: { x: number; y: number };
  lost: boolean;
}

enum Direction {
  UP,
  DOWN,
  LEFT,
  RIGHT,
}

enum FieldType {
  EMPTY,
  SNAKE,
  FOOD,
}

@Component({
  selector: 'app-juego-propio',
  standalone: true,
  imports: [CommonModule, GameFieldComponent, SnakeComponent],
  templateUrl: './juego-propio.component.html',
  styleUrl: './juego-propio.component.scss',
})
export class JuegoPropioComponent implements OnInit {
  game$!: BehaviorSubject<GameState>;
  keyDown$!: Observable<string>;
  tick$!: Observable<number>;
  direction$ = new BehaviorSubject<Direction>(Direction.RIGHT);
  lost$ = new Subject<void>();

  ngOnInit(): void {
    this.keyDown$ = fromEvent<KeyboardEvent>(document, 'keydown').pipe(
      tap((event) => event.stopPropagation()),
      map((event) => event.key),
      distinctUntilChanged()
    );

    this.tick$ = interval(200);

    const direction = this.keyDown$.pipe(
      map((key) => {
        switch (key) {
          case 'ArrowUp':
          case 'w':
            return Direction.UP;
          case 'ArrowDown':
          case 's':
            return Direction.DOWN;
          case 'ArrowLeft':
          case 'a':
            return Direction.LEFT;
          case 'ArrowRight':
          case 'd':
            return Direction.RIGHT;
          default:
            return this.direction$.value;
        }
      })
    );

    direction.subscribe(this.direction$);

    this.newGame();
  }

  getNextField(
    game: GameState,
    direction: Direction
  ): { x: number; y: number } {
    const currentField = game.snakePos[game.snakePos.length - 1];
    const nextField = { x: currentField.x, y: currentField.y };
    switch (direction) {
      case Direction.UP:
        if (nextField.y !== 0) {
          nextField.y--;
        } else {
          nextField.y = game.height - 1;
        }
        break;
      case Direction.DOWN:
        if (nextField.y !== game.height - 1) {
          nextField.y++;
        } else {
          nextField.y = 0;
        }
        break;
      case Direction.LEFT:
        if (nextField.x !== 0) {
          nextField.x--;
        } else {
          nextField.x = game.width - 1;
        }
        break;
      case Direction.RIGHT:
        if (nextField.x !== game.width - 1) {
          nextField.x++;
        } else {
          nextField.x = 0;
        }
        break;
    }
    return nextField;
  }

  getFieldType(field: { x: number; y: number }, game: GameState): FieldType {
    if (field.x === game.food.x && field.y === game.food.y) {
      return FieldType.FOOD;
    }
    if (game.snakePos.some((pos) => pos.x === field.x && pos.y === field.y)) {
      return FieldType.SNAKE;
    }
    return FieldType.EMPTY;
  }

  getRandomField(width: number, height: number): { x: number; y: number } {
    return {
      x: Math.floor(width * Math.random()),
      y: Math.floor(height * Math.random()),
    };
  }

  newGame(): void {
    const width = 20;
    const height = 20;
    const food = this.getRandomField(width, height);
    const snakePos = [this.getRandomField(width, height)];

    this.game$ = new BehaviorSubject<GameState>({
      food,
      snakePos,
      height,
      width,
      lost: false,
    });

    this.tick$
      .pipe(
        map((tick) => {
          const game = this.game$.value;
          const direction = this.direction$.value;
          const nextField = this.getNextField(game, direction);
          const nextFieldType = this.getFieldType(nextField, game);

          switch (nextFieldType) {
            case FieldType.EMPTY:
              game.snakePos = [...game.snakePos.slice(1), nextField];
              break;
            case FieldType.FOOD:
              game.snakePos = [...game.snakePos, nextField];
              game.food = this.getRandomField(game.width, game.height);
              break;
            case FieldType.SNAKE:
              game.lost = true;
          }

          return game;
        }),
        takeUntil(this.lost$)
      )
      .subscribe((game) => {
        this.game$.next(game);
        console.log(game.snakePos);
        if (game.lost) {
          this.lost$.next();
        }
      });
  }

  moveUp() {
    this.direction$.next(Direction.UP);
  }

  moveLeft() {
    this.direction$.next(Direction.LEFT);
  }

  moveRight() {
    this.direction$.next(Direction.RIGHT);
  }

  moveDown() {
    this.direction$.next(Direction.DOWN);
  }
}
