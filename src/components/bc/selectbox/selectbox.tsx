import React, { useState, useRef, FC, ChangeEvent, useEffect } from 'react'
import useClickOutside from '$/hooks/use-click-outside'
import { Card } from '$/components/card'
import { ArrowDownIcon } from '$/components/icon'
import { Radio } from '../radio'
import styles from './select-box.module.scss'

type DataProps = {
  key?: string,
  value: string,
  label?: string,
}

export type SelectboxProps = {
  data: DataProps[],
  placeholder?: string,
  value: string | undefined,
  onChange: (value: string | undefined) => void,
}

type PrintValueProps = Omit<SelectboxProps, 'onChange' | 'value'> & { value: SelectboxProps['value'] }

const PrintValue: FC<PrintValueProps> = (props) => {

  const { value, placeholder, data } = props

  if (value) {
    if (data.length > 0) {
      const findData = data.find((v) => v.value === value)

      return <span className='truncate'>{findData?.label ?? findData?.value}</span>
    }
    return <span className='truncate'>{placeholder}</span>
  }
  return <span className='text-[#9d9ea1] truncate'>{placeholder}</span>
}

const Selectbox: FC<SelectboxProps> = (props) => {
  const { data = [], placeholder = 'Choose One', value, onChange } = props

  const [isShow, setIsShow] = useState(false)
  const [tmpValue, setTmpValue] = useState<SelectboxProps['value']>()

  const wrapperRef = useRef(null)

  const handleOutSideClick = () => {
    setIsShow(false)
  }

  useClickOutside(wrapperRef, handleOutSideClick)

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value
    let passValue: string | undefined = val

    if (val === tmpValue) {
      passValue = undefined
    }

    onChange(passValue)
    setTmpValue(passValue)

    setTimeout(() => setIsShow(false), 125)
  }

  useEffect(() => {
    setTmpValue(value)
  }, [value])

  const li: JSX.Element[] = []

  data.map((v, i) => {
    li.push(
      <li key={`_sb${i}`} className='w-full'>
        <Radio
          id={`${v.key}_${i}` || `${v.value}_${i}`}
          label={v.label ?? v.value}
          value={v.value}
          onChange={handleOnChange}
          checked={v.value === tmpValue ? true : false}
        />
      </li>
    )
  })

  return (
    <div className={styles.selectbox_wrapper}>
      <label>Brands</label>
      <div ref={wrapperRef} className='relative'>
        <div
          className='text-sm h-[42px] rounded-lg py-2.5 px-4 border border-[#EDEFF3] placeholder:text-[#9D9EA1]'
          onClick={() => setIsShow(true)}
        >
          <div className='h-full flex items-center justify-between'>
            <PrintValue
              value={tmpValue}
              data={data}
              placeholder={placeholder}
            />
            <ArrowDownIcon />
          </div>
        </div>
        <Card hidden={!isShow} rounded={'small'} shadow bordered className='absolute top-0 py-1.5 px-4 z-50 min-h-[42px]'>
          <ul className='text-sm font-normal leading-5 space-y-3'>{li}</ul>
        </Card>
      </div>
    </div>
  )
}

export default Selectbox
