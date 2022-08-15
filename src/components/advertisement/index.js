import { Button, Input, Popover, Table } from 'antd'
import QueryString from 'qs'
import React, { useState } from 'react'
import { Link, useHistory, useLocation } from 'react-router-dom'
import { ADVERTISEMENT, ADVERTISEMENT_CREATE, ADVERTISEMENT_DETAIL, ADVERTISEMENT_UPDATE } from '../../config/path'
import useAdvertisementQuery from '../../hooks/useAdvertisementQuery'
import PrivateLayout from '../../layout/PrivateLayout'
import { useQueryClient } from 'react-query'
import '../../style/Advertisement.css'
import { BsThreeDots } from 'react-icons/bs'
import { AiFillDelete } from 'react-icons/ai'
import { MdUpdate } from 'react-icons/md'
import ErrorPage from '../error'
import { postAxios } from '../../Http'
import { API_ADVERTISEMENT_DELETE } from '../../config/endpointAPi'
import { bindParams } from '../../config/function'
import { toast } from 'react-toastify'
import CustomModal from '../../common/CustomModal'
import { ModalDeleteItem } from '../../widgets/ModalDeleteItem'

const { Search } = Input
const Advertisement = () => {
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

  const { data: advertise, isError, isLoading, isFetching } = useAdvertisementQuery([limit, keyword, page])
  const data = advertise?.data || []
  console.log(data)

  const onCell = (record) => {
    return {
      onClick: () => {
        history.push(bindParams(ADVERTISEMENT_DETAIL, { id: record.id }))
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
      title: 'Image',
      key: 'image',
      render: (advertise)=>{
        return(
          <div className='advertise-list__img'>
            <img src={advertise.image} />
          </div>
        )
      },
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
          <div className="advertise-popover">
            <div className="advertise-popover__content" onClick={() => onOpenModal(id)}>
              <AiFillDelete />
              <div>Delete</div>
            </div>
            <div className="advertise-popover__content" onClick={() => onGoToUpdate(id)}>
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

  const onDelete = () => {
    postAxios(bindParams(API_ADVERTISEMENT_DELETE, { id: idDelete }))
      .then((res) => {
        if (res.status === 1) {
          toast.success(res?.message)
          queryClient.invalidateQueries(['advertisement'])
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
    history.push(bindParams(ADVERTISEMENT_UPDATE, { id }))
  }

  const onSearch = (value) => {
    let params = { page, limit, keyword: value }

    history.push({
      pathname: ADVERTISEMENT,
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
          className="advertise-table"
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
      <CustomModal isOpen={isOpen} onRequestClose={onCloseModal}>
        <ModalDeleteItem title={'Do you want to delete ?'} handleClose={onCloseModal} handleDelete={onDelete} />
      </CustomModal>
    </PrivateLayout>
  )
}

export default Advertisement
