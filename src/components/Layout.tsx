import { ReactNode } from 'react';
import Head from 'next/head';
import Header from './Header';
import Footer from './Footer';

interface LayoutProps {
    children: ReactNode;
}

export const siteTitle = 'Emerald Devs | Quote Generator';

export default function Layout({ children }: LayoutProps) {
    return (
            <div className="main-layout h-full">
                <Head>
                    <meta charSet="UTF-8" />
                    <title>{siteTitle}</title>
                </Head>
                <Header />
                <main>{children}</main>
                <Footer />
            </div>
    )
}