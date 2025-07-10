import axios from 'axios';
import React, { ChangeEvent, useState, FormEvent } from "react";
//redux
import { useAppDispatch } from '../../app/hooks';
import { login } from "../../app/features/auth/authSlice";
import { validEmail, validPassword } from "../../utils/validators";
import FormFeedback from "../FormFeedback";


type FormLoginProps = {
    onClose?: () => void;
};


const FormLogin: React.FC<FormLoginProps> = ({ onClose }) => {
    const dispatch = useAppDispatch();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [hasError,  setHasError] = useState(false);

    const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
        const email = e.target.value;
        setEmail(email);
    };

    const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
        const password = e.target.value;
        setPassword(password);
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const isEmailValid = validEmail(email);
        const isPasswordValid = validPassword(password);

        if (isEmailValid && isPasswordValid) { 
            setHasError(false);
            console.log('signIn');
        } else { 
            setHasError(true);
            console.log('Invalid data 1'); 
        }

        try {
            console.log('→ Отправляем запрос на вход в систему…');
            const result = await dispatch(login({email, password})).unwrap();
            console.log('Вы вошли в систему:', result);
            if(onClose) onClose();
        } catch (err: any) {
            if (axios.isAxiosError(err)) {
                if (err.response) {
                  console.error('Ответ от сервера:', err.response.data);
                } else if (err.request) {
                  console.error('Нет ответа от сервера. Запрос:', err.request);
                } else {
                  console.error('Ошибка настройки запроса:', err.message);
                }
              } else {
                console.error('Непредвиденная ошибка:', err);
              }
        }
    }

    return(
        <form onSubmit={handleSubmit}>
             <div className='form-group'>
                <label htmlFor='email' className='form-label'>
                    Please enter your email:
                </label>
                <FormFeedback hasError={hasError}>
                    This email or password is incorrect
                </FormFeedback>
                <input 
                    name='email'
                    className='form-input' 
                    placeholder='JonWilliams@gmail.com'
                    type='email'
                    value={email}
                    onChange={onChangeEmail}
                />
            </div>
            <div className='form-group'>
                <label htmlFor='password' className='form-label'>
                    Please enter your password:
                </label>
                <FormFeedback hasError={hasError}>
                    This email or password is incorrect
                </FormFeedback>
                <input 
                    name='password'
                    className='form-input' 
                    placeholder='Qw2#Er4$'
                    type='password'
                    value={password}
                    onChange={onChangePassword}
                />
            </div>
            <div className='form-group'>
                <button className='form-submit-btn'type='submit'>
                    Sign In
                </button>
            </div>     
        </form>
    )
}

export default FormLogin;