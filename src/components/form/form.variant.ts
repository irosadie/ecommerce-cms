/* eslint-disable check-file/filename-naming-convention */
import { cva } from 'class-variance-authority'
import styles from './form.module.scss'

export const form = cva(styles.form, {
    variants: {},
    compoundVariants: [],
    defaultVariants: {},
})
