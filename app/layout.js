import '../styles/globals.css'
import { Inter, JetBrains_Mono, Orbitron } from 'next/font/google'
import Chatbot from '../components/Chatbot'

const inter = Inter({
    subsets: ['latin'],
    variable: '--font-inter',
})

const jetbrainsMono = JetBrains_Mono({
    subsets: ['latin'],
    variable: '--font-mono',
})

const orbitron = Orbitron({
    subsets: ['latin'],
    variable: '--font-orbitron',
})

export const metadata = {
    title: 'CDPL | Autonomous Tech Supremacy',
    description: 'Chakravyuh Dynamics (CDPL) - Pioneers in autonomous defense across Air (MAS), Sea (MMS), and Land (MGS) domains.',
    icons: {
        icon: '/partners/favicon.jpg',
    },
    keywords: [
        'Sensor Fusion', 'Edge AI for Defense', 'Autonomous Mission Control',
        'Multi-Domain Command and Control (MDC2)', 'Computer Vision Target Recognition',
        'Open Architecture Defense Software', 'Software-defined warfare', 'Edge AI defense',
        'Mosaic Warfare', 'JADC2 (Joint All-Domain Command and Control)', 'AI-enabled kill chain',
        'algorithmic warfare', 'open architecture defense systems', 'Sensor fusion for autonomous systems',
        'GPS-denied navigation software', 'OODA loop acceleration tools', 'zero-trust architecture for battlefield networks',
        'How to defeat drone swarms', 'Protecting critical infrastructure from aerial threats',
        'Autonomous surveillance for border security', 'Non-kinetic counter drone solutions for stadiums',
        'Rapid manufacturing defense technology'
    ],
}

export default function RootLayout({
    children,
}) {
    return (
        <html lang="en">
            <body className={`${inter.variable} ${jetbrainsMono.variable} ${orbitron.variable}`}>
                {children}
                <Chatbot />
            </body>
        </html>
    )
}

