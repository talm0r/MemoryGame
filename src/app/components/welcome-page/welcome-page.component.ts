import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { GameStateService } from 'src/app/services/game-state.service';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.css']
})
export class WelcomePageComponent implements OnInit {

  playerName = new FormControl('');
  constructor(private gameState: GameStateService,  private router: Router) { }

  ngOnInit(): void {
 
  }

  setPlayerName() {
    this.gameState.setPlayerName(this.playerName.value);
    this.router.navigate(['/game']);
  }
}
