import UploadBox from "../components/UploadBox";
import FileList from "../components/FileList";
import Footer from "../layout/Footer";
import { Container } from "@mui/material";

const Home = () => {
  return (
    <>
      <Container>
        <FileList />
        <UploadBox />
      </Container>
      <Footer />
    </>
  );
};

export default Home;
