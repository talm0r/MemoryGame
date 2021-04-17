import { Component, OnInit, ViewChild } from '@angular/core';
import { colorsArray, sleep } from 'src/app/models/helpers';
import { GameStateService } from 'src/app/services/game-state.service';

import { KeyValue } from '@angular/common';
import { IScore } from '../../models/helpers';
import { Router } from '@angular/router';
@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {


  /**
   * Player Details
   */
  playerName: string = '';
  /**
   * Current score, current high score and high scores list 
   */
  score: number = 0;
  highScore: number = 0;

  scores: IScore[] = [];

  /**
   * all bulb colors 
   */
  colorsArray: string[] = [];
  
  /**
   * Booleans for game over, new high score and sidenav opened\closed state
   */
  gameOver: boolean = false;
  opened: boolean = false;
  newHighScore: boolean = false; 

  constructor(private game: GameStateService,  private router: Router) {}

  /**
   * sorting high score list
   * @param a 
   * @param b 
   * @returns 
   */
  keyDescOrder = (a: KeyValue<string,IScore>, b: KeyValue<string,IScore>): number => {
    return a.value.score > b.value.score ? -1 : (b.value.score > a.value.score ? 1 : 0);
  }

  ngOnInit(): void {

    /**
     * subscribe to game state on init
     */
   this.game.state.subscribe(state => {
     if(!state.playerName) {
      this.navigateToMain();
     }
     this.colorsArray = state.colorsArray;
     this.highScore = state.highScore;
    this.playerName = state.playerName
    this.gameOver = state.gameOver
    this.scores = state.scores;
    if(!this.gameOver) {
      if( (this.score != state.score)) {
        this.score = state.score;
       this.game.lightNextBulb();
    }
    }
    else {
       if(this.score > this.highScore) {
        this.newHighScore = true;
      }
    }
   });
    this.game.updateState();
  }

  /**
   * Player guess
   * @param chosenBulb getting player guess color from game-bulb component  
   */
  playerGuess(chosenBulb: string) {
    this.game.playerGuess(chosenBulb);
  }

  /**
   * run game button - resetting all stats and starting game
   */
  async runGameButton() {
      this.newHighScore = false;
      this.gameOver = true;
      this.game.restartGame();
      await sleep(600) 
      this.game.lightNextBulb();
  }

  /**
   * Navigate to main page(signout link \ if user not logged in)
   */
  navigateToMain() {
    this.router.navigate(['/']);
  }

}
