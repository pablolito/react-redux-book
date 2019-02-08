import React from 'react';
import ReCAPTCHA from 'react-google-recaptcha';

const Captcha = ({
  input,
  meta: { touched, error }
}) => (
  <div>
    
    <ReCAPTCHA
      sitekey={process.env.REACT_APP_RECAPTCHA_TOKEN}
      onChange={response => input.onChange(response)}
      theme='dark'
    />
    <span className="error">{touched && error}</span>
    </div>
);


export default Captcha;