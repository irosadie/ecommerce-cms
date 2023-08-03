/* eslint-disable check-file/filename-naming-convention */
import { cva } from 'class-variance-authority'
import styles from './text-input.module.scss'

export const textInput = cva(null, {
    variants: {
        intent: {
            main: styles.i_main,
            success: styles.i_success,
            warning: styles.i_warning,
            error: styles.i_error,
        },
        dimension: {
            normal: styles.d_normal
        },
        leftIcon: {
            true: null,
            false: null
        },
        rightIcont: {
            true: null,
            false: null
        }
    },
    compoundVariants: [
        { dimension: 'normal', leftIcon: true, rightIcont: false, className: [styles.d_normal_left_icon] },
        { dimension: 'normal', leftIcon: false, rightIcont: true, className: [styles.d_normal_right_icon] },
        { dimension: 'normal', leftIcon: true, rightIcont: true, className: [styles.d_normal_both_icon] },
    ],
    defaultVariants: {
        intent: 'main',
        dimension: 'normal',
        leftIcon: false,
        rightIcont: false
    },
})
