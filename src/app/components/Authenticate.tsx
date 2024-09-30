"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { createClient } from "@supabase/supabase-js";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Text,
  Heading,
  Container,
  useToast,
} from "@chakra-ui/react";
import { barlowElastic } from "../fonts/fonts";
import { Text as ChakraText } from "@chakra-ui/react";

interface AuthenticateProps {
  isRegister: boolean;
}

const schema = z
  .object({
    email: z.string().email({ message: "Ungültige E-Mail-Adresse" }),
    password: z
      .string()
      .min(6, { message: "Passwort muss mindestens 6 Zeichen lang sein" }),
    confirmPass: z.string().optional(),
  })
  .refine((data) => !data.confirmPass || data.password === data.confirmPass, {
    message: "Passwörter stimmen nicht überein",
    path: ["confirmPass"],
  });

type FormData = z.infer<typeof schema>;

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const Authenticate: React.FC<AuthenticateProps> = ({ isRegister }) => {
  const [register, setRegister] = useState<boolean>(isRegister);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const toast = useToast();

  const {
    register: registerField,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<FormData> = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      if (register) {
        const { error } = await supabase.auth.signUp({
          email: data.email,
          password: data.password,
        });
        if (error) throw error;
        toast({
          title: "Registrierung erfolgreich",
          description: "Bitte überprüfen Sie Ihre E-Mails zur Bestätigung.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email: data.email,
          password: data.password,
        });
        if (error) throw error;
        router.push("/dashboard");
      }
    } catch (error) {
      toast({
        title: "Fehler",
        description:
          error instanceof Error ? error.message : "Ein Fehler ist aufgetreten",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box bg="green.50" minHeight="100vh" py={12}>
      <Container maxW="container.sm">
        <Box
          bg="white"
          p={8}
          borderRadius="lg"
          boxShadow="md"
          position="relative"
          zIndex={1}
        >
          <Heading as="h1" size="xl" textAlign="center" mb={6}>
            {register ? "Registrieren" : "Anmelden"}
          </Heading>
          <form onSubmit={handleSubmit(onSubmit)}>
            <VStack spacing={4}>
              <FormControl isInvalid={!!errors.email}>
                <FormLabel>E-Mail</FormLabel>
                <Input
                  {...registerField("email")}
                  type="email"
                  bg="white"
                  color="gray.800"
                />
                <Text color="red.500" fontSize="sm">
                  {errors.email?.message}
                </Text>
              </FormControl>
              <FormControl isInvalid={!!errors.password}>
                <FormLabel>Passwort</FormLabel>
                <Input
                  {...registerField("password")}
                  type="password"
                  bg="white"
                  color="gray.800"
                />
                <Text color="red.500" fontSize="sm">
                  {errors.password?.message}
                </Text>
              </FormControl>
              {register && (
                <FormControl isInvalid={!!errors.confirmPass}>
                  <FormLabel color="gray.600">Passwort bestätigen</FormLabel>
                  <Input
                    {...registerField("confirmPass")}
                    type="password"
                    bg="white"
                    color="gray.800"
                  />
                  <Text color="red.500" fontSize="sm">
                    {errors.confirmPass?.message}
                  </Text>
                </FormControl>
              )}
              <Button
                type="submit"
                bg="purple.600"
                width="full"
                color="white"
                _hover={{ bg: "purple.500" }}
                isLoading={isSubmitting}
                loadingText={register ? "Registriere..." : "Melde an..."}
              >
                {register ? "Registrieren" : "Anmelden"}
              </Button>
            </VStack>
          </form>
          <Text mt={4} textAlign="center" color="gray.600">
            {register
              ? "Haben Sie bereits ein Konto?"
              : "Haben Sie kein Konto?"}
            <Button
              variant="link"
              onClick={() => setRegister(!register)}
              ml={2}
              color="purple.600"
              _hover={{ textDecoration: "underline" }}
            >
              {register ? "Anmelden" : "Registrieren"}
            </Button>
          </Text>
        </Box>
      </Container>
      <Text
        as="h1"
        fontSize={{
          base: "7xl",
          sm: "8xl",
          md: "10rem",
          lg: "14rem",
          xl: "18rem",
          "2xl": "22rem",
        }}
        className={barlowElastic.className}
        color="purple.700"
        position="absolute"
        top="0"
        left="50%"
        transform="translateX(-50%)"
        opacity={0.1}
        zIndex={0}
      >
        Plantpal
      </Text>
    </Box>
  );
};

export default Authenticate;
