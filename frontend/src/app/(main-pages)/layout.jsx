import Navbar from "@/components/Navbar";

export default function MainPagesLayout({ children }) {
    return(
        <>
        <Navbar />
        {children}
        </>
    )
}