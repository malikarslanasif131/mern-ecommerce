import bcrypt from 'bcrypt';

export const hashPassword = async (password) => {
    try {
        const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
    } catch (error) {
        console.log(error);
               
    }
}

export const comparePassword = async (password, hashedPassword) => {
    try {
        const isMatch = await bcrypt.compare(password, hashedPassword);
        return isMatch;
    } catch (error) { 
        console.log(error);
    }
}