import { Box } from "@chakra-ui/react";
import Authenticate from "../components/Authenticate";

export default function Register() {
  return (
    <Box>
      <Authenticate isRegister={true} />
    </Box>
  );
}
