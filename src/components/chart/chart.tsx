import React, { FC, Fragment, HTMLAttributes } from 'react'
import { Pagination } from 'flowbite-react'
import { Bar } from 'react-chartjs-2'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title as TitleChart,
    Tooltip,
    Legend,
} from 'chart.js'

type DataSetProps = {
    label: string,
    data: number[],
    backgroundColor: string,
}

export type ChartProps = HTMLAttributes<HTMLElement> & {
    title: string;
    labels: string[];
    dataSets: DataSetProps[],
    currentPage: number;
    count: number;
    limit: number;
    isLoading: boolean;
    onPageChange: (page: number) => void;
}

const Chart: FC<ChartProps> = (props) => {

    const { title: text, currentPage, count, limit, isLoading, labels = [], dataSets: datasets = [], onPageChange } = props

    const dataShowed = (currentPage - 1) * limit + 1
    const endData = Math.min(currentPage * limit, count)
    const totalPage = Math.ceil(count / limit)

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: true,
                text,
            },
        },
    }

    ChartJS.register(
        CategoryScale,
        LinearScale,
        BarElement,
        TitleChart,
        Tooltip,
        Legend
    )

    return (
        <Fragment>
            <div className='space-y-4'>
                <div>
                    <Bar options={options} data={{ labels, datasets }} />
                </div>
                <div className='flex justify-end'>
                    <ul className='space-y-2'>
                        <li>
                            <span className=' text-gray-600 text-sm justify-end flex'>Showing {dataShowed} to {endData} of {count} Entries data</span>
                        </li>
                        {
                            count > limit && !isLoading && (
                                <li>
                                    <Pagination
                                        className='justify-end flex'
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
                </div>
            </div>
        </Fragment >
    )
}

export default Chart
