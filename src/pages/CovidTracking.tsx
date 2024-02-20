import Image from "next/image";
import '@/styles/globals.css'
import Layout from '@/components/Layout';
import CovidData from "@/components/Covid";

export default function Home() {
    return (
        <Layout>
            <CovidData/>
        </Layout>
            
    )
}