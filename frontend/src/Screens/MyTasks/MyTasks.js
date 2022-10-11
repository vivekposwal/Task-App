import React, { useEffect } from "react";
import MainScreen from "../../components/MainScreen";
import { Link, useHistory } from "react-router-dom";
import { Button, Card, Badge, Accordion } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import { deleteTaskAction, listTasks } from "../../actions/tasksActions";
const MyTasks = ({ search }) => {
  const dispatch = useDispatch();
  const taskList = useSelector((state) => state.taskList);
  const { loading, error, tasks } = taskList;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const taskCreate = useSelector((state) => state.taskCreate);
  const { success: successCreate } = taskCreate;
  const taskUpdate = useSelector((state) => state.taskUpdate);
  const { success: succcessUpdate } = taskUpdate;
  const taskDelete = useSelector((state) => state.taskDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = taskDelete;
  const deleteHandler = (id) => {
    if (window.confirm("Are You Sure")) {
      dispatch(deleteTaskAction(id));
    }
  };
  const history = useHistory();

  useEffect(() => {
    dispatch(listTasks());
    if (!userInfo) {
      history.push("/");
    }
  }, [
    dispatch,
    history,
    userInfo,
    successCreate,
    succcessUpdate,
    successDelete,
  ]);
  return (
    <div style={{ backgroundColor: "#bf1167" }}>
      <MainScreen title={`Welcome Back ${userInfo && userInfo.name}..`}>
        <Link to="createtask">
          <Button
            style={{
              backgroundColor: "#d47a18",
              marginLeft: 10,
              marginBottom: 6,
              border: "0px",
            }}
            size="lg"
          >
            Create New Task
          </Button>
        </Link>
        {errorDelete && (
          <ErrorMessage variant="danger">{errorDelete}</ErrorMessage>
        )}
        {loadingDelete && <Loading />}
        {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
        {loading && <Loading />}
        {tasks
          ?.reverse()
          .filter((filteredTask) =>
            filteredTask.title.toLowerCase().includes(search.toLowerCase())
          )
          .map((task) => (
            <Accordion key={tasks._id}>
              <Card style={{ margin: 10 }} key={task._id}>
                <Card.Header style={{ display: "flex" }}>
                  <span
                    style={{
                      color: "black",
                      textDecoration: "none",
                      flex: 1,
                      cursor: "pointer",
                      alignSelf: "centre",
                      fontSize: 18,
                    }}
                  >
                    <Accordion.Toggle
                      as={Card.Text}
                      variant="link"
                      eventKey="0"
                    >
                      {task.title}
                    </Accordion.Toggle>
                  </span>
                  <div>
                    <Button href={`/task/${task._id}`}>Edit</Button>
                    <Button
                      variant="danger"
                      className="mx-2"
                      onClick={() => deleteHandler(task._id)}
                    >
                      Delete
                    </Button>
                  </div>
                </Card.Header>
                <Accordion.Collapse eventKey="0">
                  <Card.Body>
                    <h4>
                      <Badge variant="success">Category-{task.category}</Badge>
                    </h4>
                    <blockquote className="blockquote mb-0">
                      <p>{task.content}</p>
                      <footer className="blockquote-footer">
                        Created on{" "}
                        <cite title="Source Title">
                          {task.createdAt.substring(0, 10)}
                        </cite>
                      </footer>
                    </blockquote>
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
            </Accordion>
          ))}
      </MainScreen>
    </div>
  );
};

export default MyTasks;
