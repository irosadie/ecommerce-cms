/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment, FC, InputHTMLAttributes, useState, useEffect, KeyboardEvent, ChangeEvent } from 'react'
import { textInput } from './text-input.variant'
import { type VariantProps, cx } from 'class-variance-authority'
import styles from './text-input.module.scss'
import { CloseIcon, EyeIcon, HideIcon, LoopIcon } from '$/components/icon'
import { currencyFormat as currFormat, decodeCurrency } from '$/utils'


export interface TextInputProps
    extends InputHTMLAttributes<HTMLInputElement>,
    Omit<VariantProps<typeof textInput>, 'leftIcon' | 'rightIcon'> {
    label?: string,
    error?: string,
    leftIcon?: 'loop',
    rightIcon?: 'loop',
    removeButton?: boolean,
    currencyFormat?: boolean,
    currencyPrefix?: string,
    currencyDecode?: boolean,
    onRemoveButton?: () => void,
}

const TextInput: FC<TextInputProps> = (props) => {
    const {
        id,
        error,
        label,
        intent,
        dimension,
        leftIcon,
        rightIcon,
        className,
        required,
        removeButton,
        value,
        name,
        type,
        currencyFormat,
        currencyPrefix = '',
        currencyDecode,
        onRemoveButton,
        onKeyUp,
        onChange,
        ...rest
    } = props

    const RIGHTICON = {
        0: null,
        'loop': <LoopIcon />,
    }[rightIcon ? rightIcon : 0]

    const LEFTICON = {
        0: null,
        'loop': <LoopIcon />,
    }[leftIcon ? leftIcon : 0]

    const [tmpValue, setTmpValue] = useState(value)
    const [isShowCloseIcon, setIsCloseIcon] = useState(value ? true : false)
    const [isPassword,] = useState(type === 'password' ? true : false)
    const [fieldType, setFieldType] = useState(type)
    const [isRendered, setIsRendered] = useState(false)

    useEffect(() => {
        if (!isRendered && currencyFormat) {
            setTmpValue(value ? currFormat({ amount: parseFloat(value as string), prefix: currencyPrefix }) : undefined)
        }
        else {
            setTmpValue(value)
        }

        if (removeButton && value && type !== 'password') {
            setIsCloseIcon(true)
            return
        }
        setIsRendered(true)
        setIsCloseIcon(false)
    }, [value])

    const handleOnCloseButtonClicked = () => {
        setTmpValue('')
        if (onRemoveButton) {
            onRemoveButton()
            return
        }
        return null
    }

    const handleFieldType = () => {
        setFieldType(v => v === 'password' ? 'text' : 'password')
    }

    const handleKeyUp = (e: KeyboardEvent<HTMLInputElement>) => {
        if (currencyFormat) {
            const value = decodeCurrency(e.currentTarget.value, currencyPrefix)

            setTmpValue(currFormat({ amount: value, prefix: currencyPrefix }))
        }
        if (onKeyUp) onKeyUp(e)
    }

    const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {

        const value = event.currentTarget.value
        const tmpEvent = event

        if (currencyDecode) {
            const decode = decodeCurrency(value, currencyPrefix).toString()

            tmpEvent.currentTarget.value = decode
        }

        if (onChange) onChange(event)
    }

    return (
        <Fragment>
            <div className={cx([styles.text_input_wrapper])}>
                {label ? <label className={required ? styles.label_required : undefined} htmlFor={`_${id}`}>{label}</label> : null}
                <div className={styles.p_relative}>
                    {LEFTICON && (<div className={styles.icon_wrapper_left}>{LEFTICON}</div>)}
                    <input
                        className={textInput({ intent: error ? 'error' : intent, leftIcon: leftIcon ? true : false, rightIcont: rightIcon || isShowCloseIcon ? true : false, dimension, className })}
                        id={`_${id}`}
                        value={tmpValue}
                        name={name}
                        type={fieldType}
                        onKeyUp={handleKeyUp}
                        onChange={handleOnChange}
                        {...rest}
                    />
                    {isPassword && (
                        <span onClick={handleFieldType} className={styles.icon_wrapper_right}>{
                            fieldType === 'password' ? <HideIcon /> : <EyeIcon />
                        }</span>
                    )}
                    {isShowCloseIcon && <span onClick={handleOnCloseButtonClicked} className={styles.icon_wrapper_right}><CloseIcon /></span>}
                    {RIGHTICON && !isShowCloseIcon && !isPassword && (<div className={styles.icon_wrapper_right}>{RIGHTICON}</div>)}
                </div>
                {error ? <span>{error}</span> : null}
            </div>
        </Fragment>
    )
}

export default TextInput
