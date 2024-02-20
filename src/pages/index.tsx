import Image from "next/image";
import '@/styles/globals.css'
import Layout from '@/components/Layout';
import QuoteResult from "@/components/Quotes";

export default function Home() {
    return (
        <Layout>
            <QuoteResult/>
        </Layout>
            
    )
}