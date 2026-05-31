"use client";
import { useState, useEffect } from "react";
import { Search } from "lucide-react";

type ProcurarProps = {
    setData: (data: any) => void;
    setLoading: (loading: boolean) => void;
};

export default function Procurar({ setData, setLoading }: ProcurarProps) {
    const [pokemon, setPokemon] = useState("");
    const [erro, setErro] = useState("");
    const [sugestoes, setSugestoes] = useState<string[]>([]);

    function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.key === "Enter") {
            buscarPokemon(pokemon);
        }
    }

    useEffect(() => {
        async function loadPokemons() {
            const res = await fetch(
                "https://pokeapi.co/api/v2/pokemon?limit=1000",
            );
            const data = await res.json();

            setSugestoes(data.results.map((p: any) => p.name));
        }
        loadPokemons();
    }, []);

    async function buscarPokemon(name: string) {
        setErro("");
        setLoading(true);
        setData(null);

        await new Promise((resolve) => setTimeout(resolve, 1500));
        try {
            const response = await fetch(
                `https://pokeapi.co/api/v2/pokemon/${name}`,
            );
            if (!response.ok) {
                setErro("Pokémon não encontrado, tente novamente");
                setPokemon("");
                return;
            }
            const result = await response.json();
            setData(result);
            setPokemon("");
        } catch {
            setErro("Erro na busca");
        } finally {
            setLoading(false);
        }
    }
    return (
        <div className="main">
            <div className="procura">
                <input
                    type="search"
                    placeholder="Pesquise um pokemon..."
                    id="pokemon"
                    value={pokemon}
                    onChange={(e) => {
                        const value = e.target.value;
                        setPokemon(value);

                        if (!value) {
                            setSugestoes([]);
                            return;
                        }
                        const filtrados = sugestoes.filter((p) =>
                            p.toLowerCase().includes(value.toLowerCase()),
                        );
                        setSugestoes(filtrados.slice(0, 5));
                    }}
                    onKeyDown={handleKeyDown}
                />
                {pokemon && sugestoes.length > 0 && (
                    <div className="autocomplete">
                        {sugestoes.map((name) => (
                            <div
                                key={name}
                                onClick={() => buscarPokemon(name)}
                                className="item"
                            >
                                {name}
                            </div>
                        ))}
                    </div>
                )}
                <button
                    onClick={() => buscarPokemon(pokemon)}
                    className="pesquisa-btn"
                >
                    <Search size={20} />
                </button>
            </div>
            <div className="erro-container">
                <h1 className="erro">{erro}</h1>
            </div>
        </div>
    );
}
