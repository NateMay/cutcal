
import { BioData } from './bio-data';
import { KVP } from './key-value-pair';
import { Usage } from './usage';
/**
 * Notions to capture:
 *
 * 1) Reputation points=
 * 2) Community Role - [ 'user', 'nutritionist', 'chef']
 * 3) Bimetric Data
 * 4) Privacy - what gets displayed if anything and to whom
 */

/*tslint:disable:max-line-length*/
export interface CutCalUser {
  ccInfo: CutCalManagedInfo;
  ownerInfo: OwnerManagedInfo;
  bioData: BioData;
  groceryList: Usage[];
  inventory: Usage[];
  createdAt?: string;
  updatedAt?: string;
}

export interface CutCalManagedInfo {
  _id: string;
  role: KVP<boolean>;
  permissions?: KVP<Permission>;
}

export interface OwnerManagedInfo {
  username: string;
  email: string;
  photoUrl?: string;
  fname?: string;
  lname?: string;
  subscription?: string;
}

export interface Permission {
  calendar: boolean;
  bio: boolean;
}




export const MOCK_USER: CutCalUser = {

  ccInfo: {
    _id: 'ch9lQSQVF3E1en2LqziV',
    role: {
      'ADMIN': true,
      'USER': true
    }
  },
  ownerInfo: {
    username: 'mortarman86',
    fname: 'Nate',
    lname: 'May',
    email: 'nathaniel.may22@gmail.com',
    subscription: '{"endpoint":"https://fcm.googleapis.com/fcm/send/c75DawM_xZw:APA91bFLDCOAmqh81YKvJvGZVIU5Bs82QANEKQ9R7MVrLvspKF-rREvRgBXzPbzCT059M69cvKxzqgRUgt1fspRAS6azqQGl4R_dnMltSVr7ClYP8H9d_USowAx22yXakNbvl_HmjtDP","expirationTime":null,"keys":{"p256dh":"BMM_zzRvT1IYm5Si-OVC_-fhAePAH22n4FwuY9xu7x9Iwk_5AgMhI6SsfBPajXgWWQk8G23Y51niNVNAi-jLcDk","auth":"1Cqvs5K7NCBOp40XD2OwHQ"}}'
  },
  bioData: {},
  groceryList: [],
  inventory: []

}


