import type { Player } from './Player';

export type InvitationStatus = 'PENDING' | 'ACCEPTED' | 'REJECTED';

export interface Invitation {
  id: string;
  senderId: string;
  receiverId: string;
  status: InvitationStatus;
  chatId?: string | null;
  createdAt: string;
  sender?: Player;
  receiver?: Player;
}
