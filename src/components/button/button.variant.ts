/* eslint-disable check-file/filename-naming-convention */
import { cva } from 'class-variance-authority'
import styles from './button.module.scss'

export const button = cva(styles.btn, {
    variants: {
        intent: {
            default: styles.i_default,
            light: styles.i_light_border,
            primary: styles.i_primary_border,
            'primary-soft': styles.i_primary_soft_border,
            success: styles.i_success_border,
            warning: styles.i_warning_border,
            error: styles.i_error_border,
        },
        dimension: {
            tiny: styles.d_tiny,
            small: styles.d_small,
            normal: styles.d_normal,
            bigger: styles.d_bigger
        },
        bordered: {
            true: null,
            false: null
        },
        shadow: {
            true: styles.btn_shadow,
            false: null
        },
        width: {
            standard: styles.w_standard,
            full: styles.w_full
        },
        rounded: {
            standard: styles.r_standard,
            full: styles.r_full,
            none: styles.r_none
        }
    },
    compoundVariants: [
        { intent: 'primary', bordered: false, className: [styles.cv_primary, styles.txt_white] },
        { intent: 'primary-soft', bordered: false, className: [styles.cv_primary_soft, styles.txt_white] },
        { intent: 'light', bordered: false, className: [styles.cv_light, styles.text_black] },
        { intent: 'success', bordered: false, className: [styles.cv_success, styles.txt_white] },
        { intent: 'warning', bordered: false, className: [styles.cv_warning, styles.txt_white] },
        { intent: 'error', bordered: false, className: [styles.cv_error, styles.txt_white] },
    ],
    defaultVariants: {
        intent: 'primary',
        dimension: 'normal',
        bordered: false,
        shadow: false,
        width: 'standard',
        rounded: 'none'
    },
})
