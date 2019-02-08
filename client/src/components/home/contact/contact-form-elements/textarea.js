import React from 'react'

export const Textarea = ({
    input,
    placeholder,
    className,
    meta: { touched, error, warning },
  }) => (
    <div>
      <div>
        <textarea {...input} className={className} placeholder={placeholder}></textarea>
        {touched &&
          ((error && <span className="error mb-3">{error}</span>) ||
            (warning && <span className="warning mb-3">{warning}</span>))}
      </div>
    </div>
  )