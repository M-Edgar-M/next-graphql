import Head from "next/head";
import Image from "next/image";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { Container, Grid } from "@mui/material";

import Link from "next/link";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Next-GraphQl</title>
        <meta property="og:title" content="Next-GraphQl" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://next-graphql-nu.vercel.app/" />
        <meta
          property="og:image"
          content="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6jExNKTFTBydM_NqNy6uncdPsTITTSmMSXmdoo6ofZ8ObF_TtncV4x1hUZ-xujZ4VPjQ&usqp=CAU"
        />
        <link rel="icon" href="icon.png" type="image/x-icon" />
      </Head>
    </div>
  );
}
