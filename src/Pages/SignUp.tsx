import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Flex,
  Heading,
  Input,
  Button,
  InputGroup,
  Stack,
  InputLeftElement,
  chakra,
  Box,
  Link,
  Avatar,
  FormControl,
  FormHelperText,
  InputRightElement,
  useToast,
} from "@chakra-ui/react";
import { FaUserAlt, FaLock, FaMailBulk, FaStore } from "react-icons/fa";

const CFaUserAlt = chakra(FaUserAlt);
const CFaMailBulk = chakra(FaMailBulk);
const CFaStore = chakra(FaStore);
const CFaLock = chakra(FaLock);

const API_URL = "https://drenteria3.000webhostapp.com/apilogin.php";

function SignUp() {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [tienda, setTienda] = useState("");
  const [contrasena, setContrasena] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const handleShowClick = () => setShowPassword(!showPassword);
  const navigate = useNavigate();
  const toast = useToast();

  async function iraMenuPrincipal() {
    const resultado = await fetch(
      `${API_URL}?comando=signin&nombre=${nombre}&contrasena=${contrasena}&correo=${email}&tienda=${tienda}`
    );
    // const datos = {
    //   records: [
    //     {
    //       tienda: "Toño",
    //       id: "2",
    //     },
    //   ],
    // };

    const datos = await resultado.json();

    console.log(datos);

    if (datos.estatus === "ok") {
      toast({
        title: "Usuario creado",
        description: `Usuario creado con éxito. Ahora puedes iniciar sesión.`,
        status: "success",
        duration: 4000,
        isClosable: true,
      });
      navigate("/");
    } else {
      toast({
        title: "Usuario",
        description: "No pudimos crear un usuario con esos datos.",
        status: "warning",
        duration: 4000,
        isClosable: true,
      });
    }
  }

  return (
    <Flex
      flexDirection="column"
      width="100wh"
      height="100vh"
      backgroundColor="gray.200"
      justifyContent="center"
      alignItems="center"
    >
      <Stack
        flexDir="column"
        mb="2"
        justifyContent="center"
        alignItems="center"
      >
        <Avatar bg="teal.500" />
        <Heading color="teal.400">Bienvenido</Heading>
        <Box minW={{ base: "90%", md: "468px" }}>
          <Stack
            spacing={4}
            p="1rem"
            backgroundColor="whiteAlpha.900"
            boxShadow="md"
          >
            <FormControl>
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  children={<CFaUserAlt color="gray.300" />}
                />
                <Input
                  type="text"
                  placeholder="nombre de usuario"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                />
              </InputGroup>
            </FormControl>

            <FormControl>
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  children={<CFaMailBulk color="gray.300" />}
                />
                <Input
                  type="text"
                  placeholder="correo de usuario"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </InputGroup>
            </FormControl>

            <FormControl>
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  children={<CFaStore color="gray.300" />}
                />
                <Input
                  type="text"
                  placeholder="nombre de tienda"
                  value={tienda}
                  onChange={(e) => setTienda(e.target.value)}
                />
              </InputGroup>
            </FormControl>

            <FormControl>
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  color="gray.300"
                  children={<CFaLock color="gray.300" />}
                />
                <Input
                  type={showPassword ? "text" : "password"}
                  value={contrasena}
                  onChange={(e) => setContrasena(e.target.value)}
                  placeholder="Contraseña"
                />
                <InputRightElement width="4.5rem">
                  <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                    {showPassword ? "Ocultar" : "Mostrar"}
                  </Button>
                </InputRightElement>
              </InputGroup>
              <FormHelperText textAlign="right">
                <Link>olvidastes tu contraseña?</Link>
              </FormHelperText>
            </FormControl>
            <Button
              borderRadius={0}
              type="submit"
              variant="solid"
              colorScheme="teal"
              width="full"
              onClick={iraMenuPrincipal}
            >
              Entrar
            </Button>
          </Stack>
        </Box>
      </Stack>
      <Box>
        Ya tienes una cuenta?{" "}
        <Link color="teal.500" href="/">
          Accede a ella
        </Link>
      </Box>
    </Flex>
  );
}

export default SignUp;
