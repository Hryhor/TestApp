import validator, { isEmail,isMobilePhone, isStrongPassword, isAlpha  } from 'validator';

export const validName = (value: string): boolean => {
    if (!isAlpha(value, 'en-US', { ignore: " '-" })) {
        console.log('Invalid name');
        return false;
    } else {
        console.log('Valid name');
        return true;
    }
}

//Qw2#Er4$
export const validPassword = (value: string) => {
    if (!isStrongPassword(value, {
        minLength: 8, // Минимальная длина пароля
        minLowercase: 2, // Минимальное количество строчных букв
        minUppercase: 2, // Минимальное количество прописных букв
        minNumbers: 2,// Минимальное количество цифр
        minSymbols: 2 // Минимальное количество специальных символов
    })) {
       return false;
    } else {
        return true;
    }
}

export const valiMobilePhone = (value: any) => {
    if (!isMobilePhone(value, 'uk-UA')) {
        return false
    } else {
        return true
    }
}

export const validEmail = (value: string) => {
    if (!isEmail(value)) {
        return false;
    } else {
        return true;
    }
} 