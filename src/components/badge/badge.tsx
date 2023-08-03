import React, { Fragment, FC, HTMLAttributes } from 'react'
import { badge } from './badge.variant'
import { type VariantProps } from 'class-variance-authority'

export type ButtonProps = HTMLAttributes<HTMLElement> & VariantProps<typeof badge>

const Badge: FC<ButtonProps> = (props) => {
    const {
        intent,
        className,
        children,
        ...rest
    } = props

    return (
        <Fragment>
            <span className={badge({ intent, className })} {...rest}>{children}</span>
        </Fragment>
    )
}

export default Badge
