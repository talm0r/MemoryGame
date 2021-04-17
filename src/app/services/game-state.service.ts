import { Injectable } from '@angular/core';
import {  Subject } from 'rxjs';
import { IScore } from '../models/helpers';
import {  colorsArray, sleep } from '../models/helpers';
@Injectable({
  providedIn: 'root',
})
export class GameStateService {
  state =  new Subject<any>();
  colorsState = new Subject<any>();

  // State user details params
  playerName: string = '';
  gameOver:boolean = false;

  // State game details param
  highScore: number = 0;
  scores: IScore[] = [];
  score: number = 0;
  gameArray: string[] = [];
  playerArray: string[] = [];

  // All game colors array
  colorsArray: string[] = colorsArray;
  // Colors object for updating colors
  colors: any = {};


  constructor() {}

  /**
   *
   * @private
   * generate random color
   */
  private static get randomColor(): string {
    return colorsArray[Math.floor(Math.random() * 6)];
  }

  /**
   * Generating random color and adding to game array
   * gets boolean, if true increase player score and adding to array
   * @param increment
   */
  generateNewColor(nextLevel: boolean = false): void {
    if (nextLevel) {
      this.score++;
    }
    this.gameArray.push(GameStateService.randomColor);
  }

  /**
   * On start game, resetting game score, game array and generating new color for new game
   *
   */
   restartGame() {
    this.score = 0;
    this.gameArray = [];
    this.gameOver = false;
    this.generateNewColor();
    this.updateState();
    this.resetColors();
  }

  /**
   * Getting player guess, adding it to player array, comparing with game array
   * if false, game over - adding to highscores list, checking if new highscore and resettings all game params
   * @param val
   */
  playerGuess(val: string) {
    this.playerArray.push(val);
   if(!this.comparePlayerAndGameArrays()) {
    this.scores.push(
      {score:this.score*10,name:this.playerName,date: new Date()}
      );
    if(this.score > this.highScore) {
      this.highScore = this.score
    }
      this.playerArray = [];
      this.gameArray = [];
      this.score = 0;
      this.gameOver = true;

   }

   this.updateState();
  }

  /**
   * lights up the bulb, the game bulbs observing to ColorState and lighting up\down
   */
  async lightNextBulb() {
    for(let i = 0; i<this.gameArray.length; i++) {

       this.colors[this.gameArray[i]] = true;
       await sleep(400);
       this.updateColorState();
        this.colors[this.gameArray[i]] = false;
        await  sleep(250);
        this.updateColorState();
    }

  }

  /**
   * Setting player name
   * @param val
   */
  setPlayerName(val: string) {
    this.playerName = val;
    this.updateState();
  }

  /**
   * Comparing player and game array
   *
   * return: boolean
   */
  comparePlayerAndGameArrays(): boolean {
    for (let i = 0; i < this.playerArray.length; i++) {
      if (this.playerArray[i] !== this.gameArray[i]) {
        return false;
      }
    }
    if(this.playerArray.length === this.gameArray.length) {
      this.nextLevel();
    }
    return true;
  }

  /**
   * Reset all game colors
   */
  resetColors() {
    colorsArray.forEach(color => {
      this.colors[color] = false;
    })
  }

  /**
   * If user guess correct, generating new color and emptying player guess array
   */
  nextLevel() {
    this.generateNewColor(true);
    this.playerArray = [];
  }

  /**
   * Emitting changes in the state
   */
  updateState() {
    this.state.next({
      player: this.playerArray,
      simon: this.gameArray,
      score: this.score,
      playerName: this.playerName,
      gameOver: this.gameOver,
      scores: this.scores,
      highScore: this.highScore,
      colorsArray: this.colorsArray
    });
  }
  updateColorState() {
    this.colorsState.next({
      colors:this.colors
    })
  }
}
