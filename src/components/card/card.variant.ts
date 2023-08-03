/* eslint-disable check-file/filename-naming-convention */
import { cva } from 'class-variance-authority'
import styles from './card.module.scss'

export const card = cva(styles.card, {
    variants: {
        intent: {
            main: null,
            primary: styles.i_primary_border,
            success: styles.i_success_border,
            warning: styles.i_warning_border,
            error: styles.i_error_border,
        },
        bordered: {
            true: null,
            false: null
        },
        rounded: {
            none: styles.br_none,
            small: styles.br_small,
            medium: styles.br_medium,
        },
        shadow: {
            true: styles.card_shadow,
            false: null
        }
    },
    compoundVariants: [
        { intent: 'main', bordered: true, className: [styles.i_main_border] },
        { intent: 'primary', bordered: false, className: [styles.cv_primary] },
        { intent: 'success', bordered: false, className: [styles.cv_success] },
        { intent: 'warning', bordered: false, className: [styles.cv_warning] },
        { intent: 'error', bordered: false, className: [styles.cv_error] },
    ],
    defaultVariants: {
        intent: 'main',
        bordered: false,
        shadow: false,
        rounded: 'small'
    },
})
