import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameBulbComponent } from './game-bulb.component';

describe('GameButtonComponent', () => {
  let component: GameBulbComponent;
  let fixture: ComponentFixture<GameBulbComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GameBulbComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GameBulbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
