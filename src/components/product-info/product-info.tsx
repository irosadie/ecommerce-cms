import React, { FC } from 'react'
import { Badge } from '$/components/badge'
import Image from 'next/image'

export type ProductInfoProps = {
  image: string;
  title: string;
  brand: string;
  category: string;
}

const ProductInfo: FC<ProductInfoProps> = (props) => {

  const { image, title, brand, category } = props

  return (
    <div className='pr-2'>
      <div className='flex gap-x-5'>
        <div className='min-w-[80px] w-[84px] h-20 bg-white shadow border-t border-gray-50 rounded-md'>
          <Image src={image} width={100} height={100} className='object-contain w-full h-full rounded-md' alt={title} />
        </div>
        <div className='block'>
          <h3 className='font-semibold'>{title}</h3>
          <ul className='mt-1 space-y-0.5'>
            <li className='text-xs'>{category}</li>
            <li><Badge>{brand}</Badge></li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default ProductInfo
