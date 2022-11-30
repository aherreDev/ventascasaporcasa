import { useState } from "react";
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
} from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";
import { useLocation, useNavigate } from "react-router-dom";
import { Client, Ticket } from "../types/crud";
import axios from "axios";

const API_URL = "http://localhost:3500/sales";

interface TicketDetails {
  ticket: Ticket;
  ticketDetails: any;
  products: any[];
  utilidad: number;
}

function Reporte() {
  const location = useLocation();

  let cliente = location.state.cliente as Client;
  const [fechaInicio, setFechaInicio] = useState<string>("");
  const [fechaFinal, setFechaFinal] = useState<string>("");
  const [reporte, setReporte] = useState<TicketDetails[]>([]);
  const toast = useToast();
  let userId = location.state.userId;
  const navigate = useNavigate();
  console.log(userId);

  const GenerarReporte = async () => {
    const respuesta = await axios.get(
      `${API_URL}?fechaInicio=${fechaInicio}&fechaFin=${fechaFinal}&idUsusario=${userId}`
    );

    const datos = respuesta.data;
    console.log(datos);

    setReporte(datos?.report);
  };

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
            <Text fontSize="lg">Reportes</Text>
          </Box>
          <Spacer />

          <Box
            p="4"
            bg="teal.400"
            as="button"
            borderRadius="md"
            onClick={GenerarReporte}
          >
            Generar Reporte
          </Box>
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
                <FormControl>
                  <InputGroup>
                    <Input
                      type="date"
                      placeholder="Fecha inicio"
                      value={fechaInicio}
                      onChange={(e) => setFechaInicio(e.target.value)}
                    />
                  </InputGroup>
                </FormControl>
                <FormControl>
                  <InputGroup>
                    <Input
                      type="date"
                      placeholder="Fecha fin"
                      value={fechaFinal}
                      onChange={(e) => setFechaFinal(e.target.value)}
                    />
                  </InputGroup>
                </FormControl>
              </Stack>
            </Box>
          </Stack>
        </Box>

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
                {reporte && (
                  <Box>
                    <Text fontSize="lg">Reporte</Text>
                    <SimpleGrid columns={3} spacing={10}>
                      {reporte.map((ticket) => (
                        <Box>
                          <Text fontSize="lg">Fecha {ticket.ticket.fecha}</Text>
                          <Text fontSize="lg">
                            Productos {ticket.products.length}
                          </Text>
                          <Text fontSize="lg">Utilidad ${ticket.utilidad}</Text>
                        </Box>
                      ))}
                    </SimpleGrid>
                  </Box>
                )}
              </Stack>
            </Box>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}

export default Reporte;
