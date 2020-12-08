import { Gender } from './gender.enum';
import { Country } from './country-code.enum';
import { UserResponse } from './user-create.payload';

export const userResponseMockFactory = (): UserResponse => {
    const name = 'test';

    return {
        id: 'id',
        image: 'test',
        password: 'test',
        createdAt: new Date(),
        updatedAt: new Date(),
        name,
        slug: `${name}+${'test'}}`,
        firstName: name,
        lastName: 'test',
        email: 'test@gmail.com',
        validated: false,
        birthDate: new Date(),
        gender: Gender.Female,
        phone: 'test',
        country: Country.AlandIslands,
        city: 'test',
        address: 'test',
        postalCode: 'test',
        commercialCommunications: false,
        legitimateInterest: false,
        termsAndConditions: false,
        deletedAt: null,
    };
};