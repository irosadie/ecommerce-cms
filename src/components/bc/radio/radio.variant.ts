/* eslint-disable check-file/filename-naming-convention */
import { cva } from 'class-variance-authority'
import styles from './radio.module.scss'

export const radio = cva(styles.radio, {
    variants: {
        intent: {
            main: styles.i_primary,
        },
    },
    compoundVariants: [],
    defaultVariants: {
        intent: 'main',
    },
})
