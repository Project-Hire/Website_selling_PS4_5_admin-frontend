import React from 'react'
import { useLocation } from 'react-router-dom'
import useGiftCardDetailQuery from '../../hooks/useGiftCardDetailQuery'
import PrivateLayout from '../../layout/PrivateLayout'
import '../../style/GiftCard.css'
const GiftCardDetail = () => {
  const location = useLocation()
  const id_giftcard = location.pathname.split('/')[4]
  const { data: giftcard } = useGiftCardDetailQuery(id_giftcard)
  console.log(id_giftcard)

  return (
    <PrivateLayout>
      <div className="giftcard-detail">
        <div className="giftcard-detail__title">{giftcard?.name}</div>

        <div className="giftcard-detail__container">
          <div className="giftcard-detail__image">
            <img src={giftcard?.image} alt={giftcard} />
          </div>
          <div className="giftcard-detail__info">
            <div className="giftcard-detail__content">Number of products : {giftcard?.quantity}</div>
            <div className="giftcard-detail__content">Price : {giftcard?.price}</div>

            <div className="giftcard-detail__content">Label : {giftcard?.trademark_id}</div>

            <div className="giftcard-detail__content">Discount : {giftcard?.discount} %</div>

            <div className="giftcard-detail__content">Viewer : {giftcard?.viewer}</div>
          </div>
        </div>
      </div>
    </PrivateLayout>
  )
}

export default GiftCardDetail
