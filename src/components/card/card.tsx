import React, { ReactNode, Fragment, FC, HTMLAttributes } from 'react'
import { card } from './card.variant'
import { type VariantProps } from 'class-variance-authority'

export interface CardProps
    extends HTMLAttributes<HTMLElement>,
    VariantProps<typeof card> {
    children: ReactNode
}

const Card: FC<CardProps> = (props) => {
    const { intent, className, children, bordered, shadow, rounded, ...rest } = props

    return (
        <Fragment>
            <div className={card({ intent, bordered, shadow, rounded, className })} {...rest} >
                {children}
            </div>
        </Fragment>
    )
}

export default Card
