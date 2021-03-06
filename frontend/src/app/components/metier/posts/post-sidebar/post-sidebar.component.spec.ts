import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostSidebarComponent } from './post-sidebar.component';

describe('PostSidebarComponent', () => {
  let component: PostSidebarComponent;
  let fixture: ComponentFixture<PostSidebarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostSidebarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
