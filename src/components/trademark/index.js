import { Button, Input, Popover, Table } from 'antd'
import QueryString from 'qs'
import React, { useState } from 'react'
import { Link, useHistory, useLocation } from 'react-router-dom'
import { TRADEMARK, TRADEMARK_CREATE, TRADEMARK_DETAIL, TRADEMARK_UPDATE } from '../../config/path'
import useTradeMarkQuery from '../../hooks/useTradeMarkQuery'
import PrivateLayout from '../../layout/PrivateLayout'
import { BsThreeDots } from 'react-icons/bs'
import { useQueryClient } from 'react-query'
import '../../style/TradeMark.css'
import { AiFillDelete } from 'react-icons/ai'
import { MdUpdate } from 'react-icons/md'
import ErrorPage from '../error'
import { postAxios } from '../../Http'
import { API_TRADEMARK_DELETE } from '../../config/endpointAPi'
import { bindParams } from '../../config/function'
import { toast } from 'react-toastify'
import CustomModal from '../../common/CustomModal'
import { ModalDeleteItem } from '../../widgets/ModalDeleteItem'

const { Search } = Input
const TradeMark = () => {
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

  const { data: trademark, isError, isLoading, isFetching } = useTradeMarkQuery([limit, keyword, page])
  const data = trademark?.data || []
  console.log(data)


  const column = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Image',
      key: 'image',
      render: (trademark) => {
        return (
          <div className="trademark-list__img">
            <img src={trademark.image} />
          </div>
        )
      },
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
          <div className="trademark-popover">
            <div className="trademark-popover__content" onClick={() => onOpenModal(id)}>
              <AiFillDelete />
              <div>Delete</div>
            </div>
            <div className="trademark-popover__content" onClick={() => onGoToUpdate(id)}>
              <MdUpdate />
              <div>Update</div>
            </div>
          </div>
        )

        return (
          <Popover placement="bottom" content={content} trigger="click">
            <BsThreeDots className="trademark-three__dot" />
          </Popover>
        )
      },
    },
  ]

  const onDelete = () => {
    postAxios(bindParams(API_TRADEMARK_DELETE, { id: idDelete }))
      .then((res) => {
        if (res.status === 1) {
          toast.success(res?.message)
          queryClient.invalidateQueries(['trademark'])
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
    history.push(bindParams(TRADEMARK_UPDATE, { id }))
  }

  const onSearch = (value) => {
    let params = { page, limit, keyword: value }

    history.push({
      pathname: TRADEMARK,
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
      pathname: TRADEMARK,
      search: QueryString.stringify(params),
    })
  }

  if (isError) return <ErrorPage />

  return (
    <PrivateLayout>
      <div className="trademark">
        <Link to={TRADEMARK_CREATE} className="trademark__create_btn">
          <Button type="primary">Create TradeMark</Button>
        </Link>
        <div className="trademark-content">
          <div className="trademark-content-title">Table TradeMark</div>
          <div className="trademark-content-search">
            <Search
              loading={isFetching}
              defaultValue={keyword}
              onSearch={onSearch}
              className="trademark-content-search__input"
            />
          </div>
        </div>
        <Table
          className="trademark-table"
          dataSource={data}
          columns={column}
          scroll={{
            x: 1100,
          }}
          key="trademark"
          loading={isLoading}
          pagination={{
            onChange: onChangePage,
            total: trademark?.total,
            showQuickJumper: true,
            showSizeChanger: true,
            pageSizeOptions: [5, 10, 20, 30],
            current: trademark?.current_page,
            pageSize: trademark?.per_page,
          }}
        />
      </div>
      <CustomModal isOpen={isOpen} onRequestClose={onCloseModal}>
        <ModalDeleteItem title={'Do you want to delete ?'} handleClose={onCloseModal} handleDelete={onDelete} />
      </CustomModal>
    </PrivateLayout>
  )
}

export default TradeMark
