"use client";
import { useState } from "react";
import { Search } from "lucide-react";

type ProcurarProps = {
    setData: (data: any) => void;
};

export default function Procurar({ setData }: ProcurarProps) {
    const [pokemon, setPokemon] = useState("");

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPokemon(e.target.value);
    };

    async function buscarPokemon() {
        const response = await fetch(
            `https://pokeapi.co/api/v2/pokemon/${pokemon}`,
        );

        const result = await response.json();
        setData(result);
        setPokemon("");
    }
    return (
        <div>
            <div className="procura">
                <input
                    type="text"
                    placeholder="Pesquise um pokemon..."
                    id="pokemon"
                    value={pokemon}
                    onChange={handleInputChange}
                />
                <button onClick={buscarPokemon} className="pesquisa-btn"><Search size={20} /></button>
            </div>
        </div>
    );
}
