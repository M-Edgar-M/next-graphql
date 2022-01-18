import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import {
  ApolloClient,
  InMemoryCache,
} from "@apollo/client";
import { Container, Grid } from "@mui/material";

import Link from "next/link";
// const COUNTRY_INFO = gql`
// query info {
//   information {
//     totalCount
//     __typename
//   }
// }
// `;

// const MOVIES = gql`
// query($first:Int, $after: String){
//   allJobs(first: $first, after: $after){
//    edges {
//      node {
//        id
//        jobTitle
//      }
//      cursor
//    }
//  }
// }
// `;

// const client = new ApolloClient({
//   uri: "https://48p1r2roz4.sse.codesandbox.io",
//   cache: new InMemoryCache(),
// });

// const client = new ApolloClient({
//   uri: "https://etmdb.com/graphql",
//   cache: new InMemoryCache(),
// });


export default function Home() {
  return (
    <div></div>
  );
}
