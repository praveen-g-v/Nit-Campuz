
import bcrypt from 'bcryptjs';



const hashPassword = async (password) => {
    return bcrypt.hash(password,2);
  };

  export {hashPassword};