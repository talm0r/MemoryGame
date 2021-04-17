import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { GameStateService } from 'src/app/services/game-state.service';


@Component({
  selector: 'app-game-bulb',
  templateUrl: './game-bulb.component.html',
  styleUrls: ['./game-bulb.component.css']
})
export class GameBulbComponent implements OnInit {

  /**
   * Input value for color & if is active for light effect
   */
  @Input()
  color: string = '';

  /**
   * isActive for light effect
   */
  isActive: boolean = false;

  /**
   * Output event emitter for player guess
   */
  @Output()
  chosenBulb: EventEmitter<string> = new EventEmitter<string>();
  gameOver:boolean = false;

  constructor(private game: GameStateService) { }

  ngOnInit(): void {

    /**
     * Subscribe to game state listen for game is over
     */
    this.game.state.subscribe(gameState => {
      this.gameOver = gameState.gameOver;
    })
    /**
     * Subscribe to color state and turn on\off lights 
     */
    this.game.colorsState.subscribe(state => {
   if(state.colors[this.color] == true) {
     this.isActive = true;
   }
   else {
    this.isActive = false;
   }

     });

  }

/**
 * Check if game is not over, then emit to game component player choice  
 */
  chooseBulb() {

    if(!this.gameOver) this.chosenBulb.emit(this.color);

  }

}
