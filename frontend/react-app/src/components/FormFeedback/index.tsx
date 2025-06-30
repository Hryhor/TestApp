import imgAlert from '../../app/assets/images/exclamation-circle.svg';

type FormFeedbackProps = {
    children:  string,
    hasError: boolean;
}

const FormFeedback: React.FC<FormFeedbackProps> =  ({ children, hasError }) => {
    return(
        <div className="form__invalid-feedback" data-error={hasError}>
            <img src={imgAlert} alt='' />
            <p>{ children }</p>
        </div>
    )
}

export default FormFeedback;