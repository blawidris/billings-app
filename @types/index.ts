export interface User {
  bioDataId: string | null;
  createdAt: string;
  dob: string;
  email: string;
  emailVerified: boolean;
  firstName: string;
  gender: string;
  id: string;
  kycVeried: boolean;
  lastName: string;
  password: string;
  phone: string;
  pin: string;
  referral: string;
  updatedAt: string;
}

export interface VirtualAccount {
  accountName: string;
  accountNumber: string;
  bankCode: string;
  bankName: string;
  createdAt: string;
  id: string;
  updatedAt: string;
  walletId: string;
}

export interface Wallet {
  balance: number;
  createdAt: string;
  currency: string;
  id: string;
  updatedAt: string;
  userId: string;
  virtualAccount: VirtualAccount;
}

export interface UserData {
  user: User;
  wallet: Wallet;
}
