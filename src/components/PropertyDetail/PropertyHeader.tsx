type Props = {
  property: {
    title: string;
    address: string | undefined;
    zone: string | undefined;
    city: string | undefined;
    createdAt: Date;
  };
};

export default function PropertyHeader({ property }: Props) {
  return (
    <div>
      <h1 className="text-2xl font-semibold">{property.title}</h1>
      <div className="pt-2">
        <p className="text-neutral-500">{`${property.address}, ${property.zone}, ${property.city}`}</p>
        <p className="text-xs text-neutral-500">
          Publicado: {new Date(property.createdAt).toDateString()}
        </p>
      </div>
    </div>
  );
}
