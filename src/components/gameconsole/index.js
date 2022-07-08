import { Button, Input, Popover, Table } from 'antd'
import QueryString from 'qs'
import React, { useState } from 'react'
import { Link, useHistory, useLocation } from 'react-router-dom'
import { GAMECONSOLE, GAMECONSOLE_CREATE, GAMECONSOLE_DETAIL, GAMECONSOLE_UPDATE } from '../../config/path'
import useGameConsoleQuery from '../../hooks/useGameConsoleQuery'
import PrivateLayout from '../../layout/PrivateLayout'
import { BsThreeDots } from 'react-icons/bs'
import { useQueryClient } from 'react-query'
import '../../style/GameConsole.css'
import { AiFillDelete } from 'react-icons/ai'
import { MdUpdate } from 'react-icons/md'
import ErrorPage from '../error'
import { postAxios } from '../../Http'
import { API_CONSOLE_DELETE } from '../../config/endpointAPi'
import { bindParams } from '../../config/function'
import { toast } from 'react-toastify'
import CustomModal from '../../common/CustomModal'
import { ModalDeleteItem } from '../../widgets/ModalDeleteItem'

const { Search } = Input
const GameConsole = () => {
  const location = useLocation()
  const history = useHistory()
  const queryClient = useQueryClient()
  const [isOpen, setIsOpen] = useState(false)
  const [isOpenPopover, setIsPopover] = useState(false)
  const searchUrl = QueryString.parse(location.search.substr(1))
  const [idDelete, setIdDelete] = useState(0)
  const [limit] = useState(searchUrl?.limit || 10)
  const [keyword] = useState(searchUrl?.keyword || '')
  const [page] = useState(searchUrl?.page || 1)

  const { data: gameconsole, isError, isLoading, isFetching } = useGameConsoleQuery([limit, keyword, page])
  const data = gameconsole?.data || []
  console.log(data)

  const onCell = (record) => {
    return {
      onClick: () => {
        history.push(bindParams(GAMECONSOLE_DETAIL, { id: record.id }))
      },
    }
  }

  const column = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      onCell,
    },
    {
      title: 'Trade Maker ID',
      dataIndex: 'trademark_id',
      key: 'trademark_id',
      onCell,
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
      onCell,
    },
    {
      title: 'Discount',
      dataIndex: 'discount',
      key: 'discount',
      onCell,
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      onCell,
    },
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      onCell,
    },
    {
      title: 'Viewer',
      dataIndex: 'viewer',
      key: 'viewer',
      onCell,
    },
    {
      title: 'Created at',
      dataIndex: 'created_at',
      key: 'created_at',
      onCell,
    },
    {
      title: '',
      dataIndex: '',
      width: '5%',
      key: 'action',
      render: ({ id }) => {
        const content = (
          <div className="gameconsole-popover">
            <div className="gameconsole-popover__content" onClick={() => onOpenModal(id)}>
              <AiFillDelete />
              <div>Delete</div>
            </div>
            <div className="gameconsole-popover__content" onClick={() => onGoToUpdate(id)}>
              <MdUpdate />
              <div>Update</div>
            </div>
          </div>
        )

        return (
          <Popover placement="bottom" content={content} trigger="click">
            <BsThreeDots className="gameconsole-three__dot" />
          </Popover>
        )
      },
    },
  ]

  const onDelete = () => {
    postAxios(bindParams(API_CONSOLE_DELETE, { id: idDelete }))
      .then((res) => {
        if (res.status === 1) {
          toast.success(res?.message)
          queryClient.invalidateQueries(['gameconsole'])
        }
      })
      .catch((err) => {
        toast.error(err?.message)
      })
      .finally(() => {
        setIsOpen(false)
      })
  }

  const handleVisibleChange = (newVisible) => {
    setIsPopover(newVisible)
  }

  const onGoToUpdate = (id) => {
    history.push(bindParams(GAMECONSOLE_UPDATE, { id }))
  }

  const onSearch = (value) => {
    let params = { page, limit, keyword: value }

    history.push({
      pathname: GAMECONSOLE,
      search: QueryString.stringify(params),
    })
  }

  const onOpenModal = (id) => {
    setIdDelete(id)
    setIsPopover(true)
    setIsOpen(true)
  }

  const onCloseModal = () => {
    setIsOpen(false)
  }

  const onChangePage = (page, limit) => {
    let params = { page, limit }

    history.push({
      pathname: GAMECONSOLE,
      search: QueryString.stringify(params),
    })
  }

  if (isError) return <ErrorPage />

  return (
    <PrivateLayout>
      <div className="gameconsole">
        <Link to={GAMECONSOLE_CREATE} className="advertise__create_btn">
          <Button type="primary">Create Game Console</Button>
        </Link>
        <div className="gameconsole-content">
          <div className="gameconsole-content-title">Table Game Console</div>
          <div className="gameconsole-content-search">
            <Search
              loading={isFetching}
              defaultValue={keyword}
              onSearch={onSearch}
              className="gameconsole-content-search__input"
            />
          </div>
        </div>
        <Table
          className="gameconsole-table"
          dataSource={data}
          columns={column}
          scroll={{
            x: 1100,
          }}
          key="gameconsole"
          loading={isLoading}
          pagination={{
            onChange: onChangePage,
            total: gameconsole?.total,
            showQuickJumper: true,
            showSizeChanger: true,
            pageSizeOptions: [5, 10, 20, 30],
            current: gameconsole?.current_page,
            pageSize: gameconsole?.per_page,
          }}
        />
      </div>
      <CustomModal isOpen={isOpen} onRequestClose={onCloseModal}>
        <ModalDeleteItem title={'Do you want to delete ?'} handleClose={onCloseModal} handleDelete={onDelete} />
      </CustomModal>
    </PrivateLayout>
  )
}

export default GameConsole
