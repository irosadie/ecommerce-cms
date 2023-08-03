import React, { FC, Fragment, useEffect, useState } from 'react'
import { Button } from '$/components/button'

type DataProps = {
  value: string;
  parent?: string;
}

export type TagSelectProps = {
  title: string;
  data: DataProps[];
  selected?: DataProps[];
  multiple?: boolean;
  parents?: string[];
  onChange: (data: DataProps[]) => void;
}

const TagSelect: FC<TagSelectProps> = (props) => {

  const { data, parents = [], multiple = false, selected, title, onChange } = props

  const [selectedTags, setSelectedTags] = useState<DataProps[]>(selected ?? [])

  const handleOnClick = (tag: string, parent?: string) => {
    let tmpSelectTags = selectedTags
    const findId = selectedTags.findIndex(item => item.value === tag && item.parent === parent)

    if (findId !== -1) {
      const restOfData = tmpSelectTags.filter(item => item !== tmpSelectTags[findId])

      setSelectedTags(restOfData)
      onChange(restOfData)
      return
    }
    if (multiple) {
      tmpSelectTags = [...tmpSelectTags, { value: tag as string, parent: parent }]
    }
    else {
      tmpSelectTags = [{ value: tag as string, parent: parent }]
    }
    setSelectedTags(tmpSelectTags)
    onChange(tmpSelectTags)
    return
  }

  useEffect(() => {
    if (typeof selected !== 'undefined') {
      setSelectedTags(selected)
    }
  }, [selected])

  const tags: JSX.Element[] = []

  data.map((val, index) => {

    const parentGroup = val.parent ?? undefined

    tags.push(
      <Button
        key={`_tag_${index}`}
        onClick={() => handleOnClick(val.value, val.parent)}
        disabled={parents.length && !parents.includes(parentGroup ?? '') ? true : false}
        dimension='tiny'
        bordered={!selectedTags.find(item => item.value === val.value)}
        rounded='full'
        type='button'
        className={parentGroup}
      >
        {val.value} {parentGroup}
      </Button >
    )
  })

  return (
    <Fragment>
      <div className='max-w-full space-y-2'>
        <label className='text-sm font-semibold'>{title}</label>
        <div className='flex flex-wrap gap-2 max-h-44 overflow-y-auto bg-slate-50 p-4'>
          {tags}
        </div>
      </div>
    </Fragment >
  )
}

export default TagSelect
