export default function WrapperTitle({
  title,
  Icon,
}: {
  title: string;
  Icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
}) {
  return (
    <span className="h3-sb flex items-center gap-4.5">
      <Icon className="h-9 w-9" /> {title}
    </span>
  );
}
