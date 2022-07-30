import React from 'react'
import { useLocation } from 'react-router-dom'
import useAccessoryDetailQuery from '../../hooks/useAccessoryDetailQuery'
import PrivateLayout from '../../layout/PrivateLayout'
import '../../style/Accessory.css'
const AccessoryDetail = () => {
  const location = useLocation()
  const id_accessory = location.pathname.split('/')[4]
  const { data: accessory } = useAccessoryDetailQuery(id_accessory)
  console.log(id_accessory)

  return (
    <PrivateLayout>
      <div className="accessory-detail">
        <div className="accessory-detail__title">{accessory?.name}</div>

        <div className="accessory-detail__container">
          <div className="accessory-detail__image">
            <img src={accessory?.image} alt={accessory} />
          </div>
          <div className="accessory-detail__info">
            <div className="accessory-detail__content">Number of products : {accessory?.quantity}</div>
            <div className="accessory-detail__content">Price : {accessory?.price}</div>

            <div className="accessory-detail__content">Label : {accessory?.trademark_id}</div>

            <div className="accessory-detail__content">Discount : {accessory?.discount} %</div>

            <div className="accessory-detail__content">Viewer : {accessory?.viewer}</div>
          </div>
        </div>
      </div>
    </PrivateLayout>
  )
}

export default AccessoryDetail
