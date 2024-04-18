export default function className(
  ...classnames: (string | null | undefined)[]
) {
  return classnames.filter((c) => !!c).join(" ");
}
