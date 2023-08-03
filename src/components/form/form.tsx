import React, { Fragment, FC, FormHTMLAttributes } from 'react'
import { type VariantProps } from 'class-variance-authority'
import { form } from './form.variant'

export type FormProps = FormHTMLAttributes<HTMLFormElement> & VariantProps<typeof form>

const Form: FC<FormProps> = (props) => {
    const { className, children, ...rest } = props

    return (
        <Fragment>
            <form className={form({ className })} {...rest}  >
                {children}
            </form>
        </Fragment>
    )
}

export default Form
