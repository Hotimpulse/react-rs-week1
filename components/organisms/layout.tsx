import { ReactNode } from "react";
import Navbar from "../molecules/Navbar";
import PokemonComponent from "./PokemonComponent";

interface LayOutProps {
    children: ReactNode;
}

export default function Layout({ children }: LayOutProps) {
    return (
        <div>
            <Navbar />
            <PokemonComponent />
            <div>
                {children}
            </div>
        </div>
    );
};