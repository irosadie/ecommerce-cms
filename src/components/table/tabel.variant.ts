/* eslint-disable check-file/filename-naming-convention */
import { cva } from 'class-variance-authority'
import styles from './table.module.scss'

export const trHead = cva(null, {
    variants: {},
    compoundVariants: [],
    defaultVariants: {},
})

export const th = cva(null, {
    variants: {
        sorting: {
            true: styles.sorting,
            false: null
        }
    },
    compoundVariants: [],
    defaultVariants: {
        sorting: false
    },
})

export const trBody = cva(null, {
    variants: {},
    compoundVariants: [],
    defaultVariants: {},
})

export const td = cva(null, {
    variants: {
        position: {
            'left': styles.p_left,
            'center': styles.p_center,
            'right': styles.p_right,
        }
    },
    compoundVariants: [],
    defaultVariants: {
        position: 'left',
    },
})

