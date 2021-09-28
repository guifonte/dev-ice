import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EllipsableTextComponent } from './ellipsable-text.component';

describe('EllipsableTextComponent', () => {
  let component: EllipsableTextComponent;
  let fixture: ComponentFixture<EllipsableTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EllipsableTextComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EllipsableTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
