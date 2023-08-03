/* eslint-disable react/display-name */

import React, { FC, Fragment, TableHTMLAttributes, memo, useEffect, useState } from 'react'
import { Pagination } from 'flowbite-react'
import { th as thVariant, td as tdVariant, trBody as trBodyVariant } from './tabel.variant'
import Skeleton from 'react-loading-skeleton'
import styles from './table.module.scss'

type THeadProps = {
    title: string;
    className?: string;
}

type DataProps = {
    value: string | JSX.Element;
    possition?: 'left' | 'right' | 'center';
    className?: string;
}

type TDataProps = {
    trClassName?: string;
    onClick?: () => void;
    data: DataProps[];
}

export type TableProps = TableHTMLAttributes<HTMLTableElement> & {
    thead: THeadProps[];
    data: TDataProps[];
    currentPage: number;
    count: number;
    limit: number;
    isLoading: boolean;
    onPageChange: (page: number) => void;
}

const Table: FC<TableProps> = (props) => {

    const { thead, data, currentPage, count, limit, isLoading, onPageChange } = props

    const [stateRender, setStateRender] = useState<'LOADING' | 'CONTENT' | 'NO_CONTENT'>()

    useEffect(() => {
        if (isLoading) return setStateRender('LOADING')
        if (data.length > 0) return setStateRender('CONTENT')
        return setStateRender('NO_CONTENT')
    }, [isLoading, data])

    return (
        <Fragment>
            <div>
                <table className={styles.table}>
                    <TableTitle thead={thead} />
                    {{
                        'LOADING': <TableLoading thead={thead} />,
                        'CONTENT': <TableContent data={data} />,
                        'NO_CONTENT': <TableNoContent thead={thead} />,
                    }[stateRender ?? 'LOADING']}
                </table>
                {{
                    'LOADING': <PaginationSkeleton />,
                    'CONTENT': <PaginationContent
                        currentPage={currentPage}
                        count={count}
                        isLoading={isLoading}
                        limit={limit}
                        onPageChange={onPageChange} />,
                }[stateRender as 'LOADING' | 'CONTENT' ?? 'LOADING']}
            </div>
        </Fragment >
    )
}

type ThTableProps = {
    thead: TableProps['thead'],
}

const TableTitle = memo(({ thead }: ThTableProps) => {
    const th: JSX.Element[] = []

    thead.map((value, i) => th.push(<th key={`_th_${i}`} scope='col' className={thVariant({ className: value.className })}>{value.title}</th >))
    return (<thead><tr className={styles.border_b}>{th}</tr></thead>)
})

const TableLoading = memo(({ thead }: ThTableProps) => {
    const randomWidth = [85, 90, 100, 100]
    const trBody: JSX.Element[] = [];

    [...new Array(10)].map((val) => {
        const td: JSX.Element[] = []

        thead.map(() => {
            const randomIndex = Math.floor(Math.random() * 5)

            td.push(<td key={`_td_${val}`} className={tdVariant({ position: 'left', className: styles.td_loading })}><Skeleton height={24} width={`${randomWidth[randomIndex]}%`} /></td>)
        })
        trBody.push(<tr key={`_trbody_${val}`} className={trBodyVariant()}>{td}</tr>)
    })
    return <tbody>{trBody}</tbody>
})

type TableContentProps = {
    data: TDataProps[]
}

const TableContent = memo(({ data = [] }: TableContentProps) => {
    const trBody: JSX.Element[] = []

    data.map((val, ind) => {
        const td: JSX.Element[] = []

        val.data.map((val, index) => td.push(<td key={`_td_${index}`} className={tdVariant({ position: val.possition as 'center' | 'left' | 'right' | null | undefined, className: val.className as string | undefined })}>{val.value}</td>))
        if (td.length > 0) trBody.push(<tr key={`_trbody_${ind}`} className={trBodyVariant({ className: val.trClassName })} onClick={val.onClick}>{td}</tr>)
    })
    return <tbody>{trBody}</tbody>
})

const TableNoContent: FC<ThTableProps> = ({ thead }) => {
    return (
        <tbody className={styles.not_found}>
            <tr>
                <td colSpan={thead.length}>
                    <div className={styles.not_found_wrapper}>
                        <div className={styles.wording}>
                            <p>NOT FOUND</p>
                            <span>there are no data entries</span>
                        </div>
                    </div>
                </td>
            </tr>
        </tbody>
    )
}

const PaginationSkeleton = () => {
    return (
        <ul className={styles.pagination}>
            <li className={styles.text_right}><Skeleton width={120} /></li>
            <li><Skeleton width={240} height={32} /></li>
        </ul>
    )
}

type PaginationContentProps = Pick<TableProps, 'currentPage' | 'limit' | 'count' | 'onPageChange' | 'isLoading'>

const PaginationContent = memo((props: PaginationContentProps) => {

    const { currentPage, limit, count, isLoading, onPageChange } = props

    const dataShowed = (currentPage - 1) * limit + 1
    const endData = Math.min(currentPage * limit, count)
    const totalPage = Math.ceil(count / limit)

    return (
        <ul className={styles.pagination}>
            <li>
                <span>Showing {dataShowed} to {endData} of {count} Entries data</span>
            </li>
            {
                count > limit && !isLoading && (
                    <li>
                        <Pagination
                            className={styles.pagination_item}
                            currentPage={currentPage}
                            onPageChange={onPageChange}
                            showIcons
                            totalPages={totalPage}
                            nextLabel=''
                            previousLabel=''
                        />
                    </li>
                )
            }
        </ul>
    )
})

export default Table
