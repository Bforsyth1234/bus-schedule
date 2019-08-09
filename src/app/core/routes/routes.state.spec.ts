import { TestBed, async } from '@angular/core/testing';
import { NgxsModule, Store } from '@ngxs/store';
import { RoutesState, RoutesStateModel } from './routes.state';
import { RoutesAction } from './routes.actions';

describe('Routes store', () => {
  let store: Store;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot([RoutesState])]
    }).compileComponents();
    store = TestBed.get(Store);
  }));

  it('should create an action and add an item', () => {
    const expected: RoutesStateModel = {
      items: ['item-1']
    };
    store.dispatch(new RoutesAction('item-1'));
    const actual = store.selectSnapshot(RoutesState.getState);
    expect(actual).toEqual(expected);
  });

});
