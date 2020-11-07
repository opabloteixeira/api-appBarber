import User from '../models/User';


export default class UserMap {

   //Altere de any para a sua model de User
   public static toDTO(user: User) {
      return {
         id: user.id,
         name: user.name,
         // avatar: user.avatar
      };
   }
}