import { Button, Input, Popover, Table } from 'antd'
import QueryString from 'qs'
import React, { useState } from 'react'
import { Link, useHistory, useLocation } from 'react-router-dom'
import { ADVERTISEMENT, ADVERTISEMENT_CREATE } from '../../config/path'
import useAdvertisementQuery from '../../hooks/useAdvertismentQuery'
import PrivateLayout from '../../layout/PrivateLayout'
import { BsThreeDots } from 'react-icons/bs'
import { useQueryClient } from 'react-query'
import '../../style/Advertisement.css'
import { AiFillDelete } from 'react-icons/ai'
import { MdUpdate } from 'react-icons/md'
import ErrorPage from '../error'
import { postAxios } from '../../Http'
import { API_ADVERTISEMENT_DELETE } from '../../config/endpointAPi'
import { bindParams } from '../../config/function'
import { toast } from 'react-toastify'

const { Search } = Input
const Advertisement = () => {
  const location = useLocation()
  const history = useHistory()
  const queryClient = useQueryClient()
  const searchUrl = QueryString.parse(location.search.substr(1))
  const [limit] = useState(searchUrl?.limit || 10)
  const [keyword] = useState(searchUrl?.keyword || '')
  const [page] = useState(searchUrl?.page || 1)

  const { data: advertise, isError, isLoading, isFetching } = useAdvertisementQuery([limit, keyword, page])
  const data = advertise?.data || []

  const column = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
    },
    {
      title: 'Created at',
      dataIndex: 'created_at',
      key: 'created_at',
    },
    {
      title: '',
      dataIndex: '',
      width: '5%',
      key: 'action',
      render: ({ id }) => {
        const content = (
          <div className="advertise-popover">
            <div className="advertise-popover__content" onClick={() => onDelete(id)}>
              <AiFillDelete />
              <div>Delete</div>
            </div>
            <div className="advertise-popover__content">
              <MdUpdate />
              <div>Update</div>
            </div>
          </div>
        )

        return (
          <Popover placement="bottom" content={content} trigger="click">
            <BsThreeDots className="advertise-three__dot" />
          </Popover>
        )
      },
    },
  ]

  const onDelete = (id) => {
    postAxios(bindParams(API_ADVERTISEMENT_DELETE, { id }))
      .then((res) => {
        if (res.status === 1) {
          toast.success(res?.message)
          queryClient.invalidateQueries(['advertisement'])
        }
      })
      .catch((err) => {
        toast.error(err?.message)
      })
  }

  const onSearch = (value) => {
    let params = { page, limit, keyword: value }

    history.push({
      pathname: ADVERTISEMENT,
      search: QueryString.stringify(params),
    })
  }

  const onChangePage = (page, limit) => {
    let params = { page, limit }

    history.push({
      pathname: ADVERTISEMENT,
      search: QueryString.stringify(params),
    })
  }

  if (isError) return <ErrorPage />

  return (
    <PrivateLayout>
      <div className="advertise">
        <Link to={ADVERTISEMENT_CREATE} className="advertise__create_btn">
          <Button type="primary">Create Advertisement</Button>
        </Link>
        <div className="advertise-content">
          <div className="advertise-content-title">Table Advertisement</div>
          <div className="advertise-content-search">
            <Search
              loading={isFetching}
              defaultValue={keyword}
              onSearch={onSearch}
              className="advertise-content-search__input"
            />
          </div>
        </div>
        <Table
          dataSource={data}
          columns={column}
          scroll={{
            x: 1100,
          }}
          key="advertise"
          loading={isLoading}
          pagination={{
            onChange: onChangePage,
            total: advertise?.total,
            showQuickJumper: true,
            showSizeChanger: true,
            pageSizeOptions: [5, 10, 20, 30],
            current: advertise?.current_page,
            pageSize: advertise?.per_page,
          }}
        />
      </div>
    </PrivateLayout>
  )
}

export default Advertisement
