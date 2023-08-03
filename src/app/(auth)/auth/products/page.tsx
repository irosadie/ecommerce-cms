/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import React, { useEffect, useState } from 'react'
import { useCategory } from '$/hooks/use-category'
import { useProduct } from '$/hooks/use-product'
import { useBrand } from '$/hooks/use-brand'
import { useFormik } from 'formik'
import { TableProps } from '$/components/table'
import { ChartProps } from '$/components/chart'
import { TagSelectProps } from '$/components/tag-select'
import { PageInfo } from '$/components/page-info'
import { Wrapper } from '$/components/wrapper'
import { Container } from '$/components/container'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { ContentSection } from '$/sections/products/content'
import { FilterProduct } from '$/sections/products/filter'
import { afterDiscount, currencyFormat } from '$/utils'
import { ProductInfo } from '$/components/product-info'
import { PriceInfo } from '$/components/price-info'
import { AlertSection } from '$/sections/products/alert'

const THEAD = [
  {
    title: 'ID',
  },
  {
    title: 'Product',
  },
  {
    title: 'Description',
  },
  {
    title: 'Price',
  },
  {
    title: 'Discount',
    className: 'flex-1 text-right',
  }
]

type DataChartProps = {
  labels: ChartProps['labels'];
  dataSets: ChartProps['dataSets'];
}

