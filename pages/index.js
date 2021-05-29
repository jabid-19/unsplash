import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

import styles from "../styles/Home.module.css";

const defaultEndpoint = `https://api.unsplash.com/photos/?client_id=8hic3xQLEc5anDmp61ZPRuYDt85tvvKxJeXRdqEEIiY
`;

export async function getServerSideProps() {
  const res = await fetch(defaultEndpoint);
  const data = await res.json();
  return {
    props: {
      data,
    },
  };
}
export default function Home({ data }) {
  console.log("data", data);

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>PictureList</h1>

        <ul className={styles.grid}>
          {data.map((result) => {
            const { id, urls, user } = result;
            return (
              <li key={id} className={styles.card}>
                <Link href="/detail/[id]" as={`/detail/${id}`}>
                  <a href="#">
                    <img src={urls.regular} className={styles.image} />

                    <h3>User: {user.username}</h3>
                  </a>
                </Link>
              </li>
            );
          })}
        </ul>
      </main>
    </div>
  );
}
