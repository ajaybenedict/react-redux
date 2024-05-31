import logo from './logo.svg';
import './App.css';
import NavBar from './components/NavBar';
import AddTask from './components/AddTask';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import TasksList from './components/TasksList';

function App() {
  return (
    <Container>
      <NavBar />
      <Row className="justify-content-md-center">
        <Col lg="6">
          <AddTask />
          <TasksList />
        </Col>
      </Row>
    </Container>
  );
}

export default App;
