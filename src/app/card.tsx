"use client";

import { useState } from "react";
import Image from "next/image";

export default function Card() {
    const [pokemon, setPokemon] = useState("");
    const [data, setData] = useState<any>(null);

    const handleInputChange = (e: any) => {
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
        <>
            <input
                type="text"
                placeholder="Pesquise um pokemon..."
                id="pokemon"
                value={pokemon}
                onChange={handleInputChange}
            />
            <button onClick={buscarPokemon}>Buscar</button>

            {data && (
                <div className="card">
                    <h1>{data.name}</h1>
                    <div className="caracteristicas">
                        {data.types.map((type: any) => (
                            <p key={type.type.name}>type: {type.type.name}</p>
                        ))}
                        <p>weigth: {data.weight / 10} kg</p>
                        <p>height: {data.height / 10} m</p>
                        {data.stats.map((stat: any) => (
                            <p key={stat.stat.name}>
                                {stat.stat.name}: {stat.base_stat}
                            </p>
                        ))}
                        {data.abilities.map((ability: any) => (
                            <p key={ability.ability.name}>
                                {ability.ability.name}
                            </p>
                        ))}
                    </div>
                    <Image
                        src={
                            data.sprites.other["official-artwork"].front_default
                        }
                        alt={data.name}
                        width={0}
                        height={0}
                        sizes="100vw"
                        style={{ width: "300px", height: "auto" }}
                    />
                </div>
            )}
        </>
    );
}
