import React from 'react'
import { useLocation } from 'react-router-dom'
import useGameConsoleDetailQuery from '../../hooks/useGameConsoleDetailQuery'
import PrivateLayout from '../../layout/PrivateLayout'
import '../../style/GameConsole.css'
const GameConsoleDetail = () => {
  const location = useLocation()
  const id_gameconsole = location.pathname.split('/')[4]
  const { data: gameconsole } = useGameConsoleDetailQuery(id_gameconsole)
  console.log(id_gameconsole)

  return (
    <PrivateLayout>
      <div className="gameconsole-detail">
        <div className="gameconsole-detail__title">{gameconsole?.name}</div>

        <div className="gameconsole-detail__container">
          <div className="gameconsole-detail__image">
            <img src={gameconsole?.image} alt={gameconsole} />
          </div>
          <div className="gameconsole-detail__info">
            <div className="gameconsole-detail__content">Number of products : {gameconsole?.quantity}</div>
            <div className="gameconsole-detail__content">Price : {gameconsole?.price}</div>

            <div className="gameconsole-detail__content">Label : {gameconsole?.trademark_id}</div>

            <div className="gameconsole-detail__content">Discount : {gameconsole?.discount} %</div>

            <div className="gameconsole-detail__content">Viewer : {gameconsole?.viewer}</div>
          </div>
        </div>
      </div>
    </PrivateLayout>
  )
}

export default GameConsoleDetail
