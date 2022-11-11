import { useState,useEffect } from 'react' 
import {SimpleGrid, Box,Text, Flex,
Stack,Wrap, WrapItem, Button, Spacer,Image, Center} from '@chakra-ui/react'
import { StarIcon } from '@chakra-ui/icons' 
import { useLocation,useNavigate  } from "react-router-dom";

 function Productos() {
    const [registros,setRegistros]=useState([])
    const location = useLocation(); 
    let userId = location.state.userId;
    let tienda = location.state.tienda;
    const navigate=useNavigate()
    
    const getApiData = async () => {
    const resultado=await fetch('https://pmoviles1.000webhostapp.com/api/apiv.php?comando=productos&id='+userId)
    const datos=await resultado.json()
    setRegistros(datos)
    
    }
    
    useEffect(() => {
        getApiData();
      }, []);
    
   
    function editarProductos(item:{id:number,
      nombre:string,
      descripcion:string,
      cantidad:number,
      preciodecosto:number,
      preciodeventa:number,
      urlproducto:string,
      idusuario:number}){        
    navigate('/editarproductos',{
        state:{
        producto:item
      }
    })  
    }
    
    function agregarProducto(){        
        navigate('/nuevoproducto',{
            state:{
            userId: userId
          }
        })  
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
        borderRadius='md'
      >
        
        <Flex  
        bg="teal.200"
        minW={{ base: "90%", md: "468px" }}
        p='2'>
  <Box p='4' bg="teal.400" as='button' onClick={() =>navigate(-1)}
  borderRadius='md'>
    Regresar
  </Box>
  <Box p='4'>
  <Text fontSize='lg'>Productos</Text>
  </Box>
  <Spacer />
  
  <Box p='4' bg='teal.400'as='button' borderRadius='md'
  onClick={agregarProducto}>
    Agregar
  </Box>
</Flex>

<Box display='flex' mt='2' alignItems='center' >
<SimpleGrid columns={2} spacing={10}>
          {registros
             .map((item:{id:number,
                nombre:string,
                descripcion:string,
                cantidad:number,
                preciodecosto:number,
                preciodeventa:number,
                urlproducto:string,
                idusuario:number}, i) => (
                <Box  ml='2'  fontSize='sm' 
                borderColor="teal.200" p={2}
                bg="teal.50"
                width={200}
                key={i}
                borderRadius="md"  
                alignItems='center'
                as='button'
                
                onClick={()=>editarProductos(item)}            
                >
                <Center>  
                <Image src={item.urlproducto} height="200"
                borderRadius="md"/>
                </Center>
                  <Box color="black" >
                    <Text fontSize='lg' fontWeight="bold">{item.nombre}</Text>
                    <Text fontSize='md'>{item.descripcion}</Text>
                    <Text fontSize='sm'>quedan {item.cantidad}</Text>
                  </Box>
                </Box>  
              
            ))}
          </SimpleGrid>
          </Box>
</Stack>
        </Flex>
    )
}


export default Productos


