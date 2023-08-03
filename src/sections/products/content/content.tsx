/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC, useState } from 'react'
import { Button, ButtonProps } from '$/components/button'
import { TextInput, TextInputProps } from '$/components/text-input'
import { Tabel, TableProps } from '$/components/table'
import { Chart, ChartProps } from '$/components/chart'
import { Form, FormProps } from '$/components/form'
import { Card } from '$/components/card'

type ContentSectionProps = {
  filterButtonProps: ButtonProps,
  searchProps: {
    formProps: FormProps,
    textInputProps: TextInputProps
  },
  tableProps: TableProps,
  chartProps: ChartProps,
}

const ContentSection: FC<ContentSectionProps> = (props) => {

  const { filterButtonProps, searchProps, tableProps, chartProps } = props

  const [tableTabActive, setTableTabActive] = useState<'table' | 'chart'>('table')

  return (
    <section>
      <Card className='p-4'>
        <div className='space-y-4'>
          <div className='flex justify-between pb-4 border-b'>
            <div className='flex gap-4 w-full '>
              <Button
                icon='filter'
                rounded='standard'
                dimension='small'
                className='scale-95'
                {...filterButtonProps}
              />
              <Form className='w-[30%]' {...searchProps.formProps}>
                <TextInput
                  leftIcon='loop'
                  removeButton={true}
                  {...searchProps.textInputProps}
                />
              </Form>
            </div>
            <ul className='flex space-x-1 items-end'>
              <li>
                <Button
                  icon='table'
                  dimension='tiny'
                  intent='default'
                  rounded='standard'
                  iconColor={tableTabActive === 'table' ? '#4AC3BE' : undefined}
                  onClick={() => setTableTabActive('table')}
                />
              </li>
              <li>
                <Button
                  icon='chart'
                  dimension='tiny'
                  intent='default'
                  rounded='standard'
                  iconColor={tableTabActive === 'chart' ? '#4AC3BE' : undefined}
                  onClick={() => setTableTabActive('chart')}
                />
              </li>
            </ul>
          </div>

          <div>
            {{
              'table': <Tabel {...tableProps} />,
              'chart': <Chart {...chartProps} />
            }[tableTabActive]}
          </div>
        </div>
      </Card>
    </section>
  )
}

export default ContentSection
