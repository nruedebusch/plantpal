import { Box } from "@chakra-ui/react";
import NewHero from "./components/NewHero";

export default async function Home() {
  return (
    <Box>
      <NewHero />
    </Box>
  );
}
