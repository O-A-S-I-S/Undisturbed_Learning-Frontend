import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PsychopedagogistsComponent } from './psychopedagogists.component';

describe('PsychopedagogistsComponent', () => {
  let component: PsychopedagogistsComponent;
  let fixture: ComponentFixture<PsychopedagogistsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PsychopedagogistsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PsychopedagogistsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
