import React, { Fragment, FC } from 'react'
import { breadcrumb } from './breadcrumb.variant'
import { type VariantProps } from 'class-variance-authority'
import styles from './breadcrumb.module.scss'

type BreadcrumbDataProps = {
    title: string,
}

type BreadcrumbDefaultProps = {
    data: BreadcrumbDataProps[]
}

export type BreadcrumbProps = BreadcrumbDefaultProps & VariantProps<typeof breadcrumb>

const Breadcrumb: FC<BreadcrumbProps> = ({ data }) => {

    const breadcrumb: JSX.Element[] = []

    data.map((v, i) => {

        let breadcrumbElement = <li key={i.toString()}>{v.title} <span>/</span></li>

        if (i === data.length - 1) {

            breadcrumbElement = <li key={i.toString()}>{v.title}</li>
        }

        breadcrumb.push(breadcrumbElement)

    })

    return (
        <Fragment>
            <div>
                <ul className={styles.breadcrumb}>{breadcrumb}</ul>
            </div>
        </Fragment>
    )
}

export default Breadcrumb
