import PaginationSection from "./PaginationSection";
import Jokes from "./Jokes";

//pass to jokes only the user's jokes
const jokes = [
  {
    title: "Test1",
    content: "jytawdu iuwagda wdaiudg hgd dhdwaiu hdhd aidb hwdao",
    likes: 204
  },
  {
    title: "Test4",
    content: "jytawdu iuwagdaaiudg hgd dhdwaiu hdhd aidb hwdao",
    likes: 122
  }
];

const Profile = () => {
  return (
    <div>
      <h1>Profile</h1>
      <Jokes jokes={jokes} />
      <PaginationSection numOfPages={1} />
    </div>
  );
};

export default Profile;
