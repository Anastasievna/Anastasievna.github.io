import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Sortbar } from './sortbar';

describe('Sortbar', () => {
  let component: Sortbar;
  let fixture: ComponentFixture<Sortbar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Sortbar],
    }).compileComponents();

    fixture = TestBed.createComponent(Sortbar);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
