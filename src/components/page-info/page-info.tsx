import React, { FC, Fragment, ReactNode } from 'react'
import { Title } from '$/components/title'
import { Breadcrumb, BreadcrumbProps } from '$/components/breadcrumb'
import styles from './page-info.module.scss'

type PageInfoProps = {
  title: ReactNode,
  breadcrumb: BreadcrumbProps['data']
}

const PageInfo: FC<PageInfoProps> = (props) => {

  const { title, breadcrumb } = props

  return (
    <Fragment>
      <section>
        <div className={styles.container}>
          <Title dimension='big' type='h1'>{title}</Title>
          <Breadcrumb data={breadcrumb} />
        </div>
      </section>
    </Fragment >
  )
}

export default PageInfo
