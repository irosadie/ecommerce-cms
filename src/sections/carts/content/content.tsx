import React, { FC } from 'react'
import { Tabel, TableProps } from '$/components/table'
import { Card } from '$/components/card'

type ContentSectionProps = {
  tableProps: TableProps,
}

const ContentSection: FC<ContentSectionProps> = (props) => {

  const { tableProps } = props

  return (
    <section>
      <Card>
        <div>
          <div className='p-4 border-b'>
            <h2 className='font-medium text-lg'>Detail of Items</h2>
          </div>
          <div className='p-4 pt-2'>
            <Tabel {...tableProps} />
          </div>
        </div>
      </Card>
    </section>
  )
}

export default ContentSection
