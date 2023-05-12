import './index.css'

const MoneyDetails = props => {
  const {eachDetail} = props
  const {
    imgUrl,
    altText,
    displayText,
    balance,
    backgroundColor,
    borderColor,
    amount,
  } = eachDetail

  return (
    <>
      <li>
        <div
          className="money-details-item-container"
          style={{
            backgroundColor: `${backgroundColor}`,
            borderColor: `${borderColor}`,
          }}
        >
          <div className="img-container">
            <img className="img" src={imgUrl} alt={altText} />
          </div>
          <div className="details-container">
            <p className="top-name">{displayText}</p>
            <p className="money" data-testid={amount}>
              Rs {balance}
            </p>
          </div>
        </div>
      </li>
    </>
  )
}

export default MoneyDetails
