"use client";

import LoadingBusca from "./function/loadingBusca";
import Id from "./data/id";
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
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<any>(null);
    return (
        <>
            <Procurar setData={setData} setLoading={setLoading} />
            {loading && <LoadingBusca />}
            {!loading && data && (
                <div className="card">
                    <div className="caracteristicas">
                        <Id id={data.id} />
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
