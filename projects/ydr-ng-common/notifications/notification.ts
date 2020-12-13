export interface Notification {
    id: string;
    image: string;
    createdAt: Date;
    updatedAt: Date;
    name: string;
    slug: string;
    from: string;
    to: string;
    text: string;
    readAt: Date;
    link: string;
    deletedAt: Date;
};