import { CanSSRAuth } from "@/utils/CanSSRAuth";
import Head from "next/head";
import { Header } from "@/components/ui/Header";
import styles from "./styles.module.scss";
import { Footer } from "@/components/ui/Footer";
import { setupAPIClient } from "@/services/api";
import { useEffect, useState } from "react";

type DashboardProps ={
  id: string
  name: string
}

interface userProps{
  user: DashboardProps
}
export default function Dashboard({user}: userProps) {
  
function toUpperCase(name: string): import("react").ReactNode {
  return name.toUpperCase() || 's'
}
  return (
    <>
      <Head>
        <title> Painel - Express Waiter</title>
      </Head>

      <div className={styles.dashboardContainer}>
        <Header />

        <div className={styles.dashboardContent}>
        
          <h1  key={user.id || null}>BEM VINDO <span className={styles.name}>{toUpperCase(user.name) || "-"}</span></h1>
        </div>

        <Footer/>
      </div>
    </>
  );
}


export const getServerSideProps = CanSSRAuth(async (ctx) => {

  const apiClient = setupAPIClient(ctx)

  const response = await apiClient.get('/detail')

  return {
    props: {
      user: response.data
    },
  };
});


