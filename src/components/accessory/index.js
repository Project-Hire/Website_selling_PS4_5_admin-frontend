import { Button, Input, Popover, Table } from 'antd'
import QueryString from 'qs'
import React, { useState } from 'react'
import { Link, useHistory, useLocation } from 'react-router-dom'
import { ACCESSORY, ACCESSORY_CREATE, ACCESSORY_DETAIL, ACCESSORY_UPDATE } from '../../config/path'
import useAccessoryQuery from '../../hooks/useAccessoryQuery'
import PrivateLayout from '../../layout/PrivateLayout'
import { BsThreeDots } from 'react-icons/bs'
import { useQueryClient } from 'react-query'
import '../../style/Accessory.css'
import { AiFillDelete } from 'react-icons/ai'
import { MdUpdate } from 'react-icons/md'
import ErrorPage from '../error'
import { postAxios } from '../../Http'
import { API_ACCESSORY_DELETE } from '../../config/endpointAPi'
import { bindParams } from '../../config/function'
import { toast } from 'react-toastify'
import CustomModal from '../../common/CustomModal'
import { ModalDeleteItem } from '../../widgets/ModalDeleteItem'

const { Search } = Input
const Accessory = () => {
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

  const { data: accessory, isError, isLoading, isFetching } = useAccessoryQuery([limit, keyword, page])
  const data = accessory?.data || []
  console.log(accessory)

  const onCell = (record) => {
    return {
      onClick: () => {
        history.push(bindParams(ACCESSORY_DETAIL, { id: record.id }))
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
      title: 'Trade Mark',
      key: 'trademark_id',
      render: (accessory) => {
        return <>{accessory?.trademark?.name}</>
      },
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
      key: 'image',
      render: (accessory) => {
        return (
          <div className="accessory-list__img">
            <img src={accessory.image} />
          </div>
        )
      },

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
          <div className="accessory-popover">
            <div className="accessory-popover__content" onClick={() => onOpenModal(id)}>
              <AiFillDelete />
              <div>Delete</div>
            </div>
            <div className="accessory-popover__content" onClick={() => onGoToUpdate(id)}>
              <MdUpdate />
              <div>Update</div>
            </div>
          </div>
        )

        return (
          <Popover placement="bottom" content={content} trigger="click">
            <BsThreeDots className="accessory-three__dot" />
          </Popover>
        )
      },
    },
  ]

  const onDelete = (id) => {
    postAxios(bindParams(API_ACCESSORY_DELETE, { id: idDelete }))
      .then((res) => {
        if (res.status === 1) {
          toast.success(res?.message)
          queryClient.invalidateQueries(['accessory'])
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
    history.push(bindParams(ACCESSORY_UPDATE, { id }))
  }
  const onSearch = (value) => {
    let params = { page, limit, keyword: value }

    history.push({
      pathname: ACCESSORY,
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
      pathname: ACCESSORY,
      search: QueryString.stringify(params),
    })
  }

  //   if (isError) return <ErrorPage />

  return (
    <PrivateLayout>
      <div className="accessory">
        <Link to={ACCESSORY_CREATE} className="accessory__create_btn">
          <Button type="primary">Create Accessory</Button>
        </Link>
        <div className="accessory-content">
          <div className="accessory-content-title">Table Accessories</div>
          <div className="accessory-content-search">
            <Search
              loading={isFetching}
              defaultValue={keyword}
              onSearch={onSearch}
              className="accessory-content-search__input"
            />
          </div>
        </div>
        <Table
          dataSource={data}
          columns={column}
          scroll={{
            x: 1100,
          }}
          key="accessory"
          loading={isLoading}
          pagination={{
            onChange: onChangePage,
            total: accessory?.total,
            showQuickJumper: true,
            showSizeChanger: true,
            pageSizeOptions: [5, 10, 20, 30],
            current: accessory?.current_page,
            pageSize: accessory?.per_page,
          }}
        />
      </div>
      <CustomModal isOpen={isOpen} onRequestClose={onCloseModal}>
        <ModalDeleteItem title={'Do you want to delete ?'} handleClose={onCloseModal} handleDelete={onDelete} />
      </CustomModal>
    </PrivateLayout>
  )
}

export default Accessory
