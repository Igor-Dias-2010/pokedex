"use client";
import { useState, useEffect, useRef } from "react";
import { Search } from "lucide-react";

type ProcurarProps = {
    setData: (data: any) => void;
    setLoading: (loading: boolean) => void;
};

export default function Procurar({ setData, setLoading }: ProcurarProps) {
    const [pokemon, setPokemon] = useState("");
    const [todosPokemons, setTodosPokemons] = useState<string[]>([]);
    const [sugestoes, setSugestoes] = useState<string[]>([]);
    const [erro, setErro] = useState("");
    const [indiceSelecionado, setIndiceSelecionado] = useState(-1);
    const itemSelecionadoRef = useRef<HTMLDivElement | null>(null);

    function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.key === "Enter") {
            if (indiceSelecionado >= 0) {
                buscarPokemon(sugestoes[indiceSelecionado]);
            } else {
                buscarPokemon(pokemon);
            }
        }
        if (e.key === "ArrowDown") {
            if (indiceSelecionado < sugestoes.length - 1) {
                setIndiceSelecionado(indiceSelecionado + 1);
            }
        }

        if (e.key === "ArrowUp") {
            if (indiceSelecionado > 0) {
                setIndiceSelecionado(indiceSelecionado - 1);
            }
        }
    }

    useEffect(() => {
        async function loadPokemons() {
            const res = await fetch(
                "https://pokeapi.co/api/v2/pokemon?limit=1000",
            );
            const data = await res.json();

            setTodosPokemons(data.results.map((p: any) => p.name));
        }
        loadPokemons();
    }, []);

    useEffect(() => {
        itemSelecionadoRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "nearest",
        });
    }, [indiceSelecionado]);

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
                <div className="input-container">
                    <input
                        type="search"
                        placeholder="Pesquise um pokemon..."
                        id="pokemon"
                        value={pokemon}
                        onChange={(e) => {
                            const value = e.target.value;
                            setPokemon(value);
                            setIndiceSelecionado(-1);

                            if (!value) {
                                setSugestoes([]);
                                return;
                            }
                            const filtrados = todosPokemons.filter((p) =>
                                p.toLowerCase().includes(value.toLowerCase()),
                            );
                            setSugestoes(filtrados);
                        }}
                        onKeyDown={handleKeyDown}
                    />
                    {pokemon && sugestoes.length > 0 && (
                        <div className="autocomplete">
                            <div className="autocomplete-scroll">
                                {sugestoes.map((name, index) => (
                                    <div
                                        key={name}
                                        ref={
                                            index === indiceSelecionado
                                                ? itemSelecionadoRef
                                                : null
                                        }
                                        onClick={() => buscarPokemon(name)}
                                        className={
                                            index === indiceSelecionado
                                                ? "item selecionado"
                                                : "item"
                                        }
                                    >
                                        {name}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                <button
                    onClick={() => buscarPokemon(pokemon)}
                    className="pesquisa-btn"
                >
                    <Search size={20} />
                </button>
            </div>
            {erro && (
                <div className="erro-container">
                    <h1 className="erro">{erro}</h1>
                </div>
            )}
        </div>
    );
}
