export interface Message {

    id: number;
    senderId: number;
    senderKnownAs: string;
    senderPhotoUrl: string;
    recipientId: number;
    recpientKnownAs: string;
    recpientPhotoUrl: string;
    content: string;
    isRead: boolean;
    messageRead: Date;
    messageSentTime: Date;

}
