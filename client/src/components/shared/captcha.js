import React from 'react'
import ReCAPTCHA from "react-google-recaptcha";

export const Captcha = (props) => {
    return (
    <div>
      <ReCAPTCHA
        sitekey={'6LdAT3UUAAAAAEcqLxpyUTeW6u14Sfx1qvLica8x'}
        onChange={props.input.onChange}
      />
      </div>
    )
}