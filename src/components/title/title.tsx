import React, { ReactNode, Fragment, FC, HTMLAttributes } from 'react'
import { title } from './title.variant'
import { type VariantProps } from 'class-variance-authority'

export interface TitleProps
    extends HTMLAttributes<HTMLElement>,
    VariantProps<typeof title> {
    children: ReactNode
}

type HeadingProps = {
    type?: 'h1' | 'h2' | null
    children: ReactNode,
    className: string
}

const Heading: FC<HeadingProps> = (props) => {
    const { type, children, ...rest } = props

    return (
        <Fragment>
            {
                {
                    'h2': <h2 {...rest}>{children}</h2>,
                    'h1': <h2 {...rest}>{children}</h2>,
                }[type ?? 'h1']
            }
        </Fragment>
    )
}

const Title: FC<TitleProps> = (props) => {
    const { className, children, intent, type, textAlign, dimension, ...rest } = props

    return (
        <Fragment>
            <Heading type={type} className={title({ intent, type, textAlign, dimension, className })} {...rest} >
                {children}
            </Heading>
        </Fragment>
    )
}

export default Title
