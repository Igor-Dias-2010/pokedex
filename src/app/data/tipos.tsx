type TiposProps = {
    types: any[];
};

export default function Tipos({ types }: TiposProps) {
    return (
        <div>
            {types.map((type) => (
                <p key={type.type.name}>type: {type.type.name}</p>
            ))}
        </div>
    );
}
