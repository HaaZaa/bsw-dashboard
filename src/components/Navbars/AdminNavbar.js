// reactstrap components
import { Navbar, Container, Label, Badge } from "reactstrap";
import { Store } from "StoreContext.js";

const AdminNavbar = (props) => {
  const store = new Store();
  return (
    <>
      <Navbar className="navbar-top navbar-dark" expand="md" id="navbar-main">
        <Container fluid>
          <p className="h1 mb-0 text-white text-uppercase d-none d-lg-inline-block">
            {props.brandText}
          </p>

          <Badge color="danger" pill className="d-none d-lg-inline-block">
            <Label className="h4 mb-0 text-white">{store.user.name}</Label>
          </Badge>
        </Container>
      </Navbar>
    </>
  );
};

export default AdminNavbar;
