import React, { FC, ReactNode } from 'react'
import { Radio as Rb, RadioProps as RbProps } from 'flowbite-react'
import { radio } from './radio.variant'
import { VariantProps } from 'class-variance-authority'

export interface RadioProps
    extends RbProps,
    VariantProps<typeof radio> {
    label?: ReactNode
}

const Radio: FC<RadioProps> = (props) => {
    const { id = Math.random().toString(), label, intent, ...rest } = props

    return (
        <div className='w-full flex items-center space-x-3'>
            <Rb
                id={id}
                className={radio({ intent })}
                {...rest}
            /> <label className='flex-1' htmlFor={id}>{label}</label>
        </div>
    )
}

export default Radio
