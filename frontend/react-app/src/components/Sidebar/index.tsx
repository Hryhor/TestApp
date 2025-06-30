import React, { ChangeEvent, useState }from 'react';
//images
import imgAvatar from '../../app/assets/images/person.svg';
import imgSignUp from '../../app/assets/images/person-plus.svg';
import imgSignIn from '../../app/assets/images/person-lock.svg';
//components 
import Modal from '../ui/Modal';
import ModalButton from '../ui/ModelButton';
import ModalBodyMain from '../ui/ModalBodyMain';
import FormLogin from '../FormLogin';
import FormRegister from '../FormRegister';

const Sidebar: React.FC = () => {
    const [email, setEmail] = useState("");

    const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
        const email = e.target.value;
        setEmail(email);
    };

    return(
        <div className='sidebar'>
            <header className='sidebar__header'>
                <div className='person__block'>
                    <div className='person__avatar'>
                        <img src={imgAvatar} alt='' />
                    </div>
                </div>
            </header>

            <ul className='person__menu'>
                <li className='person__item'>
                    <ModalButton id='signInModal' className='person__item-btn'>
                        Sign In

                        <img src={imgSignIn} alt='' />
                    </ModalButton>
                </li>
                <li className='person__item'>
                    <ModalButton id='signUpModal' className='person__item-btn'>
                        Sign Up

                        <img src={imgSignUp} alt='' />
                    </ModalButton>
                </li>
            </ul>

            <Modal id='signInModal'>
                <ModalBodyMain>
                    <FormLogin />
                </ModalBodyMain>
            </Modal>

            <Modal id="signUpModal">
                <ModalBodyMain>
                    <FormRegister />
                </ModalBodyMain>
            </Modal>
        </div>
    )
}
export default Sidebar;