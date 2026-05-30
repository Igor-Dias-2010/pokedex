"use client";

import Procurar from "./function/procurar";
import Sprites from "./data/sprite";
import Habilidades from "./data/habilidades";
import Stats from "./data/stats";
import Tipos from "./data/tipos";
import Altura from "./data/altura";
import Nome from "./data/nome";
import Peso from "./data/peso";
import { useState } from "react";

export default function Card() {
    const [data, setData] = useState<any>(null);
    return (
        <>
            <Procurar setData={setData} />
            {data && (
                <div className="card">
                    <div className="caracteristicas">
                        <Nome name={data.name} />
                        <Altura height={data.height} />
                        <Peso weight={data.weight} />
                        <Tipos types={data.types} />
                        <Stats stats={data.stats} />
                        <Habilidades abilities={data.abilities} />
                        <Sprites data={data} />
                    </div>
                </div>
            )}
        </>
    );
}
