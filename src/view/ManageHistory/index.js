import FluidHeading from "../../components/FluidHeading";

import './index.css'

const ManageHistory = () => {
  return (
    <>
      <FluidHeading title={"Início"} />

      <div className="ManageHistory container-fluid">
        <div className="row">
          {/* Section for viewing the event records table */}
          <section className="records-table col-md-10 col-xl-8 col-xxl-6 mx-auto">
            <header>
              <h2 className="h4">Consultar histórico</h2>
              <p className="text-muted mb-0">Importe um arquivo de histórico e visualize abaixo.</p>
              <div className="actions-wrapper">
                <div className="btn btn-dark">
                  <span className="me-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-box-arrow-in-up" viewBox="0 0 16 16">
                      <path fill-rule="evenodd" d="M3.5 10a.5.5 0 0 1-.5-.5v-8a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 0 0 1h2A1.5 1.5 0 0 0 14 9.5v-8A1.5 1.5 0 0 0 12.5 0h-9A1.5 1.5 0 0 0 2 1.5v8A1.5 1.5 0 0 0 3.5 11h2a.5.5 0 0 0 0-1h-2z" />
                      <path fill-rule="evenodd" d="M7.646 4.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707V14.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3z" />
                    </svg>
                  </span>
                  Importar
                </div>
              </div>
            </header>

            {/* Container for the table wrapper */}
            <div className="table-wrapper">
              <table className="table table-hover table-bordered">
                <thead>
                  <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Tópico</th>
                    <th scope="col">Resposta</th>
                    <th scope="col">Tipo</th>
                    <th scope="col">Tempo</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">ordenacao-1</th>
                    <td>Algoritmos de ordenação</td>
                    <td>✅ [120, 254, 215, 15, 264]</td>
                    <td>Tipo 1</td>
                    <td>15</td>
                  </tr>
                  <tr>
                    <th scope="row">ordenacao-1</th>
                    <td>Arvore binaria</td>
                    <td>❌ [129, 10298, 823, 9842, 12]</td>
                    <td>Tipo 1</td>
                    <td>15</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </div>
    </>
  )
}

export default ManageHistory;