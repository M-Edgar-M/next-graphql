import Head from "next/head";
import Image from "next/image";
import {
  ApolloClient,
  InMemoryCache,
} from "@apollo/client";
import { Container, Grid } from "@mui/material";

import Link from "next/link";

export default function Home() {
  return <div>
    <Head>
    <title>Next-GraphQl</title>
    <link rel="icon" href="icon.png" type="image/x-icon" />
    </Head>
  </div>
}
