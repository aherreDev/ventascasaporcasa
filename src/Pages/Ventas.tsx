import { useState, useEffect } from "react";
import {
  SimpleGrid,
  Box,
  Text,
  Flex,
  Stack,
  Wrap,
  WrapItem,
  Button,
  Spacer,
  Image,
  Center,
} from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";
import { useLocation, useNavigate } from "react-router-dom";
import { Ticket } from "../types/crud";

const API_URL = "https://drenteria3.000webhostapp.com/api.php";

function Ventas() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const location = useLocation();
  let userId = location.state.userId;
  let tienda = location.state.tienda;
  const navigate = useNavigate();

  const getApiData = async () => {
    const resultado = await fetch(`${API_URL}?comando=ticket`);
    const datos = await resultado.json();
    setTickets(datos);
  };

  useEffect(() => {
    getApiData();
  }, []);

  function editarVenta(item: Ticket) {
    navigate("/editarventa", {
      state: {
        ticket: item,
      },
    });
  }

  function agregarProducto() {
    navigate("/crearventa", {
      state: {
        userId: userId,
      },
    });
  }

  return (
    <Flex
      flexDirection="column"
      // width="200wh"
      //height="200vh"

      backgroundColor="gray.200"
      // justifyContent="center"
      alignItems="center"
    >
      <Stack
        flexDir="column"
        mb="2"
        p={2}
        backgroundColor="white"
        justifyContent="center"
        alignItems="center"
        marginTop={4}
        borderRadius="md"
      >
        <Flex bg="teal.200" minW={{ base: "90%", md: "468px" }} p="2">
          <Box
            p="4"
            bg="teal.400"
            as="button"
            onClick={() => navigate(-1)}
            borderRadius="md"
          >
            Regresar
          </Box>
          <Box p="4">
            <Text fontSize="lg">Ventas</Text>
          </Box>
          <Spacer />

          <Box
            p="4"
            bg="teal.400"
            as="button"
            borderRadius="md"
            onClick={agregarProducto}
          >
            Agregar
          </Box>
        </Flex>

        <Box display="flex" mt="2" alignItems="center">
          <SimpleGrid columns={2} spacing={10}>
            {tickets.map((item, i) => (
              <Box
                ml="2"
                fontSize="sm"
                borderColor="teal.200"
                p={2}
                bg="teal.50"
                width={200}
                key={i}
                borderRadius="md"
                alignItems="center"
                as="button"
                onClick={() => editarVenta(item)}
              >
                <Center></Center>
                <Box color="black">
                  <Text fontSize="lg" fontWeight="bold">
                    Ticket id: {item.id}
                  </Text>
                  <Text fontSize="md">User's id: {item.idcliente}</Text>
                  <Text fontSize="sm">Last update {item.fecha}</Text>
                </Box>
              </Box>
            ))}
          </SimpleGrid>
        </Box>
      </Stack>
    </Flex>
  );
}

export default Ventas;
