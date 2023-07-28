import Section from "../UI/Section";
import TaskForm from "./TaskForm";
import useHttp from "../../store/use-http";

const NewTask = (props) => {
  // const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState(null);

  const { error, isLoading, sendRequest: sendTaskRequest } = useHttp();

  const createTask = (taskText,data) => {
    const generatedId = data.name; // firebase-specific => "name" contains generated id
    const createdTask = { id: generatedId, text: taskText };

    props.onAddTask(createdTask);
  }

  const enterTaskHandler = async (taskText) => {
    sendTaskRequest({
      url: "https://react-http-925d0-default-rtdb.asia-southeast1.firebasedatabase.app/tasks.json",
      method: "POST",
      body: {text:taskText},
      headers: {
        "Content-Type": "application/json",
      },
    },createTask.bind(null,taskText));
   
  };

  return (
    <Section>
      <TaskForm onEnterTask={enterTaskHandler} loading={isLoading} />
      {error && <p>{error}</p>}
    </Section>
  );
};

export default NewTask;
