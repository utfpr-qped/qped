import { Link } from "react-router-dom";
import './index.css'

const TopicSection = ({ questionList, sectionId, sectionTitle }) => {
  return (
    <section id={sectionId} className="Topic">
      <div className="row">
        <div className="col-12">
          <div className="info mb-3">
            <h2 className="h4 mb-3">{sectionTitle}</h2>
          </div>
        </div>

        <div className="col-12">
          <div className="questionList">
            {questionList.map(question =>
              <Link
                to={`/topics/question/${question.id}`}
                key={question.id}
              >
                <div className="questionItem">
                  <div><span className="title">{question.id}</span></div>
                  <div><span className="level">
                    {
                      question.level === 1 ? 'Fácil'
                        : question.level === 2 ? 'Médio'
                          : question.level === 3 ? 'Difícil'
                            : 'Nível'
                    }
                  </span></div>
                </div>
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default TopicSection;
