import HashLoader from "react-spinners/HashLoader";
import { Container } from "./style";

function Loader() {
  return (
    <Container>
      <HashLoader size={100} color="#d3f39f" />
    </Container>
  );
}

export default Loader;
