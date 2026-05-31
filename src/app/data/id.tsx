type IdProps = {
    id: number;
};

export default function Id({ id }: IdProps) {
    return (
        <div>
            <span className="pokemon-id">#{String(id).padStart(3, "0")}</span>
        </div>
    );
}
