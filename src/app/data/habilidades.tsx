type HabilidadesProps = {
    abilities: any[];
}

export default function Habilidades({abilities}: HabilidadesProps) {
    return (
        <div>
            {abilities.map((ability) => (
                <p key={ability.ability.name}>{ability.ability.name}</p>
            ))}
        </div>
    );
}
