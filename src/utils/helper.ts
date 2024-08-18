import * as bcrypt from 'bcrypt';


export const hashedPassword = async (password: string): Promise<string> => {
    return await bcrypt.hash(password, 10);
}
