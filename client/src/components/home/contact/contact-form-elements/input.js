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
          ((error && <span className="error mb-3">{error}</span>) ||
            (warning && <span className="warning mb-3">{warning}</span>))}
      </div>
    </div>
  )