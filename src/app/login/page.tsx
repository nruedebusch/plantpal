import { Box } from "@chakra-ui/react";
import Authenticate from "../components/Authenticate";

export default function Login() {
  return (
    <Box>
      <Authenticate isRegister={false} />
    </Box>
  );
}
