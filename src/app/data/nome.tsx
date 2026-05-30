type NomeProps = {
    name: string;
};

export default function Nome({ name }: NomeProps) {
    return (
        <div>
            <h1>{name}</h1>
        </div>
    );
}
