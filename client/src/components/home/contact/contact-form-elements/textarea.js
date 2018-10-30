import React from 'react'

export const Textarea = ({
    input,
    placeholder,
    className,
    meta: { touched, error, warning },
  }) => (
    <div>
      <div>
        <textarea {...input} className={className}>{placeholder}</textarea>
        {touched &&
          ((error && <span className="error">{error}</span>) ||
            (warning && <span className="warning">{warning}</span>))}
      </div>
    </div>
  )