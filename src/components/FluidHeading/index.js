import './index.css'

const FluidHeading = ({ title }) => {
  return (
    <div className="FluidHeading container-fluid">
      <div className="row">
        <div className="col-md-10 col-xl-8 col-xxl-6 mx-auto">
          <h1 className="h2 mb-0">{title}</h1>
        </div>
      </div>
    </div>
  )
}

export default FluidHeading
