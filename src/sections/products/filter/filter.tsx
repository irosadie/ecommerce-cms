/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import React, { FC } from 'react'
import { Modal } from 'flowbite-react'
import { Button, ButtonProps } from '$/components/button'
import { TextInput, TextInputProps } from '$/components/text-input'
import { TagSelect, TagSelectProps } from '$/components/tag-select'
import { Form, FormProps } from '$/components/form'

type FilterProductProps = {
  isShow: boolean,
  onClose: () => void,
  formProps: FormProps,
  tagSelectProps: {
    category: TagSelectProps,
    brands: TagSelectProps,
  },
  textInputProps: {
    priceMin: TextInputProps,
    priceMax: TextInputProps,
  },
  buttonProps: {
    submit: ButtonProps,
    reset: ButtonProps
  }
}

const FilterProduct: FC<FilterProductProps> = (props) => {

  const {
    isShow,
    formProps,
    tagSelectProps,
    textInputProps,
    buttonProps,
    onClose
  } = props

  return (
    <Modal
      show={isShow}
      onClose={onClose}
      position={'top-center'}
      size='3xl'
    >
      <Modal.Header>Filter Product</Modal.Header>
      <Form {...formProps}>
        <Modal.Body>
          <div className='space-y-4'>
            <TagSelect {...tagSelectProps.category} />
            <TagSelect {...tagSelectProps.brands} />
            <div className='space-y-2'>
              <label className='text-sm font-semibold'>Price Range</label>
              <div className='grid grid-cols-2 gap-4'>
                <TextInput {...textInputProps.priceMin} />
                <TextInput {...textInputProps.priceMax} />
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer className='flex justify-end gap-x-2'>
          <Button
            rounded='full'
            bordered
            type='reset'
            {...buttonProps.reset}
          >
            Reset
          </Button>

          <Button
            type='submit'
            rounded='full'
            {...buttonProps.submit}
          >Apply</Button>
        </Modal.Footer>
      </Form>
    </Modal >
  )
}

export default FilterProduct
