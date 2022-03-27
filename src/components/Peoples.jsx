const Peoples = ({ peoples }) => {
  // console.log(peopleConected);
  return (
    <div className="containerPeople">
      <h1 className="peopleTilte">Users Online</h1>
      {peoples.map((people) => (
        <div key={people.id}>
          <h1 className="peopleConented">{people.user}</h1>
        </div>
      ))}
    </div>
  );
};

export default Peoples;
