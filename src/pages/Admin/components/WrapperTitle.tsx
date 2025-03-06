export default function WrapperTitle({
  title,
  Icon,
}: {
  title: string;
  Icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
}) {
  return (
    <span className="h3-sb flex items-center gap-3">
      <Icon className="text-gray-80 h-7 w-7" /> {title}
    </span>
  );
}
