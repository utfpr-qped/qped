import './index.css'

const SummaryCard = ({ info }) => {
  return (
    <div className="SummaryCard">
      <div className="heading">{info.title}</div>
      <div className="description">{info.desc}</div>
    </div>
  )
}

export default SummaryCard;
