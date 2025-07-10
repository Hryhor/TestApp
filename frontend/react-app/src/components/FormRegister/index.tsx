import axios from 'axios';
import React, { ChangeEvent, useState, FormEvent } from "react";
//redux
import { useAppDispatch } from '../../app/hooks';
import { register } from '../../app/features/auth/authSlice';
import { validEmail, validPassword, validName, validUserName } from '../../utils/validators';
import FormFeedback from "../FormFeedback";

type FormRegisterProps = {
  onClose?: () => void;
};

const FormRegister: React.FC<FormRegisterProps> = ({ onClose }) => {
  const dispatch = useAppDispatch();

  const [name, setName] = useState("");
  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConf, setPasswordConf] = useState("");
  const [email, setEmail] = useState("");
  
  const [hasError, setHasError] = useState({
    name: false,
    userName: false,
    email: false,
    password: false,
    passwordConfirm: false,
  });

  const onChangeName = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const onChangeUsername = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const onChangePasswordConfirmed = (e: ChangeEvent<HTMLInputElement>) => {
    setPasswordConf(e.target.value);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const isNameValid = validName(name);
    const isUserNameValid = validUserName(userName);
    const isEmailValid = validEmail(email);
    const isPasswordValid = validPassword(password);
    const isPasswordConfirmValid = password === passwordConf;

    const newErrors = {
      name: !isNameValid,
      userName: !isUserNameValid,
      email: !isEmailValid,
      password: !isPasswordValid,
      passwordConfirm: !isPasswordConfirmValid,
    };

    setHasError(newErrors);

    if (Object.values(newErrors).some(Boolean)) {
      console.log('Invalid data, fix errors first');
      return;
    }

    try {
      console.log('→ Отправляем запрос на регистрацию…');
      const result = await dispatch(register({ name, userName, email, password, role: 'User'})).unwrap();
      console.log('Регистрация успешна:', result);
      if(onClose) onClose();
      // здесь  делать редирект или закрыть модалку
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
            console.error('Непредвиденная ошибка:', err.message);
          }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className='form-group'>
        <label className='form-label'>Please enter your name:</label>
        <FormFeedback hasError={hasError.name}>This name is incorrect</FormFeedback>
        <input
          name='user'
          value={name}
          className='form-input'
          placeholder='Jon'
          type='text'
          onChange={onChangeName}
        />
      </div>

      <div className='form-group'>
        <label className='form-label'>Please enter your username:</label>
        <FormFeedback hasError={hasError.userName}>This name is incorrect</FormFeedback>
        <input
          name='username'
          value={userName}
          className='form-input'
          placeholder='Jon123'
          type='text'
          onChange={onChangeUsername}
        />
      </div>

      <div className='form-group'>
        <label className='form-label'>Please enter your email:</label>
        <FormFeedback hasError={hasError.email}>This email is incorrect</FormFeedback>
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
        <label className='form-label'>Please create your password:</label>
        <FormFeedback hasError={hasError.password}>This password is incorrect</FormFeedback>
        <input
          name='password'
          value={password}
          className='form-input'
          placeholder='Qw2#Er4$'
          type='password'
          onChange={onChangePassword}
        />
      </div>

      <div className='form-group'>
        <label className='form-label'>You need confirm password:</label>
        <FormFeedback hasError={hasError.passwordConfirm}>
          Passwords do not match
        </FormFeedback>
        <input
          name='passwordConfirmed'
          value={passwordConf}
          className='form-input'
          placeholder='Qw2#Er4$'
          type='password'
          onChange={onChangePasswordConfirmed}
        />
      </div>

      <div className='form-group'>
        <button className='form-submit-btn' type='submit'>
          Sign Up
        </button>
      </div>
    </form>
  );
};

export default FormRegister;
