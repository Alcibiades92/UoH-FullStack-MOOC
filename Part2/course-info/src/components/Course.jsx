const Course = ({ course }) => {
  return (
    <>
      <Header title={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </>
  );
};

const Header = ({ title }) => {
  return <h1>{title}</h1>;
};

const Content = ({ parts }) => {
  return (
    <ul>
      {parts.map((part) => (
        <Part key={part.id} part={part} />
      ))}
    </ul>
  );
};

const Part = ({ part }) => {
  return (
    <li>
      <p>
        {part.name} : {part.exercises}
      </p>
    </li>
  );
};

const Total = ({ parts }) => {
  return (
    <p>
      Total exercises : {parts.reduce((acc, part) => acc + part.exercises, 0)}
    </p>
  );
};

export default Course;
