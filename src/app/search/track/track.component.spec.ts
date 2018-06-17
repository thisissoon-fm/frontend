import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DurationPipe, UtilsService } from '../../shared';
import { TrackComponent } from './track.component';
import { search } from '../../../testing/mock-spotify-search';

describe('TrackComponent', () => {
  let component: TrackComponent;
  let fixture: ComponentFixture<TrackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [UtilsService],
      declarations: [TrackComponent, DurationPipe]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackComponent);
    component = fixture.componentInstance;
    component.item = <any>search.tracks.items[0];
    fixture.detectChanges();
  });

  it('should get optimal image', () => {
    expect(component.optimalImage).toEqual(
      'https://i.scdn.co/image/87862f13aaa41c7621b3f2c3c8f8bb6e9e7ccd6f'
    );
  });

  it('should get artists as a string', () => {
    expect(component.artistsJoined).toEqual('Drake, Rihanna');
  });

  it('should emit event on click', () => {
    const spy = spyOn(component.buttonClick, 'emit');
    component.onClick();
    expect(spy).toHaveBeenCalledWith('spotify:track:5EnYT6F7wEcdege6mDHEfO');
  });
});
