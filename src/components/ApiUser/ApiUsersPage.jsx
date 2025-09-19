import { Container, Box } from "@mui/material";

import AddUserDialog from "../ApiUser/ApiUser/AddUserDialog";
import ApiUserTable from "./ApiUser/ApiUserTable";

const ApiUsersPage = () => {
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Box>
    <ApiUserTable/>
        <AddUserDialog />
      </Box>
    </Container>
  );
};

export default ApiUsersPage;
