import React from 'react'

export const Input = ({
    input,
    placeholder,
    type,
    className,
    meta: { touched, error, warning },
  }) => (
    <div>
      <div>
        <input {...input} placeholder={placeholder} type={type} className={className} />
        {touched &&
          ((error && <span className="error">{error}</span>) ||
            (warning && <span className="warning">{warning}</span>))}
      </div>
    </div>
  )