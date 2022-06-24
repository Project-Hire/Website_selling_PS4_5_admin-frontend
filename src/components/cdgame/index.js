import { Button, Input, Popover, Table } from 'antd'
import QueryString from 'qs'
import React, { useState } from 'react'
import { Link, useHistory, useLocation } from 'react-router-dom'
import { CDGAME, CDGAME_CREATE } from '../../config/path'
import useCDGameQuery from '../../hooks/useCDGameQuery'
import PrivateLayout from '../../layout/PrivateLayout'
import { BsThreeDots } from 'react-icons/bs'
import { useQueryClient } from 'react-query'
import '../../style/CDGame.css'
import { AiFillDelete } from 'react-icons/ai'
import { MdUpdate } from 'react-icons/md'
import ErrorPage from '../error'
import { postAxios } from '../../Http'
import { API_CDGAME_DELETE } from '../../config/endpointAPi'
import { bindParams } from '../../config/function'
import { toast } from 'react-toastify'


const { Search } = Input
const CDGame = () => {
  const location = useLocation()
  const history = useHistory()
  const queryClient = useQueryClient()
  const searchUrl = QueryString.parse(location.search.substr(1))
  const [limit] = useState(searchUrl?.limit || 10)
  const [keyword] = useState(searchUrl?.keyword || '')
  const [page] = useState(searchUrl?.page || 1)

  const { data: cdgame, isError, isLoading, isFetching } = useCDGameQuery([limit, keyword, page])
  const data = cdgame?.data || []

  const column = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Trade Maker ID',
      dataIndex: 'trademark_id',
      key: 'trademark_id',
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
    },
    {
      title: 'Discount',
      dataIndex: 'discount',
      key: 'discount',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
    },
    {
      title: 'Viewer',
      dataIndex: 'viewer',
      key: 'viewer',
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
          <div className="cdgame-popover">
            <div className="cdgame-popover__content" onClick={() => onDelete(id)}>
              <AiFillDelete />
              <div>Delete</div>
            </div>
            <div className="cdgame-popover__content">
              <MdUpdate />
              <div>Update</div>
            </div>
          </div>
        )

        return (
          <Popover placement="bottom" content={content} trigger="click">
            <BsThreeDots className="cdgame-three__dot" />
          </Popover>
        )
      },
    },
  ]

  const onDelete = (id) => {
    postAxios(bindParams(API_CDGAME_DELETE, { id }))
      .then((res) => {
        if (res.status === 1) {
          toast.success(res?.message)
          queryClient.invalidateQueries(['cdgame'])
        }
      })
      .catch((err) => {
        toast.error(err?.message)
      })
  }

  const onSearch = (value) => {
    let params = { page, limit, keyword: value }

    history.push({
      pathname: CDGAME,
      search: QueryString.stringify(params),
    })
  }

  const onChangePage = (page, limit) => {
    let params = { page, limit }

    history.push({
      pathname: CDGAME,
      search: QueryString.stringify(params),
    })
  }

//   if (isError) return <ErrorPage />

  return (
    <PrivateLayout>
      <div className="cdgame">
        <Link to={CDGAME_CREATE} className="cdgame__create_btn">
          <Button type="primary">Create CD_Game</Button>
        </Link>
        <div className="cdgame-content">
          <div className="cdgame-content-title">Table CD_Games</div>
          <div className="cdgame-content-search">
            <Search
              loading={isFetching}
              defaultValue={keyword}
              onSearch={onSearch}
              className="cdgame-content-search__input"
            />
          </div>
        </div>
        <Table
          dataSource={data}
          columns={column}
          scroll={{
            x: 1100,
          }}
          key="cdgame"
          loading={isLoading}
          pagination={{
            onChange: onChangePage,
            total: cdgame?.total,
            showQuickJumper: true,
            showSizeChanger: true,
            pageSizeOptions: [5, 10, 20, 30],
            current: cdgame?.current_page,
            pageSize: cdgame?.per_page,
          }}
        />
      </div>
    </PrivateLayout>
  )
}

export default CDGame