const ProductPage = () => {

  const searchParams = useSearchParams()
  const router = useRouter()
  const path = usePathname()

  const page = searchParams?.get('page')
  const query = searchParams?.get('q')
  const fBrands = searchParams?.get('brands')
  const fCategory = searchParams?.get('category')
  const fPriceRange = searchParams?.get('prices')

  const [isShowFilter, setIsShowFilter] = useState(false)
  const [isFiltered, setIsFiltered] = useState(false)
  const [dataTabel, setDataTabel] = useState<TableProps['data']>()
  const [dataChart, setDataChart] = useState<DataChartProps>()
  const [isShowAlert, setIsShowAlert] = useState(true)

  const {
    page: currentPage,
    data: products,
    isLoading,
    count,
    limit,
    fetchPage,
  } = useProduct({
    initialPage: Number(page ?? 1),
    initialQuery: query ?? undefined
  })
  const { data: brands } = useBrand()
  const { data: categories } = useCategory()

  const formSearch = useFormik({
    initialValues: { q: '' },
    onSubmit: ({ q }) => {
      const params = new URLSearchParams(searchParams?.toString())

      params.set('q', q)
      params.delete('page')
      router.replace(`${path}?${params}`)
    }
  })

  type FilterFormProps = {
    category: TagSelectProps['data'],
    brands: TagSelectProps['data'],
    priceMin: string,
    priceMax: string
  }

  const formFilter = useFormik<FilterFormProps>({
    initialValues: { category: [], brands: [], priceMin: '', priceMax: '' },
    onSubmit: ({ category, brands, priceMin, priceMax }) => {

      setIsShowFilter(false)
      const params = new URLSearchParams({
        category: category && category.length ? category[0].value : '',
        brands: brands && brands.length ? brands.map(item => item.value).join(',') : '',
        prices: parseFloat(priceMin) >= 0 && parseFloat(priceMax) > parseFloat(priceMin) ? `${priceMin},${priceMax}` : '',
      })

      router.replace(`${path}?${params}`)
    },
    onReset: () => {
      setIsShowFilter(false)
      router.replace(`${path}`)
    }
  })

  useEffect(() => {

    setIsFiltered(false)
    if (fBrands || fCategory || fPriceRange) {
      let priceMin = '', priceMax = ''
      const splitPrice = fPriceRange?.split(',') ?? []

      if (splitPrice.length && !isNaN(parseFloat(splitPrice[0])) && !isNaN(parseFloat(splitPrice[1]))) {
        priceMin = `${parseFloat(splitPrice[0])}`
        priceMax = `${parseFloat(splitPrice[1])}`
      }

      formFilter.setValues({
        category: fCategory ? [{ value: fCategory, parent: undefined }] : [],
        brands: fBrands && fCategory ? fBrands.split(',').map(item => ({ value: item, parent: fCategory })) : [],
        priceMin: priceMin,
        priceMax: priceMax
      })
      setIsFiltered(true)
    }

    fetchPage({
      page: Number(page),
      query: query ?? '',
      brands: fBrands ?? '',
      category: fCategory ?? undefined,
      prices: fPriceRange ?? undefined,
    })

  }, [page, query, fBrands, fCategory, fPriceRange])

  useEffect(() => {
    if (products) {
      setDataTabel([])
      const tData: TableProps['data'] = []

      products.map((val) => {
        tData.push({
          data: [
            {
              possition: 'left',
              value: `#${val.id}`,
            },
            {
              possition: 'left',
              value: (
                <ProductInfo
                  brand={val.brand}
                  title={val.title}
                  image={val.images[0]}
                  category={val.category}
                />
              ),
            },
            {
              possition: 'left',
              value: `${val.description}`,
            },
            {
              possition: 'left',
              className: 'font-medium',
              value: <PriceInfo
                realPrice={currencyFormat({ amount: afterDiscount(val.price, val.discountPercentage), prefix: '$' })}
                priceCrossedOut={currencyFormat({ amount: val.price, prefix: '$' })}
              />,
            },
            {
              possition: 'right',
              value: `${val.discountPercentage}% `,
            }
          ]
        })
      })

      const labels = products.map(item => `${item.title} (${item.category})`)
      const dataSets: ChartProps['dataSets'] = [
        {
          label: 'stock',
          backgroundColor: '#4ac3be',
          data: products.map(item => item.stock ?? 0)
        }
      ]

      setDataTabel(tData)
      setDataChart({ labels, dataSets })
    }
  }, [products])

  const handlePageChanged = (page: number) => {
    const params = new URLSearchParams(searchParams?.toString())

    params.set('page', String(page))
    router.replace(`${path}?${params}`)
  }

  const handleCategoryOnChange = (data: TagSelectProps['data']) => {
    formFilter.setFieldValue('category', data)

    if (data[0]) {
      const element = document.querySelector(`.${data[0].value}`)

      if (element) element.scrollIntoView({ behavior: 'smooth' })
    }

    formFilter.setFieldValue('brands', [])
  }

  const handleBrandsOnChange = (data: TagSelectProps['data']) => {
    if (formFilter.values.category.length <= 0) {
      formFilter.setFieldValue('category', [{ value: data[data.length - 1].parent }])
    }
    formFilter.setFieldValue('brands', data)
  }

  const handleOnRemoveButton = () => {
    formSearch.setFieldValue('q', '')
    if (formSearch.touched.q) {
      formSearch.handleSubmit()
    }
  }

  return (
    <Container>
      <Wrapper>
        <PageInfo
          title='Product List'
          breadcrumb={[{ title: 'Home' }, { title: 'Product List' }]}
        />

        {
          isShowAlert && (
            <AlertSection
              onDismiss={() => setIsShowAlert(v => !v)}
            />
          )
        }

        <ContentSection
          filterButtonProps={{
            onClick: () => setIsShowFilter(v => !v),
            bordered: !isFiltered,
            iconColor: isFiltered ? '#FFF' : '#4AC3BE'
          }}
          searchProps={{
            formProps: {
              onSubmit: formSearch.handleSubmit,
            },
            textInputProps: {
              placeholder: 'find on title or desc (type and enter)',
              name: 'q',
              type: 'text',
              value: formSearch.values.q,
              removeButton: true,
              onBlur: () => formSearch.handleSubmit(),
              onChange: formSearch.handleChange,
              onRemoveButton: handleOnRemoveButton
            }
          }}
          tableProps={{
            thead: THEAD,
            data: (dataTabel || []),
            count: count,
            currentPage: currentPage,
            limit: limit,
            isLoading: isLoading,
            onPageChange: handlePageChanged,
          }}
          chartProps={{
            title: 'Chart of Stock',
            labels: (dataChart?.labels || []),
            dataSets: (dataChart?.dataSets || []),
            count: count,
            currentPage: currentPage,
            limit: limit,
            isLoading: isLoading,
            onPageChange: handlePageChanged,
          }}
        />
        {JSON.stringify(formSearch.touched.q ? true : false)}
        <FilterProduct
          isShow={isShowFilter}
          onClose={() => setIsShowFilter(v => !v)}
          formProps={{
            onSubmit: formFilter.handleSubmit,
            onReset: formFilter.handleReset
          }}
          tagSelectProps={{
            category: {
              title: 'Categories',
              data: (categories?.map(item => ({ value: item })) ?? []),
              selected: formFilter.values.category,
              onChange: handleCategoryOnChange,
            },
            brands: {
              title: 'Brands',
              multiple: true,
              parents: formFilter.values.category.map(item => item.value),
              data: (brands?.map(item => ({ value: item.title, parent: item.category })) ?? []),
              selected: !formFilter.values.brands.length ? [] : formFilter.values.brands,
              onChange: handleBrandsOnChange
            }
          }}
          textInputProps={{
            priceMin: {
              name: 'priceMin',
              value: formFilter.values.priceMin,
              placeholder: '$1',
              currencyFormat: true,
              currencyPrefix: '$',
              currencyDecode: true,
              onChange: formFilter.handleChange,
            },
            priceMax: {
              name: 'priceMax',
              value: formFilter.values.priceMax,
              placeholder: '$100',
              currencyFormat: true,
              currencyPrefix: '$',
              currencyDecode: true,
              onChange: formFilter.handleChange,
            }
          }}
          buttonProps={{
            submit: {
              disabled: !formFilter.dirty
            },
            reset: {
              disabled: !formFilter.dirty
            }
          }}
        />
      </Wrapper>
    </Container >
  )
}

export default ProductPage
