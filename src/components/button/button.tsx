import React, { Fragment, FC, ButtonHTMLAttributes } from 'react'
import { button } from './button.variant'
import { type VariantProps } from 'class-variance-authority'
import { BurgerIcon, ChartIcon, FileIcon, GithubIcon, TableIcon, TimesIcon } from '$/components/icon'
import styles from './button.module.scss'
import FilterIcon from '../icon/filter'

export interface ButtonProps
    extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof button> {
    icon?: 'chart' | 'table' | 'filter' | 'github' | 'file' | 'burger' | 'times',
    iconColor?: string,
    iconPosition?: 'left' | 'right'
}

const Button: FC<ButtonProps> = (props) => {
    const {
        intent,
        dimension,
        className,
        children,
        bordered,
        shadow,
        width,
        rounded,
        icon,
        iconPosition = 'left',
        iconColor,
        ...rest
    } = props

    return (
        <Fragment>
            <button
                className={button({ intent, dimension, rounded, width, bordered, shadow, className })}
                {...rest}
            >
                <div className={iconPosition === 'left' ? styles.icon_left : styles.icon_right}>
                    {icon && (
                        <div className='flex items-center'>
                            {{
                                'chart': <ChartIcon color={iconColor} />,
                                'table': <TableIcon color={iconColor} />,
                                'filter': <FilterIcon color={iconColor} />,
                                'github': <GithubIcon color={iconColor} />,
                                'file': <FileIcon color={iconColor} />,
                                'burger': <BurgerIcon color={iconColor} />,
                                'times': <TimesIcon color={iconColor} />,
                            }[icon]}
                        </div>
                    )}
                    {children && children}
                </div>
            </button>
        </Fragment>
    )
}

export default Button
