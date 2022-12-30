import { Box, Text } from "@mantine/core";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Navbar from "../components/Navbar/Navbar";
import { AxiosInstance } from "../config/axiosConfig";
import useUser from "../hooks/useUser";

type Props = {
  children: React.ReactNode;
};
export default function Layout({ children }: Props) {
  const user = useUser();
  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Box
        sx={(theme) => ({
          height: "100%",
          width: "50%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          backgroundColor: "#FEFCF3",
        })}
      >
        <Navbar />
        {children}
      </Box>
    </Box>
  );
}
