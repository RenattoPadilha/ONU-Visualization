import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeechBarComponent } from './speech-bar.component';

describe('SpeechBarComponent', () => {
  let component: SpeechBarComponent;
  let fixture: ComponentFixture<SpeechBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpeechBarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpeechBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
