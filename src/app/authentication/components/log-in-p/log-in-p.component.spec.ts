import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogInPComponent } from './log-in-p.component';

describe('LogInPComponent', () => {
  let component: LogInPComponent;
  let fixture: ComponentFixture<LogInPComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LogInPComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LogInPComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
