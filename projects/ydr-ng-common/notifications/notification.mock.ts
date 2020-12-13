import { Notification } from './notification';

export const notificationMockFactory = (): Notification => {
    const name = 'test';

    return {
        id: 'test',
        image: 'test',
        createdAt: new Date(),
        updatedAt: new Date(),
        name,
        slug: `${name}1`,
        from: 'test',
        to: 'test',
        text: 'lorem ipsum dolor',
        readAt: null,
        link: null,
        deletedAt: new Date(), 
    };
};