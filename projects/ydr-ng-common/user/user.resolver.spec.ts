import { TestBed, fakeAsync } from '@angular/core/testing';

import { UserResolver } from './user.resolver';
import { UserFacade } from './user.facade';
import { UserFacadeMockFactory, UserFacadeMock } from './user.facade.mock';
import { UserResponse } from './user-create.payload';

describe('UserResolverService', () => {
  let service: UserResolver;
  let userFacade: UserFacadeMock;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {provide: UserFacade, useFactory: UserFacadeMockFactory},
        UserResolver
      ]
    });
    service = TestBed.inject(UserResolver);
    userFacade = TestBed.get(UserFacade);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return loaded user', fakeAsync(() => {
    let user: UserResponse;

    service.resolve().subscribe(
      response => user = response
    );
    expect(user).toBeTruthy();
  }));

  it('should return load user if not loaded', fakeAsync(() => {
    userFacade.changeUser(null);

    service.resolve().subscribe();

    expect(userFacade.load).toHaveBeenCalled();
  }));
});
