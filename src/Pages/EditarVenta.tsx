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
  FormControl,
  InputGroup,
  InputLeftElement,
  Input,
  useToast,
  Center,
  Select,
  FormLabel,
  Heading,
} from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";
import { useLocation, useNavigate } from "react-router-dom";
import { Ticket } from "../types/crud";

interface TicketDetails {
  ticket: Ticket;
  ticketDetails: any;
  products: any[];
  utilidad: number;
}

function EditarVenta() {
  const location = useLocation();
  let userId = location.state.userId;
  let ticket = location.state.ticket as Ticket;
  const navigate = useNavigate();
  const [idCliente, setIdCliente] = useState<number | null>(
    ticket.idcliente || userId
  );
  const [fecha, setFecha] = useState(
    ticket.fecha ? ticket.fecha : new Date().toISOString()
  );
  const [ticketDetails, setTicketDetails] = useState<TicketDetails | null>(
    null
  );
  const toast = useToast();

  const API_URL = `http://localhost:3500/sales/${ticket.id}?idClient=${idCliente}&idUser=${userId}`;

  // async function guardarProducto() {
  //   const respuesta = await fetch(
  //     `${API_URL}?comando=editarTicket&id=${ticket.id}&fecha=${fecha}&idcliente=${idCliente}`
  //   );
  //   const datos = await respuesta.json();

  //   if (datos.estatus === "ok") navigate(-1);
  //   else {
  //     toast({
  //       title: "Error while updating Ticket",
  //       description: "No se pudo guardar la venta.",
  //       status: "warning",
  //       duration: 4000,
  //       isClosable: true,
  //     });
  //   }
  // }

  // const eliminarTicket = async () => {
  //   const respuesta = await fetch(
  //     `${API_URL}?comando=eliminarTicket&id=${ticket.id}`
  //   );
  //   const datos = await respuesta.json();

  //   if (datos.estatus === "ok") navigate(-1);
  //   else {
  //     toast({
  //       title: "Error while removing Ticket",
  //       description: "No se pudo guardar la venta.",
  //       status: "warning",
  //       duration: 4000,
  //       isClosable: true,
  //     });
  //   }
  // };

  const fetchTicketDetails = async () => {
    const response = await fetch(API_URL);
    const data = await response.json();
    setTicketDetails(data.record);
  };

  useEffect(() => {
    fetchTicketDetails();
  }, []);

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
        <Flex minW={{ base: "90%", md: "468px" }} bg="teal.200" p="2">
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
            <Text fontSize="lg">Detalles de Venta</Text>
          </Box>
          <Spacer />

          {/* <Box
            p="4"
            bg="teal.400"
            as="button"
            borderRadius="md"
            onClick={eliminarTicket}
          >
            Eliminar
          </Box>

          <Box
            p="4"
            bg="teal.400"
            as="button"
            borderRadius="md"
            onClick={guardarProducto}
          >
            Guardar
          </Box> */}
        </Flex>
        <Box display="flex" mt="2" alignItems="center">
          <Stack
            flexDir="column"
            mb="2"
            justifyContent="center"
            alignItems="center"
          >
            <Box minW={{ base: "90%", md: "468px" }}>
              <Stack
                spacing={4}
                p="1rem"
                backgroundColor="whiteAlpha.900"
                boxShadow="md"
              >
                <Box>
                  <Heading size="xl">
                    Ticket #{ticketDetails?.ticket.id} -{" "}
                    {ticketDetails?.ticket.fecha}
                  </Heading>
                </Box>
                <Box>
                  <Heading size="lg">Products</Heading>
                  {ticketDetails?.products.map((product) => (
                    <Box key={product.id}>
                      <Text>
                        {product.nombre} - PV {product.preciodeventa} - PC{" "}
                        {product.preciodecosto}
                      </Text>
                    </Box>
                  ))}
                </Box>
                <Box>
                  <Heading size="md">Utilidad</Heading>
                  <Text>{ticketDetails?.utilidad}</Text>
                </Box>
              </Stack>
            </Box>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}

export default EditarVenta;
