/* eslint-disable check-file/filename-naming-convention */
import { cva } from 'class-variance-authority'
import styles from './title.module.scss'

export const title = cva(null, {
    variants: {
        intent: {
            main: styles.c_main,
            primary: styles.c_primary,
            success: styles.c_success,
            warning: styles.c_warning,
            error: styles.c_error,
        },
        type: {
            h1: null,
            h2: null
        },
        dimension: {
            big: null,
            normal: null,
            small: null
        },
        textAlign: {
            center: styles.ta_center,
            left: styles.ta_left,
            right: styles.ta_right
        },
    },
    compoundVariants: [
        { dimension: 'big', type: 'h1', className: [styles.d_h1_big] },
        { dimension: 'big', type: 'h2', className: [styles.d_h2_big] },
        { dimension: 'normal', type: 'h1', className: [styles.d_h1_normal] },
        { dimension: 'normal', type: 'h2', className: [styles.d_h2_normal] },
        { dimension: 'small', type: 'h1', className: [styles.d_h1_small] },
        { dimension: 'small', type:'h2', className: [styles.d_h2_small] },
    ],
    defaultVariants: {
        intent: 'main',
        type: 'h1',
        textAlign: 'left',
        dimension: 'normal',
    },
})
