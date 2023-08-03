/* eslint-disable check-file/filename-naming-convention */
import { cva } from 'class-variance-authority'
import styles from './badge.module.scss'

export const badge = cva(styles.badge, {
    variants: {
        intent: {
            light: styles.i_light,
            primary: styles.i_primary,
            error: styles.i_error,
            warning: styles.i_warning,
        },
        dimension: {
            normal: styles.d_normal,
        }
    },
    compoundVariants: [],
    defaultVariants: {
        intent: 'primary',
        dimension: 'normal'
    },
})
