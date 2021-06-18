import { Link } from "react-router-dom";

const TopicSection = ({ questionList, sectionTitle }) => {  
  return (
    <section className="topic p-4 mb-3">
      <h2 className="h4 mb-4">{sectionTitle}</h2>
      { 
        questionList.map(question => 
          <Link to={`/question/${question.subject.toLowerCase()}/${question.id}`} key={question.id}>{question.title}</Link> 
        ) 
      }
    </section>
  );
}
 
export default TopicSection;
